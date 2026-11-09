'use strict';
(() => {
 const number = new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2});
 const reais = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
 const format = value => number.format(value);
 const stat = (label,value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
 const stats = (...pairs) => `<dl class="aula-lab-stats">${pairs.map(([label,value])=>stat(label,value)).join('')}</dl>`;
 const labs = {
  rampa:{
   title:'Experimenta na rampa', label:'Altura do carrinho', unit:'m', min:0, max:10, step:1, start:6,
   hint:'Carrinho de 2 kg solto a 10 m. Usa g = 10 m/s² e ignora atrito e rotação. Baixa a altura e observa onde aparecem os 200 J.',
   draw(height){
    const potential=20*height, kinetic=200-potential;
    const x=29+(10-height)*23, y=116-height*9;
    return `<svg class="aula-lab-svg" viewBox="0 0 290 146" role="img" aria-label="Carrinho a ${height} metros de altura na rampa">
     <path class="aula-shape-fill" d="M29 26L259 116H29Z"/>
     <path class="aula-shape-line" d="M29 26L259 116H275M29 26V116H259"/>
     <path class="aula-shape-guide" d="M${x} ${y}H29"/>
     <circle class="aula-shape-dot" cx="${x}" cy="${y}" r="8"/>
     <text x="4" y="29">10 m</text><text x="10" y="119">0 m</text>
    </svg>
    <div class="aula-energy" aria-hidden="true"><span style="width:${potential/2}%"></span><span style="width:${kinetic/2}%"></span></div>
    ${stats(['Potencial',potential+' J'],['Cinética',kinetic+' J'],['Total',200+' J'])}`;
   }
  },
  desconto:{
   title:'Vê a porcentagem no preço', label:'Desconto sobre R$ 200', unit:'%', min:0, max:50, step:5, start:20,
   hint:'Cada quadradinho representa 5% do preço inicial, ou R$ 10. Altera o desconto e confere o que sobra para pagar.',
   draw(percent){
    const off=2*percent;
    return `<div class="aula-percent-grid" role="img" aria-label="${percent}% do preço foi retirado">
     ${Array.from({length:20},(_,i)=>`<span class="${i<percent/5?'is-removed':''}"></span>`).join('')}
    </div>${stats(['Desconto',reais.format(off)],['Preço final',reais.format(200-off)])}`;
   }
  },
  solidos:{
   title:'Compara cilindro e cone', label:'Raio da base', unit:'cm', min:1, max:5, step:1, start:2,
   hint:'Os dois sólidos têm o mesmo raio e 4 cm de altura. Usa π = 3 neste modelo. Observa o que o raio muda e qual relação se conserva.',
   draw(radius){
    const cylinder=12*radius**2, cone=cylinder/3, r=radius*9;
    return `<svg class="aula-lab-svg" viewBox="0 0 310 145" role="img" aria-label="Cilindro e cone de raio ${radius} cm e altura 4 cm">
     <path class="aula-shape-fill" d="M${72-r} 28 H${72+r} V113 A${r} 11 0 0 1 ${72-r} 113 Z"/>
     <path class="aula-shape-fill" d="M234 28L${234+r} 113A${r} 11 0 0 1 ${234-r} 113Z"/>
     <ellipse class="aula-shape-line" cx="72" cy="28" rx="${r}" ry="11"/>
     <path class="aula-shape-guide" d="M234 30V113H${234+r}M${72-r} 113A${r} 11 0 0 1 ${72+r} 113"/>
     <path class="aula-shape-line" d="M145 28v85m-4-85h8m-8 85h8"/>
     <text x="151" y="73">4 cm</text>
    </svg>${stats(['Cilindro',cylinder+' cm³'],['Cone',cone+' cm³'],['Razão cone/cilindro','1/3'])}`;
   }
  },
  diluicao:{
   title:'Dilui mantendo o soluto', label:'Volume final da solução', unit:'L', min:1, max:4, step:.25, start:2.5,
   hint:'Temos 20 g de soluto. Acrescenta só solvente. A quantidade de soluto se mantém e a cor fica mais clara à medida que a solução dilui.',
   draw(volume){
    const h=25*volume, concentration=20/volume;
    return `<svg class="aula-lab-svg" viewBox="0 0 290 146" role="img" aria-label="Recipiente com ${format(volume)} litros de solução">
     <rect class="aula-fluid" x="97" y="${122-h}" width="93" height="${h}" opacity="${.25+.7/volume}"/>
     <path class="aula-shape-line" d="M91 18V122Q91 128 97 128H190Q196 128 196 122V18"/>
     ${[1,2,3,4].map(level=>`<path class="aula-shape-guide" d="M196 ${122-25*level}h10"/><text x="212" y="${126-25*level}">${level} L</text>`).join('')}
    </svg>${stats(['Soluto','20 g'],['Volume',format(volume)+' L'],['Concentração',format(concentration)+' g/L'])}`;
   }
  },
  trofica:{
   title:'Segue a energia pela cadeia', label:'Fração transferida entre níveis', unit:'%', min:5, max:25, step:1, start:10,
   hint:'Parte de 10 000 kJ nos produtores. Neste modelo a mesma fração vale em cada passagem. Em cadeias reais, essa fração varia.',
   draw(percent){
    const levels=['Produtores','Consumidores primários','Consumidores secundários','Consumidores terciários'];
    return `<ol class="aula-chain">${levels.map((label,index)=>`<li><span>${label}</span><strong>${format(10000*(percent/100)**index)} kJ</strong></li>`).join('')}</ol>`;
   }
  }
 };

 function markup(key) {
  const lab=labs[key];
  if(!lab)return '';
  return `<section class="aula-lab" aria-labelledby="aulaLabTitle">
   <p class="aula-overline">EXPERIMENTO INTERATIVO</p><h3 id="aulaLabTitle">${lab.title}</h3><p>${lab.hint}</p>
   <div class="aula-lab-control"><label for="aulaLabRange">${lab.label}</label>
    <output id="aulaLabReadout" for="aulaLabRange">${format(lab.start)} ${lab.unit}</output>
    <input id="aulaLabRange" type="range" min="${lab.min}" max="${lab.max}" step="${lab.step}" value="${lab.start}"
     aria-valuetext="${format(lab.start)} ${lab.unit}">
   </div><div id="aulaLabFigure">${lab.draw(lab.start)}</div>
  </section>`;
 }

 function update(key,input) {
  const lab=labs[key], value=Number(input.value);
  if(!lab||!Number.isFinite(value)||value<lab.min||value>lab.max)return;
  const label=format(value)+' '+lab.unit;
  input.setAttribute('aria-valuetext',label);
  document.getElementById('aulaLabReadout').textContent=label;
  document.getElementById('aulaLabFigure').innerHTML=lab.draw(value);
 }
 globalThis.FurgDia2Labs={markup,update,labs};
})();
