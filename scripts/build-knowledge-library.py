#!/usr/bin/env python3
"""Build a reproducible, evidence-backed index of the local ENEM corpus.

Does not edit any question. An inferred teaching connection is never counted
as a nominal mention. Run from any directory with Python's standard library.
"""
from pathlib import Path
import collections,hashlib,json,re,unicodedata,subprocess

ROOT=Path(__file__).resolve().parents[1]
def load(name):return json.loads((ROOT/name).read_text(encoding='utf-8'))
def normalized(s):
 return re.sub(r'[^a-z0-9]+',' ',''.join(c for c in unicodedata.normalize('NFD',str(s)) if unicodedata.category(c)!='Mn').lower()).strip()
def normalized_map(s):
 out=[];positions=[]
 for i,char in enumerate(s):
  for c in unicodedata.normalize('NFD',char):
   if unicodedata.category(c)=='Mn':continue
   out.append(c.lower() if c.isascii() and c.isalnum() else ' ');positions.append(i)
 return ''.join(out),positions
def pattern(aliases):
 values=sorted({normalized(a) for a in aliases if normalized(a)},key=len,reverse=True)
 return re.compile(r'(?<![a-z0-9])(?:'+ '|'.join(r'\s+'.join(map(re.escape,a.split())) for a in values)+r')(?![a-z0-9])') if values else None
def snippet(raw,positions,match):
 start=positions[match.start()];end=positions[match.end()-1]+1
 left=max(0,start-65);right=min(len(raw),max(end+65,left+145))
 return {'start':start,'end':end,'text':raw[start:end],'excerpt':raw[left:right]}
def complete_initials(raw,positions,match):
 # A citation to FERNANDES, M. F. must not become a confirmed citation to Millôr.
 # Do not accept a shorter initial alias as the prefix of a longer signature.
 return not (len(normalized(match.group()).split()[-1])==1 and re.match(r'^\.\s*[A-ZÀ-ÖØ-Ý]\.',raw[positions[match.end()-1]+1:]))

catalog=load('scripts/personality-catalog.json')
corpus=load('enem-data.json')
profiles=catalog['profiles'];questions=corpus['questions']
assert len({p['id'] for p in profiles})==len(profiles)
assert len({normalized(p['name']) for p in profiles})==len(profiles)
assert len({q['id'] for q in questions})==len(questions)
question_map={q['id']:q for q in questions}
fields={}
for q in questions:
 values=[('context',q.get('context') or ''),('stem',q.get('stem') or '')]
 values += [('alternative:'+a['letter'],a.get('text') or '') for a in q['alternatives']]
 fields[q['id']]=[(field,raw,*normalized_map(raw)) for field,raw in values if raw]

# Reuse the presentation parser to keep bibliographies out of conceptual inference.
layout_script="""const fs=require('fs'),vm=require('vm'),c=vm.createContext({});vm.runInContext(fs.readFileSync('enem-layout.js','utf8'),c);const out={};for(const q of JSON.parse(fs.readFileSync('enem-data.json','utf8')).questions){let at=0;out[q.id]=[];for(const p of c.FurgEnemLayout.structure(q)){const stem=p.field==='stem';if(p.type!=='source')out[q.id].push({field:stem?'stem':'context',text:p.text,start:stem?0:at});if(!stem)at+=Array.from(p.text).length;}}process.stdout.write(JSON.stringify(out));"""
parts_by_question=json.loads(subprocess.run(['node','-e',layout_script],cwd=ROOT,capture_output=True,text=True,check=True).stdout)
concept_fields={}
for q in questions:
 values=[]
 for part in parts_by_question[q['id']]:
  field=part['field'];raw=q.get(field) or '';text,positions=normalized_map(part['text'])
  values.append((field,raw,text,[i+part['start'] for i in positions]))
 concept_fields[q['id']]=values

