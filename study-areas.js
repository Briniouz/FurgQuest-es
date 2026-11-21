'use strict';
(() => {
 const $=id=>document.getElementById(id);
 const groups={estudos:'Estudar',treinamento:'Exercícios',provas:'Provas',revisao:'Revisar'};
 const areas={
  'dia-1':{
   day:'1', title:'Linguagens, Humanas e Redação', symbol:'Aa',
   subjects:['Linguagens','Ciências Humanas','Redação'],
   questionAreas:['linguagens','ciencias-humanas'],
   menus:{
    provas:[
     ['enem','Banco do Dia 1','Questões de Linguagens e Humanas','▤'],
     ['simulados','Simulado do Dia 1','Prova do primeiro dia por ano','◷'],
    ],
    treinamento:[
     ['exercicios','Todos os exercícios','Linguagens, Humanas e Redação do básico ao avançado, com resolução','✓'],
     ['vespera','Modo Véspera','Treino guiado, flashcards e revisão de erros','✦'],
     ['aquecimento','Aquecimento','Exercícios de leitura e vocabulário','→'],
     ['repertorios','Redação e repertórios','Modelos de desenvolvimento e referências','✎'],
    ],
    estudos:[
     ['linguagens','Guias de Linguagens','Interpretação, literatura e língua','Aa'],
     ['biblioteca','Biblioteca ENEM','Autores, conceitos e comandos do Dia 1','◈'],
     ['leituras','Resumos literários','Obras, contexto e exercícios','▥'],
    ],
   },
  },
  'dia-2':{
   day:'2', title:'Matemática e Ciências da Natureza', symbol:'∑',
   subjects:['matematica','fisica','quimica','biologia'],
   questionAreas:['matematica','ciencias-natureza'],
   menus:{
    provas:[
     ['enem','Banco do Dia 2','Questões de Matemática e Natureza','▤'],
     ['simulados','Simulado do Dia 2','Prova do segundo dia por ano','◷'],
    ],
    treinamento:[
     ['exercicios','Todos os exercícios','Matemática e Natureza do básico ao avançado, por assunto, com resolução','✓'],
     ['dia2','Treino guiado do Dia 2','Raciocínio, flashcards e revisão de erros','∑'],
     ['matematica-lab','Laboratório de Matemática','Desafios com tempo e caderno de erros','×'],
     ['calculo-mental','Cálculo mental','Rodadas rápidas por nível','⚡'],
     ['evolucao','Level Up','Exercícios progressivos de Matemática','→'],
    ],
    estudos:[
     ['passo-a-passo','Aprender do zero','Uma matéria por vez, na ordem: entende, visualiza e pratica','↪'],
     ['aulas','Todas as aulas','Escolhe qualquer aula, em qualquer ordem','↗'],
     ['formulas','Fórmulas e conceitos','Consulta rápida de Matemática, Física, Química e Biologia','ƒ'],
     ['mapa','Mapa mental','Vê como os conceitos se ligam e abre a aula direto no quadro','⤢'],
     ['conceitos','Conceitos por matéria','Pistas, fórmulas e questões, matéria por matéria','↝'],
     ['oficina','Oficina de estudo','Simuladores, dedução e revisão espaçada','◈'],
     ['roteiro-fisica','Roteiro do vídeo · Física','Da Cinemática à Ondulatória, na ordem do vídeo','▷'],
     ['transmissao-calor','Transmissão de calor','Convecção, condução e radiação animadas','≈'],
     ['conversoes','Grandezas e conversões','Unidades, fatores e exemplos passo a passo','⇄'],
     ['trilhas','Trilhas de estudo','Pré-requisitos, exemplos e exercícios','▥'],
    ],
   },
  },
  engenharias:{
   label:'Engenharias',title:'Engenharias',symbol:'∫',
   subjects:['Trigonometria','Geometria Analítica','Limites','Derivadas','Integrais'],questionAreas:[],
   menus:{
    estudos:[
     ['passo-a-passo','Aprender do zero','Entender → visualizar → praticar, desde a Trigonometria','↪'],
     ['fundamentos','Trigonometria e Geometria','A base antes de entrar no Cálculo','△'],
     ['calculo','Cálculo Diferencial e Integral','Funções, limites, derivadas e integrais','∫'],
    ],
    treinamento:[['questoes','Todos os exercícios','Da Trigonometria às Integrais, do básico ao avançado','✓'],['exercicios','Exercícios abertos','Resolve no caderno e confere a solução por assunto','✎']],
    provas:[['desafios','Desafios de aplicação','Problemas para conectar as ideias','◇']],
    revisao:[
     ['progresso','Meu progresso','Aulas concluídas e próximos passos','◴'],
     ['revisar','Revisar meus erros','Volta às ideias que exigiram outra tentativa','↺'],
    ],
   },
  },
 };
 // One vocabulary for the general dashboard and study areas.
 const reviewRows=[
  ['erros-simulados','Erros dos simulados','Questões salvas, reunidas por assunto','↺'],
  ['simulados-salvos','Simulados salvos','Retoma resultados e refaz as mesmas questões','◷'],
  ['desempenho','Meu desempenho e TRI','Acertos, evolução e estimativa de nota','◴'],
 ];
 for(const meta of [areas['dia-1'],areas['dia-2']]){
  const bank=meta.menus.provas.shift();
  meta.menus.treinamento.unshift(bank);
  meta.menus.provas[0][1]='Fazer simulado';
  meta.menus.provas[0][2]='Por ano ou personalizado, com tempo e correção';
  meta.menus.provas.push(['vestibular-furg','Vestibular FURG','Simulado completo com as 14 matérias e o PDF','◎']);
  meta.menus.revisao=[...reviewRows,['erros-treino','Erros do treino guiado','Retoma as questões que precisas revisar','✓']];
 }
 areas['dia-1'].menus.estudos.push(areas['dia-1'].menus.treinamento.splice(3,1)[0]);
 const generalMenus={
  estudos:[
   ['engenharias/passo-a-passo','Engenharias','Trigonometria, Geometria Analítica e Cálculo','∫'],
   ['dia-2/passo-a-passo','Aprender do zero','Matemática, Física, Química e Biologia, desde a base','↪'],
   ['dia-1/linguagens','Guias de Linguagens','Interpretação, literatura e língua','Aa'],
   ['dia-1/repertorios','Redação e repertórios','Referências, argumentos e exemplos','✎'],
   ['dia-1/biblioteca','Biblioteca ENEM','Autores, obras e conceitos','◈'],
   ['dia-2/mapa','Mapa mental','Conecta conceitos e abre as aulas','⤢'],
   ['dia-2/oficina','Simuladores e oficina','Experimentos interativos e revisão espaçada','≈'],
   ['trilhas','Trilhas de estudo','Pré-requisitos, exemplos e exercícios','▥'],
   ['leituras','Resumos literários','Obras, contexto e exercícios','▥'],
  ],
  treinamento:[
   ['exercicios','Todos os exercícios','Todas as matérias do básico ao avançado, com resolução','✓'],
   ['enem','Questões do ENEM','Filtra por matéria, ano e dificuldade','▤'],
   ['banco','Questões da FURG','Banco organizado por matéria e ano','▤'],
   ['fuvest','Questões da Fuvest','Primeira fase, desde 2010','◇'],
   ['dia-1/vespera','Treino guiado · Dia 1','Leitura, pistas e raciocínio','✦'],
   ['dia-2/dia2','Treino guiado · Dia 2','Matemática e Ciências da Natureza','∑'],
   ['calculo-mental','Cálculo mental','Rodadas rápidas por nível','⚡'],
   ['matematica-lab','Laboratório de Matemática','Desafios com tempo e revisão','×'],
   ['evolucao','Level Up','Exercícios progressivos de Matemática','→'],
   ['leve','Aquecimento e flashcards','Leitura, vocabulário e revisão leve','◈'],
  ],
  provas:[
   ['simulados','Fazer simulado','ENEM por ano, personalizado e FURG','◷'],
   ['vestibular-furg','Vestibular FURG','Simulado completo: 14 matérias, 2 discursivas e PDF','◎'],
   ['anatomia','Anatomia ENEM','Assuntos frequentes e padrões de comando','◉'],
   ['acervo','Provas e gabaritos','Consulta os arquivos originais','↓'],
  ],
  revisao:[...reviewRows,
   ['dia-1/erros-treino','Erros do treino · Dia 1','Linguagens e Humanas','✓'],
   ['dia-2/erros-treino','Erros do treino · Dia 2','Matemática e Natureza','✓'],
  ],
 };
 const menusFor=space=>get(space)?.menus||generalMenus;
 const routeFor=(space,page)=>get(space)?space+'/'+page:page;
 const shortcuts={
  simulados:{view:'simulados',open:()=>globalThis.FurgEnemSim?.showBuilder()},
  'vestibular-furg':{view:'simulados',open:()=>globalThis.FurgVestibular?.show()},
  'erros-simulados':{view:'simulados',open:()=>globalThis.FurgEnemSim?.showMistakes()},
  'simulados-salvos':{view:'simulados',open:()=>globalThis.FurgEnemSim?.showSaved()},
  'erros-treino':{view:'dia2',open:()=>current==='dia-1'?globalThis.FurgVespera?.showErrors():globalThis.FurgDia2?.showErrors()},
  aquecimento:{view:'leve',open:()=>globalThis.FurgLightReview?.showDayOne()},
  repertorios:{view:'vespera',open:()=>globalThis.FurgVespera?.showRepertories()},
  formulas:{view:'dia2',open:()=>globalThis.FurgDia2?.showGuide()},
  oficina:{view:'dia2',open:()=>globalThis.FurgDia2?.showWorkshop()},
  'transmissao-calor':{view:'dia2',open:()=>globalThis.FurgDia2?.showWorkshop('transmissao')},
  conversoes:{view:'dia2',open:()=>globalThis.FurgDia2?.showConversions()},
  exercicios:{view:'exercicios'},
  questoes:{view:'exercicios'},
  'passo-a-passo':{view:'aulas'},
  'roteiro-fisica':{view:'aulas'},
  mapa:{view:'aulas'},
  conceitos:{view:'aulas'},
 };
 const views=new Set(['inicio','exercicios','banco','leve','enem','anatomia','fuvest','evolucao','simulados','desempenho','trilhas','leituras','biblioteca','linguagens','acervo','configuracoes','vespera','dia2','aulas','matematica-lab','calculo-mental','engenharias']);
 const get=space=>Object.hasOwn(areas,space)?areas[space]:null;
 const viewOf=(page,space=current)=>space==='engenharias'?(page==='questoes'?'exercicios':'engenharias'):page==='erros-treino'&&space==='dia-1'?'vespera':shortcuts[page]?.view||page;
 const contains=(space,questionArea)=>get(space)?.questionAreas.includes(questionArea)??true;
 const home={space:'geral',page:'inicio',view:'inicio',path:'inicio'};
 let current='geral';

 function allowed(space,page) {
  if(!get(space)||page==='desempenho'||page==='configuracoes')return true;
  return Object.values(areas[space].menus).some(rows=>rows.some(([key])=>key===page||viewOf(key)===page));
 }
 function resolve(page,space=current) {
  if(page==='inicio')return home;
  if(page==='geral')return {space:'geral',page,view:'area-estudo',path:page};
  if(get(page))return {space:page,page:'area-estudo',view:'area-estudo',path:page};
  const view=viewOf(page,space);
  if(!views.has(view))return home;
  if(view==='aulas')space='dia-2';
  if(!get(space)||!allowed(space,page))space='geral';
  return {space,page,view,path:space==='geral'?page:space+'/'+page};
 }
 function parse(hash) {
  const [name,page,...rest]=String(hash||'').replace(/^#/,'').split('/');
  if(name==='engenharias'&&page==='aula'){
   const lesson=rest.length===1&&globalThis.FurgEngineering?.lessons.find(item=>item.id===rest[0]);
   if(lesson)return {space:name,page,view:'engenharias',lesson:lesson.id,path:name+'/aula/'+lesson.id};
   return resolve(name,'geral');
  }
  if(name==='dia-2'&&viewOf(page)==='aulas'&&rest.length){
   const base=resolve(page,name), [subject,lesson]=rest;
   const lessonPage=page==='aulas'||page==='passo-a-passo';
   const lengthIsValid=rest.length===1||(lessonPage&&rest.length===2&&!!lesson);
   if(lengthIsValid&&globalThis.FurgDia2Lessons?.valid(subject,lesson)){
    return {...base,subject,lesson,path:base.path+'/'+rest.join('/')};
   }
   return base;
  }
  if(rest.length)return home;
  if(page!==undefined)return get(name)&&allowed(name,page)&&views.has(viewOf(page,name))?resolve(page,name):resolve(get(name)?name:'inicio','geral');
  return resolve(name,'geral');
 }

 function hubSubjects(meta) {
  if(meta.day==='1')return meta.subjects.map(label=>`<span>${label}</span>`).join('');
  if(meta.label==='Engenharias')return meta.subjects.map(label=>`<span>${escape(label)}</span>`).join('');
  return meta.subjects.map(id=>{
   const {label,icon}=globalThis.FURG_DIA2_GUIDE.subjects[id];
   const path='dia-2/mapa/'+id;
   return `<a class="study-subject-link" data-subject="${id}" href="#${path}" data-study-route="${path}"><b aria-hidden="true">${icon}</b>${label}</a>`;
  }).join('');
 }

 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const routeLink=(path,title,detail,icon='→',cls='')=>`<a class="${cls}" href="#${path}" data-study-route="${path}"><span class="study-hub-icon" aria-hidden="true">${icon}</span><span><strong>${escape(title)}</strong><small>${escape(detail)}</small></span><i aria-hidden="true">→</i></a>`;
 function searchMarkup(id){return `<div class="study-search"><label for="${id}">Busca tudo: aulas, fórmulas, questões e ferramentas</label><div class="study-search-field"><span aria-hidden="true">⌕</span><input type="search" id="${id}" autocomplete="off" placeholder="Ex.: polinômios, bioquímica, ENEM 2019, simulado…" aria-controls="${id}Results"></div><div id="${id}Results" class="study-search-results" hidden></div><p id="${id}Status" class="study-search-status" role="status" aria-live="polite"></p></div>`;}
 function searchItems(){
  const items=[],seen=new Set();
  for(const space of ['geral','dia-1','dia-2','engenharias'])for(const [group,rows] of Object.entries(menusFor(space)))for(const[page,title,detail,icon]of rows){
   const path=routeFor(space,page);if(seen.has(path))continue;seen.add(path);
   items.push({path,title,detail:(space==='geral'?'Geral':get(space).label||'Dia '+get(space).day)+' · '+groups[group]+' · '+detail,icon});
  }
  for(const [subject,lessons]of Object.entries(globalThis.FURG_DIA2_LESSONS||{}))for(const lesson of lessons)items.push({path:'dia-2/aulas/'+subject+'/'+lesson.id,title:lesson.title,detail:'Aula · '+globalThis.FURG_DIA2_GUIDE.subjects[subject].label+' · '+lesson.lead,icon:'↗'});
  for(const lesson of globalThis.FurgEngineering?.lessons||[])items.push({path:'engenharias/aula/'+lesson.id,title:lesson.title,detail:'Engenharias · Aula · '+lesson.lead,icon:'∫'});
  return items;
 }
 function bindSearch(id){
  const input=$(id);if(!input)return;
  let shown=[];
  const hide=()=>{const r=$(id+'Results');r.hidden=true;r.innerHTML='';$(id+'Status').textContent='';shown=[];};
  input.addEventListener('input',()=>{
   const text=input.value.trim(),root=$(id+'Results'),search=globalThis.FurgSearch;
   if(!text){hide();return;}
   if(!search){legacySearch(input,id);return;}
   const found=search.query(text,{limit:5}),qs=(found.questions||[]).slice(0,2);
   shown=[...found,...qs];
   root.hidden=false;
   root.innerHTML=shown.map((x,i)=>`<a href="#${escape(x.path||'enem')}" data-search-i="${i}"><span class="study-hub-icon" aria-hidden="true">${escape(x.icon||'→')}</span><span><strong>${escape(x.title)}</strong><small>${escape(x.crumb||x.detail)}</small></span><i aria-hidden="true">→</i></a>`).join('')
    +`<a href="#" data-search-all class="study-search-all"><span class="study-hub-icon" aria-hidden="true">⌕</span><span><strong>${shown.length?'Ver todos os resultados':'Nada por aqui. Abrir a busca completa'}</strong><small>Inclui questões, fórmulas e consulta na Wikipédia · Ctrl+K</small></span><i aria-hidden="true">→</i></a>`;
   $(id+'Status').textContent=shown.length?shown.length+' resultados. Enter abre o primeiro.':'Nenhum resultado direto.';
  });
  input.addEventListener('keydown',event=>{
   if(event.key==='Enter'&&input.value.trim()){event.preventDefault();const search=globalThis.FurgSearch;if(shown[0])search?.open(shown[0]);else search?.show(input.value.trim());}
   else if(event.key==='Escape'&&input.value){input.value='';hide();}
  });
  $(id+'Results').addEventListener('click',event=>{
   const all=event.target.closest('[data-search-all]');
   if(all){event.preventDefault();globalThis.FurgSearch?.show(input.value.trim());return;}
   const row=event.target.closest('[data-search-i]');
   if(row){event.preventDefault();event.stopPropagation();globalThis.FurgSearch?.open(shown[Number(row.dataset.searchI)]);hide();input.value='';}
  });
 }
 function legacySearch(input,id){
   const terms=normalize(input.value.trim()).split(/\s+/).filter(Boolean),root=$(id+'Results');
   root.hidden=!terms.length;$(id+'Status').textContent='';if(!terms.length){root.innerHTML='';return;}
   const items=searchItems().filter(x=>terms.every(term=>normalize(x.title+' '+x.detail).includes(term))).sort((a,b)=>Number(b.path.startsWith(current+'/'))-Number(a.path.startsWith(current+'/'))||Number(normalize(b.title).includes(terms.join(' ')))-Number(normalize(a.title).includes(terms.join(' '))));
   root.innerHTML=items.slice(0,8).map(x=>routeLink(x.path,x.title,x.detail.split(' · ').slice(0,2).join(' · '),x.icon)).join('')||'<p>Nenhum resultado. Tenta o nome da matéria ou do assunto.</p>';
   $(id+'Status').textContent=items.length?(items.length>8?'8 de '+items.length:items.length)+' resultados. Usa Tab para escolher.':'Nenhum resultado.';
 }
 function renderHub(space) {
  const meta=get(space),root=$('studyHubRoot'),general=!meta;
  const actions=general?[
   ['dia-2/passo-a-passo','Aprender do zero','Aulas, visuais e exercícios em sequência','↪'],
   ['enem','Resolver questões','Escolhe a matéria e pratica no teu ritmo','✓'],
   ['simulados','Fazer simulado','Escolhe a prova ou monta teu próprio bloco','◷'],
  ]:space==='engenharias'?[
   ['engenharias/passo-a-passo','Começar pela Trigonometria','Segue a trilha na ordem, com exemplos e prática','△'],
   ['engenharias/questoes','Exercícios','Da Trigonometria às Integrais, do básico ao avançado','✓'],
   ['engenharias/progresso','Acompanhar progresso','Retoma aulas e revisa teus erros','◴'],
  ]:meta.day==='2'?[
   ['dia-2/passo-a-passo','Aprender do zero','Entender → visualizar → praticar','↪'],
   ['dia-2/enem','Resolver questões','Matemática e Ciências da Natureza','✓'],
   ['dia-2/simulados','Fazer simulado','Por ano ou personalizado, com estimativa TRI','◷'],
  ]:[
   ['dia-1/linguagens','Começar pelos guias','Interpretação, língua e literatura','Aa'],
   ['dia-1/enem','Resolver questões','Linguagens e Ciências Humanas','✓'],
   ['dia-1/simulados','Fazer simulado','Treina com tempo e confere a correção','◷'],
  ];
  root.innerHTML=`<div class="study-hub" data-day="${space==='engenharias'?'engineering':meta?.day||'geral'}">
   <header class="study-hub-hero"><div><p class="study-kicker">${general?'TEU PAINEL DE ESTUDOS':space==='engenharias'?'ENGENHARIAS · DA BASE AO CÁLCULO':'ENEM · DIA '+meta.day}</p><h1 id="studyHubTitle" tabindex="-1">${meta?.title||'O que vamos estudar hoje?'}</h1>${meta?'<div class="study-tags" aria-label="Matérias">'+hubSubjects(meta)+'</div>':'<p>Escolhe uma ação para começar. Todos os recursos estão organizados abaixo.</p>'}</div><span class="study-hub-symbol" aria-hidden="true">${meta?.symbol||'B'}</span></header>
   <section class="study-primary-actions" aria-label="Por onde começar">${actions.map(([path,title,detail,icon])=>routeLink(path,title,detail,icon,'study-action')).join('')}</section>
   ${globalThis.FurgExercicios?.hubBanner(general?'geral':space)||''}
   <div class="study-panel-tools">${searchMarkup('studyHubSearch')}<a href="#${space==='engenharias'?'engenharias/progresso':general?'desempenho':space+'/desempenho'}" data-study-route="${space==='engenharias'?'engenharias/progresso':general?'desempenho':space+'/desempenho'}" class="study-progress-link">${space==='engenharias'?'Meu progresso ↗':'Meu desempenho e TRI ↗'}</a></div>
   ${space!=='dia-1'&&space!=='engenharias'?'<div class="study-featured" aria-label="Atalhos para as listas progressivas"><span>Listas do básico à aplicação</span>'+routeLink('dia-2/aulas/matematica/polinomios','Polinômios','12 exercícios progressivos','∑')+routeLink('dia-2/aulas/quimica/bioquimica','Bioquímica','12 exercícios progressivos','⚗')+'</div>':''}
   <p class="study-flow"><b>Ordem sugerida:</b> <span>1 · Estudar</span> a ideia <i aria-hidden="true">→</i> <span>2 · Exercícios</span> do básico ao avançado <i aria-hidden="true">→</i> <span>3 · Provas</span> para medir o nível <i aria-hidden="true">→</i> <span>4 · Revisar</span> o que errou. Pode entrar por qualquer bloco.</p>
   <div class="study-hub-grid">${Object.entries(groups).map(([id,title],index)=>{
    const all=menusFor(space)[id],topo=new Set(actions.map(a=>a[0])),extra=all.filter(r=>!topo.has(routeFor(space,r[0]))),rows=extra.length?extra:all,markup=items=>items.map(([page,label,detail,icon])=>'<li>'+routeLink(routeFor(space,page),label,detail,icon)+'</li>').join('');
    return `<section class="study-hub-group"><p class="study-kicker">0${index+1}</p><h2>${space==='engenharias'&&id==='provas'?'Desafios':title}</h2><p class="study-group-description">${space==='engenharias'&&id==='provas'?'Problemas para juntar as ideias.':{estudos:'Entende a base e conecta as ideias.',treinamento:'Aplica o que aprendeu, uma questão por vez.',provas:'Treina com tempo e consulta os originais.',revisao:'Volta aos erros e acompanha teu progresso.'}[id]}</p><ul>${markup(rows.slice(0,3))}</ul>${rows.length>3?'<details class="study-more"><summary>Mais opções de '+title.toLowerCase()+' ('+(rows.length-3)+')</summary><ul>'+markup(rows.slice(3))+'</ul></details>':''}</section>`;
   }).join('')}</div></div>`;
  bindSearch('studyHubSearch');
 }
 function renderBreadcrumb(route){
  const root=$('studyBreadcrumb');if(!root)return;root.hidden=route.view==='inicio';if(root.hidden)return;
  const area=get(route.space),home=area?route.space:'geral',parts=[routeLink('inicio','Início','','⌂')];
  if(route.view==='area-estudo')parts.push('<span aria-current="page">'+(area?(area.label||'Painel do Dia '+area.day):'Visão geral')+'</span>');
  else{
   parts.push(routeLink(home,area?(area.label||'Painel do Dia '+area.day):'Visão geral','',''));
   const row=Object.values(menusFor(route.space)).flat().find(([page])=>page===route.page);
   const lesson=route.space==='engenharias'?globalThis.FurgEngineering?.lessons.find(x=>x.id===route.lesson):globalThis.FURG_DIA2_LESSONS?.[route.subject]?.find(x=>x.id===route.lesson);
   parts.push('<span aria-current="page">'+escape(lesson?.title||row?.[1]||({aulas:'Todas as aulas',configuracoes:'Configurações',desempenho:'Meu desempenho'})[route.page]||'Estudo')+'</span>');
  }
  root.innerHTML=parts.join('<span aria-hidden="true" class="study-breadcrumb-separator">/</span>');
 }

 function activate(route) {
  current=route.space;
  document.documentElement.dataset.studySpace=current;
  document.documentElement.dataset.studyView=route.view;
  if(route.view==='area-estudo')renderHub(current);
  if(route.view==='inicio'&&$('studyHomeSearchRoot')){$('studyHomeSearchRoot').innerHTML=searchMarkup('studyHomeSearch');bindSearch('studyHomeSearch');}
  renderBreadcrumb(route);
 }

 globalThis.FurgStudyAreas={get,groups,menusFor,routeFor,contains,resolve,parse,activate,viewOf,current:()=>current,day:()=>get(current)?.day||'',
  open:page=>current==='engenharias'?undefined:shortcuts[page]?.open?.()};
})();
