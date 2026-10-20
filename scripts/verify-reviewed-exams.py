#!/usr/bin/env python3
"""Verify the generated publication against the locally reviewed artifact set."""
import hashlib,json,pathlib,subprocess,sys
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
manifest=json.loads(pathlib.Path(sys.argv[1]).read_text())
for name,expected in manifest['files'].items():
 path=ROOT/name
 assert path.is_file(),name+' missing'
 assert hashlib.sha256(path.read_bytes()).hexdigest()==expected,name+' differs from reviewed source/data'
for name,expected in manifest['images'].items():
 path=ROOT/name
 assert path.is_file(),name+' missing'
 with Image.open(path) as image:assert list(image.size)==expected,name+' unexpected dimensions'
assert {p.relative_to(ROOT).as_posix() for p in (ROOT/'fuvest/images').glob('*.webp')}==set(manifest['images'])
changed=subprocess.check_output(['git','diff','--name-only',manifest['baseCommit']],cwd=ROOT,text=True).splitlines()
allowed=set(manifest['files'])|set(manifest['images'])|{'.github/workflows/exams-build-20261020.yml','.codex-build/expected.json'}
assert set(changed)<=allowed,'Unreviewed file changes: '+str(set(changed)-allowed)
print('Verified',len(manifest['files']),'reviewed files and',len(manifest['images']),'original question images.')
