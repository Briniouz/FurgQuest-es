#!/usr/bin/env python3
"""Acquire the official USP first-phase examination and corrected keys, 2010+."""
import concurrent.futures
import hashlib
import html
import json
import pathlib
import re
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DEST = ROOT / 'fuvest'
DEST.mkdir(exist_ok=True)
(DEST / 'pdfs').mkdir(exist_ok=True)
WORK = ROOT.parent / 'exam-work' / 'fuvest'
WORK.mkdir(parents=True, exist_ok=True)


def get(url):
    error = None
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'FurgQuestoes/1.0 (educational archive)'})
            with urllib.request.urlopen(request, timeout=45) as response:
                return response.read()
        except Exception as exc:
            error = exc
            time.sleep(attempt + 1)
    raise error


def year_data(year):
    url = f'https://www.fuvest.br/acervo-vestibular-{year}/'
    cached = WORK / f'{year}.html'
    if not cached.exists():
        cached.write_bytes(get(url))
    markup = cached.read_text(errors='replace')
    marker = re.search(r'Primeira\s+Fase(.*?)Segunda\s+Fase', markup, re.S | re.I)
    if not marker:
        raise ValueError(f'First-phase heading not found for {year}')
    links = []
    for match in re.finditer(r'<a\b[^>]*href=([\"\x27])(.*?)\1[^>]*>(.*?)</a>', marker[1], re.S | re.I):
        text = html.unescape(re.sub(r'<[^>]+>', ' ', match[3])).strip()
        href = urllib.parse.urljoin(url, html.unescape(match[2]))
        if re.search(r'\.pdf(?:$|\?)', href, re.I):
            links.append({'label': text, 'url': href})
    proofs = [link for link in links if re.match(r'Prova(?:\s|$)', link['label'], re.I) and 'gabarito' not in link['label'].lower()]
    keys = [link for link in links if 'gabarito' in link['label'].lower() and 'correspond' not in link['label'].lower()]
    if not proofs or not keys:
        raise ValueError(f'No official proof/key for {year}: {links}')
    proof = next((p for p in proofs if re.search(r'\bV1?\b', p['label'])), proofs[0])
    key = keys[0]
    entry = {'year': year, 'phase': 1, 'archiveUrl': url, 'booklet': re.search(r'\bV[1-4]?\b', proof['label']).group() if re.search(r'\bV[1-4]?\b', proof['label']) else 'V', 'links': links}
    for kind, document in [('proof', proof), ('key', key)]:
        path = DEST / 'pdfs' / f'fuvest-{year}-{kind}.pdf'
        if not path.exists():
            content = get(document['url'])
            if not content.startswith(b'%PDF'):
                raise ValueError(f'Not a PDF: {document["url"]}')
            path.write_bytes(content)
        entry[kind] = {**document, 'path': path.relative_to(ROOT).as_posix(), 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
    print(json.dumps({'year': year, 'proof': proof['url'], 'key': key['url']}, ensure_ascii=False), flush=True)
    return entry


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    entries = list(pool.map(year_data, range(2010, 2027)))
(DEST / 'sources.json').write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'years': len(entries), 'bytes': sum(e[k]['bytes'] for e in entries for k in ('proof', 'key'))}), flush=True)
