'use strict';
(() => {
 const title='Transmissão de calor';
 const modes={conveccao:'Convecção',conducao:'Condução',radiacao:'Radiação'};
 const fluids={
  agua:{name:'Água',rise:36,mixing:7},
  oleo:{name:'Óleo vegetal',rise:43,mixing:5.5},
  ar:{name:'Ar',rise:39,mixing:8.5},
 };
 const ambient=20, switchOff=.64, duration=16000;
 const number=new Intl.NumberFormat('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
 const instances=new WeakMap();

 // Modelo de duas camadas com a mesma capacidade térmica. A base recebe
 // energia da fonte e a troca entre as camadas depende da diferença de temperatura.
 function convection(progress,fluid='agua'){
  const {rise,mixing}=fluids[fluid];
  const warming=Math.min(progress,switchOff), cooling=Math.max(0,progress-switchOff);
  const rate=rise/switchOff, k=2*mixing;
  const diffWarm=-Math.expm1(-k*warming), diffCool=-Math.expm1(-k*cooling);
  const average=ambient+rate*warming;
  const difference=rate/mixing*diffWarm*Math.exp(-k*cooling);
  const cycles=5*(warming-diffWarm/k+diffWarm*diffCool/k);
  return {bottom:average+difference/2,top:average-difference/2,difference,cycles,heaterOn:progress<switchOff};
 }
 function rodTemperature(progress,distance,rate){
  return progress>0?ambient+42*Math.exp(-(distance**2)/(rate*progress)):ambient;
 }
 function color(temp){
  const strength=Math.min(1,Math.max(0,(temp-ambient)/42));
  return 'rgb('+[28+226*strength,99+39*strength,179-137*strength].map(Math.round).join(' ')+')';
 }
 const arrow='M-6 5 0 0 6 5';
 function convectionSvg(id){
  const arrows=[[-1,0],[-1,1],[-1,2],[-1,3],[1,0],[1,1],[1,2],[1,3]].map(([side,point])=>{
   const [x,y,rotation]=[[154+side*12,89,0],[154+side*66,48,side*90],[154+side*119,102,180],[154+side*65,147,-side*90]][point];
   return '<path d="'+arrow+'" transform="translate('+x+' '+y+') rotate('+rotation+')"/>';
  }).join('');
  return `<svg class="hl-svg" viewBox="0 0 308 194" role="img" aria-label="Recipiente aquecido no centro da base. O fluido sobe pelo centro e desce pelas laterais.">
    <defs><linearGradient id="${id}-field" x2="0" y2="1">
     <stop offset="0" stop-color="${color(ambient)}" data-hl-top-color/>
     <stop offset="1" stop-color="${color(ambient)}" data-hl-bottom-color/>
    </linearGradient></defs>
    <rect x="18" y="34" width="272" height="127" rx="13" fill="url(#${id}-field)" class="hl-vessel"/>
    <text x="18" y="22">Superfície</text>
    <text x="18" y="182">Base</text>
    <g class="hl-currents" data-hl-currents opacity=".24">
     <ellipse cx="88" cy="97.5" rx="56" ry="50"/><ellipse cx="220" cy="97.5" rx="56" ry="50"/>
     ${arrows}
    </g>
    <g data-hl-tracers class="hl-tracers" opacity="0">
     ${[-1,1].flatMap(side=>Array.from({length:5},(_,i)=>`<circle r="3.1" data-hl-side="${side}" data-hl-index="${i}"/>`)).join('')}
    </g>
    <g class="hl-source" data-hl-source><rect x="126" y="169" width="56" height="8" rx="4"/>
     <path d="M137 183h34" stroke-linecap="round"/></g>
   </svg>`;
 }
 function conductionSvg(){
  const bars=[['Cobre',0],['Madeira seca',1]].map(([name,row])=>{
   const y=40+row*74;
   return `<text x="28" y="${y-9}">${name}</text><g fill="${color(ambient)}">
     ${Array.from({length:18},(_,i)=>`<rect x="${28+14*i}" y="${y}" width="14.2" height="19" data-hl-rod="${row}" data-hl-index="${i}"/>`).join('')}
    </g><rect x="28" y="${y}" width="252" height="19" fill="none" class="hl-vessel"/>
    <path d="M19 ${y+2}v15" class="hl-source" stroke-width="5" stroke-linecap="round"/>`;
  }).join('');
  return `<svg class="hl-svg" viewBox="0 0 308 166" role="img" aria-label="Barras de cobre e madeira com calor entrando pela esquerda.">
   ${bars}<text x="28" y="151">Ponta aquecida</text><text x="280" y="151" text-anchor="end">Ponta distante</text></svg>`;
 }
 function radiationSvg(){
  return `<svg class="hl-svg" viewBox="0 0 308 162" role="img" aria-label="Ondas eletromagnéticas levam energia de uma fonte até uma placa através do vácuo.">
   <rect x="12" y="30" width="284" height="104" rx="15" class="hl-vacuum"/>
   <text x="154" y="53" text-anchor="middle">Vácuo</text>
   <circle cx="43" cy="87" r="14" class="hl-source"/><rect x="254" y="64" width="20" height="49" rx="4" fill="${color(ambient)}" class="hl-vessel" data-hl-plate/>
   <g class="hl-waves" data-hl-waves opacity="0">
    ${Array.from({length:5},(_,i)=>`<path data-hl-index="${i}" d="M0 76q13 11 0 22"/>`).join('')}
   </g><path d="M71 116H236l-6-4m6 4-6 4" class="hl-direction"/>
   <text x="27" y="153">Fonte</text><text x="246" y="153">Placa</text></svg>`;
 }
 const messages={
  conveccao:[
   [0,'Começo','O fluido começa com a mesma temperatura em todo o recipiente.'],
   [.02,'A base aquece','Uma porção de fluido no fundo se aquece. Mantendo a mesma massa, ela se expande e sua densidade diminui.'],
   [.13,'O ciclo se estabelece','O fluido menos denso sobe pelo centro. O mais frio e denso desce pelas laterais e ocupa seu lugar.'],
   [switchOff,'A fonte desliga','A base e a superfície ainda trocam energia. À medida que a diferença de temperatura diminui, a circulação enfraquece.'],
   [.96,'Temperaturas quase iguais','A energia se espalhou pelo fluido. Com pouca diferença de densidade, a circulação perde força.'],
  ],
  conducao:[
   [0,'Começo','As duas barras começam na mesma temperatura e recebem calor pela mesma ponta.'],
   [.02,'O calor se espalha','A energia se transfere entre partes vizinhas. A barra fica no lugar enquanto o calor se propaga.'],
   [.49,'Compara as barras','Nas mesmas condições, a energia chega mais longe no cobre. Na madeira seca, o aquecimento se concentra perto da fonte.'],
  ],
  radiacao:[
   [0,'Começo','Uma fonte e uma placa estão separadas pelo vácuo.'],
   [.02,'Energia atravessa o espaço','A fonte emite radiação eletromagnética. Essas ondas podem se propagar no vácuo.'],
   [.29,'A placa aquece','Parte da radiação é absorvida pela placa e aumenta sua temperatura. É a mesma forma de transferência pela qual a energia do Sol chega à Terra.'],
  ],
 };
 function scene(mode,id){
  const [,,description]=messages[mode][0];
  return `<div class="hl-diagram" data-hl-diagram>${mode==='conveccao'?convectionSvg(id):mode==='conducao'?conductionSvg():radiationSvg()}</div>
   <div class="hl-readout">
    <p class="hl-step" data-hl-stage aria-live="polite">Começo · ${description}</p>
    ${mode==='conveccao'? `<dl class="hl-readings"><div><dt>Base</dt><dd data-hl-bottom>20,0 °C</dd></div><div><dt>Superfície</dt><dd data-hl-top>20,0 °C</dd></div><div><dt>Fonte</dt><dd data-hl-heater>Ligada</dd></div></dl>
    <p class="hl-rule">Mesma massa → volume maior → densidade menor <span>ρ = m/V</span></p>
    <p class="hl-disclaimer">Cada ponto acompanha uma porção de fluido. A expansão aparece exagerada pra ficar visível.</p>`:''}
   </div>`;
 }
 function materials(){
  return `<details class="hl-materials"><summary>Condutores, isolantes e o papel dos íons</summary>
   <p>Condutividade térmica mede quão bem a energia térmica passa por um material. Condutividade elétrica depende de haver cargas móveis.</p>
   <div class="hl-material-grid">
    <section><h4>Calor</h4><p>Cobre e alumínio conduzem bem. Madeira seca, isopor e ar parado dificultam a condução. A água conduz calor bem menos que os metais e espalha energia pelo movimento do líquido.</p></section>
    <section><h4>Eletricidade</h4><p>Nos metais, elétrons móveis transportam carga. Plástico e borracha costumam dificultar essa passagem. A água muito pura conduz pouco. Quando há sais dissolvidos, os íons móveis conduzem corrente.</p></section>
   </div>
   <p class="hl-rule">Sal sólido: íons presos no cristal. Em solução ou no sal fundido: íons livres para se deslocar.</p>
   <p>Num líquido com íons, cátions (+) se deslocam para o eletrodo negativo e ânions (−) para o positivo em uma célula eletrolítica.</p>
  </details>`;
 }
 function markup(scope){
  const id='hl-'+scope;
  return `<section class="aula-lab el-lab hl-lab" id="${id}" data-heat-lab aria-labelledby="${id}-title">
   <p class="aula-overline">SIMULADOR INTERATIVO</p><h3 id="${id}-title">${title}</h3>
   <div class="hl-tabs" role="group" aria-label="Forma de transmissão">
    ${Object.entries(modes).map(([key,label])=>`<button type="button" class="outline" data-hl-mode="${key}" aria-pressed="${key==='conveccao'}">${label}</button>`).join('')}
   </div>
   <div class="hl-controls">
    <label data-hl-fluid-wrap>Fluido <select data-hl-fluid>
     ${Object.entries(fluids).map(([key,f])=>`<option value="${key}">${f.name}</option>`).join('')}
    </select></label>
    <div class="hl-actions"><button type="button" class="primary" data-hl-play>Iniciar</button>
     <button type="button" class="outline" data-hl-reset>Voltar ao início</button></div>
   </div>
   <div class="hl-timeline"><label for="${id}-progress">Avanço da demonstração</label><input id="${id}-progress" data-hl-progress type="range" min="0" max="100" step="1" value="0" aria-valuetext="0%"></div>
   <div class="hl-scene" data-hl-scene>${scene('conveccao',id)}</div>
   <p class="hl-disclaimer">Modelo ilustrativo. A escala de tempo e os valores servem para acompanhar a ideia, sem prever o aquecimento real.</p>
   ${materials()}
  </section>`;
 }
 function paintConvection(ui,t,fluid,reduce){
  const {bottom,top,difference,cycles,heaterOn}=convection(t,fluid);
  ui.bottom.textContent=number.format(bottom)+' °C';
  ui.top.textContent=number.format(top)+' °C';
  ui.heater.textContent=heaterOn?'Ligada':'Desligada';
  ui.source.setAttribute('opacity',heaterOn?'1':'.25');
  ui.topColor.setAttribute('stop-color',color(top));
  ui.bottomColor.setAttribute('stop-color',color(bottom));
  const flow=Math.min(1,difference/4);
  ui.currents.setAttribute('opacity',.24+.68*flow);
  ui.tracers.setAttribute('opacity',reduce?0:flow);
  if(reduce||!flow)return;
  for(const dot of ui.dots){
   const angle=2*Math.PI*(cycles+Number(dot.dataset.hlIndex)/5);
   const x=154+Number(dot.dataset.hlSide)*(66-56*Math.cos(angle));
   const y=97.5-50*Math.sin(angle);
   dot.setAttribute('cx',x);
   dot.setAttribute('cy',y);
   dot.setAttribute('r',3.1+.75*flow*(1+Math.cos(angle)));
  }
 }
 function paintConduction(ui,t){
  for(const cell of ui.rods){
   const distance=Number(cell.dataset.hlIndex)/17;
   const rate=cell.dataset.hlRod==='0'?.85:.045;
   cell.setAttribute('fill',color(rodTemperature(t,distance,rate)));
  }
 }
 function paintRadiation(ui,t,reduce){
  ui.plate.setAttribute('fill',color(ambient+42*Math.max(0,t-.22)/.78));
  ui.waves.setAttribute('opacity',t>0?1:0);
  for(const wave of ui.pulses){
   const position=((reduce?0:t*5)+Number(wave.dataset.hlIndex)/5)%1;
   wave.setAttribute('transform','translate('+(68+171*position)+' 0)');
   wave.setAttribute('opacity',Math.min(1,Math.max(0,5*t-position)*4));
  }
 }
 function state(host){
  if(!instances.has(host)){
   const item={t:0,frame:null,mode:'conveccao'};
   instances.set(host,item);
   findControls(host,item);
  }
  return instances.get(host);
 }
 function findControls(host,item){
  const keys=['stage','bottom','top','heater','source','top-color','bottom-color','currents','tracers','plate','waves'];
  const ui=Object.fromEntries(keys.map(key=>[key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),host.querySelector('[data-hl-'+key+']')]));
  ui.dots=host.querySelectorAll('[data-hl-side]');
  ui.rods=host.querySelectorAll('[data-hl-rod]');
  ui.pulses=host.querySelectorAll('[data-hl-waves] path');
  item.ui=ui;
  item.slider=host.querySelector('[data-hl-progress]');
  item.play=host.querySelector('[data-hl-play]');
  item.fluid=host.querySelector('[data-hl-fluid]');
  item.reduce=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  item.stage=-1;
 }
 function paint(item){
  const {mode,t,ui}=item;
  const progress=Math.round(t*100);
  if(Number(item.slider.value)!==progress)item.slider.value=progress;
  const value=progress+'%';
  if(item.slider.getAttribute('aria-valuetext')!==value)item.slider.setAttribute('aria-valuetext',value);
  const stage=messages[mode].findLastIndex(([start])=>t>=start);
  if(item.stage!==stage){
   const [,label,text]=messages[mode][stage];
   ui.stage.textContent=label+' · '+text;
   item.stage=stage;
  }
  if(mode==='conveccao')paintConvection(ui,t,item.fluid.value,item.reduce);
  else if(mode==='conducao')paintConduction(ui,t);
  else paintRadiation(ui,t,item.reduce);
 }
 function stop(item){
  if(item.frame!==null)cancelAnimationFrame(item.frame);
  item.frame=null;
  item.play.textContent=item.t===0?'Iniciar':item.t===1?'Repetir':'Continuar';
 }
 function reset(item){
  item.t=0;
  stop(item);
  paint(item);
 }
 function play(host,item){
  if(item.frame!==null){stop(item);return;}
  if(item.t===1)reset(item);
  let started, initial=item.t;
  const tick=now=>{
   if(!host.isConnected||!host.getClientRects().length){stop(item);return;}
   started??=now;
   item.t=Math.min(1,initial+(now-started)/duration);
   paint(item);
   if(item.t<1)item.frame=requestAnimationFrame(tick);
   else stop(item);
  };
  item.play.textContent='Pausar';
  item.frame=requestAnimationFrame(tick);
 }
 function bind(root){
  root.addEventListener('click',event=>{
   const button=event.target.closest('button');
   const host=button?.closest('[data-heat-lab]');
   if(!host)return;
   const item=state(host), mode=button.dataset.hlMode;
   if(Object.hasOwn(modes,mode)){
    if(mode===item.mode)return;
    stop(item);
    item.mode=mode;
    host.querySelector('[data-hl-scene]').innerHTML=scene(mode,host.id);
    host.querySelector('[data-hl-fluid-wrap]').hidden=mode!=='conveccao';
    for(const tab of host.querySelectorAll('[data-hl-mode]'))tab.setAttribute('aria-pressed',String(tab===button));
    findControls(host,item);
    reset(item);
   }else if(button.hasAttribute('data-hl-play'))play(host,item);
   else if(button.hasAttribute('data-hl-reset'))reset(item);
  });
  root.addEventListener('input',event=>{
   if(!event.target.hasAttribute('data-hl-progress'))return;
   const item=state(event.target.closest('[data-heat-lab]'));
   item.t=Number(event.target.value)/100;
   stop(item);
   paint(item);
  });
  root.addEventListener('change',event=>{
   if(event.target.hasAttribute('data-hl-fluid'))reset(state(event.target.closest('[data-heat-lab]')));
  });
 }
 globalThis.FurgHeatLab={title,markup,bind,convection,rodTemperature};
})();
