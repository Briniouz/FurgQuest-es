'use strict';
(() => {
 const guide = globalThis.FURG_DIA2_GUIDE;
 const practice = globalThis.FURG_DIA2_PRACTICE;
 if (!guide || !practice) return;
 const {subjects, entries, commands} = guide;
 const {blocks, questions, official, officialSources} = practice;
 const $ = id => document.getElementById(id);
 const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const norm = value => String(value ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const hasKey = (object,key) => typeof key === 'string' && Object.hasOwn(object,key);
 const confidence = {baixa:'Baixa', media:'Média', alta:'Alta'};
 const categories = {comando:'Leitura do comando', unidade:'Unidade ou conversão', modelo:'Relação ou modelo', calculo:'Conta ou sinal', conceito:'Conceito'};
 const tabs = {plano:'Plano', guia:'Guia', flash:'Flashcards', treino:'Treino', erros:'Meus erros', caderno:'Caderno'};
 const byId = new Map((globalThis.FURG_ENEM_DATA?.questions || []).map(q => [q.id,q]));
 const cardsById = new Map(entries.map(card => [card.id,card]));
 const eligible = id => {
  const q = byId.get(id), item = hasKey(questions,id) && questions[id];
  return !!(item && q && !q.canceled && !q.quality?.blocked && q.answer === item.answer &&
   official[q.year]?.[q.index] === item.answer && globalThis.FurgEnemLayout?.fingerprint(q) === item.fingerprint);
 };
 const route = Object.values(blocks).flatMap(block => block.ids).filter(eligible);
 const sessionKeys = ['percurso', ...Object.keys(blocks), 'revisao'];
 const idsFor = key => key === 'percurso' ? route : blocks[key].ids.filter(eligible);
 const fresh = () => ({sessions:{}, attempts:[], cards:{}, hints:true});
 const emptyDraft = () => ({choice:'', confidence:'', request:'', plan:''});
 const cleanText = (value, size) => typeof value === 'string' ? value.trim().slice(0,size) : '';
 const isChoice = value => typeof value === 'string' && /^[A-E]$/.test(value);
 const timestamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
 const now = () => new Date().toISOString();
 const sessionId = value => typeof value === 'string' && /^[a-z0-9-]{3,70}$/.test(value);
 const entryId = (session,id) => session + '/' + id;
 const pending = session => !!session && session.index < session.ids.length;
 let adapter, bound = false, tab = 'plano', activeKey = 'percurso';
 let subject = 'fisica', topic = '', query = '', highOnly = false;
 let flashIndex = 0, revealed = false, flashReviewOnly = false, draftTimer, quickSubject = '', quickQuery = '';
 const root = () => adapter.getState();
 const state = () => root().dia2;
 const session = () => state().sessions[activeKey];
 const current = () => pending(session()) ? byId.get(session().ids[session().index]) : null;
 const attemptAt = q => state().attempts.find(a => a.id === entryId(session().id,q.id));

 function cleanDraft(value) {
  return {
   choice:isChoice(value?.choice) ? value.choice : '',
   confidence:hasKey(confidence,value?.confidence) ? value.confidence : '',
   request:cleanText(value?.request,500), plan:cleanText(value?.plan,900),
  };
 }

 function validate(value) {
  const result = fresh();
  if (typeof value?.hints === 'boolean') result.hints = value.hints;
  const seen = new Set();
  for (const a of Array.isArray(value?.attempts) ? value.attempts.slice(-1200) : []) {
   if (!a || !eligible(a.questionId) || !sessionId(a.session) || !timestamp(a.date)) continue;
   const draft = cleanDraft(a), id = entryId(a.session,a.questionId), q = byId.get(a.questionId);
   if (!draft.choice || !draft.confidence || seen.has(id)) continue;
   seen.add(id);
   const correct = draft.choice === q.answer;
   result.attempts.push({
    ...draft, id, session:a.session, questionId:q.id, date:a.date,
    updatedAt:timestamp(a.updatedAt) ? a.updatedAt : a.date,
    exposure:a.exposure === 'repeat' ? 'repeat' : 'new', correct,
    category:correct ? '' : hasKey(categories,a.category) ? a.category : questions[q.id].category,
    comment:cleanText(a.comment,1200),
   });
  }
  result.attempts.sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  for (const key of sessionKeys) {
   const s = value?.sessions?.[key];
   if (!s || !sessionId(s.id) || !timestamp(s.date) || !Array.isArray(s.ids) ||
       !s.ids.length || new Set(s.ids).size !== s.ids.length || !s.ids.every(eligible)) continue;
   if (key === 'revisao' ? s.ids.length > 5 : s.ids.join() !== idsFor(key).join()) continue;
   const firstUnanswered = s.ids.findIndex(id => !seen.has(entryId(s.id,id)));
   const max = firstUnanswered < 0 ? s.ids.length : firstUnanswered;
   const index = Math.max(0,Math.min(max,Number.isInteger(s.index) ? s.index : 0));
   result.sessions[key] = {id:s.id, date:s.date, ids:s.ids.slice(), index, draft:index === s.index ? cleanDraft(s.draft) : emptyDraft()};
  }
  for (const card of entries) {
   const mark = value?.cards?.[card.id];
   if (mark && timestamp(mark.date) && ['again','known'].includes(mark.value)) result.cards[card.id] = {value:mark.value,date:mark.date};
  }
  return result;
 }

 function merge(currentValue, incomingValue) {
  const a = validate(currentValue), b = validate(incomingValue);
  const attempts = new Map(a.attempts.map(attempt => [attempt.id,attempt]));
  for (const attempt of b.attempts) {
   const old = attempts.get(attempt.id);
   if (!old || Date.parse(attempt.updatedAt) > Date.parse(old.updatedAt)) attempts.set(attempt.id,attempt);
  }
  const sessions = {...a.sessions}, marks = {...a.cards};
  for (const [key, remote] of Object.entries(b.sessions)) {
   const local = sessions[key];
   if (!local || (local.id === remote.id && remote.index > local.index) ||
       (!pending(local) && Date.parse(remote.date) > Date.parse(local.date))) sessions[key] = remote;
  }
  for (const [id, mark] of Object.entries(b.cards)) {
   if (!marks[id] || Date.parse(mark.date) > Date.parse(marks[id].date)) marks[id] = mark;
  }
  return validate({sessions, cards:marks, attempts:[...attempts.values()].sort((x,y) => Date.parse(x.date) - Date.parse(y.date)), hints:typeof incomingValue?.hints === 'boolean' ? b.hints : a.hints});
 }

 function status(message) {
  const live = $('d2Live');
  if (live) live.textContent = message;
 }

 function write(patch) {
  const previous = state();
  root().dia2 = {...previous,...patch};
  if (adapter.save()) return true;
  root().dia2 = previous;
  status('Não foi possível salvar. Tenta novamente.');
  return false;
 }

 function wasSeen(id) {
  const old = root().enem?.answers?.[id];
  const simulations = root().enemSim;
  return !!(old?.choice || old?.viewed || state().attempts.some(a => a.questionId === id) ||
   simulations?.active?.answers?.[id] || simulations?.history?.some(sim => sim.answers?.[id]));
 }

 function start(key, reviewIds) {
  if (!sessionKeys.includes(key) || !flushDraft()) return false;
  const old = state().sessions[key];
  if (!pending(old)) {
   const ids = key === 'revisao' ? [...new Set(reviewIds || [])].filter(eligible).slice(0,5) : idsFor(key);
   if (!ids.length) return false;
   const id = 'd2-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,10);
   const value = {id,date:now(),ids,index:0,draft:emptyDraft()};
   if (!write({sessions:{...state().sessions,[key]:value}})) return false;
  }
  activeKey = key;
  tab = 'treino';
  render();
  focus('d2Focus');
  return true;
 }

 function formDraft() {
  return cleanDraft({
   choice:$('d2Answer')?.querySelector('input[name="d2Choice"]:checked')?.value,
   confidence:$('d2Confidence')?.value, request:$('d2Request')?.value, plan:$('d2Plan')?.value,
  });
 }

 function flushDraft() {
  clearTimeout(draftTimer);
  if (!adapter || tab !== 'treino' || !$('d2Answer')) return true;
  const value = session(), q = current();
  if (!q || attemptAt(q)) return true;
  const draft = formDraft();
  if (JSON.stringify(value.draft) === JSON.stringify(draft)) return true;
  return write({sessions:{...state().sessions,[activeKey]:{...value,draft}}});
 }

 function record(value) {
  const q = current();
  if (!q || attemptAt(q)) return false;
  const draft = cleanDraft(value);
  if (!draft.choice || !draft.confidence || !draft.request || !draft.plan) {
   status('Marca uma resposta e registra o pedido, teu raciocínio e tua confiança.');
   return false;
  }
  clearTimeout(draftTimer);
  const s = session(), date = now(), correct = draft.choice === q.answer;
  const a = {
   ...draft, id:entryId(s.id,q.id), session:s.id, questionId:q.id, date, updatedAt:date,
   exposure:wasSeen(q.id) ? 'repeat' : 'new', correct,
   category:correct ? '' : questions[q.id].category, comment:'',
  };
  if (!write({
   attempts:[...state().attempts,a].slice(-1200),
   sessions:{...state().sessions,[activeKey]:{...s,draft:emptyDraft()}},
  })) return false;
  render();
  focus('d2Feedback');
  return true;
 }

 function next() {
  const s = session(), q = current();
  if (!q || !attemptAt(q)) return false;
  if (!write({sessions:{...state().sessions,[activeKey]:{...s,index:s.index + 1,draft:emptyDraft()}}})) return false;
  render();
  focus('d2Focus');
  return true;
 }

 function stats(attempts = state().attempts) {
  const pair = () => ({new:{correct:0,total:0},repeat:{correct:0,total:0}});
  const result = {...pair(), subjects:Object.fromEntries(Object.keys(subjects).map(key => [key,pair()]))};
  for (const a of attempts) {
   for (const row of [result, result.subjects[questions[a.questionId].subject]]) {
    row[a.exposure].total++;
    if (a.correct) row[a.exposure].correct++;
   }
  }
  return result;
 }

 function errors(onlyHigh = false) {
  const latest = new Map(state().attempts.map(a => [a.questionId,a]));
  const result = [];
  for (const id of route) {
   const last = latest.get(id);
   if (last) {
    if (!last.correct && (!onlyHigh || last.confidence === 'alta')) result.push(last);
   } else if (!onlyHigh) {
    const old = root().enem?.answers?.[id];
    if (old?.choice && old.choice !== byId.get(id).answer) result.push({
     questionId:id, choice:old.choice, legacy:true, category:questions[id].category,
    });
   }
  }
  return result.reverse();
 }

 const searchIndex = new Map(entries.map(e => [e.id,norm([e.id,e.title,e.topic,e.rule,e.meaning,e.when,e.symbols].join(' '))]));
 function search(value, area = '', group = '') {
  const words = norm(value).trim().split(/\s+/).filter(Boolean);
  return entries.filter(e => (!area || e.subject === area) && (!group || e.topic === group) &&
   words.every(word => searchIndex.get(e.id).includes(word)));
 }

 const button = (action,label,attrs = '',style = 'outline') => `<button type="button" class="${style}" data-d2="${action}" ${attrs}>${esc(label)}</button>`;
 const attr = (name,value) => `data-${name}="${esc(value)}"`;
 const qLabel = q => `ENEM ${q.year} · Questão ${q.index}`;
 const focus = id => $(id)?.focus?.();
 const pairLabel = row => row.correct + '/' + row.total;

 function subjectPicker() {
  return `<div class="d2-subjects" role="group" aria-label="Matérias">${Object.entries(subjects).map(([id,meta]) =>
   button('subject',meta.label,`${attr('subject',id)} aria-pressed="${id===subject}"`,'quiet')
  ).join('')}</div>`;
 }

 function cardBody(e) {
  return `<p class="d2-rule">${esc(e.rule)}</p>
   <dl class="d2-explain"><dt>O que quer dizer</dt><dd>${esc(e.meaning)}</dd>
   <dt>Quando usar</dt><dd>${esc(e.when)}</dd><dt>Símbolos, unidades ou termos</dt><dd>${esc(e.symbols)}</dd></dl>
   <div class="d2-example"><strong>Exemplo resolvido</strong><p>${esc(e.example[0])}</p><ol>
   ${e.example.slice(1).map(step => `<li>${esc(step)}</li>`).join('')}</ol></div>
   <p class="d2-trap"><strong>Cuidado com este erro</strong> ${esc(e.trap)}</p>`;
 }

 function guideResults(items, target) {
  const el = $(target);
  if (!el) return;
  const groups = new Map();
  for (const e of items) {
   const label = target === 'd2QuickResults' && !quickSubject ? subjects[e.subject].label + ' · ' + e.topic : e.topic;
   if (!groups.has(label)) groups.set(label,[]);
   groups.get(label).push(e);
  }
  el.innerHTML = items.length ? [...groups].map(([label,list]) => `<section class="d2-topic"><h3>${esc(label)}</h3>
   <div class="d2-guide-grid">${list.map(e => `<details class="d2-guide-card" ${items.length===1?'open':''}>
    <summary>${esc(e.title)}</summary>${cardBody(e)}</details>`).join('')}</div></section>`).join('')
   : '<p>Nenhuma ficha com esses filtros. Tenta buscar outro termo.</p>';
  $(target+'Count').textContent = items.length + (items.length === 1 ? ' ficha' : ' fichas');
 }

 function guideView() {
  const topics = [...new Set(search('',subject).map(e => e.topic))];
  return `<h2 id="d2Focus" tabindex="-1">Guia de fórmulas e conceitos</h2>${subjectPicker()}
   <div class="d2-controls"><label for="d2Search">Buscar nesta matéria
    <input type="search" id="d2Search" placeholder="Ex. Lei de Ohm, pressão, mitose" value="${esc(query)}"></label>
    <label for="d2Topic">Assunto<select id="d2Topic"><option value="">Todos os assuntos</option>
    ${topics.map(name => `<option value="${esc(name)}" ${topic===name?'selected':''}>${esc(name)}</option>`).join('')}</select></label></div>
   <p class="d2-muted" id="d2GuideResultsCount" aria-live="polite"></p><div id="d2GuideResults"></div>
   <details class="d2-command-list"><summary>Dicionário de comandos da prova</summary>
    ${commands.map(e => `<div><h3>${esc(e.title)}</h3><p>${esc(e.meaning)}</p><p class="d2-muted">${esc(e.example)}</p></div>`).join('')}</details>
   <div class="d2-actions">${button('bank','Questões de '+subjects[subject].label,attr('subject',subject))}${button('trilhas','Abrir as trilhas completas')}</div>`;
 }

 function openGuide(area = '', value = '') {
  const dialog = $('dia2QuickGuide');
  if (!dialog) return;
  const q = tab === 'treino' ? current() : null;
  quickSubject = hasKey(subjects,area) ? area : q ? questions[q.id].subject : subject;
  quickQuery = value;
  dialog.innerHTML = `<div class="d2-quick-head"><div class="d2-quick-title"><h2 id="d2QuickTitle">Guia do 2º dia</h2>
    <button type="button" class="quiet" id="d2QuickClose" aria-label="Fechar guia">×</button></div>
    <label for="d2QuickSearch">Buscar fórmula ou conceito</label><input type="search" id="d2QuickSearch" value="${esc(value)}">
    <label for="d2QuickSubject">Matéria</label><select id="d2QuickSubject"><option value="">Todas</option>
    ${Object.entries(subjects).map(([id,meta]) => `<option value="${id}" ${id===quickSubject?'selected':''}>${esc(meta.label)}</option>`).join('')}</select>
    <p class="d2-muted" id="d2QuickResultsCount" aria-live="polite"></p></div>
    <div class="d2-quick-body" id="d2QuickResults"></div>`;
  guideResults(search(quickQuery,quickSubject),'d2QuickResults');
  if (!dialog.open) dialog.showModal();
  focus('d2QuickSearch');
 }

 function flashPool() {
  return search('',subject).filter(e => !flashReviewOnly || state().cards[e.id]?.value === 'again');
 }

 function flashView() {
  const pool = flashPool(), e = pool[flashIndex % pool.length];
  const all = search('',subject), known = all.filter(card => state().cards[card.id]?.value === 'known').length;
  const heading = `<h2 id="d2Focus" tabindex="-1">Flashcards</h2>${subjectPicker()}
   <label class="d2-switch"><input type="checkbox" id="d2FlashReview" ${flashReviewOnly?'checked':''}> Só fichas marcadas para revisar</label>`;
  if (!e) return heading + '<p>Nenhuma ficha desta matéria marcada para revisão.</p>';
  const mark = state().cards[e.id]?.value;
  return heading + `<article class="d2-panel d2-flash"><p class="eyebrow">${esc(e.topic)} · ${flashIndex % pool.length + 1}/${pool.length}</p>
    <h3>${esc(e.title)}</h3>
    ${revealed ? cardBody(e) : `<p>Tenta explicar a regra e resolver o exemplo antes de revelar.</p>
     <div class="d2-example"><strong>Aquecimento</strong><p>${esc(e.example[0])}</p></div>`}
    <div class="d2-actions">${revealed ?
     button('flash-mark','Revisar depois',attr('mark','again')) + button('flash-mark','Lembrei',attr('mark','known'),'primary')
     : button('flash-reveal','Revelar resposta','','primary')}
     ${button('flash-next','Próxima ficha →')}</div>
    <p class="d2-muted">${known} de ${all.length} fichas marcadas como lembradas.${mark==='again'?' Esta ficha está marcada para revisão.':''}</p>
   </article>`;
 }

 function planView() {
  const progress = state().sessions.percurso, s = stats(), mistakes = errors(true).length;
  return `<div class="d2-overview"><article class="d2-panel d2-feature">
   <p class="eyebrow">PERCURSO DO SEGUNDO DIA</p><h2 id="d2Focus" tabindex="-1">Começa pela Física</h2>
   <p>Revisa uma ficha, resolve cinco questões e volta aos erros. O percurso reúne ${route.length} questões reais em cinco blocos, com duas rodadas de Física.</p>
   <div class="d2-actions">${button('start',pending(progress)?'Continuar percurso →':'Começar percurso →',attr('key','percurso'),'primary')}
    ${button('tab','Escolher bloco',attr('tab','treino'))}</div>
   ${progress ? `<p class="d2-muted">${progress.index} de ${progress.ids.length} questões concluídas no percurso.</p>` : ''}
   </article><aside class="d2-panel d2-quick-stats" aria-label="Teu progresso">
    <p class="eyebrow">TEU TREINO</p><dl><div><dt>Questões novas</dt><dd>${pairLabel(s.new)}</dd></div>
    <div><dt>Repetidas</dt><dd>${pairLabel(s.repeat)}</dd></div><div><dt>Erros com confiança alta</dt><dd>${mistakes}</dd></div></dl>
    ${button('tab','Revisar meus erros',attr('tab','erros'),'quiet')}
   </aside></div>
   <h2 class="d2-subheading">Escolhe a matéria</h2><div class="d2-subject-grid">${Object.entries(subjects).map(([id,meta]) => `
    <article class="d2-panel d2-subject-card"><span aria-hidden="true" class="d2-symbol">${meta.icon}</span>
    <h3>${esc(meta.label)}</h3><p>${esc(meta.intro)}</p>
    ${button('subject-guide','Abrir guia · '+search('',id).length+' fichas',attr('subject',id))}
    ${id==='matematica'?button('math-lab','Laboratório de Matemática →','','quiet'):''}</article>`).join('')}</div>
   <div class="d2-actions d2-more">${button('exam','Simulado do 2º dia →')}${button('trilhas','Trilhas completas')}</div>`;
 }

 function trainingHome() {
  return `<h2 id="d2Focus" tabindex="-1">Treino guiado</h2><p>Identifica o que a questão pede, registra teu plano e marca a confiança antes de conferir a resolução.</p>
   <div class="d2-actions">${button('start',pending(state().sessions.percurso)?'Continuar percurso':'Percurso de '+route.length+' questões',attr('key','percurso'),'primary')}</div>
   <div class="d2-block-grid">${Object.entries(blocks).map(([key,block]) => {
    const s = state().sessions[key];
    return `<article class="d2-panel"><h3>${esc(block.title)}</h3><p>${esc(block.description)}</p>
     ${button('start',pending(s)?'Continuar · '+s.index+'/'+s.ids.length:'Treinar '+idsFor(key).length+' questões',attr('key',key))}</article>`;
   }).join('')}</div>`;
 }

 function questionBody(q,item) {
  if (!item.edits) return globalThis.FurgEnem.body(q);
  const context = item.edits.reduce((text,[before,after]) => text.replace(before,after),q.context);
  return globalThis.FurgEnem.body({...q,context});
 }

 function choices(q,a) {
  return `<fieldset class="d2-options"><legend>Alternativas</legend>${q.alternatives.map(option => {
   const selected = option.letter === (a ? a.choice : session().draft.choice);
   const correct = a && option.letter === q.answer, wrong = a && selected && !a.correct;
   return `<label class="d2-option ${correct?'is-correct':''} ${wrong?'is-wrong':''}">
    <input type="radio" name="d2Choice" value="${option.letter}" ${selected?'checked':''} ${a?'disabled':'required'}>
    <span class="d2-letter">${option.letter}</span><span>${globalThis.FurgEnem.markdown(option.text).replace(/<\/?p>/g,'')}</span>
    ${correct?'<span class="sr-only">Resposta correta</span>':wrong?'<span class="sr-only">Resposta incorreta</span>':''}
   </label>`;
  }).join('')}</fieldset>`;
 }

 function noteForm(a) {
  return `<form class="d2-note" data-d2-form="note" ${attr('attempt',a.id)}>
   <label for="d2Comment">Meu comentário ou conta corrigida</label>
   <textarea id="d2Comment" maxlength="1200" rows="3">${esc(a.comment)}</textarea>
   ${a.correct?'':`<label for="d2Category">O que me fez errar?</label><select id="d2Category">
    ${Object.entries(categories).map(([id,label]) => `<option value="${id}" ${id===a.category?'selected':''}>${esc(label)}</option>`).join('')}</select>`}
   <button class="outline" type="submit">Salvar anotação</button>
  </form>`;
 }

 function feedback(q,a,item) {
  const labels = ['Identifica o pedido','Monta o raciocínio','Confere o resultado'];
  return `<section class="d2-feedback ${a.correct?'good':'wrong'}" aria-label="Correção da questão">
   <h3 id="d2Feedback" tabindex="-1">${a.correct?'Acertou!':'Confere teu raciocínio'} · Gabarito ${q.answer}</h3>
   <p class="d2-muted">Tua resposta ${a.choice} · Confiança ${confidence[a.confidence].toLowerCase()} · Questão ${a.exposure==='new'?'nova':'repetida'}</p>
   <ol class="d2-steps">${item.steps.map((step,i) => `<li><strong>${labels[i]}</strong><p>${esc(step)}</p></li>`).join('')}</ol>
   <p class="d2-trap"><strong>Ponto de atenção</strong> ${esc(item.trap)}</p>
   <div class="d2-actions">${button('next',session().index + 1 === session().ids.length?'Ver resultado →':'Próxima questão →','','primary')}
    ${button('card','Consultar ficha',attr('card',item.card))}</div>
   </section>${noteForm(a)}`;
 }

 function trainView() {
  const s = session(), q = current();
  if (!s) return trainingHome();
  if (!q) {
   const attempts = state().attempts.filter(a => a.session === s.id), score = stats(attempts);
   return `<article class="d2-panel"><h2 id="d2Focus" tabindex="-1">${activeKey==='percurso'?'Percurso':'Bloco'} concluído</h2>
    <p>Questões novas ${pairLabel(score.new)} · Repetidas ${pairLabel(score.repeat)}.</p><div class="d2-actions">
    ${button('tab','Revisar meus erros',attr('tab','erros'),'primary')}${button('training-home','Escolher outro treino')}</div></article>`;
  }
  const a = attemptAt(q), item = questions[q.id], draft = s.draft;
  const block = Object.values(blocks).find(group => group.ids.includes(q.id));
  return `<article class="d2-panel d2-question" data-d2-question="${esc(q.id)}">
   <div class="d2-question-head"><div><p class="eyebrow">${esc(block.title)} · ${s.index+1}/${s.ids.length}</p>
   <h2 id="d2Focus" tabindex="-1">${qLabel(q)}</h2></div>${button('training-home','Ver blocos','','quiet')}</div>
   <div class="d2-actions d2-question-links">${button('quick','Guia lateral ↗','','quiet')}
   <a href="${esc(q.source?.pdf || officialSources[q.year].exam)}" target="_blank" rel="noopener noreferrer">Caderno azul ↗</a></div>
   <div class="d2-enunciation">${questionBody(q,item)}</div>
   ${a ? choices(q,a) + feedback(q,a,item) : `<form id="d2Answer" data-d2-form="answer">
    ${choices(q,null)}
    ${state().hints?`<details class="d2-hint"><summary>Quero uma pista</summary><p>${esc(item.hint)}</p></details>`:''}
    <div class="d2-reasoning"><label for="d2Request">O que o comando pede?</label>
     <textarea id="d2Request" required maxlength="500" rows="2" placeholder="Registra a grandeza ou o efeito pedido">${esc(draft.request)}</textarea>
     <label for="d2Plan">Qual relação, conta ou ideia vou usar?</label>
     <textarea id="d2Plan" required maxlength="900" rows="2" placeholder="Registra a fórmula, a conversão ou a ideia que tu quer testar">${esc(draft.plan)}</textarea>
     <label for="d2Confidence">Minha confiança</label>
     <select id="d2Confidence" required><option value="">Seleciona</option>${Object.entries(confidence).map(([id,label]) =>
      `<option value="${id}" ${id===draft.confidence?'selected':''}>${label}</option>`).join('')}</select>
     <button class="primary" type="submit">Conferir resposta</button>
    </div></form>`}
   <p class="d2-muted d2-credit">Questão oficial do Inep · Resolução autoral
   ${a?` · <a href="${officialSources[q.year].key}" target="_blank" rel="noopener noreferrer">Gabarito original ↗</a>`:''}</p>
  </article>`;
 }

 function errorsView() {
  const items = errors(highOnly), score = stats(), reviewing = pending(state().sessions.revisao);
  return `<h2 id="d2Focus" tabindex="-1">Revisar meus erros</h2>
   <label class="d2-switch"><input type="checkbox" id="d2HighOnly" ${highOnly?'checked':''}> Só erros com confiança alta</label>
   <p>${items.length} ${items.length===1?'questão pendente':'questões pendentes'}. Um acerto posterior tira a questão da fila.</p>
   ${items.length||reviewing?button('review',reviewing?'Retomar revisão →':'Refazer até 5 questões →','','primary'):''}
   <div class="d2-error-grid">${items.map(a => {
    const q = byId.get(a.questionId), item = questions[q.id];
    return `<article class="d2-panel"><p class="eyebrow">${subjects[item.subject].label}</p><h3>${qLabel(q)}</h3>
     <p>${a.legacy?'Erro no banco · confiança não registrada':'Confiança '+confidence[a.confidence].toLowerCase()} · ${categories[a.category]}</p>
     <p>${esc(item.trap)}</p><div class="d2-actions">${button('review','Refazer',attr('question',q.id))}
     ${button('card','Ver ficha',attr('card',item.card),'quiet')}</div></article>`;
   }).join('')}</div>
   <h3>Acertos por matéria</h3><div class="d2-table"><table><thead><tr><th>Matéria</th><th>Novas</th><th>Repetidas</th></tr></thead>
   <tbody>${Object.entries(score.subjects).map(([id,row]) => `<tr><th scope="row">${subjects[id].label}</th><td>${pairLabel(row.new)}</td><td>${pairLabel(row.repeat)}</td></tr>`).join('')}</tbody></table></div>
   <p class="d2-muted">A contagem mostra acertos e tentativas deste treino. Questões já vistas no banco ou respondidas em simulados contam como repetidas.</p>`;
 }

 function notebookView() {
  const attempts = state().attempts.slice().reverse();
  return `<h2 id="d2Focus" tabindex="-1">Meu caderno de resolução</h2>
   <p>Teus planos, contas e comentários, na ordem em que estudaste.</p>
   ${attempts.length ? attempts.map(a => {
    const q = byId.get(a.questionId), item = questions[q.id];
    return `<details class="d2-panel d2-notebook"><summary>${qLabel(q)} · ${subjects[item.subject].label} · ${a.correct?'Acerto':'Erro'}</summary>
    <dl class="d2-explain"><dt>O que eu entendi do comando</dt><dd>${esc(a.request)}</dd><dt>Minha estratégia</dt><dd>${esc(a.plan)}</dd>
    ${a.comment?`<dt>Minha anotação</dt><dd>${esc(a.comment)}</dd>`:''}</dl>
    <p class="d2-muted">Gabarito ${q.answer} · Minha resposta ${a.choice} · Confiança ${confidence[a.confidence].toLowerCase()}</p>
    ${button('card','Revisar a ficha',attr('card',item.card),'quiet')}</details>`;
   }).join('') : '<p>O caderno aparece depois que tu conferir a primeira questão.</p>'}`;
 }

 const views = {plano:planView, guia:guideView, flash:flashView, treino:trainView, erros:errorsView, caderno:notebookView};
 function render() {
  if (!adapter || !$('dia2Root')) return;
  $('dia2Root').innerHTML = `<div class="d2-toolbar"><div class="d2-tabs" role="group" aria-label="Seções do segundo dia">
   ${Object.entries(tabs).map(([id,label]) => button('tab',label,`${attr('tab',id)} aria-pressed="${id===tab}"`,'quiet')).join('')}
   </div><label class="d2-switch"><input type="checkbox" id="d2Hints" ${state().hints?'checked':''}> Pistas no treino</label></div>
   <p id="d2Live" role="status" aria-live="polite"></p><div class="d2-content">${views[tab]()}</div>`;
  if (tab === 'guia') guideResults(search(query,subject,topic),'d2GuideResults');
 }

 function changeTab(value) {
  if (!hasKey(tabs,value) || !flushDraft()) return;
  tab = value;
  render();
  focus('d2Focus');
 }

 function changeSubject(value) {
  if (!hasKey(subjects,value)) return false;
  subject = value;
  topic = query = '';
  flashIndex = 0;
  revealed = false;
  return true;
 }

 function click(event) {
  const b = event.target.closest('button[data-d2]');
  if (!b || b.disabled) return;
  const {d2, tab:target, subject:area, key, question, card, mark} = b.dataset;
  switch (d2) {
   case 'tab': changeTab(target); break;
   case 'subject':
    if (changeSubject(area)) { render(); $('dia2Root').querySelector('button[data-d2="subject"][aria-pressed="true"]')?.focus(); }
    break;
   case 'subject-guide': if (changeSubject(area)) changeTab('guia'); break;
   case 'quick': openGuide(); break;
   case 'card': { const e = cardsById.get(card); if (e) openGuide(e.subject,e.title); break; }
   case 'start': start(key); break;
   case 'training-home': if (flushDraft()) { activeKey = ''; changeTab('treino'); } break;
   case 'next': next(); break;
   case 'review': start('revisao',question ? [question] : errors(highOnly).map(a => a.questionId)); break;
   case 'flash-reveal': revealed = true; render(); focus('d2Focus'); break;
   case 'flash-mark': {
    const pool = flashPool(), e = pool[flashIndex % pool.length];
    if (e && ['again','known'].includes(mark) && write({cards:{...state().cards,[e.id]:{value:mark,date:now()}}})) {
     if (!flashReviewOnly || mark === 'again') flashIndex++;
     revealed = false; render(); focus('d2Focus');
    }
    break;
   }
   case 'flash-next': flashIndex++; revealed = false; render(); focus('d2Focus'); break;
   case 'bank': globalThis.FurgEnem.openSubject(area); break;
   case 'trilhas': adapter.setView('trilhas'); break;
   case 'math-lab': adapter.setView('matematica-lab'); break;
   case 'exam':
    adapter.setView('simulados');
    globalThis.FurgEnemSim.selectDay('2');
    $('enemSimRoot')?.scrollIntoView({block:'start'});
    break;
  }
 }

 function init(value) {
  adapter = value;
  root().dia2 = validate(root().dia2);
  const host = $('dia2Root'), dialog = $('dia2QuickGuide');
  if (bound || !host || !dialog) return;
  bound = true;
  host.addEventListener('click',click);
  host.addEventListener('submit',event => {
   const form = event.target;
   if (form.dataset.d2Form === 'answer') {
    event.preventDefault();
    record(formDraft());
   } else if (form.dataset.d2Form === 'note') {
    event.preventDefault();
    const a = state().attempts.find(attempt => attempt.id === form.dataset.attempt);
    if (!a) return;
    const comment = cleanText($('d2Comment')?.value,1200), requested = $('d2Category')?.value;
    const category = !a.correct && hasKey(categories,requested) ? requested : a.category;
    const attempts = state().attempts.map(attempt => attempt===a ? {...a,comment,category,updatedAt:now()} : attempt);
    if (write({attempts})) status('Anotação salva no caderno.');
   }
  });
  host.addEventListener('input',event => {
   if (event.target.id === 'd2Search') {
    query = event.target.value;
    guideResults(search(query,subject,topic),'d2GuideResults');
   } else if (event.target.closest('#d2Answer')) {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(flushDraft,300);
   }
  });
  host.addEventListener('change',event => {
   const {id,value,checked} = event.target;
   if (id === 'd2Topic') { topic = value; guideResults(search(query,subject,topic),'d2GuideResults'); }
   if (id === 'd2FlashReview') { flashReviewOnly = checked; flashIndex = 0; revealed = false; render(); focus('d2FlashReview'); }
   if (id === 'd2HighOnly') { highOnly = checked; render(); focus('d2HighOnly'); }
   if (id === 'd2Hints') {
    if (flushDraft() && write({hints:checked})) { render(); focus('d2Hints'); }
    else event.target.checked = state().hints;
   }
  });
  dialog.addEventListener('click',event => {
   if (event.target.id === 'd2QuickClose' || event.target === dialog) dialog.close();
  });
  dialog.addEventListener('input',event => {
   if (event.target.id === 'd2QuickSearch') {
    quickQuery = event.target.value;
    guideResults(search(quickQuery,quickSubject),'d2QuickResults');
   }
  });
  dialog.addEventListener('change',event => {
   if (event.target.id === 'd2QuickSubject') {
    quickSubject = event.target.value;
    guideResults(search(quickQuery,quickSubject),'d2QuickResults');
   }
  });
  globalThis.addEventListener?.('pagehide',flushDraft);
 }

 globalThis.FurgDia2 = {init, render, fresh, validate, merge, start, record, next, stats, errors, search, openGuide, flushDraft};
})();

