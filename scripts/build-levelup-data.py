#!/usr/bin/env python3
"""Validate the canonical question pool and generate its browser bundle."""
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
stages = json.loads((ROOT / 'levelup-data.json').read_text())
legacy = json.loads((ROOT / 'tests/fixtures/levelup-v1.json').read_text())
assert len(stages) == 20
ids, stems = set(), set()
for level, stage in enumerate(stages, 1):
    assert stage['level'] == level and len(stage['questions']) == 12
    assert all(stage.get(k) for k in ['id', 'title', 'label', 'skill'])
    for i, q in enumerate(stage['questions'], 1):
        assert q['id'] == f"up-{stage['id']}-{i}"
        assert q['id'] not in ids
        ids.add(q['id'])
        assert q['stem'].strip() not in stems, q['id']
        stems.add(q['stem'].strip())
        assert len(q['options']) == len(set(q['options'])) == 4
        assert isinstance(q['answer'], int) and 0 <= q['answer'] < 4
        assert q['hint'].strip() and q['explanation'].strip()
    counts = Counter(q['answer'] for q in stage['questions'])
    assert min(counts.values()) >= 2 and len(counts) == 4
by_id = {q['id']: q for s in stages for q in s['questions']}
for s in legacy:
    for q in s['questions']:
        assert by_id[q['id']] == q, 'Legacy question changed: ' + q['id']
assert len(ids) == 240
proofs = json.loads((ROOT / 'levelup-verification.json').read_text())
assert len(proofs['verification']) == 210
assert {v['id'] for v in proofs['verification']} == ids - {q['id'] for s in legacy for q in s['questions']}
(ROOT / 'levelup-data.js').write_text("'use strict';\n// Original educational questions; generated from levelup-data.json.\nglobalThis.FURG_LEVELUP_DATA=" + json.dumps(stages, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('PASS: 20 stages, 12 questions per stage, 240 unique IDs; 30 v1 items unchanged; 210 new verification records.')
