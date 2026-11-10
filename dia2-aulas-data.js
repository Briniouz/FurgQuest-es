'use strict';

// Aulas, exemplos e verificações autorais. Os IDs das fichas são do guia do Dia 2.
globalThis.FURG_DIA2_LESSONS = {
 matematica: [
  {
   id:'fracoes', title:'Frações, decimais e unidades', card:'unidades',
   lead:'Meia garrafa, 0,5 litro e 500 mL podem descrever a mesma quantidade. Aprende a trocar de representação sem trocar de quantidade.',
   parts:[
    ['Divide o inteiro', 'Em 3/4, o denominador diz que o inteiro foi dividido em quatro partes iguais. O numerador conta três dessas partes. Multiplicar os dois números da fração pelo mesmo valor preserva a proporção: 3/4 = 75/100.'],
    ['Muda a forma de ler', 'Divide 3 por 4 e encontras 0,75. Em cada 100 partes, isso corresponde a 75, ou 75%. Para somar frações, coloca as partes no mesmo tamanho: 1/2 + 1/4 = 2/4 + 1/4.'],
    ['Confere a unidade', '1 L vale 1 000 mL e 1 kg vale 1 000 g. Um quadrado de 1 m de lado tem 100 cm em cada direção, por isso 1 m² vale 10 000 cm². Em volume, o fator de comprimento entra três vezes.']
   ],
   example:['Uma garrafa tem capacidade de 1,2 L e está preenchida até 3/4. Quantos mL há nela?', 'Transforma a capacidade em 1 200 mL.', 'Divide 1 200 por 4. Cada quarto vale 300 mL.', 'Multiplica por 3. Há 900 mL.'],
   exam:'Em receitas, rótulos e escalas, coloca as quantidades na mesma unidade antes de comparar.',
   check:{prompt:'Quanto vale 0,25 m² em cm²?',correct:1,choices:[['25 cm²','O fator 100 vale para um comprimento. Aqui a unidade mede área.'],['2 500 cm²','Como 1 m² = 10 000 cm², um quarto corresponde a 2 500 cm².'],['250 cm²','O fator para a área é 100 × 100. Multiplica 0,25 por 10 000.']]}
  },
  {
   id:'proporcao', title:'Razão, proporção e escala', card:'escala',
   lead:'Uma escala diz quantas vezes a distância do desenho cabe na distância real. A mesma ideia aparece em receitas e preços por quilo.',
   parts:[
    ['Razão é comparação', 'Ao dividir 180 km por 3 horas, encontras 60 km/h. O resultado descreve quanto corresponde a uma unidade. Uma razão pode carregar unidade, como reais por kg.'],
    ['Direta ou inversa?', 'Se o preço por kg é fixo, dobrar a massa dobra o preço. Se a distância é fixa e a rapidez é constante, dobrar a rapidez reduz o tempo à metade. Identifica o que fica fixo antes de usar a regra de três.'],
    ['Lê a escala do desenho', 'Na escala 1:50 000, 1 cm no mapa equivale a 50 000 cm no terreno. A razão compara comprimentos. Se o pedido for área, cada direção tem seu próprio fator de ampliação.']
   ],
   example:['Duas localidades estão a 4 cm num mapa de escala 1:50 000. Qual é a distância representada?', 'Cada centímetro equivale a 50 000 cm, ou 500 m.', 'Multiplica 4 por 500 m. São 2 000 m.', 'Expressa na unidade do pedido. 2 000 m = 2 km.'],
   exam:'Em um mapa, separa distância em linha reta de comprimento real de um trajeto. Usa o segmento indicado.',
   check:{prompt:'Para uma mesma distância, a rapidez passa de 40 para 80 km/h. O que ocorre com o tempo?',correct:2,choices:[['Dobra','Se o tempo dobrasse junto, a distância percorrida quadruplicaria.'],['Fica igual','Com a mesma duração, dobrar a rapidez dobraria a distância.'],['Cai pela metade','Em distância fixa, v × t é constante. Dobrar v exige dividir t por 2.']]}
  },
  {
   id:'porcentagens', title:'Porcentagens e juros', card:'percentual', lab:'desconto',
   lead:'Antes de calcular uma porcentagem, acha a quantidade que vale 100%. Ela pode mudar no meio do problema.',
   parts:[
    ['Parte de um todo', '20% de 150 é 20/100 × 150 = 30. Para descobrir que percentual 30 representa de 150, divide 30 por 150 e multiplica por 100.'],
    ['Aumento e desconto', 'Desconto de 20% mantém 80% do preço. O fator é 0,80. Aumento de 20% usa o fator 1,20. Em mudanças sucessivas, aplica cada fator ao valor que acabou de obter.'],
    ['Juros sobre qual valor?', 'Com juros simples, o acréscimo de cada período usa o valor inicial. Com juros compostos, cada período aplica o fator sobre o saldo atualizado. Confere se a taxa e o tempo usam o mesmo período.']
   ],
   example:['Um produto de R$ 200 recebe desconto de 20% e depois aumento de 10% sobre o novo preço.', 'Após o desconto, 200 × 0,80 = 160 reais.', 'O aumento é 10% de R$ 160. Multiplica 160 × 1,10 = 176.', 'A diferença em relação aos R$ 200 é R$ 24, ou 12% de desconto total.'],
   exam:'Se a taxa vai de 20% a 30%, houve aumento de 10 pontos percentuais e aumento relativo de 50% sobre a taxa original.',
   check:{prompt:'R$ 100 aumentam 10% e depois recebem 10% de desconto. Qual é o preço final?',correct:0,choices:[['R$ 99','O aumento leva a R$ 110. O desconto é R$ 11 porque a base agora é R$ 110.'],['R$ 100','A segunda porcentagem usa uma base maior. Os valores absolutos dos dois ajustes são diferentes.'],['R$ 110','R$ 110 é o preço antes da segunda etapa. Ainda é preciso multiplicar por 0,90.']]}
  },
  {
   id:'equacoes', title:'Equações e funções de primeiro grau', card:'funcao-afim',
   lead:'Quando uma corrida cobra uma bandeirada e um preço por quilômetro, uma expressão curta reúne as duas cobranças.',
   parts:[
    ['Transforma a frase em expressão', 'Escolhe uma letra para a incógnita. Se x é o número de quilômetros, uma taxa fixa de R$ 6 mais R$ 2 por quilômetro dá C(x) = 6 + 2x. Cada termo precisa estar na mesma unidade, reais.'],
    ['Resolve sem desequilibrar', 'Uma equação afirma que os dois lados têm o mesmo valor. Se C(x) = 26, subtrai 6 dos dois lados e depois divide os dois lados por 2. Substitui a resposta para conferir.'],
    ['Entende a reta', 'Em y = ax + b, b é o valor para x = 0. A inclinação a mede quanto y varia por unidade de x. Dois pontos distintos bastam para obter a por meio de Δy/Δx.']
   ],
   example:['O plano A custa R$ 12 mais R$ 3 por uso. O B custa R$ 24 mais R$ 1 por uso.', 'Chama o número de usos de x. Na igualdade, 12 + 3x = 24 + x.', 'Subtrai x e 12 dos lados. Fica 2x = 12, então x = 6.', 'Em 6 usos, ambos custam R$ 30. A partir de 7, B cresce mais devagar e fica mais barato.'],
   exam:'Em gráficos de tarifa e consumo, lê o custo inicial no eixo vertical e a taxa de variação pela inclinação.',
   check:{prompt:'Uma conta segue C(x) = 15 + 4x. Se x aumentar de 2 para 5, quanto a conta sobe?',correct:1,choices:[['R$ 4','O 4 é a variação por uma unidade. A mudança de x foi de três unidades.'],['R$ 12','O custo fixo aparece nos dois valores e cancela na diferença. Sobram 3 × R$ 4.'],['R$ 35','Esse é o custo total para x = 5. A pergunta pede a diferença entre os dois custos.']]}
  },
  {
   id:'crescimento', title:'Sequências, crescimento e parábolas', card:'pg',
   lead:'Observa como uma quantidade muda. Somar sempre o mesmo número cria um padrão diferente de multiplicar pelo mesmo fator.',
   parts:[
    ['Diferença constante', 'A sequência 10, 13, 16, 19 cresce de 3 em 3. É uma progressão aritmética (PA). Após n passos a partir de 10, o valor é 10 + 3n. Cuidado para distinguir a etapa inicial do primeiro passo.'],
    ['Fator constante', 'A sequência 10, 20, 40, 80 dobra a cada etapa. É uma progressão geométrica (PG) de razão 2. Após n passos a partir de 10, o valor é 10 × 2ⁿ. Quando o enunciado pede a etapa, conta as multiplicações.'],
    ['Quando há um máximo', 'Uma função do tipo ax² + bx + c desenha uma parábola. Se a for negativo, ela se abre para baixo e o vértice é o ponto mais alto. O x desse ponto é −b/(2a). Respeita o domínio indicado no problema.']
   ],
   example:['Uma cultura tem inicialmente 200 indivíduos. No modelo, a população dobra a cada duas horas.', 'Em seis horas passam 6/2 = 3 períodos.', 'Aplica o fator 2 três vezes. 200 × 2³ = 1 600.', 'A soma fixa de 200 a cada período daria outro modelo.'],
   exam:'Ao comparar modelos, verifica se o enunciado fala em acréscimo de uma quantidade ou aumento de uma porcentagem constante.',
   check:{prompt:'A altura de uma bola é h(t) = −5t² + 20t, com t em segundos. Em que instante ela atinge o ponto mais alto?',correct:2,choices:[['0 s','Em t = 0, a bola está no início da trajetória, com altura zero.'],['4 s','Em 4 s, a função volta a dar altura zero. O máximo fica entre os dois zeros.'],['2 s','A parábola tem máximo no vértice. −20/(2 × −5) = 2 s.']]}
  },
  {
   id:'geometria-plana', title:'Geometria plana e triângulos', card:'areas',
   lead:'Uma cerca acompanha o contorno. Uma pintura cobre uma superfície. Descobrir o que vai ser medido já escolhe metade do caminho.',
   parts:[
    ['Contorno e superfície', 'Perímetro é comprimento da borda. Área é medida da superfície. Para um retângulo, P = 2(b + h) e A = b × h. Um triângulo de mesma base e mesma altura tem metade dessa área.'],
    ['A altura é perpendicular', 'Em um triângulo retângulo, a hipotenusa fica diante do ângulo de 90°. O teorema de Pitágoras relaciona seus lados: hipotenusa² = cateto₁² + cateto₂². Seno, cosseno e tangente comparam lados em relação ao ângulo escolhido.'],
    ['Recorta ou completa', 'Se o contorno tem formato irregular, divide a figura em partes conhecidas ou completa um retângulo e subtrai o recorte. No círculo, área é πr² e contorno é 2πr. Confere se a medida dada é raio ou diâmetro.']
   ],
   example:['Um terreno retangular mede 12 m por 8 m. Um canteiro triangular ocupa um canto, com base de 6 m e altura perpendicular de 4 m.', 'Área do terreno: 12 × 8 = 96 m².', 'Área do canteiro: 6 × 4 ÷ 2 = 12 m².', 'A área restante é 96 − 12 = 84 m².'],
   exam:'Se a figura for uma vista inclinada, procura a altura perpendicular marcada. O lado inclinado pode ter outro comprimento.',
   check:{prompt:'Os catetos de um triângulo retângulo medem 6 m e 8 m. Quanto mede a hipotenusa?',correct:0,choices:[['10 m','6² + 8² = 36 + 64 = 100. A raiz quadrada de 100 é 10.'],['14 m','A relação usa os quadrados dos lados. Somar os catetos daria o comprimento dos dois trechos percorridos.'],['100 m','O resultado 100 é o quadrado da hipotenusa, em m². Extrai a raiz para voltar a metros.']]}
  },
  {
   id:'volumes', title:'Volumes e capacidade', card:'volumes', lab:'solidos',
   lead:'Imagina empilhar fatias de mesma área. Esse raciocínio ajuda a ver por que volume de caixa e volume de cilindro usam área da base vezes altura.',
   parts:[
    ['Identifica a base e a altura', 'A base de um cubo de lado a mede a², e a altura mede a, então V = a³. Para o cilindro, a base é um círculo: V = πr²h. A altura é perpendicular à base.'],
    ['Cone e pirâmide', 'Um cone tem um terço do volume do cilindro de mesma base e altura. Uma pirâmide tem um terço do volume do prisma correspondente. Se o diâmetro for dado, divide por dois para achar o raio.'],
    ['Soma ou subtrai o que o comando pede', 'Para calcular o sólido restante, subtrai os volumes das cavidades efetivamente retiradas. Se o pedido for capacidade, calcula o espaço interno. Para converter, 1 dm³ = 1 L e 1 cm³ = 1 mL.']
   ],
   example:['Num cubo de lado 4 cm é retirada uma cavidade cônica de raio 2 cm e altura 4 cm. Usa π = 3.', 'Cubo: 4 × 4 × 4 = 64 cm³.', 'Cone: 3 × 2² × 4 ÷ 3 = 16 cm³.', 'A cavidade é a única retirada. Restam 64 − 16 = 48 cm³.'],
   exam:'Marca o que é material e o que é vazio no desenho. Uma peça pode ter medidas repetidas que pertencem a regiões diferentes.',
   check:{prompt:'Um cone e um cilindro têm o mesmo raio e a mesma altura. O cilindro tem 90 cm³. Qual é o volume do cone?',correct:1,choices:[['90 cm³','A área da base e a altura coincidem, mas as fatias do cone diminuem em direção ao vértice.'],['30 cm³','O cone tem um terço de πr²h. Então 90 ÷ 3 = 30 cm³.'],['270 cm³','Multiplicar por três serve para ir do volume do cone ao do cilindro correspondente.']]}
  },
  {
   id:'estatistica', title:'Estatística e leitura de gráficos', card:'mediana',
   lead:'Um único número resume uma lista, mas cada resumo responde a uma pergunta diferente.',
   parts:[
    ['Lê o gráfico antes da conta', 'Confere o título, as unidades, a legenda e onde começa a escala. O tamanho visual de uma barra pode exagerar uma diferença quando o eixo começa acima de zero. Usa os valores do eixo para comparar.'],
    ['Média e mediana', 'A média distribui a soma igualmente pelos dados. A mediana é o centro da lista ordenada. Com quantidade par de dados, faz a média dos dois centrais. Valores extremos podem mudar bastante a média e pouco a mediana.'],
    ['Pesos e frequência', 'Se uma nota vale peso 2, ela entra duas vezes no total ponderado. Multiplica cada valor pelo peso, soma e divide pela soma dos pesos. Em tabelas de frequência, a quantidade de ocorrências faz esse papel.']
   ],
   example:['Quatro tempos de viagem foram 20, 25, 25 e 90 min. Qual medida descreve melhor um tempo típico desses quatro dias?', 'Média = (20 + 25 + 25 + 90) ÷ 4 = 40 min.', 'Mediana = (25 + 25) ÷ 2 = 25 min.', 'Se o interesse é o centro da lista com menor influência do dia atípico, usa 25 min.'],
   exam:'Decide se a comparação pede valor total, taxa por pessoa ou proporção do grupo. Os três podem ordenar os dados de formas diferentes.',
   check:{prompt:'Qual é a média de 7 com peso 2 e 4 com peso 1?',correct:2,choices:[['5,5','Essa média dá o mesmo peso às duas notas. O 7 conta duas vezes.'],['9','Dividir 18 por 2 usa o número de notas. O denominador correto é a soma dos pesos, 3.'],['6','O total ponderado é 7 × 2 + 4 × 1 = 18. A soma dos pesos é 3.']]}
  },
  {
   id:'probabilidade', title:'Contagem e probabilidade', card:'probabilidade',
   lead:'Antes de usar uma fórmula, lista o que pode acontecer e decide quando duas situações representam o mesmo resultado.',
   parts:[
    ['Conta pelas etapas', 'Se tens três camisetas e duas calças, cada camiseta pode combinar com duas calças. Há 3 × 2 = 6 combinações. Se a ordem importa, os resultados A–B e B–A são diferentes.'],
    ['Possíveis e favoráveis', 'Com resultados igualmente prováveis, P = casos favoráveis ÷ casos possíveis. Com cartas ou objetos retirados sem devolução, o total e o número de favoráveis podem mudar na segunda retirada.'],
    ['Usa o complemento quando ajuda', 'Para calcular “pelo menos um”, pode ser mais rápido calcular a chance de nenhum e subtrair de 1. Confere as condições de independência. Se o problema já informa uma característica, restringe o grupo antes de dividir.']
   ],
   example:['Uma caixa tem 3 fichas verdes e 2 azuis. Duas serão retiradas ao acaso, sem devolução. Qual é a chance de ambas serem verdes?', 'Primeira verde: 3/5.', 'Com uma verde retirada, restam duas verdes entre quatro fichas. A chance condicional é 2/4.', 'Para as duas etapas acontecerem, multiplica 3/5 × 2/4 = 3/10, ou 30%.'],
   exam:'Distingue “com reposição”, “sem reposição”, “pelo menos” e “sabendo que”. Essas expressões mudam quais casos entram na conta.',
   check:{prompt:'Qual é a chance de sair pelo menos uma cara em dois lançamentos independentes de uma moeda justa?',correct:0,choices:[['3/4','O único caso sem cara é coroa–coroa, de chance 1/4. O complemento é 3/4.'],['1/2','Essa é a chance de cara em um só lançamento. Aqui basta uma cara em qualquer um dos dois.'],['1/4','Essa é a chance de duas caras, ou de duas coroas. O pedido inclui todos os resultados com uma ou duas caras.']]}
  }
 ],
 fisica: [
  {
   id:'movimento', title:'Movimento, medidas e gráficos', card:'graficos',
   lead:'Dizer “andou 200 metros” e dizer “terminou no ponto de partida” pode descrever o mesmo passeio.',
   parts:[
    ['Referência e sentido', 'Escolhe uma origem e um sentido positivo. Deslocamento é posição final menos posição inicial, com sinal. Distância percorrida soma o comprimento de todos os trechos. A rapidez média usa a distância total e o tempo total.'],
    ['Velocidade e aceleração', 'Velocidade média em uma reta usa deslocamento dividido pelo tempo. Para passar de km/h a m/s, divide por 3,6. Aceleração média é variação de velocidade dividida pelo tempo. Uma aceleração negativa reduz a rapidez se a velocidade é positiva e aumenta se é negativa.'],
    ['Traduz o gráfico', 'Num gráfico de posição por tempo, a inclinação dá a velocidade. Num gráfico de velocidade por tempo, a inclinação dá a aceleração e a área com sinal dá o deslocamento. Se a linha cruza o eixo, trechos abaixo dele contribuem negativamente para o deslocamento.']
   ],
   example:['Uma bicicleta parte de 2 m/s e chega a 8 m/s em 3 s, com aceleração constante.', 'A velocidade aumenta 6 m/s em 3 s. A aceleração é 2 m/s².', 'No gráfico v × t, a área é a de um trapézio. A velocidade média nesse trecho é (2 + 8)/2 = 5 m/s.', 'Multiplica por 3 s. O deslocamento foi 15 m.'],
   exam:'Lê os nomes dos eixos primeiro. Inclinação e área respondem a perguntas diferentes conforme as variáveis do gráfico.',
   check:{prompt:'Um carro anda 60 m, volta 60 m e leva 30 s ao todo. Qual é a rapidez média?',correct:2,choices:[['0 m/s','O deslocamento é zero. A rapidez média usa a distância percorrida, que foi 120 m.'],['2 m/s','Usaste só um dos dois trechos. O tempo corresponde à ida e à volta juntas.'],['4 m/s','A distância soma os dois trechos: 120 m. Divide por 30 s.']]}
  },
  {
   id:'energia', title:'Energia e transformações', card:'energia', lab:'rampa',
   lead:'Uma pilha acende uma lanterna. Uma bicicleta ganha velocidade na descida. Nos dois casos dá pra perguntar de onde veio a energia e para onde ela foi.',
   parts:[
    ['A ideia antes da fórmula', 'Energia é uma grandeza que ajuda a descrever as mudanças possíveis em um sistema. Medimos energia em joules (J). Ela pode estar associada ao movimento, à posição, à temperatura, às ligações químicas ou ao núcleo dos átomos. Luz e som podem transportar energia.'],
    ['Segue a transformação', 'Na lanterna, processos químicos na pilha fornecem energia ao circuito. Na lâmpada, parte vira luz e parte aquece o aparelho. Quando dizemos que a pilha “perdeu” energia, estamos olhando a pilha isoladamente. Ao contar o que foi transferido ao ambiente, a energia total se conserva.'],
    ['Uma conta de altura e movimento', 'Perto da superfície da Terra, Eₚ = mgh, com massa m em kg, altura h em m e g em m/s². A energia cinética é E꜀ = mv²/2. Numa descida sem atrito, Eₚ diminui e E꜀ aumenta na mesma medida. Com atrito, parte da energia mecânica é transferida para energia interna dos materiais.']
   ],
   example:['Um carrinho de 2 kg é solto do repouso a 10 m de altura. Considera g = 10 m/s², o chão como referência e ignora atrito e rotação das rodas.', 'No alto, Eₚ = 2 × 10 × 10 = 200 J. Como está parado, E꜀ = 0.', 'A 6 m de altura, ainda tem 2 × 10 × 6 = 120 J de energia potencial.', 'A diferença virou energia cinética: 200 − 120 = 80 J.'],
   exam:'Identifica o sistema e marca o que muda entre início e fim. Se houver atrito, procura a transformação em energia térmica antes de igualar as energias mecânicas.',
   check:{prompt:'Uma lanterna ligada aquece e ilumina. Onde aparece a energia fornecida pela pilha?',correct:1,choices:[['Apenas na luz','A luz é a saída desejada, mas o aquecimento também recebe parte da energia.'],['Na luz e no aquecimento','A pilha fornece energia ao circuito, que transfere energia ao ambiente por luz e aquecimento.'],['Parte desaparece','A energia que sai da pilha é transferida ou transformada. O calor recebido pelo ambiente entra no balanço.']]}
  },
  {
   id:'forcas', title:'Forças, trabalho e equilíbrio', card:'trabalho',
   lead:'Se uma caixa se move com velocidade constante enquanto é empurrada, dá pra descobrir algo sobre as forças mesmo sem medir nenhuma delas.',
   parts:[
    ['Desenha cada força', 'Peso aponta para baixo. A normal é a força perpendicular da superfície. O atrito se opõe ao deslizamento relativo ou à sua tendência no contato. Coloca as setas no corpo analisado e soma as componentes.'],
    ['Resultante e aceleração', 'A segunda lei de Newton liga força resultante e aceleração: Fᵣ = ma. Se a velocidade vetorial é constante, a resultante é zero. Isso permite achar uma força desconhecida. Em objetos que podem girar, verifica também se os efeitos de giro se equilibram.'],
    ['Trabalho de uma força', 'Na direção do movimento, trabalho vale força × deslocamento. Se a força aponta em sentido contrário, o trabalho é negativo. Se é perpendicular, o trabalho é zero. O trabalho da resultante é a variação da energia cinética.']
   ],
   example:['Empurras uma caixa 5 m para a direita com 40 N. O atrito vale 40 N para a esquerda, e ela segue com velocidade constante.', 'Teu empurrão realiza +40 × 5 = +200 J.', 'O atrito realiza −40 × 5 = −200 J. Peso e normal são perpendiculares ao deslocamento.', 'O trabalho resultante é zero e a energia cinética fica constante.'],
   exam:'Quando aparecer alavanca, compara a força e sua distância perpendicular ao eixo. Uma força pequena pode equilibrar uma maior se seu braço for maior.',
   check:{prompt:'Num deslocamento horizontal, qual é o trabalho do peso sobre a caixa?',correct:0,choices:[['Zero','O peso é vertical, perpendicular ao deslocamento horizontal.'],['Positivo','Ser uma força que atua na caixa é insuficiente. Precisa haver componente na direção do deslocamento.'],['Negativo','O peso aponta para baixo, e a caixa não desce. O ângulo com o deslocamento é de 90°.']]}
  },
  {
   id:'fluidos', title:'Densidade, pressão e empuxo', card:'hidrostatica',
   lead:'A água empurra as paredes de um recipiente e também exerce força para cima sobre o que está mergulhado.',
   parts:[
    ['Densidade e pressão', 'Densidade é massa por volume: ρ = m/V. Pressão é força perpendicular dividida pela área de contato: p = F/A. A mesma força faz mais pressão em área menor.'],
    ['Mergulha mais fundo', 'Em líquido parado de densidade uniforme, o acréscimo de pressão em relação à superfície é ρgh, com h medido verticalmente. O formato do recipiente não aparece na expressão. Para pressão absoluta, soma a pressão na superfície.'],
    ['Por que algo flutua', 'A face inferior mergulhada recebe pressão maior que a face superior. O empuxo tem intensidade igual ao peso do fluido deslocado. Se o corpo flutua parado sem apoio, empuxo e peso se equilibram. Considera a densidade média do objeto inteiro, inclusive espaços com ar.']
   ],
   example:['Num reservatório, compara dois pontos a 1 m e 3 m abaixo da superfície. Considera ρ = 1 000 kg/m³ e g = 10 m/s².', 'A diferença de profundidade é 2 m.', 'Δp = 1 000 × 10 × 2 = 20 000 Pa.', 'As pressões compartilham a mesma referência na superfície, que cancela na diferença.'],
   exam:'Em vasos comunicantes, compara pontos no mesmo nível do mesmo fluido em repouso. Em flutuação, compara peso e empuxo.',
   check:{prompt:'Dois reservatórios com a mesma água estão abertos. A pressão a 2 m de profundidade depende da largura do reservatório?',correct:1,choices:[['Sim, aumenta no mais largo','A área altera a força total sobre uma tampa, mas a pressão a uma profundidade dada é a mesma.'],['Não, é a mesma','Densidade, profundidade, gravidade e pressão na superfície coincidem nos dois reservatórios.'],['Sim, aumenta no mais estreito','A pressão hidrostática não depende de quanta água cabe ao lado do ponto. A altura da coluna é o que entra na conta.']]}
  },
  {
   id:'calor', title:'Temperatura, calor e mudanças de fase', card:'calorimetria',
   lead:'Uma colher de metal pode parecer mais fria que uma de madeira mesmo quando as duas estão à mesma temperatura.',
   parts:[
    ['Temperatura e transferência', 'Temperatura descreve o estado térmico. Calor é energia transferida por diferença de temperatura. O metal conduz energia mais rapidamente para fora da mão, o que muda a sensação ao toque.'],
    ['Quanto aquece?', 'Sem mudança de fase, Q = mcΔT. A massa m, o calor específico c e a variação de temperatura ΔT determinam a energia necessária. Na mudança de fase de uma substância pura a pressão constante, pode haver troca de energia sem mudança de temperatura. Nesse trecho, Q = mL.'],
    ['Por onde passa?', 'Na condução, a energia passa pelo contato dentro do material ou entre materiais. Na convecção, o próprio fluido se move e transporta energia. Na radiação, ondas eletromagnéticas podem levar energia mesmo no vácuo.']
   ],
   example:['Um aquecedor transfere energia a 0,5 kg de água, de 20 °C a 30 °C. Usa c = 4 200 J/(kg·°C) e ignora perdas.', 'A variação é 30 − 20 = 10 °C.', 'Q = 0,5 × 4 200 × 10 = 21 000 J.', 'Se houvesse evaporação relevante, o balanço teria outra parcela de energia.'],
   exam:'Num gráfico de aquecimento de substância pura, um patamar pode indicar mudança de fase. Inclinações e patamares descrevem etapas diferentes.',
   check:{prompt:'Qual processo traz energia do Sol até a Terra através do espaço?',correct:2,choices:[['Condução','Condução precisa de matéria ao longo do caminho. Ela não atravessa o vácuo do espaço.'],['Convecção','Convecção envolve movimento de um fluido. Ela pode ocorrer na atmosfera, mas não transporta energia através do vácuo.'],['Radiação','A luz e outras ondas eletromagnéticas transportam energia pelo vácuo.']]}
  },
  {
   id:'ondas', title:'Ondas, som e luz', card:'ondas',
   lead:'Ondas permitem que a energia chegue longe. A água que balança quando passa uma onda não precisa viajar com a crista.',
   parts:[
    ['Nomeia o que se repete', 'Frequência f é o número de oscilações por segundo, em hertz. Comprimento de onda λ é a distância entre pontos equivalentes de ciclos consecutivos. A velocidade da onda é v = λf.'],
    ['Som e luz', 'Som é uma onda mecânica. Precisa de um meio como ar, água ou sólido. Frequência mais alta está ligada a som mais agudo. Luz é eletromagnética e pode viajar no vácuo.'],
    ['Interage com o caminho', 'Reflexão é o retorno ao mesmo meio, como no eco. Na refração, a onda passa de um meio a outro e muda de velocidade. Para uma interface parada, a frequência se mantém e o comprimento de onda se ajusta. Lentes usam a refração para desviar raios.']
   ],
   example:['Uma onda na água tem frequência de 5 Hz e comprimento de 0,4 m.', 'Ela repete 5 ciclos por segundo, cada um com 0,4 m.', 'A propagação avança 5 × 0,4 = 2 m em um segundo.', 'A velocidade é 2 m/s.'],
   exam:'Em questão de óptica, identifica se o raio voltou ao mesmo meio ou atravessou a interface. Em ondas, vê qual grandeza a fonte mantém.',
   check:{prompt:'Um raio de luz entra em um meio em que sua velocidade diminui. O que ocorre com a frequência e o comprimento de onda?',correct:0,choices:[['A frequência se mantém e o comprimento diminui','Com f constante e v menor, λ = v/f também diminui.'],['A frequência diminui e o comprimento fica igual','Na passagem pela interface parada, a frequência é mantida. O comprimento é que muda.'],['Os dois aumentam','A velocidade diminuiu, e o número de oscilações por segundo é mantido pela fonte.']]}
  },
  {
   id:'circuitos', title:'Corrente, tensão e circuitos', card:'resistores',
   lead:'Pensa em cada ramo de um circuito como um caminho possível para a corrente. O desenho diz o que os componentes compartilham.',
   parts:[
    ['Três grandezas', 'Corrente I é a taxa de passagem de carga, em ampères. Tensão U é energia transferida por carga, em volts. Resistência R mede a oposição à passagem da corrente. Para resistor ôhmico sob condições fixas, U = RI.'],
    ['Componentes em série', 'Se existe um só caminho, a mesma corrente atravessa os componentes em série. As resistências se somam, e a tensão da fonte se distribui pelos resistores. Se um deles abre o circuito, o caminho é interrompido.'],
    ['Componentes em paralelo', 'Ramos ligados entre os mesmos dois pontos têm a mesma tensão. A corrente total é a soma das correntes dos ramos. Acrescentar um caminho em paralelo reduz a resistência equivalente. Em uma fonte ideal, isso aumenta a corrente total.']
   ],
   example:['Dois resistores, 3 Ω e 6 Ω, estão em paralelo numa fonte ideal de 12 V.', 'Cada ramo recebe 12 V.', 'No primeiro ramo, I = 12/3 = 4 A. No segundo, I = 12/6 = 2 A.', 'A fonte fornece 6 A e a resistência equivalente é 12/6 = 2 Ω.'],
   exam:'Em esquemas com fios dobrados, segue os nós. Componentes estão em paralelo quando os dois terminais ligam aos mesmos pares de nós.',
   check:{prompt:'Duas lâmpadas idênticas estão em série. Se uma é retirada e deixa o circuito aberto, o que ocorre com a outra?',correct:1,choices:[['Fica mais forte','A retirada abriu o caminho. Sem corrente no circuito, a lâmpada restante não acende.'],['Apaga','Em série há um só caminho. A interrupção em qualquer ponto impede a passagem de corrente.'],['Mantém o brilho','Esse comportamento pode ocorrer em ramos independentes em paralelo. Aqui as lâmpadas estavam no mesmo caminho.']]}
  },
  {
   id:'consumo', title:'Potência, consumo e rendimento', card:'potencia-eletrica',
   lead:'A potência do aparelho diz quão rápido ele usa energia. A conta de luz depende também de quanto tempo ele fica ligado.',
   parts:[
    ['Energia por tempo', 'Potência média é energia transferida dividida pelo tempo. Um watt vale 1 J/s. Em um circuito de corrente contínua com tensão e corrente constantes, potência elétrica é U × I.'],
    ['Lê a conta de energia', 'Para obter kWh, escreve a potência em kW e multiplica o tempo em horas. 1 kWh vale 3,6 milhões de joules. Tarifa em reais por kWh multiplicada pelo consumo dá a parte da conta correspondente à energia.'],
    ['O que foi aproveitado?', 'Rendimento é energia útil dividida pela energia de entrada. Se comparamos potências médias no mesmo intervalo, vale a mesma razão. Aquecimento indesejado e atrito costumam reduzir a fração aproveitada.']
   ],
   example:['Um aparelho de 1 200 W funciona por 30 minutos todos os dias durante 20 dias.', '1 200 W = 1,2 kW. Meia hora por 20 dias dá 10 h.', 'Consumo = 1,2 × 10 = 12 kWh.', 'Se o preço considerado é R$ 0,80/kWh, essa energia custa R$ 9,60.'],
   exam:'Para comparar aparelhos, calcula potência × tempo de uso no mesmo período. Olhar apenas a potência pode inverter a resposta.',
   check:{prompt:'Um motor recebe 500 J e entrega 350 J de trabalho útil. Qual é seu rendimento?',correct:2,choices:[['30%','150 J de 500 J é a fração que deixou de ser aproveitada. O pedido é a fração útil.'],['70 J','Rendimento é uma razão entre energias. As unidades em joules se cancelam.'],['70%','Divide a saída útil pela entrada: 350/500 = 0,70.']]}
  },
  {
   id:'colisoes', title:'Impulso, colisões e segurança', card:'impulso',
   lead:'Um airbag aumenta o tempo em que a pessoa desacelera. É uma maneira de reduzir a força média para a mesma mudança de movimento.',
   parts:[
    ['Movimento com sentido', 'Quantidade de movimento é p = mv. Ela tem o sentido da velocidade. Escolhe o sinal positivo antes de comparar um corpo que vai e volta. Energia cinética usa v² e é sempre não negativa.'],
    ['Impulso muda p', 'Impulso da força resultante é Δp. Para achar a força média, divide essa mudança pelo intervalo de tempo. A mesma mudança em um intervalo maior exige um módulo médio menor.'],
    ['Escolhe o sistema', 'Durante uma colisão, a quantidade de movimento total se conserva se o impulso externo resultante sobre o sistema é desprezível. A energia cinética pode diminuir e virar deformação, energia interna ou som.']
   ],
   example:['Uma bola de 0,2 kg bate a 10 m/s e volta a 5 m/s. O contato dura 0,1 s.', 'Escolhe positivo na ida. A velocidade final é −5 m/s.', 'Δp = 0,2 × (−5 − 10) = −3 kg·m/s.', 'A força resultante média é −30 N, ou 30 N no sentido contrário à ida.'],
   exam:'Em questões de cinto, airbag e áreas deformáveis, compara a duração da desaceleração para a mesma mudança de quantidade de movimento.',
   check:{prompt:'Se o tempo de parada dobra para a mesma variação de quantidade de movimento, o que acontece com o módulo da força média?',correct:0,choices:[['Cai à metade','Fₘ = Δp/Δt. O numerador é o mesmo e o denominador dobra.'],['Dobra','A força média é inversamente proporcional ao tempo quando o impulso é fixo.'],['Fica igual','A variação de p fica igual. A força média diminui porque age por mais tempo.']]}
  }
 ],
 quimica: [
  {
   id:'materia', title:'Matéria, misturas e separação', card:'misturas',
   lead:'Água com sal pode parecer uma coisa só. Mesmo assim, dá pra recuperar a água e o sal aproveitando propriedades diferentes.',
   parts:[
    ['Substância, mistura e fase', 'Uma substância pura tem composição definida. Uma mistura reúne substâncias em proporções variáveis. Fase é uma porção uniforme visível do sistema. Água com sal dissolvido tem uma fase. Água líquida e gelo, sem outras substâncias, têm duas fases da mesma substância.'],
    ['O que diferencia as partes?', 'Na filtração, o filtro retém partículas insolúveis maiores que seus poros. Na decantação, fases se separam pela diferença de densidade. Na destilação, um componente vaporiza e depois condensa. Em cada caso, identifica a propriedade que permite a separação.'],
    ['Mudança física ou química', 'Derreter, evaporar e separar componentes podem preservar a identidade das substâncias. Uma transformação química produz outras substâncias. Cor, bolhas ou variação de temperatura são pistas, mas é preciso considerar o que ocorreu no contexto.']
   ],
   example:['Uma amostra tem areia, sal dissolvido e água. Queremos recuperar os três materiais separadamente.', 'Filtra a amostra para reter a areia. Água e sal passam pelo filtro.', 'Destila o líquido filtrado. Recolhe a água que vaporiza e condensa.', 'O sal permanece como resíduo no recipiente da destilação.'],
   exam:'Em fluxogramas de tratamento, olha o que precisa sair em cada etapa. Uma técnica que retém areia deixa passar substâncias dissolvidas.',
   check:{prompt:'Qual método recupera a água líquida de uma solução de água e sal?',correct:1,choices:[['Filtração comum','O sal dissolvido passa pelos poros junto com a água.'],['Destilação simples','A água é vaporizada e o vapor é resfriado para recolher o líquido. O sal fica no recipiente.'],['Decantação','Na solução, água e sal estão na mesma fase. O sal dissolvido não sedimenta como areia.']]}
  },
  {
   id:'atomos', title:'Átomos, tabela periódica e ligações', card:'ligacoes',
   lead:'A tabela periódica organiza os elementos por número de prótons e ajuda a prever como seus átomos interagem.',
   parts:[
    ['Identifica a partícula', 'O número atômico Z conta prótons e identifica o elemento. O número de massa A conta prótons mais nêutrons. Átomo neutro tem o mesmo número de elétrons e prótons. Íon positivo perdeu elétrons em relação ao átomo neutro, e íon negativo ganhou.'],
    ['Lê a coluna e a linha', 'Cada linha é um período. As colunas são grupos e muitas delas reúnem elementos com comportamento parecido. As propriedades químicas dependem especialmente dos elétrons mais externos.'],
    ['Como a estrutura afeta o material', 'Ligações covalentes envolvem compartilhamento de elétrons. Em sólidos iônicos, a atração entre íons forma uma rede. Metais apresentam elétrons móveis associados à ligação metálica. Entre moléculas, interações como ligações de hidrogênio influenciam propriedades como ponto de ebulição.']
   ],
   example:['Um íon possui 17 prótons, 18 nêutrons e 18 elétrons. O que podemos identificar?', 'Z = 17, então o elemento é cloro.', 'A = 17 + 18 = 35.', 'Há um elétron a mais do que prótons. A carga é −1, representada por Cl⁻.'],
   exam:'Em questões de condutividade, procura cargas capazes de se mover. Íons presos em um cristal têm mobilidade diferente dos íons dissolvidos.',
   check:{prompt:'O que muda quando um átomo neutro de sódio perde um elétron?',correct:2,choices:[['Seu número de prótons diminui','A perda ocorre na região dos elétrons. O número de prótons continua identificando o sódio.'],['Vira outro elemento','O elemento só mudaria se mudasse o número de prótons.'],['Vira um íon de carga +1','Com um elétron a menos, fica uma carga positiva a mais do que cargas negativas.']]}
  },
  {
   id:'mol', title:'Mol, massa molar e quantidade', card:'mol',
   lead:'Uma dúzia é um jeito de contar 12 coisas. O mol também é um jeito de contar, usado para quantidades muito maiores de partículas.',
   parts:[
    ['Mol é quantidade de entidades', 'Um mol contém aproximadamente 6,02 × 10²³ entidades. Diz quais entidades estás contando: átomos, moléculas, íons ou unidades de fórmula. Um mol de moléculas de água contém dois mols de átomos de hidrogênio.'],
    ['Converte massa em quantidade', 'Massa molar M é a massa de um mol, em g/mol. Usa n = m/M para converter gramas em mols. Para obter a massa molar de uma substância, soma as massas molares dos átomos de sua fórmula.'],
    ['Escolhe a ponte certa', 'O caminho típico é massa → mol → número de partículas. Faz a ponte inversa se a pergunta fornecer partículas. Para gases, a relação entre volume e mol depende da temperatura e da pressão. Usa o volume molar dado para aquelas condições.']
   ],
   example:['Quanto corresponde a 36 g de água em mols? Usa H = 1 g/mol e O = 16 g/mol.', 'H₂O tem dois H e um O: M = 2 × 1 + 16 = 18 g/mol.', 'Divide a massa: n = 36/18 = 2 mol de H₂O.', 'Como cada molécula tem dois átomos de H, há 4 mol de átomos de H.'],
   exam:'Quando a reação dá uma proporção, ela costuma estar em mols. Converte os dados em gramas antes de aplicar os coeficientes.',
   check:{prompt:'O CO₂ tem massa molar de 44 g/mol. Quantos mols de CO₂ há em 22 g?',correct:0,choices:[['0,5 mol','22 g ÷ 44 g/mol = 0,5 mol.'],['2 mol','44/22 inverte massa e massa molar. A amostra tem menos que a massa de 1 mol.'],['22 mol','22 é a massa em gramas. Divide pela massa molar para obter a quantidade em mol.']]}
  },
  {
   id:'reacoes', title:'Balanceamento e estequiometria', card:'estequiometria',
   lead:'Uma equação química balanceada funciona como receita. Os coeficientes dizem em que proporção os reagentes se combinam.',
   parts:[
    ['Conta os átomos', 'Balancear é ajustar os coeficientes na frente das fórmulas até que cada elemento tenha a mesma contagem nos dois lados. Evita mexer nos índices: H₂O e H₂O₂ são substâncias diferentes.'],
    ['Relaciona os mols', 'Em 2 H₂ + O₂ → 2 H₂O, dois mols de H₂ reagem com um mol de O₂ para formar dois mols de água. Se a questão pede massa, converte os dados em mols, aplica a razão dos coeficientes e volta para gramas.'],
    ['Limite e rendimento', 'Se tens a quantidade dos dois reagentes, calcula quanto produto cada um conseguiria formar. O menor valor indica o limitante. O rendimento compara o produto efetivamente obtido com esse máximo teórico.']
   ],
   example:['Há 4 mol de H₂ e 1 mol de O₂ na reação 2 H₂ + O₂ → 2 H₂O.', 'Para usar os 4 mol de H₂ seriam necessários 2 mol de O₂.', 'O O₂ limita. Seu 1 mol reage com 2 mol de H₂ e forma 2 mol de água.', 'Sobram 2 mol de H₂ no modelo ideal.'],
   exam:'Se o enunciado fornecer pureza, calcula primeiro a massa de reagente puro. Se fornecer rendimento, aplica a porcentagem ao resultado teórico.',
   check:{prompt:'Para cada 2 mol de H₂O formados, a equação balanceada consome quanto O₂?',correct:1,choices:[['2 mol','O coeficiente da água é 2. O de O₂ é 1, escrito de forma implícita.'],['1 mol','A proporção é 1 mol de O₂ para 2 mol de H₂O.'],['0,5 mol','0,5 mol de O₂ formaria 1 mol de água. O pedido é o dobro disso.']]}
  },
  {
   id:'solucoes', title:'Soluções, concentração e diluição', card:'diluicao', lab:'diluicao',
   lead:'Se adicionas água a um suco sem derramar nada, a quantidade de soluto se mantém e ele fica distribuído em mais líquido.',
   parts:[
    ['Soluto e solvente', 'Soluto é o componente dissolvido. Solvente é o meio que o dissolve. Concentração comum é massa de soluto dividida pelo volume total da solução, em g/L. Concentração molar usa mol de soluto por litro.'],
    ['Diluir preserva o soluto', 'Ao adicionar apenas solvente sem perdas ou reação, a quantidade de soluto permanece. Por isso C₁V₁ = C₂V₂ quando as concentrações usam a mesma definição e unidade. O volume final é o da solução inteira.'],
    ['Quantidade que cabe', 'Solubilidade é a quantidade que pode dissolver sob condições definidas. Ela depende do solvente, do soluto e da temperatura. Uma solução concentrada pode ainda estar abaixo do limite de saturação.']
   ],
   example:['Uma solução tem 20 g de soluto em 1 L. Acrescenta-se solvente até o volume final chegar a 2,5 L.', 'No início, C = 20/1 = 20 g/L.', 'Os 20 g ficam na solução. O volume final é 2,5 L.', 'A concentração final vale 20/2,5 = 8 g/L.'],
   exam:'Se o comando fala em completar até certo volume, usa esse volume final. Se fala em acrescentar uma quantidade, verifica como o volume final deve ser obtido.',
   check:{prompt:'A mesma quantidade de soluto passa de 0,5 L de solução para 1 L. O que ocorre com a concentração?',correct:2,choices:[['Dobra','O volume dobrou, mas a quantidade de soluto ficou constante. Ela se distribui em mais líquido.'],['Fica igual','A massa de soluto fica igual. A concentração compara essa massa com o volume.'],['Cai à metade','Dividir a mesma massa pelo dobro do volume dá metade da concentração.']]}
  },
  {
   id:'ph', title:'Ácidos, bases e leitura do pH', card:'ph',
   lead:'A escala de pH comprime diferenças grandes. Uma diferença de uma unidade representa um fator dez na atividade de H⁺.',
   parts:[
    ['Ácido e base', 'Uma ideia de partida é que um ácido doa prótons e uma base aceita. Em água, é comum escrever H⁺ como abreviação de íons hidratados. Na neutralização de um ácido com hidróxido, H₃O⁺ e OH⁻ formam água.'],
    ['Lê a escala', 'Para soluções diluídas, usamos pH ≈ −log₁₀[H⁺], com a concentração em mol/L na aproximação escolar. Quanto maior a concentração de H⁺, menor o pH. Em água pura a 25 °C, o pH é próximo de 7.'],
    ['Indicadores e tamponamento', 'Um indicador muda de cor em uma faixa de pH. Um tampão atenua variações de pH após pequenas adições de ácido ou base. Num enunciado, procura a faixa de cor ou o efeito que o sistema precisa evitar.']
   ],
   example:['Compara soluções diluídas de pH 3 e pH 5.', 'pH 3 corresponde a aproximadamente 10⁻³ mol/L de H⁺.', 'pH 5 corresponde a 10⁻⁵ mol/L.', 'A razão é 10⁻³ ÷ 10⁻⁵ = 100. A primeira tem 100 vezes a concentração de H⁺ da segunda.'],
   exam:'Distingue força de um ácido, ligada ao grau de ionização, da concentração da solução preparada.',
   check:{prompt:'Quando o pH de uma solução diluída sobe de 4 para 5, o que acontece com a concentração aproximada de H⁺?',correct:0,choices:[['Diminui por um fator de 10','A concentração passa de 10⁻⁴ para 10⁻⁵ mol/L.'],['Aumenta por um fator de 10','O pH aumenta quando [H⁺] diminui, por causa do sinal negativo na definição.'],['Diminui por um fator de 1,25','Dividir 5 por 4 compara os valores de pH, que estão numa escala logarítmica.']]}
  },
  {
   id:'termoquimica', title:'Energia, velocidade e equilíbrio', card:'termoquimica',
   lead:'Uma reação pode liberar energia e ainda demorar para acontecer. O saldo energético e a velocidade são perguntas diferentes.',
   parts:[
    ['Acompanha o calor', 'Em pressão constante, a variação de entalpia ΔH indica o calor trocado pelo sistema nessas condições, quando só há trabalho de expansão. ΔH negativo indica liberação de calor, e positivo indica absorção. Inverter a equação inverte o sinal de ΔH.'],
    ['Vê a barreira do caminho', 'Energia de ativação é a barreira energética associada ao caminho da reação. Aumentar a temperatura costuma aumentar a fração de colisões capazes de superar a barreira. Um catalisador oferece outro caminho, sem alterar o ΔH da reação.'],
    ['Duas direções em equilíbrio', 'No equilíbrio dinâmico, as reações direta e inversa continuam com velocidades iguais. Isso mantém a composição constante. Um catalisador acelera a chegada ao equilíbrio e preserva a composição de equilíbrio nas mesmas condições.']
   ],
   example:['Uma reação começa com reagentes a 100 kJ e termina com produtos a 60 kJ, para as quantidades representadas no gráfico.', 'ΔH = 60 − 100 = −40 kJ.', 'A diferença negativa corresponde a energia liberada.', 'Um catalisador pode baixar o pico do gráfico, mantendo os mesmos níveis de início e fim.'],
   exam:'Em diagrama de energia, separa a diferença entre início e fim da distância entre início e pico. Elas representam ΔH e a barreira de ativação.',
   check:{prompt:'O que um catalisador muda ao oferecer outro caminho para uma reação nas mesmas condições?',correct:1,choices:[['A diferença de entalpia entre produtos e reagentes','Essas entalpias dependem dos estados inicial e final. O caminho novo preserva a diferença.'],['A barreira de ativação','Um caminho com menor barreira acelera a reação sem mudar o saldo de entalpia.'],['A composição no equilíbrio','O catalisador acelera as duas direções. Nas mesmas condições, o estado de equilíbrio fica igual.']]}
  },
  {
   id:'eletroquimica', title:'Oxirredução, pilhas e eletrólise', card:'pilha',
   lead:'Uma pilha separa duas partes de uma reação. A passagem dos elétrons pelo circuito externo permite fornecer energia a um aparelho.',
   parts:[
    ['Rastreia os elétrons', 'Oxidar é perder elétrons, e reduzir é ganhar. Em uma reação de oxirredução, as duas coisas ocorrem juntas. O número de oxidação aumenta para quem oxida e diminui para quem reduz.'],
    ['Encontra os eletrodos', 'Ânodo é onde ocorre oxidação. Cátodo é onde ocorre redução. Numa pilha em descarga, os elétrons saem do ânodo e chegam ao cátodo pelo circuito externo. O deslocamento de íons ajuda a manter o balanço de cargas.'],
    ['Distingue pilha de eletrólise', 'Uma pilha transforma energia química de uma reação espontânea em energia elétrica. Na eletrólise, uma fonte externa fornece energia elétrica para forçar a transformação. Ânodo e cátodo continuam definidos pelo que acontece em cada um.']
   ],
   example:['Em uma pilha, zinco metálico vira Zn²⁺, enquanto Cu²⁺ vira cobre metálico.', 'Zn → Zn²⁺ + 2 e⁻. O zinco perde elétrons no ânodo.', 'Cu²⁺ + 2 e⁻ → Cu. Os íons de cobre ganham elétrons no cátodo.', 'No fio, os elétrons vão do eletrodo de zinco para o de cobre.'],
   exam:'Em proteção de metais contra corrosão, procura qual metal perde elétrons no lugar do material que se quer proteger.',
   check:{prompt:'Numa pilha em funcionamento, o eletrodo onde íons de prata ganham elétrons é qual?',correct:2,choices:[['Ânodo','No ânodo ocorre perda de elétrons. O enunciado descreve ganho.'],['Ponte salina','A ponte permite o deslocamento de íons entre soluções. A redução ocorre no eletrodo.'],['Cátodo','Ganho de elétrons é redução, e a redução sempre ocorre no cátodo.']]}
  },
  {
   id:'organica', title:'Carbono, polímeros e materiais', card:'organica',
   lead:'Do álcool de uma fórmula ao plástico de uma embalagem, a estrutura das moléculas ajuda a explicar como o material se comporta.',
   parts:[
    ['Reconhece grupos na estrutura', 'Hidrocarbonetos têm carbono e hidrogênio. Em álcoois, o grupo –OH fica ligado a um carbono saturado. Ácidos carboxílicos têm –COOH. Em ésteres, aparece o trecho –C(=O)–O– ligado a outro grupo carbônico pelo oxigênio.'],
    ['De pequenas unidades a cadeias', 'Polímeros são moléculas com muitas unidades repetidas. O polietileno vem da polimerização do eteno. O tipo de unidade, o tamanho das cadeias e as ligações entre elas ajudam a explicar flexibilidade e comportamento ao aquecer.'],
    ['Estrutura, uso e descarte', 'Uma molécula de sabão tem região que interage melhor com água e outra que interage com gordura. Essa combinação ajuda a dispersar óleo. Em questões ambientais, separa a propriedade química do material da decisão de coleta, reuso ou reciclagem.']
   ],
   example:['Compara etanol (CH₃CH₂OH) e etano (CH₃CH₃). Qual pode formar ligações de hidrogênio entre moléculas da própria substância?', 'O etanol tem um grupo –OH e seu oxigênio tem pares de elétrons disponíveis.', 'Essa estrutura permite interações do tipo ligação de hidrogênio entre moléculas de etanol.', 'O etano é um hidrocarboneto e, nesse caso, não forma essas ligações entre si.'],
   exam:'Identifica o grupo funcional pela vizinhança dos átomos. Um –OH dentro de –COOH faz parte da carboxila.',
   check:{prompt:'A fórmula CH₃COOH representa qual função orgânica?',correct:0,choices:[['Ácido carboxílico','O final –COOH tem uma carbonila e um –OH no mesmo carbono. É uma carboxila.'],['Álcool','O –OH aqui está no mesmo carbono da carbonila. A função é determinada pelo grupo inteiro.'],['Hidrocarboneto','A molécula contém oxigênio. Hidrocarbonetos têm apenas C e H.']]}
  }
 ],
 biologia: [
  {
   id:'celula', title:'Célula e níveis de organização', card:'membrana',
   lead:'Uma célula mantém um interior diferente do exterior. Isso permite que processos químicos aconteçam em condições controladas.',
   parts:[
    ['Do pequeno ao grande', 'A célula é a unidade básica dos organismos. Em muitos seres multicelulares, células especializadas formam tecidos, tecidos formam órgãos, e órgãos atuam juntos em sistemas. Alguns seres são constituídos por uma única célula.'],
    ['O que fica dentro', 'A membrana controla a passagem de substâncias. Ribossomos produzem proteínas. Nas células eucarióticas, o DNA fica principalmente no núcleo. Bactérias não têm núcleo delimitado por membrana. Nas células vegetais, cloroplastos captam energia luminosa e a parede celular ajuda a sustentar a célula.'],
    ['Osmose e transporte', 'Na osmose, a água passa através de uma membrana seletiva. Se a pressão for igual nos dois lados e o soluto não atravessar, a tendência é a água ir para o lado mais concentrado em soluto. Em transporte ativo, há gasto de energia para sustentar movimentos contra gradientes.']
   ],
   example:['Uma célula animal é colocada num meio mais concentrado em um soluto que não atravessa a membrana.', 'O exterior tem concentração maior desse soluto.', 'A água tende a sair da célula por osmose.', 'A célula pode diminuir de volume. A previsão depende de quais substâncias atravessam a membrana.'],
   exam:'Ao ler um experimento de membrana, marca o que atravessa e o que fica em cada lado. Concentração por si só não explica todo tipo de transporte.',
   check:{prompt:'Qual estrutura produz proteínas a partir da informação do RNA mensageiro?',correct:1,choices:[['Membrana plasmática','Ela regula trocas com o meio. A montagem de proteínas acontece nos ribossomos.'],['Ribossomo','O ribossomo lê a sequência do RNA mensageiro e liga os aminoácidos.'],['Cloroplasto','O cloroplasto realiza fotossíntese. A tradução do RNA é tarefa de ribossomos, inclusive dos que existem dentro do cloroplasto.']]}
  },
  {
   id:'metabolismo', title:'Fotossíntese, respiração e fermentação', card:'energia-celular',
   lead:'Uma planta usa luz para produzir moléculas orgânicas. Também precisa obter energia dessas moléculas para sustentar suas células.',
   parts:[
    ['Captar e armazenar', 'Na fotossíntese, energia luminosa ajuda a produzir compostos orgânicos a partir de CO₂ e água. Em plantas, o O₂ liberado vem da água. Parte do carbono incorporado pode ser armazenada na forma de açúcares ou amido.'],
    ['Obter ATP', 'ATP é uma molécula que participa da transferência de energia em processos celulares. Na respiração aeróbia, a célula usa oxigênio e obtém ATP a partir da degradação de moléculas orgânicas. A glicólise começa no citosol, e muitas etapas da respiração aeróbia em eucariontes ocorrem nas mitocôndrias.'],
    ['Quando o caminho muda', 'Na fermentação, a célula consegue manter a glicólise funcionando sem usar oxigênio nesse processo. O rendimento de ATP por glicose é menor do que na respiração aeróbia. Leveduras podem produzir etanol e CO₂ na fermentação alcoólica.']
   ],
   example:['Uma cultura de leveduras recebe açúcar em condições favoráveis à fermentação. Bolhas surgem no recipiente.', 'O açúcar fornece matéria para o metabolismo das leveduras.', 'Na fermentação alcoólica, há formação de CO₂ e etanol.', 'As bolhas podem ser de CO₂. Esse gás ajuda a expandir a massa do pão.'],
   exam:'Em gráficos de trocas gasosas, distingue o saldo observado de cada processo. Uma planta iluminada pode realizar fotossíntese e respiração ao mesmo tempo.',
   check:{prompt:'Qual atividade pode continuar numa planta sadia depois que ela fica no escuro?',correct:2,choices:[['Captação de energia luminosa','Sem luz disponível, essa captação não pode acontecer.'],['Liberação fotossintética de oxigênio sustentada pela luz','A etapa que libera oxigênio depende de energia luminosa.'],['Respiração celular','A planta usa moléculas orgânicas e pode continuar respirando no escuro.']]}
  },
  {
   id:'heranca', title:'DNA, divisão celular e herança', card:'mendel',
   lead:'Uma célula pode copiar sua informação para formar novas células. Para formar gametas, ela separa cópias de outro jeito.',
   parts:[
    ['Informação e expressão', 'Genes são trechos de DNA que contribuem para produtos funcionais, como RNAs e proteínas. Na transcrição, a informação é copiada para RNA. Na tradução, o ribossomo usa RNA mensageiro para orientar a montagem de uma proteína.'],
    ['Mitose e meiose', 'Mitose conserva o número de conjuntos de cromossomos nas células-filhas. Na meiose, uma duplicação do DNA seguida de duas divisões reduz esse número à metade. A separação dos cromossomos e a recombinação contribuem para a variedade genética.'],
    ['Probabilidade de herdar', 'Alelos são versões de um gene. Num modelo mendeliano simples, cada genitor transmite um de seus dois alelos. Dominância completa descreve a aparência do heterozigoto. Isso não determina a frequência do alelo na população.']
   ],
   example:['Num modelo de dominância completa, cruza dois indivíduos Aa. A domina sobre a.', 'Cada genitor pode passar A ou a com chance de 1/2.', 'Os quatro pares igualmente prováveis são AA, Aa, aA e aa.', 'O fenótipo recessivo aparece apenas em aa, com chance de 1/4.'],
   exam:'Lê se a questão pede genótipo, fenótipo ou probabilidade dado um fenótipo. As respostas podem ter denominadores diferentes.',
   check:{prompt:'No cruzamento Aa × Aa, qual é a chance de obter um heterozigoto?',correct:0,choices:[['1/2','Aa e aA representam o mesmo genótipo e aparecem em dois dos quatro casos.'],['1/4','Um quarto corresponde a cada homozigoto. O heterozigoto pode ser formado de duas maneiras.'],['3/4','Em dominância completa, essa é a chance do fenótipo dominante. Parte desse grupo é AA.']]}
  },
  {
   id:'evolucao', title:'Evolução, seleção e adaptação', card:'selecao',
   lead:'Em uma população, nem todo indivíduo tem a mesma característica. Uma mudança no ambiente pode alterar quais características aparecem mais nas gerações seguintes.',
   parts:[
    ['Existe variação', 'Mutações e recombinação contribuem para diferenças entre indivíduos. Parte dessas diferenças é hereditária. Quando uma diferença afeta sobrevivência ou reprodução naquele ambiente, ela pode influenciar quantos descendentes cada indivíduo deixa.'],
    ['Seleção ao longo das gerações', 'Uma variante favorável num contexto pode ficar mais frequente quando seus portadores deixam mais descendentes. Mudanças no ambiente podem trocar a vantagem. Evolução descreve mudanças herdáveis em populações ao longo das gerações.'],
    ['Evidências e parentesco', 'Estruturas homólogas têm origem evolutiva compartilhada, mesmo que funções atuais sejam diferentes. Características parecidas também podem surgir de forma independente em linhagens distintas. Em uma árvore evolutiva, parentesco é dado pelo ancestral comum mais recente.']
   ],
   example:['Uma população de insetos tem poucos indivíduos resistentes a um inseticida. O ambiente passa a receber esse produto.', 'Os resistentes já existem no cenário descrito.', 'Os suscetíveis tendem a morrer mais. Os resistentes sobreviventes deixam descendentes.', 'Se a resistência for herdável e a pressão persistir, a frequência dela pode aumentar.'],
   exam:'Procura a sequência variação → diferença de reprodução → mudança na população. Repara se o texto descreve seleção ou apenas uma mudança fisiológica individual.',
   check:{prompt:'Por que a frequência de resistência pode subir após aplicações de um inseticida?',correct:1,choices:[['Todos os insetos aprendem a resistir','A seleção depende de diferenças entre indivíduos e da contribuição para gerações futuras.'],['Resistentes deixam mais descendentes nesse ambiente','Se a resistência for herdável, a reprodução diferencial pode aumentar sua frequência.'],['O produto cria exatamente a mutação de que cada inseto precisa','A exposição seleciona variantes. Ela não direciona mutações para atender à necessidade do indivíduo.']]}
  },
  {
   id:'cadeias', title:'Cadeias alimentares, energia e ciclos', card:'cadeia', lab:'trofica',
   lead:'Segue a seta de uma folha até o animal que a come. Ela mostra por onde matéria e energia passam.',
   parts:[
    ['Lê as setas', 'Em uma cadeia alimentar, a seta aponta do alimento para quem o consome. Produtores formam matéria orgânica a partir de fontes inorgânicas. Consumidores obtêm matéria orgânica ao se alimentar. Decompositores atuam sobre restos e resíduos de vários níveis.'],
    ['Energia diminui entre níveis', 'Em cada nível, parte da energia é usada no metabolismo e transferida ao ambiente, e parte nem chega a ser ingerida ou assimilada pelo consumidor seguinte. Por isso a energia disponível para o nível seguinte é menor. A fração transferida varia entre ecossistemas.'],
    ['A matéria circula', 'Elementos químicos voltam a circular quando organismos respiram, excretam ou se decompõem. No ciclo do carbono, a fotossíntese incorpora carbono do CO₂ à matéria orgânica. Respiração e combustão podem devolver CO₂ ao ambiente.']
   ],
   example:['Em um modelo, produtores armazenam 10 000 kJ e cada nível recebe 10% da energia do nível anterior.', 'Consumidores primários recebem 1 000 kJ.', 'Consumidores secundários recebem 10% de 1 000, ou 100 kJ.', 'Consumidores terciários recebem 10 kJ. Os 10% são uma hipótese do exemplo.'],
   exam:'Se o enunciado falar de poluente persistente, acompanha a concentração da substância. Isso responde a outra pergunta que a pirâmide de energia.',
   check:{prompt:'Em capim → gafanhoto → sapo, qual nível recebe menos energia no percurso representado?',correct:2,choices:[['Capim','O capim é a entrada de energia nessa cadeia. Parte dela segue para os próximos níveis.'],['Gafanhoto','O gafanhoto recebe uma parte da energia do capim, e o sapo recebe uma parte ainda menor.'],['Sapo','A energia disponível diminui a cada transferência, e o sapo é o último nível mostrado.']]}
  },
  {
   id:'ecossistemas', title:'Populações e impactos ambientais', card:'eutrofizacao',
   lead:'Se um rio muda, pergunta primeiro o que entrou ou saiu do sistema. Depois acompanha quem cresce, quem diminui e por quê.',
   parts:[
    ['Crescimento tem limites', 'Uma população reúne indivíduos da mesma espécie numa área. Alimento, espaço e interações com outras espécies podem limitar seu tamanho. A capacidade de suporte depende das condições e pode mudar com o tempo.'],
    ['Eutrofização em etapas', 'Nutrientes em excesso podem favorecer a proliferação de algas. Quando parte dessa biomassa morre, decompositores aeróbios consomem oxigênio ao degradá-la. Com pouco oxigênio dissolvido, organismos sensíveis podem sofrer.'],
    ['Contaminante ao longo da teia', 'Bioacumulação é o aumento de uma substância em um organismo ao longo da exposição. Biomagnificação ocorre quando sua concentração é maior nos níveis tróficos mais altos. Isso depende das características da substância e da teia.']
   ],
   example:['Uma lagoa recebe escoamento rico em fertilizantes e, mais tarde, aparecem peixes mortos.', 'O aporte de nutrientes favorece crescimento intenso de algas.', 'A decomposição da biomassa morta aumenta a demanda de oxigênio.', 'A queda do oxigênio dissolvido pode explicar a mortalidade. O cenário deve ser confrontado com os dados da questão.'],
   exam:'Em problemas ambientais, separa causa inicial de consequência imediata. Nutrientes em excesso e queda de oxigênio podem estar em pontos diferentes da cadeia.',
   check:{prompt:'Por que o oxigênio dissolvido pode cair após a morte de uma floração de algas?',correct:0,choices:[['A decomposição aeróbia consome oxigênio','Mais matéria orgânica pode aumentar o consumo de oxigênio por decompositores.'],['Algas mortas fazem fotossíntese mais rápido','Fotossíntese depende de células metabolicamente ativas. A decomposição é central no cenário.'],['O oxigênio vira o próprio fertilizante','O aporte de nutrientes estimula a floração. A queda de oxigênio decorre de processos biológicos posteriores.']]}
  },
  {
   id:'fisiologia', title:'Fisiologia e equilíbrio interno', card:'homeostase',
   lead:'Depois de subir uma escada, respiração e circulação mudam juntas. Os sistemas do corpo se ajustam às demandas das células.',
   parts:[
    ['Transporte e trocas', 'Nos alvéolos, o oxigênio pode passar para o sangue por difusão e o CO₂ passa no sentido oposto. O coração impulsiona o sangue, que entrega substâncias aos tecidos e recolhe produtos do metabolismo. Artérias saem do coração. Veias voltam a ele.'],
    ['Energia e nutrientes', 'A digestão quebra moléculas dos alimentos em unidades absorvíveis. Grande parte da absorção acontece no intestino delgado. Nutrientes chegam aos tecidos pelo sangue ou, para parte dos lipídios absorvidos, passam primeiro pela linfa.'],
    ['Feedback e homeostase', 'Homeostase é a manutenção de condições internas dentro de faixas compatíveis com o funcionamento do organismo. No feedback negativo, uma resposta atenua a alteração inicial. Quando há perda de água, a ação do ADH pode aumentar a reabsorção de água nos rins.']
   ],
   example:['No modelo, uma pessoa perde água pelo suor e seu sangue fica mais concentrado.', 'A alteração é detectada pelo organismo, que pode aumentar a liberação de ADH.', 'Os rins reabsorvem mais água. A urina tende a ficar mais concentrada.', 'A retenção de água ajuda a reduzir a mudança que iniciou a resposta.'],
   exam:'Em um diagrama de regulação, acompanha o estímulo, o sinal e o efeito. Verifica se o efeito reduz ou intensifica a mudança inicial.',
   check:{prompt:'Num feedback negativo, qual é o papel da resposta?',correct:1,choices:[['Aumentar continuamente a alteração inicial','Essa amplificação é característica de feedback positivo.'],['Reduzir a alteração que disparou o mecanismo','A resposta se opõe à mudança inicial e contribui para estabilizar a condição regulada.'],['Parar definitivamente o sistema','O mecanismo regula a variável. Ele pode voltar a atuar quando a variável se altera novamente.']]}
  },
  {
   id:'imunidade', title:'Microrganismos, imunidade e saúde', card:'imunidade',
   lead:'Em questões de saúde, costuma ajudar separar o agente, a via de transmissão e o tipo de defesa que está sendo descrito.',
   parts:[
    ['Agente e transmissão', 'Bactérias são organismos celulares. Vírus precisam de uma célula hospedeira para se multiplicar. Outros agentes infecciosos incluem fungos e protozoários. Vetor é o organismo que pode transmitir um agente entre hospedeiros.'],
    ['Respostas do corpo', 'Barreiras e células da imunidade inata atuam rapidamente. A resposta adaptativa pode reconhecer alvos específicos e gerar memória. Anticorpos se ligam a alvos específicos, mas são só uma parte da resposta de defesa.'],
    ['Ativa e passiva', 'Uma vacina apresenta um alvo ou instrução para produzi-lo, estimulando a própria resposta imune. A imunização passiva fornece anticorpos prontos. A proteção passiva tende a ser temporária e não depende de gerar memória contra aquele alvo.']
   ],
   example:['Um quadro compara um imunizante que estimula memória com um preparado de anticorpos prontos.', 'No primeiro caso, o organismo participa da produção da resposta. É imunização ativa.', 'No segundo, recebe anticorpos já formados. É imunização passiva.', 'A diferença que resolve o exercício é a origem da resposta e a formação de memória.'],
   exam:'Quando o comando pede controle de transmissão, identifica a via citada. Uma ação voltada a um vetor específico depende do ciclo descrito.',
   check:{prompt:'Qual alternativa descreve imunização passiva?',correct:2,choices:[['O organismo produz memória após contato com um antígeno','Isso caracteriza uma resposta ativa.'],['Uma barreira física impede a entrada de agentes','Uma barreira faz parte da defesa, mas o enunciado pede a origem da imunização.'],['O organismo recebe anticorpos já prontos','Os anticorpos atuam sem depender de o receptor produzi-los naquele momento.']]}
  },
  {
   id:'biotecnologia', title:'DNA e aplicações da biotecnologia', card:'biotec',
   lead:'As ferramentas de biotecnologia respondem a perguntas diferentes. Uma copia um trecho de DNA, outra compara fragmentos, outra usa a informação para produzir algo.',
   parts:[
    ['Copiar e detectar', 'A PCR amplifica regiões selecionadas de DNA, produzindo muitas cópias de um trecho. O processo facilita detectar ou analisar uma região que já estava na amostra. A eletroforese separa fragmentos de DNA em um gel, geralmente com fragmentos menores migrando mais sob as mesmas condições.'],
    ['Modificar e expressar', 'DNA recombinante combina sequências que podem vir de origens diferentes. Uma célula recebe a sequência com elementos que permitem sua expressão e pode produzir a proteína correspondente. Um organismo transgênico recebeu material genético introduzido por engenharia genética, usualmente de outra origem biológica.'],
    ['Interpreta a evidência', 'Comparar bandas exige saber quais marcadores foram testados e quais amostras são controles. Uma aplicação pode trazer benefícios e riscos que dependem do contexto. Em questões sobre tecnologia, separa a função da ferramenta da decisão de como usá-la.']
   ],
   example:['Um laboratório quer obter uma proteína humana usando bactérias.', 'Introduz nas bactérias uma sequência com a informação da proteína e sinais adequados à expressão.', 'As bactérias expressam essa informação e produzem a proteína.', 'A proteína pode ser isolada e purificada. Copiar um trecho de DNA sozinho não produziria a proteína.'],
   exam:'Marca o verbo do enunciado: amplificar, separar, comparar ou produzir. O objetivo aponta para uma etapa ou técnica diferente.',
   check:{prompt:'Qual técnica é adequada para produzir muitas cópias de um trecho específico de DNA antes de analisá-lo?',correct:0,choices:[['PCR','A PCR amplifica a região delimitada pelos iniciadores.'],['Eletroforese','O gel separa fragmentos que já estão na amostra. Ele não os copia.'],['Tradução','A tradução usa RNA mensageiro para produzir proteína. Ela não amplifica DNA.']]}
  }
 ]
};

