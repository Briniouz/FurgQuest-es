#!/usr/bin/env python3
"""Compare the bank's text with each question's official PDF text, without editing it."""
import collections
import difflib
import json
import pathlib
import re
import unicodedata
import fitz

ROOT=pathlib.Path(__file__).resolve().parents[1]
WORK=ROOT.parent/'exam-work';WORK.mkdir(exist_ok=True)
data=json.loads((ROOT/'enem-data.json').read_text())

def words(text):
    text=re.sub(r'!\[[^]]*\]\([^)]+\)',' ',text or '')
    return re.findall(r'[a-z0-9]+',unicodedata.normalize('NFKD',text).encode('ascii','ignore').decode().lower())

def markers(doc):
    out=[]
    for page in doc:
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                text=''.join(span['text'] for span in line['spans'])
                match=re.match(r'\s*QUEST[ÃA]O\s*0*(\d+)\s*$',text,re.I)
                if match:
                    x0,y0,x1,y1=line['bbox'];out.append({'index':int(match[1]),'page':page.number,'bbox':[x0,y0,x1,y1],'column':int(x0>page.rect.width*.48)})
    return sorted(out,key=lambda m:(m['page'],m['column'],m['bbox'][1]))

def extract(doc,sequence,pos):
    start=sequence[pos];end=sequence[pos+1] if pos+1<len(sequence) else None;parts=[];clips=[]
    flow_start=start['page']*2+start['column'];flow_end=end['page']*2+end['column'] if end else (len(doc)-1)*2+1
    for flow in range(flow_start,flow_end+1):
        pn,col=divmod(flow,2);page=doc[pn];x0=22 if col==0 else page.rect.width*.495;x1=page.rect.width*.495 if col==0 else page.rect.width-20
        y0=start['bbox'][3]+1 if flow==flow_start else 45;y1=end['bbox'][1]-2 if end and flow==flow_end else page.rect.height-55
        if y1<=y0:continue
        rect=fitz.Rect(x0,y0,x1,y1);text=page.get_text(clip=rect,sort=True)
        if text.strip():parts.append(text);clips.append({'page':pn+1,'rect':list(rect)})
    text='\n'.join(parts)
    # A through E must follow in sequence before the candidate A is accepted.
    hits=list(re.finditer(r'(?m)^\s*([A-E])(?:[ \t]*\n[ \t]*\1)?[ \t]+',text))
    cut=None
    for k,hit in enumerate(hits):
        if hit[1]!='A':continue
        tail=[h[1] for h in hits[k:]]
        if all(letter in tail for letter in 'BCDE'):
            cut=hit.start();break
    if cut is not None:text=text[:cut]
    return {'text':text.strip(),'clips':clips,'page':start['page']+1}

by_pdf=collections.defaultdict(list)
for q in data['questions']:
    if q['year']>=2009:by_pdf[q['source']['pdf']].append(q)
audit=[];unmatched=[]
for pdf,questions in sorted(by_pdf.items()):
    doc=fitz.open(ROOT/pdf);seq=markers(doc);by_number=collections.defaultdict(list)
    pages=[page.get_text() for page in doc];raw='\n'.join(pages);matches=list(re.finditer(r'QUEST[ÃA]O\s*0*(\d+)',raw,re.I))
    offsets=[];offset=0
    for pn,text in enumerate(pages):offsets.append((offset,pn+1));offset+=len(text)+1
    for i,match in enumerate(matches):
        text=raw[match.end():matches[i+1].start() if i+1<len(matches) else len(raw)].strip()
        hits=list(re.finditer(r'(?m)^[ \t]*([A-E])(?:[ \t]*\n[ \t]*\1)?[ \t]+',text));cuts=[]
        for k,hit in enumerate(hits):
            if hit[1]=='A' and all(letter in [h[1] for h in hits[k:]] for letter in 'BCDE'):cuts.append(hit.start())
        if cuts:text=text[:max(cuts)].strip()
        text=re.sub(r'ENEM\s*20\d\d','',text)
        pn=max(page for offset,page in offsets if offset<=match.start())
        by_number[int(match[1])].append({'text':text,'clips':[],'page':pn})
    for q in questions:
        original=' '.join(filter(None,[q.get('context'),q.get('stem')]))
        candidates=by_number[q['index']]
        if not candidates:unmatched.append(q['id']);continue
        actual=words(original)
        def score(c):return len(set(actual)&set(words(c['text'])))/max(1,len(set(actual)))
        candidate=max(candidates,key=score);expected=words(candidate['text'])
        significant=set(w for w in expected if len(w)>3)
        missing=significant-set(actual)
        ratio=len(missing)/max(1,len(significant))
        row={'id':q['id'],'pdf':pdf,'page':candidate['page'],'actualWords':len(actual),'pdfWords':len(expected),'missingRatio':round(ratio,3),'missingWords':sorted(missing),'actual':original,'pdfText':candidate['text'],'clips':candidate['clips']}
        audit.append(row)
    print(json.dumps({'pdf':pdf,'markers':len(seq),'questions':len(questions)}),flush=True)
(WORK/'enem-audit-all.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
suspects=[r for r in audit if r['missingRatio']>.20 and r['pdfWords']>r['actualWords']+20]
suspects.sort(key=lambda r:r['missingRatio'],reverse=True)
(WORK/'enem-audit-suspects.json').write_text(json.dumps(suspects,ensure_ascii=False,indent=2))
print(json.dumps({'matched':len(audit),'unmatched':unmatched,'suspects':len(suspects),'top':[{k:r[k] for k in ['id','actualWords','pdfWords','missingRatio']} for r in suspects[:60]]},ensure_ascii=False),flush=True)
