'use strict';
/* Biblioteca ENEM: data is loaded on first use; study progress is never changed. */
(() => {
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const typeNames={direct:'Citação nominal',work:'Obra sem citação nominal',concept:'Conexão conceitual sugerida'};
  const fieldNames={context:'Texto de apoio ou sua fonte',stem:'Comando da questão'};
  const conceptNotes={
    alienacao:'Alienação é uma relação de separação ou estranhamento. Em Marx, interessa especialmente sua produção pelas relações de trabalho; em Hegel, o problema se liga à consciência e à formação histórica. As acepções mudam entre autores.',
    'industria cultural':'Em Adorno e Horkheimer, o conceito relaciona a produção cultural como mercadoria à padronização e à dominação. Não é um rótulo para desprezar toda manifestação popular.',
    'contrato social':'Diferentes teorias justificam a autoridade política por um pacto. Hobbes, Locke e Rousseau divergem sobre estado de natureza, direitos e soberania.',
    'etnocentrismo':'É julgar outras culturas usando a própria como medida superior. A crítica antropológica exige atenção a contextos e à diversidade de formas de vida.',
    'antropofagia':'No modernismo brasileiro, a antropofagia propõe reelaborar influências culturais. O uso artístico da palavra difere de seu sentido literal.',
    'variacao linguistica':'Línguas variam entre regiões, grupos, situações e épocas. Identificar variação não significa negar o ensino da norma-padrão ou hierarquizar o valor das pessoas.',
    'lugar de fala':'O conceito interroga como posições sociais participam da produção e da circulação do conhecimento. Não equivale a impedir diálogo ou escuta.',
    'escrevivencia':'Em Conceição Evaristo, criação literária, experiência e memória coletiva se relacionam. Isso não torna todo enredo uma autobiografia literal.',
    'tropicalismo':'O movimento articula referências populares, eruditas e de massa em uma experimentação ligada às disputas culturais e políticas dos anos 1960.'
  };
  let adapter=null,ready=null,records=[],byId=new Map(),indexData=null,shell=false,count=12,searchTimer=null,questionScope='',focusedProfile=null;
  const filters={query:'',area:'',period:'',movement:'',frequency:'',type:'',sort:'relevance'};
  const expanded=new Set(),referenceLimits=new Map(),portraitRequests=new Map();
  let observer=null;
  function script(path,globalName){
    if(globalThis[globalName])return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const el=document.createElement('script');el.src=path+'?v=20261104-biblioteca';el.async=true;
      el.onload=()=>globalThis[globalName]?resolve():reject(Error('Conteúdo não disponível.'));
      el.onerror=()=>{el.remove();reject(Error('Falha no carregamento.'));};document.head.appendChild(el);
    });
  }
  async function ensure(){
    if(ready)return ready;
    ready=Promise.all([script('thinkers-data.js','FURG_THINKERS_DATA'),script('thinkers-index.js','FURG_THINKERS_INDEX')]).then(()=>{
      indexData=globalThis.FURG_THINKERS_INDEX;records=globalThis.FURG_THINKERS_DATA||[];byId=new Map(records.map(p=>[p.id,p]));
      for(const p of records)p._search=norm([p.name,p.fullName,p.area,p.period,p.movement,p.work,...p.concepts,p.idea,p.details,p.connections].join(' '));
      return records;
    }).catch(error=>{ready=null;throw error;});
    return ready;
  }
  const meta=p=>indexData?.profiles[String(p.id)]||{directCount:0,workCount:0,conceptCount:0,directYears:[],workYears:[],references:[]};
  function matches(p,selection=filters){
    const m=meta(p),terms=norm(selection.query).split(' ').filter(Boolean);
    if(terms.some(t=>!(p._search||norm(JSON.stringify(p))).includes(t)))return false;
    if(selection.area&&p.area!==selection.area||selection.period&&p.period!==selection.period||selection.movement&&p.movement!==selection.movement)return false;
    if(selection.frequency==='none'&&m.directCount!==0||selection.frequency==='1-2'&&(m.directCount<1||m.directCount>2)||selection.frequency==='3-5'&&(m.directCount<3||m.directCount>5)||selection.frequency==='6+'&&m.directCount<6)return false;
    let refs=m.references;if(questionScope)refs=refs.filter(r=>r.questionId===questionScope);
    if(questionScope&&!refs.length)return false;
    if(selection.type&&!refs.some(r=>r.type===selection.type))return false;
    return true;
  }
  function selected(){
    const list=records.filter(p=>matches(p));
    const term=norm(filters.query);
    return list.sort((a,b)=>{
      if(filters.sort==='name')return a.name.localeCompare(b.name,'pt-BR');
      if(filters.sort==='frequency')return meta(b).directCount-meta(a).directCount||a.name.localeCompare(b.name,'pt-BR');
      if(term){const rank=p=>(norm(p.name).includes(term)?30:0)+(p.concepts.some(c=>norm(c).includes(term))?15:0)+Math.min(5,meta(p).directCount);return rank(b)-rank(a)||a.id-b.id;}
      return a.id-b.id;
    });
  }
  const safeURL=s=>typeof s==='string'&&/^https:\/\/[^\s<>"']+$/.test(s)?s:'';
  const initials=name=>name.split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join('').toUpperCase();
  function photo(node){
    if(!node||node.dataset.loaded==='1')return;node.dataset.loaded='1';
    const title=node.dataset.wiki;let request=portraitRequests.get(title);
    if(!request){
      const query=new URLSearchParams({action:'query',format:'json',prop:'pageimages',pithumbsize:'220',redirects:'1',titles:title,origin:'*'});
      request=fetch('https://pt.wikipedia.org/w/api.php?'+query,{mode:'cors'}).then(r=>{if(!r.ok)throw Error('Imagem indisponível');return r.json();}).then(j=>Object.values(j.query?.pages||{}).find(p=>p.thumbnail?.source)?.thumbnail?.source||null).catch(()=>null);
      portraitRequests.set(title,request);
    }
    request.then(src=>{
      if(!src||!/^https:\/\/upload\.wikimedia\.org\//.test(src)||!node.isConnected)return;
      const img=new Image();img.alt='Retrato de '+node.dataset.name;img.loading='lazy';img.decoding='async';img.width=88;img.height=110;
      img.onload=()=>{if(node.isConnected){node.appendChild(img);node.classList.add('has-photo');}};img.src=src;
    });
  }
  function hydrate(){
    observer?.disconnect();const nodes=$('thinkersRoot')?.querySelectorAll('[data-wiki]')||[];
    if('IntersectionObserver' in globalThis){observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){observer.unobserve(e.target);photo(e.target);}}),{rootMargin:'220px'});nodes.forEach(n=>observer.observe(n));}else nodes.forEach(photo);
  }
  function selectHTML(id,label,key,options){return'<label class="knowledge-select" for="'+id+'">'+label+'<select id="'+id+'" data-knowledge-filter="'+key+'"><option value="">Todos</option>'+options.map(v=>'<option value="'+esc(v)+'" '+(filters[key]===v?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>';}
  function hero(){
    const direct=Object.values(indexData.profiles).filter(m=>m.directCount>0).length;
    return'<div class="knowledge-hero"><div><p class="eyebrow">BIBLIOTECA ENEM · PESSOAS, OBRAS E IDEIAS</p><h2>Entende a ideia.<br>Conecta com a prova.</h2><p>Da filosofia à canção: quem pensou, criou e ajudou a explicar o mundo. Pesquisa por nomes, conceitos, obras ou movimentos.</p><div class="knowledge-hero-links"><a href="#leituras" data-knowledge-readings>Rever as seis leituras ↗</a><a href="#enem" data-knowledge-bank>Consultar o banco ENEM ↗</a></div></div><div class="knowledge-numbers"><strong>'+records.length+'<small>perfis de estudo</small></strong><span>'+direct+' com citação nominal identificada</span><span>'+indexData.totalQuestions.toLocaleString('pt-BR')+' questões analisadas · '+indexData.years[0]+'–'+indexData.years.at(-1)+'</span></div></div>';
  }
  function shellHTML(){
    const options=key=>[...new Set(records.map(p=>p[key]))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
    return hero()+'<div class="knowledge-controls panel"><label class="knowledge-search" for="thinkerSearch"><span>Qual ideia tu quer entender?</span><input id="thinkerSearch" type="search" autocomplete="off" placeholder="Ex.: alienação, Epicuro, modernismo, Guernica…" value="'+esc(filters.query)+'"></label><div class="knowledge-filters">'+selectHTML('knowledgeArea','Área do conhecimento','area',options('area'))+selectHTML('knowledgePeriod','Período histórico','period',options('period'))+selectHTML('knowledgeMovement','Movimento ou corrente','movement',options('movement'))+'<label class="knowledge-select" for="knowledgeFrequency">Citações nominais no acervo<select id="knowledgeFrequency" data-knowledge-filter="frequency"><option value="">Qualquer quantidade</option>'+[['none','Nenhuma identificada'],['1-2','1 a 2 questões'],['3-5','3 a 5 questões'],['6+','6 ou mais questões']].map(([v,t])=>'<option value="'+v+'" '+(filters.frequency===v?'selected':'')+'>'+t+'</option>').join('')+'</select></label><label class="knowledge-select" for="knowledgeType">Tipo de vínculo com a prova<select id="knowledgeType" data-knowledge-filter="type"><option value="">Todos os vínculos</option>'+Object.entries(typeNames).map(([v,t])=>'<option value="'+v+'" '+(filters.type===v?'selected':'')+'>'+t+'</option>').join('')+'</select></label><label class="knowledge-select" for="knowledgeSort">Ordenar por<select id="knowledgeSort" data-knowledge-filter="sort">'+[['relevance','Relevância da busca'],['frequency','Mais citações nominais'],['name','Nome: A–Z']].map(([v,t])=>'<option value="'+v+'" '+(filters.sort===v?'selected':'')+'>'+t+'</option>').join('')+'</select></label></div><div class="knowledge-control-foot"><p>Uma conexão sugerida ajuda a estudar. Ela não conta como aparição do autor no ENEM.</p><button type="button" class="text-link" data-knowledge-clear>Limpar filtros</button></div></div><div id="knowledgeScope"></div><div id="knowledgeConcept"></div><p id="knowledgeCount" class="knowledge-count" aria-live="polite" role="status"></p><div id="knowledgeResults"></div><details class="knowledge-method panel"><summary>Como as citações e conexões foram identificadas</summary><p>O levantamento usa as '+indexData.totalQuestions.toLocaleString('pt-BR')+' questões presentes neste repositório, entre '+indexData.years[0]+' e '+indexData.years.at(-1)+'. Não é um censo de todas as aplicações e cores do ENEM.</p><ul><li><strong>Citação nominal:</strong> o nome foi identificado no apoio, na fonte, no comando ou em uma alternativa. O local e o trecho são mostrados. Citação na fonte não significa que a questão cobre a teoria do autor.</li><li><strong>Obra sem citação nominal:</strong> um título foi identificado, sem nome reconhecido da personalidade na mesma questão.</li><li><strong>Conexão conceitual sugerida:</strong> termos do apoio ou do comando permitem uma comparação didática com ideias do perfil. A relação é uma inferência, não uma aparição confirmada.</li></ul><p>Cada personalidade recebe no máximo um tipo de vínculo por questão, com prioridade para nome, depois obra e depois conexão. A frequência conta IDs de questões distintos; textos compartilhados podem aparecer em mais de uma questão. As conexões sugeridas são uma seleção de até 12 itens por perfil, não uma frequência de cobrança. Transcrições, iniciais e homônimos podem causar lacunas: confere o trecho e a prova original.</p><p>Retratos são carregados sob demanda via Wikipédia/Wikimedia. Quando a imagem não é encontrada ou a rede falha, as iniciais mantêm o perfil identificável. Os links dos perfis levam às referências e aos créditos.</p><a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener noreferrer">Consultar provas e gabaritos no Inep ↗</a></details>';
  }
  function referenceHTML(p,type){
    const m=meta(p),all=m.references.filter(r=>r.type===type&&(!questionScope||r.questionId===questionScope));if(!all.length)return'';
    const key=p.id+':'+type,limit=referenceLimits.get(key)||5;
    return'<section class="knowledge-reference-group"><h5>'+typeNames[type]+' <span>'+all.length+'</span></h5>'+all.slice(0,limit).map(r=>'<article class="knowledge-reference '+type+'"><div class="knowledge-reference-top"><strong>ENEM '+r.year+' · questão '+r.index+'</strong><span>'+esc(r.questionId)+'</span></div><p class="knowledge-location">'+esc(fieldNames[r.field]||(r.field.startsWith('alternative:')?'Alternativa '+r.field.split(':')[1]:r.field))+'</p><blockquote>'+esc(r.evidence.excerpt)+'</blockquote><p class="knowledge-reference-reason">'+esc(r.reason)+'</p><button type="button" class="text-link" data-knowledge-practice="'+p.id+'" data-question-id="'+esc(r.questionId)+'" data-reference-type="'+type+'">Abrir questão real ↗</button></article>').join('')+(all.length>limit?'<button type="button" class="quiet knowledge-more-refs" data-knowledge-more-ref="'+esc(key)+'">Mostrar mais referências ('+(all.length-limit)+' restantes)</button>':'')+'</section>';
  }
  function card(p){
    const m=meta(p);
    return'<article class="thinker-card" data-profile-id="'+p.id+'"><div class="thinker-intro"><div class="thinker-face" data-wiki="'+esc(p.wiki)+'" data-name="'+esc(p.name)+'"><span aria-hidden="true">'+esc(initials(p.name))+'</span></div><div><p class="thinker-meta">'+esc(p.area)+' · '+esc(p.period)+'</p><h3>'+esc(p.name)+'</h3><p class="thinker-movement">'+esc(p.movement)+'</p></div></div><p class="thinker-idea">'+esc(p.idea)+'</p><p class="thinker-work"><strong>Obras e produções:</strong> '+esc(p.works.join('; '))+'</p><div class="knowledge-concept-tags">'+p.concepts.map(c=>'<button type="button" data-knowledge-concept="'+esc(c)+'">'+esc(c)+'</button>').join('')+'</div><div class="knowledge-badges"><span class="direct">'+m.directCount+' '+(m.directCount===1?'citação nominal':'citações nominais')+'</span>'+(m.workCount?'<span class="work">'+m.workCount+' obra'+(m.workCount===1?'':'s')+' sem nome</span>':'')+(m.conceptCount?'<span class="concept">'+m.conceptCount+' '+(m.conceptCount===1?'conexão sugerida':'conexões sugeridas')+'</span>':'')+'</div><details class="thinker-more" data-profile-detail="'+p.id+'" '+(expanded.has(p.id)?'open':'')+'><summary>Ver mais <span aria-hidden="true">⌄</span></summary><div class="thinker-expanded">'+(p.fullName!==p.name?'<p class="knowledge-full-name"><strong>Nome completo:</strong> '+esc(p.fullName)+'</p>':'')+'<h4>O que tu precisa entender</h4><p>'+esc(p.details)+'</p><h4>Conexões históricas e sociais</h4><p>'+esc(p.connections)+'</p><h4>Para ler a prova</h4><p>'+esc(p.exam)+'</p><p class="knowledge-years"><strong>Anos com citação nominal identificada:</strong> '+(m.directYears.length?m.directYears.join(', '):'nenhum neste levantamento')+'.</p><p class="knowledge-count-note">Esses números descrevem o acervo local. Não são previsão nem estatística oficial de incidência.</p>'+Object.keys(typeNames).filter(t=>!filters.type||filters.type===t).map(t=>referenceHTML(p,t)).join('')+(!m.references.length?'<p class="knowledge-no-references">Ainda não há ligação documentada para este perfil. O conteúdo serve como referência de estudo, sem alegação de aparição no ENEM.</p>':'')+(p.related?.length?'<section class="knowledge-related"><h4>Continua a conexão</h4>'+p.related.map(id=>byId.get(id)).filter(Boolean).map(o=>'<button type="button" class="text-link" data-knowledge-profile="'+o.id+'">'+esc(o.name)+' ↗</button>').join('')+'</section>':'')+'<h4>Referências para aprofundar</h4><ul class="knowledge-sources">'+p.sources.filter(s=>safeURL(s.url)).map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.label)+' ↗</a></li>').join('')+'</ul></div></details></article>';
  }
  function renderResults(){
    if(!shell)return;clearTimeout(searchTimer);const list=selected(),visible=list.slice(0,count);
    $('knowledgeCount').textContent=list.length+' '+(list.length===1?'perfil encontrado':'perfis encontrados')+' · mostrando '+visible.length;
    const scoped=(globalThis.FURG_ENEM_DATA?.questions||[]).find(q=>q.id===questionScope);
    $('knowledgeScope').innerHTML=questionScope?'<div class="knowledge-scope panel"><div><small>PARTINDO DE UMA QUESTÃO REAL</small><strong>'+esc(scoped?'ENEM '+scoped.year+' · questão '+scoped.index:questionScope)+'</strong><p>Os perfis abaixo têm um vínculo documentado ou sugerido com este item.</p></div><button type="button" class="text-link" data-knowledge-unlink>Ver toda a biblioteca</button></div>':'';
    const key=norm(filters.query),note=conceptNotes[key];
    $('knowledgeConcept').innerHTML=note?'<aside class="knowledge-concept-guide"><span class="eyebrow">ENTENDE O CONCEITO</span><h3>'+esc(filters.query)+'</h3><p>'+esc(note)+'</p></aside>':'';
    $('knowledgeResults').innerHTML=visible.length?'<div class="thinkers-grid">'+visible.map(card).join('')+'</div>'+(list.length>visible.length?'<button type="button" class="outline thinkers-load" id="thinkersMore">Mostrar mais '+Math.min(12,list.length-visible.length)+' perfis ↓</button>':''):'<div class="panel knowledge-empty"><h3>Nenhum perfil com esses filtros.</h3><p>Experimenta outra palavra, amplia os filtros ou consulta toda a biblioteca. Uma ausência de resultado não comprova ausência no exame.</p><button type="button" class="outline" data-knowledge-clear>Limpar filtros</button></div>';
    hydrate();
  }
  async function render(){
    const root=$('thinkersRoot');if(!root)return;
    if(!records.length)root.innerHTML='<div class="panel knowledge-loading" role="status">Abrindo a biblioteca de ideias…</div>';
    try{await ensure();if(!shell){root.innerHTML=shellHTML();shell=true;}renderResults();if(document.querySelector('.view.active')?.id==='biblioteca')$('coverage').textContent=records.length+' perfis · ENEM '+indexData.years[0]+'–'+indexData.years.at(-1);}catch(error){shell=false;root.innerHTML='<div class="panel knowledge-empty"><h3>Não foi possível abrir a biblioteca.</h3><p>Confere se os arquivos do projeto estão completos e tenta novamente.</p><button type="button" class="outline" data-knowledge-retry>Tentar novamente</button></div>';}
  }
  function reset(){Object.assign(filters,{query:'',area:'',period:'',movement:'',frequency:'',type:'',sort:'relevance'});count=12;questionScope='';focusedProfile=null;shell=false;render();}
  async function open(options={}){
    if(typeof options==='string')options={query:options};
    if(options.questionId){questionScope=options.questionId;Object.assign(filters,{query:'',area:'',period:'',movement:'',frequency:'',type:'',sort:'relevance'});}
    if(options.query!==undefined){filters.query=String(options.query);questionScope='';}
    count=12;shell=false;adapter?.setView('biblioteca');await render();
    if(options.focus!==false)$('thinkerSearch')?.focus({preventScroll:true});
  }
  function init(value){
    if(adapter)return;adapter=value;
    const root=$('thinkersRoot');if(!root)return;
    root.addEventListener('input',e=>{if(e.target.id!=='thinkerSearch')return;filters.query=e.target.value;count=12;clearTimeout(searchTimer);searchTimer=setTimeout(renderResults,120);});
    root.addEventListener('change',e=>{const key=e.target.dataset.knowledgeFilter;if(!(key in filters))return;filters[key]=e.target.value;count=12;renderResults();});
    root.addEventListener('toggle',e=>{const id=Number(e.target.dataset.profileDetail);if(!id)return;if(e.target.open)expanded.add(id);else expanded.delete(id);},true);
    root.addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b||b.disabled)return;
      if(b.id==='thinkersMore'){count+=12;renderResults();return;}
      if(b.hasAttribute('data-knowledge-clear')){reset();return;}
      if(b.hasAttribute('data-knowledge-retry')){render();return;}
      if(b.hasAttribute('data-knowledge-unlink')){questionScope='';count=12;renderResults();return;}
      if(b.dataset.knowledgeConcept!==undefined){filters.query=b.dataset.knowledgeConcept;count=12;$('thinkerSearch').value=filters.query;renderResults();$('thinkerSearch').focus({preventScroll:true});return;}
      if(b.dataset.knowledgeProfile){const p=byId.get(Number(b.dataset.knowledgeProfile));if(!p)return;Object.assign(filters,{query:p.name,area:'',period:'',movement:'',frequency:'',type:'',sort:'relevance'});questionScope='';count=12;expanded.add(p.id);shell=false;render();return;}
      if(b.dataset.knowledgeMoreRef){const key=b.dataset.knowledgeMoreRef;referenceLimits.set(key,(referenceLimits.get(key)||5)+6);renderResults();return;}
      if(b.dataset.knowledgePractice){const p=byId.get(Number(b.dataset.knowledgePractice));if(!p)return;const refs=meta(p).references.filter(r=>r.type===b.dataset.referenceType);globalThis.FurgEnem?.practice(refs.map(r=>r.questionId),'Biblioteca ENEM · '+p.name,b.dataset.questionId,'biblioteca');}
    });
    document.addEventListener('click',e=>{
      const a=e.target.closest('[data-knowledge-open],[data-knowledge-question],[data-knowledge-readings],[data-knowledge-bank]');if(!a)return;e.preventDefault();
      if(a.hasAttribute('data-knowledge-readings')){adapter.setView('leituras');return;}
      if(a.hasAttribute('data-knowledge-bank')){adapter.setView('enem');return;}
      open(a.dataset.knowledgeQuestion?{questionId:a.dataset.knowledgeQuestion}:{});
    });
  }
  globalThis.FurgThinkers={init,render,open,ensure,count:()=>records.length,search:q=>open({query:q}),filter:area=>{filters.area=area;count=12;shell=false;return render();},matches,selection:()=>({...filters}),referencesForQuestion:id=>indexData?.questions[id]||[],getProfile:id=>byId.get(Number(id))};
})();
