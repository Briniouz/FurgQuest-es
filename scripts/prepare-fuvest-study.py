#!/usr/bin/env python3
"""Attach subject classifications and use readable complete prose in the study UI.
Complex notation and image-dependent items retain the complete original by default.
This does not infer or modify answer keys.
"""
import collections,json,pathlib,re,unicodedata
import fitz
ROOT=pathlib.Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'fuvest-data.json').read_text());subjects=json.loads((ROOT/'fuvest/provenance/subjects.json').read_text())
secondary={q['id']:q for q in json.loads((ROOT/'fuvest/provenance/companion-text.json').read_text())}
visual=re.compile(r'figur[ae]|gr[aá]fic|tabel|quadrinho|tirinha|cartum|cartaz|charge|mapa\b|esquem|diagram|fotograf|foto\b|imagem|imagens|ilustra|heredograma|fluxograma|sublinh|grif|negrito|it[aá]lico|destacad|[aà] direita|[aà] esquerda|em cores|curva\b|quadro\b|a seguir representad|pintura|aquarela|barras|hachura|representa[cç][aã]o|segmento de reta',re.I)
bad=re.compile(r'[\x00-\x08\x0e-\x1f\x7f-\x9f\u0378\u0530-\u1fff\u2c00-\ua7ff\ufffd]')
# Poems and language passages keep their original line breaks. Only physical
# line endings inside ordinary prose are joined, never inside displayed verse.
def clean(s,n=0):
 if not s:return None
 s=s.replace('\u00ac',' ').replace('Ͳ','-').replace('\xa0',' ')
 s=re.sub(r'^\s*\{?0?'+str(n)+r'\}?\s+(?=[A-Za-zÀ-ÿ“\[])','',s) if n else s
 s=re.sub(r'^\s*TEXTO[S]? PARA AS QUEST[ÕO]ES[^\n]*\n+', '',s,flags=re.I)
 s=re.sub(r'(?m)^\s*(?:Concurso Vestibular FUVEST.*|PAG\.?\s*\d+.*|Caderno Reserva.*|V\s*)$','',s)
 s=re.sub(r'(?m)^\s*#+\s*$','',s)
 return re.sub(r'\n{3,}','\n\n',s).strip()
