#!/usr/bin/env python3
"""Validate and package the authored Linguagens guides without editing the exam bank."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text())
data=load('scripts/linguagens-catalog.json')
bank=load('enem-data.json')['questions'];questions={q['id']:q for q in bank}
people={p['id']:p for p in load('scripts/personality-catalog.json')['profiles']}
assert len({t['id'] for t in data['topics']})==len(data['topics'])
selected=set();profiles=set()
for t in data['topics']:
 assert t['group'] in data['groups']
 assert len(t['points'])>=3 and t['example']['label'].startswith('Exemplo autoral')
 assert t['questions'],t['id']
 t['authors']=[dict(id=i,name=people[i]['name']) for i in t['authors']]
 profiles.update(a['id'] for a in t['authors'])
 for r in t['questions']:
  q=questions[r['id']]
  assert q['area']=='linguagens' and q['answer'] in 'ABCDE' and not q['canceled'] and not q.get('quality',{}).get('blocked'),r['id']
  r.update(year=q['year'],index=q['index'],language=q.get('language'))
  selected.add(q['id'])
for block in data['review']:
 assert all(i in {t['id'] for t in data['topics']} for i in block['topics'])
data['totalBankQuestions']=sum(q['area']=='linguagens' for q in bank)
data['selectedQuestions']=len(selected)
data['linkedProfiles']=len(profiles)
(ROOT/'linguagens-data.js').write_text("'use strict';\nglobalThis.FURG_LANGUAGENS_DATA="+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n')
report=dict(topics=len(data['topics']),selectedQuestions=len(selected),bankQuestions=data['totalBankQuestions'],linkedProfiles=len(profiles),questionIds=sorted(selected),
            corpusSha256=hashlib.sha256((ROOT/'enem-data.json').read_bytes()).hexdigest(),scope='Seleção didática; os números não representam frequência oficial por assunto.')
(ROOT/'docs/linguagens-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
solutions=load('scripts/linguagens-solutions.json')
for id,solution in solutions.items():
 assert id in selected and questions[id]['answer']==solution['answerExpected'],id
(ROOT/'linguagens-solutions.js').write_text("'use strict';\nObject.assign(globalThis.FURG_ENEM_SOLUTIONS||(globalThis.FURG_ENEM_SOLUTIONS={}),"+json.dumps(solutions,ensure_ascii=False,separators=(',',':'))+');\n')
print(json.dumps(report,ensure_ascii=False))
