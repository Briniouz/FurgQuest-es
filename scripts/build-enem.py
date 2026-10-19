#!/usr/bin/env python3
"""Build a static, offline ENEM collection from the acquired source files."""
import argparse
import collections
import hashlib
import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("work", type=pathlib.Path)
parser.add_argument("--include-older", action="store_true")
args = parser.parse_args()
WORK = args.work.resolve()


def read(path, default=None):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


def normalize(value):
    if isinstance(value, str):
        return value.replace("assets/enem/", "enem/")
    if isinstance(value, list):
        return [normalize(v) for v in value]
    if isinstance(value, dict):
        return {k: normalize(v) for k, v in value.items()}
    return value


def copy_assets(src):
    if src.is_dir():
        shutil.copytree(src, ROOT / "enem", dirs_exist_ok=True, ignore=shutil.ignore_patterns("*-annotated.pdf"))


groups = ["modern"] + (["older"] if args.include_older else [])
if (WORK / "extras/questions.json").exists():
    groups.append("extras")
records = {}
for group in groups:
    for q in read(WORK / group / "questions.json", []):
        q = normalize(q)
        if q["id"] in records:
            raise ValueError("Duplicate source ID: " + q["id"])
        records[q["id"]] = q
    copy_assets(WORK / group / "enem")
    copy_assets(WORK / group / "assets/enem")
if args.include_older:
    copy_assets(WORK.parent / "assets/enem")
copy_assets(WORK / "keys/enem")
for q in read(WORK / "modern/gap-manifest.json", {}).get("missingQuestions", []):
    records.setdefault(q["id"], normalize(q))

for name in ["keys/patches.json", "modern/context-patches.json", "modern/format-patches.json"]:
    patches = read(WORK / name, [])
    if isinstance(patches, dict):
        patches = [{"id": key, **value} for key, value in patches.items()]
    for patch in patches:
        patch = normalize(patch)
        q = records.setdefault(patch["id"], {})
        for k, value in patch.items():
            if k in ("source", "quality"):
                q[k] = {**q.get(k, {}), **value}
            else:
                q[k] = value

