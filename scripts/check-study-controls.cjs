'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class El{
 constructor(tag='div',doc=null){this.tagName=tag.toUpperCase();this.ownerDocument=doc;this.children=[];this.dataset={};this.attrs={};this.events={};this.disabled=false;this.hidden=false;this.textContent='';const list=new Set();this.classList={add:x=>list.add(x),remove:x=>list.delete(x),contains:x=>list.has(x),toggle:(x,on)=>{if(on??!list.has(x))list.add(x);else list.delete(x);}};}
 set className(s){for(const x of s.split(' ').filter(Boolean))this.classList.add(x);}
 append(...els){for(const el of els){if(el.parentElement)el.parentElement.children=el.parentElement.children.filter(x=>x!==el);this.children.push(el);el.parentElement=this;}}
 replaceWith(el){const p=this.parentElement;if(!p)throw Error('No parent');p.children[p.children.indexOf(this)]=el;el.parentElement=p;this.parentElement=null;}
 setAttribute(k,v){this.attrs[k]=String(v);}getAttribute(k){return this.attrs[k]??null;}
 addEventListener(name,fn){(this.events[name]||=[]).push(fn);}querySelectorAll(sel){const found=[];for(const e of this.children){if(sel==='button'&&e.tagName==='BUTTON'||sel[0]==='.'&&e.classList.contains(sel.slice(1)))found.push(e);found.push(...e.querySelectorAll(sel));}return found;}querySelector(sel){return this.querySelectorAll(sel)[0]||null;}
 fire(name,key){const e={key,preventDefault(){},stopPropagation(){}};for(const fn of this.events[name]||[])fn(e);}
 focus(){}scrollIntoView(){}
}
const document={createElement:tag=>new El(tag,document)},root=new El('div',document);
const c=vm.createContext({document,console});vm.runInContext(fs.readFileSync('choice-elimination.js','utf8'),c);
const helper=c.FurgElimination,copy=['Texto A original','Texto B original','Texto C original'];
const buttons=copy.map((text,i)=>{const b=new El('button',document);b.dataset.letter='ABC'[i];b.classList.add('answer-option');b.textContent=text;b.setAttribute('aria-pressed',String(i===1));root.append(b);return b;});
let cleared=0;
helper.decorate(root,{scope:'enem',id:'q1',selector:'.answer-option',selected:'B',onClear:()=>{cleared++;buttons[1].setAttribute('aria-pressed','false');}});
const rows=root.querySelectorAll('.choice-elimination-row'),cross=root.querySelectorAll('.choice-eliminate');assert.equal(cross.length,3);
cross[0].fire('click');assert(helper.marked('enem','q1','A'));assert(rows[0].classList.contains('choice-is-eliminated'));assert.equal(cleared,0);assert.equal(cross[0].getAttribute('aria-label'),'Restaurar alternativa A');
cross[0].fire('click');assert(!helper.marked('enem','q1','A'));assert.equal(cross[0].getAttribute('aria-label'),'Riscar alternativa A');
cross[1].fire('click');assert.equal(cleared,1);assert.equal(buttons[1].getAttribute('aria-pressed'),'false');assert(helper.marked('enem','q1','B'));
buttons[1].fire('click');assert(!helper.marked('enem','q1','B'));assert(!rows[1].classList.contains('choice-is-eliminated'));
helper.toggle('fuvest','q1','A');assert(!helper.marked('enem','q1','A'));assert(helper.marked('fuvest','q1','A'));
helper.decorate(root,{scope:'enem',id:'q1',selector:'.answer-option',locked:true});assert(cross.every(b=>b.hidden));assert.deepEqual(buttons.map(b=>b.textContent),copy);
let selected='banco';const els=new Map(),get=id=>{if(!els.has(id))els.set(id,new El());return els.get(id);};
const navDoc={getElementById:get,querySelectorAll:()=>[],addEventListener(){}};
const navCtx=vm.createContext({document:navDoc,console});vm.runInContext(fs.readFileSync('navigation.js','utf8'),navCtx);const nav=navCtx.FurgNavigation;nav.init({setView:name=>{selected=name;nav.beforeNavigate(name);}});
nav.beforeNavigate('banco');assert(!nav.canGoBack());nav.beforeNavigate('linguagens');nav.beforeNavigate('enem');nav.beforeNavigate('enem');assert(nav.canGoBack());assert(nav.back());assert.equal(selected,'linguagens');assert(nav.back());assert.equal(selected,'banco');assert(!nav.canGoBack());assert(!nav.back());assert(get('pageBack').disabled);
console.log('PASS: reversible elimination, selected-answer clearing, separate exam scopes, official text preserved, locked review and previous-section navigation without duplicate history entries.');
