'use strict';
(() => {
 const catalog=globalThis.FURG_DIA2_LESSONS, guide=globalThis.FURG_DIA2_GUIDE;
 if(!catalog||!guide)return;
 const maps=globalThis.FurgDia2Maps, labs=globalThis.FurgDia2Labs;
 const subjects=Object.keys(catalog), lessonIds=Object.values(catalog).flatMap(group=>group.map(lesson=>lesson.id));
 const cards=new Map(guide.entries.map(card=>[card.id,card]));
 const stages=['Base','Conexões','Aplicação'];
 const $=id=>document.getElementById(id);
 const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const route=(subject,lesson,mode='aulas')=>['dia-2',mode,subject,lesson].filter(Boolean).join('/');
 const link=(path,label,className)=>`<a class="${className}" href="#${path}" data-study-route="${path}">${esc(label)}</a>`;
 const valid=(subject,lesson)=>subjects.includes(subject)&&(!lesson||catalog[subject].some(item=>item.id===lesson));
 const validate=value=>Object.fromEntries(lessonIds.filter(id=>value?.[id]===true).map(id=>[id,true]));
 const number=index=>String(index+1).padStart(2,'0');
 let adapter, active;

 function subjectTabs(subject,mode){
  return `<nav class="aula-subjects" aria-label="Matérias do Dia 2">${subjects.map(id=>{
   const {label,icon}=guide.subjects[id], path=route(id,null,mode);
   return `<a class="aula-subject-tab" data-subject="${id}" href="#${path}" data-study-route="${path}"
    ${id===subject?'aria-current="page"':''}><span aria-hidden="true">${esc(icon)}</span>${esc(label)}</a>`;
  }).join('')}</nav>`;
 }

 function switches(subject,mode){
  return `<nav class="aula-mode-tabs" aria-label="Formatos de estudo">
   ${[['aulas','Aulas'],['mapa','Mapa mental']].map(([id,label])=>{
    const path=route(subject,null,id);
    return `<a href="#${path}" data-study-route="${path}" ${id===mode?'aria-current="page"':''}>${label}</a>`;
   }).join('')}
  </nav>`;
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
     <h2 id="aulaTitle" tabindex="-1">${esc(lesson.title)}</h2><p class="aula-lead">${esc(lesson.lead)}</p></header>
    <div class="aula-reading">${lesson.parts.map(([title,body])=>`<section><h3>${esc(title)}</h3><p>${esc(body)}</p></section>`).join('')}</div>
    <section class="aula-example" aria-labelledby="aulaExampleTitle">
     <h3 id="aulaExampleTitle">Exemplo resolvido</h3><p>${esc(lesson.example[0])}</p>
     <ol>${lesson.example.slice(1).map(step=>`<li>${esc(step)}</li>`).join('')}</ol>
    </section>
    ${lesson.lab?labs.markup(lesson.lab):''}
    <aside class="aula-exam"><strong>Na hora da questão</strong><p>${esc(lesson.exam)}</p></aside>
    <section class="aula-check" aria-labelledby="aulaCheckTitle">
     <p class="aula-overline">QUESTÃO AUTORAL</p><h3 id="aulaCheckTitle">Testa a ideia</h3><p id="aulaCheckPrompt">${esc(check.prompt)}</p>
     <div class="aula-check-options" role="group" aria-labelledby="aulaCheckPrompt">
      ${check.choices.map(([label],i)=>`<button type="button" class="outline" data-aula-choice="${i}" aria-pressed="false">
       <b aria-hidden="true">${'ABC'[i]}</b><span>${esc(label)}</span>
      </button>`).join('')}
     </div><p id="aulaFeedback" class="aula-feedback" role="status"></p>
    </section>
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
  const mode=selection.page==='mapa'?'mapa':'aulas', lessons=catalog[subject], completed=validate(adapter.getProgress());
  const lesson=lessons.find(item=>item.id===selection.lesson)||lessons.find(item=>!completed[item.id])||lessons[0];
  const count=lessons.filter(item=>completed[item.id]).length;
  const {label}=guide.subjects[subject];
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
   <div class="aula-nav">${subjectTabs(subject,mode)}${switches(subject,mode)}</div>
   ${mode==='mapa'?maps.markup(subject,lessons,route,completed):lessonMarkup(subject,lessons,lesson,completed)}
   <p class="aula-source">Aulas e exercícios autorais. <a href="https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem" target="_blank" rel="noopener noreferrer">Matrizes de Referência do Inep ↗</a></p>
  </div>`;
  if(mode==='mapa')maps.bind(host);
 }

 function grade(button){
  const choice=Number(button.dataset.aulaChoice), {check}=active.lesson;
  const explanation=check.choices[choice]?.[1];
  if(!explanation)return;
  const correct=choice===check.correct;
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
  $('dia2LessonsRoot').querySelector('[data-aula-mark="'+lesson.id+'"]').hidden=false;
  status.textContent='Progresso da aula salvo.';
 }

 function init(value){
  adapter=value;
  const host=$('dia2LessonsRoot');
  if(!host)return;
  host.addEventListener('click',event=>{
   const button=event.target.closest('button');
   if(!button||!active)return;
   if(Object.hasOwn(button.dataset,'aulaChoice'))grade(button);
   if(button.id==='aulaMark')mark();
   if(button.id==='aulaFormula')globalThis.FurgDia2?.openGuide(active.subject,cards.get(active.lesson.card)?.title||'');
   if(button.id==='aulaBank'&&globalThis.FurgEnem?.openSubject(active.subject))globalThis.FurgNavigation?.afterNavigate();
  });
  host.addEventListener('input',event=>{
   if(event.target.id==='aulaLabRange')labs.update(active.lesson.lab,event.target);
  });
 }
 globalThis.FurgDia2Lessons={init,render,valid,validate};
})();
