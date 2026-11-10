'use strict';
(() => {
 const data=globalThis.FurgStudyData, labs=globalThis.FurgStudyLabs;
 const catalog=globalThis.FURG_DIA2_LESSONS, guide=globalThis.FURG_DIA2_GUIDE;
 const lessons=new Map(Object.entries(catalog).flatMap(([subject,items])=>items.map((lesson,index)=>[lesson.id,{...lesson,subject,index,previous:items[index-1]}])));
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const day=86400000;
 const date=new Intl.DateTimeFormat('pt-BR',{dateStyle:'short'});
 const stamp=value=>Number.isSafeInteger(value)&&value>0&&value<=8640000000000000;
 const route=(subject,id)=>'dia-2/aulas/'+subject+'/'+id;
 const link=(path,label)=>'<a class="outline" href="#'+esc(path)+'" data-study-route="'+esc(path)+'">'+esc(label)+'</a>';
 const drills={
  fracoes:['Um piso é descrito em m² e cada placa em cm². O que precisa ser identificado primeiro?',['Conversão de área','Conversão de comprimento','Conversão de volume'],0,'A unidade ao quadrado exige aplicar o fator nas duas direções.'],
  proporcao:['A mesma região foi impressa em dois tamanhos. A barra do mapa cresceu junto com a imagem. Qual ferramenta mantém a referência?',['Valor das coordenadas em graus','Escala gráfica','Denominador numérico da impressão original'],1,'A barra cresce junto com as distâncias desenhadas e conserva a relação entre as duas medidas.'],
  equacoes:['Um estacionamento cobra entrada e a mesma tarifa a cada hora extra. Qual modelo corresponde ao custo?',['Exponencial','Proporção inversa','Função afim com valor inicial'],2,'Há um valor inicial e acréscimos iguais para tempos iguais.'],
  probabilidade:['Um sorteio retira a primeira ficha e deixa a caixa com uma ficha a menos. Qual modelo liga as duas retiradas?',['Retiradas sempre independentes','Probabilidade condicional','Média aritmética'],1,'Na segunda retirada, o total e os casos favoráveis dependem do que aconteceu na primeira.'],
  energia:['Um carrinho de brinquedo é lançado quando uma mola comprimida volta ao comprimento natural. Qual transformação domina no lançamento ideal?',['Elástica em cinética','Gravitacional em elástica','Cinética em gravitacional'],0,'A mola deixa de estar deformada e o carrinho ganha rapidez.'],
  movimento:['Um gráfico v × t passa de valores positivos para negativos. Qual procedimento permite obter a distância total?',['Multiplicar a inclinação pelo tempo','Subtrair as duas áreas','Somar os módulos das áreas em cada sentido'],2,'Distância soma os comprimentos dos trechos. Deslocamento conserva o sinal de cada trecho.'],
  calor:['A temperatura de uma amostra vai de 20 °C a 60 °C. Para calcular calor sensível, que valor corresponde ao intervalo em K?',['40 K','293,15 K','313,15 K'],0,'A diferença é 40 °C. Um intervalo Celsius tem o mesmo tamanho que um intervalo Kelvin.'],
  circuitos:['Dois resistores têm as extremidades ligadas aos mesmos dois nós. O que é necessariamente igual entre eles?',['A corrente','A tensão','A resistência'],1,'São ramos em paralelo. Os dois componentes compartilham a mesma diferença de potencial.'],
  reacoes:['Ao balancear uma equação, qual mudança conserva a identidade das substâncias?',['Mudar o número de elétrons de todo átomo','Trocar os índices dentro da fórmula','Ajustar os coeficientes antes das fórmulas'],2,'Os coeficientes mudam as quantidades de substância e os índices continuam indicando sua composição.'],
  solucoes:['Adiciona-se apenas água a uma solução de sal e todo o sal continua dissolvido. Qual grandeza conserva o valor?',['Volume final','Massa do sal','Concentração em g/L'],1,'A água altera o volume da solução. A massa do soluto é preservada nessa operação.'],
  eletroquimica:['Num eletrodo, íons Cu²⁺ recebem elétrons e viram cobre metálico. Que processo ocorre ali?',['Redução no cátodo','Oxidação no ânodo','Diluição do eletrólito'],0,'Receber elétrons é redução. O eletrodo da redução é o cátodo, tanto em pilhas quanto na eletrólise.'],
  organica:['Após a queima com pouco oxigênio, aparece fuligem. Qual ideia explica a observação?',['Diluição','Interação por ligação de hidrogênio','Combustão incompleta'],2,'Com oferta limitada de oxigênio, o carbono pode aparecer como fuligem e monóxido, entre outros produtos.'],
  celula:['Uma membrana permite passar água, mas retém o soluto. O lado A tem maior concentração efetiva de soluto. Qual fenômeno prevê fluxo de água para A, a pressões iguais?',['Osmose','Transporte ativo de soluto','Fagocitose'],0,'A água atravessa a membrana seletiva e tende a diluir o lado com maior concentração efetiva de solutos.'],
  evolucao:['Depois de aplicar um antibiótico, a população volta a crescer com mais linhagens resistentes. Qual observação ajuda a sustentar a seleção?',['Todas as bactérias aprenderam a resistir','Já havia variação herdável de resistência antes do tratamento','O tratamento alterou a necessidade de reprodução'],1,'A variação prévia pode ser selecionada se linhagens resistentes deixam mais descendentes nessas condições.'],
  ecossistemas:['Após a entrada de fertilizante num lago, crescem algas. Dias depois, baixa o oxigênio dissolvido. Qual etapa explica a queda?',['Fotossíntese das algas','Maior infiltração no solo','Respiração de decompositores'],2,'Ao decompor matéria orgânica, microrganismos aeróbios consomem oxigênio.'],
  imunidade:['Uma intervenção fornece anticorpos já produzidos para proteção imediata e temporária. Como classificar?',['Imunização passiva','Memória gerada por vacina','Resposta inata inespecífica'],0,'Os anticorpos vêm prontos. A memória adaptativa exige que o organismo monte sua própria resposta.'],
 };
 const prompts=new Map([['dimensoes',data.dimensions.check],...Object.entries(drills)]);
 for(const [id,{check}] of lessons){
  prompts.set('aula-'+id,[check.prompt,check.choices.map(x=>x[0]),check.correct,check.choices[check.correct][1]]);
 }
 function validate(items){
  const map=new Map();
  for(const v of Array.isArray(items)?items.slice(-600):[]){
   const p=prompts.get(v?.key);
   if(p&&typeof v.id==='string'&&/^[a-z0-9-]{8,80}$/.test(v.id)&&stamp(v.at)&&Number.isInteger(v.choice)&&p[1][v.choice]!==undefined){
    map.set(v.id,{id:v.id,key:v.key,at:v.at,choice:v.choice});
   }
  }
  return [...map.values()].sort((a,b)=>a.at-b.at||a.id.localeCompare(b.id)).slice(-300);
 }
 function schedule(attempts,correct,now=Date.now()){
  const history=attempts.filter(a=>stamp(a.at)&&a.at<=now).slice().sort((a,b)=>a.at-b.at);
  let stage=0,due=0,last;
  for(const a of history){
   if(!correct(a)){stage=0;due=a.at+day;last=a;continue;}
   if(!last||a.at>=due){
    stage=Math.min(stage+1,5);
    due=a.at+[1,3,7,14,30][stage-1]*day;
   }
   last=a;
  }
  return last?{due,stage,last,ready:due<=now}:null;
 }
 const work=a=>prompts.get(a.key)?.[2]===a.choice;
 const exams=globalThis.FURG_DIA2_CONCEPTS;
 const bank=new Map((globalThis.FURG_ENEM_DATA?.questions||[]).map(q=>[q.id,q]));
 const conceptRows=Object.values(exams||{}).flatMap(trails=>trails.flatMap(t=>t.rows.flat()));
 function questionLinks(id){
  const links=conceptRows.filter(x=>x.lesson===id).map(x=>x.exam).filter(exam=>{
   const q=bank.get(exam?.[0]);
   return q?.quality?.keyVerified&&q.answer===exam[1]&&globalThis.FurgEnem?.isGradable(q.id);
  });
  return [...new Map(links.map(x=>[x[0],x])).values()].slice(0,3).map(([key,,level])=>{
   const q=bank.get(key);
   return '<button type="button" class="outline" data-study-enem="'+esc(key)+'">ENEM '+esc(q.year)+' · Questão '+esc(q.index)+' · '+(level===3?'Difícil':'Média')+'</button>';
  }).join('');
 }
 function layers(id){
  const row=data.layers[id],lesson=lessons.get(id);
  if(!row||!lesson)return '';
  const [origin,alternate,trap,visual]=row;
  const related=data.paths[id], target=related&&lessons.get(related[1]), previous=lesson.previous;
  const way=visual.split(' → ');
  const faces=data.faces[id]||[
   ['Base','Identificar o comando',lesson.exam],
   ['Aplicação','Trocar de representação',alternate],
   ['Desafio','Examinar o modelo',trap],
  ];
  return '<section class="el-depth"><h3>Da ideia à aplicação</h3><div class="d2-actions">'+
   (previous?link(route(lesson.subject,previous.id),'Base anterior · '+previous.title):link('dia-2/oficina','Começar pela oficina →'))+
   (target?link(route(related[0],related[1]),'Conexão · '+target.title):'')+'</div>'+
   '<ol class="el-flow" aria-label="Caminho do raciocínio">'+way.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol>'+
   '<details open><summary>De onde vem a relação?</summary><p>'+esc(origin)+'</p></details>'+
   '<details><summary>Outro caminho</summary><p>'+esc(alternate)+'</p></details>'+
   '<details><summary>Onde o ENEM tenta te confundir?</summary><p>'+esc(trap)+'</p></details>'+
   (data.topics[id]||[]).map(([title,text])=>'<details><summary>'+esc(title)+'</summary><p>'+esc(text)+'</p></details>').join('')+
   '<details><summary>As diferentes faces deste conceito no ENEM</summary><dl>'+faces.map(([level,skill,example])=>'<dt>'+esc(level+' · '+skill)+'</dt><dd>'+esc(example)+'</dd>').join('')+'</dl></details></section>';
 }
 function practiceLinks(id){
  const official=questionLinks(id);
  return '<section class="el-depth"><h3>Aplica em outro problema</h3><p>Começa pela questão autoral acima. Depois, resolve uma questão da mesma ideia ou segue pelas apostas.</p><div class="d2-actions">'+
   official+link('dia-2/apostas','Apostas do Dia 2 →')+'</div><p class="d2-muted">A dificuldade das questões oficiais é uma estimativa de estudo.</p></section>';
 }
 const modes={laboratorios:'Laboratórios',reconhecimento:'Reconhecimento',deducao:'Dedução',revisao:'Revisão espaçada'};
 let mode='laboratorios', selectedLab='energia', selectedDrill=Object.keys(drills)[0], selectedLesson='energia';
 function selectLab(id){
  if(Object.hasOwn(labs.labs,id)){mode='laboratorios';selectedLab=id;}
 }
 let adapter;
 const groupTitle=id=>id==='dimensoes'?data.dimensions.title:lessons.get(id.replace(/^aula-/,''))?.title||id;
 const select=(id,label,items,value)=>'<label>'+label+'<select id="'+id+'">'+items.map(([key,text])=>'<option value="'+esc(key)+'"'+(key===value?' selected':'')+'>'+esc(text)+'</option>').join('')+'</select></label>';
 function question(key){
  const [title,options]=prompts.get(key);
  return '<article class="d2-panel el-question" data-study-prompt="'+key+'"><p class="eyebrow">QUESTÃO AUTORAL</p><h3>'+esc(title)+'</h3><div class="d2-actions">'+options.map((choice,i)=>'<button type="button" class="outline" data-study-choice="'+i+'">'+esc(choice)+'</button>').join('')+'</div><p data-study-feedback role="status"></p></article>';
 }
 function deduce(){
  const item=lessons.get(selectedLesson),dim=data.dimensions;
  return '<article class="d2-panel el-depth"><h3>'+esc(dim.title)+'</h3><p>'+esc(dim.lead)+'</p><ol>'+dim.steps.map(([title,text])=>'<li><strong>'+esc(title)+'</strong><p>'+esc(text)+'</p></li>').join('')+'</ol></article>'+question('dimensoes')+
   '<div class="d2-controls">'+select('elLessonSelect','Deduções por aula',[...lessons].map(([id,l])=>[id,guide.subjects[l.subject].label+' · '+l.title]),selectedLesson)+'</div>'+layers(selectedLesson)+link(route(item.subject,item.id),'Abrir aula completa →');
 }
 function revision(){
  const value=adapter.get(), attempts=value.learning||[], byKey=new Map();
  for(const a of attempts){
   if(!byKey.has(a.key))byKey.set(a.key,[]);
   byKey.get(a.key).push(a);
  }
  const local=[...byKey].map(([key,items])=>({key,...schedule(items,work)})).filter(row=>row.last).sort((a,b)=>a.due-b.due);
  const official=adapter.scheduled();
  const pending=official.filter(item=>item.ready);
  const summary=local.filter(item=>item.ready).length+pending.length;
  const units=adapter.unitErrors();
  const challenge=adapter.challengeReady();
  return '<article class="d2-panel el-depth"><h3>'+summary+' revisões para fazer agora</h3><p>Depois de um erro, a primeira revisão chega em um dia. A cada acerto no prazo, o intervalo avança para 1, 3, 7, 14 e 30 dias. Os estados mostram evidência de treino.</p>'+
   (pending.length||adapter.scheduledReady()?'<button type="button" class="primary" data-study-scheduled>Revisar até 5 questões do treino →</button>':'')+
   (challenge?'<button type="button" class="outline" data-study-challenge>Montar treino adaptativo →</button>':'')+
   (units>=2?'<p>Nas últimas tentativas, houve '+units+' erros associados a unidades. Vale comparar os passos de conversão.</p>'+link('dia-2/conversoes','Revisar conversões →'):'')+
   (!local.length&&!official.length?'<p>Responde uma verificação de aula, um exercício de reconhecimento ou uma questão do treino para começar.</p>':'')+'</article>'+
   (local.length?'<ul class="el-review">'+local.map(row=>{
    const id=row.key.replace(/^aula-/,''),lesson=lessons.get(id);
    const state=row.ready?'Revisar agora':!work(row.last)?'Precisa revisar':row.stage>=3?'Acertos em revisões espaçadas':'Compreensão em treino';
    const next=' · '+(row.ready?'Em atraso ou no prazo':date.format(row.due));
    const action=row.key.startsWith('aula-')&&lesson?link(route(lesson.subject,id),'Reabrir aula →'):'<button type="button" class="outline" data-study-review="'+row.key+'">Revisar conceito →</button>';
    return '<li><strong>'+esc(groupTitle(row.key))+'</strong><span>'+state+next+'</span>'+action+'</li>';
   }).join('')+'</ul>':'')+
   (official.length?'<details class="d2-panel"><summary>Próximas revisões do treino</summary><ul>'+official.slice(0,10).map(x=>'<li>'+esc(x.title)+' · '+(x.ready?'Hoje':date.format(x.due))+'</li>').join('')+'</ul></details>':'');
 }
 function body(){
  switch(mode){
   case 'laboratorios':return '<div class="d2-controls">'+select('elLabSelect','Experimento',[['temperatura','Escalas termométricas'],...Object.entries(labs.labs).map(([id,l])=>[id,l.title])],selectedLab)+'</div>'+
    (selectedLab==='temperatura'?globalThis.FurgDia2Temperature?.markup('oficina-')||'':labs.markup(selectedLab,'oficina'));
   case 'reconhecimento':return '<p>Escolhe o conceito pelo comando e pelos dados. Depois confere o motivo.</p><div class="d2-controls">'+select('elDrillSelect','Tema',Object.keys(drills).map(id=>[id,groupTitle(id)]),selectedDrill)+'</div>'+question(selectedDrill);
   case 'deducao':return deduce();
   case 'revisao':return revision();
  }
 }
 function markup(){
  return '<section class="el-workshop"><h2 id="d2Focus" tabindex="-1">Oficina de estudo do Dia 2</h2><p>Testa uma relação no laboratório, reconhece o comando e volta aos conceitos no teu ritmo.</p>'+
   '<div class="d2-actions" role="group" aria-label="Modos da oficina">'+Object.entries(modes).map(([id,label])=>'<button type="button" class="outline" aria-pressed="'+(mode===id)+'" data-study-mode="'+id+'">'+label+'</button>').join('')+'</div>'+
   '<div id="elBody">'+body()+'</div><div class="d2-actions">'+link('dia-2/aulas','Aprender do zero')+link('dia-2/formulas','Revisão rápida')+link('dia-2/simulados','Modo prova')+link('dia-2/apostas','Treino por matéria')+'</div></section>';
 }
 function record(key,choice){
  const p=prompts.get(key);
  if(!p||!Number.isInteger(choice)||p[1][choice]===undefined)return false;
  const at=Date.now(),id='el-'+at.toString(36)+'-'+Math.random().toString(36).slice(2,10);
  return adapter?.save([...adapter.get().learning,{key,choice,at,id}]);
 }
 function evidence(id,visits,completed){
  if(!adapter)return '';
  const attempts=adapter.get().learning.filter(a=>a.key==='aula-'+id||a.key===id);
  const status=schedule(attempts,work);
  if(status){
   const state=status.ready?'Revisão disponível':!work(status.last)?'Precisa revisar':status.stage>=3?'Acertos em revisões espaçadas':'Compreensão em treino';
   return state+' · '+attempts.length+(attempts.length===1?' tentativa':' tentativas');
  }
  return completed[id]?'Aula estudada':visits[id]?'Aula aberta':'Aula nova';
 }
 function bind(host,value){
  adapter=value;
  globalThis.FurgDia2Temperature?.bind(host);
  labs.bind(host);
  host.addEventListener('change',event=>{
   const {id,value:key}=event.target;
   if(id==='elLabSelect'&&(key==='temperatura'||Object.hasOwn(labs.labs,key)))selectedLab=key;
   else if(id==='elDrillSelect'&&Object.hasOwn(drills,key))selectedDrill=key;
   else if(id==='elLessonSelect'&&lessons.has(key))selectedLesson=key;
   else return;
   document.getElementById('elBody').innerHTML=body();
   document.getElementById(id)?.focus();
  });
  host.addEventListener('click',event=>{
   const b=event.target.closest('button');
   if(!b)return;
   const {studyMode,studyReview,studyChoice,studyScheduled,studyChallenge}=b.dataset;
   if(studyScheduled!==undefined){adapter.startScheduled();return;}
   if(studyChallenge!==undefined){adapter.startChallenge();return;}
   if(studyMode&&Object.hasOwn(modes,studyMode)){
    mode=studyMode;
    for(const control of host.querySelectorAll('[data-study-mode]'))control.setAttribute('aria-pressed',String(control===b));
    document.getElementById('elBody').innerHTML=body();
   }
   if(studyReview){
    const target=document.getElementById('elBody');
    target.innerHTML=question(studyReview);
    target.querySelector('button')?.focus();
   }
   if(studyChoice!==undefined){
    const article=b.closest('[data-study-prompt]'),key=article?.dataset.studyPrompt,choice=Number(studyChoice);
    if(!record(key,choice)){if(article)article.querySelector('[data-study-feedback]').textContent='Não foi possível guardar a resposta.';return;}
    const [,,correct,explanation]=prompts.get(key);
    article.querySelector('[data-study-feedback]').textContent=(choice===correct?'Acertou. ':'Revisa a ideia. ')+explanation;
    for(const option of article.querySelectorAll('button'))option.disabled=true;
   }
  });
 }
 globalThis.FurgStudyCourse={validate,schedule,bind,markup,layers,practiceLinks,evidence,record,selectLab};
})();
