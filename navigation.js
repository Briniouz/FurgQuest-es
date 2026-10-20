'use strict';
(() => {
 const nav=document.getElementById('mainNavigation'),previous=document.getElementById('navScrollPrevious'),next=document.getElementById('navScrollNext');
 if(!nav||!previous||!next)return;
 const behavior=()=>globalThis.FurgUI?.reducedMotion()?'auto':'smooth';
 function update(){const max=Math.max(0,(nav.scrollWidth||0)-(nav.clientWidth||0)),overflow=max>2;previous.hidden=next.hidden=!overflow;previous.disabled=nav.scrollLeft<=2;next.disabled=nav.scrollLeft>=max-2;}
 function revealActive(){const active=[...document.querySelectorAll('.nav')].find(b=>b.classList.contains('active'));if(!active?.getBoundingClientRect||!nav.getBoundingClientRect)return;const a=active.getBoundingClientRect(),n=nav.getBoundingClientRect(),left=a.left<n.left+4?a.left-n.left-4:a.right>n.right-4?a.right-n.right+4:0;if(left)nav.scrollBy({left,behavior:behavior()});}
 previous.onclick=()=>nav.scrollBy({left:-Math.max(140,nav.clientWidth*.7),behavior:behavior()});
 next.onclick=()=>nav.scrollBy({left:Math.max(140,nav.clientWidth*.7),behavior:behavior()});
 nav.addEventListener('scroll',update,{passive:true});
 nav.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();event.stopPropagation();const buttons=[...document.querySelectorAll('.nav')],index=buttons.indexOf(event.target),target=event.key==='Home'?0:event.key==='End'?buttons.length-1:Math.max(0,Math.min(buttons.length-1,index+(event.key==='ArrowRight'?1:-1)));buttons[target]?.focus();buttons[target]?.scrollIntoView({behavior:behavior(),block:'nearest',inline:'nearest'});});
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{update();revealActive();}).observe(nav);
 if(typeof window!=='undefined')window.addEventListener('resize',()=>{update();revealActive();},{passive:true});
 update();globalThis.FurgNavigation={update,revealActive};
})();
