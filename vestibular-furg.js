'use strict';
// Vestibular FURG · simulado completo (Versão B): 14 matérias + 2 discursivas, 100 pontos.
(() => {
 const ALL = globalThis.FURG_VESTIBULARES || (globalThis.FURG_VESTIBULAR ? [globalThis.FURG_VESTIBULAR] : []), FIG = globalThis.FURG_VEST_FIGS || {};
 if (!ALL.length) return;
 const byId = id => ALL.find(v => v.id === id) || ALL[0];
 let D = ALL[0], DISC = D.discursivas?.items || [];
 const use = id => { D = byId(id); DISC = D.discursivas?.items || []; return D; };
 const KEY = 'furg-vestibular-v1', L = 'ABCDE';
 const $ = id => document.getElementById(id);
 const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 const md = s => esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
 const paras = s => String(s).split('\n').map(p => `<p>${esc(p)}</p>`).join('');
 // As discursivas de cada versão também entram na aba Discursivas FURG (uma lista por versão).
 for (const v of ALL) {
  const items = v.discursivas?.items || [], list = 'simulado-' + v.id;
  if (!globalThis.FURG_DISCURSIVAS?.items || !items.length || globalThis.FURG_DISCURSIVAS.items.some(d => d.id === items[0].id)) continue;
  (globalThis.FURG_LISTAS ||= []).push({id: list, s: 'linguagens', mode: 'discursivas', title: v.title, detail: 'Discursivas do simulado alternativo · 10 pontos cada'});
  for (const d of items) globalThis.FURG_DISCURSIVAS.items.push({id: d.id, s: 'linguagens', list, n: d.n, kind: d.kind, title: d.title, texts: d.texts, cmd: d.cmd, expect: d.expect, traps: d.traps, model: d.model});
 }

 const load = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); return v && typeof v === 'object' ? v : {active: null, history: []}; } catch { return {active: null, history: []}; } };
 let st = load();
 st.history = (Array.isArray(st.history) ? st.history.slice(-20) : []).map(h => ({v: ALL[0].id, ...h}));
 if (st.active && !st.active.v) st.active.v = ALL[0].id;
 const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch {} };
 let view = 'intro', timer = null, reviewing = null;
 const sectionsFor = lang => D.sections.filter(s => !s.lang || s.lang === lang);
 const perLine = 75, lineCount = v => String(v || '').split('\n').reduce((n, p) => n + (p.trim() ? Math.max(1, Math.ceil(p.length / perLine)) : 0), 0);
 const fmtTime = ms => { const t = Math.max(0, Math.round(ms / 1000)); return [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60].map((n, i) => i ? String(n).padStart(2, '0') : n).join(':'); };
 const pts = n => n.toLocaleString('pt-BR', {maximumFractionDigits: 1});

 function shell(on) {
  const sec = $('simulados');
  sec?.classList.toggle('vest-open', on);
 }

 function intro() {
  const a = st.active, cur = a ? (use(a.v), [answeredCount(a), totalItems(a.lang)]) : null; use(ALL[0].id);
  const total = sectionsFor('ingles').reduce((n, s) => n + s.questions.length, 0);
  const cards = ALL.map(v => { const last = [...st.history].reverse().find(h => h.v === v.id); const n = st.history.filter(h => h.v === v.id).length;
   return `<article class="vest-card"><div><h3>${esc(v.title)}</h3><p class="muted">${n ? `${n} tentativa${n > 1 ? 's' : ''} · último resultado: ${pts(totalOf(last))} de 100` : 'Ainda não feito'}</p></div>
    <div class="vest-card-actions">${a ? '' : `<button class="primary" data-vest="start" data-v="${esc(v.id)}">Começar →</button>`}${last ? `<button class="quiet" data-vest="last" data-v="${esc(v.id)}">Ver resultado</button>` : ''}<a class="outline" href="${esc(v.pdf)}" download>PDF ↓</a></div></article>`; }).join('');
  return `<section class="panel vest-intro" aria-labelledby="vestTitle">
   <p class="eyebrow">VESTIBULAR FURG · SIMULADOS COMPLETOS</p><h2 id="vestTitle" tabindex="-1">Simulados FURG 2026</h2>
   <p class="muted">Cada versão tem ${total} questões objetivas e 2 discursivas, na mesma divisão de matérias do simulado da FURG. Questões autorais, com figuras, gabarito e resolução comentada.</p>
   <div class="vest-structure">${D.sections.map(s => `<span style="--vf-acc:${s.color}"><i></i>${esc(s.label)}<b>${s.questions.length}</b></span>`).join('')}<span style="--vf-acc:${D.discursivas.color}"><i></i>Discursivas<b>2</b></span></div>
   <p class="vest-score-note"><b>Pontuação:</b> ${esc(D.score.note)}</p>
   ${a ? `<div class="vest-resume"><span>Tens a ${esc(byId(a.v).title)} em andamento · ${cur[0]} de ${cur[1]} respondidas${a.deadline ? ` · ${fmtTime(a.deadline - Date.now())} restantes` : ''}</span><button class="primary" data-vest="resume">Continuar →</button><button class="quiet" data-vest="discard">Descartar</button></div>` : `
   <div class="vest-options">
    <fieldset><legend>Língua estrangeira</legend><label><input type="radio" name="vestLang" value="ingles" checked> Inglês</label><label><input type="radio" name="vestLang" value="espanhol"> Espanhol</label></fieldset>
    <fieldset><legend>Tempo</legend><label><input type="radio" name="vestTime" value="timed" checked> 5h30, como na prova</label><label><input type="radio" name="vestTime" value="free"> Sem tempo</label></fieldset>
   </div>`}
   <div class="vest-cards">${cards}</div>
  </section>`;
 }
 function totalOf(h) { if (!h) return 0; const v = byId(h.v), items = v.discursivas?.items || []; return h.obj + items.reduce((n, d) => n + (h.checks?.[d.id] || []).length * (d.points / d.expect.length), 0); }

 const allQuestions = lang => sectionsFor(lang).flatMap(s => s.questions.map(q => ({s, q})));
 const totalItems = lang => allQuestions(lang).length + DISC.length;
 const answeredCount = a => allQuestions(a.lang).filter(({q}) => a.answers[q.id]).length + DISC.filter(d => lineCount(a.essays?.[d.id]) > 0).length;

 function start(v) {
  use(v);
  const lang = document.querySelector('input[name="vestLang"]:checked')?.value === 'espanhol' ? 'espanhol' : 'ingles';
  const timed = document.querySelector('input[name="vestTime"]:checked')?.value !== 'free';
  st.active = {v: D.id, started: new Date().toISOString(), lang, deadline: timed ? Date.now() + D.minutes * 60000 : null, answers: {}, essays: {}, sec: 0, q: 0};
  save(); view = 'run'; render(true);
 }

 function questionView(a, locked) {
  const secs = sectionsFor(a.lang), onDisc = a.sec >= secs.length;
  const tabs = `<nav class="vest-tabs" aria-label="Matérias">${secs.map((s, i) => { const done = s.questions.filter(q => a.answers[q.id]).length; return `<button data-vest="sec" data-i="${i}" style="--vf-acc:${s.color}" ${i === a.sec ? 'aria-current="true"' : ''}>${esc(s.label)}<small>${done}/${s.questions.length}</small></button>`; }).join('')}<button data-vest="sec" data-i="${secs.length}" style="--vf-acc:${D.discursivas.color}" ${onDisc ? 'aria-current="true"' : ''}>Discursivas<small>${DISC.filter(d => lineCount(a.essays?.[d.id])).length}/${DISC.length}</small></button></nav>`;
  if (onDisc) return tabs + discView(a, locked);
  const s = secs[a.sec], q = s.questions[Math.min(a.q, s.questions.length - 1)], sel = a.answers[q.id];
  const map = `<div class="vest-map">${s.questions.map((x, i) => { const v = a.answers[x.id]; const cls = locked ? (v === x.ans ? 'is-correct' : 'is-wrong') : v ? 'is-done' : ''; return `<button data-vest="q" data-i="${i}" class="${cls}" ${x === q ? 'aria-current="step"' : ''} aria-label="Questão ${x.n}">${x.n}</button>`; }).join('')}</div>`;
  const ctx = (q.text ? `<div class="vf-textbox">${q.textRef ? '<small class="vf-textref">Mesmo texto da questão anterior</small>' : ''}<strong>${esc(q.text.title)}</strong>${paras(q.text.body)}<small>${esc(q.text.source)}</small></div>` : '')
   + (q.ctx ? paras(q.ctx) : '') + (q.fig && FIG[q.fig] ? `<figure class="ex-figure vf-fig">${FIG[q.fig]}</figure>` : '')
   + (q.table ? `<div class="enem-table ex-table"><table><thead><tr>${q.table[0].map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${q.table.slice(1).map(r => `<tr>${r.map((c, i) => i ? `<td>${esc(c)}</td>` : `<th scope="row">${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>` : '');
  const flat = allQuestions(a.lang), pos = flat.findIndex(x => x.q === q);
  const feedback = locked ? `<div class="enem-feedback ${sel === q.ans ? 'correct' : 'wrong'}" role="status"><strong>${sel ? sel === q.ans ? 'Tu acertou!' : `Tu marcou ${sel}. A resposta correta é ${q.ans}.` : `Em branco. A resposta correta é ${q.ans}.`}</strong></div><section class="ex-solution" aria-label="Resolução"><h4>Resolução</h4><p>${esc(q.why)}</p></section>` : '';
  return tabs + map + `<article class="enem-question panel vest-q" data-question-id="${esc(q.id)}" style="--vf-acc:${s.color}">
   <div class="enem-toolbar"><span>${esc(s.label)} · questão ${q.n} · ${pos + 1} de ${flat.length}</span></div>
   ${locked ? `<div class="enem-meta"><span class="tag">${esc(s.label)}</span><span class="tag">${esc(q.t)}</span></div>` : ''}
   <h3 id="vestQTitle" tabindex="-1" class="vest-qn" style="color:${s.color}">${esc(s.label)} ${q.n}</h3>
   <div class="enem-text ex-text">${ctx}<p class="ex-stem">${esc(q.stem)}</p></div>
   <div class="enem-options">${q.opts.map((o, i) => { const l = L[i]; return `<button class="enem-option ${sel === l ? 'selected' : ''} ${locked && l === q.ans ? 'correct' : ''} ${locked && sel === l && l !== q.ans ? 'wrong' : ''}" data-vest="choose" data-letter="${l}" aria-pressed="${sel === l}" ${locked ? 'disabled' : ''}><b>${l}</b><span>${esc(o)}</span></button>`; }).join('')}</div>
   ${feedback}
   <div class="enem-navigation"><button class="quiet" data-vest="prev" ${pos === 0 ? 'disabled' : ''}>← Anterior</button><span class="muted">${locked ? '' : sel ? 'Resposta marcada' : 'Sem resposta'}</span><button class="outline" data-vest="next">${pos === flat.length - 1 ? 'Ir para as discursivas →' : 'Próxima →'}</button></div>
  </article>`;
 }

 function discView(a, locked) {
  return `<section class="vest-disc">${DISC.map(d => { const v = a.essays?.[d.id] || '', n = lineCount(v), cls = !n ? '' : n < D.lines.min ? 'is-short' : n > D.lines.max ? 'is-over' : 'is-ok';
   return `<article class="enem-question panel vest-q" style="--vf-acc:${D.discursivas.color}">
    <div class="enem-toolbar"><span>Discursiva ${d.n} de ${DISC.length} · ${d.points} pontos</span></div>
    <h3 ${d.n === 1 ? 'id="vestQTitle" tabindex="-1"' : ''}>${esc(d.title)}</h3>
    <div class="enem-text ex-text">${d.texts.map(x => `<div class="ex-disc-text"><strong>${esc(x.label)}</strong>${paras(x.body)}</div>`).join('')}</div>
    <div class="ex-disc-cmd"><small>COMANDO</small><p>${md(d.cmd)}</p></div>
    ${locked ? `<div class="vest-essay-done">${v ? paras(v) : '<p class="muted">Sem resposta.</p>'}</div>` : `<label class="enem-answer-label" for="vest-${d.id}">Tua resposta</label><textarea id="vest-${d.id}" class="ex-disc-paper" data-vest-essay="${d.id}" rows="10" maxlength="6000" placeholder="Escreve aqui como se fosse na folha de resposta…">${esc(v)}</textarea>`}
    <div class="ex-disc-meter"><strong class="vest-lines ${cls}" data-lines="${d.id}">${n ? `≈ ${n} de ${D.lines.max} linhas` : `0 de ${D.lines.max} linhas`}</strong><small>Mínimo ${D.lines.min}, máximo ${D.lines.max} · ≈ ${perLine} caracteres por linha da folha.</small></div>
   </article>`; }).join('')}
   ${locked ? '' : `<div class="vest-finish-box panel"><p>Terminou? Ao finalizar, tu vê a nota das objetivas e corrige as discursivas com os critérios da banca.</p><button class="primary" data-vest="finish">Finalizar simulado</button></div>`}</section>`;
 }

 function run() {
  const a = st.active;
  return `<div class="vest-run"><div class="vest-top panel"><strong>${esc(D.title)}</strong><span id="vestCount">${answeredCount(a)} de ${totalItems(a.lang)} respondidas</span>${a.deadline ? '<span class="vest-timer" id="vestTimer"></span>' : '<span class="muted">Sem tempo</span>'}<button class="quiet" data-vest="pause">Sair e continuar depois</button><button class="primary" data-vest="finish">Finalizar</button></div>${questionView(a, false)}</div>`;
 }

 function finish(auto) {
  const a = st.active; if (!a) return;
  if (!auto && !confirm('Finalizar o simulado agora? Tu não poderá mudar as respostas depois.')) return;
  const bySec = {}; let obj = 0;
  for (const s of sectionsFor(a.lang)) { const c = s.questions.filter(q => a.answers[q.id] === q.ans).length; bySec[s.id] = [c, s.questions.length]; obj += c; }
  st.history.push({v: D.id, date: new Date().toISOString(), lang: a.lang, answers: a.answers, essays: a.essays || {}, checks: {}, obj, bySec, auto: !!auto});
  st.history = st.history.slice(-20); st.active = null; save();
  reviewing = st.history.length - 1; view = 'result'; render(true);
 }

 function discScore(h, d) { return (h.checks?.[d.id] || []).length * (d.points / d.expect.length); }
 function result() {
  const h = st.history[reviewing]; if (!h) { view = 'intro'; return intro(); }
  const secs = sectionsFor(h.lang), disc = DISC.reduce((n, d) => n + discScore(h, d), 0), total = h.obj + disc;
  return `<section class="panel vest-result" aria-labelledby="vestResTitle">
   <p class="eyebrow">${esc(D.title)} · RESULTADO · ${new Date(h.date).toLocaleDateString('pt-BR')}${h.auto ? ' · tempo esgotado' : ''}</p>
   <h2 id="vestResTitle" tabindex="-1">${pts(total)} de 100 pontos</h2>
   <div class="vest-score"><span>Objetivas<b>${h.obj}/80</b></span>${DISC.map(d => `<span>Discursiva ${d.n}<b data-disc-score="${d.id}">${pts(discScore(h, d))}/10</b></span>`).join('')}<span>Idioma<b>${h.lang === 'ingles' ? 'Inglês' : 'Espanhol'}</b></span></div>
   <div class="vest-bars">${secs.map(s => { const [c, t] = h.bySec[s.id] || [0, s.questions.length]; return `<div class="vest-bar" style="--vf-acc:${s.color}"><span>${esc(s.label)}</span><div><i style="width:${c / t * 100}%"></i></div><b>${c}/${t}</b></div>`; }).join('')}</div>
   <div class="vest-actions"><button class="primary" data-vest="review">Revisar as objetivas</button><a class="outline" href="${esc(D.pdf)}" download>Baixar PDF com gabarito ↓</a><button class="quiet" data-vest="home">Voltar</button></div>
  </section>
  <section class="vest-disc-review"><h3>Corrige tuas discursivas</h3><p class="muted">Cada critério atendido vale 2,5 pontos. Seja rigoroso: compara com a resposta modelo só depois de marcar.</p>
   ${DISC.map(d => { const v = h.essays?.[d.id] || '', n = lineCount(v), out = n && (n < D.lines.min || n > D.lines.max); return `<article class="panel vest-disc-card" style="--vf-acc:${D.discursivas.color}"><h4>Discursiva ${d.n} · ${esc(d.title)}</h4>
    <div class="vest-essay-done">${v ? paras(v) : '<p class="muted">Sem resposta: nota zero.</p>'}</div>
    <p class="vest-lines ${!n ? '' : out ? 'is-over' : 'is-ok'}">≈ ${n} linhas${out ? ' · fora do limite de 5 a 10 linhas: na prova, a nota cai muito ou é zerada.' : ''}</p>
    <ul class="ex-disc-checks">${d.expect.map((x, i) => `<li><label><input type="checkbox" data-vest-check="${d.id}" data-i="${i}" ${(h.checks?.[d.id] || []).includes(i) ? 'checked' : ''} ${v ? '' : 'disabled'}> <span>${esc(x)} <b>(2,5)</b></span></label></li>`).join('')}</ul>
    <div class="ex-trap"><strong>Erros que derrubam a nota</strong><ul>${d.traps.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <details class="ex-disc-model"><summary>Resposta modelo</summary><p>${esc(d.model)}</p></details></article>`; }).join('')}
  </section>`;
 }

 function render(focus) {
  const root = $('vestFurgRoot'); if (!root) return;
  clearInterval(timer);
  if (view === 'run' && !st.active) view = 'intro';
  if (view === 'run') use(st.active.v); else if ((view === 'result' || view === 'review') && st.history[reviewing]) use(st.history[reviewing].v); else use(ALL[0].id);
  shell(view !== 'intro');
  if (view === 'intro') root.innerHTML = intro();
  else if (view === 'run') root.innerHTML = run();
  else if (view === 'review') { const h = st.history[reviewing]; root.innerHTML = h ? `<div class="vest-run"><div class="vest-top panel"><strong>Revisão · ${h.obj}/80 nas objetivas</strong><button class="quiet" data-vest="result">← Voltar ao resultado</button></div>${questionView({...h, sec: h.sec || 0, q: h.q || 0}, true)}</div>` : intro(); }
  else root.innerHTML = result();
  if (view === 'run' || view === 'review') {
   const h = view === 'run' ? st.active : st.history[reviewing];
   const s = sectionsFor(h.lang)[h.sec || 0], q = s?.questions[h.q || 0];
   if (q && view === 'run') globalThis.FurgElimination?.decorate(root, {scope: 'vestibular', id: q.id, selector: '[data-vest="choose"]', selected: h.answers[q.id], locked: false, onClear: () => { delete h.answers[q.id]; save(); render(); }});
  }
  if (view === 'run' && st.active.deadline) {
   const tick = () => { const left = st.active?.deadline - Date.now(); const el = $('vestTimer'); if (el) el.textContent = '⏱ ' + fmtTime(left); if (left <= 0) { clearInterval(timer); finish(true); } };
   tick(); timer = setInterval(tick, 1000);
  }
  if (focus) { const t = $('vestQTitle') || $('vestResTitle') || $('vestTitle'); t?.focus({preventScroll: true}); root.scrollIntoView({block: 'start', behavior: globalThis.FurgUI?.reducedMotion?.() ? 'auto' : 'smooth'}); }
 }

 function move(h, delta) {
  const flat = allQuestions(h.lang), secs = sectionsFor(h.lang);
  if ((h.sec || 0) >= secs.length) { if (delta < 0) { h.sec = secs.length - 1; h.q = secs.at(-1).questions.length - 1; } return; }
  const cur = flat.findIndex(x => x.s === secs[h.sec || 0] && x.q === secs[h.sec || 0].questions[h.q || 0]), next = cur + delta;
  if (next >= flat.length) { h.sec = secs.length; h.q = 0; return; }
  const t = flat[Math.max(0, next)]; h.sec = secs.indexOf(t.s); h.q = t.s.questions.indexOf(t.q);
 }

 document.addEventListener('click', e => {
  const b = e.target.closest?.('[data-vest]'); if (!b || !$('vestFurgRoot')?.contains(b)) return;
  const act = b.dataset.vest, a = st.active, h = view === 'review' ? st.history[reviewing] : a;
  if (h?.v) use(h.v);
  if (act === 'start') return start(b.dataset.v);
  if (act === 'resume') { view = 'run'; return render(true); }
  if (act === 'discard') { if (confirm('Descartar o simulado em andamento?')) { st.active = null; save(); render(); } return; }
  if (act === 'pause' || act === 'home') { view = 'intro'; return render(true); }
  if (act === 'last') { const i = st.history.map(x => x.v).lastIndexOf(b.dataset.v || ALL[0].id); reviewing = i < 0 ? st.history.length - 1 : i; view = 'result'; return render(true); }
  if (act === 'finish') return finish(false);
  if (act === 'review') { const x = st.history[reviewing]; x.sec = 0; x.q = 0; view = 'review'; return render(true); }
  if (act === 'result') { view = 'result'; return render(true); }
  if (!h) return;
  if (act === 'sec') { h.sec = Number(b.dataset.i); h.q = 0; if (view === 'run') save(); return render(true); }
  if (act === 'q') { h.q = Number(b.dataset.i); if (view === 'run') save(); return render(true); }
  if (act === 'prev' || act === 'next') { move(h, act === 'next' ? 1 : -1); if (view === 'run') save(); return render(true); }
  if (act === 'choose' && view === 'run') {
   const s = sectionsFor(a.lang)[a.sec], q = s.questions[a.q], l = b.dataset.letter;
   if (a.answers[q.id] === l) delete a.answers[q.id]; else a.answers[q.id] = l;
   save(); render();
  }
 });
 document.addEventListener('input', e => {
  const t = e.target; if (!t.dataset?.vestEssay || !st.active) return;
  use(st.active.v);
  (st.active.essays ||= {})[t.dataset.vestEssay] = t.value; save();
  const n = lineCount(t.value), el = document.querySelector(`[data-lines="${t.dataset.vestEssay}"]`);
  if (el) { el.className = 'vest-lines ' + (!n ? '' : n < D.lines.min ? 'is-short' : n > D.lines.max ? 'is-over' : 'is-ok'); el.textContent = n ? `≈ ${n} de ${D.lines.max} linhas` : `0 de ${D.lines.max} linhas`; }
  const c = $('vestCount'); if (c) c.textContent = `${answeredCount(st.active)} de ${totalItems(st.active.lang)} respondidas`;
 });
 document.addEventListener('change', e => {
  const t = e.target; if (!t.dataset?.vestCheck) return;
  const h = st.history[reviewing]; if (!h) return;
  use(h.v);
  const id = t.dataset.vestCheck, i = Number(t.dataset.i); h.checks ||= {};
  h.checks[id] = (h.checks[id] || []).filter(n => n !== i); if (t.checked) h.checks[id].push(i);
  save();
  const d = DISC.find(x => x.id === id), el = document.querySelector(`[data-disc-score="${id}"]`); if (el) el.textContent = `${pts(discScore(h, d))}/10`;
  const total = h.obj + DISC.reduce((n, x) => n + discScore(h, x), 0), title = $('vestResTitle'); if (title) title.textContent = `${pts(total)} de 100 pontos`;
 });

 function show() { if (view !== 'run' && view !== 'review') view = st.active ? 'run' : 'intro'; render(true); }
 globalThis.FurgVestibular = {show, render, versions: () => ALL.map(v => v.id), questions: () => ALL.flatMap(v => v.sections.flatMap(s => s.questions))};
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => render()); else render();
})();