ambiguous=set('silva santos ribeiro castro alves barros andrade rosa mendes lima campos costa gomes freire tavares vieira almeida candido fernandes nascimento teixeira assis madeira ferreira queiroz rodrigues azevedo moraes ricardo taylor smith newton brown reis rio cavalcanti'.split())
last_names=collections.Counter(normalized(p['name']).split()[-1] for p in profiles)
work_exceptions={'guernica','macunaima','urupes','libertinagem','abaporu','mayombe','americanah','antropofagia','hamlet','macbeth','sagarana','amarelo'}
metadata={};reverse=collections.defaultdict(list)
for person in profiles:
 aliases=list(person['aliases'])
 words=normalized(person['name']).split();last=words[-1]
 if last in {'descartes','hobbes','locke','rousseau','voltaire','kant','hegel','comte','marx','engels','nietzsche','durkheim','beauvoir','arendt','foucault','bourdieu','bauman','montaigne','spinoza','hume','montesquieu','diderot','tocqueville','schopenhauer','adorno','horkheimer','marcuse','sartre','habermas','debord','bobbio','gramsci','simmel','giddens','castells','mbembe','hobsbawm','braudel','geertz','haesbaert','freyre','kopenawa','bilac','lispector','lobato','trevisan','scliar','leminski','colassanti','colassanti','saramago','shakespeare','brecht','darwin','einstein','galilei','bakhtin','saussure','jakobson','chomsky','bagno','marcuschi','picasso','duchamp','dalí','moran'}:aliases.append(last)
 # Bibliographic surnames with the first initial: never match a bare common surname.
 if len(words)>1 and last not in {'andrade','rosa','barros','tavares','holanda','assis','caminha','verissimo','machado','neto','junior','nascimento','rio','moraes','teixeira','santos','ribeiro','castro','alves'}:
  aliases += [last+', '+words[0][0]+'.',last+'. '+words[0][0]+'.']
 initials=[w[0] for w in words[:-1] if w not in {'de','da','do','das','dos','e'}]
 if len(initials)>1:
  signature=' '.join(i+'.' for i in initials)
  aliases += [last+', '+signature,last+'. '+signature]
 names=pattern(aliases)
 works=[]
 for title in person['works']:
  title=re.sub(r', (?:com|álbum coletivo|documentário).*','',title,flags=re.I).strip()
  key=normalized(title)
  if (' ' in key and len(key)>=17 and len(key.split())>=3 or key in work_exceptions) and key not in {'historia e memoria','arte e vida','curso de linguistica geral'}:
   works.append(title)
 work_pattern=pattern(works)
 direct=[];work_refs=[];concept_refs=[];concept_candidates=0
 for q in questions:
  found=None
  for field,raw,text,positions in fields[q['id']]:
   match=next((m for m in names.finditer(text) if complete_initials(raw,positions,m)),None) if names else None
   if match:
    found={'questionId':q['id'],'type':'direct','field':field,'evidence':snippet(raw,positions,match),'reason':'Nome identificado no texto da questão.' if not field.startswith('alternative:') else 'Nome citado em alternativa; a alternativa pode ser um distrator.'};break
  if found:direct.append(found);continue
  if work_pattern:
   for field,raw,text,positions in fields[q['id']]:
    match=work_pattern.search(text)
    if match:
     # Titles used as ordinary words require an explicit work/citation cue.
     term=normalized(match.group())
     cue=bool(re.search(r'\b(?:obra|livro|poema|romance|quadro|pintura|cancao|album|peca|documentario|teoria)\b',text[max(0,match.start()-100):match.end()+100]))
     if term in work_exceptions and not cue:continue
     found={'questionId':q['id'],'type':'work','field':field,'evidence':snippet(raw,positions,match),'reason':'Título de obra identificado sem menção nominal reconhecida à personalidade.'};break
  if found:work_refs.append(found);continue
  # Inferences use support/prompt only, never a potentially incorrect alternative.
  if q['area'] not in {'ciencias-humanas','linguagens','interdisciplinar'} and person['area']!='Ciências da Natureza':continue
  for rule in person.get('conceptRules',[]):
   for field,raw,text,positions in concept_fields[q['id']]:
    if field.startswith('alternative:'):continue
    patterns=[pattern([term]) for term in rule]
    matches=[p.search(text) for p in patterns]
    if all(matches):
     found={'questionId':q['id'],'type':'concept','field':field,'evidence':snippet(raw,positions,matches[0]),'reason':'Conexão didática sugerida pelos termos '+', '.join('“'+term+'”' for term in rule)+'. Não comprova citação nem cobrança dessa personalidade.','concepts':rule};break
   if found:break
  if found:concept_refs.append(found)
 # Keep suggestions bounded. This is a curated sample, not a frequency measure.
 concept_candidates=len(concept_refs)
 concept_refs=sorted(concept_refs,key=lambda r:(-question_map[r['questionId']]['year'],question_map[r['questionId']]['index'],r['questionId']))[:12]
 references=direct+work_refs+concept_refs
 references.sort(key=lambda r:({'direct':0,'work':1,'concept':2}[r['type']],-question_map[r['questionId']]['year'],question_map[r['questionId']]['index'],r['questionId']))
 for ref in references:
  q=question_map[ref['questionId']]
  ref.update(year=q['year'],index=q['index'],area=q['area'])
  reverse[q['id']].append({'profileId':person['id'],'type':ref['type']})
 metadata[str(person['id'])]={'directCount':len(direct),'workCount':len(work_refs),'conceptCount':len(concept_refs),'conceptCandidates':concept_candidates,'directYears':sorted({question_map[r['questionId']]['year'] for r in direct}),'workYears':sorted({question_map[r['questionId']]['year'] for r in work_refs}),'references':references}

