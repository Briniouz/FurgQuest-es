'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const map=new Map(),events=new Map();let images=[];
const el=id=>{if(!map.has(id))map.set(id,{id,innerHTML:'',textContent:'',value:'',open:false,hidden:true,querySelectorAll:()=>images,addEventListener:(type,fn)=>events.set(id+':'+type,fn),focus(){},scrollIntoView(){},showModal(){this.open=true},close(){this.open=false},setAttribute(){}});return map.get(id)};
const document={getElementById:el,activeElement:el('previousFocus')};
const c=vm.createContext({document,setTimeout:()=>1,clearTimeout(){},console});
for(const p of ['enem-data.js','enem-presentation-data.js','enem-layout.js','enem-solutions.js','linguagens-solutions.js','enem.js','vespera-data.js','vespera.js'])vm.runInContext(fs.readFileSync(p,'utf8'),c,{filename:p});
const mode=c.FurgVespera,data=c.FURG_VESPERA_DATA,bank=new Map(c.FURG_ENEM_DATA.questions.map(q=>[q.id,q])),keys=Object.keys(data.questions);
assert.equal(data.entries.length,39);assert.equal(new Set(data.entries.map(e=>e.id)).size,39);assert.equal(data.entries.filter(e=>e.kind==='genero').length,8);assert.equal(data.entries.filter(e=>e.kind==='recurso').length,7);assert.equal(keys.length,25);
for(const e of data.entries)for(const p of ['definition','example','recognize','difference'])assert(e[p]?.length>15,e.id+' '+p);
for(const [id,n]of Object.entries(data.questions)){
 const q=bank.get(id);assert(mode.eligible(id),id+' stale or invalid');assert.equal(q.answer,n.answerExpected);assert.equal(Object.keys(n.wrong).length,4);assert(!n.wrong[q.answer]);assert((n.explanation||c.FURG_ENEM_SOLUTIONS[id]?.paragraphs).length>=2,id+' missing reasoning');
 for(const [letter,w]of Object.entries(n.wrong)){assert(/^[A-E]$/.test(letter));assert(w.why.length>35);assert(['vocabulario','comando','genero','conteudo','extrapolacao','generalizacao','informacao'].includes(w.category));}
 if(n.evidenceKind!=='imagem')assert((q.context+' '+q.stem).includes(n.evidence),id+' evidence not in source');
 const a=data.keyAudit[n.keyAudit];assert.equal(crypto.createHash('sha256').update(fs.readFileSync(a.file)).digest('hex'),a.sha256);
}
for(const g of data.groups){assert.equal(g.questions.length,5);assert(g.questions.every(id=>mode.eligible(id)));}
assert.equal(data.groups.find(g=>g.id==='foco').workbook.join(','),'30,54,72,381');assert(!keys.some(id=>id==='30'));
assert(mode.search('inferencia').some(e=>e.id==='inferencia'));assert.equal(mode.search('rubrica')[0].id,'rubrica');assert.equal(mode.search('','genero').length,8);assert(mode.search('prosopopeia').some(e=>e.id==='personificacao'));assert.equal(mode.search('<script>nunca-existe').length,0);
let root={vespera:mode.fresh(),answers:{preserved:{choice:'C'}},enem:{answers:{'enem-2025-12':{choice:'C',firstChoice:'C',viewed:true}},favorites:{saved:true},notes:{note:'stay'}},enemSim:{active:null,history:[]}},canSave=true,saves=0;
const old=JSON.stringify(root.enem),oldMain=JSON.stringify(root.answers);
mode.init({getState:()=>root,save:()=>{saves++;return canSave},setView(){}});assert.equal(saves,0,'Initialization overwrote legacy progress');assert(mode.wasSeen('enem-2025-12'));
assert(mode.start('foco'));assert.equal(root.vespera.active.ids.length,5);const batch=root.vespera.active.id,first=root.vespera.active.ids[0],q=bank.get(first);assert(data.groups.find(g=>g.id==='foco').questions.includes(first));assert(!mode.wasSeen(first));assert(!mode.next(),'Moved before feedback');
assert(!mode.record({choice:'A',confidence:'alta',command:'',evidence:'x'}));assert.equal(root.vespera.attempts.length,0);assert(!el('vesperaRoot').innerHTML.includes('Feedback da questão'),'Answer revealed before reflections');
const draft={choice:q.answer==='A'?'B':'A',confidence:'alta',command:'Informar sobre o impacto apresentado.',evidence:'A pesquisa e os dados presentes no texto.'};
images=[{complete:false,naturalWidth:0}];assert(!mode.record(draft),'Allowed an unloaded figure');images=[];
canSave=false;const before=JSON.stringify(root.vespera);assert(!mode.record(draft));assert.equal(JSON.stringify(root.vespera),before,'Storage failure lost existing mode state');canSave=true;
assert(mode.record(draft));assert(!mode.record(draft),'Duplicate answer counted twice');assert.equal(root.vespera.attempts[0].exposure,'new');assert.equal(mode.stats().new.total,1);assert.equal(mode.errors(true).length,1);
let html=el('vesperaRoot').innerHTML;assert(html.includes('Feedback da questão'));assert(html.indexOf('data-eve="next"')>html.indexOf('Feedback da questão'));assert(!html.includes('<textarea'),'Reflections remained editable after grading');
assert(mode.next());assert(mode.start('humanas'));assert.equal(root.vespera.active.id,batch,'Starting another block discarded pending progress');
while(root.vespera.active.index<5){const id=root.vespera.active.ids[root.vespera.active.index];assert(mode.record({command:'Identificar o papel do trecho.',evidence:'Uma pista registrada antes da resposta.',confidence:'baixa',choice:bank.get(id).answer}));assert(mode.next());}
assert.equal(root.vespera.attempts.length,5);assert.equal(mode.stats().new.total,4);assert.equal(mode.stats().repeat.total,1);assert.equal(mode.stats().highErrors,1);assert(el('vesperaRoot').innerHTML.includes('Bloco concluído'));
assert(mode.start('errors',[first]));assert.equal(root.vespera.active.ids[0],first);assert(mode.record({command:'Revisar a tarefa delimitada.',evidence:'Dados que explicam o impacto.',confidence:'media',choice:q.answer}));assert.equal(root.vespera.attempts.at(-1).exposure,'repeat');assert.equal(mode.errors(true).length,0,'Correct review did not resolve pending error');
const snapshot=JSON.parse(JSON.stringify(root.vespera)),merged=mode.merge(snapshot,snapshot);assert.equal(merged.attempts.length,6,'Import duplicated attempts');assert.equal(mode.merge(snapshot,undefined).attempts.length,6,'Old backup erased this mode');assert.equal(mode.merge(snapshot,{attempts:[]}).active.id,snapshot.active.id,'Import discarded current session');
const polluted=JSON.parse(JSON.stringify(snapshot));polluted.attempts[0].correct=true;polluted.attempts.push({id:'bad',questionId:first,choice:'Z'});assert.equal(mode.validate(polluted).attempts.length,6);assert.equal(mode.validate(polluted).attempts[0].correct,false);assert.equal(JSON.stringify(root.enem),old,'Mode rewrote original ENEM progress');assert.equal(JSON.stringify(root.answers),oldMain,'Mode rewrote FURG progress');
assert.equal(mode.validate({active:{id:'x',ids:[first,first],index:0}}).active,null);
mode.openDictionary('Inferência');assert(el('eveDictionary').open);assert.equal(el('eveDictCount').textContent,'1 verbete');events.get('eveDictionary:keydown')({key:'Escape',stopPropagation(){},preventDefault(){}});assert(!el('eveDictionary').open,'Dictionary did not close with Escape');
root={...root,vespera:mode.fresh()};assert(mode.start());assert.equal(root.vespera.active.ids.filter(id=>bank.get(id).area==='linguagens').length,3);assert.equal(root.vespera.active.ids.filter(id=>bank.get(id).area==='ciencias-humanas').length,2);
console.log('PASS: 39 complete reference cards; 25 fingerprint-checked official items; eight original answer-sheet hashes; all feedback alternatives, evidence and sources verified.');
console.log('PASS: required pre-answer reflections/confidence, five-item sessions, feedback order, repeated-vs-new metrics, legacy exposures, high-confidence reviews, image gating, save rollback, session resume and import deduplication; original bank progress unchanged.');
