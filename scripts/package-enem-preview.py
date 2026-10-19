#!/usr/bin/env python3
"""Package the local site and a self-contained sample for review."""
import base64
import copy
import json
import mimetypes
import pathlib
import re
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT.parent / "downloads"
OUT.mkdir(exist_ok=True)
data = json.loads((ROOT / "enem-data.json").read_text(encoding="utf-8"))
all_questions = data["questions"]
selected = {}


def add(items, limit):
    for q in items:
        if len(selected) >= 220:
            return
        if q["id"] not in selected and not q.get("quality", {}).get("blocked"):
            selected[q["id"]] = q
            limit -= 1
            if limit == 0:
                return


latest = max(q["year"] for q in all_questions)
# Include one complete year so the annual simulation works in the standalone preview.
for q in all_questions:
    if q["year"] == latest and q["application"] == "regular":
        selected[q["id"]] = q
for area in ["linguagens", "ciencias-humanas", "ciencias-natureza", "matematica"]:
    add([q for q in all_questions if q["year"] == latest and q["area"] == area and q.get("language") != "espanhol" and not q.get("canceled")], 3)
for year in [1998, 2000, 2002, 2005, 2008]:
    add([q for q in all_questions if q["year"] == year], 1)
for year in [2010, 2015, 2020, 2023]:
    add([q for q in all_questions if q["year"] == year and q["area"] == "matematica" and (q.get("files") or "![" in (q.get("context") or "")) and not q.get("canceled")], 2)
add([q for q in all_questions if q["year"] == latest and q.get("language") == "espanhol"], 5)
add([q for q in reversed(all_questions) if q.get("canceled")], 2)
sample = copy.deepcopy(data)
sample["questions"] = copy.deepcopy(list(selected.values()))
sample["scope"] = f"Esta prévia interativa contém {len(selected)} questões reais selecionadas. O pacote completo contém {len(all_questions):,} itens. ".replace(",", ".") + data["scope"]


def uri(path):
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return "data:" + mime + ";base64," + base64.b64encode(path.read_bytes()).decode()


images = {}
for q in sample["questions"]:
    raw = json.dumps(q, ensure_ascii=False)
    for path in re.findall(r"enem/(?:figures|images|restored)/[a-zA-Z0-9_./%-]+\.(?:png|jpe?g|webp|svg)", raw):
        if (ROOT / path).is_file():
            images[path] = uri(ROOT / path)
    source = q["source"]
    for key in ["pdf", "answerPdf"]:
        if source.get(key, "").startswith("enem/"):
            source[key] = source.get(key + "Url") or (source.get("url") if key == "pdf" else None) or f"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/{q['year']}"

html = (ROOT / "index.html").read_text(encoding="utf-8")
html = html.replace("<title>FURG Questões</title>", "<title>Prévia ENEM · FURG Questões</title>")
brand_uri = uri(ROOT / "brand-mark.svg")
html = html.replace('"brand-mark.svg"', '"' + brand_uri + '"')
banner = f'<aside class="preview-banner"><strong>Prévia do ENEM</strong><span>{len(selected)} questões para testar a interface · {len(all_questions):,} no pacote completo · Ainda sem publicação no GitHub</span></aside>'.replace(",", ".")
html = html.replace("<main>", "<main>" + banner, 1)
html = html.replace("</head>", '<style>.preview-banner{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:15px 18px;border:1px solid var(--line);border-radius:10px;background:var(--surface);margin:0 0 25px;font-size:11px;color:var(--muted)}.preview-banner strong{color:var(--blue);white-space:nowrap}@media(max-width:680px){.preview-banner{align-items:flex-start;flex-direction:column;gap:7px;line-height:1.8}}</style><script>location.hash="simulados";</script></head>')


def inline_css(match):
    path = ROOT / match.group(1).split("?")[0]
    return "<style>" + path.read_text(encoding="utf-8") + "</style>"


def script_tag(code):
    return "<script>" + code.replace("</script", "<\\/script") + "</script>"