def dumpjs(path,name,value):
 (ROOT/path).write_text('/* Gerado por scripts/build-knowledge-library.py; conteúdo em pt-BR. */\nglobalThis.'+name+'='+json.dumps(value,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
public=[]
for p in profiles:
 entry={k:v for k,v in p.items() if k not in {'aliases','conceptRules'}}
 related=[];own={normalized(c) for c in p['concepts']}
 for other in profiles:
  if p['id']==other['id']:continue
  overlap=len(own & {normalized(c) for c in other['concepts']})
  if overlap:related.append((overlap,other['id']))
 entry['related']= [i for _,i in sorted(related,key=lambda pair:(-pair[0],pair[1]))[:5]]
 public.append(entry)
dumpjs('thinkers-data.js','FURG_THINKERS_DATA',public)
years=sorted({q['year'] for q in questions})
manifest={'version':1,'sourceCommit':'bb16c37725e2f28e1f47d4942c3cbc04b57fa866','corpusSha256':hashlib.sha256((ROOT/'enem-data.json').read_bytes()).hexdigest(),'totalQuestions':len(questions),'years':years,'areaCounts':dict(collections.Counter(q['area'] for q in questions)),'profiles':metadata,'questions':dict(reverse),'method':'Uma classificação por personalidade/questão: nome, depois obra sem nome, depois conexão conceitual. Nomes em alternativas são identificados como tais. Sugestões conceituais são amostras didáticas, não aparições nem estatística oficial. Busca textual conservadora, sujeita a lacunas de transcrição e homônimos; consulte o trecho e o original.'}
dumpjs('thinkers-index.js','FURG_THINKERS_INDEX',manifest)
(ROOT/'docs').mkdir(exist_ok=True)
summary={'profiles':len(profiles),'originalProfiles':40,'newProfiles':len(profiles)-40,'questions':len(questions),'years':years,'profilesWithDirectMentions':sum(bool(m['directCount']) for m in metadata.values()),'nominalLinks':sum(m['directCount'] for m in metadata.values()),'workLinks':sum(m['workCount'] for m in metadata.values()),'suggestedLinks':sum(m['conceptCount'] for m in metadata.values()),'linkedQuestions':len(reverse),'method':manifest['method'],'byProfile':[dict(id=p['id'],name=p['name'],**{k:metadata[str(p['id'])][k] for k in ['directCount','workCount','conceptCount','directYears']}) for p in profiles]}
(ROOT/'docs/enem-library-audit.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k not in {'byProfile','method','years'}},ensure_ascii=False))
