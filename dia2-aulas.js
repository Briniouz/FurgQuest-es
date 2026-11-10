'use strict';
(() => {
 const catalog=globalThis.FURG_DIA2_LESSONS, guide=globalThis.FURG_DIA2_GUIDE;
 if(!catalog||!guide)return;
 const maps=globalThis.FurgDia2Maps, labs=globalThis.FurgDia2Labs;
 const course=globalThis.FurgStudyCourse, studyLabs=globalThis.FurgStudyLabs;
 const physicsVideo=globalThis.FURG_DIA2_PHYSICS_VIDEO;
 const subjects=Object.keys(catalog), lessonIds=Object.values(catalog).flatMap(group=>group.map(lesson=>lesson.id));
 const cards=new Map([...guide.entries,...(globalThis.FurgStudyBasics?.entries||[])].map(card=>[card.id,card]));
 const biology=globalThis.FurgDia2Biology;
 const stages=['Base','Conexões','Aplicação'];
 const guidedStages=['Entender','Visualizar','Praticar'];
 const guidedMode='passo-a-passo';
 const $=id=>document.getElementById(id);
 const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const route=(subject,lesson,mode='aulas')=>['dia-2',mode,subject,lesson].filter(Boolean).join('/');
 const link=(path,label,className)=>`<a class="${className}" href="#${path}" data-study-route="${path}">${esc(label)}</a>`;
 const valid=(subject,lesson)=>subjects.includes(subject)&&(!lesson||catalog[subject].some(item=>item.id===lesson));
 const validate=value=>Object.fromEntries(lessonIds.filter(id=>value?.[id]===true).map(id=>[id,true]));
 const validVisit=stamp=>Number.isSafeInteger(stamp)&&stamp>0&&stamp<8.64e15;
 const validateVisits=value=>Object.fromEntries(lessonIds.filter(id=>validVisit(value?.[id])).map(id=>[id,value[id]]));
 const latestVisit=visits=>Object.keys(visits).reduce((last,id)=>visits[id]>(visits[last]||0)?id:last,'');
 const number=index=>String(index+1).padStart(2,'0');
 let adapter, active;

 function switches(subject,mode){
  const tabs=[[guidedMode,'Passo a passo'],['aulas','Aulas'],['mapa','Mapa mental'],['conceitos','Conceitos']];
  if(subject==='fisica')tabs.push(['roteiro-fisica','Roteiro do vídeo']);
  return `<nav class="aula-mode-tabs" aria-label="Formatos de estudo">
   ${tabs.map(([id,label])=>{
    const path=id==='roteiro-fisica'?'dia-2/roteiro-fisica':route(subject,null,id);
    return `<a href="#${path}" data-study-route="${path}" ${id===mode?'aria-current="page"':''}>${label}</a>`;
   }).join('')}
  </nav>`;
 }

 function videoMarkup(completed){
  return `<div class="aula-view" data-subject="fisica">
   <header class="aula-hero panel">
    <div><p class="aula-overline">ENEM · DIA 2 · FÍSICA</p><h1 id="aulaTitle" tabindex="-1">Roteiro do vídeo</h1>
     <p>Segue os capítulos na ordem do vídeo e abre a aula quando quiser praticar.</p></div>
   </header>
   <div class="aula-nav">${maps.subjectTabs('fisica','aulas',completed)}${switches('fisica','roteiro-fisica')}</div>
   <ol class="aula-video-list" aria-label="Capítulos em ordem">
    ${physicsVideo.map(([title,time,lessonId,tip,lab],i)=>`<li class="panel"><details ${i===0?'open':''}>
     <summary><span class="aula-video-time">${esc(time)}</span><strong>${esc(title)}</strong></summary>
     <div class="aula-video-notes"><p>${esc(tip)}</p>
      <div class="d2-actions">${link(route('fisica',lessonId),'Abrir aula relacionada →','outline')}
       ${lab?link(lab,'Abrir simulador →','primary'):''}</div></div>
    </details></li>`).join('')}
   </ol>
  </div>`;
 }

 function indexMarkup(subject,lessons,selected,completed){
  const desktop=typeof matchMedia==='function'&&matchMedia('(min-width: 900px)').matches;
  return `<details class="aula-index panel" ${desktop?'open':''}>
   <summary>Índice de aulas <span>${lessons.length} no total</span></summary>
   <nav aria-label="Índice de aulas de ${esc(guide.subjects[subject].label)}">
    ${stages.map((stage,i)=>`<div><h3>${stage}</h3><ol>
     ${lessons.slice(i*3,i===stages.length-1?undefined:i*3+3).map((lesson,j)=>{
      const path=route(subject,lesson.id), done=completed[lesson.id];
      return `<li><a href="#${path}" data-study-route="${path}" ${lesson===selected?'aria-current="page"':''}>
       <small aria-hidden="true">${number(i*3+j)}</small><span>${esc(lesson.title)}</span>
       <span class="aula-index-mark" data-aula-mark="${lesson.id}" ${done?'':'hidden'}><span aria-hidden="true">✓</span><span class="sr-only">Estudada</span></span>
      </a></li>`;
     }).join('')}</ol></div>`).join('')}
   </nav>
  </details>`;
 }

 function readingMarkup(lesson){
  const modules=biology?.modules[lesson.id];
  return `<div class="aula-reading">${lesson.parts.map(([title,body])=>`<section><h3>${esc(title)}</h3><p>${esc(body)}</p></section>`).join('')}
   ${modules?`<section class="el-depth aula-bio-depth"><h3>Aprofundamento</h3>
    ${modules.map(({title,paragraphs,table},i)=>`<details ${i===0?'open':''}><summary>${esc(title)}</summary>
     ${paragraphs.map(body=>`<p>${esc(body)}</p>`).join('')}
     ${table?tableMarkup(table):''}</details>`).join('')}
    <p class="aula-source">Leitura de apoio · OpenStax Biology 2e ·
     ${biology.sources[lesson.id].map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`).join(' · ')}</p></section>`:''}</div>`;
 }

 function tableMarkup({caption,headers,rows}){
  return `<div class="aula-bio-table" tabindex="0" role="region" aria-label="${esc(caption)}">
   <table><caption>${esc(caption)}</caption><thead><tr>${headers.map(title=>`<th scope="col">${esc(title)}</th>`).join('')}</tr></thead>
   <tbody>${rows.map(([name,...cells])=>`<tr><th scope="row">${esc(name)}</th>${cells.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>
  </div>`;
 }

 function exampleMarkup(lesson){
  return `<section class="aula-example" aria-labelledby="aulaExampleTitle">
   <h3 id="aulaExampleTitle">Exemplo resolvido</h3><p>${esc(lesson.example[0])}</p>
   <ol>${lesson.example.slice(1).map(step=>`<li>${esc(step)}</li>`).join('')}</ol>
  </section>`;
 }

 function experimentMarkup(lesson,guided=false){
  const primary=`${lesson.lab?labs.markup(lesson.lab):''}
   ${studyLabs?.markup(globalThis.FurgStudyData?.layers[lesson.id]?.[4],'aula')||''}`;
  if(lesson.id==='energia'&&studyLabs)return primary+`<details class="el-depth">
   <summary>Compara rampa, queda, pêndulo, montanha-russa e mola</summary>${studyLabs.markup('conservacao','aula')}</details>`;
  if(lesson.id!=='calor')return primary;
  const scales=globalThis.FurgDia2Temperature?.markup()||'';
  const transmission=studyLabs?.markup('transmissao','aula')||'';
  return guided?transmission+`<details class="el-depth"><summary>Explora as escalas e o equilíbrio térmico</summary>${scales}${primary}</details>`:
   primary+scales+transmission;
 }

 function checkMarkup(check,position){
  const guided=position!==undefined, suffix=guided?'-'+position:'';
  return `<section class="aula-check" aria-labelledby="aulaCheckTitle${suffix}" ${guided?`data-guided-check="${position}"`:''}>
   <p class="aula-overline">${check.optional?'QUESTÃO AUTORAL · DESAFIO OPCIONAL':'QUESTÃO AUTORAL'}</p><h3 id="aulaCheckTitle${suffix}">${guided?'Exercício '+(position+1):'Testa a ideia'}</h3>
   <p id="aulaCheckPrompt${suffix}">${esc(check.prompt)}</p>
   <div class="aula-check-options" role="group" aria-labelledby="aulaCheckPrompt${suffix}">
    ${check.choices.map(([label],i)=>`<button type="button" class="outline" data-aula-choice="${i}" aria-pressed="false">
     <b aria-hidden="true">${'ABC'[i]}</b><span>${esc(label)}</span></button>`).join('')}
   </div><p id="aulaFeedback${suffix}" class="aula-feedback" role="status"></p>
   <details class="el-depth" data-aula-reason hidden><summary>Ver raciocínio da resposta</summary>
    <p>${esc(check.choices[check.correct][1])}</p></details>
  </section>`;
 }

 function guidedMap(subject,lessons,completed){
  const count=lessons.filter(lesson=>completed[lesson.id]).length;
  const pending=lessons.find(lesson=>!completed[lesson.id]);
  return `<section class="aula-hero panel">
   <div><p class="aula-overline">ENEM · DIA 2 · ${esc(guide.subjects[subject].label)}</p>
    <h1 id="aulaTitle" tabindex="-1">Aprender passo a passo</h1>
    <p>Escolhe uma matéria. Em cada aula, entende a ideia, vê um exemplo e resolve antes de avançar.</p></div>
   <div class="aula-progress"><strong>${count} de ${lessons.length} concluídas</strong>
    <progress max="${lessons.length}" value="${count}" aria-label="Aulas concluídas"></progress></div>
  </section>
  <div class="aula-nav">${maps.subjectTabs(subject,guidedMode,completed)}${switches(subject,guidedMode)}</div>
  <section class="guided-map panel" aria-label="Aulas em ordem">
   <div class="guided-map-heading"><h2>Tua sequência de estudo</h2>
    <div class="d2-actions">
     ${count>0&&pending&&pending!==lessons[0]?link(route(subject,lessons[0].id,guidedMode),'Rever desde o início','outline'):''}
     ${subject==='biologia'&&biology?link('dia-2/apostas','Apostas de Biologia 2026','outline'):''}
     ${link(route(subject,(pending||lessons[0]).id,guidedMode),count===0?'Começar do zero →':pending?'Continuar na primeira aula pendente →':'Revisar desde o início →','primary')}
    </div></div>
   <ol class="guided-map-list">
    ${lessons.map((lesson,i)=>{
     const path=route(subject,lesson.id,guidedMode);
     return `<li><a href="#${path}" data-study-route="${path}">
      <span class="guided-map-number" aria-hidden="true">${number(i)}</span>
      <span><strong>${esc(lesson.title)}</strong><small>${esc(lesson.lead)}</small></span>
      <span class="guided-map-state">${completed[lesson.id]?'Concluída ✓':lesson===pending?'Próxima aula →':'Abrir →'}</span>
     </a></li>`;
    }).join('')}
   </ol>
  </section>`;
 }

 function stageButton(index,label,kind='outline'){
  return `<button type="button" class="${kind}" data-guided-step="${index}">${label}</button>`;
 }

 function guidedLesson(subject,lessons,lesson,completed,questions){
  const index=lessons.indexOf(lesson), done=!!completed[lesson.id];
  const summary=globalThis.FurgStudyData?.layers[lesson.id]?.[3]?.split(' → ')||[];
  const required=questions.filter(check=>!check.optional).length;
  return `<article class="aula-lesson guided-lesson panel" aria-labelledby="aulaTitle">
   <header class="aula-lesson-intro">
    ${link(route(subject,null,guidedMode),'← Ver a sequência de '+guide.subjects[subject].label,'quiet')}
    <p class="aula-overline">${esc(guide.subjects[subject].label)} · AULA ${number(index)}/${lessons.length}${done?' · CONCLUÍDA':''}</p>
    <h1 id="aulaTitle" tabindex="-1">${esc(lesson.title)}</h1>
    <p class="aula-lead">${esc(lesson.lead)}</p>
   </header>
   <div class="guided-steps" data-guided-steps role="group" aria-label="Passos desta aula">
    ${guidedStages.map((label,i)=>`<button type="button" class="outline" data-guided-step="${i}" ${i===0?'aria-current="step"':''}>${i+1}. ${label}</button>`).join('')}
   </div>
   <section data-guided-pane="0" aria-labelledby="guidedUnderstand">
    <h2 id="guidedUnderstand" tabindex="-1">Entende a ideia</h2>
    ${readingMarkup(lesson)}
    <details class="el-depth"><summary>Aprofundar e ver conexões</summary>${course?.layers(lesson.id)||''}</details>
    ${stageButton(1,'Ir para o exemplo →','primary')}
   </section>
   <section data-guided-pane="1" aria-labelledby="guidedVisual" hidden>
    <h2 id="guidedVisual" tabindex="-1">Visualiza o raciocínio</h2>
    ${summary.length?`<ol class="el-flow" aria-label="Caminho visual">${summary.map(item=>`<li>${esc(item)}</li>`).join('')}</ol>`:''}
    ${exampleMarkup(lesson)}${experimentMarkup(lesson,true)}
    <div class="aula-next">${stageButton(0,'← Voltar à explicação')}${stageButton(2,'Ir para os exercícios →','primary')}</div>
   </section>
   <section data-guided-pane="2" aria-labelledby="guidedPractice" hidden>
    <h2 id="guidedPractice" tabindex="-1">Pratica antes de avançar</h2>
    <p>${done?'Refaz os exercícios se quiser revisar.':'Acerta '+(required>1?'os '+required+' exercícios iniciais':'o primeiro exercício')+' pra liberar a próxima aula.'}</p>
    ${questions.map(checkMarkup).join('')}
    <div class="aula-next">${stageButton(1,'← Rever o exemplo')}
     <button type="button" id="guidedAdvance" class="primary" ${done?'':'disabled'}>
      ${index+1===lessons.length?'Concluir e voltar à trilha →':done?'Próxima aula →':'Concluir e avançar →'}
     </button></div>
    <p id="guidedStatus" role="status"></p>
    <aside class="aula-exam"><strong>Como reconhecer isso no ENEM?</strong><p>${esc(lesson.exam)}</p></aside>
    <details class="el-depth"><summary>Quero praticar mais</summary>${course?.practiceLinks(lesson.id)||''}</details>
   </section>
  </article>`;
 }

 function lessonMarkup(subject,lessons,lesson,completed){
  const index=lessons.indexOf(lesson), {check}=lesson, prev=lessons[index-1], next=lessons[index+1], done=!!completed[lesson.id];
  return `<div class="aula-layout">
   ${indexMarkup(subject,lessons,lesson,completed)}
   <article class="aula-lesson panel" aria-labelledby="aulaTitle">
    <header class="aula-lesson-intro"><p class="aula-overline">${esc(stages[Math.min(Math.floor(index/3),stages.length-1)])} · AULA ${number(index)}/${lessons.length}</p>
     <h2 id="aulaTitle" tabindex="-1">${esc(lesson.title)}</h2><p class="aula-lead">${esc(lesson.lead)}</p>
     <p id="aulaEvidence" class="d2-muted">${esc(course?.evidence(lesson.id,adapter.getVisits(),completed)||'')}</p></header>
    ${readingMarkup(lesson)}
    ${course?.layers(lesson.id)||''}
    ${exampleMarkup(lesson)}${experimentMarkup(lesson)}
    ${maps.relatedLinks(lesson.id)}
    <aside class="aula-exam"><strong>Como reconhecer isso no ENEM?</strong><p>${esc(lesson.exam)}</p></aside>
    ${checkMarkup(check)}
    ${course?.practiceLinks(lesson.id)||''}
    <div class="aula-lesson-actions">
     <button type="button" id="aulaMark" class="primary" aria-disabled="${done}">${done?'Aula estudada ✓':'Marcar como estudada'}</button>
     <button type="button" class="outline" id="aulaFormula">Consultar ficha relacionada</button>
     <button type="button" class="outline" id="aulaBank">Questões de ${esc(guide.subjects[subject].label)}</button>
    </div>
    <p id="aulaStatus" role="status" class="aula-status"></p>
    <div class="aula-next">
     ${prev?link(route(subject,prev.id),'← Aula anterior','outline'):''}
     ${next?link(route(subject,next.id),'Próxima aula →','outline'):link(route(subject,null,'mapa'),'Rever o mapa →','outline')}
    </div>
   </article>
  </div>`;
 }

 function render(selection){
  const host=$('dia2LessonsRoot');
  if(!adapter||!host)return;
  const subject=valid(selection.subject)?selection.subject:'fisica';
  const concepts=selection.page==='conceitos', mapView=concepts||selection.page==='mapa';
  const guided=selection.page===guidedMode;
  const lessons=catalog[subject], completed=validate(adapter.getProgress());
  if(selection.page==='roteiro-fisica'&&physicsVideo){
   maps.unmount();
   active=null;
   host.innerHTML=videoMarkup(completed);
   return;
  }
  if(guided&&!selection.lesson){
   maps.unmount();
   active=null;
   host.innerHTML=`<div class="aula-view" data-subject="${subject}">${guidedMap(subject,lessons,completed)}</div>`;
   return;
  }
  const lesson=lessons.find(item=>item.id===selection.lesson)||lessons.find(item=>!completed[item.id])||lessons[0];
  const count=lessons.filter(item=>completed[item.id]).length;
  const {label}=guide.subjects[subject];
  const visits=validateVisits(adapter.getVisits()), latest=latestVisit(visits);
  const source=concepts?
   '<p class="aula-source">Fichas e simulação autorais. <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener noreferrer">Provas e gabaritos do Inep ↗</a></p>':
   '<p class="aula-source">Aulas e exercícios autorais. <a href="https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem" target="_blank" rel="noopener noreferrer">Matrizes de Referência do Inep ↗</a></p>';
  maps.unmount(mapView);
  if(mapView){
   active=null;
   host.innerHTML=`<div class="aula-view" data-subject="${subject}">
    <h1 id="aulaPageTitle" class="sr-only">${concepts?'Mapa de conceitos':'Mapa mental'} do Dia 2</h1>
    ${maps.markup(subject,completed,visits,latest,concepts)}${source}
   </div>`;
   maps.bind(host,subject,concepts);
   return;
  }
  // A abertura marca a aula como estudando. A conclusão continua sendo explícita.
  if(latest!==lesson.id)adapter.saveVisits({...visits,[lesson.id]:Math.max(Date.now(),(visits[latest]||0)+1)});
  active={subject,lesson};
  if(guided){
   const questions=[{key:'aula-'+lesson.id,...lesson.check},...(course?.trailExtras(lesson.id)||[])];
   active.guided={questions,solved:new Set(),recorded:new Set()};
   host.innerHTML=`<div class="aula-view" data-subject="${subject}">${guidedLesson(subject,lessons,lesson,completed,questions)}${source}</div>`;
   return;
  }
  host.innerHTML=`<div class="aula-view" data-subject="${subject}">
   <header class="aula-hero panel">
    <div><p class="aula-overline">ENEM · DIA 2</p><h1 id="aulaPageTitle">Estudar do zero</h1>
     <p>Do primeiro conceito às questões. Escolhe uma matéria e segue no teu ritmo.</p></div>
    <div class="aula-progress"><strong>${esc(label)}</strong>
     <progress id="aulaProgress" max="${lessons.length}" value="${count}" aria-label="Aulas estudadas em ${esc(label)}"></progress>
     <span id="aulaProgressLabel">${count} de ${lessons.length} estudadas</span>
    </div>
   </header>
   <div class="aula-nav">${maps.subjectTabs(subject,'aulas',completed)}${switches(subject,'aulas')}</div>
   ${lessonMarkup(subject,lessons,lesson,completed)}${source}
  </div>`;
 }

 function showGuidedStep(host,index){
  if(!Number.isInteger(index)||!guidedStages[index])return;
  for(const pane of host.querySelectorAll('[data-guided-pane]'))pane.hidden=Number(pane.dataset.guidedPane)!==index;
  for(const step of host.querySelectorAll('[data-guided-steps] [data-guided-step]')){
   if(Number(step.dataset.guidedStep)===index)step.setAttribute('aria-current','step');
   else step.removeAttribute('aria-current');
  }
  const heading=host.querySelector('[data-guided-pane="'+index+'"] h2');
  heading?.focus();
  heading?.scrollIntoView({block:'nearest'});
 }

 function gradeGuided(button){
  const group=button.closest('[data-guided-check]');
  const {questions,solved,recorded}=active.guided;
  const check=questions[Number(group?.dataset.guidedCheck)], choice=Number(button.dataset.aulaChoice);
  const reason=check?.choices[choice]?.[1];
  if(!reason||solved.has(check.key))return;
  if(!recorded.has(check.key)&&course?.record(check.key,choice))recorded.add(check.key);
  const correct=choice===check.correct;
  if(correct)solved.add(check.key);
  for(const option of group.querySelectorAll('[data-aula-choice]')){
   option.setAttribute('aria-pressed',String(option===button));
   if(correct&&option!==button)option.disabled=true;
  }
  const feedback=group.querySelector('.aula-feedback');
  feedback.dataset.result=correct?'correct':'retry';
  feedback.textContent=(correct?'Acertou. ':'Tenta de novo. ')+reason;
  group.querySelector('[data-aula-reason]').hidden=correct||reason===check.choices[check.correct][1];
  if(correct&&questions.every(item=>item.optional||solved.has(item.key))){
   $('guidedAdvance').disabled=false;
   $('guidedStatus').textContent='Pronto. Tu já pode avançar.';
  }
 }

 function advanceGuided(){
  const {subject,lesson,guided}=active, completed=validate(adapter.getProgress());
  if(!completed[lesson.id]){
   if(guided.questions.some(item=>!item.optional&&!guided.solved.has(item.key)))return;
   if(!adapter.saveProgress({...completed,[lesson.id]:true})){
    $('guidedStatus').textContent='Não foi possível salvar. Tenta de novo.';
    return;
   }
  }
  const lessons=catalog[subject], next=lessons[lessons.indexOf(lesson)+1];
  if(adapter.openRoute(route(subject,next?.id,guidedMode))!==false)globalThis.FurgNavigation?.afterNavigate();
 }

 function grade(button){
  if(active.guided){gradeGuided(button);return;}
  const choice=Number(button.dataset.aulaChoice), {check}=active.lesson;
  const explanation=check.choices[choice]?.[1];
  if(!explanation)return;
  const correct=choice===check.correct;
  if(!active.attempted){
   active.attempted=course?.record('aula-'+active.lesson.id,choice);
   if(active.attempted)$('aulaEvidence').textContent=course.evidence(active.lesson.id,adapter.getVisits(),adapter.getProgress());
  }
  for(const option of $('dia2LessonsRoot').querySelectorAll('[data-aula-choice]')){
   option.setAttribute('aria-pressed',String(option===button));
  }
  const feedback=$('aulaFeedback');
  feedback.dataset.result=correct?'correct':'retry';
  feedback.textContent=(correct?'Acertou. ':'Tenta de novo. ')+explanation;
  feedback.parentElement.querySelector('[data-aula-reason]').hidden=correct;
 }

 function mark(){
  const {subject,lesson}=active, completed=validate(adapter.getProgress()), status=$('aulaStatus');
  if(completed[lesson.id])return;
  completed[lesson.id]=true;
  if(!adapter.saveProgress(completed)){
   status.textContent='Não foi possível salvar a aula. Tenta novamente.';
   return;
  }
  const lessons=catalog[subject], count=lessons.filter(item=>completed[item.id]).length;
  $('aulaProgress').value=count;
  $('aulaProgressLabel').textContent=`${count} de ${lessons.length} estudadas`;
  $('aulaMark').textContent='Aula estudada ✓';
  $('aulaMark').setAttribute('aria-disabled','true');
  const host=$('dia2LessonsRoot');
  host.querySelector(`[data-map-progress="${subject}"]`).textContent=`${count}/${lessons.length}`;
  host.querySelector(`[data-map-progress-label="${subject}"]`).textContent=`${count} de ${lessons.length} concluídas`;
  host.querySelector('[data-aula-mark="'+lesson.id+'"]').hidden=false;
  status.textContent='Progresso da aula salvo.';
 }

 function init(value){
  adapter=value;
  const host=$('dia2LessonsRoot');
  if(!host)return;
  globalThis.FurgDia2Temperature?.bind(host);
  studyLabs?.bind(host);
  host.addEventListener('click',event=>{
   const button=event.target.closest('button');
   if(!button||!active)return;
   if(active.guided&&Object.hasOwn(button.dataset,'guidedStep')){showGuidedStep(host,Number(button.dataset.guidedStep));return;}
   if(active.guided&&button.id==='guidedAdvance'){advanceGuided();return;}
   if(Object.hasOwn(button.dataset,'aulaChoice'))grade(button);
   if(button.id==='aulaMark')mark();
   if(button.id==='aulaFormula')globalThis.FurgDia2?.openGuide(active.subject,cards.get(active.lesson.card)?.title||'');
   if(button.id==='aulaBank'&&globalThis.FurgEnem?.openSubject(active.subject))globalThis.FurgNavigation?.afterNavigate();
   if(button.dataset.studyEnem&&globalThis.FurgEnem?.openQuestion(button.dataset.studyEnem))globalThis.FurgNavigation?.afterNavigate();
  });
  host.addEventListener('input',event=>{
   if(event.target.id==='aulaLabRange'&&active)labs.update(active.lesson.lab,event.target);
  });
 }
 globalThis.FurgDia2Lessons={init,render,valid,validate,validateVisits};
})();
