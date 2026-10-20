'use strict';
(() => {
  const stages=globalThis.FURG_LEVELUP_DATA,questions=stages.flatMap(s=>s.questions),byId=new Map(questions.map(q=>[q.id,q]));
  const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let adapter,bound=false,current=questions[0].id,selection=null,retry=false,notice='';
  const empty=()=>({answers:{},lastQuestion:questions[0].id});
  function validate(value){
    const clean=empty();
    if(!value||typeof value!=='object')return clean;
    let accessible=true;
    for(const stage of stages){
      if(!accessible)break;
      for(const q of stage.questions){
        const a=value.answers?.[q.id];if(!a||typeof a!=='object')continue;
        const choice=Number.isInteger(a.choice)&&a.choice>=0&&a.choice<q.options.length?a.choice:null;
        const firstChoice=Number.isInteger(a.firstChoice)&&a.firstChoice>=0&&a.firstChoice<q.options.length?a.firstChoice:choice;
        clean.answers[q.id]={choice,firstChoice,solved:a.solved===true&&choice===q.answer,attempts:Math.min(100000,Math.max(choice===null?0:1,Math.floor(Number(a.attempts)||0))),hinted:a.hinted===true};
      }
      accessible=stage.questions.every(q=>clean.answers[q.id]?.solved);
    }
    if(byId.has(value.lastQuestion)&&isOpen(stageOf(value.lastQuestion),clean))clean.lastQuestion=value.lastQuestion;
    return clean;
  }
  const stageOf=id=>stages.findIndex(s=>s.questions.some(q=>q.id===id));
  const done=(stage,progress)=>stage.questions.every(q=>progress.answers[q.id]?.solved);
  const isOpen=(index,progress)=>index>=0&&stages.slice(0,index).every(s=>done(s,progress));
  function merge(a,b){
    // Combine before validation so complementary backups can finish a stage.
    const answers={};for(const q of questions){const x=a?.answers?.[q.id],y=b?.answers?.[q.id];if(x||y)answers[q.id]=x?.solved?x:y?.solved?y:y||x;}
    return validate({answers,lastQuestion:b?.lastQuestion||a?.lastQuestion});
  }
  const progress=()=>adapter.getState().levelup;
  function metrics(value=progress()){
    const completed=stages.filter(s=>done(s,value)).length,solved=questions.filter(q=>value.answers[q.id]?.solved).length;
    return {completed,solved,total:questions.length,xp:solved*10+completed*20,maxXP:questions.length*10+stages.length*20,level:Math.min(stages.length,completed+1)};
  }
  function persist(value){const previous=progress();adapter.getState().levelup=value;if(adapter.save()===false){adapter.getState().levelup=previous;notice='Não foi possível salvar. Exporta teu progresso ou libera espaço no navegador para continuar.';return false;}return true;}
  function pick(id,focus=false){if(!byId.has(id)||!isOpen(stageOf(id),progress()))return false;const next={...progress(),lastQuestion:id};if(!persist(next)){render();return false;}current=id;selection=null;retry=false;notice='';render();if(focus)$('levelQuestionTitle').focus();return true;}
  function resume(){const p=progress(),stage=stages.find(s=>!done(s,p));return stage?.questions.find(q=>!p.answers[q.id]?.solved)?.id||questions.at(-1).id;}
  function render(){
    if(!adapter)return;
    const p=progress();if(!isOpen(stageOf(current),p))current=resume();
    const m=metrics(),stageIndex=stageOf(current),stage=stages[stageIndex],q=byId.get(current),a=p.answers[q.id],solved=!!a?.solved,wrong=!retry&&a?.choice!=null&&!solved;
    const selected=selection??(!retry?a?.choice:null),finished=m.completed===stages.length,stageDone=done(stage,p),percent=Math.round(m.solved/m.total*100);
    $('levelupRoot').innerHTML=`<div class="up-hero"><div class="up-intro"><span class="up-kicker">LEVEL UP <span>PROTÓTIPO</span></span><h2>Começa pequeno.<br>Vai cada vez mais longe.</h2><p>Uma questão de cada vez. Constrói a base, desbloqueia novos níveis e acompanha tua evolução.</p><button class="up-continue" data-up="resume">${finished?'Revisar minha jornada':m.solved?'Continuar minha jornada':'Começar do zero'} <span aria-hidden="true">↗</span></button><small>Matemática · 30 questões autorais · sem cronômetro</small></div><div class="up-dashboard"><div class="up-orbit" aria-hidden="true"><span>${finished?'✓':String(m.level).padStart(2,'0')}</span></div><strong>${finished?'Trilha concluída':'Nível '+m.level+' de '+stages.length}</strong><span>${m.xp} / ${m.maxXP} XP</span><div class="up-meter" role="progressbar" aria-label="Questões concluídas" aria-valuemin="0" aria-valuemax="${m.total}" aria-valuenow="${m.solved}"><i style="width:${percent}%"></i></div><small>${m.solved} de ${m.total} questões conquistadas</small></div></div>
      <div class="up-layout"><aside class="up-path"><div class="up-path-title"><h3>Tua jornada</h3><span>10 etapas</span></div><p>Acerta as 3 questões para abrir o próximo nível. Pode tentar de novo e pedir uma dica.</p><div class="up-stages" aria-label="Níveis de matemática">${stages.map((s,i)=>{const complete=done(s,p),open=isOpen(i,p),count=s.questions.filter(q=>p.answers[q.id]?.solved).length;return `<button class="up-stage ${complete?'is-done':''} ${i===stageIndex?'is-current':''}" data-up="stage" data-stage="${i}" ${open?'':'disabled'} ${i===stageIndex?'aria-current="step"':''} aria-label="Nível ${s.level}: ${esc(s.title)}, ${complete?'concluído':open?count+' de 3 questões':'bloqueado'}"><span class="up-stage-number" aria-hidden="true">${complete?'✓':String(s.level).padStart(2,'0')}</span><span><strong>${esc(s.title)}</strong><small>${open?esc(s.label)+' · '+count+'/3':'Conclui o nível '+i+' para abrir'}</small></span><span class="up-stage-end" aria-hidden="true">${open?'↗':'○'}</span></button>`;}).join('')}</div><div class="up-roadmap"><span>O caminho continua</span><p>Depois do protótipo: questões de Fuvest, EsPCEx, ITA e IME em novas etapas.</p><small>Essas provas ainda não estão neste modo.</small></div></aside>
      <div class="up-practice"><article class="up-card"><div class="up-card-top"><span class="up-level-tag">NÍVEL ${stage.level} <span> / 10</span></span><span>${esc(stage.label)}</span></div><h3>${esc(stage.title)}</h3><p class="up-skill">${esc(stage.skill)}</p><div class="up-question-tabs" aria-label="Questões deste nível">${stage.questions.map((item,i)=>`<button data-up="question" data-id="${item.id}" class="${p.answers[item.id]?.solved?'is-done':''}" ${item.id===current?'aria-current="step"':''} aria-label="Questão ${i+1}${p.answers[item.id]?.solved?', concluída':''}">${p.answers[item.id]?.solved?'✓':i+1}</button>`).join('')}<span>Questão ${stage.questions.indexOf(q)+1} de 3</span></div><h4 id="levelQuestionTitle" tabindex="-1">${esc(q.stem)}</h4><div class="up-options" role="group" aria-label="Alternativas">${q.options.map((option,i)=>`<button data-up="choose" data-choice="${i}" class="up-option ${selected===i?'is-selected':''} ${solved&&i===q.answer?'is-correct':''} ${wrong&&selected===i?'is-wrong':''}" aria-pressed="${selected===i}" ${solved||wrong?'disabled':''}><b>${'ABCD'[i]}</b><span>${esc(option)}</span>${solved&&i===q.answer?'<em>Correta ✓</em>':''}</button>`).join('')}</div>
      <div id="levelFeedback" tabindex="-1" class="up-feedback ${solved?'is-good':wrong?'is-retry':''}" role="status" aria-live="polite">${notice?`<p>${esc(notice)}</p>`:solved?`<strong>${stageDone?'Nível conquistado!':'Boa! Mais um passo.'}</strong><p>${esc(q.explanation)}</p><small>${stageDone?'As 3 questões estão resolvidas. +20 XP pela etapa.':'Questão concluída · 10 XP na primeira conquista.'} ${finished?'Tu concluiu as 10 etapas!':''}</small>`:wrong?`<strong>Ainda não. Tu pode tentar de novo.</strong><p>${esc(q.hint)}</p><small>Sem perder progresso. O XP chega quando tu resolver.</small>`:a?.hinted?`<strong>Uma pista para começar</strong><p>${esc(q.hint)}</p>`:''}</div>
      <div class="up-actions">${solved?`<button class="primary" data-up="next">${stageDone?(stageIndex===stages.length-1?'Ver minha conquista ✓':'Próximo nível →'):'Próxima questão →'}</button><button class="quiet" data-up="resume">Ir para onde parei</button>`:wrong?'<button class="primary" data-up="retry">Tentar de novo ↻</button>':`<button id="levelConfirm" class="primary" data-up="confirm" ${selection===null?'disabled':''}>Conferir resposta →</button><button class="quiet" data-up="hint" ${a?.hinted?'disabled':''}>${a?.hinted?'Dica aberta':'Preciso de uma dica'}</button>`}</div><p class="up-shortcuts">A–D para escolher · Enter para conferir ou avançar</p></article>
      <div class="up-note"><span aria-hidden="true">↗</span><p><strong>Progresso que fica contigo.</strong> Salvo neste navegador. Para levar a outro dispositivo, usa Exportar e Importar em <a href="#desempenho" data-up="backup">Meu desempenho</a>. Rever uma questão não duplica o XP.</p></div>${finished?'<div class="up-finish" id="levelConquest" tabindex="-1"><span aria-hidden="true">✦</span><div><strong>Do primeiro passo ao desafio final.</strong><p>30 questões, 10 níveis e 500 XP. Tua base ganhou mais uma camada. Tu pode voltar a qualquer etapa para revisar.</p></div></div>':''}</div></div>`;
  }
  function act(action,dataset={}){
    const p=progress(),q=byId.get(current),a=p.answers[q.id],stageIndex=stageOf(current);
    if(action==='resume')return pick(resume(),true);
    if(action==='stage'){const i=Number(dataset.stage);if(!Number.isInteger(i)||!isOpen(i,p)||!stages[i])return false;return pick(stages[i].questions.find(item=>!p.answers[item.id]?.solved)?.id||stages[i].questions[0].id,true);}
    if(action==='question')return pick(dataset.id,true);
    if(action==='choose'){const choice=Number(dataset.choice);if(a?.solved||(!retry&&a?.choice!=null)||!Number.isInteger(choice)||choice<0||choice>=q.options.length)return false;selection=choice;notice='';render();$('levelConfirm').focus();return true;}
    if(action==='hint'){if(a?.solved)return false;const next={...p,answers:{...p.answers,[q.id]:{...a,hinted:true}}};persist(next);render();$('levelFeedback').focus();return true;}
    if(action==='retry'){if(a?.solved||a?.choice==null)return false;retry=true;selection=null;notice='';render();$('levelQuestionTitle').focus();return true;}
    if(action==='confirm'){
      if(selection===null||a?.solved||(!retry&&a?.choice!=null))return false;
      const old=metrics(),record={choice:selection,firstChoice:a?.firstChoice??selection,attempts:(a?.attempts||0)+1,hinted:!!a?.hinted,solved:selection===q.answer};
      if(!persist({...p,answers:{...p.answers,[q.id]:record}})){render();return false;}
      selection=null;retry=false;notice='';render();$('levelFeedback').focus();const m=metrics();if(m.completed>old.completed)adapter.toast(m.completed===stages.length?'Trilha concluída! 500 XP conquistados.':'Level up! Nível '+(stageIndex+2)+' desbloqueado.');return true;
    }
    if(action==='next'){
      if(!a?.solved)return false;
      if(done(stages[stageIndex],p)){if(stageIndex<stages.length-1)return pick(stages[stageIndex+1].questions.find(item=>!p.answers[item.id]?.solved)?.id||stages[stageIndex+1].questions[0].id,true);$('levelConquest')?.focus();$('levelConquest')?.scrollIntoView({behavior:globalThis.FurgUI?.reducedMotion()?'auto':'smooth',block:'center'});return true;}
      return pick(stages[stageIndex].questions.find(item=>!p.answers[item.id]?.solved).id,true);
    }
    if(action==='backup'){adapter.setView('desempenho');return true;}return false;
  }
  function handleKey(key){if(/^[a-d]$/i.test(key))return act('choose',{choice:String('ABCD'.indexOf(key.toUpperCase()))});if(key==='Enter'){const a=progress().answers[current];return act(a?.solved?'next':!retry&&a?.choice!=null?'retry':'confirm');}return false;}
  function refresh(){adapter.getState().levelup=validate(progress());current=progress().lastQuestion;selection=null;retry=false;notice='';render();}
  function init(value){adapter=value;refresh();if(bound)return;bound=true;$('levelupRoot').addEventListener('click',event=>{const button=event.target.closest('[data-up]');if(!button||button.disabled)return;if(button.dataset.up==='backup')event.preventDefault();act(button.dataset.up,button.dataset);});}
  globalThis.FurgLevelUp={init,render,refresh,validate,merge,metrics,handleKey};
})();
