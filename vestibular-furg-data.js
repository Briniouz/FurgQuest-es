'use strict';
// Simulado FURG 2026 · Versão B — questões autorais do BriniouzStudy, na mesma divisão de matérias do simulado da FURG.
// Gerado por build.js a partir das fontes; as figuras estão em vestibular-furg-figuras*.js.
(() => {
 const data = {
 "id": "furg-2026-b",
 "version": "B",
 "title": "Simulado FURG 2026 · Versão B",
 "subtitle": "Versão alternativa autoral, com a mesma divisão de matérias do simulado da FURG",
 "minutes": 330,
 "pdf": "simulados/simulado-furg-2026-versao-b.pdf",
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
     "id": "vf-bio-01",
     "n": 1,
     "t": "Ecologia",
     "lv": 2,
     "ctx": "No estuário da Laguna dos Patos, no extremo sul do Brasil, pesquisadores acompanham a transferência de contaminantes, como o mercúrio, ao longo da teia alimentar. A figura representa, de forma simplificada, parte dessa teia. As setas indicam o sentido do fluxo de matéria e energia.",
     "fig": "bio-teia",
     "stem": "Considerando que o mercúrio é pouco excretado pelos organismos e se acumula em seus tecidos, assinale a alternativa correta.",
     "opts": [
      "O fitoplâncton deve apresentar a maior concentração de mercúrio, pois é o primeiro nível trófico e absorve o metal diretamente da água.",
      "A energia disponível aumenta a cada nível trófico, o que explica o acúmulo de mercúrio nos consumidores.",
      "O biguá tende a apresentar a maior concentração de mercúrio, pois ocupa as posições mais altas da teia, fenômeno conhecido como biomagnificação.",
      "O biguá ocupa apenas o terceiro nível trófico, já que se alimenta somente de consumidores primários.",
      "A eliminação do zooplâncton aumentaria a quantidade de alimento disponível para o camarão-rosa e para a manjuba."
     ],
     "ans": "C",
     "why": "Substâncias pouco excretadas se acumulam e ficam mais concentradas a cada nível trófico (biomagnificação). O biguá come corvina (4º nível) e manjuba (3º nível), então ocupa o 4º e o 5º níveis: é o organismo com maior concentração esperada."
    },
    {
     "id": "vf-bio-02",
     "n": 2,
     "t": "Citologia",
     "lv": 2,
     "ctx": "Em uma aula prática, três tubos (I, II e III) receberam hemácias humanas suspensas em soluções de cloreto de sódio com concentrações diferentes. Após alguns minutos, uma gota de cada tubo foi observada ao microscópio, e o aspecto das células está representado na figura.",
     "fig": "bio-hemacias",
     "stem": "Com base nas observações, é correto afirmar que",
     "opts": [
      "no tubo II, a solução era hipertônica em relação ao citoplasma, e as hemácias ganharam sais por transporte ativo.",
      "no tubo III, as hemácias perderam água por osmose, pois a solução era hipertônica em relação ao meio intracelular.",
      "no tubo I, as hemácias estavam em solução hipotônica, por isso mantiveram a forma bicôncava.",
      "nos três tubos, a forma das hemácias se manteve porque a membrana plasmática é impermeável à água.",
      "no tubo II, as hemácias murcharam porque a água saiu das células para o meio externo."
     ],
     "ans": "B",
     "why": "I: forma normal, solução isotônica. II: células inchadas e rompidas, solução hipotônica (a água entrou por osmose). III: células murchas e crenadas, solução hipertônica (a água saiu por osmose)."
    },
    {
     "id": "vf-bio-03",
     "n": 3,
     "t": "Genética",
     "lv": 3,
     "ctx": "O heredograma representa uma família em que alguns indivíduos apresentam albinismo, característica determinada por um alelo autossômico recessivo. Os símbolos escuros indicam pessoas albinas.",
     "fig": "bio-heredograma",
     "stem": "A probabilidade de o primeiro filho do casal formado por II-3 e II-4 ser albino é de",
     "opts": [
      "1/8",
      "1/6",
      "1/4",
      "1/3",
      "1/2"
     ],
     "ans": "D",
     "why": "I-1 e I-2 são normais e tiveram um filho albino (II-1): ambos são Aa. II-3 é normal, então pode ser AA (1/3) ou Aa (2/3). II-4 é albino (aa). P = 2/3 × 1/2 = 1/3."
    },
    {
     "id": "vf-bio-04",
     "n": 4,
     "t": "Evolução",
     "lv": 2,
     "ctx": "O braço humano, a nadadeira peitoral da baleia e a asa do morcego apresentam o mesmo padrão de ossos (úmero, rádio, ulna e falanges), embora desempenhem funções diferentes. Já a asa do morcego e a asa de um inseto permitem o voo, mas têm estruturas e origens embrionárias muito distintas.",
     "stem": "Sobre essas estruturas, assinale a alternativa correta.",
     "opts": [
      "A asa do morcego e a asa do inseto são órgãos homólogos, pois desempenham a mesma função.",
      "O braço humano e a nadadeira da baleia são órgãos análogos, pois foram moldados pelo mesmo ambiente.",
      "A semelhança entre a asa do morcego e a do inseto indica que esses animais têm um ancestral comum recente e exclusivo.",
      "A asa do morcego e a asa do inseto são órgãos análogos, resultado de evolução convergente diante de pressões seletivas semelhantes.",
      "Órgãos homólogos surgem porque os indivíduos modificam o próprio corpo pelo uso e transmitem essas mudanças aos descendentes."
     ],
     "ans": "D",
     "why": "Homólogos têm a mesma origem embrionária e evolutiva (braço, nadadeira e asa do morcego: divergência adaptativa). Análogos têm a mesma função e origens diferentes (asa do morcego e do inseto: convergência). A última alternativa descreve a ideia lamarckista, rejeitada."
    },
    {
     "id": "vf-bio-05",
     "n": 5,
     "t": "Botânica",
     "lv": 2,
     "ctx": "Para demarcar um terreno, um agricultor retirou um anel completo da casca do tronco de uma árvore, removendo os tecidos situados externamente ao lenho, procedimento conhecido como anelamento. Nas semanas seguintes, as folhas continuaram verdes, mas, depois de alguns meses, a árvore morreu.",
     "stem": "A morte da árvore pode ser explicada porque o anelamento",
     "opts": [
      "interrompeu o xilema, impedindo imediatamente a subida de água e sais minerais até as folhas.",
      "eliminou os estômatos do tronco, responsáveis pela maior parte da fotossíntese da planta.",
      "removeu o floema, interrompendo o transporte da seiva elaborada até as raízes, que deixaram de receber açúcares.",
      "provocou a perda dos meristemas apicais, que são os únicos tecidos capazes de realizar respiração celular.",
      "destruiu os cloroplastos da casca, impedindo a produção de oxigênio pela planta."
     ],
     "ans": "C",
     "why": "O floema fica na casca e leva a seiva elaborada (açúcares) das folhas às raízes. Sem ele, as raízes esgotam suas reservas e morrem; o xilema, no lenho, continua levando água por um tempo, por isso as folhas ficam verdes no início."
    },
    {
     "id": "vf-bio-06",
     "n": 6,
     "t": "Fisiologia humana",
     "lv": 2,
     "ctx": "O gráfico mostra a variação da concentração de glicose e de insulina no sangue de uma pessoa saudável, em jejum, antes e depois de uma refeição rica em carboidratos, feita no instante zero.",
     "fig": "bio-glicemia",
     "stem": "A partir do gráfico e dos conhecimentos sobre o controle da glicemia, assinale a alternativa correta.",
     "opts": [
      "O aumento da insulina após a refeição favorece a entrada de glicose nas células e a formação de glicogênio, contribuindo para o retorno da glicemia ao nível de jejum.",
      "O glucagon é o hormônio que aumenta logo após a refeição, reduzindo a glicemia.",
      "A insulina é produzida pelo fígado e aumenta antes da elevação da glicose no sangue.",
      "Em uma pessoa com diabetes tipo 1, a curva de insulina seria mais alta que a representada, pois há excesso de produção do hormônio.",
      "A glicemia permanece constante após a refeição, porque a glicose dos alimentos não é absorvida pelo intestino."
     ],
     "ans": "A",
     "why": "A glicose sobe após a refeição; o pâncreas (células beta) libera insulina, que promove a captação de glicose e a síntese de glicogênio, e a glicemia volta ao basal. No diabetes tipo 1, a produção de insulina é baixa ou ausente."
    },
    {
     "id": "vf-bio-07",
     "n": 7,
     "t": "Saúde",
     "lv": 1,
     "ctx": "Após as enchentes que atingiram o Rio Grande do Sul em 2024, as autoridades de saúde emitiram alertas sobre o aumento dos casos de leptospirose. A doença é causada por bactérias do gênero Leptospira, eliminadas principalmente na urina de roedores, e pode atingir pessoas que entram em contato com água ou lama contaminadas.",
     "stem": "Assinale a alternativa que apresenta uma medida de prevenção coerente com a forma de transmissão da doença.",
     "opts": [
      "Usar repelente e telas nas janelas, pois a doença é transmitida pela picada de mosquitos.",
      "Tomar antivirais logo após o contato com a água, já que o agente causador é um vírus.",
      "Evitar o contato da pele com água e lama de enchentes, usando botas e luvas na limpeza, e controlar a presença de roedores.",
      "Ferver os alimentos antes de comê-los, pois a doença é transmitida exclusivamente pela ingestão de carne crua.",
      "Evitar conversar com pessoas doentes, porque a transmissão ocorre principalmente por gotículas respiratórias."
     ],
     "ans": "C",
     "why": "A Leptospira (bactéria) penetra pela pele, sobretudo com ferimentos, ou por mucosas em contato com água e lama contaminadas pela urina de roedores. Proteção física e controle de ratos são as medidas coerentes."
    },
    {
     "id": "vf-bio-08",
     "n": 8,
     "t": "Citologia",
     "lv": 2,
     "ctx": "No corpo humano, as células da pele se renovam constantemente por um tipo de divisão celular, enquanto nas gônadas a formação dos gametas envolve outro tipo de divisão, essencial para a reprodução sexuada.",
     "stem": "Comparando os dois processos, é correto afirmar que",
     "opts": [
      "a mitose origina quatro células haploides geneticamente diferentes, utilizadas na reprodução.",
      "a meiose mantém o número de cromossomos da célula-mãe, produzindo duas células idênticas.",
      "a mitose ocorre apenas em células germinativas e é responsável pela variabilidade genética.",
      "as duas divisões produzem células com 23 cromossomos no ser humano.",
      "a meiose reduz o número de cromossomos à metade e, por meio do crossing-over e da segregação independente, aumenta a variabilidade genética."
     ],
     "ans": "E",
     "why": "Mitose: 2 células diploides idênticas (46 cromossomos), crescimento e renovação. Meiose: 4 células haploides (23 cromossomos), com variabilidade pelo crossing-over (prófase I) e pela segregação independente."
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
     "id": "vf-fis-01",
     "n": 1,
     "t": "Cinemática",
     "lv": 2,
     "ctx": "Um ciclista treina em um trecho retilíneo da orla da praia do Cassino, em Rio Grande. O gráfico representa a velocidade do ciclista em função do tempo durante um dos tiros do treino.",
     "fig": "fis-vt",
     "stem": "A distância percorrida nos 12 s e o módulo da aceleração no trecho final do movimento são, respectivamente,",
     "opts": [
      "60 m e 2,5 m/s².",
      "80 m e 5,0 m/s².",
      "90 m e 2,5 m/s².",
      "90 m e 5,0 m/s².",
      "120 m e 10 m/s²."
     ],
     "ans": "D",
     "why": "A distância é a área sob o gráfico: (4·10)/2 + 6·10 + (2·10)/2 = 20 + 60 + 10 = 90 m. No trecho final, a velocidade cai de 10 m/s a 0 em 2 s: |a| = 10/2 = 5,0 m/s²."
    },
    {
     "id": "vf-fis-02",
     "n": 2,
     "t": "Dinâmica",
     "lv": 2,
     "ctx": "Dois blocos, A (3,0 kg) e B (2,0 kg), estão encostados sobre uma superfície horizontal sem atrito. Uma força horizontal constante de 20 N é aplicada ao bloco A, que empurra o bloco B, como mostra a figura.",
     "fig": "fis-blocos",
     "stem": "O módulo da força que o bloco A exerce sobre o bloco B é",
     "opts": [
      "8,0 N.",
      "10 N.",
      "12 N.",
      "16 N.",
      "20 N."
     ],
     "ans": "A",
     "why": "O conjunto tem aceleração a = F/(mA + mB) = 20/5 = 4,0 m/s². Sobre B atua só a força de A: F = mB·a = 2,0·4,0 = 8,0 N."
    },
    {
     "id": "vf-fis-03",
     "n": 3,
     "t": "Hidrostática",
     "lv": 2,
     "ctx": "Uma prancha de madeira maciça, de densidade 600 kg/m³, flutua em equilíbrio na água doce da Laguna dos Patos, cuja densidade é 1.000 kg/m³. Depois, a mesma prancha é levada para o mar, onde a densidade da água é de aproximadamente 1.030 kg/m³.",
     "stem": "A fração do volume da prancha que fica submersa na água doce e o que ocorre ao colocá-la no mar são, respectivamente:",
     "opts": [
      "40%; a prancha afunda um pouco mais no mar.",
      "60%; a prancha afunda um pouco mais no mar.",
      "60%; a prancha fica um pouco menos submersa no mar.",
      "60%; a prancha afunda completamente no mar.",
      "100%; a prancha passa a flutuar no mar."
     ],
     "ans": "C",
     "why": "Flutuando, peso = empuxo: Vsub/V = d(madeira)/d(líquido) = 600/1000 = 0,6 (60%). No mar, a água é mais densa, então basta um volume submerso menor (600/1030 ≈ 58%)."
    },
    {
     "id": "vf-fis-04",
     "n": 4,
     "t": "Termologia",
     "lv": 2,
     "ctx": "Um trilho de aço de 20 m de comprimento é instalado em uma manhã de inverno, a 5 °C. Em um dia de verão, sob sol forte, sua temperatura chega a 45 °C. O coeficiente de dilatação linear do aço é 1,2 × 10⁻⁵ °C⁻¹.",
     "stem": "O aumento no comprimento do trilho, entre as duas situações, é de",
     "opts": [
      "9,6 mm.",
      "19,2 mm.",
      "24 mm.",
      "48 mm.",
      "96 mm."
     ],
     "ans": "A",
     "why": "ΔL = L₀·α·ΔT = 20 · 1,2×10⁻⁵ · 40 = 9,6×10⁻³ m = 9,6 mm. É por isso que se deixam pequenas folgas entre os trilhos."
    },
    {
     "id": "vf-fis-05",
     "n": 5,
     "t": "Eletricidade",
     "lv": 3,
     "ctx": "No circuito da figura, uma bateria ideal de 12 V alimenta um resistor de 2,0 Ω associado em série a dois resistores em paralelo, de 6,0 Ω e de 3,0 Ω.",
     "fig": "fis-circuito",
     "stem": "A intensidade da corrente elétrica no resistor de 3,0 Ω é",
     "opts": [
      "0,5 A.",
      "1,0 A.",
      "1,5 A.",
      "2,0 A.",
      "3,0 A."
     ],
     "ans": "D",
     "why": "Paralelo: 6·3/(6+3) = 2,0 Ω. Total: 2,0 + 2,0 = 4,0 Ω, corrente total I = 12/4 = 3,0 A. Tensão no paralelo: 3,0·2,0 = 6,0 V. No resistor de 3,0 Ω: 6,0/3,0 = 2,0 A (e 1,0 A no de 6,0 Ω)."
    },
    {
     "id": "vf-fis-06",
     "n": 6,
     "t": "Óptica",
     "lv": 2,
     "ctx": "Um feixe de luz monocromática passa do ar (n = 1,0) para um bloco de vidro (n = 1,5), incidindo com ângulo de 37° em relação à normal. Considere sen 37° = 0,60 e a velocidade da luz no ar igual a 3,0 × 10⁸ m/s.",
     "fig": "fis-refracao",
     "stem": "O seno do ângulo de refração e a velocidade da luz no vidro são, respectivamente,",
     "opts": [
      "0,90 e 2,0 × 10⁸ m/s.",
      "0,90 e 4,5 × 10⁸ m/s.",
      "0,60 e 3,0 × 10⁸ m/s.",
      "0,40 e 4,5 × 10⁸ m/s.",
      "0,40 e 2,0 × 10⁸ m/s."
     ],
     "ans": "E",
     "why": "Lei de Snell: 1,0 · 0,60 = 1,5 · sen r → sen r = 0,40 (o raio se aproxima da normal). v = c/n = 3,0×10⁸/1,5 = 2,0×10⁸ m/s."
    },
    {
     "id": "vf-fis-07",
     "n": 7,
     "t": "Energia",
     "lv": 2,
     "ctx": "Em uma pequena central hidrelétrica, a água cai de uma altura de 50 m com vazão de 2,0 m³/s. Considere g = 10 m/s², a densidade da água igual a 1.000 kg/m³ e que 80% da energia potencial da água seja convertida em energia elétrica.",
     "stem": "A potência elétrica fornecida pela central é",
     "opts": [
      "800 kW.",
      "1.000 kW.",
      "1.250 kW.",
      "8.000 kW.",
      "10.000 kW."
     ],
     "ans": "A",
     "why": "Massa por segundo: 2,0 m³/s · 1.000 kg/m³ = 2.000 kg/s. Potência disponível: 2.000 · 10 · 50 = 1,0×10⁶ W. Com 80%: 8,0×10⁵ W = 800 kW."
    },
    {
     "id": "vf-fis-08",
     "n": 8,
     "t": "Física moderna",
     "lv": 2,
     "ctx": "No efeito fotoelétrico, a luz que incide sobre uma placa metálica pode arrancar elétrons de sua superfície. Em um experimento, verificou-se que uma luz vermelha muito intensa não arrancava elétrons de certo metal, enquanto uma luz ultravioleta fraca arrancava.",
     "stem": "Esse resultado é explicado corretamente pela ideia de que",
     "opts": [
      "a energia transferida a cada elétron depende apenas da intensidade da luz, como prevê o modelo ondulatório clássico.",
      "a luz vermelha não se propaga no vácuo, por isso não atinge o metal.",
      "quanto maior a intensidade da luz, maior a energia de cada fóton, independentemente da frequência.",
      "os elétrons são arrancados apenas quando a luz tem comprimento de onda maior que o da luz vermelha.",
      "a luz é formada por fótons de energia E = h·f; só fótons com frequência acima de um valor mínimo arrancam elétrons, e a intensidade altera apenas a quantidade de fótons."
     ],
     "ans": "E",
     "why": "Einstein explicou o efeito com fótons de energia E = h·f. O ultravioleta tem frequência maior que o vermelho; se a frequência está abaixo da frequência de corte do metal, nenhum elétron sai, por mais intensa que seja a luz."
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
     "id": "vf-qui-01",
     "n": 1,
     "t": "Misturas e separação",
     "lv": 1,
     "ctx": "Em uma aula, um estudante recebeu uma mistura de areia, água e sal de cozinha completamente dissolvido. Seu objetivo era recuperar a areia e obter água sem sal.",
     "stem": "A sequência de processos mais adequada para atingir esse objetivo é",
     "opts": [
      "decantação e, depois, filtração.",
      "filtração e, depois, destilação simples.",
      "destilação fracionada e, depois, centrifugação.",
      "catação e, depois, sublimação.",
      "filtração e, depois, decantação."
     ],
     "ans": "B",
     "why": "A filtração separa a areia (sólido insolúvel). A destilação simples separa a água (que evapora e é condensada) do sal dissolvido, que fica no balão."
    },
    {
     "id": "vf-qui-02",
     "n": 2,
     "t": "Estrutura atômica",
     "lv": 1,
     "ctx": "O alumínio, metal usado em latas e esquadrias, tem número atômico 13 e número de massa 27. Em seus compostos, forma o íon Al³⁺.",
     "stem": "O número de prótons, de elétrons e de nêutrons do íon Al³⁺ é, respectivamente,",
     "opts": [
      "13, 13 e 14.",
      "10, 13 e 14.",
      "13, 16 e 14.",
      "27, 10 e 13.",
      "13, 10 e 14."
     ],
     "ans": "E",
     "why": "Prótons = Z = 13. Nêutrons = A − Z = 27 − 13 = 14. O cátion 3+ perdeu 3 elétrons: 13 − 3 = 10."
    },
    {
     "id": "vf-qui-03",
     "n": 3,
     "t": "Ligações e geometria",
     "lv": 2,
     "ctx": "A geometria das moléculas e a diferença de eletronegatividade entre os átomos determinam se uma molécula é polar ou apolar, o que influencia propriedades como a solubilidade e o ponto de ebulição.",
     "stem": "Assinale a alternativa que associa corretamente a molécula à sua geometria e à sua polaridade.",
     "opts": [
      "CO₂: angular e polar.",
      "H₂O: linear e apolar.",
      "NH₃: piramidal e polar.",
      "CH₄: quadrada plana e polar.",
      "BF₃: piramidal e polar."
     ],
     "ans": "C",
     "why": "NH₃ tem um par de elétrons livre no N: geometria piramidal, vetores não se anulam, polar. CO₂ é linear e apolar; H₂O é angular e polar; CH₄ é tetraédrica e apolar; BF₃ é trigonal plana e apolar."
    },
    {
     "id": "vf-qui-04",
     "n": 4,
     "t": "Estequiometria",
     "lv": 2,
     "ctx": "Na produção da cal virgem (CaO), o calcário é aquecido e o carbonato de cálcio se decompõe segundo a equação CaCO₃(s) → CaO(s) + CO₂(g). Considere uma amostra de 200 g de calcário com 80% de pureza em CaCO₃. Massas molares: CaCO₃ = 100 g/mol; CO₂ = 44 g/mol.",
     "stem": "Admitindo decomposição completa do CaCO₃, a massa de CO₂ liberada é",
     "opts": [
      "35,2 g.",
      "44,0 g.",
      "56,0 g.",
      "70,4 g.",
      "88,0 g."
     ],
     "ans": "D",
     "why": "CaCO₃ puro: 0,80 · 200 = 160 g = 1,6 mol. A proporção é 1 : 1, então forma 1,6 mol de CO₂ = 1,6 · 44 = 70,4 g."
    },
    {
     "id": "vf-qui-05",
     "n": 5,
     "t": "Soluções",
     "lv": 3,
     "ctx": "O gráfico mostra a curva de solubilidade de um sal X em água, em gramas de sal por 100 g de água. Um técnico preparou uma solução saturada desse sal com 100 g de água a 60 °C e, depois, resfriou o sistema lentamente até 20 °C.",
     "fig": "qui-solubilidade",
     "stem": "A massa de sal X que cristaliza (precipita) durante o resfriamento é de aproximadamente",
     "opts": [
      "32 g.",
      "46 g.",
      "64 g.",
      "72 g.",
      "78 g."
     ],
     "ans": "E",
     "why": "A 60 °C, 100 g de água dissolvem 110 g de X. A 20 °C, só 32 g ficam dissolvidos. O excesso cristaliza: 110 − 32 = 78 g."
    },
    {
     "id": "vf-qui-06",
     "n": 6,
     "t": "Termoquímica",
     "lv": 3,
     "ctx": "A entalpia de formação do monóxido de carbono é difícil de medir diretamente, mas pode ser calculada pela Lei de Hess a partir das equações:\nI. C(grafite) + O₂(g) → CO₂(g)   ΔH = −394 kJ/mol\nII. CO(g) + ½ O₂(g) → CO₂(g)   ΔH = −283 kJ/mol",
     "stem": "A variação de entalpia da reação C(grafite) + ½ O₂(g) → CO(g) é",
     "opts": [
      "−677 kJ/mol.",
      "−394 kJ/mol.",
      "−283 kJ/mol.",
      "−111 kJ/mol.",
      "+111 kJ/mol."
     ],
     "ans": "D",
     "why": "Mantém-se a equação I e inverte-se a II (ΔH = +283). Somando: C + ½ O₂ → CO, com ΔH = −394 + 283 = −111 kJ/mol."
    },
    {
     "id": "vf-qui-07",
     "n": 7,
     "t": "Equilíbrio e pH",
     "lv": 2,
     "ctx": "Um técnico de laboratório preparou uma solução aquosa de ácido clorídrico (HCl), ácido forte totalmente ionizado, de concentração 0,01 mol/L, a 25 °C. Em seguida, retirou uma amostra dessa solução e a diluiu com água até que o volume ficasse 100 vezes maior.",
     "stem": "Sobre o pH antes e depois da diluição, assinale a alternativa correta.",
     "opts": [
      "O pH passou de 2 para 0, pois a diluição concentra os íons H⁺.",
      "O pH passou de 1 para 3, e a concentração de H⁺ ficou 100 vezes menor.",
      "O pH passou de 2 para 4, e a concentração de H⁺ ficou 100 vezes menor.",
      "O pH permaneceu igual a 2, pois a diluição não altera a quantidade de ácido.",
      "O pH passou de 2 para 12, pois a solução se tornou básica."
     ],
     "ans": "C",
     "why": "[H⁺] = 10⁻² mol/L → pH = 2. Diluindo 100 vezes: [H⁺] = 10⁻⁴ mol/L → pH = 4. A solução continua ácida, só que menos."
    },
    {
     "id": "vf-qui-08",
     "n": 8,
     "t": "Química orgânica",
     "lv": 2,
     "ctx": "O ácido láctico, cuja fórmula estrutural está representada na figura, é produzido na fermentação do leite e também nos músculos durante exercícios intensos.",
     "fig": "qui-lactico",
     "stem": "Sobre essa substância, assinale a alternativa correta.",
     "opts": [
      "Apresenta as funções aldeído e cetona e não possui isomeria óptica.",
      "Apresenta um carbono quiral e, por isso, existe na forma de dois isômeros ópticos; suas funções são álcool e ácido carboxílico.",
      "Apresenta isomeria geométrica (cis-trans), pois possui uma ligação dupla entre carbonos.",
      "Possui dois carbonos quirais e, portanto, quatro isômeros ópticos.",
      "É um hidrocarboneto, pois é formado por carbono, hidrogênio e oxigênio."
     ],
     "ans": "B",
     "why": "O carbono central está ligado a quatro grupos diferentes (H, OH, CH₃ e COOH): é quiral, e há dois enantiômeros. Os grupos –OH e –COOH indicam álcool e ácido carboxílico. A dupla está no C=O, não entre carbonos."
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
     "id": "vf-mat-01",
     "n": 1,
     "t": "Logaritmos",
     "lv": 3,
     "ctx": "Uma estudante aplicou suas economias em um investimento que rende juros compostos de 20% ao ano. Ela quer saber em quanto tempo o valor aplicado dobrará, sem novos depósitos nem retiradas. Considere log 2 = 0,30 e log 3 = 0,48.",
     "stem": "O tempo necessário para que o valor aplicado dobre é de",
     "opts": [
      "2,00 anos.",
      "2,50 anos.",
      "3,00 anos.",
      "3,40 anos.",
      "3,75 anos."
     ],
     "ans": "E",
     "why": "(1,2)ᵗ = 2 → t = log 2 / log 1,2. log 1,2 = log 12 − 1 = (2·log 2 + log 3) − 1 = 0,60 + 0,48 − 1 = 0,08. t = 0,30/0,08 = 3,75 anos."
    },
    {
     "id": "vf-mat-02",
     "n": 2,
     "t": "Geometria analítica",
     "lv": 2,
     "ctx": "Em um sistema de coordenadas cartesianas, considere a circunferência de equação x² + y² − 6x + 4y − 12 = 0 e o ponto P(6, 2).",
     "stem": "O centro e o raio dessa circunferência e a posição do ponto P em relação a ela são:",
     "opts": [
      "centro (−3, 2), raio 5; P é externo.",
      "centro (3, −2), raio 5; P pertence à circunferência.",
      "centro (3, −2), raio 25; P é interno.",
      "centro (6, −4), raio √12; P é externo.",
      "centro (3, −2), raio 5; P é interno."
     ],
     "ans": "B",
     "why": "Completando quadrados: (x − 3)² + (y + 2)² = 9 + 4 + 12 = 25 → centro (3, −2), raio 5. Distância de P ao centro: √(3² + 4²) = 5 = r, então P pertence à circunferência."
    },
    {
     "id": "vf-mat-03",
     "n": 3,
     "t": "Análise combinatória",
     "lv": 2,
     "ctx": "Uma turma de cursinho tem 5 meninas e 4 meninos interessados em organizar a feira de profissões. Será formada uma comissão de 3 estudantes, sem distinção de cargos.",
     "stem": "O número de comissões possíveis com pelo menos um menino é",
     "opts": [
      "74.",
      "80.",
      "84.",
      "120.",
      "126."
     ],
     "ans": "A",
     "why": "Total de comissões: C(9, 3) = 84. Comissões só com meninas: C(5, 3) = 10. Com pelo menos um menino: 84 − 10 = 74."
    },
    {
     "id": "vf-mat-04",
     "n": 4,
     "t": "Estatística",
     "lv": 2,
     "ctx": "O gráfico mostra a distribuição das notas, de 0 a 10, obtidas pelos 20 estudantes de uma turma em uma avaliação de Matemática.",
     "fig": "mat-notas",
     "stem": "A média, a mediana e a moda dessas notas são, respectivamente,",
     "opts": [
      "6,0; 6,0 e 7.",
      "6,4; 6,0 e 6.",
      "6,5; 6,4 e 7.",
      "7,0; 6,5 e 6.",
      "6,4; 6,5 e 7."
     ],
     "ans": "E",
     "why": "Média: (4·2 + 5·3 + 6·5 + 7·6 + 8·3 + 9·1)/20 = 128/20 = 6,4. Mediana: média entre a 10ª e a 11ª notas em ordem (6 e 7) = 6,5. Moda: 7 (maior frequência, 6 estudantes)."
    },
    {
     "id": "vf-mat-05",
     "n": 5,
     "t": "Trigonometria",
     "lv": 3,
     "ctx": "Um terreno triangular tem dois lados que medem 50 m e 80 m, formando entre si um ângulo de 60°, como mostra a figura. O proprietário quer cercar todo o perímetro do terreno. Considere cos 60° = 0,5.",
     "fig": "mat-triangulo",
     "stem": "O comprimento total da cerca, em metros, será de",
     "opts": [
      "200.",
      "210.",
      "220.",
      "230.",
      "250."
     ],
     "ans": "A",
     "why": "Lei dos cossenos: x² = 50² + 80² − 2·50·80·0,5 = 2.500 + 6.400 − 4.000 = 4.900 → x = 70 m. Perímetro: 50 + 80 + 70 = 200 m."
    },
    {
     "id": "vf-mat-06",
     "n": 6,
     "t": "Sistemas lineares",
     "lv": 2,
     "ctx": "Em uma papelaria, 3 cadernos e 2 canetas custam R$ 31,00, enquanto 2 cadernos e 3 canetas custam R$ 24,00. Todos os cadernos têm o mesmo preço, assim como todas as canetas.",
     "stem": "O valor a ser pago por 2 cadernos e 5 canetas é",
     "opts": [
      "R$ 24,00.",
      "R$ 26,00.",
      "R$ 27,00.",
      "R$ 28,00.",
      "R$ 30,00."
     ],
     "ans": "D",
     "why": "3c + 2p = 31 e 2c + 3p = 24. Multiplicando a 1ª por 3 e a 2ª por 2: 9c + 6p = 93 e 4c + 6p = 48 → 5c = 45 → c = 9 e p = 2. Logo, 2·9 + 5·2 = R$ 28,00."
    },
    {
     "id": "vf-mat-07",
     "n": 7,
     "t": "Geometria espacial",
     "lv": 2,
     "ctx": "Um silo para armazenar grãos é formado por um cilindro circular reto com uma cobertura em forma de cone, ambos com raio interno de 3 m, como mostra a figura. A altura do cilindro é 10 m, e a do cone é 4 m. Use π = 3,14.",
     "fig": "mat-silo",
     "stem": "A capacidade total do silo é de",
     "opts": [
      "282,60 m³.",
      "320,28 m³.",
      "339,12 m³.",
      "395,64 m³.",
      "408,20 m³."
     ],
     "ans": "B",
     "why": "Cilindro: π·3²·10 = 90π. Cone: (1/3)·π·3²·4 = 12π. Total: 102π = 102 · 3,14 = 320,28 m³."
    },
    {
     "id": "vf-mat-08",
     "n": 8,
     "t": "Probabilidade",
     "lv": 3,
     "ctx": "Dois dados comuns, não viciados, com faces numeradas de 1 a 6, são lançados simultaneamente. Sabe-se que a soma dos números obtidos foi 8.",
     "stem": "Nessas condições, a probabilidade de os dois números obtidos serem pares é",
     "opts": [
      "1/6.",
      "1/4.",
      "1/3.",
      "3/5.",
      "3/4."
     ],
     "ans": "D",
     "why": "Probabilidade condicional: os pares com soma 8 são (2,6), (3,5), (4,4), (5,3) e (6,2) — 5 casos. Com os dois números pares: (2,6), (4,4) e (6,2) — 3 casos. P = 3/5."
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
     "id": "vf-filo-01",
     "n": 1,
     "t": "Mito e filosofia",
     "lv": 1,
     "ctx": "Por volta do século VI a.C., nas colônias gregas da Jônia, pensadores como Tales de Mileto passaram a procurar o princípio (arché) de todas as coisas na própria natureza (physis). Para Tales, esse princípio seria a água. Ainda que sua resposta pareça simples hoje, a pergunta que ele formulou marcou uma mudança no modo de explicar o mundo.",
     "stem": "Essa mudança caracteriza-se",
     "opts": [
      "pela substituição das explicações racionais por narrativas sobre a vontade dos deuses.",
      "pela busca de explicações racionais e argumentáveis para a origem e a transformação da natureza, que podiam ser discutidas e contestadas.",
      "pela aceitação de que apenas os sacerdotes poderiam explicar os fenômenos naturais.",
      "pelo abandono de qualquer interesse pela natureza, substituído pelo estudo exclusivo da ética.",
      "pela comprovação experimental, em laboratório, de que a água é o elemento básico da matéria."
     ],
     "ans": "B",
     "why": "Os pré-socráticos procuraram um princípio natural e explicações que podiam ser examinadas e criticadas. É a passagem do mito ao logos, sem que isso signifique método experimental moderno."
    },
    {
     "id": "vf-filo-02",
     "n": 2,
     "t": "Teoria do conhecimento",
     "lv": 2,
     "ctx": "Nas Meditações, René Descartes decide duvidar de tudo aquilo de que for possível duvidar: das informações dos sentidos, que às vezes enganam, e até da existência do próprio corpo. Ao final desse percurso, encontra uma certeza que resiste a qualquer dúvida.",
     "stem": "Sobre o método cartesiano, assinale a alternativa correta.",
     "opts": [
      "Descartes é um empirista, pois considera que todo conhecimento verdadeiro vem dos sentidos.",
      "A dúvida cartesiana é ceticismo absoluto, já que conclui que nenhum conhecimento é possível.",
      "Para Descartes, a mente humana é uma tábula rasa, preenchida apenas pelas experiências.",
      "A dúvida é usada como método para chegar a uma verdade indubitável: o fato de pensar prova a existência de quem pensa (“penso, logo existo”).",
      "Descartes afirma que as verdades devem ser aceitas pela tradição e pela autoridade dos antigos."
     ],
     "ans": "D",
     "why": "Descartes, racionalista, usa a dúvida metódica (não definitiva) para encontrar um fundamento seguro: o cogito. Tábula rasa é uma ideia empirista (Locke)."
    },
    {
     "id": "vf-filo-03",
     "n": 3,
     "t": "Ética",
     "lv": 2,
     "ctx": "Na Ética a Nicômaco, Aristóteles afirma que todas as ações humanas visam a algum bem e que o bem supremo é a felicidade (eudaimonia). Para alcançá-la, é preciso cultivar as virtudes, que não nascem prontas em nós.",
     "stem": "De acordo com a ética aristotélica,",
     "opts": [
      "a virtude moral é adquirida pelo hábito e consiste na justa medida entre dois vícios, um por excesso e outro por falta, como a coragem entre a covardia e a temeridade.",
      "a felicidade corresponde ao prazer imediato, buscado sem qualquer limite.",
      "a virtude é inata e independe da educação e da prática.",
      "uma ação é moral apenas se puder ser transformada em lei universal, como defende o imperativo categórico.",
      "a vida política é irrelevante para a ética, pois o ser humano vive isolado."
     ],
     "ans": "A",
     "why": "Para Aristóteles, a virtude ética é hábito, a mediania entre excesso e falta, orientada pela razão prática. O imperativo categórico é de Kant; o ser humano é, para Aristóteles, um animal político."
    },
    {
     "id": "vf-filo-04",
     "n": 4,
     "t": "Filosofia da ciência",
     "lv": 3,
     "ctx": "O filósofo Karl Popper observou que nenhuma quantidade de cisnes brancos observados prova que “todos os cisnes são brancos”, mas a observação de um único cisne negro é suficiente para mostrar que a afirmação é falsa.",
     "stem": "A partir desse exemplo, Popper propôs que uma teoria é científica quando",
     "opts": [
      "é confirmada por um grande número de observações, tornando-se definitivamente verdadeira.",
      "é aceita pela maioria dos cientistas de uma época, independentemente de testes.",
      "não pode ser contrariada por nenhuma observação possível.",
      "se baseia exclusivamente na autoridade de cientistas reconhecidos.",
      "pode ser testada e, em princípio, refutada pela experiência (falseabilidade), sendo sempre provisória."
     ],
     "ans": "E",
     "why": "O critério de demarcação de Popper é a falseabilidade: a ciência avança por conjecturas e refutações, e as teorias são aceitas provisoriamente enquanto resistem aos testes."
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
     "id": "vf-soc-05",
     "n": 5,
     "t": "Durkheim",
     "lv": 2,
     "ctx": "Em uma formatura, os estudantes usam beca, seguem o protocolo da cerimônia e aplaudem nos momentos previstos. Quem decide aparecer de bermuda ou interromper o discurso costuma ser repreendido pelos colegas e pela organização, ainda que nenhuma lei proíba esses comportamentos.",
     "stem": "Para Émile Durkheim, essas regras são exemplos de fatos sociais, porque",
     "opts": [
      "são escolhas individuais e livres, que não sofrem influência da sociedade.",
      "existem apenas na consciência de cada pessoa e desaparecem quando ela deixa o grupo.",
      "são exteriores aos indivíduos, exercem coerção sobre eles e são gerais no grupo.",
      "dependem do carisma de um líder que impõe sua vontade pessoal.",
      "resultam da exploração do trabalho e da apropriação da mais-valia."
     ],
     "ans": "C",
     "why": "Fato social, para Durkheim, é toda maneira de agir exterior ao indivíduo, coercitiva e geral. A sanção difusa (repreensão) mostra a coerção."
    },
    {
     "id": "vf-soc-06",
     "n": 6,
     "t": "Weber",
     "lv": 2,
     "ctx": "Max Weber identificou três tipos puros de dominação legítima, isto é, de autoridade aceita por quem obedece: a tradicional, a carismática e a racional-legal.",
     "stem": "Assinale a alternativa que exemplifica corretamente a dominação racional-legal.",
     "opts": [
      "Os moradores de uma comunidade obedecem ao chefe porque sempre foi assim com seus pais e avós.",
      "Seguidores obedecem a um líder religioso por acreditarem que ele tem qualidades extraordinárias.",
      "Um grupo aceita as ordens de quem é mais forte fisicamente, sem qualquer justificativa.",
      "Servidores públicos seguem as ordens de um diretor porque ele ocupa um cargo definido por regras e procedimentos impessoais.",
      "Um rei governa porque seu poder é herdado e consagrado pelos costumes."
     ],
     "ans": "D",
     "why": "A dominação racional-legal baseia-se em normas impessoais e na burocracia: obedece-se ao cargo, não à pessoa. Tradição e hereditariedade indicam dominação tradicional; qualidades extraordinárias, carismática."
    },
    {
     "id": "vf-soc-07",
     "n": 7,
     "t": "Marx e o trabalho",
     "lv": 3,
     "ctx": "Em uma fábrica, um trabalhador produz, em uma jornada de 8 horas, mercadorias que serão vendidas por um valor muito superior ao salário que ele recebe pelo dia. Em cerca de 3 horas de trabalho, ele já produz o equivalente ao valor do próprio salário.",
     "stem": "Segundo Karl Marx, a diferença entre o valor produzido pelo trabalhador e o valor pago como salário corresponde",
     "opts": [
      "à mais-valia, apropriada pelo capitalista e base da acumulação de capital.",
      "à solidariedade orgânica, típica das sociedades com alta divisão do trabalho.",
      "ao tipo ideal, instrumento metodológico usado para comparar realidades sociais.",
      "ao fato social, que existe independentemente das relações de produção.",
      "à ação social afetiva, orientada pelas emoções do trabalhador."
     ],
     "ans": "A",
     "why": "Marx chama de mais-valia o valor produzido além do necessário para pagar a força de trabalho; ela é apropriada pelo dono dos meios de produção. Solidariedade orgânica e fato social são conceitos de Durkheim; tipo ideal e ação social, de Weber."
    },
    {
     "id": "vf-soc-08",
     "n": 8,
     "t": "Cultura",
     "lv": 1,
     "ctx": "O antropólogo Roque de Barros Laraia observa que é comum as pessoas considerarem o próprio modo de vida como o mais correto e natural, julgando os costumes de outros povos como estranhos ou inferiores.",
     "stem": "Essa atitude é denominada",
     "opts": [
      "relativismo cultural, que procura compreender cada cultura a partir de seus próprios significados.",
      "aculturação, que é a troca equilibrada de elementos entre culturas.",
      "mobilidade social, que é a mudança de posição de um indivíduo na estrutura social.",
      "socialização secundária, que ocorre na escola e no trabalho.",
      "etnocentrismo, que toma a própria cultura como medida para avaliar as demais."
     ],
     "ans": "E",
     "why": "Etnocentrismo é avaliar outras culturas a partir da própria, tida como padrão. O relativismo cultural é a postura oposta."
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
     "id": "vf-geo-01",
     "n": 1,
     "t": "Cartografia",
     "lv": 2,
     "ctx": "Um mapa de uma região costeira traz a escala gráfica representada na figura, em que cada segmento corresponde a 1 cm no mapa original. Nesse mapa, a distância em linha reta entre um farol (A) e um terminal portuário (B) é de 3,5 cm.",
     "fig": "geo-escala",
     "stem": "A escala numérica do mapa e a distância real entre A e B são, respectivamente,",
     "opts": [
      "1 : 20.000 e 700 m.",
      "1 : 200.000 e 7 km.",
      "1 : 2.000.000 e 70 km.",
      "1 : 200.000 e 70 km.",
      "1 : 2.000 e 7 km."
     ],
     "ans": "B",
     "why": "1 cm no mapa = 2 km = 200.000 cm no terreno → escala 1 : 200.000. Distância real: 3,5 · 2 km = 7 km."
    },
    {
     "id": "vf-geo-02",
     "n": 2,
     "t": "Clima",
     "lv": 2,
     "ctx": "O climograma apresenta dados médios aproximados de temperatura e precipitação de uma cidade brasileira.",
     "fig": "geo-climograma",
     "stem": "O tipo climático representado e uma característica que o identifica são:",
     "opts": [
      "equatorial; temperaturas elevadas o ano todo, com amplitude térmica anual muito baixa.",
      "tropical semiárido; chuvas escassas e concentradas em poucos meses.",
      "tropical típico; verões chuvosos e invernos secos.",
      "subtropical; chuvas bem distribuídas ao longo do ano e amplitude térmica anual marcante, com invernos frescos.",
      "tropical de altitude; temperaturas sempre abaixo de 10 °C."
     ],
     "ans": "D",
     "why": "Todas as barras de chuva ficam perto de 100–140 mm (sem estação seca), e a temperatura varia de cerca de 13 °C no inverno a 24 °C no verão (amplitude de ~10 °C): clima subtropical, típico do Sul do Brasil."
    },
    {
     "id": "vf-geo-03",
     "n": 3,
     "t": "Geologia",
     "lv": 2,
     "ctx": "Terremotos de grande magnitude são frequentes no Chile e no Peru, enquanto no Brasil os tremores costumam ser de baixa magnitude e raramente causam danos.",
     "stem": "Essa diferença é explicada pelo fato de que",
     "opts": [
      "o Brasil está localizado no centro da Placa Sul-Americana, longe das bordas onde as placas interagem com mais intensidade, enquanto Chile e Peru estão próximos do limite convergente entre as placas de Nazca e Sul-Americana.",
      "o território brasileiro não está sobre nenhuma placa tectônica.",
      "os terremotos são causados principalmente pelo clima, mais seco no litoral do Pacífico.",
      "a Cordilheira dos Andes foi formada pelo afastamento entre as placas, o que impede a ocorrência de sismos.",
      "o relevo brasileiro é recente e formado por dobramentos modernos em todo o território."
     ],
     "ans": "A",
     "why": "A maior parte dos sismos ocorre nas bordas das placas. Na costa do Pacífico, a Placa de Nazca mergulha sob a Sul-Americana (subducção), formando os Andes. O Brasil está no interior da placa, sobre estruturas antigas e estáveis."
    },
    {
     "id": "vf-geo-04",
     "n": 4,
     "t": "Hidrografia e litoral",
     "lv": 2,
     "ctx": "A Laguna dos Patos, no Rio Grande do Sul, liga-se ao oceano Atlântico por um canal na região de Rio Grande. Em sua porção sul forma-se um estuário, ambiente em que as águas doces que vêm do interior se misturam às águas salgadas do mar. Essa região é considerada um berçário para espécies como o camarão-rosa, mas também abriga um dos principais portos do país.",
     "stem": "Considerando as características desse ambiente, assinale a alternativa correta.",
     "opts": [
      "O estuário é um ambiente de água exclusivamente salgada, sem influência dos rios.",
      "A salinidade da água no estuário varia conforme a vazão dos rios, os ventos e as marés, o que exige adaptações dos organismos que vivem ali.",
      "Atividades portuárias, como a dragagem do canal, não têm qualquer efeito sobre os ecossistemas estuarinos.",
      "O estuário tem baixa produtividade biológica, pois recebe poucos nutrientes.",
      "A Laguna dos Patos é um lago artificial criado para abastecer o porto de Rio Grande."
     ],
     "ans": "B",
     "why": "Estuários misturam água doce e salgada; a salinidade oscila com a descarga dos rios, o vento e a maré. São ambientes muito produtivos (berçários), e intervenções como dragagem e poluição podem afetá-los."
    },
    {
     "id": "vf-geo-05",
     "n": 5,
     "t": "População",
     "lv": 2,
     "ctx": "A figura representa a pirâmide etária de um país hipotético em 2025, com a participação de cada faixa etária no total da população, por sexo.",
     "fig": "geo-piramide",
     "stem": "A interpretação da pirâmide permite afirmar que esse país",
     "opts": [
      "apresenta taxas de natalidade muito elevadas, pois a base é a parte mais larga da pirâmide.",
      "tem a maior parte da população concentrada acima dos 70 anos.",
      "passa por uma transição demográfica avançada, com redução da natalidade e aumento da participação dos idosos, o que pressiona a previdência e os serviços de saúde.",
      "não apresenta diferenças entre homens e mulheres em nenhuma faixa etária, o que indica ausência de mortalidade.",
      "está em fase inicial da transição demográfica, com expectativa de vida muito baixa."
     ],
     "ans": "C",
     "why": "A base mais estreita que o centro indica queda da natalidade; o topo relativamente largo mostra aumento da expectativa de vida. É o perfil de uma população em envelhecimento."
    },
    {
     "id": "vf-geo-06",
     "n": 6,
     "t": "Urbanização",
     "lv": 1,
     "ctx": "Em muitas regiões brasileiras, o crescimento das cidades fez com que as áreas urbanas de municípios vizinhos se encontrassem, de modo que não é mais possível perceber, na paisagem, onde termina uma cidade e começa outra.",
     "stem": "O fenômeno descrito é denominado",
     "opts": [
      "êxodo rural.",
      "gentrificação.",
      "desmetropolização.",
      "conurbação.",
      "megalópole."
     ],
     "ans": "D",
     "why": "Conurbação é a junção física das malhas urbanas de municípios vizinhos. Megalópole é a ligação entre grandes metrópoles; gentrificação é a valorização de áreas que expulsa moradores de menor renda."
    },
    {
     "id": "vf-geo-07",
     "n": 7,
     "t": "Energia",
     "lv": 2,
     "ctx": "O gráfico compara a participação das fontes na geração de eletricidade de dois países hipotéticos, A e B.",
     "fig": "geo-matriz",
     "stem": "Com base no gráfico, assinale a alternativa correta.",
     "opts": [
      "O país B tem matriz elétrica mais limpa, pois depende pouco de combustíveis fósseis.",
      "O país A apresenta maior participação de fontes renováveis, mas sua geração é mais vulnerável a estiagens prolongadas, devido ao peso das hidrelétricas.",
      "Os dois países têm a mesma participação de fontes renováveis.",
      "O país A depende principalmente do carvão mineral e do gás natural.",
      "A energia nuclear é a principal fonte de eletricidade do país A."
     ],
     "ans": "B",
     "why": "No país A, hidrelétrica + eólica + solar + biomassa somam 86%; no B, cerca de 20%. A dependência da água torna A sensível a secas; B depende de carvão e gás, que emitem mais gases de efeito estufa."
    },
    {
     "id": "vf-geo-08",
     "n": 8,
     "t": "Geopolítica",
     "lv": 2,
     "ctx": "Os blocos econômicos se diferenciam pelo grau de integração entre os países membros, que pode ir da simples redução de tarifas até a adoção de uma moeda comum.",
     "stem": "Assinale a alternativa que associa corretamente o bloco ao seu nível de integração.",
     "opts": [
      "Mercosul: união monetária, com moeda única adotada por todos os membros.",
      "União Europeia: zona de livre comércio, sem livre circulação de pessoas.",
      "Mercosul: união aduaneira imperfeita, com Tarifa Externa Comum, mas com listas de exceções.",
      "Acordo Estados Unidos–México–Canadá (USMCA): mercado comum, com moeda única e parlamento próprio.",
      "União Europeia: bloco restrito a acordos militares, sem integração econômica."
     ],
     "ans": "C",
     "why": "O Mercosul é uma união aduaneira imperfeita (TEC com exceções). A UE é o bloco mais integrado: mercado comum e união monetária (euro) para parte dos membros. O USMCA é uma zona de livre comércio."
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
     "id": "vf-his-01",
     "n": 1,
     "t": "Antiguidade",
     "lv": 1,
     "ctx": "Na Atenas do século V a.C., os cidadãos participavam diretamente das decisões políticas na Eclésia, a assembleia popular. Esse modelo é considerado uma das origens da democracia ocidental.",
     "stem": "Sobre a democracia ateniense, é correto afirmar que",
     "opts": [
      "garantia direitos políticos a todos os habitantes da cidade, inclusive mulheres e escravizados.",
      "era representativa, com eleição de deputados para um parlamento.",
      "foi criada pelos romanos e depois levada a Atenas.",
      "restringia a cidadania aos homens adultos nascidos de pais atenienses, excluindo mulheres, estrangeiros (metecos) e escravizados.",
      "proibia qualquer forma de participação direta dos cidadãos."
     ],
     "ans": "D",
     "why": "A democracia ateniense era direta, mas a cidadania era restrita a homens adultos atenienses; a maioria da população ficava excluída."
    },
    {
     "id": "vf-his-02",
     "n": 2,
     "t": "Idade Média",
     "lv": 2,
     "ctx": "Na Europa ocidental, entre os séculos IX e XIII, as relações sociais no campo se organizaram em torno do senhorio. Os servos trabalhavam a terra e deviam ao senhor diversas obrigações, como a corveia, a talha e as banalidades.",
     "stem": "Sobre a sociedade feudal, assinale a alternativa correta.",
     "opts": [
      "Os servos eram proprietários das terras e podiam vendê-las livremente.",
      "A sociedade era estamental, com pouca mobilidade, e os servos estavam presos à terra, devendo trabalho e parte da produção ao senhor.",
      "O comércio monetário e as cidades eram o centro da vida econômica em toda a Alta Idade Média.",
      "A Igreja não tinha influência política nem possuía terras.",
      "As relações de suserania e vassalagem ocorriam entre senhores e servos, que se tornavam nobres."
     ],
     "ans": "B",
     "why": "O feudalismo tinha sociedade estamental, economia agrária e servidão. Suserania e vassalagem eram laços entre nobres; a Igreja era grande proprietária e tinha enorme poder."
    },
    {
     "id": "vf-his-03",
     "n": 3,
     "t": "Idade Moderna",
     "lv": 2,
     "ctx": "Em 1517, Martinho Lutero divulgou suas 95 teses, criticando a venda de indulgências pela Igreja Católica. Nas décadas seguintes, a cristandade ocidental se dividiu, e a Igreja reagiu com uma série de medidas.",
     "stem": "Sobre a Reforma Protestante e a Contrarreforma, assinale a alternativa correta.",
     "opts": [
      "Lutero defendia a salvação pela fé e a leitura da Bíblia pelos fiéis, enquanto a Igreja Católica, no Concílio de Trento, reafirmou seus dogmas, fortaleceu a Inquisição e apoiou ordens como a Companhia de Jesus.",
      "A Reforma foi um movimento exclusivamente econômico, sem debates religiosos.",
      "O Concílio de Trento aceitou as teses de Lutero e extinguiu a venda de indulgências por pressão protestante, unificando novamente as igrejas.",
      "A Contrarreforma aboliu os sacramentos e a autoridade do papa.",
      "Calvino e Lutero defendiam que a Bíblia só poderia ser interpretada pelo clero."
     ],
     "ans": "A",
     "why": "A Reforma defendeu a salvação pela fé e o livre exame da Bíblia. A Contrarreforma (Trento) reafirmou os dogmas católicos, criou o Index, reforçou a Inquisição e apoiou os jesuítas. As igrejas não se reunificaram."
    },
    {
     "id": "vf-his-04",
     "n": 4,
     "t": "Revolução Haitiana",
     "lv": 3,
     "ctx": "Entre 1791 e 1804, na colônia francesa de São Domingos, a maior produtora de açúcar do Caribe, pessoas escravizadas se rebelaram e, após anos de guerra, proclamaram a independência do Haiti.",
     "stem": "Sobre esse processo e sua repercussão, é correto afirmar que",
     "opts": [
      "foi liderado pela elite branca colonial, que manteve a escravidão após a independência.",
      "não teve qualquer relação com as ideias de liberdade e igualdade que circulavam na época.",
      "resultou na anexação do Haiti pelos Estados Unidos e no fim da produção de açúcar na América.",
      "foi rapidamente derrotado pelas tropas francesas, sem deixar consequências políticas.",
      "deu origem à primeira república independente governada por antigos escravizados, e o temor de revoltas semelhantes (o “haitianismo”) influenciou as elites escravistas em países como o Brasil."
     ],
     "ans": "E",
     "why": "A Revolução Haitiana aboliu a escravidão e criou o primeiro Estado independente da América Latina, governado por ex-escravizados. O medo do “haitianismo” reforçou o controle sobre a população escravizada em outros países."
    },
    {
     "id": "vf-his-05",
     "n": 5,
     "t": "Brasil Império",
     "lv": 2,
     "ctx": "Entre 1835 e 1845, a Revolução Farroupilha mobilizou estancieiros e charqueadores do Rio Grande do Sul contra o governo imperial, chegando a proclamar a República Rio-Grandense.",
     "stem": "Entre as motivações e características do movimento, destaca-se",
     "opts": [
      "a defesa da abolição imediata da escravidão em todo o Império, que foi aprovada ao final do conflito.",
      "a insatisfação com a política fiscal do Império, que tributava o charque gaúcho e favorecia a concorrência do produto platino, além de críticas à centralização política.",
      "a luta de camponeses sem terra pela reforma agrária no pampa.",
      "o apoio ao retorno de D. Pedro I ao trono, após sua abdicação.",
      "a vitória militar completa dos farrapos, que anexaram o Uruguai ao Rio Grande do Sul."
     ],
     "ans": "B",
     "why": "Os farrapos reclamavam dos impostos sobre o charque e do favorecimento ao produto do Prata, além da centralização. O conflito terminou com acordo (Ponche Verde, 1845), não com vitória ou abolição."
    },
    {
     "id": "vf-his-06",
     "n": 6,
     "t": "Abolição",
     "lv": 2,
     "ctx": "Ao longo da segunda metade do século XIX, uma série de leis foi aprovada no Brasil até a abolição definitiva da escravidão.",
     "stem": "Assinale a alternativa que associa corretamente a lei ao seu conteúdo.",
     "opts": [
      "Lei Eusébio de Queirós (1850): libertou os escravizados com mais de 60 anos.",
      "Lei do Ventre Livre (1871): proibiu o tráfico de africanos escravizados para o Brasil.",
      "Lei Áurea (1888): previu indenização aos ex-escravizados e distribuição de terras.",
      "Lei dos Sexagenários (1885): declarou livres os filhos de mulheres escravizadas nascidos a partir de sua publicação.",
      "Lei Eusébio de Queirós (1850): proibiu o tráfico negreiro, e a Lei Áurea (1888) extinguiu a escravidão sem políticas de integração dos libertos."
     ],
     "ans": "E",
     "why": "Eusébio de Queirós (1850): fim do tráfico. Ventre Livre (1871): filhos de escravizadas nascidos livres. Sexagenários (1885): liberdade aos maiores de 60. Áurea (1888): abolição, sem terras, indenização ou integração dos libertos."
    },
    {
     "id": "vf-his-07",
     "n": 7,
     "t": "Imperialismo",
     "lv": 2,
     "ctx": "Na Conferência de Berlim (1884–1885), potências europeias estabeleceram regras para a ocupação do continente africano, que nas décadas seguintes foi quase totalmente dividido entre elas.",
     "stem": "Uma consequência desse processo foi",
     "opts": [
      "o traçado de fronteiras que muitas vezes desconsiderou a distribuição dos povos africanos, separando grupos aparentados e reunindo rivais no mesmo território colonial.",
      "a independência imediata dos países africanos, com apoio das potências europeias.",
      "o fim da exploração de recursos naturais africanos pelas indústrias europeias.",
      "a participação dos governantes africanos na conferência, com poder de veto sobre a partilha.",
      "a substituição do colonialismo pela livre escolha das populações sobre seus governos."
     ],
     "ans": "A",
     "why": "A partilha atendeu aos interesses europeus (matérias-primas, mercados) e criou fronteiras artificiais, sem participação africana — com efeitos que se estenderam após as independências."
    },
    {
     "id": "vf-his-08",
     "n": 8,
     "t": "Crise de 1929",
     "lv": 2,
     "ctx": "A quebra da Bolsa de Valores de Nova York, em outubro de 1929, desencadeou uma crise econômica que atingiu diversos países, inclusive o Brasil.",
     "stem": "No Brasil, um dos efeitos imediatos da crise foi",
     "opts": [
      "a valorização do café no mercado internacional, que aumentou a renda dos cafeicultores.",
      "a abolição da escravidão, como forma de reduzir os custos de produção.",
      "a queda brusca das exportações e dos preços do café, o que levou o governo a comprar e destruir estoques e enfraqueceu a oligarquia cafeeira.",
      "a transferência da capital do país para Brasília.",
      "o fim da industrialização, que só seria retomada no século XXI."
     ],
     "ans": "C",
     "why": "A crise derrubou o preço e as exportações do café. O governo comprou e queimou estoques para conter a queda. O enfraquecimento dos cafeicultores contribuiu para a Revolução de 1930 e incentivou a industrialização."
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
     "id": "vf-por-01",
     "n": 1,
     "t": "Interpretação de texto",
     "lv": 2,
     "text": {
      "title": "A cidade e a maré",
      "body": "Quem cresce em cidade de porto aprende cedo que o tempo não é só o dos relógios. Há o tempo dos navios, que chegam de madrugada e partem antes que a gente decore seus nomes; há o tempo do vento, que muda a cor da lagoa sem pedir licença; e há o tempo da maré, que avança e recua como quem respira. Durante muitos anos, achei que essa paciência era atraso. Eu queria a velocidade das capitais, os prédios que sobem em meses, as notícias que envelhecem em horas.\nHoje desconfio dessa pressa. Os pescadores sabem a hora de sair porque leem o céu, não o celular; a feira do cais acontece há décadas porque alguém, toda semana, insiste em armar a mesma banca. Nada disso aparece nos gráficos de produtividade, mas é isso que mantém a cidade de pé. Talvez progresso não seja apagar esses ritmos, e sim aprender a conversar com eles.",
      "source": "Texto autoral para fins didáticos."
     },
     "textNote": "Texto para as questões 1 e 2.",
     "stem": "A ideia central do texto consiste em",
     "opts": [
      "defender que as cidades portuárias devem abandonar as tradições para crescer como as capitais.",
      "afirmar que a tecnologia é a principal causa dos problemas enfrentados pelos pescadores.",
      "descrever objetivamente o funcionamento de um porto e o horário de chegada dos navios.",
      "criticar os pescadores por não utilizarem o celular para prever o tempo.",
      "valorizar ritmos ligados à natureza e à tradição local, propondo que o progresso dialogue com eles em vez de eliminá-los."
     ],
     "ans": "E",
     "why": "O narrador revê a ideia de que a paciência da cidade era atraso e conclui que o progresso deveria “conversar” com os ritmos do vento, da maré e da feira."
    },
    {
     "id": "vf-por-02",
     "n": 2,
     "t": "Coesão textual",
     "lv": 2,
     "text": {
      "title": "A cidade e a maré",
      "body": "Quem cresce em cidade de porto aprende cedo que o tempo não é só o dos relógios. Há o tempo dos navios, que chegam de madrugada e partem antes que a gente decore seus nomes; há o tempo do vento, que muda a cor da lagoa sem pedir licença; e há o tempo da maré, que avança e recua como quem respira. Durante muitos anos, achei que essa paciência era atraso. Eu queria a velocidade das capitais, os prédios que sobem em meses, as notícias que envelhecem em horas.\nHoje desconfio dessa pressa. Os pescadores sabem a hora de sair porque leem o céu, não o celular; a feira do cais acontece há décadas porque alguém, toda semana, insiste em armar a mesma banca. Nada disso aparece nos gráficos de produtividade, mas é isso que mantém a cidade de pé. Talvez progresso não seja apagar esses ritmos, e sim aprender a conversar com eles.",
      "source": "Texto autoral para fins didáticos."
     },
     "textRef": true,
     "stem": "Considerando os mecanismos de coesão do texto, assinale a alternativa correta.",
     "opts": [
      "O pronome “seus”, em “decore seus nomes”, refere-se a “a gente”.",
      "A expressão “dessa pressa” retoma “essa paciência”, mencionada no parágrafo anterior.",
      "O pronome “eles”, no último período, retoma “esses ritmos”.",
      "O pronome “isso”, em “Nada disso aparece”, retoma “os gráficos de produtividade”.",
      "A expressão “como quem respira” estabelece uma relação de causa com o verbo “avança”."
     ],
     "ans": "C",
     "why": "“Conversar com eles” = conversar com esses ritmos. “Seus nomes” são os nomes dos navios; “dessa pressa” retoma a velocidade das capitais; “disso” retoma a leitura do céu e a feira; “como quem respira” é comparação."
    },
    {
     "id": "vf-por-03",
     "n": 3,
     "t": "Variação linguística",
     "lv": 1,
     "ctx": "Leia o diálogo entre dois amigos de Rio Grande, trocado por mensagem:\n— Bah, guri, tu vai na festa do cais hoje?\n— Capaz! Tá um frio de renguear cusco. Mas, se tu passar aqui, eu vou junto.",
     "stem": "Sobre a linguagem empregada no diálogo, é correto afirmar que",
     "opts": [
      "apresenta erros que deveriam ser corrigidos, pois toda comunicação deve seguir a norma-padrão.",
      "exemplifica a variação regional, com expressões típicas do Sul, adequadas a uma situação informal entre amigos.",
      "representa uma variedade histórica do português, que não é mais usada atualmente.",
      "utiliza linguagem técnica, própria de profissionais do porto.",
      "mostra que os falantes não dominam a língua portuguesa, pois misturam os pronomes “tu” e “você”."
     ],
     "ans": "B",
     "why": "“Bah”, “guri”, “capaz” e “frio de renguear cusco” são marcas do português falado no RS. Numa conversa informal, essa variedade é adequada; tratá-la como erro é preconceito linguístico."
    },
    {
     "id": "vf-por-04",
     "n": 4,
     "t": "Concordância",
     "lv": 2,
     "ctx": "Considere o período:\n“______ cinco anos que a feira ocorre no cais. Desde então, sempre ______ problemas de organização, mas eles ______ ser resolvidos com planejamento.”",
     "stem": "Assinale a alternativa que preenche corretamente as lacunas, de acordo com a norma-padrão.",
     "opts": [
      "Fazem — houveram — pode.",
      "Faz — houveram — podem.",
      "Fazem — houve — podem.",
      "Faz — houve — podem.",
      "Faz — houve — pode."
     ],
     "ans": "D",
     "why": "“Fazer” indicando tempo é impessoal: “faz cinco anos”. “Haver” no sentido de existir também é impessoal: “houve problemas”. “Eles podem ser resolvidos” concorda com o sujeito plural."
    },
    {
     "id": "vf-por-05",
     "n": 5,
     "t": "Crase",
     "lv": 2,
     "ctx": "Leia o período:\n“Fomos ___ feira do cais, entregamos o relatório ___ coordenadora e ficamos frente ___ frente com ___ realidade dos trabalhadores do porto.”",
     "stem": "Assinale a alternativa que preenche corretamente as lacunas.",
     "opts": [
      "à — à — à — à.",
      "a — à — a — à.",
      "à — à — a — a.",
      "à — a — à — a.",
      "a — a — a — à."
     ],
     "ans": "C",
     "why": "Ir a + a feira = à; entregar a + a coordenadora = à. Em expressões com palavras repetidas (frente a frente) não há crase. Depois de “com” não pode haver a preposição “a”, então não há crase."
    },
    {
     "id": "vf-por-06",
     "n": 6,
     "t": "Regência",
     "lv": 2,
     "ctx": "Leia o período:\n“Os moradores assistiram ___ apresentação no cais e disseram que preferem caminhar ___ pegar ônibus, pois o projeto visa ___ melhoria da mobilidade.”",
     "stem": "Considerando a regência prescrita pela norma-padrão, as lacunas são preenchidas por:",
     "opts": [
      "à — a — à.",
      "a — do que — a.",
      "à — do que — a.",
      "a — a — à.",
      "na — que — na."
     ],
     "ans": "A",
     "why": "“Assistir” (ver) pede a preposição “a”: assistiram à apresentação. “Preferir” constrói-se com “a” (preferir uma coisa a outra), não “do que”. “Visar” (ter como objetivo) pede “a”: visa à melhoria."
    },
    {
     "id": "vf-por-07",
     "n": 7,
     "t": "Figuras de linguagem",
     "lv": 2,
     "ctx": "Considere as frases:\nI. Nas férias, li Machado de Assis inteiro.\nII. O vento cortava a pele dos pescadores como uma faca.\nIII. A lagoa dormia sob a neblina da manhã.\nIV. Já te pedi um milhão de vezes para fechar a janela.",
     "stem": "As figuras de linguagem predominantes em I, II, III e IV são, respectivamente,",
     "opts": [
      "metáfora, hipérbole, metonímia e comparação.",
      "metonímia, personificação, comparação e eufemismo.",
      "antítese, comparação, hipérbole e metonímia.",
      "hipérbole, metáfora, personificação e ironia.",
      "metonímia, comparação, personificação e hipérbole."
     ],
     "ans": "E",
     "why": "I: o autor pela obra (metonímia). II: “como uma faca” (comparação explícita). III: a lagoa “dormia” (personificação). IV: “um milhão de vezes” (exagero, hipérbole)."
    },
    {
     "id": "vf-por-08",
     "n": 8,
     "t": "Pontuação",
     "lv": 2,
     "stem": "Assinale a alternativa em que a pontuação está de acordo com a norma-padrão.",
     "opts": [
      "Professora, a senhora pode repetir a explicação sobre crase?",
      "O diretor da escola, anunciou o resultado do concurso.",
      "Os estudantes, que moram longe chegam cedo à escola.",
      "Na semana passada a feira, foi cancelada por causa da chuva.",
      "Rio Grande a cidade onde nasci, recebeu o festival neste ano."
     ],
     "ans": "A",
     "why": "“Professora” é vocativo e deve ser isolado por vírgula. Nas outras, há vírgula entre sujeito e verbo ou falta a vírgula que fecharia uma oração explicativa ou um aposto."
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
     "id": "vf-lit-01",
     "n": 1,
     "t": "Papéis avulsos",
     "lv": 2,
     "ctx": "Em Papéis avulsos (1882), de Machado de Assis, o conto “Teoria do medalhão” apresenta os conselhos de um pai ao filho sobre como conquistar prestígio, enquanto em “O espelho” Jacobina relata como sua identidade passou a depender da farda de alferes e do olhar dos outros.",
     "stem": "Considerando esses contos, assinale a alternativa correta.",
     "opts": [
      "Os conselhos do pai devem ser lidos como ensinamentos defendidos literalmente por Machado, que valorizava a vida de aparências.",
      "Os contos idealizam a sociedade do Rio de Janeiro, apresentando personagens movidos apenas pela virtude.",
      "A ironia expõe como o reconhecimento social, os títulos e as aparências participam da construção da identidade, levando o leitor a desconfiar dos discursos das personagens.",
      "O livro é um romance com um único protagonista, Simão Bacamarte, que aparece em todas as narrativas.",
      "As narrativas seguem o determinismo naturalista, explicando o comportamento apenas pela hereditariedade e pelo meio."
     ],
     "ans": "C",
     "why": "Papéis avulsos reúne doze narrativas de formas variadas. Em ambos os contos, a ironia mostra o peso da aparência e do olhar alheio; a voz do pai não equivale à posição do autor."
    },
    {
     "id": "vf-lit-02",
     "n": 2,
     "t": "Vila Sapo",
     "lv": 2,
     "ctx": "Vila Sapo (2019), de José Falero, reúne contos ambientados em uma comunidade da periferia de Porto Alegre, com personagens como trabalhadores, mães, jovens e pessoas envolvidas com o crime.",
     "stem": "Sobre a obra, é correto afirmar que",
     "opts": [
      "as marcas de oralidade na fala das personagens são falhas de revisão que o leitor deve desconsiderar.",
      "é um romance de enredo único que acompanha a trajetória de um só protagonista do início ao fim.",
      "o livro é um documento jornalístico sobre a criminalidade, sem elaboração literária.",
      "a periferia é apresentada apenas como cenário de violência, sem afetos ou humor.",
      "o território e as vozes das personagens são construídos de modo a humanizá-las, articulando desigualdade social e racial, afetos, humor e conflitos, sem reduzi-las a estereótipos."
     ],
     "ans": "E",
     "why": "Os contos dão espessura ao território e às personagens; a oralidade faz parte do trabalho estético. A obra não é romance nem documento sobre o crime."
    },
    {
     "id": "vf-lit-03",
     "n": 3,
     "t": "Ritos de passagem",
     "lv": 3,
     "ctx": "Em Ritos de passagem (1985), primeiro livro da poeta angolana Ana Paula Tavares, frutos, cheiros, sabores e texturas aparecem com frequência, associados ao corpo e às experiências femininas.",
     "stem": "A partir dessas informações, assinale a alternativa que melhor interpreta a obra.",
     "opts": [
      "Os frutos e as sensações funcionam como imagens simbólicas do corpo, do desejo e das transformações, e a memória cultural angolana convive com o questionamento de práticas que limitam a autonomia das mulheres.",
      "Os poemas descrevem a flora de Angola com precisão botânica, sem sentidos simbólicos.",
      "A obra narra, em prosa, a vida de uma única personagem desde a infância até a velhice.",
      "A autora defende a aceitação irrestrita de todas as tradições, sem qualquer tensão.",
      "Trata-se de uma obra do Modernismo brasileiro de 1922, ligada à Semana de Arte Moderna."
     ],
     "ans": "A",
     "why": "Ritos de passagem é poesia: as imagens sensoriais ligam corpo, desejo e transformação; o livro valoriza a memória cultural sem aceitar acriticamente os limites impostos às mulheres."
    },
    {
     "id": "vf-lit-04",
     "n": 4,
     "t": "A hora da estrela e Olhos d’água",
     "lv": 3,
     "ctx": "A hora da estrela (1977), de Clarice Lispector, e Olhos d’água (2014), de Conceição Evaristo, dão visibilidade a mulheres que vivem em situação de desigualdade, mas por caminhos narrativos diferentes.",
     "stem": "Comparando as duas obras, é correto afirmar que",
     "opts": [
      "ambas são romances com uma única protagonista, narrados por uma voz neutra e distante.",
      "em A hora da estrela, a trajetória de Macabéa é mediada por Rodrigo S.M., narrador que expõe as dificuldades de contar a vida da personagem, enquanto Olhos d’água reúne contos com diferentes personagens negras, numa escrita associada à escrevivência.",
      "Macabéa conquista ascensão social ao final do livro, e as personagens de Olhos d’água são apresentadas apenas como vítimas.",
      "os contos de Conceição Evaristo devem ser lidos como depoimentos autobiográficos literais da autora.",
      "as duas obras evitam temas sociais e se concentram apenas em descrições de paisagens."
     ],
     "ans": "B",
     "why": "Em Clarice, o narrador fictício Rodrigo S.M. torna a própria escrita um problema (metalinguagem). Olhos d’água são quinze contos com várias personagens, em que experiência e invenção se articulam (escrevivência), sem autobiografia literal."
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
     "id": "vf-art-01",
     "n": 1,
     "t": "Renascimento",
     "lv": 2,
     "ctx": "A imagem representa, de forma esquemática, um corredor desenhado sobre uma superfície plana.",
     "fig": "art-perspectiva",
     "stem": "O recurso utilizado para criar a ilusão de profundidade na imagem, sistematizado por artistas e arquitetos do Renascimento, é",
     "opts": [
      "a perspectiva linear, em que linhas paralelas parecem convergir para um ponto de fuga situado na linha do horizonte.",
      "o pontilhismo, com pequenos pontos de cores puras justapostos.",
      "a colagem, com a sobreposição de materiais de diferentes origens.",
      "a perspectiva hierárquica, em que as figuras mais importantes são desenhadas maiores.",
      "o claro-escuro aplicado apenas às figuras humanas, sem uso de linhas."
     ],
     "ans": "A",
     "why": "As linhas do piso, das paredes e do teto convergem para um único ponto: é a perspectiva linear com ponto de fuga, desenvolvida no Renascimento (Brunelleschi, Alberti)."
    },
    {
     "id": "vf-art-02",
     "n": 2,
     "t": "Barroco mineiro",
     "lv": 2,
     "ctx": "No século XVIII, durante o ciclo do ouro em Minas Gerais, artistas como Antônio Francisco Lisboa, o Aleijadinho, e Manuel da Costa Ataíde produziram esculturas, talhas e pinturas para igrejas de cidades como Ouro Preto e Congonhas.",
     "stem": "Sobre essa produção artística, é correto afirmar que",
     "opts": [
      "rejeitava temas religiosos e se dedicava a retratar a vida nas cidades industriais.",
      "apresenta dramaticidade, movimento e forte religiosidade, com uso de materiais locais, como a pedra-sabão, além de elementos que dialogam com a realidade colonial.",
      "seguia rigorosamente os padrões neoclássicos, com linhas retas e ausência de ornamentos.",
      "foi realizada exclusivamente por artistas europeus contratados pela Coroa portuguesa.",
      "é anterior à chegada dos portugueses à América."
     ],
     "ans": "B",
     "why": "O Barroco mineiro tem curvas, dramaticidade e temática religiosa; Aleijadinho esculpiu em pedra-sabão e madeira (como os Profetas de Congonhas), e Ataíde pintou forros de igrejas."
    },
    {
     "id": "vf-art-03",
     "n": 3,
     "t": "Teatro",
     "lv": 2,
     "ctx": "Augusto Boal desenvolveu o Teatro do Oprimido, um conjunto de técnicas em que o público é convidado a intervir na cena. No chamado teatro-fórum, uma situação de opressão é encenada e os espectadores podem subir ao palco para propor e experimentar soluções.",
     "stem": "Essa proposta teatral se caracteriza por",
     "opts": [
      "manter a separação rígida entre atores e plateia, que deve apenas assistir em silêncio.",
      "encenar exclusivamente textos clássicos europeus, sem relação com o cotidiano.",
      "transformar o espectador em participante ativo (“espect-ator”), usando o teatro como ferramenta de reflexão e transformação social.",
      "dispensar qualquer relação com questões políticas ou sociais.",
      "restringir-se a espetáculos de dança, sem uso da palavra."
     ],
     "ans": "C",
     "why": "No Teatro do Oprimido, o público deixa de ser passivo e ensaia ações sobre situações reais de opressão, unindo arte e transformação social."
    },
    {
     "id": "vf-art-04",
     "n": 4,
     "t": "Arte indígena contemporânea",
     "lv": 2,
     "ctx": "Nas últimas décadas, artistas indígenas como Jaider Esbell, do povo Makuxi, e Denilson Baniwa passaram a ocupar bienais, museus e galerias com obras que combinam pintura, performance, arte digital e saberes de seus povos.",
     "stem": "Essa presença indica que a arte indígena",
     "opts": [
      "é uma produção “primitiva”, que permaneceu igual desde antes da colonização.",
      "só pode ser considerada artesanato, sem valor estético.",
      "deve se limitar a técnicas tradicionais, sem contato com novas tecnologias.",
      "é uma produção contemporânea e diversa, que articula tradição, território, memória e crítica, dialogando com diferentes linguagens e meios.",
      "não tem relação com questões políticas, como a defesa dos territórios."
     ],
     "ans": "D",
     "why": "A arte indígena atual é contemporânea e plural: usa diferentes meios e discute memória, território e colonização, rompendo com a ideia de produção “primitiva” ou estática."
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
     "id": "vf-ing-01",
     "n": 1,
     "t": "Compreensão de texto",
     "lv": 2,
     "text": {
      "title": "Estuaries: where rivers meet the sea",
      "body": "Estuaries are partially enclosed bodies of water where fresh water from rivers mixes with salt water from the ocean. Because they receive nutrients from both sources, they are among the most productive ecosystems on Earth. Many species of fish and shrimp spend their early life stages in estuaries, where they find food and shelter from predators. For this reason, scientists often call them “nurseries of the sea”.\nHowever, estuaries are also home to ports, industries and growing cities. Dredging, pollution and the loss of marsh vegetation can reduce their capacity to support marine life. Protecting these environments, therefore, is not only an ecological issue but also an economic one, since many fishing communities depend on them.",
      "source": "Text written for educational purposes."
     },
     "textNote": "Read the text to answer questions 1 and 2.",
     "stem": "According to the text, the main idea is that",
     "opts": [
      "estuaries should be transformed into ports to support economic growth.",
      "fish and shrimp live only in the open ocean and avoid estuaries.",
      "estuaries are highly productive environments that support marine life and local economies, but human activities can threaten them.",
      "scientists believe estuaries have no economic importance.",
      "pollution has no effect on estuaries because they receive water from rivers."
     ],
     "ans": "C",
     "why": "O texto descreve a alta produtividade dos estuários (berçários do mar) e alerta para dragagem, poluição e perda de vegetação, ligando proteção ambiental e economia."
    },
    {
     "id": "vf-ing-02",
     "n": 2,
     "t": "Referência",
     "lv": 2,
     "text": {
      "title": "Estuaries: where rivers meet the sea",
      "body": "Estuaries are partially enclosed bodies of water where fresh water from rivers mixes with salt water from the ocean. Because they receive nutrients from both sources, they are among the most productive ecosystems on Earth. Many species of fish and shrimp spend their early life stages in estuaries, where they find food and shelter from predators. For this reason, scientists often call them “nurseries of the sea”.\nHowever, estuaries are also home to ports, industries and growing cities. Dredging, pollution and the loss of marsh vegetation can reduce their capacity to support marine life. Protecting these environments, therefore, is not only an ecological issue but also an economic one, since many fishing communities depend on them.",
      "source": "Text written for educational purposes."
     },
     "textRef": true,
     "stem": "In the sentence “where they find food and shelter from predators”, the word “they” refers to",
     "opts": [
      "estuaries.",
      "scientists.",
      "predators.",
      "ports and industries.",
      "many species of fish and shrimp."
     ],
     "ans": "E",
     "why": "“Many species of fish and shrimp spend their early life stages in estuaries, where they find food…”: quem encontra alimento e abrigo são os peixes e camarões."
    },
    {
     "id": "vf-ing-03",
     "n": 3,
     "t": "Ponto de vista",
     "lv": 2,
     "text": {
      "title": "Will translation apps make language learning obsolete?",
      "body": "Translation apps can now convert speech almost instantly. Some people argue that learning a foreign language is no longer necessary. I disagree. Language is not only a code to be decoded; it carries humor, history and ways of seeing the world that machines still struggle to capture. Moreover, speaking someone else’s language is a gesture of respect that no app can perform for us. Technology can be a useful assistant, but it should not replace the experience of learning.",
      "source": "Text written for educational purposes."
     },
     "stem": "The author’s position is that",
     "opts": [
      "translation apps are useful tools, but they cannot replace the cultural and human experience of learning a language.",
      "people should stop learning languages because apps are faster.",
      "translation apps are useless and should be banned from schools.",
      "machines already understand humor and history better than people.",
      "learning a language is only about decoding words."
     ],
     "ans": "A",
     "why": "O autor discorda de quem acha o aprendizado desnecessário (“I disagree”): reconhece a utilidade dos aplicativos (“useful assistant”), mas defende que não substituem a experiência de aprender."
    },
    {
     "id": "vf-ing-04",
     "n": 4,
     "t": "Vocabulário",
     "lv": 2,
     "ctx": "Read the sentence:\n“Eventually, the students realized that the exam was not as difficult as they had expected; actually, most of them finished it early.”",
     "stem": "The words “eventually” and “actually” can be translated, in this context, as",
     "opts": [
      "eventualmente — atualmente.",
      "ocasionalmente — atualmente.",
      "imediatamente — realmente.",
      "finalmente (por fim) — na verdade.",
      "eventualmente — na verdade."
     ],
     "ans": "D",
     "why": "São falsos cognatos: “eventually” = por fim, finalmente; “actually” = na verdade, de fato. “Atualmente” em inglês seria “currently” ou “nowadays”."
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
     "id": "vf-esp-01",
     "n": 1,
     "t": "Compreensão de texto",
     "lv": 2,
     "text": {
      "title": "El mate, una costumbre que cruza fronteras",
      "body": "En la frontera entre Brasil y Uruguay, como en Chuy y Chuí o en Rivera y Santana do Livramento, es común ver a personas que caminan por la calle con el termo bajo el brazo y el mate en la mano. Esa costumbre, heredada de los pueblos guaraníes, se transformó con el tiempo en un símbolo de hospitalidad: ofrecer un mate es invitar al otro a quedarse un rato y conversar.\nPara muchos habitantes de la región, la línea que separa los dos países es más política que cultural. Se habla “portuñol”, se comparten fiestas y la misma yerba circula de un lado al otro. El mate, en ese contexto, no pertenece a una sola nación: es una práctica que une a quienes viven en el límite.",
      "source": "Texto autoral para fines didácticos."
     },
     "textNote": "Lee el texto para responder a las preguntas 1 y 2.",
     "stem": "Según el texto, el mate en la frontera entre Brasil y Uruguay",
     "opts": [
      "es una bebida prohibida en uno de los dos países.",
      "representa una práctica cultural compartida que une a los habitantes más allá de los límites políticos.",
      "fue introducido recientemente por los turistas europeos.",
      "separa a los habitantes según su nacionalidad.",
      "se consume solamente durante las fiestas oficiales."
     ],
     "ans": "B",
     "why": "O texto apresenta o mate como hábito de hospitalidade, de origem guarani, que circula dos dois lados e une quem vive na fronteira."
    },
    {
     "id": "vf-esp-02",
     "n": 2,
     "t": "Heterossemânticos",
     "lv": 2,
     "text": {
      "title": "El mate, una costumbre que cruza fronteras",
      "body": "En la frontera entre Brasil y Uruguay, como en Chuy y Chuí o en Rivera y Santana do Livramento, es común ver a personas que caminan por la calle con el termo bajo el brazo y el mate en la mano. Esa costumbre, heredada de los pueblos guaraníes, se transformó con el tiempo en un símbolo de hospitalidad: ofrecer un mate es invitar al otro a quedarse un rato y conversar.\nPara muchos habitantes de la región, la línea que separa los dos países es más política que cultural. Se habla “portuñol”, se comparten fiestas y la misma yerba circula de un lado al otro. El mate, en ese contexto, no pertenece a una sola nación: es una práctica que une a quienes viven en el límite.",
      "source": "Texto autoral para fines didácticos."
     },
     "textRef": true,
     "stem": "En la expresión “invitar al otro a quedarse un rato”, la palabra “rato” significa",
     "opts": [
      "roedor.",
      "enojo.",
      "silencio.",
      "momento, un tiempo breve.",
      "lugar."
     ],
     "ans": "D",
     "why": "“Rato” em espanhol é falso amigo: significa “um momento, um tempinho”. O roedor é “ratón” ou “rata”."
    },
    {
     "id": "vf-esp-03",
     "n": 3,
     "t": "Conectores",
     "lv": 2,
     "text": {
      "title": "Ciudades esponja",
      "body": "Después de inundaciones cada vez más frecuentes, algunas ciudades han adoptado el modelo de “ciudad esponja”, que propone parques inundables, techos verdes y pavimentos permeables para que el agua de lluvia se infiltre en el suelo. Aunque estas soluciones exigen inversión y planificación, suelen costar menos que reconstruir barrios enteros después de cada desastre.",
      "source": "Texto autoral para fines didácticos."
     },
     "stem": "En el texto, el conector “aunque” establece una relación de",
     "opts": [
      "causa.",
      "conclusión.",
      "finalidad.",
      "condición.",
      "concesión, equivalente a “embora” en portugués."
     ],
     "ans": "E",
     "why": "“Aunque” introduz uma concessão: apesar de exigirem investimento, as soluções custam menos que reconstruir bairros."
    },
    {
     "id": "vf-esp-04",
     "n": 4,
     "t": "Gramática",
     "lv": 1,
     "ctx": "Lee la frase:\n“Después de las obras, la ciudad está ______ mejor preparada para las lluvias, pero todavía falta ______ trabajo.”",
     "stem": "Las palabras que completan correctamente la frase son",
     "opts": [
      "mucho — muy.",
      "muy — muy.",
      "mucho — mucho.",
      "muy — mucho.",
      "muy — muchos."
     ],
     "ans": "C",
     "why": "Antes de “mejor”, “peor”, “más”, “menos”, “mayor” e “menor” usa-se “mucho” (mucho mejor). Diante de substantivo (trabajo), também “mucho”."
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
     "id": "vf-ef-01",
     "n": 1,
     "t": "Corpo e mídia",
     "lv": 1,
     "ctx": "Nas redes sociais, circulam diariamente imagens de corpos considerados “ideais”, muitas vezes editadas com filtros, acompanhadas de propagandas de suplementos e de promessas de resultados rápidos.",
     "stem": "A partir de uma perspectiva crítica da Educação Física, é correto afirmar que",
     "opts": [
      "existe um único corpo saudável, que deve ser alcançado por todas as pessoas.",
      "os padrões corporais divulgados pela mídia são construções sociais e históricas e podem gerar exclusão e práticas de risco quando tomados como norma única.",
      "o uso de filtros garante que as imagens representem fielmente a realidade.",
      "a busca por resultados rápidos é sempre a forma mais segura de promover a saúde.",
      "as práticas corporais não sofrem influência da mídia nem do consumo."
     ],
     "ans": "B",
     "why": "Os padrões de beleza mudam com a história e são reforçados pela mídia e pelo mercado. Tomá-los como norma pode excluir pessoas e incentivar práticas arriscadas, como o uso indevido de substâncias."
    },
    {
     "id": "vf-ef-02",
     "n": 2,
     "t": "Gênero e esporte",
     "lv": 2,
     "ctx": "Em 1941, o Decreto-Lei nº 3.199 proibiu as mulheres de praticar esportes considerados incompatíveis com a “natureza feminina”. Com base nele, o futebol feminino ficou proibido no Brasil até 1979.",
     "stem": "Sobre essa proibição, é correto afirmar que",
     "opts": [
      "baseava-se em comprovações científicas de que as mulheres não podem jogar futebol.",
      "não teve qualquer efeito sobre o desenvolvimento do futebol feminino no país.",
      "foi uma decisão das próprias atletas, que preferiam outras modalidades.",
      "mostrou que o esporte é um espaço neutro, livre de relações de poder.",
      "expressava estereótipos de gênero e relações de poder, e seus efeitos ainda aparecem nas desigualdades de investimento e visibilidade entre o futebol masculino e o feminino."
     ],
     "ans": "E",
     "why": "A proibição não tinha base biológica; refletia estereótipos sobre o papel da mulher. Décadas de proibição atrasaram a estrutura do futebol feminino, o que se nota até hoje."
    },
    {
     "id": "vf-ef-03",
     "n": 3,
     "t": "Atividade física e saúde",
     "lv": 2,
     "ctx": "A Organização Mundial da Saúde (OMS) recomenda que adultos pratiquem, por semana, de 150 a 300 minutos de atividade física aeróbica moderada ou de 75 a 150 minutos de atividade vigorosa (ou uma combinação equivalente). A tabela mostra a rotina semanal de quatro pessoas.",
     "table": [
      [
       "Pessoa",
       "Atividade",
       "Frequência semanal"
      ],
      [
       "Ana",
       "Caminhada moderada de 20 min",
       "3 vezes"
      ],
      [
       "Bruno",
       "Pedalada moderada de 30 min",
       "5 vezes"
      ],
      [
       "Carla",
       "Corrida vigorosa de 25 min",
       "2 vezes"
      ],
      [
       "Diego",
       "Caminhada moderada de 40 min",
       "2 vezes"
      ]
     ],
     "stem": "Considerando apenas a recomendação apresentada, atinge o mínimo de atividade aeróbica semanal",
     "opts": [
      "somente Ana.",
      "somente Bruno.",
      "Bruno e Diego.",
      "Bruno e Carla.",
      "Ana, Carla e Diego."
     ],
     "ans": "B",
     "why": "Ana: 60 min moderados. Bruno: 150 min moderados (atinge). Carla: 50 min vigorosos (abaixo de 75). Diego: 80 min moderados. Só Bruno chega ao mínimo."
    },
    {
     "id": "vf-ef-04",
     "n": 4,
     "t": "Capoeira",
     "lv": 2,
     "ctx": "A capoeira, que reúne luta, dança, música e jogo, foi criminalizada no Código Penal de 1890. Mais de um século depois, foi registrada como patrimônio cultural do Brasil, e a Roda de Capoeira foi reconhecida pela UNESCO como Patrimônio Cultural Imaterial da Humanidade.",
     "stem": "A trajetória da capoeira permite compreender que",
     "opts": [
      "as práticas corporais são apenas exercícios físicos, sem relação com a história.",
      "a capoeira sempre foi valorizada pelo Estado brasileiro desde o período colonial.",
      "as práticas corporais carregam memória, resistência e disputas sociais, e seu reconhecimento depende de transformações históricas e da luta de seus praticantes.",
      "o reconhecimento como patrimônio impede qualquer transformação na capoeira.",
      "a capoeira é uma prática de origem europeia, trazida pelos colonizadores."
     ],
     "ans": "C",
     "why": "Criada por africanos escravizados e seus descendentes, a capoeira foi perseguida e depois reconhecida como patrimônio: sua história revela disputas sociais e raciais em torno do corpo e da cultura."
    }
   ]
  }
 ],
 "discursivas": {
  "label": "Compreensão e produção de texto",
  "color": "#444c56",
  "items": [
   {
    "id": "vf-disc-01",
    "n": 1,
    "s": "linguagens",
    "points": 10,
    "kind": "Expositivo",
    "title": "Enchentes e soluções baseadas na natureza",
    "texts": [
     {
      "label": "Texto I",
      "body": "Em maio de 2024, chuvas intensas e persistentes provocaram enchentes em centenas de municípios do Rio Grande do Sul. Em muitas cidades, a água demorou dias para escoar. Especialistas lembraram que, além do volume de chuva, a forma como as cidades foram construídas influencia o tamanho do problema: ruas asfaltadas, calçadas cimentadas e rios canalizados fazem a água correr mais rápido e se acumular nas partes baixas.",
      "source": "Texto autoral para fins didáticos."
     },
     {
      "label": "Texto II",
      "body": "As chamadas soluções baseadas na natureza propõem trabalhar com a água, e não apenas contra ela. Entre as medidas estão a preservação das várzeas e da mata ciliar, a criação de parques que podem alagar sem prejuízo, o uso de pavimentos permeáveis e de jardins de chuva, que retêm a água por algum tempo e permitem que ela se infiltre no solo. Essas medidas não dispensam obras como diques e bombas, mas podem reduzir a quantidade de água que chega de uma vez aos bairros.",
      "source": "Texto autoral para fins didáticos."
     }
    ],
    "cmd": "Com base nos textos, **explique** por que a impermeabilização do solo urbano agrava as enchentes e **de que modo** as soluções apresentadas no Texto II podem reduzir esse problema. Escreva um texto **expositivo** de **5 a 10 linhas**.",
    "expect": [
     "Explicar a relação causa-efeito: solo impermeável → menos infiltração → água escoa mais rápido e se acumula nas áreas baixas.",
     "Citar ao menos duas soluções do Texto II (várzeas e mata ciliar, parques alagáveis, pavimentos permeáveis, jardins de chuva).",
     "Mostrar como essas soluções atuam: retêm a água, aumentam a infiltração e diminuem o pico de escoamento.",
     "Fechar o raciocínio, sem opinar demais: o comando é expositivo."
    ],
    "traps": [
     "Atribuir a enchente só ao volume de chuva, ignorando a impermeabilização.",
     "Listar as soluções sem explicar como funcionam.",
     "Afirmar que as soluções naturais eliminam a necessidade de diques e bombas (o Texto II diz o contrário)."
    ],
    "model": "A impermeabilização do solo urbano agrava as enchentes porque asfalto, cimento e rios canalizados impedem que a chuva se infiltre na terra. Assim, a água escoa mais rápido e se acumula nas partes baixas das cidades, como ocorreu no Rio Grande do Sul em 2024. As soluções baseadas na natureza reduzem esse problema ao devolver espaço à água: várzeas e matas ciliares preservadas, parques alagáveis e jardins de chuva retêm parte do volume, enquanto pavimentos permeáveis aumentam a infiltração. Desse modo, menos água chega de uma vez aos bairros, complementando obras como diques e bombas."
   },
   {
    "id": "vf-disc-02",
    "n": 2,
    "s": "linguagens",
    "points": 10,
    "kind": "Argumentativo",
    "title": "Celular na escola: restringir ajuda a aprender?",
    "texts": [
     {
      "label": "Texto I",
      "body": "Uma lei federal sancionada em 2025 restringiu o uso de celulares pelos estudantes nas escolas de educação básica, inclusive nos intervalos, com exceções para fins pedagógicos, de acessibilidade e de saúde. Defensores da medida afirmam que ela melhora a concentração e a convivência entre os alunos.",
      "source": "Texto autoral para fins didáticos."
     },
     {
      "label": "Texto II",
      "body": "“Proibir não ensina ninguém a usar melhor a tecnologia. Os jovens vão continuar conectados fora da escola, e é justamente ali que deveriam aprender a pesquisar, checar informações e controlar o tempo de tela.” — depoimento de uma professora (personagem fictícia).",
      "source": "Texto autoral para fins didáticos."
     }
    ],
    "cmd": "A partir dos textos, **posicione-se** sobre a seguinte questão: **a restrição do uso do celular na escola contribui para a aprendizagem?** Escreva um texto **argumentativo** de **5 a 10 linhas**, com uma tese clara, ao menos um argumento desenvolvido e um exemplo.",
    "expect": [
     "Tese explícita logo no início (a favor, contra ou a favor com condições).",
     "Pelo menos um argumento desenvolvido, dialogando com um dos textos de apoio.",
     "Um exemplo concreto do cotidiano escolar.",
     "Conclusão coerente com a tese, sem contradição."
    ],
    "traps": [
     "Ficar em cima do muro, sem tese.",
     "Apenas resumir os dois textos, sem argumentar.",
     "Esquecer o exemplo pedido no comando."
    ],
    "model": "A restrição do celular na escola contribui para a aprendizagem, desde que venha acompanhada de educação digital. Sem as notificações constantes, os estudantes conseguem manter a atenção nas aulas e conversar mais nos intervalos, como defendem os apoiadores da lei. Um aluno que interrompe a resolução de um exercício a cada mensagem perde o raciocínio e precisa recomeçar. No entanto, como alerta a professora, proibir não basta: a escola deve usar a tecnologia em atividades planejadas, ensinando a pesquisar e checar informações. Assim, limitar o uso livre e orientar o uso pedagógico é o caminho mais eficaz."
   }
  ]
 }
};
 (globalThis.FURG_VESTIBULARES ||= []).push(data);
 globalThis.FURG_VESTIBULAR ||= data;
})();