keys = read(WORK / "keys/keys.json", {})
pdf_manifest = normalize(read(WORK / "keys/pdf-manifest.json", []))
if args.include_older:
    for year, kinds in read(WORK / "older/filenames.json", {}).items():
        for kind, entry in kinds.items():
            entry = normalize(entry)
            path = ROOT / entry["path"]
            pdf_manifest.append({**entry, "year": int(year), "day": 1, "kind": "GB" if kind == "answer" else "PV", "bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
pdf_by_path = {p["path"]: p for p in pdf_manifest}
diagnostics = {"missingAssets": [], "incomplete": [], "unverifiedKeys": []}
for q in records.values():
    q.setdefault("files", [])
    # Official 2009 day-one cover: Natureza 1–45, Humanas 46–90.
    if q["year"] == 2009 and 1 <= q["index"] <= 90:
        q["area"] = "ciencias-natureza" if q["index"] <= 45 else "ciencias-humanas"
    source = q.setdefault("source", {})
    quality = q.setdefault("quality", {})
    if "originalImages" in source:
        source["images"] = source.pop("originalImages")
    key = keys.get(q["id"])
    if key:
        q["answer"] = key["answer"]
        q["canceled"] = bool(key.get("canceled"))
        source["answerPdf"] = key["keyFile"]
        source["booklet"] = key.get("booklet", "azul")
        proof = f"enem/pdfs/{q['year']}_PV_D{key['day']}_AZUL.pdf"
        if (ROOT / proof).exists():
            source.setdefault("page", None)
            source["pdf"] = proof
        quality["keyVerified"] = True
    elif q["year"] < 2009 and source.get("answerPdf"):
        quality["keyVerified"] = True
    else:
        quality["blocked"] = True
        quality["note"] = "Gabarito ainda em conferência; a resposta não entra na taxa de acertos."
        diagnostics["unverifiedKeys"].append(q["id"])
    for kind in ("pdf", "answerPdf"):
        entry = pdf_by_path.get(source.get(kind))
        if entry:
            source[kind + "Url"] = entry.get("mirrorUrl") or entry.get("url")
    alternatives = q.get("alternatives", [])
    if len(alternatives) != 5 or {a.get("letter") for a in alternatives} != set("ABCDE") or any(not (a.get("text") or a.get("file")) for a in alternatives):
        quality["blocked"] = True
        quality["note"] = "Alternativas em revisão. Consulte o original antes de resolver."
        diagnostics["incomplete"].append(q["id"])
    if quality.get("blocked") is False:
        quality.pop("note", None)

questions = sorted(records.values(), key=lambda q: (q["year"], q["application"], q["index"], q.get("language") or ""))
tuples = [(q["year"], q["application"], q["index"], q.get("language")) for q in questions]
if len(set(tuples)) != len(tuples):
    raise ValueError("Repeated year/application/index/language")


def asset_refs(value):
    if isinstance(value, str):
        if value.startswith("enem/"):
            yield value
        yield from re.findall(r"!\[[^\]]*\]\((enem/[^\s)]+)\)", value)
    elif isinstance(value, list):
        for v in value:
            yield from asset_refs(v)
    elif isinstance(value, dict):
        for v in value.values():
            yield from asset_refs(v)


for q in questions:
    missing = [p for p in set(asset_refs(q)) if not (ROOT / p.split("#")[0]).is_file()]
    if missing:
        diagnostics["missingAssets"].append({"id": q["id"], "files": missing})
        q["quality"]["blocked"] = True
        q["quality"]["note"] = "Figura ou documento em revisão. Consulte a fonte original."

coverage = []
grouped = collections.defaultdict(list)
for q in questions:
    grouped[q["year"], q["application"]].append(q)
for (year, application), group in sorted(grouped.items()):
    expected = (63 if year < 2009 else 180 if year == 2009 else 185) if application == "regular" else None
    blocked = sum(bool(q["quality"].get("blocked")) for q in group)
    canceled = sum(bool(q.get("canceled")) for q in group)
    coverage.append({"year": year, "application": application, "label": group[0].get("applicationLabel", application), "count": len(group), "expected": expected,
                     "blocked": blocked, "canceled": canceled,
                     "note": f"{blocked} em conferência" if blocked else "Gabaritos conferidos" + (f" · {canceled} anulada(s)" if canceled else "")})

scope = "Provas regulares do ENEM, de " + str(min(q["year"] for q in questions)) + " a " + str(max(q["year"] for q in questions)) + ". Inglês e espanhol aparecem como alternativas de idioma desde 2010: são 185 itens no acervo por ano, embora o candidato responda a 180. Cores do mesmo caderno não geram cópias. Reaplicações/PPL, versões digitais e aplicações específicas ainda não integram esta prévia."
data = {"version": 1, "builtAt": "2026-10-19", "scope": scope, "coverage": coverage,
        "sources": [{"title": "INEP · provas e gabaritos oficiais", "url": "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos"},
                    {"title": "USP · arquivo de provas e gabaritos do ENEM", "url": "https://fep.if.usp.br/~profis/arquivo/avaliacao/enem/enem.html"},
                    {"title": "Transcrição base e figuras · isvani/simulador-enem", "url": "https://github.com/isvani/simulador-enem/tree/096a98fccd45712e81204fe66113b5e47eb430bf"}], "questions": questions}
serialized = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
(ROOT / "enem-data.json").write_text(serialized + "\n", encoding="utf-8")
(ROOT / "enem-data.js").write_text("globalThis.FURG_ENEM_DATA=" + serialized.replace("\u2028", "\\u2028").replace("\u2029", "\\u2029") + ";\n", encoding="utf-8")
report = {"total": len(questions), "coverage": coverage, "canceled": sum(bool(q.get("canceled")) for q in questions),
          "blocked": sum(bool(q["quality"].get("blocked")) for q in questions), "sha256": hashlib.sha256(serialized.encode()).hexdigest(), **diagnostics}
(ROOT / "enem/coverage.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "enem/sources.json").write_text(json.dumps(pdf_manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
lines = ["FURG QUESTÕES · ACERVO ENEM · PRÉVIA", scope, "", "Figuras e PDFs são arquivos locais no pacote completo.", ""]
for q in questions:
    lines.extend(["=" * 65, f"ENEM {q['year']} · {q['applicationLabel']} · Questão {q['index']}" + (" · " + q["language"] if q.get("language") else ""), q.get("context") or "", q.get("stem") or ""])
    for a in q["alternatives"]:
        lines.append(a["letter"] + ") " + (a.get("text") or "") + (" [Figura: " + a["file"] + "]" if a.get("file") else ""))
    lines.extend(["Gabarito: " + ("ANULADA" if q.get("canceled") else q.get("answer") or "Em conferência"), "ID: " + q["id"], ""])
(ROOT / "ENEM-Todas-Questoes.txt").write_text("\n".join(lines), encoding="utf-8")
for name in ["modern/ORIGEM.md", "modern/RESTAURO.md", "older/ORIGEM.md", "older/REPORT.md", "older/coverage.json", "keys/REPORT.md", "keys/regular-report.json", "keys/answer-corrections.json"]:
    path = WORK / name
    if path.exists():
        dest = ROOT / "enem/provenance" / (path.parent.name + "-" + path.name)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, dest)
print(json.dumps({k: report[k] for k in ["total", "blocked", "canceled", "missingAssets", "incomplete", "unverifiedKeys"]}, ensure_ascii=False))
