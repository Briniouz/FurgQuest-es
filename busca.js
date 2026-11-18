'use strict';
/* Busca universal: acha páginas, aulas, fórmulas, leituras e questões e abre o lugar certo.
   Atalhos: Ctrl/⌘ + K, "/" ou o botão Busca. */
(() => {
 const $ = id => document.getElementById(id);
 const RECENT_KEY = 'furg-busca-recentes';
 const norm = value => String(value ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
 const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
 const areaLabel = {
  linguagens: 'Linguagens', 'ciencias-humanas': 'Ciências Humanas', 'ciencias-natureza': 'Ciências da Natureza',
  matematica: 'Matemática', interdisciplinar: 'Interdisciplinar',
 };
 const groupTitle = {
  recente: 'Recentes', atalho: 'Atalhos', pagina: 'Páginas e ferramentas', aula: 'Aulas',
  conceito: 'Fórmulas e conceitos', leitura: 'Leituras e repertórios', questao: 'Questões do ENEM',
  procurar: 'Não achou? Procura em…',
 };
 const order = ['pagina', 'aula', 'conceito', 'leitura', 'questao'];
 const perGroup = 5;
 let index = null, questions = null, dialog, field, listEl, statusEl, hintEl;
 let rows = [], active = -1, returnFocus = null, keepFocus = false;

 /* ---------- índice ---------- */
 function item(type, title, detail, crumb, path, icon, extra = '') {
  return {type, title, detail, crumb, path, icon, tHay: norm(title), hay: norm([title, detail, crumb, extra].join(' '))};
 }
 function build() {
  const S = globalThis.FurgStudyAreas, out = [], seen = new Set();
  if (!S) return out;
  const spaces = [['geral', 'Geral'], ['dia-1', 'Dia 1'], ['dia-2', 'Dia 2'], ['engenharias', 'Engenharias']];
  const hubs = {geral: 'Visão geral', 'dia-1': 'Painel do Dia 1 · Linguagens, Humanas e Redação',
   'dia-2': 'Painel do Dia 2 · Matemática e Natureza', engenharias: 'Painel de Engenharias'};
  out.push(item('pagina', 'Início', 'Escolhe por onde começar', 'Site', 'inicio', '⌂'));
  for (const [space, label] of spaces) {
   out.push(item('pagina', hubs[space], 'Tudo da área organizado em Estudar, Praticar, Provas e Revisar', label, space, '◈'));
   for (const [group, list] of Object.entries(S.menusFor(space))) {
    for (const [page, title, detail, icon] of list) {
     const path = S.routeFor(space, page), key = norm(title);
     if (seen.has(path) || seen.has(key)) continue;
     seen.add(path); seen.add(key);
     out.push(item('pagina', title, detail, label + ' › ' + S.groups[group], path, icon));
    }
   }
  }
  out.push(item('pagina', 'Configurações', 'Tema, design, atalhos e acessibilidade', 'Site', 'configuracoes', '⚙', 'preferencias aparencia escuro claro liquid glass vidro prisma'));
  const subjects = globalThis.FURG_DIA2_GUIDE?.subjects || {};
  for (const [subject, lessons] of Object.entries(globalThis.FURG_DIA2_LESSONS || {})) {
   for (const lesson of lessons) {
    out.push(item('aula', lesson.title, lesson.lead || '', 'Dia 2 › Aulas › ' + (subjects[subject]?.label || subject),
     'dia-2/aulas/' + subject + '/' + lesson.id, subjects[subject]?.icon || '↗', lesson.card || ''));
   }
  }
  const chapters = Object.fromEntries((globalThis.FURG_ENGINEERING?.chapters || []).map(c => [c.id, c.title]));
  for (const lesson of globalThis.FurgEngineering?.lessons || []) {
   out.push(item('aula', lesson.title, lesson.lead || '', 'Engenharias › Aulas › ' + (chapters[lesson.chapter] || ''),
    'engenharias/aula/' + lesson.id, '∫'));
  }
  for (const entry of globalThis.FURG_DIA2_GUIDE?.entries || []) {
   const row = item('conceito', entry.title, entry.rule || entry.meaning || '',
    'Dia 2 › Fórmulas e conceitos › ' + (subjects[entry.subject]?.label || '') + ' · ' + (entry.topic || ''),
    'dia-2/formulas', 'ƒ', [entry.meaning, entry.when].join(' '));
   row.prefill = entry.title;
   out.push(row);
  }
  for (const level of globalThis.FURG_LEVELUP_DATA || []) {
   out.push(item('pagina', 'Level Up · ' + level.title, 'Nível ' + level.level + ' de Matemática · ' + (level.label || ''),
    'Praticar › Level Up', 'evolucao', '→', 'nivel exercicios progressivos'));
  }
  for (const book of globalThis.FURG_READING_DATA || []) {
   out.push(item('leitura', book.title, (book.author ? book.author + ' · ' : '') + (book.tagline || ''),
    'Dia 1 › Resumos literários', 'leituras', '▥', [book.genre, ...(book.themes || [])].join(' ')));
  }
  for (const rep of globalThis.FURG_VESPERA_REPERTORIES || []) {
   out.push(item('leitura', rep.title, rep.angle || '', 'Dia 1 › Redação e repertórios', 'dia-1/repertorios', '✎', (rep.tags || []).join(' ')));
  }
  return out;
 }
 function questionIndex() {
  if (questions) return questions;
  const subjects = globalThis.FURG_DIA2_GUIDE?.subjects || {};
  questions = (globalThis.FURG_ENEM_DATA?.questions || []).map(q => {
   const area = areaLabel[q.area] || q.area || '';
   const subs = (q.subjects || []).map(s => subjects[s]?.label || s).join(', ');
   const stem = String(q.stem || '').replace(/\s+/g, ' ').trim();
   const row = item('questao', 'ENEM ' + q.year + ' · questão ' + q.index, stem.slice(0, 130) + (stem.length > 130 ? '…' : ''),
    (subs && norm(subs) !== norm(area) ? area + ' · ' + subs : area || subs), '', '▤', '');
   row.hay = norm(['enem', q.year, 'questao', q.index, area, subs, stem.slice(0, 600)].join(' '));
   row.questionId = q.id; row.year = q.year;
   return row;
  });
  return questions;
 }
 const all = () => index || (index = build());

 /* ---------- busca ---------- */
 const termsOf = text => norm(text).split(/[^a-z0-9]+/).filter(Boolean);
 function score(row, terms) {
  let total = 0;
  for (const term of terms) {
   if (!row.hay.includes(term)) return -1;
   const t = row.tHay;
   if (t.split(/[^a-z0-9]+/).includes(term)) total += 32;
   if (t === term) total += 140;
   else if (t.startsWith(term)) total += 100;
   else if (new RegExp('(^|[^a-z0-9])' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(t)) total += 70;
   else if (t.includes(term)) total += 45;
   else total += 12;
  }
  return total - Math.min(row.title.length, 80) / 20 + ({pagina: 8, aula: 6, conceito: 4, leitura: 3, questao: 0}[row.type] || 0);
 }
 function query(text, {limit = 40, questionsToo = true} = {}) {
  const terms = termsOf(text);
  if (!terms.length) return [];
  const pool = [];
  for (const row of all()) { const s = score(row, terms); if (s >= 0) pool.push([s, row]); }
  const found = pool.sort((a, b) => b[0] - a[0]).map(([, row]) => row);
  let more = [];
  if (questionsToo && terms.join('').length >= 3) {
   const qs = [];
   for (const row of questionIndex()) { const s = score(row, terms); if (s >= 0) qs.push([s, row]); }
   more = qs.sort((a, b) => b[0] - a[0] || b[1].year - a[1].year).map(([, row]) => row);
   more.total = more.length;
  }
  const limited = found.slice(0, limit);
  limited.questions = more;
  return limited;
 }

 /* ---------- abrir ---------- */
 const recent = () => { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; } };
 function remember(row) {
  if (!row.path && !row.questionId) return;
  const entry = {type: row.type, title: row.title, detail: row.detail, crumb: row.crumb, path: row.path, icon: row.icon,
   prefill: row.prefill, questionId: row.questionId};
  const list = [entry, ...recent().filter(x => !(x.title === entry.title && x.path === entry.path && x.questionId === entry.questionId))].slice(0, 6);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
 }
 function fill(term, tries = 0) {
  const view = document.querySelector('.view.active');
  const box = view && [...view.querySelectorAll('input[type="search"], input[type="text"]')]
   .find(el => !el.closest('[hidden]') && el.offsetParent !== null && !el.disabled);
  if (!box) { if (tries < 24) requestAnimationFrame(() => fill(term, tries + 1)); return; }
  const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  set.call(box, term);
  box.dispatchEvent(new Event('input', {bubbles: true}));
  box.dispatchEvent(new Event('change', {bubbles: true}));
  box.scrollIntoView({block: 'center', behavior: globalThis.FurgUI?.reducedMotion?.() ? 'auto' : 'smooth'});
 }
 function go(path, prefill) {
  const link = document.createElement('a');
  link.href = '#' + path; link.dataset.studyRoute = path; link.hidden = true;
  document.body.append(link); link.click(); link.remove();
  if (prefill) fill(prefill);
 }
 function open(row) {
  if (!row) return;
  keepFocus = true;
  if (dialog?.open) dialog.close();
  keepFocus = false;
  if (row.type === 'perguntar') {
   globalThis.FurgQuickLookup?.open(row.term);
   $('quickLookupSubmit')?.click();
   return;
  }
  remember(row);
  if (row.questionId) { globalThis.FurgEnem?.openQuestion(row.questionId); return; }
  go(row.path, row.prefill);
 }

 /* ---------- interface ---------- */
 function ensureDialog() {
  if (dialog) return;
  dialog = document.createElement('dialog');
  dialog.id = 'siteSearch'; dialog.className = 'site-search';
  dialog.setAttribute('aria-label', 'Busca no site');
  dialog.innerHTML = `<div class="site-search-box">
   <div class="site-search-field"><span aria-hidden="true">⌕</span>
    <input id="siteSearchInput" type="search" role="combobox" aria-expanded="true" aria-controls="siteSearchList" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="Busca aulas, fórmulas, questões, ferramentas…">
    <button type="button" class="site-search-close" aria-label="Fechar busca">esc</button></div>
   <div id="siteSearchList" class="site-search-list" role="listbox" aria-label="Resultados"></div>
   <p id="siteSearchStatus" class="sr-only" role="status" aria-live="polite"></p>
   <footer class="site-search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Ctrl</kbd><kbd>K</kbd> abre de qualquer lugar</span></footer></div>`;
  document.body.append(dialog);
  field = $('siteSearchInput'); listEl = $('siteSearchList'); statusEl = $('siteSearchStatus');
  field.addEventListener('input', () => render(field.value));
  dialog.addEventListener('keydown', event => {
   event.stopPropagation();
   if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    if (!rows.length) return;
    move((active + (event.key === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length);
   } else if (event.key === 'Enter') {
    event.preventDefault();
    open(rows[Math.max(active, 0)]);
   } else if (event.key === 'Home' && event.ctrlKey) { move(0); event.preventDefault(); }
  });
  dialog.addEventListener('click', event => {
   if (event.target === dialog || event.target.closest('.site-search-close')) { dialog.close(); return; }
   const el = event.target.closest('[data-row]');
   if (el) open(rows[Number(el.dataset.row)]);
  });
  dialog.addEventListener('mousemove', event => {
   const el = event.target.closest('[data-row]');
   if (el && Number(el.dataset.row) !== active) move(Number(el.dataset.row), false);
  });
  dialog.addEventListener('close', () => {
   $('quickLookupLauncher')?.setAttribute('aria-expanded', 'false');
   if (!keepFocus && returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
  });
 }
 function mark(title, terms) {
  const plain = norm(title);
  if (plain.length !== title.length) return esc(title);
  const ranges = [];
  for (const term of terms) {
   let at = plain.indexOf(term);
   while (at !== -1) { ranges.push([at, at + term.length]); at = plain.indexOf(term, at + term.length); }
  }
  if (!ranges.length) return esc(title);
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) { const last = merged.at(-1); if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else merged.push([...r]); }
  let html = '', pos = 0;
  for (const [from, to] of merged) { html += esc(title.slice(pos, from)) + '<mark>' + esc(title.slice(from, to)) + '</mark>'; pos = to; }
  return html + esc(title.slice(pos));
 }
 function shortcutRows() {
  const wanted = ['dia-2/aulas', 'enem', 'simulados', 'dia-2/formulas', 'engenharias/passo-a-passo', 'desempenho', 'configuracoes'];
  const byPath = new Map();
  for (const r of all()) if (r.type === 'pagina' && !byPath.has(r.path)) byPath.set(r.path, r);
  return wanted.map(p => byPath.get(p)).filter(Boolean).map(r => ({...r, group: 'atalho'}));
 }
 function fallbackRows(text) {
  const t = text.trim();
  const make = (title, path, icon, extra = {}) => ({type: 'procurar', group: 'procurar', title, detail: '“' + t + '”', path, icon, prefill: t, ...extra});
  return [
   make('Questões do ENEM', 'enem', '▤'), make('Questões da FURG', 'banco', '▤'),
   make('Fórmulas e conceitos', 'dia-2/formulas', 'ƒ'), make('Biblioteca ENEM', 'dia-1/biblioteca', '◈'),
   {type: 'perguntar', group: 'procurar', title: 'Perguntar na Consulta rápida', detail: 'Wikipédia ou IA · envia só “' + t + '”', icon: '?', term: t},
  ];
 }
 function render(text = '') {
  const terms = termsOf(text);
  const groups = [];
  if (!terms.length) {
   const list = recent().map(r => ({...r, group: 'recente'}));
   if (list.length) groups.push(['recente', list]);
   groups.push(['atalho', shortcutRows()]);
  } else {
   const found = query(text, {limit: 120});
   for (const type of order) {
    if (type === 'questao') continue;
    const list = found.filter(r => r.type === type).slice(0, perGroup);
    if (list.length) groups.push([type, list.map(r => ({...r, group: type}))]);
   }
   const qs = found.questions || [];
   if (qs.length) {
    const list = qs.slice(0, 4).map(r => ({...r, group: 'questao'}));
    if (qs.length > 4) list.push({type: 'procurar', group: 'questao', title: 'Ver as ' + qs.length + ' questões do ENEM', detail: 'Abre o banco já filtrado por “' + text.trim() + '”',
     path: 'enem', icon: '→', prefill: text.trim()});
    groups.push(['questao', list]);
   }
   if (text.trim().length >= 2) groups.push(['procurar', fallbackRows(text)]);
  }
  rows = []; let html = '';
  for (const [type, list] of groups) {
   html += `<div class="site-search-group" role="presentation"><h3>${esc(groupTitle[type])}</h3>`;
   for (const row of list) {
    const at = rows.push(row) - 1;
    html += `<div class="site-search-row" role="option" id="siteSearchRow${at}" data-row="${at}" aria-selected="false" data-type="${row.type}">
     <span class="site-search-icon" aria-hidden="true">${esc(row.icon || '→')}</span>
     <span class="site-search-text"><strong>${mark(row.title, terms)}</strong><small>${esc(row.crumb ? row.crumb + (row.detail ? ' — ' : '') : '')}${esc(String(row.detail || '').slice(0, 110))}</small></span>
     <i aria-hidden="true">↵</i></div>`;
   }
   html += '</div>';
  }
  if (!rows.length) html = '<p class="site-search-empty">Nada encontrado.</p>';
  listEl.innerHTML = html;
  active = -1;
  if (rows.length) move(0, false);
  const counted = rows.filter(r => r.group !== 'procurar' && r.group !== 'atalho' && r.group !== 'recente').length;
  statusEl.textContent = terms.length ? counted + ' resultados. Use as setas e Enter.' : '';
 }
 function move(to, scroll = true) {
  listEl.querySelector('[aria-selected="true"]')?.setAttribute('aria-selected', 'false');
  active = to;
  const el = $('siteSearchRow' + to);
  if (!el) return;
  el.setAttribute('aria-selected', 'true');
  field.setAttribute('aria-activedescendant', el.id);
  if (scroll) el.scrollIntoView({block: 'nearest'});
 }
 function show(text) {
  ensureDialog();
  if (dialog.open) { if (typeof text === 'string') { field.value = text; render(text); } field.focus(); return true; }
  returnFocus = document.activeElement;
  globalThis.FurgStudyGuide?.close?.();
  field.value = typeof text === 'string' ? text : '';
  render(field.value);
  dialog.showModal();
  $('quickLookupLauncher')?.setAttribute('aria-expanded', 'true');
  field.focus(); field.select();
  return true;
 }
 function typing(target) {
  return target instanceof Element && (target.closest('input, textarea, select, [contenteditable="true"]') || target.isContentEditable);
 }
 document.addEventListener('keydown', event => {
  if (event.defaultPrevented || document.querySelector('dialog[open]:not(#siteSearch)')) return;
  const hotkey = (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k';
  const slash = event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !typing(event.target);
  if (hotkey || slash) { event.preventDefault(); show(); }
 });
 globalThis.FurgSearch = {show, query, open, all, go};
})();
