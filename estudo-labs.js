'use strict';
(() => {
 const fmt=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:3});
 const n=value=>fmt.format(value);
 const control=(label,unit,min,max,step,value)=>({label,unit,min,max,step,value});
 const bar=(label,value,total)=>'<div class="el-bar"><span>'+label+'</span><meter min="0" max="'+total+'" value="'+value+'"></meter><b>'+n(value)+'</b></div>';
 const graph=(points,xMax,yMin,yMax,xLabel,yLabel)=>{
  const x=v=>46+216*v/xMax, y=v=>134-102*(v-yMin)/(yMax-yMin);
  return '<svg class="el-figure" viewBox="0 0 310 166" role="img" aria-label="Gráfico de '+yLabel+' em função de '+xLabel+'"><path class="el-axis" d="M46 23V134H273"/>'+
   (yMin<0&&yMax>0?'<path class="el-axis" d="M46 '+y(0)+'H262"/>':'')+
   '<polyline class="el-curve" points="'+points.map(([a,b])=>x(a)+','+y(b)).join(' ')+'"/>'+
   '<text x="5" y="19">'+yLabel+'</text><text x="238" y="155">'+xLabel+'</text><text x="3" y="35">'+n(yMax)+'</text><text x="4" y="134">'+n(yMin)+'</text><text x="219" y="155">'+n(xMax)+'</text></svg>';
 };
 const energy=([m,h,v,d,k])=>[m*10*h,m*v*v/2,k*d*d/2];
 const motion=([v,a,t])=>[v*t+a*t*t/2,v+a*t];
 const geometry=([b,h,p])=>[b*h,b*h/2,b*h*p,b*h*p/3];
 const trig=([angle,r])=>{
  const rad=angle*Math.PI/180;
  return [r*Math.cos(rad),r*Math.sin(rad)];
 };
 const tracks=['Rampa','Queda','Pêndulo','Montanha-russa','Mola'];
 const conservation=([track,position])=>{
  const t=position/100, angle=(1-t)*Math.PI/3;
  const h=track===2?4*(1-Math.cos(angle)):5*(1-t)*(track===3?.68+.32*Math.cos(4*Math.PI*t):1);
  const total=track===4?50:track===2?40:100;
  const potential=track===4?total*(1-t)**2:20*h;
  return {potential,kinetic:Math.max(0,total-potential),total,angle,h};
 };
 const labs={
  conservacao:{
   title:'Transformações de energia',model:'Percurso ideal, sem atrito, com massa de 2 kg e g = 10 m/s². A posição controla o estado do sistema. O controle não mede o tempo da trajetória. Na opção mola, k = 100 N/m e a compressão inicial é 1 m.',
   vars:[{label:'Sistema',unit:'',options:tracks,value:0},control('Posição ao longo do trecho','%',0,100,2,30)],
   rule:'E_c + E_p = constante · v = √(2 E_c/m)',
   draw(v){
    const [track,position]=v,t=position/100,{h,angle,total,potential,kinetic}=conservation(v);
    const x=track===1?145:track===2?145+96*Math.sin(angle):track===4?114+114*t:35+218*t;
    const y=track===2?22+96*Math.cos(angle):track===4?108:115-h*17;
    const coaster=Array.from({length:41},(_,i)=>[35+218*i/40,115-17*conservation([3,i*2.5]).h].join(',')).join(' ');
    const spring=Array.from({length:9},(_,i)=>[30+(x-30)*i/8,108+(i===0||i===8?0:i%2?-10:10)].join(',')).join(' ');
    const terrain=[
     '<path class="el-axis" d="M35 30L253 115"/>',
     '<path class="el-axis" d="M145 30V115"/>',
     '<path class="el-axis" d="M145 22L'+x+' '+y+'"/>',
     '<polyline class="el-curve" points="'+coaster+'"/>',
     '<polyline class="el-axis" points="'+spring+'"/>',
    ][track];

    return '<svg class="el-figure" viewBox="0 0 290 140" role="img" aria-label="'+tracks[track]+' no modelo ideal">'+terrain+'<circle class="el-dot" cx="'+x+'" cy="'+y+'" r="6"/></svg>'+
     bar(track===4?'Elástica (J)':'Gravitacional (J)',potential,total)+bar('Cinética (J)',kinetic,total)+
     '<p>Energia total <strong>'+n(total)+' J</strong> · Rapidez <strong>'+n(Math.sqrt(kinetic))+' m/s</strong>.</p>';
   },
   cue:'A energia potencial diminui e a cinética cresce na descida. Na montanha-russa, essa troca pode se inverter em trechos de subida. Na mola ideal, a energia depende do quadrado da deformação.',
   task:['Dois carrinhos iguais, em rampas sem atrito, começam parados à mesma altura e chegam ao mesmo nível. Qual tem maior rapidez no final?', 'Ambos chegam com a mesma rapidez. Perderam a mesma energia potencial gravitacional, que virou energia cinética. O comprimento das rampas pode mudar o tempo.'],
  },
  energia:{
   title:'Energia mecânica',model:'Modelo com g = 10 m/s² e mola ideal. Os três estoques são calculados separadamente no mesmo instante.',
   vars:[control('Massa','kg',1,10,1,2),control('Altura acima da referência','m',0,12,1,5),control('Rapidez','m/s',0,20,1,4),control('Deformação da mola','m',0,1,.05,.2),control('Constante da mola','N/m',20,200,20,100)],
   rule:'E_g = mgh · E_c = mv²/2 · E_el = kx²/2',
   draw(v){
    const e=energy(v), top=Math.max(...e,1);
    return e.map((x,i)=>bar(['Gravitacional (J)','Cinética (J)','Elástica (J)'][i],x,top)).join('')+'<p>Soma dos estoques no modelo: <strong>'+n(e.reduce((a,b)=>a+b,0))+' J</strong>.</p>';
   },
   cue:'Dobrar a altura dobra a energia gravitacional. Dobrar a rapidez ou a deformação quadruplica o estoque correspondente.',
   task:['Um objeto de 2 kg cai de 5 m a partir do repouso. Sem resistência do ar, quanta energia cinética ele tem ao passar por 3 m?', 'Ele perde 2 × 10 × (5 − 3) = 40 J de energia potencial. A energia cinética aumenta 40 J.'],
  },
  movimento:{
   title:'Movimento e gráfico v × t',model:'Movimento em uma reta com aceleração constante. A posição inicial é zero. O sinal indica o sentido escolhido.',
   vars:[control('Velocidade inicial','m/s',-12,12,1,4),control('Aceleração','m/s²',-5,5,1,2),control('Tempo','s',1,12,1,5)],
   rule:'v = v₀ + at · Δs = v₀t + at²/2',
   draw(v){
    const [v0,,t]=v,[s,vf]=motion(v);
    return graph([[0,v0],[t,vf]],t,Math.min(0,v0,vf)-1,Math.max(0,v0,vf)+1,'t (s)','v (m/s)')+
     '<p>Velocidade final <strong>'+n(vf)+' m/s</strong> · Deslocamento <strong>'+n(s)+' m</strong>.</p>';
   },
   cue:'No gráfico velocidade × tempo, a inclinação é a aceleração. Soma as áreas com sinal para obter o deslocamento.',
   task:['Começa a −4 m/s com a = 2 m/s². Qual o deslocamento em 4 s?', 'A velocidade vai de −4 a 4 m/s. As áreas de sinais contrários se cancelam, então Δs = 0 m. Houve movimento nos dois sentidos.'],
  },
  geometria:{
   title:'Área, prisma e pirâmide',model:'O triângulo ocupa metade do retângulo de mesma base e altura. O prisma e a pirâmide têm a base retangular e a mesma altura vertical.',
   vars:[control('Base do retângulo','cm',1,12,1,8),control('Altura no plano','cm',1,12,1,5),control('Altura do sólido','cm',1,12,1,6)],
   rule:'A = bh · A_tri = bh/2 · V_prisma = Ah · V_pirâmide = Ah/3',
   draw(v){
    const [a,t,p,r]=geometry(v),w=v[0]*16,h=v[1]*8;
    return '<svg class="el-figure" viewBox="0 0 250 127" role="img" aria-label="Um triângulo ocupa metade do retângulo"><rect class="el-axis" x="25" y="'+(110-h)+'" width="'+w+'" height="'+h+'"/><path class="el-fill" d="M25 110h'+w+'v-'+h+'Z"/></svg>'+
     '<p>Retângulo <strong>'+n(a)+' cm²</strong> · Triângulo <strong>'+n(t)+' cm²</strong> · Prisma <strong>'+n(p)+' cm³</strong> · Pirâmide <strong>'+n(r)+' cm³</strong>.</p>';
   },
   cue:'Para obter volume, empilha camadas. Em uma ampliação uniforme, o fator entra em duas direções na área e em três no volume.',
   task:['Se todas as dimensões dobrarem, por quanto o volume do prisma é multiplicado?', 'Por 8. A base fica quatro vezes maior e a altura dobra.'],
  },
  trigonometria:{
   title:'Trigonometria e projeções',model:'Triângulo retângulo. O ângulo é medido a partir da horizontal. A hipotenusa representa o comprimento da rampa.',
   vars:[control('Ângulo','°',0,90,1,30),control('Hipotenusa','m',1,12,1,6)],
   rule:'cateto oposto = r sen θ · cateto adjacente = r cos θ',
   draw(v){
    const [adj,opp]=trig(v),y=118-opp*8;
    // Escala igual nas duas direções para conservar o ângulo.
    const endX=30+adj*8;
    return '<svg class="el-figure" viewBox="0 0 160 136" role="img" aria-label="Rampa e suas projeções horizontal e vertical"><path class="el-fill" d="M30 118H'+endX+'V'+y+'Z"/><circle cx="'+endX+'" cy="'+y+'" r="3" class="el-dot"/></svg>'+
     '<p>Alcance <strong>'+n(adj)+' m</strong> · Altura <strong>'+n(opp)+' m</strong>.</p>';
   },
   cue:'Oposto e adjacente mudam se tu trocar o ângulo de referência. As projeções também aparecem nas componentes de uma força.',
   task:['Uma rampa de 10 m faz 30° com o chão. Qual altura ela vence?', 'A altura está oposta a 30°. sen 30° = 1/2. Então 10 × 1/2 = 5 m.'],
  },
  eletricidade:{
   title:'Tensão, resistência e corrente',model:'Uma fonte ideal alimenta um resistor ôhmico de resistência constante. A energia elétrica dissipada aquece o resistor.',
   vars:[control('Tensão','V',0,24,1,12),control('Resistência','Ω',2,24,1,6)],
   rule:'I = U/R · P = UI = U²/R',
   draw([u,r]){
    const i=u/r;
    return '<svg class="el-figure" viewBox="0 0 290 123" role="img" aria-label="Fonte e resistor formando um único circuito"><path class="el-axis" d="M47 49V23H120m50 0h73v78H47V67m-15-18h30m-24 18h18"/><rect class="el-fill" x="120" y="16" width="50" height="14"/><text x="130" y="48">R</text><text x="19" y="87">U</text></svg>'+
     '<p>Corrente <strong>'+n(i)+' A</strong> · Potência no resistor <strong>'+n(u*i)+' W</strong>.</p>';
   },
   cue:'A mantém a contagem de coulombs por segundo. V mede joules por coulomb. O produto cancela coulomb e dá joules por segundo.',
   task:['Se a tensão se mantiver e a resistência dobrar, o que ocorre com I e P?', 'As duas caem à metade. Ambas têm R no denominador quando U é fixo.'],
  },
  solucoes:{
   title:'Soluções e diluição',model:'Volume final da solução conhecido. Mantém o soluto dissolvido e ignora perdas. Ao simular a diluição, mexe só no volume.',
   vars:[control('Massa de soluto','g',1,50,1,20),control('Volume final','L',.5,5,.25,2)],
   rule:'C = m/V · C₁V₁ = C₂V₂ se a massa de soluto se conserva',
   draw([m,v]){
    const c=m/v,h=v*16;
    return '<svg class="el-figure" viewBox="0 0 250 130" role="img" aria-label="Recipiente com '+n(v)+' litros de solução"><path class="el-axis" d="M75 19V107H175V19"/><rect class="el-fill" x="77" y="'+(106-h)+'" width="96" height="'+h+'" fill-opacity="'+(.22+Math.min(c,100)/150)+'"/></svg>'+
     '<p>Soluto <strong>'+n(m)+' g</strong> · Concentração <strong>'+n(c)+' g/L</strong>.</p>';
   },
   cue:'No mesmo volume, mais soluto aumenta a concentração. Com a mesma massa de soluto, aumentar o volume diminui a concentração.',
   task:['Há 20 g em 0,5 L de solução. Após diluir até 2 L, qual é a concentração?', 'A massa permanece 20 g. C = 20/2 = 10 g/L.'],
  },
  escalas:{
   title:'Escala no mapa',model:'Mapa com escala uniforme 1:n. O quadrado representa uma área em planta. A régua compara distâncias no mesmo plano.',
   vars:[control('Segmento medido','cm',1,10,.5,4),control('Denominador da escala','',5000,100000,5000,50000)],
   rule:'d_real = d_mapa × n · A_real = A_mapa × n²',
   draw([d,f]){
    const metres=d*f/100, km=metres/1000;
    return '<div class="el-scale"><span>0</span><span>'+n(km/2)+' km</span><span>'+n(km)+' km</span></div><p>'+n(d)+' cm no mapa representam <strong>'+n(metres)+' m</strong>. Um quadrado desse lado representa <strong>'+n(km*km)+' km²</strong>.</p>';
   },
   cue:'Em SIG, coordenadas em graus precisam de uma medição geodésica ou projeção apropriada para obter metros. Uma escala impressa pressupõe o tamanho de impressão previsto.',
   task:['Num mapa 1:25 000, uma linha de 6 cm representa qual distância?', '6 × 25 000 = 150 000 cm = 1 500 m. Uma régua com barra gráfica que acompanha o redimensionamento também permite medir.'],
  },
  funcoes:{
   title:'Função afim e quadrática',model:'Compara duas relações no intervalo de 0 a 8. Quando a = 0, a expressão de segundo grau vira a mesma reta.',
   vars:[control('Coeficiente a','',-2,2,.25,.5),control('Coeficiente b','',-6,6,1,2),control('Termo constante c','',-8,8,1,3),control('Valor de x','',0,8,.5,4)],
   rule:'f(x) = ax² + bx + c · Para a ≠ 0, x do vértice = −b/(2a)',
   draw([a,b,c,x]){
    const f=t=>a*t*t+b*t+c,pts=Array.from({length:33},(_,i)=>[i/4,f(i/4)]),vertex=a?-b/(2*a):null;
    const values=pts.map(p=>p[1]);
    if(vertex!==null&&vertex>=0&&vertex<=8)values.push(f(vertex));
    return graph(pts,8,Math.min(0,...values)-1,Math.max(0,...values)+1,'x','f(x)')+
     '<p>f('+n(x)+') = <strong>'+n(f(x))+'</strong>'+ (vertex!==null?' · x do vértice <strong>'+n(vertex)+'</strong>':' · Variação por unidade de x <strong>'+n(b)+'</strong>')+'.</p>';
   },
   cue:'c é o valor em x = 0. Em uma reta, b é a inclinação. Na parábola, a inclinação varia, e o vértice pode ficar fora do trecho desenhado.',
   task:['Em f(x) = −x² + 6x + 2, em qual x ocorre o máximo?', 'x = −6/(2 × (−1)) = 3. O coeficiente a negativo faz a parábola abrir para baixo.'],
  },
  probabilidade:{
   title:'Probabilidade sem reposição',model:'Duas retiradas ao acaso de uma caixa com 10 fichas. Cada ficha tem a mesma chance de sair.',
   vars:[control('Fichas marcadas','',1,9,1,4)],
   rule:'P(duas marcadas) = (m/10) × ((m − 1)/9)',
   draw([m]){
    const p=m*(m-1)/90;
    return '<div class="el-tokens" aria-label="'+m+' fichas marcadas em dez">'+Array.from({length:10},(_,i)=>'<span aria-hidden="true">'+(i<m?'●':'○')+'</span>').join('')+'</div><p>Primeira marcada <strong>'+n(m*10)+'%</strong> · Ambas marcadas <strong>'+n(p*100)+'%</strong>.</p>';
   },
   cue:'Depois da primeira marcada, tiramos uma ficha do total e uma do conjunto favorável. Com reposição, as duas razões seriam iguais.',
   task:['Com 4 marcadas, qual a chance de duas marcadas sem reposição?', '4/10 × 3/9 = 2/15. O mesmo resultado vem de escolher 2 dentre 4 e dividir pelo número de pares dentre 10.'],
  },
 };
 function markup(id,scope='main'){
  const l=labs[id];
  if(!l)return '';
  const heading='el-'+scope+'-'+id;
  return '<section class="aula-lab el-lab" data-study-lab="'+id+'" aria-labelledby="'+heading+'"><p class="aula-overline">EXPLORAÇÃO VISUAL</p><h3 id="'+heading+'">'+l.title+'</h3><p>'+l.model+'</p>'+
   '<div class="el-controls">'+l.vars.map((c,i)=>{
    const key=heading+'-'+i;
    if(c.options)return '<label>'+c.label+'<select data-el-range>'+c.options.map((label,j)=>'<option value="'+j+'"'+(j===c.value?' selected':'')+'>'+label+'</option>').join('')+'</select></label>';
    return '<div class="aula-lab-control"><label for="'+key+'">'+c.label+'</label><output for="'+key+'">'+n(c.value)+' '+c.unit+'</output><input id="'+key+'" type="range" data-el-range min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+c.value+'" aria-valuetext="'+n(c.value)+' '+c.unit+'"></div>';
   }).join('')+'</div><p class="el-formula">'+l.rule+'</p><div data-el-result>'+l.draw(l.vars.map(c=>c.value))+'</div>'+
   (id==='conservacao'?'<button type="button" class="outline el-animate" data-el-animate>Reproduzir percurso</button>':'')+'<p>'+l.cue+'</p>'+
   '<details><summary>Desafio autoral</summary><p>'+l.task[0]+'</p><details><summary>Conferir raciocínio</summary><p>'+l.task[1]+'</p></details></details></section>';
 }
 function update(input){
  const host=input.closest('[data-study-lab]'),lab=labs[host?.dataset.studyLab];
  if(!lab)return;
  const controls=[...host.querySelectorAll('[data-el-range]')];
  const values=controls.map(c=>Number(c.value));
  if(values.some((value,i)=>!Number.isFinite(value)||(lab.vars[i].options?!Object.hasOwn(lab.vars[i].options,value):value<lab.vars[i].min||value>lab.vars[i].max)))return;
  controls.forEach((c,i)=>{
   if(lab.vars[i].options)return;
   const value=(n(values[i])+' '+lab.vars[i].unit).trim();
   c.setAttribute('aria-valuetext',value);
   c.previousElementSibling.textContent=value;
  });
  host.querySelector('[data-el-result]').innerHTML=lab.draw(values);
 }
 const playing=new WeakMap();
 function bind(host){
  const run=event=>{if(event.target.hasAttribute?.('data-el-range'))update(event.target);};
  host.addEventListener('input',run);
  host.addEventListener('change',event=>{if(event.target.tagName==='SELECT')run(event);});
  host.addEventListener('click',event=>{
   const button=event.target.closest('[data-el-animate]');
   if(!button||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   const stop=playing.get(button);
   if(stop){stop();return;}
   const slider=button.closest('[data-study-lab]').querySelector('input[type=range]');
   let frame,start;
   const pause=()=>{
    cancelAnimationFrame(frame);
    playing.delete(button);
    button.textContent='Reproduzir percurso';
   };
   const step=time=>{
    if(!button.isConnected||!button.getClientRects().length){pause();return;}
    start??=time;
    slider.value=String(Math.min(100,Math.floor((time-start)/24/2)*2));
    update(slider);
    if(slider.value==='100')pause();
    else frame=requestAnimationFrame(step);
   };
   playing.set(button,pause);
   button.textContent='Pausar percurso';
   frame=requestAnimationFrame(step);
  });
 }
 globalThis.FurgStudyLabs={labs,markup,update,bind,energy,motion,geometry,trig,conservation};
})();
