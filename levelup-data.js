'use strict';
// Questões autorais do protótipo. Os níveis são uma sequência pedagógica,
// não uma classificação oficial de dificuldade das provas.
globalThis.FURG_LEVELUP_DATA = [
  {id:'primeiros-passos',title:'Primeiros passos',label:'Extremamente fácil',skill:'Somar, tirar e comparar',questions:[
    ['Tu tem 2 lápis e ganha mais 1. Com quantos lápis tu fica?',['1','2','3','4'],2,'Junta os dois lápis com mais um.','2 + 1 = 3. Somar é juntar quantidades.'],
    ['Há 5 bolinhas na mesa. Tu retira 2. Quantas ficam?',['2','5','7','3'],3,'Conta para trás duas vezes a partir de 5.','5 − 2 = 3. Retirar uma quantidade corresponde a subtrair.'],
    ['Qual destes números é o maior?',['9','4','6','2'],0,'Pensa em qual deles aparece por último ao contar de 1 até 10.','9 é maior que 6, 4 e 2.']
  ]},
  {id:'operacoes',title:'Operações',label:'Muito fácil',skill:'Multiplicação, divisão e prioridade',questions:[
    ['São 3 caixas com 4 lápis em cada uma. Quantos lápis há ao todo?',['7','12','10','16'],1,'Soma 4 + 4 + 4.','3 × 4 = 12 lápis. Multiplicar também pode representar uma soma de parcelas iguais.'],
    ['Tu divide 12 balas igualmente entre 3 pessoas. Quantas cada uma recebe?',['4','3','6','9'],0,'Qual número multiplicado por 3 resulta em 12?','12 ÷ 3 = 4 balas para cada pessoa.'],
    ['Quanto vale 8 + 2 × 3?',['30','24','14','18'],2,'A multiplicação vem antes da adição.','Primeiro 2 × 3 = 6. Depois 8 + 6 = 14.']
  ]},
  {id:'fracoes',title:'Partes do todo',label:'Fácil',skill:'Frações e números decimais',questions:[
    ['Uma pizza foi dividida em 4 fatias iguais. Tu come 1 fatia. Que fração da pizza tu comeu?',['1/2','1/4','3/4','4/1'],1,'O denominador conta as partes iguais do todo.','Uma parte de um total de quatro partes iguais é 1/4.'],
    ['Quanto é 1/2 + 1/4?',['2/6','1/6','2/4','3/4'],3,'Escreve 1/2 como uma fração com denominador 4.','1/2 = 2/4. Então 2/4 + 1/4 = 3/4.'],
    ['Uma fita mede 2,5 m. Tu corta 0,75 m. Quanto sobra?',['1,25 m','1,75 m','2,25 m','3,25 m'],1,'Alinha as casas decimais: 2,50 − 0,75.','2,50 − 0,75 = 1,75 m.']
  ]},
  {id:'proporcao',title:'Tudo na proporção',label:'Fácil → médio',skill:'Razão, proporção e regra de três',questions:[
    ['Duas canetas iguais custam R$ 6,00. Quanto custa uma?',['R$ 3,00','R$ 2,00','R$ 4,00','R$ 12,00'],0,'Divide o preço total pela quantidade.','6 ÷ 2 = 3. Cada caneta custa R$ 3,00.'],
    ['Uma receita para 4 pessoas usa 2 xícaras de arroz. Mantendo a proporção, quantas xícaras são necessárias para 10 pessoas?',['3','4','5','8'],2,'Para cada pessoa, a receita usa meia xícara.','2 ÷ 4 = 0,5 xícara por pessoa. Para 10 pessoas: 10 × 0,5 = 5 xícaras.'],
    ['Três máquinas idênticas fazem um serviço em 8 horas. Seis máquinas, com o mesmo ritmo e trabalhando juntas, fariam esse serviço em quanto tempo?',['2 h','8 h','16 h','4 h'],3,'Dobrar o número de máquinas reduz o tempo à metade.','A quantidade de máquinas e o tempo são inversamente proporcionais: 3 × 8 = 6 × t. Logo t = 4 horas.']
  ]},
  {id:'porcentagem',title:'Por cento, por partes',label:'Médio inicial',skill:'Porcentagem, desconto e variações',questions:[
    ['Quanto é 10% de 80?',['4','8','10','18'],1,'10% é a décima parte.','10/100 × 80 = 8.'],
    ['Uma camiseta de R$ 120,00 tem desconto de 25%. Qual é o preço final?',['R$ 90,00','R$ 30,00','R$ 95,00','R$ 100,00'],0,'25% é um quarto do preço. Depois subtrai o desconto.','O desconto é 120 ÷ 4 = 30 reais. O preço final é 120 − 30 = R$ 90,00.'],
    ['Um produto de R$ 100,00 aumenta 20% e depois recebe desconto de 20% sobre o novo preço. Qual é o preço final?',['R$ 80,00','R$ 96,00','R$ 100,00','R$ 104,00'],1,'O segundo percentual é calculado sobre R$ 120,00.','100 × 1,20 × 0,80 = 96. Os percentuais usam bases diferentes, por isso não se anulam.']
  ]},
  {id:'equacoes',title:'Encontra o x',label:'Médio',skill:'Equações e tradução de problemas',questions:[
    ['Qual valor de x torna x + 7 = 12 verdadeira?',['3','7','19','5'],3,'Subtrai 7 dos dois lados.','x = 12 − 7 = 5.'],
    ['Resolve: 3x − 4 = 17.',['5','6','7','9'],2,'Primeiro soma 4 aos dois lados. Depois divide por 3.','3x = 21. Portanto x = 7.'],
    ['Um ingresso inteiro custa o dobro da meia-entrada. Dois ingressos inteiros e uma meia custam R$ 100,00. Quanto custa a meia?',['R$ 20,00','R$ 15,00','R$ 25,00','R$ 40,00'],0,'Se a meia custa x, cada inteira custa 2x.','2 × 2x + x = 100, então 5x = 100 e x = 20 reais.']
  ]},
  {id:'geometria',title:'Enxerga a medida',label:'Médio',skill:'Área, Pitágoras e escala',questions:[
    ['Um retângulo mede 6 cm de comprimento e 4 cm de largura. Qual é sua área?',['10 cm²','20 cm²','24 cm²','48 cm²'],2,'Área do retângulo = comprimento × largura.','6 × 4 = 24 cm². O perímetro seria 20 cm, mas a pergunta pede área.'],
    ['Um triângulo retângulo tem catetos de 6 cm e 8 cm. Quanto mede a hipotenusa?',['10 cm','12 cm','14 cm','100 cm'],0,'Usa a² = 6² + 8² para a hipotenusa a.','a² = 36 + 64 = 100. Como o comprimento é positivo, a = 10 cm.'],
    ['Uma planta está na escala 1:100. Um cômodo retangular mede 3 cm por 4 cm na planta. Qual é sua área real?',['7 m²','120 m²','1.200 m²','12 m²'],3,'Converte as duas medidas antes de calcular a área: 100 cm = 1 m.','As medidas reais são 300 cm = 3 m e 400 cm = 4 m. A área é 3 × 4 = 12 m².']
  ]},
  {id:'potencias',title:'Cresce mais rápido',label:'Médio +',skill:'Potências, exponenciais e logaritmos',questions:[
    ['Quanto vale 2³?',['5','6','8','9'],2,'O expoente indica quantas vezes a base aparece como fator.','2³ = 2 × 2 × 2 = 8.'],
    ['Resolve a equação 2ˣ = 32.',['5','4','6','16'],0,'Escreve 32 como uma potência de 2.','32 = 2 × 2 × 2 × 2 × 2 = 2⁵. Logo x = 5.'],
    ['Quanto vale log₂(16) + log₃(9)?',['4','5','6','8'],2,'Cada logaritmo pergunta a qual expoente elevar sua base.','2⁴ = 16 e 3² = 9. Assim, log₂(16) + log₃(9) = 4 + 2 = 6.']
  ]},
  {id:'funcoes',title:'Conecta as ideias',label:'Intermediário',skill:'Função afim, quadrática e máximo',questions:[
    ['Uma corrida custa uma taxa fixa de R$ 5,00 mais R$ 3,00 por quilômetro. Qual é o custo de uma corrida de 7 km?',['R$ 21,00','R$ 35,00','R$ 56,00','R$ 26,00'],3,'Escreve o custo como C(x) = 5 + 3x.','C(7) = 5 + 3 × 7 = 26 reais.'],
    ['Quais são as raízes de x² − 5x + 6 = 0?',['1 e 6','−2 e −3','2 e 3','−1 e −6'],2,'Procura dois números com soma 5 e produto 6.','x² − 5x + 6 = (x − 2)(x − 3). O produto é zero quando x = 2 ou x = 3.'],
    ['A altura de uma bola, em metros, é h(t) = −t² + 6t, para 0 ≤ t ≤ 6 segundos. Qual é a altura máxima?',['9 m','6 m','12 m','18 m'],0,'Completa o quadrado ou encontra o instante do vértice.','h(t) = −(t − 3)² + 9. O quadrado é sempre não negativo, então a altura máxima é 9 m, em t = 3 s.']
  ]},
  {id:'desafio',title:'Desafio de integração',label:'Mais desafiador',skill:'Combinar modelos e raciocínio',questions:[
    ['Um capital cresce 10% por período, com juros compostos. Depois de quantos períodos completos ele supera o dobro do valor inicial? Usa 1,1⁷ ≈ 1,949 e 1,1⁸ ≈ 2,144.',['6','7','8','10'],2,'Compara os fatores de crescimento com 2.','Após 7 períodos o capital ainda é menor que o dobro: 1,949C < 2C. Após 8, é maior: 2,144C > 2C. Portanto são 8 períodos.'],
    ['De um grupo de 5 pessoas, serão escolhidas 2 para uma comissão, sem cargos diferentes. Quantas comissões podem ser formadas?',['5','20','25','10'],3,'Cada par contado em ordens diferentes representa a mesma comissão.','Há 5 × 4 = 20 pares ordenados. Como cada comissão foi contada duas vezes, são 20 ÷ 2 = 10 comissões.'],
    ['Um retângulo tem perímetro de 20 cm e lados positivos. Qual é a maior área que ele pode ter?',['20 cm²','25 cm²','24 cm²','100 cm²'],1,'Se um lado mede x, o outro mede 10 − x. Maximiza o produto.','A(x) = x(10 − x) = −(x − 5)² + 25. O máximo é 25 cm², quando os dois lados medem 5 cm.']
  ]}
].map((stage,level)=>({...stage,level:level+1,questions:stage.questions.map((q,index)=>({id:'up-'+stage.id+'-'+(index+1),stem:q[0],options:q[1],answer:q[2],hint:q[3],explanation:q[4]}))}));
