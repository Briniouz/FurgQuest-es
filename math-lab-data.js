// Conteúdo autoral. Questões e gabaritos vinculados ao acervo do Inep.
globalThis.FURG_MATH_LAB_DATA = {
  "models": {
    "enem-2024-137": {
      "title": "Média das quatro provas",
      "key": "B",
      "level": 2,
      "skill": "calcular",
      "formula": "media",
      "pattern": "Média com divisor trocado",
      "fingerprint": "6d5f356e",
      "hints": [
        "O comando pede a média correta das quatro provas.",
        "As duas médias usam a mesma soma, mas os divisores são diferentes.",
        "Chama a soma de S e escreve a diferença entre S/4 e S/5."
      ],
      "routes": [
        {
          "title": "Equação com a soma",
          "text": "S/4 − S/5 = 1. Com denominador 20, S/20 = 1. Logo S = 20 e a média correta é 5.",
          "when": "É direta quando a incógnita escolhida é a soma."
        },
        {
          "title": "Frações da média",
          "text": "A média errada é 4/5 da correta. A diferença de 1 corresponde ao 1/5 que falta, então a correta vale 5.",
          "when": "É mais curta se tu já enxergar a relação entre os divisores."
        }
      ]
    },
    "enem-2024-140": {
      "title": "Faixas de acerto",
      "key": "B",
      "level": 2,
      "skill": "proporcao",
      "formula": "percentual",
      "pattern": "Porcentagens em sequência",
      "fingerprint": "5da830be",
      "hints": [
        "Classifica João e Felipe na ordem pedida.",
        "Ambos resolveram 200. A redução de Felipe usa os acertos de João como base.",
        "Mantém 70% dos acertos de João e compara cada porcentagem com os limites da tabela."
      ],
      "routes": [
        {
          "title": "Fatores percentuais",
          "text": "Felipe fica com 0,70 × 75% = 52,5%. João está na faixa que começa em 75%, e Felipe na faixa de 50% a menos de 60%.",
          "when": "É a mais rápida se os dois totais são iguais."
        },
        {
          "title": "Contagem de acertos",
          "text": "João acerta 150 das 200. Felipe acerta 150 − 45 = 105, então 105/200 = 52,5%. Os conceitos são muito bom e regular.",
          "when": "É útil para conferir a base dos 30% e os limites das faixas."
        }
      ]
    },
    "enem-2024-145": {
      "title": "Campo do Maracanã",
      "key": "D",
      "level": 1,
      "skill": "area",
      "formula": "areas",
      "pattern": "Área que muda",
      "fingerprint": "72655161",
      "hints": [
        "Calcula quantos metros quadrados foram retirados do campo.",
        "Os dois campos são retângulos de 110 por 75 e 105 por 68.",
        "Calcula as duas áreas e subtrai a menor da maior, ou divide a parte removida em faixas."
      ],
      "routes": [
        {
          "title": "Subtração de áreas",
          "text": "O campo antigo mede 110 × 75 = 8 250 m². O novo mede 105 × 68 = 7 140 m². A diferença é 1 110 m².",
          "when": "É direta quando os dois produtos são simples."
        },
        {
          "title": "Faixas removidas",
          "text": "Tira primeiro uma faixa de 5 × 75. Depois tira uma de 105 × 7. A soma é 375 + 735 = 1 110 m².",
          "when": "Ajuda a visualizar a retirada e evita contar o canto duas vezes."
        }
      ],
      "options": {
        "E": "1 145"
      }
    },
    "enem-2024-146": {
      "title": "Galinheiro de área máxima",
      "key": "B",
      "level": 3,
      "skill": "area",
      "formula": "quadratica",
      "pattern": "Máximo com restrição",
      "fingerprint": "230935e4",
      "hints": [
        "A pergunta pede o maior lado do retângulo de maior área.",
        "Os pares de lados custam 40L e 30C. O teto é R$ 6 000.",
        "Usa o orçamento todo no máximo e expressa C em função de L, ou compara as duas parcelas de gasto."
      ],
      "routes": [
        {
          "title": "Vértice da parábola",
          "text": "C = 200 − 4L/3. Logo A = 200L − 4L²/3, com vértice em L = 75. Assim C = 100 e o maior lado mede 100 m.",
          "when": "É mais geral e funciona quando a função de área já está escrita."
        },
        {
          "title": "Produto com soma fixa",
          "text": "Escreve x = 40L e y = 30C. Como x + y = 6 000, xy é máximo quando x = y = 3 000. Isso dá L = 75 e C = 100.",
          "when": "É mais rápida quando duas parcelas positivas têm soma fixa."
        }
      ]
    },
    "enem-2024-151": {
      "title": "Vão de uma maquete",
      "key": "E",
      "level": 2,
      "skill": "unidades",
      "formula": "escala",
      "pattern": "Escala de área",
      "fingerprint": "231e6f8b",
      "hints": [
        "Encontra a área na maquete em cm².",
        "A área real é 1 672 m². A escala 1:200 vale para comprimento.",
        "Eleva o fator da escala ao quadrado antes de converter a unidade, ou converte a própria escala."
      ],
      "routes": [
        {
          "title": "Fator de área",
          "text": "Divide 1 672 por 200². São 0,0418 m² na maquete. Multiplica por 10 000 e obtém 418 cm².",
          "when": "É a abordagem direta para qualquer escala linear."
        },
        {
          "title": "Escala já na unidade pedida",
          "text": "Cada 1 cm do modelo equivale a 200 cm, ou 2 m reais. Então 1 cm² no modelo equivale a 4 m² reais. 1 672 ÷ 4 = 418 cm².",
          "when": "É mais curta quando a escala converte bem de centímetro para metro."
        }
      ],
      "edits": [
        [
          "m2",
          "m²"
        ]
      ]
    },
    "enem-2024-153": {
      "title": "Taxa em representação decimal",
      "key": "D",
      "level": 1,
      "skill": "unidades",
      "formula": "percentual",
      "pattern": "Converter porcentagem",
      "fingerprint": "116768b1",
      "hints": [
        "Converte apenas a taxa de 135,25% para decimal.",
        "O símbolo % significa por cem. O enunciado não pede o multiplicador do valor final.",
        "Divide a taxa por 100 e verifica se ela continua maior que 1."
      ],
      "routes": [
        {
          "title": "Divisão direta",
          "text": "135,25 ÷ 100 = 1,3525.",
          "when": "É a mais rápida quando o pedido é só mudar a representação."
        },
        {
          "title": "Decomposição",
          "text": "100% é 1, 35% é 0,35 e 0,25% é 0,0025. Somando dá 1,3525.",
          "when": "Ajuda a conferir a posição da vírgula em porcentagens maiores que 100%."
        }
      ],
      "options": {
        "E": "0,13525"
      }
    },
    "enem-2024-156": {
      "title": "Tarifa de transporte",
      "key": "B",
      "level": 1,
      "skill": "modelar",
      "formula": "custo-fixo",
      "pattern": "Parcela fixa e variável",
      "fingerprint": "fd1a59ef",
      "hints": [
        "Escreve uma expressão em reais para uma viagem.",
        "Há R$ 2 de partida, R$ 0,26 por minuto e R$ 1,40 por quilômetro.",
        "Transforma cada preço por unidade em uma parcela e soma as três."
      ],
      "routes": [
        {
          "title": "Soma das parcelas",
          "text": "A partida custa 2. Os T minutos custam 0,26T e os D quilômetros, 1,40D. Portanto V = 2 + 0,26T + 1,40D.",
          "when": "É mais rápida quando cada taxa já foi dada no enunciado."
        },
        {
          "title": "Teste de valores",
          "text": "Com T = D = 0, a tarifa é 2. Aumentar só T em 1 acrescenta 0,26, e aumentar só D em 1 acrescenta 1,40. Só a alternativa B respeita os três testes.",
          "when": "É útil para eliminar fórmulas parecidas."
        }
      ],
      "options": {
        "E": "F + T + D"
      }
    },
    "enem-2024-157": {
      "title": "Taxa de entrega e preço por porção",
      "key": "C",
      "level": 2,
      "skill": "modelar",
      "formula": "custo-fixo",
      "pattern": "Parcela fixa e variável",
      "fingerprint": "3ad28452",
      "hints": [
        "Descobre o novo preço de uma porção mantendo o total de cinco.",
        "O frete muda de 10 para 15 reais. Antes cada porção custava 25 reais.",
        "Iguala os dois totais ou distribui o aumento do frete pelas cinco porções."
      ],
      "routes": [
        {
          "title": "Equação do total",
          "text": "O total antigo é 10 + 5 × 25 = 135. O novo obedece a 15 + 5p = 135. Portanto p = 24 reais.",
          "when": "É segura quando mudam várias parcelas."
        },
        {
          "title": "Compensação",
          "text": "O frete subiu R$ 5. Com cinco porções, cada uma precisa cair R$ 1 para manter o total. Novo preço R$ 24.",
          "when": "É mais curta quando só duas parcelas se compensam."
        }
      ]
    },
    "enem-2024-160": {
      "title": "Vazão das piscinas",
      "key": "D",
      "level": 2,
      "skill": "proporcao",
      "formula": "proporcao",
      "pattern": "Taxa e proporcionalidade",
      "fingerprint": "87ca96e6",
      "hints": [
        "Encontra a vazão da segunda piscina em litros por minuto.",
        "O volume sobe de 2,5 para 2,75 milhões. O tempo aumenta 20%.",
        "Usa volume = vazão × tempo. Dá para comparar os fatores sem calcular os tempos."
      ],
      "routes": [
        {
          "title": "Comparar fatores",
          "text": "O volume é multiplicado por 1,10, e o tempo por 1,20. Então a vazão vira 6 000 × 1,10/1,20 = 5 500 L/min.",
          "when": "É mais curta porque evita um tempo com dízima."
        },
        {
          "title": "Calcular o novo tempo",
          "text": "A primeira leva 2 500 000/6 000 minutos. Multiplicando por 1,20, a segunda leva 500 min. Divida 2 750 000 por 500 e obtenha 5 500 L/min.",
          "when": "É útil quando tu quer conferir cada grandeza e unidade."
        }
      ],
      "options": {
        "E": "5 280"
      }
    },
    "enem-2024-166": {
      "title": "Densidades demográficas",
      "key": "E",
      "level": 2,
      "skill": "proporcao",
      "formula": "proporcao",
      "pattern": "Razão de duas grandezas",
      "fingerprint": "2a13b879",
      "hints": [
        "Compara as duas densidades, não as populações isoladas.",
        "Q tem metade da população e três quartos da área de R.",
        "Substitui esses fatores em habitantes/área, ou escolhe números proporcionais."
      ],
      "routes": [
        {
          "title": "Razões algébricas",
          "text": "Se R tem P habitantes e área A, d(Q) = (P/2)/(3A/4) = (2/3)P/A. Então d(Q) = (2/3)d(R).",
          "when": "É direta se tu está confortável com frações compostas."
        },
        {
          "title": "Números convenientes",
          "text": "Escolhe R com 12 habitantes e 4 km². Q terá 6 habitantes e 3 km². As densidades são 3 e 2, logo Q vale 2/3 de R.",
          "when": "É rápida quando o enunciado só impõe fatores e nenhum valor absoluto."
        }
      ]
    },
    "enem-2024-169": {
      "title": "Código na terceira tentativa",
      "key": "E",
      "level": 3,
      "skill": "probabilidade",
      "formula": "probabilidade",
      "pattern": "Probabilidade sem reposição",
      "fingerprint": "c022fe6f",
      "hints": [
        "Quer o primeiro acerto exatamente na terceira tentativa.",
        "Há 25 deslocamentos possíveis. Cada erro é removido da lista.",
        "Organiza dois erros seguidos de um acerto, com o total diminuindo a cada escolha."
      ],
      "routes": [
        {
          "title": "Probabilidades condicionadas",
          "text": "A sequência tem chance 24/25 × 23/24 × 1/23. As duas primeiras escolhas precisam falhar, e a terceira acertar entre as 23 restantes.",
          "when": "É a melhor para comparar as expressões nas alternativas."
        },
        {
          "title": "Posição em ordem aleatória",
          "text": "Imagine os 25 candidatos embaralhados. O correto tem a mesma chance de estar em qualquer posição, então cair exatamente na terceira tem chance 1/25. A alternativa E simplifica a 1/25 e descreve os eventos certos.",
          "when": "É rápida para conferir o valor quando as tentativas são distintas e aleatórias."
        }
      ]
    },
    "enem-2024-177": {
      "title": "Tabela de custo de mochilas",
      "key": "C",
      "level": 2,
      "skill": "dados",
      "formula": "funcao-afim",
      "pattern": "Parcela fixa e variável",
      "fingerprint": "27382d88",
      "hints": [
        "Encontra o custo para 80 mochilas.",
        "A tabela dá custo para 30, 50 e 100. A diferença de custo por unidade é constante.",
        "Extrai o custo variável pela diferença de dois pontos e parte de um custo conhecido."
      ],
      "routes": [
        {
          "title": "Função afim",
          "text": "Entre 30 e 50, sobe R$ 600 em 20 unidades, logo a = 30. Substituir 30 em C = 30n + b dá b = 150. C(80) = 2 550.",
          "when": "É a melhor quando também queres conhecer custo fixo e taxa."
        },
        {
          "title": "Incremento a partir da tabela",
          "text": "De 50 a 100, a taxa é 1 500/50 = R$ 30 por mochila. Para ir de 50 a 80, soma 30 × 30 aos R$ 1 650. Resultado R$ 2 550.",
          "when": "É mais curta se só pedem um ponto."
        }
      ]
    },
    "enem-2024-178": {
      "title": "Umidade em seis meses",
      "key": "E",
      "level": 1,
      "skill": "dados",
      "formula": "mediana",
      "pattern": "Mediana com dados em tabela",
      "fingerprint": "998f32bf",
      "hints": [
        "O comando pede a mediana, que depende da ordem dos valores.",
        "São seis valores, então há duas posições centrais.",
        "Ordena os valores ou conta frequências até a terceira e a quarta posições."
      ],
      "routes": [
        {
          "title": "Lista ordenada",
          "text": "46, 54, 60, 64, 64, 66. A mediana é (60 + 64)/2 = 62%.",
          "when": "É rápida para poucos dados."
        },
        {
          "title": "Contagem de posições",
          "text": "Há dois valores abaixo de 60. O 60 ocupa a terceira posição, e o primeiro 64 ocupa a quarta. A média das duas posições é 62%.",
          "when": "É útil quando a tabela tem valores repetidos e muitas linhas."
        }
      ],
      "edits": [
        [
          "| Meses | Maio | Jun. | Jul. | Ago. | Set. | Out. |\n| --- | --- | --- | --- | --- | --- | --- |\n| Média mensal da umidade relativa do ar (%) | 66 | 64 | 54 | 46 | 60 | 64 |",
          "\n\nMédia mensal da umidade relativa do ar\nMaio 66% · Jun. 64% · Jul. 54% · Ago. 46% · Set. 60% · Out. 64%\n\n"
        ]
      ]
    },
    "enem-2024-179": {
      "title": "Pagamento por horas",
      "key": "C",
      "level": 2,
      "skill": "proporcao",
      "formula": "proporcao",
      "pattern": "Divisão proporcional",
      "fingerprint": "72af0b81",
      "hints": [
        "Encontra a maior diferença entre dois pagamentos.",
        "As horas totais são 22, 20 e 15. A divisão usa 40% do valor do serviço.",
        "Calcula o valor por hora ou aplica diretamente a fração da diferença de horas."
      ],
      "routes": [
        {
          "title": "Valor de uma hora",
          "text": "A verba é 0,40 × 71 250 = 28 500 reais. Dividida por 57 h, dá R$ 500/h. A maior diferença é (22 − 15) × 500 = R$ 3 500.",
          "when": "É clara se tu quer conferir quanto cada engenheiro recebe."
        },
        {
          "title": "Fração do total",
          "text": "A maior diferença corresponde a 7/57 da verba. Assim, 28 500 × 7/57 = R$ 3 500.",
          "when": "É mais curta quando só se pede a diferença."
        }
      ]
    },
    "enem-2024-180": {
      "title": "Equipe de médicos",
      "key": "E",
      "level": 3,
      "skill": "probabilidade",
      "formula": "combinacao",
      "pattern": "Contagem com restrições",
      "fingerprint": "70a384b0",
      "hints": [
        "Conta equipes de cinco com pelo menos três cardiologistas.",
        "Há 7 cardiologistas e 6 neurologistas, sem cargos diferentes na equipe.",
        "Separa os casos 3+2, 4+1 e 5+0. Dentro de cada caso, multiplica as escolhas."
      ],
      "routes": [
        {
          "title": "Casos favoráveis",
          "text": "C(7,3)C(6,2) + C(7,4)C(6,1) + C(7,5)C(6,0). Isso dá 525 + 210 + 21 = 756 equipes e corresponde à expressão da alternativa E.",
          "when": "É a mais rápida porque a questão pede a expressão e há só três casos."
        },
        {
          "title": "Complemento",
          "text": "De C(13,5) = 1 287, tira as equipes com zero, um ou dois cardiologistas. São 6 + 105 + 420 = 531. Restam 756.",
          "when": "É uma boa conferência quando a contagem total é simples."
        }
      ]
    },
    "enem-2025-136": {
      "title": "Escolha do cilindro de GNV",
      "key": "C",
      "level": 2,
      "skill": "estimar",
      "formula": "proporcao",
      "pattern": "Taxa e proporcionalidade",
      "fingerprint": "7ebe29b4",
      "hints": [
        "Procura a menor capacidade disponível que atende à semana inteira.",
        "O carro roda 30 km por dia, sete dias. Cada m³ permite 13 km.",
        "Calcula o consumo semanal e compara com os tamanhos, ou testa a autonomia das opções."
      ],
      "routes": [
        {
          "title": "Consumo mínimo",
          "text": "São 210 km. O consumo é 210/13 ≈ 16,15 m³. Entre os modelos, o menor que supera isso é o de 17 m³.",
          "when": "É direto quando a divisão é simples ou pode ser estimada."
        },
        {
          "title": "Autonomia das opções",
          "text": "O cilindro de 14 m³ rende 182 km e é pequeno. O de 17 m³ rende 221 km e atende. Os menores que 14 também falham.",
          "when": "É mais rápido se multiplicar for mais simples que dividir."
        }
      ],
      "edits": [
        [
          "m3",
          "m³"
        ]
      ]
    },
    "enem-2025-137": {
      "title": "Internautas e redes sociais",
      "key": "B",
      "level": 2,
      "skill": "dados",
      "formula": "condicional",
      "pattern": "Porcentagens em sequência",
      "fingerprint": "1716dfa1",
      "hints": [
        "O sorteio é entre todos os internautas, com duas condições na mesma pessoa.",
        "Dos internautas, 90% acessam redes sociais. Entre quem acessa, 60% são mulheres.",
        "Encontra a porcentagem de homens dentro do grupo que acessa e converte para o universo inteiro."
      ],
      "routes": [
        {
          "title": "Produto de proporções",
          "text": "Entre os que acessam, a fração de homens é 1 − 0,60 = 0,40. No conjunto inteiro, P = 0,90 × 0,40 = 0,36 = 36/100.",
          "when": "É rápida quando o enunciado deixa claros os dois universos."
        },
        {
          "title": "Grupo de 100",
          "text": "Imagina 100 internautas. Desses, 90 acessam e 54 são mulheres que acessam. Sobram 36 homens entre os 90. Sobre o total, são 36/100.",
          "when": "Ajuda a manter o denominador certo quando uma porcentagem é de um subgrupo."
        }
      ],
      "options": {
        "A": "30/90",
        "B": "36/100",
        "C": "40/100",
        "D": "40/90",
        "E": "46/90"
      },
      "supplement": {
        "kind": "infografico",
        "description": "Dados do infográfico original",
        "items": [
          "90% dos internautas brasileiros acessavam redes sociais.",
          "60% de quem acessava redes sociais eram mulheres."
        ]
      }
    },
    "enem-2025-140": {
      "title": "Retirada de parte da solução",
      "key": "E",
      "level": 3,
      "skill": "proporcao",
      "formula": "percentual",
      "pattern": "Porcentagens em sequência",
      "fingerprint": "d688ffdb",
      "hints": [
        "Calcula quanto de S1 sai, mantendo S2 constante.",
        "S2 é 0,05% dos 10 L inicialmente e passa a ser 0,10% da mistura final.",
        "Usa a quantidade fixa de S2 para descobrir o volume final, ou escreve a proporção com o volume retirado."
      ],
      "routes": [
        {
          "title": "Parte invariável",
          "text": "Há 10 × 0,0005 = 0,005 L de S2. Isso vira 0,001 do volume final, que é 5 L. A retirada foi de 10 − 5 = 5 L.",
          "when": "É mais curta porque acompanha a substância que fica intacta."
        },
        {
          "title": "Equação de concentração",
          "text": "Inicialmente há 9,995 L de S1. Com retirada x, (9,995 − x)/(10 − x) = 0,999. Resolvendo, x = 5 L.",
          "when": "É útil se a relação pedida no texto já foi montada com S1."
        }
      ]
    },
    "enem-2025-141": {
      "title": "Perda fixa no caminhão",
      "key": "C",
      "level": 1,
      "skill": "modelar",
      "formula": "custo-fixo",
      "pattern": "Parcela fixa e variável",
      "fingerprint": "b342fbc3",
      "hints": [
        "O pedido novo deve chegar com o dobro da encomenda anterior.",
        "O envio de 10 200 L resultou em 9 900 L entregues. A perda por viagem é constante.",
        "Descobre a perda real do primeiro envio e soma à entrega desejada."
      ],
      "routes": [
        {
          "title": "Perda observada",
          "text": "A perda é 10 200 − 9 900 = 300 L. A nova encomenda é 20 000 L. Envie 20 300 L.",
          "when": "É mais direta quando a diferença entre envio e entrega está visível."
        },
        {
          "title": "Equação do saldo",
          "text": "Escreve entrega = envio − 300. Exige entrega = 20 000 e isola envio. Isso dá 20 300 L, abaixo da capacidade de 30 000 L.",
          "when": "É útil quando tu quer conferir que o valor encontrado também cabe no caminhão."
        }
      ]
    },
    "enem-2025-142": {
      "title": "Velocidade de conexão",
      "key": "C",
      "level": 1,
      "skill": "dados",
      "formula": "mediana",
      "pattern": "Mediana com dados em tabela",
      "fingerprint": "6b2154f8",
      "hints": [
        "Encontra a mediana, em MB/s, das dez cidades.",
        "Há dez valores e a tabela traz valores repetidos.",
        "Localiza as posições 5 e 6 depois de ordenar, ou soma as frequências até essas posições."
      ],
      "routes": [
        {
          "title": "Ordenar os valores",
          "text": "Em ordem ficam 320, 340, 350, 360, 380, 380, 390, 390, 390, 400. A média do quinto e sexto é 380 MB/s.",
          "when": "É segura quando a lista cabe num rascunho curto."
        },
        {
          "title": "Frequências acumuladas",
          "text": "Quatro cidades têm velocidade abaixo de 380. Duas têm exatamente 380. Assim o quinto e o sexto valores já são 380 MB/s.",
          "when": "É mais rápida quando há poucos valores distintos."
        }
      ]
    },
    "enem-2025-146": {
      "title": "Marca nos 100 metros",
      "key": "B",
      "level": 1,
      "skill": "calcular",
      "formula": "unidades",
      "pattern": "Diferença decimal",
      "fingerprint": "dcbe369d",
      "hints": [
        "Compara os dois tempos e entrega a diferença em segundos.",
        "A referência é 10,00 s, e a marca é 9,58 s.",
        "Subtrai com as vírgulas alinhadas ou calcula quantos centésimos faltam para 10."
      ],
      "routes": [
        {
          "title": "Subtração decimal",
          "text": "10,00 − 9,58 = 0,42 s.",
          "when": "É a mais direta se tu alinha bem as casas decimais."
        },
        {
          "title": "Complemento em centésimos",
          "text": "De 9,58 até 9,60 faltam 2 centésimos. De 9,60 até 10,00 faltam 40. São 42 centésimos, ou 0,42 s.",
          "when": "É rápida mentalmente quando a referência é redonda."
        }
      ]
    },
    "enem-2025-150": {
      "title": "Produção de tijolos",
      "key": "D",
      "level": 2,
      "skill": "proporcao",
      "formula": "proporcao",
      "pattern": "Taxa e proporcionalidade",
      "fingerprint": "293b7a0a",
      "hints": [
        "Calcula a nova produção diária com trabalhadores e horas diferentes.",
        "Antes eram 3 × 6 horas de trabalho por dia. Agora são 5 × 9.",
        "A produção por pessoa e por hora é constante. Calcula essa taxa ou compara o total de horas."
      ],
      "routes": [
        {
          "title": "Produção unitária",
          "text": "Antes eram 18 horas-pessoa e 720 tijolos. A produtividade é 40 por hora-pessoa. Agora são 45 horas-pessoa, então 45 × 40 = 1 800.",
          "when": "É mais clara quando tu quer enxergar a unidade e a taxa."
        },
        {
          "title": "Fatores de crescimento",
          "text": "Multiplica 720 por 5/3, pela quantidade de pessoas, e por 9/6, pelas horas. O fator combinado é 45/18 = 2,5. A produção vira 1 800.",
          "when": "É mais curta se os fatores simplificam bem."
        }
      ]
    },
    "enem-2025-152": {
      "title": "Envelopes dos candidatos",
      "key": "D",
      "level": 2,
      "skill": "probabilidade",
      "formula": "probabilidade",
      "pattern": "Probabilidade sem reposição",
      "fingerprint": "13def06f",
      "hints": [
        "A chance pedida é de todos os quatro receberem o próprio celular.",
        "Cada envelope vai para uma pessoa, e a devolução é aleatória.",
        "Conta as distribuições completas ou multiplica as probabilidades condicionadas dos acertos."
      ],
      "routes": [
        {
          "title": "Contagem de permutações",
          "text": "São 4! = 24 distribuições equiprováveis. Apenas uma devolve todos corretamente. P = 1/24.",
          "when": "É mais rápida quando tu identifica que o caso favorável é único."
        },
        {
          "title": "Acertos sucessivos",
          "text": "O primeiro tem 1/4 de chance. Se acertou, o segundo tem 1/3, o terceiro 1/2 e o quarto 1. O produto dá 1/24.",
          "when": "Ajuda a enxergar por que o denominador muda a cada entrega."
        }
      ],
      "options": {
        "A": "1/2",
        "B": "1/10",
        "C": "1/16",
        "D": "1/24",
        "E": "1/256"
      }
    },
    "enem-2025-155": {
      "title": "Diretoria de três cargos",
      "key": "B",
      "level": 2,
      "skill": "probabilidade",
      "formula": "contagem",
      "pattern": "Contagem com restrições",
      "fingerprint": "59620c0f",
      "hints": [
        "Conta diretorias diferentes considerando os cargos e a restrição por casal.",
        "São 20 pessoas em dez casais, com três cargos diferentes.",
        "Cada escolha ocupa um casal e elimina as duas pessoas desse casal das próximas opções."
      ],
      "routes": [
        {
          "title": "Escolher pessoas em ordem",
          "text": "Há 20 escolhas para presidente. Depois, 18 para secretário e 16 para tesoureiro. Multiplica 20 × 18 × 16.",
          "when": "É mais direta quando tu acompanha as pessoas excluídas por etapa."
        },
        {
          "title": "Escolher casais primeiro",
          "text": "Escolhe os casais para os três cargos em 10 × 9 × 8 ordens. Cada casal contribui com uma de duas pessoas, então multiplica por 2³. O resultado é igual a 20 × 18 × 16.",
          "when": "Ajuda quando a restrição fica mais clara ao separar grupos e pessoas."
        }
      ]
    },
    "enem-2025-158": {
      "title": "Reajuste no estacionamento",
      "key": "C",
      "level": 2,
      "skill": "modelar",
      "formula": "percentual",
      "pattern": "Parcela fixa e variável",
      "fingerprint": "3ee86fe8",
      "hints": [
        "A mensalidade deve pagar as despesas e ainda gerar o lucro informado.",
        "O seguro por vaga sobe de R$ 36 em 20%. Manutenção e lucro esperado têm valores próprios.",
        "Distribui as parcelas fixas pelas 120 vagas e acrescenta o seguro individual reajustado."
      ],
      "routes": [
        {
          "title": "Contas do negócio",
          "text": "O seguro por veículo vira 36 × 1,20 = 43,20. A arrecadação precisa cobrir 14 240 + 120 × 43,20 + 10 000 = 29 424. Dividindo por 120, são R$ 245,20.",
          "when": "É útil para conferir todos os totais separadamente."
        },
        {
          "title": "Conta por vaga",
          "text": "Manutenção e lucro somam R$ 24 240, ou R$ 202 por vaga. Acrescenta o seguro de R$ 43,20 e chega a R$ 245,20.",
          "when": "É mais rápida quando todas as vagas estão ocupadas e pagam igual."
        }
      ]
    },
    "enem-2025-159": {
      "title": "Porções de sorvete",
      "key": "D",
      "level": 1,
      "skill": "unidades",
      "formula": "unidades",
      "pattern": "Conversão de volume",
      "fingerprint": "27bca84c",
      "hints": [
        "Conta quantas porções inteiras cabem no pote.",
        "O pote está em cm³ e a taça em mL.",
        "Transforma as duas medidas para a mesma unidade e divide o total por uma porção."
      ],
      "routes": [
        {
          "title": "Em mililitros",
          "text": "1 cm³ = 1 mL. Então 20 000 mL ÷ 250 mL = 80 taças.",
          "when": "É a mais rápida porque as unidades são equivalentes na proporção 1:1."
        },
        {
          "title": "Em litros",
          "text": "O pote tem 20 L, e cada porção tem 0,25 L. Cabem quatro porções em cada litro. São 20 × 4 = 80 taças.",
          "when": "É boa mentalmente quando a porção é uma fração conhecida do litro."
        }
      ],
      "edits": [
        [
          "cm3",
          "cm³"
        ]
      ]
    },
    "enem-2025-162": {
      "title": "Custo da produção de plástico",
      "key": "B",
      "level": 3,
      "skill": "modelar",
      "formula": "funcao-afim",
      "pattern": "Parcela fixa e variável",
      "fingerprint": "af5261fa",
      "hints": [
        "Procura o menor volume reciclado que reduz o custo pela metade ou mais.",
        "São 190 toneladas no total. Cada tonelada custa R$ 10 000 do petróleo ou R$ 500 reciclada.",
        "Monta o custo em função das toneladas recicladas e compara com metade do custo atual."
      ],
      "routes": [
        {
          "title": "Inequação de custo",
          "text": "O custo atual é 110 × 10 000 + 80 × 500 = 1 140 000. A meta é até 570 000. Para x recicladas, 10 000(190 − x) + 500x ≤ 570 000, de onde x ≥ 140.",
          "when": "É segura porque traduz explicitamente o mínimo e o teto de custo."
        },
        {
          "title": "Economia por troca",
          "text": "Com 80 toneladas recicladas já se gasta 1 140 000. É preciso economizar 570 000 adicionais. Trocar uma tonelada poupa 9 500. São 60 trocas, então 80 + 60 = 140 toneladas recicladas.",
          "when": "É mais rápida se tu vê que o volume total fica fixo."
        }
      ]
    },
    "enem-2025-167": {
      "title": "GNV e gasolina na viagem",
      "key": "D",
      "level": 2,
      "skill": "dados",
      "formula": "proporcao",
      "pattern": "Leitura de gráfico e taxas",
      "fingerprint": "0ad741ad",
      "hints": [
        "Compara os gastos dos dois combustíveis em reais, na velocidade dada.",
        "São 120 km com cada um. Lê a altura de cada ponto na velocidade de 60 km/h.",
        "Divide a distância pelo rendimento para obter o consumo, ou calcula o custo por quilômetro de cada combustível."
      ],
      "routes": [
        {
          "title": "Consumo de cada trecho",
          "text": "A 60 km/h, o GNV rende 10 km/m³ e a gasolina 8 km/L. O consumo é 12 m³ de GNV e 15 L de gasolina. Os gastos são R$ 24 e R$ 45. Diferença R$ 21.",
          "when": "É direto quando cada divisão produz uma quantidade inteira de combustível."
        },
        {
          "title": "Preço por quilômetro",
          "text": "O GNV custa 2/10 = R$ 0,20 por km. A gasolina custa 3/8 = R$ 0,375 por km. A diferença é 0,175 por km, que em 120 km dá R$ 21.",
          "when": "É útil para comparar custos em qualquer distância a essa velocidade."
        }
      ],
      "supplement": {
        "kind": "grafico",
        "description": "Recorte dos gráficos originais com dois pontos de cada série",
        "rows": [
          {
            "label": "GNV",
            "unit": "km/m³",
            "points": [
              [
                60,
                10
              ],
              [
                100,
                12
              ]
            ]
          },
          {
            "label": "Gasolina",
            "unit": "km/L",
            "points": [
              [
                60,
                8
              ],
              [
                100,
                11
              ]
            ]
          }
        ]
      }
    },
    "enem-2025-175": {
      "title": "Distribuição de oito presentes",
      "key": "C",
      "level": 3,
      "skill": "probabilidade",
      "formula": "combinacao",
      "pattern": "Contagem com restrições",
      "fingerprint": "35d7a442",
      "hints": [
        "Conta distribuições com exatamente um dos dois itens especiais para o mais velho.",
        "Ele recebe três presentes. Os outros dois filhos recebem dois e três, respectivamente.",
        "Escolhe primeiro os presentes do mais velho. Depois escolhe os dois do filho do meio."
      ],
      "routes": [
        {
          "title": "Contar os casos válidos",
          "text": "Há duas opções para o item especial do mais velho e C(6,2) formas de completar seus três presentes. Depois, C(5,2) escolhas para o filho do meio. Total 2 × 15 × 10 = 300.",
          "when": "É a mais curta porque a condição diz exatamente um."
        },
        {
          "title": "Retirar casos proibidos",
          "text": "Das C(8,3) = 56 escolhas do mais velho, tira C(6,3) = 20 sem itens especiais e C(6,1) = 6 com os dois. Restam 30. Multiplica por C(5,2) = 10 e obtém 300.",
          "when": "É uma conferência útil quando a restrição pode ser separada em dois casos proibidos."
        }
      ]
    },
    "enem-2025-176": {
      "title": "Percurso do jogador",
      "key": "C",
      "level": 1,
      "skill": "proporcao",
      "formula": "proporcao",
      "pattern": "Taxa e proporcionalidade",
      "fingerprint": "3330ee7a",
      "hints": [
        "Soma as distâncias percorridas desde a entrada em campo.",
        "Ele entra no segundo tempo, joga 45 min e mais 30 min. A velocidade média fica igual.",
        "A distância cresce proporcionalmente ao tempo. Acha a taxa ou compara 75 com 45 minutos."
      ],
      "routes": [
        {
          "title": "Taxa por minuto",
          "text": "A taxa média é 4,5/45 = 0,1 km/min. Durante 75 min, ele percorre 7,5 km.",
          "when": "É direta com uma taxa decimal simples."
        },
        {
          "title": "Acréscimo proporcional",
          "text": "A prorrogação tem 30/45 = 2/3 do tempo jogado antes. Ele percorre mais 2/3 de 4,5 km, ou 3 km. O total é 7,5 km.",
          "when": "É mais curta quando dá para tomar a fração da distância conhecida."
        }
      ]
    },
    "enem-2025-178": {
      "title": "Jogo de três dados",
      "key": "E",
      "level": 3,
      "skill": "probabilidade",
      "formula": "probabilidade",
      "pattern": "Probabilidade com complemento",
      "fingerprint": "b9e8708d",
      "hints": [
        "Compara as chances de vitória e lembra que empate favorece João.",
        "São 216 trincas equiprováveis de resultados. Artur usa o máximo dos seus dois dados.",
        "Fixa o resultado de João e conta quando os dois dados de Artur são menores ou iguais a ele."
      ],
      "routes": [
        {
          "title": "Contar vitórias de João",
          "text": "Se João tira j, os dois dados de Artur podem valer até j, dando j² pares. A soma 1 + 4 + 9 + 16 + 25 + 36 = 91. Artur tem 216 − 91 = 125 vitórias, probabilidade 125/216.",
          "when": "É mais rápida porque o empate entra naturalmente na contagem de João."
        },
        {
          "title": "Contar vitórias de Artur",
          "text": "Se o máximo de Artur é m, existem m² − (m − 1)² = 2m − 1 pares. João deve tirar menos de m, ou m − 1 opções. Somando (2m − 1)(m − 1) de 1 a 6, dá 125. Artur vence com 125/216.",
          "when": "É útil quando queres construir a contagem diretamente para o vencedor."
        }
      ],
      "options": {
        "A": "Artur, com probabilidade de 2/3",
        "B": "João, com probabilidade de 4/9",
        "C": "Artur, com probabilidade de 91/216",
        "D": "João, com probabilidade de 91/216",
        "E": "Artur, com probabilidade de 125/216"
      }
    },
    "enem-2025-179": {
      "title": "Unidade de luminância",
      "key": "A",
      "level": 1,
      "skill": "unidades",
      "formula": "unidades",
      "pattern": "Unidade de uma grandeza",
      "fingerprint": "fffc0287",
      "hints": [
        "Entrega só a unidade da razão descrita.",
        "A intensidade vem em cd, e a distância em m. O quadrado é da distância.",
        "Monta a razão com as unidades e deixa o metro ao quadrado no denominador."
      ],
      "routes": [
        {
          "title": "Substituição dimensional",
          "text": "A razão é intensidade ÷ distância². Trocando cada grandeza pela unidade, resulta cd/m².",
          "when": "É a mais curta quando a frase já descreve a fórmula."
        },
        {
          "title": "Unidade com expoente negativo",
          "text": "Escreve a divisão por distância² como multiplicação por distância⁻². As unidades ficam cd·m⁻², o que equivale a cd/m².",
          "when": "Ajuda a reconhecer a mesma unidade escrita de duas formas."
        }
      ],
      "options": {
        "A": "cd/m²",
        "B": "m²/cd",
        "C": "cd/m",
        "D": "m/cd",
        "E": "m/cd²"
      }
    }
  },
  "keys": {
    "2024": "https://download.inep.gov.br/enem/provas_e_gabaritos/2024_GB_impresso_D2_CD7.pdf",
    "2025": "https://download.inep.gov.br/enem/provas_e_gabaritos/2025_GB_impresso_D2_CD7.pdf"
  }
};
