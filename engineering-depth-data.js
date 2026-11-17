'use strict';
(() => {
 const data=globalThis.FURG_ENGINEERING;
 if(!data)return;
 const extra=[];
 const add=(chapter,id,title,lead,idea,prompt,steps,answer,question,options,practice,visual='function',visualText='Observa como a representação ajuda a decidir qual operação usar.')=>{
  const shift=extra.length%3,choices=options.slice(shift).concat(options.slice(0,shift));
  extra.push({chapter,id,title,lead,idea,visual,visualText,example:{prompt,steps,answer},check:{prompt:question,options:choices,correct:(3-shift)%3},practice:practice.map(([prompt,hint,solution])=>({prompt,hint,solution}))});
 };
 // Pré-requisitos e capítulos 1–8 do sumário de Lições de Cálculo. Textos e problemas originais.
 add('trigonometria','triangulos','Semelhança e Pitágoras','Descobre comprimentos antes de usar as razões.',
 'Triângulos semelhantes conservam seus ângulos e as proporções entre lados correspondentes. Num triângulo retângulo, a² + b² = c², com c na hipotenusa. Essa relação permite recuperar um lado e entender por que seno e cosseno dependem do ângulo, não do tamanho do triângulo.',
 'Um triângulo retângulo tem catetos 6 e 8. Encontra a hipotenusa.', ['Identifica os catetos e aplica Pitágoras: c² = 6² + 8².','Soma 36 + 64 = 100.','Como comprimento é positivo, c = √100 = 10.'], '10 unidades',
 'Se os catetos são 9 e 12, a hipotenusa é:', [['15','9² + 12² = 225; √225 = 15.'],['21','Somar catetos não produz a hipotenusa.'],['225','225 é o quadrado da hipotenusa.']],
 [['Um triângulo 3–4–5 é ampliado por 3. Quais os novos lados?','Multiplica cada comprimento pelo mesmo fator.','9, 12 e 15.'],['Hipotenusa 13 e cateto 5. Qual o outro cateto?','Subtrai os quadrados antes de tirar a raiz.','√(169−25)=12.']],'triangle','Semelhança preserva razões: ampliar lados não altera o ângulo.');
 add('trigonometria','funcoes-trig','Funções trigonométricas','Sai do triângulo e chega a funções periódicas.',
 'No círculo unitário, cos x é a coordenada horizontal e sen x é a vertical. Para qualquer ângulo, elas oscilam entre −1 e 1 e repetem seus valores após 2π. Já tg x = sen x/cos x não existe onde cos x = 0. Essa linguagem será usada em limites e derivadas.',
 'Quanto valem sen(π) e cos(π)?',['π rad = 180°: meia volta no círculo.','O ponto final é (−1,0).','Lê a horizontal como cosseno e a vertical como seno.'],'sen(π)=0 e cos(π)=−1',
 'Qual é o período básico de sen x?', [['2π','O círculo completa uma volta em 2π rad.'],['π','Após meia volta, o sinal em geral se inverte.'],['1','Um radiano não completa uma volta.']],
 [['Quanto vale sen(3π/2)?','Localiza 270° no eixo vertical inferior.','−1.'],['Onde tg x não está definida?','Procura onde o denominador cos x zera.','Em x=π/2+kπ, para k inteiro.']],'circle','Cada volta de 2π devolve o mesmo ponto do círculo.');
 add('geometria','parabola','Parábolas e vértice','Lê o gráfico de uma função quadrática.',
 'A parábola y=ax²+bx+c abre para cima quando a>0 e para baixo quando a<0. O vértice tem abscissa −b/(2a). A reta tangente e a otimização vão refinar a leitura de crescimento e máximo/mínimo.',
 'Encontra o vértice em y=x²−4x+3.',['Usa a=1 e b=−4: x do vértice = −b/(2a)=2.','Substitui x=2: y=4−8+3=−1.','Como a>0, (2,−1) é um mínimo.'],'Vértice (2,−1)',
 'Para y=−x²+6x, o vértice é um:', [['Máximo','O coeficiente do quadrado é negativo: abre para baixo.'],['Mínimo','Uma parábola que abre para baixo tem pico, não vale.'],['Ponto de descontinuidade','Polinômios são contínuos.']],
 [['Encontra o eixo de simetria de x²−6x+2.','Usa −b/(2a).','x=3.'],['Quanto vale y=x²−4x+3 em x=1?','Substitui x por 1.','0.']],'parabola','O vértice é o ponto onde o sentido de crescimento muda.');
 add('geometria','vetores','Vetores e componentes','Interpreta direção, módulo e projeções.',
 'Um vetor no plano tem componentes (vx,vy). Seu módulo é √(vx²+vy²); ao somar vetores, soma as componentes correspondentes. Se o vetor faz ângulo θ com o eixo x, vx=|v|cos θ e vy=|v|sen θ. Isso conecta geometria e aplicações em Física.',
 'Qual é o módulo do vetor v=(3,4)?',['Forma o triângulo retângulo cujos catetos medem 3 e 4.','Calcula |v|=√(3²+4²).','Logo |v|=5.'],'5',
 'Quanto vale (2,−1)+(3,4)?',[['(5,3)','Soma x com x e y com y.'],['(6,−4)','Multiplicar coordenadas não soma vetores.'],['(1,5)','Essa conta não soma as componentes correspondentes.']],
 [['Módulo de (−5,12)?','Eleva as componentes ao quadrado.','13.'],['Vetor módulo 10 a 60°: componente horizontal?','Multiplica 10 por cos 60°.','5.']],'triangle','As componentes são catetos; o módulo é a hipotenusa.');
 add('ponte','dominio','Domínio, composição e inversa','Define onde uma fórmula realmente faz sentido.',
 'O domínio reúne entradas permitidas: não se divide por zero, e raízes quadradas reais exigem radicando não negativo. Em f(g(x)), primeiro avalia g e depois f. Na inversa, trocas entrada e saída quando a função é um a um no domínio escolhido. Domínio e continuidade são essenciais para limites.',
 'Qual o domínio real de f(x)=√(x−2)?',['A raiz real exige x−2≥0.','Isola x: x≥2.','Inclui 2 porque √0 existe.'],'[2,+∞)',
 'Qual valor fica fora do domínio de g(x)=1/(x−3)?',[['3','Em x=3 o denominador é zero.'],['0','g(0)=−1/3 existe.'],['−3','g(−3)=−1/6 existe.']],
 [['Se f(x)=x² e g(x)=x+1, calcula f(g(2)).','Entra primeiro em g e depois em f.','g(2)=3; f(3)=9.'],['Domínio de 1/(x+2)?','Exclui o zero do denominador.','Todos os reais, exceto −2.']],'function','Uma fórmula só descreve a função nos pontos em que está definida.');
 add('limites','laterais','Limites laterais','Compara a aproximação pela esquerda e direita.',
 'O limite em x=a existe quando a função se aproxima do mesmo valor dos dois lados. O valor da função exatamente em a pode até faltar; isso não impede um limite. Se os lados discordam, não existe limite bilateral. Gráficos por partes e quocientes com módulo são bons exemplos.',
 'f(x)=1 para x<0 e f(x)=2 para x≥0. Existe lim x→0 f(x)?',['Pela esquerda, os valores permanecem em 1.','Pela direita, os valores permanecem em 2.','Como 1≠2, o limite bilateral não existe.'],'Não existe',
 'Se o limite pela esquerda é 4 e pela direita é 4, o bilateral é:', [['4','Lados concordam, então o limite bilateral existe e vale 4.'],['8','Não se somam limites laterais.'],['Inexistente','A discordância seria necessária para essa conclusão.']],
 [['Qual lim x→0⁻ |x|/x?','Para x negativo, |x|=−x.','−1.'],['Qual lim x→0⁺ |x|/x?','Para x positivo, |x|=x.','1.']],'function','Dois caminhos de aproximação precisam apontar para o mesmo valor.');
 add('limites','infinito','Limites no infinito e assíntotas','Distingue crescimento ilimitado de estabilização.',
 'Quando x cresce sem parar, termos de menor grau perdem importância em uma razão de polinômios. Em (2x²+1)/(x²+3), divide tudo por x² e obtém 2. Já 1/(x−2) cresce sem limite ao se aproximar de 2 por um lado: a reta x=2 é uma assíntota vertical.',
 'Calcula lim x→+∞ (3x+1)/(x+2).',['Divide numerador e denominador por x.','Obtém (3+1/x)/(1+2/x).','Como 1/x e 2/x tendem a zero, sobra 3/1.'],'3',
 'Qual é lim x→+∞ 5/x?', [['0','O numerador fica fixo e o denominador cresce.'],['5','5 é constante, mas a divisão varia.'],['+∞','A fração diminui quando x cresce.']],
 [['Qual lim x→∞ (2x²+4)/(x²+1)?','Compara coeficientes dos termos de maior grau.','2.'],['Qual é a assíntota vertical de 1/(x−4)?','Iguala o denominador a zero.','x=4.']],'function','Uma assíntota horizontal descreve o valor aproximado quando |x| é grande.');
 add('limites','continuidade','Continuidade e valor intermediário','Quando o gráfico não dá um salto.',
 'Uma função é contínua em a quando f(a) existe, lim x→a f(x) existe e ambos coincidem. Polinômios são contínuos em todos os reais. Se uma função contínua muda de sinal entre a e b, deve zerar em algum ponto intermediário (Bolzano); continuidade é a hipótese indispensável.',
 'f(x)=x²−2 em [1,2]. Por que há uma raiz nesse intervalo?',['f(1)=−1 e f(2)=2: os sinais diferem.','Um polinômio é contínuo nesse intervalo.','Pelo valor intermediário, existe um c entre 1 e 2 com f(c)=0.'],'Existe ao menos uma raiz entre 1 e 2',
 'Uma função contínua tem f(0)=−3 e f(2)=5. O que é garantido?', [['Alguma raiz entre 0 e 2','O valor 0 está entre −3 e 5, então é atingido.'],['Raiz exatamente em 1','O teorema não localiza a raiz com precisão.'],['Uma única raiz','O teorema garante existência, não unicidade.']],
 [['f(x)=x+1 para x≠2 e f(2)=9. É contínua em 2?','Compara lim x→2 f(x) com f(2).','Não; o limite é 3, mas f(2)=9.'],['x³−1 muda de sinal entre 0 e 2?','Avalia as extremidades.','Sim, −1 e 7; há raiz no intervalo.']],'function','Os três requisitos da continuidade precisam valer no mesmo ponto.');
 add('limites','confronto','Propriedades e confronto','Controla um limite por comparação.',
 'Somas, produtos e quocientes de limites obedecem às operações usuais quando os limites existem e o denominador não tende a zero. No teorema do confronto, se g(x)≤f(x)≤h(x) perto de a e g,h tendem ao mesmo L, então f também tende a L. O módulo de sen x é sempre ≤1.',
 'Encontra lim x→0 x² sen(1/x).',['Usa −1≤sen(1/x)≤1 para x≠0.','Multiplica por x²≥0: −x²≤x²sen(1/x)≤x².','Ambas as bordas tendem a 0; pelo confronto, o meio também.'],'0',
 'Se −x²≤f(x)≤x² perto de 0, então lim x→0 f(x)=:', [['0','As duas bordas vão a zero: aplica confronto.'],['1','Nenhuma borda tende a 1.'],['Não é possível concluir','O confronto permite concluir aqui.']],
 [['Limite de (x+2)(x−1) em x→3?','Usa continuidade dos polinômios.','(5)(2)=10.'],['Por que não dividir limites se o denominador tende a 0?','O quociente pode divergir ou exigir outra análise.','A regra de quocientes requer limite do denominador diferente de zero.']],'function','O confronto prende uma função entre duas que têm o mesmo limite.');
 add('limites','formal','Definição formal de limite','Traduz “tão perto quanto quiser” em intervalos.',
 'A definição ε–δ diz: para cada tolerância ε>0 na saída, existe δ>0 tal que 0<|x−a|<δ implica |f(x)−L|<ε. O zero excluído permite que f(a) não exista. Para uma função linear, escolher δ proporcional a ε prova o limite diretamente.',
 'Mostra por que lim x→2 (3x+1)=7.',['A distância até 7 é |(3x+1)−7|=3|x−2|.','Escolhe δ=ε/3.','Se 0<|x−2|<δ, então |f(x)−7|<3δ=ε.'],'O limite é 7',
 'Na definição ε–δ, ε mede a tolerância na:', [['Saída f(x)','|f(x)−L|<ε controla a saída.'],['Entrada x','δ controla a distância |x−a|.'],['Derivada','A derivada não entra nessa definição.']],
 [['Para f(x)=2x e a=1, qual δ serve para ε?','|2x−2|=2|x−1|.','δ=ε/2.'],['Por que aparece 0<|x−a|?','O ponto central pode estar indefinido.','O limite olha os valores perto de a, não exige f(a).']],'function','A tolerância na entrada garante uma tolerância escolhida na saída.');
 add('derivadas','polinomios','Potências, polinômios e raízes','Deriva termo a termo sem pular expoentes.',
 'A regra da potência dá d(xⁿ)/dx=nxⁿ⁻¹. Constantes derivam para zero, e a derivada de uma soma é a soma das derivadas. Para raízes, reescreve √x como x^(1/2), lembrando o domínio e que a derivada de √x só vale para x>0.',
 'Deriva f(x)=3x²−4x+7.',['Deriva 3x² como 6x.','Deriva −4x como −4.','A constante 7 deriva para 0.'],'f′(x)=6x−4',
 'Quanto é d(√x)/dx para x>0?', [['1/(2√x)','√x=x^(1/2); deriva para (1/2)x^(−1/2).'],['2√x','Essa é a derivada de x^(3/2) com outro coeficiente.'],['1/√x','Faltou o fator 1/2.']],
 [['Deriva x⁵−2x³.','Aplica potência em cada termo.','5x⁴−6x².'],['Qual a inclinação de f(x)=x² em x=3?','Deriva e depois substitui.','f′(3)=2·3=6.']],'secant','A inclinação local de x² em x=1 se aproxima de 2.');
 add('derivadas','produto-quociente','Produto e quociente','Combina duas funções que variam.',
 'Para um produto, (fg)′=f′g+fg′: derivar os fatores separadamente e multiplicar as derivadas dá errado. Para um quociente com g≠0, (f/g)′=(f′g−fg′)/g². Se for fácil simplificar a expressão antes, simplifica primeiro.',
 'Deriva h(x)=x² sen x.',['Identifica f=x² e g=sen x.','Usa f′=2x e g′=cos x.','Aplica produto: h′=2x sen x+x² cos x.'],'2x sen x+x² cos x',
 'Derivada de x·eˣ:', [['eˣ+x eˣ','Produto: 1·eˣ+x·eˣ.'],['eˣ','Faltou a variação do segundo fator multiplicado por x.'],['x eˣ','Faltou a derivada do primeiro fator.']],
 [['Deriva x/(x+1).','Usa regra do quociente.','[(x+1)−x]/(x+1)²=1/(x+1)².'],['Deriva (x²+1)x³.','Produto ou expande antes.','5x⁴+3x².']],'secant','As duas parcelas do produto acompanham a variação de cada fator.');
 add('derivadas','trig-deriv','Derivadas trigonométricas','Liga a taxa de variação ao círculo.',
 'Com ângulos em radianos, (sen x)′=cos x e (cos x)′=−sen x. Também (tg x)′=sec²x onde cos x≠0. O radiano é indispensável às fórmulas sem fator de conversão. Com uma expressão interna, aplica também a regra da cadeia.',
 'Deriva y=sen(2x).',['Por fora, derivada de sen u é cos u.','Por dentro, u=2x tem derivada 2.','Multiplica: y′=2cos(2x).'],'2cos(2x)',
 'A derivada de cos x é:', [['−sen x','O cosseno começa diminuindo ao sair de x=0.'],['sen x','Faltou o sinal negativo.'],['−cos x','A derivada troca cosseno por seno.']],
 [['Deriva −3cos x.','Deriva cos x e multiplica pela constante.','3sen x.'],['Inclinação de sen x em x=0?','(sen x)′=cos x.','cos 0=1.']],'circle','A variação de uma coordenada no círculo depende da outra.');
 add('derivadas','exp-log','Exponenciais e logaritmos','Enxerga crescimento proporcional.',
 'A função eˣ é especial porque sua derivada é ela mesma. Para a>0 e a≠1, (aˣ)′=aˣ ln a. Também (ln x)′=1/x para x>0. Composição pede regra da cadeia: (ln g(x))′=g′(x)/g(x) onde g(x)>0.',
 'Deriva f(x)=ln(x²+1).',['O exterior ln u deriva para 1/u.','O interior u=x²+1 deriva para 2x.','Multiplica: f′(x)=2x/(x²+1).'],'2x/(x²+1)',
 'Qual é a derivada de e^(3x)?', [['3e^(3x)','A cadeia multiplica pela derivada de 3x.'],['e^(3x)','Faltou o fator interno 3.'],['3x e^(3x)','A derivada do expoente é 3, não 3x.']],
 [['Deriva ln x em x=2.','A derivada é 1/x.','1/2.'],['Deriva 2ˣ.','Usa aˣ ln a.','2ˣ ln 2.']],'function','eˣ cresce com taxa igual ao próprio valor.');
 add('derivadas','cadeia','Regra da cadeia','Quando uma função mora dentro da outra.',
 'Se y=f(g(x)), a derivada é f′(g(x))g′(x). Primeiro deriva a camada de fora mantendo o interior; depois multiplica pela derivada do interior. Isso resolve potências de expressões, trigonometria composta e muitas substituições em integrais.',
 'Deriva y=(3x²+1)⁴.',['A função externa u⁴ deriva para 4u³.','Mantém u=3x²+1 e deriva u: 6x.','Multiplica: 4(3x²+1)³·6x.'],'24x(3x²+1)³',
 'Derivada de (x²+1)³:', [['6x(x²+1)²','3(x²+1)² multiplicado por 2x.'],['3(x²+1)²','Faltou a derivada interna 2x.'],['3x(x²+1)²','A derivada interna é 2x.']],
 [['Deriva cos(5x).','Deriva fora e multiplica por 5.','−5sen(5x).'],['Deriva √(x²+4).','Escreve potência 1/2.','x/√(x²+4).']],'secant','Cada camada contribui para a taxa de variação final.');
 add('derivadas','implicita','Derivação implícita','Deriva uma curva sem isolar y.',
 'Se x e y aparecem juntos, trata y como função de x. Pela cadeia, a derivada de y² é 2y·y′. Depois agrupa os termos com y′ e isola. Isso permite achar a inclinação de uma circunferência, mesmo quando y não é uma única função global de x.',
 'Em x²+y²=25, qual é dy/dx?',['Deriva ambos os lados: 2x+2y y′=0.','Isola: 2y y′=−2x.','Divide por 2y quando y≠0.'],'y′=−x/y',
 'Na derivação implícita, d(y²)/dx vale:', [['2y·y′','y depende de x: aplica cadeia.'],['2y','Faltou a derivada interna y′.'],['2x','Essa seria parte da derivada de x².']],
 [['Inclinação da circunferência x²+y²=25 em (3,4)?','Usa y′=−x/y.','−3/4.'],['Deriva x+y³=2 em relação a x.','Deriva y³ com a cadeia.','1+3y²y′=0; y′=−1/(3y²).']],'circle','Uma equação pode descrever uma curva mesmo sem isolar y.');
 add('derivadas','diferencial','Diferencial e aproximação linear','Usa a reta tangente para estimar valores.',
 'Para uma pequena variação Δx, vale f(a+Δx)≈f(a)+f′(a)Δx. O diferencial df=f′(x)dx registra essa variação linear. A aproximação melhora perto de a e não é identidade exata em geral. Ela é útil para estimativas e propagação aproximada de erros.',
 'Estima √4,04 usando f(x)=√x perto de 4.',['f(4)=2 e f′(x)=1/(2√x), portanto f′(4)=1/4.','A variação Δx é 0,04.','Aproxima: 2+(1/4)·0,04=2,01.'],'√4,04≈2,01',
 'Se f(2)=5 e f′(2)=3, aproxima f(2,1):', [['5,3','5+3·(0,1)=5,3.'],['8,1','A derivada multiplica a variação, não a nova entrada.'],['5,03','3·0,1 é 0,3.']],
 [['Estima (1,01)² perto de x=1.','f(1)=1, f′(1)=2.','1+2·0,01≈1,02.'],['Qual a unidade de df se f é medida em metros?','f′ mede m/unidade de x; dx traz a unidade de x.','Metros.']],'secant','A reta tangente aproxima a curva perto do ponto escolhido.');
 add('derivadas','taxas','Taxas relacionadas','Conecta grandezas que mudam no tempo.',
 'Escreve primeiro uma equação geométrica entre as grandezas, deriva em relação ao tempo t e só depois substitui os valores do instante. Se V=(4/3)πr³, então dV/dt=4πr²·dr/dt. O fator dr/dt surge pela regra da cadeia.',
 'Um círculo tem raio crescendo 2 cm/s. Qual dA/dt quando r=3 cm?',['Área A=πr².','Deriva em t: dA/dt=2πr·dr/dt.','Substitui r=3 e dr/dt=2.'],'12π cm²/s',
 'Se A=πr², a taxa dA/dt é:', [['2πr·dr/dt','Deriva r(t)² usando a cadeia.'],['2πr','Isso é dA/dr; falta dr/dt.'],['π(dr/dt)²','A derivada não eleva a taxa ao quadrado.']],
 [['Cubo de lado s: dV/dt se s=2 m e ds/dt=1 m/s?','V=s³; deriva em t.','3s² ds/dt=12 m³/s.'],['Se dr/dt é negativo, dA/dt para A=πr² e r>0 é...','2πr tem sinal positivo.','Negativo.']],'circle','Uma relação geométrica transmite a variação de uma grandeza à outra.');
 add('derivadas','graficos','Sinais, concavidade e gráficos','Lê primeira e segunda derivadas.',
 'Quando f′>0 a função cresce; quando f′<0, decresce. Um ponto crítico é candidato a extremo, mas precisa de análise de sinal ou concavidade. A segunda derivada f″>0 indica concavidade para cima, e f″<0 para baixo. Ponto de inflexão requer mudança de concavidade.',
 'Analisa f(x)=x²: crescimento e concavidade.',['f′(x)=2x: negativo antes de 0 e positivo depois.','f″(x)=2>0 em todo ponto.','A função decresce até 0, cresce depois e é côncava para cima.'],'Mínimo em 0; concavidade para cima',
 'Se f′ muda de negativo para positivo em a, há:', [['Mínimo local','Antes decresce e depois cresce.'],['Máximo local','Máximo exige mudança de positivo para negativo.'],['Assíntota vertical','A mudança de sinal não implica assíntota.']],
 [['Para f(x)=−x², qual concavidade?','Deriva duas vezes.','f″=−2: para baixo.'],['Se f′(x)>0 em todo um intervalo, o que acontece?','A taxa local é positiva.','f é crescente nesse intervalo.']],'parabola','O sinal de f′ controla crescimento; o de f″ controla concavidade.');
 add('derivadas','taylor','Aproximações de Taylor','Melhora a reta tangente com mais termos.',
 'Uma aproximação perto de a usa f(a)+f′(a)(x−a)+f″(a)(x−a)²/2+… . A aproximação linear é o primeiro degrau; termos de ordem maior capturam a curvatura. Para eˣ perto de 0, 1+x+x²/2 é uma aproximação de segunda ordem.',
 'Aproxima e^0,1 até ordem 2 em x=0.',['Em 0, e⁰=1 e todas as derivadas valem 1.','Usa 1+x+x²/2.','Substitui x=0,1: 1+0,1+0,005.'],'≈1,105',
 'Qual o termo quadrático de eˣ perto de 0?', [['x²/2','f″(0)=1 e divide por 2!.'],['x²','Falta dividir pelo fatorial 2.'],['2x²','O coeficiente está ampliado quatro vezes.']],
 [['Aproxima cos x em x≈0 até ordem 2.','cos 0=1, primeira derivada em 0=0, segunda=−1.','1−x²/2.'],['A aproximação linear de f em a usa o quê?','Valor e primeira derivada no ponto.','f(a)+f′(a)(x−a).']],'function','Os termos corrigem gradualmente a reta tangente.');
 add('derivadas','lhopital','Regra de L’Hôpital','Testa limites 0/0 e ∞/∞ com cuidado.',
 'Quando numerador e denominador tendem ambos a 0 ou ambos a ±∞, e as condições de derivabilidade valem, podes estudar o limite da razão das derivadas. Primeiro confirma a forma indeterminada; aplicar a regra a um quociente comum pode produzir resposta errada. Não deriva o quociente inteiro.',
 'Calcula lim x→0 sen x/x.',['Numerador e denominador tendem a 0.','Deriva separadamente: (sen x)′=cos x e (x)′=1.','O novo quociente tende a cos 0/1=1.'],'1',
 'Para usar L’Hôpital diretamente, o quociente deve ter forma:', [['0/0 ou ∞/∞','São as duas formas previstas diretamente pela regra.'],['3/0','Esse quociente não é indeterminação do tipo exigido.'],['0/5','Esse limite já vale 0 sem a regra.']],
 [['Lim x→0 (eˣ−1)/x?','Confirma 0/0 e deriva cada parte.','1.'],['Lim x→∞ x/eˣ?','Confirma ∞/∞ e deriva; podes repetir se necessário.','0.']],'function','A regra só entra após identificar uma das formas permitidas.');
 add('integrais','indefinidas','Integrais indefinidas','Encontra famílias de primitivas.',
 'Uma integral indefinida representa todas as funções cuja derivada é o integrando: ∫f(x)dx=F(x)+C. A constante C importa porque derivar qualquer constante dá zero. Para n≠−1, ∫xⁿ dx=xⁿ⁺¹/(n+1)+C; para 1/x usa ln|x|+C em intervalos que não incluem 0.',
 'Calcula ∫3x² dx.',['Procura uma função que derive para 3x².','x³ tem derivada 3x².','Acrescenta a constante de integração.'],'x³+C',
 'Qual é ∫1/x dx em um intervalo sem zero?', [['ln|x|+C','A derivada de ln|x| é 1/x para x≠0.'],['x²/2+C','Derivar essa expressão dá x.'],['1+C','A derivada seria zero.']],
 [['Integra 4x³.','Sobe o expoente e divide pelo novo expoente.','x⁴+C.'],['Derivada de uma primitiva F(x)+C?','A constante desaparece.','F′(x)=f(x).']],'rectangles','Diferentes constantes dão primitivas com a mesma derivada.');
 add('integrais','partes','Integração por partes','Desfaz a regra do produto.',
 'Da derivada de uv vem ∫u dv=uv−∫v du. Escolhe u para simplificar ao derivar e dv para integrar facilmente. Em ∫x eˣ dx, u=x e dv=eˣ dx, então du=dx e v=eˣ. Verifica derivando o resultado.',
 'Calcula ∫x eˣ dx.',['Escolhe u=x, dv=eˣdx; du=dx, v=eˣ.','Aplica uv−∫vdu: x eˣ−∫eˣdx.','Integra o restante.'],'x eˣ−eˣ+C',
 'Em ∫x eˣdx com u=x, o que é du?', [['dx','Derivada de x é 1; du=1·dx.'],['x dx','Isso mantém x sem derivá-lo.'],['eˣdx','Esse é o dv escolhido.']],
 [['Calcula ∫x cos x dx.','u=x, dv=cos x dx.','x sen x+cos x+C.'],['Qual operação confere a resposta de uma integral indefinida?','Volta ao integrando.','Derivar a primitiva.']],'function','A escolha útil reduz a integral restante.');
 add('integrais','subst-trig','Substituição trigonométrica','Reconhece raízes de quadrados.',
 'Se aparece √(a²−x²), a troca x=a sen θ usa 1−sen²θ=cos²θ. Para √(a²+x²), x=a tg θ usa 1+tg²θ=sec²θ. Escolhe um intervalo de θ coerente com a raiz positiva e devolve o resultado a x ao final. É uma técnica posterior à substituição comum.',
 'Como simplificar √(9−x²) se x=3sen θ e cos θ≥0?',['Substitui x²=9sen²θ.','Fatora: √(9(1−sen²θ)).','Usa 1−sen²θ=cos²θ e cos θ≥0.'],'3cos θ',
 'Qual troca ajuda em √(a²−x²)?',[['x=a sen θ','A identidade 1−sen²θ=cos²θ elimina a raiz.'],['x=a/θ','Não produz a identidade trigonométrica.'],['x=a eˣ','A exponencial não simplifica a diferença de quadrados.']],
 [['Se x=2sen θ, quanto vale dx?','Deriva x em relação a θ.','2cos θ dθ.'],['Para √(4+x²), que troca é natural?','Usa 1+tg²θ=sec²θ.','x=2tg θ.']],'circle','A identidade trigonométrica transforma a raiz em um quadrado.');
 add('integrais','fracoes','Frações parciais','Quebra uma razão racional em partes integráveis.',
 'Se o grau do numerador for menor que o do denominador, fatora o denominador e separa a fração em parcelas simples. Para raízes lineares distintas, tenta A/(x−a)+B/(x−b). Se a fração for imprópria, divide polinômios antes. Depois integra cada parcela, respeitando os valores excluídos do domínio.',
 'Integra 1/[(x−1)(x+1)] dx.',['Escreve A/(x−1)+B/(x+1); 1=A(x+1)+B(x−1).','Em x=1, A=1/2; em x=−1, B=−1/2.','Integra cada termo: (1/2)ln|x−1|−(1/2)ln|x+1|+C.'],'(1/2)ln|(x−1)/(x+1)|+C',
 'Para integrar (2x+1)/(x²−1), uma primeira ideia útil é:', [['Fatorar x²−1','(x−1)(x+1) permite frações parciais.'],['Tratar x²−1 como constante','O denominador depende de x.'],['Apagar o denominador','Isso altera a função.']],
 [['Fatora x²−4.','Diferença de quadrados.','(x−2)(x+2).'],['Qual primitiva de 1/(x−3)?','Reconhece 1/u com u=x−3.','ln|x−3|+C.']],'function','Decompõe a fração para integrar termos mais simples.');
 add('integrais','improprias','Integrais impróprias','Integra mesmo com infinito ou singularidade.',
 'Se o intervalo é infinito, define a integral como limite de integrais até b e deixa b→∞. Se o integrando explode em um extremo, aproxima esse extremo por um limite. A integral converge apenas quando o limite é finito. A família ∫₁∞ 1/xᵖ dx converge para p>1 e diverge para p≤1.',
 'A integral ∫₁∞ 1/x² dx converge?',['Escreve ∫₁ᵇ x⁻² dx e considera b→∞.','Uma primitiva é −1/x; avalia −1/b+1.','O limite de 1−1/b é 1.'],'Sim, vale 1',
 '∫₁∞ 1/x dx:', [['Diverge','A primitiva ln x cresce sem limite.'],['Vale 1','Isso é ∫₁∞ 1/x² dx.'],['Vale 0','A área positiva não tende a zero.']],
 [['∫₁∞ 1/x³ dx?','Primitiva −1/(2x²), depois limite.','1/2.'],['Quando uma integral imprópria converge?','Olha o valor do limite definidor.','Quando o limite é finito.']],'rectangles','Uma área sobre intervalo infinito pode ainda ser finita.');
 add('integrais','entre-curvas','Área entre curvas','Subtrai a função de baixo da de cima.',
 'Em um intervalo onde f(x)≥g(x), a área entre gráficos é ∫[f(x)−g(x)]dx. Primeiro determina os pontos de encontro e verifica qual curva está acima. Se elas trocam de posição, divide o intervalo. A área geométrica nunca deve sair negativa.',
 'Área entre y=x e y=x² de 0 a 1.',['No intervalo (0,1), x≥x².','Integra ∫₀¹(x−x²)dx.','Avalia [x²/2−x³/3]₀¹=1/2−1/3.'],'1/6 unidade²',
 'Se f(x)≥g(x) em [a,b], a área é:', [['∫ₐᵇ(f−g)dx','Altura de cada faixa = curva de cima menos curva de baixo.'],['∫ₐᵇ(g−f)dx','Isso daria valor não positivo.'],['f(b)−g(a)','Valores isolados não acumulam área.']],
 [['Encontra os encontros de y=x e y=x².','Resolve x=x².','x=0 e x=1.'],['Se duas curvas cruzam dentro do intervalo, o que fazer?','A curva de cima pode mudar.','Divide a integral no ponto de cruzamento.']],'rectangles','Fatia a região em tiras de altura “cima menos baixo”.');
 add('integrais','volumes','Volumes de revolução','Soma seções transversais de um sólido.',
 'Se a seção perpendicular ao eixo tem área A(x), o volume é ∫ₐᵇ A(x)dx. Ao girar uma região sob f(x)≥0 em torno do eixo x, os discos têm A(x)=π[f(x)]². Havendo furo, usa anéis: π(R²−r²). Cascas cilíndricas são alternativa para outro eixo.',
 'Gira y=x, 0≤x≤1, em torno do eixo x. Qual o volume?',['Cada disco tem raio x e área πx².','Integra V=π∫₀¹x²dx.','Avalia π[x³/3]₀¹.'],'π/3 unidade³',
 'Em discos em torno do eixo x, qual área da seção de raio r?', [['πr²','A seção é um círculo de raio r.'],['2πr','Isso é o perímetro do círculo.'],['πr','Falta elevar o raio ao quadrado.']],
 [['Gira y=2 de x=0 a x=3 no eixo x.','Cilindro de raio 2 e altura 3.','12π.'],['Entre raios R=3 e r=1, área do anel?','Subtrai as áreas dos círculos.','π(9−1)=8π.']],'rectangles','Discos muito finos somam volumes ao longo do eixo.');
 add('integrais','comprimento','Comprimento de arco','Soma pequenos segmentos da curva.',
 'Para y=f(x) derivável em [a,b], o comprimento é ∫ₐᵇ√(1+[f′(x)]²)dx. A fórmula vem de Pitágoras aplicado a trechos minúsculos: ds≈√(dx²+dy²). A integrabilidade e a regularidade da curva importam; escolhe uma parametrização adequada se o gráfico vertical falhar.',
 'Comprimento da reta y=2x entre x=0 e x=3.',['Deriva f′(x)=2.','O integrando é √(1+2²)=√5.','Integra a constante de 0 a 3.'],'3√5 unidades',
 'Se f′(x)=0 em [0,4], o comprimento do gráfico é:', [['4','√(1+0²)=1 e ∫₀⁴ 1dx=4.'],['0','O gráfico horizontal ainda tem extensão.'],['16','Não se eleva o intervalo ao quadrado.']],
 [['Comprimento de y=x de 0 a 1?','f′=1.','√2.'],['Por que aparece √(1+[f′]²)?','Usa Pitágoras em dx e dy.','ds/dx=√(1+(dy/dx)²).']],'triangle','Pitágoras em segmentos curtos leva ao comprimento total.');
 add('integrais','massa-media','Centro de massa e valor médio','Usa integrais como médias ponderadas.',
 'Para densidade linear ρ(x) em [a,b], a massa é m=∫ρ(x)dx e a posição do centro de massa é x̄=(1/m)∫xρ(x)dx. Para uma função f, o valor médio no intervalo é (1/(b−a))∫f(x)dx. Uma média pondera contribuições pela posição ou pelo tamanho do intervalo.',
 'Uma barra de 0 a 2 m tem densidade uniforme. Onde está o centro?',['Com densidade ρ constante, m=∫₀²ρdx=2ρ.','Momento =∫₀²xρdx=ρ[x²/2]₀²=2ρ.','Divide momento por massa: x̄=2ρ/(2ρ).'],'x̄=1 m',
 'Valor médio de f(x)=x em [0,2]:', [['1','(1/2)∫₀²x dx=(1/2)·2=1.'],['2','Esse é o valor na borda direita, não a média.'],['1/2','Faltou avaliar a integral no intervalo todo.']],
 [['Massa de barra de 0 a 3 com ρ=2 kg/m?','Integra densidade constante.','6 kg.'],['Centro de massa de [0,L] uniforme?','Simetria ou momento/massa.','L/2.']],'rectangles','A integral soma pesos; o momento considera também a posição.');
 const order='triangulos razoes circulo funcoes-trig identidades coordenadas vetores retas parabola curvas funcoes dominio origens aproximacao laterais infinito continuidade indeterminacao confronto formal derivada polinomios regras produto-quociente trig-deriv exp-log cadeia implicita diferencial taxas otimizacao graficos taylor lhopital area fundamental indefinidas substituicao partes subst-trig fracoes improprias entre-curvas volumes comprimento massa-media aplicacoes'.split(' ');
 data.lessons.push(...extra);
 data.lessons.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
})();
