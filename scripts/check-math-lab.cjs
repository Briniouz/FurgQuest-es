'use strict';
module.exports=async function checkMathLab({ctx,$,vm,events,assert,exported}) {
 const lab=ctx.FurgMathLab, M=ctx.FurgMathLabModel, run=code=>vm.runInContext(code,ctx);
 const get=()=>run('state.mathLab');
 assert.equal(M.bank.size,764);
 assert.equal(M.guided.length,32);
 assert.equal(M.formulas.size,27);
 for(const q of M.bank.values()){
  const meta=M.catalog.get(q.id);
  assert(M.levels[meta.level] && meta.skills.length && meta.skills.every(k=>M.skills[k]));
 }
 for(const id of M.guided){
  const item=M.models.get(id), q=M.bank.get(id);
  assert.equal(item.key,q.answer);
  assert.equal(item.fingerprint,ctx.FurgEnemLayout.fingerprint(q));
  assert.equal(item.hints.length,3);
  assert.equal(item.routes.length,2);
  assert(item.routes.every(route=>route.title&&route.text&&route.when));
  assert(M.formulas.has(item.formula));
 }
 assert.equal(M.models.get('enem-2025-167').supplement.rows.length,2);
 assert(M.similar('enem-2024-140',[],[],2));
 assert.equal(M.adaptiveLevel(Array.from({length:5},()=>({correct:true}))),3);
 assert.equal(M.adaptiveLevel(Array.from({length:5},()=>({correct:false}))),1);
 assert.equal(M.adaptiveLevel([]),2);
 assert(M.equalNumber(M.numeric('0,125'),{n:1,d:8}));
 assert(M.equalNumber(M.numeric('-12/8'),{n:-3,d:2}));
 assert.equal(M.numeric('4/0'),null);
 assert.equal(M.numeric('1e2'),null);
 for(const op of Object.keys(M.operations)){
  for(const level of [1,42,100]){
   const item=M.mentalQuestion({op,level,mode:'brutal',index:0,seed:10});
   assert(item.prompt && Number.isSafeInteger(item.n) && item.d>0);
   assert(M.equalNumber(M.numeric(M.formatNumber(item)),item));
  }
 }
 const t=100000000, D=M.DAY, wrong={correct:false,choice:'A'}, good={correct:true,choice:'B',guess:false,aid:false};
 let review=M.schedule(null,wrong,t);
 assert.equal(review.due,t+D);
 assert.equal(M.schedule(review,good,t).due,t+D);
 review=M.schedule(review,good,t+D);
 assert.equal(review.due,t+4*D);
 review=M.schedule(review,good,t+4*D);
 assert.equal(review.due,t+11*D);
 review=M.schedule(review,good,t+11*D);
 assert.equal(review.due,t+25*D);
 assert.equal(M.schedule(review,good,t+25*D).due,null);
 assert.equal(M.schedule(review,{...good,aid:true},t+25*D).due,t+26*D);
 assert.equal(M.schedule(review,{...good,guess:true},t+25*D).kind,'chute');

 run("setView('matematica-lab')");
 const beforeFirst=run('JSON.stringify(state.vespera)'), beforeSecond=run('JSON.stringify(state.dia2)');
 const beforeBank=run('JSON.stringify(state.enem)');
 const beforeSkills=run('JSON.stringify(state.skills)');
 assert($('mathLabRoot').innerHTML.includes('Começar treino adaptativo'));
 assert(lab.begin('questao','enem-2024-137'));
 assert(!lab.answer({choice:'B'}));
 assert(!$('mathLabRoot').innerHTML.includes('Comparador de estratégias'));
 const click=dataset=>events['mathLabRoot:click'][0]({target:{closest:()=>({dataset})}});
 click({ml:'hint'});
 assert.equal(get().session.hint,1);
 assert($('mathLabRoot').innerHTML.includes('ETAPA 1 DE 3'));
 assert(!$('mathLabRoot').innerHTML.includes('ETAPA 2 DE 3'));
 click({ml:'hint'});
 assert($('mathLabRoot').innerHTML.includes('ETAPA 2 DE 3'));
 assert(!$('mathLabRoot').innerHTML.includes('ETAPA 1 DE 3'));
 const write=ctx.localStorage.setItem, snapshot=JSON.stringify(get());
 ctx.localStorage.setItem=()=>{throw Error('full');};
 assert(!lab.answer({choice:'A',confidence:'alta'}));
 assert.equal(JSON.stringify(get()),snapshot);
 ctx.localStorage.setItem=write;
 assert(lab.answer({choice:'A',confidence:'alta'}));
 assert(!lab.answer({choice:'A',confidence:'alta'}));
 assert(get().attempts.at(-1).aid);
 assert(get().notebook['enem-2024-137'].due > Date.now());
 assert($('mathLabRoot').innerHTML.includes('Comparador de estratégias'));
 assert($('mathLabRoot').innerHTML.includes('Tentar uma parecida'));
 assert(lab.note('enem-2024-137',{kind:'erro',reason:'calculo',note:'Comparar divisores <script>x</script>'}));
 assert(lab.saveMark('q','enem-2024-137') && lab.saveMark('f','media') && lab.saveMark('s','enem-2024-137'));
 click({ml:'tab',value:'colecao'});
 assert($('mathLabRoot').innerHTML.includes('3 itens salvos'));
 assert($('mathLabRoot').innerHTML.includes('Imprimir ou salvar PDF'));
 click({ml:'tab',value:'erros'});
 assert($('mathLabRoot').innerHTML.includes('&lt;script&gt;x&lt;/script&gt;'));
 click({ml:'tab',value:'painel'});
 assert($('mathLabRoot').innerHTML.includes('Erros com confiança alta · 1'));
 click({ml:'tab',value:'banco'});
 assert($('mathLabRoot').innerHTML.includes('764 questões'));
 const send=(type,target)=>events['mathLabRoot:'+type][0]({target});
 send('change',{id:'mlGuided',checked:true,closest:()=>null});
 send('input',{id:'mlSearch',value:'2024 151'});
 assert($('mlBankResults').innerHTML.includes('1 questão'));
 assert($('mlBankResults').innerHTML.includes('Vão de uma maquete'));
 assert(lab.begin('ferramenta'));
 assert($('mathLabRoot').innerHTML.includes('Qual ferramenta usar?'));
 assert(!$('mathLabRoot').innerHTML.includes('Conferir resposta'));
 const tool=M.models.get(get().session.ids[0]).formula;
 click({ml:'tool',value:tool});
 assert($('mathLabRoot').innerHTML.includes('Boa escolha'));
 assert($('mathLabRoot').innerHTML.includes('Conferir resposta'));
 assert(lab.begin('tempo',null,t));
 assert.equal(get().session.deadline,t+180000);
 assert(!lab.answer({},t+179999));
 lab.tick(t+180000);
 assert.equal(get().attempts.at(-1).choice,'');
 assert.equal(get().notebook[get().attempts.at(-1).qid].reason,'tempo');

 assert(!lab.startMental('soma',2));
 assert(lab.startMental('soma',1));
 for(let i=0;i<10;i++){
  const q=M.mentalQuestion(get().mental.run);
  assert(lab.mentalAnswer(M.formatNumber(q)));
 }
 assert.equal(get().mental.scores['leve/soma'].level,2);
 assert.equal(get().mental.scores['leve/soma'].xp,100);
 assert(lab.startMental('sobrevivencia',1,t));
 const q=M.mentalQuestion(get().mental.run);
 assert(lab.mentalAnswer(M.formatNumber(q),t+10));
 assert.equal(get().mental.best,1);
 const deadline=get().mental.run.deadline;
 lab.tick(deadline);
 assert(get().mental.run.done);
 assert.equal(get().mental.best,1);

 assert(ctx.FurgEnem.openQuestion('enem-2024-137'));
 assert($('enemQuestionRoot').innerHTML.includes('data-question-id="enem-2024-137"'));
 assert($('enemQuestionRoot').innerHTML.includes('Resolver guiado'));
 assert($('enemQuestionRoot').innerHTML.includes('★ Na coleção'));
 lab.openNotebook('enem-2024-137');
 assert($('mlDialog').open);
 $('mlDialog').close();
 $('exportProgress').click();
 const backup=JSON.parse(await exported.at(-1).text());
 const restore=async data=>{
  const text=JSON.stringify(data);
  await $('progressFile').onchange({target:{files:[{size:text.length,text:async()=>text}],value:'test'}});
 };
 await restore(backup);
 await restore({version:1,answers:{}});
 assert.equal(get().attempts.length,2);
 assert.equal(get().mental.best,1);
 assert.equal(get().mental.scores['leve/soma'].level,2);
 assert(lab.isSaved('enem-2024-137'));
 assert.equal(run('JSON.stringify(state.vespera)'),beforeFirst);
 assert.equal(run('JSON.stringify(state.dia2)'),beforeSecond);
 assert.equal(run('JSON.stringify(state.enem)'),beforeBank);
 assert.equal(run('JSON.stringify(state.skills)'),beforeSkills);
 console.log('PASS: math lab bank, 32 guided keys, clues, strategies, confidence, spaced/adaptive practice, timed grade, mental progress, collection and real backup.');
};
