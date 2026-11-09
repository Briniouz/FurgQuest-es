'use strict';
(() => {
 const content = globalThis.FURG_MATH_LAB_DATA;
 const guide = globalThis.FURG_DIA2_GUIDE;
 if (!content || !guide) return;
 const own = (object,key) => typeof key === 'string' && Object.hasOwn(object,key);
 const norm = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const DAY = 86400000, intervals = [1,3,7,14], timeLimit = 180000;
 const skills = {
  dados:'Interpretar gráfico ou tabela', proporcao:'Comparar proporções', area:'Calcular área',
  estimar:'Estimar ou buscar extremo', unidades:'Converter ou identificar unidades',
  modelar:'Montar expressão ou equação', probabilidade:'Contar casos ou calcular chance', calcular:'Calcular e conferir',
 };
 const reasons = {
  leitura:'Interpretação', conceito:'Conceito', formula:'Fórmula ou modelo',
  calculo:'Cálculo', distracao:'Distração', unidade:'Unidade', tempo:'Tempo',
 };
 const levels = {1:'Fácil',2:'Média',3:'Difícil'};
 const confidences = {alta:'Alta',media:'Média',baixa:'Baixa'};
 const kinds = {
  guiado:'Resolução guiada', adaptativo:'Treino adaptativo', ferramenta:'Qual ferramenta usar?',
  relampago:'Revisão relâmpago', espacada:'Revisão espaçada', tempo:'Desafio de 3 minutos', questao:'Questão escolhida',
 };
 const formulas = new Map(guide.entries.filter(e=>e.subject==='matematica').map(e=>[e.id,e]));
 const bank = new Map((globalThis.FURG_ENEM_DATA?.questions || []).filter(q=>q.area==='matematica').map(q=>[q.id,q]));
 const anatomy = globalThis.FURG_ENEM_ANATOMY_DATA;
 const topics = new Map((anatomy?.topics || []).filter(e=>e.area==='matematica').map(e=>[e.id,e.title]));
 const indexed = new Map((anatomy?.questions || []).filter(e=>bank.has(e.id)).map(e=>[e.id,e]));
 const valid = id => {
  const q=bank.get(id);
  return !!(q && !q.canceled && !q.quality?.blocked && q.alternatives?.length===5 && /^[A-E]$/.test(q.answer));
 };
 const models = new Map(Object.entries(content.models).filter(([id,m])=>{
  const q=bank.get(id);
  return valid(id) && q.answer===m.key && globalThis.FurgEnemLayout?.fingerprint(q)===m.fingerprint;
 }));
 const guided = [...models.keys()];
 const signatures = [
  [/probabilidade|chance de|equiprov|sorteio/,'mat-probabilidade'],
  [/maneiras distintas|permutacao|combinacoes|senhas|anagram/,'mat-combinatoria'],
  [/media aritmetica|mediana|moda |desvio padrao|frequencia/,'mat-estatistica'],
  [/logaritm|exponencial/,'mat-exponenciais-logaritmos'],
  [/progressao|sequencia de|n.esimo termo/,'mat-sequencias-progressoes'],
  [/raio|volume|capacidade/, 'mat-geometria-espacial', /volume|capacidade|cilindro|cone|cubo|esfera/],
  [/area|perimetro|triangulo|circunferencia/,'mat-geometria-plana'],
  [/desconto|porcentagem|percentual|reajuste|juros|%/,'mat-porcentagem-financas'],
  [/equacao|expressao|incognita/,'mat-algebra-equacoes'],
  [/funcao|grafico/,'mat-funcoes-graficos'],
  [/proporcional|escala |razao|vazao/,'mat-razao-proporcao-escalas'],
 ];
 const catalog = new Map([...bank.values()].map(q=>{
  const m=models.get(q.id), a=indexed.get(q.id);
  const raw=norm((q.context||'')+' '+(q.stem||'')).replace(/\s+/g,' ');
  const command=norm(q.stem || raw.slice(-230));
  const topic=a?.topic || signatures.find(([text,,second])=>text.test(raw)&&(!second||second.test(raw)))?.[1] || 'mat-numeros-operacoes-medidas';
  const tags=new Set(m?[m.skill]:[]);
  if (a?.pattern==='dados' || /graficos?|infografico|tabela|quadro mostra/.test(raw)) tags.add('dados');
  if (topic==='mat-razao-proporcao-escalas'||/proporcional|por unidade/.test(command)) tags.add('proporcao');
  if (/area|metros quadrados/.test(command)) tags.add('area');
  if (/mais proxim|aproximad|estime|maior possivel|valor minimo|valor maximo/.test(command)) tags.add('estimar');
  if (/unidade de medida|conver|em centimetr|em mililitro/.test(command)) tags.add('unidades');
  if (/funcao|equacao|expressao/.test(command)||topic==='mat-algebra-equacoes') tags.add('modelar');
  if (['mat-probabilidade','mat-combinatoria'].includes(topic)) tags.add('probabilidade');
  if (!tags.size) tags.add('calcular');
  const signals=Number(tags.size>1)+Number(raw.length>640)+Number(/pelo menos|no maximo|exatamente|probabilidade|logaritm/.test(raw))+
    Number(/geometria-espacial|exponenciais|combinatoria/.test(topic));
  const item={id:q.id,topic,subject:topics.get(topic)||'Números e medidas',skill:m?.skill||[...tags][0],
   skills:[...tags],level:m?.level||(signals===0?1:signals>=3?3:2),pattern:m?.pattern||topics.get(topic)||'Cálculo direto',
   guided:!!m, title:m?.title||'', search:norm(q.id+' '+(m?.title||'')+' '+(topics.get(topic)||'')+' '+raw)};
  return [q.id,item];
 }));
 const clips = (value,n) => typeof value==='string' ? value.trim().slice(0,n) : '';
 const stamp = n => Number.isFinite(n) && n>=0 && n<8e15;
 const int = (v,min,max,fallback=min) => Number.isInteger(v)&&v>=min&&v<=max?v:fallback;
 const choice = s => typeof s==='string'&&/^[A-E]$/.test(s);
 const emptyDraft = () => ({choice:'',confidence:'',guess:false,help:false});
 const draft = s => ({choice:choice(s?.choice)?s.choice:'',confidence:own(confidences,s?.confidence)?s.confidence:'',guess:s?.guess===true,help:s?.help===true});
 const token = s => typeof s==='string'&&/^[a-z0-9-]{3,70}$/.test(s);
 const fresh = () => ({attempts:[],notebook:{},marks:{},session:null,mental:{scores:{},best:0,run:null}});
 const modeKeys = {leve:{label:'Tranquilo',boost:0,seconds:30},veloz:{label:'Velocidade',boost:2,seconds:18},brutal:{label:'Brutal',boost:4,seconds:11}};
 const paces = {auto:'Padrão do ritmo',off:'Sem cronômetro','10s':'10 segundos','15s':'15 segundos','20s':'20 segundos','30s':'30 segundos','45s':'45 segundos'};
 const operations = {
  soma:{icon:'+',label:'Soma',about:'Da ponte do 10 a parcelas maiores'},
  subtracao:{icon:'−',label:'Subtração',about:'Complementos, trocas e diferenças'},
  multiplicacao:{icon:'×',label:'Multiplicação',about:'Da tabuada à decomposição'},
  divisao:{icon:'÷',label:'Divisão',about:'Quocientes exatos em etapas'},
  fracoes:{icon:'½',label:'Frações',about:'Denominadores iguais e diferentes'},
  porcentagem:{icon:'%',label:'Porcentagens',about:'Parte, desconto e aumento'},
  potencias:{icon:'x²',label:'Potências',about:'Bases e expoentes crescentes'},
  raizes:{icon:'√',label:'Raízes',about:'Quadrados e cubos exatos'},
  conversoes:{icon:'⇄',label:'Conversões',about:'Comprimento, volume, tempo e área'},
 };
 const scoreKey = (mode,op) => mode+'/'+op;
 const markValid = (type,id) => type==='f'?formulas.has(id):type==='s'?models.has(id):type==='q'&&bank.has(id);
 const marksFor = (state,type,id) => state.marks[type+':'+id]?.value===true;
 const uid = () => Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);

 function validate(value) {
  const out=fresh(), seen=new Set();
  for(const a of Array.isArray(value?.attempts)?value.attempts.slice(-1000):[]){
   if(!a||!valid(a.qid)||!token(a.id)||!stamp(a.at)||seen.has(a.id)||(!choice(a.choice)&&a.choice!==''))continue;
   seen.add(a.id);
   out.attempts.push({id:a.id,qid:a.qid,at:a.at,choice:a.choice,correct:a.choice===bank.get(a.qid).answer,
    confidence:own(confidences,a.confidence)?a.confidence:'',guess:a.guess===true,aid:a.aid===true});
  }
  out.attempts.sort((a,b)=>a.at-b.at);
  for(const [qid,n] of Object.entries(value?.notebook||{})){
   if(!valid(qid)||!n||!stamp(n.at)||!['erro','chute'].includes(n.kind))continue;
   const step=int(n.step,0,4);
   if(step!==4&&!stamp(n.due))continue;
   out.notebook[qid]={kind:n.kind,reason:own(reasons,n.reason)?n.reason:'',note:clips(n.note,900),at:n.at,step,due:step===4?null:n.due};
  }
  for(const [key,mark] of Object.entries(value?.marks||{})){
   const type=key.slice(0,1),id=key.slice(2);
   if(key[1]===':'&&markValid(type,id)&&typeof mark?.value==='boolean'&&stamp(mark.at))out.marks[key]={value:mark.value,at:mark.at};
  }
  const s=value?.session;
  if(s && token(s.id) && stamp(s.at) && own(kinds,s.kind) && Array.isArray(s.ids) &&
    s.ids.length>0 && s.ids.length<=5 && new Set(s.ids).size===s.ids.length && s.ids.every(valid)){
   const pos=int(s.pos,0,s.ids.length), tool=typeof s.tool==='string'&&formulas.has(s.tool)?s.tool:'';
   const graded=out.attempts.find(a=>a.id===s.grade && a.qid===s.ids[pos]);
   out.session={id:s.id,kind:s.kind,ids:s.ids.slice(),pos,at:s.at,hint:int(s.hint,0,3),aid:s.aid===true,tool,
    pattern:s.pattern===true,deadline:s.kind==='tempo'?(stamp(s.deadline)&&s.deadline>0?s.deadline:s.at+timeLimit):0,grade:graded?.id||'',draft:draft(s.draft)};
  }
  for(const mode of Object.keys(modeKeys))for(const op of Object.keys(operations)){
   const key=scoreKey(mode,op), s=value?.mental?.scores?.[key];
   if(s&&stamp(s.at))out.mental.scores[key]={level:int(s.level,1,100),xp:int(s.xp,0,100000000,0),at:s.at,finished:s.finished===true};
  }
  out.mental.best=int(value?.mental?.best,0,200,0);
  const r=value?.mental?.run;
  if(r && token(r.id) && stamp(r.at) && own(modeKeys,r.mode) && (own(operations,r.op)||r.op==='sobrevivencia') &&
    Number.isInteger(r.seed) && stamp(r.deadline)){
   const limit=r.op==='sobrevivencia'?200:10;
   const at=int(r.index,0,limit);
   const legacy=r.bank!==1, pace=own(paces,r.pace)?r.pace:legacy&&r.mode==='leve'?'off':'auto';
   const level=int(r.level,1,100);
   const starts=stamp(r.starts)?r.starts:r.at, paused=stamp(r.paused)?r.paused:0;
   out.mental.run={id:r.id,at:r.at,mode:r.mode,op:r.op,level,seed:r.seed|0,index:at,bank:legacy?0:1,pace,
    starts,paused,hits:int(r.hits,0,at,0),xp:int(r.xp,0,6000,0),deadline:r.deadline,done:r.done===true||at>=limit,
    entry:clips(r.entry,24),last:clips(r.last,150),result:['ok','miss','time'].includes(r.result)?r.result:'',passed:r.passed===true};
  }
  return out;
 }

 function merge(left,right) {
  const a=validate(left),b=validate(right);
  const attempts=new Map([...b.attempts,...a.attempts].map(e=>[e.id,e]));
  const newest=(x,y)=>{
   const out={...x};
   for(const [id,v] of Object.entries(y))if(!out[id]||v.at>out[id].at)out[id]=v;
   return out;
  };
  const scores={...a.mental.scores};
  for(const [id,v] of Object.entries(b.mental.scores)){
   const old=scores[id];
   scores[id]=old?{level:Math.max(old.level,v.level),xp:Math.max(old.xp,v.xp),finished:old.finished||v.finished,at:Math.max(old.at,v.at)}:v;
  }
  return validate({attempts:[...attempts.values()].sort((x,y)=>x.at-y.at),notebook:newest(a.notebook,b.notebook),
   marks:newest(a.marks,b.marks),session:a.session||b.session,
   mental:{scores,best:Math.max(a.mental.best,b.mental.best),run:a.mental.run||b.mental.run}});
 }

 function history(root) {
  const ownAttempts=root.mathLab.attempts;
  const other=(root.dia2?.attempts||[]).filter(a=>valid(a.questionId)&&choice(a.choice)).map(a=>({
   qid:a.questionId,choice:a.choice,correct:a.choice===bank.get(a.questionId).answer,
   confidence:own(confidences,a.confidence)?a.confidence:'',aid:false,guess:false,at:Date.parse(a.date)||0,source:'2º dia',
  }));
  const ids=new Set([...ownAttempts,...other].map(a=>a.qid));
  const old=[];
  for(const [id,a] of Object.entries(root.enem?.answers||{})){
   if(ids.has(id)||!valid(id)||!choice(a?.choice))continue;
   const first=choice(a.firstChoice)?a.firstChoice:a.choice;
   old.push({qid:id,choice:first,correct:first===bank.get(id).answer,confidence:'',aid:a.viewed===true,guess:false,at:Date.parse(a.date)||0,source:'Banco'});
  }
  return [...old,...other,...ownAttempts].sort((a,b)=>a.at-b.at);
 }

 function due(state,now=Date.now()) {
  return Object.entries(state.notebook).filter(([,n])=>n.due!==null&&n.due<=now)
   .sort((a,b)=>a[1].due-b[1].due).map(([id])=>id);
 }

 function schedule(old,a,now=Date.now()) {
  if (!a.correct || a.guess) {
   return {kind:a.correct?'chute':'erro',reason:old?.reason||(a.choice?'':'tempo'),note:old?.note||'',at:now,step:0,due:now+DAY};
  }
  if (!old || old.due===null) return old;
  if (a.aid) return {...old,at:now,step:0,due:now+DAY};
  if (now<old.due) return old;
  const step=old.step+1;
  return {...old,at:now,step,due:intervals[step]?now+intervals[step]*DAY:null};
 }

 function adaptiveLevel(attempts) {
  const recent=attempts.slice(-5), clean=recent.filter(a=>a.correct&&!a.aid&&!a.guess).length;
  if (recent.length>=3 && clean<=1) return 1;
  if (recent.length>=4 && clean>=4) return 3;
  return 2;
 }

 function similar(id,attempts,exclude=[],level=adaptiveLevel(attempts)) {
  const m=catalog.get(id);
  if(!m)return '';
  const used=new Set(attempts.map(a=>a.qid)), omit=new Set([id,...exclude]);
  const matches=guided.filter(qid=>!omit.has(qid)).map(qid=>catalog.get(qid)).filter(x=>
   x.pattern===m.pattern||x.topic===m.topic||x.skills.includes(m.skill));
  return matches.sort((x,y)=>{
   const rank=n=>Number(n.pattern===m.pattern)*30+Number(n.topic===m.topic)*7-Number(used.has(n.id))*9-
    Math.abs(n.level-level)*5;
   return rank(y)-rank(x);
  })[0]?.id||'';
 }

 function choose(root,kind,id,now=Date.now()) {
  if(kind==='questao')return valid(id)?[id]:[];
  if(kind==='espacada')return due(root.mathLab,now).slice(0,5);
  const attempts=history(root), recent=attempts.slice(-20), seen=new Set(attempts.map(a=>a.qid));
  const last=attempts.at(-1), level=adaptiveLevel(attempts);
  if(kind==='relampago'){
   const priority=recent.slice().reverse().filter(a=>!a.correct||a.guess).map(a=>a.qid);
   const lastSeen=new Map(attempts.map(a=>[a.qid,a.at]));
   const topicSeen=new Map(attempts.map(a=>[catalog.get(a.qid).topic,a.at]));
   const fading=guided.slice().sort((x,y)=>{
    const gap=qid=>lastSeen.get(qid)??topicSeen.get(catalog.get(qid).topic)??Number.MAX_SAFE_INTEGER;
    return gap(x)-gap(y);
   });
   const pending=Object.entries(root.mathLab.notebook).filter(([,e])=>e.due!==null).sort((a,b)=>a[1].due-b[1].due).map(([qid])=>qid);
   return [...new Set([...due(root.mathLab,now),...pending,...priority,...fading])].filter(valid).slice(0,3);
  }
  const recentTopics=new Set(recent.slice(-3).map(a=>catalog.get(a.qid).topic));
  const rank = qid => Math.abs(catalog.get(qid).level-level)*5 + (seen.has(qid)?12:0) + (recentTopics.has(catalog.get(qid).topic)?1:0);
  const next=(kind==='adaptativo' && last && !last.correct)?similar(last.qid,attempts,[],level):'';
  const pool=guided.slice().sort((x,y)=>rank(x)-rank(y));
  return [...new Set([...(next?[next]:[]),...pool])].slice(0,kind==='tempo'?1:5);
 }

 function stats(root) {
  const rows=history(root), grouped=(keys,keyOf)=>{
   const map=Object.fromEntries(keys.map(key=>[key,{total:0,correct:0,clean:0}]));
   for(const a of rows){
    const item=map[keyOf(a)];
    if(!item)continue;
    item.total++;
    if(a.correct)item.correct++;
    if(a.correct&&!a.aid&&!a.guess)item.clean++;
   }
   return map;
  };
  const errorKinds={...Object.fromEntries(Object.keys(reasons).map(key=>[key,0])),pendente:0};
  for(const n of Object.values(root.mathLab.notebook))errorKinds[n.reason||'pendente']++;
  const byTopic=grouped([...topics.keys()],a=>catalog.get(a.qid).topic);
  const weak=Object.entries(byTopic).filter(([,s])=>s.total>=2&&s.correct<s.total).sort((a,b)=>
   a[1].correct/a[1].total-b[1].correct/b[1].total||b[1].total-a[1].total)[0]?.[0];
  const nextDue=due(root.mathLab)[0], next=choose(root,'relampago')[0];
  return {rows,byTopic,byLevel:grouped(Object.keys(levels),a=>catalog.get(a.qid).level),
   byConfidence:grouped([...Object.keys(confidences),''],a=>a.confidence),errorKinds,
   priority:catalog.get(nextDue)?.subject||topics.get(weak)||catalog.get(next)?.subject,
   level:adaptiveLevel(rows)};
 }

 function random(seed) {
  let x=seed>>>0;
  return (min,max)=>{
   x=(Math.imul(x,1664525)+1013904223)>>>0;
   return min+x%(max-min+1);
  };
 }

 function mentalSeconds(mode,level,op,pace='auto') {
  if(op==='sobrevivencia')return 20;
  if(pace==='off')return 0;
  if(pace!=='auto'&&own(paces,pace))return parseInt(pace,10);
  return Math.max(6,modeKeys[mode].seconds-Math.floor((level-1)/14));
 }

 function mentalItem(run,index,r,expanded) {
  const survival=run.op==='sobrevivencia';
  const op=survival?['soma','subtracao','multiplicacao','divisao'][r(0,3)]:run.op;
  const level=survival?Math.min(100,index+1):run.level;
  const tier=Math.ceil(level/10)+modeKeys[run.mode].boost, max=8+Math.floor(level*level/7)+tier;
  const item=(prompt,n,d=1)=>({prompt,n,d,op});
  if(op==='soma'||op==='subtracao'){
   const a=r(2,max),b=r(1,max);
   return op==='soma'?item(a+' + '+b,a+b):item(Math.max(a,b)+' − '+Math.min(a,b),Math.abs(a-b));
  }
  if(op==='multiplicacao'||op==='divisao'){
   const a=r(2,Math.min(48,5+tier*3)),b=r(2,Math.min(28,4+tier*2));
   return op==='multiplicacao'?item(a+' × '+b,a*b):item((a*b)+' ÷ '+a,b);
  }
  if(op==='fracoes'){
   const b=r(2,(expanded?5:3)+tier),d=tier<4?b:r(2,4+tier),a=r(1,b-1),c=r(1,d-1);
   return item(a+'/'+b+' + '+c+'/'+d,a*d+c*b,b*d);
  }
  if(op==='porcentagem'){
   const rates=tier<=3?[10,20,25,50]:[5,12,15,20,25,35,40,60,75];
   const p=rates[r(0,rates.length-1)],base=tier<=3?20*r(1,8):r(20,40+8*tier);
   if(tier>=7 && index%3!==0){
    const increase=index%3===1;
    return item(base+(increase?' com aumento de ':' com desconto de ')+p+'%',base*(100+(increase?p:-p)),100);
   }
   return item(p+'% de '+base,p*base,100);
  }
  if(op==='potencias'){
   const maxBase=expanded?Math.min(24,13+tier):Math.min(14,3+tier);
   const base=r(2,maxBase),power=r(2,tier<5?2:tier<10?3:4);
   return item(base+['','','²','³','⁴'][power],base**power);
  }
  if(op==='raizes'){
   const a=r(expanded?1:2,(expanded?13:6)+tier),cube=tier>=6&&r(0,2)===0;
   return cube?item('∛'+a**3,a):item('√'+a**2,a);
  }
  const n=r(2,9+tier), units=tier<=4?
   [['m','cm',100,1],['L','mL',1000,1],['min','s',60,1]]:
   [['kg','g',1000,1],['cm','m',1,100],['m²','cm²',10000,1],['m³','L',1000,1],['h','min',60,1],['mL','L',1,1000]];
  const [from,to,num,den]=units[r(0,units.length-1)];
  return item(n+' '+from+' em '+to,n*num,den);
 }

 function bankDraw(seed) {
  return (min,max)=>{
   seed=(seed+0x6d2b79f5)|0;
   let x=Math.imul(seed^(seed>>>15),seed|1);
   x^=x+Math.imul(x^(x>>>7),x|61);
   return min+Math.floor(((x^(x>>>14))>>>0)/0x100000000*(max-min+1));
  };
 }

 // Each round draws a reproducible sample from its level's bank.
 // Legacy rounds keep their original sequence when resumed from a backup.
 let cachedRound;
 function mentalQuestion(run) {
  if(run.bank!==1)return mentalItem(run,run.index,random(run.seed^Math.imul(run.index+1,0x9e3779b9)),false);
  const key=[run.seed,run.mode,run.op,run.level].join('/');
  if(cachedRound?.key!==key)cachedRound={key,draw:bankDraw(run.seed),items:[],seen:new Set()};
  const {draw,items,seen}=cachedRound;
  while(items.length<=run.index){
   let item;
   for(let i=0;i<48;i++){
    item=mentalItem(run,items.length,draw,true);
    if(!seen.has(item.prompt))break;
   }
   // Enumerate the available operand combinations if the random draws collide.
   for(let variant=0;seen.has(item.prompt);variant++){
    let cursor=variant;
    item=mentalItem(run,items.length,(min,max)=>{
     const count=max-min+1, value=min+cursor%count;
     cursor=Math.floor(cursor/count);
     return value;
    },true);
   }
   seen.add(item.prompt);
   items.push(item);
  }
  return items[run.index];
 }

 function numeric(input) {
  const raw=clips(input,40).replace(/−/g,'-').replace(/\s+/g,'').replace(',','.');
  const fraction=raw.match(/^(-?\d{1,9})\/([1-9]\d{0,8})$/);
  if(fraction)return [Number(fraction[1]),Number(fraction[2])];
  if(!/^-?\d{1,9}(?:\.\d{1,6})?$/.test(raw))return null;
  const den=10**(raw.split('.')[1]?.length||0);
  const n=Math.round(Number(raw)*den);
  return Number.isSafeInteger(n)?[n,den]:null;
 }

 function equalNumber(response,q) {
  return !!response && BigInt(response[0])*BigInt(q.d)===BigInt(q.n)*BigInt(response[1]);
 }

 function formatNumber(q) {
  const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
  const d=gcd(q.n,q.d);
  if(q.d===d)return String(q.n/d);
  return q.n/d+'/'+q.d/d;
 }

 globalThis.FurgMathLabModel={content,bank,catalog,topics,formulas,models,guided,valid,skills,reasons,levels,confidences,kinds,
  modeKeys,paces,operations,scoreKey,mentalSeconds,mentalQuestion,numeric,equalNumber,formatNumber,
  fresh,validate,merge,history,due,schedule,adaptiveLevel,similar,choose,stats,markValid,marksFor,uid,own,norm,draft,emptyDraft,DAY,intervals,timeLimit};
})();

