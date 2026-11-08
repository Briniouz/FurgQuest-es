'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const c=vm.createContext({console,document:{getElementById:()=>null},URLSearchParams});
for(const f of ['thinkers-data.js','thinkers-index.js','thinkers.js','enem-layout.js','linguagens-data.js','linguagens.js','study-concepts-data.js','study-guide.js','vespera-data.js','enem-anatomy-data.js','biblioteca-guia-data.js','biblioteca-guia.js','enem-solutions.js','linguagens-solutions.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
const people=c.FURG_THINKERS_DATA,index=c.FURG_THINKERS_INDEX,bank=JSON.parse(fs.readFileSync('enem-data.json','utf8')).questions,questions=new Map(bank.map(q=>[q.id,q]));
const originals=JSON.parse(fs.readFileSync('tests/fixtures/thinkers-v1.json','utf8'));
assert(!index.profiles['219'].references.some(r=>r.questionId==='enem-2009-106'),'M. F. Fernandes is not a confirmed mention of Millôr Fernandes');
assert(!index.profiles[String(people.find(p=>p.name==='Milton Santos').id)].references.some(r=>r.type==='direct'&&r.questionId==='enem-2020-79'),'An extended bibliographic signature must not be shortened to another author');
assert.equal(people.length,224);assert.equal(new Set(people.map(p=>p.id)).size,224);assert.equal(new Set(people.map(p=>p.name)).size,224);
for(const old of originals){const current=people.find(p=>p.id===old.id);assert(current,old.name);for(const[key,value]of Object.entries(old))assert.equal(JSON.stringify(current[key]),JSON.stringify(value),old.name+': '+key);}
for(const p of people){for(const field of ['name','fullName','area','period','movement','idea','details','connections','work','wiki'])assert(typeof p[field]==='string'&&p[field].trim(),p.name+': '+field);assert(p.concepts.length>=2);assert(p.sources.length);for(const s of p.sources)assert.equal(new URL(s.url).protocol,'https:');for(const related of p.related)assert(people.some(p=>p.id===related));}
assert.equal(index.totalQuestions,3833);assert.deepEqual(Array.from(index.years),Array.from({length:28},(_,i)=>1998+i));
assert.equal(index.corpusSha256,crypto.createHash('sha256').update(fs.readFileSync('enem-data.json')).digest('hex'));
let references=0;
for(const p of people){
 const m=index.profiles[String(p.id)],seen=new Set();assert(m,p.name);
 for(const r of m.references){
  const q=questions.get(r.questionId);assert(q,r.questionId);assert(!seen.has(q.id),p.name+' duplicate '+q.id);seen.add(q.id);assert.equal(r.year,q.year);assert.equal(r.index,q.index);assert.equal(r.area,q.area);
  const raw=r.field==='context'?q.context:r.field==='stem'?q.stem:q.alternatives.find(a=>'alternative:'+a.letter===r.field)?.text;
  assert(typeof raw==='string',r.field);assert.equal(Array.from(raw).slice(r.evidence.start,r.evidence.end).join(''),r.evidence.text,p.name+' '+q.id);assert(raw.includes(r.evidence.excerpt),p.name+' excerpt');
  assert(index.questions[q.id].some(x=>x.profileId===p.id&&x.type===r.type),'Broken reverse link');
  if(r.type==='concept'){assert(!r.field.startsWith('alternative:'));assert(r.reason.includes('Não comprova'));assert(r.concepts.length);}
  references++;
 }
 for(const[type,key]of [['direct','directCount'],['work','workCount'],['concept','conceptCount']])assert.equal(m[key],m.references.filter(r=>r.type===type).length,p.name+' '+key);
 assert.deepEqual(Array.from(m.directYears),Array.from(new Set(m.references.filter(r=>r.type==='direct').map(r=>r.year))).sort((a,b)=>a-b));
}
function person(name){return people.find(p=>p.name===name);}
function refs(name){return index.profiles[String(person(name).id)].references;}
assert(refs('Epicuro').some(r=>r.type==='direct'&&r.questionId==='enem-2014-24'));
for(const[name,id]of [['Karl Marx','enem-2008-12'],['Karl Marx','enem-2008-13'],['Theodor Adorno','enem-2019-11'],['Marcel Mauss','enem-2016-42'],['Marcel Mauss','enem-2010-32'],['Oswald de Andrade','enem-2003-51'],['Immanuel Kant','enem-2009-53'],['Mikhail Bakhtin','enem-2015-128']])assert(!refs(name).some(r=>r.type==='concept'&&r.questionId===id),name+' false concept: '+id);
assert(index.profiles[String(person('Fernando Pessoa').id)].directCount<15,'Common noun counted as Pessoa');
assert(index.profiles[String(person("Aziz Ab'Sáber").id)].directCount<20,'Verb saber counted as surname');
const snapshot=JSON.stringify(bank),escape=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
for(const q of bank){
 const parts=c.FurgEnemLayout.structure(q);assert.equal(parts.filter(p=>p.field!=='stem').map(p=>p.text).join(''),q.context||'',q.id+' context changed');
 if(q.stem)assert.equal(parts.filter(p=>p.field==='stem').map(p=>p.text).join(''),q.stem,q.id+' prompt changed');
 const html=c.FurgEnemLayout.body(q,escape,(src)=>'<img src="'+escape(src)+'">');assert(html.includes('enem-structured-text'));
 assert(!html.includes('Comentário de estudo autoral'),'Solution leaked into exam body');
}
assert.equal(JSON.stringify(bank),snapshot,'Question objects were modified');
for(const id of ['enem-2014-24','enem-2024-58','enem-2025-48','enem-2025-66']){const parts=c.FurgEnemLayout.structure(questions.get(id));assert(parts.some(p=>p.type==='support'));assert(parts.some(p=>p.type==='source'));assert(parts.some(p=>p.type==='prompt'));}
const two=c.FurgEnemLayout.structure(questions.get('enem-2012-30'));assert.equal(two.filter(p=>p.type==='source').length,2);assert.equal(two.filter(p=>p.type==='prompt').length,1);
const unsafe=c.FurgEnemLayout.body({context:'<script>alert(1)</script>',stem:'<img onerror=x>',alternatives:[],files:[]},escape,escape);assert(!unsafe.includes('<script>'));assert(!unsafe.includes('<img onerror'));
for(const[id,solution]of Object.entries(c.FURG_ENEM_SOLUTIONS)){assert(questions.has(id));assert.equal(solution.answerExpected,questions.get(id).answer,id);assert.equal(solution.paragraphs.length,2);assert(c.FurgEnemLayout.solution(questions.get(id),escape).includes('Comentário de estudo autoral'));}
assert(!c.FurgEnemLayout.solution({...questions.get('enem-2014-24'),answer:'E'},escape).includes('Comentário de estudo autoral'),'Stale solution used after key mismatch');
const html=fs.readFileSync('index.html','utf8');assert(html.includes('id="biblioteca"'));assert(!/<script[^>]+src="thinkers-(?:data|index)\.js/.test(html),'Library data is not lazy');
(async()=>{
 await c.FurgThinkers.ensure();
 const filters={query:'alienação',area:'',period:'',movement:'',frequency:'',type:'',sort:'relevance'};
 for(const name of ['Karl Marx','G. W. F. Hegel','Herbert Marcuse','Frantz Fanon'])assert(c.FurgThinkers.matches(person(name),filters),name+' missing from concept search');
 assert(c.FurgThinkers.matches(person('Pablo Picasso'),{...filters,query:'Guernica'}));
 assert(c.FurgThinkers.matches(person('Epicuro'),{...filters,query:'epicuro',area:'Filosofia',period:'Antiguidade',movement:'Epicurismo',frequency:'1-2',type:'direct'}));
 assert(!c.FurgThinkers.matches(person('Epicuro'),{...filters,query:'epicuro',frequency:'6+'}));
 assert(!c.FurgThinkers.matches(person('Frantz Fanon'),{...filters,query:'',type:'direct'}));
 const guide = c.FurgLibraryGuide;
 const data = c.FURG_LIBRARY_GUIDE_DATA;
 c.FURG_ENEM_DATA = {questions: bank};
 const concepts = await guide.loadConcepts(data);
 assert(concepts.length >= 175);
 assert.equal(new Set(concepts.map(x=>x.titleKey)).size,concepts.length);
 for (const entry of [...concepts,...data.commands]) {
  assert(entry.summary?.length > 20 && entry.tip?.length > 20 && entry.example?.length > 15,entry.title);
 }
 for (const [term, title] of [['realismo','Realismo e Naturalismo'],['racionalismo','Racionalismo'],['iluminismo','Iluminismo'],['inferência','Inferência'],['rubrica','Rubrica'],['toyotismo','Fordismo, toyotismo e trabalho flexível']]) {
  assert.equal(guide.search(concepts,term)[0].title,title,term);
 }
 assert.equal(guide.search(concepts,'iluminismo','Geografia').length,0);
 assert.equal(guide.search(concepts,'inexistente123').length,0);
 assert.equal(data.commands.length,39);
 for (const title of ['Pressupõe-se','Define-se / defina-se','Destaca-se','Respectivamente','Exceto / incorreta']) assert(data.commands.some(x=>x.title===title));
 for (const source of data.sources) assert.equal(new URL(source.url).protocol,'https:');
 const {sample,rows} = guide.patterns();
 assert.equal(sample.length,450);
 assert.equal(new Set(sample.map(x=>x.id)).size,sample.length);
 assert.equal(rows.length,10);
 assert.equal(rows.reduce((sum,p)=>sum+p.count,0),sample.length);
 assert.equal(rows[0].id,'caracterizar');
 for (const [pattern,id] of Object.entries(data.cases)) {
  assert(sample.some(r=>r.pattern===pattern&&r.id===id),id);
  assert(questions.get(id)?.quality?.keyVerified,id);
 }
 console.log('PASS: '+concepts.length+' unique concept cards, 39 command cards, accented search, group filtering, 450 first-day items and 10 valid real examples.');
 console.log('PASS: 224 unique profiles, all 40 originals preserved; '+references+' traceable links, direct/work/concept separation, counterexamples, exact years and reverse graph.');
 console.log('PASS: idea/work search and combined filters; all 3833 question texts and objects unchanged; multi-source and recent inline layouts, 66 guarded authored solutions, lazy library data and safe rendering.');
})().catch(e=>{console.error(e);process.exitCode=1;});
