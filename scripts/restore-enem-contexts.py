#!/usr/bin/env python3
"""Apply audited prose restorations without changing IDs, keys or alternatives."""
import hashlib,json,pathlib,re
ROOT=pathlib.Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'enem-data.json').read_text());byid={q['id']:q for q in data['questions']}
patches=json.loads((ROOT/'enem/provenance/context-restorations-20261020.json').read_text())
assert len({p['id'] for p in patches})==len(patches)
for patch in patches:
 q=byid[patch['id']]
 before=(q['answer'],q['canceled'],json.dumps(q['alternatives'],sort_keys=True))
 for field in ('context','stem'):
  if field in patch:
   old=q.get(field) or '';new=patch[field]
   old_images=re.findall(r'!\[[^\]]*\]\(([^)]+)\)',old)
   assert all(p in new for p in old_images),(q['id'],'lost image')
   q[field]=new
 q['source'].update(patch.get('source',{}))
 q.setdefault('quality',{})['contextRestored']='2026-10-20'
 assert before==(q['answer'],q['canceled'],json.dumps(q['alternatives'],sort_keys=True))
special=byid['enem-2021-16']
special['quality']['note']='O trecho musical integral está na página 10 da prova original, disponível no link abaixo.'
special['source'].update({'pdf':'enem/pdfs/2021_PV_D1_AZUL.pdf','page':10})
data['builtAt']='2026-10-20'
serialized=json.dumps(data,ensure_ascii=False,separators=(',',':'))
(ROOT/'enem-data.json').write_text(serialized+'\n')
(ROOT/'enem-data.js').write_text('globalThis.FURG_ENEM_DATA='+serialized.replace('\u2028','\\u2028').replace('\u2029','\\u2029')+';\n')
lines=['FURG QUESTÕES · ACERVO ENEM',data['scope'],'','Figuras e PDFs são arquivos locais no pacote completo.','']
for q in data['questions']:
 lines.extend(['='*65,f"ENEM {q['year']} · {q['applicationLabel']} · Questão {q['index']}"+(' · '+q['language'] if q.get('language') else ''),q.get('context') or '',q.get('stem') or ''])
 for alt in q['alternatives']:lines.append(alt['letter']+') '+(alt.get('text') or '')+(' [Figura: '+alt['file']+']' if alt.get('file') else ''))
 lines.extend(['Gabarito: '+('ANULADA' if q.get('canceled') else q.get('answer') or 'Em conferência'),'ID: '+q['id'],''])
(ROOT/'ENEM-Todas-Questoes.txt').write_text('\n'.join(lines))
coverage=json.loads((ROOT/'enem/coverage.json').read_text());coverage['sha256']=hashlib.sha256(serialized.encode()).hexdigest();coverage['contextRestorations']={'date':'2026-10-20','count':len(patches),'manifest':'enem/provenance/context-restorations-20261020.json'}
(ROOT/'enem/coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
print('Restored',len(patches),'ENEM questions; IDs, alternatives and keys preserved.')
