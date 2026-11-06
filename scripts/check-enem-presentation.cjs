'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
assert.equal(digest('enem-data.json'),'43a65968bad86e129bc7e2b748c0d0f9898d730a303a6735277b4b5a9dd397b0','The official corpus changed');
const bank=JSON.parse(fs.readFileSync('enem-data.json')).questions,questions=new Map(bank.map(q=>[q.id,q])),snapshot=JSON.stringify(bank);
const c=vm.createContext({});for(const f of ['enem-presentation-data.js','enem-layout.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
const layout=c.FurgEnemLayout,repairs=c.FURG_ENEM_PRESENTATION.questions;
const escape=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const body=q=>layout.body(q,escape,(src,alt)=>'<img src="'+escape(src)+'" alt="'+escape(alt)+'">');
let figures=0,spills=0;
for(const [id,repair]of Object.entries(repairs)){
 const q=questions.get(id);assert(q,id);assert.equal(repair.fingerprint,layout.fingerprint(q),id+' stale repair');
 const parts=layout.structure(q),html=body(q);
 for(const figure of repair.figures||[]){
  figures++;assert(fs.existsSync(figure.file),figure.file);assert.equal(digest(figure.file),figure.source.imageSha256);
  assert.equal(digest(figure.source.pdf),figure.source.pdfSha256);assert(Number.isInteger(figure.source.page)&&figure.source.page>0);
  assert(figure.source.bbox.length===4&&figure.source.bbox.every(Number.isFinite));assert(figure.alt.length>20);
  assert.equal(parts.filter(p=>p.type==='figure'&&p.file===figure.file).length,1,id);assert(html.includes(figure.file),id);
  assert(!body({...q,context:q.context+' '}).includes(figure.file),id+' applied a repair to changed content');
 }
 if(repair.contextSpill){spills++;assert.equal(q.context,repair.contextSpill);assert(!html.includes(escape(repair.contextSpill)),id);assert(html.includes(escape(q.stem)),id);assert(body({...q,context:q.context+' '}).includes(escape(repair.contextSpill)),id+' removed unverified text');}
}
assert.equal(figures,21);assert.equal(spills,2);
for(const q of bank){const parts=layout.structure(q);assert.equal(parts.filter(p=>p.field!=='stem').map(p=>p.text).join(''),q.context||'',q.id);assert.equal(parts.filter(p=>p.field==='stem').map(p=>p.text).join(''),q.stem||'',q.id);}
assert.equal(JSON.stringify(bank),snapshot,'Rendering mutated official questions, figures, alternatives or keys');
for(const[id,prefix,author]of [
 ['enem-2011-37','No Estado de São Paulo','BALSADI'],
 ['enem-2014-133','No Brasil, a origem','DAYRELL'],
 ['enem-2018-76','Código Penal','Disponível em'],
 ['enem-2020-41','Policarpo Quaresma','BARRETO'],
 ['enem-2023-9','Na Idade Média','Disponível em'],
 ['enem-2024-49','Com a proximidade','COSTA'],
 ['enem-2024-2-ingles','Holy War','KEYS'],
 ['enem-2025-70','Nos Estados Unidos','Disponível em']
]){const parts=layout.structure(questions.get(id));assert(parts.some(p=>p.type==='support'&&p.text.includes(prefix)),id+' prose swallowed by bibliography');assert(parts.some(p=>p.type==='source'&&p.text.includes(author)),id+' actual bibliography lost');}
const mixed=layout.structure(questions.get('enem-2024-49'));assert(mixed.find(p=>p.type==='source').text.includes('1890-1914, no tempo das certezas. São Paulo: Cia. das Letras, 2000'),'A date in a title cut the bibliography');
for(const id of ['enem-1998-3','enem-2007-23','enem-2014-118','enem-2018-79','enem-2021-53','enem-2024-82'])assert(layout.structure(questions.get(id)).some(p=>p.type==='source'),id+' existing citation lost');
const naomi=questions.get('enem-2024-9'),parts=layout.structure(naomi);assert.equal(parts.find(p=>p.type==='source').text.trim(),'Disponível em: www.uol.com.br. Acesso em: 31 out. 2021 (adaptado).');assert(parts.find(p=>p.type==='prompt').text.startsWith('As causas do desequilíbrio'));
const visconti=layout.structure(questions.get('enem-2024-25'));assert(visconti.find(p=>p.type==='prompt').text.startsWith('Eliseu D’Angelo Visconti'),'Named-person command swallowed by bibliography');assert(!visconti.find(p=>p.type==='source').text.includes('desenvolveu diversas obras'),'Command remained inside bibliography');
const venice=layout.structure(questions.get('enem-2025-49'));assert(venice.some(p=>p.type==='support'&&p.text.includes('XVIII, Veneza ainda era uma cidade cosmopolita')),'A Roman-numbered century was mistaken for an author');assert(venice.some(p=>p.type==='source'&&p.text.startsWith('BRAUDEL')),'Actual Braudel bibliography lost');
console.log('PASS: 21 PDF-verified statement images in 20 recent questions; two verified transcription spills hidden; source fingerprints, crop provenance and asset hashes checked.');
console.log('PASS: all 3,833 raw questions, alternatives, images and keys unchanged; long prose, song/poem/legislation and publication dates remain in the correct reading blocks.');
