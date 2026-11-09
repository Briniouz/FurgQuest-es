'use strict';
(() => {
 const maps = {
  matematica:{
   root:'Números e medidas', hint:'O que está sendo contado, comparado ou medido?',
   branches:[
    ['Comparar quantidades','Do pedaço de um inteiro ao preço com desconto.',[0,1,2]],
    ['Modelar e medir','Da relação entre variáveis ao espaço ocupado.',[3,4,5,6]],
    ['Ler dados e contar casos','Do resumo de uma tabela à chance de um resultado.',[7,8]]
   ]
  },
  fisica:{
   root:'Energia', hint:'De onde vem e para onde vai?',
   branches:[
    ['Movimento e forças','Altura, velocidade, trabalho e colisões.',[0,1,2,8]],
    ['Fluidos, calor e ondas','Pressão e diferentes maneiras de transferir energia.',[3,4,5]],
    ['Eletricidade e potência','Energia em circuitos, aparelhos e consumo.',[6,7]]
   ]
  },
  quimica:{
   root:'Matéria', hint:'Do que é feita e como se transforma?',
   branches:[
    ['Das misturas às partículas','Separa materiais, identifica átomos e conta mols.',[0,1,2]],
    ['Transformações químicas','Segue os átomos, a energia e os elétrons.',[3,6,7]],
    ['Soluções e materiais','Lê concentração, pH e a estrutura de moléculas.',[4,5,8]]
   ]
  },
  biologia:{
   root:'Vida', hint:'O que mantém um organismo funcionando?',
   branches:[
    ['Dentro da célula','Estrutura, energia e informação genética.',[0,1,2]],
    ['Da população ao ambiente','Variação, relações alimentares e impactos.',[3,4,5]],
    ['Corpo, defesa e tecnologia','Regulação, imunidade e usos do DNA.',[6,7,8]]
   ]
  }
 };
 const width = 960, height = 550;
 const rootPoint = {x:38,y:275,w:216};
 const branchPoint = index => ({x:315,y:104+index*171,w:225});
 const leafPoint = (branch,index,total) => ({x:612,y:branchPoint(branch).y+(index-(total-1)/2)*53,w:305});
 const position = ({x,y,w}) => `left:${x}px;top:${y}px;width:${w}px`;
 const curve = (from,to) => {
  const start = from.x+from.w, middle = (start+to.x)/2;
  return `M ${start} ${from.y} C ${middle} ${from.y}, ${middle} ${to.y}, ${to.x} ${to.y}`;
 };
 const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

 function markup(subject, lessons, pathFor, completed) {
  const map = maps[subject];
  return `<section class="d2-map panel" aria-label="Mapa mental de ${esc(map.root)}">
   <header class="d2-map-tools"><div><h2 id="aulaTitle" tabindex="-1">Mapa mental</h2>
    <p id="d2MapHint">Abre os ramos, escolhe uma aula e arrasta o fundo para navegar.</p></div>
    <div class="d2-map-controls" role="group" aria-label="Controles do mapa">
     <button type="button" class="outline" data-map-zoom="out" aria-label="Diminuir zoom">−</button>
     <output id="d2MapScale" aria-label="Zoom do mapa">100%</output>
     <button type="button" class="outline" data-map-zoom="in" aria-label="Aumentar zoom">+</button>
     <button type="button" class="outline" data-map-zoom="fit">Enquadrar</button>
     <button type="button" class="outline" id="d2MapExpand">Expandir tudo</button>
    </div>
   </header>
   <div class="d2-map-viewport" tabindex="0" role="region" aria-label="Quadro do mapa mental" aria-describedby="d2MapHint">
    <div class="d2-map-extent">
     <div class="d2-map-world" style="width:${width}px;height:${height}px">
      <svg class="d2-map-lines" viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false">
       <g data-map-root-lines>${map.branches.map((_,i)=>`<path d="${curve(rootPoint,branchPoint(i))}"/>`).join('')}</g>
       ${map.branches.map(([, , indexes],i)=>`<g data-map-leaf-lines="${i}" ${i===0?'':'hidden'}>
        ${indexes.map((_,j)=>`<path d="${curve(branchPoint(i),leafPoint(i,j,indexes.length))}"/>`).join('')}
       </g>`).join('')}
      </svg>
      <button type="button" class="d2-map-node d2-map-root" style="${position(rootPoint)}" id="d2MapRoot" aria-expanded="true" aria-controls="d2MapBranches">
       <small>CONCEITO DE PARTIDA</small><strong>${esc(map.root)}</strong><span>${esc(map.hint)}</span>
      </button>
      <div id="d2MapBranches">
       ${map.branches.map(([name,hint,indexes],i)=>`
        <button type="button" class="d2-map-node d2-map-branch" style="${position(branchPoint(i))}" data-map-branch="${i}" aria-expanded="${i===0}" aria-controls="d2MapLeaves-${i}">
         <strong>${esc(name)}</strong><span>${esc(hint)}</span>
        </button>
        <div id="d2MapLeaves-${i}" ${i===0?'':'hidden'}>
         ${indexes.map((index,j)=>{
          const lesson=lessons[index], path=pathFor(subject,lesson.id);
          return `<a class="d2-map-node d2-map-leaf" style="${position(leafPoint(i,j,indexes.length))}" href="#${path}" data-study-route="${path}">
           <small aria-label="Aula ${index+1}">${String(index+1).padStart(2,'0')}</small><strong>${esc(lesson.title)}</strong>
           <span aria-hidden="true">${completed[lesson.id]?'✓':'→'}</span>${completed[lesson.id]?'<span class="sr-only">Estudada</span>':''}
          </a>`;
         }).join('')}
        </div>`).join('')}
      </div>
     </div>
    </div>
   </div>
  </section>`;
 }

 function bind(host) {
  const viewport = host.querySelector('.d2-map-viewport');
  if (!viewport) return;
  const world = viewport.querySelector('.d2-map-world'), extent = viewport.querySelector('.d2-map-extent');
  const root = host.querySelector('#d2MapRoot'), branches = host.querySelector('#d2MapBranches');
  const controls = [...branches.querySelectorAll('[data-map-branch]')];
  const expand = host.querySelector('#d2MapExpand');
  const setBranch = (button,open) => {
   const id=button.dataset.mapBranch;
   button.setAttribute('aria-expanded',String(open));
   host.querySelector('#d2MapLeaves-'+id).hidden=!open;
   host.querySelector('[data-map-leaf-lines="'+id+'"]').toggleAttribute('hidden',!open);
  };
  const setRoot = open => {
   root.setAttribute('aria-expanded',String(open));
   branches.hidden=!open;
   host.querySelector('[data-map-root-lines]').toggleAttribute('hidden',!open);
   for (const button of controls) {
    const id=button.dataset.mapBranch, visible=open&&button.getAttribute('aria-expanded')==='true';
    host.querySelector('[data-map-leaf-lines="'+id+'"]').toggleAttribute('hidden',!visible);
   }
  };
  const allOpen = () => !branches.hidden&&controls.every(button=>button.getAttribute('aria-expanded')==='true');
  const syncExpand = () => { expand.textContent=allOpen()?'Recolher ramos':'Expandir tudo'; };
  root.addEventListener('click',()=>{setRoot(branches.hidden);syncExpand();});
  for (const button of controls) button.addEventListener('click',event=>{
   const open=button.getAttribute('aria-expanded')!=='true';
   setBranch(button,open);
   syncExpand();
   if(open&&event.detail>0&&viewport.clientWidth<580){
    const leaf=host.querySelector('#d2MapLeaves-'+button.dataset.mapBranch+' a');
    const offset=leaf.getBoundingClientRect().right-viewport.getBoundingClientRect().right;
    if(offset>0)viewport.scrollLeft+=offset+10;
   }
  });
  expand.addEventListener('click',()=>{
   const open=!allOpen();
   setRoot(true);
   for(const button of controls)setBranch(button,open);
   syncExpand();
  });

  let scale = 1;
  const fit = () => Math.max(.66, Math.min(1, viewport.clientWidth/width));
  function zoom(next, center = false) {
   const x=(viewport.scrollLeft+viewport.clientWidth/2)/scale;
   const y=(viewport.scrollTop+viewport.clientHeight/2)/scale;
   scale=Math.min(1.5,Math.max(.45,next));
   world.style.transform=`scale(${scale})`;
   extent.style.width=`${Math.ceil(width*scale)}px`;
   extent.style.height=`${Math.ceil(height*scale)}px`;
   viewport.scrollLeft=center?x*scale-viewport.clientWidth/2:0;
   viewport.scrollTop=center?y*scale-viewport.clientHeight/2:0;
   host.querySelector('#d2MapScale').textContent=Math.round(scale*100)+'%';
  }
  zoom(fit());
  for (const button of host.querySelectorAll('[data-map-zoom]')) {
   button.addEventListener('click',()=>{
    const direction=button.dataset.mapZoom;
    if(direction==='fit')zoom(fit());
    else zoom(scale+(direction==='in'?.15:-.15),true);
   });
  }

  let drag;
  viewport.addEventListener('pointerdown',event=>{
   if(event.pointerType!=='mouse'||event.button!==0||event.target.closest('button,a'))return;
   drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};
   viewport.setPointerCapture(event.pointerId);
   viewport.classList.add('is-panning');
  });
  viewport.addEventListener('pointermove',event=>{
   if(drag?.id!==event.pointerId)return;
   viewport.scrollLeft=drag.left+drag.x-event.clientX;
   viewport.scrollTop=drag.top+drag.y-event.clientY;
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture']){
   viewport.addEventListener(type,event=>{
    if(drag?.id!==event.pointerId)return;
    drag=null;
    viewport.classList.remove('is-panning');
   });
  }
 }

 globalThis.FurgDia2Maps = {maps,markup,bind};
})();
