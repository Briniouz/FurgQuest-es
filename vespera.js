'use strict';
(() => {
 const $ = id => document.getElementById(id);
 const base = globalThis.FURG_VESPERA_DATA;
 if (!base) return;
 const trail = globalThis.FURG_VESPERA_TRAIL;
 const data = {...base, questions: {...base.questions, ...trail?.questions}};
 const trailBlocks = trail?.blocks || [];
 const trailItems = trailBlocks.flatMap((block, index) => block.items.map(item => ({...item, block: index})));
 const trailById = new Map(trailItems.map(item => [item.id, item]));
 const repertories = globalThis.FURG_VESPERA_REPERTORIES || [];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const categories={vocabulario:'Vocabulário',comando:'Comando',genero:'Gênero',conteudo:'Conteúdo',extrapolacao:'Extrapolação',generalizacao:'Generalização',informacao:'Informação verdadeira que não responde à pergunta'};
 const confidences=['baixa','media','alta'],confidenceLabels={baixa:'Baixa',media:'Média',alta:'Alta'};
 const bank=new Map((globalThis.FURG_ENEM_DATA?.questions||[]).map(q=>[q.id,q])),entries=new Map(data.entries.map(e=>[e.id,e]));
 const eligible=id=>{const q=bank.get(id),n=data.questions[id];return !!(q&&n&&q.answer===n.answerExpected&&!q.canceled&&!q.quality?.blocked&&globalThis.FurgEnemLayout?.fingerprint(q)===n.fingerprint);};
 const ids=()=>Object.keys(data.questions).filter(eligible),uid=()=>Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,11);
 const fresh = () => ({version: 1, attempts: [], active: null, percurso: null, cards: {}, plan: {}, hints: true});
 let adapter,bound=false,tab='plan',dictionaryQuery='',dictionaryKind='all',lastFocus=null,flashIds=[],flashIndex=0,flashRevealed=false,reviewHigh=false,draftTimer,blockedImage=false;
 let sessionKey = 'active', commentTimer;
 const repertoryFilter = {axis: '', use: '', query: ''};
 const repertoryUses = {
  introducao: 'Introdução',
  desenvolvimento: 'Desenvolvimento',
  conclusao: 'Conclusão',
 };
 const developmentSteps = [
  'Tópico frasal',
  'Causa',
  'Minijustificativa da causa',
  'Repertório',
  'Consequência decorrente do repertório',
  'Consequência da consequência',
  'Finalização com retomada do repertório',
 ];
 const pendingComments = new Map();
 const unfinished = session => session && session.index < session.ids.length;
 const session = () => state()[sessionKey];
 const limited = (value, max) => typeof value === 'string' ? value.slice(0, max) : '';
 const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));

 function cleanDraft(d, id) {
  return {
   questionId: id,
   command: limited(d?.command, 1600),
   evidence: limited(d?.evidence, 2000),
   discursive: limited(d?.discursive, 2400),
   confidence: confidences.includes(d?.confidence) ? d.confidence : '',
   choice: /^[A-E]$/.test(d?.choice) ? d.choice : '',
  };
 }

 function validateSession(s, limit) {
  if (!s || typeof s.id !== 'string' || s.id.length > 100 || !Array.isArray(s.ids) ||
      !s.ids.length || s.ids.length > limit || new Set(s.ids).size !== s.ids.length ||
      !s.ids.every(id => Object.hasOwn(data.questions, id)) ||
      !Number.isInteger(s.index) || s.index < 0 || s.index > s.ids.length) return null;
  return {
   id: s.id, ids: [...s.ids], index: s.index,
   label: limited(s.label, 120) || 'Treino',
   draft: cleanDraft(s.draft, s.ids[s.index] || ''),
  };
 }
 function validate(value){
  const out=fresh();if(!value||typeof value!=='object')return out;
  out.hints=typeof value.hints==='boolean'?value.hints:true;
  const seen=new Set();
  if(Array.isArray(value.attempts))for(const a of value.attempts){
   if(!a||!data.questions[a.questionId]||typeof a.id!=='string'||a.id.length>100||seen.has(a.id)||!/^[A-E]$/.test(a.choice)||!confidences.includes(a.confidence)||!['new','repeat'].includes(a.exposure)||typeof a.date!=='string'||!Number.isFinite(Date.parse(a.date)))continue;
   const q=bank.get(a.questionId);if(!q)continue;seen.add(a.id);
   out.attempts.push({
    id: a.id, questionId: a.questionId, batch: limited(a.batch, 100), choice: a.choice,
    correct: a.choice === q.answer, exposure: a.exposure, confidence: a.confidence,
    command: limited(a.command, 1600), evidence: limited(a.evidence, 2000),
    discursive: limited(a.discursive, 2400), comment: limited(a.comment, 2400),
    commentAt: validDate(a.commentAt) ? a.commentAt : '',
    category: Object.hasOwn(categories, a.category) ? a.category : '', date: a.date,
   });
  }
  for(const [id,c]of Object.entries(value.cards||{}))if(entries.has(id)&&['known','review'].includes(c))out.cards[id]=c;
  for(const [id,date]of Object.entries(value.plan||{}))if(['dictionary','cards','practice','errors','humanas','redacao'].includes(id)&&typeof date==='string'&&Number.isFinite(Date.parse(date)))out.plan[id]=date;
  out.active = validateSession(value.active, 5);
  out.percurso = validateSession(value.percurso, 25);
  return out;
 }
 function merge(old, incoming) {
  const a = validate(old);
  if (incoming == null) return a;
  const b = validate(incoming);
  const map = new Map(a.attempts.map(attempt => [attempt.id, attempt]));
  for (const attempt of b.attempts) {
   const local = map.get(attempt.id);
   if (!local) {
    map.set(attempt.id, attempt);
    continue;
   }
   if (local.questionId !== attempt.questionId) continue;
   if (!local.discursive) local.discursive = attempt.discursive;
   if (attempt.commentAt && (!local.commentAt || Date.parse(attempt.commentAt) > Date.parse(local.commentAt))) {
    local.comment = attempt.comment;
    local.commentAt = attempt.commentAt;
   }
  }
  return validate({
   ...a,
   attempts: [...map.values()].sort((x, y) => Date.parse(x.date) - Date.parse(y.date)),
   cards: {...a.cards, ...b.cards}, plan: {...a.plan, ...b.plan},
   active: unfinished(a.active) ? a.active : b.active || a.active,
   percurso: unfinished(a.percurso) ? a.percurso : b.percurso || a.percurso,
   hints: b.hints,
  });
 }
 const state=()=>adapter?.getState().vespera||fresh();
 function say(message){if($('eveLive'))$('eveLive').textContent=message;}
 function write(change){
  if(!adapter)return false;const previous=adapter.getState().vespera,next=JSON.parse(JSON.stringify(state()));change(next);adapter.getState().vespera=next;
  if(!adapter.save()){adapter.getState().vespera=previous;say('Não foi possível salvar. Teus registros anteriores foram mantidos. Tenta exportar teu progresso.');return false;}return true;
 }
 function wasSeen(id,root=adapter?.getState(),mode=state()){
  return !!(mode.attempts.some(a=>a.questionId===id)||root?.enem?.answers?.[id]?.choice||root?.enem?.answers?.[id]?.viewed||root?.enemSim?.active?.answers?.[id]||(root?.enemSim?.history||[]).some(s=>s.answers?.[id]));
 }
 function stats(value=state()){
  const result={new:{correct:0,total:0},repeat:{correct:0,total:0},areas:{linguagens:{new:{correct:0,total:0},repeat:{correct:0,total:0}},'ciencias-humanas':{new:{correct:0,total:0},repeat:{correct:0,total:0}}},highErrors:0};
  for(const a of value.attempts){const s=result[a.exposure];s.total++;if(a.correct)s.correct++;const area=result.areas[bank.get(a.questionId)?.area]?.[a.exposure];if(area){area.total++;if(a.correct)area.correct++;}if(!a.correct&&a.confidence==='alta')result.highErrors++;}return result;
 }
 function errors(high=false){
  const mode=state(),found=[];for(const id of ids()){
   const all=mode.attempts.filter(a=>a.questionId===id),last=all.at(-1),q=bank.get(id),old=adapter.getState().enem?.answers?.[id];
   if(last&&!last.correct&&(!high||last.confidence==='alta'))found.push({...last,legacy:false});
   else if(!last&&old?.choice&&old.choice!==q.answer&&!high)found.push({questionId:id,choice:old.choice,correct:false,confidence:'',category:'',legacy:true});
  }return found.sort((a,b)=>Number(b.confidence==='alta')-Number(a.confidence==='alta'));
 }
 function resume(key) {
  sessionKey = key;
  tab = 'train';
  render();
  focusQuestion();
 }
 function start(group = 'mix', forced = []) {
  const key = group === 'percurso' ? 'percurso' : 'active';
  if (unfinished(state()[key])) {
   resume(key);
   say('Retomei teu treino com o rascunho salvo.');
   return true;
  }
  const g = data.groups.find(item => item.id === group);
  let pool;
  if (key === 'percurso') {
   pool = trailItems.map(item => item.id);
   if (pool.length !== 25 || new Set(pool).size !== 25 || !pool.every(eligible)) {
    say('Uma questão do percurso precisa de nova conferência. O bloco de 5 continua disponível.');
    return false;
   }
  } else {
   pool = [...new Set(forced.length ? forced : g ? g.questions : ids())].filter(eligible);
   if (!forced.length) {
    const high = new Set(errors(true).map(a => a.questionId));
    const size = id => (bank.get(id).context || '').length + (bank.get(id).stem || '').length;
    pool.sort((a, b) => Number(wasSeen(a)) - Number(wasSeen(b)) ||
     Number(high.has(b)) - Number(high.has(a)) || size(a) - size(b));
    if (group === 'mix') {
     const l = pool.filter(id => bank.get(id).area === 'linguagens');
     const h = pool.filter(id => bank.get(id).area === 'ciencias-humanas');
     const balanced = [l[0], h[0], l[1], h[1], l[2]].filter(Boolean);
     pool = [...balanced, ...pool.filter(id => !balanced.includes(id))];
    }
   }
   if (pool.length < 5) {
    const rest = ids().filter(id => !pool.includes(id)).sort((a, b) => Number(wasSeen(a)) - Number(wasSeen(b)));
    pool.push(...rest.slice(0, 5 - pool.length));
   }
   pool = pool.slice(0, 5);
  }
  if (!pool.length) {
   say('As questões selecionadas precisam de nova conferência.');
   return false;
  }
  const label = key === 'percurso' ? 'Percurso do primeiro dia' :
   g?.title || (group === 'errors' ? 'Revisão de erros' : 'Leitura do comando e evidência');
  const next = {id: uid(), ids: pool, index: 0, label, draft: cleanDraft(null, pool[0])};
  if (!write(s => { s[key] = next; })) return false;
  resume(key);
  return true;
 }
 const current = () => unfinished(session()) ? bank.get(session().ids[session().index]) : null;
 const response = () => {
  const s = session(), q = current();
  return s && q ? state().attempts.find(a => a.batch === s.id && a.questionId === q.id) : null;
 };
 function record(draft) {
  const q = current(), s = session();
  if (!q || response() || !eligible(q.id)) return false;
  const d = cleanDraft(draft, q.id);
  if (!d.command.trim() || !d.evidence.trim() || !d.confidence || !d.choice) {
   say('Preenche tua leitura do comando, a evidência, a confiança e uma alternativa antes de conferir.');
   return false;
  }
  const images = Array.from($('eveQuestion')?.querySelectorAll('img') || []);
  if (blockedImage || images.some(i => !i.complete || !i.naturalWidth)) {
   say('A figura precisa carregar para conferir esta questão. Usa a prova original ou tenta novamente.');
   return false;
  }
  const wrong = data.questions[q.id].wrong[d.choice];
  const a = {
   id: uid(), questionId: q.id, batch: s.id, choice: d.choice, correct: d.choice === q.answer,
   exposure: wasSeen(q.id) ? 'repeat' : 'new', confidence: d.confidence,
   command: d.command.trim(), evidence: d.evidence.trim(), discursive: d.discursive.trim(),
   comment: '', commentAt: '',
   category: d.choice === q.answer ? '' : wrong?.category || 'comando', date: new Date().toISOString(),
  };
  if (!write(v => { v.attempts.push(a); v[sessionKey].draft = d; })) return false;
  clearTimeout(draftTimer);
  render();
  $('eveFeedbackTitle')?.focus({preventScroll: true});
  return true;
 }
 function next() {
  const s = session();
  if (!s || !response() || !flushComments()) return false;
  if (!write(v => {
   const progress = v[sessionKey];
   progress.index++;
   progress.draft = cleanDraft(null, progress.ids[progress.index] || '');
   if (progress.index === progress.ids.length) v.plan.practice = new Date().toISOString();
  })) return false;
  render();
  focusQuestion();
  return true;
 }
 function search(query='',kind='all'){
  const words=norm(query).trim().split(/\s+/).filter(Boolean);return data.entries.filter(e=>(kind==='all'||e.kind===kind)&&words.every(w=>norm([e.title,e.definition,e.example,e.recognize,e.difference,...e.aliases].join(' ')).includes(w))).sort((a,b)=>Number(norm(b.title)===norm(query))-Number(norm(a.title)===norm(query)));
 }
 function entry(e){return '<article class="eve-entry"><h3>'+esc(e.title)+'</h3><p>'+esc(e.definition)+'</p><details '+(norm(e.title)===norm(dictionaryQuery)?'open':'')+'><summary>Exemplo e como reconhecer</summary><p><b>Exemplo autoral:</b> '+esc(e.example)+'</p><p><b>Como reconhecer:</b> '+esc(e.recognize)+'</p><p><b>Não confundir:</b> '+esc(e.difference)+'</p></details></article>';}
 function dictionaryResults(){const found=search(dictionaryQuery,dictionaryKind);$('eveDictCount').textContent=found.length+' '+(found.length===1?'verbete':'verbetes');$('eveDictResults').innerHTML=found.length?found.map(entry).join(''):'<p>Nenhum verbete com essa busca. Tenta uma palavra mais curta ou sem filtro.</p>';}
 function openDictionary(query=''){
  globalThis.FurgStudyGuide?.close();lastFocus=document.activeElement;dictionaryQuery=query;dictionaryKind='all';$('eveDictSearch').value=query;$('eveDictKind').value='all';dictionaryResults();$('studyGuideLauncher')?.setAttribute('aria-expanded','true');if(!$('eveDictionary').open)$('eveDictionary').showModal();$('eveDictSearch').focus();
 }
 const button=(action,label,extra='',cls='outline')=>'<button type="button" class="'+cls+'" data-eve="'+action+'" '+extra+'>'+label+'</button>';
 const referenceLinks=q=>'<div class="eve-original"><a href="'+esc(q.source.pdf)+'" target="_blank" rel="noopener">Prova original ↗</a><a href="'+esc(q.source.answerPdf)+'" target="_blank" rel="noopener">Gabarito do caderno azul ↗</a></div>';
 function summaries(tag,title){const cards=(globalThis.FURG_LIGHT_REVIEW_DATA?.cards||[]).filter(c=>tag==='humanas'?c.tags?.includes('humanas'):c.deck==='agentes').slice(0,6);return '<details class="eve-existing"><summary>'+title+' · resumos existentes</summary>'+cards.map(c=>'<article><h4>'+esc(c.title)+'</h4><p>'+esc(c.answer)+'</p><p>'+esc(c.connection||'')+'</p></article>').join('')+button(tag==='humanas'?'library':'dayone','Abrir a seção completa ↗')+'</details>';}
 function trailOverview(s) {
  if (!trailBlocks.length) return '';
  const pending = unfinished(s), finished = s && !pending;
  return `<section class="eve-trail panel" aria-labelledby="eveTrailTitle">
   <div class="eve-trail-heading">
    <div><p class="eyebrow">QUESTÕES OFICIAIS · 5 BLOCOS</p>
    <h3 id="eveTrailTitle">Percurso do primeiro dia</h3>
    <p>25 questões com resolução comentada. São 12 de Linguagens e 13 de Humanas, com pausa entre itens.</p></div>
    ${button('percurso', pending ? 'Retomar percurso →' : finished ? 'Refazer percurso →' : 'Começar percurso →', '', 'primary')}
   </div>
   <ol class="eve-trail-blocks">
    ${trailBlocks.map((block, i) => {
     const count = s?.ids.slice(0, s.index).filter(id => trailById.get(id)?.block === i).length || 0;
     return `<li><span class="eve-stage-number">${i + 1}</span><div><h4>${esc(block.title)}</h4>
      <p>${esc(block.description)}</p></div><small>${count}/${block.items.length}</small></li>`;
    }).join('')}
   </ol>
  </section>`;
 }
 function plan() {
  const v = state(), st = stats(), pending = errors(), high = errors(true);
  const blocks = [
   ['dictionary','Dicionário','8 min','Traduz termos do comando e compara conceitos próximos.','dictionary','Abrir dicionário'],
   ['cards','Flashcards','6 min','Lê o exemplo, tenta lembrar o conceito e só depois revela.','cards','Revisar 5 cartões'],
   ['practice','Treino guiado','12–18 min','Cinco questões reais para praticar comando, evidência e confiança.','start','Treinar 5 questões'],
   ['errors','Revisão de erros','8 min','Relê as justificativas e prioriza erros com confiança alta.','errors','Revisar erros'],
  ];
  return `<section class="eve-overview">
   <div><p class="eyebrow">MODO VÉSPERA · PRIMEIRO DIA</p><h2>Revisão do primeiro dia</h2>
    <p>Pratica interpretação, vocabulário e leitura do comando. Escreve tua justificativa, compara com a resolução e guarda o que aprendeu.</p>
    <div class="eve-action-row">${button('percurso', unfinished(v.percurso) ? 'Continuar percurso →' : 'Treinar 25 questões →', '', 'primary')}
    ${button('repertories','Repertórios de Redação')}</div>
    <p class="eve-goals">Metas pessoais · <b>27/45 em Linguagens</b> · <b>27/45 em Humanas</b></p>
    <details><summary>Como ler teus registros</summary><p>Os acertos abaixo vêm das tuas tentativas no Modo Véspera. A dificuldade da tua apostila pertence àquele treino.</p></details>
   </div>
   <div class="eve-mini-stats"><h3>Somente este modo</h3>
    <p><b>${st.new.correct}/${st.new.total}</b> acertos em novas</p>
    <p><b>${st.repeat.correct}/${st.repeat.total}</b> acertos em repetidas</p>
    <p>${pending.length} erros pendentes · ${high.length} com confiança alta</p>
    <small>Itens já vistos no banco, em simulados salvos ou neste modo contam como repetidos.</small>
   </div>
  </section>
  ${unfinished(v.active) ? `<div class="eve-resume">Bloco em andamento · ${esc(v.active.label)} · ${v.active.index + 1}/${v.active.ids.length} ${button('start','Continuar bloco de 5 →')}</div>` : ''}
  ${trailOverview(v.percurso)}
  <div class="eve-blocks">${blocks.map(([id,title,time,desc,act,label]) => `<article class="panel"><div class="eve-block-title"><h3>${title}</h3><small>${time}</small></div><p>${desc}</p>${button(act,label)}${button('mark',v.plan[id]?'✓ Bloco feito':'Marcar bloco feito','data-block="'+id+'"','quiet')}</article>`).join('')}</div>
  <section class="eve-topics"><h3>Revisão pelos teus grupos de dificuldade</h3>
   <p>Os números indicam os grupos da tua apostila. Os itens do treino usam os números dos cadernos oficiais do ENEM.</p>
   <div class="eve-groups">${data.groups.map(g => `<article><h4>${esc(g.title)}</h4>
    <small>${g.workbook.length ? 'Referências da apostila · ' + g.workbook.join(', ') : 'Complemento para tua meta de Humanas'}</small>
    <p>${g.terms.map(id => button('term',esc(entries.get(id).title),'data-term="'+id+'"','quiet')).join('')}</p>
    ${button('group','Treinar 5 questões reais →','data-group="'+g.id+'"')}</article>`).join('')}
   </div>
  </section>
  <section class="eve-links"><h3>Humanas e Redação que já estão no site</h3>
   ${summaries('humanas','Humanas')}${summaries('redacao','Redação')}
   ${button('library','Biblioteca de autores e conceitos ↗')} ${button('dayone','Abrir revisão do primeiro dia ↗')}
  </section>
  <details class="eve-sources"><summary>Conteúdo e fontes</summary>
   <p>Os comentários, cartões e exemplos de redação são autorais. O acervo deste modo reúne ${ids().length} questões oficiais com gabaritos conferidos em oito cadernos azuis.</p>
   ${data.sources.map(s => `<p><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></p>`).join('')}
  </details>`;
 }
 function cards(){
  if(!flashIds.length||flashIndex>=flashIds.length){flashIds=data.entries.slice().sort((a,b)=>Number(state().cards[a.id]==='known')-Number(state().cards[b.id]==='known')).slice(0,5).map(e=>e.id);flashIndex=0;flashRevealed=false;}
  const e=entries.get(flashIds[flashIndex]);return '<section class="eve-flash panel"><p class="eyebrow">FLASHCARD AUTORAL · '+(flashIndex+1)+'/5</p><h2>'+esc(e.title)+'</h2><p>'+esc(e.example)+'</p><p class="eve-muted">Como tu explicaria esse conceito? Qual pista aparece no exemplo?</p>'+(flashRevealed?'<div class="eve-flash-answer"><p>'+esc(e.definition)+'</p><p><b>Como reconhecer:</b> '+esc(e.recognize)+'</p><p><b>Diferença:</b> '+esc(e.difference)+'</p></div>'+button('card-known','Eu lembrava','', 'primary')+' '+button('card-review','Quero revisar de novo'):button('card-reveal','Revelar explicação','','primary'))+'<p>As marcações dos cartões não entram nos acertos das questões.</p>'+button('genres','Ver cartões de gêneros e recursos')+'</section>';
 }
 function genres(){return '<h2>Gêneros e recursos, sem decorar pela palavra isolada</h2><div class="eve-compare"><h3>Gênero × tipo textual</h3><p>'+esc(entries.get('genero-tipo').definition)+'</p><p>'+esc(entries.get('genero-tipo').example)+'</p></div><h3>Oito gêneros</h3><div class="eve-card-grid">'+data.entries.filter(e=>e.kind==='genero').map(entry).join('')+'</div><h3>Sete recursos de linguagem</h3><div class="eve-card-grid">'+data.entries.filter(e=>e.kind==='recurso').map(entry).join('')+'</div>';}
 function readDraft() {
  return cleanDraft({
   command: $('eveCommand')?.value,
   evidence: $('eveEvidence')?.value,
   discursive: $('eveDiscursive')?.value,
   confidence: $('eveConfidence')?.value,
   choice: session()?.draft?.choice,
  }, current()?.id || '');
 }
 function flushDraft() {
  if (!$('eveCommand') || !current() || response()) return true;
  clearTimeout(draftTimer);
  const d = readDraft();
  if (Object.keys(d).every(key => d[key] === session().draft[key])) return true;
  return write(s => { s[sessionKey].draft = d; });
 }
 function explanation(q) {
  return data.questions[q.id].explanation || globalThis.FURG_ENEM_SOLUTIONS?.[q.id]?.paragraphs || [];
 }
 function commentEditor(a) {
  return `<details class="eve-comment">
   <summary>${a.comment ? 'Editar meu comentário' : 'Escrever meu comentário'}</summary>
   <label for="eveComment-${esc(a.id)}">O que eu percebi depois de conferir?</label>
   <textarea id="eveComment-${esc(a.id)}" data-eve-comment="${esc(a.id)}" maxlength="2400" rows="3"
    placeholder="O detalhe que eu deixei passar, o termo que aprendi ou o que vou testar na próxima…">${esc(pendingComments.get(a.id) ?? a.comment)}</textarea>
   <div class="eve-action-row">${button('save-comment','Salvar comentário')}<small>Teu comentário fica no caderno e na exportação do progresso.</small></div>
  </details>`;
 }
 function flushComments() {
  clearTimeout(commentTimer);
  if (!pendingComments.size) return true;
  const changes = state().attempts.filter(a => pendingComments.has(a.id) && pendingComments.get(a.id) !== a.comment);
  if (changes.length) {
   const date = new Date().toISOString();
   if (!write(s => {
    for (const a of s.attempts) {
     if (!pendingComments.has(a.id) || pendingComments.get(a.id) === a.comment) continue;
     a.comment = pendingComments.get(a.id);
     a.commentAt = date;
    }
   })) return false;
  }
  pendingComments.clear();
  return true;
 }
 function writtenResponse(a) {
  return a.discursive ? `<p class="eve-discursive-text"><b>Minha resposta discursiva</b><br>${esc(a.discursive)}</p>` : '';
 }
 function feedback(q, a) {
  const n = data.questions[q.id], wrong = n.wrong[a.choice];
  return `<section class="eve-feedback ${a.correct ? 'correct' : 'wrong'}" role="region" aria-label="Feedback da questão">
   <h3 id="eveFeedbackTitle" tabindex="-1">${a.correct ? 'Resposta correta' : 'Vamos revisar o raciocínio'} · Gabarito ${q.answer}</h3>
   <p><b>O comando pedia</b> ${esc(n.command)}</p>
   <p><b>${n.evidenceKind === 'imagem' ? 'Pista na imagem' : 'Pista no texto'}</b> ${esc(n.evidence)}</p>
   <p class="eyebrow">MODELO COMENTADO · RESOLUÇÃO AUTORAL</p>
   ${explanation(q).map(p => `<p>${esc(p)}</p>`).join('')}
   ${n.reference ? `<a href="${esc(n.reference.url)}" target="_blank" rel="noopener">${esc(n.reference.label)} ↗</a>` : ''}
   ${wrong ? `<div class="eve-trap"><b>Por que a alternativa ${a.choice} se afasta do comando</b><p>${esc(wrong.why)}</p>
    <label for="eveCategory">Classificação sugerida do erro</label>
    <select id="eveCategory" data-eve-category="${esc(a.id)}">${Object.entries(categories).map(([id, label]) =>
     `<option value="${id}" ${a.category === id ? 'selected' : ''}>${esc(label)}</option>`).join('')}</select>
    <small>Tu pode ajustar a categoria para registrar o que aconteceu no teu raciocínio.</small></div>` : ''}
   <details><summary>Comparar com o que eu escrevi</summary>
    <p><b>Meu comando</b> ${esc(a.command)}</p><p><b>Minha evidência</b> ${esc(a.evidence)}</p>
    ${writtenResponse(a)}<p><b>Confiança</b> ${confidenceLabels[a.confidence]}</p>
   </details>
   <div class="eve-term-links">${n.terms.map(id => button('term',esc(entries.get(id).title),'data-term="'+id+'"','quiet')).join('')}</div>
  </section>
  ${button('next', session().index === session().ids.length - 1 ? 'Ver balanço →' : 'Próxima questão →', '', 'primary eve-next')}
  ${commentEditor(a)}`;
 }
 function reasoning(d, item) {
  const hint = item?.hint || 'Destaca o verbo do comando e o limite do que ele pede. Depois procura uma pista que sustente tua escolha.';
  return `<section class="eve-reasoning"><h3>Antes do gabarito, registra tua leitura</h3>
   ${state().hints ? `<p class="eve-hint"><b>Dica de leitura</b> ${esc(hint)}</p>` : ''}
   <label for="eveCommand">O comando está pedindo…</label>
   <textarea id="eveCommand" rows="2" maxlength="1600" placeholder="Reescreve a tarefa com tuas palavras.">${esc(d.command)}</textarea>
   <label for="eveEvidence">O trecho que sustenta minha resposta é…</label>
   <textarea id="eveEvidence" rows="2" maxlength="2000" placeholder="Cita uma pista do texto ou descreve o que aparece na imagem.">${esc(d.evidence)}</textarea>
   <details class="eve-discursive" ${d.discursive ? 'open' : ''}><summary>Escrever resposta discursiva · opcional</summary>
    <label for="eveDiscursive">Como eu responderia com minhas palavras?</label>
    <textarea id="eveDiscursive" rows="3" maxlength="2400" placeholder="Explica em 1–3 frases como a pista sustenta tua conclusão.">${esc(d.discursive)}</textarea>
   </details>
   <label for="eveConfidence">Minha confiança</label>
   <select id="eveConfidence"><option value="">Escolhe antes de conferir</option>
    ${confidences.map(c => `<option value="${c}" ${d.confidence === c ? 'selected' : ''}>${confidenceLabels[c]}</option>`).join('')}
   </select>
  </section>`;
 }
 function train() {
  const s = session(), long = sessionKey === 'percurso';
  if (!s) return `<div class="eve-empty"><h2>Escolhe teu treino</h2>
   <p>Registra comando, evidência e confiança antes de conferir o gabarito.</p>
   <div class="eve-action-row">${button('percurso', unfinished(state().percurso) ? 'Retomar percurso de 25' : 'Percurso de 25', '', 'primary')}
    ${button('start','Bloco de 5')}</div></div>`;
  if (!unfinished(s)) {
   const a = state().attempts.filter(a => a.batch === s.id), n = a.filter(a => a.exposure === 'new'), r = a.filter(a => a.exposure === 'repeat');
   return `<section class="eve-summary panel"><h2>${long ? 'Percurso' : 'Bloco'} concluído</h2>
    <p>Novas ${n.filter(a => a.correct).length}/${n.length} · Repetidas ${r.filter(a => a.correct).length}/${r.length}</p>
    <p>${a.filter(a => !a.correct && a.confidence === 'alta').length} erros com confiança alta neste treino.</p>
    <div class="eve-action-row">${button('errors','Revisar meus erros','','primary')} ${button('notes','Abrir meu caderno')} ${button('start','Treinar 5 questões')}</div>
   </section>`;
  }
  const q = current();
  if (!q || !eligible(q.id)) return '<p>Este item precisa de nova conferência antes de ser usado. Teus registros foram mantidos.</p>';
  const a = response(), d = s.draft, item = long ? trailById.get(q.id) : null;
  blockedImage = false;
  return `<article id="eveQuestion" class="eve-question" data-question-id="${esc(q.id)}">
   <div class="eve-question-top"><p class="eyebrow">${esc(s.label)} · ${s.index + 1}/${s.ids.length}</p>
    ${button('plan','Pausar e voltar ao plano','','quiet')}</div>
   ${item ? `<div class="eve-stage-caption">Bloco ${item.block + 1}/${trailBlocks.length} · ${esc(trailBlocks[item.block].title)}</div>` : ''}
   <h2 id="eveQuestionTitle" tabindex="-1">ENEM ${q.year} · Questão ${q.index}${q.language === 'ingles' ? ' · Inglês' : ''} · ${q.area === 'ciencias-humanas' ? 'Humanas' : 'Linguagens'}</h2>
   <p class="eve-muted">Caderno azul · ${a ? (a.exposure === 'repeat' ? 'Repetida' : 'Nova') : (wasSeen(q.id) ? 'Repetida' : 'Nova neste histórico')}${item && state().hints ? ' · ' + esc(item.skill) : ''}</p>
   ${referenceLinks(q)}${globalThis.FurgEnem.body(q)}
   <p id="eveImageStatus" class="eve-image-status" role="status" hidden></p>
   ${a ? '' : reasoning(d, item)}
   <h3 class="eve-alternatives-title">Alternativas</h3>
   <div class="enem-options">${q.alternatives.map(alt => {
    const selected = (a?.choice || d.choice) === alt.letter;
    const classes = [selected ? 'selected' : '', a && alt.letter === q.answer ? 'correct' : '', a && selected && !a.correct ? 'wrong' : ''].join(' ');
    return `<button type="button" class="enem-option ${classes}" data-eve="choose" data-letter="${alt.letter}" aria-pressed="${selected}" ${a ? 'disabled' : ''}><b>${alt.letter}</b><span>${globalThis.FurgEnem.markdown(alt.text)}</span></button>`;
   }).join('')}</div>
   ${a ? feedback(q, a) : `<div class="eve-answer-actions">${button('submit','Conferir raciocínio e resposta',!d.choice?'disabled':'','primary')} ${button('dictionary','Consultar um termo','','quiet')}</div>`}
  </article>`;
 }
 function notebook() {
  const notes = state().attempts.filter(a => a.discursive || a.comment).slice().reverse();
  return `<section class="eve-notes"><h2>Meu caderno de respostas</h2>
   <p>Relembra como tu chegou à resposta e o que mudou depois de conferir.</p>
   ${notes.length ? notes.map(a => {
    const q = bank.get(a.questionId);
    return `<article class="panel"><h3>ENEM ${q.year} · Questão ${q.index}${q.language === 'ingles' ? ' · Inglês' : ''}</h3>
     <p class="eve-muted">${a.correct ? 'Acerto' : 'Erro'} · Confiança ${confidenceLabels[a.confidence].toLowerCase()} · ${new Date(a.date).toLocaleDateString('pt-BR')}</p>
     ${writtenResponse(a)}${commentEditor(a)}
     <details><summary>Reler a resolução comentada</summary><p>Gabarito ${q.answer} · Tua resposta ${a.choice}</p>
      ${explanation(q).map(p => `<p>${esc(p)}</p>`).join('')}</details>
    </article>`;
   }).join('') : '<p>Teus textos aparecem aqui depois de conferir uma resposta discursiva ou salvar um comentário.</p>'}
  </section>`;
 }
 function repertoryGroups(axis) {
  const {art, news, kit} = axis;
  const research = kit.study || {title: news.label, text: news.fact, url: news.url};
  const intro = ['introducao'];
  const argument = ['desenvolvimento'];
  const both = ['introducao', 'desenvolvimento'];
  const evidence = [
   {...kit.pocket, kind: 'De bolso', uses: both},
   {kind: 'Obra cultural', title: art.title, text: art.connection, url: art.url, uses: both},
   {...kit.music, kind: 'Música', uses: both},
   {...research, kind: 'Dado de pesquisa', uses: argument},
  ];
  if (kit.study) evidence.push({
   kind: 'Dado complementar', title: news.label, text: news.fact, url: news.url, uses: argument,
  });
  return [
   {
    title: 'Para abrir o tema',
    items: [
     {kind: 'Consenso geral', title: 'Ponto de partida', text: kit.consensus, uses: intro},
     {...kit.area, kind: 'Área do conhecimento', uses: intro},
    ],
   },
   {title: 'Repertórios para argumentar', items: evidence},
   {
    title: 'Agentes para a proposta de intervenção',
    items: kit.agents.map(agent => ({...agent, kind: 'Agente', uses: ['conclusao']})),
   },
  ];
 }

 function repertoryBadges(uses) {
  return `<div class="eve-repertoire-badges" aria-label="Uso sugerido">
   ${uses.map(use => `<span title="Usável para ${repertoryUses[use].toLowerCase()}">${repertoryUses[use]}</span>`).join('')}
  </div>`;
 }

 function repertoryItem(item) {
  const source = item.url ? `<a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${esc(item.source || 'Conferir a fonte')} ↗</a>` : '';
  const profile = item.profile ? button('repertory-profile', 'Ver perfil na Biblioteca ↗', `data-profile="${esc(item.profile)}"`, 'quiet') : '';
  return `<article class="eve-repertoire-item" data-repertory-kind="${esc(item.kind)}">
   <p class="eyebrow">${esc(item.kind)}</p>
   <h4>${esc(item.title)}</h4>
   ${repertoryBadges(item.uses)}
   <p>${esc(item.text)}</p>
   ${item.opening ? `<div class="eve-repertoire-opening"><strong>Exemplo de abertura</strong><p>${esc(item.opening)}</p></div>` : ''}
   ${source || profile ? `<div class="eve-repertoire-sources">${source}${profile}</div>` : ''}
  </article>`;
 }

 function repertoryDevelopment(axis, open) {
  const {title, reference, parts} = axis.development;
  const {pocket, music, study} = axis.kit;
  const source = {art: axis.art, pocket, music, study: study || axis.news}[reference];
  const stepNumber = number => `<span class="eve-development-number" aria-hidden="true">${number}</span>`;
  return `<details class="eve-development" ${open ? 'open' : ''}>
   <summary>Desenvolvimento em 7 partes</summary>
   <h3>${esc(title)}</h3>
   <p class="eve-muted">Modelo autoral de parágrafo</p>
   <ol class="eve-development-legend" role="list" aria-label="Legenda das sete partes">
    ${developmentSteps.map((step, index) => `<li data-step="${index + 1}">${stepNumber(index + 1)}${esc(step)}</li>`).join('')}
   </ol>
   <p class="eve-development-paragraph">${parts.map((part, index) =>
    `<span class="eve-development-part" data-step="${index + 1}" title="${esc(developmentSteps[index])}">${stepNumber(index + 1)}<span class="sr-only">${esc(developmentSteps[index])}. </span>${esc(part)}</span>`
   ).join(' ')}</p>
   <p class="eve-muted">O passo 5 liga o repertório a um efeito do problema. O passo 6 mostra o que esse primeiro efeito provoca.</p>
   <div class="eve-repertoire-sources"><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Fonte do repertório · ${esc(source.source || source.label || source.title)} ↗</a></div>
  </details>`;
 }

 function repertoryCard(axis, groups, open) {
  const showExample = !repertoryFilter.use || repertoryFilter.use === 'desenvolvimento';
  return `<details class="eve-repertoire-card panel" data-eve-axis="${esc(axis.id)}" ${open ? 'open' : ''}>
   <summary><span class="eve-repertoire-title">${esc(axis.title)}</span><span class="eve-repertoire-angle">${esc(axis.angle)}</span></summary>
   ${showExample ? repertoryDevelopment(axis, open && repertoryFilter.use === 'desenvolvimento') : ''}
   ${groups.map(group => `<section class="eve-repertoire-group">
    <h3>${esc(group.title)}</h3>
    <div class="eve-repertoire-items">${group.items.map(repertoryItem).join('')}</div>
   </section>`).join('')}
   ${showExample ? `<details class="eve-repertoire-example"><summary>Ver dica e exemplo de parágrafo</summary>
    ${repertoryBadges(['desenvolvimento'])}<p>${esc(axis.tip)}</p><h4>Exemplo autoral</h4><p>${esc(axis.example)}</p>
   </details>` : ''}
  </details>`;
 }

 function repertoryView() {
  return `<section class="eve-repertories">
   <h2>Repertórios de Redação por eixo</h2>
   <p>Escolhe um eixo ou busca uma referência. Os selos indicam onde cada item pode ajudar na redação.</p>
   <div class="eve-repertoire-search">
    <label for="eveRepertoryAxis">Eixo temático
     <select id="eveRepertoryAxis"><option value="">Todos os eixos</option>
      ${repertories.map(axis => `<option value="${esc(axis.id)}" ${repertoryFilter.axis === axis.id ? 'selected' : ''}>${esc(axis.title)}</option>`).join('')}
     </select>
    </label>
    <label for="eveRepertoryUse">Parte da redação
     <select id="eveRepertoryUse"><option value="">Todas as partes</option>
      ${Object.entries(repertoryUses).map(([use, label]) => `<option value="${use}" ${repertoryFilter.use === use ? 'selected' : ''}>${label}</option>`).join('')}
     </select>
    </label>
    <label for="eveRepertorySearch">Buscar tema, autor ou obra
     <input type="search" id="eveRepertorySearch" autocomplete="off" value="${esc(repertoryFilter.query)}" placeholder="Educação, rap, clima, mobilidade…">
    </label>
   </div>
   <p id="eveRepertoryCount" aria-live="polite"></p>
   <div id="eveRepertoryResults" class="eve-repertoire-grid"></div>
   <p id="eveRepertoryEmpty" hidden>Nenhum eixo encontrado com esses filtros. Tenta outro termo ou seleciona todos os eixos.</p>
   <p class="eve-muted">As aberturas, aplicações e propostas são exemplos autorais. Escolhe a referência que ajuda a explicar o recorte da prova. <a href="https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/a-redacao-do-enem-2026-cartilha-do-a-participante" target="_blank" rel="noopener noreferrer">Cartilha de Redação do Inep ↗</a></p>
  </section>`;
 }

 function filterRepertories() {
  const {axis: selected, use, query} = repertoryFilter;
  const words = norm(query).trim().split(/\s+/).filter(Boolean);
  const matches = [];
  for (const axis of repertories) {
   if (selected && selected !== axis.id) continue;
   const groups = repertoryGroups(axis).map(group => ({
    ...group, items: group.items.filter(item => !use || item.uses.includes(use)),
   })).filter(group => group.items.length);
   if (!groups.length) continue;
   const items = groups.flatMap(group => group.items);
   const searchText = norm([
    axis.title, axis.angle, ...axis.tags,
    ...items.flatMap(item => [item.kind, item.title, item.text, item.source, item.opening]),
   ].join(' '));
   if (words.every(word => searchText.includes(word))) matches.push({axis, groups});
  }
  const count = matches.length;
  $('eveRepertoryResults').innerHTML = matches.map(({axis, groups}) => repertoryCard(axis, groups, count === 1)).join('');
  $('eveRepertoryCount').textContent = count + (count === 1 ? ' eixo temático' : ' eixos temáticos');
  $('eveRepertoryEmpty').hidden = count > 0;
 }
 function errorView(){const items=errors(reviewHigh),st=stats();return '<section class="eve-errors"><h2>Revisar meus erros</h2><label class="eve-switch"><input id="eveReviewHigh" type="checkbox" '+(reviewHigh?'checked':'')+'> Só erros pendentes com confiança alta</label><p>'+st.highErrors+' '+(st.highErrors===1?'erro com confiança alta registrado':'erros com confiança alta registrados')+' no histórico deste modo. A fila usa a tentativa mais recente de cada questão; um acerto posterior retira o item dos pendentes.</p>'+(items.length?button('review-all','Treinar até 5 destes erros','','primary'):'<p>Nenhum erro pendente neste filtro. Os erros antigos do banco aparecem quando a questão pertence ao acervo deste modo.</p>')+items.map(a=>{const q=bank.get(a.questionId),n=data.questions[a.questionId],w=n.wrong[a.choice];return '<article class="eve-error-card"><h3>ENEM '+q.year+' · Questão '+q.index+(q.language==='ingles'?' · Inglês':'')+'</h3><p>'+(a.legacy?'Erro anterior no banco · confiança não registrada':'Confiança '+confidenceLabels[a.confidence].toLowerCase()+' · '+esc(categories[a.category]||'Ainda sem classificação'))+'</p><p><b>Tarefa:</b> '+esc(n.command)+'</p><p>'+esc(w?.why||'Relê o comando e confere as pistas no texto.')+'</p>'+button('review-one','Refazer em leitura guiada','data-question="'+q.id+'"')+' '+button('term','Revisar '+esc(entries.get(n.terms[0]).title),'data-term="'+n.terms[0]+'"','quiet')+'</article>';}).join('')+performanceTable(st)+'</section>';}
 function performanceTable(st){return '<h3>Acertos separados por exposição</h3><div class="eve-table-wrap"><table><thead><tr><th>Área</th><th>Novas</th><th>Repetidas</th></tr></thead><tbody>'+Object.entries(st.areas).map(([id,v])=>'<tr><th>'+(id==='linguagens'?'Linguagens':'Humanas')+'</th><td>'+v.new.correct+'/'+v.new.total+'</td><td>'+v.repeat.correct+'/'+v.repeat.total+'</td></tr>').join('')+'</tbody></table></div><p>São contagens deste treino, sem estimativa de TRI. A dificuldade da apostila não é transferida para estas questões.</p>';}
 const views = {plan, train, repertories: repertoryView, notes: notebook, errors: errorView, cards, genres};
 function render() {
  if (!adapter || !$('vesperaRoot')) return;
  const titles = {plan:'Plano', train:'Treino guiado', repertories:'Repertórios', notes:'Caderno', errors:'Meus erros', cards:'Flashcards', genres:'Gêneros e recursos'};
  $('vesperaRoot').innerHTML = `<div class="eve-toolbar">
   <div class="eve-tabs" aria-label="Seções do Modo Véspera">${Object.entries(titles).map(([id, title]) =>
    button(id,title,'aria-pressed="'+String(tab === id)+'"','quiet')).join('')}</div>
   <div class="eve-settings">${button('dictionary','Dicionário lateral ↗')}
    <label class="eve-switch"><input id="eveHints" type="checkbox" ${state().hints ? 'checked' : ''}> Dicas de leitura</label>
   </div>
  </div><p id="eveLive" role="status" aria-live="polite"></p>
  <div class="eve-content">${views[tab]()}</div>`;
  if (tab === 'repertories') filterRepertories();
 }
 function focusQuestion() {
  const title = $('eveQuestionTitle');
  if (!title) return;
  title.focus({preventScroll:true});
  title.scrollIntoView({behavior:globalThis.FurgUI?.reducedMotion()?'auto':'smooth',block:'start'});
 }
 function queueDraft() {
  const s = session(), q = current();
  if (!s || !q || response()) return;
  const d = readDraft(), key = sessionKey, batch = s.id, index = s.index;
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => {
   const progress = state()[key];
   if (progress?.id === batch && progress.index === index &&
       !state().attempts.some(a => a.batch === batch && a.questionId === q.id)) write(v => { v[key].draft = d; });
  }, 300);
 }
 function queueComment(input) {
  pendingComments.set(input.dataset.eveComment, limited(input.value, 2400).trim());
  clearTimeout(commentTimer);
  commentTimer = setTimeout(flushComments, 300);
 }
 function init(value) {
  adapter = value;
  adapter.getState().vespera = validate(adapter.getState().vespera);
  if (bound || !$('vesperaRoot')) return;
  bound = true;
  globalThis.addEventListener?.('pagehide', () => { flushDraft(); flushComments(); });
  $('vesperaRoot').addEventListener('input', e => {
   if (['eveCommand','eveEvidence','eveDiscursive'].includes(e.target.id)) queueDraft();
   else if (e.target.dataset.eveComment) queueComment(e.target);
   else if (e.target.id === 'eveRepertorySearch') {
    repertoryFilter.query = e.target.value;
    filterRepertories();
   }
  });
  $('vesperaRoot').addEventListener('change', e => {
   if (e.target.id === 'eveHints') {
    if (flushDraft() && flushComments() && write(s => { s.hints = e.target.checked; })) render();
   } else if (e.target.id === 'eveReviewHigh') {
    reviewHigh = e.target.checked;
    render();
   } else if (e.target.id === 'eveRepertoryAxis' || e.target.id === 'eveRepertoryUse') {
    const key = e.target.id === 'eveRepertoryAxis' ? 'axis' : 'use';
    repertoryFilter[key] = e.target.value;
    filterRepertories();
   } else if (e.target.id === 'eveConfidence') queueDraft();
   else if (e.target.dataset.eveComment) {
    queueComment(e.target);
    flushComments();
   } else if (e.target.dataset.eveCategory && Object.hasOwn(categories, e.target.value)) {
    write(s => {
     const a = s.attempts.find(a => a.id === e.target.dataset.eveCategory);
     if (a && !a.correct) a.category = e.target.value;
    });
   }
  });
  $('vesperaRoot').addEventListener('error',e=>{if(e.target.tagName==='IMG'&&current()&&!response()){blockedImage=true;const p=$('eveImageStatus');if(p){p.hidden=false;p.textContent='A imagem não carregou. Abre a prova original ou tenta novamente antes de responder.';}}},true);
  $('vesperaRoot').addEventListener('click',e=>{
   const b=e.target.closest('button[data-eve]');if(!b||b.disabled)return;const action=b.dataset.eve;
   if (Object.hasOwn(views, action)) {
    if (!flushDraft() || !flushComments()) return;
    if (action === 'train' && !unfinished(session()) && unfinished(state().percurso)) sessionKey = 'percurso';
    tab = action;
    render();
    return;
   }
   if(action==='dictionary'){openDictionary();return;}if(action==='term'){openDictionary(entries.get(b.dataset.term)?.title||'');return;}
   if (['start', 'group', 'percurso'].includes(action)) {
    if (flushDraft() && flushComments()) start(action === 'percurso' ? 'percurso' : b.dataset.group || 'mix');
    return;
   }
   if (action === 'choose' && current() && !response()) {
    clearTimeout(draftTimer);
    const d = readDraft();
    d.choice = b.dataset.letter;
    if (write(s => { s[sessionKey].draft = d; })) {
     // Keep focus and the expanded writing field while updating the selected option.
     for (const alt of $('eveQuestion').querySelectorAll('[data-eve="choose"]')) {
      const selected = alt.dataset.letter === d.choice;
      alt.classList.toggle('selected', selected);
      alt.setAttribute('aria-pressed', String(selected));
     }
     $('eveQuestion').querySelector('[data-eve="submit"]').disabled = false;
    }
    return;
   }
   if (action === 'save-comment') {
    queueComment(b.closest('.eve-comment').querySelector('[data-eve-comment]'));
    if (flushComments()) say('Comentário salvo no teu caderno.');
    return;
   }
   if(action==='submit'){record(readDraft());return;}if(action==='next'){next();return;}
   if(action==='review-all'){start('errors',errors(reviewHigh).map(a=>a.questionId));return;}if(action==='review-one'){start('errors',[b.dataset.question]);return;}
   if(action==='mark'){if(write(s=>{s.plan[b.dataset.block]=new Date().toISOString();}))render();return;}
   if(action==='card-reveal'){flashRevealed=true;render();return;}
   if(['card-known','card-review'].includes(action)&&flashRevealed){const id=flashIds[flashIndex];if(!write(s=>{s.cards[id]=action==='card-known'?'known':'review';}))return;flashIndex++;flashRevealed=false;if(flashIndex>=flashIds.length){write(s=>{s.plan.cards=new Date().toISOString();});tab='plan';flashIds=[];}render();return;}
   if (action === 'repertory-profile') {
    globalThis.FurgThinkers?.open({query: b.dataset.profile});
    return;
   }
   if(action==='library'){adapter.setView('biblioteca');return;}if(action==='dayone'){adapter.setView('leve');globalThis.FurgLightReview?.showDayOne();}
  });
  $('eveDictSearch').addEventListener('input',e=>{dictionaryQuery=e.target.value;dictionaryResults();});$('eveDictKind').addEventListener('change',e=>{dictionaryKind=e.target.value;dictionaryResults();});$('eveDictClose').onclick=()=>$('eveDictionary').close();$('eveDictionary').addEventListener('close',()=>{$('studyGuideLauncher')?.setAttribute('aria-expanded','false');lastFocus?.focus?.({preventScroll:true});});$('eveDictionary').addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();$('eveDictionary').close();}});
 }
 globalThis.FurgVespera={fresh,validate,merge,stats,search,init,render,start,record,next,errors,eligible,wasSeen,openDictionary};
})();
