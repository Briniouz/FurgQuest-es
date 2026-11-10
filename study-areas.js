'use strict';
(() => {
 const $=id=>document.getElementById(id);
 const groups={provas:'Questões',treinamento:'Praticar',estudos:'Estudar'};
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
     ['apostas','Apostas do Dia 2','Questões da Parte 15 por matéria, com resolução','✦'],
     ['dia2','Treino guiado do Dia 2','Raciocínio, flashcards e revisão de erros','∑'],
     ['exercicios','Exercícios autorais','Questões por matéria com resolução em etapas','✓'],
     ['matematica-lab','Laboratório de Matemática','Desafios com tempo e caderno de erros','×'],
     ['calculo-mental','Cálculo mental','Rodadas rápidas por nível','⚡'],
     ['evolucao','Level Up','Exercícios progressivos de Matemática','→'],
    ],
    estudos:[
     ['aulas','Estudar do zero','Aulas com exemplos, experimentos e prática','↗'],
     ['roteiro-fisica','Roteiro do vídeo · Física','Da Cinemática à Ondulatória, na ordem do vídeo','▷'],
     ['mapa','Mapa mental','Expande os conceitos e abre as aulas no quadro','⤢'],
     ['conceitos','Mapa de conceitos','Pistas, fórmulas e questões por matéria','↝'],
     ['formulas','Fórmulas e conceitos','Guia de Matemática, Física, Química e Biologia','ƒ'],
     ['oficina','Oficina de estudo','Simuladores, dedução e revisão espaçada','◈'],
     ['transmissao-calor','Transmissão de calor','Convecção, condução e radiação animadas','≈'],
     ['conversoes','Grandezas e conversões','Unidades, fatores e exemplos passo a passo','⇄'],
     ['trilhas','Trilhas de estudo','Pré-requisitos, exemplos e exercícios','▥'],
    ],
   },
  },
 };
 const shortcuts={
  aquecimento:{view:'leve',open:()=>globalThis.FurgLightReview?.showDayOne()},
  repertorios:{view:'vespera',open:()=>globalThis.FurgVespera?.showRepertories()},
  formulas:{view:'dia2',open:()=>globalThis.FurgDia2?.showGuide()},
  apostas:{view:'dia2',open:()=>globalThis.FurgDia2?.showTraining()},
  oficina:{view:'dia2',open:()=>globalThis.FurgDia2?.showWorkshop()},
  'transmissao-calor':{view:'dia2',open:()=>globalThis.FurgDia2?.showWorkshop('transmissao')},
  conversoes:{view:'dia2',open:()=>globalThis.FurgDia2?.showConversions()},
  exercicios:{view:'dia2',open:()=>globalThis.FurgDia2?.showExercises()},
  'roteiro-fisica':{view:'aulas'},
  mapa:{view:'aulas'},
  conceitos:{view:'aulas'},
 };
 const views=new Set(['inicio','banco','leve','enem','anatomia','fuvest','evolucao','simulados','desempenho','trilhas','leituras','biblioteca','linguagens','acervo','configuracoes','vespera','dia2','aulas','matematica-lab','calculo-mental']);
 const get=space=>Object.hasOwn(areas,space)?areas[space]:null;
 const viewOf=page=>shortcuts[page]?.view||page;
 const contains=(space,questionArea)=>get(space)?.questionAreas.includes(questionArea)??true;
 const home={space:'geral',page:'inicio',view:'inicio',path:'inicio'};
 let current='geral';

 function allowed(space,page) {
  if(!get(space)||page==='desempenho'||page==='configuracoes')return true;
  return Object.values(areas[space].menus).some(rows=>rows.some(([key])=>key===page||viewOf(key)===page));
 }
 function resolve(page,space=current) {
  if(page==='inicio')return home;
  if(page==='geral')return {space:'geral',page,view:'linguagens',path:page};
  if(get(page))return {space:page,page:'area-estudo',view:'area-estudo',path:page};
  const view=viewOf(page);
  if(!views.has(view))return home;
  if(view==='aulas')space='dia-2';
  if(!get(space)||!allowed(space,page))space='geral';
  return {space,page,view,path:space==='geral'?page:space+'/'+page};
 }
 function parse(hash) {
  const [name,page,...rest]=String(hash||'').replace(/^#/,'').split('/');
  if(name==='dia-2'&&viewOf(page)==='aulas'&&rest.length){
   const base=resolve(page,name), [subject,lesson]=rest;
   const lengthIsValid=rest.length===1||(page==='aulas'&&rest.length===2&&!!lesson);
   if(lengthIsValid&&globalThis.FurgDia2Lessons?.valid(subject,lesson)){
    return {...base,subject,lesson,path:base.path+'/'+rest.join('/')};
   }
   return base;
  }
  if(rest.length)return home;
  if(page!==undefined)return get(name)&&allowed(name,page)&&views.has(viewOf(page))?resolve(page,name):resolve(get(name)?name:'inicio','geral');
  return resolve(name,'geral');
 }

 function hubSubjects(meta) {
  if(meta.day==='1')return meta.subjects.map(label=>`<span>${label}</span>`).join('');
  return meta.subjects.map(id=>{
   const {label,icon}=globalThis.FURG_DIA2_GUIDE.subjects[id];
   const path='dia-2/mapa/'+id;
   return `<a class="study-subject-link" data-subject="${id}" href="#${path}" data-study-route="${path}"><b aria-hidden="true">${icon}</b>${label}</a>`;
  }).join('');
 }

 function renderHub(space) {
  const meta=get(space), root=$('studyHubRoot');
  root.innerHTML=`<div class="study-hub" data-day="${meta.day}">
   <header class="study-hub-hero">
    <div>
     <p class="study-kicker">ENEM · DIA ${meta.day}</p>
     <h1 id="studyHubTitle" tabindex="-1">${meta.title}</h1>
     <div class="study-tags" aria-label="Matérias">${hubSubjects(meta)}</div>
    </div>
    <span class="study-hub-symbol" aria-hidden="true">${meta.symbol}</span>
   </header>
   <div class="study-hub-grid">${Object.entries(meta.menus).map(([id,rows],index)=>`<section class="study-hub-group">
    <p class="study-kicker">0${index+1}</p><h2>${groups[id]}</h2>
    <ul>${rows.map(([page,title,detail,icon])=>`<li><a href="#${space}/${page}" data-study-route="${space}/${page}">
     <span class="study-hub-icon" aria-hidden="true">${icon}</span><span><strong>${title}</strong><small>${detail}</small></span><i aria-hidden="true">→</i>
    </a></li>`).join('')}</ul></section>`).join('')}</div>
  </div>`;
 }

 function activate(route) {
  current=route.space;
  document.documentElement.dataset.studySpace=current;
  document.documentElement.dataset.studyView=route.view;
  if(route.view==='area-estudo')renderHub(current);
 }

 globalThis.FurgStudyAreas={get,groups,contains,resolve,parse,activate,viewOf,current:()=>current,day:()=>get(current)?.day||'',
  open:page=>shortcuts[page]?.open?.()};
})();
