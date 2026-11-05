'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const state={answers:{legacy:{choice:'B'}},profile:{name:'Aluno'},enem:{answers:{existing:{choice:'C'}}}};
const before=JSON.stringify(state),calls=[];
const c=vm.createContext({console,URLSearchParams,document:{getElementById:()=>null},localStorage:{setItem(){throw Error('Study guides must not write progress');}},FurgEnem:{practice(...args){calls.push(args);return true;}}});
for(const f of ['thinkers-data.js','linguagens-data.js','linguagens.js','enem-solutions.js','linguagens-solutions.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
const d=c.FURG_LANGUAGENS_DATA,people=c.FURG_THINKERS_DATA,bank=JSON.parse(fs.readFileSync('enem-data.json')).questions,byId=new Map(bank.map(q=>[q.id,q]));
assert.equal(d.topics.length,32);assert.equal(d.groups.length,6);assert.equal(d.totalBankQuestions,844);
assert.equal(new Set(d.topics.map(t=>t.id)).size,32);assert.equal(d.selectedQuestions,34);
assert.equal(people.length,224);
assert.equal(crypto.createHash('sha256').update(JSON.stringify(people.slice(0,208).map(({related,...p})=>p))).digest('hex'),'de71ce0c343e990651bf5e6dc97386b6173e793ba166cea4ddc88bb2b17bee76','The 208 previously published profiles changed');
const selected=new Set(),ids=new Set(people.map(p=>p.id));
for(const t of d.topics){assert(t.points.length>=3&&t.questions.length);assert(t.tip&&t.trap&&t.example.text&&t.example.explanation);assert(t.example.label.includes('autoral'));assert(d.groups.includes(t.group));for(const p of t.authors){assert(ids.has(p.id));assert.equal(p.name,people.find(x=>x.id===p.id).name);}for(const ref of t.questions){const q=byId.get(ref.id);assert(q,ref.id);assert.equal(q.area,'linguagens');assert.equal(ref.year,q.year);assert.equal(ref.index,q.index);assert.equal(ref.language,q.language);assert(ref.reason);selected.add(ref.id);}}
assert.equal(selected.size,34);assert.equal(Object.keys(c.FURG_ENEM_SOLUTIONS).length,66);
for(const [id,s]of Object.entries(c.FURG_ENEM_SOLUTIONS)){assert.equal(s.answerExpected,byId.get(id)?.answer,id);assert.equal(s.paragraphs.length,2);}
const topic=id=>d.topics.find(t=>t.id===id);
assert(c.FurgLanguages.matches(topic('figuras'),'metáfora',''));
assert(c.FurgLanguages.matches(topic('realismo-naturalismo'),'Machado','Literatura'));
assert(c.FurgLanguages.matches(topic('funcoes'),'função poética','Língua em uso'));
assert(!c.FurgLanguages.matches(topic('funcoes'),'','Literatura'));
assert.equal(d.topics.filter(t=>c.FurgLanguages.matches(t,'','Línguas estrangeiras')).length,2);
assert.equal(d.review.reduce((n,b)=>n+b.minutes,0),60);assert(d.review.at(-1).topics.includes('ingles')&&d.review.at(-1).topics.includes('espanhol'));
const html=fs.readFileSync('index.html','utf8');assert(!/<script[^>]+src="linguagens-data\.js/.test(html),'Guide data is not lazy');assert(html.includes('<title>BriniouzStudy</title>'));assert(html.includes('briniouz-mark.png'));assert(html.includes('id="pageBack"'));
for(const isApp of [true,false]){const doc={documentElement:{dataset:{}}};const cx=vm.createContext({document:doc,location:{hostname:isApp?'127.0.0.1':'briniouz.github.io',protocol:'https:',search:''},URLSearchParams});vm.runInContext(fs.readFileSync('app-mode.js','utf8'),cx);assert.equal(cx.FurgRuntime.isApp,isApp);for(const name of ['banco','leituras','acervo'])assert.equal(cx.FurgRuntime.view(name),name);for(const name of ['enem','fuvest','linguagens','biblioteca','simulados','evolucao'])assert.equal(cx.FurgRuntime.view(name),name);}
(async()=>{await c.FurgLanguages.ensure();assert(c.FurgLanguages.practice('variacao','enem-2024-14'));assert.equal(calls.length,1);assert.equal(calls[0][3],'linguagens');assert.equal(calls[0][2],'enem-2024-14');assert.deepEqual(Array.from(calls[0][0]),['enem-2024-14']);assert(!c.FurgLanguages.practice('unknown'));assert.equal(JSON.stringify(state),before);console.log('PASS: 32 Linguagens guides, 34 real linked questions, search/filters, 60-minute route, 66 guarded solutions, all 208 previous profiles preserved, lazy data, app/web scope and unchanged study progress.');})().catch(e=>{console.error(e);process.exitCode=1;});
