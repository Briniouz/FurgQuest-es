'use strict';
/* Consulta da Biblioteca ENEM. Reusa os verbetes do site e os padrões da Anatomia. */
(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const pageSize = 12;
  const groupNames = ['Leitura e língua', 'Literatura e artes', 'Filosofia', 'História', 'Geografia', 'Sociologia', 'Inglês'];
  const philosophy = new Set(['contrato-social', 'banalidade-mal', 'imperativo', 'justo-meio', 'ataraxia', 'razao-instrumental', 'estoicismo', 'epicurismo', 'ceticismo']);
  const geography = new Set(['segregacao', 'globalizacao', 'territorio']);
  const literary = new Set(['escrevivencia', 'antropofagia', 'narrador', 'dialogismo']);
  const preferred = ['Realismo e Naturalismo', 'Racionalismo', 'Iluminismo', 'Empirismo', 'Finalidade', 'Inferência', 'Rubrica', 'Passadismo', 'Comparação e metáfora'];
  const states = {
    conceitos: {query: '', group: '', limit: pageSize},
    comandos: {query: '', group: '', limit: pageSize},
  };

  let pendingData, pendingConcepts, current;
  const bound = new WeakSet();

  function loadData() {
    if (globalThis.FURG_LIBRARY_GUIDE_DATA) return Promise.resolve(globalThis.FURG_LIBRARY_GUIDE_DATA);
    if (pendingData) return pendingData;
    pendingData = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'biblioteca-guia-data.js?v=20261108-clareza';
      script.onload = () => {
        if (globalThis.FURG_LIBRARY_GUIDE_DATA) resolve(globalThis.FURG_LIBRARY_GUIDE_DATA);
        else reject(new Error('Guia indisponível'));
      };
      script.onerror = () => { script.remove(); reject(new Error('Guia indisponível')); };
      document.head.appendChild(script);
    }).catch(error => { pendingData = null; throw error; });
    return pendingData;
  }

  function index(entry) {
    const terms = entry.terms || [];
    return {
      ...entry, terms,
      titleKey: norm(entry.title),
      search: norm([entry.title, entry.group, ...terms, entry.summary, entry.literal, entry.simple, entry.tip, entry.example, ...(entry.people || [])].join(' ')),
    };
  }

  function conceptGroup(entry, topics) {
    if (entry.id.startsWith('topic-')) {
      const group = topics.get(entry.id.slice(6));
      if (group === 'Línguas estrangeiras') return 'Inglês';
      return ['Literatura', 'Artes e cultura'].includes(group) ? 'Literatura e artes' : 'Leitura e língua';
    }
    const id = entry.id.slice(8);
    if (philosophy.has(id)) return 'Filosofia';
    if (geography.has(id)) return 'Geografia';
    if (literary.has(id)) return 'Literatura e artes';
    if (id === 'preconceito-linguistico') return 'Leitura e língua';
    return 'Sociologia';
  }

  function loadConcepts(data) {
    if (pendingConcepts) return pendingConcepts;
    pendingConcepts = globalThis.FurgStudyGuide.ensure().then(entries => {
      const topics = new Map((globalThis.FURG_LANGUAGENS_DATA?.topics || []).map(t => [t.id, t.group]));
      const existing = entries.filter(e => e.kind === 'concepts' && e.id !== 'topic-espanhol').map(e => ({
        ...e, group: conceptGroup(e, topics),
      }));
      const vesp = (globalThis.FURG_VESPERA_DATA?.entries || []).map(e => ({
        title: e.title, group: 'Leitura e língua', terms: e.aliases,
        summary: e.definition, tip: e.recognize, example: e.example, trap: e.difference,
      }));
      const byTitle = new Map();
      for (const entry of [...data.concepts, ...existing, ...vesp]) {
        const key = norm(entry.title);
        if (!byTitle.has(key)) byTitle.set(key, index({...entry, ...data.meanings?.[entry.title]}));
      }
      const rank = title => preferred.includes(title) ? preferred.indexOf(title) : preferred.length;
      return [...byTitle.values()].sort((a, b) => rank(a.title) - rank(b.title) || a.title.localeCompare(b.title, 'pt-BR'));
    }).catch(error => { pendingConcepts = null; throw error; });
    return pendingConcepts;
  }

  function search(items, value, group = '') {
    const query = norm(value);
    const words = query.split(' ').filter(Boolean);
    const score = entry => {
      if (!query) return 0;
      if (entry.titleKey === query) return 4;
      if (entry.titleKey.startsWith(query + ' ')) return 3;
      if (entry.terms.some(term => norm(term) === query)) return 2;
      return entry.titleKey.includes(query) ? 1 : 0;
    };
    return items.filter(entry => (!group || entry.group === group) && words.every(w => entry.search.includes(w)))
      .sort((a, b) => score(b) - score(a));
  }

  function relatedTo(entry, person) {
    const name = norm(person.name);
    if (entry.people?.some(personName => norm(personName) === name)) return true;
    const tags = new Set([person.movement, ...person.concepts].map(norm));
    return tags.has(entry.titleKey) || entry.terms.some(term => tags.has(norm(term)));
  }

  function sources(items) {
    return (items || []).filter(s => /^https:\/\/[^\s<>"']+$/.test(s.url)).map(s =>
      `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a>`).join('');
  }

  function referenceCard(entry, context) {
    const people = (entry.people || []).map(name => context.people.get(norm(name))).filter(Boolean);
    const exact = entry.titleKey === norm(context.filters.query);
    return `<article class="panel knowledge-study-card">
      ${entry.group ? `<p class="eyebrow">${esc(entry.group)}</p>` : ''}
      <h3>${esc(entry.title)}</h3>
      ${entry.simple ? `<dl class="knowledge-study-meanings">
        <div><dt>Em palavras simples</dt><dd>${esc(entry.simple)}</dd></div>
        <div><dt>Sentido literal</dt><dd>${esc(entry.literal)}</dd></div>
      </dl>` : `<p>${esc(entry.summary)}</p>`}
      <div class="knowledge-study-tip"><strong>Na prova</strong><p>${esc(entry.tip)}</p></div>
      <details ${exact ? 'open' : ''}>
        <summary>${entry.simple ? 'Ver definição e exemplo' : 'Ver exemplo'}</summary>
        ${entry.simple ? `<p><b>Definição</b> ${esc(entry.summary)}</p>` : ''}
        <p><b>Exemplo autoral</b> ${esc(entry.example)}</p>
        ${entry.exampleExplanation && entry.exampleExplanation !== entry.tip ? `<p>${esc(entry.exampleExplanation)}</p>` : ''}
        ${entry.trap ? `<p><b>Como distinguir</b> ${esc(entry.trap)}</p>` : ''}
      </details>
      ${people.length ? `<div class="knowledge-study-people" aria-label="Figuras para estudar junto">${people.map(p =>
        `<button type="button" class="quiet" data-knowledge-profile="${p.id}">${esc(p.name)} ↗</button>`).join('')}</div>` : ''}
      ${entry.sources?.length ? `<div class="knowledge-study-links">${sources(entry.sources.slice(0, 2))}</div>` : ''}
    </article>`;
  }

  function results(context) {
    const {root, entries, profile, filters} = context;
    const candidates = profile ? entries.filter(e => relatedTo(e, profile)) : entries;
    const found = search(candidates, filters.query, filters.group);
    const visible = found.slice(0, filters.limit);
    root.querySelector('#knowledgeStudyCount').textContent =
      `${found.length} ${found.length === 1 ? 'resultado' : 'resultados'} · mostrando ${visible.length}`;
    root.querySelector('#knowledgeStudyResults').innerHTML = visible.length
      ? visible.map(e => referenceCard(e, context)).join('')
      : '<p>Nenhum resultado com esse filtro. Tenta uma palavra mais curta ou volta à consulta completa.</p>';
    root.querySelector('[data-study-more]').hidden = visible.length >= found.length;
  }

  function renderReferences(context) {
    const {root, tab, profile, filters, data} = context;
    const concepts = tab === 'conceitos';
    const title = profile ? 'Conceitos ligados a ' + profile.name : concepts ? 'Conceitos do primeiro dia' : 'O que o comando quer dizer?';
    const intro = concepts
      ? 'Revisa correntes, movimentos, termos de interpretação e ideias de Humanas. Cada verbete traz uma explicação simples, o sentido literal e uma pista para reconhecer o conceito na prova.'
      : 'Procura o verbo ou a expressão que te travou. Cada cartão traduz o pedido, mostra onde olhar e dá um exemplo curto.';
    root.innerHTML = `<section class="knowledge-study-section" aria-labelledby="knowledgeStudyTitle">
      <h2 id="knowledgeStudyTitle">${esc(title)}</h2><p>${intro}</p>
      ${profile ? '<button type="button" class="outline" data-study-unscope>Ver todos os conceitos</button>' : ''}
      <div class="knowledge-study-controls panel">
        <label class="knowledge-search" for="knowledgeStudySearch">
          ${concepts ? 'Busca um conceito, termo ou figura' : 'Busca uma palavra do comando'}
          <input type="search" id="knowledgeStudySearch" autocomplete="off" value="${esc(filters.query)}"
            placeholder="${concepts ? 'Realismo, racionalismo, iluminismo…' : 'Pressupõe-se, destaca-se, respectivamente…'}">
        </label>
        ${concepts ? `<label class="knowledge-select" for="knowledgeStudyArea">Área
          <select id="knowledgeStudyArea"><option value="">Todas</option>${groupNames.map(g =>
            `<option ${g === filters.group ? 'selected' : ''}>${esc(g)}</option>`).join('')}</select>
        </label>` : ''}
      </div>
      <p id="knowledgeStudyCount" class="knowledge-count" role="status" aria-live="polite"></p>
      <div id="knowledgeStudyResults" class="knowledge-study-grid"></div>
      <button type="button" class="outline thinkers-load" data-study-more hidden>Mostrar mais ↓</button>
      <details class="panel knowledge-method"><summary>Fontes para aprofundar</summary>
        <div class="knowledge-study-links">${sources(data.sources)}</div>
      </details>
    </section>`;
    results(context);
  }

  function patterns() {
    const anatomy = globalThis.FURG_ENEM_ANATOMY_DATA;
    const bank = new Map((globalThis.FURG_ENEM_DATA?.questions || []).map(q => [q.id, q]));
    const areas = new Set(['linguagens', 'ciencias-humanas']);
    const sample = (anatomy?.questions || []).filter(({id}) => {
      const q = bank.get(id);
      return q && areas.has(q.area) && q.language !== 'espanhol' && q.application === anatomy.scope.application
        && !q.canceled && !q.quality?.blocked;
    });
    const counts = new Map();
    for (const item of sample) counts.set(item.pattern, (counts.get(item.pattern) || 0) + 1);
    const rows = (anatomy?.patterns || []).map(p => ({...p, count: counts.get(p.id) || 0}))
      .sort((a, b) => b.count - a.count);
    return {scope: anatomy?.scope, bank, sample, rows};
  }

  function renderPatterns(context) {
    const {root, data} = context;
    const {scope, bank, sample, rows} = patterns();
    const period = scope ? `${scope.firstYear}–${scope.lastYear}` : '';
    root.innerHTML = `<section class="knowledge-study-section" aria-labelledby="knowledgeStudyTitle">
      <h2 id="knowledgeStudyTitle">O que a questão costuma pedir</h2>
      <div class="panel knowledge-study-routine">
        <h3>Como ler o comando</h3>
        <ol>
          <li><b>Marca o pedido.</b> Se for finalidade, pergunta “pra quê?”. Se for consequência, pergunta “o que mudou?”.</li>
          <li><b>Recorta o alvo.</b> Confere quem fala, qual texto vale e palavras como “principalmente”, “imediata” e “respectivamente”.</li>
          <li><b>Testa a evidência.</b> Lê a alternativa inteira e localiza a pista que sustenta cada parte dela.</li>
        </ol>
        <p>Se uma alternativa for verdadeira, relê o pedido e confere se ela responde à pergunta feita.</p>
      </div>
      ${sample.length ? `<p>Os cartões estão ordenados pelo padrão principal atribuído a ${sample.length} questões do primeiro dia no acervo, em aplicações regulares de ${period}, com Inglês.</p>` : ''}
      <div class="knowledge-study-grid">${rows.map(p => {
        const id = data.cases[p.id], q = bank.get(id);
        const item = sample.find(row => row.id === id && row.pattern === p.id);
        return `<article class="panel knowledge-study-card">
          <p class="eyebrow">${p.count} ${p.count === 1 ? 'ITEM' : 'ITENS'} NO RECORTE</p>
          <h3>${esc(p.title)}</h3><p>${esc(p.cue)}</p>
          <div class="knowledge-study-tip"><strong>Primeiro passo</strong><p>${esc(p.firstStep)}</p></div>
          <p class="knowledge-study-trap"><b>Erro comum</b> ${esc(p.trap)}</p>
          ${item && q ? `<p><b>Exemplo real</b> ENEM ${q.year} · questão ${q.index}. ${esc(item.command)}</p>
            <button type="button" class="outline" data-study-question="${esc(q.id)}">Abrir questão ↗</button>` : ''}
        </article>`;
      }).join('')}</div>
      <div class="knowledge-study-links">
        <a href="#anatomia" data-knowledge-anatomy>Ver o levantamento completo na Anatomia ENEM ↗</a>
        ${sources(data.sources.slice(0, 1))}
      </div>
    </section>`;
  }

  function bind(root) {
    if (bound.has(root)) return;
    bound.add(root);
    root.addEventListener('input', event => {
      if (event.target.id !== 'knowledgeStudySearch') return;
      current.filters.query = event.target.value;
      current.filters.limit = pageSize;
      results(current);
    });
    root.addEventListener('change', event => {
      if (event.target.id !== 'knowledgeStudyArea') return;
      current.filters.group = event.target.value;
      current.filters.limit = pageSize;
      results(current);
    });
    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.hasAttribute('data-study-more')) {
        current.filters.limit += pageSize;
        results(current);
      } else if (button.hasAttribute('data-study-unscope')) {
        current.profile = null;
        current.filters = states.conceitos;
        renderReferences(current);
        root.querySelector('#knowledgeStudySearch').focus();
      } else if (button.hasAttribute('data-study-retry')) {
        open(root, current.tab, [...current.people.values()], current.profile);
      } else if (button.dataset.studyQuestion) {
        const id = button.dataset.studyQuestion;
        globalThis.FurgEnem?.practice([id], 'Biblioteca ENEM · Como cai', id, 'biblioteca');
      }
    });
  }

  async function open(root, tab, people, profile = null) {
    const context = {
      root, tab, profile, people: new Map(people.map(p => [norm(p.name), p])),
      filters: profile ? {query: '', group: '', limit: pageSize} : states[tab],
    };
    current = context;
    bind(root);
    root.innerHTML = '<p class="panel knowledge-loading" role="status">Abrindo o guia da biblioteca…</p>';
    try {
      const data = await loadData();
      const entries = tab === 'conceitos' ? await loadConcepts(data) : data.commands.map(index);
      if (context !== current || root.hidden) return;
      Object.assign(context, {data, entries});
      if (tab === 'como-cai') renderPatterns(context);
      else renderReferences(context);
      if (profile && document.querySelector('.view.active')?.id === 'biblioteca') {
        const heading = root.querySelector('#knowledgeStudyTitle');
        heading.tabIndex = -1;
        heading.focus();
      }
    } catch {
      if (context !== current || root.hidden) return;
      root.innerHTML = '<div class="panel knowledge-empty"><p>O guia não carregou. Tenta abrir de novo.</p><button type="button" class="outline" data-study-retry>Tentar novamente</button></div>';
    }
  }

  async function lookup(question) {
    const original = norm(question);
    const term = original
      .replace(/^(?:o que (?:e|significa)|qual o significado de|significado de|define|defina|me explica|explique) /, '')
      .replace(/ (?:no enem|na prova|por favor)$/, '');
    if (!original) return null;
    const data = await loadData();
    const entries = [...await loadConcepts(data), ...data.commands.map(index)];
    for (const query of [original, term]) {
      const exact = entries.find(entry => entry.titleKey === query ||
        entry.title.split(' / ').some(title => norm(title) === query));
      if (exact) return exact;
    }
    const combined = entries.filter(entry =>
      entry.titleKey.startsWith(term + ' e ') || entry.titleKey.endsWith(' e ' + term));
    if (combined.length === 1) return combined[0];
    const aliases = entries.filter(entry => entry.terms.some(alias => norm(alias) === term));
    return aliases.length === 1 ? aliases[0] : null;
  }

  globalThis.FurgLibraryGuide = {open, loadConcepts, search, patterns, lookup};
})();
