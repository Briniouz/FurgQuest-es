'use strict';
(() => {
  const questions=globalThis.FURG_ENEM_DATA?.questions||[],byId=new Map(questions.map(q=>[q.id,q]));
  const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const areas={linguagens:'Linguagens','ciencias-humanas':'Ciências Humanas','ciencias-natureza':'Ciências da Natureza',matematica:'Matemática'};
  const tri=globalThis.FurgEnemTri, planner=globalThis.FurgEnemSimPlan;
  const empty=()=>({active:null,history:[]}),dayLabel=day=>day==='all'?'Objetiva completa':day+'º dia';
  const gradable=tri.gradable;
  let adapter,bound=false,interval=null,resultId=null,confirming=false,reviewIndex=0,reviewOnlyWrong=false;
  const dayOfSpace=()=>globalThis.FurgStudyAreas?.day()||'';
  const defaultSettings=day=>({
    mode:'year',year:null,day:day||'1',language:'ingles',minutes:null,
    custom:{scope:'dia-'+(day||'2'),language:'ingles',count:30,minutes:null,percentages:null},
  });
  const settingsByDay={'':defaultSettings('')};
  let settings=settingsByDay[''];
  function exam(year,day='all',language='ingles'){
    year=Number(year);if(!Number.isInteger(year)||year<2010||!['1','2','all'].includes(day)||!['ingles','espanhol'].includes(language))return[];
    return questions.filter(q=>q.year===year&&q.application==='regular'&&(!q.language||q.language===language)&&(day==='all'||(day==='1'?q.index<=90:q.index>=91))).sort((a,b)=>a.index-b.index);
  }
  const years=[...new Set(questions.filter(q=>q.year>=2010).map(q=>q.year))].filter(y=>['ingles','espanhol'].every(l=>{const q=exam(y,'all',l);return q.length===180&&new Set(q.map(q=>q.index)).size===180&&q.every(q=>!q.quality?.blocked);})).sort((a,b)=>b-a);
  const supportedYears={};
  function yearsFor(day){
    if(!day)return years;
    return supportedYears[day]??=years.filter(year=>exam(year,day).every(q=>globalThis.FurgStudyAreas.contains('dia-'+day,q.area)));
  }
  function fits(attempt,day){
    return !day||(attempt.day===day&&(attempt.mode==='custom'||yearsFor(day).includes(attempt.year)));
  }
  function minutes(year,day){const first=year<=2016?270:330,second=year<=2016?330:year===2017?270:300;return day==='1'?first:day==='2'?second:first+second;}
  function cleanAttempt(v,finished=false){
    if(!v||typeof v!=='object'||!['1','2','all'].includes(v.day)||!['ingles','espanhol'].includes(v.language))return null;
    if(typeof v.id!=='string'||!/^[a-zA-Z0-9_-]{1,90}$/.test(v.id)||!Number.isFinite(Date.parse(v.startedAt)))return null;
    let ids, format;
    if(v.mode==='custom'){
      ids=planner.validateIds(v.scope,v.language,v.ids);
      if(!ids||planner.scopes[v.scope].day!==v.day)return null;
      format={mode:'custom',scope:v.scope};
    }else{
      const year=Number(v.year);
      if(!years.includes(year))return null;
      ids=exam(year,v.day,v.language).map(q=>q.id);
      if(ids.length!==(v.day==='all'?180:90))return null;
      format={year};
    }
    const allowed=new Set(ids),duration=Number(v.durationMinutes);
    if(!Number.isInteger(duration)||duration<1||duration>660)return null;
    const answers={},marked={};for(const[id,a]of Object.entries(v.answers||{}))if(allowed.has(id)&&/^[A-E]$/.test(a))answers[id]=a;
    for(const[id,a]of Object.entries(v.marked||{}))if(allowed.has(id)&&a)marked[id]=true;
    const remaining=Number(v.remainingMs),endsAt=Number(v.endsAt),paused=!!v.paused;
    if(!Number.isFinite(remaining)||remaining<0||remaining>duration*60000||!finished&&!paused&&(!Number.isFinite(endsAt)||endsAt<=0))return null;
    if(finished&&!Number.isFinite(Date.parse(v.finishedAt)))return null;
    return{id:v.id,...format,day:v.day,language:v.language,ids,index:Math.max(0,Math.min(ids.length-1,Number.isInteger(v.index)?v.index:0)),answers,marked,durationMinutes:duration,remainingMs:remaining,endsAt:paused||finished?null:endsAt,paused:finished?false:paused,startedAt:new Date(v.startedAt).toISOString(),...(finished?{finishedAt:new Date(v.finishedAt).toISOString(),expired:!!v.expired}:{})};
  }
  function validate(v){const history=[];for(const a of Array.isArray(v?.history)?v.history.slice(-50):[]){const item=cleanAttempt(a,true);if(item&&!history.some(h=>h.id===item.id))history.push(item);}return{active:cleanAttempt(v?.active),history};}
  function merge(current,incoming){const a=validate(current),b=validate(incoming),h=new Map(a.history.map(h=>[h.id,h]));for(const x of b.history)if(!h.has(x.id))h.set(x.id,x);return{active:a.active||b.active,history:[...h.values()].sort((a,b)=>Date.parse(a.finishedAt)-Date.parse(b.finishedAt)).slice(-50)};}
  const state=()=>adapter.getState().enemSim||(adapter.getState().enemSim=empty());
  const remaining=a=>a.paused?a.remainingMs:Math.max(0,a.endsAt-Date.now());
  function score(a){const out={total:a.ids.length,correct:0,wrong:0,blank:0,annulled:0,graded:0,areas:{}};for(const id of a.ids){const q=byId.get(id),area=tri.areaOf(q);const part=out.areas[area]||=( {total:0,correct:0,wrong:0,blank:0,annulled:0,graded:0});const status=!gradable(q)?'annulled':!a.answers[id]?'blank':a.answers[id]===q.answer?'correct':'wrong';out[status]++;part[status]++;part.total++;if(gradable(q)){out.graded++;part.graded++;}}return out;}
  const clock=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return[Math.floor(s/3600),Math.floor(s/60)%60,s%60].map(n=>String(n).padStart(2,'0')).join(':');};
  const safeLink=u=>typeof u==='string'&&(/^(https?:\/\/)[^\s<>"']+$/.test(u)||/^enem\/pdfs\/[a-zA-Z0-9_.-]+\.pdf(?:#page=\d+)?$/.test(u))?u:'';
  const md=s=>globalThis.FurgEnem.markdown(s),figure=(p,alt='Figura da questão')=>p?md('!['+alt+']('+p+')'):'';
  function source(q, withPage=true){
    const original=globalThis.FurgEnemLayout.displayQuestion(q).source;
    const pdf=safeLink(original?.pdf);
    if(!withPage)return pdf.split('#')[0];
    return pdf&&original.page&&!pdf.includes('#')?pdf+'#page='+original.page:pdf;
  }
  function body(q){if(globalThis.FurgEnem.body)return globalThis.FurgEnem.body(q);const seen=(q.context||'')+(q.stem||'')+q.alternatives.map(a=>(a.text||'')+(a.file||'')).join('');return'<div class="enem-text">'+md(q.context)+(q.files||[]).filter(p=>!seen.includes(p)).map(figure).join('')+md(q.stem)+'</div>';}
  function optionMarkup(q,a,review){return'<div class="enem-options">'+globalThis.FurgEnemLayout.displayQuestion(q).alternatives.map(o=>`<button class="enem-option ${a.answers[q.id]===o.letter?'selected':''} ${review&&gradable(q)&&o.letter===q.answer?'correct':''} ${review&&gradable(q)&&a.answers[q.id]===o.letter&&o.letter!==q.answer?'wrong':''}" data-enem-sim="choose" data-letter="${o.letter}" aria-pressed="${a.answers[q.id]===o.letter}" ${review?'disabled':''}><b>${o.letter}</b><span>${md(o.text)}${figure(o.file,'Alternativa '+o.letter)}</span></button>`).join('')+'</div>';}
  function attemptTitle(a){
    return a.mode==='custom'?'Simulado personalizado · '+planner.scopes[a.scope].title.replace(/^Só /,'')
      :'ENEM '+a.year+' · '+dayLabel(a.day);
  }

  function render(){
    if(!adapter||!$('enemSimRoot'))return;
    const s=state(), day=dayOfSpace(), available=yearsFor(day);
    $('furgSimSection').hidden=!!s.active||!!day;
    settings=settingsByDay[day]??=defaultSettings(day);
    if(s.active){
      if(fits(s.active,day))renderActive();
      else $('enemSimRoot').innerHTML='<div class="panel enem-exam-builder"><h2>Já tens um simulado em andamento.</h2><p>Abre a Visão geral para continuar a prova que começaste.</p><a class="text-link" href="#simulados" data-study-route="simulados">Abrir simulado na Visão geral ↗</a></div>';
      return;
    }
    const result=s.history.find(h=>h.id===resultId);
    if(result&&fits(result,day)){renderResult(result);return;}
    if(available.length&&!available.includes(settings.year)){settings.year=available[0];settings.minutes=null;}
    if(available.length&&!settings.minutes)settings.minutes=minutes(settings.year,settings.day);
    const custom=settings.mode==='custom';
    $('enemSimRoot').innerHTML=`<div class="panel enem-exam-builder">
      <p class="eyebrow">SIMULADOS · ENEM</p>
      <div class="enem-exam-modes" role="group" aria-label="Formato do simulado">
        <button type="button" data-enem-sim="mode-year" aria-pressed="${!custom}"><strong>Por ano</strong><small>Caderno original</small></button>
        <button type="button" data-enem-sim="mode-custom" aria-pressed="${custom}"><strong>Personalizado</strong><small>Questões de várias edições</small></button>
      </div>
      ${custom?customBuilder(day):annualBuilder(day,available)}
    </div>${historyMarkup(s.history,day)}`;
    if(custom)bindCustom();
    else if(available.length)bindAnnual();
  }

  function historyMarkup(history,day){
    const attempts=history.filter(a=>fits(a,day)).slice().reverse();
    const rows=attempts.map(a=>{
      const result=score(a);
      const includesLanguage=a.mode==='custom'
        ?planner.scopes[a.scope].areas.includes('linguagens')
        :a.day==='all'||a.day===(a.year<=2016?'2':'1');
      const language=includesLanguage?' · '+(a.language==='ingles'?'Inglês':'Espanhol'):'';
      return `<button class="enem-exam-history-row" data-enem-sim="result" data-id="${esc(a.id)}">
        <span><strong>${esc(attemptTitle(a))}</strong><small>${new Date(a.finishedAt).toLocaleDateString('pt-BR')}${language}</small></span>
        <b>${result.correct}/${result.graded} <span>↗</span></b>
      </button>`;
    });
    return '<div class="panel enem-exam-history"><h3>Teus simulados do ENEM</h3>'+
      (rows.join('')||'<p class="muted">Teu primeiro resultado aparece aqui. O simulado em andamento fica salvo neste navegador.</p>')+'</div>';
  }

  const languagesMarkup='<option value="ingles">Inglês</option><option value="espanhol">Espanhol</option>';

  function annualBuilder(day,available){
    if(!available.length)return '<h2>Simulados por ano do ENEM</h2><p>Abre a Visão geral para consultar as provas disponíveis.</p>';
    const choices=day?[day]:['1','2','all'];
    return `<h2>${day?'Simulado do Dia '+day:'A prova daquele ano. No teu ritmo.'}</h2>
      <p class="muted">Questões reais na ordem do caderno azul, com as figuras originais e correção ao terminar.</p>
      <div class="enem-exam-fields">
        <div class="field"><label for="enemExamYear">Ano da prova</label><select id="enemExamYear">${available.map(y=>`<option value="${y}">ENEM ${y}</option>`).join('')}</select></div>
        <div class="field"><label for="enemExamDay">Qual prova?</label><select id="enemExamDay" ${day?'disabled':''}>${choices.map(d=>`<option value="${d}">${dayLabel(d)} · ${d==='all'?180:90} questões</option>`).join('')}</select></div>
        <div class="field" id="enemExamLanguageField" ${settings.day==='2'?'hidden':''}><label for="enemExamLanguage">Língua estrangeira</label><select id="enemExamLanguage">${languagesMarkup}</select></div>
        <div class="field"><label for="enemExamMinutes">Tempo em minutos</label><input id="enemExamMinutes" type="number" min="1" max="660" value="${settings.minutes}"></div>
      </div>
      <div id="enemExamInfo" class="enem-exam-info"></div>
      <div class="enem-exam-start"><button class="primary" data-enem-sim="start">Começar prova →</button><button class="quiet" data-enem-sim="official-time">Usar o tempo oficial</button></div>`;
  }

  function bindAnnual(){
    $('enemExamYear').value=String(settings.year);
    $('enemExamDay').value=settings.day;
    $('enemExamLanguage').value=settings.language;
    for(const [id,key] of [['enemExamYear','year'],['enemExamDay','day'],['enemExamLanguage','language']]){
      $(id).onchange=()=>{
        settings[key]=key==='year'?Number($(id).value):$(id).value;
        if(key!=='language'){
          settings.minutes=minutes(settings.year,settings.day);
          $('enemExamMinutes').value=String(settings.minutes);
        }
        annualInfo();
      };
    }
    $('enemExamMinutes').oninput=()=>settings.minutes=Number($('enemExamMinutes').value);
    annualInfo();
  }

  function annualInfo(){
    const {year,day,language}=settings;
    const list=exam(year,day,language),names=[...new Set(list.map(q=>areas[tri.areaOf(q)]))].join(' + ');
    const essayDay=year<=2016?'2':'1',hasEssay=day==='all'||day===essayDay;
    $('enemExamLanguageField').hidden=day==='2'&&!hasEssay;
    const pacing=day==='2'&&year>=2018?'<p>Ritmo sugerido de <b>3 min por questão</b>, com 30 min de margem para revisão e cartão-resposta.</p>':'';
    const cadernos=[...new Set(list.map(q=>source(q,false)).filter(Boolean))];
    $('enemExamInfo').innerHTML=`<strong>${list.length} questões · ${esc(names)}</strong>
      <p>Tempo oficial ${day==='all'?'somado dos dois dias':'deste dia'} de ${minutes(year,day)} min. ${hasEssay?'Esse tempo inclui a redação. A proposta está no caderno.':'Este dia reúne as questões objetivas.'}</p>${pacing}
      ${day==='all'?'<p>As duas provas acontecem em dias separados no exame real. Aqui, o treino reúne as 180 questões objetivas em uma sessão.</p>':''}
      <p>As respostas ficam ocultas durante a prova. Pode pausar, retomar e marcar questões para revisar.</p>
      <p>${cadernos.map((url,i)=>`<a href="${esc(url)}" target="_blank" rel="noopener">Caderno original${cadernos.length>1?' · '+(i+1)+'º dia':''} ↗</a>`).join(' · ')}</p>`;
  }

  const percentFields=['enemCustomEasy','enemCustomMedium','enemCustomHard'];

  function customBuilder(day){
    const custom=settings.custom, model=planner.profile(custom.scope,custom.language);
    const percentages=custom.percentages||model.percentages;
    const choices=Object.entries(planner.scopes).filter(([,scope])=>!day||scope.day===day);
    return `<h2>Monta teu simulado</h2>
      <p class="muted">Questões reais de 2021 a 2025, com mais espaço para os temas que mais apareceram nesse período.</p>
      <div class="enem-exam-fields enem-custom-fields">
        <div class="field"><label for="enemCustomScope">Áreas</label><select id="enemCustomScope">${choices.map(([id,scope])=>`<option value="${id}">${scope.title}</option>`).join('')}</select></div>
        <div class="field"><label for="enemCustomCount">Número de questões</label><input id="enemCustomCount" type="number" inputmode="numeric" min="1" max="${planner.maxCount}"></div>
        <div class="field"><label for="enemCustomMinutes">Tempo em minutos</label><input id="enemCustomMinutes" type="number" inputmode="numeric" min="1" max="660"></div>
        <div class="field" ${planner.scopes[custom.scope].areas.includes('linguagens')?'':'hidden'}><label for="enemCustomLanguage">Língua estrangeira</label><select id="enemCustomLanguage">${languagesMarkup}</select></div>
      </div>
      <fieldset class="enem-custom-difficulty">
        <legend>Distribuição por dificuldade</legend>
        <div class="enem-custom-bands">${tri.levels.map((label,i)=>`<div class="field">
          <label for="${percentFields[i]}">${label} (%)</label>
          <input id="${percentFields[i]}" type="number" min="0" max="100" inputmode="numeric" value="${percentages[i]}" aria-describedby="enemCustomProfile">
        </div>`).join('')}</div>
        <div class="enem-custom-reference">
          <small id="enemCustomProfile">Perfil dos cadernos azuis 2021–2025 · ${tri.levels.map((label,i)=>label+' '+model.percentages[i]+'%').join(' · ')}</small>
          <button class="text-link" data-enem-sim="historical-mix">Usar perfil histórico</button>
        </div>
      </fieldset>
      <div id="enemCustomInfo" class="enem-exam-info" role="status" aria-live="polite"></div>
      <div class="enem-exam-start">
        <button class="primary" id="enemCustomStart" data-enem-sim="start-custom">Gerar e começar →</button>
        <button class="quiet" data-enem-sim="recommended-time">Usar tempo sugerido</button>
      </div>
      <details class="enem-tri-method"><summary>De onde vêm as questões e os níveis</summary>
        <p>O sorteio usa a frequência de temas da <a class="text-link" href="#anatomia" data-study-route="anatomia">Anatomia do ENEM</a> e os parâmetros dos itens dos microdados do Inep. As faixas deste treino usam o parâmetro B. Fácil abaixo de 1, média de 1 até menos de 2, difícil a partir de 2.</p>
        <p>O perfil inicial usa a proporção observada nessas faixas de 2021 a 2025, dando o mesmo peso a cada área selecionada. O Inep usa o parâmetro B como escala contínua de dificuldade.</p>
      </details>`;
  }

  function bindCustom(){
    const custom=settings.custom;
    $('enemCustomScope').value=custom.scope;
    $('enemCustomLanguage').value=custom.language;
    $('enemCustomCount').value=String(custom.count);
    $('enemCustomMinutes').value=String(custom.minutes??recommendedMinutes(custom));
    const percentages=custom.percentages||planner.profile(custom.scope,custom.language).percentages;
    percentFields.forEach((id,i)=>{$(id).value=String(percentages[i]);});
    for(const [id,key] of [['enemCustomScope','scope'],['enemCustomLanguage','language']]){
      $(id).onchange=()=>{custom[key]=$(id).value;render();$(id)?.focus();};
    }
    $('enemCustomCount').oninput=()=>{
      custom.count=numberInput('enemCustomCount');
      if(custom.minutes===null)$('enemCustomMinutes').value=String(recommendedMinutes(custom));
      customInfo();
    };
    $('enemCustomMinutes').oninput=()=>{custom.minutes=numberInput('enemCustomMinutes');customInfo();};
    for(const id of percentFields)$(id).oninput=()=>{
      custom.percentages=percentFields.map(numberInput);
      customInfo();
    };
    customInfo();
  }

  const numberInput=id=>$(id).value===''?'':Number($(id).value);
  const validCount=value=>Number.isInteger(value)&&value>=1&&value<=planner.maxCount;
  const validDuration=value=>Number.isInteger(value)&&value>=1&&value<=660;
  const recommendedMinutes=custom=>validCount(custom.count)?custom.count*planner.pace:'';
  const percentagesOf=custom=>custom.percentages||planner.profile(custom.scope,custom.language).percentages;

  function customInfo(){
    const custom=settings.custom, percentages=percentagesOf(custom),duration=custom.minutes??recommendedMinutes(custom);
    const mix=planner.inspect({...custom,percentages});
    const display=$('enemCustomInfo');
    let message;
    if(!validCount(custom.count))message=`Escolhe de 1 a ${planner.maxCount} questões.`;
    else if(!mix)message='Preenche os três percentuais com valores inteiros que somem 100%.';
    else if(!mix.slots)message=mix.largest
      ?`Com essa distribuição, dá pra montar até ${mix.largest} questões. Reduz a quantidade ou ajusta os percentuais.`
      :'Ajusta os percentuais ou escolhe outra área para encontrar itens nessa combinação.';
    else if(!validDuration(duration))message='Escolhe um tempo entre 1 e 660 minutos.';
    else message='';
    $('enemCustomStart').disabled=!!message;
    display.innerHTML=message?`<p class="enem-exam-config-error">${esc(message)}</p>`:
      `<strong>${mix.areas.map(row=>row.count+' em '+areas[row.area]).join(' · ')}</strong>
        <p>${mix.counts.map((value,i)=>value+' '+['fáceis','médias','difíceis'][i]).join(' · ')}</p>
        <p>Ritmo sugerido de <b>3 min por questão</b> · ${recommendedMinutes(custom)} min neste bloco.</p>`;
  }

  function begin(ids, format, duration){
    if(state().active)return;
    if(adapter.getState().activeSim){adapter.toast('Finaliza o simulado da FURG em andamento antes de começar o ENEM.');return;}
    const s=state(), now=Date.now();
    s.active={id:'enem-'+now+'-'+Math.random().toString(36).slice(2,9),...format,
      ids,index:0,answers:{},marked:{},durationMinutes:duration,remainingMs:duration*60000,
      endsAt:now+duration*60000,paused:false,startedAt:new Date(now).toISOString()};
    if(!adapter.save()){s.active=null;return;}
    confirming=false;render();
    $('enemExamTitle')?.focus({preventScroll:true});
    $('enemSimRoot')?.scrollIntoView({block:'start'});
  }

  function start(){
    const year=Number($('enemExamYear').value),day=$('enemExamDay').value,language=$('enemExamLanguage').value;
    const duration=Number($('enemExamMinutes').value),list=exam(year,day,language),fixedDay=dayOfSpace();
    if(fixedDay&&day!==fixedDay||!yearsFor(fixedDay).includes(year)||list.length!==(day==='all'?180:90)||!validDuration(duration)){
      adapter.toast('Escolhe uma prova completa e um tempo entre 1 e 660 minutos.');return;
    }
    begin(list.map(q=>q.id),{year,day,language},duration);
  }

  function startCustom(){
    const custom=settings.custom,scope=planner.scopes[custom.scope],fixedDay=dayOfSpace();
    const duration=custom.minutes??recommendedMinutes(custom);
    if(!scope||fixedDay&&scope.day!==fixedDay||!validDuration(duration))return;
    const ids=planner.draw({...custom,percentages:percentagesOf(custom)});
    if(ids.length===custom.count)begin(ids,{mode:'custom',scope:custom.scope,day:scope.day,language:custom.language},duration);
  }
  function renderActive(){
    const a=state().active;
    if(!a)return;
    const q=byId.get(a.ids[a.index]),answered=Object.keys(a.answers).length,custom=a.mode==='custom';
    const title=custom?a.index+1:q.index;
    const original=custom?' · ENEM '+q.year+' · questão '+q.index:'';
    const language=q.language?' · '+(q.language==='ingles'?'Inglês':'Espanhol'):'';
    const origin=source(q);
    $('enemSimRoot').innerHTML=`<div class="panel enem-exam-top">
      <div><p class="eyebrow">${esc(attemptTitle(a))}</p><strong>${answered} de ${a.ids.length} respondidas</strong>
        ${a.day==='2'&&(custom||a.year>=2018)?'<small class="enem-exam-pace">Ritmo sugerido de 3 min por questão</small>':''}</div>
      <div class="enem-exam-clock"><small>Tempo restante</small><strong id="enemExamClock" role="timer" aria-live="off">${clock(remaining(a))}</strong></div>
      <button class="outline" data-enem-sim="pause">${a.paused?'Retomar prova':'Pausar'}</button>
      <button class="primary" data-enem-sim="finish">Finalizar</button>
      </div>
      ${confirming?`<div class="panel enem-exam-confirm" role="alert"><h3>Finalizar e conferir?</h3><p>${a.ids.length-answered} questões sem resposta. Depois de finalizar, esta tentativa fica encerrada.</p><button class="primary" data-enem-sim="finish-confirm">Finalizar e corrigir</button><button class="quiet" data-enem-sim="continue">Continuar prova</button></div>`:''}
      ${a.paused?'<div class="panel enem-exam-paused"><h2>Uma pausa para respirar.</h2><p>O cronômetro está parado e tuas respostas estão salvas.</p><button class="primary" data-enem-sim="pause">Retomar prova →</button></div>':
      `<article class="panel enem-question enem-exam-question" data-exam-question-id="${esc(q.id)}">
        <div class="enem-toolbar"><span>${esc(areas[tri.areaOf(q)]+language+original)}</span><button class="quiet" data-enem-sim="mark" aria-pressed="${!!a.marked[q.id]}">${a.marked[q.id]?'⚑ Marcada para revisar':'⚐ Revisar depois'}</button></div>
        <h3 id="enemExamTitle" tabindex="-1">Questão ${title} <small>· ${a.index+1} de ${a.ids.length}</small></h3>
        ${body(q)}${optionMarkup(q,a,false)}
        <div class="enem-exam-actions">${origin?`<a class="text-link" href="${esc(origin)}" target="_blank" rel="noopener">Caderno original ↗</a>`:''}<button class="quiet" data-enem-sim="blank" ${!a.answers[q.id]?'disabled':''}>Limpar resposta</button><span>Resposta salva ao marcar · A–E para escolher</span></div>
        <div class="enem-navigation"><button class="quiet" data-enem-sim="previous" ${a.index===0?'disabled':''}>← Anterior</button><button class="outline" data-enem-sim="next" ${a.index===a.ids.length-1?'disabled':''}>Próxima →</button></div>
      </article>`}
      <details class="panel enem-exam-map" open>
        <summary>Cartão de respostas <small>Preenchida · ⚑ Revisar depois</small></summary>
        <div>${a.ids.map((id,i)=>{
          const number=custom?i+1:byId.get(id).index;
          return `<button class="${a.answers[id]?'done':''} ${a.index===i?'current':''}" data-enem-sim="jump" data-index="${i}" aria-label="Questão ${number}${a.marked[id]?', marcada para revisar':''}" ${a.index===i?'aria-current="step"':''}>${number}<small>${a.answers[id]||'—'}${a.marked[id]?' ⚑':''}</small></button>`;
        }).join('')}</div>
      </details>`;
    globalThis.FurgElimination?.decorate($('enemSimRoot'),{
      scope:'enem-sim:'+a.id,id:q.id,selector:'[data-enem-sim="choose"]',
      selected:a.answers[q.id],locked:!!a.paused,onClear:()=>{delete a.answers[q.id];adapter.save();render();}
    });
  }
  function finish(expired=false){const s=state(),a=s.active;if(!a)return;a.remainingMs=remaining(a);a.finishedAt=new Date().toISOString();a.expired=expired;a.endsAt=null;a.paused=false;s.history.push(a);s.history=s.history.slice(-50);s.active=null;resultId=a.id;reviewIndex=0;reviewOnlyWrong=false;confirming=false;
    const progress=adapter.getState().enem||(adapter.getState().enem={answers:{},favorites:{},notes:{}});for(const[id,choice]of Object.entries(a.answers)){const old=progress.answers[id];progress.answers[id]={choice,firstChoice:old?.firstChoice||choice,attempts:(old?.attempts||0)+1,viewed:true,date:a.finishedAt};}
    adapter.save();render();if(expired)adapter.toast('Tempo encerrado. Teu simulado foi corrigido e salvo.');}
  function renderResult(a){
    const n=score(a);
    const pool=a.ids.filter(id=>!reviewOnlyWrong||gradable(byId.get(id))&&a.answers[id]!==byId.get(id).answer);
    reviewIndex=Math.max(0,Math.min(reviewIndex,pool.length-1));
    const q=byId.get(pool[reviewIndex]);
    const estimates=tri.report(a.ids,a.answers);
    const custom=a.mode==='custom';
    const difficulty=custom?planner.stats(a.ids):null;
    const elapsed=a.durationMinutes*60000-a.remainingMs,answered=n.correct+n.wrong;
    $('enemSimRoot').innerHTML=`<div class="panel enem-exam-result">
      <p class="eyebrow">PROVA FINALIZADA${a.expired?' · TEMPO ENCERRADO':''}</p>
      <h2>${esc(attemptTitle(a))}</h2>
      <div class="enem-exam-result-score"><strong>${n.correct}<small> / ${n.graded}</small></strong><p>acertos nas questões válidas · ${n.graded?Math.round(n.correct/n.graded*100):0}%</p></div>
      <div class="enem-exam-result-tags">
        <span>${n.wrong} erradas</span><span>${n.blank} em branco</span>${n.annulled?`<span>${n.annulled} anuladas</span>`:''}
        <span>${clock(elapsed)} de treino</span>${answered?`<span>${clock(elapsed/answered).replace(/^00:/,'')} por questão respondida</span>`:''}
      </div>
      ${difficulty?`<p class="muted">${difficulty[0]} fáceis · ${difficulty[1]} médias · ${difficulty[2]} difíceis</p>`:''}
      <div class="enem-exam-area-results">${Object.entries(n.areas).map(([area,p])=>
        `<div><span>${esc(areas[area])}</span><strong>${p.correct}/${p.graded}</strong><small>${p.wrong} erradas · ${p.blank} em branco</small></div>`).join('')}</div>
      <section class="enem-tri-result" aria-label="TRI estimada">
        <h3>TRI estimada</h3>
        <p class="muted">Estimativa de treino por área. A nota oficial é publicada pelo Inep.</p>
        ${tri.cards(estimates)}${tri.method({exam:true})}
      </section>
      <button class="outline" data-enem-sim="new">Escolher outra prova</button>
    </div>
    <div class="enem-exam-review-head"><h3>Confere teu raciocínio.</h3><button class="outline" data-enem-sim="review-filter" aria-pressed="${reviewOnlyWrong}">${reviewOnlyWrong?'Ver todas as questões':'Revisar erros e questões em branco'}</button></div>
    ${q?reviewMarkup(q,a,pool.length):'<div class="panel enem-empty"><p>Nenhum erro ou questão em branco para revisar.</p></div>'}`;
  }

  function reviewMarkup(q,a,total){
    const area=areas[tri.areaOf(q)],custom=a.mode==='custom',topic=planner.topicOf(q.id),item=tri.get(q.id);
    const sourceLink=source(q),answerPdf=safeLink(q.source?.answerPdf);
    const status=q.canceled?'Anulada':!a.answers[q.id]?'Em branco':a.answers[q.id]===q.answer?'Acertou':'Errou';
    return `<article class="panel enem-question enem-exam-question" data-exam-review-id="${esc(q.id)}">
      <div class="enem-toolbar"><span>${esc(area)} · ${reviewIndex+1} de ${total}${custom?' · ENEM '+q.year+' · questão '+q.index:''}</span><strong>${status}</strong></div>
      <h3 id="enemExamTitle" tabindex="-1">Questão ${custom?a.ids.indexOf(q.id)+1:q.index}</h3>
      ${custom&&item?`<div class="enem-meta"><span class="tag">${tri.levels[item.level]}</span>${topic?`<span>${esc(topic)}</span>`:''}</div>`:''}
      ${body(q)}${optionMarkup(q,a,true)}
      <div class="enem-feedback"><strong>${q.canceled?'Questão anulada no gabarito oficial.':'Gabarito: '+q.answer+' · Tua resposta: '+(a.answers[q.id]||'em branco')}</strong></div>
      ${gradable(q)?globalThis.FurgEnemLayout?.solution(q,md,figure)||'':''}
      <div class="enem-source">
        ${sourceLink?`<a href="${esc(sourceLink)}" target="_blank" rel="noopener">Prova original ↗</a>`:''}
        ${answerPdf?`<a href="${esc(answerPdf)}" target="_blank" rel="noopener">Gabarito oficial ↗</a>`:''}
      </div>
      <div class="enem-navigation"><button class="quiet" data-enem-sim="review-previous" ${reviewIndex===0?'disabled':''}>← Anterior</button><button class="outline" data-enem-sim="review-next" ${reviewIndex===total-1?'disabled':''}>Próxima →</button></div>
    </article>`;
  }
  function tick(){if(!adapter)return;const a=state().active;if(!a||a.paused)return;const left=remaining(a);if(left<=0){finish(true);return;}if($('enemExamClock'))$('enemExamClock').textContent=clock(left);}
  function go(index){const a=state().active;if(!a||a.paused)return;a.index=Math.max(0,Math.min(a.ids.length-1,index));confirming=false;adapter.save();render();$('enemExamTitle')?.focus({preventScroll:true});$('enemExamTitle')?.scrollIntoView({behavior:globalThis.FurgUI?.reducedMotion()?'auto':'smooth',block:'start'});}
  function choose(letter){const a=state().active;if(!a||a.paused||!/^[A-E]$/.test(letter))return;if(remaining(a)<=0){finish(true);return;}a.answers[a.ids[a.index]]=letter;adapter.save();render();}
  function handleKey(key){const a=adapter&&state().active;if(!a||a.paused||confirming||!fits(a,dayOfSpace()))return false;if(/^[a-e]$/i.test(key)){choose(key.toUpperCase());return true;}if(key==='ArrowRight'){go(a.index+1);return true;}if(key==='ArrowLeft'){go(a.index-1);return true;}return false;}
  function onClick(event){
    const button=event.target.closest('button[data-enem-sim]');
    if(!button||button.disabled)return;
    const action=button.dataset.enemSim,a=state().active;
    switch(action){
      case 'mode-year':
      case 'mode-custom':{
        settings.mode=action==='mode-custom'?'custom':'year';
        render();
        $('enemSimRoot').querySelector(`button[data-enem-sim="${action}"]`)?.focus();
        return;
      }
      case 'start': start();return;
      case 'start-custom': startCustom();return;
      case 'official-time':
        settings.minutes=minutes(settings.year,settings.day);
        $('enemExamMinutes').value=String(settings.minutes);return;
      case 'recommended-time':
        settings.custom.minutes=null;
        $('enemCustomMinutes').value=String(recommendedMinutes(settings.custom));
        customInfo();return;
      case 'historical-mix':
        settings.custom.percentages=null;
        percentFields.forEach((id,i)=>{$(id).value=String(percentagesOf(settings.custom)[i]);});
        customInfo();return;
      case 'new': resultId=null;render();return;
      case 'result': resultId=button.dataset.id;reviewIndex=0;reviewOnlyWrong=false;render();return;
      case 'review-filter': reviewOnlyWrong=!reviewOnlyWrong;reviewIndex=0;render();return;
      case 'review-next':
      case 'review-previous': reviewIndex+=action==='review-next'?1:-1;render();return;
    }
    if(!a)return;
    switch(action){
      case 'choose': choose(button.dataset.letter);return;
      case 'previous':
      case 'next': go(a.index+(action==='next'?1:-1));return;
      case 'jump': {
        const n=Number(button.dataset.index);
        if(Number.isInteger(n))go(n);
        return;
      }
      case 'finish': confirming=true;render();return;
      case 'continue': confirming=false;render();return;
      case 'finish-confirm': finish();return;
      case 'pause':
        if(!a.paused){
          a.remainingMs=remaining(a);
          if(a.remainingMs<=0){finish(true);return;}
          a.paused=true;a.endsAt=null;
        }else{
          a.paused=false;a.endsAt=Date.now()+a.remainingMs;
        }
        adapter.save();render();return;
      case 'mark': {
        if(a.paused)return;
        const id=a.ids[a.index];
        if(a.marked[id])delete a.marked[id];else a.marked[id]=true;
        adapter.save();render();return;
      }
      case 'blank':
        if(!a.paused){delete a.answers[a.ids[a.index]];adapter.save();render();}
    }
  }

  function init(value){
    adapter=value;
    adapter.getState().enemSim=validate(adapter.getState().enemSim);
    if(interval===null)interval=setInterval(tick,1000);
    if(!bound&&$('enemSimRoot')){
      bound=true;
      $('enemSimRoot').addEventListener('click',onClick);
    }
    tick();
  }
  function selectDay(day){
    const fixedDay=dayOfSpace();
    if(!adapter||!['1','2','all'].includes(day)||state().active||fixedDay&&day!==fixedDay)return false;
    settings=settingsByDay[fixedDay]??=defaultSettings(fixedDay);
    Object.assign(settings,{mode:'year',day,minutes:null});resultId=null;render();return true;
  }
  globalThis.FurgEnemSim={selectDay,init,render,validate,merge,exam,years,minutes,score,handleKey,tick};
})();
