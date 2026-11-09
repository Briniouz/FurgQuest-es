'use strict';
(() => {
 const data=globalThis.FURG_DIA2_CONCEPTS;
 const bank=new Map(globalThis.FURG_ENEM_DATA.questions.map(question=>[question.id,question]));
 const key='briniouz-dia2-conceitos-v1';
 const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const format=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2});
 const read=()=>{
  try{
   const value=JSON.parse(localStorage.getItem(key));
   return value&&typeof value==='object'&&!Array.isArray(value)?value:{};
  }catch{return {};}
 };
 const save=value=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{/* A sessão continua aberta. */}};
 const firstTrail=(subject,state)=>data[subject].find(trail=>trail.id===state?.path)||data[subject][0];
 const questionFor=card=>{
  const [id,letter]=card.exam, question=bank.get(id);
  return question?.answer===letter&&question.quality?.keyVerified&&globalThis.FurgEnem?.isGradable(id)?question:null;
 };

 function toolbar(subject){
  const trails=data[subject], chosen=firstTrail(subject,read()[subject]);
  return `<label class="d2-concept-path"><span class="sr-only">Caminho de conceitos</span>
   <select id="d2ConceptPath">${trails.map((trail,index)=>`<option value="${trail.id}" ${trail===chosen?'selected':''}>${index+1}. ${esc(trail.title)}</option>`).join('')}</select>
  </label>
  <button type="button" class="outline" id="d2ConceptNext">Próximo caminho →</button>`;
 }

 function questionButton(card,full=false){
  const question=questionFor(card), level=card.exam[2]===3?'Difícil':'Média';
  if(!question)return '';
  const text=full?`Resolver ENEM ${question.year} · Q${question.index} →`:`ENEM · ${level}`;
  return `<button type="button" class="d2-concept-question${full?' d2-concept-primary':''}" data-concept-question="${card.id}"
   aria-label="Resolver ENEM ${question.year}, questão ${question.index}, dificuldade ${level.toLowerCase()} estimada">${text}</button>`;
 }

 function rowsMarkup(trail,selected){
  return trail.rows.map(row=>`<div class="d2-concept-row">
   ${row.map(card=>`<article class="d2-concept-card" data-concept-card="${card.id}" ${card.id===selected?'data-selected':''}>
    <div class="d2-concept-card-top">
     <h3><button type="button" data-concept-open="${card.id}" aria-expanded="${card.id===selected}" aria-controls="d2ConceptDetail">${esc(card.title)}</button></h3>
     <button type="button" class="d2-concept-grip" data-concept-move="${card.id}" aria-label="Mover ${esc(card.title)}" title="Arrasta ou usa as setas"><span aria-hidden="true">⠿</span></button>
    </div>
    <p class="d2-concept-formula">${esc(card.formula)}</p>
    <p class="d2-concept-cue">${esc(card.cue)}</p>
    ${questionButton(card)}
   </article>`).join('')}
  </div>`).join('');
 }

 // Simulação autoral com tração (8 N, 6 N), atrito de 2 N e equilíbrio vertical.
 function workAt(d){
  return {pull:8*d,friction:-2*d,total:6*d,final:4+6*d,speed:Math.sqrt(4+6*d)};
 }

 function workLabels(d,net){
  const value=workAt(d), distance=format.format(d), total=format.format(value.total);
  return {
   terms:net?`Wᵣₑₛ = 6 N × ${distance} m = ${total} J.`:
    `Tração: 8 N × ${distance} m = +${format.format(value.pull)} J · atrito: −${format.format(-value.friction)} J · peso e normal: 0 J (90°).`,
   total:`Wᵣₑₛ = ${total} J = ΔEc. Ec final = 4 + ${total} = ${format.format(value.final)} J. De v = √(2Ec/m), rapidez final ≈ ${format.format(value.speed)} m/s.`
  };
 }

 function workGraphic(d,net){
  const x=96+66*d;
  const line=(x2,y2,color,label,lx,ly)=>`<line x1="96" y1="111" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2.5" marker-end="url(#d2WorkArrow)"/>
   <text x="${lx}" y="${ly}" fill="${color}">${label}</text>`;
  return `<defs><marker id="d2WorkArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs>
   <path d="M18 130H542" stroke="currentColor" opacity=".48"/>
   <rect x="76" y="92" width="40" height="38" rx="5" class="d2-work-block"/>
   <rect x="${x-20}" y="92" width="40" height="38" rx="5" class="d2-work-block d2-work-final"/>
   <text x="96" y="145" text-anchor="middle">A</text><text x="${x}" y="145" text-anchor="middle">B</text>
   ${net?line(169,111,'var(--d2-accent)','Fᵣₑₛ = 6 N',137,100):
    '<path d="M96 111H161" stroke="currentColor" stroke-dasharray="3 3" opacity=".5"/>'+
    '<path d="M122 111A26 26 0 0 0 117 95" fill="none" stroke="var(--d2-accent)"/><text x="127" y="106">θ</text>'+
    line(164,60,'var(--d2-accent)','Tração 10 N',171,58)+
    line(96,44,'var(--d2-work-up)','Normal 14 N',104,40)+
    line(96,171,'var(--d2-work-down)','Peso 20 N',106,173)+
    line(45,111,'var(--d2-work-back)','Atrito 2 N',16,97)}
   <line x1="96" y1="155" x2="${x}" y2="155" stroke="currentColor" opacity=".72" marker-end="url(#d2WorkArrow)"/>
   <text x="536" y="174" text-anchor="end">d = ${format.format(d)} m</text>`;
 }

 function workLab(){
  const initial=workLabels(4,false);
  return `<section class="d2-work-lab" aria-labelledby="d2WorkTitle">
   <div class="d2-work-top"><h4 id="d2WorkTitle">Do ponto A ao ponto B</h4>
    <div role="group" aria-label="Forças exibidas">
     <button type="button" class="outline" data-work-view="partes" aria-pressed="true">Cada força</button>
     <button type="button" class="outline" data-work-view="resultante" aria-pressed="false">Resultante</button>
    </div>
   </div>
   <p class="d2-work-intro">Bloco de 2 kg, rapidez inicial de 2 m/s. A tração de 10 N tem componentes de 8 N para a direita e 6 N para cima.</p>
   <svg class="d2-work-graphic" viewBox="0 0 560 184" role="img" aria-labelledby="d2WorkDiagramTitle">
    <title id="d2WorkDiagramTitle">Forças constantes e deslocamento horizontal do bloco</title>
    <g id="d2WorkVectors">${workGraphic(4,false)}</g>
   </svg>
   <label class="d2-work-slider" for="d2WorkDistance">Deslocamento <input id="d2WorkDistance" type="range" min="1" max="6" step="0.5" value="4">
    <output id="d2WorkMeters" for="d2WorkDistance">4 m</output></label>
   <p id="d2WorkTerms">${initial.terms}</p>
   <p id="d2WorkTotal" aria-live="polite">${initial.total}</p>
  </section>`;
 }

 function detailMarkup(card,subject,next){
  const route=`dia-2/aulas/${subject}/${card.lesson}`;
  return `<div class="d2-concept-detail-head">
   <h3 tabindex="-1">${esc(card.title)}</h3>
   <button type="button" class="outline" id="d2ConceptClose" aria-label="Fechar ficha">Fechar</button>
  </div>
  <p class="d2-concept-idea">${esc(card.idea)}</p>
  ${card.id==='teorema'?workLab():''}
  <div class="d2-concept-detail-actions">
   ${questionButton(card,true)}
   <a class="outline" href="#${route}" data-study-route="${route}">Abrir aula →</a>
   ${next?`<button type="button" class="outline" data-concept-open="${next.id}">Próximo conceito →</button>`:''}
  </div>`;
 }

 function bind(board,subject,{signal,fit,refresh,mobile}){
  const get=selector=>board.querySelector(selector);
  const select=get('#d2ConceptPath'), next=get('#d2ConceptNext'), reset=get('#d2ConceptReset');
  const world=get('.d2-map-world'), lines=get('.d2-map-lines'), rows=get('#d2ConceptRows'), detail=get('#d2ConceptDetail');
  const progress=get('#d2MapResults'), trails=data[subject], prefs=read();
  const saved=prefs[subject]??{}, positions=saved.positions&&typeof saved.positions==='object'?saved.positions:{};
  let trail=firstTrail(subject,saved), nodes=[], cards, selected=saved.node, offsets={}, scale=1, drag;

  function persist(){
   prefs[subject]={path:trail.id,node:selected,positions};
   save(prefs);
  }

  function showDetail(card,focus){
   selected=card?.id||'';
   for(const [id,element] of cards){
    element.toggleAttribute('data-selected',id===selected);
    element.querySelector('[data-concept-open]').setAttribute('aria-expanded',String(id===selected));
   }
   detail.hidden=!card;
   detail.innerHTML=card?detailMarkup(card,subject,nodes[nodes.indexOf(card)+1]):'';
   if(card&&focus)detail.querySelector('h3').focus();
   refresh();
  }

  function switchTrail(chosen,restore=false){
   trail=chosen;
   select.value=trail.id;
   nodes=trail.rows.flat();
   offsets={};
   next.disabled=trails.at(-1)===trail;
   reset.disabled=!Object.keys(positions[trail.id]||{}).length;
   rows.innerHTML=rowsMarkup(trail,restore?selected:'');
   cards=new Map([...rows.querySelectorAll('[data-concept-card]')].map(element=>[element.dataset.conceptCard,element]));
   progress.textContent=`${nodes.length} conceitos · caminho ${trails.indexOf(trail)+1} de ${trails.length}`;
   showDetail(restore?nodes.find(card=>card.id===selected):null,false);
   fit();
   persist();
  }

  function position(element){
   const bounds=element.getBoundingClientRect(), origin=world.getBoundingClientRect();
   return {x:(bounds.left-origin.left)/scale,y:(bounds.top-origin.top)/scale,w:bounds.width/scale,h:bounds.height/scale};
  }
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

  function move(id,x,y){
   const element=cards.get(id), old=offsets[id]||{x:0,y:0}, box=position(element);
   const left=box.x-old.x, top=box.y-old.y;
   const dx=Math.round(clamp(x,4-left,world.offsetWidth-box.w-4-left));
   const dy=Math.round(clamp(y,4-top,world.offsetHeight-box.h-4-top));
   offsets[id]={x:dx,y:dy};
   element.style.translate=`${dx}px ${dy}px`;
  }

  // Recalcula as setas a partir das posições visíveis, inclusive durante o arraste.
  function paint(){
   const boxes=new Map([...cards].map(([id,element])=>[id,position(element)]));
   lines.setAttribute('viewBox',`0 0 ${world.offsetWidth} ${world.offsetHeight}`);
   lines.innerHTML='<defs><marker id="d2ConceptArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs>'+
    nodes.map((card,index)=>(card.from??(index?[nodes[index-1].id]:[])).map(id=>{
     const a=boxes.get(id), b=boxes.get(card.id);
     if(!a||!b)return '';
     const ax=a.x+a.w/2, ay=a.y+a.h/2, bx=b.x+b.w/2, by=b.y+b.h/2;
     const sameRow=cards.get(id).parentElement===cards.get(card.id).parentElement;
     const sideways=sameRow&&Math.abs(bx-ax)>Math.abs(by-ay);
     const direction=Math.sign(sideways?bx-ax:by-ay)||1;
     const x1=sideways?ax+direction*a.w/2:ax, y1=sideways?ay:ay+direction*a.h/2;
     const x2=sideways?bx-direction*(b.w/2+2):bx, y2=sideways?by:by-direction*(b.h/2+2);
     const mx=(x1+x2)/2, my=(y1+y2)/2;
     const bend=sideways?`${mx} ${y1} ${mx} ${y2}`:`${x1} ${my} ${x2} ${my}`;
     return `<path d="M${x1} ${y1} C${bend} ${x2} ${y2}" marker-end="url(#d2ConceptArrow)"/>`;
    }).join('')).join('');
  }

  function draw(zoom){
   scale=mobile.matches?1:zoom;
   for(const [id,savedOffset] of Object.entries(positions[trail.id]||{})){
    if(cards.has(id)&&Number.isFinite(savedOffset?.x)&&Number.isFinite(savedOffset?.y)&&drag?.id!==id)move(id,savedOffset.x,savedOffset.y);
   }
   paint();
  }

  function rememberMove(id){
   positions[trail.id]={...positions[trail.id],[id]:offsets[id]};
   reset.disabled=false;
   persist();
  }

  rows.addEventListener('pointerdown',event=>{
   const handle=event.target.closest('[data-concept-move]');
   if(!handle||drag||event.button!==0)return;
   const id=handle.dataset.conceptMove, origin=offsets[id]||{x:0,y:0};
   drag={id,handle,pointer:event.pointerId,x:event.clientX,y:event.clientY,origin,moved:false};
   cards.get(id).setAttribute('data-moving','');
   handle.setPointerCapture(event.pointerId);
  },{signal});
  rows.addEventListener('pointermove',event=>{
   if(drag?.pointer!==event.pointerId)return;
   const dx=(event.clientX-drag.x)/scale, dy=(event.clientY-drag.y)/scale;
   if(!drag.moved&&Math.abs(dx)+Math.abs(dy)<3)return;
   drag.moved=true;
   move(drag.id,drag.origin.x+dx,drag.origin.y+dy);
   paint();
  },{signal});
  for(const eventName of ['pointerup','pointercancel','lostpointercapture']){
   rows.addEventListener(eventName,event=>{
    if(drag?.pointer!==event.pointerId)return;
    cards.get(drag.id)?.removeAttribute('data-moving');
    if(drag.moved)rememberMove(drag.id);
    drag=null;
   },{signal});
  }
  rows.addEventListener('keydown',event=>{
   const id=event.target.dataset.conceptMove;
   const direction={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
   if(!id||!direction)return;
   event.preventDefault();
   const old=offsets[id]||{x:0,y:0}, step=event.shiftKey?24:8;
   move(id,old.x+direction[0]*step,old.y+direction[1]*step);
   rememberMove(id);
   paint();
  },{signal});

  function updateWork(){
   const d=Number(get('#d2WorkDistance').value), net=get('[data-work-view="resultante"]').getAttribute('aria-pressed')==='true';
   const result=workLabels(d,net);
   get('#d2WorkVectors').innerHTML=workGraphic(d,net);
   get('#d2WorkMeters').textContent=`${format.format(d)} m`;
   get('#d2WorkTerms').textContent=result.terms;
   get('#d2WorkTotal').textContent=result.total;
  }

  select.addEventListener('change',()=>switchTrail(trails.find(item=>item.id===select.value)),{signal});
  next.addEventListener('click',()=>{switchTrail(trails[trails.indexOf(trail)+1]);select.focus();},{signal});
  reset.addEventListener('click',()=>{
   delete positions[trail.id];
   offsets={};
   for(const element of cards.values())element.style.removeProperty('translate');
   reset.disabled=true;
   persist();
   fit();
   select.focus();
  },{signal});
  board.addEventListener('input',event=>{if(event.target.id==='d2WorkDistance')updateWork();},{signal});
  board.addEventListener('click',event=>{
   const button=event.target.closest('button');
   if(!button)return;
   const {conceptOpen,conceptQuestion,workView}=button.dataset;
   if(conceptOpen){
    showDetail(nodes.find(item=>item.id===conceptOpen),true);
    persist();
   }
   if(conceptQuestion){
    const question=questionFor(nodes.find(card=>card.id===conceptQuestion));
    selected=conceptQuestion;
    persist();
    if(question&&globalThis.FurgEnem.openQuestion(question.id))globalThis.FurgNavigation?.afterNavigate();
   }
   if(button.id==='d2ConceptClose'){
    const origin=cards.get(selected);
    showDetail(null,false);
    persist();
    origin?.querySelector('[data-concept-open]').focus();
   }
   if(workView){
    for(const item of detail.querySelectorAll('[data-work-view]'))item.setAttribute('aria-pressed',String(item===button));
    updateWork();
   }
  },{signal});
  switchTrail(trail,true);
  return draw;
 }

 globalThis.FurgDia2Concepts={toolbar,bind,workAt};
})();
