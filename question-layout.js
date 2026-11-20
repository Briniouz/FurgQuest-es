'use strict';
/* Questões compactas (padrão): letra e espaços menores e, em telas largas, o texto de apoio
   à esquerda e as alternativas à direita, fixas na tela enquanto se lê.
   Vale para o banco do ENEM, a Fuvest e a aba Exercícios. O botão "Ampliar" de cada questão
   (ou Configurações › Questões ampliadas) volta ao formato grande, em uma coluna. */
(() => {
 const HEAD = ['enem-toolbar', 'enem-meta', 'exam-subject-editor'];
 const ANSWER = ['enem-answer-label', 'enem-options', 'enem-submit', 'enem-feedback', 'ex-hint', 'ex-stage-done'];
 const has = (el, list) => list.some(name => el.classList?.contains(name));
 const large = () => document.documentElement.dataset.largeQuestions === 'true';

 function label(button) {
  const on = large();
  button.setAttribute('aria-pressed', String(on));
  button.innerHTML = on ? '<span aria-hidden="true">⤡</span> Compactar' : '<span aria-hidden="true">⤢</span> Ampliar';
  button.title = on ? 'Mostrar a questão compacta, inteira na tela' : 'Mostrar a questão com letra, imagens e alternativas maiores';
 }
 function addToggle(article) {
  const bar = article.querySelector('.enem-toolbar');
  if (!bar || bar.querySelector('[data-q-size]')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'quiet q-size-toggle';
  button.dataset.qSize = '';
  label(button);
  bar.insertBefore(button, bar.lastElementChild);
 }
 function split(article) {
  if (article.hasAttribute('data-no-split') || article.querySelector(':scope > .q-split')) return;
  const kids = [...article.children];
  // Tudo o que vem antes do texto (barra, etiquetas, título, ferramentas) fica no topo, em largura total.
  let start = kids.findIndex(k => k.classList?.contains('enem-text'));
  if (start < 0) { start = 0; while (start < kids.length && (has(kids[start], HEAD) || kids[start].tagName === 'H3')) start++; }
  const firstAnswer = kids.findIndex(k => has(k, ANSWER));
  if (firstAnswer <= start) return;
  const text = kids.slice(start, firstAnswer), answer = kids.filter(k => has(k, ANSWER));
  const wrap = document.createElement('div'), left = document.createElement('div'), right = document.createElement('div');
  wrap.className = 'q-split'; left.className = 'q-col-text'; right.className = 'q-col-answer';
  article.insertBefore(wrap, text[0]);
  left.append(...text); right.append(...answer); wrap.append(left, right);
  // Só vale a pena dividir quando o texto é longo ou tem figura; questões curtas já cabem em uma coluna.
  const tall = !!left.querySelector('img, table') || left.getBoundingClientRect().height > 230;
  if (!tall) return;
  wrap.classList.add('is-tall');
  // O comando da questão fica junto das alternativas: lê-se o texto à esquerda e responde-se à direita.
  const prompt = left.querySelector('.enem-prompt, .ex-stem');
  if (prompt && left.textContent.trim().length - prompt.textContent.trim().length > 40) right.prepend(prompt);
 }
 function prepare(article) {
  if (!article?.classList?.contains('enem-question')) return;
  addToggle(article);
  split(article);
 }
 function scan(nodes) {
  for (const node of nodes) {
   if (node.nodeType !== 1) continue;
   if (node.classList.contains('enem-question')) prepare(node);
   else node.querySelectorAll?.('.enem-question').forEach(prepare);
  }
 }
 new MutationObserver(records => { for (const r of records) scan(r.addedNodes); }).observe(document.body, {childList: true, subtree: true});
 document.querySelectorAll('.enem-question').forEach(prepare);

 document.addEventListener('click', e => {
  const button = e.target.closest('[data-q-size]');
  if (!button) return;
  const next = !large();
  if (!globalThis.FurgSettings?.set('largeQuestions', next)) document.documentElement.dataset.largeQuestions = String(next);
  document.querySelectorAll('[data-q-size]').forEach(label);
 });
 globalThis.FurgQuestionLayout = {prepare, large};
})();
