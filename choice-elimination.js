'use strict';
/* Temporary scratch marks. No official question or saved result is changed. */
(() => {
  const marks=new Map(),key=(scope,id)=>String(scope)+':'+String(id);
  function marked(scope,id,value){return !!marks.get(key(scope,id))?.has(String(value));}
  function toggle(scope,id,value){const k=key(scope,id),set=marks.get(k)||new Set(),v=String(value);if(set.has(v))set.delete(v);else set.add(v);if(set.size)marks.set(k,set);else marks.delete(k);return set.has(v);}
  function clear(scope,id){marks.delete(key(scope,id));}
  function paint(row,button,cross,scope,id,value,label){const yes=marked(scope,id,value);row.classList.toggle('choice-is-eliminated',yes);cross.setAttribute('aria-pressed',String(yes));cross.setAttribute('aria-label',(yes?'Restaurar':'Riscar')+' alternativa '+label);cross.title=(yes?'Restaurar':'Riscar')+' alternativa '+label;cross.textContent=yes?'↶':'×';}
  function restore(scope,id,value,root){const set=marks.get(key(scope,id));set?.delete(String(value));if(set&&!set.size)clear(scope,id);if(root?.querySelectorAll)for(const row of root.querySelectorAll('.choice-elimination-row'))if(row.dataset.eliminationValue===String(value)){row.classList.remove('choice-is-eliminated');const cross=row.querySelector('.choice-eliminate');if(cross){cross.setAttribute('aria-pressed','false');cross.setAttribute('aria-label','Riscar alternativa '+row.dataset.eliminationLabel);cross.title='Riscar alternativa '+row.dataset.eliminationLabel;cross.textContent='×';}}}
  function lock(root){if(!root?.querySelectorAll)return;for(const row of root.querySelectorAll('.choice-elimination-row')){row.classList.remove('choice-is-eliminated');const cross=row.querySelector('.choice-eliminate');if(cross)cross.hidden=true;}}
  function decorate(root,{scope,id,selector,attribute='letter',selected=null,locked=false,onClear=()=>{}}){
    if(locked){clear(scope,id);lock(root);return;}
    if(!root?.ownerDocument?.createElement)return;
    const options=Array.from(root.querySelectorAll(selector));
    options.forEach((button,i)=>{
      if(button.disabled||button.parentElement?.classList.contains('choice-elimination-row'))return;
      const value=String(button.dataset[attribute]??i),label='ABCDE'[i]||value;
      if(selected!==null&&selected!==undefined&&String(selected)===value)restore(scope,id,value);
      const row=root.ownerDocument.createElement('div'),cross=root.ownerDocument.createElement('button');
      row.className='choice-elimination-row';row.dataset.eliminationValue=value;row.dataset.eliminationLabel=label;
      cross.type='button';cross.className='choice-eliminate';button.classList.add('choice-can-eliminate');
      button.replaceWith(row);row.append(button,cross);paint(row,button,cross,scope,id,value,label);
      button.addEventListener('click',()=>restore(scope,id,value,root),true);
      cross.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '||/^[a-e]$/i.test(e.key))e.stopPropagation();});
      cross.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const yes=toggle(scope,id,value);paint(row,button,cross,scope,id,value,label);if(yes&&button.getAttribute('aria-pressed')==='true')onClear(value);});
    });
  }
  globalThis.FurgElimination={decorate,marked,toggle,restore,clear,lock};
})();
