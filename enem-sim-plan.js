'use strict';
(() => {
  const tri = globalThis.FurgEnemTri;
  const anatomy = globalThis.FURG_ENEM_ANATOMY_DATA || { questions: [], topics: [] };
  const bank = new Map((globalThis.FURG_ENEM_DATA?.questions || []).map(q => [q.id, q]));
  const scopes = {
    'dia-2': { title: 'Dia 2 · Matemática e Natureza', day: '2', areas: ['matematica', 'ciencias-natureza'] },
    matematica: { title: 'Só Matemática', day: '2', areas: ['matematica'] },
    'ciencias-natureza': { title: 'Só Ciências da Natureza', day: '2', areas: ['ciencias-natureza'] },
    'dia-1': { title: 'Dia 1 · Linguagens e Humanas', day: '1', areas: ['linguagens', 'ciencias-humanas'] },
    linguagens: { title: 'Só Linguagens', day: '1', areas: ['linguagens'] },
    'ciencias-humanas': { title: 'Só Ciências Humanas', day: '1', areas: ['ciencias-humanas'] },
  };
  const topicTitles = new Map(anatomy.topics.map(topic => [topic.id, topic.title]));
  const topicsById = new Map(anatomy.questions.map(row => [row.id, row.topic]));
  const pace = 3;
  const maxCount = 90;
  const validLanguage = language => language === 'ingles' || language === 'espanhol';
  const sum = values => values.reduce((total, value) => total + value, 0);

  function apportion(count, weights) {
    const total = sum(weights);
    if (!total) return weights.map(() => 0);
    const shares = weights.map(weight => count * weight / total);
    const sizes = shares.map(Math.floor);
    const order = shares.map((share, i) => [share - sizes[i], i]).sort(([a], [b]) => b - a);
    for (const [, i] of order.slice(0, count - sum(sizes))) sizes[i]++;
    return sizes;
  }

  const cache = new Map();
  function profile(scope, language) {
    const key = scope + ':' + language;
    if (cache.has(key)) return cache.get(key);
    if (!Object.hasOwn(scopes, scope) || !validLanguage(language)) return null;
    const areas = scopes[scope].areas.map(area => ({ area, bands: [[], [], []], frequency: new Map(), total: 0 }));
    const byArea = new Map(areas.map(row => [row.area, row]));
    const seenItems = new Set();
    for (const { id, topic } of anatomy.questions) {
      const q = bank.get(id);
      if (!tri.gradable(q) || q.application !== 'regular' || q.language && q.language !== language ||
          !topicTitles.has(topic)) continue;
      const row = byArea.get(tri.areaOf(q));
      if (!row) continue;
      row.frequency.set(topic, (row.frequency.get(topic) || 0) + 1);
      row.total++;
      const item = tri.get(id);
      if (!item || seenItems.has(item.itemCode)) continue;
      seenItems.add(item.itemCode);
      row.bands[item.level].push({ id, topic });
    }
    const percentages = [0, 0, 0];
    for (const row of areas) {
      row.available = row.bands.map(band => band.length);
      const total = sum(row.available);
      if (total) row.available.forEach((amount, i) => { percentages[i] += amount / total; });
    }
    const model = { areas, percentages: apportion(100, percentages) };
    cache.set(key, model);
    return model;
  }

  function allocation(count, percentages, model) {
    const levels = apportion(count, percentages);
    const [first, second] = model.areas;
    if (!second) return levels.every((needed, i) => needed <= first.available[i]) ? [levels] : null;

    // Preserve both the requested difficulty totals and a near-even split by area.
    const minimum = levels.map((needed, i) => Math.max(0, needed - second.available[i]));
    const maximum = levels.map((needed, i) => Math.min(needed, first.available[i]));
    const target = Math.ceil(count / 2);
    if (minimum.some((value, i) => value > maximum[i]) || target < sum(minimum) || target > sum(maximum)) return null;
    const desired = levels.map((needed, i) => {
      const total = first.available[i] + second.available[i];
      return total ? needed * first.available[i] / total : 0;
    });
    const split = minimum.slice();
    for (let placed = sum(split); placed < target; placed++) {
      let best = -1;
      for (let i = 0; i < levels.length; i++) {
        if (split[i] < maximum[i] && (best < 0 || desired[i] - split[i] > desired[best] - split[best])) best = i;
      }
      split[best]++;
    }
    return [split, levels.map((needed, i) => needed - split[i])];
  }

  function inspect({ scope, language, count, percentages }) {
    const model = profile(scope, language);
    if (!model || !Number.isInteger(count) || count < 1 || count > maxCount ||
        !Array.isArray(percentages) || percentages.length !== 3 ||
        !percentages.every(value => Number.isInteger(value) && value >= 0 && value <= 100) || sum(percentages) !== 100) return null;
    const slots = allocation(count, percentages, model);
    if (!slots) {
      let largest = count - 1;
      while (largest > 0 && !allocation(largest, percentages, model)) largest--;
      return { largest };
    }
    return {
      counts: apportion(count, percentages),
      areas: model.areas.map((row, i) => ({ area: row.area, count: sum(slots[i]) })),
      slots,
    };
  }

  function sampleArea(row, quota, random) {
    const total = sum(quota);
    const drawn = new Map();
    const result = [];
    const order = quota.map((needed, level) => [needed / (row.available[level] || 1), level])
      .sort(([a], [b]) => b - a);
    for (const [, level] of order) {
      const groups = new Map();
      for (const item of row.bands[level]) {
        if (!groups.has(item.topic)) groups.set(item.topic, []);
        groups.get(item.topic).push(item.id);
      }
      for (let slot = 0; slot < quota[level]; slot++) {
        let best, bestDeficit = -Infinity;
        for (const [topic, ids] of groups) {
          if (!ids.length) continue;
          // A frequent topic earns proportionally more slots over the whole area.
          const expected = total * row.frequency.get(topic) / row.total;
          const deficit = expected - (drawn.get(topic) || 0) + 0.05 * random();
          if (deficit > bestDeficit) {
            best = topic;
            bestDeficit = deficit;
          }
        }
        const pool = groups.get(best);
        result.push(pool.splice(Math.floor(random() * pool.length), 1)[0]);
        drawn.set(best, (drawn.get(best) || 0) + 1);
      }
    }
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function draw(settings, random = Math.random) {
    const plan = inspect(settings);
    if (!plan?.slots) return [];
    const { areas } = profile(settings.scope, settings.language);
    return areas.flatMap((row, i) => sampleArea(row, plan.slots[i], random));
  }

  function validateIds(scope, language, ids) {
    if (!Object.hasOwn(scopes, scope) || !validLanguage(language) || !Array.isArray(ids) ||
        ids.length < 1 || ids.length > maxCount || new Set(ids).size !== ids.length) return null;
    const validAreas = scopes[scope].areas;
    return ids.every(id => {
      const q = bank.get(id);
      return tri.gradable(q) && q.application === 'regular' && validAreas.includes(tri.areaOf(q)) &&
        (!q.language || q.language === language);
    }) ? ids.slice() : null;
  }

  function stats(ids) {
    const counts = [0, 0, 0];
    for (const id of ids) {
      const item = tri.get(id);
      if (item) counts[item.level]++;
    }
    return counts;
  }

  const topicOf = id => topicTitles.get(topicsById.get(id));
  globalThis.FurgEnemSimPlan = { scopes, pace, maxCount, profile, inspect, draw, validateIds, stats, topicOf };
})();
