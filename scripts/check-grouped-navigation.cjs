'use strict';
module.exports=function({ctx,$,vm,events,assert,document,errors,html}){
 const nav=ctx.FurgNavigation;assert.equal((html.match(/data-nav-group="/g)||[]).length,3);assert.equal((html.match(/class="nav-popover"/g)||[]).length,3);
 for(const id of ['provas','treinamento','estudos']){const body=html.match(new RegExp('<section class="nav-popover" id="navMenu-'+id+'"[^>]*>([\\s\\S]*?)<\\/section>'))[1];$('navMenu-'+id).innerHTML=body;assert($('navMenu-'+id).hidden||!nav.isOpen());}
 const top=html.match(/<nav id="mainNavigation"[^>]*>([\s\S]*?)<\/nav>/)[1];
 assert.deepEqual([...top.matchAll(/data-(?:view|nav-group)="([^"]+)"/g)].map(match=>match[1]),['provas','treinamento','estudos','calculo-mental','desempenho']);
 assert($('navMenu-provas').innerHTML.includes('enem-sim'));
 for(const view of ['vespera','dia2','anatomia','matematica-lab'])assert($('navMenu-treinamento').innerHTML.includes('data-view="'+view+'"'));
 vm.runInContext("setView('dia2')",ctx);assert($('navTrigger-treinamento').classList.contains('is-active'));const direct=view=>document.querySelectorAll('.nav').find(button=>button.dataset.view===view);
 direct('calculo-mental').click();assert.equal(vm.runInContext('view',ctx),'calculo-mental');assert.equal(direct('calculo-mental').getAttribute('aria-current'),'page');assert($('mentalRoot').innerHTML.includes('Escolhe teu ritmo'));
 direct('desempenho').click();assert.equal(vm.runInContext('view',ctx),'desempenho');assert.equal(direct('desempenho').getAttribute('aria-current'),'page');assert(!direct('calculo-mental').getAttribute('aria-current'));
 const trigger=id=>{for(const fn of events['navTrigger-'+id+':click']||[])fn({});},key=(value,target)=>{for(const fn of events['document:keydown']||[])fn({key:value,preventDefault(){},stopPropagation(){},target:{closest:selector=>selector==='#navigationMenus'&&target?$('navMenu-provas'):selector==='button'?target:null}});};
 vm.runInContext("setView('enem')",ctx);const underlying=$('enemQuestionRoot').innerHTML;trigger('provas');assert(nav.isOpen());assert(!$('navMenu-provas').hidden);assert.equal($('navTrigger-provas').getAttribute('aria-expanded'),'true');key('A');assert.equal($('enemQuestionRoot').innerHTML,underlying,'Menu keyboard affected question');
 const first=$('navMenu-provas').querySelectorAll('button')[0];first.focus();key('ArrowDown',first);assert.equal(document.activeElement,$('navMenu-provas').querySelectorAll('button')[1]);key('Escape',document.activeElement);assert(!nav.isOpen());assert.equal(document.activeElement,$('navTrigger-provas'));
 trigger('provas');trigger('estudos');assert($('navMenu-provas').hidden);assert(!$('navMenu-estudos').hidden);for(const fn of events['document:click']||[])fn({target:{closest:()=>null},preventDefault(){}});assert(!nav.isOpen());
 vm.runInContext("setView('fuvest')",ctx);assert($('navTrigger-provas').classList.contains('is-active'));trigger('provas');trigger('provas');assert(!nav.isOpen());
 for(const fn of events['document:click']||[])fn({target:{closest:selector=>selector==='[data-nav-action]'?{dataset:{navAction:'day-one'}}:null},preventDefault(){}});assert.equal(vm.runInContext('view',ctx),'leve');assert($('dayOneRoot').innerHTML.includes('Aquece as ideias')||$('dayOneRoot').innerHTML.includes('AQUECIMENTO'));assert($('navTrigger-estudos').classList.contains('is-active'));
 nav.close();vm.runInContext("setView('banco')",ctx);assert.equal(errors.length,0);console.log('PASS: grouped navigation, one open dropdown, outside/Escape close, focus return/arrow keys, active group, question keyboard isolation and direct Day 1 route.');
};
