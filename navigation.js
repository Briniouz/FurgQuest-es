'use strict';
(() => {
 const $=id=>document.getElementById(id),nav=$('mainNavigation'),previous=$('navScrollPrevious'),next=$('navScrollNext');
 if(!nav||!previous||!next)return;
 const groups={provas:'Provas',treinamento:'Treinamento',estudos:'Estudos'};
 const names=['areas',...Object.keys(groups)],owners={vespera:'treinamento',dia2:'treinamento','matematica-lab':'treinamento',banco:'provas',enem:'provas',fuvest:'provas',anatomia:'treinamento',acervo:'provas',simulados:'provas',evolucao:'estudos',leve:'estudos',trilhas:'estudos',leituras:'estudos',biblioteca:'estudos',linguagens:'estudos',configuracoes:'estudos'};
 const topItems=()=>Array.from(nav.querySelectorAll('button')).filter(button=>!button.hidden);
 let adapter,opened='',bound=false,currentView='',returning=false,context='';
 const trail=[];
 function syncBack(){const b=$('pageBack');if(!b)return;b.disabled=!trail.length;b.title=trail.length?'Voltar à página anterior':'Visita outra seção para poder voltar';}
 function beforeNavigate(name){if(!name||name===currentView)return;if(currentView&&!returning){trail.push({view:currentView,y:typeof window!=='undefined'?window.scrollY||0:0});if(trail.length>40)trail.shift();}currentView=name;syncBack();}
 function back(){const last=trail.pop();if(!last||!adapter)return false;returning=true;let moved;try{moved=openRoute(last.view);}finally{returning=false;}if(moved===false){trail.push(last);syncBack();return false;}syncBack();pageTitle()?.focus({preventScroll:true});const restore=()=>{if(typeof window!=='undefined'&&window.scrollTo)window.scrollTo({top:last.y,behavior:'auto'});};if(typeof requestAnimationFrame==='function')requestAnimationFrame(restore);else restore();return true;}
 const openRoute=path=>adapter?.openRoute?adapter.openRoute(path):adapter?.setView(path);
 const pageTitle=()=> $(({inicio:'studyHomeTitle','area-estudo':'studyHubTitle','calculo-mental':'mlMentalTitle'})[document.querySelector('.view.active')?.id]||'pageTitle');
 const behavior=()=>globalThis.FurgUI?.reducedMotion()?'auto':'smooth';
 const trigger=id=>$('navTrigger-'+id),menu=id=>$('navMenu-'+id);
 const items=id=>Array.from(menu(id)?.querySelectorAll('button')||[]).filter(b=>!b.hidden&&!b.closest?.('[hidden]'));
 function update(){const max=Math.max(0,(nav.scrollWidth||0)-(nav.clientWidth||0));previous.hidden=next.hidden=max<=2;previous.disabled=(nav.scrollLeft||0)<=2;next.disabled=(nav.scrollLeft||0)>=max-2;}
 function close(focus=false){const old=opened;for(const id of names){if(menu(id))menu(id).hidden=true;trigger(id)?.setAttribute('aria-expanded','false');}opened='';if(focus&&old)trigger(old)?.focus();}
 function position(){if(!opened)return;const b=trigger(opened),m=menu(opened);if(!b?.getBoundingClientRect||!m?.getBoundingClientRect)return;const r=b.getBoundingClientRect(),width=m.getBoundingClientRect().width||310,vw=typeof window!=='undefined'?window.innerWidth:1280,vh=typeof window!=='undefined'?window.innerHeight:900;if(m.style){m.style.left=Math.max(12,Math.min(r.left,vw-width-12))+'px';m.style.top=(r.bottom+9)+'px';m.style.maxHeight=Math.max(120,vh-r.bottom-25)+'px';}}
 function open(id,focus=false){if(!names.includes(id))return;close();opened=id;menu(id).hidden=false;trigger(id).setAttribute('aria-expanded','true');position();if(focus)items(id)[0]?.focus();}
 function configure(route) {
  const {space,view}=route, study=globalThis.FurgStudyAreas, area=study.get(space);
  const landing=view==='inicio', spaceLabel=area?'Dia '+area.day:'Geral';
  trigger('areas').hidden=landing;
  trigger('areas').setAttribute('aria-label','Trocar área de estudo · '+spaceLabel);
  $('navSpaceLabel').textContent=spaceLabel;
  $('navMental').hidden=landing||space==='dia-1';
  for(const [id,label] of Object.entries(groups)){
   const button=trigger(id), title=button.querySelector('strong');
   button.hidden=landing;
   if(title)title.textContent=area?study.groups[id]:label;
   const general=$('navGeneral-'+id), scoped=$('navScoped-'+id);
   general.hidden=!!area;
   scoped.hidden=!area;
   if(context!==space)scoped.innerHTML=area?area.menus[id].map(([page,title,detail,icon])=>
    `<button type="button" class="nav" data-view="${study.viewOf(page)}" data-study-route="${space}/${page}">
      <span class="nav-item-icon" aria-hidden="true">${icon}</span><span><strong>${title}</strong><small>${detail}</small></span>
      <i aria-hidden="true">→</i></button>`).join(''):'';
  }
  context=space;
  for(const button of menu('areas').querySelectorAll('button')){
   if(button.dataset.studyRoute===space)button.setAttribute('aria-current','true');
   else button.removeAttribute('aria-current');
  }
 }
 function revealActive(name) {
  close();
  const current=name||Array.from(document.querySelectorAll('.nav')).find(b=>b.classList.contains('active'))?.dataset.view;
  const study=globalThis.FurgStudyAreas, area=study?.get(context);
  const direct=topItems().find(b=>b.dataset.view===current);
  const owner=area?Object.keys(groups).find(id=>area.menus[id].some(([page])=>study.viewOf(page)===current)):owners[current];
  for(const id of Object.keys(groups))trigger(id)?.classList.toggle('is-active',!direct&&owner===id);
  trigger('areas')?.classList.toggle('is-active',!!area);
  const active=direct||trigger(owner);
  if(active?.getBoundingClientRect&&nav.getBoundingClientRect){
   const a=active.getBoundingClientRect(),n=nav.getBoundingClientRect();
   const left=a.left<n.left?a.left-n.left:a.right>n.right?a.right-n.right:0;
   if(left)nav.scrollBy({left,behavior:behavior()});
  }
  update();
 }
 function afterNavigate(button) {
  const target=button?.dataset.section, el=target?$(target):pageTitle();
  if(el&&!el.hidden){el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}
  if(target&&el&&!el.hidden)el.scrollIntoView({behavior:behavior(),block:'start'});
  else if(typeof window!=='undefined')window.scrollTo({top:0,behavior:behavior()});
 }
 function go(action){close();if(action==='day-one'){adapter?.setView('leve');globalThis.FurgLightReview?.showDayOne();}else if(action==='enem-sim'){adapter?.setView('simulados');$('enemSimRoot')?.scrollIntoView({behavior:behavior(),block:'start'});}}
 function init(value){adapter=value;if(bound)return;bound=true;
  for(const id of names){trigger(id)?.addEventListener('click',()=>opened===id?close():open(id));trigger(id)?.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='Tab'&&!e.shiftKey&&opened===id){e.preventDefault();items(id)[0]?.focus();return;}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();e.stopPropagation();open(id,true);if(e.key==='ArrowUp')items(id).at(-1)?.focus();}});}
  document.addEventListener('click',e=>{
   const route=e.target.closest('[data-study-route]');
   if(route&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){
    e.preventDefault();
    if(openRoute(route.dataset.studyRoute)!==false)afterNavigate();
    return;
   }
   const action=e.target.closest('[data-nav-action]');
   if(action?.dataset.navAction){e.preventDefault();go(action.dataset.navAction);return;}
   if(opened&&!e.target.closest('#mainNavigation')&&!e.target.closest('#navigationMenus'))close();
  });
  document.addEventListener('focusin',e=>{if(opened&&!e.target.closest('#mainNavigation')&&!e.target.closest('#navigationMenus'))close();});
  document.addEventListener('keydown',e=>{if(!opened)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close(true);return;}if(!e.target.closest('#navigationMenus'))return;const list=items(opened),at=list.indexOf(e.target.closest('button'));if(e.key==='Tab'&&(e.shiftKey&&at===0||!e.shiftKey&&at===list.length-1)){e.preventDefault();const old=opened;if(e.shiftKey)close(true);else{close();const top=topItems();(top[top.indexOf(trigger(old))+1]||$('navSettings'))?.focus();}return;}if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();const index=e.key==='Home'?0:e.key==='End'?list.length-1:(at+(e.key==='ArrowDown'?1:list.length-1))%list.length;list[index]?.focus();}});
  nav.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();const list=topItems(),at=list.indexOf(e.target.closest('button')),i=e.key==='Home'?0:e.key==='End'?list.length-1:(at+(e.key==='ArrowRight'?1:list.length-1))%list.length;close();list[i]?.focus();});
  previous.onclick=()=>{close();nav.scrollBy({left:-Math.max(140,nav.clientWidth*.7),behavior:behavior()});};next.onclick=()=>{close();nav.scrollBy({left:Math.max(140,nav.clientWidth*.7),behavior:behavior()});};nav.addEventListener('scroll',()=>{update();position();},{passive:true});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{update();position();}).observe(nav);
  if(typeof window!=='undefined'){window.addEventListener('resize',()=>{update();position();},{passive:true});window.addEventListener('scroll',position,{passive:true});}
  if($('pageBack')){$('pageBack').onclick=back;$('pageBack').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')e.stopPropagation();});}syncBack();update();
 }
 globalThis.FurgNavigation={init,configure,update,revealActive,afterNavigate,close,beforeNavigate,back,canGoBack:()=>!!trail.length,isOpen:()=>!!opened};
})();
