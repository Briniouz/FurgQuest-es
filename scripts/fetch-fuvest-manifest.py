#!/usr/bin/env python3
"""Fetch the reviewed official PDF manifest, checking every SHA-256."""
import concurrent.futures,hashlib,json,pathlib,time,urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
sources=json.loads((ROOT/'fuvest/sources.json').read_text())
def fetch(item):
 path=ROOT/item['path'];path.parent.mkdir(parents=True,exist_ok=True)
 if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest()==item['sha256']:return
 for attempt in range(3):
  try:
   req=urllib.request.Request(item['url'],headers={'User-Agent':'FurgQuestoes/1.0 (educational archive)'})
   with urllib.request.urlopen(req,timeout=90) as res:content=res.read()
   assert content.startswith(b'%PDF') and len(content)==item['bytes']
   assert hashlib.sha256(content).hexdigest()==item['sha256'],item['path']+' source changed since review'
   path.write_bytes(content);return
  except Exception:
   if attempt==2:raise
   time.sleep(attempt+1)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(fetch,[s[k] for s in sources for k in ('proof','key')]))
print('Verified 34 official FUVEST PDFs against reviewed SHA-256 hashes.')
