#!/usr/bin/env python3
"""Build the browser subject catalog from the versioned classification metadata."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'enem/provenance/subjects.json').read_text())
questions=json.loads((root/'enem-data.json').read_text())['questions']
assert set(data['questions'])=={q['id'] for q in questions},'Subject metadata must cover the exact current ENEM bank'
for id,item in data['questions'].items():
 assert item['subjects'] and len(item['subjects'])==len(set(item['subjects'])),id
 assert all(s in data['labels'] for s in item['subjects']),id
browser={k:data[k] for k in ['version','updatedAt','labels','questions']}
script='"use strict";\nglobalThis.FURG_ENEM_SUBJECTS_DATA='+json.dumps(browser,ensure_ascii=False,separators=(',',':'))+';\n'
script+='if(globalThis.FURG_ENEM_DATA){globalThis.FURG_ENEM_DATA.subjects=globalThis.FURG_ENEM_SUBJECTS_DATA.labels;for(const q of globalThis.FURG_ENEM_DATA.questions){const item=globalThis.FURG_ENEM_SUBJECTS_DATA.questions[q.id];q.subjects=item?.subjects||[];q.subjectMethod=item?.method||"";}}\n'
(root/'enem-subjects-data.js').write_text(script)
print(f'Prepared subjects for {len(questions)} ENEM questions.')
