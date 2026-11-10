'use strict';
(() => {
 // Cada item usa a numeração da Parte 15 e uma síntese com os dados necessários para resolver.
 const items=[];
 function question(number,subject,card,difficulty,title,stem,options,answer,category,hint,steps,trap,visual){
  items.push({id:'d2-aposta15-'+String(number).padStart(2,'0'),number,subject,card,difficulty,title,stem,options,answer,category,hint,steps,trap,visual});
 }

 question(2,'matematica','probabilidade','Difícil','Dois dados contra um',
  'Arthur lança dois dados justos de seis faces e fica com o maior valor. João lança um dado justo e vence também no empate. Qual afirmação sobre as chances está correta?',
  ['Arthur vence com 81/216.','João vence com 45/216.','Arthur vence com 100/216.','João vence com 35/216.','Arthur vence com 125/216.'],
  'E','modelo','Fixa o resultado do dado de João e conta quantos pares deixam os dois dados de Arthur no máximo nesse valor.',
  ['Há 6³ = 216 trios igualmente prováveis. João vence se os dois dados de Arthur forem menores ou iguais ao dele.',
   'Se João tira k, há k² pares favoráveis a João. A soma de 1² a 6² dá 91.',
   'Arthur vence nos 216 − 91 = 125 casos restantes. Sua chance é 125/216.'],
  'O empate pertence a João. Contar só quando o dado dele é estritamente maior muda o resultado.');

 question(3,'matematica','probabilidade','Fácil','A terceira chave',
  'Cinco pessoas retiram, uma por vez e sem reposição, uma chave aleatória de um conjunto com cinco chaves. Só uma funciona. Antes do sorteio, qual a chance de a terceira pessoa retirar a chave que funciona?',
  ['1/5','4/5','1/4','3/5','2/5'],
  'A','comando','Imagina as cinco chaves em uma fila embaralhada antes de qualquer pessoa tentar.',
  ['O pedido é a chance antes de as chaves serem testadas.',
   'A chave correta é igualmente provável em qualquer uma das cinco posições do sorteio.',
   'Assim, a chance na terceira posição é 1/5. Por etapas, (4/5) × (3/4) × (1/3) = 1/5.'],
  'Depois de saber que as duas primeiras falharam, a chance condicional seria 1/3.');

 question(4,'quimica','intermoleculares','Média','Tensoativo e oxidação no solo',
  'Um solo contaminado por hidrocarbonetos recebe tratamento com um tensoativo e peróxido de hidrogênio. Qual par descreve o papel esperado de cada reagente em condições apropriadas de tratamento?',
  ['Formar micelas e atuar como redutor.','Oxidar os hidrocarbonetos e formar micelas.',
   'Facilitar a dispersão dos hidrocarbonetos em água por micelas e promover sua oxidação.',
   'Isolar o contaminante com uma barreira e apenas dissolvê-lo.','Reduzir o contaminante e apenas dissolvê-lo.'],
  'C','conceito','Separa o que ajuda a levar a substância para a água do que transforma suas moléculas.',
  ['Hidrocarbonetos têm pouca afinidade com água. A questão pergunta como os dois reagentes ajudam na remoção.',
   'As partes apolares do tensoativo podem abrigar os hidrocarbonetos no interior das micelas. O exterior hidrofílico favorece sua dispersão em água.',
   'O peróxido pode atuar como oxidante em um tratamento apropriado. Dispersão e oxidação são papéis diferentes.'],
  'A formação de micelas é um processo físico de agregação. O tratamento oxidativo transforma moléculas.');

 question(5,'matematica','contagem','Média','Contagem de códigos de barras',
  'Um código de 13 algarismos tem três iniciais fixos, seis posições com quatro escolhas cada e três posições com dez escolhas cada. O último algarismo é determinado pelos anteriores. Quantos códigos são possíveis?',
  ['4⁶ × 10³','4⁵ × 10⁴','4⁶ × 10²','4⁷ × 10³','4³ × 10⁶'],
  'A','modelo','Conta quantas decisões independentes aparecem em cada bloco.',
  ['Os três algarismos iniciais e o verificador oferecem uma única possibilidade cada.',
   'Multiplica 4 seis vezes e 10 três vezes, pois cada posição livre pode ser escolhida independentemente.',
   'Há 4⁶ × 10³ = 4 096 000 códigos.'],
  'O verificador depende dos algarismos anteriores. Na versão resumida, uma opção incorreta substitui a opção duplicada do PDF.');

 question(6,'fisica','calorimetria','Média','Da frenagem ao aquecimento',
  'Um carro de 1 500 kg para a partir de 20 m/s. Toda a energia cinética inicial é transferida para o aço dos freios, que passa de 20 °C a 120 °C. O calor específico do aço é 460 J/(kg·°C). Quais são a energia cinética inicial e a massa aquecida?',
  ['150 000 J e 3,26 kg','300 000 J e 6,52 kg','300 000 J e 13,04 kg','600 000 J e 3,26 kg','600 000 J e 6,52 kg'],
  'B','modelo','Usa uma equação para descobrir a energia do carro e outra para descobrir a massa que a recebeu.',
  ['Calcula E_c = mv²/2. Assim, E_c = 1 500 × 20²/2 = 300 000 J.',
   'O aço recebe essa energia. Sem mudança de fase, Q = mcΔT, com ΔT = 120 − 20 = 100 °C.',
   'm = 300 000/(460 × 100) ≈ 6,52 kg. A unidade J cancela e sobra kg.'],
  'Usa a diferença de temperaturas. A massa do carro entra na energia cinética e a massa do aço entra na calorimetria.');

 question(7,'quimica','intermoleculares','Fácil','Gelo seco passando para gás',
  'No gelo seco, CO₂ sólido passa direto para CO₂ gasoso. Considerando apenas essa mudança de estado, quais interações são superadas?',
  ['Ligações iônicas.','Ligações covalentes dentro de cada molécula.','Ligações metálicas.','Forças intermoleculares, como as de London.','Ligações de hidrogênio entre moléculas de CO₂.'],
  'D','conceito','Compara o que existia antes e o que ainda existe depois da sublimação.',
  ['O CO₂ continua sendo CO₂. A substância apenas muda do estado sólido para o gasoso.',
   'Para se separar, as moléculas superam atrações entre elas, principalmente dispersão de London no modelo escolar.',
   'As ligações covalentes C=O continuam presentes nas moléculas.'],
  'O PDF também usa o termo decomposição. Aqui o pedido foi delimitado à sublimação, que é uma mudança física.');

 question(9,'biologia','enzimas','Fácil','Fruta cortada e pH',
  'Para o modelo da questão, considera que as enzimas do escurecimento da fruta têm maior atividade perto do pH neutro. Qual opção atua pela alteração desse pH?',
  ['Suco de limão, que acidifica a superfície.','Mel, pela alegação de efeito antioxidante.','Sal, por favorecer a atividade enzimática.','Água, para diluir compostos da fruta.'],
  'A','conceito','O comando quer mudar o meio em que a enzima funciona.',
  ['A informação central é a faixa de pH em que a atividade é maior.',
   'O suco de limão acidifica o meio e pode afastar a enzima dessa faixa.',
   'A atividade pode diminuir, retardando a formação dos compostos escuros.'],
  'É uma resposta para o mecanismo pedido. Enzimas diferentes podem ter faixas de pH diferentes.');

 question(10,'matematica','unidades','Fácil','O que MB/s mede?',
  'Um arquivo de 5 GB está sendo copiado a 456 MB/s. Qual grandeza é expressa pela unidade MB/s?',
  ['Variação de velocidade por segundo.','Distância percorrida por segundo.','Taxa de transferência de dados.','Vazão volumétrica.','Contagem de mensagens por segundo.'],
  'C','unidade','Lê o que está acima e abaixo da barra.',
  ['MB mede uma quantidade de dados em megabytes. O s mede segundos.',
   'MB/s informa quantos megabytes são transferidos a cada segundo.',
   'A grandeza é uma taxa de transferência. O tamanho de 5 GB seria útil para calcular a duração da cópia.'],
  'MB/s usa bytes. Mb/s, com b minúsculo, usa bits.');

 question(11,'matematica','percentual','Fácil','De por mil para porcentagem',
  'Um indicador vale 15,6 ocorrências a cada 1 000. Qual valor representa a mesma razão em porcentagem?',
  ['0,0156%','1,56%','15,6%','1,56‰','0,156%'],
  'B','unidade','Uma porcentagem é uma razão com denominador 100.',
  ['Escreve a razão como 15,6/1 000.',
   'Divide numerador e denominador por 10. Fica 1,56/100.',
   'A mesma taxa é 1,56%.'],
  'A proporção decimal é 0,0156. Para escrever com o símbolo %, multiplica o decimal por 100.');

 question(12,'matematica','unidades','Fácil','Doze voltas no campo',
  'Um campo retangular pode ter de 90 a 120 m de comprimento e de 45 a 90 m de largura. Qual é a menor distância, em quilômetros, para completar 12 voltas no contorno de um campo com essas medidas?',
  ['1,8 km','2,7 km','3,24 km','4,5 km','5,4 km'],
  'C','unidade','Primeiro encontra o comprimento do contorno de uma volta.',
  ['O caminho acompanha os quatro lados, então uma volta vale 2(90 + 45) = 270 m.',
   'Multiplica por 12 para obter 3 240 m.',
   'Como 1 km = 1 000 m, a distância é 3,24 km.'],
  'Perímetro mede comprimento. Se o resultado estiver em m², tu calculou a área.');

 question(13,'matematica','custo-fixo','Fácil','A ordem no contrato',
  'Cláudia tem 23 anos e Nelson tem 35. O contrato soma os dois valores-base da tabela e uma taxa só para quem for o segundo nome. A taxa é R$ 200 para mulher ou R$ 100 para homem. Qual ordem custa mais e qual é a diferença?',
  ['Cláudia primeiro, R$ 200 a mais.','Cláudia primeiro, R$ 100 a mais.','Nelson primeiro, R$ 200 a mais.','Nelson primeiro, R$ 100 a mais.','Os totais são iguais.'],
  'D','calculo','Em cada cenário, acrescenta só a taxa da pessoa que está em segundo.',
  ['Os valores-base sempre somam R$ 750.',
   'Nelson em segundo leva o total a R$ 850. Cláudia em segundo leva a R$ 950.',
   'Logo, Nelson primeiro e Cláudia em segundo custa R$ 100 a mais.'],
  'Compara totais sob duas regras de taxa. A parte fixa pode ser cancelada na diferença.',
  {headers:['Idade','Mulher (R$)','Homem (R$)'],rows:[['18 a 25','300','400'],['26 a 35','350','450']]});

 question(15,'matematica','fatoracao','Média','Torres de moedas com a mesma altura',
  'Uma torre usa moedas de R$ 1 com 2,85 mm de espessura. A outra usa moedas de R$ 0,50 com 1,95 mm. Qual é o menor valor total em moedas para obter duas torres de mesma altura positiva?',
  ['R$ 20,00','R$ 22,50','R$ 25,00','R$ 30,00','R$ 35,00'],
  'B','modelo','Iguala as alturas e simplifica a razão entre as quantidades de moedas.',
  ['Se a e b são as quantidades, 2,85a = 1,95b.',
   'Multiplica por 100 e divide os coeficientes por 15. Obtemos 19a = 13b. Os menores inteiros positivos são a = 13 e b = 19.',
   'As duas alturas valem 37,05 mm. O valor das moedas é 13 × 1 + 19 × 0,50 = R$ 22,50.'],
  'A menor altura comum usa números inteiros de moedas. O valor em reais vem depois.');

 question(17,'biologia','ciclos','Fácil','Infiltração e enchentes',
  'Uma cidade sofre alagamentos recorrentes quando chove forte. Qual mudança urbana tende a agravar o problema por reduzir a infiltração no solo?',
  ['Ampliação de parques com áreas permeáveis.','Cobertura do solo com pavimento impermeável.','Recomposição de mata ciliar.','Aumento da vegetação em áreas de inundação.','Obras de contenção para reduzir transbordamentos.'],
  'B','conceito','Segue o caminho da água depois que ela encontra o chão.',
  ['O pedido liga uma mudança no solo ao destino da água da chuva.',
   'Quando o solo é impermeabilizado, a água infiltra menos e tende a escoar mais pela superfície.',
   'O volume e o pico de água que chegam à drenagem podem aumentar, o que agrava alagamentos.'],
  'Questão interdisciplinar com Geografia. Enchentes reais também dependem da chuva, do relevo, dos rios e da capacidade de drenagem.');

 question(18,'quimica','acido-base','Média','Enxofre do combustível e chuva ácida',
  'No cenário da questão, um biodiesel tem menos enxofre que o óleo diesel que ele substituiria. Qual mecanismo explica a menor contribuição das emissões de enxofre para a chuva ácida?',
  ['A origem renovável elimina a emissão de poluentes.','Menos enxofre no combustível reduz a formação de óxidos de enxofre na queima.',
   'O biodiesel tem mais enxofre.','A produção de biodiesel impede toda chuva ácida.','Compostos de enxofre neutralizam a chuva.'],
  'B','conceito','Relaciona um elemento presente no combustível aos produtos da combustão.',
  ['A comparação pede o que muda na emissão de compostos de enxofre.',
   'Com menos enxofre para oxidar na queima, a emissão de óxidos de enxofre tende a ser menor.',
   'Esses óxidos podem originar ácidos na atmosfera. Reduzi-los limita essa contribuição à chuva ácida.'],
  'Óxidos de nitrogênio também contribuem. A porcentagem de redução depende do combustível e das condições da comparação.');

 question(19,'matematica','circulo','Média','Um quadrado para aproximar π',
  'Para aproximar a área πR² de um círculo, usa-se um quadrado de lado (16/9)R. Compara o coeficiente de R² do quadrado com π ≈ 3,14. O método é satisfatório se a diferença absoluta for menor que 0,5. Qual é a avaliação?',
  ['Satisfatório, diferença ≈ 0,0205.','Insatisfatório, diferença ≈ 1,2.','Insatisfatório, diferença ≈ 0,6.','Satisfatório, diferença ≈ 0,3.','Insatisfatório, diferença ≈ 0,7.'],
  'A','modelo','Eleva o lado todo ao quadrado e separa o coeficiente de R².',
  ['A área do quadrado é [(16/9)R]² = (256/81)R².',
   'A comparação usa o coeficiente 256/81 ≈ 3,16049. O erro absoluto em relação a 3,14 é cerca de 0,0205.',
   'Como 0,0205 < 0,5, o método é satisfatório segundo o critério fornecido.'],
  'O critério compara coeficientes sem unidade. O erro em área dependeria do tamanho de R.');

 question(20,'matematica','areas','Fácil','Lado e área do triângulo',
  'Um triângulo equilátero tem lado l e área A. Como A varia com l?',
  ['Proporcional a l².','Proporcional a 1/l².','Proporcional a √l.','Proporcional a 1/√l.','Proporcional a l.'],
  'A','conceito','Se o lado dobra, considera o que acontece com a altura também.',
  ['Todos os equiláteros são semelhantes. A base e a altura escalam com l.',
   'A área é base × altura/2. Como h = l√3/2, a fórmula é A = (√3/4)l².',
   'O fator √3/4 permanece fixo. Se l dobra, A quadruplica.'],
  'A área depende de duas dimensões. Dobrar todas as dimensões não dobra a área.');

 question(21,'matematica','quadratica','Difícil','Parcelas do mesmo valor total',
  'Uma compra de R$ 60 000 pode ser paga em N parcelas iguais ou em N + 6 parcelas iguais. Na segunda opção, cada parcela custa R$ 500 a menos. Quantas parcelas tem o primeiro plano?',
  ['12','18','24','30','36'],
  'C','modelo','Escreve o valor de cada parcela como preço total dividido pelo número de parcelas.',
  ['As parcelas valem 60 000/N e 60 000/(N + 6). A diferença, nessa ordem, é R$ 500.',
   'Subtraindo as frações, 360 000/[N(N + 6)] = 500. Portanto N(N + 6) = 720.',
   '24 × 30 = 720, então N = 24. As parcelas ficam em R$ 2 500 e R$ 2 000.'],
  'R$ 500 é a diferença por parcela. O total de R$ 60 000 é o mesmo nos dois planos.');

 question(24,'biologia','cadeia','Fácil','A dieta e as toxinas de anfíbios',
  'Certos anfíbios acumulam na pele substâncias tóxicas vindas de suas presas. Em cativeiro, comem outras presas e a toxicidade cai. O que explica essa diferença?',
  ['As presas de cativeiro não fornecem os compostos tóxicos acumulados.','A dieta de cativeiro intensifica a produção de toxinas.','A toxicidade cai sem relação com os compostos ingeridos.',
   'A alimentação é irrelevante.','A mudança de cor da pele aumenta a toxicidade.'],
  'A','conceito','Procura a origem da substância que chega à pele.',
  ['O enunciado informa que as substâncias vêm das presas.',
   'Se o novo alimento não contém esses compostos, chega menos material para acumular.',
   'A diferença na toxicidade pode surgir da alimentação, mesmo em animais da mesma espécie.'],
  'Acumular uma molécula ingerida é diferente de fabricá-la no próprio corpo.');

 question(25,'biologia','dna','Média','Herança epigenética',
  'Um fator ambiental altera a regulação de genes. Em alguns casos, o efeito pode aparecer nos descendentes sem mudança na sequência de DNA. Qual mecanismo permite esse resultado?',
  ['Troca direta de bases do DNA.','Alterações restritas às células somáticas dos pais.','Transmissão de informação epigenética por células germinativas.',
   'Marcas sempre permanentes nos pais e ausentes nos filhos.','Regulação sem efeito sobre a expressão gênica.'],
  'C','conceito','Pergunta o que pode passar aos filhos e o que permanece igual no DNA.',
  ['Expressão gênica é o uso da informação de um gene. Sua regulação pode mudar sem trocar a ordem das bases.',
   'Se uma informação epigenética for preservada e transmitida por células germinativas, pode afetar a expressão no descendente.',
   'Isso explica a possibilidade descrita. Muitas marcas são apagadas no desenvolvimento, então a transmissão não é automática.'],
  'Distingue regulação da expressão de mutação na sequência. A questão fala em possibilidade, não em regra.');

 question(26,'biologia','transmissao','Fácil','Interromper o ciclo da esquistossomose',
  'Em uma questão sobre o ciclo da esquistossomose, o parasito passa por um caramujo de água doce e pode infectar pessoas expostas à água contaminada. Qual opção age tanto na contaminação ambiental quanto na exposição?',
  ['Divulgar só os sintomas.','Usar repelente antes de entrar na água.','Melhorar o saneamento e evitar contato com água contaminada.',
   'Tratar só depois do contato com a água.','Bloquear o acesso à água sem agir sobre a contaminação.'],
  'C','conceito','Identifica como o parasito chega ao ambiente e como sai da água para o hospedeiro humano.',
  ['Ovos eliminados nas fezes podem chegar à água. O ciclo inclui o caramujo como hospedeiro intermediário.',
   'O saneamento reduz a contaminação da água por fezes. Evitar água contaminada reduz o contato com as formas infectantes.',
   'A combinação atua nos dois pontos que o comando pede.'],
  'O caramujo participa do ciclo. A infecção humana ocorre pelo contato com água contendo cercárias.');

 question(27,'fisica','rendimento-fis','Difícil','Emissão por energia útil',
  'A tabela compara quatro combustíveis. Considera 1 kcal = 4,18 kJ. Qual libera a menor massa de CO₂ por MJ de energia útil?',
  ['Soja','Milho','Mamona','Dendê','Soja e mamona empatadas.'],
  'C','unidade','A energia útil é o poder calorífico multiplicado pelo rendimento na forma decimal.',
  ['A cada kg, multiplica poder calorífico × eficiência × 4,18/1 000 para obter MJ úteis.',
   'Divide a emissão em g/kg por esses MJ/kg. Soja ≈ 88,8, milho ≈ 82,5, mamona ≈ 79,0 e dendê ≈ 91,7 g/MJ.',
   'A mamona tem a menor razão. O kg cancela entre numerador e denominador.'],
  'Usa energia útil. Escolher por uma coluna isolada não aplica o critério do comando.',
  {headers:['Biodiesel','Poder calorífico (kcal/kg)','Eficiência (%)','CO₂ (g/kg)'],
   rows:[['Soja','9 200','82','2 800'],['Milho','8 700','90','2 700'],['Mamona','8 600','88','2 500'],['Dendê','8 800','86','2 900']]});

 question(28,'fisica','resistores','Difícil','Resistor em série e potência',
  'Uma fonte contínua ideal de 220 V deve alimentar uma carga resistiva de 127 V e 10 W com um resistor em série. As resistências são constantes. Qual combinação aproxima o valor calculado do resistor e suporta a potência nele dissipada?',
  ['1,2 kΩ e 10 W','1,2 kΩ e 5 W','1,8 kΩ e 10 W','980 Ω e 10 W','2,3 kΩ e 5 W'],
  'A','modelo','Calcula a corrente nominal da carga. A mesma corrente passa no resistor em série.',
  ['A carga precisa de I = 10/127 A. O resistor deve receber os 220 − 127 = 93 V restantes.',
   'R = 93/(10/127) ≈ 1 181 Ω. Entre as opções, o valor próximo é 1,2 kΩ.',
   'O resistor dissipa P = 93 × (10/127) ≈ 7,32 W. Uma potência nominal de 10 W atende ao modelo.'],
  'Calcula a potência de cada componente com a tensão sobre ele. Os 10 W da carga não são a potência do resistor.');

 question(29,'matematica','areas','Fácil','Preço total de dois terrenos',
  'O terreno X mede 20 m × 15 m e custa R$ 250 por m². O terreno Y mede 25 m × 12 m e custa R$ 230 por m². Qual escolha minimiza o preço total?',
  ['X, pela área menor.','X, pelo preço por m² menor.','Y, pela área menor e preço por m² menor.','X, pela área maior.','Y, pelo menor preço total.'],
  'E','modelo','Calcula a área de cada terreno antes de comparar os preços.',
  ['As áreas são 20 × 15 = 300 m² e 25 × 12 = 300 m².',
   'Multiplica área pelo preço unitário. X custa R$ 75 000 e Y custa R$ 69 000.',
   'Escolhe Y. As áreas são iguais, o que elimina as opções que atribuem a diferença de preço ao tamanho.'],
  'Um lado maior não garante área maior. Usa as duas dimensões.');

 question(30,'matematica','custo-fixo','Fácil','Remuneração com três parcelas',
  'Um trabalhador recebe R$ 1 000 fixos por mês, R$ 200 por evento e R$ 15 por drinque servido. No mês fez 6 eventos e serviu 20 drinques no total. Quanto recebeu?',
  ['R$ 1 000','R$ 1 600','R$ 2 000','R$ 2 500','R$ 3 000'],
  'D','comando','Identifica a quantidade de cada tipo e se os 20 drinques são por evento ou no mês.',
  ['O total tem uma parcela fixa e duas parcelas variáveis.',
   'Os eventos rendem 6 × 200 = R$ 1 200. Os drinques rendem 20 × 15 = R$ 300.',
   'Soma 1 000 + 1 200 + 300 = R$ 2 500.'],
  'Os 20 drinques já são o total do mês. Multiplicar por 6 contaria o mesmo atendimento várias vezes.');

 question(31,'matematica','custo-fixo','Fácil','Escolha da loja pelo total',
  'A compra de 6 calças e 5 camisas precisa ser feita numa loja só. Na X, uma calça custa R$ 80 e uma camisa R$ 50. Na Y, custam R$ 70 e R$ 60, respectivamente. Qual opção atende ao critério de menor gasto?',
  ['X, porque cada camisa é mais barata.','Y, porque cada calça é mais barata.','X, porque o total é menor.','Y, porque o total é menor.','Os totais são iguais.'],
  'D','comando','Usa a quantidade de cada peça para comparar o preço das duas cestas.',
  ['X custa 6 × 80 + 5 × 50 = R$ 730.',
   'Y custa 6 × 70 + 5 × 60 = R$ 720.',
   'Y é R$ 10 mais barata na compra completa. Essa é a justificativa pedida.'],
  'O preço menor de uma peça isolada pode coincidir com a escolha certa por acaso. Compara a compra completa.');

 question(32,'quimica','diluicao','Média','Quanto de solvente acrescentar?',
  'Uma solução tem 100 mL com concentração de 80% em volume. Adiciona-se água até atingir 50% em volume, sem perder soluto. Para este cálculo, considera os volumes aditivos. Qual volume de água é acrescentado?',
  ['20 mL','40 mL','60 mL','80 mL','100 mL'],
  'C','modelo','Conserva a quantidade de soluto. Depois subtrai o volume inicial.',
  ['A quantidade de soluto em volume equivale a 0,80 × 100 = 80 mL no modelo.',
   'Para 50%, temos 0,50 × V_final = 80. O volume final é 160 mL.',
   'Foram acrescentados 160 − 100 = 60 mL de água.'],
  'O comando pede a água adicionada. 160 mL é o volume final da solução.');

 question(33,'fisica','unidades','Fácil','Uma unidade astronômica em km',
  'Uma unidade astronômica (UA) mede exatamente 149 597 870 700 m. Qual é esse valor em quilômetros, com a precisão fornecida?',
  ['149 597 870,7 km','149 597 870 700 km','149 597,8707 km','1 495 978 707 km','149 600 384,4 km'],
  'A','unidade','Usa 1 km/1 000 m como fator de conversão.',
  ['A distância física é a mesma. Muda a unidade usada para expressá-la.',
   'Divide 149 597 870 700 por 1 000 para cancelar metros e deixar quilômetros.',
   'O resultado exato é 149 597 870,7 km.'],
  'Ao passar de m para km, cada unidade passa a ser maior. O valor numérico precisa diminuir.');

 question(34,'matematica','probabilidade','Difícil','A pontuação mais provável na roleta',
  'Uma roleta tem 10 setores iguais: um com o número 1, dois com 2, três com 3 e quatro com 4. São feitos dois giros independentes. Resultados iguais dão o dobro do número, resultados diferentes dão o produto. Qual pontuação é mais provável?',
  ['4','6','8','12','16'],
  'C','modelo','Uma mesma pontuação pode vir de pares diferentes. Soma suas probabilidades.',
  ['Há 100 pares ordenados de setores equiprováveis. A pontuação 8 vem de (4,4), (2,4) ou (4,2).',
   'São 4×4 + 2×4 + 4×2 = 32 casos com 8 pontos. Para 4, 6 e 12 pontos há 12, 21 e 24 casos, respectivamente.',
   'Com 1, 2, 3 e 4 na roleta, 16 é impossível pela regra dos iguais. As demais pontuações possíveis, 2 e 3, têm 5 e 6 casos. O máximo é 32/100 para 8.'],
  'Dobrar 4 dá 8. Elevar 4 ao quadrado daria 16, mas essa é a regra errada para o par (4,4).');

 question(35,'matematica','quadratica','Difícil','Área máxima dentro do retângulo',
  'Num retângulo de 20 cm por 14 cm, P fica a x cm do canto inferior esquerdo pela base, S a x cm do mesmo canto pela lateral e R a x cm do canto superior direito pelo topo. Q fica a x cm abaixo do canto superior direito. Para 0 < x < 14, qual x maximiza a área de PQRS?',
  ['7 cm','7,5 cm','8 cm','8,5 cm','9 cm'],
  'D','modelo','Subtrai da área do retângulo os quatro triângulos que ficaram nos cantos.',
  ['Os triângulos dos cantos têm áreas x²/2, x²/2, (20 − x)(14 − x)/2 e (20 − x)(14 − x)/2.',
   'A área restante é 280 − x² − (20 − x)(14 − x) = 34x − 2x².',
   'A parábola abre para baixo. Seu vértice está em x = −34/[2(−2)] = 8,5 cm, que pertence ao intervalo.'],
  'O domínio vem do desenho. Confere se o vértice está dentro do intervalo que mantém os pontos nas bordas.',
  'quadrilatero');

 question(36,'matematica','areas','Média','Folgas para instalar um armário',
  'Um armário de 0,65 m de largura por 0,95 m de profundidade precisa de 1 cm de folga em cada lateral e no fundo. Qual vão tem a menor área entre os que comportam o móvel com as folgas?',
  ['Vão 1 · 0,70 m²','Vão 2 · 0,714 m²','Vão 3 · 0,72 m²','Nenhum é adequado.','Todos cabem e têm áreas iguais.'],
  'A','unidade','Soma as folgas a cada dimensão antes de comparar áreas.',
  ['Com 1 cm = 0,01 m, a largura mínima é 0,65 + 2 × 0,01 = 0,67 m. A profundidade mínima é 0,96 m.',
   'Os vãos 1 e 2 atendem. O vão 3 tem só 0,90 m de profundidade.',
   'Dos adequados, 0,70 × 1,00 = 0,70 m² é menor que 0,68 × 1,05 = 0,714 m².'],
  'Uma área grande não compensa uma profundidade insuficiente. Confere cada dimensão primeiro.',
  {headers:['Vão','Largura (m)','Profundidade (m)'],rows:[['1','0,70','1,00'],['2','0,68','1,05'],['3','0,80','0,90']]});

 globalThis.FURG_DIA2_BETS={items,review:[
  {number:1,topic:'ATP e metabolismo',card:'energia-celular',reason:'O enunciado não sustenta uma ordem evolutiva específica. Descrever o ciclo de Krebs não demonstra que ele surgiu logo após o uso de ATP.'},
  {number:14,topic:'Estequiometria e rendimento',card:'rendimento-qui',reason:'Faltam as reações balanceadas ou a proporção molar entre NH₃ e o produto. O enunciado ainda chama o carbonato de reagente. O valor do gabarito exige uma relação que não foi dada.'},
  {number:16,topic:'Hora extra e unidades de tempo',card:'proporcao',reason:'R$ 400 por semana já equivalem a R$ 1 600 em quatro semanas. Para atingir R$ 792 mensais como meta mínima, não são necessárias horas adicionais. Nenhuma opção diz isso.'}
 ]};
})();
