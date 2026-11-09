// Itens do acervo, chaves dos cadernos azuis conferidas no Inep e resoluções autorais.
globalThis.FURG_DIA2_PRACTICE = {
  "blocks": {
    "movimento": {
      "title": "Física · Movimento e energia",
      "subject": "fisica",
      "description": "Tempo de viagem, pressão, colisões, gravitação e rendimento",
      "ids": [
        "enem-2023-124",
        "enem-2025-118",
        "enem-2022-105",
        "enem-2022-123",
        "enem-2022-93"
      ]
    },
    "energia": {
      "title": "Física · Calor, ondas e circuitos",
      "subject": "fisica",
      "description": "Irradiação, Doppler, indução e associação de resistores",
      "ids": [
        "enem-2025-95",
        "enem-2024-99",
        "enem-2025-122",
        "enem-2022-119",
        "enem-2025-130"
      ]
    },
    "matematica": {
      "title": "Matemática · Modelagem e medidas",
      "subject": "matematica",
      "description": "Média, parcela fixa, porcentagem, escala e contagem",
      "ids": [
        "enem-2024-137",
        "enem-2025-141",
        "enem-2025-158",
        "enem-2024-151",
        "enem-2024-180"
      ]
    },
    "quimica": {
      "title": "Química · Soluções e reações",
      "subject": "quimica",
      "description": "Filtração, meia-vida, concentração, equilíbrio e pilhas",
      "ids": [
        "enem-2024-116",
        "enem-2025-110",
        "enem-2024-97",
        "enem-2025-117",
        "enem-2025-124"
      ]
    },
    "biologia": {
      "title": "Biologia · Célula, saúde e ambiente",
      "subject": "biologia",
      "description": "Enzimas, organelas, imunidade, sucessão e endemismo",
      "ids": [
        "enem-2024-102",
        "enem-2025-103",
        "enem-2024-126",
        "enem-2024-108",
        "enem-2025-116"
      ]
    }
  },
  "questions": {
    "enem-2023-124": {
      "subject": "fisica",
      "answer": "B",
      "fingerprint": "b7345eca",
      "card": "velocidade",
      "hint": "Some ao tempo em movimento o tempo parado, quando houver. Converte horas em minutos antes de comparar.",
      "steps": [
        "Compara dois tempos totais no mesmo percurso de 480 km.",
        "O carro gasta 480/100 = 4,8 h, ou 288 min, em movimento. Soma 10 × 3 = 30 min nas cabines e chega a 318 min. O caminhão gasta 480/80 = 6 h, ou 360 min, pois usa as cancelas automáticas.",
        "A diferença pedida é 360 − 318 = 42 min. O carro leva menos tempo apesar das paradas."
      ],
      "trap": "A diferença de 72 min compara só os tempos de movimento e ignora os pedágios.",
      "category": "comando"
    },
    "enem-2025-118": {
      "subject": "fisica",
      "answer": "C",
      "fingerprint": "30821ab4",
      "card": "densidade",
      "hint": "Escreve o peso usando massa = densidade × volume. A área de apoio aparece duas vezes.",
      "steps": [
        "A questão pede a altura máxima para que a pressão do peso da pilha seja 10⁴ Pa.",
        "Para uma pilha de seção A e altura h, V = Ah, então seu peso vale ρAhg. Dividindo por A, a pressão exercida pela pilha é p = ρgh.",
        "h = 10 000/(1 250 × 10) = 0,80 m. A área cancela na razão."
      ],
      "trap": "Não use 104 como cento e quatro. O caderno usa a potência 10⁴.",
      "category": "unidade",
      "edits": [
        [
          "m2",
          "m²"
        ],
        [
          "104",
          "10⁴"
        ],
        [
          "m3",
          "m³"
        ],
        [
          "m/s2",
          "m/s²"
        ]
      ]
    },
    "enem-2022-105": {
      "subject": "fisica",
      "answer": "A",
      "fingerprint": "2696119c",
      "card": "impulso",
      "hint": "Separa as comparações. Força média usa mudança de momento. Energia cinética usa o quadrado da velocidade.",
      "steps": [
        "Compara a força média sobre o carro e a perda de energia em dois impactos de mesma duração.",
        "Nos pneus, o carro rebate e a velocidade final muda de sentido. A variação do momento é maior em módulo que nos blocos, em que o carro apenas para. Para o mesmo intervalo, a força média é maior nos pneus.",
        "Nos blocos, toda a energia cinética inicial do carro é dissipada. Nos pneus, o carro ainda sai com energia cinética."
      ],
      "trap": "Mais força média não implica automaticamente mais dissipação. As duas perguntas usam grandezas diferentes.",
      "category": "conceito"
    },
    "enem-2022-123": {
      "subject": "fisica",
      "answer": "E",
      "fingerprint": "6acfd60f",
      "card": "gravidade",
      "hint": "Pensa no que muda no campo gravitacional à distância dos planetas quando se troca o objeto central.",
      "steps": [
        "O enunciado fixa a massa do objeto central e pergunta sobre as órbitas dos planetas.",
        "À distância dos planetas, na aproximação usada no exercício, a atração gravitacional depende da massa central e da distância ao centro. Substituir o Sol por um objeto da mesma massa não muda esses valores.",
        "Com as posições e velocidades iniciais preservadas e a mesma atração, as órbitas ficam inalteradas no modelo da questão."
      ],
      "trap": "O raio do horizonte é pequeno, mas não é a distância entre o centro do sistema e os planetas.",
      "category": "conceito"
    },
    "enem-2022-93": {
      "subject": "fisica",
      "answer": "B",
      "fingerprint": "f957bcd3",
      "card": "rendimento-fis",
      "hint": "Converte a potência em watts e calcula quantos watts úteis cada metro quadrado fornece.",
      "steps": [
        "O dado de 150 MW é a potência total instalada que os painéis devem entregar.",
        "Com irradiância de 1 500 W/m² e eficiência de 20%, cada metro quadrado entrega 1 500 × 0,20 = 300 W úteis. Use A = potência útil total ÷ potência útil por área.",
        "A = 150 000 000 ÷ 300 = 500 000 m²."
      ],
      "trap": "A energia anual em GWh descreve outro intervalo de uso. Aqui a conta compara potências em W.",
      "category": "unidade"
    },
    "enem-2025-95": {
      "subject": "fisica",
      "answer": "C",
      "fingerprint": "d1745d5d",
      "card": "transferencia",
      "hint": "Qual forma de transferência de energia térmica funciona mesmo quando não existe matéria entre os corpos?",
      "steps": [
        "A pergunta pede o processo de transferência de calor que independe de fluidos.",
        "A lâmpada emite ondas eletromagnéticas. Parte da energia dessas ondas pode ser absorvida pela mariposa, mesmo sem contato. Esse processo é a irradiação.",
        "A propagação da radiação não exige líquido nem gás."
      ],
      "trap": "Convecção envolve movimento de um fluido. Reflexão e refração descrevem outros comportamentos de ondas.",
      "category": "conceito"
    },
    "enem-2024-99": {
      "subject": "fisica",
      "answer": "D",
      "fingerprint": "c6a2d3d4",
      "card": "doppler",
      "hint": "Decide se fonte e observador se aproximam. Som mais agudo quer dizer frequência maior.",
      "steps": [
        "Compara o som percebido da sirene e a frequência da onda de rádio refletida durante a aproximação.",
        "A aproximação reduz o intervalo entre as frentes de onda que chegam ao observador, tornando o som mais agudo. A ambulância que se aproxima também faz a onda refletida voltar com frequência maior que a emitida pelo radar.",
        "Som mais agudo e fr > f₀ são as duas condições que precisam aparecer juntas."
      ],
      "trap": "Um som mais intenso é mais forte. A mudança de grave para agudo depende da frequência.",
      "category": "conceito"
    },
    "enem-2025-122": {
      "subject": "fisica",
      "answer": "D",
      "fingerprint": "0fcd1962",
      "card": "inducao",
      "hint": "Segue a cadeia campo variável, corrente no condutor e energia térmica.",
      "steps": [
        "O enunciado pergunta para que serve o campo magnético variável no fogão.",
        "O fluxo magnético variável induz correntes elétricas no fundo metálico da panela. A resistência do metal converte parte da energia elétrica em térmica por efeito Joule.",
        "O calor é gerado principalmente na panela, onde passam as correntes induzidas."
      ],
      "trap": "Imantar o metal não é a etapa que explica o aquecimento descrito.",
      "category": "conceito"
    },
    "enem-2022-119": {
      "subject": "fisica",
      "answer": "A",
      "fingerprint": "4da6f752",
      "card": "geradores",
      "hint": "A pilha invertida muda o sinal da tensão. As resistências internas continuam em série.",
      "steps": [
        "A corrente deve ser calculada com uma pilha invertida e todas as resistências no circuito.",
        "Pelos valores nominais da lâmpada, R = U²/P = 4,5 Ω no modelo do exercício. As três resistências internas somam 1,5 Ω. As f.e.m. ficam 1,5 + 1,5 − 1,5 = 1,5 V.",
        "Com resistência total de 6 Ω, i = 1,5/6 = 0,25 A."
      ],
      "trap": "Subtraia a f.e.m. da pilha invertida. A resistência dessa pilha permanece somando.",
      "category": "modelo"
    },
    "enem-2025-130": {
      "subject": "fisica",
      "answer": "E",
      "fingerprint": "872d84f9",
      "card": "resistores",
      "hint": "A fonte fornece 120% da tensão nominal. Onde precisa cair o excedente de 20%?",
      "steps": [
        "Determina a associação que deixa só a tensão recomendada no equipamento.",
        "Coloque o resistor em série para que ele compartilhe a mesma corrente e receba o excesso de tensão. Como U = Ri e i é igual nos dois resistores, a razão das tensões é a razão das resistências.",
        "Se Uₚ = 0,2U꜀, então Rₚ = 0,2R꜀. Em paralelo, ambos receberiam a tensão da fonte."
      ],
      "trap": "O resistor deve receber 20% da tensão nominal do equipamento, não 120%.",
      "category": "modelo"
    },
    "enem-2024-137": {
      "subject": "matematica",
      "answer": "B",
      "fingerprint": "6d5f356e",
      "card": "media",
      "hint": "Chama a soma das notas de S e escreve as duas médias a partir da mesma soma.",
      "steps": [
        "A média errada, com divisor 5, ficou uma unidade abaixo da média correta.",
        "A média correta é S/4. A errada é S/5. Então S/4 − S/5 = 1, isto é, S/20 = 1. Logo, a soma é 20.",
        "A pergunta pede a média correta, 20/4 = 5."
      ],
      "trap": "A soma das notas aparece no meio da solução. Retoma o que o comando pede antes de marcar.",
      "category": "comando"
    },
    "enem-2025-141": {
      "subject": "matematica",
      "answer": "C",
      "fingerprint": "b342fbc3",
      "card": "custo-fixo",
      "hint": "O volume descartado é fixo. Descobre a perda pela diferença entre o que foi enviado e o que chegou.",
      "steps": [
        "O posto quer receber exatamente o dobro do volume encomendado no primeiro pedido.",
        "A perda do primeiro envio é 10 200 − 9 900 = 300 L. O novo pedido é 2 × 10 000 = 20 000 L recebidos. A perda continua valendo 300 L.",
        "A distribuidora precisa enviar 20 300 L, quantidade dentro da capacidade do caminhão."
      ],
      "trap": "O que dobra é a encomenda. A perda constante é adicionada uma única vez.",
      "category": "comando"
    },
    "enem-2025-158": {
      "subject": "matematica",
      "answer": "C",
      "fingerprint": "3ee86fe8",
      "card": "percentual",
      "hint": "O reajuste de 20% incide só no seguro. A mensalidade precisa cobrir despesas e lucro.",
      "steps": [
        "Calcula a arrecadação desejada e divide pelo número de vagas ocupadas.",
        "O novo seguro é 36 × 1,20 = R$ 43,20 por veículo. A despesa total é 14 240 + 120 × 43,20 = R$ 19 424. Com R$ 10 000 de lucro, a arrecadação precisa ser R$ 29 424.",
        "29 424 ÷ 120 = R$ 245,20 por vaga."
      ],
      "trap": "Aplicar o percentual à manutenção ou à mensalidade inteira muda a base do reajuste.",
      "category": "modelo"
    },
    "enem-2024-151": {
      "subject": "matematica",
      "answer": "E",
      "fingerprint": "231e6f8b",
      "card": "escala",
      "hint": "A escala 1:200 está nos comprimentos. Para a área, aplica o fator duas vezes.",
      "steps": [
        "Converte a área real em área de maquete e entrega a resposta em cm².",
        "O fator de área é 1/200² = 1/40 000. A área da maquete é 1 672/40 000 = 0,0418 m².",
        "Cada m² vale 10 000 cm². Então 0,0418 × 10 000 = 418 cm²."
      ],
      "trap": "Dividir por 200 só uma vez usa escala linear. Converter m² como se fosse m também muda o resultado.",
      "category": "unidade",
      "edits": [
        [
          "m2",
          "m²"
        ]
      ]
    },
    "enem-2024-180": {
      "subject": "matematica",
      "answer": "E",
      "fingerprint": "70a384b0",
      "card": "combinacao",
      "hint": "Pelo menos três permite três casos. A ordem de escolha dos integrantes muda a equipe?",
      "steps": [
        "Forma uma equipe de cinco pessoas com três, quatro ou cinco cardiologistas.",
        "Em cada caso, multiplica o número de escolhas de cardiologistas pelo de neurologistas, usando combinação. Os pares de quantidades são (3,2), (4,1) e (5,0).",
        "Some C(7,3)C(6,2) + C(7,4)C(6,1) + C(7,5)C(6,0). São equipes de casos disjuntos."
      ],
      "trap": "A expressão com só três cardiologistas deixa de fora dois casos permitidos.",
      "category": "comando"
    },
    "enem-2024-116": {
      "subject": "quimica",
      "answer": "A",
      "fingerprint": "3fd3922e",
      "card": "misturas",
      "hint": "Olha para os estados físicos indicados na equação. Qual produto fica em fase sólida?",
      "steps": [
        "A questão pede o método para retirar Mg(OH)₂ sólido de uma mistura aquosa.",
        "O hidróxido de magnésio é pouco solúvel e aparece como sólido. A filtração pode reter as partículas do precipitado enquanto a fase líquida atravessa o filtro.",
        "Os íons dissolvidos permanecem principalmente no filtrado. O sólido de interesse fica retido."
      ],
      "trap": "Destilação separa com base em volatilidade. O problema descreve um sólido suspenso.",
      "category": "conceito"
    },
    "enem-2025-110": {
      "subject": "quimica",
      "answer": "E",
      "fingerprint": "22086f1b",
      "card": "meia-vida",
      "hint": "Divide o tempo decorrido pelo tempo de meia-vida. Depois aplica o fator de metade repetidamente.",
      "steps": [
        "A pergunta pede a massa radioativa restante depois de 26,5 anos.",
        "26,5/5,3 = 5 meias-vidas. A massa remanescente é 2,00 × (1/2)⁵ = 2,00/32 mg.",
        "0,0625 mg tem valor mais próximo de 0,06 mg."
      ],
      "trap": "A cada etapa desaparece metade da quantidade que ainda resta. Não se divide a massa inicial por cinco.",
      "category": "modelo"
    },
    "enem-2024-97": {
      "subject": "quimica",
      "answer": "D",
      "fingerprint": "fe238815",
      "card": "concentracao",
      "hint": "A concentração se refere ao sódio. Converte primeiro em massa de sódio e depois em massa de sal.",
      "steps": [
        "A questão pede massa de NaCl de uma colher, a partir da concentração de sódio em 2 L preparados com duas colheres.",
        "1,4 mg/mL × 2 000 mL = 2 800 mg de Na, ou 2,8 g. Cada mol de NaCl fornece um mol de Na⁺. Portanto, a massa total de NaCl é (2,8/23) × 58,5 ≈ 7,1 g.",
        "Divida por duas colheres. Cada uma contém cerca de 3,6 g de NaCl."
      ],
      "trap": "2,8 g é a massa total do sódio. 7,1 g é a massa do sal nas duas colheres.",
      "category": "unidade"
    },
    "enem-2025-117": {
      "subject": "quimica",
      "answer": "D",
      "fingerprint": "54b4385c",
      "card": "equilibrio",
      "hint": "Localiza o Cl₂ e o O₂ na equação. Confere também quantos mols gasosos há de cada lado.",
      "steps": [
        "A questão pede uma mudança que favoreça a produção de TiCl₄ a partir de um sistema em equilíbrio.",
        "Aumentar a pressão parcial de Cl₂, que é reagente, desloca o equilíbrio no sentido de consumi-lo, favorecendo a formação de TiCl₄.",
        "Há dois mols gasosos de cada lado. Resfriar desfavorece a direção endotérmica, e adicionar O₂ favorece a reação inversa."
      ],
      "trap": "Mudar a pressão parcial de uma espécie é diferente de comprimir o sistema todo.",
      "category": "conceito",
      "edits": [
        [
          "TiO2 (s) + 2 Cl2 (g) TiCl4 (g) + O2 (g)    ΔH = +175 kJ/mol Depois",
          "\n\nTiO₂ (s) + 2 Cl₂ (g) ⇌ TiCl₄ (g) + O₂ (g)    ΔH = +175 kJ/mol\n\nDepois"
        ]
      ]
    },
    "enem-2025-124": {
      "subject": "quimica",
      "answer": "B",
      "fingerprint": "d91a510c",
      "card": "pilha",
      "hint": "Marca quais semirreações são oxidação e redução em cada situação. Os valores da tabela foram dados como reduções.",
      "steps": [
        "Calcula duas diferenças de potencial na ordem pedida. Escurecer significa formar Ag₂S. Clarear significa reduzi-lo a Ag.",
        "No escurecimento, O₂ reduz com +1,23 V e a semirreação da prata é invertida. ΔE° = 1,23 − (−0,69) = +1,92 V. No clareamento, o Al oxida e Ag₂S reduz. ΔE° = −0,69 − (−1,68) = +0,99 V.",
        "A ordem é +1,92 V e +0,99 V. Coeficientes usados para balancear elétrons não multiplicam os potenciais."
      ],
      "trap": "Subtrair o potencial de redução da espécie oxidada já incorpora a inversão de sinal.",
      "category": "calculo",
      "edits": [
        [
          "Ag2S (s) + 2 e− → 2 Ag (s) + S2− (aq) O2 (g) + 4 H+ (aq) + 4 e− → 2 H2O (l) Al3+ (aq) + 3 e− → Al (s) −0,69 V +1,23 V −1,68 V",
          "\n\nAg₂S (s) + 2 e⁻ → 2 Ag (s) + S²⁻ (aq)    −0,69 V\nO₂ (g) + 4 H⁺ (aq) + 4 e⁻ → 2 H₂O (l)    +1,23 V\nAl³⁺ (aq) + 3 e⁻ → Al (s)    −1,68 V\n\n"
        ]
      ]
    },
    "enem-2024-102": {
      "subject": "biologia",
      "answer": "A",
      "fingerprint": "6b22dc68",
      "card": "enzimas",
      "hint": "O procedimento começa com água fervente. O que o calor intenso faz com proteínas que catalisam reações?",
      "steps": [
        "Explica por que menos glicose foi convertida em amido após o procedimento.",
        "O aquecimento intenso pode desnaturar enzimas envolvidas no metabolismo do milho. Com a conformação alterada, essas proteínas perdem atividade catalítica.",
        "Menos glicose é convertida em amido e a presença de açúcares preserva o sabor adocicado."
      ],
      "trap": "O resfriamento pode reduzir a atividade de enzimas, mas a desnaturação descrita se associa à temperatura alta.",
      "category": "conceito"
    },
    "enem-2025-103": {
      "subject": "biologia",
      "answer": "A",
      "fingerprint": "56056791",
      "card": "organela",
      "hint": "Procura a organela relacionada à digestão intracelular em meio ácido.",
      "steps": [
        "A pista é a deficiência de uma enzima degradadora que leva ao acúmulo de lipídios.",
        "Lisossomos contêm enzimas que digerem macromoléculas em meio ácido, incluindo lipídios em processos de degradação intracelular.",
        "Se a lipase ácida não atua como deveria, o acúmulo descrito aponta para insuficiência funcional dos lisossomos."
      ],
      "trap": "Produzir lipídios no retículo liso é um processo diferente de degradá-los por enzimas lisossômicas.",
      "category": "conceito"
    },
    "enem-2024-126": {
      "subject": "biologia",
      "answer": "A",
      "fingerprint": "d6897279",
      "card": "imunidade",
      "hint": "Identifica se a vacina fornece anticorpos prontos ou apresenta um antígeno para o corpo responder.",
      "steps": [
        "O comando pede o que a proteína viral induz quando usada como antígeno na vacina.",
        "A espícula é reconhecida pelo sistema imune. Sua apresentação favorece uma resposta específica, que inclui a produção de anticorpos contra o antígeno.",
        "A proteção induzida por vacina é uma resposta ativa do organismo."
      ],
      "trap": "A proteína da vacina estimula a resposta. Quem neutraliza o vírus são componentes da resposta, como anticorpos.",
      "category": "conceito"
    },
    "enem-2024-108": {
      "subject": "biologia",
      "answer": "B",
      "fingerprint": "ae9d4b00",
      "card": "sucessao",
      "hint": "O foco do texto está na comunidade inteira e no que muda ao longo do tempo.",
      "steps": [
        "Identifica o processo ecológico análogo à mudança gradual de espécies e estrutura vegetal.",
        "Nos sistemas descritos, diferentes plantas entram em etapas, e a composição da comunidade vai mudando. Na natureza, essa sequência de mudanças na comunidade é chamada de sucessão ecológica.",
        "A analogia funciona pelo padrão de mudanças ao longo do tempo, ainda que o sistema seja planejado."
      ],
      "trap": "Rotação de culturas é alternância agrícola. O trecho destaca mudanças na composição da comunidade.",
      "category": "comando"
    },
    "enem-2025-116": {
      "subject": "biologia",
      "answer": "C",
      "fingerprint": "2ed73d77",
      "card": "selecao",
      "hint": "A expressão distribuição restrita é a pista para nomear as espécies.",
      "steps": [
        "O comando pede como são chamadas as espécies cuja distribuição fica limitada a certos ambientes.",
        "As condições das cangas favorecem espécies adaptadas àquele conjunto de características. O texto informa que muitas das espécies da comunidade têm distribuição restrita.",
        "Espécie endêmica é aquela cuja distribuição natural se restringe a determinada área."
      ],
      "trap": "Dominante indica abundância ou influência numa comunidade. Endêmica descreve distribuição geográfica.",
      "category": "conceito"
    }
  },
  "official": {
    "2022": {
      "93": "B",
      "105": "A",
      "119": "A",
      "123": "E"
    },
    "2023": {
      "124": "B"
    },
    "2024": {
      "97": "D",
      "99": "D",
      "102": "A",
      "108": "B",
      "116": "A",
      "126": "A",
      "137": "B",
      "151": "E",
      "180": "E"
    },
    "2025": {
      "95": "C",
      "103": "A",
      "110": "E",
      "116": "C",
      "117": "D",
      "118": "C",
      "122": "D",
      "124": "B",
      "130": "E",
      "141": "C",
      "158": "C"
    }
  },
  "officialSources": {
    "2022": {
      "exam": "https://download.inep.gov.br/enem/provas_e_gabaritos/2022_PV_impresso_D2_CD7.pdf",
      "key": "https://download.inep.gov.br/enem/provas_e_gabaritos/2022_GB_impresso_D2_CD7.pdf"
    },
    "2023": {
      "exam": "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_PV_impresso_D2_CD7.pdf",
      "key": "https://download.inep.gov.br/enem/provas_e_gabaritos/2023_GB_impresso_D2_CD7.pdf"
    },
    "2024": {
      "exam": "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_PV_impresso_D2_CD7.pdf",
      "key": "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_GB_impresso_D2_CD7.pdf"
    },
    "2025": {
      "exam": "https://download.inep.gov.br/enem/provas_e_gabaritos/2025_PV_impresso_D2_CD7.pdf",
      "key": "https://download.inep.gov.br/enem/provas_e_gabaritos/2025_GB_impresso_D2_CD7.pdf"
    }
  }
};
