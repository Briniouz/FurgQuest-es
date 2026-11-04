'use strict';
/* Galeria de referências para o ENEM. Imagens públicas obtidas da Wikipédia,
   com fallback legível caso um retrato não esteja disponível ou rede falhe. */
(() => {
  const profiles=globalThis.FURG_THINKERS_DATA||[];
  const root=document.getElementById('thinkersRoot');
  if(!root||!profiles.length)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&#39;'}[c]));
  const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const categories=['Todos',...new Set(profiles.map(p=>p.area))];
  const portraits=new Map();
  const wikiURL=name=>'https://pt.wikipedia.org/wiki/'+encodeURIComponent(name.replace(/ /g,'_'));
  const initials=name=>name.split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join('').toUpperCase();
  let search='',category='Todos',count=12,observer;
  function photo(node){
    if(!node||node.dataset.loaded==='1')return;
    const name=node.dataset.wiki;
    node.dataset.loaded='1';
    let request=portraits.get(name);
    if(!request){
      const url='https://pt.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',prop:'pageimages',pithumbsize:'360',redirects:'1',titles:name,origin:'*'});
      request=fetch(url,{mode:'cors'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()})
        .then(j=>Object.values(j.query?.pages||{}).find(p=>p.thumbnail?.source)?.thumbnail?.source||null)
        .catch(()=>null);
      portraits.set(name,request);
    }
    request.then(src=>{
      if(!src||!/^https:\/\/(?:upload\.wikimedia\.org|commons\.wikimedia\.org)\//.test(src)||!node.isConnected)return;
      const image=new Image();
      image.alt='';
      image.loading='lazy';
      image.decoding='async';
      image.onload=()=>{if(node.isConnected){node.appendChild(image);node.classList.add('has-photo');}};
      image.src=src;
    });
  }
  function hydratePhotos(){
    if(observer)observer.disconnect();
    const nodes=root.querySelectorAll('[data-wiki]');
    if('IntersectionObserver' in globalThis){
      observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){observer.unobserve(e.target);photo(e.target);}})},{rootMargin:'360px'});
      nodes.forEach(node=>observer.observe(node));
    }else nodes.forEach(photo);
  }
  function card(p){
    return '<article class="thinker-card">'+
      '<div class="thinker-face" data-wiki="'+esc(p.wiki)+'" aria-label="Imagem de '+esc(p.name)+'"><span>'+esc(initials(p.name))+'</span></div>'+
      '<div class="thinker-card-body"><div class="thinker-meta">'+esc(p.area)+' · '+esc(p.period)+'</div>'+
      '<h3>'+esc(p.name)+'</h3><p class="thinker-work"><strong>Obra ou produção:</strong> '+esc(p.work)+'</p>'+
      '<p class="thinker-idea">'+esc(p.idea)+'</p>'+
      '<details class="thinker-more"><summary>Ver mais <span aria-hidden="true">⌄</span></summary>'+
      '<div class="thinker-expanded"><p>'+esc(p.details)+'</p><p><strong>Como aparece no ENEM:</strong> '+esc(p.exam)+'</p>'+
      '<a href="'+esc(wikiURL(p.wiki))+'" target="_blank" rel="noopener noreferrer">Conhecer a trajetória e os créditos da imagem ↗</a></div></details></div></article>';
  }
  function render(){
    const filtered=profiles.filter(p=>(category==='Todos'||p.area===category) && normalize([p.name,p.area,p.period,p.work,p.idea,p.details,p.exam].join(' ')).includes(normalize(search)));
    const visible=filtered.slice(0,count);
    root.innerHTML='<section class="thinkers-section" aria-label="Autores, filósofos e personalidades do ENEM">'+
      '<div class="thinkers-heading"><div><p class="eyebrow">REPERTÓRIO PARA HUMANAS, LINGUAGENS E REDAÇÃO</p><h2>Quem pensou o mundo que cai na prova.</h2><p>Da Antiguidade ao Tropicalismo: ideias, obras e ligações com questões do ENEM.</p></div><strong class="thinker-total">40 <small>perfis</small></strong></div>'+
      '<div class="thinkers-tools panel"><label class="thinkers-search-label" for="thinkerSearch">Buscar uma pessoa, obra ou conceito<input id="thinkerSearch" type="search" autocomplete="off" placeholder="Ex.: Machado, feminismo, globalização…" value="'+esc(search)+'"></label>'+
      '<div class="thinkers-filters" aria-label="Filtrar por área" role="group">'+categories.map(a=>'<button type="button" data-thinker-filter="'+esc(a)+'" aria-pressed="'+(category===a)+'" class="'+(category===a?'active':'')+'">'+esc(a)+'</button>').join('')+'</div></div>'+
      '<p class="thinkers-count" aria-live="polite">'+filtered.length+' resultado(s) · mostrando '+visible.length+'</p>'+
      (visible.length?'<div class="thinkers-grid">'+visible.map(card).join('')+'</div>':'<div class="thinkers-empty panel">Nenhum perfil corresponde a essa busca. Tenta outro termo ou área.</div>')+
      (visible.length<filtered.length?'<button type="button" class="thinkers-load outline" id="thinkersMore">Mostrar mais '+Math.min(12,filtered.length-visible.length)+' perfis ↓</button>':'')+
      '<p class="thinkers-source">Perfis de estudo em redação própria, com sínteses que não substituem a leitura das obras. Retratos, quando disponíveis, são exibidos via Wikipédia/Wikimedia; os links de cada perfil levam às páginas com informações e créditos.</p></section>';
    const input=root.querySelector('#thinkerSearch');
    input?.addEventListener('input',event=>{
      const start=event.target.selectionStart;
      search=event.target.value;count=12;render();
      const next=root.querySelector('#thinkerSearch');next?.focus();next?.setSelectionRange(start,start);
    });
    root.querySelectorAll('[data-thinker-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.thinkerFilter;count=12;render();}));
    root.querySelector('#thinkersMore')?.addEventListener('click',()=>{count+=12;render();});
    hydratePhotos();
  }
  render();
  globalThis.FurgThinkers={count:()=>profiles.length,search:q=>{search=q;count=12;render()},filter:a=>{category=a;count=12;render()}};
})();