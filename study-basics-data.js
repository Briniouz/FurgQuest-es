'use strict';
(() => {
 const extra=(id,title,terms,lesson,rule,meaning,when,symbols,example,trap)=>({
  id,title,terms,lesson,rule,meaning,when,symbols,example,trap,
  subject:lesson.split('/')[2],
 });
 const basicEntries=[
  {
   id:'joule', title:'Joule (J)', terms:['joule','joules','jaule','jaules','j'],
   lesson:'dia-2/aulas/fisica/energia',
   rule:'1 J = 1 N·m • 1 kJ = 1.000 J',
   meaning:'É a unidade de energia, trabalho e quantidade de calor no Sistema Internacional.',
   when:'Usa pra ler valores de energia em uma queda, trabalho de uma força ou calor transferido.',
   symbols:'J é joule, N é newton e m é metro. O prefixo k multiplica por mil.',
   example:['Uma força de 2 N empurra um carrinho por 3 m na mesma direção do movimento.','O trabalho é 2 × 3 = 6 J.'],
   trap:'J mede energia. W mede quanta energia é transferida por segundo.'
  },
  {
   id:'metro', title:'Metro (m)', terms:['metro','metros','m','centímetro','centimetros','cm','km','milímetro'],
   rule:'1 m = 100 cm = 1.000 mm • 1 km = 1.000 m',
   meaning:'É a unidade de comprimento. Mede altura, distância, posição ou o tamanho de um objeto.',
   when:'Usa quando a fórmula espera metros e o enunciado deu a medida em km, cm ou mm.',
   symbols:'m é metro, cm é centímetro, mm é milímetro e km é quilômetro.',
   example:['A mola foi comprimida em 8 cm.','Divide por 100. A deformação é 0,08 m.'],
   trap:'Esses fatores valem pra comprimento. Em área e volume, a potência do fator muda.'
  },
  {
   id:'area', title:'Área e metro quadrado', terms:['área','metro quadrado','metros quadrados','m2','m²','cm²','superfície'],
   rule:'Aretângulo = base × altura • 1 m² = 10.000 cm²',
   meaning:'Área mede o tamanho de uma superfície, como o chão de uma sala ou a abertura de um cano.',
   when:'Procura palavras como superfície, cobertura, seção do cano ou força por unidade de área.',
   symbols:'A é área. Dois comprimentos em metros multiplicados dão metros quadrados (m²).',
   example:['Uma placa retangular mede 2 m por 0,5 m.','A área é 2 × 0,5 = 1 m².'],
   trap:'Ao passar de m² pra cm², usa 100 × 100, porque as duas dimensões mudam de unidade.'
  },
  {
   id:'volume', title:'Volume e litro', terms:['volume','litro','litros','l','ml','mililitro','m3','m³','metro cúbico','capacidade','cm³'],
   rule:'Vcaixa = comprimento × largura × altura • 1 m³ = 1.000 L • 1 L = 1.000 mL • 1 mL = 1 cm³',
   meaning:'Volume mede o espaço ocupado. Litro e mililitro são comuns pra indicar a capacidade de recipientes.',
   when:'Usa em caixas, reservatórios, vazão e densidade. Converte tudo antes de misturar medidas.',
   symbols:'V é volume. As unidades mais comuns aqui são m³, L e mL.',
   example:['Um reservatório tem capacidade de 0,2 m³.','Multiplica por 1.000. Cabem 200 L.'],
   trap:'Dividir por mil passa de L pra m³. Multiplicar por mil faz o caminho inverso.'
  },
  {
   id:'tempo', title:'Segundo e intervalo de tempo', terms:['segundo','segundos','s','tempo','intervalo de tempo','delta t','minuto','hora'],
   rule:'Δt = tempo final − tempo inicial • 1 min = 60 s • 1 h = 3.600 s',
   meaning:'O segundo é a unidade de tempo. Δt é quanto tempo se passou entre dois instantes.',
   when:'Usa quando a questão dá um horário inicial e final, ou pede algo por segundo.',
   symbols:'t é o instante. Δt é o intervalo. s, min e h são as unidades de tempo.',
   example:['Uma bomba ligou no segundo 15 e desligou no segundo 45.','O intervalo foi 45 − 15 = 30 s.'],
   trap:'1,5 h significa uma hora e meia, ou 1 h e 30 min.'
  },
  {
   id:'massa', title:'Massa e quilograma', terms:['massa','quilograma','kg','grama','gramas','tonelada','conversão de massa'],
   rule:'1 kg = 1.000 g • 1 t = 1.000 kg',
   meaning:'Massa é a grandeza medida em kg na balança. Peso é a força gravitacional que age sobre essa massa.',
   when:'Converte g pra kg antes de usar fórmulas como F = ma ou Ec = mv²/2 no Sistema Internacional.',
   symbols:'m é massa na fórmula. kg é quilograma e g é grama quando escrito como unidade.',
   example:['Uma bola tem massa de 250 g.','Divide por 1.000. A massa é 0,25 kg.'],
   trap:'Peso sai em newtons. O valor medido em kg é a massa.'
  },
  {
   id:'deslocamento', title:'Deslocamento', terms:['deslocamento','delta s','delta x','posição inicial','posição final','distância percorrida','distancia e deslocamento'],
   rule:'Em linha reta, Δs = posição final − posição inicial',
   meaning:'É a mudança de posição. Em linha reta, o sinal mostra o sentido em relação ao eixo escolhido.',
   when:'Usa as posições do começo e do fim. Quando pedem distância percorrida, soma os trechos do caminho.',
   symbols:'Δs é o deslocamento em metros. Δ indica a diferença entre o fim e o começo.',
   example:['Tu anda 5 m pra frente e volta 5 m pro ponto inicial.','O deslocamento é 0 m. A distância percorrida é 5 + 5 = 10 m.'],
   trap:'Deslocamento zero significa que o começo e o fim coincidem. O caminho pode ter sido longo.'
  },
  {
   id:'velocidade', title:'Velocidade média e rapidez média', terms:['velocidade média','velocidade','rapidez média','rapidez','m/s','distância por tempo'],
   rule:'Em linha reta, vm = Δs/Δt • rapidez média = distância percorrida/Δt',
   meaning:'A velocidade média usa a mudança de posição. A rapidez média usa o caminho inteiro.',
   when:'Confere se a questão dá posições ou soma de trechos, e usa o tempo total pedido.',
   symbols:'Δs em m, Δt em s e vm em m/s. A velocidade média pode ter sinal em uma dimensão.',
   example:['Um corredor vai 100 m e volta ao começo em 40 s.','A velocidade média é 0/40 = 0 m/s. A rapidez média é 200/40 = 5 m/s.'],
   trap:'Se a pergunta é sobre a viagem inteira, inclui o tempo parado.'
  },
  {
   id:'aceleracao', title:'Aceleração média', terms:['aceleração média','aceleração','delta v','m/s²','variação de velocidade'],
   rule:'Em linha reta, am = Δv/Δt',
   meaning:'Diz quanto a velocidade mudou a cada segundo, em média.',
   when:'Procura velocidade inicial, velocidade final e tempo. Em linha reta, escolhe um sentido positivo.',
   symbols:'Δv em m/s, Δt em s e am em m/s².',
   example:['Um carrinho passa de 2 m/s pra 8 m/s em 3 s, sempre no mesmo sentido.','A aceleração média é (8 − 2)/3 = 2 m/s².'],
   trap:'Aceleração negativa indica sentido oposto ao eixo positivo. O efeito na rapidez depende do sentido da velocidade.'
  },
  {
   id:'kmh', title:'De km/h pra m/s', terms:['conversão de velocidade','km/h','km h','kmh','quilômetro por hora','3,6'],
   rule:'km/h → m/s, divide por 3,6 • m/s → km/h, multiplica por 3,6',
   meaning:'As duas unidades descrevem rapidez. O fator vem de 1 km = 1.000 m e 1 h = 3.600 s.',
   when:'Converte antes de usar uma fórmula com segundos e metros.',
   symbols:'km/h é quilômetro por hora e m/s é metro por segundo.',
   example:['Um carro está a 72 km/h.','72 ÷ 3,6 = 20 m/s.'],
   trap:'Confere o sentido da conversão. O número em km/h é maior para a mesma rapidez.'
  },
  {
   id:'newton', title:'Força e newton (N)', terms:['newton','n','força','força resultante','segunda lei de newton','peso'],
   rule:'Fres = m · a • 1 N = 1 kg·m/s² • peso = m · g',
   meaning:'Newton mede força. A força resultante é o efeito conjunto de todas as forças sobre o corpo.',
   when:'Usa Fres = ma quando pedem a resultante ou a aceleração. Perto da Terra, usa mg pra calcular o peso.',
   symbols:'Fres e peso em N, m em kg, a e g em m/s².',
   example:['Uma caixa de 3 kg acelera a 2 m/s².','A força resultante tem módulo de 3 × 2 = 6 N.'],
   trap:'Com várias forças, soma levando em conta os sentidos antes de usar Fres = ma.'
  },
  {
   id:'pressao', title:'Pressão e pascal (Pa)', terms:['pressão','pascal','pa','força por área','n/m²'],
   rule:'p = Fperpendicular/A • 1 Pa = 1 N/m²',
   meaning:'Pressão diz quanta força perpendicular é aplicada por unidade de área.',
   when:'Usa pra comparar apoios, pneus, lâminas ou objetos que fazem força sobre uma superfície.',
   symbols:'F em N, A em m² e p em pascals (Pa).',
   example:['Uma força de 20 N atua perpendicularmente sobre uma área de 0,5 m².','A pressão média é 20/0,5 = 40 Pa.'],
   trap:'Com a mesma força, uma área menor produz pressão maior.'
  },
  {
   id:'densidade', title:'Densidade', terms:['densidade','massa específica','massa por volume','kg/m³','g/cm³'],
   rule:'ρ = m/V • 1 g/cm³ = 1.000 kg/m³',
   meaning:'Densidade indica quanta massa cabe em certo volume.',
   when:'Usa ao comparar materiais, calcular a massa de um fluido ou analisar se um objeto flutua.',
   symbols:'ρ (rô) é densidade, m é massa e V é volume. No SI, a unidade é kg/m³.',
   example:['Um líquido tem 600 g em um volume de 300 cm³.','A densidade é 600/300 = 2 g/cm³.'],
   trap:'Pra usar a densidade com outras grandezas, mantém massa e volume em unidades compatíveis.'
  },
  {
   id:'potencia', title:'Potência e watt (W)', terms:['potência','potencia média','watt','watts','w','kw','energia por segundo'],
   rule:'Pmédia = E/Δt • 1 W = 1 J/s • 1 kW = 1.000 W',
   meaning:'Potência mede a energia transferida por unidade de tempo. A mesma energia entregue mais depressa dá maior potência média.',
   when:'Usa quando aparecem energia e tempo, ou quando pedem quão rápido um aparelho transfere energia.',
   symbols:'E em J, Δt em s e P em watts (W).',
   example:['Um motor transfere 600 J em 3 s.','A potência média é 600/3 = 200 W.'],
   trap:'W é unidade de potência. kWh é unidade de energia e combina potência com tempo.'
  },
  {
   id:'trabalho', title:'Trabalho de uma força', terms:['trabalho','trabalho de uma força','trabalho mecânico','f d','joule e trabalho'],
   rule:'Para força constante, trabalho = F · d · cos θ • Com força no sentido do deslocamento, trabalho = F · d',
   meaning:'O trabalho mede a energia transferida por uma força ao longo de um deslocamento.',
   when:'Identifica a força, o deslocamento e o ângulo entre os dois.',
   symbols:'F em N, d em m, θ é o ângulo entre força e deslocamento. Trabalho em J.',
   example:['Uma força de 5 N empurra uma caixa por 4 m na mesma direção e no mesmo sentido.','O trabalho vale 5 × 4 = 20 J.'],
   trap:'Se a força é perpendicular ao deslocamento, seu trabalho é zero.'
  },
  {
   id:'fluxo', title:'Fluxo', terms:['fluxo','fluxos','fluxo por área','taxa por área','por unidade de área'],
   rule:'Se o problema pede uma taxa por área, divide a taxa total pela área atravessada.',
   meaning:'Fluxo descreve o que atravessa uma superfície. Em problemas de escoamento, pode ser o volume total por tempo ou esse valor por área. O enunciado define qual grandeza usar.',
   when:'Destaca o que passa pela superfície e procura as expressões por segundo, por minuto e por metro quadrado.',
   symbols:'A unidade depende do que passa. Água pode aparecer em L/s. Potência por área pode aparecer em W/m².',
   example:['Uma fonte entrega 60 W uniformemente sobre 2 m².','A potência por área é 60/2 = 30 W/m².'],
   trap:'L/s informa o total por tempo. L/(s·m²) informa quanto passa por tempo e por área.'
  },
  {
   id:'vazao', title:'Fluxo de água e vazão', terms:['vazão','vazão de água','fluxo de água','água passando por um cano','taxa de escoamento','litros por minuto','litros por segundo','q'],
   rule:'Q = V/Δt • Q = A · v̄ se v̄ é a velocidade média perpendicular à seção',
   meaning:'A vazão diz quanto volume de água passa pela seção do cano em certo tempo.',
   when:'Se o enunciado fala em encher um recipiente, achar o tempo de enchimento ou medir litros por minuto, começa pela vazão.',
   symbols:'Q em L/s ou m³/s, V é volume e Δt é tempo. Em Q = A · v̄, usa A em m² e v̄ em m/s pra obter m³/s.',
   example:['Uma torneira enche um balde de 12 L em 6 min.','Q = 12/6 = 2 L/min. Se a vazão se mantiver, passam 10 L em 5 min.'],
   trap:'Pra obter L/s de L/min, divide por 60. Se pedirem por m², também divide pela área.'
  },
  {
   id:'fluxo-por-area', title:'Fluxo de água por área', terms:['fluxo de água por área','fluxo por área','densidade de fluxo','fluxo volumétrico','fluxo pela membrana','volume por área e tempo'],
   rule:'φ = Q/A = V/(A · Δt) • m³/(m²·s) = m/s',
   meaning:'É quanto volume atravessa, em média, cada unidade de área por unidade de tempo.',
   when:'Usa quando a questão menciona água atravessando uma membrana ou superfície e pede o fluxo por área.',
   symbols:'V é volume, Δt é tempo e A é área. Também pode aparecer em L/(min·m²).',
   example:['Passam 12 L de água por uma membrana de 2 m² em 3 min.','φ = 12/(2 × 3) = 2 L/(min·m²). A vazão total é 4 L/min.'],
   trap:'O tempo e a área ficam juntos no denominador. Divide pelos dois.'
  },
  {
   id:'temperatura', title:'Temperatura e escalas', terms:['temperatura','escalas termométricas','celsius','fahrenheit','kelvin','graus fahrenheit','celsius para kelvin','fahrenheit para celsius'],
   lesson:'dia-2/aulas/fisica/calor',
   rule:'C/5 = (F − 32)/9 • K = C + 273,15',
   meaning:'Temperatura descreve o estado térmico. Celsius, Fahrenheit e Kelvin são réguas que dão números diferentes para o mesmo estado.',
   when:'Usa para converter a leitura de um termômetro. Em leis de gases, costuma ser necessário usar Kelvin.',
   symbols:'C é a leitura em °C, F em °F e K em kelvins. Escreve K sem símbolo de grau.',
   example:['O termômetro marca 41 °F.','C = (41 − 32) × 5/9 = 5 °C. Somando 273,15, obtemos 278,15 K.'],
   trap:'Se a pergunta for sobre quanto a temperatura subiu ou caiu, usa a ficha de variação.'
  },
  {
   id:'variacao-termica', title:'Variação de temperatura', terms:['variação de temperatura','diferença de temperatura','delta t térmico','variação térmica','aumento de temperatura','intervalo de temperatura'],
   lesson:'dia-2/aulas/fisica/calor',
   rule:'ΔT = T final − T inicial • ΔF = (9/5)ΔC • ΔK = ΔC',
   meaning:'É quanto a temperatura mudou. Uma subida tem sinal positivo e uma queda tem sinal negativo.',
   when:'Procura as duas leituras e palavras como subiu, caiu, variação e diferença. Em Q = mcΔT, interessa a variação.',
   symbols:'Δ indica diferença. Um intervalo de 1 °C mede 1 K ou 1,8 °F.',
   example:['O aço esquenta de 20 °C a 120 °C.','A variação é 100 °C, igual a 100 K ou 180 °F de variação.'],
   trap:'Na diferença, o +32 e o +273,15 se cancelam. Eles só entram na conversão de leituras.'
  },
  {
   id:'calor', title:'Calor (Q)', terms:['calor','energia térmica transferida','calorimetria','calor sensível','calor especifico'],
   lesson:'dia-2/aulas/fisica/calor',
   rule:'Q = m · c · ΔT, sem mudança de fase',
   meaning:'Calor é energia transferida por diferença de temperatura.',
   when:'Usa esta relação quando um material aquece ou esfria sem mudar de estado.',
   symbols:'Q em J, m em kg, c em J/(kg·°C) e ΔT em °C. Com c em J/(kg·K), usa ΔT em K.',
   example:['Um bloco de 2 kg, com c = 500 J/(kg·°C), aquece 3 °C.','Ele recebe Q = 2 × 500 × 3 = 3.000 J.'],
   trap:'Se houver fusão ou ebulição, separa a etapa de mudança de fase.'
  },
  extra('energia-mecanica','Energia mecânica',['energia','energia mecânica','altura e velocidade','conservação de energia'],
   'dia-2/aulas/fisica/energia','Eₘ = mv²/2 + mgh + kx²/2 para as parcelas presentes',
   'Soma os estoques associados ao movimento, à altura e à deformação elástica.',
   'Procura dois estados do mesmo sistema e identifica o que muda de um para o outro.',
   'm em kg, v em m/s, h e x em m, k em N/m. Energia em J.',
   ['Um carrinho de 2 kg perde 5 m de altura sem atrito.','Perde 2 × 10 × 5 = 100 J de energia potencial e ganha 100 J de energia cinética.'],
   'A energia mecânica pode diminuir com dissipação. Confere a referência de altura e quais forças fazem trabalho.'),
  extra('mola','Energia potencial elástica',['mola comprimida','mola deformada','constante elástica','energia potencial elástica'],
   'dia-2/aulas/fisica/energia','E_el = kx²/2 para mola ideal',
   'É a energia armazenada quando uma mola ideal é alongada ou comprimida.',
   'Procura a deformação em relação ao comprimento natural e a constante elástica.',
   'k em N/m, x em m e E_el em J.',
   ['Uma mola de 100 N/m foi comprimida em 0,2 m.','E_el = 100 × 0,2²/2 = 2 J.'],
   'x mede a deformação. Para converter 20 cm em metros, divide por 100.'),
  extra('rendimento','Rendimento',['rendimento','energia útil','potência útil','eficiência'],
   'dia-2/aulas/fisica/consumo','η = E_útil/E_total = P_útil/P_total no mesmo intervalo',
   'É a parte da energia recebida que cumpre a função desejada.',
   'Procura o que entrou no sistema e qual saída é considerada útil.',
   'η é uma razão sem unidade. Multiplica por 100 para expressar em porcentagem.',
   ['Um motor recebe 500 W e entrega 400 W no eixo.','O rendimento é 400/500 = 0,8, ou 80%.'],
   'O denominador é o que entrou. Usa energias e potências de etapas ou intervalos correspondentes.'),
  extra('corrente','Corrente elétrica',['corrente','corrente elétrica','ampère','ampere','coulomb','carga por segundo'],
   'dia-2/aulas/fisica/circuitos','I_média = Δq/Δt • 1 A = 1 C/s',
   'É quanto de carga atravessa uma seção do circuito por unidade de tempo.',
   'Procura carga transferida, tempo e ramos do circuito.',
   'Δq em coulombs, Δt em segundos e I em ampères.',
   ['Atravessam 6 C em 2 s.','A corrente média é 3 A.'],
   'Em série, a corrente é a mesma em regime estacionário. Em paralelo, ela pode se dividir.'),
  extra('tensao','Tensão elétrica',['tensão elétrica','tensão','volt','diferença de potencial'],
   'dia-2/aulas/fisica/circuitos','1 V = 1 J/C • Para um resistor ôhmico, U = RI',
   'É a diferença de energia potencial elétrica por unidade de carga entre dois pontos.',
   'Compara os pontos de ligação da fonte e dos componentes.',
   'U em volts, R em ohms e I em ampères.',
   ['Uma carga de 3 C atravessa uma diferença de potencial de 4 V.','A variação em módulo é 3 × 4 = 12 J.'],
   'Em ramos ligados aos mesmos nós, a tensão é igual. A corrente depende de cada ramo.'),
  extra('resistencia','Resistência elétrica',['resistência elétrica','resistor','ohm','ohms'],
   'dia-2/aulas/fisica/circuitos','R = U/I • 1 Ω = 1 V/A',
   'Em um resistor ôhmico, mede quanta tensão é necessária para produzir uma certa corrente.',
   'Compara a inclinação no gráfico U × I ou analisa como os resistores se ligam.',
   'R em Ω, U em V e I em A.',
   ['Um resistor recebe 12 V e deixa passar 2 A.','R = 12/2 = 6 Ω.'],
   'Ao comparar correntes, verifica se a tensão é fixa. A resistência pode variar com a temperatura.'),
  extra('mol','Mol e massa molar',['mol','massa molar','quantidade de matéria','avogadro'],
   'dia-2/aulas/quimica/mol','n = m/M • N = n × N_A',
   'Mol é uma unidade de contagem de entidades químicas.',
   'Usa para passar de massa em gramas a quantidades de átomos, moléculas ou íons.',
   'n em mol, m em g, M em g/mol e N_A ≈ 6,022 × 10²³ por mol.',
   ['A massa molar da água é aproximadamente 18 g/mol.','36 g correspondem a 2 mol de moléculas de água.'],
   'Identifica a entidade pedida. Um mol de moléculas de água contém três mols de átomos ao todo.'),
  extra('concentracao','Concentração de solução',['concentração','g/l','mol/l','soluto','diluição'],
   'dia-2/aulas/quimica/solucoes','C = m/V • c = n/V • Na diluição, C₁V₁ = C₂V₂',
   'Diz quanto soluto existe em determinado volume de solução.',
   'Procura a quantidade de soluto e o volume final, sobretudo quando foi acrescentado solvente.',
   'C em g/L, c em mol/L e V em L quando as concentrações usam essas unidades.',
   ['Dissolvemos 8 g de sal em solução com volume final de 2 L.','A concentração em massa é 8/2 = 4 g/L.'],
   'A diluição conserva a quantidade de soluto se só o solvente é acrescentado. Volume final e volume de água adicionada são pedidos diferentes.'),
  extra('escala','Escala, razão e proporção',['escala','proporção','regra de três','escala de mapa','distância real'],
   'dia-2/aulas/matematica/proporcao','d_real = d_mapa × n em 1:n • A_real = A_mapa × n²',
   'Escala compara uma medida do desenho com a medida real, na mesma unidade.',
   'Confere se é comprimento, área ou volume e qual medida o enunciado fornece.',
   'O fator n é adimensional quando as unidades coincidem.',
   ['Num mapa 1:25 000, dois pontos estão separados por 4 cm.','No terreno, são 100 000 cm, ou 1 km em linha reta.'],
   'O fator de comprimento entra duas vezes na área. Uma barra gráfica mantém a proporção se a imagem inteira for ampliada.'),
  extra('porcentagem','Porcentagem',['porcentagem','percentual','variação relativa','ponto percentual'],
   'dia-2/aulas/matematica/porcentagens','p% = p/100 • Δ% = (final − inicial)/inicial × 100%',
   'Compara uma parte ou variação com uma base que representa 100%.',
   'Marca qual é a base em cada etapa, principalmente em aumentos e descontos sucessivos.',
   'O valor inicial precisa ser diferente de zero para calcular variação relativa.',
   ['Uma taxa vai de 20% a 30%.','A diferença é de 10 pontos percentuais. O aumento relativo é 10/20 = 50%.'],
   'Um aumento e um desconto de mesmo percentual normalmente usam bases diferentes.'),
 ].map(entry=>({...entry,id:'basico-'+entry.id,subject:entry.subject||'fisica',topic:'Básico'}));
 const entries=[...basicEntries,...(globalThis.FurgBiologyConcepts?.entries||[])];

 function term(value){
  return String(value??'').trim()
   .replace(/^(?:o que (?:[ée]|significa)(?: (?:um|uma|o|a))?|(?:qual (?:[ée] )?a )?(?:f[oó]rmula|definiç[ãa]o|unidade) d[eoa]|como calcular(?: (?:o|a))?)\s+/i,'')
   .replace(/^(?:(?:para|pra) que serve|como funciona|me explica)(?: (?:um|uma|o|a))?\s+|^(?:qual (?:[ée] )?a )?funç[ãa]o d(?:a|o|e)\s+/i,'')
   .replace(/[?!.]+$/,'').trim();
 }
 const norm=value=>term(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ');
 const aliases=new Map(entries.flatMap(entry=>[entry.title,...entry.terms].map(alias=>[norm(alias),entry])));
 const lookup=value=>aliases.get(norm(value));
 globalThis.FurgStudyBasics={entries,lookup,term};
})();
