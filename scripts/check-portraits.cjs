'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const images=[],requests=[];
class Element {
 constructor(){this.children=[];this.dataset={};this.isConnected=true;const set=new Set();this.classList={add:n=>set.add(n),contains:n=>set.has(n)};this.ownerDocument=document;}
 appendChild(el){this.children.push(el);el.isConnected=this.isConnected;el.parentElement=this;return el;}
 querySelector(){return this.credit||null;}
}
const document={getElementById:()=>null,createElement:()=>new Element()};
class TestImage {
 constructor(){images.push(this);this.isConnected=false;}
 set src(value){this.source=value;if(this.loading==='lazy'&&!this.isConnected)return;Promise.resolve().then(()=>this.onload?.());}
}
const c=vm.createContext({document,Image:TestImage,URLSearchParams,fetch:async url=>{requests.push(url);const name=new URL(url).searchParams.get('titles');return {ok:true,json:async()=>({query:{pages:{1:{pageimage:'Portrait.jpg',thumbnail:{source:name==='Unsafe'?'https://example.invalid/tracker.jpg':'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Portrait.jpg/220px-Portrait.jpg'}}}}})};}});
for(const file of ['portraits-data.js','thinkers.js'])vm.runInContext(fs.readFileSync(file,'utf8'),c,{filename:file});
function node(wiki){const face=new Element(),parent=new Element();face.dataset={wiki,name:wiki};face.parentElement=parent;parent.credit=new Element();parent.credit.parentElement=parent;return face;}
function show(nodes){c.FurgThinkers.hydratePortraits({querySelectorAll:()=>nodes,closest:()=>null});}
const settle=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
 const local=node('Sêneca');show([local]);await settle();assert(local.classList.contains('has-photo'),'Detached lazy images never load: visibility must be deferred by the observer, not by an unattached image');assert.equal(requests.length,0);assert.equal(local.children[0].source,'portraits/seneca.jpg');assert.equal(local.parentElement.credit.textContent,'Calidius');assert.equal(local.parentElement.children[0].textContent,'CC BY-SA 3.0');
 for(const entry of Object.values(c.FURG_PORTRAITS_DATA)){assert(entry.author&&entry.license&&entry.licenseURL&&entry.credit);assert(fs.existsSync(entry.src));const bytes=fs.readFileSync(entry.src);assert.equal(bytes[0],255);assert.equal(bytes[1],216);assert(bytes.length<20000);}
 const a=node('Remote'),b=node('Remote');show([a,b]);await settle();assert.equal(requests.length,1,'Visible profiles must share the same Wikipedia metadata request');assert(a.classList.contains('has-photo')&&b.classList.contains('has-photo'));assert(a.children[0].source.startsWith('https://thumb.wikimedia.org/'));
 const unsafe=node('Unsafe'),count=images.length;show([unsafe]);await settle();assert.equal(images.length,count,'Untrusted image host was loaded');assert(!unsafe.classList.contains('has-photo'));
 const detached=node('Detached');show([detached]);detached.isConnected=false;await settle();assert.equal(detached.children.length,0,'Removed cards received stale image updates');
 console.log('PASS: three licensed local portraits, supported Wikimedia thumbnail hosts, deferred visibility without detached-lazy deadlock, shared request cache, safe hosts and disconnected-card protection.');
})().catch(error=>{console.error(error);process.exitCode=1;});
