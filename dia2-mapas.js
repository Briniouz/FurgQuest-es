'use strict';
(() => {
 const maps=globalThis.FURG_DIA2_MAPS;
 const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const priority={1:'Baixa',2:'Média',3:'Alta'};
 const allLessons=Object.values(maps).flatMap(map=>map.branches.flatMap(branch=>branch.lessons));
 const byId=new Map(allLessons.map(lesson=>[lesson.id,lesson]));
 const total=map=>map.branches.reduce((count,branch)=>count+branch.lessons.length,0);
 const finished=(lessons,completed)=>lessons.filter(lesson=>completed[lesson.id]).length;
 const count=(map,completed)=>map.branches.reduce((sum,branch)=>sum+finished(branch.lessons,completed),0);
 let dispose, wide=false;

 function subjectTabs(subject,mode,completed){
  return `<nav class="aula-subjects" aria-label="Matérias do Dia 2">${Object.values(maps).map(map=>{
   const route=`dia-2/${mode}/${map.id}`, done=count(map,completed);
   return `<a class="aula-subject-tab" data-subject="${map.id}" href="#${route}" data-study-route="${route}"
    ${map.id===subject?'aria-current="page"':''}><span aria-hidden="true">${escape(map.icon)}</span>
    <strong>${escape(map.label)}</strong><small data-map-progress="${map.id}" aria-hidden="true">${done}/${total(map)}</small>
    <span class="sr-only" data-map-progress-label="${map.id}">${done} de ${total(map)} concluídas</span></a>`;
  }).join('')}</nav>`;
 }

 function relatedLinks(lessonId){
  const links=byId.get(lessonId)?.related.map(ref=>`<a href="#${ref.route}" data-study-route="${ref.route}"
   aria-label="Também em ${escape(maps[ref.subject].label)}, ${escape(byId.get(ref.id).title)}">${escape(maps[ref.subject].label)}</a>`);
  const related=globalThis.FurgStudyData?.paths[lessonId], next=related&&byId.get(related[1]);
  const bridge=next?`<p class="d2-map-related">Conexão de estudo <a href="#${next.route}" data-study-route="${next.route}" title="Abre a aula que desenvolve esta relação">${escape(next.title)}</a></p>`:'';
  return (links?.length?`<p class="d2-map-related">Também em${links.join('')}</p>`:'')+bridge;
 }

 function lessonCard(lesson,completed,visited){
  const {id,title,number,description,relevance,minutes,route}=lesson;
  const state=completed[id]?'Concluída':visited[id]?'Estudando':'Não vista';
  const dots=relevance?'●'.repeat(relevance)+'○'.repeat(3-relevance):'A definir';
  const relevanceLabel=relevance?'Prioridade '+priority[relevance].toLowerCase():'Prioridade a definir';
  return `<li class="d2-map-lesson" data-map-lesson="${id}">
   <div class="d2-map-card-head">
    <h4>${escape(title)}</h4>
    <span class="d2-map-priority" title="${relevanceLabel}"><span aria-hidden="true">${dots}</span><span class="sr-only">${relevanceLabel}</span></span>
    <button type="button" class="d2-map-card-toggle" aria-label="Detalhes de ${escape(title)}"
     aria-expanded="false" aria-controls="map-card-${id}"></button>
   </div>
   <div class="d2-map-card-body" id="map-card-${id}">
    <p class="d2-map-summary">${escape(description)}</p>
    <div class="d2-map-meta"><span class="d2-map-number">Aula ${String(number).padStart(2,'0')}</span><span>${minutes?minutes+' min':'Tempo a definir'}</span>
     ${relatedLinks(id)}
    </div>
    <div class="d2-map-card-actions"><span class="d2-map-state" data-map-state="${completed[id]?'done':visited[id]?'reading':'new'}">${state}</span>
     <a class="d2-map-study" href="#${route}" data-study-route="${route}" aria-label="Estudar ${escape(title)}">Estudar <span aria-hidden="true">→</span></a>
    </div>
   </div>
  </li>`;
 }

 function markup(subject,completed,visited,last,concepts){
  const map=maps[subject], resume=byId.get(last);
  const otherMap=concepts?'mapa':'conceitos', otherPath=`dia-2/${otherMap}/${subject}`;
  return `<section class="d2-map panel${concepts?' d2-concepts':''}" aria-labelledby="aulaTitle">
   <header class="d2-map-heading">
    <h2 id="aulaTitle" tabindex="-1">${concepts?'Conceitos':'Mapa mental'}</h2>
    ${subjectTabs(subject,concepts?'conceitos':'mapa',completed)}
    <div class="d2-map-viewlinks d2-map-lessons-link">
     <a class="outline d2-map-mode-link" href="#${otherPath}" data-study-route="${otherPath}">${concepts?'Mapa de aulas':'Conceitos →'}</a>
     <a class="outline" href="#dia-2/aulas/${subject}" data-study-route="dia-2/aulas/${subject}">Aulas</a>
    </div>
   </header>
   <div class="d2-map-tools">
    ${concepts?globalThis.FurgDia2Concepts.toolbar(subject):`<label class="d2-map-search"><span class="sr-only">Buscar aula ou tema em ${escape(map.label)}</span>
     <input type="search" id="d2MapSearch" placeholder="Buscar aula ou tema" autocomplete="off"></label>
    <label class="d2-map-paths"><span class="sr-only">Caminho de estudo</span>
     <select id="d2MapPath">
      <option value="">Todos os caminhos</option>
      ${map.paths.map(path=>`<option value="${path.id}">${escape(path.title)}</option>`).join('')}
     </select>
    </label>
    ${resume?`<a class="outline d2-map-resume" href="#${resume.route}" data-study-route="${resume.route}"
      title="${escape(resume.title)}">Continuar de onde parei</a>`:''}`}
    <div class="d2-map-controls" role="group" aria-label="Controles do quadro">
     <div class="d2-map-zoom" role="group" aria-label="Zoom">
      <button type="button" class="outline" data-map-zoom="out" aria-label="Diminuir zoom">−</button>
      <output id="d2MapScale" aria-label="Zoom do mapa">100%</output>
      <button type="button" class="outline" data-map-zoom="in" aria-label="Aumentar zoom">+</button>
      <button type="button" class="outline" data-map-zoom="fit">Enquadrar</button>
     </div>
     ${concepts?`<button type="button" class="outline" id="d2ConceptReset" disabled>Reorganizar</button>`:
      '<button type="button" class="outline" id="d2MapExpand">Expandir tudo</button>'}
     <button type="button" class="outline d2-map-wide" id="d2MapWide" aria-pressed="false">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 2H2v4m8-4h4v4M2 10v4h4m8-4v4h-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
      <span>Tela ampla</span></button>
    </div>
   </div>
   <div class="d2-map-viewport" tabindex="0" role="region" aria-label="Quadro do mapa mental" aria-describedby="d2MapHint">
    <div class="d2-map-extent">
     <div class="d2-map-world">
      <svg class="d2-map-lines" aria-hidden="true" focusable="false"></svg>
      ${concepts?'<div id="d2ConceptRows"></div>':`<button type="button" class="d2-map-node d2-map-root" id="d2MapRoot" aria-expanded="true" aria-controls="d2MapBranches">
       <small>CONCEITO DE PARTIDA</small><strong>${escape(map.root.title)}</strong><span>${escape(map.root.description)}</span>
      </button>
      <div class="d2-map-branches" id="d2MapBranches">
       ${map.branches.map((branch,index)=>`<section class="d2-map-column" data-map-branch="${branch.id}" data-map-tone="${branch.tone}">
        <h3><button type="button" class="d2-map-node d2-map-branch" aria-expanded="${index===0}" aria-controls="d2MapLeaves-${branch.id}">
         <strong>${escape(branch.title)}</strong><span>${escape(branch.description)}</span>
         <small>${finished(branch.lessons,completed)}/${branch.lessons.length} concluídas</small>
        </button></h3>
        <ol class="d2-map-leaves" id="d2MapLeaves-${branch.id}" ${index===0?'':'hidden'}>
         ${branch.lessons.map(lesson=>lessonCard(lesson,completed,visited)).join('')}
        </ol></section>`).join('')}
      </div>
      <p class="d2-map-empty" id="d2MapEmpty" hidden>Nenhuma aula encontrada. Tenta outro tema ou caminho.</p>`}
     </div>
    </div>
   </div>
   <div class="d2-map-footer">
    <p id="d2MapHint">${concepts?'Toca no título pra abrir a ficha · Arrasta pelo ⠿ ou usa as setas · Níveis estimados':
     '<span class="d2-map-desktop-hint">Arrasta para mover · </span>Prioridade e tempo estimados'}</p>
    <p id="d2MapResults" role="status"></p>
   </div>
   ${concepts?'<section class="d2-concept-detail" id="d2ConceptDetail" aria-label="Ficha do conceito" hidden></section>':''}
  </section><dialog class="d2-map-dialog" aria-labelledby="aulaTitle"></dialog>`;
 }

 function unmount(preserveWide=false){
  dispose?.();
  dispose=undefined;
  if(!preserveWide)wide=false;
 }

 function bind(host,subject,concepts){
  const board=host.querySelector('.d2-map');
  if(!board)return;
  const get=selector=>board.querySelector(selector), all=selector=>[...board.querySelectorAll(selector)];
  const map=maps[subject], dialog=host.querySelector('.d2-map-dialog');
  const viewport=get('.d2-map-viewport'), extent=get('.d2-map-extent'), world=get('.d2-map-world'), lines=get('.d2-map-lines');
  const branches=get('#d2MapBranches'), root=get('#d2MapRoot'), expand=get('#d2MapExpand'), wideButton=get('#d2MapWide');
  const input=get('#d2MapSearch'), paths=get('#d2MapPath');
  const mobile=matchMedia('(max-width: 899px)');
  const controller=new AbortController(), {signal}=controller;
  const groups=all('.d2-map-column').map((column,index)=>({
   column, data:map.branches[index], button:column.querySelector('.d2-map-branch'),
   leaves:column.querySelector('.d2-map-leaves'), cards:[...column.querySelectorAll('[data-map-lesson]')]
  }));
  const shown=()=>groups.filter(group=>!group.column.hidden);
  const initialBranches=()=>shown().filter((_,index)=>!mobile.matches||index===0).map(group=>group.data.id);
  let openRoot=true, opened=new Set(initialBranches()), scale=1, autoFit=true, frame, drag;
  const fit=()=>{autoFit=true;refresh();};
  const drawConcepts=concepts?globalThis.FurgDia2Concepts.bind(board,subject,{signal,fit,refresh,mobile}):null;

  // O CSS faz o layout. As curvas são redesenhadas a partir dos cartões visíveis.
  function draw(){
   if(drawConcepts){drawConcepts(scale);return;}
   if(mobile.matches)return;
   const origin=world.getBoundingClientRect();
   const box=node=>{
    const rect=node.getBoundingClientRect();
    return {left:(rect.left-origin.left)/scale,top:(rect.top-origin.top)/scale,
     width:rect.width/scale,height:rect.height/scale};
   };
   const from=box(root), x=from.left+from.width/2, y=from.top+from.height;
   const width=world.offsetWidth, height=world.offsetHeight;
   lines.setAttribute('viewBox',`0 0 ${width} ${height}`);
   lines.innerHTML=openRoot?shown().map(group=>{
    const to=box(group.button), tx=to.left+to.width/2, ty=to.top, bend=(y+ty)/2;
    const first=`M${x} ${y} C${x} ${bend} ${tx} ${bend} ${tx} ${ty}`;
    const cards=group.leaves.hidden?[]:group.cards.filter(card=>!card.hidden).map(box);
    const rail=to.left+4, last=cards.at(-1);
    const stems=last?` M${rail} ${to.top+to.height} V${last.top+last.height/2}`+
     cards.map(card=>` M${rail} ${card.top+card.height/2} H${card.left}`).join(''):'';
    return `<path data-map-tone="${group.data.tone}" d="${first}${stems}"/>`;
   }).join(''):'';
  }

  function layout(next=scale,preserveCenter=false){
   if(mobile.matches)return;
   const x=(viewport.scrollLeft+viewport.clientWidth/2)/scale, y=(viewport.scrollTop+viewport.clientHeight/2)/scale;
   scale=Math.max(.2,Math.min(1.6,next));
   world.style.transform=`scale(${scale})`;
   extent.style.width=`${Math.ceil(world.offsetWidth*scale)}px`;
   extent.style.height=`${Math.ceil(world.offsetHeight*scale)}px`;
   if(preserveCenter){
    viewport.scrollLeft=x*scale-viewport.clientWidth/2;
    viewport.scrollTop=y*scale-viewport.clientHeight/2;
   }else if(autoFit){
    viewport.scrollLeft=viewport.scrollTop=0;
   }
   get('#d2MapScale').textContent=Math.round(scale*100)+'%';
   draw();
  }

  function refresh(){
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    if(mobile.matches){drawConcepts?.(1);return;}
    if(!autoFit){layout();return;}
    // Fora do diálogo o quadro encolhe com o conteúdo, até o limite do CSS.
    const height=dialog.open?viewport.clientHeight:parseFloat(getComputedStyle(viewport).maxHeight)-2;
    layout(Math.min(1,(viewport.clientWidth-1)/world.offsetWidth,(height-1)/world.offsetHeight));
   });
  }

  function sync(){
   const visible=shown();
   world.style.setProperty('--map-columns',Math.max(1,visible.length));
   root.setAttribute('aria-expanded',String(openRoot));
   branches.hidden=!openRoot;
   for(const group of groups){
    const open=opened.has(group.data.id);
    group.button.setAttribute('aria-expanded',String(open));
    group.leaves.hidden=!open;
   }
   expand.disabled=!visible.length;
   expand.textContent=openRoot&&visible.every(group=>opened.has(group.data.id))?'Recolher ramos':'Expandir tudo';
   refresh();
  }

  function filter(){
   const query=normalize(input.value), words=query.split(/\s+/).filter(Boolean);
   const path=map.paths.find(item=>item.id===paths.value), filtering=!!(words.length||path);
   let matches=0;
   for(const group of groups){
    let hits=0;
    for(const [index,card] of group.cards.entries()){
     const lesson=group.data.lessons[index];
     const indexText=normalize([lesson.title,lesson.description,group.data.title,...lesson.terms].join(' '));
     const match=words.every(word=>indexText.includes(word))&&(!path||path.lessons.includes(lesson.id));
     card.hidden=!match;
     if(match)hits++;
    }
    group.column.hidden=!hits;
    matches+=hits;
   }
   openRoot=true;
   opened=new Set(filtering?shown().map(group=>group.data.id):initialBranches());
   get('#d2MapEmpty').hidden=!!matches;
   get('#d2MapResults').textContent=filtering?`${matches} ${matches===1?'aula encontrada':'aulas encontradas'}`:'';
   autoFit=true;
   sync();
  }

  // Mantém o mesmo DOM no diálogo, com foco modal nativo e saída por Esc.
  function enterWide(){
   autoFit=true;
   viewport.scrollTop=viewport.scrollLeft=0;
   dialog.append(board);
   dialog.showModal();
   wide=true;
   wideButton.setAttribute('aria-pressed','true');
   wideButton.querySelector('span').textContent='Sair da tela ampla';
   wideButton.focus({preventScroll:true});
   refresh();
  }
  dialog.addEventListener('close',()=>{
   dialog.before(board);
   wide=false;
   wideButton.setAttribute('aria-pressed','false');
   wideButton.querySelector('span').textContent='Tela ampla';
   wideButton.focus({preventScroll:true});
   refresh();
  },{signal});
  dispose=()=>{
   controller.abort();
   cancelAnimationFrame(frame);
   if(dialog.open)dialog.close();
   dialog.before(board);
  };

  function toggleBranch(group,open){
   if(open)opened.add(group.data.id);
   else opened.delete(group.data.id);
   sync();
  }
  const moveFocus=(items,at,step)=>items[(at+step+items.length)%items.length]?.focus();
  function arrows(event){
   const {key,target}=event, tabs=all('.aula-subject-tab');
   const tab=tabs.indexOf(target);
   if(tab>=0&&['ArrowLeft','ArrowRight'].includes(key)){
    event.preventDefault();
    moveFocus(tabs,tab,key==='ArrowRight'?1:-1);
    return;
   }
   const visible=shown(), group=visible.find(item=>item.column.contains(target));
   if(!group||!key.startsWith('Arrow'))return;
   if(target===group.button){
    event.preventDefault();
    if(key==='ArrowRight'){
     if(!opened.has(group.data.id))toggleBranch(group,true);
     else group.cards.find(card=>!card.hidden)?.querySelector(mobile.matches?'.d2-map-card-toggle':'.d2-map-study').focus();
    }else if(key==='ArrowLeft'){
     if(opened.has(group.data.id))toggleBranch(group,false);
     else root.focus();
    }else moveFocus(visible.map(item=>item.button),visible.indexOf(group),key==='ArrowDown'?1:-1);
   }else if(target.closest('[data-map-lesson]')){
    const cards=group.cards.filter(card=>!card.hidden), at=cards.indexOf(target.closest('[data-map-lesson]'));
    if(key==='ArrowLeft'){event.preventDefault();group.button.focus();}
    if(key==='ArrowDown'||key==='ArrowUp'){
     event.preventDefault();
     moveFocus(cards.map(card=>card.querySelector(mobile.matches?'.d2-map-card-toggle':'.d2-map-study')),at,key==='ArrowDown'?1:-1);
    }
   }
  }

  board.addEventListener('keydown',arrows,{signal});
  board.addEventListener('click',event=>{
   const button=event.target.closest('button');
   if(!button)return;
   if(button===wideButton){if(dialog.open)dialog.close();else enterWide();return;}
   if(button===root){openRoot=!openRoot;sync();return;}
   if(button===expand){
    const visible=shown(), allOpen=openRoot&&visible.every(group=>opened.has(group.data.id));
    openRoot=true;
    for(const group of visible){
     if(allOpen)opened.delete(group.data.id);
     else opened.add(group.data.id);
    }
    sync();
    return;
   }
   if(button.classList.contains('d2-map-card-toggle')){
    button.setAttribute('aria-expanded',String(button.getAttribute('aria-expanded')!=='true'));
    return;
   }
   const group=groups.find(item=>item.button===button);
   if(group){toggleBranch(group,!opened.has(group.data.id));return;}
   const zoom=button.dataset.mapZoom;
   if(zoom==='fit'){
    autoFit=true;
    refresh();
   }else if(zoom){
    autoFit=false;
    layout(scale+(zoom==='in'?.15:-.15),true);
   }
  },{signal});
  input?.addEventListener('input',()=>{paths.value='';filter();},{signal});
  paths?.addEventListener('change',()=>{input.value='';filter();},{signal});

  viewport.addEventListener('pointerdown',event=>{
   if(mobile.matches||event.pointerType!=='mouse'||event.button!==0||event.target.closest('button,a,[data-map-lesson],[data-concept-card]'))return;
   drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};
   viewport.setPointerCapture(event.pointerId);
   viewport.classList.add('is-panning');
  },{signal});
  viewport.addEventListener('pointermove',event=>{
   if(drag?.id!==event.pointerId)return;
   viewport.scrollLeft=drag.left+drag.x-event.clientX;
   viewport.scrollTop=drag.top+drag.y-event.clientY;
  },{signal});
  for(const type of ['pointerup','pointercancel','lostpointercapture']){
   viewport.addEventListener(type,event=>{
    if(drag?.id!==event.pointerId)return;
    drag=null;
    viewport.classList.remove('is-panning');
   },{signal});
  }
  window.addEventListener('resize',refresh,{signal});
  if(!concepts)sync();
  if(wide)enterWide();
 }

 globalThis.FurgDia2Maps={maps,markup,bind,unmount,subjectTabs,relatedLinks};
})();
