'use strict';
(() => {
 const data=globalThis.FURG_ENGINEERING,root=document.getElementById('engineeringRoot');
 if(!data||!root)return;
 const {chapters,lessons}=data,byId=new Map(lessons.map(item=>[item.id,item]));
 const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const link=(id,kind='aula')=>'engenharias/'+kind+(id?'/'+id:'');
 const a=(path,label,cls='')=>`<a class="${cls}" href="#${path}" data-study-route="${path}">${esc(label)}</a>`;
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
 let adapter,selection,stage=0;
 const progress=()=>valid(adapter?.getState()?.engineering);
 function update(fn){const state=adapter.getState();state.engineering=valid(state.engineering);fn(state.engineering);adapter.save();}
 function chapterOf(lesson){return chapters.find(chapter=>chapter.id===lesson.chapter);}
 function visualMarkup(lesson){
  const type=lesson.visual;
  let graphic='';
  if(type==='triangle')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Triângulo retângulo com catetos 3 e 4 e hipotenusa 5"><path d="M35 145H225V32Z"/><path class="eng-dash" d="M209 145v-16h16"/><text x="120" y="166">4</text><text x="230" y="95">3</text><text x="115" y="72">5</text><text x="54" y="138">θ</text></svg>';
  if(type==='circle')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Círculo unitário, eixos e ponto no primeiro quadrante"><path class="eng-axis" d="M10 92H250M130 5V180"/><circle cx="130" cy="92" r="70"/><path d="M130 92L165 31M165 31V92"/><circle class="eng-dot" cx="165" cy="31" r="5"/><text x="174" y="38">(cos θ, sen θ)</text><text x="136" y="77">θ</text></svg>';
  if(type==='plane'||type==='slope')graphic='<svg viewBox="0 0 260 185" role="img" aria-label="Plano cartesiano com pontos e variação horizontal e vertical"><path class="eng-axis" d="M18 155H245M35 175V12"/><path d="M75 125L195 42"/><path class="eng-dash" d="M75 125H195V42"/><circle class="eng-dot" cx="75" cy="125" r="5"/><circle class="eng-dot" cx="195" cy="42" r="5"/><text x="122" y="145">Δx</text><text x="199" y="92">Δy</text></svg>';
  if(type==='secant')graphic='<div class="eng-live"><label for="engH">Aproxima os dois pontos: h = <output id="engHValue">1,00</output></label><input id="engH" data-eng-h type="range" min="1" max="100" value="100"><p>Para f(x) = x² em x = 1, a inclinação é 2 + h = <strong id="engSlope">3,00</strong>. Quando h tende a 0, ela tende a <strong>2</strong>.</p></div>';
  if(type==='rectangles')graphic='<div class="eng-live"><label for="engN">Número de retângulos: <output id="engNValue">4</output></label><input id="engN" data-eng-n type="range" min="2" max="40" value="4"><div id="engBars" class="eng-bars" role="img" aria-label="Retângulos de f(x) = x no intervalo de 0 a 2"></div><p>Soma pela esquerda: <strong id="engArea">1,50</strong> · área exata: <strong>2</strong></p></div>';
  return `<figure class="eng-visual"><div class="eng-visual-art">${graphic}</div><figcaption>${esc(lesson.visualText)}</figcaption></figure>`;
 }
 function updateLive(){
  const h=root.querySelector('[data-eng-h]');if(h){const value=Number(h.value)/100;root.querySelector('#engHValue').textContent=value.toFixed(2).replace('.',',');root.querySelector('#engSlope').textContent=(2+value).toFixed(2).replace('.',',');}
  const n=root.querySelector('[data-eng-n]');if(n){const count=Number(n.value),bars=root.querySelector('#engBars');root.querySelector('#engNValue').textContent=count;root.querySelector('#engArea').textContent=(2-2/count).toFixed(2).replace('.',',');bars.style.gridTemplateColumns=`repeat(${count},minmax(0,1fr))`;bars.innerHTML=Array.from({length:count},(_,i)=>`<span style="height:${Math.max(1,i/count*100)}%"></span>`).join('');}
 }
 function card(lesson,done){const chapter=chapterOf(lesson);return `<a class="eng-lesson-card${done?' is-done':''}" href="#${link(lesson.id)}" data-study-route="${link(lesson.id)}"><span class="eng-card-top"><small>${esc(chapter.title)} · ${String(lessons.indexOf(lesson)+1).padStart(2,'0')}</small><span aria-label="${done?'Concluída':'Pendente'}">${done?'✓':'→'}</span></span><strong>${esc(lesson.title)}</strong><span>${esc(lesson.lead)}</span></a>`;}
 function intro(){return `<div class="eng-intro"><p class="study-kicker">ENGENHARIAS · DA BASE AO CÁLCULO</p><h1 id="engineeringTitle" tabindex="-1">Entende a ideia. Depois faz a conta.</h1><p>Começa por Trigonometria, passa pela Geometria Analítica e entra em limites, derivadas e integrais. Cada aula segue <strong>entender → visualizar → praticar</strong>.</p><p class="eng-source">Trilha organizada com base na sequência e nos pré-requisitos de <em>Lições de Cálculo</em>, de Felipe Guisoli e Prof. Engenheiro. As explicações e os exercícios desta área são autorais.</p></div>`;}
 function overview(filter=''){
  const status=progress(),done=Object.keys(status.completed).length,next=lessons.find(lesson=>!status.completed[lesson.id])||lessons[0];
  const list=chapters.filter(ch=>!filter||filter==='passo-a-passo'||filter==='fundamentos'&&['trigonometria','geometria'].includes(ch.id)||filter==='calculo'&&!['trigonometria','geometria'].includes(ch.id));
  root.innerHTML=`${intro()}<div class="eng-start panel"><div><span class="eng-pill">${done} de ${lessons.length} aulas concluídas</span><h2>${done===lessons.length?'Trilha concluída. Bora revisar?':'Teu próximo passo'}</h2><p>${esc(next.title)} · ${esc(chapterOf(next).title)}</p></div>${a(link(next.id),done===lessons.length?'Revisar primeira aula →':'Continuar a trilha →','primary')}</div><div class="eng-chapters">${list.map((chapter,index)=>{const group=lessons.filter(item=>item.chapter===chapter.id);return `<section class="eng-chapter" aria-labelledby="engChapter-${chapter.id}"><header><span class="eng-chapter-num">${String(chapters.indexOf(chapter)+1).padStart(2,'0')}</span><div><h2 id="engChapter-${chapter.id}">${esc(chapter.title)}</h2><p>${esc(chapter.lead)}</p><small>No teu material: ${esc(chapter.source)} · ${group.filter(item=>status.completed[item.id]).length}/${group.length} aulas</small></div></header><div class="eng-lesson-grid">${group.map(lesson=>card(lesson,status.completed[lesson.id])).join('')}</div></section>`;}).join('')}</div><aside class="eng-video-note"><strong>Resoluções em vídeo</strong><p>O espaço está preparado para receber os vídeos quando estiverem disponíveis. Por enquanto, cada aula já traz exemplos e soluções em texto, passo a passo.</p></aside>`;
 }
 function lessonMarkup(lesson){
  const status=progress(),index=lessons.indexOf(lesson),chapter=chapterOf(lesson),prev=lessons[index-1],next=lessons[index+1],done=!!status.completed[lesson.id];
  root.innerHTML=`<div class="eng-lesson"><div class="eng-lesson-header"><p class="study-kicker">${esc(chapter.title)} · AULA ${String(index+1).padStart(2,'0')} DE ${lessons.length}</p><h1 id="engineeringTitle" tabindex="-1">${esc(lesson.title)}</h1><p>${esc(lesson.lead)}</p><small>No teu material: ${esc(chapter.source)} · ${done?'Concluída ✓':'A fazer'}</small></div><nav class="eng-step-tabs" aria-label="Etapas desta aula">${['1 · Entender','2 · Visualizar','3 · Praticar'].map((name,i)=>`<button type="button" data-eng-stage="${i}" aria-current="${stage===i?'step':'false'}" class="${stage===i?'active':''}">${name}</button>`).join('')}</nav><div class="eng-step" data-eng-pane="0"><h2>Qual é a ideia?</h2><p>${esc(lesson.idea)}</p><div class="eng-reflection"><strong>Pergunta guia</strong><p>${esc(lesson.lead)}</p></div><button type="button" class="primary" data-eng-next="1">Visualizar um exemplo →</button></div><div class="eng-step" data-eng-pane="1" hidden><h2>Vê acontecer</h2>${visualMarkup(lesson)}<div class="eng-worked"><h3>${esc(lesson.example.prompt)}</h3><ol>${lesson.example.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol><p><strong>Resultado:</strong> ${esc(lesson.example.answer)}</p></div><button type="button" class="primary" data-eng-next="2">Praticar agora →</button></div><div class="eng-step" data-eng-pane="2" hidden><h2>Agora é contigo</h2><section class="eng-check" aria-label="Questão de compreensão"><p class="eng-pill">Confere a ideia</p><h3>${esc(lesson.check.prompt)}</h3><div class="eng-options">${lesson.check.options.map(([choice],i)=>`<button type="button" data-eng-answer="${i}" ${done?'disabled':''}>${esc(choice)}</button>`).join('')}</div><p class="eng-feedback" id="engFeedback" role="status" aria-live="polite">${done?'Essa ideia já foi concluída. Podes refazer os exercícios abaixo.':''}</p></section><h3>Exercícios autorais</h3><p>Tenta sozinho. Abre uma pista se travar e a solução depois de tentar.</p><div class="eng-practice-list">${lesson.practice.map((exercise,i)=>`<article class="eng-practice"><h4>${i+1}. ${esc(exercise.prompt)}</h4><details><summary>Ver pista</summary><p>${esc(exercise.hint)}</p></details><details><summary>Conferir solução</summary><p>${esc(exercise.solution)}</p></details></article>`).join('')}</div><p class="eng-video-note"><strong>Vídeo desta aula:</strong> as resoluções em vídeo serão adicionadas quando os arquivos estiverem disponíveis.</p></div><nav class="eng-lesson-footer" aria-label="Navegação das aulas">${prev?a(link(prev.id),'← Aula anterior','outline'):a('engenharias/passo-a-passo','← Ver trilha','outline')}${next?a(link(next.id),'Próxima aula →','primary'):a('engenharias/progresso','Ver meu progresso →','primary')}</nav></div>`;
  showStage();updateLive();
 }
 function showStage(){root.querySelectorAll('[data-eng-pane]').forEach(pane=>pane.hidden=Number(pane.dataset.engPane)!==stage);root.querySelectorAll('[data-eng-stage]').forEach(button=>{const active=Number(button.dataset.engStage)===stage;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'step':'false');});updateLive();}
 function practice(mode){
  const status=progress(),chosen=mode==='desafios'?lessons.filter((_,i)=>i%3===2):lessons;
  root.innerHTML=`<div class="eng-section-heading"><p class="study-kicker">${mode==='desafios'?'DESAFIOS DE APLICAÇÃO':'PRÁTICA POR ASSUNTO'}</p><h1 id="engineeringTitle" tabindex="-1">${mode==='desafios'?'Junta as ideias':'Exercícios com pistas'}</h1><p>${mode==='desafios'?'Problemas de revisão em Trigonometria, Geometria Analítica e Cálculo.':'Escolhe um assunto, tenta resolver e abre as soluções aos poucos.'}</p></div><div class="eng-practice-catalog">${chosen.map(lesson=>`<section class="eng-practice-group"><header><div><small>${esc(chapterOf(lesson).title)} · ${status.completed[lesson.id]?'Aula concluída':'Aula a fazer'}</small><h2>${esc(lesson.title)}</h2></div>${a(link(lesson.id),'Ver aula →','outline')}</header>${(mode==='desafios'?lesson.practice.slice(-1):lesson.practice).map((exercise,i)=>`<article class="eng-practice"><h3>${esc(exercise.prompt)}</h3><details><summary>1 · Pista</summary><p>${esc(exercise.hint)}</p></details><details><summary>2 · Resolução</summary><p>${esc(exercise.solution)}</p></details></article>`).join('')}</section>`).join('')}</div>`;
 }
 function review(mode){const status=progress(),misses=lessons.filter(item=>status.attempts[item.id]?.wrong),done=Object.keys(status.completed).length;
  if(mode==='revisar')root.innerHTML=`<div class="eng-section-heading"><p class="study-kicker">CADERNO DE ERROS</p><h1 id="engineeringTitle" tabindex="-1">Volta onde precisou pensar mais.</h1><p>Os erros na pergunta de compreensão ficam registrados neste navegador, junto com o restante do teu progresso.</p></div>${misses.length?`<div class="eng-lesson-grid">${misses.map(item=>card(item,status.completed[item.id])).join('')}</div>`:'<div class="panel eng-empty">Ainda não há questões erradas por aqui. Começa a primeira aula e tenta a pergunta de compreensão.</div>'}`;
  else root.innerHTML=`<div class="eng-section-heading"><p class="study-kicker">TEU PROGRESSO</p><h1 id="engineeringTitle" tabindex="-1">${done} de ${lessons.length} aulas concluídas.</h1><p>Uma aula fica concluída quando acertas sua pergunta de compreensão. Podes refazer as atividades quando quiser.</p></div><div class="eng-progress-track" role="progressbar" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${lessons.length}" aria-label="Aulas concluídas"><span style="width:${done/lessons.length*100}%"></span></div><div class="eng-chapters">${chapters.map(chapter=>`<section class="eng-progress-chapter"><h2>${esc(chapter.title)}</h2><ul>${lessons.filter(item=>item.chapter===chapter.id).map(item=>`<li><span>${status.completed[item.id]?'✓':'○'}</span>${a(link(item.id),item.title)}</li>`).join('')}</ul></section>`).join('')}</div>${a('engenharias/revisar','Revisar questões que errei →','outline')}`;
 }
 function render(route){if(!adapter)return;const changed=selection?.path!==route.path;selection=route;if(changed)stage=0;
  const lesson=byId.get(route.lesson);
  if(lesson)lessonMarkup(lesson);
  else if(['exercicios','desafios'].includes(route.page))practice(route.page);
  else if(['progresso','revisar'].includes(route.page))review(route.page);
  else overview(route.page);
 }
 root.addEventListener('click',event=>{
  const step=event.target.closest('[data-eng-stage],[data-eng-next]');
  if(step){stage=Number(step.dataset.engStage??step.dataset.engNext);showStage();root.querySelector('[data-eng-pane="'+stage+'"] h2')?.focus?.();return;}
  const button=event.target.closest('[data-eng-answer]');if(!button||!selection?.lesson)return;
  const lesson=byId.get(selection.lesson),choice=Number(button.dataset.engAnswer),correct=choice===lesson.check.correct;
  if(!lesson||progress().completed[lesson.id])return;
  update(saved=>{const old=saved.attempts[lesson.id]||{wrong:0,correct:false};saved.attempts[lesson.id]={wrong:old.wrong+(correct?0:1),correct:correct||old.correct};if(correct)saved.completed[lesson.id]=true;});
  root.querySelectorAll('[data-eng-answer]').forEach(item=>{item.setAttribute('aria-pressed',String(item===button));if(correct)item.disabled=true;});
  const feedback=root.querySelector('#engFeedback');feedback.textContent=(correct?'Certo! Aula concluída. ':'Ainda não. ')+lesson.check.options[choice][1];feedback.classList.toggle('is-correct',correct);
 });
 root.addEventListener('input',event=>{if(event.target.matches('[data-eng-h],[data-eng-n]'))updateLive();});
 globalThis.FurgEngineering={fresh,valid,merge,lessons,init(value){adapter=value;},render};
})();