def inline_script(match):
    name = match.group(1).split("?")[0]
    if name == "enem-data.js":
        return script_tag("globalThis.FURG_ENEM_DATA=" + json.dumps(sample, ensure_ascii=False, separators=(",", ":")) + ";globalThis.FURG_PREVIEW_IMAGES=" + json.dumps(images, separators=(",", ":")) + ";")
    code = (ROOT / name).read_text(encoding="utf-8")
    if name == "enem.js":
        code = code.replace('src="${esc(src)}"', 'src="${esc((globalThis.FURG_PREVIEW_IMAGES||{})[src]||src)}"')
        code = code.replace('<a href="ENEM-Todas-Questoes.txt" download>Baixar questões em TXT ↓</a>', 'O TXT com todas as questões acompanha o pacote completo.')
    if name == "offline-data.js":
        figure_paths = set(re.findall(r'figures/[^"\s]+\.(?:png|jpe?g|webp|svg)', code))
        for path in sorted(figure_paths, key=len, reverse=True):
            if (ROOT / path).is_file():
                code = code.replace(path, uri(ROOT / path))
        code = code.replace('"pdfs/', '"https://briniouz.github.io/FurgQuest-es/pdfs/')
    if name == "app.js":
        code = code.replace("furg-questoes-progress-v1", "furg-questoes-enem-preview-v1")
    return script_tag(code)


html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', inline_css, html)
html = re.sub(r'<script src="([^"]+)"></script>', inline_script, html)
html = html.replace('<a class="outline" href="FURG-Todas-Questoes.txt" download>', '<a class="outline" href="https://briniouz.github.io/FurgQuest-es/FURG-Todas-Questoes.txt" download>')
preview = OUT / "Previa-ENEM.html"
preview.write_text(html, encoding="utf-8")

readme = f"""FURG QUESTÕES + ENEM · PRÉVIA PARA REVISÃO
19/10/2026

1. Extraia TODO o ZIP, mantendo as subpastas.
2. Abra index.html no navegador e escolha Simulados para fazer uma prova anual do ENEM.
   O banco por questão continua na aba ENEM.
3. Também pode abrir Previa-ENEM.html: ela reúne {len(selected)} questões de amostra
   em um único arquivo, sem precisar extrair imagens. O banco completo está em index.html.

Conteúdo ENEM: {len(all_questions):,} itens em texto, alternativas, figuras locais,
gabaritos conferidos, PDFs, busca, filtros, favoritos e anotações.
Simulados anuais de 2010 em diante: dia 1, dia 2 ou 180 questões, idioma,
cronômetro, pausa, retomada, cartão de respostas e resultado por área.
A amostra HTML inclui o ano de 2025 completo para testar um simulado.
{data['scope']}

O pacote preserva as 2.091 questões FURG, leituras, trilhas, flashcards,
modo escuro, perfil e importação/exportação do progresso.
O treino do ENEM também acompanha o arquivo de progresso.

Não houve publicação desta prévia no GitHub. Os arquivos estão preparados para
revisão. A amostra usa um armazenamento separado, para não sobrescrever o treino
do banco completo. As imagens da amostra ficam embutidas; os PDFs dela abrem online.
O banco completo funciona com as imagens e PDFs locais.

ENEM-Todas-Questoes.txt: todas as questões em texto.
enem/coverage.json: contagens por ano e itens em conferência.
enem/sources.json e enem/provenance/: procedência e revisão dos materiais.

Verificações funcionais: node scripts/check-site.cjs
As verificações automatizadas não substituem a inspeção visual no navegador.

Para atualizar depois da revisão, use GitHub Desktop conforme README.md.
""".replace(f"{len(all_questions):,}", f"{len(all_questions):,}".replace(",", "."))
(ROOT / "ABRIR-PREVIA.txt").write_text(readme, encoding="utf-8")
zip_path = OUT / "FURG-ENEM-Previa.zip"
allowed_dirs = {"enem", "pdfs", "figures", "transcricoes", "scripts", "vendor"}
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted(ROOT.rglob("*")):
        relative = path.relative_to(ROOT)
        if not path.is_file() or any(part in {".git", "__pycache__", "node_modules"} for part in relative.parts):
            continue
        if path.name.endswith("-annotated.pdf"):
            continue
        if len(relative.parts) == 1:
            if path.suffix not in {".html", ".js", ".css", ".json", ".txt", ".md", ".svg"} and path.name != ".nojekyll":
                continue
        elif relative.parts[0] not in allowed_dirs:
            continue
        archive.write(path, relative.as_posix())
    archive.write(preview, preview.name)
print(json.dumps({"preview": str(preview), "previewBytes": preview.stat().st_size, "sampleQuestions": len(selected), "totalQuestions": len(all_questions), "zip": str(zip_path), "zipBytes": zip_path.stat().st_size}))
