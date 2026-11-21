'use strict';
// Simulado FURG 2026 · Versão C — questões autorais do BriniouzStudy, na mesma divisão de matérias do simulado da FURG.
// Gerado por build.js a partir das fontes; as figuras estão em vestibular-furg-figuras*.js.
(() => {
 const data = {
 "id": "furg-2026-c",
 "version": "C",
 "title": "Simulado FURG 2026 · Versão C",
 "subtitle": "Versão alternativa autoral, com a mesma divisão de matérias do simulado da FURG",
 "minutes": 330,
 "pdf": "simulados/simulado-furg-2026-versao-c.pdf",
 "lines": {
  "min": 5,
  "max": 10
 },
 "score": {
  "objective": 1,
  "discursive": 10,
  "total": 100,
  "note": "80 questões objetivas (1 ponto cada, respondendo a um só idioma) + 2 discursivas (10 pontos cada) = 100 pontos."
 },
 "sections": [
  {
   "id": "biologia",
   "label": "Biologia",
   "s": "biologia",
   "color": "#1f9d6b",
   "questions": [
    {
     "id": "vfc-bio-01",
     "n": 1,
     "t": "Ciclos biogeoquímicos",
     "lv": 2,
     "ctx": "Muitos agricultores alternam o plantio de milho com o de leguminosas, como soja e feijão. Com essa rotação, conseguem reduzir o uso de adubos nitrogenados nas safras seguintes.",
     "stem": "Essa prática se baseia no fato de que",
     "opts": [
      "as plantas absorvem o gás nitrogênio (N₂) do ar diretamente pelos estômatos e o acumulam no solo.",
      "as leguminosas produzem nitrogênio por meio da fotossíntese e o liberam pelas folhas.",
      "nas raízes das leguminosas vivem bactérias, como as do gênero Rhizobium, que fixam o N₂ atmosférico e o transformam em compostos nitrogenados aproveitáveis pelas plantas.",
      "a desnitrificação, realizada pelas leguminosas, transforma o nitrato do solo em gás nitrogênio, enriquecendo a terra.",
      "o milho elimina todo o nitrogênio do solo, que só é reposto pela água da chuva."
     ],
     "ans": "C",
     "why": "Bactérias fixadoras que vivem em nódulos nas raízes das leguminosas convertem o N₂ do ar em amônia, que vira compostos nitrogenados usados pelas plantas. Desnitrificação é o processo inverso (nitrato → N₂), feito por bactérias."
    },
    {
     "id": "vfc-bio-02",
     "n": 2,
     "t": "Enzimas",
     "lv": 2,
     "ctx": "O gráfico mostra a atividade de uma enzima digestiva humana em função da temperatura, em um experimento realizado em laboratório.",
     "fig": "c-bio-enzima",
     "stem": "A partir do gráfico, é correto afirmar que",
     "opts": [
      "acima de cerca de 40 °C, a atividade cai porque o calor altera a estrutura tridimensional da enzima e de seu sítio ativo (desnaturação).",
      "a atividade enzimática aumenta indefinidamente com a temperatura, pois as moléculas se movem mais rápido.",
      "a 10 °C, a enzima está desnaturada de forma irreversível, por isso sua atividade é baixa.",
      "a enzima é consumida durante a reação, o que explica a queda da atividade em temperaturas altas.",
      "a temperatura ótima dessa enzima é de 60 °C, valor em que a atividade é máxima."
     ],
     "ans": "A",
     "why": "A atividade cresce até o ótimo (perto de 37 °C) e depois despenca: o calor rompe as interações que mantêm a forma da proteína. No frio, a atividade é baixa, mas a enzima não está desnaturada e volta a funcionar se aquecida."
    },
    {
     "id": "vfc-bio-03",
     "n": 3,
     "t": "Genética",
     "lv": 3,
     "ctx": "Ana tem sangue tipo A e Rh positivo; seu pai é do tipo O e Rh negativo. Bruno tem sangue tipo B e Rh positivo; sua mãe é do tipo O e Rh negativo. Considere que o fator Rh é determinado por um gene com alelo dominante R (Rh positivo) e alelo recessivo r (Rh negativo).",
     "stem": "A probabilidade de o casal Ana e Bruno ter um filho com sangue tipo O e Rh negativo é de",
     "opts": [
      "1/16",
      "1/8",
      "3/16",
      "1/4",
      "1/2"
     ],
     "ans": "A",
     "why": "Ana recebeu i e r do pai: é IAi Rr. Bruno recebeu i e r da mãe: é IBi Rr. P(ii) = 1/2 · 1/2 = 1/4; P(rr) = 1/4. Como os genes são independentes: 1/4 · 1/4 = 1/16."
    },
    {
     "id": "vfc-bio-04",
     "n": 4,
     "t": "Genética molecular",
     "lv": 2,
     "ctx": "Um trecho da fita molde de um gene apresenta a sequência de bases 3’ TAC GGT CAA 5’. Durante a transcrição, essa fita serve de molde para a síntese de um RNA mensageiro.",
     "stem": "A sequência do RNA mensageiro produzido a partir desse trecho é",
     "opts": [
      "5’ ATG CCA GTT 3’",
      "5’ UAC GGU CAA 3’",
      "5’ AUG CCA GUU 3’",
      "5’ AUG GGU CAA 3’",
      "5’ TAC GGT CAA 3’"
     ],
     "ans": "C",
     "why": "O RNA é complementar à fita molde: A↔U, T↔A, C↔G e G↔C. TAC → AUG, GGT → CCA, CAA → GUU. No RNA não há timina (T), e sim uracila (U)."
    },
    {
     "id": "vfc-bio-05",
     "n": 5,
     "t": "Biomas",
     "lv": 1,
     "ctx": "A Caatinga, bioma exclusivamente brasileiro, ocupa grande parte do Nordeste. Seu clima é semiárido, com chuvas irregulares e longos períodos de estiagem.",
     "stem": "Uma adaptação das plantas da Caatinga relacionada a esse clima é",
     "opts": [
      "a presença de folhas grandes e finas, que aumentam a transpiração durante a seca.",
      "a ausência de raízes, já que a água é absorvida apenas pelas folhas.",
      "a manutenção de todas as folhas durante o ano, para aproveitar a umidade constante.",
      "a dependência de inundações periódicas para a germinação das sementes.",
      "a queda das folhas na estação seca, folhas reduzidas ou transformadas em espinhos e caules capazes de armazenar água."
     ],
     "ans": "E",
     "why": "Perder as folhas na seca (caducifolia), ter espinhos e armazenar água no caule (como os cactos) reduzem a perda de água por transpiração."
    },
    {
     "id": "vfc-bio-06",
     "n": 6,
     "t": "Imunologia",
     "lv": 2,
     "ctx": "Após ser picado por uma jararaca, um agricultor foi levado ao hospital, onde recebeu soro antiofídico. Semanas depois, o médico explicou que, se fosse picado novamente, ele precisaria receber o soro outra vez.",
     "stem": "A explicação do médico está correta porque o soro",
     "opts": [
      "contém anticorpos prontos, produzidos em outro animal, e confere imunização passiva, de ação rápida e temporária, sem formar memória imunológica.",
      "contém o veneno atenuado da serpente e estimula o organismo a produzir células de memória.",
      "é uma vacina que garante proteção permanente contra qualquer veneno.",
      "é formado por antibióticos que matam as bactérias presentes no veneno.",
      "estimula a produção de hemácias, que neutralizam o veneno."
     ],
     "ans": "A",
     "why": "O soro traz anticorpos já prontos (imunização passiva): age logo, mas os anticorpos são eliminados com o tempo e não há memória. A vacina é que estimula a produção própria de anticorpos e de memória (imunização ativa)."
    },
    {
     "id": "vfc-bio-07",
     "n": 7,
     "t": "Fotossíntese e respiração",
     "lv": 3,
     "ctx": "O gráfico mostra a taxa líquida de liberação de oxigênio por uma planta aquática em função da intensidade luminosa, a temperatura constante. Valores negativos indicam consumo de oxigênio.",
     "fig": "c-bio-luz",
     "stem": "Sobre o ponto indicado por P no gráfico, é correto afirmar que",
     "opts": [
      "nele a planta não realiza fotossíntese nem respiração.",
      "a planta realiza apenas respiração, sem fotossíntese.",
      "nele a velocidade da fotossíntese é igual à da respiração, e por isso não há liberação líquida de oxigênio.",
      "a fotossíntese atinge sua taxa máxima, que não aumenta mais com a luz.",
      "a planta libera mais oxigênio do que em qualquer outra intensidade luminosa."
     ],
     "ans": "C",
     "why": "P é o ponto de compensação luminoso: o O₂ produzido pela fotossíntese é todo consumido pela respiração. Abaixo dele, o saldo é negativo; muito acima, a curva se estabiliza (saturação)."
    },
    {
     "id": "vfc-bio-08",
     "n": 8,
     "t": "Fisiologia comparada",
     "lv": 2,
     "ctx": "Os animais eliminam resíduos nitrogenados em formas diferentes, como amônia, ureia e ácido úrico. Essas substâncias diferem em toxicidade, solubilidade e na quantidade de água necessária para sua eliminação.",
     "stem": "Assinale a alternativa que associa corretamente o animal ao principal resíduo nitrogenado e à vantagem adaptativa.",
     "opts": [
      "Peixe ósseo de água doce: ácido úrico, pois vive em ambiente com pouca água.",
      "Ave: amônia, que exige grande volume de água e é eliminada continuamente pelas brânquias.",
      "Mamífero: amônia, por ser a forma menos tóxica de excreção.",
      "Ave e réptil: ácido úrico, pouco solúvel e pouco tóxico, eliminado com pouca água, o que favorece a economia hídrica e o desenvolvimento no ovo com casca.",
      "Réptil: ureia, que é eliminada sem nenhuma perda de água."
     ],
     "ans": "D",
     "why": "Amônia é muito tóxica e precisa de muita água (peixes de água doce). Ureia, menos tóxica, é a dos mamíferos. Ácido úrico, quase insolúvel, poupa água e pode ser guardado dentro do ovo (aves e répteis)."
    }
   ]
  },
  {
   "id": "fisica",
   "label": "Física",
   "s": "fisica",
   "color": "#2f6fdb",
   "questions": [
    {
     "id": "vfc-fis-01",
     "n": 1,
     "t": "Lançamento horizontal",
     "lv": 2,
     "ctx": "Uma bolinha rola sobre uma mesa horizontal e a abandona com velocidade horizontal de 4,0 m/s, a 1,25 m de altura do chão, como mostra a figura. Despreze a resistência do ar e considere g = 10 m/s².",
     "fig": "c-fis-lancamento",
     "stem": "O tempo de queda e a distância horizontal x percorrida até tocar o chão são, respectivamente,",
     "opts": [
      "0,25 s e 1,0 m.",
      "0,50 s e 2,0 m.",
      "0,50 s e 4,0 m.",
      "1,0 s e 4,0 m.",
      "1,25 s e 5,0 m."
     ],
     "ans": "B",
     "why": "Na vertical: h = g·t²/2 → 1,25 = 5t² → t = 0,50 s. Na horizontal, a velocidade é constante: x = 4,0 · 0,50 = 2,0 m."
    },
    {
     "id": "vfc-fis-02",
     "n": 2,
     "t": "Movimento circular",
     "lv": 2,
     "ctx": "As pás de um ventilador giram com frequência de 1.200 rotações por minuto. Considere um ponto situado na ponta de uma das pás, a 0,20 m do eixo de rotação, e use π = 3.",
     "stem": "A velocidade linear desse ponto é de",
     "opts": [
      "24 m/s.",
      "48 m/s.",
      "120 m/s.",
      "240 m/s.",
      "1.440 m/s."
     ],
     "ans": "A",
     "why": "f = 1.200/60 = 20 Hz. v = 2πRf = 2 · 3 · 0,20 · 20 = 24 m/s."
    },
    {
     "id": "vfc-fis-03",
     "n": 3,
     "t": "Quantidade de movimento",
     "lv": 3,
     "ctx": "Em um trilho horizontal sem atrito, o carrinho A, de 2,0 kg, move-se a 3,0 m/s e colide com o carrinho B, de 1,0 kg, inicialmente em repouso. Após a colisão, os dois seguem juntos.",
     "fig": "c-fis-colisao",
     "stem": "A velocidade do conjunto após a colisão e a energia cinética dissipada no choque são, respectivamente,",
     "opts": [
      "1,0 m/s e 6,0 J.",
      "2,0 m/s e 0 J.",
      "2,0 m/s e 3,0 J.",
      "3,0 m/s e 4,5 J.",
      "6,0 m/s e 9,0 J."
     ],
     "ans": "C",
     "why": "Conservação da quantidade de movimento: 2,0 · 3,0 = 3,0 · v → v = 2,0 m/s. Energia antes: ½ · 2 · 3² = 9,0 J; depois: ½ · 3 · 2² = 6,0 J. Dissipada: 3,0 J (colisão inelástica)."
    },
    {
     "id": "vfc-fis-04",
     "n": 4,
     "t": "Oscilações",
     "lv": 2,
     "ctx": "Um pêndulo simples, formado por uma pequena esfera presa a um fio leve, oscila com pequena amplitude. Seu período é dado por T = 2π√(L/g), em que L é o comprimento do fio e g a aceleração da gravidade.",
     "stem": "Para que o período desse pêndulo dobre, no mesmo local, deve-se",
     "opts": [
      "dobrar a massa da esfera.",
      "quadruplicar o comprimento do fio.",
      "reduzir o comprimento do fio à metade.",
      "dobrar a amplitude da oscilação.",
      "dobrar o comprimento do fio."
     ],
     "ans": "B",
     "why": "T é proporcional a √L. Para T dobrar, √L precisa dobrar, então L deve ficar 4 vezes maior. A massa e a pequena amplitude não alteram o período."
    },
    {
     "id": "vfc-fis-05",
     "n": 5,
     "t": "Calorimetria",
     "lv": 3,
     "ctx": "Em um recipiente termicamente isolado, de capacidade térmica desprezível, colocam-se 100 g de gelo a 0 °C e 400 g de água a 40 °C. Dados: calor específico da água = 1,0 cal/g·°C; calor latente de fusão do gelo = 80 cal/g.",
     "stem": "A temperatura de equilíbrio do sistema é",
     "opts": [
      "0 °C.",
      "4 °C.",
      "8 °C.",
      "12 °C.",
      "16 °C."
     ],
     "ans": "E",
     "why": "Para derreter o gelo: 100 · 80 = 8.000 cal; a água pode ceder até 400 · 40 = 16.000 cal até 0 °C, então todo o gelo derrete. Equilíbrio: 400 · (40 − T) = 8.000 + 100 · T → 16.000 − 400T = 8.000 + 100T → T = 16 °C."
    },
    {
     "id": "vfc-fis-06",
     "n": 6,
     "t": "Termodinâmica",
     "lv": 2,
     "ctx": "Um inventor afirma ter construído um motor térmico que opera entre uma fonte quente a 527 °C e uma fonte fria a 127 °C e que converte em trabalho 60% do calor recebido da fonte quente.",
     "stem": "Sobre essa afirmação, é correto concluir que",
     "opts": [
      "é possível, pois o rendimento máximo entre essas temperaturas é de 76%.",
      "é impossível, pois nenhum motor térmico pode ter rendimento maior que 10%.",
      "é possível, desde que o motor funcione sem atrito.",
      "é impossível, pois o rendimento máximo (de Carnot) entre essas temperaturas é de 50%.",
      "é possível, pois o rendimento depende apenas da quantidade de combustível."
     ],
     "ans": "D",
     "why": "Em kelvin: Tq = 800 K e Tf = 400 K. η(Carnot) = 1 − 400/800 = 0,50. Nenhuma máquina real supera esse valor, então 60% é impossível. Usar °C direto (1 − 127/527 ≈ 76%) é o erro comum."
    },
    {
     "id": "vfc-fis-07",
     "n": 7,
     "t": "Eletromagnetismo",
     "lv": 2,
     "ctx": "Um transformador ideal tem 1.000 espiras no enrolamento primário e 50 espiras no secundário, como representado na figura. O primário é ligado a uma tomada de 220 V de corrente alternada.",
     "fig": "c-fis-transformador",
     "stem": "A tensão no secundário e a razão de o transformador não funcionar com uma bateria de corrente contínua são:",
     "opts": [
      "11 V; a corrente contínua não produz variação do fluxo magnético, necessária à indução no secundário.",
      "4.400 V; a corrente contínua não atravessa os fios de cobre.",
      "11 V; a corrente contínua tem tensão sempre menor que a alternada.",
      "220 V; o transformador só altera a corrente, não a tensão.",
      "4.400 V; a bateria descarrega o núcleo de ferro."
     ],
     "ans": "A",
     "why": "Vs/Vp = Ns/Np → Vs = 220 · 50/1.000 = 11 V. A indução (lei de Faraday) exige fluxo magnético variável; com corrente contínua constante, o fluxo não varia e não há tensão induzida."
    },
    {
     "id": "vfc-fis-08",
     "n": 8,
     "t": "Ondas",
     "lv": 2,
     "ctx": "Uma corda de 1,2 m de comprimento, com as duas extremidades fixas, vibra formando a onda estacionária representada na figura. A velocidade de propagação das ondas nessa corda é de 40 m/s.",
     "fig": "c-fis-corda",
     "stem": "A frequência de vibração da corda é",
     "opts": [
      "17 Hz.",
      "25 Hz.",
      "33 Hz.",
      "50 Hz.",
      "100 Hz."
     ],
     "ans": "D",
     "why": "A figura mostra 3 ventres: cada ventre ocupa meio comprimento de onda. 3 · λ/2 = 1,2 m → λ = 0,8 m. f = v/λ = 40/0,8 = 50 Hz."
    }
   ]
  },
  {
   "id": "quimica",
   "label": "Química",
   "s": "quimica",
   "color": "#8a4fd8",
   "questions": [
    {
     "id": "vfc-qui-01",
     "n": 1,
     "t": "Modelos atômicos",
     "lv": 1,
     "ctx": "As cores dos fogos de artifício são obtidas com sais de diferentes metais: compostos de estrôncio produzem vermelho; de bário, verde; de sódio, amarelo.",
     "stem": "O modelo atômico que explica a emissão de cores específicas por cada elemento é o de",
     "opts": [
      "Dalton, segundo o qual o átomo é uma esfera maciça e indivisível.",
      "Thomson, em que os elétrons estão incrustados em uma massa positiva, como passas em um pudim.",
      "Bohr, em que os elétrons absorvem energia, saltam para níveis mais externos e, ao retornar, emitem luz com energia característica de cada elemento.",
      "Rutherford, que explica as cores pela variação do tamanho do núcleo durante a queima.",
      "Demócrito, que associava cada cor a um formato de átomo."
     ],
     "ans": "C",
     "why": "No modelo de Bohr, os elétrons ocupam níveis de energia definidos. Ao voltar para níveis mais internos, liberam fótons com energias (cores) próprias de cada elemento."
    },
    {
     "id": "vfc-qui-02",
     "n": 2,
     "t": "Tabela periódica",
     "lv": 2,
     "ctx": "Considere os elementos sódio (Na, Z = 11), cloro (Cl, Z = 17) e potássio (K, Z = 19).",
     "stem": "Com base nas propriedades periódicas, é correto afirmar que",
     "opts": [
      "o raio atômico do sódio é maior que o do potássio, pois o sódio tem mais camadas eletrônicas.",
      "o raio atômico do potássio é maior que o do sódio, e a energia de ionização do cloro é maior que a do sódio.",
      "o cloro tem a menor energia de ionização dos três, pois é um ametal.",
      "os três elementos estão no mesmo período e têm o mesmo número de camadas.",
      "o sódio e o cloro estão na mesma família, por isso formam íons de mesma carga."
     ],
     "ans": "B",
     "why": "K está abaixo do Na na família 1 (uma camada a mais): raio maior. No 3º período, o Cl tem carga nuclear maior e raio menor que o Na, então segura mais os elétrons: maior energia de ionização."
    },
    {
     "id": "vfc-qui-03",
     "n": 3,
     "t": "Funções inorgânicas",
     "lv": 2,
     "ctx": "A queima de carvão e de derivados de petróleo libera óxidos de enxofre e de nitrogênio. Na atmosfera, esses gases participam de reações como:\nSO₂ + ½ O₂ → SO₃\nSO₃ + H₂O → H₂SO₄",
     "stem": "Sobre o fenômeno descrito, é correto afirmar que",
     "opts": [
      "o SO₂ e o NO₂ são óxidos básicos, que tornam a chuva alcalina.",
      "o monóxido de carbono é o principal responsável pela chuva ácida.",
      "o H₂SO₄ é uma base forte, que corrói monumentos de mármore.",
      "a chuva ácida tem pH maior que 7, por causa da formação de ácido sulfúrico.",
      "os óxidos de enxofre e de nitrogênio são óxidos ácidos, que reagem com a água formando ácidos e contribuem para a chuva ácida, cujo efeito em lagos pode ser atenuado com calcário (CaCO₃)."
     ],
     "ans": "E",
     "why": "SO₂, SO₃ e NO₂ são óxidos ácidos: com a água formam ácidos (H₂SO₄, HNO₃), e a chuva fica com pH abaixo do normal. Substâncias de caráter básico, como o calcário, neutralizam parte da acidez."
    },
    {
     "id": "vfc-qui-04",
     "n": 4,
     "t": "Gases",
     "lv": 2,
     "ctx": "Antes de uma viagem, o pneu de um carro foi calibrado com pressão de 2,0 atm, a 27 °C. Depois de um longo trecho rodando, a temperatura do ar dentro do pneu chegou a 57 °C. Considere o volume do pneu constante e o ar como gás ideal.",
     "stem": "A pressão do ar no pneu, ao final do trecho, é de",
     "opts": [
      "1,8 atm.",
      "2,0 atm.",
      "2,1 atm.",
      "2,2 atm.",
      "4,2 atm."
     ],
     "ans": "D",
     "why": "A volume constante: P₁/T₁ = P₂/T₂, com temperaturas em kelvin. 2,0/300 = P₂/330 → P₂ = 2,2 atm. Usar °C (2,0 · 57/27 ≈ 4,2) é o erro comum."
    },
    {
     "id": "vfc-qui-05",
     "n": 5,
     "t": "Propriedades coligativas",
     "lv": 2,
     "ctx": "Três soluções aquosas, todas com concentração 0,1 mol/L, foram preparadas com glicose (C₆H₁₂O₆), cloreto de sódio (NaCl) e cloreto de cálcio (CaCl₂). Considere que os sais se dissociam totalmente.",
     "stem": "Comparando as três soluções, é correto afirmar que",
     "opts": [
      "a solução de CaCl₂ tem a menor temperatura de congelamento, pois libera o maior número de partículas dissolvidas.",
      "as três soluções congelam na mesma temperatura, pois têm a mesma concentração em mol/L.",
      "a solução de NaCl tem a maior temperatura de ebulição, pois o sódio é um metal.",
      "a solução de glicose tem a menor temperatura de congelamento, por ter a maior massa molar.",
      "a adição de soluto aumenta a pressão de vapor da água."
     ],
     "ans": "A",
     "why": "Propriedades coligativas dependem do número de partículas: glicose = 0,1; NaCl = 0,2 (Na⁺ + Cl⁻); CaCl₂ = 0,3 mol/L de partículas (Ca²⁺ + 2 Cl⁻). Mais partículas → maior abaixamento do ponto de congelamento e da pressão de vapor."
    },
    {
     "id": "vfc-qui-06",
     "n": 6,
     "t": "Cinética química",
     "lv": 3,
     "ctx": "Para a reação A + B → C, foram realizados três experimentos, à mesma temperatura, medindo-se a velocidade inicial da reação.",
     "table": [
      [
       "Experimento",
       "[A] (mol/L)",
       "[B] (mol/L)",
       "Velocidade (mol/L·s)"
      ],
      [
       "1",
       "0,10",
       "0,10",
       "2,0 × 10⁻³"
      ],
      [
       "2",
       "0,20",
       "0,10",
       "8,0 × 10⁻³"
      ],
      [
       "3",
       "0,10",
       "0,20",
       "4,0 × 10⁻³"
      ]
     ],
     "stem": "A lei de velocidade dessa reação é",
     "opts": [
      "v = k[A][B].",
      "v = k[A]²[B].",
      "v = k[A][B]².",
      "v = k[A]².",
      "v = k[A]²[B]²."
     ],
     "ans": "B",
     "why": "De 1 para 2, [A] dobra e v quadruplica: ordem 2 em A. De 1 para 3, [B] dobra e v dobra: ordem 1 em B. Logo, v = k[A]²[B]."
    },
    {
     "id": "vfc-qui-07",
     "n": 7,
     "t": "Eletroquímica",
     "lv": 2,
     "ctx": "A figura representa uma pilha formada por um eletrodo de prata mergulhado em solução de Ag⁺ e um eletrodo de cobre mergulhado em solução de Cu²⁺, ligados por uma ponte salina. Potenciais-padrão de redução: Ag⁺ + e⁻ → Ag   E° = +0,80 V; Cu²⁺ + 2 e⁻ → Cu   E° = +0,34 V.",
     "fig": "c-qui-pilha",
     "stem": "Sobre essa pilha, é correto afirmar que",
     "opts": [
      "o cobre é o cátodo, e os elétrons fluem da prata para o cobre.",
      "a diferença de potencial da pilha é de 1,14 V.",
      "a prata sofre oxidação, e a massa do eletrodo de prata diminui.",
      "a ponte salina serve para transportar elétrons de um eletrodo ao outro.",
      "o cobre é o ânodo e sofre oxidação, os elétrons fluem do cobre para a prata e a diferença de potencial é de 0,46 V."
     ],
     "ans": "E",
     "why": "Quem tem maior potencial de redução (Ag⁺) reduz; o cobre oxida (ânodo). ddp = 0,80 − 0,34 = 0,46 V. Os elétrons vão pelo fio do Cu para a Ag; a ponte salina transporta íons, não elétrons."
    },
    {
     "id": "vfc-qui-08",
     "n": 8,
     "t": "Polímeros",
     "lv": 2,
     "ctx": "Sacolas, garrafas e fibras sintéticas são feitas de polímeros, macromoléculas formadas pela união de muitas unidades menores (monômeros). O polietileno é obtido a partir do eteno (CH₂=CH₂), e o PET é um poliéster.",
     "stem": "Sobre esses materiais, é correto afirmar que",
     "opts": [
      "o PET é obtido por adição de moléculas de eteno.",
      "o polietileno e o PET são polímeros naturais, produzidos por plantas.",
      "o polietileno é obtido por adição: as ligações duplas do eteno se abrem e as moléculas se ligam em cadeia, enquanto o PET é formado por condensação, com liberação de moléculas pequenas como a água.",
      "os polímeros são substâncias inorgânicas, sem átomos de carbono.",
      "por serem formados por moléculas grandes, os plásticos se decompõem rapidamente no ambiente."
     ],
     "ans": "C",
     "why": "Polímeros de adição (polietileno) surgem da abertura de ligações duplas; polímeros de condensação (poliésteres como o PET, poliamidas como o náilon) liberam moléculas pequenas na formação. Os plásticos persistem por muito tempo no ambiente."
    }
   ]
  },
  {
   "id": "matematica",
   "label": "Matemática",
   "s": "matematica",
   "color": "#d9730d",
   "questions": [
    {
     "id": "vfc-mat-01",
     "n": 1,
     "t": "Progressões",
     "lv": 2,
     "ctx": "Uma campanha de doação de livros começou com 2 pessoas no primeiro dia. A cada dia seguinte, o número de novas pessoas que aderiram foi o triplo do número de novas adesões do dia anterior.",
     "stem": "Mantido esse padrão, o total de pessoas que aderiram à campanha nos 5 primeiros dias é",
     "opts": [
      "162.",
      "242.",
      "243.",
      "360.",
      "486."
     ],
     "ans": "B",
     "why": "Adesões por dia: 2, 6, 18, 54, 162 (PG de razão 3). Soma: Sₙ = a₁(qⁿ − 1)/(q − 1) = 2(3⁵ − 1)/2 = 242. O valor 162 é só o 5º termo."
    },
    {
     "id": "vfc-mat-02",
     "n": 2,
     "t": "Função quadrática",
     "lv": 2,
     "ctx": "Em uma aula de Física, uma bola é lançada verticalmente para cima, e sua altura h, em metros, em função do tempo t, em segundos, é dada por h(t) = −5t² + 20t + 1,5. O gráfico representa essa função.",
     "fig": "c-mat-parabola",
     "stem": "O instante em que a bola atinge a altura máxima e o valor dessa altura são, respectivamente,",
     "opts": [
      "1 s e 16,5 m.",
      "2 s e 20,0 m.",
      "4 s e 1,5 m.",
      "4 s e 21,5 m.",
      "2 s e 21,5 m."
     ],
     "ans": "E",
     "why": "Vértice: t = −b/(2a) = −20/(−10) = 2 s. h(2) = −5·4 + 20·2 + 1,5 = −20 + 40 + 1,5 = 21,5 m."
    },
    {
     "id": "vfc-mat-03",
     "n": 3,
     "t": "Porcentagem",
     "lv": 1,
     "ctx": "Uma loja aumentou em 25% o preço de um tênis que custava R$ 200,00. Semanas depois, anunciou uma promoção com 20% de desconto sobre o novo preço.",
     "stem": "Durante a promoção, o tênis passou a custar",
     "opts": [
      "R$ 180,00.",
      "R$ 190,00.",
      "R$ 192,00.",
      "R$ 195,00.",
      "R$ 200,00."
     ],
     "ans": "E",
     "why": "200 · 1,25 = 250; 250 · 0,80 = 200. Aumentos e descontos percentuais se multiplicam: 1,25 · 0,80 = 1, então o preço volta a R$ 200,00 — não dá para “descontar 5%” somando as porcentagens."
    },
    {
     "id": "vfc-mat-04",
     "n": 4,
     "t": "Geometria plana",
     "lv": 2,
     "ctx": "Em certo horário, um poste vertical de 6 m de altura projeta no chão uma sombra de 4 m. No mesmo instante, um prédio próximo projeta uma sombra de 18 m, como mostra a figura. Considere os raios solares paralelos e o terreno plano.",
     "fig": "c-mat-sombra",
     "stem": "A altura do prédio é de",
     "opts": [
      "12 m.",
      "18 m.",
      "24 m.",
      "27 m.",
      "30 m."
     ],
     "ans": "D",
     "why": "Os triângulos formados são semelhantes: altura/sombra é a mesma razão. 6/4 = H/18 → H = 27 m."
    },
    {
     "id": "vfc-mat-05",
     "n": 5,
     "t": "Números complexos",
     "lv": 2,
     "ctx": "Considere os números complexos z₁ = 2 + i e z₂ = 1 − i, em que i é a unidade imaginária (i² = −1). Seja z = z₁ · z₂.",
     "stem": "O número z e o seu módulo são, respectivamente,",
     "opts": [
      "3 + i e √10.",
      "1 − i e √2.",
      "3 − i e √10.",
      "2 − i e √5.",
      "3 − i e 10."
     ],
     "ans": "C",
     "why": "(2 + i)(1 − i) = 2 − 2i + i − i² = 2 − i + 1 = 3 − i. |z| = √(3² + (−1)²) = √10."
    },
    {
     "id": "vfc-mat-06",
     "n": 6,
     "t": "Matrizes e determinantes",
     "lv": 3,
     "ctx": "Considere a matriz quadrada M = [[x, 2], [3, x − 1]], em que a primeira linha é formada por x e 2, e a segunda, por 3 e x − 1.",
     "stem": "Os valores reais de x para os quais o determinante de M é igual a 6 são",
     "opts": [
      "−4 e 3.",
      "−3 e 4.",
      "−2 e 6.",
      "2 e 6.",
      "3 e 4."
     ],
     "ans": "B",
     "why": "det M = x(x − 1) − 2·3 = x² − x − 6. Igualando a 6: x² − x − 12 = 0 → (x − 4)(x + 3) = 0 → x = 4 ou x = −3."
    },
    {
     "id": "vfc-mat-07",
     "n": 7,
     "t": "Trigonometria",
     "lv": 3,
     "ctx": "O gráfico representa, de forma simplificada, a altura h da maré, em metros, em um ponto do canal de acesso a um porto, ao longo de um dia (t em horas, a partir da meia-noite).",
     "fig": "c-mat-mare",
     "stem": "A função que melhor representa a altura da maré é",
     "opts": [
      "h(t) = 1,5 + 0,5 · sen(πt/12).",
      "h(t) = 2,0 + 0,5 · sen(πt/6).",
      "h(t) = 1,5 + sen(πt/6).",
      "h(t) = 1,5 + 0,5 · sen(πt/6).",
      "h(t) = 0,5 + 1,5 · sen(πt/6)."
     ],
     "ans": "D",
     "why": "O gráfico oscila entre 1,0 m e 2,0 m: valor médio 1,5 e amplitude 0,5. O período é 12 h, então o coeficiente de t é 2π/12 = π/6. Em t = 0, h = 1,5 e a curva sobe, como no seno."
    },
    {
     "id": "vfc-mat-08",
     "n": 8,
     "t": "Geometria analítica",
     "lv": 2,
     "ctx": "No plano cartesiano da figura, a reta r passa pelos pontos A(1, 2) e B(3, 8).",
     "fig": "c-mat-reta",
     "stem": "A equação da reta r e o ponto em que ela corta o eixo das ordenadas são, respectivamente,",
     "opts": [
      "y = 3x − 1 e (0, −1).",
      "y = 2x e (0, 0).",
      "y = 3x + 1 e (0, 1).",
      "y = x + 1 e (0, 1).",
      "y = 6x − 4 e (0, −4)."
     ],
     "ans": "A",
     "why": "Coeficiente angular: (8 − 2)/(3 − 1) = 3. Com A: 2 = 3·1 + b → b = −1. Logo, y = 3x − 1, que corta o eixo y em (0, −1)."
    }
   ]
  },
  {
   "id": "filosofia",
   "label": "Filosofia",
   "s": "humanas",
   "color": "#b0453a",
   "questions": [
    {
     "id": "vfc-filo-01",
     "n": 1,
     "t": "Sofistas e Sócrates",
     "lv": 2,
     "ctx": "Na Atenas do século V a.C., os sofistas cobravam para ensinar a arte de argumentar nas assembleias e nos tribunais. Protágoras, um dos mais conhecidos, teria afirmado que “o homem é a medida de todas as coisas”. Sócrates, por sua vez, não cobrava por suas conversas.",
     "stem": "Sobre o debate entre os sofistas e Sócrates, é correto afirmar que",
     "opts": [
      "os sofistas defendiam verdades absolutas e eternas, enquanto Sócrates afirmava que tudo é relativo.",
      "os sofistas valorizavam a retórica e um certo relativismo, enquanto Sócrates, por meio do diálogo, buscava definições que valessem universalmente, como a do que é a justiça.",
      "Sócrates escreveu diversos tratados em que registrou seu método filosófico.",
      "os sofistas e Sócrates rejeitavam qualquer participação na vida política da cidade.",
      "Sócrates considerava a persuasão mais importante que a verdade."
     ],
     "ans": "B",
     "why": "Os sofistas ensinavam a persuadir, e a frase de Protágoras expressa um relativismo. Sócrates, que nada escreveu, interrogava os interlocutores em busca de definições universais."
    },
    {
     "id": "vfc-filo-02",
     "n": 2,
     "t": "Teoria do conhecimento",
     "lv": 3,
     "ctx": "David Hume observou que, ao ver uma bola de bilhar atingir outra, não percebemos nenhuma força ou conexão necessária entre os dois movimentos: vemos apenas que um acontecimento costuma vir depois do outro.",
     "stem": "Para Hume, a ideia de causa e efeito",
     "opts": [
      "é uma ideia inata, presente na mente antes de qualquer experiência.",
      "é revelada pela fé, já que a razão não alcança o mundo natural.",
      "é demonstrada com certeza absoluta pela matemática.",
      "resulta do hábito de observar repetidamente certos acontecimentos em sequência, e não de uma conexão necessária conhecida pela razão.",
      "é uma ilusão que deve ser abandonada pelas ciências."
     ],
     "ans": "D",
     "why": "Empirista, Hume afirma que a expectativa de que o efeito siga a causa vem do costume (hábito). Ele não nega a utilidade da ideia, mas questiona sua necessidade lógica."
    },
    {
     "id": "vfc-filo-03",
     "n": 3,
     "t": "Filosofia política",
     "lv": 2,
     "ctx": "No Leviatã (1651), Thomas Hobbes imagina como seria a vida humana sem um poder comum capaz de manter todos em respeito: cada um teria direito a tudo, e a vida seria “solitária, pobre, sórdida, brutal e curta”.",
     "stem": "Para superar essa situação, Hobbes defende que",
     "opts": [
      "a autoridade política derive exclusivamente do direito divino dos reis.",
      "o poder seja dividido em três esferas independentes, como propôs Montesquieu.",
      "o Estado seja abolido, pois a natureza humana é boa e solidária.",
      "cada pessoa faça justiça por conta própria, conforme sua força.",
      "os indivíduos firmem um contrato, transferindo seus direitos a um soberano forte, capaz de garantir a paz e a segurança."
     ],
     "ans": "E",
     "why": "No estado de natureza, há “guerra de todos contra todos”. Por medo e desejo de segurança, os indivíduos aceitam um pacto e instituem um soberano com amplo poder."
    },
    {
     "id": "vfc-filo-04",
     "n": 4,
     "t": "Ética",
     "lv": 3,
     "ctx": "Ao acompanhar o julgamento de Adolf Eichmann, um dos organizadores da deportação de judeus para os campos de extermínio nazistas, Hannah Arendt se surpreendeu: em vez de um monstro, encontrou um burocrata comum, preocupado em cumprir ordens e fazer carreira.",
     "stem": "A expressão “banalidade do mal”, criada por Arendt a partir desse caso, indica que",
     "opts": [
      "grandes crimes podem ser cometidos por pessoas comuns que renunciam a pensar e a julgar por si mesmas, limitando-se a obedecer.",
      "apenas pessoas com perturbações mentais são capazes de cometer grandes crimes.",
      "a obediência às leis vigentes isenta o indivíduo de qualquer responsabilidade moral.",
      "o mal só existe em sociedades sem leis escritas.",
      "os crimes do nazismo foram pouco graves e devem ser esquecidos."
     ],
     "ans": "A",
     "why": "Arendt não diminui os crimes: mostra que eles foram possíveis pela ausência de pensamento e de juízo crítico de pessoas comuns inseridas numa engrenagem burocrática."
    }
   ]
  },
  {
   "id": "sociologia",
   "label": "Sociologia",
   "s": "humanas",
   "color": "#c2551d",
   "questions": [
    {
     "id": "vfc-soc-05",
     "n": 5,
     "t": "Educação e desigualdade",
     "lv": 2,
     "ctx": "Pierre Bourdieu observou que estudantes de famílias com mais acesso a livros, museus, viagens e conversas sobre temas escolares costumam ter melhor desempenho na escola, que valoriza justamente esses conhecimentos e modos de falar.",
     "stem": "Para Bourdieu, esse fenômeno mostra que",
     "opts": [
      "o desempenho escolar depende apenas do talento natural de cada estudante.",
      "a escola tende a reproduzir desigualdades, pois valoriza o capital cultural das classes dominantes, apresentando como mérito individual o que também é herança social.",
      "a escola elimina completamente as diferenças sociais entre os alunos.",
      "o capital cultural é transmitido apenas pela genética.",
      "a renda das famílias não tem relação com as oportunidades educacionais."
     ],
     "ans": "B",
     "why": "O capital cultural (saberes, gostos, linguagem) é herdado na família e valorizado pela escola, o que ajuda a reproduzir as desigualdades sob a aparência de mérito."
    },
    {
     "id": "vfc-soc-06",
     "n": 6,
     "t": "Gênero e trabalho",
     "lv": 2,
     "ctx": "O gráfico mostra, de forma aproximada, a média de horas semanais dedicadas a afazeres domésticos e ao cuidado de pessoas no Brasil, por sexo, segundo levantamento do IBGE de 2022.",
     "fig": "c-soc-horas",
     "stem": "A leitura sociológica desses dados permite afirmar que",
     "opts": [
      "a diferença se explica por características biológicas, que tornam as mulheres naturalmente mais aptas às tarefas domésticas.",
      "homens e mulheres dividem igualmente o trabalho doméstico no Brasil.",
      "o trabalho doméstico não remunerado não tem relação com as oportunidades no mercado de trabalho.",
      "a desigualdade é uma construção social e histórica da divisão sexual do trabalho, que gera dupla jornada para muitas mulheres e limita seu tempo para estudo, trabalho remunerado e lazer.",
      "a divisão das tarefas domésticas é igual em todas as sociedades e épocas."
     ],
     "ans": "D",
     "why": "As mulheres dedicam quase o dobro do tempo dos homens a essas tarefas. A sociologia explica essa diferença pela divisão sexual do trabalho, construída socialmente, e não pela biologia."
    },
    {
     "id": "vfc-soc-07",
     "n": 7,
     "t": "Trabalho e tecnologia",
     "lv": 2,
     "ctx": "Milhões de pessoas trabalham hoje como entregadores e motoristas de aplicativos. As empresas afirmam que elas são “parceiras” e “donas do próprio tempo”, mas os pagamentos, as avaliações e a distribuição das corridas são definidos por algoritmos das plataformas.",
     "stem": "Do ponto de vista da sociologia do trabalho, esse fenômeno, chamado de plataformização ou “uberização”, caracteriza-se",
     "opts": [
      "pela garantia de todos os direitos trabalhistas, como férias remuneradas e décimo terceiro salário.",
      "pela completa autonomia do trabalhador, sem qualquer forma de controle sobre sua atividade.",
      "pelo controle do trabalho por meio de algoritmos e pela transferência de custos e riscos ao trabalhador, frequentemente sem a proteção social do emprego formal.",
      "pelo fim do trabalho humano, substituído inteiramente por máquinas.",
      "pela redução das jornadas de trabalho a menos de quatro horas diárias para todos."
     ],
     "ans": "C",
     "why": "Há controle (algoritmos, avaliações), mas sem os direitos do vínculo formal; o trabalhador arca com veículo, combustível e riscos. Por isso se fala em precarização."
    },
    {
     "id": "vfc-soc-08",
     "n": 8,
     "t": "Desigualdade racial",
     "lv": 2,
     "ctx": "Pesquisas mostram que, no Brasil, pessoas negras recebem, em média, salários menores, são maioria entre as vítimas de homicídio e estão sub-representadas em cargos de direção, mesmo quando têm escolaridade semelhante à de pessoas brancas.",
     "stem": "O conceito de racismo estrutural ajuda a compreender esses dados porque",
     "opts": [
      "afirma que o racismo se limita a ofensas individuais e conscientes.",
      "propõe que as desigualdades raciais são naturais e inevitáveis.",
      "demonstra que as diferenças de renda se explicam apenas pelo mérito individual.",
      "sustenta que o racismo deixou de existir no Brasil com a abolição.",
      "indica que as desigualdades raciais são reproduzidas pelo funcionamento cotidiano de instituições, da economia e da política, e não apenas por atos isolados de preconceito."
     ],
     "ans": "E",
     "why": "O racismo estrutural está nas regras, práticas e instituições que, mesmo sem intenção declarada, mantêm desvantagens para a população negra."
    }
   ]
  },
  {
   "id": "geografia",
   "label": "Geografia",
   "s": "humanas",
   "color": "#2a8c8c",
   "questions": [
    {
     "id": "vfc-geo-01",
     "n": 1,
     "t": "Fusos horários",
     "lv": 2,
     "ctx": "Um voo sai de São Paulo às 10h de uma segunda-feira (horário de Brasília, UTC−3) com destino a Tóquio (UTC+9). Com as escalas, a viagem dura 24 horas.",
     "stem": "No horário local de Tóquio, o avião chega",
     "opts": [
      "às 10h de terça-feira.",
      "às 22h de segunda-feira.",
      "às 22h de terça-feira.",
      "às 10h de quarta-feira.",
      "às 4h de quarta-feira."
     ],
     "ans": "C",
     "why": "Pelo horário de Brasília, a chegada é às 10h de terça. Tóquio está 12 horas adiantada (de −3 a +9): 10h + 12h = 22h de terça-feira."
    },
    {
     "id": "vfc-geo-02",
     "n": 2,
     "t": "Coordenadas geográficas",
     "lv": 2,
     "ctx": "O mapa esquemático mostra a rede de paralelos e meridianos, com destaque para a Linha do Equador, o Trópico de Capricórnio e o Meridiano de Greenwich. O ponto P representa uma cidade do sul do Brasil.",
     "fig": "c-geo-coordenadas",
     "stem": "As coordenadas aproximadas do ponto P e sua localização em relação aos hemisférios e às zonas térmicas são:",
     "opts": [
      "30° N e 50° L; hemisférios Norte e Oriental; zona tropical.",
      "50° S e 30° O; hemisférios Sul e Ocidental; zona polar.",
      "30° S e 50° O; hemisférios Norte e Ocidental; zona temperada do Norte.",
      "30° S e 50° L; hemisférios Sul e Oriental; zona tropical.",
      "30° S e 50° O; hemisférios Sul e Ocidental; zona temperada do Sul."
     ],
     "ans": "E",
     "why": "P está abaixo do Equador (Sul) e à esquerda de Greenwich (Oeste): 30° S, 50° O. Como fica ao sul do Trópico de Capricórnio (cerca de 23° S), está na zona temperada do Sul."
    },
    {
     "id": "vfc-geo-03",
     "n": 3,
     "t": "Clima urbano",
     "lv": 2,
     "ctx": "O gráfico mostra as temperaturas registradas ao longo de um percurso que atravessa uma cidade, da zona rural de um lado até a zona rural do outro, no fim da tarde de um dia de verão.",
     "fig": "c-geo-ilha",
     "stem": "O fenômeno representado e uma de suas causas são, respectivamente,",
     "opts": [
      "inversão térmica; aumento da vegetação no centro da cidade.",
      "ilha de calor; grande quantidade de superfícies de asfalto e concreto, que absorvem e liberam calor, e menor presença de vegetação e de evaporação no centro.",
      "chuva ácida; liberação de óxidos de enxofre pelas indústrias.",
      "efeito orográfico; presença de serras no centro urbano.",
      "ilha de calor; maior quantidade de áreas verdes no centro da cidade."
     ],
     "ans": "B",
     "why": "O centro é vários graus mais quente que a zona rural: é a ilha de calor. Asfalto, concreto, menos vegetação, calor de veículos e prédios que barram o vento explicam o fenômeno. O parque, no meio do percurso, mostra temperatura menor."
    },
    {
     "id": "vfc-geo-04",
     "n": 4,
     "t": "Agricultura",
     "lv": 2,
     "ctx": "Em vários municípios gaúchos, grupos de agricultores familiares produzem alimentos sem agrotóxicos, diversificam as culturas, usam adubação orgânica e vendem diretamente em feiras e para a merenda escolar.",
     "stem": "Essas práticas estão associadas à",
     "opts": [
      "agroecologia, que busca integrar produção de alimentos, conservação dos recursos naturais e valorização do trabalho e dos saberes dos agricultores.",
      "monocultura de exportação, baseada em grandes propriedades e uso intensivo de insumos químicos.",
      "agricultura itinerante, que abandona as áreas após o esgotamento do solo.",
      "plantation, típica do período colonial.",
      "pecuária extensiva, voltada à produção de carne para o mercado externo."
     ],
     "ans": "A",
     "why": "Diversificação, ausência de agrotóxicos, adubação orgânica e circuitos curtos de venda caracterizam a agroecologia, ligada à agricultura familiar e à segurança alimentar."
    },
    {
     "id": "vfc-geo-05",
     "n": 5,
     "t": "Migrações",
     "lv": 2,
     "ctx": "Desde meados da década de 2010, milhares de venezuelanos atravessaram a fronteira com o Brasil, principalmente por Pacaraima, em Roraima. Em 2018, o governo federal criou a Operação Acolhida.",
     "stem": "Sobre esse fluxo migratório, é correto afirmar que",
     "opts": [
      "foi motivado por uma guerra entre Brasil e Venezuela.",
      "concentrou-se no Rio Grande do Sul, por causa da proximidade com a fronteira venezuelana.",
      "foi um movimento pequeno, sem impacto sobre os serviços públicos das cidades de fronteira.",
      "resultou da crise econômica, política e social na Venezuela, e a Operação Acolhida passou a organizar o abrigo e a interiorização dos migrantes para outros estados.",
      "é formado apenas por turistas, que permanecem no Brasil por poucos dias."
     ],
     "ans": "D",
     "why": "A crise na Venezuela levou à emigração em massa. Roraima recebeu a maior parte dos migrantes, e a Operação Acolhida organiza o atendimento e a transferência (interiorização) para outras regiões."
    },
    {
     "id": "vfc-geo-06",
     "n": 6,
     "t": "Recursos hídricos",
     "lv": 2,
     "ctx": "O Sistema Aquífero Guarani é um dos maiores reservatórios de água subterrânea do mundo. Ele se estende sob o território de quatro países e abastece diversas cidades.",
     "stem": "Sobre o Aquífero Guarani, é correto afirmar que",
     "opts": [
      "é um grande lago superficial localizado no Pantanal.",
      "está inteiramente em território brasileiro, o que facilita sua gestão.",
      "sua água é infinita e não pode ser contaminada, pois está protegida por rochas.",
      "é abastecido apenas por água do mar que se infiltra no subsolo.",
      "estende-se pelo subsolo de Brasil, Argentina, Paraguai e Uruguai, e as áreas onde é recarregado pela chuva exigem proteção contra a contaminação e o uso excessivo."
     ],
     "ans": "E",
     "why": "O aquífero é transfronteiriço (Brasil, Argentina, Paraguai e Uruguai). Nas zonas de recarga, onde as rochas afloram, a água da chuva entra no sistema — e poluentes também podem entrar."
    },
    {
     "id": "vfc-geo-07",
     "n": 7,
     "t": "Antártida",
     "lv": 2,
     "ctx": "O Brasil desenvolve pesquisas científicas na Antártida e mantém no continente a Estação Antártica Comandante Ferraz. Universidades gaúchas, como a FURG, participam desses estudos sobre clima e oceanos.",
     "stem": "Sobre a ocupação e o uso da Antártida, é correto afirmar que",
     "opts": [
      "o continente foi dividido entre Brasil e Argentina após a Segunda Guerra Mundial.",
      "o Tratado da Antártida, de 1959, reserva o continente para fins pacíficos e para a pesquisa científica, proíbe atividades militares e congela as reivindicações territoriais.",
      "a exploração de petróleo e minérios é liberada para todos os países signatários.",
      "a Antártida tem população permanente de milhões de habitantes.",
      "o continente não tem relação com o clima do planeta, pois está isolado pelos oceanos."
     ],
     "ans": "B",
     "why": "O Tratado da Antártida (1959) garante o uso pacífico e científico e congela as reivindicações. O Protocolo de Madri (1991) proibiu a mineração. O continente é central para o clima e o nível dos oceanos."
    },
    {
     "id": "vfc-geo-08",
     "n": 8,
     "t": "Clima",
     "lv": 1,
     "ctx": "No inverno, é comum a previsão do tempo anunciar a chegada de uma frente fria ao Rio Grande do Sul, com chuva, ventos fortes e, depois, queda acentuada da temperatura.",
     "stem": "A chuva associada à passagem de uma frente fria é classificada como",
     "opts": [
      "orográfica, formada quando o ar úmido sobe as encostas de montanhas.",
      "convectiva, típica de tardes quentes de verão, causada pelo aquecimento intenso da superfície.",
      "frontal, formada no encontro entre massas de ar de temperaturas diferentes, quando o ar quente é forçado a subir.",
      "artificial, provocada pela poluição das cidades.",
      "monçônica, causada pela inversão dos ventos entre oceano e continente."
     ],
     "ans": "C",
     "why": "Na frente fria, a massa de ar frio (mais densa) empurra o ar quente para cima; o ar resfria, o vapor condensa e chove. É a chuva frontal, muito comum no Sul do Brasil."
    }
   ]
  },
  {
   "id": "historia",
   "label": "História",
   "s": "humanas",
   "color": "#7a5c2e",
   "questions": [
    {
     "id": "vfc-his-01",
     "n": 1,
     "t": "Roma Antiga",
     "lv": 2,
     "ctx": "Nos primeiros séculos da República Romana, os plebeus, que lutavam nas guerras e pagavam impostos, não tinham acesso aos principais cargos políticos, controlados pelos patrícios. Seguiram-se séculos de conflitos entre os dois grupos.",
     "stem": "Uma conquista dos plebeus nesse processo foi",
     "opts": [
      "a criação do tribunato da plebe e a publicação da Lei das Doze Tábuas, que tornou escritas as leis.",
      "a abolição da escravidão em todo o território romano.",
      "a instauração imediata do Império, com eleições diretas para imperador.",
      "a extinção do Senado e a entrega do poder aos sacerdotes.",
      "o fim das guerras de expansão e a divisão igualitária das terras conquistadas."
     ],
     "ans": "A",
     "why": "Os tribunos da plebe podiam vetar decisões contrárias aos plebeus, e as Doze Tábuas (século V a.C.) deram publicidade às leis, antes interpretadas só pelos patrícios. A escravidão continuou."
    },
    {
     "id": "vfc-his-02",
     "n": 2,
     "t": "Mundo islâmico medieval",
     "lv": 2,
     "ctx": "Entre 711 e 1492, parte da Península Ibérica esteve sob domínio muçulmano. Cidades como Córdoba e Toledo tornaram-se centros de estudo, com bibliotecas e traduções de obras gregas e árabes.",
     "stem": "Sobre a presença muçulmana na Península Ibérica (Al-Andalus), é correto afirmar que",
     "opts": [
      "foi um período sem produção cultural, marcado apenas por guerras.",
      "terminou com a chegada dos muçulmanos à América em 1492.",
      "impediu qualquer contato entre cristãos, judeus e muçulmanos.",
      "contribuiu para a circulação de saberes como a álgebra, a medicina e os algarismos indo-arábicos, e terminou com a conquista de Granada pelos reinos cristãos em 1492.",
      "transformou toda a Europa em território islâmico até o século XX."
     ],
     "ans": "D",
     "why": "Al-Andalus foi um centro de saber e de traduções. A chamada Reconquista cristã terminou com a tomada de Granada em 1492, mesmo ano da chegada de Colombo à América."
    },
    {
     "id": "vfc-his-03",
     "n": 3,
     "t": "Expansão marítima",
     "lv": 2,
     "ctx": "Em 1494, Portugal e Espanha assinaram o Tratado de Tordesilhas, que estabeleceu uma linha imaginária a 370 léguas a oeste do arquipélago de Cabo Verde.",
     "stem": "Sobre esse tratado, é correto afirmar que",
     "opts": [
      "proibiu a navegação portuguesa no oceano Atlântico.",
      "foi assinado pelos povos indígenas para garantir a posse de suas terras.",
      "estabeleceu as fronteiras atuais do Brasil, que nunca foram alteradas.",
      "concedeu à Inglaterra e à França o direito de colonizar a América do Sul.",
      "dividiu as terras descobertas e por descobrir entre as duas coroas ibéricas, ignorando os povos que já habitavam esses territórios e outras potências europeias."
     ],
     "ans": "E",
     "why": "Tordesilhas repartiu o “mundo a descobrir” entre Portugal (leste da linha) e Espanha (oeste). Indígenas não foram consultados, e França, Inglaterra e Holanda contestaram o acordo. As fronteiras brasileiras se ampliaram muito depois."
    },
    {
     "id": "vfc-his-04",
     "n": 4,
     "t": "Escravidão e resistência",
     "lv": 1,
     "ctx": "Na Serra da Barriga, atual Alagoas, formou-se no século XVII o Quilombo dos Palmares, que reuniu milhares de pessoas e resistiu por décadas aos ataques coloniais. Zumbi, uma de suas principais lideranças, foi morto em 20 de novembro de 1695.",
     "stem": "Sobre a resistência à escravidão na América portuguesa, é correto afirmar que",
     "opts": [
      "a resistência assumiu diversas formas, como fugas, formação de quilombos, revoltas e a preservação de práticas culturais e religiosas, e o 20 de novembro tornou-se o Dia da Consciência Negra.",
      "Palmares foi um pequeno acampamento, destruído em poucas semanas.",
      "a resistência ocorreu apenas depois da abolição, em 1888.",
      "os africanos escravizados aceitavam passivamente sua condição, sem formas de resistência.",
      "os quilombos eram proibidos de ter atividades agrícolas e comerciais."
     ],
     "ans": "A",
     "why": "A resistência foi constante e variada. Palmares durou quase um século; os quilombos plantavam e comerciavam. O 20 de novembro, data da morte de Zumbi, é hoje o Dia da Consciência Negra."
    },
    {
     "id": "vfc-his-05",
     "n": 5,
     "t": "Independências na América",
     "lv": 3,
     "ctx": "No início do século XIX, as colônias da América espanhola e a América portuguesa conquistaram suas independências, mas os processos tiveram resultados políticos diferentes.",
     "stem": "Comparando esses processos, é correto afirmar que",
     "opts": [
      "as duas regiões formaram uma única república, com capital no Rio de Janeiro.",
      "a América espanhola permaneceu unida em um só país, enquanto o Brasil se fragmentou em várias repúblicas.",
      "em ambas, as independências foram lideradas por indígenas e escravizados, que tomaram o poder.",
      "a América espanhola fragmentou-se em várias repúblicas, lideradas principalmente por elites criollas, enquanto o Brasil manteve a unidade territorial e adotou a monarquia.",
      "as duas regiões aboliram imediatamente a escravidão após a independência."
     ],
     "ans": "D",
     "why": "Líderes como Bolívar e San Martín não conseguiram manter a unidade hispano-americana, que se dividiu em diversas repúblicas. No Brasil, a presença da Corte e o arranjo das elites mantiveram a unidade sob a monarquia de D. Pedro I."
    },
    {
     "id": "vfc-his-06",
     "n": 6,
     "t": "Revolução Russa",
     "lv": 2,
     "ctx": "Em 1917, em meio à Primeira Guerra Mundial, a Rússia passou por duas revoluções: em fevereiro, o czar Nicolau II abdicou; em outubro, os bolcheviques tomaram o poder.",
     "stem": "Sobre a Revolução Russa, é correto afirmar que",
     "opts": [
      "o czar foi reconduzido ao trono pelos bolcheviques em outubro de 1917.",
      "os bolcheviques, liderados por Lênin, retiraram a Rússia da guerra e, após uma guerra civil, criaram a União das Repúblicas Socialistas Soviéticas em 1922.",
      "a revolução foi liderada por grandes proprietários de terras, que defendiam o fortalecimento da monarquia.",
      "a Rússia continuou na Primeira Guerra até a vitória sobre a Alemanha.",
      "a revolução implantou uma democracia liberal com vários partidos e eleições livres."
     ],
     "ans": "B",
     "why": "Lênin e os bolcheviques assinaram a paz de Brest-Litovsk (1918), venceram a guerra civil contra os “brancos” e fundaram a URSS em 1922, com partido único."
    },
    {
     "id": "vfc-his-07",
     "n": 7,
     "t": "Guerra do Paraguai",
     "lv": 2,
     "ctx": "Entre 1864 e 1870, Brasil, Argentina e Uruguai, unidos na Tríplice Aliança, enfrentaram o Paraguai, governado por Francisco Solano López.",
     "stem": "Uma consequência da guerra para o Brasil foi",
     "opts": [
      "o enfraquecimento total do Exército, que deixou de participar da política.",
      "a anexação de todo o território paraguaio pelo Império.",
      "o fortalecimento do Exército como instituição e o aumento das dívidas do Império, além de reforçar debates que contribuíram para o abolicionismo e o republicanismo.",
      "a abolição imediata da escravidão em 1870.",
      "o rompimento definitivo das relações com a Argentina."
     ],
     "ans": "C",
     "why": "O Exército saiu fortalecido e com peso político (decisivo na Proclamação da República, em 1889). A guerra gerou endividamento, e a participação de escravizados libertos para lutar alimentou o debate abolicionista."
    },
    {
     "id": "vfc-his-08",
     "n": 8,
     "t": "América Latina contemporânea",
     "lv": 2,
     "ctx": "Na década de 1970, documentos e testemunhos revelaram que governos militares do Cone Sul trocavam informações e realizavam operações conjuntas contra opositores políticos, inclusive fora de seus territórios.",
     "stem": "Essa articulação ficou conhecida como",
     "opts": [
      "Aliança para o Progresso, programa de ajuda econômica dos Estados Unidos.",
      "Mercosul, criado para integrar as economias da região.",
      "Diretas Já, movimento pela volta das eleições presidenciais.",
      "Operação Condor, cooperação repressiva entre ditaduras como as de Argentina, Brasil, Chile, Uruguai, Paraguai e Bolívia.",
      "Plano Marshall, voltado à reconstrução da América Latina."
     ],
     "ans": "D",
     "why": "A Operação Condor coordenou sequestros, torturas e assassinatos de opositores entre as ditaduras do Cone Sul. O Mercosul só surgiria em 1991, já em democracia."
    }
   ]
  },
  {
   "id": "portugues",
   "label": "Português",
   "s": "linguagens",
   "color": "#c23b5a",
   "questions": [
    {
     "id": "vfc-por-01",
     "n": 1,
     "t": "Interpretação de texto",
     "lv": 2,
     "text": {
      "title": "Palavras de herança",
      "body": "Minha avó chamava de bergamota a fruta que, em outras partes do país, se chama tangerina ou mexerica. Quando o céu escurecia de repente, anunciava que ia “chover canivete”, e, no inverno, dizia que o frio estava “de renguear cusco”. Quando eu era criança, achava graça naquelas expressões; na escola, aprendi que eram “regionalismos”, palavra que me soava como etiqueta de museu.\nSó mais tarde entendi que cada expressão guardava um pedaço de vida: o trabalho no campo, o medo das tempestades, o humor diante do frio. Quando uma palavra deixa de ser usada, não se perde apenas um som, mas um jeito de olhar para o mundo. Talvez por isso eu insista em pedir bergamota na feira, mesmo quando o vendedor sorri e pergunta: — Tangerina?",
      "source": "Texto autoral para fins didáticos."
     },
     "textNote": "Texto para as questões 1 e 2.",
     "stem": "A ideia central do texto é que",
     "opts": [
      "as expressões regionais devem ser corrigidas, pois prejudicam a comunicação.",
      "as expressões regionais carregam memórias e modos de ver o mundo, e por isso o narrador passa a valorizá-las e a mantê-las em uso.",
      "a escola ensinou corretamente que os regionalismos pertencem apenas ao passado.",
      "a fruta chamada bergamota é diferente da tangerina e da mexerica.",
      "o narrador sente vergonha das palavras que aprendeu com a avó."
     ],
     "ans": "B",
     "why": "O narrador passa da graça infantil à compreensão de que cada expressão guarda “um jeito de olhar para o mundo”, e por isso insiste em usá-las."
    },
    {
     "id": "vfc-por-02",
     "n": 2,
     "t": "Sentido em contexto",
     "lv": 2,
     "text": {
      "title": "Palavras de herança",
      "body": "Minha avó chamava de bergamota a fruta que, em outras partes do país, se chama tangerina ou mexerica. Quando o céu escurecia de repente, anunciava que ia “chover canivete”, e, no inverno, dizia que o frio estava “de renguear cusco”. Quando eu era criança, achava graça naquelas expressões; na escola, aprendi que eram “regionalismos”, palavra que me soava como etiqueta de museu.\nSó mais tarde entendi que cada expressão guardava um pedaço de vida: o trabalho no campo, o medo das tempestades, o humor diante do frio. Quando uma palavra deixa de ser usada, não se perde apenas um som, mas um jeito de olhar para o mundo. Talvez por isso eu insista em pedir bergamota na feira, mesmo quando o vendedor sorri e pergunta: — Tangerina?",
      "source": "Texto autoral para fins didáticos."
     },
     "textRef": true,
     "stem": "No trecho “palavra que me soava como etiqueta de museu”, o narrador sugere que o termo “regionalismo”",
     "opts": [
      "valorizava as expressões como parte viva da língua do presente.",
      "era um sinônimo de erro gramatical.",
      "parecia classificar as expressões como curiosidades antigas, separadas da vida cotidiana.",
      "indicava que as expressões eram usadas apenas por profissionais de museus.",
      "mostrava que a avó trabalhava em um museu."
     ],
     "ans": "C",
     "why": "A comparação com uma etiqueta de museu sugere algo catalogado, exposto e distante do uso diário — visão que o narrador depois rejeita."
    },
    {
     "id": "vfc-por-03",
     "n": 3,
     "t": "Gêneros textuais",
     "lv": 1,
     "ctx": "Leia o texto:\nchimarrão s.m. (RS) Infusão de erva-mate, sem açúcar, preparada na cuia e tomada com bomba. Etim.: do espanhol platino cimarrón, “selvagem, bravio”.",
     "stem": "O texto pertence ao gênero",
     "opts": [
      "notícia, pois relata um acontecimento recente.",
      "receita, pois ensina passo a passo o preparo da bebida.",
      "anúncio publicitário, pois procura convencer o leitor a comprar erva-mate.",
      "crônica, pois apresenta uma reflexão pessoal sobre o cotidiano.",
      "verbete de dicionário, pois informa a classe da palavra, a região de uso, o significado e a origem."
     ],
     "ans": "E",
     "why": "A abreviação da classe gramatical (s.m.), a marca de região (RS), a definição e a etimologia são marcas típicas do verbete."
    },
    {
     "id": "vfc-por-04",
     "n": 4,
     "t": "Concordância",
     "lv": 2,
     "ctx": "Considere o período:\n“Seguem ______ as fotos da feira. A organizadora ficou ______ preocupada com a chuva, pois, na cozinha, ______ a entrada de pessoas sem touca.”",
     "stem": "Assinale a alternativa que preenche corretamente as lacunas, de acordo com a norma-padrão.",
     "opts": [
      "anexas — meio — é proibida",
      "anexo — meia — é proibido",
      "anexos — meia — é proibida",
      "anexas — meia — é proibido",
      "anexo — meio — é proibido"
     ],
     "ans": "A",
     "why": "“Anexo” concorda com o substantivo (as fotos → anexas). “Meio”, no sentido de “um pouco”, é advérbio e não varia. Com o artigo (“a entrada”), o predicativo concorda: “é proibida a entrada”."
    },
    {
     "id": "vfc-por-05",
     "n": 5,
     "t": "Colocação pronominal",
     "lv": 2,
     "stem": "Assinale a alternativa em que a colocação do pronome oblíquo está de acordo com a norma-padrão.",
     "opts": [
      "Me disseram que a feira foi adiada.",
      "Não esqueça-se de levar a cuia.",
      "Quando encontrei-o, já era tarde.",
      "Ninguém me avisou sobre a mudança de horário.",
      "Tudo resolveu-se rapidamente."
     ],
     "ans": "D",
     "why": "Pronomes indefinidos como “ninguém” atraem o pronome para antes do verbo (próclise). Na norma-padrão, não se inicia frase com oblíquo átono, e palavras negativas, conjunções subordinativas e “tudo” também exigem próclise."
    },
    {
     "id": "vfc-por-06",
     "n": 6,
     "t": "Conectivos",
     "lv": 2,
     "ctx": "Considere as frases:\nI. Embora chovesse, a feira aconteceu normalmente.\nII. À medida que a maré subia, os barcos se aproximavam do cais.\nIII. Conforme combinamos, a reunião começou às nove horas.\nIV. Como não havia vento, os veleiros ficaram no porto.",
     "stem": "As relações de sentido estabelecidas pelos conectivos destacados em I, II, III e IV são, respectivamente,",
     "opts": [
      "condição, proporção, comparação e causa.",
      "causa, tempo, comparação e condição.",
      "concessão, tempo, conformidade e comparação.",
      "oposição, causa, finalidade e conclusão.",
      "concessão, proporção, conformidade e causa."
     ],
     "ans": "E",
     "why": "“Embora” (concessão), “à medida que” (proporção), “conforme” (conformidade) e “como” no início, com sentido de “já que” (causa)."
    },
    {
     "id": "vfc-por-07",
     "n": 7,
     "t": "Ortografia",
     "lv": 1,
     "ctx": "Leia o trecho:\n“Ninguém entendeu ______ a feira foi cancelada. Os organizadores disseram que foi ______ choveu muito. Cancelaram, mas ______? Até hoje, ninguém explicou o ______ da decisão.”",
     "stem": "As lacunas são preenchidas corretamente por",
     "opts": [
      "por que — porque — por quê — porquê.",
      "por que — porque — porquê — por quê.",
      "porquê — porque — por que — por quê.",
      "porque — por que — por quê — porquê.",
      "por quê — por que — porque — porquê."
     ],
     "ans": "A",
     "why": "“Por que” em pergunta indireta (= por qual motivo); “porque” na explicação; “por quê” no fim da frase, antes da interrogação; “o porquê” é substantivo (= o motivo)."
    },
    {
     "id": "vfc-por-08",
     "n": 8,
     "t": "Vozes verbais",
     "lv": 2,
     "ctx": "Leia a frase: “Os pescadores consertaram as redes antes da safra.”",
     "stem": "Ao passar a frase para a voz passiva analítica, mantendo o tempo verbal e o sentido, obtém-se:",
     "opts": [
      "As redes consertaram os pescadores antes da safra.",
      "As redes são consertadas pelos pescadores antes da safra.",
      "As redes foram consertadas pelos pescadores antes da safra.",
      "Consertou-se as redes pelos pescadores antes da safra.",
      "As redes foram consertado pelos pescadores antes da safra."
     ],
     "ans": "C",
     "why": "O objeto (as redes) vira sujeito, o verbo vai para “ser” + particípio no mesmo tempo (consertaram → foram consertadas), concordando com o sujeito, e o antigo sujeito vira agente da passiva (pelos pescadores)."
    }
   ]
  },
  {
   "id": "literatura",
   "label": "Literatura",
   "s": "linguagens",
   "color": "#a3195b",
   "questions": [
    {
     "id": "vfc-lit-01",
     "n": 1,
     "t": "Um útero é do tamanho de um punho",
     "lv": 3,
     "ctx": "Em Um útero é do tamanho de um punho, Angélica Freitas inclui a seção “3 poemas com o auxílio do Google”, construída a partir de frases sobre mulheres encontradas em pesquisas na internet.",
     "stem": "Esse procedimento de composição",
     "opts": [
      "mostra que a autora concorda com as opiniões encontradas na internet e as apresenta como verdades.",
      "reorganiza discursos que circulam no cotidiano e, pela repetição e pelo absurdo, expõe os estereótipos sobre as mulheres, produzindo efeito crítico.",
      "afasta o livro das questões sociais, concentrando-se na descrição da natureza.",
      "tem como objetivo ensinar o leitor a usar ferramentas de busca.",
      "segue as regras do soneto clássico, com rimas e métrica fixas."
     ],
     "ans": "B",
     "why": "A montagem de frases achadas na internet faz o leitor estranhar o que parecia normal: a voz poética encena estereótipos para criticá-los, sem endossá-los."
    },
    {
     "id": "vfc-lit-02",
     "n": 2,
     "t": "Olhos d’água",
     "lv": 2,
     "ctx": "No conto que dá título a Olhos d’água, de Conceição Evaristo, a narradora percebe que não consegue lembrar a cor dos olhos da mãe e decide buscar essa lembrança.",
     "stem": "Sobre esse conto, é correto afirmar que",
     "opts": [
      "a busca pela cor dos olhos da mãe mobiliza memórias da infância, da pobreza e dos cuidados maternos, e a imagem dos olhos associados à água aproxima lágrimas, memória e ancestralidade.",
      "a narradora é a mesma personagem principal de todos os contos do livro.",
      "o conto é um relato científico sobre doenças oculares.",
      "a mãe é apresentada como uma figura distante, sem importância na vida da narradora.",
      "o conto rejeita o tema da memória e se concentra em uma aventura fantástica."
     ],
     "ans": "A",
     "why": "O conto de abertura transforma uma pergunta simples numa busca de pertencimento. Os outros contos do livro têm personagens próprias, embora dialoguem com esses temas."
    },
    {
     "id": "vfc-lit-03",
     "n": 3,
     "t": "A hora da estrela",
     "lv": 2,
     "ctx": "Em A hora da estrela, de Clarice Lispector, Macabéa, jovem alagoana que trabalha como datilógrafa no Rio de Janeiro, visita a cartomante madama Carlota, que lhe anuncia um futuro promissor.",
     "stem": "O desfecho da obra e sua relação com o título podem ser interpretados da seguinte forma:",
     "opts": [
      "Macabéa casa-se com Olímpico e alcança a fama, tornando-se uma estrela de cinema.",
      "O narrador Rodrigo S.M. decide não contar o final, que fica totalmente em aberto.",
      "A previsão da cartomante se cumpre integralmente, e Macabéa enriquece.",
      "Macabéa volta para Alagoas e abandona definitivamente o Rio de Janeiro.",
      "Ao sair da consulta cheia de esperança, Macabéa é atropelada e morre; o “momento de estrela” coincide com a morte, o que produz uma ironia trágica."
     ],
     "ans": "E",
     "why": "A esperança recém-criada é interrompida pelo atropelamento. A ironia trágica do título está no contraste entre a promessa de um futuro e o desfecho."
    },
    {
     "id": "vfc-lit-04",
     "n": 4,
     "t": "Papéis avulsos",
     "lv": 3,
     "ctx": "Em “O alienista”, conto de Papéis avulsos, o médico Simão Bacamarte funda a Casa Verde, em Itaguaí, e passa a internar moradores segundo critérios de loucura que ele mesmo altera várias vezes.",
     "stem": "A respeito desse conto, é correto afirmar que",
     "opts": [
      "Bacamarte é apresentado como um herói romântico que salva a cidade da loucura.",
      "o conto defende que a ciência é neutra e nunca se relaciona com o poder.",
      "a sátira mostra como a autoridade de um discurso científico pode servir ao poder e, ao final, Bacamarte acaba recolhendo-se sozinho na Casa Verde, o que ironiza a pretensão de definir a normalidade.",
      "os moradores de Itaguaí aceitam passivamente todas as internações, sem qualquer reação.",
      "o narrador explica com clareza qual é o critério correto para definir a loucura."
     ],
     "ans": "C",
     "why": "Bacamarte muda sucessivamente seus critérios e, no fim, conclui que só ele merece ser internado. A ironia machadiana questiona quem tem autoridade para decidir o que é normal."
    }
   ]
  },
  {
   "id": "artes",
   "label": "Artes",
   "s": "linguagens",
   "color": "#6b46c1",
   "questions": [
    {
     "id": "vfc-art-01",
     "n": 1,
     "t": "Modernismo",
     "lv": 2,
     "ctx": "Em 1928, Tarsila do Amaral pintou o Abaporu, figura de pés e mãos enormes e cabeça pequena, ao lado de um cacto e de um sol. A obra inspirou Oswald de Andrade a escrever o Manifesto Antropófago, no mesmo ano.",
     "stem": "A proposta antropofágica defendia",
     "opts": [
      "a cópia fiel dos modelos artísticos europeus, considerados superiores.",
      "“devorar” criticamente as influências estrangeiras e transformá-las, combinando-as com elementos da cultura brasileira para criar uma arte própria.",
      "a rejeição de qualquer contato com a cultura estrangeira.",
      "a volta às regras da arte acadêmica do século XIX.",
      "a substituição da pintura pela fotografia documental."
     ],
     "ans": "B",
     "why": "A metáfora da antropofagia propõe absorver o estrangeiro sem submissão, misturando-o ao que é brasileiro — nem cópia, nem isolamento."
    },
    {
     "id": "vfc-art-02",
     "n": 2,
     "t": "Música",
     "lv": 2,
     "ctx": "No fim da década de 1960, artistas como Caetano Veloso, Gilberto Gil, Gal Costa, Tom Zé e Os Mutantes participaram da Tropicália, movimento que causou polêmica em festivais de música transmitidos pela televisão.",
     "stem": "Uma característica da Tropicália é",
     "opts": [
      "a recusa de instrumentos elétricos, considerados estrangeiros e inadequados à música brasileira.",
      "o apoio oficial do regime militar, que financiou o movimento.",
      "a valorização exclusiva da música erudita europeia.",
      "a mistura de guitarras elétricas, rock e referências pop com ritmos brasileiros e poesia de vanguarda, em diálogo com a antropofagia e com críticas à realidade do país.",
      "a proibição de letras em português."
     ],
     "ans": "D",
     "why": "A Tropicália misturou o popular e o erudito, o nacional e o estrangeiro, retomando a ideia antropofágica. Caetano e Gil foram presos e exilados pela ditadura em 1969."
    },
    {
     "id": "vfc-art-03",
     "n": 3,
     "t": "Arte contemporânea",
     "lv": 2,
     "ctx": "Nos Parangolés, criados por Hélio Oiticica a partir de 1964, capas, bandeiras e estandartes de tecido colorido só se completam quando alguém os veste e se movimenta, muitas vezes dançando, como os passistas da escola de samba Mangueira, que participaram das primeiras apresentações.",
     "stem": "Essa proposta artística",
     "opts": [
      "reforça a ideia de que a obra de arte deve ser apenas contemplada a distância.",
      "restringe a arte a pinturas emolduradas em museus.",
      "rejeita qualquer relação entre arte e cultura popular.",
      "propõe que a obra seja idêntica para todos os espectadores, sem variações.",
      "considera o corpo e a participação do público parte da obra, aproximando arte, vida cotidiana e cultura popular."
     ],
     "ans": "E",
     "why": "O Parangolé só existe em ação, com o corpo do participante. Oiticica rompe a separação entre obra e público e aproxima a arte do samba e da vida."
    },
    {
     "id": "vfc-art-04",
     "n": 4,
     "t": "Elementos visuais",
     "lv": 1,
     "ctx": "A figura representa um círculo cromático simplificado, com cores primárias e secundárias.",
     "fig": "c-art-circulo",
     "stem": "Com base no círculo cromático, é correto afirmar que",
     "opts": [
      "verde, laranja e violeta são as cores primárias.",
      "azul e laranja são cores complementares, pois ocupam posições opostas no círculo, e sua combinação produz forte contraste.",
      "vermelho e laranja são complementares, pois estão lado a lado.",
      "as cores quentes são o azul, o verde e o violeta.",
      "misturando azul e amarelo, obtém-se o vermelho."
     ],
     "ans": "B",
     "why": "Complementares ficam em lados opostos do círculo (azul × laranja, vermelho × verde, amarelo × violeta). As primárias são vermelho, amarelo e azul; azul + amarelo dá verde."
    }
   ]
  },
  {
   "id": "ingles",
   "label": "Inglês",
   "s": "linguagens",
   "color": "#1d6fa5",
   "lang": "ingles",
   "questions": [
    {
     "id": "vfc-ing-01",
     "n": 1,
     "t": "Compreensão de texto",
     "lv": 2,
     "text": {
      "title": "Citizen science on the coast",
      "body": "Every year, hundreds of volunteers walk along the beaches of southern Brazil to count seabirds and record stranded animals. They do not need a degree in biology: a smartphone, a short training session and a lot of patience are enough. The information they collect is sent to researchers, who use it to monitor changes in populations and to detect problems such as oil spills or lost fishing nets.\nProjects like this are called citizen science. They allow scientists to gather data over large areas that would be impossible to cover alone. At the same time, participants learn about the environment and often become more engaged in protecting it.",
      "source": "Text written for educational purposes."
     },
     "textNote": "Read the text to answer questions 1 and 2.",
     "stem": "According to the text, citizen science",
     "opts": [
      "is a profession that requires a university degree in biology.",
      "replaces the work of researchers, who no longer need to study the coast.",
      "allows volunteers to collect data that help researchers monitor the environment, and it also makes participants more engaged in protecting it.",
      "is used only to sell smartphones to volunteers.",
      "is too expensive to be carried out in southern Brazil."
     ],
     "ans": "C",
     "why": "Os voluntários coletam dados enviados a pesquisadores, o que amplia a área estudada, e ainda se envolvem mais com a proteção ambiental."
    },
    {
     "id": "vfc-ing-02",
     "n": 2,
     "t": "Vocabulário",
     "lv": 1,
     "text": {
      "title": "Citizen science on the coast",
      "body": "Every year, hundreds of volunteers walk along the beaches of southern Brazil to count seabirds and record stranded animals. They do not need a degree in biology: a smartphone, a short training session and a lot of patience are enough. The information they collect is sent to researchers, who use it to monitor changes in populations and to detect problems such as oil spills or lost fishing nets.\nProjects like this are called citizen science. They allow scientists to gather data over large areas that would be impossible to cover alone. At the same time, participants learn about the environment and often become more engaged in protecting it.",
      "source": "Text written for educational purposes."
     },
     "textRef": true,
     "stem": "In the sentence “a smartphone, a short training session and a lot of patience are enough”, the word “enough” means",
     "opts": [
      "insuficientes.",
      "caros.",
      "obrigatórios por lei.",
      "suficientes.",
      "raros."
     ],
     "ans": "D",
     "why": "“Enough” = suficiente(s): o texto diz que não é preciso diploma; celular, treinamento e paciência bastam."
    },
    {
     "id": "vfc-ing-03",
     "n": 3,
     "t": "Gêneros textuais",
     "lv": 1,
     "text": {
      "title": "Community Library Night",
      "body": "Friday, 7 p.m. — Central Square\nBring a book you have already read and take another one home!\nFree entry. Snacks and live music.\nChildren must be accompanied by an adult.",
      "source": "Text written for educational purposes."
     },
     "textNote": "Read the notice to answer questions 3 and 4.",
     "stem": "The main purpose of the notice is to",
     "opts": [
      "invite people to a free book exchange event with music and snacks.",
      "sell new books at a discount.",
      "announce that the library will close on Friday.",
      "ask volunteers to clean the Central Square.",
      "inform that children cannot attend the event."
     ],
     "ans": "A",
     "why": "O aviso convida para uma troca de livros gratuita (“Bring a book… take another one home”, “Free entry”), com música e lanches."
    },
    {
     "id": "vfc-ing-04",
     "n": 4,
     "t": "Verbos modais",
     "lv": 2,
     "text": {
      "title": "Community Library Night",
      "body": "Friday, 7 p.m. — Central Square\nBring a book you have already read and take another one home!\nFree entry. Snacks and live music.\nChildren must be accompanied by an adult.",
      "source": "Text written for educational purposes."
     },
     "textRef": true,
     "stem": "In “Children must be accompanied by an adult”, the modal verb “must” expresses",
     "opts": [
      "possibility.",
      "ability.",
      "obligation.",
      "suggestion.",
      "prohibition of the event."
     ],
     "ans": "C",
     "why": "“Must” indica obrigação: crianças devem estar acompanhadas de um adulto (elas podem ir, desde que acompanhadas)."
    }
   ]
  },
  {
   "id": "espanhol",
   "label": "Espanhol",
   "s": "linguagens",
   "color": "#c0392b",
   "lang": "espanhol",
   "questions": [
    {
     "id": "vfc-esp-01",
     "n": 1,
     "t": "Compreensão de texto",
     "lv": 2,
     "text": {
      "title": "Bibliotecas humanas",
      "body": "En una biblioteca humana, los “libros” son personas. Cada una cuenta su historia a quien la “pide prestada” durante unos treinta minutos: una mujer bombera, un refugiado, un joven con autismo. La idea surgió en Dinamarca, en el año 2000, con el objetivo de combatir los prejuicios a través del diálogo. Los lectores pueden hacer preguntas que quizás nunca se animarían a hacer en otra situación.\nHoy, las bibliotecas humanas se organizan en escuelas, ferias y oficinas públicas de muchos países. Sus organizadores dicen que es más difícil mantener un prejuicio cuando uno conoce el nombre, el apellido y la historia de la persona que tiene enfrente.",
      "source": "Texto autoral para fines didácticos."
     },
     "textNote": "Lee el texto para responder a las preguntas 1 y 2.",
     "stem": "Según el texto, el principal objetivo de las bibliotecas humanas es",
     "opts": [
      "prestar libros de papel a personas que no tienen dinero.",
      "combatir los prejuicios por medio del diálogo con personas que cuentan sus propias historias.",
      "reemplazar las escuelas por conversaciones informales.",
      "vender biografías de personas famosas.",
      "impedir que los lectores hagan preguntas incómodas."
     ],
     "ans": "B",
     "why": "O texto diz que a ideia surgiu “con el objetivo de combatir los prejuicios a través del diálogo”: os “livros” são pessoas que contam suas histórias."
    },
    {
     "id": "vfc-esp-02",
     "n": 2,
     "t": "Heterossemânticos",
     "lv": 2,
     "text": {
      "title": "Bibliotecas humanas",
      "body": "En una biblioteca humana, los “libros” son personas. Cada una cuenta su historia a quien la “pide prestada” durante unos treinta minutos: una mujer bombera, un refugiado, un joven con autismo. La idea surgió en Dinamarca, en el año 2000, con el objetivo de combatir los prejuicios a través del diálogo. Los lectores pueden hacer preguntas que quizás nunca se animarían a hacer en otra situación.\nHoy, las bibliotecas humanas se organizan en escuelas, ferias y oficinas públicas de muchos países. Sus organizadores dicen que es más difícil mantener un prejuicio cuando uno conoce el nombre, el apellido y la historia de la persona que tiene enfrente.",
      "source": "Texto autoral para fines didácticos."
     },
     "textRef": true,
     "stem": "En la frase “conoce el nombre, el apellido y la historia de la persona”, la palabra “apellido” significa, en portugués,",
     "opts": [
      "sobrenome.",
      "endereço.",
      "apelido.",
      "profissão.",
      "idade."
     ],
     "ans": "A",
     "why": "“Apellido” é falso amigo: significa “sobrenome”. “Apelido”, em espanhol, é “apodo”."
    },
    {
     "id": "vfc-esp-03",
     "n": 3,
     "t": "Gêneros textuais",
     "lv": 1,
     "text": {
      "title": "Cómo preparar un buen mate",
      "body": "Llená el mate con yerba hasta dos tercios de su capacidad. Inclinalo y agitalo suavemente para que la yerba quede de un lado. Colocá la bombilla en el hueco y echá un poco de agua tibia. Después, usá agua caliente, pero nunca hirviendo, para no quemar la yerba.",
      "source": "Texto autoral para fines didácticos."
     },
     "stem": "El texto tiene como finalidad principal",
     "opts": [
      "narrar la historia del mate en la región del Río de la Plata.",
      "convencer al lector de que el mate es mejor que el café.",
      "criticar a las personas que preparan mal el mate.",
      "describir los sentimientos del autor al tomar mate.",
      "orientar al lector, paso a paso, sobre cómo preparar la bebida, con verbos en modo imperativo."
     ],
     "ans": "E",
     "why": "É um texto instrucional (receita): sequência de passos com verbos no imperativo (llená, inclinalo, colocá, echá, usá), na forma do “voseo” rio-platense."
    },
    {
     "id": "vfc-esp-04",
     "n": 4,
     "t": "Gramática",
     "lv": 1,
     "ctx": "Lee la frase:\n“A nosotros nos ______ la música y los deportes, pero a mi hermano le ______ más el cine.”",
     "stem": "Las formas verbales que completan correctamente la frase son",
     "opts": [
      "gusta — gustan.",
      "gustamos — gusta.",
      "gustan — gustan.",
      "gustan — gusta.",
      "gusta — gusta."
     ],
     "ans": "D",
     "why": "O verbo “gustar” concorda com o que agrada: “la música y los deportes” (plural) → gustan; “el cine” (singular) → gusta."
    }
   ]
  },
  {
   "id": "educacao-fisica",
   "label": "Educação Física",
   "s": "linguagens",
   "color": "#0e8a5f",
   "questions": [
    {
     "id": "vfc-ef-01",
     "n": 1,
     "t": "Jogos indígenas",
     "lv": 2,
     "ctx": "Em 2015, a cidade de Palmas (TO) recebeu os Jogos Mundiais dos Povos Indígenas, com práticas como corrida de tora, arco e flecha, cabo de força e canoagem, além de demonstrações de jogos tradicionais de diferentes etnias.",
     "stem": "Sob a perspectiva da cultura corporal de movimento, essas práticas",
     "opts": [
      "devem ser avaliadas apenas pelo rendimento esportivo e pela quebra de recordes.",
      "são cópias dos esportes olímpicos, sem significados próprios.",
      "expressam identidades, saberes e modos de vida dos povos indígenas, e seu sentido envolve celebração, ritual e convivência, não apenas competição.",
      "não podem ser ensinadas na escola, pois pertencem a outras culturas.",
      "desapareceram com a chegada dos esportes modernos."
     ],
     "ans": "C",
     "why": "As práticas corporais indígenas carregam significados culturais (ritos, memória, relação com o território); reduzi-las à competição apaga esses sentidos."
    },
    {
     "id": "vfc-ef-02",
     "n": 2,
     "t": "Esporte paralímpico",
     "lv": 1,
     "ctx": "Nas últimas edições dos Jogos Paralímpicos, atletas brasileiros conquistaram dezenas de medalhas em modalidades como natação, atletismo, judô e futebol de cegos, que utilizam regras e equipamentos adaptados.",
     "stem": "A partir dessa informação, é correto afirmar que",
     "opts": [
      "pessoas com deficiência não podem praticar esportes de alto rendimento.",
      "as adaptações de regras e equipamentos tornam as modalidades menos legítimas.",
      "o esporte paralímpico depende apenas do esforço individual, sem relação com políticas públicas.",
      "a acessibilidade e as adaptações ampliam a participação, e a inclusão no esporte depende de oportunidades, espaços acessíveis e combate ao preconceito.",
      "o esporte adaptado deve ser praticado apenas para fins terapêuticos."
     ],
     "ans": "D",
     "why": "As adaptações permitem a prática e o alto rendimento; a inclusão exige políticas, estrutura acessível e mudança de atitudes, e não apenas esforço pessoal."
    },
    {
     "id": "vfc-ef-03",
     "n": 3,
     "t": "Lazer",
     "lv": 2,
     "ctx": "O artigo 6º da Constituição Federal de 1988 inclui o lazer entre os direitos sociais, ao lado da educação, da saúde e do trabalho. Ainda assim, em muitas cidades, praças, quadras e parques se concentram nos bairros de maior renda.",
     "stem": "Considerando o texto, é correto afirmar que",
     "opts": [
      "o lazer é um direito previsto em lei, mas o acesso a ele é desigual, pois depende de renda, do lugar onde se mora e do tempo livre disponível.",
      "o lazer não é um direito, mas apenas uma escolha individual.",
      "a falta de espaços de lazer não interfere na saúde e na convivência das pessoas.",
      "todos os bairros oferecem os mesmos espaços de lazer, graças à Constituição.",
      "o lazer deve ser garantido apenas a quem pratica esportes de competição."
     ],
     "ans": "A",
     "why": "O direito está na Constituição, mas sua efetivação depende de políticas públicas: a distribuição desigual de espaços e de tempo livre limita o acesso de parte da população."
    },
    {
     "id": "vfc-ef-04",
     "n": 4,
     "t": "Gênero e atividade física",
     "lv": 2,
     "ctx": "O gráfico apresenta dados hipotéticos de uma escola sobre a porcentagem de estudantes que praticam atividade física suficiente, por faixa etária e sexo.",
     "fig": "c-ef-grafico",
     "stem": "A interpretação dos dados permite afirmar que",
     "opts": [
      "as meninas praticam mais atividade física que os meninos em todas as faixas etárias.",
      "a participação das meninas é menor em todas as faixas e cai com a idade, o que pode estar ligado a estereótipos de gênero, menos incentivo, falta de espaços seguros e mais tarefas domésticas.",
      "a diferença entre meninos e meninas diminui com a idade.",
      "a porcentagem de meninos ativos aumenta com a idade.",
      "os dados comprovam que a diferença é causada exclusivamente por fatores biológicos."
     ],
     "ans": "B",
     "why": "Meninas: 30%, 22% e 15%; meninos: 52%, 46% e 40%. A diferença aumenta com a idade, e os fatores sociais ajudam a explicá-la — o gráfico não sustenta explicação biológica exclusiva."
    }
   ]
  }
 ],
 "discursivas": {
  "label": "Compreensão e produção de texto",
  "color": "#444c56",
  "items": [
   {
    "id": "vfc-disc-01",
    "n": 1,
    "s": "linguagens",
    "points": 10,
    "kind": "Expositivo",
    "title": "Bolhas de informação",
    "texts": [
     {
      "label": "Texto I",
      "body": "Redes sociais e plataformas de vídeo usam algoritmos de recomendação: programas que registram o que cada pessoa curte, comenta e assiste e, a partir disso, escolhem o que ela verá em seguida. O objetivo é manter o usuário conectado pelo maior tempo possível. Como resultado, muitas pessoas passam a receber principalmente conteúdos parecidos com aquilo em que já acreditam.",
      "source": "Texto autoral para fins didáticos."
     },
     {
      "label": "Texto II",
      "body": "Antes de compartilhar uma notícia, vale seguir alguns passos: verificar quem publicou e se a fonte é conhecida; procurar a mesma informação em outros veículos; conferir a data da publicação; desconfiar de títulos alarmistas e de textos que pedem para “espalhar antes que apaguem”; e consultar agências de checagem.",
      "source": "Texto autoral para fins didáticos."
     }
    ],
    "cmd": "Com base nos textos, **explique** como os algoritmos de recomendação podem favorecer a formação de bolhas de informação e **apresente duas atitudes** que ajudam a checar uma notícia antes de compartilhá-la. Escreva um texto **expositivo** de **5 a 10 linhas**.",
    "expect": [
     "Explicar o mecanismo: o algoritmo usa o histórico do usuário para mostrar conteúdos parecidos, buscando mantê-lo conectado.",
     "Relacionar esse mecanismo à bolha: a pessoa passa a ver sobretudo o que confirma suas opiniões, com menos contato com ideias diferentes.",
     "Apresentar duas atitudes de checagem do Texto II (fonte, outros veículos, data, títulos alarmistas, agências de checagem).",
     "Organizar o texto com coesão e fechamento, em linguagem impessoal (comando expositivo)."
    ],
    "traps": [
     "Apresentar só uma atitude de checagem.",
     "Opinar sobre as redes sem explicar o mecanismo dos algoritmos.",
     "Copiar a lista do Texto II sem integrá-la ao texto."
    ],
    "model": "Os algoritmos de recomendação registram o que cada usuário curte, comenta e assiste e, com base nesse histórico, selecionam conteúdos semelhantes para mantê-lo conectado. Com o tempo, a pessoa passa a receber sobretudo informações que confirmam suas próprias opiniões e tem pouco contato com visões diferentes, o que forma uma bolha de informação. Para evitar a circulação de notícias falsas nesse ambiente, é importante verificar quem publicou o conteúdo e se a fonte é confiável, além de procurar a mesma informação em outros veículos antes de compartilhá-la."
   },
   {
    "id": "vfc-disc-02",
    "n": 2,
    "s": "linguagens",
    "points": 10,
    "kind": "Argumentativo",
    "title": "Carros na faixa de areia",
    "texts": [
     {
      "label": "Texto I",
      "body": "Em algumas praias do litoral sul do Brasil, como a do Cassino, em Rio Grande, veículos circulam pela faixa de areia, prática antiga que facilita o acesso a trechos distantes e ao comércio da orla. Pesquisadores alertam, porém, para o atropelamento de animais, a compactação da areia, os riscos aos banhistas e os danos às dunas.",
      "source": "Texto autoral para fins didáticos."
     },
     {
      "label": "Texto II",
      "body": "“Sem o carro, muita gente não teria como chegar aos pontos mais afastados da praia, principalmente idosos e famílias com crianças. O problema não é o carro, é a falta de fiscalização.” — depoimento de um morador (personagem fictício).",
      "source": "Texto autoral para fins didáticos."
     }
    ],
    "cmd": "A partir dos textos, **posicione-se** sobre a seguinte questão: **o tráfego de veículos na faixa de areia das praias deve ser proibido?** Escreva um texto **argumentativo** de **5 a 10 linhas**, com tese clara, pelo menos um argumento desenvolvido e uma proposta ou exemplo concreto.",
    "expect": [
     "Tese explícita no início (proibir, manter ou permitir com restrições).",
     "Pelo menos um argumento desenvolvido, dialogando com um dos textos (meio ambiente, segurança, acesso ou economia).",
     "Uma proposta ou exemplo concreto (áreas de estacionamento, transporte coletivo, faixas delimitadas, fiscalização).",
     "Conclusão coerente com a tese, sem contradição."
    ],
    "traps": [
     "Ficar em cima do muro.",
     "Resumir os textos sem tomar posição.",
     "Esquecer a proposta ou o exemplo pedido no comando."
    ],
    "model": "O tráfego de veículos na faixa de areia deve ser proibido, desde que acompanhado de alternativas de acesso. A circulação de carros compacta a areia, ameaça animais e dunas e coloca banhistas em risco, como apontam pesquisadores. É verdade, como lembra o morador, que idosos e famílias dependem do carro para chegar a pontos distantes. Por isso, a proibição pode vir junto de estacionamentos nas entradas da praia e de linhas de transporte coletivo ao longo da orla, garantindo o acesso sem degradar o ambiente. Assim, preserva-se a praia e o direito de todos de aproveitá-la."
   }
  ]
 }
};
 (globalThis.FURG_VESTIBULARES ||= []).push(data);
 globalThis.FURG_VESTIBULAR ||= data;
})();
