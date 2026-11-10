'use strict';
module.exports = async function checkDia2({ctx,$,vm,events,assert,exported}) {
 const mode = ctx.FurgDia2, guide = ctx.FURG_DIA2_GUIDE, data = ctx.FURG_DIA2_PRACTICE;
 const exercises = ctx.FURG_DIA2_EXERCISES, cards = new Map(guide.entries.map(e=>[e.id,e]));
 assert.equal(exercises.items.length,24);
 assert.equal(new Set(exercises.items.map(q=>q.id)).size,24);
 for(const subject of Object.keys(guide.subjects)){
  const list=exercises.items.filter(q=>cards.get(q.card)?.subject===subject);
  assert.equal(list.length,6);
  assert.deepEqual([...new Set(list.map(q=>q.level))].sort(),['aplicacao','base','desafio']);
 }
 for(const q of exercises.items){
  assert(/^d2-aut-/.test(q.id)&&q.title&&q.stem&&q.hint&&q.trap);
  assert.equal(q.options.length,5);
  assert.equal(new Set(q.options).size,5);
  assert(/^[A-E]$/.test(q.answer)&&q.steps.length===3&&q.steps.every(step=>step.length>20));
  assert(exercises.origins[q.card]);
 }
 const bank = new Map(ctx.FURG_ENEM_DATA.questions.map(q => [q.id,q]));
 assert.equal(guide.entries.length,96);
 assert.equal(new Set(guide.entries.map(e => e.id)).size,96);
 for (const subject of Object.keys(guide.subjects)) assert(mode.search('',subject).length >= 20);
 for (const e of guide.entries) {
  assert(e.rule && e.meaning && e.when && e.symbols && e.trap);
  assert.equal(e.example.length,3);
 }
 assert(mode.search('pressao','fisica').some(e => e.id === 'densidade'));
 assert.equal(mode.search('meia-vida','biologia').length,0);
 assert.equal(mode.search('Jaule','biologia')[0].id,'basico-joule');
 assert.equal(mode.search('O que é um joule?','quimica')[0].id,'basico-joule');
 assert.equal(mode.search('Qual é a fórmula da potência?','fisica','Básico')[0].id,'basico-potencia');
 assert(mode.search('Fluxo de água','fisica','Básico').some(e=>e.id==='basico-vazao'));
 assert.equal(mode.search('Fluxo de água por área','fisica','Básico')[0].id,'basico-fluxo-por-area');

 assert.equal(guide.commands.length,10);
 const ids = Object.values(data.blocks).flatMap(block => {
  assert.equal(block.ids.length,5);
  return Array.from(block.ids);
 });
 assert.equal(new Set(ids).size,25);
 assert.equal(ids.filter(id => data.questions[id].subject === 'fisica').length,10);
 for (const id of ids) {
  const q = bank.get(id), n = data.questions[id];
  assert.equal(q.application,'regular');
  assert(q.index >= 91 && q.alternatives.length === 5 && !q.canceled && !q.quality.blocked);
  assert.equal(q.answer,n.answer);
  assert.equal(data.official[q.year][q.index],q.answer);
  assert.equal(ctx.FurgEnemLayout.fingerprint(q),n.fingerprint);
  assert(n.steps.every(step => step.length > 20) && n.hint && n.trap);
  assert(guide.entries.some(e => e.id === n.card && e.subject === n.subject));
  for (const [before] of n.edits || []) assert(q.context.includes(before));
 }
 const inApp = js => vm.runInContext(js,ctx);
 inApp("state.enem.answers['enem-2023-124']={choice:'A', firstChoice:'A', attempts:1, viewed:true, date:''}; setView('dia2')");
 const click = dataset => events['dia2Root:click'][0]({target:{closest:()=>({dataset})}});
 click({d2:'tab',tab:'plano'});
 const oldBank = inApp('JSON.stringify(state.enem)'), oldFirstDay = inApp('JSON.stringify(state.vespera)');
 assert($('dia2Root').innerHTML.includes('Começa pela Física'));
 assert(mode.start('percurso'));
 const active = inApp('state.dia2.sessions.percurso'), first = bank.get(active.ids[0]);
 assert.equal(active.ids.length,25);
 assert(!mode.next());
 assert(!mode.record({choice:first.answer,confidence:'alta',request:'',plan:'Sem pedido'}));
 assert(!$('dia2Root').innerHTML.includes('d2Feedback'));
 const fail = ctx.localStorage.setItem, before = inApp('JSON.stringify(state.dia2)');
 ctx.localStorage.setItem = () => { throw Error('full'); };
 const answer = {choice:'A',confidence:'alta',request:'Comparar tempos de viagem',plan:'Somar as paradas ao tempo em movimento'};
 assert(!mode.record(answer));
 assert.equal(inApp('JSON.stringify(state.dia2)'),before);
 ctx.localStorage.setItem = fail;
 assert(mode.record(answer));
 assert(!mode.record(answer));
 assert.equal(mode.stats().repeat.total,1);
 assert.equal(mode.errors(true)[0].questionId,first.id);
 const html = $('dia2Root').innerHTML;
 assert(html.indexOf('d2Feedback') < html.indexOf('Próxima questão'));
 assert(html.indexOf('Próxima questão') < html.indexOf('Meu comentário'));
 const attempt = inApp('state.dia2.attempts[0]');
 $('d2Comment').value = 'Somar pedágios <script>teste</script>';
 $('d2Category').value = 'unidade';
 for (const fn of events['dia2Root:submit']) fn({preventDefault(){},target:{dataset:{d2Form:'note',attempt:attempt.id}}});
 assert.equal(inApp('state.dia2.attempts[0].category'),'unidade');
 assert.equal(inApp('state.dia2.attempts[0].comment'),$('d2Comment').value);
 assert(mode.next());
 assert($('dia2Root').innerHTML.includes('10⁴'));
 assert(mode.start('matematica'));
 assert.equal(inApp('state.dia2.sessions.percurso.index'),1);
 assert.equal(inApp('state.dia2.sessions.matematica.ids.length'),5);
 assert(mode.start('revisao',[first.id]));
 assert(mode.record({...answer,choice:first.answer}));
 assert.equal(mode.errors(true).length,0);
 assert(mode.next());
 mode.openGuide('fisica','lei de ohm');
 assert($('dia2QuickGuide').open);
 assert($('d2QuickResults').innerHTML.includes('U = Ri'));
 $('dia2QuickGuide').close();
 click({d2:'tab',tab:'caderno'});
 assert($('dia2Root').innerHTML.includes('&lt;script&gt;teste&lt;/script&gt;'));
 click({d2:'tab',tab:'flash'});
 click({d2:'flash-reveal'});
 click({d2:'flash-mark',mark:'again'});
 assert.equal(inApp("state.dia2.cards.velocidade.value"),'again');
 $('exportProgress').click();
 const backup = JSON.parse(await exported.at(-1).text());
 assert.equal(backup.dia2.attempts.length,2);
 const importFile = async data => {
  const text = JSON.stringify(data);
  await $('progressFile').onchange({target:{files:[{size:text.length,text:async()=>text}],value:'test'}});
 };
 await importFile(backup);
 await importFile({version:1,answers:{}});
 assert.equal(inApp('state.dia2.attempts.length'),2);
 assert.equal(inApp('state.dia2.sessions.percurso.index'),1);
 assert.equal(inApp('JSON.stringify(state.enem)'),oldBank);
 assert.equal(inApp('JSON.stringify(state.vespera)'),oldFirstDay);
 inApp("openStudyRoute('#dia-2/formulas')");
 const guideHTML=$('d2GuideResults').innerHTML;
 for(const label of ['Fórmula ou relação','O que quer dizer','Quando usar','Símbolos, unidades ou termos','Exemplo resolvido','Cuidado com este erro'])assert(guideHTML.includes(label));
 assert(guideHTML.includes('Por que essa relação funciona?'));
 assert($('dia2Root').innerHTML.includes('data-subject="quimica"'));
 click({d2:'exercise-card',card:'velocidade'});
 assert($('dia2Root').innerHTML.includes('Ida e volta na ciclovia'));
 assert(!$('dia2Root').innerHTML.includes('A posição zero é uma referência'));
 assert($('dia2Root').innerHTML.includes('d2-solution" data-d2-solution="d2-aut-rapidez"'));
 assert(!$('dia2Root').innerHTML.includes('d2-solution" open'));
 click({d2:'all-exercises'});
 assert($('dia2Root').innerHTML.includes('A posição zero é uma referência'));
 inApp("openStudyRoute('#dia-2/exercicios')");
 assert($('dia2Root').innerHTML.includes('Treinar 6 com correção'));
 const author=exercises.items.find(q=>q.id==='d2-aut-mu');
 for(const fn of events['dia2Root:toggle'])fn({target:{open:true,dataset:{d2Solution:author.id}}});
 assert(inApp("state.dia2.seenExercises['d2-aut-mu']"));
 assert(mode.start('autorais-fisica'));
 assert.equal(inApp('state.dia2.sessions["autorais-fisica"].ids.length'),6);
 assert(!$('dia2Root').innerHTML.includes('Caderno azul'));
 assert(!$('dia2Root').innerHTML.includes('d2Feedback'));
 assert(mode.record({choice:'A',confidence:'alta',request:'Encontrar o tempo',plan:'Dividir 120 m pela velocidade'}));
 assert.equal(inApp('state.dia2.attempts.at(-1).exposure'),'repeat');
 assert(mode.errors(true).some(e=>e.questionId===author.id));
 assert($('dia2Root').innerHTML.includes('Por que esse caminho')&&$('dia2Root').innerHTML.includes('30 s'));
 const authorBackup=JSON.parse(inApp('JSON.stringify(state)'));
 await importFile(authorBackup);
 await importFile({version:1,answers:{}});
 assert.equal(inApp('state.dia2.sessions["autorais-fisica"].ids.length'),6);
 assert.equal(inApp('state.dia2.sessions.percurso.ids.length'),25);
 assert.equal(inApp('JSON.stringify(state.enem)'),oldBank);
 assert.equal(inApp('JSON.stringify(state.vespera)'),oldFirstDay);
 const lessons=ctx.FURG_DIA2_LESSONS, maps=ctx.FurgDia2Maps.maps;
 const lessonIds=new Set();
 for(const [subject,list] of Object.entries(lessons)){
  assert.equal(list.length,9);
  const map=maps[subject], entries=map.branches.flatMap(branch=>branch.lessons);
  assert(map.root.title&&map.root.description);
  assert.equal(new Set(map.branches.map(branch=>branch.tone)).size,map.branches.length);
  assert.deepEqual(Array.from(entries,item=>item.id),Array.from(list,item=>item.id));
  for(const [index,entry] of entries.entries()){
   assert.equal(entry.number,index+1);
   assert.equal(entry.route,'dia-2/aulas/'+subject+'/'+list[index].id);
   assert.equal(ctx.FurgStudyAreas.parse('#'+entry.route).path,entry.route);
   assert(entry.description);
   if(subject==='fisica'){
    assert([1,2,3].includes(entry.relevance)&&Number.isInteger(entry.minutes)&&entry.minutes>0);
   }else{
    assert.equal(entry.relevance,null);
    assert.equal(entry.minutes,null);
   }
   for(const ref of entry.related){
    assert.notEqual(ref.subject,subject);
    assert(lessons[ref.subject].some(item=>item.id===ref.id));
    assert.equal(ctx.FurgStudyAreas.parse('#'+ref.route).path,ref.route);
   }
  }
  for(const path of map.paths)assert(path.lessons.every(id=>entries.some(item=>item.id===id)));
  for(const lesson of list){
   assert(!lessonIds.has(lesson.id));lessonIds.add(lesson.id);
   assert.equal(cards.get(lesson.card).subject,subject);
   assert(lesson.parts.length===3&&lesson.example.length>=4&&lesson.exam);
   assert(lesson.check.choices.length===3&&lesson.check.choices[lesson.check.correct]?.[1]);
   if(lesson.lab)assert(ctx.FurgDia2Labs.labs[lesson.lab]);
  }
 }
 assert.equal(lessonIds.size,36);
 const concepts=ctx.FURG_DIA2_CONCEPTS, linkedQuestions=new Set();
 for(const [subject,trails] of Object.entries(concepts)){
  const route='dia-2/conceitos/'+subject;
  assert.equal(ctx.FurgStudyAreas.parse('#'+route).path,route);
  for(const trail of trails){
   const nodes=trail.rows.flat(), preceding=new Set();
   for(const node of nodes){
    const [id,letter,level]=node.exam, q=bank.get(id);
    assert(node.cue&&node.formula&&node.idea&&!preceding.has(node.id));
    assert((node.from||[]).every(parent=>preceding.has(parent)));
    assert(lessons[subject].some(lesson=>lesson.id===node.lesson));
    assert([2,3].includes(level)&&ctx.FurgEnem.isGradable(id)&&q.quality.keyVerified&&q.answer===letter,id);
    assert(ctx.FURG_ENEM_SUBJECTS_DATA.questions[id].subjects.includes(subject),id);
    assert(!linkedQuestions.has(id),id);
    preceding.add(node.id);
    linkedQuestions.add(id);
   }
  }
 }
 assert.equal(linkedQuestions.size,43);
 const example=ctx.FurgDia2Concepts.workAt(4);
 assert.equal(example.pull+example.friction,example.total);
 assert.equal(example.total,24);
 assert.equal(example.final,28);
 assert.equal(example.speed,Math.sqrt(28));
 inApp("openStudyRoute('#dia-2/conceitos/fisica')");
 assert($('dia2LessonsRoot').innerHTML.includes('Depois do teorema · colisões'));
 assert($('dia2LessonsRoot').innerHTML.includes('Provas e gabaritos do Inep'));
 assert.equal(lessons.fisica[0].id,'energia');
 assert.equal(Object.keys(ctx.FurgDia2Labs.labs).length,5);
 assert(ctx.FurgDia2Labs.labs.rampa.draw(6).includes('80 J'));
 assert(ctx.FurgDia2Labs.labs.diluicao.draw(2.5).includes('8 g/L'));
 assert(ctx.FurgDia2Labs.labs.solidos.draw(2).includes('16 cm³'));
 assert.equal(ctx.FurgStudyAreas.parse('#dia-2/mapa/nao-existe').path,'dia-2/mapa');
 inApp("openStudyRoute('#dia-2/mapa/fisica')");
 assert($('dia2LessonsRoot').innerHTML.includes('dia-2/aulas/fisica/energia'));
 assert($('dia2LessonsRoot').innerHTML.includes('CONCEITO DE PARTIDA'));
 assert($('dia2LessonsRoot').innerHTML.includes('Tela ampla'));
 assert(!$('dia2LessonsRoot').innerHTML.includes('Continuar de onde parei'));
 inApp("openStudyRoute('#dia-2/aulas/fisica/energia')");
 assert($('dia2LessonsRoot').innerHTML.includes('Energia e transformações'));
 assert($('dia2LessonsRoot').innerHTML.includes('Exemplo resolvido'));
 assert($('dia2LessonsRoot').innerHTML.includes('dia-2/aulas/matematica/crescimento'));
 assert(inApp('state.dia2.lessonVisits.energia')>0);
 inApp("openStudyRoute('#dia-2/aulas/quimica/reacoes')");
 const lastVisit=inApp('state.dia2.lessonVisits.reacoes');
 assert(lastVisit>inApp('state.dia2.lessonVisits.energia'));
 await importFile({version:1,answers:{},dia2:{lessonVisits:{reacoes:1,energia:-1,unknown:lastVisit+1}}});
 assert.equal(inApp('state.dia2.lessonVisits.reacoes'),lastVisit);
 assert.equal(inApp('state.dia2.lessonVisits.unknown'),undefined);
 inApp("openStudyRoute('#dia-2/mapa/fisica')");
 assert.match($('dia2LessonsRoot').innerHTML,/dia-2\/aulas\/quimica\/reacoes[^>]+>Continuar de onde parei/);
 assert($('dia2LessonsRoot').innerHTML.includes('data-map-state="reading">Estudando'));
 await importFile({version:1,answers:{},dia2:{lessons:{energia:true,unknown:true,volumes:'true'}}});
 await importFile({version:1,answers:{},dia2:{lessons:{movimento:true}}});
 await importFile({version:1,answers:{}});
 assert.equal(inApp('JSON.stringify(state.dia2.lessons)'),'{"energia":true,"movimento":true}');
 inApp("openStudyRoute('#dia-2/aulas/fisica')");
 assert($('dia2LessonsRoot').innerHTML.includes('Forças, trabalho e equilíbrio</h2>'));
 assert($('dia2LessonsRoot').innerHTML.includes('2 de 9 estudadas'));
 assert.equal(inApp('state.dia2.lessonVisits.reacoes'),lastVisit);
 inApp("openStudyRoute('#dia-2/mapa/fisica')");
 assert($('dia2LessonsRoot').innerHTML.includes('data-map-state="done">Concluída'));
 assert($('dia2LessonsRoot').innerHTML.includes('data-map-progress-label="fisica">2 de 9 concluídas'));
 assert.equal(inApp('JSON.stringify(state.enem)'),oldBank);
 const bets=ctx.FURG_DIA2_BETS;
 assert.equal(bets.items.length,30);
 assert.equal(new Set(bets.items.map(q=>q.id)).size,30);
 assert.deepEqual(Array.from(bets.review,item=>item.number),[1,14,16]);
 for(const item of bets.items){
  assert(cards.has(item.card)&&guide.subjects[item.subject]&&item.hint&&item.steps.length===3);
  assert.equal(new Set(item.options).size,item.options.length);
  assert(item.options['ABCDE'.indexOf(item.answer)]);
 }
 const originalSession=inApp('JSON.stringify(state.dia2.sessions.percurso)');
 inApp("openStudyRoute('#dia-2/apostas')");
 assert($('dia2Root').innerHTML.includes('Apostas do Dia 2'));
 assert($('dia2Root').innerHTML.includes('Física · 0/4'));
 assert(mode.start('apostas-fisica'));
 assert($('dia2Root').innerHTML.includes('Da frenagem ao aquecimento'));
 assert(!$('dia2Root').innerHTML.includes('Gabarito original'));
 assert(mode.record({choice:'B',confidence:'media',request:'Energia e massa',plan:'Energia cinética e Q = mcΔT'}));
 assert($('dia2Root').innerHTML.includes('6,52 kg')&&$('dia2Root').innerHTML.includes('Próxima questão'));
 assert(mode.next());
 assert($('dia2Root').innerHTML.includes('Poder calorífico (kcal/kg)'));
 assert.equal(inApp('JSON.stringify(state.dia2.sessions.percurso)'),originalSession);
 assert.equal(mode.validate(JSON.parse(inApp('JSON.stringify(state.dia2)'))).sessions['apostas-fisica'].index,1);
 const {convert,parse}=ctx.FurgConversions;
 const close=(actual,wanted)=>assert(Math.abs(actual-wanted)<1e-8,`${actual} ≠ ${wanted}`);
 close(convert(-40,'temperatura','°C','°F'),-40);
 close(convert(0,'temperatura','K','°C'),-273.15);
 close(convert(-459.67,'temperatura','°F','K'),0);
 close(convert(41,'temperatura','°F','K'),278.15);
 assert.equal(convert(-274,'temperatura','°C','K'),null);
 assert.equal(convert(12,'area','m','m²'),null);
 close(convert(-10,'variacao-termica','°C','°F'),-18);
 close(convert(1,'area','m²','cm²'),10000);
 close(convert(1,'volume','m³','cm³'),1000000);
 close(convert(1,'energia','kWh','MJ'),3.6);
 close(convert(parse('0,8'),'densidade','g/cm³','kg/m³'),800);
 close(convert(72,'velocidade','km/h','m/s'),20);
 assert(Number.isNaN(parse('1,2,3')));
 inApp("openStudyRoute('#dia-2/conversoes')");
 assert($('dia2Root').innerHTML.includes('Laboratório de Grandezas e Conversões'));
 inApp("openStudyRoute('#dia-2/aulas/fisica/calor')");
 assert($('dia2LessonsRoot').innerHTML.includes('Uma temperatura, três escalas'));
 assert($('dia2LessonsRoot').innerHTML.includes('278,15 K'));
 assert.equal(mode.search('fahrenheit','quimica','Básico')[0].id,'basico-temperatura');
 console.log('PASS: 30 practice bets, separate sessions, legacy progress, temperature scales and intervals, dimensional conversions and lesson links.');
 const course=ctx.FurgStudyCourse, labs=ctx.FurgStudyLabs;
 assert.equal(Object.keys(ctx.FurgStudyData.layers).length,36);
 assert.equal(Object.keys(labs.labs).length,10);
 assert(labs.labs.conservacao.draw([2,100]).includes('40 J'));
 assert.deepEqual(Array.from(labs.motion([-4,2,4])),[0,4]);
 assert(Math.abs(labs.trig([30,10])[1]-5)<1e-8);
 const start=1700000000000, day=86400000;
 const review=course.schedule([{at:start,correct:true},{at:start+day,correct:true}],a=>a.correct,start+day);
 assert.equal(review.due,start+4*day);
 assert.equal(course.schedule([{at:start,correct:false}],a=>a.correct,start+day).ready,true);
 inApp("openStudyRoute('#dia-2/oficina')");
 assert($('dia2Root').innerHTML.includes('Oficina de estudo do Dia 2'));
 assert($('dia2Root').innerHTML.includes('Revisão espaçada'));
 assert(course.record('aula-calor',0));
 const saved=JSON.parse(inApp('JSON.stringify(state.dia2)'));
 assert.equal(mode.merge(saved,saved).learning.length,1);
 assert.equal(mode.merge(saved,{}).learning.length,1);
 console.log('PASS: 36 lesson extensions, 10 workshop labs, numerical models, spaced review, merge and navigation.');
 inApp("openStudyRoute('#dia2')");
 assert(ctx.FurgEnem.openSubject('fisica'));
 assert.equal(inApp('view'),'enem');
 assert.equal($('enemSubject').value,'fisica');
 assert(ctx.FurgEnemSim.selectDay('2'));
 assert.equal($('enemExamDay').value,'2');
 console.log('PASS: 96 intact cards, 24 original exercises with linked explanations, 25 fingerprint-checked questions and official keys, draft-safe grading, rollback, notebook, flashcards, high-confidence review, legacy backup, and subject/day links.');
 console.log('PASS: 43 concept cards with distinct verified ENEM questions, all subject routes and work–energy model.');
 console.log('PASS: 36 complete lessons, four connected maps, five visual labs, valid deep links, progress merge, legacy import and resume.');
};
