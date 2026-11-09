const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const previewFile=process.argv[2],progressKey=previewFile?'furg-questoes-enem-preview-v1':'furg-questoes-progress-v1',html=fs.readFileSync(previewFile||'index.html','utf8'),markup=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''),ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate HTML ID');
for(const[,file]of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))(?:\?[^"]*)?"/g))assert(fs.existsSync(file),file);
const db=JSON.parse(fs.readFileSync('data.json','utf8')),refs=new Set();
function assetRefs(o){if(typeof o==='string'&&/^(pdfs|figures)\//.test(o))refs.add(o);else if(o&&typeof o==='object')Object.values(o).forEach(assetRefs);}
assetRefs(db);for(const ref of refs)assert(fs.existsSync(ref),'Missing active asset: '+ref);
assert(db.questions.every(q=>q.transcription?.options?.length===5),'A question needs missing legacy image crops');
const els=new Map(),events={},storage=new Map(),errors=[];
class Element{
 constructor(id=''){this.id=id;this.dataset={};this.value='';this.hidden=false;this.disabled=false;this.attrs={};this._html='';this.textContent='';this.options=[];const classes=new Set();this.classList={toggle:(c,v)=>{if(v??!classes.has(c))classes.add(c);else classes.delete(c);},add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)};}
 set innerHTML(s){this._html=s;this.buttons=[...s.matchAll(/<button\b([^>]*)>/g)].map(x=>{const b=new Element();for(const[,name,val]of x[1].matchAll(/data-([a-z-]+)="([^"]*)"/g))b.dataset[name.replace(/-([a-z])/g,(_,l)=>l.toUpperCase())]=val;for(const cls of (x[1].match(/class="([^"]*)"/)?.[1]||'').split(/\s+/).filter(Boolean))b.classList.add(cls);b.disabled=/\bdisabled\b/.test(x[1]);return b;});this.options=[...s.matchAll(/<option(?: value="([^"]*)")?[^>]*>([^<]*)<\/option>/g)].map(x=>({value:x[1]??x[2],textContent:x[2]}));}
 get innerHTML(){return this._html;}
 get selectedIndex(){return this.options.findIndex(o=>o.value===this.value);}
 querySelectorAll(sel){return sel==='button'?this.buttons||[]:sel==='details'?this.details||[]:sel.startsWith('.')?(this.buttons||[]).filter(b=>b.classList.contains(sel.slice(1))):[];}
 querySelector(sel){return this.buttons?.find(b=>sel.includes('"'+b.dataset.letter+'"'));}
 setAttribute(k,v){this.attrs[k]=v;} removeAttribute(k){delete this.attrs[k];} getAttribute(k){return this.attrs[k]??null;}
 addEventListener(type,fn){(events[this.id+':'+type]??=[]).push(fn);}replaceChildren(...items){this.children=items;}scrollIntoView(){}focus(){document.activeElement=this;}click(){this.onclick?.();}showModal(){this.open=true;}close(){this.open=false;for(const fn of events[this.id+':close']||[])fn({target:this});}
}
const $=id=>{if(!els.has(id))els.set(id,new Element(id));return els.get(id);};ids.forEach($);$('loadError').hidden=true;
for(const id of ['subject','year','edition','skill','search','archiveSearch','simSubject','simYear'])$(id).value='';
const nav=['banco','leve','enem','anatomia','fuvest','evolucao','simulados','desempenho','trilhas','leituras','biblioteca','linguagens','acervo','vespera','dia2','matematica-lab','calculo-mental','inicio','area-estudo'].map(v=>{const e=new Element();e.dataset.view=v;return e;}),views=nav.map(n=>{const e=$(n.dataset.view);e.classList.toggle('active',e.id==='banco');return e;});
const radios={status:[],order:[]};for(const[group,values]of Object.entries({status:['all','unanswered','answered','correct','wrong','favorites'],order:['recent','old','random']})){for(const value of values){const e=new Element();e.value=value;e.parentElement={textContent:value};e._checked=radios[group].length===0;Object.defineProperty(e,'checked',{get(){return this._checked;},set(v){if(v)radios[group].forEach(r=>r._checked=false);this._checked=v;}});radios[group].push(e);}}
const document={getElementById:$,documentElement:{dataset:{theme:'light'}},body:{appendChild(){}},createElement:()=>new Element(),querySelectorAll(sel){if(sel==='.nav')return nav;if(sel==='.view')return views;if(sel==='[name=status],[name=order]')return [...radios.status,...radios.order];return [];},querySelector(sel){if(sel==='.view.active')return views.find(e=>e.classList.contains('active'));if(sel==='meta[name="theme-color"]')return $('meta');if(sel==='.simulation-builder')return $('builder');const name=sel.match(/name=(status|order)/)?.[1];if(name){const val=sel.match(/value=([a-z]+)/)?.[1];return val?radios[name].find(r=>r.value===val):radios[name].find(r=>r.checked);}return null;},addEventListener(type,fn){(events['document:'+type]??=[]).push(fn);}};
const exported=[];const profileURL={createObjectURL:blob=>{exported.push(blob);return 'blob:local-profile-test';},revokeObjectURL(){}};
const ctx=vm.createContext({document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},matchMedia:()=>({matches:true}),setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},location:{hash:'#banco',hostname:'127.0.0.1',protocol:'http:',search:''},history:{replaceState(){}},console:{error:e=>errors.push(e)},FURG_OFFLINE_DATA:db,URL:profileURL,Blob,Date,Map,Set,navigator:{}});
if(previewFile){for(const [i,match]of [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].entries())vm.runInContext(match[1],ctx,{filename:'preview-inline-'+i});}
else for(const file of ['app-mode.js','study-settings.js','study-guide.js','choice-elimination.js','linguagens-data.js','linguagens.js','skills-data.js','flashcards-data.js','biology-data.js','flashcards.js','math-lessons.js','skills.js','readings-data.js','readings.js','portraits-data.js','thinkers.js','experience.js','profile.js','enem-data.js','fuvest-data.js','enem-subjects-data.js','exam-subjects.js','enem-presentation-data.js','enem-layout.js','enem-solutions.js','linguagens-solutions.js','enem.js','fuvest.js','enem-sim.js','levelup-data.js','levelup.js','study-areas.js','navigation.js','light-review-data.js','day1-practice-data.js','day1-practice.js','light-review.js','enem-anatomy-data.js','enem-anatomy.js','vespera-data.js','vespera-percurso-data.js','vespera-repertorios-data.js','vespera.js','dia2-guia-data.js','dia2-questoes-data.js','dia2.js','math-lab-data.js','math-lab-model.js','math-lab.js','app.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
assert.equal(errors.length,0,errors.map(String).join('\n'));assert($('loadError').hidden,'Startup failed');
const model=ctx.FURG_SKILLS_DATA,math=db.questions.filter(q=>q.subject==='Matemática');
assert.equal(math.length,180);assert.equal(Object.keys(model.questions).length,765);assert.equal(model.skills.length,144);
for(const q of db.questions.filter(q=>['Matemática','Física','Química','Biologia'].includes(q.subject))){const t=model.questions[q.id];assert(t&&t.topics.length&&t.needs.length>=2,q.id);assert(ctx.FurgSkills.forQuestion(q).includes('O que preciso saber?'));}
assert.equal(ctx.FurgSkills.forQuestion(db.questions.find(q=>q.subject==='História')),'');
for(const skill of model.skills){const path=ctx.FurgSkills.pathway(skill.id),pos=new Map(path.map((s,i)=>[s.id,i]));assert.equal(path.at(-1).id,skill.id);for(const s of path)for(const p of s.prerequisites)assert(pos.get(p)<pos.get(s.id),s.id);}
$('skill').value='logaritmos';vm.runInContext('applyFilters()',ctx);const selected=vm.runInContext('filtered.map(q=>q.id)',ctx);assert(selected.length>0);assert(selected.every(id=>model.questions[id].topics.includes('logaritmos')));
vm.runInContext('clearFilters()',ctx);assert.equal($('skill').value,'');assert.equal(vm.runInContext('filtered.length',ctx),2091);
function skillClick(action,id){const b={dataset:{skillAction:action,skill:id,subject:id},disabled:false};for(const fn of events['document:click']||[])fn({target:{closest:s=>s.includes('data-skill-action')?b:null}});}
skillClick('open','matrizes');assert.equal(vm.runInContext('view',ctx),'trilhas');assert($('skillsRoot').innerHTML.includes('Matrizes'));
skillClick('review','matrizes');assert(vm.runInContext('state.skills.reviewed.matrizes',ctx));assert(JSON.parse(storage.get(progressKey)).skills.reviewed.matrizes);
skillClick('practice','logaritmos');assert.equal(vm.runInContext('view',ctx),'banco');assert.equal($('skill').value,'logaritmos');assert.equal($('subject').value,'Matemática');
const first=vm.runInContext('filtered[0]',ctx);$('answerOptions').querySelectorAll('button')[0].click();$('confirmAnswer').click();assert.equal(vm.runInContext('state.answers[filtered[0].id].choice',ctx),'A');assert.equal(vm.runInContext('state.answers[filtered[0].id].firstChoice',ctx),'A');assert(!$('feedback').hidden);
for(const [subject,topic] of [['Física','fis-newton'],['Química','qui-estequiometria']]){skillClick('subject',subject);assert($('skillsRoot').innerHTML.includes(subject));skillClick('open',topic);assert($('skillsRoot').innerHTML.includes('BASE · Matemática'));skillClick('practice',topic);assert.equal($('subject').value,subject);assert.equal($('skill').value,topic);const subset=vm.runInContext('filtered.map(q=>({id:q.id,subject:q.subject}))',ctx);assert(subset.length>0);assert(subset.every(q=>q.subject===subject&&model.questions[q.id].topics.includes(topic)));skillClick('review',topic);assert(vm.runInContext('state.skills.reviewed['+JSON.stringify(topic)+']',ctx));}
$('subject').value='Biologia';vm.runInContext('applyFilters()',ctx);assert.equal($('skill').value,'');assert(!$('skill').disabled);assert.equal(vm.runInContext('filtered.every(q=>q.subject===\'Biologia\')',ctx),true);
$('subject').value='';vm.runInContext('clearFilters()',ctx);assert(!$('skill').disabled);
$('brandHome').onclick({preventDefault(){}});assert.equal(vm.runInContext('view',ctx),'inicio');
assert(html.includes('https://www.instagram.com/briniouz/'));assert(fs.existsSync('brand-mark.svg'));
const imported=vm.runInContext('validateProgress({version:1,answers:{},skills:{reviewed:{matrizes:true,unknown:true}}})',ctx);assert(imported.skills.reviewed.matrizes);assert(!imported.skills.reviewed.unknown);
const legacy=vm.runInContext('validateProgress({version:1,answers:{}})',ctx);assert.equal(Object.keys(legacy.skills.reviewed).length,0);
ctx.FurgUI.setTheme('dark');assert.equal(document.documentElement.dataset.theme,'dark');
vm.runInContext("setView('leituras');setView('desempenho');setView('acervo')",ctx);assert.equal(errors.length,0);
function checkStudy(){
  const cards=ctx.FURG_FLASHCARDS_DATA,books=ctx.FURG_READING_DATA;
  assert.equal(Object.keys(cards).length,144);assert.equal(Object.values(cards).flat().length,720);
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
function checkMathLessons(){
  const lessons=ctx.FURG_MATH_LESSONS,subjects=model.skills.filter(s=>s.subject==='Matemática');
  assert.equal(Object.keys(lessons).length,49);assert.equal(subjects.length,49);
  for(const skill of subjects){const lesson=lessons[skill.id];assert(lesson,skill.id);assert(lesson.explanation.length>60,skill.id);assert(lesson.prompt.length>5,skill.id);assert.equal(lesson.steps.length,3,skill.id);assert(lesson.steps.every(s=>typeof s==='string'&&s.length>5),skill.id);assert(lesson.result.length>10,skill.id);skillClick('open',skill.id);const html=$('skillsRoot').innerHTML;assert(html.includes('Em poucas palavras'),skill.id);assert(html.includes('Exemplo resolvido'),skill.id);assert(html.includes(vm.runInContext('esc('+JSON.stringify(lesson.result)+')',ctx)),skill.id);assert(html.includes('<details class="skill-worked" open>'),skill.id);}
  for(const matrix of lessons.matrizes.matrices){assert.equal(matrix.rows.length,2);assert(matrix.rows.every(row=>row.length===2));}assert.equal(lessons.matrizes.matrices[1].rows[1][0],6);
  const operations=lessons.logaritmos.operations;assert.equal(operations.items.length,5);assert(operations.conditions.includes('bases devem ser iguais'));
  skillClick('open','logaritmos');const logHTML=$('skillsRoot').innerHTML;assert(logHTML.includes('Operações com logaritmos'));assert(logHTML.includes('log<sub>y</sub>(x)'));
  for(const item of operations.items){assert.equal(item.steps.length,3);assert(logHTML.includes(vm.runInContext('esc('+JSON.stringify(item.result)+')',ctx)));assert(item.explanation&&item.example);}
  const difference=Math.log2(8)-Math.log2(4),quotient=Math.log2(8)/Math.log2(4);assert.equal(difference,1);assert.equal(quotient,1.5);assert.equal(Math.log2(8/4),difference);assert.equal(Math.log(8)/Math.log(4),quotient);assert.notEqual(difference,quotient);
  assert(operations.items.find(i=>i.id==='divisao').explanation.includes('y ≠ 1'));assert.equal(Math.log2(8)+Math.log2(4),Math.log2(8*4));assert.equal(Math.log2(8**2),2*Math.log2(8));assert.equal(Math.log2(8)*Math.log2(4),6);assert.equal(Math.log2(8*4),5);
  skillClick('open','fis-newton');assert(!$('skillsRoot').innerHTML.includes('skill-lesson'));skillClick('open','qui-estequiometria');assert(!$('skillsRoot').innerHTML.includes('skill-lesson'));
  console.log('PASS: all 49 mathematics paths have a short explanation, three worked steps, result and accessible matrix tables; physics and chemistry preserved.');
}
if(!previewFile)checkMathLessons();
function checkEnem(){
  const enem=ctx.FURG_ENEM_DATA,byId=new Map(enem.questions.map(q=>[q.id,q]));
  assert(enem.questions.length>=(previewFile?20:3140));assert.equal(byId.size,enem.questions.length);
  const tuples=enem.questions.map(q=>[q.year,q.application,q.index,q.language||''].join('/'));assert.equal(new Set(tuples).size,tuples.length);
  for(const q of enem.questions){
    assert.equal(q.alternatives.length,5,q.id);assert.equal(new Set(q.alternatives.map(a=>a.letter)).size,5,q.id);
    assert(q.canceled||/^[A-E]$/.test(q.answer),q.id);assert(q.alternatives.every(a=>a.text||a.file),q.id);
    assert(!q.quality?.blocked,q.id+' is still in review');
    const paths=new Set(JSON.stringify(q).match(/enem\/(?:figures|images|restored|pdfs)\/[a-zA-Z0-9_./%-]+\.(?:png|jpe?g|webp|svg|pdf)/g)||[]);
    for(const path of paths){assert(fs.existsSync(path),q.id+' missing '+path);if(!path.endsWith('.pdf')){const expected=previewFile?ctx.FURG_PREVIEW_IMAGES[path]:path;assert(expected,q.id+' missing embedded image');assert(ctx.FurgEnem.markdown('![]('+path+')').includes('src="'+expected+'"'),q.id+' figure not rendered: '+path);}}
  }
  for(const row of enem.coverage)assert.equal(row.count,row.expected,JSON.stringify(row));
  if(!previewFile){assert.equal(byId.get('enem-2009-1').area,'ciencias-natureza');assert.equal(byId.get('enem-2009-46').area,'ciencias-humanas');}
  if(!previewFile&&byId.has('enem-1998-1')){
    assert.equal(byId.get('enem-1998-1').context,byId.get('enem-1998-2').context);assert(byId.get('enem-1998-1').files.length>0);
    assert.equal(byId.get('enem-1998-4').context,byId.get('enem-1998-5').context);
    for(const id of ['enem-2002-20','enem-2002-22','enem-2006-10']){const alts=byId.get(id).alternatives;assert(alts.every(a=>a.file),id+' needs five visual alternatives');assert.equal(new Set(alts.map(a=>a.file)).size,5);}
    assert.equal(byId.get('enem-1999-2').alternatives[4].text,'5');assert(!JSON.stringify(byId.get('enem-2005-46').alternatives).includes('AMARELA'));
  }
  const unsafe=ctx.FurgEnem.markdown('<script>alert(1)</script> ![x](javascript:alert(1)) <sup>2</sup> <img src=x onerror=x>');assert(!unsafe.includes('<script>'));assert(!unsafe.includes('<img'));assert(unsafe.includes('<sup>2</sup>'));
  vm.runInContext("setView('enem')",ctx);assert.equal(vm.runInContext('view',ctx),'enem');assert($('enemRoot').innerHTML.includes('Texto + figuras'));
  function click(action,extra={}){const button={dataset:{enem:action,...extra},disabled:false};for(const fn of events['enemRoot:click']||[])fn({target:{closest:()=>button}});}
  function current(){const id=$('enemQuestionRoot').innerHTML.match(/data-question-id="([^"]+)"/)?.[1];assert(id,'No visible ENEM question');return byId.get(id);}
  $('enemYear').value='2025';$('enemYear').onchange();click('area',{area:'matematica'});let q=current();assert.equal(q.year,2025);assert.equal(q.area,'matematica');
  const wrong=q.answer==='A'?'B':'A';click('choose',{letter:wrong});click('confirm');assert($('enemQuestionRoot').innerHTML.includes('A resposta correta é '+q.answer));assert.equal(ctx.FurgEnem.metrics().correct,0);assert.equal(ctx.FurgEnem.metrics().answered,1);
  click('favorite');$('enemNote').value='Rever a proporção e as unidades.';$('enemNote').oninput();assert.equal(JSON.parse(storage.get(progressKey)).enem.notes[q.id],'Rever a proporção e as unidades.');
  $('enemStatus').value='wrong';$('enemStatus').onchange();assert.equal(current().id,q.id);
  click('retry');click('choose',{letter:q.answer});click('confirm');assert($('enemQuestionRoot').innerHTML.includes('Tu acertou!'));assert.equal(ctx.FurgEnem.metrics().correct,0,'Retry rewrote the first attempt');assert.equal(vm.runInContext('state.enem.answers['+JSON.stringify(q.id)+'].attempts',ctx),2);
  $('enemStatus').value='favorites';$('enemStatus').onchange();assert.equal(current().id,q.id);
  click('clear');$('enemYear').value='2025';$('enemLanguage').value='ingles';$('enemYear').onchange();click('area',{area:'linguagens'});assert.equal(current().language,'ingles');
  $('enemLanguage').value='espanhol';$('enemLanguage').onchange();assert.equal(current().language,'espanhol');
  $('enemSearch').value='zzzz-sem-correspondencia-928';$('enemSearch').onkeydown({key:'Enter'});assert($('enemQuestionRoot').innerHTML.includes('Nenhuma questão'));
  click('clear');q=current();const before=ctx.FurgEnem.metrics().answered;click('show');assert($('enemQuestionRoot').innerHTML.includes('Gabarito: alternativa '+q.answer));assert.equal(ctx.FurgEnem.metrics().answered,before,'Viewing counted as answering');
  const bankIndex=vm.runInContext('index',ctx),oldId=current().id;let prevented=false;for(const fn of events['document:keydown']||[])fn({key:'ArrowRight',target:{closest:()=>null},preventDefault(){prevented=true;}});assert(prevented);assert.notEqual(current().id,oldId);assert.equal(vm.runInContext('index',ctx),bankIndex,'ENEM keyboard moved the FURG bank');
  const canceled=enem.questions.find(q=>q.canceled&&q.year===2025&&q.area==='matematica');assert(canceled);click('clear');$('enemYear').value='2025';$('enemSearch').value=(canceled.context||canceled.stem).split('\n')[0];$('enemYear').onchange();assert.equal(current().id,canceled.id);const countBefore=ctx.FurgEnem.metrics().answered;click('choose',{letter:'A'});click('confirm');assert.equal(ctx.FurgEnem.metrics().answered,countBefore);assert($('enemQuestionRoot').innerHTML.includes('Questão anulada no gabarito oficial'));
  const cleaned=ctx.FurgEnem.validate({answers:{[q.id]:{choice:'A',firstChoice:'Z',attempts:Infinity},unknown:{choice:'B'}},notes:{[q.id]:'x'.repeat(21000),unknown:'discard'},favorites:{unknown:true,[q.id]:true}});assert.equal(Object.keys(cleaned.answers).length,1);assert.equal(cleaned.answers[q.id].firstChoice,'A');assert.equal(cleaned.answers[q.id].attempts,100000);assert.equal(cleaned.notes[q.id].length,20000);assert(!cleaned.favorites.unknown);
  vm.runInContext("setView('desempenho')",ctx);assert($('enemStats').textContent.includes('ENEM: 1/'));assert.equal(errors.length,0);
  console.log('PASS: ENEM coverage, local figures/PDFs, filters, answers, annulled grading, first attempt, notes, favorites, keyboard isolation and safe rendering ('+enem.questions.length+' questions).');
}
checkEnem();
async function checkProfile(){
  const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aKq0AAAAASUVORK5CYII=';
  const clean=ctx.FurgProfile.validate({name:'  Ana   Maria  ',photo:png});assert.equal(clean.name,'Ana Maria');assert.equal(clean.photo,png);assert.equal(ctx.FurgProfile.initials('Ana Maria'),'AM');
  for(const photo of ['https://example.com/photo.png','javascript:alert(1)','data:image/svg+xml;base64,PHN2Zz4=','data:image/jpeg;base64,bm90LWFuLWltYWdl','data:image/jpeg;base64,/9j/'+ 'A'.repeat(200000)])assert.equal(ctx.FurgProfile.validate({photo}).photo,'');
  await assert.rejects(ctx.FurgProfile.preparePhoto({type:'application/pdf',size:10}),/JPG/);await assert.rejects(ctx.FurgProfile.preparePhoto({type:'image/jpeg',size:11*1024*1024}),/10 MB/);
  $('profileEdit').click();$('profileName').value='Ana Maria';for(const fn of events['profileForm:submit'])fn({preventDefault(){}});assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert.equal(JSON.parse(storage.get(progressKey)).profile.name,'Ana Maria');assert.equal($('profileDisplayName').textContent,'Ana Maria');
  vm.runInContext('state.profile='+JSON.stringify(clean),ctx);ctx.FurgProfile.refresh();$('exportProgress').click();const backup=JSON.parse(await exported.at(-1).text());assert.equal(backup.profile.photo,png);assert.equal(backup.profile.name,'Ana Maria');assert.equal(Object.keys(backup.enem.answers).length,2);
  async function importBackup(value){const text=JSON.stringify(value);await $('progressFile').onchange({target:{files:[{size:Buffer.byteLength(text),text:async()=>text}],value:'chosen.json'}});}
  vm.runInContext("state.profile={name:'Outro nome',photo:''}",ctx);await importBackup(backup);assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert.equal(vm.runInContext('state.profile.photo',ctx),png);assert.equal($('profileDisplayName').textContent,'Ana Maria');
  await importBackup({version:1,answers:{}});assert.equal(vm.runInContext('state.profile.photo',ctx),png);assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert(!Object.hasOwn(legacy,'profile'));assert.equal(vm.runInContext('Object.keys(state.enem.answers).length',ctx),2);assert.equal(Object.keys(legacy.enem.answers).length,0);
  $('profileEdit').click();$('profileRemovePhoto').click();for(const fn of events['profileForm:submit'])fn({preventDefault(){}});assert.equal(vm.runInContext('state.profile.photo',ctx),'');assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');
  $('profileEdit').click();$('profileName').value='Descartar';$('profileCancel').click();assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');
  const originalSetItem=ctx.localStorage.setItem;ctx.localStorage.setItem=()=>{throw Error('quota');};$('profileEdit').click();$('profileName').value='Não salvar';for(const fn of events['profileForm:submit'])fn({preventDefault(){}});assert.equal(vm.runInContext('state.profile.name',ctx),'Ana Maria');assert($('profileMessage').textContent.includes('Não foi possível'));ctx.localStorage.setItem=originalSetItem;$('profileCancel').click();
  console.log('PASS: existing site flows, 765 tagged questions, 144 paths, 720 flashcards (reveal, navigation, restart, focus and keyboard isolation), 36 literary sections, 6 original excerpts and 60 reading questions; profile export/import and legacy progress preserved.');
}
async function checkEnemSimulations(){
  const sim=ctx.FurgEnemSim,snapshot=vm.runInContext('JSON.stringify(state)',ctx);
  assert(sim.years.length>0);assert(sim.years.every(y=>y>=2010));assert(!sim.years.includes(2009));if(!previewFile)assert.equal(sim.years.length,16);
  for(const year of sim.years)for(const day of ['1','2','all'])for(const language of ['ingles','espanhol']){const q=sim.exam(year,day,language);assert.equal(q.length,day==='all'?180:90);assert.equal(new Set(q.map(q=>q.index)).size,q.length);assert(q.every(q=>!q.language||q.language===language));for(let i=1;i<q.length;i++)assert(q[i].index>q[i-1].index);}
  if(!previewFile){assert(sim.exam(2016,'1').every(q=>['ciencias-humanas','ciencias-natureza'].includes(q.area)));assert(sim.exam(2016,'2').every(q=>['linguagens','matematica'].includes(q.area)));assert.equal(sim.minutes(2016,'1'),270);assert.equal(sim.minutes(2016,'2'),330);}
  assert.equal(sim.minutes(2017,'2'),270);assert.equal(sim.minutes(2018,'2'),300);
  vm.runInContext("setView('simulados')",ctx);assert($('enemSimRoot').innerHTML.includes('A prova daquele ano'));
  function click(action,extra={}){for(const fn of events['enemSimRoot:click']||[])fn({target:{closest:()=>({dataset:{enemSim:action,...extra},disabled:false})}});}
  $('enemExamYear').value='2025';$('enemExamDay').value='2';$('enemExamLanguage').value='ingles';$('enemExamMinutes').value='1';click('start');
  let active=vm.runInContext('state.enemSim.active',ctx);assert.equal(active.ids.length,90);assert.equal(active.ids[0],'enem-2025-91');assert(!$('enemSimRoot').innerHTML.includes('Gabarito:'));assert($('furgSimSection').hidden);
  const ids=[...active.ids],byId=new Map(ctx.FURG_ENEM_DATA.questions.map(q=>[q.id,q])),right=byId.get(ids[0]).answer,second=byId.get(ids[1]);
  click('choose',{letter:right});click('mark');click('next');click('choose',{letter:second.answer==='A'?'B':'A'});click('blank');assert(!vm.runInContext('state.enemSim.active.answers['+JSON.stringify(ids[1])+']',ctx));click('choose',{letter:second.answer==='A'?'B':'A'});
  click('pause');assert(vm.runInContext('state.enemSim.active.paused',ctx));const pausedRemaining=vm.runInContext('state.enemSim.active.remainingMs',ctx);assert(!sim.handleKey('A'));sim.tick();assert.equal(vm.runInContext('state.enemSim.active.remainingMs',ctx),pausedRemaining);
  vm.runInContext('globalThis.FurgEnemSim.init({getState:()=>state,save,toast})',ctx);assert(vm.runInContext('state.enemSim.active.marked['+JSON.stringify(ids[0])+']',ctx));assert.equal(vm.runInContext('state.enemSim.active.answers['+JSON.stringify(ids[0])+']',ctx),right);
  $('exportProgress').click();let backup=JSON.parse(await exported.at(-1).text());assert.equal(backup.enemSim.active.ids.length,90);const imported=vm.runInContext('validateProgress('+JSON.stringify(backup)+')',ctx);assert.equal(imported.enemSim.active.language,'ingles');assert(sim.merge(imported.enemSim,{active:null,history:[]}).active);
  click('pause');click('finish');assert(vm.runInContext('state.enemSim.active',ctx));click('continue');assert(!$('enemSimRoot').innerHTML.includes('Finalizar e conferir?'));click('finish');click('finish-confirm');
  assert.equal(vm.runInContext('state.enemSim.active',ctx),null);let history=vm.runInContext('state.enemSim.history',ctx);assert.equal(history.length,1);const score=sim.score(history[0]);assert.equal(score.correct,1);assert.equal(score.wrong,1);assert.equal(score.annulled,3);assert.equal(score.correct+score.wrong+score.blank,score.graded);assert($('enemSimRoot').innerHTML.includes('Gabarito:'));assert(!$('furgSimSection').hidden);
  click('review-filter');assert($('enemSimRoot').innerHTML.includes(ids[1]));click('new');$('enemExamYear').value='2025';$('enemExamDay').value='1';$('enemExamLanguage').value='espanhol';$('enemExamMinutes').value='1';click('start');assert(vm.runInContext('state.enemSim.active.ids[0]',ctx).endsWith('-espanhol'));vm.runInContext('state.enemSim.active.endsAt=Date.now()-1',ctx);sim.tick();assert.equal(vm.runInContext('state.enemSim.active',ctx),null);assert(vm.runInContext('state.enemSim.history.at(-1).expired',ctx));
  $('exportProgress').click();backup=JSON.parse(await exported.at(-1).text());assert.equal(sim.validate(backup.enemSim).history.length,2);assert.equal(sim.merge(backup.enemSim,backup.enemSim).history.length,2);assert.equal(sim.validate({active:{year:2009},history:[{year:2009}]}).active,null);
  vm.runInContext('state='+snapshot,ctx);vm.runInContext('globalThis.FurgEnemSim.init({getState:()=>state,save,toast})',ctx);
  assert.equal(errors.length,0);console.log('PASS: annual ENEM simulations 2010+, both days/languages, original order, hidden keys, pause/resume, persisted answers, export/import, completion, annulments, review and time expiry.');
}
checkProfile().then(checkEnemSimulations).then(checkLevelUp).then(checkFuvest).then(checkBiologyAndSubjects).then(checkExamSubjectEditing).then(checkLightReview).then(checkAnatomy).then(checkDayOne).then(checkGroupedNavigation).then(()=>require('./check-study-guide.cjs').integration(studyAdditionContext())).then(checkVesperaBackup).then(()=>ctx.FurgDia2 && require('./check-dia2.cjs')(studyAdditionContext())).then(()=>ctx.FurgMathLab && require('./check-math-lab.cjs')(studyAdditionContext())).catch(error=>{console.error(error);process.exitCode=1;});

async function checkLevelUp(){return require('./check-levelup-rounds.cjs')({ctx,$,vm,events,assert,storage,progressKey,exported,fs,errors});}

function checkFuvest(){
 if(previewFile)return;
 const data=ctx.FURG_FUVEST_DATA,qs=data.questions,byId=new Map(qs.map(q=>[q.id,q])),keys=JSON.parse(fs.readFileSync('fuvest/provenance/official-keys.json','utf8'));
 assert.equal(qs.length,1530);assert.equal(byId.size,1530);assert.equal(data.coverage.length,17);
 assert.equal(new Set(qs.map(q=>q.year+'/'+q.index)).size,1530);
 for(let year=2010;year<=2026;year++){const subset=qs.filter(q=>q.year===year);assert.equal(subset.length,90);assert.deepEqual(Array.from(subset,q=>q.index),Array.from({length:90},(_,i)=>i+1));}
 for(const q of qs){const key=keys[q.year][q.index];assert.equal(q.answer,key.answer,q.id);assert.equal(q.canceled,key.canceled,q.id);assert.equal(q.alternatives.length,5);assert.deepEqual(Array.from(q.alternatives,a=>a.letter),['A','B','C','D','E']);assert(q.source.images.length,q.id);for(const path of [...q.source.images,q.source.pdf,q.source.answerPdf])assert(fs.existsSync(path),q.id+' missing '+path);assert(q.source.images.every(p=>ctx.FurgFuvest.markdown('![]('+p+')').includes('src="'+p+'"')));}
 assert.equal(qs.filter(q=>q.canceled).length,3);assert.equal(byId.get('fuvest-2024-48').answer,'E');
 for(const [year,numbers] of [[2010,[20,21]],[2014,[69,70]],[2015,[25,26,27,28]],[2026,[1,2]]]){const a=byId.get('fuvest-'+year+'-'+numbers[0]);for(const n of numbers){const q=byId.get('fuvest-'+year+'-'+n);assert(q.source.images.includes(a.source.images[0]),q.id+' lost shared stimulus');}}
 vm.runInContext("setView('fuvest')",ctx);assert($('fuvestRoot').innerHTML.includes('1.530'));assert($('coverage').innerHTML.includes('FUVEST'));
 function click(action,extra={}){const button={dataset:{fuvest:action,...extra},disabled:false};for(const fn of events['fuvestRoot:click']||[])fn({target:{closest:()=>button}});}
 function current(){const id=$('fuvestQuestionRoot').innerHTML.match(/data-question-id="([^"]+)"/)?.[1];assert(id);return byId.get(id);}
 $('fuvestYear').value='2024';$('fuvestYear').onchange();let q=current();assert.equal(q.year,2024);assert($('fuvestQuestionRoot').innerHTML.includes('Transcrição complementar')||$('fuvestQuestionRoot').innerHTML.includes('Conferir o original com figuras'));assert(!$('fuvestQuestionRoot').innerHTML.includes('Gabarito: alternativa'));
 click('choose',{letter:q.answer});click('confirm');assert.equal(ctx.FurgFuvest.metrics().answered,1);assert.equal(ctx.FurgFuvest.metrics().correct,1);assert($('fuvestQuestionRoot').innerHTML.includes('Tu acertou!'));
 click('favorite');$('fuvestNote').value='Revisar o texto de apoio.';$('fuvestNote').oninput();assert.equal(JSON.parse(storage.get(progressKey)).fuvest.notes[q.id],'Revisar o texto de apoio.');
 $('fuvestStatus').value='favorites';$('fuvestStatus').onchange();assert.equal(current().id,q.id);
 click('retry');click('choose',{letter:q.answer==='A'?'B':'A'});click('confirm');assert.equal(ctx.FurgFuvest.metrics().correct,1,'Fuvest retry changed first attempt');
 click('clear');const old=current().id,bankIndex=vm.runInContext('index',ctx);let prevented=false;for(const fn of events['document:keydown']||[])fn({key:'ArrowRight',target:{closest:()=>null},preventDefault(){prevented=true;}});assert(prevented);assert.notEqual(current().id,old);assert.equal(vm.runInContext('index',ctx),bankIndex);
 $('fuvestSearch').value='zzzz-sem-correspondencia-989';$('fuvestSearch').onkeydown({key:'Enter'});assert($('fuvestQuestionRoot').innerHTML.includes('Nenhuma questão'));click('clear');click('jump',{index:'2'});assert(current().canceled);const before=ctx.FurgFuvest.metrics().answered;click('choose',{letter:'A'});click('confirm');assert.equal(ctx.FurgFuvest.metrics().answered,before);assert($('fuvestQuestionRoot').innerHTML.includes('Questão anulada'));
 const clean=vm.runInContext('validateProgress(state)',ctx);assert.equal(clean.fuvest.notes[q.id],'Revisar o texto de apoio.');assert.equal(Object.keys(vm.runInContext('validateProgress({version:1,answers:{}})',ctx).fuvest.answers).length,0);
 const exported=vm.runInContext('JSON.stringify(state)',ctx);assert.equal(JSON.parse(exported).fuvest.answers[q.id].firstChoice,q.answer);
 vm.runInContext("setView('desempenho')",ctx);assert($('fuvestStats').textContent.includes('Fuvest: 1/1530'));
 const restored=JSON.parse(fs.readFileSync('enem/provenance/context-restorations-20261020.json','utf8'));assert.equal(restored.length,124);const eb=new Map(ctx.FURG_ENEM_DATA.questions.map(q=>[q.id,q]));for(const p of restored){const q=eb.get(p.id);for(const key of ['context','stem'])if(key in p)assert.equal(q[key],p[key]);assert.equal(q.quality.contextRestored,'2026-10-20');}
 assert(eb.get('enem-2013-175').context.includes('Nos últimos anos'));assert(eb.get('enem-2016-61').context.includes('Um pesquisador'));assert.equal(errors.length,0);
 console.log('PASS: FUVEST 2010–2026, 1530 unique official questions, all originals/keys, shared stimuli, corrected 2024 key, annulments, filters, first attempt, favorites, notes, keyboard and progress export; 124 audited ENEM context restorations.');
}

function checkBiologyAndSubjects(){
 const bio=model.skills.filter(s=>s.subject==='Biologia');assert.equal(bio.length,25);assert.equal(db.questions.filter(q=>q.subject==='Biologia').length,195);
 for(const skill of bio){const lesson=ctx.FURG_BIOLOGY_LESSONS[skill.id];assert(lesson.explanation.length>70);assert.equal(lesson.steps.length,3);assert(lesson.result.length>10);skillClick('open',skill.id);assert($('skillsRoot').innerHTML.includes('Em poucas palavras'));assert($('skillsRoot').innerHTML.includes('5 flashcards'));}
 skillClick('practice','bio-celulas');assert.equal($('subject').value,'Biologia');assert(vm.runInContext('filtered.length>0',ctx));skillClick('review','bio-celulas');assert(JSON.parse(storage.get(progressKey)).skills.reviewed['bio-celulas']);
 vm.runInContext("setView('fuvest')",ctx);const data=ctx.FURG_FUVEST_DATA;assert.equal(data.questions.length,1530);assert.equal(Object.keys(data.subjects).length,11);assert(data.readingCoverage.text>250);
 assert.equal(data.readingCoverage.text,data.questions.filter(q=>q.quality.textReady).length);
 for(const q of data.questions){assert(q.subjects.length);assert(q.subjects.every(id=>data.subjects[id]));if(q.quality.textReady){assert(q.alternatives.every(a=>a.text));assert(!/[\u0530-\u1fff\ufffd]/.test((q.context||'')+q.stem+q.alternatives.map(a=>a.text).join('')));}}
 for(const subject of Object.keys(data.subjects)){$('fuvestSubject').value=subject;$('fuvestSubject').onchange();const id=$('fuvestQuestionRoot').innerHTML.match(/data-question-id="([^"]+)"/)[1];assert(data.questions.find(q=>q.id===id).subjects.includes(subject));}
 $('fuvestSubject').value='matematica';$('fuvestYear').value='2013';$('fuvestYear').onchange();assert($('fuvestCount').textContent.startsWith('11 '));
 $('fuvestSubject').value='';$('fuvestYear').value='';$('fuvestFormat').value='text';$('fuvestFormat').onchange();assert($('fuvestQuestionRoot').innerHTML.includes('data-reading-mode="text"'));assert($('fuvestQuestionRoot').innerHTML.includes('fuvest-text-options'));assert($('fuvestQuestionRoot').innerHTML.includes('Conferir o original com figuras'));assert.equal(parseInt($('fuvestCount').textContent.replace(/\./g,'')),data.readingCoverage.text);
 $('fuvestFormat').value='original';$('fuvestFormat').onchange();assert($('fuvestQuestionRoot').innerHTML.includes('data-reading-mode="text"'));assert($('fuvestQuestionRoot').innerHTML.includes('data-transcription-kind="companion"'));assert($('fuvestQuestionRoot').innerHTML.includes('fuvest-text-options'));assert($('fuvestQuestionRoot').innerHTML.indexOf('fuvest-reading')<$('fuvestQuestionRoot').innerHTML.indexOf('fuvest-originals'));assert(!/class="fuvest-transcription fuvest-source-original"[^>]*\bopen\b/.test($('fuvestQuestionRoot').innerHTML));assert($('fuvestQuestionRoot').innerHTML.includes('fuvest-originals'));assert($('fuvestQuestionRoot').innerHTML.includes('Transcrição complementar'));
 console.log('PASS: 25 Biology paths with prerequisites, 125 flashcards, explanations/examples, classified practice and saved review; all 1530 Fuvest items filter by subject; text/original views and combined year/subject filters.');
}

async function checkExamSubjectEditing(){
 const before=vm.runInContext('JSON.stringify(state)',ctx);
 const subjectData=ctx.FURG_ENEM_SUBJECTS_DATA;assert.equal(Object.keys(subjectData.questions).length,3833);
 for(const q of ctx.FURG_ENEM_DATA.questions){assert(q.subjects.length);assert(q.subjects.every(id=>subjectData.labels[id]));}
 function click(exam,action,extra={}){for(const fn of events[exam+'Root:click']||[])fn({target:{closest:()=>({dataset:{[exam]:action,...extra},disabled:false})}});}
 function currentId(exam){return $(exam+'QuestionRoot').innerHTML.match(/data-question-id="([^"]+)"/)[1];}
 vm.runInContext("setView('enem')",ctx);click('enem','clear');
 for(const subject of Object.keys(subjectData.labels)){$('enemSubject').value=subject;$('enemSubject').onchange();assert(ctx.FURG_ENEM_DATA.questions.find(q=>q.id===currentId('enem')).subjects.includes(subject));}
 $('enemSubject').value='fisica';$('enemYear').value='2025';$('enemYear').onchange();let expected=ctx.FURG_ENEM_DATA.questions.filter(q=>q.year===2025&&q.subjects.includes('fisica')).length;assert.equal(parseInt($('enemCount').textContent),expected);
 const ids={};
 for(const exam of ['enem','fuvest']){
  vm.runInContext('setView('+JSON.stringify(exam)+')',ctx);click(exam,'clear');const id=ids[exam]=currentId(exam);const module=exam==='enem'?ctx.FurgEnem:ctx.FurgFuvest;
  $(exam+'SubjectChoice').value='fisica';$(exam+'SubjectChoice').onchange();assert.equal(vm.runInContext('state.'+exam+'.subjectOverrides['+JSON.stringify(id)+']',ctx),'fisica');assert($(exam+'QuestionRoot').innerHTML.includes('>Física</span>'));assert.equal(JSON.parse(storage.get(progressKey))[exam].subjectOverrides[id],'fisica');
  const clean=module.validate({subjectOverrides:{[id]:'quimica',unknown:'fisica',[id+'-fake']:'<img>'}});assert.equal(Object.keys(clean.subjectOverrides).length,1);assert.equal(clean.subjectOverrides[id],'quimica');assert.equal(Object.keys(module.validate({subjectOverrides:{[id]:'<script>'}}).subjectOverrides).length,0);
  const setItem=ctx.localStorage.setItem;ctx.localStorage.setItem=()=>{throw Error('quota');};$(exam+'SubjectChoice').value='quimica';$(exam+'SubjectChoice').onchange();assert.equal(vm.runInContext('state.'+exam+'.subjectOverrides['+JSON.stringify(id)+']',ctx),'fisica');assert($(exam+'SubjectStatus').textContent.includes('Não foi possível'));ctx.localStorage.setItem=setItem;
  $(exam+'Subject').value='fisica';$(exam+'Subject').onchange();assert.equal(currentId(exam),id);$(exam+'SubjectChoice').value='quimica';$(exam+'SubjectChoice').onchange();assert.notEqual(currentId(exam),id,'Edited question stayed in the previous subject filter');click(exam,'clear');
 }
 $('exportProgress').click();const backup=JSON.parse(await exported.at(-1).text());
 for(const exam of ['enem','fuvest'])assert.equal(backup[exam].subjectOverrides[ids[exam]],'quimica');
 vm.runInContext('state.enem.subjectOverrides={};state.fuvest.subjectOverrides={}',ctx);
 async function importValue(value){const text=JSON.stringify(value);await $('progressFile').onchange({target:{files:[{size:Buffer.byteLength(text),text:async()=>text}],value:'progress.json'}});}
 await importValue(backup);for(const exam of ['enem','fuvest'])assert.equal(vm.runInContext('state.'+exam+'.subjectOverrides['+JSON.stringify(ids[exam])+']',ctx),'quimica');
 await importValue({version:1,answers:{}});for(const exam of ['enem','fuvest'])assert.equal(vm.runInContext('state.'+exam+'.subjectOverrides['+JSON.stringify(ids[exam])+']',ctx),'quimica','Legacy import removed custom subjects');
 for(const exam of ['enem','fuvest']){vm.runInContext('setView('+JSON.stringify(exam)+')',ctx);click(exam,'clear');const questions=(exam==='enem'?ctx.FURG_ENEM_DATA:ctx.FURG_FUVEST_DATA).questions;const sorted=[...questions].sort((a,b)=>b.year-a.year||a.application.localeCompare(b.application)||a.index-b.index||String(a.language||'').localeCompare(String(b.language||'')));click(exam,'jump',{index:String(sorted.findIndex(q=>q.id===ids[exam]))});assert.equal(currentId(exam),ids[exam]);$(exam+'SubjectChoice').value='';$(exam+'SubjectChoice').onchange();assert(!vm.runInContext('state.'+exam+'.subjectOverrides['+JSON.stringify(ids[exam])+']',ctx));}
 vm.runInContext('state='+before,ctx);
 console.log('PASS: ENEM subject coverage and combined filters; ENEM/Fuvest custom subjects, filter refresh, safe validation, persistence, export/import, legacy backups and storage rollback.');
}

async function checkLightReview(){
 const module=ctx.FurgLightReview,data=ctx.FURG_LIGHT_REVIEW_DATA,snapshot=vm.runInContext('JSON.stringify(state)',ctx),theme=document.documentElement.dataset.theme;
 assert.equal(data.cards.length,61);assert.equal(new Set(data.cards.map(c=>c.id)).size,61);
 for(const c of data.cards){assert(data.decks[c.deck]);assert(c.front&&c.answer&&c.connection);assert(c.tags.length&&c.tags.every(t=>data.tags[t]));if(c.source)assert(/^https:\/\//.test(c.source.url));}
 assert(!/lightFlashDialog[^>]*\bopen\b/.test(html),'Momentary cards must not open automatically');
 function click(prefix,action,extra={}){const id=prefix==='light'?'lightReviewRoot':'lightFlashRoot';for(const fn of events[id+':click']||[])fn({preventDefault(){},target:{closest:()=>({dataset:{light:action,...extra},disabled:false})}});}
 function id(prefix){return $(prefix==='light'?'lightReviewRoot':'lightFlashRoot').innerHTML.match(/data-light-card="([^"]+)"/)?.[1];}
 const lightState=()=>vm.runInContext('state.lightReview',ctx),reset=()=>{vm.runInContext('state.lightReview=FurgLightReview.defaults()',ctx);module.init({getState:()=>vm.runInContext('state',ctx),save:()=>vm.runInContext('save()',ctx),toast:()=>{},setView:name=>vm.runInContext('setView('+JSON.stringify(name)+')',ctx)});};
 reset();vm.runInContext("setView('enem')",ctx);const underlying=$('enemQuestionRoot').innerHTML,answers=JSON.stringify(ctx.FurgEnem.metrics());$('enemNote').focus();$('lightLauncher').click();assert($('lightFlashDialog').open);assert.equal($('lightLauncher').getAttribute('aria-expanded'),'true');const first=id('quick');assert(first.startsWith('rep-'));click('quick','reveal');assert($('lightFlashRoot').innerHTML.includes('data-face="back"'));assert(lightState().seen[first]);click('quick','save');assert(lightState().saved[first]);assert(JSON.parse(storage.get(progressKey)).lightReview.saved[first]);
 const day=Object.keys(lightState().days)[0];click('quick','reveal');click('quick','reveal');assert.equal(lightState().days[day].length,1,'Opening a card twice inflated daily activity');
 for(const fn of events['document:keydown']||[])fn({key:'Enter',target:{closest:()=>null},preventDefault(){}});assert.equal($('enemQuestionRoot').innerHTML,underlying);assert.equal(JSON.stringify(ctx.FurgEnem.metrics()),answers,'Card changed an ENEM answer');
 click('quick','next');assert.notEqual(id('quick'),first);click('quick','close');assert(!$('lightFlashDialog').open);assert.equal(document.activeElement,$('enemNote'));assert.equal($('lightLauncher').getAttribute('aria-expanded'),'false');
 vm.runInContext("setView('leve')",ctx);assert($('lightReviewRoot').innerHTML.includes('Dar lock in'));assert($('lightReviewRoot').innerHTML.includes('Meus decks'));
 click('light','start');assert.equal(lightState().session.ids.length,3);assert.equal(id('light'),first,'Saved card was not prioritized');click('light','reveal');click('light','next');const second=id('light');click('light','pause');assert(lightState().session.paused);assert($('lightReviewRoot').innerHTML.includes('Continua de onde parou'));module.init({getState:()=>vm.runInContext('state',ctx),save:()=>vm.runInContext('save()',ctx),toast:()=>{},setView:name=>vm.runInContext('setView('+JSON.stringify(name)+')',ctx)});click('light','resume');assert.equal(id('light'),second);assert.equal(lightState().session.index,1);click('light','reveal');click('light','next');click('light','reveal');click('light','next');assert(lightState().session.finished);assert.equal(lightState().session.done.length,3);assert($('lightReviewRoot').innerHTML.includes('Por agora, tá bom'));
 click('light','duration',{duration:'15'});click('light','start');assert.equal(lightState().session.ids.length,9);click('light','pause');
 $('lightDeck').value='agentes';$('lightDeck').onchange();$('lightTag').value='ia';$('lightTag').onchange();click('light','start');assert(lightState().session.ids.every(id=>data.cards.find(c=>c.id===id).deck==='agentes'&&data.cards.find(c=>c.id===id).tags.includes('ia')));click('light','pause');
 $('lightCalm').checked=false;$('lightCalm').onchange();assert.equal(document.documentElement.dataset.calm,'false');$('lightMotion').checked=false;$('lightMotion').onchange();assert.equal(document.documentElement.dataset.ambientMotion,'off');assert.equal(document.documentElement.dataset.theme,theme,'Calm settings changed the light/dark preference');
 const setItem=ctx.localStorage.setItem,before=JSON.stringify(lightState());ctx.localStorage.setItem=()=>{throw Error('quota');};$('lightCalm').checked=true;$('lightCalm').onchange();assert.equal(JSON.stringify(lightState()),before,'Storage failure did not roll back');assert.equal(document.documentElement.dataset.calm,'false');ctx.localStorage.setItem=setItem;
 const bad=module.validate({deck:'<script>',tag:'<img>',currentId:'unknown',duration:Infinity,saved:{unknown:true,[first]:'yes'},seen:{[first]:true},days:{'2099-01-01':[first],'2026-99-99':[first],'invalid':[first]},session:{ids:[first,first],index:0},visual:{calm:'false',motion:false}});assert.equal(bad.deck,'repertorios');assert.equal(bad.tag,'');assert.equal(bad.currentId,'');assert.equal(Object.keys(bad.saved).length,0);assert.equal(Object.keys(bad.days).length,0);assert.equal(bad.session,null);assert.equal(bad.visual.calm,true);assert.equal(bad.visual.motion,false);
 const original={...data.cards.find(c=>c.id===first)},target=data.cards.find(c=>c.id===first);Object.assign(target,{title:'<img src=x onerror=alert(1)>',front:'<script>alert(1)</script>',source:{label:'Source',url:'javascript:alert(1)'}});vm.runInContext('state.lightReview.deck="repertorios";state.lightReview.tag="";state.lightReview.currentId='+JSON.stringify(first),ctx);$('lightLauncher').click();assert(!$('lightFlashRoot').innerHTML.includes('<script>'));click('quick','reveal');assert(!$('lightFlashRoot').innerHTML.includes('<img'));assert(!$('lightFlashRoot').innerHTML.includes('href="javascript:'));Object.assign(target,original);click('quick','close');
 $('exportProgress').click();const backup=JSON.parse(await exported.at(-1).text());assert(backup.lightReview.saved[first]);assert(backup.lightReview.session.paused);
 vm.runInContext('state.lightReview=FurgLightReview.defaults()',ctx);const json=JSON.stringify(backup);await $('progressFile').onchange({target:{files:[{size:Buffer.byteLength(json),text:async()=>json}],value:'light-progress.json'}});assert(lightState().saved[first]);assert.equal(lightState().visual.calm,false);assert.equal(lightState().session.index,backup.lightReview.session.index);
 const legacyJSON=JSON.stringify({version:1,answers:{}});await $('progressFile').onchange({target:{files:[{size:legacyJSON.length,text:async()=>legacyJSON}],value:'old.json'}});assert(lightState().saved[first],'Legacy import removed saved cards');assert.equal(lightState().visual.calm,false);
 let spoken=null,canceled=0;ctx.SpeechSynthesisUtterance=function(text){this.text=text;};ctx.speechSynthesis={getVoices:()=>[{lang:'pt-BR'}],speak:utterance=>spoken=utterance,cancel:()=>canceled++};$('lightLauncher').click();click('quick','listen');assert(spoken.text.includes(original.title));assert.equal(spoken.lang,'pt-BR');click('quick','next');assert.equal(canceled,1,'Moving card did not stop speech');click('quick','listen');click('quick','close');assert.equal(canceled,2,'Closing dialog did not stop speech');delete ctx.SpeechSynthesisUtterance;delete ctx.speechSynthesis;
 vm.runInContext('state='+snapshot,ctx);module.refresh();assert.equal(errors.length,0);
 console.log('PASS: 61 sourced/original light cards; opt-in modal, keyboard isolation, accessible close/focus, short sessions/pause/resume, saved/unseen suggestions, deduplicated activity, calm/reduced-motion controls, safe validation/rendering, export/import, legacy backups, storage rollback and optional speech cancellation.');
}

function studyAdditionContext(){return {ctx,$,vm,events,assert,storage,progressKey,exported,document,errors,fs};}
function checkAnatomy(){return require('./check-study-additions.cjs').anatomy(studyAdditionContext());}
function checkDayOne(){return require('./check-study-additions.cjs').dayOne(studyAdditionContext());}

function checkGroupedNavigation(){return require('./check-grouped-navigation.cjs')({ctx,$,vm,events,assert,document,errors,html});}

async function checkVesperaBackup(){
 if(previewFile||!ctx.FurgVespera)return;
 const mode=ctx.FurgVespera,oldBank=vm.runInContext('JSON.stringify(state.enem)',ctx),oldFurg=vm.runInContext('JSON.stringify(state.answers)',ctx);
 assert(mode.start('foco'));const id=vm.runInContext('state.vespera.active.ids[0]',ctx),q=ctx.FURG_ENEM_DATA.questions.find(q=>q.id===id);
 assert(mode.record({command:'Identificar o propósito delimitado.',evidence:'Uma evidência presente no apoio.',confidence:'alta',choice:q.answer==='A'?'B':'A'}));
 $('exportProgress').click();const backup=JSON.parse(await exported.at(-1).text());assert.equal(backup.vespera.attempts.length,1);assert.equal(backup.vespera.attempts[0].confidence,'alta');
 const importFile=async data=>{const text=JSON.stringify(data);await $('progressFile').onchange({target:{files:[{size:text.length,text:async()=>text}],value:'test'}});};
 await importFile(backup);assert.equal(vm.runInContext('state.vespera.attempts.length',ctx),1,'Reimport duplicated Vespera attempts');
 await importFile({version:1,answers:{}});assert.equal(vm.runInContext('state.vespera.attempts.length',ctx),1,'Legacy backup erased Vespera');assert.equal(vm.runInContext('JSON.stringify(state.enem)',ctx),oldBank);assert.equal(vm.runInContext('JSON.stringify(state.answers)',ctx),oldFurg);
 const before=vm.runInContext('JSON.stringify(state)',ctx),setItem=ctx.localStorage.setItem;ctx.localStorage.setItem=()=>{throw Error('full')};
 const added=JSON.parse(JSON.stringify(backup));added.vespera.attempts[0].id+='-second';await importFile(added);assert.equal(vm.runInContext('JSON.stringify(state)',ctx),before,'Failed import did not roll back full progress');ctx.localStorage.setItem=setItem;
 console.log('PASS: Vespera included in real backup export/import; repeated import deduplicates, old backups preserve new records, failed writes roll back, original ENEM/FURG records preserved.');
}
