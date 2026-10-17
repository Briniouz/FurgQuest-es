const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate HTML ID');
for(const[,file]of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g))assert(fs.existsSync(file),file);
const db=JSON.parse(fs.readFileSync('data.json','utf8')),refs=new Set();
function assetRefs(o){if(typeof o==='string'&&/^(pdfs|figures)\//.test(o))refs.add(o);else if(o&&typeof o==='object')Object.values(o).forEach(assetRefs);}
assetRefs(db);for(const ref of refs)assert(fs.existsSync(ref),'Missing active asset: '+ref);
assert(db.questions.every(q=>q.transcription?.options?.length===5),'A question needs missing legacy image crops');
const els=new Map(),events={},storage=new Map(),errors=[];
class Element{
 constructor(id=''){this.id=id;this.dataset={};this.value='';this.hidden=false;this.disabled=false;this.attrs={};this._html='';this.textContent='';this.options=[];const classes=new Set();this.classList={toggle:(c,v)=>{if(v??!classes.has(c))classes.add(c);else classes.delete(c);},add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)};}
 set innerHTML(s){this._html=s;this.buttons=[...s.matchAll(/<button\b([^>]*)>/g)].map(x=>{const b=new Element();for(const[,name,val]of x[1].matchAll(/data-([a-z-]+)="([^"]*)"/g))b.dataset[name.replace(/-([a-z])/g,(_,l)=>l.toUpperCase())]=val;b.disabled=/\bdisabled\b/.test(x[1]);return b;});this.options=[...s.matchAll(/<option(?: value="([^"]*)")?[^>]*>([^<]*)<\/option>/g)].map(x=>({value:x[1]??x[2],textContent:x[2]}));}
 get innerHTML(){return this._html;}
 get selectedIndex(){return this.options.findIndex(o=>o.value===this.value);}
 querySelectorAll(sel){return sel==='button'?this.buttons||[]:[];}
 querySelector(sel){return this.buttons?.find(b=>sel.includes('"'+b.dataset.letter+'"'));}
 setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];} getAttribute(k){return this.attrs[k]??null;}
 addEventListener(type,fn){(events[this.id+':'+type]??=[]).push(fn);}replaceChildren(...items){this.children=items;}scrollIntoView(){}focus(){}click(){this.onclick?.();}showModal(){this.open=true;}close(){this.open=false;}
}
const $=id=>{if(!els.has(id))els.set(id,new Element(id));return els.get(id);};ids.forEach($);$('loadError').hidden=true;
for(const id of ['subject','year','edition','skill','search','archiveSearch','simSubject','simYear'])$(id).value='';
const nav=['banco','simulados','desempenho','trilhas','leituras','acervo'].map(v=>{const e=new Element();e.dataset.view=v;return e;}),views=nav.map(n=>{const e=$(n.dataset.view);e.classList.toggle('active',e.id==='banco');return e;});
const radios={status:[],order:[]};for(const[group,values]of Object.entries({status:['all','unanswered','answered','correct','wrong','favorites'],order:['recent','old','random']})){for(const value of values){const e=new Element();e.value=value;e.parentElement={textContent:value};e._checked=radios[group].length===0;Object.defineProperty(e,'checked',{get(){return this._checked;},set(v){if(v)radios[group].forEach(r=>r._checked=false);this._checked=v;}});radios[group].push(e);}}
const document={getElementById:$,documentElement:{dataset:{theme:'light'}},body:{appendChild(){}},createElement:()=>new Element(),querySelectorAll(sel){if(sel==='.nav')return nav;if(sel==='.view')return views;if(sel==='[name=status],[name=order]')return [...radios.status,...radios.order];return [];},querySelector(sel){if(sel==='.view.active')return views.find(e=>e.classList.contains('active'));if(sel==='meta[name="theme-color"]')return $('meta');if(sel==='.simulation-builder')return $('builder');const name=sel.match(/name=(status|order)/)?.[1];if(name){const val=sel.match(/value=([a-z]+)/)?.[1];return val?radios[name].find(r=>r.value===val):radios[name].find(r=>r.checked);}return null;},addEventListener(type,fn){(events['document:'+type]??=[]).push(fn);}};
const ctx=vm.createContext({document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:true}),setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},location:{hash:'#banco'},history:{replaceState(){}},console:{error:e=>errors.push(e)},FURG_OFFLINE_DATA:db,URL,Blob,Date,Map,Set,navigator:{}});
for(const file of ['skills-data.js','skills.js','readings-data.js','readings.js','experience.js','app.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
assert.equal(errors.length,0,errors.map(String).join('\n'));assert($('loadError').hidden,'Startup failed');
const model=ctx.FURG_SKILLS_DATA,math=db.questions.filter(q=>q.subject==='Matemática');
assert.equal(math.length,180);assert.equal(Object.keys(model.questions).length,570);assert.equal(model.skills.length,119);
for(const q of db.questions.filter(q=>['Matemática','Física','Química'].includes(q.subject))){const t=model.questions[q.id];assert(t&&t.topics.length&&t.needs.length>=2,q.id);assert(ctx.FurgSkills.forQuestion(q).includes('O que preciso saber?'));}
assert.equal(ctx.FurgSkills.forQuestion(db.questions.find(q=>q.subject==='Biologia')),'');
for(const skill of model.skills){const path=ctx.FurgSkills.pathway(skill.id),pos=new Map(path.map((s,i)=>[s.id,i]));assert.equal(path.at(-1).id,skill.id);for(const s of path)for(const p of s.prerequisites)assert(pos.get(p)<pos.get(s.id),s.id);}
$('skill').value='logaritmos';vm.runInContext('applyFilters()',ctx);const selected=vm.runInContext('filtered.map(q=>q.id)',ctx);assert(selected.length>0);assert(selected.every(id=>model.questions[id].topics.includes('logaritmos')));
vm.runInContext('clearFilters()',ctx);assert.equal($('skill').value,'');assert.equal(vm.runInContext('filtered.length',ctx),2091);
function skillClick(action,id){const b={dataset:{skillAction:action,skill:id,subject:id},disabled:false};for(const fn of events['document:click']||[])fn({target:{closest:s=>s.includes('data-skill-action')?b:null}});}
skillClick('open','matrizes');assert.equal(vm.runInContext('view',ctx),'trilhas');assert($('skillsRoot').innerHTML.includes('Matrizes'));
skillClick('review','matrizes');assert(vm.runInContext('state.skills.reviewed.matrizes',ctx));assert(JSON.parse(storage.get('furg-questoes-progress-v1')).skills.reviewed.matrizes);
skillClick('practice','logaritmos');assert.equal(vm.runInContext('view',ctx),'banco');assert.equal($('skill').value,'logaritmos');assert.equal($('subject').value,'Matemática');
const first=vm.runInContext('filtered[0]',ctx);$('answerOptions').querySelectorAll('button')[0].click();$('confirmAnswer').click();assert.equal(vm.runInContext('state.answers[filtered[0].id].choice',ctx),'A');assert.equal(vm.runInContext('state.answers[filtered[0].id].firstChoice',ctx),'A');assert(!$('feedback').hidden);
for(const [subject,topic] of [['Física','fis-newton'],['Química','qui-estequiometria']]){skillClick('subject',subject);assert($('skillsRoot').innerHTML.includes(subject));skillClick('open',topic);assert($('skillsRoot').innerHTML.includes('BASE · Matemática'));skillClick('practice',topic);assert.equal($('subject').value,subject);assert.equal($('skill').value,topic);const subset=vm.runInContext('filtered.map(q=>({id:q.id,subject:q.subject}))',ctx);assert(subset.length>0);assert(subset.every(q=>q.subject===subject&&model.questions[q.id].topics.includes(topic)));skillClick('review',topic);assert(vm.runInContext('state.skills.reviewed['+JSON.stringify(topic)+']',ctx));}
$('subject').value='Biologia';vm.runInContext('applyFilters()',ctx);assert.equal($('skill').value,'');assert($('skill').disabled);assert.equal(vm.runInContext('filtered.every(q=>q.subject===\'Biologia\')',ctx),true);
$('subject').value='';vm.runInContext('clearFilters()',ctx);assert(!$('skill').disabled);
$('brandHome').onclick({preventDefault(){}});assert.equal(vm.runInContext('view',ctx),'banco');
assert(html.includes('https://www.instagram.com/briniouz/'));assert(fs.existsSync('brand-mark.svg'));
const imported=vm.runInContext('validateProgress({version:1,answers:{},skills:{reviewed:{matrizes:true,unknown:true}}})',ctx);assert(imported.skills.reviewed.matrizes);assert(!imported.skills.reviewed.unknown);
const legacy=vm.runInContext('validateProgress({version:1,answers:{}})',ctx);assert.equal(Object.keys(legacy.skills.reviewed).length,0);
ctx.FurgUI.setTheme('dark');assert.equal(document.documentElement.dataset.theme,'dark');
vm.runInContext("setView('leituras');setView('desempenho');setView('acervo')",ctx);assert.equal(errors.length,0);
console.log('PASS: startup, 427 active PDF/figure paths, 570 tagged Math/Physics/Chemistry questions, 119 acyclic study paths, skill filters, practice navigation, saved review, answer correction, cross-subject prerequisites, legacy import, theme, Instagram credit, brand navigation and existing views.');
