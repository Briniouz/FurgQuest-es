'use strict';
/* Presentation only. No mutations, edits or summaries of official questions. */
(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const publication=/(?:https?:\/\/|www\.|\bIn\s*[:.]|Dispon[ií]vel em|Acesso em|[A-ZÀ-Ý][a-zà-ÿ]+(?:\s+(?:[A-ZÀ-Ý][a-zà-ÿ]+|de|do)){0,3}\s*:\s*[A-ZÀ-Ý]|\b(?:Revista|Cadernos|Afro-Ásia)\b|\b[vmnV]\.\s*\d)/;
  const signature=/^[A-ZÀ-Ý][A-ZÀ-Ý'’\-. ]{1,80}[,.]\s*(?:[A-ZÀ-Ý|]\.\s*)/;
  function citationStart(line,tail){
    const s=line.trim().replace(/[*_]/g,'');
    if(!s||/^!\[/.test(s)||/^TEXTO\s+[IVX\d]+\b/i.test(s))return false;
    if(/^(?:Dispon[ií]vel em\s*:|Acesso em\s*:|Fonte\s*:)/i.test(s))return true;
    const caps=/^\(?[A-ZÀ-Ý][A-ZÀ-Ý'’\-]+(?:\s+(?:[A-ZÀ-Ý][A-ZÀ-Ý'’\-]+|[a-zà-ÿ]{1,3})){0,5}\s*[,\.]\s*/.test(s);
    // A year or a capitalized place in the prose is not a bibliography.
    // Do not look through a blank line into the actual citation below it.
    const paragraph=tail.split(/\n\s*\n/)[0].slice(0,650).replace(/[*_]/g,'');
    const cue=publication.exec(paragraph);
    const bibliography=!!cue||(paragraph.length<=330&&/\b(?:1[5-9]|20)\d{2}\b/.test(paragraph));
    if(signature.test(s)&&/\b(?:1[5-9]|20)\d{2}\b/.test(tail.slice(0,850)))return true;
    if(caps&&bibliography&&/^[^,.]+[,.]\s+[A-ZÀ-Ý]/.test(s)&&!/[!?]/.test(paragraph.slice(0,cue?.index??paragraph.length)))return true;
    if(/^\([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+(?:[A-ZÀ-Ý][a-zà-ÿ]+|de|da|do|dos|das|e)){1,7}(?:[.,][\s\S]*)?\)\s*$/.test(s))return true;
    if(/^[A-ZÀ-Ý][a-zà-ÿ]+(?:\s+(?:[A-ZÀ-Ý][a-zà-ÿ]+|de|da|do|dos|das|e)){1,6}\.\s+/.test(s)&&bibliography)return true;
    if(/^(?:Correio Braziliense|Globo Rural|Ci[eê]ncia Hoje[^,\n]{0,40}|Caderno Sa[uú]de P[uú]blica|Scientific American Brasil|Terra da Gente|L[ií]ngua Portuguesa|Hist[oó]ria Viva|Revista\b[^,\n]{0,100}|Folha de S\. Paulo|O Globo)[,.]/.test(s)&&bibliography)return true;
    if(/^(?:In\s+[A-ZÀ-Ý]|Adap\.\s+[A-ZÀ-Ý]|By The Washington Times\b|[A-ZÀ-Ý][a-zà-ÿ]+,\s+[A-ZÀ-Ý] [A-ZÀ-Ý]\.)/.test(s)&&/\b(?:19|20)\d{2}\b/.test(tail.slice(0,400)))return true;
    if(/^[A-ZÀ-Ý][a-zà-ÿ]+(?:\s+(?:[A-ZÀ-Ý][a-zà-ÿ]+|de|da|do|dos|das|e)){1,7},/.test(s)&&paragraph.length<=330&&(/Dispon[ií]vel em/.test(paragraph)||/,\s*(?:19|20)\d{2}\s*$/.test(s)))return true;
    return false;
  }
  function partition(value){
    const text=String(value??'');
    if(!text)return[];
    const lines=[...text.matchAll(/[^\n]*(?:\n|$)/g)].filter(m=>m[0]);
    const ranges=[];let sourceStart=-1;
    for(let i=0;i<lines.length;i++){
      const m=lines[i],line=m[0],at=m.index,trimmed=line.trim();
      const boundary=!trimmed||/^TEXTO\s+[IVX\d]+\b/i.test(trimmed)||/^!\[/.test(trimmed);
      if(sourceStart>=0&&boundary){ranges.push([sourceStart,at]);sourceStart=-1;}
      if(sourceStart<0&&citationStart(line,text.slice(at)))sourceStart=at;
    }
    if(sourceStart>=0)ranges.push([sourceStart,text.length]);
    // Some transcriptions (notably recent exams) put quote, bibliography and
    // prompt on the same line. Require a publisher/place or access cue so an
    // ordinary capitalized sentence is never enough to identify a citation.
    const inline=/\b[A-ZÀ-Ý][A-ZÀ-Ý'’.\-]{2,}(?:\s+(?:[A-ZÀ-Ý][A-ZÀ-Ý'’.\-]+|de|da|do|e)){0,4}\s*[,\.]\s+[*_]*(?=[A-ZÀ-Ý|](?:\.|[a-zà-ÿ]))/g;
    for(const match of text.matchAll(inline)){
      const signed=signature.test(text.slice(match.index).replace(/[*_]/g,''));
      // Roman-numbered centuries in prose are not unsigned author names.
      if(!signed&&/^[IVXLCDM]+\s*[,\.]/.test(match[0]))continue;
      const tail=text.slice(match.index,match.index+750).split(signed?/\bTEXTO\s+[IVX\d]+\b/:/\n\s*\n|\bTEXTO\s+[IVX\d]+\b/)[0];
      const cue=publication.exec(tail);
      if(!cue)continue;
      if(!signed&&/[!?]/.test(tail.slice(0,cue.index)))continue;
      // Dates in a title (e.g. 1890–1914) are not the publication's end.
      const end=/\b(?:1[5-9]|20)\d{2}\b(?:[ \t.*_]|\((?:adaptado|fragmento)\))*/.exec(tail.slice(cue.index));
      if(end)ranges.push([match.index,match.index+cue.index+end.index+end[0].length]);
    }
    const access=/Dispon[ií]vel em\s*:[\s\S]{1,330}?Acesso em\s*:\s*\d{1,2}\s*(?:de\s+)?[a-zçãé]+\.?\s*(?:de\s+)?(?:19|20)\d{2}(?:[ \t.*_]|\((?:adaptado|fragmento)\))*/gi;
    for(const match of text.matchAll(access))ranges.push([match.index,match.index+match[0].length]);
    ranges.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
    const merged=[];
    for(const range of ranges){const last=merged.at(-1);if(last&&range[0]<=last[1])last[1]=Math.max(last[1],range[1]);else merged.push([...range]);}
    const parts=[];let cursor=0;
    for(const[start,end]of merged){
      if(start>cursor)parts.push({type:'support',text:text.slice(cursor,start)});
      if(end>start)parts.push({type:'source',text:text.slice(start,end)});
      cursor=end;
    }
    if(cursor<text.length)parts.push({type:'support',text:text.slice(cursor)});
    return parts.length?parts:[{type:'support',text}];
  }
  function body(q,markdown,image){
    const parts=structure(q);
    const seen=(q.context||'')+(q.stem||'')+(q.alternatives||[]).map(a=>(a.text||'')+(a.file||'')).join('');
    const extra=(q.files||[]).filter(path=>!seen.includes(path));
    let support=0;
    const figures=extra.length?'<section class="enem-support enem-support-figures" aria-label="Figuras da questão"><h4>Figuras da questão</h4>'+extra.map(p=>image(p)).join('')+'</section>':'';
    let figuresPlaced=false;
    const context=parts.map(p=>{
      if(p.type==='figure')return'<section class="enem-support enem-support-figures" aria-label="Figura do enunciado">'+image(p.file,p.alt)+'</section>';
      if(p.type==='transcription-spill')return'';
      if(!p.text.trim())return markdown(p.text);
      if(p.type==='source')return'<aside class="enem-bibliography" aria-label="Fonte bibliográfica"><h4>Fonte bibliográfica</h4><div>'+markdown(p.text)+'</div></aside>';
      if(p.type==='prompt'){const before=figuresPlaced?'':figures;figuresPlaced=true;return before+'<section class="enem-prompt" aria-label="Comando da questão"><h4>Comando da questão</h4><div>'+markdown(p.text)+'</div></section>';}
      return'<section class="enem-support" aria-label="Texto de apoio"><h4>'+(support++?'Continuação do texto de apoio':'Texto de apoio')+'</h4><div>'+markdown(p.text)+'</div></section>';
    }).join('');
    return'<div class="enem-text enem-structured-text">'+context+(figuresPlaced?'':figures)+'</div>';
  }
  function structure(q){
    const parts=partition(q.context);
    if(q.stem){parts.push({type:'prompt',text:q.stem,field:'stem'});return presentation(q,parts);}
    const last=parts.at(-1),before=parts.at(-2);
    // Relabel an unambiguous tail after a bibliographic source. Text is kept
    // byte-for-byte in its original order, including punctuation and spacing.
    const command=/^\s*(?:\*{0,2})?(?:No\b|Na\b|Nos\b|Nas\b|O\b|A\b|Os\b|As\b|Ao\b|De\b|Do\b|Da\b|Com\b|Para\b|Qual\b|Quais\b|Segundo\b|Considerando\b|Essa\b|Esse\b|Esses\b|Ness[ae]\b|Nesse\b|Diante\b|Comparando\b|Em\b|Pelo\b|Pela\b)/;
    if(last?.type==='support'&&before?.type==='source'&&last.text.trim().length>=18&&command.test(last.text))last.type='prompt';
    if(last&&last.type!=='prompt'){
      // A complete access date ends the citation even when the command starts
      // with a person's name rather than an article or a question word.
      const accessed=[...last.text.matchAll(/Acesso em\s*:\s*\d{1,2}\s*(?:de\s+)?[a-zçãé]+\.?\s*(?:de\s+)?(?:19|20)\d{2}(?:[ \t.*_]|\((?:adaptado|fragmento)\))*/gi)].at(-1);
      if(accessed){
        const at=accessed.index+accessed[0].length,tail=last.text.slice(at);
        if(tail.trim().length>=18&&/^\s*[*_]*[A-ZÀ-Ý]/.test(tail)){last.text=last.text.slice(0,at);parts.push({type:'prompt',text:tail});}
      }
    }
    if(last&&parts.at(-1).type!=='prompt'){
      const ends=[...last.text.matchAll(/\b(?:1[5-9]|20)\d{2}\b(?:[ \t.*_]|\((?:adaptado|fragmento)\))*/g)];
      for(const end of ends.reverse()){
        const at=end.index+end[0].length,tail=last.text.slice(at),head=last.text.slice(0,at);
        if(tail.trim().length>=18&&command.test(tail)&&/(?:Acesso em\s*:|Dispon[ií]vel em\s*:|[A-ZÀ-Ý][a-zà-ÿ]+\s*:|\b[vmn]\.\s*\d)/.test(head.slice(-700))){last.text=head;parts.push({type:'prompt',text:tail});break;}
      }
    }
    // Short standalone questions need no invented supporting text.
    if(parts.length===1&&parts[0].type==='support'&&parts[0].text.length<450&&command.test(parts[0].text))parts[0].type='prompt';
    return presentation(q,parts);
  }
  function fingerprint(q){
    const raw=JSON.stringify([q.context||'',q.stem||'',q.alternatives||[]]);
    let hash=2166136261;for(let i=0;i<raw.length;i++)hash=Math.imul(hash^raw.charCodeAt(i),16777619);
    return(hash>>>0).toString(16).padStart(8,'0');
  }
  function presentation(q,parts){
    const repair=globalThis.FURG_ENEM_PRESENTATION?.questions?.[q.id];
    if(!repair||repair.fingerprint!==fingerprint(q))return parts;
    if(repair.contextSpill){
      // Explicit, PDF-verified imports of a previous question's choices.
      // Retain every raw character in structure(), but don't display the spill.
      if(q.context===repair.contextSpill)for(const part of parts)if(part.field!=='stem')part.type='transcription-spill';
    }
    for(const figure of repair.figures||[]){
      const field=figure.field||'context',raw=String(q[field]||''),at=raw.indexOf(figure.before);
      if(at<0||raw.indexOf(figure.before,at+1)>=0)continue;
      let offset=0;
      for(let i=0;i<parts.length;i++){
        const part=parts[i];if(part.type==='figure'||(part.field==='stem'?'stem':'context')!==field)continue;
        if(at>=offset&&at<offset+part.text.length){
          const local=at-offset,split=[];
          if(local)split.push({...part,text:part.text.slice(0,local)});
          split.push({type:'figure',text:'',file:figure.file,alt:figure.alt,field:part.field});
          split.push({...part,text:part.text.slice(local)});parts.splice(i,1,...split);break;
        }
        offset+=part.text.length;
      }
    }
    return parts;
  }
  function solution(q,markdown){
    const candidate=globalThis.FURG_ENEM_SOLUTIONS?.[q.id];
    const authored=candidate?.answerExpected===q.answer?candidate:null;
    const correct=(q.alternatives||[]).find(a=>a.letter===q.answer);
    const explanation=authored
      ?'<p class="enem-resolution-credit">Comentário de estudo autoral · separado do conteúdo oficial</p>'+authored.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')
      :'<p class="enem-resolution-pending">Este item ainda não tem resolução comentada autoral. O gabarito e a alternativa correta estão disponíveis para conferência com a prova original.</p>';
    return'<section class="enem-resolution" aria-label="Explicação e resolução"><h4>Explicação e resolução</h4><p class="enem-resolution-key"><strong>Gabarito oficial: '+esc(q.answer)+'</strong></p>'+(correct?'<details class="enem-correct-text"><summary>Conferir o texto da alternativa correta</summary>'+markdown(correct.text)+'</details>':'')+explanation+'<a class="text-link" href="#biblioteca" data-knowledge-question="'+esc(q.id)+'">Explorar autores e conceitos desta questão ↗</a></section>';
  }
  globalThis.FurgEnemLayout={partition,structure,body,solution,fingerprint};
})();
