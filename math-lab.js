'use strict';
(() => {
 const M=globalThis.FurgMathLabModel;
 if(!M)return;
 const {bank,catalog,formulas,models,levels,skills,reasons,confidences,kinds,modeKeys,operations}=M;
 const $=id=>document.getElementById(id);
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const date=n=>new Date(n).toLocaleDateString('pt-BR');
 const label=id=>{const q=bank.get(id);return `ENEM ${q.year} · Questão ${q.index}`;};
 const tabs={inicio:'Plano',treino:'Treino',calculo:'Cálculo mental',banco:'Banco',erros:'Caderno de erros',formulas:'Fórmulas',painel:'Desempenho',colecao:'Coleção'};
 const options=(items,selected)=>Object.entries(items).map(([key,name])=>`<option value="${esc(key)}" ${String(selected)===key?'selected':''}>${esc(name)}</option>`).join('');
 const button=(action,text,value='',style='outline',attrs='')=>`<button type="button" class="${style}" data-ml="${action}" data-value="${esc(value)}" ${attrs}>${esc(text)}</button>`;
 const badge=text=>`<span class="ml-badge">${esc(text)}</span>`;
 const h2=text=>`<h2 id="mlFocus" tabindex="-1">${esc(text)}</h2>`;
 const actions=inner=>`<div class="ml-actions">${inner}</div>`;
 const modeDescription={
  guiado:'Usa uma pista por vez e confere dois caminhos após responder.',
  adaptativo:'Ajusta o nível pelos últimos acertos sem ajuda. Depois de um erro, procura um exercício parecido.',
  ferramenta:'Escolhe o conceito ou a fórmula antes de começar a calcular.',
  relampago:'Três questões a partir de erros recentes, revisões e assuntos pouco praticados.',
  espacada:'Refaz as questões que voltaram à fila de hoje.',
  tempo:'Uma questão oficial com 3 minutos no relógio.',
 };
 const stepNames=['Entende o pedido','Organiza os dados','Escolhe um caminho'];
 const formulaNotes={
  percentual:'p é a taxa em %, total é o valor de referência e parte é o resultado, na mesma unidade do total.',
  proporcao:'x e y são as grandezas comparadas. k é a constante, nas unidades de y/x ou de x × y.',
  escala:'Em 1:n, n é o fator de redução linear. Os comprimentos do quociente têm a mesma unidade.',
  'custo-fixo':'Quantidade está na unidade cobrada. Preço unitário está em reais por unidade, e total e parcela fixa estão em reais.',
  quadratica:'x é a entrada. a, b e c são os coeficientes. a determina a concavidade e c é f(0). −b/(2a) está na unidade de x.',
  pa:'aₙ é o termo na posição n, r é a diferença entre vizinhos e Sₙ é a soma dos n primeiros termos.',
  pg:'a₁ é o primeiro termo e aₙ é o termo na posição n. q é a razão da progressão, e i é a taxa de juros escrita em decimal.',
  probabilidade:'A é o evento de interesse. P(A) é uma razão sem unidade, que pode aparecer como fração, decimal ou porcentagem.',
  condicional:'A é o evento procurado e B é a condição que limita o universo. P(A e B) considera os dois ao mesmo tempo.',
  fatoracao:'a e b são números ou expressões. As igualdades são identidades algébricas, válidas para quaisquer a e b reais.',
  superficie:'A é a área total, r é o raio e h é a altura. Use a mesma unidade para todas as medidas de comprimento.',
 };
 let adapter,bound=false,tab='inicio',gradeTimer='',mentalTimer='',mentalMode='leve',operation='',chapter=1;
 let formulaQuery='',formulaOpen='',bankPage=0;
 let filters={skill:'',level:'',year:'',query:'',guided:false},errorFilter='pendentes';
 const root=()=>adapter.getState();
 const state=()=>root().mathLab;
 const session=()=>state().session;
 const qid=()=>session()?.ids[session().pos];
 const completed=s=>s && s.pos>=s.ids.length;
 const currentGrade=()=>state().attempts.find(a=>a.id===session()?.grade);
 const active=()=>$('matematica-lab')?.classList.contains('active');
 const focus=id=>$(id)?.focus?.({preventScroll:true});
 const notify=message=>adapter.toast?.(message);
 function write(patch) {
  const old=state();
  root().mathLab={...old,...patch};
  if(adapter.save())return true;
  root().mathLab=old;
  notify('Não foi possível salvar o treino. Tenta novamente.');
  return false;
 }
 function view(name,focusTitle=true) {
  if(!M.own(tabs,name))return;
  if(name==='formulas'&&qid()&&!session().grade&&!session().aid&&!patchQuestion({aid:true},false))return;
  tab=name;
  render();
  if(focusTitle)focus('mlFocus');
 }
 function saveMark(type,id) {
  if(!M.markValid(type,id))return false;
  const key=type+':'+id, value=!M.marksFor(state(),type,id);
  return write({marks:{...state().marks,[key]:{value,at:Date.now()}}});
 }
 const markButton=(type,id,text)=>button('mark',M.marksFor(state(),type,id)?'★ '+text+' salvo':'☆ Salvar '+text,type+':'+id,'quiet',
  `aria-pressed="${M.marksFor(state(),type,id)}"`);

 function begin(kind,id,now=Date.now()) {
  if(!M.own(kinds,kind))return false;
  const ids=M.choose(root(),kind,id,now);
  if(!ids.length){
   notify(kind==='espacada'?'A fila de hoje está em dia.':'Nenhuma questão disponível nesse treino.');
   return false;
  }
  const next={id:M.uid(),kind,ids,pos:0,at:now,hint:0,aid:false,tool:'',pattern:false,draft:M.emptyDraft(),
   deadline:kind==='tempo'?now+M.timeLimit:0,grade:''};
  if(!write({session:next}))return false;
  gradeTimer='';
  view('treino');
  return true;
 }

 function patchQuestion(patch,renderAgain=true) {
  const s=session();
  if(!qid()||s.grade)return false;
  if(!write({session:{...s,...patch}}))return false;
  if(renderAgain)render();
  return true;
 }

 function answer(input,now=Date.now()) {
  const s=session(), id=qid();
  if(!id||s.grade)return false;
  const expired=s.deadline>0&&now>=s.deadline;
  const d=M.draft(input);
  if(!expired&&(!d.choice||!d.confidence)){
   notify('Marca uma alternativa e tua confiança antes de conferir.');
   return false;
  }
  if(s.kind==='ferramenta'&&!s.tool&&!expired)return false;
  const a={id:M.uid(),qid:id,at:now,choice:expired?'':d.choice,confidence:d.confidence,
   correct:!expired&&d.choice===bank.get(id).answer,guess:d.guess,aid:s.aid||s.hint>0||d.help};
  const notebook={...state().notebook};
  const prior=notebook[id], next=M.schedule(prior,a,now);
  if(next)notebook[id]=next;
  if(!write({attempts:[...state().attempts,a].slice(-1000),notebook,session:{...s,draft:d,grade:a.id}}))return false;
  render();
  focus('mlFeedback');
  return true;
 }

 function advance() {
  const s=session(), a=currentGrade();
  if(!a||!qid())return false;
  const pos=s.pos+1;
  let ids=s.ids;
  if(s.kind==='adaptativo'&&pos<ids.length){
   const done=ids.slice(0,pos), candidates=[...M.choose(root(),'adaptativo'),...ids.slice(pos),...M.guided];
   ids=[...done,...[...new Set(candidates)].filter(id=>!done.includes(id)).slice(0,ids.length-pos)];
  }
  if(!write({session:{...s,ids,pos,hint:0,aid:false,tool:'',pattern:false,grade:'',draft:M.emptyDraft()}}))return false;
  render();
  focus('mlFocus');
  return true;
 }

 function noteForm(id) {
  const n=state().notebook[id], last=state().attempts.findLast(a=>a.qid===id);
  const wasCorrect=last?.correct??(root().enem?.answers?.[id]?.choice===bank.get(id).answer);
  return `<form data-ml-form="note" data-qid="${esc(id)}" class="ml-form">
   <label>Registrar como<select name="kind">${options({erro:'Erro',chute:'Chute'},n?.kind||(wasCorrect?'chute':'erro'))}</select></label>
   <label>Motivo<select name="reason"><option value="">Vou classificar depois</option>${options(reasons,n?.reason)}</select></label>
   <label>O que eu faria diferente<textarea name="note" maxlength="900" rows="3">${esc(n?.note)}</textarea></label>
   <button class="primary" type="submit">Salvar no caderno</button>
  </form>`;
 }

 function note(id,input,now=Date.now()) {
  if(!M.valid(id)||!['erro','chute'].includes(input.kind))return false;
  const old=state().notebook[id], reason=M.own(reasons,input.reason)?input.reason:'';
  const text=typeof input.note==='string'?input.note.trim().slice(0,900):'';
  const entry=old&&old.due!==null?{...old,kind:input.kind,reason,note:text,at:now}:
   {kind:input.kind,reason,note:text,at:now,step:0,due:now+M.DAY};
  return write({notebook:{...state().notebook,[id]:entry}});
 }

 function showDialog(title,body,kind='') {
  const d=$('mlDialog');
  if(!d)return;
  d.dataset.kind=kind;
  d.innerHTML=`<div class="ml-dialog-head"><h2 id="mlDialogTitle">${esc(title)}</h2>${button('close','Fechar','','quiet')}</div>${body}`;
  if(!d.open)d.showModal();
 }
 function openNotebook(id) {
  if(!M.valid(id))return;
  showDialog(label(id),noteForm(id),'note');
 }

 function formulaBody(e) {
  return `<p class="ml-rule">${esc(e.rule)}</p><dl class="ml-defs">
   <dt>Como ler a fórmula</dt><dd>${esc(e.meaning)}</dd>
   <dt>Símbolos e unidades</dt><dd>${esc(formulaNotes[e.id]||e.symbols)}${formulaNotes[e.id]?' '+esc(e.symbols):''}</dd>
   <dt>Quando usar</dt><dd>${esc(e.when)}</dd></dl>
   <div class="ml-example"><strong>Exemplo curto</strong>${e.example.map(t=>`<p>${esc(t)}</p>`).join('')}</div>
   <p class="ml-muted">${esc(e.trap)}</p>`;
 }
 function openFormula(id) {
  const e=formulas.get(id);
  if(!e)return false;
  if(qid()&&!session().grade&&!session().aid&&!patchQuestion({aid:true},false))return false;
  showDialog(e.title,formulaBody(e)+actions(markButton('f',id,'fórmula')),'formula');
  return true;
 }
 function openGuide() {
  if(!active())adapter.setView('matematica-lab');
  formulaQuery='';
  view('formulas');
 }

 function plan() {
  const s=session(), n=M.due(state()).length, recent=M.stats(root());
  return `<div class="ml-overview"><section class="ml-panel ml-feature"><p class="eyebrow">LABORATÓRIO · MATEMÁTICA</p>
   ${h2('Qual é o próximo treino?')}<p>Pratica o raciocínio de prova, compara estratégias e volta aos pontos que tu ainda está consolidando.</p>
   ${actions(button('begin','Começar treino adaptativo →','adaptativo','primary')+
    (s&&!completed(s)?button('tab','Retomar '+kinds[s.kind].toLowerCase(),'treino'):button('tab','Escolher outro modo','treino')))}
   </section><aside class="ml-panel"><p class="eyebrow">TEU MOMENTO</p><dl class="ml-summary">
   <div><dt>Nível sugerido</dt><dd>${levels[recent.level]}</dd></div><div><dt>Revisões disponíveis hoje</dt><dd>${n}</dd></div>
   <div><dt>Próximo ponto</dt><dd>${recent.rows.length?esc(recent.priority||'Ampliar o treino'):'Fazer as primeiras questões'}</dd></div></dl></aside></div>
   <div class="ml-grid">${Object.entries(modeDescription).map(([kind,description])=>`<article class="ml-panel">
    <h3>${esc(kinds[kind])}</h3><p>${esc(description)}</p>
    ${button('begin',kind==='espacada'?'Revisar fila de hoje →':'Começar →',kind,'outline',
      kind==='espacada'&&!n?'disabled':'')}</article>`).join('')}</div>
   ${actions(button('tab','Jogar cálculo mental →','calculo')+button('tab','Filtrar questões por habilidade →','banco'))}`;
 }

 function body(q,m) {
  const shown=m?.edits?{...q,context:m.edits.reduce((text,[a,b])=>text.replace(a,b),q.context)}:q;
  return globalThis.FurgEnem.body(shown);
 }
 function supplement(m) {
  const data=m?.supplement;
  if(!data)return '';
  if(data.kind==='infografico')return `<section class="ml-example"><strong>${esc(data.description)}</strong>
    <ul>${data.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>`;
  const graphs=data.rows.map(row=>{
   const X=x=>38+(x-40)*2.35,Y=y=>120-y*7;
   return `<div><strong>${esc(row.label)} · ${esc(row.unit)}</strong>
   <svg viewBox="0 0 214 145" role="img" aria-label="${esc(row.label+' '+row.points.map(([x,y])=>x+' km/h dá '+y+' '+row.unit).join(', '))}">
   <path d="M38 18 V120 H204" class="ml-graph-axis" fill="none"/>
   ${[4,8,10,12].map(y=>`<text x="31" y="${Y(y)+4}" text-anchor="end">${y}</text><path d="M38 ${Y(y)} H204" class="ml-graph-grid"/>`).join('')}
   ${row.points.map(([x,y])=>`<path d="M${X(x)} 120 V${Y(y)}" class="ml-graph-grid"/><circle cx="${X(x)}" cy="${Y(y)}" r="5"/>
    <text x="${X(x)}" y="134" text-anchor="middle">${x}</text>`).join('')}
   </svg><p class="ml-muted">Velocidade (km/h)</p></div>`;
  }).join('');
  return `<figure class="ml-fig"><figcaption>${esc(data.description)}</figcaption><div>${graphs}</div></figure>`;
 }

 function selection(q,m,a) {
  return `<fieldset class="ml-options"><legend>Alternativas</legend>${q.alternatives.map(o=>{
   const selected=(a?a.choice:session().draft.choice)===o.letter, cls=a?(o.letter===q.answer?'correct':selected?'incorrect':''):'';
   const text=globalThis.FurgEnem.markdown(m?.options?.[o.letter]||o.text).replace(/<\/?p>/g,'')+globalThis.FurgEnem.image(o.file,'Alternativa '+o.letter);
   return `<label class="ml-option ${cls}"><input type="radio" name="choice" value="${o.letter}" ${selected?'checked':''} ${a?'disabled':'required'}>
    <strong>${o.letter}</strong><span>${text}${cls==='correct'?'<span class="sr-only"> · Resposta correta</span>':''}</span></label>`;
  }).join('')}</fieldset>`;
 }

 function toolsFor(m) {
  const candidates=['areas','mediana','probabilidade','proporcao','fatoracao','log'].filter(id=>id!==m.formula).slice(0,3);
  candidates.splice(m.title.length%4,0,m.formula);
  return candidates;
 }
 function questionTools(s,m) {
  if(!s.tool)return `<section class="ml-panel ml-clue"><h3>Qual ferramenta usar?</h3><p>Escolhe a ficha que dá o caminho mais direto para começar.</p>
   ${actions(toolsFor(m).map(id=>button('tool',formulas.get(id).title,id)).join(''))}</section>`;
  return `<p class="ml-example"><strong>${s.tool===m.formula?'Boa escolha.':'Um caminho mais direto é '+esc(formulas.get(m.formula).title)+'.'}</strong>
   ${esc(m.hints[2])} Agora tenta chegar ao resultado.</p>`;
 }
 function patternInfo(id) {
  const meta=catalog.get(id);
  const prior=M.history(root()).slice().reverse().find(a=>a.qid!==id&&models.has(a.qid)&&catalog.get(a.qid).pattern===meta.pattern);
  return `<p class="ml-muted"><strong>Padrão de resolução</strong> · ${esc(meta.pattern)}${prior?' · Já praticaste '+esc(label(prior.qid))+' neste padrão.':''}</p>
   ${prior?button('example','Rever a questão parecida',prior.qid,'quiet'):''}`;
 }
 function routes(m) {
  return `<div class="ml-routes">${m.routes.map((r,i)=>`<article><p class="eyebrow">CAMINHO ${i+1}</p><h4>${esc(r.title)}</h4>
   <p>${esc(r.text)}</p><p class="ml-muted"><strong>Quando compensa</strong> · ${esc(r.when)}</p></article>`).join('')}</div>`;
 }
 function feedback(id,q,m,a) {
  const same=!a.correct||a.guess?M.similar(id,M.history(root()),session().ids.slice(0,session().pos)):null;
  const n=state().notebook[id];
  return `<section class="ml-feedback ${a.correct?'ok':'miss'}" aria-label="Correção">
   <h3 id="mlFeedback" tabindex="-1">${a.choice?a.correct?'Acertou':'Confere teu raciocínio':'Tempo esgotado'} · Gabarito ${q.answer}</h3>
   <p class="ml-muted">${a.choice?'Marcaste '+a.choice:'Questão em branco'}${a.confidence?' · Confiança '+confidences[a.confidence].toLowerCase():''}${a.guess?' · Chute':''} · ${a.aid?'Com ajuda':'Sem ajuda'}</p>
   ${m?`<h3>Comparador de estratégias</h3>${routes(m)}`:'<p>Confere o item e o gabarito no caderno original.</p>'}
   ${patternInfo(id)}
   ${n?.due!==null&&n?.due!==undefined?`<p class="ml-muted">Próxima revisão em ${date(n.due)}.</p>`:''}
   ${actions(button('advance',session().pos+1===session().ids.length?'Ver resultado →':'Próxima questão →','','primary')+
    (same&&session().kind!=='adaptativo'?button('question','Tentar uma parecida',same):'')+
    (m?markButton('s',id,'resolução'):'')+button('note',n?'Classificar erro ou chute':'Registrar no caderno',id))}
   </section>`;
 }
 function practice() {
  const s=session(),id=qid();
  if(!s)return `${h2('Treino de Matemática')}<p>Escolhe um modo e responde no teu ritmo.</p>
   ${actions(Object.entries(modeDescription).map(([key])=>button('begin',kinds[key],key)).join(''))}`;
  if(completed(s)){
   const grades=state().attempts.filter(a=>s.ids.includes(a.qid)&&a.at>=s.at);
   const correct=grades.filter(a=>a.correct).length;
   return `<article class="ml-panel">${h2('Rodada concluída')}<p>${correct} de ${grades.length} acertos neste treino.</p>
    ${actions(button('begin',s.kind==='tempo'?'Outra questão de 3 minutos':'Treinar de novo',s.kind==='questao'?'adaptativo':s.kind,'primary')+
      button('tab','Ver desempenho','painel')+button('tab','Voltar ao plano','inicio'))}</article>`;
  }
  const q=bank.get(id),m=models.get(id),meta=catalog.get(id),a=currentGrade();
  const draft=s.draft, canAnswer=s.kind!=='ferramenta'||s.tool||!m;
  return `<article class="ml-panel ml-question" data-math-question="${esc(id)}"><header>
   <div><p class="eyebrow">${esc(kinds[s.kind])} · ${s.pos+1}/${s.ids.length}</p>${h2(label(id))}</div>
   <div class="ml-chips">${badge(levels[meta.level]+(meta.guided?' · nível didático':' · nível sugerido'))}${markButton('q',id,'questão')}</div>
   </header>${s.deadline&&!a?`<p class="ml-clock">Tempo restante <strong id="mlQuestionClock">${clock(Math.max(0,s.deadline-Date.now()))}</strong></p>`:''}
   <div class="ml-enunciation">${body(q,m)}${supplement(m)}</div>
   <p class="ml-muted"><a href="${esc(q.source?.pdf||q.source?.pdfUrl||'')}" target="_blank" rel="noopener noreferrer">Abrir caderno original ↗</a>
   ${a&&M.content.keys[q.year]?' · <a href="'+M.content.keys[q.year]+'" target="_blank" rel="noopener noreferrer">Gabarito oficial ↗</a>':''}</p>
   ${!a&&s.kind==='ferramenta'&&m?questionTools(s,m):''}
   ${a?selection(q,m,a)+feedback(id,q,m,a):canAnswer?`
    <div class="ml-clue">${m&&s.hint?`<p class="eyebrow">ETAPA ${s.hint} DE 3</p><h3>${stepNames[s.hint-1]}</h3>
     <p id="mlClue" tabindex="-1">${esc(m.hints[s.hint-1])}</p>`:''}
     ${actions((m&&s.hint<3?button('hint',s.hint?'Ver próxima etapa →':'Quero uma pista'):'')+
      (m?button('formula','Consultar fórmula',m.formula,'quiet'):'')+
      (!s.pattern?button('pattern','Reconhecer padrão','','quiet'):''))}
     ${s.pattern?patternInfo(id):''}
    </div>
    <form data-ml-form="answer" id="mlAnswerForm">${selection(q,m,null)}
     <div class="ml-answer"><label>Confiança antes de conferir<select name="confidence" required><option value="">Seleciona</option>${options(confidences,draft.confidence)}</select></label>
     <label class="ml-check"><input type="checkbox" name="guess" ${draft.guess?'checked':''}> Chutei</label>
     <label class="ml-check"><input type="checkbox" name="help" ${draft.help?'checked':''}> Usei ajuda fora do treino</label>
     <button class="primary" type="submit">Conferir resposta</button></div>
    </form>`:''}
  </article>`;
 }

 function bankItems() {
  const {skill,level,year,query,guided}=filters, words=M.norm(query).split(/\s+/).filter(Boolean);
  return [...catalog.values()].filter(meta=>(!skill||meta.skills.includes(skill))&&(!level||String(meta.level)===level)&&
   (!year||String(bank.get(meta.id).year)===year)&&(!guided||meta.guided)&&words.every(w=>meta.search.includes(w))).reverse();
 }
 function bankResults() {
  const items=bankItems(), max=Math.max(0,Math.ceil(items.length/15)-1);
  bankPage=Math.min(bankPage,max);
  const page=items.slice(bankPage*15,(bankPage+1)*15);
  return `<p role="status">${items.length} ${items.length===1?'questão':'questões'} · Página ${bankPage+1} de ${max+1}</p>
   <div class="ml-list">${page.map(meta=>{
    const q=bank.get(meta.id),clip=(q.stem||q.context||'').replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\s+/g,' ').trim().slice(0,190);
    const playable=M.valid(meta.id);
    return `<article class="ml-panel"><div class="ml-chips">${badge(levels[meta.level]+(meta.guided?' · didático':' · sugerido'))}
     ${meta.skills.map(skill=>badge(skills[skill])).join('')}</div>
     <h3>${label(meta.id)}${meta.title?' · '+esc(meta.title):''}</h3>
     <p class="ml-muted">${esc(meta.subject)}${playable?'':q.canceled?' · Anulada':' · Confira o caderno'}</p>
     <p>${esc(clip)}${clip.length===190?'…':''}</p>
     ${actions(button(meta.guided?'question':'bank-open',meta.guided?'Resolver guiado →':'Abrir no banco →',meta.id)+
      (playable?button('note','Registrar erro ou chute',meta.id,'quiet'):'')+markButton('q',meta.id,'questão'))}
    </article>`;
   }).join('')}</div>
   ${actions(button('bank-page','← Anterior','-1','outline',bankPage===0?'disabled':'')+
    button('bank-page','Próxima →','1','outline',bankPage===max?'disabled':''))}`;
 }
 function bankView() {
  const years=Object.fromEntries([...new Set([...bank.values()].map(q=>q.year))].map(year=>[year,year]));
  return `${h2('Banco por habilidade')}
   <p class="ml-muted">Fácil costuma envolver uma aplicação direta. Média combina leitura e cálculo. Difícil exige mais decisões ou restrições. Os níveis são didáticos. Nos demais itens, são sugeridos por características do enunciado.</p>
   <div class="ml-filters">
    <label>Habilidade<select id="mlSkill"><option value="">Todas</option>${options(skills,filters.skill)}</select></label>
    <label>Nível<select id="mlLevel"><option value="">Todos</option>${options(levels,filters.level)}</select></label>
    <label>Ano<select id="mlYear"><option value="">Todos</option>${options(years,filters.year)}</select></label>
    <label>Buscar termo ou questão<input id="mlSearch" type="search" value="${esc(filters.query)}" placeholder="Ex. 2025 158"></label>
    <label class="ml-check"><input id="mlGuided" type="checkbox" ${filters.guided?'checked':''}> Só questões comentadas</label>
   </div><div id="mlBankResults">${bankResults()}</div>`;
 }

 function errorsView() {
  const entries=Object.entries(state().notebook).sort((a,b)=>(a[1].due??Infinity)-(b[1].due??Infinity)||b[1].at-a[1].at);
  const pending=entries.filter(([,n])=>n.due!==null).length, due=new Set(M.due(state()));
  const rows=entries.filter(([id,n])=>errorFilter==='todos'||(errorFilter==='hoje'?due.has(id):n.due!==null));
  return `${h2('Caderno de erros e chutes')}<p>${due.size} disponíveis hoje · ${pending} em revisão. Erros e chutes voltam em 1 dia. Acertos sem ajuda passam a 3, 7 e 14 dias antes de consolidar.</p>
   ${actions(button('begin','Revisar fila de hoje →','espacada','primary',due.size?'':'disabled')+
    button('begin','Revisão relâmpago','relampago')+button('tab','Adicionar questão pelo banco','banco'))}
   <label class="ml-inline-field">Mostrar<select id="mlErrorsFilter">${options({pendentes:'Em revisão',hoje:'Para hoje',todos:'Todas as anotações'},errorFilter)}</select></label>
   <div class="ml-list">${rows.map(([id,n])=>`<article class="ml-panel"><div class="ml-chips">
    ${badge(n.kind==='chute'?'Chute':'Erro')}${badge(n.reason?reasons[n.reason]:'Motivo a classificar')}
    ${badge(n.due===null?'Consolidado':due.has(id)?'Revisar hoje':'Volta em '+date(n.due))}</div>
    <h3>${label(id)} · ${esc(catalog.get(id).subject)}</h3>${n.note?`<p class="ml-note">${esc(n.note)}</p>`:''}
    ${actions(button('question','Refazer questão →',id)+button('note','Editar motivo e anotação',id,'quiet'))}
   </article>`).join('')||'<p>Os erros e chutes registrados aparecem aqui.</p>'}</div>`;
 }

 function formulaResults() {
  const words=M.norm(formulaQuery).split(/\s+/).filter(Boolean), entries=[...formulas.values()].filter(e=>{
   const text=M.norm([e.title,e.rule,e.topic,e.meaning].join(' '));
   return words.every(word=>text.includes(word));
  });
  return `<p role="status">${entries.length} ${entries.length===1?'fórmula ou conceito':'fórmulas e conceitos'}</p>
   <div class="ml-grid">${entries.map(e=>`<details class="ml-panel" ${e.id===formulaOpen||entries.length===1?'open':''}>
    <summary>${esc(e.title)}</summary>${formulaBody(e)}${markButton('f',e.id,'fórmula')}</details>`).join('')}</div>`;
 }
 function formulasView() {
  return `${h2('Fórmulas explicadas')}<label class="ml-inline-field">Buscar fórmula ou conceito
   <input type="search" id="mlFormulaSearch" value="${esc(formulaQuery)}" placeholder="Ex. escala, mediana, Pitágoras"></label>
   <div id="mlFormulaResults">${formulaResults()}</div>`;
 }

 function reportTable(title,rows) {
  return `<section class="ml-panel"><h3>${esc(title)}</h3><div class="ml-table"><table><thead>
   <tr><th>Grupo</th><th>Acertos</th><th>Sem ajuda</th><th>Erros</th></tr></thead><tbody>
   ${rows.map(([name,a])=>`<tr><th scope="row">${esc(name)}</th><td>${a.correct}/${a.total}</td><td>${a.clean}</td><td>${a.total-a.correct}</td></tr>`).join('')}
   </tbody></table></div></section>`;
 }
 function panel() {
  const r=M.stats(root()), high=r.rows.filter(a=>a.confidence==='alta'&&!a.correct);
  const topics=Object.entries(r.byTopic).filter(([,a])=>a.total).map(([key,a])=>[M.topics.get(key),a]);
  const lastHigh=[...new Map(high.map(a=>[a.qid,a])).values()].slice(-5).reverse();
  return `${h2('Desempenho em Matemática')}<p>Inclui tentativas do laboratório, do 2º dia e primeiras respostas do banco para itens ainda sem treino guiado.</p>
   <div class="ml-panel ml-feature"><p class="eyebrow">PRÓXIMO PONTO PARA REVISAR</p><h3>${r.rows.length?esc(r.priority||'Questões novas'):'Registra as primeiras tentativas'}</h3>
    ${button('begin','Começar revisão relâmpago →','relampago','primary')}</div>
   <div class="ml-grid">
    ${reportTable('Acertos por nível',Object.entries(r.byLevel).map(([key,a])=>[levels[key],a]))}
    ${reportTable('Acertos por confiança',Object.entries(r.byConfidence).map(([key,a])=>[confidences[key]||'Não registrada',a]))}
    ${topics.length?reportTable('Acertos por assunto',topics):'<article class="ml-panel"><h3>Acertos por assunto</h3><p>Completa uma questão para preencher o painel.</p></article>'}
    <article class="ml-panel"><h3>Registros por motivo</h3><ul class="ml-tally">${Object.entries(r.errorKinds).map(([key,n])=>`<li>${esc(reasons[key]||'A classificar')} <strong>${n}</strong></li>`).join('')}</ul></article>
   </div><section class="ml-panel"><h3>Erros com confiança alta · ${high.length}</h3>
   ${lastHigh.map(a=>`<p>${esc(label(a.qid))} · ${esc(catalog.get(a.qid).subject)} ${button('question','Refazer',a.qid,'quiet')}</p>`).join('')||'<p>Nenhum erro registrado com confiança alta.</p>'}
   </section>`;
 }

 function collection() {
  const selected=Object.entries(state().marks).filter(([,m])=>m.value).map(([key])=>[key[0],key.slice(2)]);
  const names={q:'Questões-modelo',f:'Fórmulas',s:'Resoluções'};
  const content=Object.keys(names).map(type=>{
   const ids=selected.filter(([key])=>key===type).map(([,id])=>id);
   if(!ids.length)return '';
   return `<section><h3>${names[type]}</h3>${ids.map(id=>{
    const meta=catalog.get(id), e=formulas.get(id), m=models.get(id);
    return `<article class="ml-panel"><h4>${type==='f'?esc(e.title):esc(label(id)+(m?' · '+m.title:''))}</h4>
     ${type==='f'?formulaBody(e):type==='s'?routes(m):`<p>${esc(meta.subject)} · ${esc(meta.pattern)}</p>
       <div class="ml-enunciation">${body(bank.get(id),m)}${supplement(m)}</div>`}
     <div class="ml-noprint">${type==='q'?button(m?'question':'bank-open','Abrir questão',id):''}${button('mark','Remover da coleção',type+':'+id,'quiet')}</div></article>`;
   }).join('')}</section>`;
  }).join('');
  return `<div class="ml-sheet">${h2('Minha folha de revisão')}
   <p>${selected.length} itens salvos entre questões, fórmulas e resoluções.</p>
   <div class="ml-noprint">${selected.length?button('print','Imprimir ou salvar PDF →','','primary'):''}</div>
   ${content||'<p>Salva itens pelo banco, pelo guia de fórmulas ou depois da resolução.</p>'}</div>`;
 }

 function score(mode,op) {
  return state().mental.scores[M.scoreKey(mode,op)]||{level:1,xp:0,finished:false};
 }
 function clock(ms) {
  const seconds=Math.ceil(ms/1000);
  return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
 }
 function setMental(patch) {
  return write({mental:{...state().mental,...patch}});
 }
 function startMental(op,level=1,now=Date.now()) {
  if(op!=='sobrevivencia'&&(!M.own(operations,op)||!Number.isInteger(level)||level<1||level>score(mentalMode,op).level))return false;
  const t=M.mentalSeconds(mentalMode,level,op);
  const run={id:M.uid(),at:now,mode:mentalMode,op,level,seed:(Math.random()*0x100000000)|0,index:0,hits:0,xp:0,
   deadline:t?now+t*1000:0,done:false,last:'',passed:false};
  if(!setMental({run}))return false;
  mentalTimer='';
  mentalPaused=false;
  view('calculo',false);
  focus('mlMentalAnswer');
  return true;
 }
 function mentalAnswer(value,now=Date.now()) {
  const run=state().mental.run;
  if(!run||run.done)return false;
  const expired=run.deadline>0&&now>=run.deadline, parsed=M.numeric(value);
  if(!expired&&!parsed){notify('Escreve um número, decimal ou fração.');return false;}
  const q=M.mentalQuestion(run), correct=!expired&&M.equalNumber(parsed,q);
  const seconds=M.mentalSeconds(run.mode,run.level,run.op);
  const remaining=seconds?(run.deadline-now)/(seconds*1000):0;
  const hits=run.hits+Number(correct), xp=run.xp+(correct?(remaining>=0.65?30:remaining>=0.3?20:10):0);
  const survival=run.op==='sobrevivencia', index=run.index+1;
  const done=survival?(!correct||index>=200):index>=10;
  const next={...run,index,hits,xp,done,passed:!survival&&done&&hits>=8,
   deadline:done||!seconds?0:now+seconds*1000,
   last:correct?'Acertou!':(expired?'Tempo esgotado. ':'Resposta correta ')+M.formatNumber(q)+(expired?' era o resultado.':'.')};
  const scores={...state().mental.scores};
  if(done&&!survival){
   const old=score(run.mode,run.op), key=M.scoreKey(run.mode,run.op);
   scores[key]={level:next.passed?Math.min(100,Math.max(old.level,run.level+1)):old.level,
    xp:Math.min(100000000,old.xp+xp),finished:old.finished||next.passed&&run.level===100,at:now};
  }
  if(!setMental({run:next,scores,best:survival?Math.max(state().mental.best,hits):state().mental.best}))return false;
  render();
  focus(done?'mlFocus':'mlMentalAnswer');
  return true;
 }

 function mentalPlay(run) {
  const survival=run.op==='sobrevivencia', name=survival?'Sobrevivência':operations[run.op].label, seconds=M.mentalSeconds(run.mode,run.level,run.op);
  if(run.done)return `<section class="ml-speed ml-speed-result">${h2(survival?'Sobrevivência concluída':'Rodada concluída')}
   <p class="ml-equation">${run.hits}${survival?'':'/10'}</p><p>${esc(run.last)} · ${run.xp} XP na rodada.</p>
   <p>${survival?'Recorde de '+state().mental.best+' acertos seguidos.':run.passed?(run.level<100?'Próximo nível liberado.':'Nível 100 concluído.'):'A meta para liberar o próximo nível é 8 acertos.'}</p>
   ${actions((!survival&&run.passed&&run.level<100?button('mental-next','Próximo nível →','','primary'):'')+button('mental-retry','Jogar de novo',run.op)+button('mental-close','Voltar às trilhas'))}</section>`;
  const item=M.mentalQuestion(run);
  return `<section class="ml-speed ml-speed-play"><header><div><p class="eyebrow">${esc(modeKeys[run.mode].label)} · ${esc(name)}</p>
   ${h2(survival?'Sobrevivência':'Nível '+run.level)}<p>Conta ${run.index+1} de ${survival?200:10} · ${run.hits} ${run.hits===1?"acerto":"acertos"}</p></div>
   <strong>${run.xp} XP</strong></header>
   <progress class="ml-speed-progress" value="${run.index}" max="${survival?200:10}" aria-label="Progresso da rodada"></progress>
   ${seconds?`<label class="ml-speed-time">Tempo <strong id="mlMentalClock">${clock(Math.max(0,run.deadline-Date.now()))}</strong>
    <progress id="mlMentalBar" value="${Math.max(0,run.deadline-Date.now())}" max="${seconds*1000}"></progress></label>`:''}
   <p class="ml-equation">${esc(item.prompt)}</p><p class="ml-speed-last" aria-live="polite">${esc(run.last)}</p>
   <form data-ml-form="mental" class="ml-mental-form"><label for="mlMentalAnswer" class="sr-only">Tua resposta</label>
    <input id="mlMentalAnswer" name="mental" maxlength="24" inputmode="none" autocomplete="off" placeholder="Tua resposta">
    <div class="ml-keypad" role="group" aria-label="Teclado numérico">
     ${['1','2','3','4','5','6','7','8','9',',','0','⌫','/','−'].map(key=>button('keypad',key,key,'outline',key==='⌫'?'aria-label="Apagar último caractere"':'')).join('')}
     <button class="primary" type="submit">Confirmar ↵</button>
    </div>
   </form>${button('mental-pause','Voltar ao plano de cálculo','','quiet')}</section>`;
 }

 function mentalTracks() {
  const modes=Object.entries(modeKeys).map(([id,m])=>button('mode',m.label,id,'outline',`aria-pressed="${mentalMode===id}"`)).join('');
  const tracks=Object.entries(operations).map(([id,o])=>{
   const s=score(mentalMode,id);
   return `<button type="button" class="ml-operation" data-ml="operation" data-value="${id}">
    <span class="ml-op-icon" aria-hidden="true">${o.icon}</span><strong>${esc(o.label)}</strong><small>${esc(o.about)}</small>
    <span class="ml-op-level">${s.finished?'100/100 concluídos':'Nível '+s.level+'/100'} · ${s.xp} XP</span></button>`;
  }).join('');
  return `<section class="ml-speed">${h2('Cálculo mental')}<p>Escolhe o ritmo e a operação. Cada trilha tem 100 níveis, com 10 contas por rodada.</p>
   <div class="ml-modes" role="group" aria-label="Ritmo do cálculo">${modes}</div>
   <p class="ml-muted">${mentalMode==='leve'?'Tranquilo · Sem cronômetro.':'Cronômetro por conta · Ganhas mais XP ao acertar rápido.'}</p>
   <div class="ml-operations">${tracks}</div>
   <article class="ml-survival"><h3>Sobrevivência</h3><p>Quatro operações misturadas, com 20 segundos por conta. Errou ou acabou o tempo, a rodada termina.</p>
    ${button('mental-start','Começar sobrevivência →','sobrevivencia','primary')}<p>Recorde ${state().mental.best}</p></article>
  </section>`;
 }
 function mentalPath() {
  const o=operations[operation], s=score(mentalMode,operation);
  const first=(chapter-1)*5+1, step=Array.from({length:5},(_,i)=>first+i);
  return `<section class="ml-speed ml-path">${h2(o.label+' · '+modeKeys[mentalMode].label)}
   <p>Nível ${s.level}/100 · ${s.xp} XP. Acerta pelo menos 8 de 10 para avançar.</p>
   ${actions(button('mental-home','← Operações','','quiet')+button('chapter','Capítulo anterior','-1','outline',chapter===1?'disabled':'')+
    button('chapter','Capítulo seguinte','1','outline',chapter===20?'disabled':''))}
   <p class="eyebrow ml-chapter">CAPÍTULO ${chapter} DE 20</p>
   <div class="ml-path-levels">${step.map(i=>button('mental-start',String(i)+(i>s.level?' · Bloqueado':''),String(i),
    'ml-level'+(i===s.level?' current':''),i>s.level?'disabled':'')).join('')}</div>
   </section>`;
 }

 let mentalPaused=false;
 function mental() {
  const run=state().mental.run;
  if(run&&!mentalPaused)return mentalPlay(run);
  const resume=run&&!run.done?actions(button('mental-resume','Retomar conta '+(run.index+1),'','primary')):'';
  return resume+(operation?mentalPath():mentalTracks());
 }
 const views={inicio:plan,treino:practice,calculo:mental,banco:bankView,erros:errorsView,formulas:formulasView,painel:panel,colecao:collection};

 function render() {
  if(!adapter||!$('mathLabRoot'))return;
  $('mathLabRoot').innerHTML=`<div class="ml-tabs" role="group" aria-label="Seções de Matemática">
   ${Object.entries(tabs).map(([key,title])=>button('tab',title,key,'quiet',`aria-pressed="${key===tab}"`)).join('')}
   </div><div class="ml-content">${views[tab]()}</div>`;
 }

 function tick(now=Date.now()) {
  if(!adapter||!active())return;
  const s=session();
  if(tab==='treino'&&qid()&&!s.grade&&s.deadline>0){
   const el=$('mlQuestionClock');
   if(el)el.textContent=clock(Math.max(0,s.deadline-now));
   if(now>=s.deadline&&gradeTimer!==s.id){gradeTimer=s.id;answer(s.draft,now);}
  }
  const r=state().mental.run;
  if(tab!=='calculo'||mentalPaused||!r||r.done||!r.deadline)return;
  const left=Math.max(0,r.deadline-now), text=$('mlMentalClock'), bar=$('mlMentalBar');
  if(text)text.textContent=clock(left);
  if(bar)bar.value=left;
  const key=r.id+'/'+r.index;
  if(!left&&mentalTimer!==key){mentalTimer=key;mentalAnswer('',now);}
 }

 function openQuestion(id) {
  if(!M.valid(id))return false;
  if(!active())adapter.setView('matematica-lab');
  return begin('questao',id);
 }

 function handleClick(event) {
  const b=event.target.closest('button[data-ml]');
  if(!b||b.disabled)return;
  const action=b.dataset.ml, value=b.dataset.value;
  switch(action){
   case 'tab': view(value);break;
   case 'begin': begin(value);break;
   case 'question': openQuestion(value);break;
   case 'advance': advance();break;
   case 'bank-open': globalThis.FurgEnem.openQuestion(value);break;
   case 'note': openNotebook(value);break;
   case 'close': $('mlDialog').close();break;
   case 'hint': {
    const s=session();
    if(s.hint<3&&patchQuestion({hint:s.hint+1,aid:true}))focus('mlClue');
    break;
   }
   case 'pattern': patchQuestion({pattern:true,aid:true});break;
   case 'formula': openFormula(value);break;
   case 'tool': {
    const m=models.get(qid());
    if(m&&toolsFor(m).includes(value))patchQuestion({tool:value,aid:true});
    break;
   }
   case 'example': {
    const m=models.get(value);
    if(m)showDialog(label(value),routes(m),'example');
    break;
   }
   case 'mark': {
    const type=value[0],id=value.slice(2);
    if(saveMark(type,id)){
     const dialog=$('mlDialog');
     if(dialog?.open&&dialog.dataset.kind==='formula'){openFormula(id);break;}
     if(type==='f')formulaOpen=id;
     render();
    }
    break;
   }
   case 'bank-page': bankPage+=Number(value);$('mlBankResults').innerHTML=bankResults();break;
   case 'print': globalThis.print?.();break;
   case 'mode':
    if(M.own(modeKeys,value)){mentalMode=value;render();}
    break;
   case 'operation':
    if(M.own(operations,value)){operation=value;chapter=Math.ceil(score(mentalMode,operation).level/5);render();focus('mlFocus');}
    break;
   case 'chapter': chapter=Math.max(1,Math.min(20,chapter+Number(value)));render();break;
   case 'mental-start': {
    startMental(value==='sobrevivencia'?value:operation,value==='sobrevivencia'?1:Number(value));
    break;
   }
   case 'mental-next':
   case 'mental-retry': {
    const old=state().mental.run;
    if(old){mentalMode=old.mode;startMental(old.op,old.level+Number(action==='mental-next'));}
    break;
   }
   case 'mental-close':
    if(setMental({run:null})){mentalPaused=false;render();focus('mlFocus');}
    break;
   case 'mental-pause': mentalPaused=true;render();focus('mlFocus');break;
   case 'mental-resume': mentalPaused=false;render();focus('mlMentalAnswer');tick();break;
   case 'mental-home': operation='';render();focus('mlFocus');break;
   case 'keypad': {
    const input=$('mlMentalAnswer');
    if(!input)return;
    input.value=value==='⌫'?input.value.slice(0,-1):(input.value+value).slice(0,24);
    focus('mlMentalAnswer');
    break;
   }
  }
 }

 function readAnswer(form) {
  const d=new FormData(form);
  return {choice:d.get('choice'),confidence:d.get('confidence'),guess:d.has('guess'),help:d.has('help')};
 }

 function handleSubmit(event) {
  const form=event.target, type=form.dataset.mlForm;
  if(!type)return;
  event.preventDefault();
  if(type==='answer')answer(readAnswer(form));
  if(type==='mental')mentalAnswer(new FormData(form).get('mental'));
  if(type==='note'){
   const d=new FormData(form);
   if(note(form.dataset.qid,{kind:d.get('kind'),reason:d.get('reason'),note:d.get('note')})){
    $('mlDialog').close();notify('Anotação salva no caderno.');if(active())render();
   }
  }
 }

 function init(value) {
  adapter=value;
  root().mathLab=M.validate(root().mathLab);
  const host=$('mathLabRoot'),dialog=$('mlDialog');
  if(bound||!host||!dialog)return;
  bound=true;
  host.addEventListener('click',handleClick);
  dialog.addEventListener('click',handleClick);
  host.addEventListener('submit',handleSubmit);
  dialog.addEventListener('submit',handleSubmit);
  dialog.addEventListener('keydown',e=>e.stopPropagation());
  host.addEventListener('input',event=>{
   if(event.target.id==='mlSearch'){
    filters={...filters,query:event.target.value};bankPage=0;$('mlBankResults').innerHTML=bankResults();
   }
   if(event.target.id==='mlFormulaSearch'){
    formulaQuery=event.target.value;formulaOpen='';$('mlFormulaResults').innerHTML=formulaResults();
   }
  });
  host.addEventListener('change',event=>{
   const {id,value,checked}=event.target;
   const key={mlSkill:'skill',mlLevel:'level',mlYear:'year',mlGuided:'guided'}[id];
   if(key){filters={...filters,[key]:key==='guided'?checked:value};bankPage=0;$('mlBankResults').innerHTML=bankResults();}
   if(id==='mlErrorsFilter'){errorFilter=value;render();focus('mlErrorsFilter');}
   const form=event.target.closest('#mlAnswerForm');
   if(form)patchQuestion({draft:M.draft(readAnswer(form))},false);
  });
  setInterval(tick,250);
 }

 globalThis.FurgMathLab={init,render,fresh:M.fresh,validate:M.validate,merge:M.merge,openGuide,openQuestion,openNotebook,
  begin,answer,advance,note,startMental,mentalAnswer,saveMark,isSaved:id=>M.marksFor(state(),'q',id),meta:id=>catalog.get(id),tick};
})();

