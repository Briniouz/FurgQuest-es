'use strict';
module.exports=function({ctx,$,vm,events,assert,document,errors,html}){
 const nav=ctx.FurgNavigation,areas=ctx.FurgStudyAreas,run=code=>vm.runInContext(code,ctx);
 const navigate=path=>run('openStudyRoute('+JSON.stringify(path)+')');
 assert.equal((html.match(/data-nav-group="/g)||[]).length,5);
 assert.equal((html.match(/class="nav-popover"/g)||[]).length,5);
 const top=html.match(/<nav id="mainNavigation"[^>]*>([\s\S]*?)<\/nav>/)[1];
 assert.deepEqual([...top.matchAll(/data-nav-group="([^"]+)"/g)].map(m=>m[1]),['areas','estudos','treinamento','provas','revisao']);
 assert.equal(areas.parse('').view,'inicio');assert.equal(areas.parse('geral').view,'area-estudo');
 assert.equal(areas.parse('dia-1/calculo-mental').view,'area-estudo');
 // Every destination in the new catalogue resolves without silently returning home.
 for(const space of ['geral','dia-1','dia-2','engenharias'])for(const rows of Object.values(areas.menusFor(space)))for(const [page] of rows){
  const path=areas.routeFor(space,page),route=areas.parse(path);
  assert.notEqual(route.view,'inicio',path);assert.equal(route.path,path,path);
 }
 const recorded=run('JSON.stringify(state)');
 navigate('geral');assert($('studyHubRoot').innerHTML.includes('O que vamos estudar hoje?'));
 assert($('studyHubRoot').innerHTML.includes('Aprender do zero'));
 assert($('navGeneral-estudos').innerHTML.includes('Aprender passo a passo'));
 navigate('engenharias');assert($('studyHubRoot').innerHTML.includes('id="studyHubTitle" tabindex="-1">Engenharias</h1>'));
 assert($('studyHubRoot').innerHTML.includes('Começar pela Trigonometria'));
 assert.equal($('navSpaceLabel').textContent,'Engenharias');
 assert.equal(areas.parse('engenharias/aula/razoes').lesson,'razoes');
 assert.equal(areas.parse('engenharias/aula/inexistente').view,'area-estudo');
 navigate('engenharias/passo-a-passo');assert($('engineeringRoot').innerHTML.includes('Tua sequência de estudo'));assert($('engineeringRoot').innerHTML.includes('Trigonometria'));
 assert($('engineeringRoot').innerHTML.indexOf('Trigonometria')<$('engineeringRoot').innerHTML.indexOf('Geometria Analítica'));
 navigate('engenharias/aula/razoes');assert($('engineeringRoot').innerHTML.includes('Índice de aulas'));assert($('engineeringRoot').innerHTML.includes('1. Entender'));assert($('engineeringRoot').innerHTML.includes('Conferir resposta'));
 assert($('engineeringRoot').innerHTML.includes('5/12'));
 navigate('engenharias/exercicios');assert($('engineeringRoot').innerHTML.includes('Seleciona uma alternativa'));
 navigate('engenharias/progresso');assert($('engineeringRoot').innerHTML.includes('aulas concluídas'));
 navigate('engenharias/revisar');assert($('engineeringRoot').innerHTML.includes('Rever os erros'));
 assert.equal(ctx.FurgEngineering.valid({completed:{razoes:true,other:true},attempts:{razoes:{wrong:2,correct:true}}}).completed.other,undefined);
 navigate('dia-2');assert.equal(areas.parse('dia-2/apostas').view,'area-estudo');assert(!$('studyHubRoot').innerHTML.includes('Apostas do Dia 2'));assert(!areas.menusFor('dia-2').treinamento.some(([page])=>page==='apostas'));navigate('dia-2/dia2');ctx.FurgDia2.showTraining();assert(!$('dia2Root').innerHTML.includes('Apostas do Dia 2'));assert(!$('dia2Root').innerHTML.includes('Apostas de Biologia'));navigate('dia-2');assert($('studyHubRoot').innerHTML.includes('Polinômios'));
 assert($('studyHubRoot').innerHTML.includes('Bioquímica'));
 assert($('studyHubRoot').innerHTML.includes('Mais opções de estudar'));
 // Accent-insensitive search finds lessons, and escapes typed markup by not interpolating it.
 $('studyHubSearch').value='polinomios';for(const fn of events['studyHubSearch:input']||[])fn({});
 assert($('studyHubSearchResults').innerHTML.includes('dia-2/aulas/matematica/polinomios'));
 $('studyHubSearch').value='bioquimica';for(const fn of events['studyHubSearch:input']||[])fn({});
 assert($('studyHubSearchResults').innerHTML.includes('dia-2/aulas/quimica/bioquimica'));
 $('studyHubSearch').value='<img src=x>';for(const fn of events['studyHubSearch:input']||[])fn({});
 assert(!$('studyHubSearchResults').innerHTML.includes('<img'));
 $('studyHubSearch').value='';for(const fn of events['studyHubSearch:input']||[])fn({});assert($('studyHubSearchResults').hidden);
 // New review shortcuts open the relevant review itself, not the default training tab.
 navigate('dia-1/erros-treino');assert.equal(run('view'),'vespera');assert($('vesperaRoot').innerHTML.includes('Revisar meus erros'));
 navigate('dia-2/erros-treino');assert.equal(run('view'),'dia2');assert($('dia2Root').innerHTML.includes('Meus erros'));
 navigate('dia-2/erros-simulados');assert($('enemSimRoot').innerHTML.includes('Caderno de erros'));
 navigate('dia-2/simulados-salvos');assert($('enemSimRoot').innerHTML.includes('Teus simulados do ENEM'));
 assert($('navTrigger-revisao').classList.contains('is-active'));
 navigate('dia-2/aulas/matematica/polinomios');assert($('studyBreadcrumb').innerHTML.includes('Painel do Dia 2'));
 assert($('studyBreadcrumb').innerHTML.includes('Polinômios: termos, grau e operações'));
 assert($('navTrigger-estudos').classList.contains('is-active'));
 for(const space of ['dia-1','dia-2']){
  navigate(space+'/enem');assert($('navTrigger-treinamento').classList.contains('is-active'));
  const id=$('enemQuestionRoot').innerHTML.match(/data-question-id="([^"]+)"/)?.[1];
  assert(areas.contains(space,ctx.FURG_ENEM_DATA.questions.find(q=>q.id===id)?.area));
  navigate(space+'/simulados');assert($('enemSimRoot').innerHTML.includes('Por ano'));assert($('enemSimRoot').innerHTML.includes('Personalizado'));
  assert.equal($('enemExamDay').value,space.slice(-1));assert($('furgSimSection').hidden);
 }
 assert(nav.back());assert.equal(run('studyPath'),'dia-2/enem');
 // Dropdown navigation: arrow keys, Escape, focus return, outside click, single open menu.
 const trigger=id=>{for(const fn of events['navTrigger-'+id+':click']||[])fn({});};
 const key=(value,target)=>{for(const fn of events['document:keydown']||[])fn({key:value,preventDefault(){},stopPropagation(){},target:{closest:selector=>selector==='#navigationMenus'&&target?$('navMenu-revisao'):selector==='button'?target:null}});};
 $('navMenu-revisao').innerHTML=$('navScoped-revisao').innerHTML;
 trigger('revisao');assert(nav.isOpen());assert(!$('navMenu-revisao').hidden);
 const first=$('navMenu-revisao').querySelectorAll('button')[0];first.focus();key('ArrowDown',first);
 assert.equal(document.activeElement,$('navMenu-revisao').querySelectorAll('button')[1]);
 key('Escape',document.activeElement);assert(!nav.isOpen());assert.equal(document.activeElement,$('navTrigger-revisao'));
 trigger('provas');trigger('estudos');assert($('navMenu-provas').hidden);assert(!$('navMenu-estudos').hidden);
 for(const fn of events['document:click']||[])fn({target:{closest:()=>null},preventDefault(){}});assert(!nav.isOpen());
 navigate('geral');$('brandHome').onclick({preventDefault(){}});assert.equal(run('view'),'inicio');
 const after=JSON.parse(run('JSON.stringify(state)'));assert(after.dia2.lessonVisits.polinomios>0);after.dia2.lessonVisits=JSON.parse(recorded).dia2.lessonVisits;
 assert.equal(JSON.stringify(after),recorded,'Navigation changed saved answers or progress');
 assert.equal(errors.length,0);
 console.log('PASS: all menu routes, general dashboard, accent-insensitive lesson search, contextual review, scoped banks and simulations, breadcrumbs, keyboard navigation and unchanged saved progress.');
};
