const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate HTML ID');
for(const[,file]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))(?:\?[^"]*)?"/g))assert(fs.existsSync(file),file);
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
 querySelectorAll(sel){return sel==='button'?this.buttons||[]:sel==='details'?this.details||[]:[];}
 querySelector(sel){return this.buttons?.find(b=>sel.includes('"'+b.dataset.letter+'"'));}
 setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];} getAttribute(k){return this.attrs[k]??null;}
 addEventListener(type,fn){(events[this.id+':'+type]??=[]).push(fn);}replaceChildren(...items){this.children=items;}scrollIntoView(){}focus(){document.activeElement=this;}click(){this.onclick?.();}showModal(){this.open=true;}close(){this.open=false;for(const fn of events[this.id+':close']||[])fn({target:this});}
}
const $=id=>{if(!els.has(id))els.set(id,new Element(id));return els.get(id);};ids.forEach($);$('loadError').hidden=true;
for(const id of ['subject','year','edition','skill','search','archiveSearch','simSubject','simYear'])$(id).value='';
const nav=['banco','simulados','desempenho','trilhas','leituras','acervo'].map(v=>{const e=new Element();e.dataset.view=v;return e;}),views=nav.map(n=>{const e=$(n.dataset.view);e.classList.toggle('active',e.id==='banco');return e;});
const radios={status:[],order:[]};for(const[group,values]of Object.entries({status:['all','unanswered','answered','correct','wrong','favorites'],order:['recent','old','random']})){for(const value of values){const e=new Element();e.value=value;e.parentElement={textContent:value};e._checked=radios[group].length===0;Object.defineProperty(e,'checked',{get(){return this._checked;},set(v){if(v)radios[group].forEach(r=>r._checked=false);this._checked=v;}});radios[group].push(e);}}
const document={getElementById:$,documentElement:{dataset:{theme:'light'}},body:{appendChild(){}},createElement:()=>new Element(),querySelectorAll(sel){if(sel==='.nav')return nav;if(sel==='.view')return views;if(sel==='[name=status],[name=order]')return [...radios.status,...radios.order];return [];},querySelector(sel){if(sel==='.view.active')return views.find(e=>e.classList.contains('active'));if(sel==='meta[name="theme-color"]')return $('meta');if(sel==='.simulation-builder')return $('builder');const name=sel.match(/name=(status|order)/)?.[1];if(name){const val=sel.match(/value=([a-z]+)/)?.[1];return val?radios[name].find(r=>r.value===val):radios[name].find(r=>r.checked);}return null;},addEventListener(type,fn){(events['document:'+type]??=[]).push(fn);}};
const exported=[];const profileURL={createObjectURL:blob=>{exported.push(blob);return 'blob:local-profile-test';},revokeObjectURL(){}};
const ctx=vm.createContext({document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:true}),setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},location:{hash:'#banco'},history:{replaceState(){}},console:{error:e=>errors.push(e)},FURG_OFFLINE_DATA:db,URL:profileURL,Blob,Date,Map,Set,navigator:{}});
for(const file of ['skills-data.js','flashcards-data.js','flashcards.js','skills.js','readings-data.js','readings.js','experience.js','profile.js','app.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
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
function checkStudy(){
  const cards=ctx.FURG_FLASHCARDS_DATA,books=ctx.FURG_READING_DATA;
  assert.equal(Object.keys(cards).length,119);assert.equal(Object.values(cards).flat().length,595);
  for(const skill of model.skills){
    const list=cards[skill.id];assert.equal(list.length,5,skill.id);assert.equal(new Set(list.map(c=>c.question)).size,5,skill.id);
    for(const card of list){assert(typeof card.question==='string'&&card.question.trim().length>=10,skill.id);assert(typeof card.answer==='string'&&card.answer.trim(),skill.id);assert(!/<\/?[a-z][^>]*>/i.test(card.question+card.answer),skill.id);}
    skillClick('open',skill.id);assert($('skillsRoot').innerHTML.includes('5 flashcards'),skill.id);skillClick('flashcards',skill.id);
    assert($('flashcardDialog').open);assert.equal($('flashcardTitle').textContent,skill.title);assert.equal($('flashcardQuestion').textContent,list[0].question);assert($('flashcardAnswer').hidden);
    for(let i=0;i<5;i++){assert.equal($('flashcardQuestion').textContent,list[i].question);assert.equal($('flashcardCount').textContent,(i+1)+' de 5');assert($('flashcardAnswer').hidden);$('flashcardReveal').click();assert(!$('flashcardAnswer').hidden);assert.equal($('flashcardAnswerText').textContent,list[i].answer);assert.equal($('flashcardReveal').getAttribute('aria-expanded'),'true');$('flashcardNext').click();}
    assert.equal($('flashcardCount').textContent,'1 de 5');assert($('flashcardAnswer').hidden);$('flashcardClose').click();assert(!$('flashcardDialog').open);
  }
  assert(!ctx.FurgFlashcards.open('unknown'));
  const opener=new Element('return-focus');ctx.FurgFlashcards.open('matrizes',opener);$('flashcardReveal').click();$('flashcardReveal').click();assert($('flashcardAnswer').hidden);assert.equal($('flashcardReveal').getAttribute('aria-expanded'),'false');
  let prevented=false;function key(key){for(const fn of events['document:keydown']||[])fn({key,target:{closest:()=>null},preventDefault(){prevented=true;}});}
  vm.runInContext("setView('banco')",ctx);const bankIndex=vm.runInContext('index',ctx);key('ArrowRight');assert(prevented);assert.equal($('flashcardCount').textContent,'2 de 5');assert.equal(vm.runInContext('index',ctx),bankIndex,'Flashcard navigation moved the question bank');key('ArrowLeft');assert.equal($('flashcardCount').textContent,'1 de 5');
  for(const fn of events['flashcardDots:click'])fn({target:{closest:()=>({dataset:{flashcardIndex:'4'}})}});assert.equal($('flashcardCount').textContent,'5 de 5');key('Escape');assert(!$('flashcardDialog').open);assert.equal(document.activeElement,opener);
  ctx.FurgFlashcards.open('fis-newton');for(const fn of events['flashcardDialog:cancel'])fn({preventDefault(){}});assert(!$('flashcardDialog').open);
  function readingClick(action,extra={}){const button={dataset:{reading:action,...extra},disabled:false,setAttribute(){}};for(const fn of events['readingRoot:click'])fn({target:{closest:()=>button}});return button;}
  assert.equal(books.length,6);assert.equal(books.flatMap(b=>b.questions).length,60);
  for(const book of books){
    assert.equal(book.sections.length,6,book.id);assert(book.sections.every(s=>s.title&&s.paragraphs.length>=1&&s.paragraphs.every(p=>typeof p==='string'&&p.length>40)),book.id);assert.equal(book.excerpts.length,1,book.id);assert(book.readingLinks.length>=2,book.id);
    for(const excerpt of book.excerpts){assert(excerpt.text.trim().split(/\s+/).length<=25,book.id);if(['ritos-passagem','utero-punho'].includes(book.id))assert(excerpt.text.length<=90,book.id);assert(excerpt.context&&excerpt.commentary&&excerpt.sourceTitle,book.id);assert(/^https:\/\//.test(excerpt.url),book.id);}
    for(const link of book.readingLinks)assert(link.title&&link.access&&/^https:\/\//.test(link.url),book.id);
    readingClick('open',{book:book.id});assert($('readingRoot').innerHTML.includes('Texto original'));assert($('readingPanel').innerHTML.includes('Leitura em camadas'));assert($('readingPanel').innerHTML.includes(book.sections[0].title));
    $('summarySections').details=book.sections.map((_,i)=>{const e=new Element();e.open=i===0;return e;});const expand=readingClick('sections');assert($('summarySections').details.every(s=>s.open));assert.equal(expand.textContent,'Recolher tudo');readingClick('sections');assert($('summarySections').details.every(s=>!s.open));
    readingClick('tab',{tab:'texto'});assert($('readingPanel').innerHTML.includes('<blockquote>'));assert($('readingPanel').innerHTML.includes(book.excerpts[0].sourceTitle));assert($('readingPanel').innerHTML.includes('Onde ler e consultar'));
    readingClick('tab',{tab:'foco'});assert($('readingPanel').innerHTML.includes('Na hora de interpretar'));
    readingClick('start');assert($('readingPanel').innerHTML.includes('Questão 1 de 10'));readingClick('choose',{choice:String(book.questions[0].answerIndex)});readingClick('confirm');assert.equal(vm.runInContext('state.reading.answers['+JSON.stringify(book.questions[0].id)+'].choice',ctx),book.questions[0].answerIndex);assert($('readingPanel').innerHTML.includes('Boa leitura!'));
    readingClick('back');assert($('readingRoot').innerHTML.includes('books-grid'));
  }
  readingClick('open',{book:books[0].id});for(const fn of events['readingRoot:keydown'])fn({key:'ArrowRight',target:{getAttribute:()=> 'tab'},preventDefault(){}});assert($('readingPanel').innerHTML.includes('Onde ler e consultar'));
  assert.equal(errors.length,0);
}
checkStudy();
async function checkProfile(){
  const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aKq0AAAAASUVORK5CYII=';
  const clean=ctx.FurgProfile.validate({name:'  Ana   Maria  ',photo:png});assert.equal(clean.name,'Ana Maria');assert.equal(clean.photo,png);assert.equal(ctx.FurgProfile.initials('Ana Maria'),'AM');
  for(const photo of ['https://example.com/photo.png','javascript:alert(1)','data:image/svg+xml;base64,PHN2Zz4=','data:image/jpeg;base64,bm90LWFuLWltYWdl','data:image/jpeg;base64,/9j/'+ 'A'.repeat(200000)])assert.equal(ctx.FurgProfile.validate({photo}).photo,'');
  await assert.rejects(ctx.FurgProfile.preparePhoto({type:'application/pdf',size:10}),/JPG/);await assert.rejects(ctx.FurgProfile.preparePhoto({type:'image/jpeg',size:11*1024*1024}),/10 MB/);
  $('profileEdit').click();$('profileName').value='Ana Maria';for(const fn of events['profileForm:submit'])fn({preventDefault(){}});assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert.equal(JSON.parse(storage.get('furg-questoes-progress-v1')).profile.name,'Ana Maria');assert.equal($('profileDisplayName').textContent,'Ana Maria');
  vm.runInContext('state.profile='+JSON.stringify(clean),ctx);ctx.FurgProfile.refresh();$('exportProgress').click();const backup=JSON.parse(await exported.at(-1).text());assert.equal(backup.profile.photo,png);assert.equal(backup.profile.name,'Ana Maria');
  async function importBackup(value){const text=JSON.stringify(value);await $('progressFile').onchange({target:{files:[{size:Buffer.byteLength(text),text:async()=>text}],value:'chosen.json'}});}
  vm.runInContext("state.profile={name:'Outro nome',photo:''}",ctx);await importBackup(backup);assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert.equal(vm.runInContext('state.profile.photo',ctx),png);assert.equal($('profileDisplayName').textContent,'Ana Maria');
  await importBackup({version:1,answers:{}});assert.equal(vm.runInContext('state.profile.photo',ctx),png);assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert(!Object.hasOwn(legacy,'profile'));
  $('profileEdit').click();$('profileRemovePhoto').click();for(const fn of events['profileForm:submit'])fn({preventDefault(){}});assert.equal(vm.runInContext('state.profile.photo',ctx),'');assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');
  $('profileEdit').click();$('profileName').value='Descartar';$('profileCancel').click();assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');
  const originalSetItem=ctx.localStorage.setItem;ctx.localStorage.setItem=()=>{throw Error('quota');};$('profileEdit').click();$('profileName').value='Não salvar';for(const fn of events['profileForm:submit'])fn({preventDefault(){}});assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert($('profileMessage').textContent.includes('Não foi possível'));ctx.localStorage.setItem=originalSetItem;$('profileCancel').click();
  console.log('PASS: existing site flows, 570 tagged questions, 119 paths, 595 flashcards (reveal, navigation, restart, focus and keyboard isolation), 36 literary sections, 6 original excerpts and 60 reading questions; profile export/import and legacy progress preserved.');
}
checkProfile().catch(error=>{console.error(error);process.exitCode=1;});
