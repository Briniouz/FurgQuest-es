'use strict';
(() => {
 const openStax='https://openstax.org/books/biology-2e/pages/';
 const sources={
  celula:[['Células eucarióticas','4-3-eukaryotic-cells'],['Sistema de endomembranas','4-4-the-endomembrane-system-and-proteins']],
  heranca:[['Leis da herança','12-3-laws-of-inheritance'],['Ligação genética','13-1-chromosomal-theory-and-genetic-linkage']],
  embriologia:[['Desenvolvimento embrionário inicial','43-6-fertilization-and-early-embryonic-development']],
  evolucao:[['Entendendo a evolução','18-1-understanding-evolution'],['Evolução das populações','19-1-population-evolution']],
  cadeias:[['Ciclos biogeoquímicos','46-3-biogeochemical-cycles']],
 };
 const pedigrees={
  recessivo:{
   title:'Família 1 · modelo autossômico recessivo',
   description:'I-1 e I-2 não manifestam o traço. Seus filhos são II-1, uma filha que manifesta o traço, e II-2, um filho que não o manifesta.',
   people:[['I-1','quadrado',false],['I-2','círculo',false],['II-1','círculo',true],['II-2','quadrado',false]],
  },
  ligadoX:{
   title:'Família 2 · modelo recessivo ligado ao X',
   description:'I-1 e I-2 não manifestam o traço. Seus filhos são II-1, um filho que manifesta o traço, e II-2, uma filha que não o manifesta.',
   people:[['I-1','quadrado',false],['I-2','círculo',false],['II-1','quadrado',true],['II-2','círculo',false]],
  },
 };
 const modules={
  celula:[
   {title:'Organelas essenciais', paragraphs:[
    'Quando a questão der uma função, localiza a estrutura e explica por que ela consegue desempenhá-la. Por exemplo, as cristas da mitocôndria são dobras da membrana interna e oferecem mais superfície para os componentes que produzem ATP na respiração aeróbia.',
    'O citosol é a fase fluida onde ocorrem reações como a glicólise. O citoplasma inclui o citosol e as estruturas fora do núcleo. Membrana plasmática e parede celular também aparecem nas questões, mas são estruturas de delimitação e sustentação.',
   ], table:{caption:'Funções e pistas para reconhecer as estruturas celulares', headers:['Estrutura','Função principal','Pista na questão'], rows:[
    ['Núcleo e nucléolo','O núcleo abriga o DNA nuclear. No nucléolo são produzidos muitos RNAs ribossômicos e começam a ser montadas as subunidades dos ribossomos.','Expressão de genes ou produção de ribossomos.'],
    ['Ribossomo','Lê o RNA mensageiro e monta proteínas. Existe também em procariontes.','Tradução, códons ou ligação de aminoácidos.'],
    ['Retículo endoplasmático rugoso (RER)','Recebe proteínas em produção, como as destinadas à secreção e muitas proteínas de membrana. Tem ribossomos associados.','Célula que secreta enzimas digestivas ou hormônios proteicos.'],
    ['Retículo endoplasmático liso (REL)','Produz lipídios. Em células especializadas, participa da detoxificação ou do armazenamento de cálcio.','Hormônios esteroides ou liberação de cálcio no músculo.'],
    ['Complexo de Golgi','Modifica e separa produtos do retículo e os envia em vesículas para seus destinos.','Empacotamento, secreção ou direcionamento de proteínas.'],
    ['Lisossomo','Degrada material em meio ácido com enzimas, incluindo partes da própria célula durante a autofagia.','Digestão intracelular ou reciclagem de uma organela danificada.'],
    ['Peroxissomo','Oxida certas moléculas e controla o peróxido de hidrogênio. A catalase pode convertê-lo em água e oxigênio.','Catalase, H₂O₂ ou degradação de certos ácidos graxos.'],
    ['Mitocôndria','Realiza etapas da respiração aeróbia. A membrana interna abriga a cadeia respiratória e a ATP sintase.','Consumo de oxigênio ou alta demanda de ATP.'],
    ['Cloroplasto','Realiza fotossíntese em plantas e algas. Nos tilacoides ocorrem as reações dependentes de luz. No estroma ocorre o ciclo de Calvin.','Clorofila, captura de luz e fixação de CO₂.'],
    ['Vacúolo central','Armazena substâncias e ajuda a sustentar a célula vegetal pela pressão de turgor.','Perda de água, murcha ou sustentação de tecidos vegetais.'],
    ['Citoesqueleto e centríolos','Filamentos organizam a forma, o transporte interno e a divisão. Centríolos fazem parte de estruturas organizadoras de microtúbulos em muitas células animais.','Fuso mitótico, movimento de vesículas ou cílios.'],
   ]}},
   {title:'Segue uma proteína do DNA até a secreção', paragraphs:[
    'Pensa numa célula do pâncreas que secreta uma enzima digestiva. O gene é transcrito no núcleo. O RNA mensageiro sai por um poro nuclear. A tradução começa num ribossomo e, com um sinal na proteína nascente, o conjunto é direcionado ao retículo rugoso.',
    'Vesículas levam a proteína do retículo ao Golgi. Ali ela pode ser modificada e encaminhada. A vesícula final se funde com a membrana e libera a proteína por exocitose. Se o enunciado bloquear o Golgi, a tradução pode continuar, mas o processamento e o destino do produto ficam comprometidos.',
    'Proteínas que atuam no citosol costumam ser feitas em ribossomos livres. O local onde a proteína vai atuar ajuda a decidir se ela entra na rota do retículo e do Golgi.',
   ]},
   {title:'Compara células e reconhece endossimbiose', paragraphs:[
    'A membrana plasmática e os ribossomos aparecem em bactérias, células animais e vegetais. Bactérias típicas têm DNA no nucleoide, sem carioteca. Células animais e vegetais são eucarióticas e compartilham núcleo, mitocôndrias, retículo e Golgi. A parede vegetal é rica em celulose. A parede bacteriana típica contém peptidoglicano.',
    'Uma célula vegetal que faz fotossíntese também faz respiração celular. Cloroplastos capturam energia luminosa e ajudam a incorporá-la em compostos orgânicos. Mitocôndrias usam a energia de moléculas orgânicas para sustentar a produção de ATP.',
    'DNA próprio, dupla membrana, divisão e parentesco molecular com bactérias dão suporte à origem endossimbiótica de mitocôndrias e cloroplastos. As organelas atuais também dependem de muitas proteínas codificadas no núcleo.',
   ]},
  ],
  heranca:[
   {title:'DNA, gene, alelo e cromossomo', paragraphs:[
    'DNA é a molécula. Cromossomo é DNA organizado com proteínas. Gene é uma região cuja expressão contribui para um RNA funcional ou uma proteína. Alelos são versões de um mesmo gene. Em um par de cromossomos homólogos, os mesmos loci podem carregar alelos diferentes.',
    'Na replicação, cada fita de DNA serve de molde para outra. Na transcrição, é produzido RNA. Na tradução, o ribossomo lê códons do RNA mensageiro. Uma alteração no DNA pode trocar um aminoácido, interromper a tradução ou manter o aminoácido devido à redundância do código genético.',
   ]},
   {title:'Meiose, segregação e segunda lei', paragraphs:[
    'Antes da meiose, o DNA é replicado. Na prófase I, pode haver crossing-over entre cromátides não irmãs de cromossomos homólogos. Na anáfase I, os homólogos se separam. Na anáfase II, separam-se as cromátides-irmãs. Entre as duas divisões não há nova replicação do DNA.',
    'A primeira lei de Mendel descreve a segregação dos alelos de um gene na formação dos gametas. A segunda trata da distribuição independente de genes, válida para genes em cromossomos diferentes ou que se comportam como independentes. Genes próximos no mesmo cromossomo tendem a ser herdados juntos.',
    'Em AaBb × AaBb, com distribuição independente e dominância completa, a chance de A_bb é 3/4 × 1/4 = 3/16. Resolve um gene por vez antes de multiplicar as chances.',
   ]},
   {title:'Heredogramas, dominância e probabilidade', paragraphs:[
    'Num modelo autossômico recessivo, um casal sem o traço com um filho aa tem genótipos Aa × Aa. Para um outro filho, se já sabemos que ele não expressa o traço, restam AA, Aa e aA entre os casos equiprováveis. A chance condicional de ser portador passa a 2/3.',
    'Em herança recessiva ligada ao X, um pai XY transmite X às filhas e Y aos filhos. Uma mãe heterozigota e um pai sem o traço têm 1/2 de chance de transmiti-lo a um filho já identificado como menino. Se a pergunta pede a chance de nascer um menino com o traço, multiplica pela chance de o bebê ser menino no modelo dado.',
    'Na dominância incompleta, o heterozigoto tem fenótipo intermediário. Na codominância, aparecem produtos dos dois alelos, como os antígenos A e B no sangue AB. Um heredograma pequeno pode admitir mais de um padrão. Usa as hipóteses do enunciado e elimina os padrões incompatíveis.',
   ]},
  ],
  heredogramas:[
   {title:'Compara os padrões de herança', paragraphs:[
    'Testa as hipóteses uma por uma. Estas pistas usam o modelo escolar com penetrância completa e sem mutações novas. Uma característica que aparece em todas as gerações pode sugerir dominância. Uma que pula gerações pode sugerir recessividade. Para decidir, procura o ramo familiar que torna um padrão impossível.',
   ],table:{caption:'Pistas e testes para cada padrão de herança',headers:['Padrão','Pista no desenho','Teste que ajuda a decidir'],rows:[
    ['Autossômica dominante','Uma cópia do alelo já permite manifestar o traço. Pessoas sem o traço são aa no modelo.','Dois genitores aa só podem gerar descendentes aa, também sem o traço.'],
    ['Autossômica recessiva','Pais sem o traço podem ter filhos ou filhas que o manifestam.','Um descendente aa recebeu um a de cada genitor. Se os dois pais não manifestam, ambos são Aa.'],
    ['Recessiva ligada ao X','Um menino pode manifestar o traço mesmo com pai sem o traço.','Um filho recebe seu X da mãe. Uma filha que manifesta precisa receber o alelo também do pai, que manifestaria o traço nesse modelo.'],
    ['Dominante ligada ao X','Um pai que manifesta o traço transmite seu X a todas as filhas.','O pai transmite Y aos filhos. Se a mãe também não tem o alelo, os filhos homens não manifestam o traço.'],
   ]}},
   {title:'Caso 1 · filha afetada e pais sem o traço',pedigree:pedigrees.recessivo,paragraphs:[
    'Começa por II-1, que manifesta a característica. Sob o padrão autossômico recessivo, ela é aa. Logo, cada genitor forneceu um a. Os símbolos vazios em I-1 e I-2 mostram ausência do fenótipo. Os pais são Aa.',
    'O símbolo vazio de II-2 exclui aa. Sobram AA, Aa e aA, três resultados equiprováveis, dos quais dois representam heterozigotos. A chance de II-2 ser portador é 2/3. A chance de um próximo bebê nascer aa é outra pergunta e vale 1/4.',
   ]},
   {title:'Caso 2 · filho afetado e pai sem o traço',pedigree:pedigrees.ligadoX,paragraphs:[
    'O enunciado deste caso informa que a herança é recessiva ligada ao X. II-1 é XᵃY. O Y veio do pai. O Xᵃ veio da mãe, que tem o traço ausente e, portanto, é XᴬXᵃ. I-1 é XᴬY.',
    'Cada filha recebe Xᴬ do pai. Uma filha pode ser XᴬXᴬ ou XᴬXᵃ, com 1/2 de chance para cada caso. Se o padrão de herança não viesse informado, esse desenho, sozinho, também admitiria herança autossômica recessiva.',
   ]},
  ],
  biomas:[
   {title:'Os seis biomas lado a lado',paragraphs:[
    'A divisão do IBGE usa condições regionais e a história da paisagem. Na questão, compara o conjunto de pistas, especialmente vegetação, sazonalidade e água. Um campo nativo pode ocorrer em mais de um bioma.',
   ],table:{caption:'Biomas brasileiros e como reconhecer cada um',headers:['Bioma','Pistas de clima, vegetação e água','O que ligar à conservação'],rows:[
    ['Amazônia','Predomina clima quente e úmido. Há florestas de terra firme e florestas inundáveis, como várzeas e igapós.','A perda de cobertura reduz habitat. A vegetação também participa da reciclagem de umidade por evapotranspiração.'],
    ['Cerrado','Estação seca e chuvosa bem marcadas. Há campos, savanas e formações florestais. Em muitas plantas, casca espessa e órgãos subterrâneos favorecem sobrevivência ou rebrota após fogo.','Efeitos do fogo dependem da época, frequência, intensidade e formação vegetal. Uma adaptação ao fogo não protege todas as espécies de qualquer queimada.'],
    ['Caatinga','Predomina o semiárido, com chuvas irregulares. Há plantas que perdem as folhas na seca e espécies que armazenam água.','A queda de folhas pode reduzir a perda de água. A degradação do solo aumenta a vulnerabilidade à erosão.'],
    ['Mata Atlântica','Conjunto de formações florestais com grande variação regional, incluindo florestas úmidas e matas com araucária.','Fragmentos isolados dificultam deslocamento e fluxo gênico. Corredores podem reconectar áreas, conforme a espécie e a paisagem.'],
    ['Pantanal','Planície da bacia do Alto Paraguai, marcada pela alternância entre áreas inundadas e secas.','Alterar a duração, época ou amplitude das cheias pode afetar a conexão entre rios e áreas de abrigo e reprodução.'],
    ['Pampa','No Brasil, ocorre no Rio Grande do Sul. Campos nativos são marcantes e coexistem com banhados e outras formações.','Conservar espécies campestres exige preservar a vegetação de campo. Converter o campo em lavoura ou silvicultura modifica seu habitat.'],
   ]}},
   {title:'Compara as pistas que mais confundem',paragraphs:[
    'Cerrado e Caatinga podem apresentar estação seca e plantas resistentes à falta de água. No Cerrado, procura a paisagem de savana e as pistas de fogo e rebrota. Na Caatinga, dá peso ao semiárido, à irregularidade das chuvas e a adaptações como perda de folhas na seca. Essas características ajudam quando aparecem em conjunto.',
    'O Pantanal tem ambientes sazonalmente alagados. A Amazônia também tem florestas inundáveis. No Pantanal, a pista-chave costuma ser o pulso de inundação da planície. Na Amazônia, o enunciado pode contrastar a floresta inundável com a de terra firme.',
   ]},
   {title:'Pampa no Rio Grande do Sul',paragraphs:[
    'Olha a cobertura original antes de propor recuperação. Num campo nativo do Pampa, gramíneas e outras plantas herbáceas sustentam fauna campestre. Plantar árvores em todo o campo pode descaracterizar esse habitat, mesmo que aumente a cobertura arbórea.',
    'Em um mapa de uso do solo, distingue campo nativo, lavoura, pastagem plantada e silvicultura. Todas podem parecer áreas abertas em certos momentos. Para decidir se houve perda de campo nativo, acompanha a classe original e o que a substituiu.',
   ]},
  ],
  embriologia:[
   {title:'Lê os três folhetos pelo tecido de origem', paragraphs:[
    'Os folhetos se formam na gastrulação. Em animais triblásticos, dão origem aos tecidos durante a organogênese. Aprende os exemplos clássicos por tecido, porque um único órgão pode receber contribuições de mais de um folheto.',
   ], table:{caption:'Principais derivados dos folhetos embrionários em vertebrados', headers:['Folheto','Exemplos de derivados','Cuidado na prova'], rows:[
    ['Ectoderma','Epiderme e seus anexos. O tubo neural dá origem ao encéfalo e à medula. A crista neural contribui para boa parte do sistema nervoso periférico.','Epiderme e derme têm origens diferentes.'],
    ['Mesoderma','Músculos, ossos, a maior parte da derme, vasos, coração e rins.','A musculatura da parede intestinal é mesodérmica, enquanto boa parte do revestimento interno do intestino é endodérmica.'],
    ['Endoderma','Epitélio da maior parte do tubo digestório e das vias respiratórias. Também origina células epiteliais de glândulas como fígado e pâncreas.','A origem do epitélio de um órgão pode diferir da origem dos músculos, vasos e tecido conjuntivo do mesmo órgão.'],
   ]}},
   {title:'Gastrulação, neurulação e diferenciação', paragraphs:[
    'Na segmentação, o zigoto sofre divisões que aumentam o número de células com pouco aumento do volume total. Na gastrulação, movimentos celulares reorganizam o embrião e estabelecem os folhetos. Na neurulação dos vertebrados, parte do ectoderma forma a placa neural, que se dobra e fecha para formar o tubo neural.',
    'Células do mesmo embrião em geral compartilham o genoma. Sinais e diferenças na expressão dos genes ajudam a produzir células com formas e funções distintas. Marcar uma população de células e acompanhar seus descendentes permite descobrir quais tecidos ela formou.',
    'Animais diblásticos têm dois folhetos principais. Em classificações de animais triblásticos, celoma é uma cavidade corporal inteiramente revestida por mesoderma. O lúmen do intestino e o celoma são cavidades distintas.',
   ]},
  ],
  evolucao:[
   {title:'Darwinismo do zero', paragraphs:[
    'Darwin e Wallace propuseram a seleção natural. Começa com indivíduos diferentes. Parte da variação passa aos descendentes. Em determinado ambiente, indivíduos com certas características tendem a deixar mais descendentes férteis. Se isso se repete, essas características podem se tornar mais frequentes.',
    'Adaptação evolutiva é uma característica hereditária que favorece o sucesso reprodutivo em certo ambiente, ou o processo pelo qual ela se estabelece na população. Uma característica vantajosa em um ambiente pode trazer custo em outro. A aclimatação ocorre no indivíduo e pode ser reversível.',
    'Em questões que comparam Lamarck com Darwin, identifica a ordem causal. No modelo de uso e desuso apresentado nos livros escolares, a mudança ocorre primeiro no indivíduo e seria transmitida. Na seleção natural, diferenças herdáveis permitem reprodução diferencial e mudam a população ao longo das gerações. A síntese moderna acrescenta a genética a essa explicação.',
   ]},
   {title:'Seleção, deriva, fluxo gênico e mutação', paragraphs:[
    'Mutação pode produzir novos alelos. Recombinação rearranja alelos que já existem. A seleção favorece variantes que contribuem para maior sucesso reprodutivo no contexto estudado. A deriva é uma mudança por amostragem aleatória, mais perceptível em populações pequenas.',
    'No efeito fundador, poucos indivíduos iniciam outra população e levam consigo apenas parte da variação original. Num gargalo, o tamanho da população cai bruscamente. Fluxo gênico ocorre quando há troca de alelos entre populações, por exemplo, pelo cruzamento após migração.',
    'A seleção pode favorecer um extremo de uma característica, ambos os extremos ou valores intermediários. Num gráfico, compara a distribuição antes e depois. O pico mudar de lugar é diferente de estreitar sem mudar de posição.',
   ]},
   {title:'Especiação, evidências e árvores', paragraphs:[
    'Uma barreira geográfica pode reduzir o fluxo gênico. As populações separadas podem divergir até surgir isolamento reprodutivo. Barreiras pré-zigóticas dificultam a fecundação. Barreiras pós-zigóticas podem reduzir a viabilidade ou a fertilidade do híbrido.',
    'Em uma árvore, encontra o nó mais recente compartilhado pelas linhagens. Girar os ramos em torno de um nó preserva o parentesco. A ordem das pontas na página pode mudar sem mudar a história evolutiva.',
    'Braço humano e nadadeira de baleia compartilham o plano básico do membro dos tetrápodes e são homólogos. Asas de aves e insetos cumprem uma função parecida e surgiram independentemente. Fósseis, anatomia comparada e sequências de DNA ajudam a investigar relações evolutivas.',
   ]},
  ],
  cadeias:[
   {title:'Ciclos biogeoquímicos em uma leitura', paragraphs:[
    'Em cada ciclo, identifica onde a matéria está armazenada, qual processo a desloca e em que forma ela chega ao próximo reservatório. Átomos circulam. A energia que mantém muitos desses processos flui entre níveis tróficos e é transferida para o ambiente, inclusive como calor.',
   ],table:{caption:'Reservatórios, processos e intervenções nos ciclos',headers:['Ciclo','Caminho principal','Intervenção comum em prova'],rows:[
    ['Água','Evaporação e transpiração → condensação e precipitação → infiltração ou escoamento.','Impermeabilização tende a reduzir infiltração e aumentar escoamento.'],
    ['Carbono','CO₂ → fotossíntese → matéria orgânica. Respiração, decomposição e combustão podem devolver carbono ao ambiente.','Queima de combustíveis fósseis transfere carbono de um reservatório de longa duração para a atmosfera.'],
    ['Nitrogênio','Fixação de N₂ → formas reduzidas. Nitrificação → nitrito e nitrato. Assimilação → matéria orgânica. Desnitrificação pode devolver N₂ à atmosfera.','Adubação e esgoto podem aumentar o aporte de formas reativas de nitrogênio na água.'],
    ['Fósforo','Intemperismo libera fosfatos de rochas. Plantas assimilam fosfato. Decomposição devolve parte ao solo e à água, onde pode sedimentar.','Fertilizantes fosfatados podem contribuir para eutrofização. O ciclo do fósforo não tem uma fase gasosa relevante no modelo escolar.'],
    ['Enxofre','Sulfato pode ser assimilado. Microrganismos transformam compostos de enxofre. Vulcões e combustão podem liberar compostos na atmosfera.','O SO₂ pode participar da formação de ácidos na atmosfera e contribuir para a chuva ácida.'],
   ]}},
   {title:'Nitrogênio etapa por etapa', paragraphs:[
    'Fixação converte N₂ em amônia, que em água pode estar na forma de amônio. Plantas como as leguminosas podem se associar a bactérias fixadoras. Na amonificação, decompositores liberam formas como NH₄⁺ a partir do nitrogênio orgânico de resíduos e restos de seres vivos.',
    'Na nitrificação, microrganismos oxidam amônia ou amônio a nitrito, NO₂⁻, e depois a nitrato, NO₃⁻. Na assimilação, plantas incorporam amônio ou nitrato a moléculas orgânicas. Na desnitrificação, microrganismos podem transformar nitrato em gases, inclusive N₂, especialmente em ambientes pobres em oxigênio.',
    'Atalho pra questão de setas. De N₂ atmosférico para forma reduzida, pensa em fixação. De amônio para nitrato, em nitrificação. De nitrogênio orgânico para amônio, em amonificação. De nitrato para gás, em desnitrificação.',
   ]},
   {title:'Fertilizante, algas e oxigênio', paragraphs:[
    'Depois de uma chuva, escoamento pode transportar fertilizante a um lago. O excesso de nutrientes pode favorecer algas ou cianobactérias. Mais tarde, microrganismos que decompõem a biomassa morta podem aumentar o consumo de O₂, reduzindo a concentração de oxigênio dissolvido.',
    'Uma questão pode dar dois gráficos. O pico de algas informa quando a biomassa cresceu. O menor O₂ pode aparecer depois, quando a decomposição estiver intensa. Marca se o comando pede o fator que iniciou o processo ou a causa imediata da morte de peixes.',
   ]},
  ],
 };
 const check=(key,prompt,correct,choices)=>({key:'bio-desafio-'+key,prompt,correct,choices,optional:true});
 const checks={
  celula:[
   check('secrecao','Uma célula produz uma enzima digestiva, mas uma substância impede a saída de vesículas do Golgi. Qual consequência é mais direta?',1,[
    ['O gene da enzima deixa de ser transcrito','A transcrição ocorre no núcleo. O bloqueio descrito age depois da produção da proteína.'],
    ['O envio da enzima para a membrana fica prejudicado','Na rota de secreção, vesículas que saem do Golgi levam o produto à membrana para exocitose. A produção no retículo pode continuar.'],
    ['A enzima passa a ser produzida na mitocôndria','Bloquear a rota de secreção não redireciona a tradução para a mitocôndria.']]),
   check('digestao','Uma organela danificada foi envolvida numa vesícula e precisa ter seus componentes degradados e reciclados. Que compartimento fornece o meio ácido para essa etapa?',2,[
    ['Complexo de Golgi','O Golgi modifica e encaminha produtos. A degradação em meio ácido acontece em outro compartimento.'],
    ['Peroxissomo','O peroxissomo participa de reações oxidativas e controla peróxido. O enunciado descreve a etapa de degradação da autofagia.'],
    ['Lisossomo','A vesícula que contém o material pode se fundir com um lisossomo. As enzimas lisossômicas degradam o conteúdo, e parte dos componentes pode ser reaproveitada.']]),
  ],
  heranca:[
   check('probabilidade','Em Aa × Aa, qual é a chance de um descendente ser Aa sabendo que ele tem o fenótipo dominante, sob dominância completa?',2,[
    ['1/4','Esse valor conta um dos quatro resultados antes de aplicar a condição. Aqui sabemos que o descendente não é aa.'],
    ['1/2','Essa é a chance de Aa antes de saber o fenótipo. O enunciado restringiu a amostra.'],
    ['2/3','Entre os três resultados que exibem o fenótipo dominante, AA, Aa e aA, dois são heterozigotos.']]),
   check('ligada-x','Uma mãe portadora de um alelo recessivo ligado ao X e um pai sem o traço esperam um bebê. A questão pede a chance de nascer um menino que expresse o traço, antes de saber o sexo. Qual é?',0,[
    ['1/4','No modelo, nascer menino tem chance de 1/2. Entre os meninos, receber o X materno com o alelo tem chance de 1/2. A chance conjunta é 1/4.'],
    ['1/2','É a chance de expressar o traço dado que o bebê já é menino. O item pede as duas condições juntas.'],
    ['0','Um filho recebe Y do pai e um X da mãe. Pode receber dela o X com o alelo recessivo.']]),
  ],
  heredogramas:[
   {...check('heredograma-condicional','Na família 1, pais sem o traço têm uma filha que o manifesta, II-1. Admitindo herança autossômica recessiva, qual é a chance de o irmão dela, II-2, ser portador, sabendo que ele não manifesta o traço?',2,[
    ['1/4','Esse valor corresponde a AA ou aa entre todos os quatro resultados do cruzamento. A ausência do traço exclui aa.'],
    ['1/2','Essa é a chance antes de saber o fenótipo. O enunciado restringe a conta aos resultados sem o traço.'],
    ['2/3','Entre AA, Aa e aA, dois dos três resultados representam portadores.']]),pedigree:pedigrees.recessivo},
   check('heredograma-x','Num modelo dominante ligado ao X, o pai manifesta a característica e a mãe não tem o alelo. Quem herda o alelo do pai?',1,[
    ['Todos os filhos homens','Filhos homens recebem Y do pai no modelo dado. Seu X vem da mãe.'],
    ['Todas as filhas','Todas as filhas recebem o X do pai. Como o alelo é dominante no modelo, elas manifestam o traço.'],
    ['Metade das filhas e metade dos filhos','A chance depende de receber X ou Y do pai. Para cada filha, o X paterno é certo.']]),
  ],
  biomas:[
   check('biomas-pampa','Uma área de campo nativo na metade sul do RS é convertida em uma plantação de árvores. Que impacto se espera para espécies dependentes de ambientes campestres?',0,[
    ['Redução de habitat campestre','A substituição de gramíneas e outras plantas nativas por uma formação arbórea muda a estrutura do habitat.'],
    ['Aumento do campo nativo pela presença de árvores','Uma plantação arbórea é outra cobertura. A presença de vegetação não indica a conservação do campo original.'],
    ['Restauração do pulso de inundação do Pantanal','O caso descreve substituição da cobertura vegetal no sul do RS. Não há alteração de um rio no Pantanal.']]),
   check('biomas-cerrado','Um levantamento descreve vegetação de savana, estação seca marcada e árvores de casca grossa com capacidade de rebrota após o fogo. Qual bioma é mais compatível?',1,[
    ['Caatinga','A Caatinga também tem plantas adaptadas à seca, mas o conjunto de savana, sazonalidade e rebrota após fogo é uma pista típica do Cerrado.'],
    ['Cerrado','A combinação de vegetação savânica, estação seca e adaptações ao fogo em muitas plantas é coerente com o Cerrado.'],
    ['Pantanal','O Pantanal abriga diferentes formações vegetais. Num enunciado que quer identificá-lo, a alternância de cheias e secas é a pista mais característica.']]),
  ],
  embriologia:[
   check('intestino','Num experimento, células endodérmicas são marcadas durante a gastrulação. Que estrutura deve apresentar descendentes das células marcadas?',1,[
    ['Músculo da parede intestinal','O músculo liso da parede intestinal tem origem mesodérmica.'],
    ['Epitélio do intestino delgado','O endoderma dá origem ao revestimento epitelial do intestino delgado. O músculo da parede vem de outro folheto.'],
    ['Medula espinhal','A medula espinhal vem do tubo neural, formado a partir do ectoderma.']]),
  ],
  evolucao:[
   check('deriva','Uma tempestade mata ao acaso a maior parte dos indivíduos de uma pequena ilha. Os sobreviventes têm uma frequência de alelos diferente, sem relação entre o genótipo e a sobrevivência. Qual é o mecanismo?',0,[
    ['Deriva genética por gargalo','A população encolheu e os sobreviventes são uma amostra pequena e casual. Isso pode alterar as frequências mesmo sem vantagem de um alelo.'],
    ['Seleção natural','O enunciado excluiu uma associação entre genótipo e sobrevivência. A diferença observada resulta de amostragem ao acaso.'],
    ['Fluxo gênico','Fluxo gênico exigiria troca de alelos entre populações. O caso descreve perda de indivíduos numa única população.']]),
   check('especiacao','Duas populações ficam separadas por uma barreira física. Depois de a barreira sumir, elas se cruzam e produzem híbridos estéreis. O que isso indica?',2,[
    ['Isolamento apenas geográfico','A barreira física sumiu. O enunciado descreve um efeito que permanece após o cruzamento.'],
    ['Isolamento pré-zigótico','Houve cruzamento com formação de híbridos. Uma barreira pré-zigótica agiria antes da formação do zigoto.'],
    ['Isolamento pós-zigótico','O zigoto se formou e originou um híbrido, mas sua esterilidade limita o fluxo gênico entre as populações.']]),
  ],
  cadeias:[
   check('nitrogenio','No solo, microrganismos transformam NH₄⁺ em NO₂⁻ e depois em NO₃⁻. Como se chama esse processo?',1,[
    ['Fixação','Na fixação, o ponto de partida é o N₂ atmosférico, convertido em formas reduzidas.'],
    ['Nitrificação','O nitrogênio do amônio é oxidado a nitrito e depois a nitrato. Esse caminho é a nitrificação.'],
    ['Desnitrificação','A desnitrificação pode converter nitrato em formas gasosas, seguindo outra direção.']]),
   check('fosforo','Um fertilizante chega a um lago. O estudo identifica que o nutriente limitante era o fosfato e que a floração veio antes da queda de O₂. Qual processo liga a floração à queda do oxigênio?',0,[
    ['Respiração de decompositores ao degradar biomassa','Quando a biomassa da floração morre, a decomposição aeróbia pode aumentar o consumo de oxigênio. Esse é o elo direto pedido.'],
    ['Fotossíntese das algas','A fotossíntese oxigênica libera O₂ quando há luz. O enunciado pede o processo que pode explicar a queda posterior.'],
    ['Formação de fósforo gasoso','O fósforo não tem fase gasosa relevante nesse modelo. A queda de O₂ pode ser explicada pela atividade dos decompositores.']]),
  ],
 };
 const priorities=[
  {title:'Impactos ambientais e ciclos', level:'Revisa primeiro', lesson:'cadeias', tip:'Treina a relação entre fertilizante, floração de algas e queda de oxigênio. Revisa também as setas dos ciclos do carbono, nitrogênio e fósforo.'},
  {title:'DNA, herança e biotecnologia', level:'Revisa primeiro', lesson:'heranca', tip:'Distingue replicar DNA, transcrever RNA e traduzir proteína. Revisa como a meiose separa alelos.'},
  {title:'Organelas e metabolismo', level:'Revisa primeiro', lesson:'celula', tip:'Segue a rota de uma proteína até a secreção. Depois distingue digestão, produção de ATP e fotossíntese pelo que o enunciado bloqueia ou mede.'},
  {title:'Viroses, vetores e imunidade', level:'Revisa primeiro', lesson:'imunidade', tip:'Separa agente, vetor e via de transmissão. Compara vacina, anticorpos prontos e memória imunológica.'},
  {title:'Seleção natural e resistência', level:'Treina a aplicação', lesson:'evolucao', tip:'Explica um caso de resistência passando por variação herdável, reprodução diferencial e mudança de frequência.'},
  {title:'Heredogramas e probabilidade', level:'Treina a aplicação', lesson:'heredogramas', tip:'Identifica quem recebeu cada alelo e compara uma probabilidade geral com a chance condicionada ao fenótipo.'},
  {title:'Biomas brasileiros e conservação', level:'Revisão complementar', lesson:'biomas', tip:'Treina pistas para distinguir Cerrado e Caatinga. Liga o pulso de cheias ao Pantanal e a conservação de campos nativos ao Pampa.'},
  {title:'Folhetos embrionários', level:'Revisão complementar', lesson:'embriologia', tip:'Distingue epiderme de derme e compara o revestimento do intestino com sua musculatura.'},
 ];
 globalThis.FurgDia2Biology={
  modules,checks,priorities,
  sources:{
   ...Object.fromEntries(Object.entries(sources).map(([id,links])=>[id,links.map(([label,path])=>['OpenStax · '+label,openStax+path])])),
   heredogramas:[['MedlinePlus Genetics · Padrões de herança','https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/']],
   biomas:[['IBGE Educa · Biomas brasileiros','https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/18307-biomas-brasileiros.html'],['IBGE · Mapas e delimitações dos biomas','https://www.ibge.gov.br/geociencias/cartas-e-mapas/informacoes-ambientais/15842-biomas.html'],['Embrapa · O Pantanal','https://www.embrapa.br/web/pantanal/apresentacao/o-pantanal']],
  },
  prioritySources:[
   ['Raio X ENEM 2009–2025 · SAS Educação','https://prod-assets-saseducacao.s3.amazonaws.com/public/2026-04/RAIO-X_ENEM%20SAS.pdf?VersionId=1qwKGl_vetiOrP1ROPpo8oO823hRWGF9'],
   ['Matrizes de Referência · Inep','https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem'],
  ],
 };
})();