docs={};pages={};records={};counter=collections.Counter()
for q in data['questions']:
 q['subjects']=subjects['questions'][q['id']]['subjects'];q['subject']=q['subjects'][0]
 q['context']=clean(q.get('context'));q['stem']=clean(q.get('stem'),0 if q['quality'].get('textPrepared') else q['index']) or ''
 q['quality']['textPrepared']=1
 for a in q['alternatives']:a['text']=clean(a.get('text')) or ''
 reasons=[];text='\n'.join([q.get('context') or '',q['stem'],*[a['text'] for a in q['alternatives']]])
 if q['id']=='fuvest-2020-65':reasons.append('Trecho musical mantido no original')
 if q['year']==2021:reasons.append('OCR precisa de revisão de notação e pontuação')
 if not (q.get('context') or q['stem']) or not all(a['text'] for a in q['alternatives']):reasons.append('Transcrição das alternativas incompleta')
 if bad.search(text):reasons.append('Glifos de extração não confiáveis')
 if visual.search(text):reasons.append('Figura, tabela ou marca gráfica deve acompanhar a leitura')
 if any(s in ('matematica','fisica','quimica') for s in q['subjects']):reasons.append('Notação científica ou matemática preservada no original')
 if re.search(r'(?:can[cç][aã]o|letra da m[uú]sica|letra musical|Bob Dylan|Caetano Veloso|Chico Buarque|Gilberto Gil|Vin[ií]cius de Moraes)',text,re.I):reasons.append('Texto artístico mantido no original')
 if re.search(r'\b(?:Dados:|NOTE E ADOTE|TEXTO PARA AS QUESTÕES|Questão \d+)\b',q['alternatives'][-1]['text'],re.I) or len(q['alternatives'][-1]['text'])>1000:reasons.append('Limite das alternativas precisa de revisão')
 sec=secondary.get(q['id'])
 if sec and (sec.get('files') or any(a.get('file') for a in sec['alternatives'])):reasons.append('Transcrição de base referencia figuras')
 # The PDF itself is also checked: source-bank metadata does not list all figures.
 if not reasons:
  year=q['year'];doc=docs.setdefault(year,fitz.open(ROOT/q['source']['pdf']))
  provenance=json.loads((ROOT/f'fuvest/provenance/{year}.json').read_text());regmap={r['path']:r for r in provenance['regions']}
  for path in q['source']['images']:
   r=regmap[path];pi=r['page']-1;rect=fitz.Rect(r['rect']);key=(year,pi)
   if key not in pages:
    p=doc[pi];pictures=[fitz.Rect(im['bbox']) for im in p.get_image_info() if fitz.Rect(im['bbox']).get_area()>300]
    shapes=[fitz.Rect(d['rect']) for d in p.get_drawings() if len(d.get('items',[]))>4 and fitz.Rect(d['rect']).get_area()>500 and fitz.Rect(d['rect']).height>5]
    pages[key]=pictures+shapes
   if any(not (rect&obj).is_empty and (rect&obj).get_area()>300 for obj in pages[key]):reasons.append('Imagem ou desenho detectado na região original');break
  if q['quality'].get('note'):reasons.append('Diagramação de página requer original')
  original='\n'.join(doc[regmap[path]['page']-1].get_text(clip=fitz.Rect(regmap[path]['rect'])) for path in q['source']['images'])
  def words(value):return set(re.findall(r'[a-z]{3,}',unicodedata.normalize('NFKD',value.replace('¬',' ').replace('\x03',' ')).encode('ascii','ignore').decode().lower()))
  ow,cw=words(original),words(text);missing=ow-cw
  if len(missing)>6 and len(missing)/max(1,len(ow))>0.06:reasons.append('Texto original contém trechos adicionais que precisam de conferência')
 ready=not reasons
 q['quality']['textReady']=ready;q['quality']['transcription']='text' if ready else 'companion'
 records[q['id']]={'textReady':ready,'reason':'Texto e cinco alternativas disponíveis, sem indicação de dependência visual ou notação defeituosa.' if ready else '; '.join(dict.fromkeys(reasons))}
 counter['text' if ready else 'original']+=1
 if ready:counter[str(q['year'])]+=1
 data['subjects']=subjects['labels'];data['readingCoverage']={'text':counter['text'],'original':counter['original']}
 data['scope']='Primeira fase objetiva de 2010 a 2026: 90 questões únicas por ano. Filtro por matéria inclui questões interdisciplinares nas matérias associadas. Questões com texto legível e alternativas completas abrem em texto; fórmulas, gráficos e itens em conferência conservam o original.'
serialized=json.dumps(data,ensure_ascii=False,separators=(',',':'))
(ROOT/'fuvest-data.json').write_text(serialized+'\n');(ROOT/'fuvest-data.js').write_text('globalThis.FURG_FUVEST_DATA='+serialized+';\n')
(ROOT/'fuvest/provenance/text-presentation.json').write_text(json.dumps({'method':'Verificação conservadora de texto, alternativas, caracteres, dependência visual e regiões do PDF. O original fica disponível em todos os itens.','counts':dict(counter),'questions':records},ensure_ascii=False,indent=2)+'\n')
lines=['FUVEST — PRIMEIRA FASE OBJETIVA 2010–2026','Em itens com gráficos, fórmulas ou transcrição complementar, consulte o original incluído no site.','']
for q in data['questions']:
 lines.extend([f"FUVEST {q['year']} — Questão {q['index']} — "+' / '.join(subjects['labels'][s] for s in q['subjects']),'Leitura: '+('Em texto' if q['quality']['textReady'] else 'Original com transcrição complementar'),q.get('context') or '',q['stem'],*[a['letter']+') '+a['text'] for a in q['alternatives']],'Gabarito: '+('Anulada' if q['canceled'] else q['answer']),q['source']['pdf']+'#page='+str(q['source']['page']),''])
(ROOT/'FUVEST-Todas-Questoes.txt').write_text('\n'.join(lines)+'\n')
print(dict(counter))
