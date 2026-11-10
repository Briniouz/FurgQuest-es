'use strict';
(() => {
 const {convert,show,parse}=globalThis.FurgConversions;
 const units=['°C','°F','K'];
 const readings=celsius=>units.map(unit=>show(convert(celsius,'temperatura','°C',unit))+' '+unit);
 const demoSteps=[
  ['Alinha os mesmos pontos físicos','Para a água pura a cerca de 1 atm, a fusão fica perto de 0 °C e a ebulição perto de 100 °C. Na escala Fahrenheit, esses pontos ficam perto de 32 °F e 212 °F.'],
  ['Compara os segmentos','Imagina as réguas paralelas cortadas por três linhas horizontais: a origem de referência, a leitura e o ponto superior. A ideia de Tales é comparar a mesma fração de um segmento em cada régua.'],
  ['Escreve as frações','Da referência inferior à leitura, os deslocamentos são C − 0 e F − 32. Os intervalos inteiros medem 100 e 180. Por isso (C − 0)/(100 − 0) = (F − 32)/(212 − 32).'],
  ['Simplifica e isola','C/100 = (F − 32)/180. Multiplica por 20 para obter C/5 = (F − 32)/9. Isolando F, fica F = (9/5)C + 32.'],
 ];
 const challenges=[
  {prompt:'Um termômetro marca 59 °F. Qual é a leitura em °C?',unit:'°C',value:convert(59,'temperatura','°F','°C'),
   hints:['59 é a leitura, medida a partir de uma escala cujo ponto de referência está em 32 °F.','Subtrai 32 antes de converter a distância até a referência.'],
   solution:'59 − 32 = 27. São três intervalos de 9 °F, cada um equivalente a 5 °C. A leitura é 15 °C.'},
  {prompt:'A temperatura caiu 10 °C. Qual foi a variação com sinal, em °F?',unit:'°F',value:convert(-10,'variacao-termica','°C','°F'),
   hints:['Escreve final menos inicial. Uma queda tem sinal negativo.','O +32 cancela na diferença. Multiplica o intervalo Celsius por 9/5.'],
   solution:'ΔF = (9/5) × (−10) = −18 °F. A leitura final caiu 18 graus na escala Fahrenheit.'},
  {prompt:'Um freezer marca −4 °F. Qual é a temperatura em K?',unit:'K',value:convert(-4,'temperatura','°F','K'),
   hints:['Converte a leitura primeiro para Celsius.','Aplica C = (F − 32) × 5/9. Para mudar de Celsius para Kelvin, desloca o zero em 273,15.'],
   solution:'C = (−4 − 32) × 5/9 = −20 °C. A leitura em Kelvin é 253,15 K.'},
  {prompt:'Em que leitura as escalas Celsius e Fahrenheit mostram o mesmo número?',unit:'°C',value:-40,
   hints:['Chama o número procurado de x nas duas escalas.','Escreve x = (9/5)x + 32 e isola x.'],
   solution:'x − (9/5)x = 32. Então (−4/5)x = 32 e x = −40. Logo, −40 °C = −40 °F.'},
 ];

 function thermometers(celsius){
  const y=153-celsius;
  const scales=[
   [43,'Celsius','100 °C','0 °C','celsius'],
   [146,'Fahrenheit','212 °F','32 °F','fahrenheit'],
   [255,'Kelvin','373,15 K','273,15 K','kelvin'],
  ];
  return `<svg class="aula-thermometers" viewBox="0 0 350 230" role="img" aria-label="A linha cruza os três termômetros na mesma altura. Leituras ${readings(celsius).join(', ')}.">
   ${scales.map(([x,name,top,bottom,scale])=>`<g data-scale="${scale}">
    <text x="${x+8}" y="13" text-anchor="middle" class="aula-temp-scale">${name}</text>
    <rect class="aula-temp-tube" x="${x}" y="24" width="14" height="186" rx="7"/>
    <path class="aula-temp-column" d="M${x+7} 153V${y}"/>
    <path class="aula-temp-tick" d="M${x-3} 53h19m-19 100h19"/>
    <text class="aula-temp-tick-label" x="${x+20}" y="48">${top}</text>
    <text class="aula-temp-tick-label" x="${x+20}" y="167">${bottom}</text>
    <circle class="aula-temp-point" cx="${x+7}" cy="${y}" r="5"/>
   </g>`).join('')}
   <path class="aula-temp-marker" d="M22 ${y}H329"/>
  </svg>`;
 }

 function graph(celsius){
  const x=43+(celsius+40)*1.52, y=142-(celsius+40)*.72;
  return `<svg class="aula-temp-graph" viewBox="0 0 330 180" role="img" aria-label="Gráfico de Fahrenheit em função de Celsius. O ponto marcado representa ${readings(celsius).slice(0,2).join(' e ')}.">
   <path class="aula-shape-guide" d="M43 113H286M${x} ${y}V126M104 ${y}H${x}"/>
   <path class="aula-shape-line" d="M104 22V148M43 126H300"/>
   <path class="aula-temp-graph-line" d="M43 142L286 27"/>
   <circle class="aula-shape-dot" cx="${x}" cy="${y}" r="4"/>
   <text x="96" y="17">°F</text><text x="302" y="130">°C</text>
   <text x="39" y="162">−40</text><text x="101" y="162">0</text><text x="263" y="162">120</text>
   <text x="14" y="117">32</text>
  </svg>`;
 }

 function challenge(index){
  const item=challenges[index];
  return `<p class="aula-overline">DESAFIO AUTORAL · ${index+1}/${challenges.length}</p>
   <h4 id="aulaTempPrompt">${item.prompt}</h4>
   <form data-temp-answer="${index}" aria-labelledby="aulaTempPrompt">
    <label for="aulaTempAnswer">Minha resposta em ${item.unit}</label>
    <div class="aula-temp-response"><input id="aulaTempAnswer" inputmode="decimal" autocomplete="off" maxlength="16" required>
     <button type="submit" class="primary">Conferir</button></div>
   </form>
   <div class="aula-temp-actions">
    <button type="button" class="outline" data-temp-hint>Quero uma pista</button>
    <button type="button" class="quiet" data-temp-solution="${index}">Ver resolução</button>
    <button type="button" class="quiet" data-temp-next="${(index+1)%challenges.length}">Outro desafio →</button>
   </div>
   <ol class="aula-temp-hints">${item.hints.map(hint=>`<li hidden>${hint}</li>`).join('')}</ol>
   <p id="aulaTempFeedback" class="aula-feedback" role="status"></p>`;
 }

 function markup(){
  return `<section id="aulaEscalas" class="aula-lab aula-temp" aria-labelledby="aulaTempTitle">
   <header><p class="aula-overline">LABORATÓRIO DE TEMPERATURA</p><h3 id="aulaTempTitle">Uma temperatura, três escalas</h3>
    <p>Temperatura descreve o estado térmico. Se dois corpos estão em equilíbrio térmico, não há troca líquida de calor entre eles. Calor é a energia em trânsito por diferença de temperatura.</p>
    <p>No modelo microscópico, o aquecimento costuma aumentar a agitação das partículas. A energia interna também depende da quantidade de matéria e das interações entre as partículas.</p></header>
   <div class="aula-temp-tabs" role="group" aria-label="Modo do laboratório">
    <button type="button" class="outline" data-temp-mode="explorar" aria-pressed="true">Explorar</button>
    <button type="button" class="outline" data-temp-mode="desafio" aria-pressed="false">Desafio</button>
   </div>
   <div id="aulaTempExplore">
    <div class="aula-lab-control">
     <label for="aulaTempRange">Move a linha entre as escalas</label>
     <output id="aulaTempReadout" for="aulaTempRange">5 °C</output>
     <input id="aulaTempRange" type="range" min="-40" max="120" step=".5" value="5" aria-valuetext="${readings(5).join(', ')}">
    </div>
    <div id="aulaTempFigure">${thermometers(5)}</div>
    <dl class="aula-lab-stats">${readings(5).map((value,i)=>`<div><dt>${['Celsius','Fahrenheit','Kelvin'][i]}</dt><dd data-temp-reading="${i}">${value}</dd></div>`).join('')}</dl>
    <p class="aula-temp-caption">A altura é a mesma. Os números mudam porque cada régua tem sua origem e seus intervalos.</p>
   </div>
   <div id="aulaTempChallenge" hidden>${challenge(0)}</div>
   <div class="aula-temp-theory">
    <h4>Como a fórmula sai da geometria</h4>
    <ol class="aula-temp-derivation">${demoSteps.map(([title,body],i)=>`<li ${i?'hidden':''}><strong>${title}</strong><p>${body}</p></li>`).join('')}</ol>
    <button type="button" class="outline" data-temp-step>Mostrar próximo passo →</button>
    <details class="aula-temp-graph-box">
     <summary>Também dá pra ver no gráfico</summary>
     <div id="aulaTempGraph">${graph(5)}</div>
     <p>A reta sobe 9 °F a cada 5 °C, então o coeficiente angular é 9/5. Ela corta o eixo Fahrenheit em 32 °F quando C = 0. A relação entre leituras é afim, pois a reta tem um deslocamento de origem.</p>
    </details>
    <div class="aula-temp-notes">
     <section><h4>E o Kelvin?</h4><p>Um intervalo de 1 °C tem o mesmo tamanho que 1 K. O zero absoluto é 0 K, que equivale a −273,15 °C. Por isso K = C + 273,15. Escreve 27 °C = 300,15 K, com K sem símbolo de grau.</p>
      <p>O kelvin é a unidade SI de temperatura termodinâmica. Em leis de gases, converte para K. Usa 273 só quando a aproximação for adequada ao enunciado.</p></section>
     <section><h4>Leitura ou variação?</h4><p>Para uma variação, faz ΔT = T final − T inicial. O deslocamento cancela. Uma subida de 10 °C corresponde a 10 K e a 18 °F. Uma queda tem sinal negativo.</p>
      <p>Na frenagem da aposta 06, de 20 °C a 120 °C, o que entra em Q = mcΔT é a variação de 100 °C.</p></section>
    </div>
    <section class="aula-example">
     <h4>Exemplo resolvido em dois caminhos</h4>
     <p>Um termômetro de cozinha marca 68 °F. Queremos a leitura em Celsius e depois em Kelvin.</p>
     <ol><li>Por intervalos, 68 − 32 = 36. Isso são quatro trechos de 9 °F. Cada um vale 5 °C, então 4 × 5 = 20 °C.</li>
      <li>Pela relação afim, isola C. C = (68 − 32) × 5/9 = 20 °C.</li>
      <li>Compara com a referência. 68 °F deve ficar acima de 0 °C e bem abaixo de 100 °C. Para Kelvin, 20 + 273,15 = 293,15 K.</li></ol>
    </section>
    <aside class="aula-exam"><strong>Como reconhecer isso no ENEM?</strong><p>Procura leituras em escalas diferentes, valores de referência e palavras como “aumentou”, “caiu” ou “diferença”. Se duas leituras mudaram, calcula a variação antes de aplicar o fator.</p></aside>
    <p><strong>Antes de marcar como estudada</strong> Tenta explicar por que a fórmula tem +32, por que ele some em ΔT e por que uma lei de gás pede Kelvin.</p>
    <div class="aula-temp-actions">
     <a class="outline" href="#dia-2/conversoes" data-study-route="dia-2/conversoes">Mais conversões →</a>
     <a class="outline" href="#dia-2/apostas" data-study-route="dia-2/apostas">Abrir as apostas do Dia 2 →</a>
    </div>
    <p class="aula-source">Relações entre escalas. <a href="https://www.nist.gov/pml/owm/si-units-temperature" target="_blank" rel="noopener noreferrer">NIST ↗</a></p>
   </div>
  </section>`;
 }

 function revealNext(button,list,selector){
  const item=list.querySelector(selector);
  if(!item)return;
  item.hidden=false;
  if(!list.querySelector(selector))button.disabled=true;
 }
 function bind(host){
  host.addEventListener('input',event=>{
   if(event.target.id!=='aulaTempRange')return;
   const root=event.target.closest('#aulaEscalas'), value=Number(event.target.value), values=readings(value);
   event.target.setAttribute('aria-valuetext',values.join(', '));
   root.querySelector('#aulaTempReadout').textContent=values[0];
   root.querySelector('#aulaTempFigure').innerHTML=thermometers(value);
   root.querySelector('#aulaTempGraph').innerHTML=graph(value);
   for(const reading of root.querySelectorAll('[data-temp-reading]'))reading.textContent=values[reading.dataset.tempReading];
  });
  host.addEventListener('click',event=>{
   const button=event.target.closest('button'), root=button?.closest?.('#aulaEscalas');
   if(!root)return;
   const {tempMode,tempStep,tempHint,tempSolution,tempNext}=button.dataset;
   if(tempMode){
    root.querySelector('#aulaTempExplore').hidden=tempMode!=='explorar';
    root.querySelector('#aulaTempChallenge').hidden=tempMode!=='desafio';
    for(const control of root.querySelectorAll('[data-temp-mode]'))control.setAttribute('aria-pressed',String(control===button));
    if(tempMode==='desafio')root.querySelector('#aulaTempAnswer').focus();
   }
   if(tempStep!==undefined)revealNext(button,root.querySelector('.aula-temp-derivation'),'li[hidden]');
   if(tempHint!==undefined)revealNext(button,root.querySelector('.aula-temp-hints'),'li[hidden]');
   if(tempSolution!==undefined)root.querySelector('#aulaTempFeedback').textContent=challenges[tempSolution].solution;
   if(tempNext!==undefined){
    root.querySelector('#aulaTempChallenge').innerHTML=challenge(Number(tempNext));
    root.querySelector('#aulaTempAnswer').focus();
   }
  });
  host.addEventListener('submit',event=>{
   const {tempAnswer}=event.target.dataset;
   if(tempAnswer===undefined)return;
   event.preventDefault();
   const root=event.target.closest('#aulaEscalas'), value=parse(root.querySelector('#aulaTempAnswer').value);
   const item=challenges[tempAnswer], correct=Number.isFinite(value)&&Math.abs(value-item.value)<.005;
   const feedback=root.querySelector('#aulaTempFeedback');
   feedback.dataset.result=correct?'correct':'retry';
   feedback.textContent=correct?'Acertou. '+item.solution:
    Number.isFinite(value)?'Confere a origem da escala e o tamanho de cada intervalo. Dá pra tentar de novo.':'Digita o valor numérico, como 12,5.';
  });
 }
 globalThis.FurgDia2Temperature={markup,bind,readings};
})();
