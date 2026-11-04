'use strict';
/* Complementos não destrutivos à área Leituras: dicas de prova e capas reais,
   quando disponíveis em catálogos públicos. Não altera progresso de estudo. */
(() => {
  const root=document.getElementById('readingRoot');
  const books=globalThis.FURG_READING_DATA||[];
  if(!root||!books.length)return;
  const guides={
    'papeis-avulsos':[
      'São doze narrativas independentes. Identifica o narrador de cada uma e como a ironia desmonta o prestígio das personagens.',
      'Em O alienista, acompanha a mudança dos critérios de normalidade: ciência, autoridade e poder entram em conflito.',
      'Em O espelho, a farda e o olhar dos outros participam da construção da identidade.',
      'Em Teoria do medalhão, o pai ensina a parecer importante; a sátira não equivale a um conselho literal do autor.'
    ],
    'hora-da-estrela':[
      'Macabéa vive a invisibilidade social; presta atenção ao trabalho, à migração, à pobreza e à linguagem usada para descrevê-la.',
      'Rodrigo S. M. é um narrador-personagem que comenta o próprio ato de escrever: isso é metalinguagem.',
      'Distingue o que Macabéa sente do que o narrador presume sobre ela; o ponto de vista não é neutro.',
      'Repara no título, no destino da personagem e na tensão entre vida banal e representação literária.'
    ],
    'olhos-dagua':[
      'Os contos dão centralidade a mulheres negras, afetos, violência, memória e desigualdade, sem reduzir suas personagens ao sofrimento.',
      'A escrevivência relaciona criação literária, experiência e memória coletiva; não significa que cada enredo seja autobiográfico.',
      'No conto-título, acompanha a busca pelas lembranças da mãe e a força simbólica dos olhos e da água.',
      'Observa narradores, vozes, imagens poéticas e diferenças entre os contos; evita generalizações sobre a coletânea.'
    ],
    'vila-sapo':[
      'Relaciona os conflitos das personagens ao território, às relações de classe e às desigualdades da cidade.',
      'Presta atenção à oralidade, aos registros de fala e ao modo como a linguagem situa personagens socialmente.',
      'Identifica como poder, violência, trabalho e escolhas individuais aparecem nas histórias, sem confundir ficção com estatística.',
      'Analisa quem narra, quais vozes são valorizadas e que estereótipos a escrita confronta.'
    ],
    'ritos-passagem':[
      'A poesia de Ana Paula Tavares trabalha corpo feminino, ancestralidade, rituais e elementos culturais de Angola.',
      'Procura imagens da natureza, da fertilidade e do cotidiano, sem tratar tradições africanas como homogêneas.',
      'Relaciona as imagens poéticas à autonomia das mulheres e às tensões entre costumes e transformação.',
      'Observa ritmo, metáfora, eu lírico e contexto pós-colonial na interpretação.'
    ],
    'utero-punho':[
      'Identifica a crítica às normas que tentam definir o que uma mulher pode ser ou desejar.',
      'O humor, a repetição, a colagem de frases e a experimentação verbal são recursos centrais.',
      'Distingue a voz do poema das ideias que ele cita ou parodia: muitas frases reproduzem estereótipos para criticá-los.',
      'Relaciona corpo, gênero, linguagem e construção social sem reduzir cada poema a uma única interpretação.'
    ]
  };
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&#39;'}[c]));
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,'').trim();
  const cache=new Map();
  function imageFor(book){
    if(cache.has(book.id))return cache.get(book.id);
    const task=(async()=>{
      try{
        const query='https://openlibrary.org/search.json?'+new URLSearchParams({title:book.title,author:book.author,limit:'5',fields:'title,author_name,cover_i'});
        const res=await fetch(query);
        if(!res.ok)throw Error('catalog unavailable');
        const records=(await res.json()).docs||[];
        const matching=records.find(r=>r.cover_i&&normalize(r.title).includes(normalize(book.title))&&((r.author_name||[]).some(a=>normalize(a).includes(normalize(book.author)))));
        if(matching)return 'https://covers.openlibrary.org/b/id/'+matching.cover_i+'-M.jpg';
      }catch(_){}
      try{
        const q='https://www.googleapis.com/books/v1/volumes?'+new URLSearchParams({q:'intitle:"'+book.title+'" inauthor:"'+book.author+'"',maxResults:'6',printType:'books'});
        const res=await fetch(q);
        if(!res.ok)throw Error('catalog unavailable');
        const items=(await res.json()).items||[];
        const item=items.find(v=>normalize(v.volumeInfo?.title||'').includes(normalize(book.title)) && (v.volumeInfo?.authors||[]).some(a=>normalize(a).includes(normalize(book.author))));
        const url=item?.volumeInfo?.imageLinks?.thumbnail;
        if(url)return url.replace(/^http:/,'https:').replace(/&zoom=\d/g,'&zoom=1');
      }catch(_){}
      return null;
    })();
    cache.set(book.id,task);
    return task;
  }
  function applyCover(cover,book){
    if(!cover||!book||cover.dataset.mediaBound==='1')return;
    cover.dataset.mediaBound='1';
    imageFor(book).then(src=>{
      if(!src||!cover.isConnected)return;
      const img=new Image();
      img.alt='Capa de '+book.title;
      img.className='book-cover-art';
      img.loading='lazy';
      img.decoding='async';
      img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true});
      img.addEventListener('error',()=>img.remove(),{once:true});
      img.src=src;
      cover.appendChild(img);
    });
  }
  function apply(){
    root.querySelectorAll('.book-card').forEach(card=>{
      const book=books.find(b=>b.id===card.dataset.book);
      applyCover(card.querySelector('.book-cover'),book);
    });
    const title=root.querySelector('#readingTitle')?.textContent;
    const selected=books.find(b=>b.title===title);
    if(selected)applyCover(root.querySelector('.book-heading .book-cover'),selected);
    const summary=root.querySelector('.summary-content');
    if(summary&&selected&&!summary.querySelector('.book-exam-guide')){
      const guide=document.createElement('section');
      guide.className='book-exam-guide';
      guide.innerHTML='<h3>★ O principal que tu precisa saber para a prova</h3><ul>'+(guides[selected.id]||[]).map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul>';
      const target=summary.querySelector('.summary-sections')||summary.querySelector('.original-access');
      if(target)summary.insertBefore(guide,target);else summary.appendChild(guide);
    }
  }
  if(typeof MutationObserver!=='undefined'){
    let busy=false;
    new MutationObserver(()=>{if(busy)return;busy=true;queueMicrotask(()=>{busy=false;apply();});}).observe(root,{subtree:true,childList:true});
  }
  apply();
})();