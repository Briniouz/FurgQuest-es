'use strict';
(() => {
  const area='ciencias-natureza';
  const levels={1:'Fácil',2:'Média',3:'Difícil'};
  const sources={
    caderno:{label:'por caderno',hint:'Terços do caderno azul de Natureza, ordenados pelo parâmetro B dos microdados do Inep.'},
    ficha:{label:'curadoria',hint:'Nível didático da ficha do mapa de conceitos.'},
    estimada:{label:'estimada',hint:'Estimativa pelo tipo de raciocínio, pelos conceitos e pelos dados do enunciado.'},
  };

  // ITENS_PROVA do Inep, espelhados em github.com/ProfGabrielRibeiro/MICRODADOS-ENEM/tree/main/dados.
  // Cadernos azuis conferidos pela sequência completa do gabarito. Em 2016/2017 a
  // numeração dos microdados é deslocada em relação à prova, com a mesma ordem.
  // Os níveis seguem a posição na prova do acervo. Zero indica ausência de parâmetro validado.
  const booklets={
    2015:{first:46, levels:'111221332322113221323113331223331223122112313', keys:'DCCDBCAAEBECBAADADBDEDEEBBBCABCCEAAEEDCBDDCEA'}, // CO_PROVA 235
    2016:{first:46, levels:'131323223211332223213113313112333122212231211', keys:'BCADBCEDCCBADBDCADBEBDBEADCCAEACDBEDBCACAEBEE'}, // CO_PROVA 291
    2017:{first:91, levels:'212122231113321133113232131323233313121213222', keys:'DEEBDABCBBEDDCBABCADECEBAADAAECDCBCCDACDEEAAE'}, // CO_PROVA 391
    2018:{first:91, levels:'221222112122233132331212131213332131113331233', keys:'BDDEDBCACEBCCACDCDDAECAADBDBCEEAEAABEBEBBACED'}, // CO_PROVA 447
    2019:{first:91, levels:'221131111113212312333321123323301233322232212', keys:'AAECACDEADCBCDDDBCBDADAEABCEBAB-EBCBEECEBDADC'}, // CO_PROVA 503
    2020:{first:91, levels:'112222123313313222333113132223213131131321220', keys:'DDBACBDDDECDAEDCCCEDBDDCBDDCAAECEDDACCBAEDCD-'}, // CO_PROVA 597
    2021:{first:91, levels:'221311131121223331221122333032312133123321322', keys:'EDECABEDABCBEBACCDCBBEEBBCB-AAECDCBDCDBBBADCD'}, // CO_PROVA 909/1011
    2022:{first:91, levels:'223322231323212333111002231102313223313111201', keys:'ADBADABEABCEEEACCBDDA--CBBCC-EBAEBEBEACCCDD-E'}, // CO_PROVA 1085/1187
    2023:{first:91, levels:'111332113132321132233332233223132121312111222', keys:'DBEABDABDCACDBECDDDBCAAABBACCCADEBECCCEDAEEED'}, // CO_PROVA 1221
    2024:{first:91, levels:'131331332312332212112121321232312122110233332', keys:'BCEAACDEDCAAEDDDEBBDDBECCAEDBBAAACCAEE-CBBCED'}, // CO_PROVA 1419
    2025:{first:91, levels:'112211111121212213222231223333330303211330323', keys:'DDCDCBDDCDAEAAEAECEEBDBBCCDCBBBD-B-DCEAEE-ABA'}, // CO_PROVA 1483
  };
  const curated=new Map(Object.values(globalThis.FURG_DIA2_CONCEPTS||{})
    .flatMap(paths=>paths.flatMap(path=>path.rows.flat().map(card=>[card.exam[0],card.exam.slice(1)]))));
  const normalize=value=>String(value||'').replace(/!\[[^\]]*\]\([^)]+\)/g,' ')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();

  function estimate(q){
    const text=normalize((q.context||'')+' '+(q.stem||''));
    const command=normalize(q.stem)||text.slice(-240);
    const numeric=q.alternatives.filter(item=>/^\s*[+\-−]?\d/.test(item.text||'')).length>=3;
    const calculate=numeric||/\b(?:calcule|calcular|quantos?|quantas?|qual (?:e )?o valor|valor (?:mais proxim|minim|maxim))/.test(command);
    const data=/\b(?:grafico|tabela|quadro|heredograma|diagrama|esquema)\b/.test(text)||
      q.alternatives.filter(item=>item.file).length>=3;
    const compare=/\b(?:respectivamente|simultaneamente|ao mesmo tempo|em duas etapas|comparando|relacao entre)\b/.test(command);
    const model=/\b(?:despreze|desprezando|mantendo[ -]se|considerando constantes?|regime permanente|mesmas condicoes|massa molar)\b/.test(text);
    const infer=/\b(?:explica\w*|justifica\w*|consequencia|causa|mecanismo|devido)\b/.test(command);
    const concepts=new Set(text.match(/\b(?:estequiometri\w*|entalpia|isomeri\w*|oxirreducao|eletrolise|solubilidade|equilibrio quimico|meia[ -]vida|energia cinetica|forca resultante|quantidade de movimento|coliso\w*|ressonancia|interferencia|inducao|difrat\w*|refracao|circuito|resistor\w*|radioativ\w*|heredograma|recombinacao|fosforilacao|transcricao|alel\w*|osmose|epistasi\w*)\b/g)||[]);
    const numericalData=calculate?(text.match(/\b\d+(?:[,.]\d+)?\s*(?:kg|mg|km|mol|kwh|kw|cm|hz|ml|pa|mm|m\/s|s|w|n|j|%)(?![a-z])/g)||[]).length:0;
    return [calculate,data,compare,model,infer].filter(Boolean).length+Math.min(2,concepts.size)+
      Math.min(1,numericalData/5)+Math.min(.4,text.length/2500);
  }

  function classify(q){
    const picked=curated.get(q.id);
    if(picked?.[0]===q.answer&&levels[picked[1]])return {level:picked[1],method:'ficha'};
    const book=booklets[q.year], position=q.index-book?.first;
    const level=Number(book?.levels[position]);
    if(q.application==='regular'&&q.source?.booklet==='azul'&&levels[level]&&book.keys[position]===q.answer){
      return {level,method:'caderno'};
    }
    return null;
  }

  const ratings=new Map(), pending=[];
  for(const q of globalThis.FURG_ENEM_DATA?.questions||[]){
    if(q.area!==area||q.canceled||q.quality?.blocked||q.alternatives?.length!==5||!/^[A-E]$/.test(q.answer))continue;
    const rating=classify(q);
    if(rating)ratings.set(q.id,rating);
    else pending.push({id:q.id,score:estimate(q)});
  }
  const scores=pending.map(item=>item.score).sort((a,b)=>a-b);
  const lower=scores[Math.ceil(scores.length/3)-1], upper=scores[Math.ceil(scores.length*2/3)-1];
  for(const {id,score} of pending){
    ratings.set(id,{level:score<=lower?1:score<=upper?2:3,method:'estimada'});
  }
  globalThis.FurgEnemNatureza={levels,sources,get:id=>ratings.get(id)};
})();
