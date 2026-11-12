'use strict';

const assert = require('node:assert/strict');
require('../enem-data.js');
require('../enem-tri-data.js');
require('../enem-tri.js');
require('../enem-anatomy-data.js');
require('../enem-sim-plan.js');
require('../enem-sim.js');

const tri = globalThis.FurgEnemTri;
const planner = globalThis.FurgEnemSimPlan;
const sim = globalThis.FurgEnemSim;
const byId = new Map(globalThis.FURG_ENEM_DATA.questions.map(q => [q.id, q]));
const items = globalThis.FURG_ENEM_TRI_DATA.items;

for (const [id, row] of Object.entries(items)) {
  const question = byId.get(id);
  assert.equal(question.answer, row[0], id);
  assert.equal(question.source.booklet, 'azul', id);
  assert.equal(question.application, 'regular', id);
  assert(tri.gradable(question), id);
  assert(tri.get(id), id);
}

assert.deepEqual(planner.profile('dia-2', 'ingles').percentages, [20, 49, 31]);
assert.deepEqual(planner.profile('matematica', 'ingles').percentages, [14, 41, 45]);
assert.deepEqual(planner.profile('ciencias-natureza', 'ingles').percentages, [26, 56, 18]);
for (const [scope, { areas }] of Object.entries(planner.scopes)) {
  for (const language of ['ingles', 'espanhol']) {
    for (const count of [1, 5, 20, 31, 45, 90]) {
      const percentages = planner.profile(scope, language).percentages;
      const settings = { scope, language, count, percentages };
      const ids = planner.draw(settings);
      const plan = planner.inspect(settings);
      assert.equal(ids.length, count, scope + ' ' + count);
      assert.equal(new Set(ids).size, ids.length);
      assert.deepEqual(planner.validateIds(scope, language, ids), ids);
      assert.deepEqual(planner.stats(ids), plan.counts);
      assert.equal(plan.counts.reduce((a, b) => a + b, 0), count);
      assert.equal(areas.filter(area => ids.some(id => tri.get(id).area === area)).length, Math.min(areas.length, count));
      assert(ids.every(id => !byId.get(id).language || byId.get(id).language === language));
      if (count === 90) assert(new Set(ids.map(id => byId.get(id).year)).size > 1);
    }
  }
}

const config = { scope: 'dia-2', language: 'ingles', count: 20, percentages: [50, 30, 20] };
const ids = planner.draw(config);
assert.deepEqual(planner.stats(ids), [10, 6, 4]);
assert.deepEqual(planner.inspect(config).areas.map(row => row.count), [10, 10]);
assert.equal(planner.inspect({ ...config, percentages: [50, 50, 1] }), null);
assert.equal(planner.inspect({ ...config, count: 90, percentages: [100, 0, 0] }).largest, 62);
assert.equal(planner.validateIds('dia-1', 'ingles', ids), null);
assert.equal(planner.validateIds('dia-2', 'ingles', [ids[0], ids[0]]), null);
assert(!tri.get('enem-2025-123'));
assert(!tri.get('enem-2025-125'));
assert(!tri.get('enem-2025-172'));

const official = sim.exam(2025, '2');
assert.equal(official.length, 90);
assert.equal(official[0].id, 'enem-2025-91');
assert.equal(sim.minutes(2025, '2'), 300);
const now = new Date().toISOString();
const active = {
  id: 'custom-test', mode: 'custom', scope: 'dia-2', day: '2', language: 'ingles',
  ids, index: 3, answers: { [ids[0]]: 'A' }, marked: { [ids[1]]: true },
  durationMinutes: 60, remainingMs: 3000000, endsAt: null, paused: true, startedAt: now,
};
assert.deepEqual(sim.validate({ active }).active, active);
assert.deepEqual(sim.merge({ active }, {}).active, active);
assert.equal(sim.validate({ active: { ...active, ids: [...ids, ids[0]] } }).active, null);
const annual = { ...active, id: 'annual-test', year: 2025, ids: [], finishedAt: now, expired: true };
delete annual.mode;
delete annual.scope;
assert.deepEqual(sim.validate({ history: [annual] }).history[0].ids, official.map(q => q.id));

const mathematics = official.filter(q => tri.get(q.id)?.area === 'matematica')
  .sort((a, b) => tri.get(a.id).b - tri.get(b.id).b);
const mathIds = mathematics.map(q => q.id);
const wrong = q => q.answer === 'A' ? 'B' : 'A';
const responses = select => Object.fromEntries(mathematics.map((q, i) => [q.id, select(i) ? q.answer : wrong(q)]));
const report = answers => tri.report(mathIds, answers)[0];
const coherent = report(responses(i => i < 30));
const incoherent = report(responses(i => i >= mathematics.length - 30));
assert(coherent.estimate.value > incoherent.estimate.value);
assert(coherent.estimate.low < coherent.estimate.value && coherent.estimate.value < coherent.estimate.high);
const full = report(responses(() => true));
assert(full.estimate.value > coherent.estimate.value);
const partial = report({ [mathIds[0]]: mathematics[0].answer });
assert.equal(partial.calibratedAnswered, 1);
assert.equal(partial.calibrated, mathIds.length);
assert.equal(report({}).estimate, null);
assert.equal(tri.fromProgress({ answers: { [mathIds[0]]: { viewed: true } } }, 'dia-2').length, 0);
const training = tri.fromProgress({ answers: { [mathIds[0]]: { firstChoice: 'A', date: now } } }, 'dia-2');
assert.equal(training[0].calibrated, 1);

console.log('PASS: cadernos anuais, seleção multiano, cotas por nível e área, persistência e TRI por padrão de resposta.');
