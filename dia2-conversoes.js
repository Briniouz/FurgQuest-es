'use strict';
(() => {
 const format=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:8});
 const scientific=new Intl.NumberFormat('pt-BR',{notation:'scientific',maximumFractionDigits:5});
 const show=value=>(value!==0&&(Math.abs(value)<1e-7||Math.abs(value)>=1e12)?scientific:format).format(value);
 const parse=value=>{
  const cleaned=String(value).trim().replace(/−/g,'-').replace(',','.');
  return /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(cleaned)?Number(cleaned):NaN;
 };
 const group=(label,units,why,example,caution)=>({label,units,why,example,caution});
 // Cada fator indica quantas unidades de referência cabem em uma unidade.
 const groups={
  comprimento:group('Comprimento',{'m':1,'km':1000,'hm':100,'dam':10,'dm':.1,'cm':.01,'mm':.001,'µm':1e-6,'nm':1e-9},
   'Os prefixos mudam a quantidade de metros em cada unidade. Quilo vale mil, centi vale um centésimo e mili vale um milésimo.',
   '3,24 km = 3,24 × 1 000 m = 3 240 m. O mesmo raciocínio serve para a volta no campo da aposta 12.',
   'Para converter um comprimento em área, ainda falta uma dimensão.'),
  area:group('Área',{'m²':1,'km²':1e6,'ha':1e4,'cm²':1e-4,'mm²':1e-6},
   'Um quadrado de 1 m de lado tem 100 cm em cada direção. Cabem 100 × 100 quadrados de 1 cm² nele.',
   '1 m² = 10 000 cm². Um hectare corresponde a um quadrado de 100 m por 100 m.',
   'Eleva ao quadrado o fator de comprimento. Converter só uma dimensão daria um fator 100 vezes menor neste exemplo.'),
  volume:group('Volume',{'m³':1,'dm³':1e-3,'cm³':1e-6,'mm³':1e-9,'L':1e-3,'mL':1e-6},
   'O volume multiplica três comprimentos. Um cubo de 1 dm de aresta tem 10 cm em cada direção e comporta 1 000 cubos de 1 cm³.',
   '1 dm³ = 1 L e 1 cm³ = 1 mL. Logo, 1 m³ = 1 000 L.',
   'Massa e volume são grandezas diferentes. Para ligar uma à outra, usa a densidade do material.'),
  tempo:group('Tempo',{'s':1,'ms':.001,'min':60,'h':3600,'dia':86400,'semana':604800},
   'Cada minuto tem 60 segundos. Uma hora tem 60 minutos, então 60 × 60 = 3 600 segundos.',
   'Em 0,2 h passam 0,2 × 60 = 12 min.',
   'Meses e anos do calendário têm durações variáveis. Usa as condições do exercício quando pedir uma aproximação.'),
  velocidade:group('Velocidade',{'m/s':1,'km/h':1000/3600,'cm/s':.01},
   'Troca tanto o comprimento quanto o tempo. 1 km/h = 1 000 m/3 600 s = 1/3,6 m/s.',
   '72 km/h = 72 ÷ 3,6 m/s = 20 m/s.',
   'Confere o sentido da conversão. Para passar de m/s para km/h, o número cresce.'),
  aceleracao:group('Aceleração',{'m/s²':1,'cm/s²':.01,'km/h²':1000/3600**2},
   'A aceleração é variação da velocidade dividida pelo tempo. Ao converter km/h², converte as duas horas do denominador.',
   'Uma velocidade que vai de 0 a 20 m/s em 5 s tem aceleração média de 4 m/s².',
   'km/h por segundo e km/h² são unidades diferentes. Lê como cada intervalo de tempo foi medido.'),
  massa:group('Massa',{'kg':1,'t':1000,'g':.001,'mg':1e-6,'µg':1e-9},
   'Cada quilograma contém mil gramas. Cada grama contém mil miligramas.',
   '500 mg = 0,5 g = 0,0005 kg.',
   'O kg mede massa. O peso é uma força e se mede em newtons.'),
  densidade:group('Densidade',{'kg/m³':1,'g/cm³':1000,'kg/L':1000,'g/mL':1000},
   '1 g vale 0,001 kg e 1 cm³ vale 0,000001 m³. A razão entre esses fatores dá 1 000 kg/m³.',
   'Uma densidade de 0,8 g/cm³ equivale a 800 kg/m³.',
   'Densidade é massa por volume do próprio material. Confere se o enunciado deu densidade ou concentração de um soluto.'),
  pressao:group('Pressão',{'Pa':1,'kPa':1000,'MPa':1e6,'bar':1e5,'atm':101325,'mmHg':133.322387415},
   'O pascal é 1 newton por metro quadrado. Uma atmosfera padrão corresponde a 101 325 Pa.',
   '1 atm = 101,325 kPa, aproximadamente 760 mmHg.',
   'O fator para mmHg é aproximado. Usa o arredondamento do enunciado em contas de prova.'),
  energia:group('Energia e trabalho',{'J':1,'kJ':1000,'MJ':1e6,'cal (termoquímica)':4.184,'kcal (termoquímica)':4184,'Wh':3600,'kWh':3.6e6},
   'Energia = potência média × tempo. 1 Wh é 1 W durante 1 h, ou 1 J/s × 3 600 s.',
   '1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6 MJ.',
   'Watt mede potência. Watt-hora mede energia. Em questões, usa o valor dado para a caloria.'),
  potencia:group('Potência',{'W':1,'kW':1000,'MW':1e6,'J/s':1},
   'Um watt é um joule transferido ou transformado por segundo.',
   'Uma lâmpada de 10 W transfere 10 J a cada segundo enquanto opera nessa potência.',
   'Se o comando pede consumo de energia, ainda é preciso multiplicar pela duração de uso.'),
  vazao:group('Vazão volumétrica',{'m³/s':1,'m³/h':1/3600,'L/s':.001,'L/min':.001/60,'mL/s':1e-6},
   'Converte o volume no numerador e o tempo no denominador. Cada metro cúbico tem 1 000 litros.',
   '60 L/min = 1 L/s = 0,001 m³/s.',
   'Para obter velocidade média através de uma seção, usa a área de passagem e a relação Q = A × v média.'),
  temperatura:group('Temperatura indicada',{'°C':1,'°F':1,'K':1},
   'As escalas usam zeros diferentes. Fahrenheit também tem divisões de tamanho diferente.',
   '5 °C = 41 °F = 278,15 K. Os três valores representam o mesmo estado térmico.',
   'Para variações de temperatura, usa a opção de intervalo. Kelvin usa K, sem símbolo de grau.'),
  'variacao-termica':group('Variação de temperatura',{'°C':1,'°F':5/9,'K':1},
   'Ao subtrair duas leituras na mesma escala, o deslocamento de origem cancela. Só o tamanho do intervalo importa.',
   'Subir 10 °C equivale a subir 10 K ou 18 °F.',
   'O +32 e o +273,15 entram na conversão de leituras. Para a variação, usa apenas os fatores.'),
  dados:group('Dados digitais',{'B':1,'bit':1/8,'kB':1e3,'MB':1e6,'GB':1e9,'KiB':1024,'MiB':1024**2,'GiB':1024**3},
   'O byte contém 8 bits. Prefixos decimais usam potências de mil. Os binários usam potências de 1 024.',
   'No sistema decimal, 5 GB equivalem a 5 000 MB. A aposta 10 usa MB/s para uma taxa, não para o tamanho de um arquivo.',
   'Na conta de tempo de transferência, usa unidades compatíveis de dados e divide pela taxa.'),
  corrente:group('Corrente elétrica',{'A':1,'mA':.001,'µA':1e-6},
   '1 A corresponde à passagem de 1 coulomb por segundo.',
   '78,74 mA ≈ 0,07874 A. É a ordem de grandeza da corrente da carga na aposta 28.',
   'Tensão em volts e corrente em ampères são grandezas diferentes. Para ligar as duas num resistor, usa sua resistência.'),
  tensao:group('Tensão elétrica',{'V':1,'mV':.001,'kV':1000},
   '1 V corresponde a 1 joule por coulomb. Os prefixos só mudam o tamanho da unidade.',
   '0,127 kV = 127 V.',
   'Para achar a diferença sobre um componente em série, usa as tensões nos pontos que o delimitam.'),
  resistencia:group('Resistência elétrica',{'Ω':1,'kΩ':1000,'MΩ':1e6},
   'Em um resistor ôhmico, 1 Ω equivale a 1 V por A.',
   '1,2 kΩ = 1 200 Ω. Em U = RI, usa Ω se I estiver em ampères e U em volts.',
   'Para resistores em paralelo, converter tudo para a mesma unidade vem antes da soma de inversos.'),
  'concentracao-massa':group('Concentração em massa',{'g/L':1,'mg/L':.001,'kg/m³':1,'g/mL':1000},
   'A concentração em massa mede a massa de soluto por volume de solução. Como 1 kg = 1 000 g e 1 m³ = 1 000 L, 1 kg/m³ = 1 g/L.',
   '250 mg/L = 0,25 g/L. Em 2 L, isso representa 0,50 g de soluto.',
   'Para converter g/L em mol/L, divide pela massa molar em g/mol. Porcentagens exigem saber qual razão foi usada.'),
 };
 const temperatureToKelvin=(value,unit)=>unit==='°C'?value+273.15:unit==='°F'?(value+459.67)*5/9:value;
 const temperatureFromKelvin=(value,unit)=>unit==='°C'?value-273.15:unit==='°F'?value*9/5-459.67:value;
 function convert(value,key,from,to){
  const entry=Object.hasOwn(groups,key)&&groups[key];
  if(!Number.isFinite(value)||!entry||!Object.hasOwn(entry.units,from)||!Object.hasOwn(entry.units,to))return null;
  const base=key==='temperatura'?temperatureToKelvin(value,from):value*entry.units[from];
  if(key==='temperatura'&&base<0)return null;
  const result=from===to?value:key==='temperatura'?temperatureFromKelvin(base,to):base/entry.units[to];
  return Number.isFinite(result)?result:null;
 }
 function unitOptions(entry){return Object.keys(entry.units).map(unit=>`<option value="${unit}">${unit}</option>`).join('');}
 function markup(){
  const options=unitOptions(groups.comprimento);
  return `<article id="d2Converter" class="d2-panel d2-converter">
   <p class="eyebrow">CONVERSÃO E ANÁLISE DIMENSIONAL</p>
   <h2 id="d2Focus" tabindex="-1">Laboratório de Grandezas e Conversões</h2>
   <p>Escolhe uma grandeza e acompanha como a unidade muda. A quantidade física continua a mesma.</p>
   <div class="d2-controls d2-converter-fields">
    <label>Grandeza<select id="d2ConvertGroup">${Object.entries(groups).map(([id,item])=>`<option value="${id}">${item.label}</option>`).join('')}</select></label>
    <label>Valor<input id="d2ConvertValue" inputmode="decimal" autocomplete="off" maxlength="28" value="1"></label>
    <label>De<select id="d2ConvertFrom">${options}</select></label>
    <label>Para<select id="d2ConvertTo">${options.replace('value="km"','value="km" selected')}</select></label>
   </div>
   <output id="d2ConvertResult" class="d2-convert-result" aria-live="polite">1 m = 0,001 km</output>
   <dl id="d2ConvertWhy" class="d2-explain">${explain(groups.comprimento)}</dl>
   <div class="d2-actions">
    <a class="outline" href="#dia-2/aulas/fisica/calor" data-study-route="dia-2/aulas/fisica/calor">Aula de escalas térmicas →</a>
    <a class="quiet" href="#dia-2/apostas" data-study-route="dia-2/apostas">Praticar nas apostas →</a>
   </div>
  </article>`;
 }
 function explain(entry){
  return `<dt>De onde vem</dt><dd>${entry.why}</dd><dt>Exemplo</dt><dd>${entry.example}</dd><dt>Cuidado</dt><dd>${entry.caution}</dd>`;
 }
 function bind(host){
  const update=event=>{
   const form=event.target.closest('#d2Converter');
   if(!form)return;
   const find=id=>form.querySelector('#d2Convert'+id);
   const groupKey=find('Group').value, entry=groups[groupKey], from=find('From'), to=find('To');
   if(event.target.id==='d2ConvertGroup'){
    from.innerHTML=to.innerHTML=unitOptions(entry);
    to.selectedIndex=1;
    find('Why').innerHTML=explain(entry);
   }
   const value=parse(find('Value').value), result=convert(value,groupKey,from.value,to.value);
   find('Result').textContent=result!==null?`${show(value)} ${from.value} = ${show(result)} ${to.value}`:
    Number.isFinite(value)&&groupKey==='temperatura'?'Escolhe uma temperatura no zero absoluto ou acima.':
     'Digita um número, como 12,5 ou 1e3.';
  };
  host.addEventListener('input',event=>{if(event.target.id==='d2ConvertValue')update(event);});
  host.addEventListener('change',event=>{if(['d2ConvertGroup','d2ConvertFrom','d2ConvertTo'].includes(event.target.id))update(event);});
 }
 globalThis.FurgConversions={convert,parse,show,groups,markup,bind};
})();
