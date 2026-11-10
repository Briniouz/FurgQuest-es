'use strict';
(() => {
 const catalog=globalThis.FURG_DIA2_LESSONS, subjects=globalThis.FURG_DIA2_GUIDE.subjects;
 const route=(subject,id)=>`dia-2/aulas/${subject}/${id}`;
 const related=(subject,id)=>({subject,id,route:route(subject,id)});
 const branch=(id,tone,title,description,lessons)=>({id,tone,title,description,lessons});
 const path=(id,title,lessons)=>({id,title,lessons});

 // Reaproveita os títulos, números e destinos das aulas publicadas.
 // Campos null indicam metadados editoriais a preencher.
 function subject(id,title,description,contents){
  const entry=(lessonId,summary,details={})=>{
   const index=catalog[id].findIndex(lesson=>lesson.id===lessonId);
   const source=catalog[id][index];
   return {
    id:lessonId,title:source.title,number:index+1,description:summary,
    relevance:null,minutes:null,related:[],terms:[],...details,
    route:route(id,lessonId)
   };
  };
  return {id,...subjects[id],root:{id,title,description},...contents(entry)};
 }

 globalThis.FURG_DIA2_MAPS={
  matematica:subject('matematica','Números e medidas','O que está sendo contado, comparado ou medido?',lesson=>({
   branches:[
    branch('quantidades','amber','Comparar quantidades','De uma parte do inteiro a um desconto.',[
     lesson('fracoes','Converte partes, decimais e unidades.'),
     lesson('proporcao','Compara razões e lê escalas.',{related:[related('quimica','reacoes')],terms:['regra de três','proporcionalidade']}),
     lesson('porcentagens','Calcula reajustes e juros.')
    ]),
    branch('modelos','violet','Modelar relações','Da expressão à forma do gráfico.',[
     lesson('equacoes','Lê a inclinação e o valor inicial.'),
     lesson('crescimento','Compara sequências e parábolas.',{related:[related('fisica','energia')],terms:['função quadrática','pa','pg']})
    ]),
    branch('geometria','cyan','Medir formas','Da superfície à capacidade.',[
     lesson('geometria-plana','Calcula contornos, áreas e lados.'),
     lesson('volumes','Compara sólidos e cavidades.')
    ]),
    branch('dados','green','Ler dados e contar casos','De um gráfico à chance de um resultado.',[
     lesson('estatistica','Lê gráficos, médias e medianas.'),
     lesson('probabilidade','Conta casos e calcula chances.',{related:[related('biologia','heranca')]})
    ])
   ],
   paths:[path('precos','Preços e escalas',['fracoes','proporcao','porcentagens']),path('graficos','Da fórmula ao gráfico',['equacoes','crescimento','estatistica'])]
  })),
  fisica:subject('fisica','Energia','De onde vem e para onde vai?',lesson=>({
   branches:[
    branch('mecanica','amber','Energia e movimento','Da altura à velocidade e ao trabalho.',[
     lesson('movimento','Lê deslocamento e aceleração.',{relevance:3,minutes:22,related:[related('matematica','equacoes')],terms:['cinemática','velocidade','gráficos','MRU','MRUV']}),
     lesson('energia','Segue a transformação de energia.',{relevance:3,minutes:20,related:[related('matematica','crescimento')],terms:['energia cinética','potencial gravitacional','conservação','rampa']}),
     lesson('forcas','Relaciona forças, trabalho e giro.',{relevance:3,minutes:24,related:[related('matematica','geometria-plana')],terms:['leis de Newton','resultante','torque','atrito']})
    ]),
    branch('fluidos','cyan','Pressão e calor','Da profundidade às trocas térmicas.',[
     lesson('fluidos','Compara pressão e flutuação.',{relevance:2,minutes:20,related:[related('quimica','materia')],terms:['hidrostática','empuxo','densidade','arquimedes']}),
     lesson('calor','Calcula trocas e mudanças de fase.',{relevance:3,minutes:24,related:[related('quimica','termoquimica')],terms:['calorimetria','condução','convecção','radiação']})
    ]),
    branch('transmissao','violet','Ondas e circuitos','Duas maneiras de transportar energia.',[
     lesson('ondas','Relaciona frequência e propagação.',{relevance:2,minutes:20,related:[related('matematica','proporcao')],terms:['som','luz','óptica','reflexão','refração']}),
     lesson('circuitos','Compara circuitos em série e paralelo.',{relevance:3,minutes:25,related:[related('quimica','eletroquimica')],terms:['lei de ohm','resistores','tensão','corrente']})
    ]),
    branch('aplicacoes','green','Consumo e segurança','O tempo na conta de luz e no impacto.',[
     lesson('consumo','Estima consumo em kWh e eficiência.',{relevance:3,minutes:18,related:[related('matematica','porcentagens')],terms:['potência','rendimento','eletricidade']}),
     lesson('colisoes','Relaciona impulso e tempo de parada.',{relevance:1,minutes:20,related:[related('matematica','equacoes')],terms:['quantidade de movimento','airbag','choque']})
    ])
   ],
   paths:[
    path('impacto','Do alto ao impacto',['energia','movimento','forcas','colisoes']),
    path('conta','Da tomada à conta de luz',['circuitos','consumo']),
    path('trocas','Trocas de energia',['fluidos','calor','ondas'])
   ]
  })),
  biologia:subject('biologia','Vida','O que mantém um organismo funcionando?',lesson=>({
   branches:[
    branch('celulas','green','Dentro da célula','Estrutura e energia para funcionar.',[
     lesson('celula','Compara organelas e acompanha a rota de secreção.',{terms:['organelas','retículo','complexo de Golgi','lisossomo']}),
     lesson('metabolismo','Compara três formas de obter energia.',{related:[related('fisica','energia')]})
    ]),
    branch('heranca','violet','Herança e evolução','Da informação genética às populações.',[
     lesson('heranca','Segue a informação de pais a filhos.',{related:[related('matematica','probabilidade')]}),
     lesson('evolucao','Entende Darwinismo e distingue os mecanismos de evolução.',{terms:['Darwin','seleção natural','deriva','especiação']})
    ]),
    branch('ambiente','cyan','Energia e ambiente','Da cadeia alimentar ao ecossistema.',[
     lesson('cadeias','Segue a energia e acompanha os ciclos da matéria.',{related:[related('fisica','energia')],terms:['ciclos biogeoquímicos','nitrogênio','fósforo','carbono']}),
     lesson('ecossistemas','Liga impactos às suas consequências.',{related:[related('quimica','solucoes')]})
    ]),
    branch('organismo','amber','Corpo, defesa e tecnologia','Da regulação interna aos usos do DNA.',[
     lesson('embriologia','Acompanha os folhetos embrionários até os tecidos.',{terms:['ectoderma','mesoderma','endoderma','gastrulação']}),
     lesson('fisiologia','Acompanha os ajustes do corpo.'),
     lesson('imunidade','Distingue as respostas de defesa.'),
     lesson('biotecnologia','Reconhece técnicas que usam DNA.')
    ])
   ],
   paths:[path('dna','Da célula ao DNA',['celula','heranca','biotecnologia']),path('ambiente','Energia nos ecossistemas',['metabolismo','cadeias','ecossistemas']),path('desenvolvimento','Da célula ao organismo',['celula','embriologia','fisiologia'])]
  })),
  quimica:subject('quimica','Matéria','Do que é feita e como se transforma?',lesson=>({
   branches:[
    branch('materiais','violet','Dos materiais aos átomos','Do que enxergas às partículas.',[
     lesson('materia','Escolhe como separar misturas.',{related:[related('fisica','fluidos')]}),
     lesson('atomos','Identifica átomos, íons e ligações.')
    ]),
    branch('quantidades','amber','Quantidades e reações','Do mol à proporção de uma reação.',[
     lesson('mol','Converte massa em quantidade.'),
     lesson('reacoes','Balanceia e calcula proporções.',{related:[related('matematica','proporcao')],terms:['estequiometria','reagente limitante']})
    ]),
    branch('solucoes','cyan','Soluções e pH','Do soluto à leitura da acidez.',[
     lesson('solucoes','Entende concentração e diluição.',{related:[related('matematica','proporcao')]}),
     lesson('ph','Compara acidez e basicidade.')
    ]),
    branch('transformacoes','green','Energia e materiais','Da reação aos circuitos e polímeros.',[
     lesson('termoquimica','Separa calor, velocidade e equilíbrio.',{related:[related('fisica','calor')]}),
     lesson('eletroquimica','Segue os elétrons numa pilha.',{related:[related('fisica','circuitos')]}),
     lesson('organica','Reconhece grupos e cadeias de carbono.')
    ])
   ],
   paths:[path('mol','Do mol à reação',['mol','reacoes','termoquimica']),path('agua','Da água à solução',['materia','solucoes','ph'])]
  }))
 };
})();
