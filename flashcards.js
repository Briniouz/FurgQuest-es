'use strict';
(() => {
  const cards=globalThis.FURG_FLASHCARDS_DATA||{},skills=new Map((globalThis.FURG_SKILLS_DATA?.skills||[]).map(s=>[s.id,s]));
  const $=id=>document.getElementById(id),dialog=$('flashcardDialog');
  let active=null,opener=null;
  const has=id=>skills.has(id)&&Array.isArray(cards[id])&&cards[id].length===5;
  function render(focus=false){
    if(!active)return;
    const skill=skills.get(active.id),list=cards[active.id],card=list[active.index];
    $('flashcardTitle').textContent=skill.title;
    $('flashcardSubject').textContent=skill.subject+' · revisão básica';
    $('flashcardCount').textContent=(active.index+1)+' de '+list.length;
    $('flashcardQuestion').textContent=card.question;
    $('flashcardAnswerText').textContent=card.answer;
    $('flashcardAnswer').hidden=!active.revealed;
    $('flashcardReveal').textContent=active.revealed?'Ocultar resposta':'Mostrar resposta';
    $('flashcardReveal').setAttribute('aria-expanded',String(active.revealed));
    $('flashcardPrevious').disabled=active.index===0;
    $('flashcardNext').textContent=active.index===list.length-1?'Recomeçar ↺':'Próximo →';
    $('flashcardDots').innerHTML=list.map((_,i)=>`<button type="button" data-flashcard-index="${i}" aria-label="Flashcard ${i+1}" ${i===active.index?'aria-current="step"':''}>${i+1}</button>`).join('');
    $('flashcardLive').textContent=active.revealed?'Resposta: '+card.answer:'Flashcard '+(active.index+1)+' de '+list.length+'. '+card.question;
    if(focus)$('flashcardQuestion').focus({preventScroll:true});
  }
  function open(id,trigger=null){
    if(!dialog||!has(id))return false;
    active={id,index:0,revealed:false};opener=trigger||document.activeElement;render();
    if(!dialog.open)dialog.showModal();
    $('flashcardQuestion').focus({preventScroll:true});return true;
  }
  function close(){if(dialog?.open)dialog.close();}
  function move(index){if(!active)return;active.index=Math.max(0,Math.min(4,index));active.revealed=false;render(true);}
  function handleKey(key){
    if(!dialog?.open)return false;
    if(key==='ArrowRight')move(active.index===4?0:active.index+1);
    else if(key==='ArrowLeft')move(active.index-1);
    else if(key==='Escape')close();
    else return false;
    return true;
  }
  if(dialog){
    $('flashcardClose').onclick=close;
    $('flashcardReveal').onclick=()=>{if(active){active.revealed=!active.revealed;render();}};
    $('flashcardPrevious').onclick=()=>move(active.index-1);
    $('flashcardNext').onclick=()=>move(active.index===4?0:active.index+1);
    $('flashcardDots').addEventListener('click',event=>{const button=event.target.closest('button[data-flashcard-index]');if(!button)return;const index=Number(button.dataset.flashcardIndex);if(Number.isInteger(index)&&index>=0&&index<5)move(index);});
    dialog.addEventListener('close',()=>{active=null;const target=opener;opener=null;target?.focus?.({preventScroll:true});});
    dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();});
    document.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey)return;if(handleKey(event.key))event.preventDefault();});
  }
  globalThis.FurgFlashcards={has,open,close,handleKey};
})();
