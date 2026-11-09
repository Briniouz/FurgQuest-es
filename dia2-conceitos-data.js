// Fichas autorais. A dificuldade é estimada para estudo. A letra confere o item no acervo.
(() => {
 const card=(id,title,cue,formula,idea,lesson,exam,from)=>({id,title,cue,formula,idea,lesson,exam,from});
 const trail=(id,title,rows)=>({id,title,rows});
 globalThis.FURG_DIA2_CONCEPTS={
  fisica:[
   trail('mecanica','Energia mecânica',[
    [card('mecanica','Energia mecânica','Altura, movimento ou deformação no mesmo sistema.','Eₘ = Ec + Eₚg + Eₚₑ',
     'Identifica quais parcelas existem em cada posição. A soma se conserva se atuam só forças conservativas ou se as demais fazem trabalho total nulo. No salto com vara, acompanha a passagem do movimento para a deformação e depois para a altura.',
     'energia',['enem-2011-86','C',2])],
    [card('gravitacional','Potencial gravitacional','Tem altura ou diferença de nível?','Eₚg = mgh',
     'Escolhe um nível zero para h. Perto da superfície terrestre, uma massa de 2 kg elevada em 3 m ganha 60 J se g = 10 m/s². Em uma usina, essa variação pode ser calculada para a massa de água que passa por segundo.',
     'energia',['enem-2016-47','C',3],['mecanica']),
     card('cinetica','Energia cinética','Tem velocidade ou mudança de rapidez?','Ec = mv²/2',
     'Usa massa em kg e rapidez em m/s. Se a rapidez dobra, a energia cinética quadruplica. Em um gráfico de salto, procura onde a rapidez zera e onde ela é máxima.',
     'energia',['enem-2017-108','C',3],['mecanica']),
     card('elastica','Potencial elástica','Tem mola esticada ou comprimida e constante k?','Eₚₑ = kx²/2',
     'Mede x em relação ao comprimento natural, em metros. Em uma mola ideal, dobrar a deformação quadruplica a energia armazenada. No lançador, liga essa energia à energia cinética na saída.',
     'energia',['enem-2018-131','B',3],['mecanica'])]
   ]),
   trail('potencia','Potência e rendimento',[
    [card('potencia','Potência média','Tem energia transferida e intervalo de tempo?','P = E/Δt',
     'É a energia transferida por segundo. 600 J em 3 s equivalem a 200 W. Quando a energia é trabalho, usa W/Δt, com W representando o trabalho em joules.',
     'consumo',['enem-2009-35','A',3]),
     card('rendimento','Rendimento','Tem potência útil e potência recebida?','η = (Pútil/Ptotal) × 100%',
     'Divide o que foi aproveitado pelo que entrou. Se um motor recebe 500 W e entrega 400 W úteis, o rendimento é 80%. Dá para usar energias correspondentes medidas no mesmo intervalo.',
     'consumo',['enem-2022-93','B',3],['potencia'])]
   ]),
   trail('ondas','Luz, som e calor',[
    [card('intensidade','Intensidade de uma onda','Tem potência distribuída por uma área?','I = P/A · unidade W/m²',
     'Usa a potência que atravessa a área. Para uma onda uniforme, toma A perpendicular à propagação. Se a emissão se espalha por uma área maior com a mesma potência, a intensidade cai.',
     'ondas',['enem-2023-113','A',3])],
    [card('luz','Luz','Tem espectro, comprimento de onda ou faixa visível?','Onda eletromagnética',
     'A luz visível é uma faixa do espectro eletromagnético e se propaga no vácuo. Em um gráfico de emissão, compara a faixa que o enunciado quer com a faixa em que a fonte emite.',
     'ondas',['enem-2017-101','E',2],['intensidade']),
     card('som','Som','Tem alto-falante, distância, frequência ou nível sonoro?','Onda mecânica',
     'O som precisa de meio material. Intensidade mede potência por área em W/m². Nível sonoro em decibéis é uma escala logarítmica. Lê a unidade e a frequência antes de comparar curvas.',
     'ondas',['enem-2016-55','C',3],['intensidade']),
     card('calor','Calor por radiação','Tem fonte quente e absorção sem contato direto?','Radiação térmica → energia transferida',
     'Calor é energia em trânsito por diferença de temperatura. Por radiação, a transferência ocorre via ondas eletromagnéticas. Condução e convecção são outros mecanismos. Uma superfície escura pode absorver mais radiação incidente.',
     'calor',['enem-2020-130','A',2],['intensidade'])]
   ]),
   trail('trabalho','Forças, trabalho e teorema',[
    [card('trabalho','Trabalho de uma força','Tem força constante e deslocamento? Olha o ângulo.','W = F · d · cos θ',
     'θ é o ângulo entre a força e o deslocamento. A componente paralela faz trabalho. Se a força é perpendicular, W = 0. O trabalho do peso ao descer uma altura Δh é mgΔh.',
     'forcas',['enem-2019-121','B',3]),
     card('forca-resultante','Força resultante','Tem várias forças? Projeta em eixos.','Fᵣₑₛ = Σ F (soma vetorial)',
     'Soma vetorialmente. Se uma força aponta para cima e para a direita, separa a contribuição em cada eixo. Por exemplo, normal e atrito podem combinar para dar uma força de contato oblíqua.',
     'forcas',['enem-2024-121','A',2],[])],
    [card('trabalho-total','Trabalho total ou resultante','Quer o efeito conjunto das forças?','Wᵣₑₛ = Σ W = Fᵣₑₛ · d · cos θ',
     'Os trabalhos são escalares com sinal. Soma os positivos, negativos e nulos. Se a resultante é constante, usar o produto escalar com ela dá o mesmo total. Em um choque, a perda de energia cinética se lê pela rapidez antes e depois.',
     'forcas',['enem-2022-105','A',3],['trabalho','forca-resultante']),
     card('teorema','Teorema da Energia Cinética','Tem trabalho resultante ou rapidez inicial e final?','Wᵣₑₛ = ΔEc = Ec final − Ec inicial',
     'Trabalho resultante positivo aumenta a energia cinética. Negativo diminui. No exemplo interativo, compara o cálculo por força com o cálculo pela resultante e descobre a rapidez final.',
     'energia',['enem-2015-64','B',2],['trabalho-total'])]
   ]),
   trail('impulso','Depois do teorema · colisões',[
    [card('impulso','Impulso','Tem força média, duração ou velocidade com mudança de sentido?','J = Fméd · Δt = Δp',
     'Em choques, usa o sinal de cada velocidade no eixo escolhido. Mesmo impulso pode vir de forças com picos diferentes. Em um gráfico de aceleração, compara os picos quando as massas são iguais.',
     'colisoes',['enem-2017-99','B',2]),
     card('momento','Quantidade de movimento','Tem dois corpos interagindo e impulso externo desprezível?','p = m · v  |  Σp inicial = Σp final',
     'Calcula o momento de cada corpo com sinal e soma no mesmo eixo. A quantidade de movimento do sistema pode se conservar mesmo com perda de energia cinética.',
     'colisoes',['enem-2016-77','C',3],['impulso'])]
   ])
  ],
  matematica:[
   trail('comparar','Proporções, escalas e porcentagem',[
    [card('proporcao','Proporcionalidade','Uma quantidade é dada por unidade de outra?','razão = quantidade/unidade de referência',
     'Marca o que fica fixo e mantém as unidades. Em problemas de vazão, divide o volume pelo tempo para comparar as taxas de enchimento.',
     'proporcao',['enem-2024-160','D',2]),
     card('escala','Escala e áreas','Tem desenho, maquete ou mudança de unidade?','Escala linear 1:n → escala de área 1:n²',
     'Converte as medidas para a mesma unidade antes de aplicar a escala. Se um lado fica dez vezes menor, uma área correspondente fica cem vezes menor.',
     'proporcao',['enem-2024-151','E',2]),
     card('percentual','Porcentagem da parte','O total mudou no meio do problema?','porcentagem = (parte/total) × 100%',
     'Refaz a razão com o total da etapa. Se uma mistura homogênea perde 1/5 do volume, ela perde 1/5 de cada componente. Repor água muda a concentração.',
     'porcentagens',['enem-2025-140','E',3])]
   ]),
   trail('modelar','Funções e leitura de dados',[
    [card('afim','Função afim','Tem taxa fixa por unidade e um valor de partida?','y = ax + b',
     'O coeficiente a mede quanto y muda quando x aumenta uma unidade. b é o valor em x = 0. Com duas observações, compara as diferenças para isolar a taxa.',
     'equacoes',['enem-2025-162','B',3]),
     card('quadratica','Máximo de uma quadrática','Tem produto de medidas ligadas por uma restrição?','y = ax² + bx + c · xᵥ = −b/(2a)',
     'Expressa os dois lados por uma única variável. Se a < 0, o vértice indica o máximo, desde que xᵥ esteja no intervalo possível do problema.',
     'crescimento',['enem-2024-146','B',3]),
     card('media','Média aritmética','Mesma soma dividida por quantidades diferentes?','média = soma/n',
     'Guarda a soma como incógnita e monta uma média para cada número de valores. Compara as duas expressões antes de calcular.',
     'estatistica',['enem-2024-137','B',2])]
   ]),
   trail('medir','Geometria e contagem',[
    [card('area','Área de um setor','Tem abertura em graus e raio de alcance?','A = (θ/360°) · πr²',
     'O setor ocupa a fração θ/360° de um círculo. Se a cobertura for recortada por paredes ou obstáculos, conta apenas a região realmente coberta.',
     'geometria-plana',['enem-2024-155','E',3]),
     card('volume','Volume por diferença','Tem sólido com parte retirada ou espessura?','Vcilindro = πr²h',
     'Converte as medidas e calcula o volume da peça cheia. Subtrai as partes vazias. A mesma unidade de comprimento deve aparecer nas três dimensões.',
     'volumes',['enem-2025-177','B',3]),
     card('probabilidade','Probabilidade em etapas','Tem dado, sorteio ou eventos com várias saídas?','P = casos favoráveis/casos possíveis',
     'A razão vale quando os resultados contados são equiprováveis. Descreve o que acontece em cada etapa e separa eventos incompatíveis para somar suas chances.',
     'probabilidade',['enem-2025-178','E',3])]
   ])
  ],
  quimica:[
   trail('materiais','Misturas, moléculas e grupos',[
    [card('cromatografia','Cromatografia','Uma substância percorre mais papel do que outra?','Fase móvel ↔ fase estacionária',
     'A substância que interage mais com a fase estacionária tende a migrar menos. A polaridade da fase e do soluto ajuda a prever essas interações.',
     'materia',['enem-2017-130','D',3]),
     card('interacoes','Interações e solubilidade','Tem moléculas semelhantes com grupos polares diferentes?','Grupos polares favorecem interação com água',
     'Compara onde aparecem grupos capazes de formar ligações de hidrogênio. Considera também a parte apolar da molécula, pois a solubilidade depende do conjunto.',
     'atomos',['enem-2025-134','B',2]),
     card('organica','Grupos funcionais','Tem fórmula estrutural e pergunta qual grupo reage?','Lê o grupo e o átomo diretamente ligado',
     'Identifica o grupo pelo desenho de suas ligações. Em uma reação ácido-base de Brønsted-Lowry, procura o grupo capaz de doar próton à base.',
     'organica',['enem-2024-94','A',3])]
   ]),
   trail('quantidades','Mol, concentração e pH',[
    [card('estequiometria','Mol e estequiometria','Tem massa de reagente ou produto e uma reação?','n = m/M · usa os coeficientes da reação',
     'Balanceia, converte a massa para mol e usa a proporção da equação. Para voltar a gramas, multiplica a quantidade de matéria pela massa molar.',
     'reacoes',['enem-2025-131','E',3]),
     card('concentracao','Concentração em solução','O dado é por litro e o pedido é massa total?','C = m/V · concentração molar = n/V',
     'Descobre o volume da solução e confere se a concentração foi dada em g/L ou mol/L. A massa de um elemento dissolvido e a massa do sal que o contém são diferentes.',
     'solucoes',['enem-2024-97','D',3]),
     card('ph','pH e íons H⁺','Tem uma tabela de pH e um equilíbrio com H⁺?','pH = −log₁₀[H⁺] em solução diluída',
     'Quanto menor o pH, maior a concentração de H⁺. Lê se o H⁺ é reagente ou produto para prever a direção favorecida pela mudança.',
     'ph',['enem-2024-118','D',3])]
   ]),
   trail('reacoes','Energia, equilíbrio e pilhas',[
    [card('entalpia','Variação de entalpia','Tem reações conhecidas que podem ser somadas?','ΔH = ΣΔH das etapas',
     'Monta a reação pedida cancelando espécies intermediárias. Inverter uma reação inverte o sinal de ΔH. Multiplicar seus coeficientes multiplica ΔH pelo mesmo fator.',
     'termoquimica',['enem-2017-124','B',3]),
     card('equilibrio','Deslocar o equilíbrio','O sistema já está em equilíbrio e algo muda?','Perturbação → compara reagentes e produtos',
     'Adicionar um reagente ou retirar um produto pode favorecer o sentido direto. Ao variar pressão, compara os mols gasosos. Catalisador acelera a chegada ao equilíbrio.',
     'termoquimica',['enem-2025-117','D',3]),
     card('pilha','Tensão de uma pilha','Tem tabela com potenciais de redução?','ΔE° = E°cátodo − E°ânodo',
     'Marca quem reduz no cátodo e quem oxida no ânodo. Usa os potenciais de redução da tabela. O valor em volts permanece o mesmo ao balancear os elétrons.',
     'eletroquimica',['enem-2025-124','B',3])]
   ])
  ],
  biologia:[
   trail('celula','Célula e metabolismo',[
    [card('organelas','Organelas e funções','Algo deixou de ser degradado e se acumulou na célula?','Lisossomo → digestão intracelular',
     'Pensa na tarefa afetada antes de nomear a organela. Falha de uma enzima degradadora pode causar acúmulo do substrato dentro dos lisossomos.',
     'celula',['enem-2025-103','A',2]),
     card('enzimas','Enzimas e metabolismo','O procedimento mudou a atividade de uma proteína?','Enzima + substrato → produto',
     'Enzimas aceleram reações. Relaciona cada etapa ao substrato e ao produto. Calor intenso pode desnaturar proteínas e reduzir a velocidade da reação.',
     'metabolismo',['enem-2024-102','A',2]),
     card('fotossintese','Etapas da fotossíntese','A mudança ocorre na captação de luz ou na fixação de carbono?','Luz → transporte de elétrons → ATP e NADPH',
     'Nas reações luminosas, pigmentos excitam elétrons. ATP e NADPH fornecem energia e poder redutor para o ciclo de Calvin. Identifica a etapa alterada diretamente.',
     'metabolismo',['enem-2017-94','B',3])]
   ]),
   trail('heranca','Herança, DNA e defesa',[
    [card('heredograma','Herança ligada ao X','Tem heredograma e diferença de padrão entre os sexos?','O pai passa seu X às filhas e seu Y aos filhos',
     'Segue os cromossomos em cada cruzamento. Para um caráter recessivo ligado ao X, um homem com o alelo no seu único X manifesta o caráter.',
     'heranca',['enem-2024-112','B',3]),
     card('pcr','PCR e desnaturação','Tem sequências de DNA aquecidas para separar as fitas?','Mais pares G–C tendem a aumentar a estabilidade',
     'A primeira etapa da PCR separa as fitas com calor. Para comparar trechos de tamanho semelhante, observa a proporção de G–C e de A–T.',
     'biotecnologia',['enem-2017-125','C',2]),
     card('imunidade','Antígeno, vacina e resposta','O enunciado pergunta o que um antígeno induz?','Antígeno → resposta adaptativa',
     'A vacina apresenta um antígeno ou instruções para produzi-lo. O corpo pode produzir anticorpos específicos e células de memória. Identifica a resposta do organismo.',
     'imunidade',['enem-2024-126','A',2])]
   ]),
   trail('ecologia','Populações e ecossistemas',[
    [card('especiacao','Isolamento e especiação','Uma barreira dividiu a população e depois desapareceu?','Isolamento geográfico → divergência → possível isolamento reprodutivo',
     'A separação pode reduzir o fluxo gênico. Para saber se houve especiação, verifica se, após o reencontro, ainda há cruzamento com descendentes férteis.',
     'evolucao',['enem-2020-101','C',3]),
     card('biomagnificacao','Biomagnificação','O poluente persistente aparece na cadeia alimentar?','Concentração pode subir nos níveis tróficos',
     'Distingue o acúmulo no indivíduo da amplificação ao longo da cadeia. Um predador ingere muitas presas e pode concentrar mais substâncias persistentes nos tecidos.',
     'cadeias',['enem-2017-111','E',2]),
     card('eutrofizacao','Esgoto e oxigênio','Tem matéria orgânica, DBO e oxigênio dissolvido?','Mais decomposição → maior consumo de O₂',
     'DBO indica quanto oxigênio os microrganismos demandam para degradar matéria orgânica. Compara as curvas do gráfico e localiza o trecho em que a carga orgânica começa a afetar a água.',
     'ecossistemas',['enem-2020-119','A',3])]
   ])
  ]
 };
})();
