'use strict';
/* A reference drawer: searches study material without changing a question or its answer. */
(() => {
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const safe=url=>typeof url==='string'&&/^https:\/\/[^\s<>"']+$/.test(url);
  let ready=null,entries=[],query='',kind='all',limit=12,lastFocus=null,bound=false,timer;
  const score=(e,q)=>!q?0:norm(e.title)===q?100:norm(e.title).startsWith(q)?80:norm(e.title).includes(q)?60:e.terms.some(t=>norm(t)===q)?40:10;
  function matches(entry,value){return norm(value).split(' ').filter(Boolean).every(term=>entry.search.includes(term));}
  function select(value=query,type=kind){const q=norm(value);return entries.filter(e=>(type==='all'||e.kind===type)&&matches(e,value)).sort((a,b)=>score(b,q)-score(a,q)||a.title.localeCompare(b.title,'pt-BR'));}
  function script(){
    if(globalThis.FURG_STUDY_CONCEPTS)return Promise.resolve();
    return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='study-concepts-data.js?v=20261105-guia';s.onload=()=>globalThis.FURG_STUDY_CONCEPTS?resolve():reject(Error('Conceitos indisponíveis.'));s.onerror=()=>{s.remove();reject(Error('Conceitos indisponíveis.'));};document.head.appendChild(s);});
  }
  function ensure(){
    if(ready)return ready;
    ready=Promise.all([globalThis.FurgThinkers.ensure(),globalThis.FurgLanguages.ensure(),script()]).then(([people,languages])=>{
      const concepts=(globalThis.FURG_STUDY_CONCEPTS||[]).map(p=>({kind:'concepts',id:'concept-'+p.id,title:p.title,terms:p.terms||[],summary:p.summary,body:p.points,tip:p.tip,example:p.example,sources:p.sources||[],people:p.people||[]}));
      const topics=languages.topics.map(t=>({kind:'concepts',id:'topic-'+t.id,title:t.title,terms:t.terms,summary:t.summary,body:t.points,tip:t.tip,example:t.example.text+' '+t.example.explanation,sources:t.sources,people:t.authors.map(a=>a.name),trap:t.trap}));
      const profiles=people.map(p=>({kind:'profiles',id:'profile-'+p.id,title:p.name,terms:[p.fullName,...p.concepts,...p.works,p.area,p.movement],summary:p.idea,body:[p.details,p.connections],tip:p.exam,works:p.works,period:p.period,area:p.area,movement:p.movement,sources:p.sources,concepts:p.concepts}));
      entries=[...concepts,...topics,...profiles].map(e=>({...e,search:norm([e.title,...e.terms,e.summary,...e.body,e.tip,...(e.people||[])].join(' '))}));return entries;
    }).catch(error=>{ready=null;throw error;});return ready;
  }
  function sources(items){return items.filter(s=>safe(s.url)).map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label)+' ↗</a>').join('');}
  function card(e){
    const profile=e.kind==='profiles';
    return '<article class="guide-result"><p class="guide-result-type">'+(profile?'PERFIL DE ESTUDO':'CONCEITO · LEITURA DE APOIO')+'</p><h3>'+esc(e.title)+'</h3>'+(profile?'<p class="guide-meta">'+esc(e.period)+' · '+esc(e.area)+'</p>':'')+'<p>'+esc(e.summary)+'</p><details><summary>Entender melhor <span aria-hidden="true">⌄</span></summary><div class="guide-detail">'+(profile?'<p class="guide-meta">'+esc(e.movement)+'</p>':'')+e.body.map(p=>'<p>'+esc(p)+'</p>').join('')+(e.works?'<h4>Obras e produções</h4><p>'+esc(e.works.join('; '))+'</p>':'')+'<h4>Na hora de ler a questão</h4><p>'+esc(e.tip)+'</p>'+(e.trap?'<h4>Um cuidado</h4><p>'+esc(e.trap)+'</p>':'')+(e.example?'<div class="guide-example"><strong>Exemplo autoral</strong><p>'+esc(e.example)+'</p></div>':'')+(e.people?.length?'<h4>Para estudar junto</h4><div class="guide-tags">'+e.people.map(p=>'<button type="button" data-guide-query="'+esc(p)+'">'+esc(p)+'</button>').join('')+'</div><small class="guide-caution">A relação de estudo não comprova citação da pessoa em uma prova.</small>':'')+(e.concepts?.length?'<div class="guide-tags">'+e.concepts.map(c=>'<button type="button" data-guide-query="'+esc(c)+'">'+esc(c)+'</button>').join('')+'</div>':'')+'<div class="guide-sources">'+sources(e.sources)+'</div></div></details></article>';
  }
  function results(){
    if(!entries.length)return;const found=select();
    $('studyGuideCount').textContent=found.length+' '+(found.length===1?'resultado':'resultados')+(query?' para “'+query+'”':' disponíveis');
    $('studyGuideResults').innerHTML=found.length?found.slice(0,limit).map(card).join(''):'<div class="guide-empty"><h3>Nada com essa busca ainda.</h3><p>Tenta um nome, conceito ou obra. Ex.: alienação, Machado, variação linguística.</p></div>';
    $('studyGuideMore').hidden=found.length<=limit;
    for(const b of $('studyGuideKinds').querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.guideKind===kind));
  }
  async function open(value){
    const panel=$('studyGuidePanel');if(!panel)return;
    if(panel.hidden)lastFocus=document.activeElement;panel.hidden=false;$('studyGuideLauncher').setAttribute('aria-expanded','true');
    if(typeof value==='string'){query=value;limit=12;$('studyGuideSearch').value=query;}
    $('studyGuideSearch').focus({preventScroll:true});
    if(!entries.length){$('studyGuideCount').textContent='Abrindo os conceitos e perfis…';$('studyGuideResults').innerHTML='';}
    try{await ensure();results();}catch{if(panel.hidden)return;$('studyGuideCount').textContent='Não foi possível carregar a consulta.';$('studyGuideResults').innerHTML='<div class="guide-empty"><p>Confere tua conexão ou os arquivos do aplicativo e tenta novamente.</p><button type="button" class="outline" data-guide-retry>Tentar novamente</button></div>';}
  }
  function close(){const panel=$('studyGuidePanel');if(!panel||panel.hidden)return;panel.hidden=true;$('studyGuideLauncher').setAttribute('aria-expanded','false');lastFocus?.focus?.({preventScroll:true});}
  function init(){
    if(bound||!$('studyGuidePanel'))return;bound=true;
    $('studyGuideLauncher').onclick=()=>$('studyGuidePanel').hidden?open():close();$('studyGuideClose').onclick=close;
    $('studyGuideSearch').addEventListener('input',e=>{query=e.target.value;limit=12;clearTimeout(timer);timer=setTimeout(results,120);});
    $('studyGuidePanel').addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();close();}});
    $('studyGuidePanel').addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b)return;
      if(b.hasAttribute('data-guide-query')){query=b.dataset.guideQuery;limit=12;$('studyGuideSearch').value=query;results();$('studyGuideSearch').focus({preventScroll:true});$('studyGuideResults').scrollTop=0;}
      if(b.dataset.guideKind){kind=b.dataset.guideKind;limit=12;results();}
      if(b.id==='studyGuideMore'){limit+=12;results();}
      if(b.hasAttribute('data-guide-retry'))open();
    });
    document.addEventListener('click',e=>{if(e.target.closest('[data-study-guide-open]')){e.preventDefault();globalThis.FurgNavigation?.close();open();}});
  }
  globalThis.FurgStudyGuide={init,open,close,ensure,matches,select};
})();
