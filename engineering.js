'use strict';
(() => {
 const data=globalThis.FURG_ENGINEERING,root=document.getElementById('engineeringRoot');
 if(!data||!root)return;
 const {chapters,lessons}=data,byId=new Map(lessons.map(item=>[item.id,item]));
 const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const lessonPath=id=>'engenharias/aula/'+id;
 const a=(path,label,cls='outline')=>`<a class="${cls}" href="#${path}" data-study-route="${path}">${esc(label)}</a>`;
 const fresh=()=>({completed:{},attempts:{}});
 const valid=value=>{
  const result=fresh();
  for(const id of byId.keys()){
   if(value?.completed?.[id]===true)result.completed[id]=true;
   const attempt=value?.attempts?.[id];
   if(attempt&&typeof attempt==='object')result.attempts[id]={wrong:Number.isSafeInteger(attempt.wrong)?Math.min(Math.max(attempt.wrong,0),999):0,correct:attempt.correct===true};
  }
  return result;
 };
 const merge=(current,incoming)=>{
  const left=valid(current),right=valid(incoming),result=fresh();
  for(const id of byId.keys()){
   if(left.completed[id]||right.completed[id])result.completed[id]=true;
   if(left.attempts[id]||right.attempts[id])result.attempts[id]={wrong:Math.max(left.attempts[id]?.wrong||0,right.attempts[id]?.wrong||0),correct:!!(left.attempts[id]?.correct||right.attempts[id]?.correct)};
  }
  return result;
 };
 let adapter,selection,bankIndex=0,chosen=null,checked=false;
 const progress=()=>valid(adapter?.getState()?.engineering);
 function update(fn){const state=adapter.getState();state.engineering=valid(state.engineering);fn(state.engineering);adapter.save();}
 function chapterOf(lesson){return chapters.find(chapter=>chapter.id===lesson.chapter);}
 function visualMarkup(lesson){
  const type=lesson.visual;
  let graphic='';
  if(type==='triangle')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Triângulo retângulo genérico"><path d="M35 145H225V32Z"/><path class="eng-dash" d="M209 145v-16h16"/><text x="120" y="166">a</text><text x="230" y="95">b</text><text x="115" y="72">c</text><text x="54" y="138">θ</text></svg>';
  if(type==='circle')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Círculo unitário, eixos e ponto no primeiro quadrante"><path class="eng-axis" d="M10 92H250M130 5V180"/><circle cx="130" cy="92" r="70"/><path d="M130 92L165 31M165 31V92"/><circle class="eng-dot" cx="165" cy="31" r="5"/><text x="174" y="38">(cos θ, sen θ)</text><text x="136" y="77">θ</text></svg>';
  if(type==='plane'||type==='slope')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Plano cartesiano com pontos e variação horizontal e vertical"><path class="eng-axis" d="M18 155H245M35 175V12"/><path d="M75 125L195 42"/><path class="eng-dash" d="M75 125H195V42"/><circle class="eng-dot" cx="75" cy="125" r="5"/><circle class="eng-dot" cx="195" cy="42" r="5"/><text x="122" y="145">Δx</text><text x="199" y="92">Δy</text></svg>';
  if(type==='function')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Gráfico ilustrativo de uma função no plano cartesiano"><path class="eng-axis" d="M16 152H248M34 176V10"/><path d="M40 135C77 135 91 92 131 94S183 42 236 35"/><text x="236" y="169">x</text><text x="12" y="18">y</text></svg>';
  if(type==='parabola')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Parábola ilustrativa com vértice"><path class="eng-axis" d="M14 148H250M131 175V8"/><path d="M40 25Q131 228 222 25"/><circle class="eng-dot" cx="131" cy="126" r="4"/></svg>';
  if(type==='secant')graphic='<div class="eng-live"><label for="engH">Aproxima os dois pontos: h = <output id="engHValue">1,00</output></label><input id="engH" data-eng-h type="range" min="1" max="100" value="100"><p>Para f(x) = x² em x = 1, a inclinação é 2 + h = <strong id="engSlope">3,00</strong>. Quando h tende a 0, ela tende a <strong>2</strong>.</p></div>';
  if(type==='rectangles')graphic='<div class="eng-live"><label for="engN">Número de retângulos: <output id="engNValue">4</output></label><input id="engN" data-eng-n type="range" min="2" max="40" value="4"><div id="engBars" class="eng-bars" role="img" aria-label="Retângulos de f(x) = x no intervalo de 0 a 2"></div><p>Soma pela esquerda: <strong id="engArea">1,50</strong> · área exata: <strong>2</strong></p></div>';
  return `<figure class="eng-visual"><div class="eng-visual-art">${graphic}</div><figcaption>${esc(lesson.visualText)}</figcaption></figure>`;
 }
 function updateLive(){
  const h=root.querySelector('[data-eng-h]');if(h){const value=Number(h.value)/100;root.querySelector('#engHValue').textContent=value.toFixed(2).replace('.',',');root.querySelector('#engSlope').textContent=(2+value).toFixed(2).replace('.',',');}
  const n=root.querySelector('[data-eng-n]');if(n){const count=Number(n.value),bars=root.querySelector('#engBars');root.querySelector('#engNValue').textContent=count;root.querySelector('#engArea').textContent=(2-2/count).toFixed(2).replace('.',',');bars.style.gridTemplateColumns=`repeat(${count},minmax(0,1fr))`;bars.innerHTML=Array.from({length:count},(_,i)=>`<span style="height:${Math.max(1,i/count*100)}%"></span>`).join('');}
 }
 const num=index=>String(index+1).padStart(2,'0');
 const chapterLessons=chapter=>lessons.filter(lesson=>lesson.chapter===chapter.id);
 const totalDone=state=>lessons.filter(lesson=>state.completed[lesson.id]).length;
 function hero(state){
  const done=totalDone(state);
  return `<header class="aula-hero panel eng-hero"><div><p class="aula-overline">ENGENHARIAS · DO ZERO AO CÁLCULO</p>
   <h1 id="engineeringTitle" tabindex="-1">Aprender do zero</h1><p>Trigonometria → Geometria Analítica → Cálculo. Segue a ordem ou abre a aula que precisas.</p></div>
   <div class="aula-progress"><strong>${done} de ${lessons.length} aulas concluídas</strong><progress max="${lessons.length}" value="${done}" aria-label="Aulas de Engenharias concluídas"></progress></div></header>`;
 }
 function chapterTabs(active,state){
  return `<div class="eng-nav"><nav class="eng-chapter-tabs" aria-label="Capítulos da trilha">${chapters.map((chapter,i)=>{
   const group=chapterLessons(chapter),done=group.filter(item=>state.completed[item.id]).length;
   return a(lessonPath(group[0].id),`${i+1}. ${chapter.title}  ${done}/${group.length}`,`eng-chapter-tab${active===chapter.id?' is-active':''}`);
  }).join('')}</nav><nav class="aula-mode-tabs" aria-label="Formatos de estudo">
   ${[['passo-a-passo','Passo a passo'],['exercicios','Exercícios'],['revisar','Revisar']].map(([id,label])=>a('engenharias/'+id,label,`eng-mode-tab${(selection?.page===id||selection?.lesson&&id==='passo-a-passo')?' is-active':''}`)).join('')}
  </nav></div>`;
 }
 function indexMarkup(selected,state){
  const desktop=typeof matchMedia==='function'&&matchMedia('(min-width: 900px)').matches;
  return `<details class="aula-index panel eng-index" ${desktop?'open':''}><summary>Índice de aulas <span>${lessons.length} no total</span></summary>
   <nav aria-label="Índice de aulas de Engenharias">${chapters.map(chapter=>`<div><h3>${esc(chapter.title)}</h3><ol>
    ${chapterLessons(chapter).map(item=>`<li><a href="#${lessonPath(item.id)}" data-study-route="${lessonPath(item.id)}" ${item===selected?'aria-current="page"':''}>
     <small aria-hidden="true">${num(lessons.indexOf(item))}</small><span>${esc(item.title)}</span>
     ${state.completed[item.id]?'<span class="aula-index-mark" aria-label="Concluída">✓</span>':''}</a></li>`).join('')}</ol></div>`).join('')}</nav></details>`;
 }
 function lessonCard(lesson,state){
  const chapter=chapterOf(lesson),i=lessons.indexOf(lesson);
  return `<li><a href="#${lessonPath(lesson.id)}" data-study-route="${lessonPath(lesson.id)}">
   <span class="guided-map-number" aria-hidden="true">${num(i)}</span><span><strong>${esc(lesson.title)}</strong><small>${esc(lesson.lead)}</small></span>
   <span class="guided-map-state">${state.completed[lesson.id]?'Concluída ✓':chapter.title+' →'}</span></a></li>`;
 }
 function overview(filter){
  const state=progress(),done=totalDone(state),next=lessons.find(item=>!state.completed[item.id])||lessons[0];
  const shown=filter==='fundamentos'?chapters.slice(0,2):filter==='calculo'?chapters.slice(2):chapters;
  root.innerHTML=`<div class="aula-view eng-view">${hero(state)}${chapterTabs('',state)}
   <section class="guided-map panel eng-map"><div class="guided-map-heading"><div><h2>Tua sequência de estudo</h2>
    <p>Em cada aula, entende a base, acompanha o exemplo e confere uma questão com alternativas.</p></div>
    ${a(lessonPath(next.id),done?'Continuar na primeira pendente →':'Começar pela base →','primary')}</div>
    ${shown.map(chapter=>`<div class="eng-map-group"><h3>${esc(chapter.title)} <small>· ${esc(chapter.source)}</small></h3><p>${esc(chapter.lead)}</p>
     <ol class="guided-map-list">${chapterLessons(chapter).map(item=>lessonCard(item,state)).join('')}</ol></div>`).join('')}</section>
   <p class="aula-source">Trilha organizada pelo sumário de <em>Lições de Cálculo</em> (Felipe Guisoli e Prof. Engenheiro), capítulos 1 a 8. Pré-requisitos de Trigonometria e Geometria Analítica foram acrescentados antes do Cálculo. Explicações e problemas autorais.</p>
   <aside class="eng-video-note"><strong>Resoluções em vídeo</strong><p>Quando tiveres os vídeos, eles entram nas aulas. Os exemplos e as correções por escrito já estão disponíveis.</p></aside></div>`;
 }
 function worked(lesson){return `<div class="eng-worked"><h3>${esc(lesson.example.prompt)}</h3>
   <ol>${lesson.example.steps.map((step,i)=>`<li><strong>Passo ${i+1}.</strong> ${esc(step)}</li>`).join('')}</ol>
   <p><strong>Resultado:</strong> ${esc(lesson.example.answer)}</p></div>`;}
 function quiz(lesson,mode){
  const state=progress(),i=lessons.indexOf(lesson);
  return `<section class="eng-quiz" aria-label="Questão de ${esc(lesson.title)}" data-eng-quiz="${esc(lesson.id)}">
   <p class="aula-overline">${mode==='bank'?'QUESTÃO '+num(i)+'/'+lessons.length:'3 · PRATICAR ANTES DE AVANÇAR'}</p>
   <h3>${esc(lesson.check.prompt)}</h3><div class="eng-options" role="group" aria-label="Alternativas">
   ${lesson.check.options.map(([label],index)=>`<button type="button" class="outline" data-eng-choice="${index}" aria-pressed="false"><b aria-hidden="true">${'ABC'[index]}</b><span>${esc(label)}</span></button>`).join('')}</div>
   <details class="eng-hint"><summary>Quero uma pista</summary><p>${esc(lesson.idea)}</p></details>
   <div class="eng-quiz-actions"><button type="button" class="primary" data-eng-check disabled>Conferir resposta</button></div>
   <div class="eng-feedback" role="status" aria-live="polite" hidden></div>
   <p class="eng-quiz-progress">${state.completed[lesson.id]?'Aula já concluída. Podes refazer a questão.':'Um acerto conclui esta aula.'}</p></section>`;
 }
 function lessonView(lesson){
  const state=progress(),index=lessons.indexOf(lesson),chapter=chapterOf(lesson),next=lessons[index+1],prev=lessons[index-1];
  root.innerHTML=`<div class="aula-view eng-view">${hero(state)}${chapterTabs(chapter.id,state)}
   <div class="aula-layout eng-layout">${indexMarkup(lesson,state)}<article class="aula-lesson panel eng-article" aria-labelledby="engLessonTitle">
    <header class="aula-lesson-intro"><p class="aula-overline">${esc(chapter.title)} · AULA ${num(index)}/${lessons.length}${state.completed[lesson.id]?' · CONCLUÍDA':''}</p>
     <h2 id="engLessonTitle" tabindex="-1">${esc(lesson.title)}</h2><p class="aula-lead">${esc(lesson.lead)}</p>
     <p class="eng-chapter-source">No livro: ${esc(chapter.source)}</p></header>
    <nav class="guided-steps" aria-label="Passos desta aula"><button type="button" class="outline" data-eng-scroll="engEntender">1. Entender</button><button type="button" class="outline" data-eng-scroll="engVisualizar">2. Visualizar</button><button type="button" class="outline" data-eng-scroll="engPraticar">3. Praticar</button></nav>
    <section class="aula-reading eng-reading" id="engEntender"><h3>1 · Entende a ideia</h3><p>${esc(lesson.idea)}</p></section>
    <section class="eng-example-section" id="engVisualizar"><h3>2 · Visualiza e acompanha</h3>${visualMarkup(lesson)}${worked(lesson)}</section>
    <div class="eng-solved"><details><summary>Mais dois exemplos resolvidos</summary>
     ${lesson.practice.map((exercise,i)=>`<section><h4>${i+1}. ${esc(exercise.prompt)}</h4><p><strong>Pista:</strong> ${esc(exercise.hint)}</p><p><strong>Resolução:</strong> ${esc(exercise.solution)}</p></section>`).join('')}</details></div>
    <div id="engPraticar">${quiz(lesson,'lesson')}</div>
    <div class="aula-next eng-lesson-footer">${prev?a(lessonPath(prev.id),'← Aula anterior'):a('engenharias/passo-a-passo','← Ver trilha')}
     ${next?a(lessonPath(next.id),'Próxima aula →','outline'):a('engenharias/progresso','Ver meu progresso →','outline')}</div>
    <p class="aula-source">Explicações, exemplos e exercícios autorais.</p>
   </article></div></div>`;
  updateLive();
 }
 function bankView(mode){
  const state=progress(),pool=mode==='desafios'?lessons.filter((_,i)=>i%3===2):lessons;
  if(bankIndex>=pool.length)bankIndex=0;
  const lesson=pool[bankIndex],chapter=chapterOf(lesson);
  root.innerHTML=`<div class="aula-view eng-view">${hero(state)}${chapterTabs(chapter.id,state)}
   <div class="aula-layout eng-layout">${indexMarkup(lesson,state)}<article class="aula-lesson panel eng-article eng-bank">
    <p class="aula-overline">${mode==='desafios'?'DESAFIOS':'EXERCÍCIOS'} · ${bankIndex+1}/${pool.length}</p>
    <h2 id="engLessonTitle" tabindex="-1">${esc(lesson.title)}</h2><p class="aula-lead">${esc(chapter.title)} · ${esc(chapter.source)}</p>
    <p>Seleciona uma alternativa, confere o raciocínio e avança para a próxima questão.</p>
    <progress value="${bankIndex+1}" max="${pool.length}" aria-label="Questões deste treino"></progress>
    ${quiz(lesson,'bank')}<div class="aula-next">${a(lessonPath(lesson.id),'Rever a aula →','outline')}</div>
   </article></div></div>`;
 }
 function review(mode){
  const state=progress(),misses=lessons.filter(item=>state.attempts[item.id]?.wrong),done=totalDone(state);
  root.innerHTML=`<div class="aula-view eng-view">${hero(state)}${chapterTabs('',state)}
   <section class="guided-map panel eng-map"><h2 id="engLessonTitle" tabindex="-1">${mode==='revisar'?'Rever os erros':done+' de '+lessons.length+' aulas concluídas'}</h2>
    <p>${mode==='revisar'?'Refaz a questão, confere a resolução e segue no teu ritmo.':'Teu progresso fica salvo neste navegador.'}</p>
    <ol class="guided-map-list">${(mode==='revisar'?misses:lessons).map(item=>lessonCard(item,state)).join('')}</ol>
    ${mode==='revisar'&&!misses.length?'<p>Ainda não há questões erradas. Começa pela primeira aula.</p>':''}</section></div>`;
 }
 function render(route){
  if(!adapter)return;
  const changed=selection?.path!==route.path;
  selection=route;
  if(changed){chosen=null;checked=false;bankIndex=0;}
  const lesson=byId.get(route.lesson);
  if(lesson)lessonView(lesson);
  else if(['exercicios','desafios'].includes(route.page))bankView(route.page);
  else if(['progresso','revisar'].includes(route.page))review(route.page);
  else overview(route.page);
 }
 function currentLesson(){
  if(selection?.lesson)return byId.get(selection.lesson);
  const pool=selection?.page==='desafios'?lessons.filter((_,i)=>i%3===2):lessons;
  return pool[bankIndex];
 }
 function checkAnswer(){
  const lesson=currentLesson();if(!lesson||chosen===null||checked)return;
  checked=true;
  const answer=lesson.check,correct=chosen===answer.correct;
  update(saved=>{
   const old=saved.attempts[lesson.id]||{wrong:0,correct:false};
   saved.attempts[lesson.id]={wrong:old.wrong+(correct?0:1),correct:correct||old.correct};
   if(correct)saved.completed[lesson.id]=true;
  });
  root.querySelectorAll('[data-eng-choice]').forEach((button,index)=>{
   button.disabled=true;
   button.classList.toggle('is-correct',index===answer.correct);
   button.classList.toggle('is-wrong',index===chosen&&!correct);
  });
  root.querySelector('[data-eng-check]').hidden=true;
  const feedback=root.querySelector('.eng-feedback');feedback.hidden=false;
  feedback.innerHTML=`<h4>${correct?'Acertou!':'Confere teu raciocínio'} · Gabarito ${'ABC'[answer.correct]}</h4>
   <p><strong>Tua alternativa:</strong> ${esc(answer.options[chosen][0])}. ${esc(answer.options[chosen][1])}</p>
   ${correct?'':`<p><strong>Por que a correta funciona:</strong> ${esc(answer.options[answer.correct][1])}</p>`}
   <details><summary>Ver resolução do exemplo passo a passo</summary><ol>${lesson.example.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol></details>
   <button type="button" class="primary" data-eng-next-question>Próxima questão →</button>`;
 }
 root.addEventListener('click',event=>{
  const step=event.target.closest('[data-eng-scroll]');
  if(step){root.querySelector('#'+step.dataset.engScroll)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  const choice=event.target.closest('[data-eng-choice]');
  if(choice&&!checked){chosen=Number(choice.dataset.engChoice);root.querySelectorAll('[data-eng-choice]').forEach(item=>item.setAttribute('aria-pressed',String(item===choice)));root.querySelector('[data-eng-check]').disabled=false;return;}
  if(event.target.closest('[data-eng-check]')){checkAnswer();return;}
  if(event.target.closest('[data-eng-next-question]')){
   if(selection?.lesson){
    const next=lessons[lessons.indexOf(currentLesson())+1];
    adapter.openRoute?.(next?lessonPath(next.id):'engenharias/progresso');
   }else{
    const pool=selection?.page==='desafios'?lessons.filter((_,i)=>i%3===2):lessons;
    bankIndex=(bankIndex+1)%pool.length;chosen=null;checked=false;bankView(selection.page);
    root.querySelector('#engLessonTitle')?.focus();
   }
  }
 });
 root.addEventListener('input',event=>{if(event.target.matches('[data-eng-h],[data-eng-n]'))updateLive();});
 globalThis.FurgEngineering={fresh,valid,merge,lessons,init(value){adapter=value;},render};
})();
