'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const questions=JSON.parse(fs.readFileSync('day1-practice-data.json')).questions;
assert.equal(questions.length,120);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(questions.slice(0,72))).digest('hex'),'bbc692a326215b7fc3e14430af33b74a9e54482c10e29c6e04b622a3ce450051','The original 72 warm-up questions changed');
assert.deepEqual(questions.slice(72),JSON.parse(fs.readFileSync('scripts/day1-extra.json')));
assert.equal(new Set(questions.map(q=>q.id)).size,120);
for(const q of questions.slice(72)){
  assert(q.explanation.length>70&&q.tip&&q.prompt&&q.topic);
  if(q.type==='match'){assert(q.pairs.length>=3);assert.equal(new Set(q.pairs.map(p=>p.right)).size,q.pairs.length);}
  else {assert.equal(q.options.length,4);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);if(q.type==='cloze')assert.equal((q.prompt.match(/____/g)||[]).length,1);}
}
const state={answers:{legacy:{choice:'B'}},profile:{name:'Aluno'},enem:{answers:{keep:{choice:'C'}}}},before=JSON.stringify(state);
const c=vm.createContext({console,document:{getElementById:()=>null},localStorage:{setItem(){throw Error('Reference search must not save progress');}}});
for(const f of ['thinkers-data.js','linguagens-data.js','study-concepts-data.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
c.FurgThinkers={ensure:async()=>c.FURG_THINKERS_DATA};c.FurgLanguages={ensure:async()=>c.FURG_LANGUAGENS_DATA};
vm.runInContext(fs.readFileSync('study-guide.js','utf8'),c,{filename:'study-guide.js'});
const names=new Set(c.FURG_THINKERS_DATA.map(p=>p.name));
assert.equal(c.FURG_STUDY_CONCEPTS.length,35);assert.equal(new Set(c.FURG_STUDY_CONCEPTS.map(p=>p.id)).size,35);
for(const entry of c.FURG_STUDY_CONCEPTS){assert(entry.summary&&entry.tip&&entry.points.length>=2&&entry.example);assert(entry.people.every(name=>names.has(name)),entry.title);assert(entry.sources.length,entry.title);for(const source of entry.sources)assert(/^https:\/\/[^\s<>"']+$/.test(source.url),source.url);}
(async()=>{
 await c.FurgStudyGuide.ensure();
 const find=(q,type='all')=>c.FurgStudyGuide.select(q,type);
 assert.equal(find('').length,291);assert.equal(find('','profiles').length,224);assert.equal(find('','concepts').length,67);
 assert.equal(find('ALIENAÇÃO','concepts')[0].title,'Alienação');assert(find('alienacao','profiles').some(p=>p.title==='Karl Marx'));assert.equal(find('Machado','profiles')[0].title,'Machado de Assis');
 assert(find('função poética','concepts').some(p=>p.title==='As seis funções da linguagem'));assert(find('Memórias Póstumas','profiles').some(p=>p.title==='Machado de Assis'));assert(find('Hegel','profiles').some(p=>p.title==='G. W. F. Hegel'));
 for(const entry of find('','concepts')){assert(entry.examFocus.length>=2,entry.title);assert(entry.example&&entry.exampleExplanation,entry.title);}const stoic=find('estoicismo');assert.equal(stoic[0].title,'Estoicismo');assert.equal(stoic[0].examFocus.length,3);assert(find('Sêneca','profiles')[0].example);assert.equal(find('Sêneca','profiles')[0].exampleTopic,'Estoicismo');assert.equal(find('termoqueaindanaoexiste').length,0);assert.equal(JSON.stringify(state),before);
 const prefState={answers:{original:{choice:'B'}},profile:{name:'Ana'}},calls=[];let saves=0,fail=false;
 const doc={getElementById:()=>null,querySelector:()=>null,documentElement:{dataset:{}}};
 const p=vm.createContext({document:doc,FurgElimination:{clearAll:()=>calls.push('clear')}});vm.runInContext(fs.readFileSync('study-settings.js','utf8'),p);
 p.FurgSettings.init({getState:()=>prefState,save:()=>{saves++;return !fail;}});
 assert.equal(prefState.preferences.guideLauncher,true);assert.equal(saves,0,'Migration must not save over an older progress file');
 assert(p.FurgSettings.set('shortcuts',false));assert.equal(doc.documentElement.dataset.shortcuts,'false');
 assert(p.FurgSettings.set('crossOut',false));assert(calls.length);assert(!p.FurgSettings.set('unknown',true));assert(!p.FurgSettings.set('hints','false'));
 const saved=JSON.stringify(prefState);fail=true;assert(!p.FurgSettings.set('hints',false));assert.equal(JSON.stringify(prefState),saved,'Failed preference save did not roll back');
 assert.equal(prefState.answers.original.choice,'B');assert.equal(prefState.profile.name,'Ana');
 const clean=p.FurgSettings.validate({guideLauncher:'false',quickCards:false,unknown:true});assert.equal(clean.guideLauncher,true);assert.equal(clean.quickCards,false);assert(!Object.hasOwn(clean,'unknown'));
 const html=fs.readFileSync('index.html','utf8'),css=fs.readFileSync('navigation.css','utf8');assert(!html.includes('data-app-only'));assert(!css.includes('html[data-app-mode=web]'));assert(html.includes('id="studyGuideLauncher"'));assert(html.includes('id="configuracoes"'));assert(!html.includes('<script src="study-concepts-data.js'));
 console.log('PASS: 120 warm-up exercises, original 72 unchanged; 224 profiles + 67 concept guides, accent/name/work search, lazy reference data, isolated progress, strict preferences and save rollback; full FURG navigation restored on the web.');
})().catch(error=>{console.error(error);process.exitCode=1;});

exports.integration=async function({ctx,$,vm,events,assert,storage,progressKey,exported,document,errors}){
 const snapshot=vm.runInContext('JSON.stringify(state)',ctx),settings=ctx.FurgSettings;
 settings.set('guideLauncher',false);settings.set('quickCards',false);settings.set('shortcuts',false);
 const expected=JSON.stringify(settings.get());
 $('exportProgress').click();const backup=JSON.parse(await exported.at(-1).text());assert.equal(backup.preferences.guideLauncher,false);assert.equal(backup.preferences.shortcuts,false);
 settings.set('guideLauncher',true);const json=JSON.stringify(backup);await $('progressFile').onchange({target:{files:[{size:Buffer.byteLength(json),text:async()=>json}],value:'preferences.json'}});assert.equal(JSON.stringify(settings.get()),expected);assert.equal(document.documentElement.dataset.guideLauncher,'false');
 const legacy=JSON.stringify({version:1,answers:{}});await $('progressFile').onchange({target:{files:[{size:legacy.length,text:async()=>legacy}],value:'legacy.json'}});assert.equal(JSON.stringify(settings.get()),expected,'Legacy import reset preferences');
 const saved=JSON.stringify(settings.get()),setItem=ctx.localStorage.setItem;ctx.localStorage.setItem=()=>{throw Error('quota');};assert(!settings.set('hints',false));assert.equal(JSON.stringify(settings.get()),saved);ctx.localStorage.setItem=setItem;
 vm.runInContext("setView('banco')",ctx);const oldChoice=vm.runInContext('selection',ctx);let prevented=false;for(const fn of events['document:keydown']||[])fn({key:'A',target:{closest:()=>null},preventDefault(){prevented=true;}});assert.equal(vm.runInContext('selection',ctx),oldChoice);assert(!prevented);
 vm.runInContext('state='+snapshot,ctx);settings.refresh();assert.equal(errors.length,0);
 console.log('PASS: preferences export/import, legacy merge, storage rollback and disabled answer shortcuts preserve the existing study records.');
};
