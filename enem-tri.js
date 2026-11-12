'use strict';
(() => {
  const data = globalThis.FURG_ENEM_TRI_DATA || { items: {} };
  const byId = new Map((globalThis.FURG_ENEM_DATA?.questions || []).map(question => [question.id, question]));
  const areas = {
    matematica: 'Matemática',
    'ciencias-natureza': 'Ciências da Natureza',
    linguagens: 'Linguagens',
    'ciencias-humanas': 'Ciências Humanas',
  };
  const levels = ['Fácil', 'Média', 'Difícil'];
  // Conversão empírica por área publicada no estudo referenciado nos dados.
  const scale = {
    matematica: [500.01939, 129.64617],
    'ciencias-natureza': [501.14342, 113.10230],
    linguagens: [499.97798, 108.08599],
    'ciencias-humanas': [501.48902, 112.31003],
  };
  const grid = Array.from({ length: 40 }, (_, i) => -4 + 8 * i / 39);
  const letter = value => typeof value === 'string' && /^[A-E]$/.test(value);
  const gradable = q => !!q && !q.canceled && !q.quality?.blocked && letter(q.answer);
  const items = new Map();
  for (const [id, [answer, a, b, c, itemCode, area]] of Object.entries(data.items)) {
    const question = byId.get(id);
    if (gradable(question) && question.answer === answer && question.source?.booklet === 'azul' &&
        question.application === 'regular' && Object.hasOwn(areas, area) &&
        Number.isFinite(a) && a > 0 && Number.isFinite(b) && Number.isFinite(c) && c >= 0 && c < 1) {
      items.set(id, { a, b, c, itemCode, area, level: b < 1 ? 0 : b < 2 ? 1 : 2 });
    }
  }
  const get = id => items.get(id);
  const areaOf = q => get(q.id)?.area || q.area;
  const probability = (theta, { a, b, c }) => c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
  const points = (theta, area) => Math.round(scale[area][0] + scale[area][1] * theta);

  function estimate(area, observations) {
    // Média a posteriori (EAP), com verossimilhança 3PL e prior normal padrão.
    const logPosterior = grid.map(theta => {
      let logWeight = -theta * theta / 2;
      for (const { item, correct } of observations) {
        const p = Math.max(1e-12, Math.min(1 - 1e-12, probability(theta, item)));
        logWeight += correct ? Math.log(p) : Math.log1p(-p);
      }
      return logWeight;
    });
    const max = Math.max(...logPosterior);
    const weights = logPosterior.map(logWeight => Math.exp(logWeight - max));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let mean = 0, cumulative = 0, low, high;
    for (const [i, weight] of weights.entries()) {
      mean += weight * grid[i] / total;
      cumulative += weight / total;
      if (low === undefined && cumulative >= 0.10) low = grid[i];
      if (high === undefined && cumulative >= 0.90) high = grid[i];
    }
    return { value: points(mean, area), low: points(low, area), high: points(high, area) };
  }

  function report(ids, answers, { includeBlanks = true } = {}) {
    const grouped = new Map();
    for (const id of new Set(ids)) {
      const q = byId.get(id);
      if (!q) continue;
      const area = areaOf(q);
      if (!Object.hasOwn(areas, area)) continue;
      const marked = letter(answers[id]);
      if (!gradable(q) || !includeBlanks && !marked) continue;
      if (!grouped.has(area)) grouped.set(area, { area, total: 0, answered: 0, used: new Map() });
      const row = grouped.get(area), item = get(id);
      row.total++;
      if (marked) row.answered++;
      if (item && !row.used.has(item.itemCode)) {
        row.used.set(item.itemCode, { item, correct: marked && answers[id] === q.answer, marked });
      }
    }
    return [...grouped.values()].map(({ area, total, answered, used }) => {
      const observations = [...used.values()];
      const marked = observations.filter(row => row.marked).length;
      return {
        area, total, answered, calibrated: observations.length, calibratedAnswered: marked,
        estimate: marked ? estimate(area, observations) : null,
      };
    });
  }

  function fromProgress(progress, space) {
    const allowed = space === 'dia-1' ? ['linguagens', 'ciencias-humanas']
      : space === 'dia-2' ? ['matematica', 'ciencias-natureza'] : Object.keys(areas);
    const totals = new Map(allowed.map(area => [area, 0]));
    const answers = {};
    const entries = Object.entries(progress?.answers || {}).sort(([, a], [, b]) => String(b.date || '').localeCompare(String(a.date || '')));
    for (const [id, entry] of entries) {
      const q = byId.get(id), item = get(id);
      if (!item || !gradable(q) || !letter(entry.firstChoice) ||
          !totals.has(item.area) || totals.get(item.area) >= 45) continue;
      answers[id] = entry.firstChoice;
      totals.set(item.area, totals.get(item.area) + 1);
    }
    return report(Object.keys(answers), answers, { includeBlanks: false });
  }

  function cards(reportRows) {
    if (!reportRows.length) return '<p class="muted">Responde questões calibradas do ENEM para gerar tua estimativa por área.</p>';
    return '<div class="enem-tri-cards">' + reportRows.map(row => {
      const coverage = `${row.calibrated}/${row.total} itens válidos com parâmetros`;
      const value = row.estimate;
      const description = !row.calibrated ? 'Sem parâmetros confirmados neste conjunto.'
        : !value ? 'Nenhuma resposta marcada nos itens calibrados.'
        : `Faixa do modelo (80%) de ${value.low} a ${value.high} pontos.`;
      return `<article class="enem-tri-card">
        <h4>${areas[row.area]}</h4>
        ${value ? `<strong>${value.value} <span>pontos</span></strong>` : ''}
        <p>${description}</p><small>${coverage}</small>
        ${value && row.calibrated < 15 ? '<small>Bloco curto, com margem maior.</small>' : ''}
      </article>`;
    }).join('') + '</div>';
  }

  function method({ exam = false } = {}) {
    return `<details class="enem-tri-method"><summary>Como a estimativa TRI é calculada</summary>
      <p>O modelo usa os parâmetros de discriminação, dificuldade e acerto casual de cada item. A combinação de acertos e erros muda a estimativa, mesmo quando o total de acertos é igual.</p>
      <p>O cálculo usa a média a posteriori (EAP), com conversão empírica por área. A faixa de 80% expressa a incerteza do modelo para as respostas usadas. A nota oficial é publicada pelo Inep.</p>
      ${exam ? '<p>No simulado finalizado, brancas contam como erro. Itens anulados e itens sem parâmetros confirmados ficam fora do cálculo TRI.</p>' : ''}
      <p><a class="text-link" href="https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem" target="_blank" rel="noopener">Microdados do Inep ↗</a> ·
      <a class="text-link" href="https://github.com/HenriqueLindemann/analise-enem/blob/master/docs/SCORE_RECALCULATION.md" target="_blank" rel="noopener">Referência da conversão ↗</a> ·
      <a class="text-link" href="enem/provenance/tri-calibracao.json" target="_blank" rel="noopener">Cobertura por edição ↗</a></p>
    </details>`;
  }

  function bindAnswerSheet() {
    const $ = id => document.getElementById(id);
    const form = $('enemTriForm');
    if (!form || form.onsubmit) return;
    const year = $('enemTriYear'), area = $('enemTriArea'), language = $('enemTriLanguage');
    const result = $('enemTriManualResult');
    const list = () => [...byId.values()].filter(q => q.year === Number(year.value) &&
      q.application === 'regular' && q.source?.booklet === 'azul' && areaOf(q) === area.value &&
      (!q.language || q.language === language.value)).sort((a, b) => a.index - b.index);
    function describe() {
      const questions = list();
      $('enemTriLanguageField').hidden = area.value !== 'linguagens';
      $('enemTriPositions').textContent = questions.length === 45
        ? `Questões ${questions[0].index} a ${questions.at(-1).index} do caderno.`
        : 'Escolhe um caderno com a área completa.';
      result.innerHTML = '';
    }
    for (const field of [year, area, language]) field.onchange = describe;
    $('enemTriAnswers').oninput = () => { result.innerHTML = ''; };
    form.onsubmit = event => {
      event.preventDefault();
      const questions = list();
      const text = $('enemTriAnswers').value.toUpperCase().replace(/[\s,;]+/g, '');
      if (questions.length !== 45 || !/^[A-E-]{45}$/.test(text)) {
        result.textContent = 'Inclui 45 posições com letras de A a E ou um hífen para cada questão em branco.';
        return;
      }
      const answers = Object.fromEntries(questions.map((q, i) => [q.id, text[i]]));
      const valid = questions.filter(gradable);
      const correct = valid.filter(q => answers[q.id] === q.answer).length;
      result.innerHTML = `<p><strong>${correct}/${valid.length} acertos</strong> nas questões válidas.</p>` +
        cards(report(questions.map(q => q.id), answers));
    };
    describe();
  }

  function renderPerformance(progress, space) {
    const overview = document.getElementById('enemTriOverview');
    if (!overview) return;
    overview.innerHTML = cards(fromProgress(progress, space));
    const explanation = document.getElementById('enemTriMethod');
    if (explanation && !explanation.innerHTML) explanation.innerHTML = method();
    bindAnswerSheet();
  }

  globalThis.FurgEnemTri = { areas, levels, get, gradable, areaOf, report, fromProgress, cards, method, renderPerformance };
})();
