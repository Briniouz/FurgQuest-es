'use strict';
(() => {
 const catalog=globalThis.FURG_DIA2_LESSONS, guide=globalThis.FURG_DIA2_GUIDE;
 if(!catalog||!guide)return;
 const maps=globalThis.FurgDia2Maps, labs=globalThis.FurgDia2Labs;
 const course=globalThis.FurgStudyCourse, studyLabs=globalThis.FurgStudyLabs;
 const physicsVideo=globalThis.FURG_DIA2_PHYSICS_VIDEO;
 const subjects=Object.keys(catalog), lessonIds=Object.values(catalog).flatMap(group=>group.map(lesson=>lesson.id));
 const cards=new Map(guide.entries.map(card=>[card.id,card]));
 const stages=['Base','Conexões','Aplicação'];
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
  const tabs=[['aulas','Aulas'],['mapa','Mapa mental'],['conceitos','Conceitos']];
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
    ${physicsVideo.map(([title,time,lessonId,tip],i)=>`<li class="panel"><details ${i===0?'open':''}>
     <summary><span class="aula-video-time">${esc(time)}</span><strong>${esc(title)}</strong></summary>
     <div class="aula-video-notes"><p>${esc(tip)}</p>
      ${link(route('fisica',lessonId),'Abrir aula relacionada →','outline')}</div>
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
     ${lessons.slice(i*3,i*3+3).map((lesson,j)=>{
      const path=route(subject,lesson.id), done=completed[lesson.id];
      return `<li><a href="#${path}" data-study-route="${path}" ${lesson===selected?'aria-current="page"':''}>
       <small aria-hidden="true">${number(i*3+j)}</small><span>${esc(lesson.title)}</span>
       <span class="aula-index-mark" data-aula-mark="${lesson.id}" ${done?'':'hidden'}><span aria-hidden="true">✓</span><span class="sr-only">Estudada</span></span>
      </a></li>`;
     }).join('')}</ol></div>`).join('')}
   </nav>
  </details>`;
 }

 function lessonMarkup(subject,lessons,lesson,completed){
  const index=lessons.indexOf(lesson), {check}=lesson, prev=lessons[index-1], next=lessons[index+1], done=!!completed[lesson.id];
  return `<div class="aula-layout">
   ${indexMarkup(subject,lessons,lesson,completed)}
   <article class="aula-lesson panel" aria-labelledby="aulaTitle">
    <header class="aula-lesson-intro"><p class="aula-overline">${esc(stages[Math.floor(index/3)])} · AULA ${number(index)}/${lessons.length}</p>
     <h2 id="aulaTitle" tabindex="-1">${esc(lesson.title)}</h2><p class="aula-lead">${esc(lesson.lead)}</p>
     <p id="aulaEvidence" class="d2-muted">${esc(course?.evidence(lesson.id,adapter.getVisits(),completed)||'')}</p></header>
    <div class="aula-reading">${lesson.parts.map(([title,body])=>`<section><h3>${esc(title)}</h3><p>${esc(body)}</p></section>`).join('')}</div>
    ${course?.layers(lesson.id)||''}
    <section class="aula-example" aria-labelledby="aulaExampleTitle">
     <h3 id="aulaExampleTitle">Exemplo resolvido</h3><p>${esc(lesson.example[0])}</p>
     <ol>${lesson.example.slice(1).map(step=>`<li>${esc(step)}</li>`).join('')}</ol>
    </section>
    ${lesson.lab?labs.markup(lesson.lab):''}
    ${studyLabs?.markup(globalThis.FurgStudyData?.layers[lesson.id]?.[4],'aula')||''}
    ${lesson.id==='energia'&&studyLabs?`<details class="el-depth"><summary>Compara rampa, queda, pêndulo, montanha-russa e mola</summary>${studyLabs.markup('conservacao','aula')}</details>`:''}
    ${lesson.id==='calor'?globalThis.FurgDia2Temperature?.markup()||'':''}
    ${maps.relatedLinks(lesson.id)}
    <aside class="aula-exam"><strong>Como reconhecer isso no ENEM?</strong><p>${esc(lesson.exam)}</p></aside>
    <section class="aula-check" aria-labelledby="aulaCheckTitle">
     <p class="aula-overline">QUESTÃO AUTORAL</p><h3 id="aulaCheckTitle">Testa a ideia</h3><p id="aulaCheckPrompt">${esc(check.prompt)}</p>
     <div class="aula-check-options" role="group" aria-labelledby="aulaCheckPrompt">
      ${check.choices.map(([label],i)=>`<button type="button" class="outline" data-aula-choice="${i}" aria-pressed="false">
       <b aria-hidden="true">${'ABC'[i]}</b><span>${esc(label)}</span>
      </button>`).join('')}
     </div><p id="aulaFeedback" class="aula-feedback" role="status"></p>
    </section>
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
  const lessons=catalog[subject], completed=validate(adapter.getProgress());
  if(selection.page==='roteiro-fisica'&&physicsVideo){
   maps.unmount();
   active=null;
   host.innerHTML=videoMarkup(completed);
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

 function grade(button){
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