// Capítulos na ordem do vídeo. Cada um aponta para uma aula do curso.
globalThis.FURG_DIA2_PHYSICS_VIDEO = [
 ['Cinemática','Antes de 32:00','movimento','Separa distância de deslocamento. Num gráfico v × t, a inclinação dá a aceleração e a área com sinal dá o deslocamento.'],
 ['Energia e suas transformações','32:00','energia','Segue a energia entre movimento, posição, deformação e aquecimento. Define o sistema antes de escrever o balanço.'],
 ['Potência e eficiência','1:10:50','consumo','Potência é energia por tempo, P = E/Δt. Eficiência compara a energia útil com a energia recebida.'],
 ['Termologia','2:17:12','calor','Distingue temperatura de calor. Para cada corpo, C = mc. Em um sistema isolado sem mudança de fase, soma os termos Q = CΔT e iguala a zero.'],
 ['Transmissão de calor','5:43:27','calor','Na condução, a energia passa pelo material. Na convecção, o fluido se move. Na radiação, ondas eletromagnéticas transportam energia.','dia-2/transmissao-calor'],
 ['Fluxo de calor','6:41:25','calor','A taxa média de transferência é Φ = Q/Δt, em W. Dividindo essa taxa pela área, obténs o fluxo por unidade de área em W/m².'],
 ['Mudança de fases','7:01:18','calor','Durante a mudança de fase de uma substância pura sob pressão fixa, usa Q = mL. Para aquecer ou esfriar em uma única fase, usa Q = mcΔT.'],
 ['Eletrodinâmica','7:43:00','circuitos','Corrente mede a passagem de carga por tempo. Tensão mede a energia transferida por unidade de carga.'],
 ['Carga total e ampere-hora','7:58:00','circuitos','Com corrente constante, Q = IΔt. Se o tempo está em horas, a carga sai em Ah. Como 1 h = 3 600 s, 1 Ah = 3 600 C.'],
 ['2ª Lei de Ohm','8:04:28','circuitos','Para um fio uniforme, R = ρℓ/A. Mantendo o material e a temperatura, fios mais longos têm mais resistência e fios mais grossos têm menos.'],
 ['Circuito simples','8:11:40','circuitos','Identifica fonte, fios e carga. A corrente só circula por um caminho fechado. Num resistor ôhmico, usa U = RI.'],
 ['Efeitos da corrente','8:25:30','circuitos','Reconhece o efeito pelo aparelho. O chuveiro aquece por efeito Joule, um eletroímã gera campo magnético e a eletrólise envolve transformações químicas.'],
 ['Potência elétrica','8:34:46','consumo','Em corrente contínua, P = UI. Se P estiver em kW e o tempo em horas, o produto PΔt dá o consumo em kWh.'],
 ['Ondulatória','9:49:50','ondas','Relaciona velocidade, comprimento de onda e frequência por v = λf. Frequência é o número de oscilações por segundo.'],
 ['Fenômenos ondulatórios','11:21:10','ondas','No eco há reflexão. Ao mudar de meio com a interface parada, a frequência se mantém. Na difração, a onda se espalha ao passar por uma abertura ou contornar um obstáculo.'],
];
