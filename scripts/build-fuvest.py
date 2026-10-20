#!/usr/bin/env python3
"""Build one canonical objective booklet per year from official FUVEST PDFs.

Original page regions are authoritative for mathematics, graphics and layout.
Selectable text is a companion transcription, never a replacement for the original.
"""
import argparse, collections, hashlib, io, json, pathlib, re
import fitz
from PIL import ImageChops
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1]
p = argparse.ArgumentParser()
p.add_argument('--work', type=pathlib.Path, default=ROOT/'fuvest/provenance')
p.add_argument('--year', type=int)
a = p.parse_args(); work = a.work
sources = json.loads((ROOT/'fuvest/sources.json').read_text())
keys = json.loads((ROOT/'fuvest/provenance/official-keys.json').read_text())
secondary = { (q['year'], int(str(q['id']).split('-')[-1])):q for q in json.loads((ROOT/'fuvest/provenance/companion-text.json').read_text()) if q.get('source')=='fuvest' }
PAGE_FALLBACK={(2013,65),(2015,2),(2015,19),(2016,65),(2016,68),(2017,36)}
images = ROOT/'fuvest/images'; images.mkdir(parents=True,exist_ok=True)

def clean(s):
    s = s.replace('\x03',' ').replace('\u0372','-').replace('\u00ac',' ').replace('\u00a0',' ').replace('\x00','-').replace('\x11','-').replace('\x12','-').replace('\x13','-').replace('\x14','-').replace('\x15','-').replace('\x16','-').replace('\x17','-')
    s = re.sub(r'[\x01-\x08\x0b\x0c\x0e-\x1f]', '', s)
    s = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', s)
    s = re.sub(r'[ \t]+',' ',s)
    return re.sub(r'\n{3,}','\n\n',s).strip()

def lines(page):
    return [l for b in page.get_text('dict',flags=fitz.TEXTFLAGS_TEXT)['blocks'] if b['type']==0 for l in b['lines']]

def anchors(doc,year):
    groups=collections.defaultdict(list)
    for pi,page in enumerate(doc):
        if pi==0:continue
        for l in lines(page):
            for s in l['spans']:
                t=s['text'].strip()
                if re.fullmatch(r'\d{1,2}',t) and 1<=int(t)<=90:
                    groups[(s['font'],round(s['size'],1))].append({'n':int(t),'p':pi,'x':s['bbox'][0],'y':s['bbox'][1]})
    if year==2018:
        found=[]
        for pi,page in enumerate(doc):
            if pi==0:continue
            for im in page.get_image_info():
                x,y,x1,y1=im['bbox']
                if ((33<x<36) or (305<x<309)) and 8<y1-y<10 and 2<x1-x<8:
                    found.append({'p':pi,'x':x,'y':y})
        found.sort(key=lambda z:(z['p'],z['x']>doc[z['p']].rect.width/2,z['y']))
        for i,z in enumerate(found,1):z['n']=i
    else:
        found=max(groups.values(),key=lambda g:len(set(z['n'] for z in g)))
        if year==2022:found += [z for (font,size),zs in groups.items() if font=='Arial' and size==12 for z in zs if z['n']==45 and z['p']==12]
    assert len(found)==90 and sorted(z['n'] for z in found)==list(range(1,91)),(year,len(found),[z['n'] for z in found])
    for z in found:z['col']=int(z['x']>doc[z['p']].rect.width/2);z['kind']='q'
    return sorted(found,key=lambda z:z['n'])

def support_nodes(doc,qs):
    out=[]
    for pi,page in enumerate(doc):
        if pi==0:continue
        ls=json.loads((ROOT/f'fuvest/provenance/ocr-2021/p{pi+1:02d}.json').read_text()) if doc.name.endswith('fuvest-2021-proof.pdf') and (ROOT/f'fuvest/provenance/ocr-2021/p{pi+1:02d}.json').exists() else lines(page)
        for i,l in enumerate(ls):
            t=clean(''.join(s['text'] for s in l['spans']))
            if not re.search(r'quest[õo]es',t,re.I):continue
            # Shared-stimulus headings have explicit question numbers. Ignore prose.
            m=re.search(r'quest[õo]es\s+(?:de\s+)?(\d{1,2})\s*(a|e|,|até|-)\s*(\d{1,2})(?:\s*e\s*(\d{1,2}))?',t,re.I)
            if not m:continue
            first,last=int(m[1]),int(m[3])
            if not 1<=first<last<=90:continue
            if not re.search(r'text|leia|examine|considere|observe|responda|responder',t,re.I):continue
            nums=list(range(first,last+1)) if m[2].lower() in ('a','até','-') else [first,last]+([int(m[4])] if m[4] else [])
            x,y=l['bbox'][:2];col=int(x>page.rect.width/2)
            z={'kind':'support','p':pi,'col':col,'x':x,'y':y,'targets':nums,'heading':t}
            if not any(abs(z['y']-v['y'])<3 and z['p']==v['p'] and z['col']==v['col'] for v in out):out.append(z)
    return out

def build_year(src):
    year=src['year'];doc=fitz.open(ROOT/src['proof']['path']);qs=anchors(doc,year); supports=support_nodes(doc,qs)
    nodes=sorted(qs+supports,key=lambda z:z['n'] if z['kind']=='q' else min(z['targets'])-0.1)
    wide=set()
    for pi,page in enumerate(doc):
        mid=page.rect.width/2
        inversion=any(l['p']==pi and r['p']==pi and l['col']==0 and r['col']==1 and l['n']>r['n'] and l['y']>r['y']+20 for l in qs for r in qs)
        if pi and (inversion or any(l['bbox'][0]<mid-70 and l['bbox'][2]>mid+70 and 30<l['bbox'][1]<page.rect.height-35 for l in lines(page))):wide.add(pi)
    # Preserve PDF logical reading order for selectable text on wide pages.
    anchor_positions={(z['p'],round(z['x'],2),round(z['y'],2)):z['n'] for z in qs}
    support_positions={(z['p'],round(z['x'],2),round(z['y'],2)):min(z['targets']) for z in supports}
    marked=[]
    for pi,page in enumerate(doc):
        if pi==0:continue
        for line in lines(page):
            pieces=[]
            lk=(pi,round(line['bbox'][0],2),round(line['bbox'][1],2))
            if lk in support_positions:pieces.append('[[SUPPORT:'+str(support_positions[lk])+']]')
            for span in line['spans']:
                key=(pi,round(span['bbox'][0],2),round(span['bbox'][1],2))
                if key in anchor_positions:pieces.append('[[QUESTION:'+str(anchor_positions[key])+']]')
                pieces.append(span['text'])
            marked.append(''.join(pieces))
    marked='\n'.join(marked)
    wide_text={int(m[1]):clean(m[2]) for m in re.finditer(r'\[\[QUESTION:(\d+)\]\](.*?)(?=\[\[(?:QUESTION|SUPPORT):|\Z)',marked,re.S)}
    page_nodes={pi:[z for z in nodes if z['p']==pi] for pi in range(len(doc))}
    bands={}
    for pi in wide:
        page=doc[pi];mid=page.rect.width/2;ns=page_nodes[pi]
        for node in ns:
            if node['kind']=='q' and node['col']==0 and any(z['kind']=='q' and z['col']==1 and z['n']<node['n'] and z['y']<node['y']-20 for z in ns):
                bottom=min([z['y']-3 for z in ns if z['y']>node['y']+15]+[page.rect.height-31])
                bands[id(node)]=(node['y']-3,bottom)
        for line in lines(page):
            x,y,x1,y1=line['bbox']
            if not(x<mid-70 and x1>mid+70 and 30<y<page.rect.height-35):continue
            previous=[z for z in ns if z['col']==0 and z['y']<=y+3]
            if not previous:continue
            node=max(previous,key=lambda z:z['y'])
            bottom=min([z['y']-3 for z in ns if z['y']>node['y']+15]+[page.rect.height-31])
            bands[id(node)]=(node['y']-3,bottom)
    cache={}; region_manifest=[]
    def regions(start,end):
        out=[]
        custom=[]
        if start.get('kind')=='q' and (year,start['n']) in PAGE_FALLBACK:
            page=doc[start['p']];custom=[(start['p'],(25,31,page.rect.width-24,page.rect.height-31))]
        elif start['p'] in wide:
            pi=start['p'];page=doc[pi];mid=page.rect.width/2;ns=page_nodes[pi]
            if id(start) in bands:
                top,bottom=bands[id(start)];custom=[(pi,(25,max(31,top),page.rect.width-24,bottom))]
            else:
                bottom=min([z['y']-3 for z in ns if z['col']==start['col'] and z['y']>start['y']+3]+[v[0] for z in ns if (v:=bands.get(id(z))) and v[0]>start['y']+3]+[page.rect.height-31])
                custom=[(pi,(25 if start['col']==0 else mid+2,max(31,start['y']-3),mid-2 if start['col']==0 else page.rect.width-24,bottom))]
                if start['col']==0 and end['p']==pi and end['col']==1:
                    floor=max([v[1] for z in ns if (v:=bands.get(id(z))) and v[1]<=end['y']+3]+[32])
                    if end['y']-3-floor>20:custom.append((pi,(mid+2,floor,page.rect.width-24,end['y']-3)))
        # Reading order is left column, right column, next page. Wide layouts
        # retain the entire original page rather than guessing a clipping boundary.
        rects=list(custom)
        for pi in range(start['p'],min(end['p']+1,len(doc))):
            if custom and pi==start['p']:continue
            page=doc[pi];mid=page.rect.width/2
            for col in (0,1):
                pos=(pi,col)
                if pos<(start['p'],start['col']) or pos>(end['p'],end['col']):continue
                y0=max(31,start['y']-3) if pos==(start['p'],start['col']) else 32
                y1=end['y']-3 if pos==(end['p'],end['col']) else page.rect.height-31
                if y1-y0<20:continue
                rect=(25 if col==0 else mid+2,y0,mid-2 if col==0 else page.rect.width-24,y1)
                rects.append((pi,rect))
        for pi,rect in rects:
                page=doc[pi]
                if rect[3]-rect[1]<20:continue
                key=(pi,tuple(round(v,2) for v in rect),'v2')
                if key in cache:out.append(cache[key]);continue
                name=f'fuvest-{year}-p{pi+1:02d}-'+hashlib.sha256(repr(key).encode()).hexdigest()[:10]+'.webp'
                dest=images/name
                if not dest.exists() or dest.stat().st_size<64:
                    pix=page.get_pixmap(matrix=fitz.Matrix(2.4,2.4),clip=fitz.Rect(rect),alpha=False,annots=False)
                    im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
                    bbox=ImageChops.difference(im,Image.new('RGB',im.size,'white')).getbbox()
                    if not bbox:continue
                    bx0,by0,bx1,by1=bbox
                    im=im.crop((max(0,bx0-12),max(0,by0-12),min(im.width,bx1+12),min(im.height,by1+12)))
                    temporary=dest.with_suffix('.webp.tmp')
                    im.save(temporary,'WEBP',quality=88,method=5)
                    temporary.replace(dest)
                text=clean(page.get_text(clip=fitz.Rect(rect),sort=True))
                if year==2021:
                    ol=json.loads((ROOT/f'fuvest/provenance/ocr-2021/p{pi+1:02d}.json').read_text())
                    text=clean('\n'.join(' '.join(w['text'] for w in l['words'] if rect[0] <= (w['bbox'][0]+w['bbox'][2])/2 <= rect[2] and rect[1] <= (w['bbox'][1]+w['bbox'][3])/2 <= rect[3]) for l in ol))
                item={'path':'fuvest/images/'+name,'page':pi+1,'rect':list(rect),'text':text}
                cache[key]=item;region_manifest.append({k:v for k,v in item.items() if k!='text'});out.append(item)
        return list({r['path']:r for r in out}.values())
    node_regions={}
    for i,node in enumerate(nodes):
        end=nodes[i+1] if i+1<len(nodes) else {'p':node['p'],'col':1,'y':doc[node['p']].rect.height-31}
        node_regions[id(node)]=regions(node,end)
    output=[]
    for q in qs:
        n=q['n'];shared=[s for s in supports if n in s['targets']]
        support_regs=[r for s in shared for r in node_regions[id(s)]]
        own=node_regions[id(q)]
        all_regs=list({r['path']:r for r in support_regs+own}.values())
        raw=wide_text.get(n,'') if year!=2021 and any(r['page']-1 in wide for r in own) and n in wide_text else '\n\n'.join(r['text'] for r in own)
        raw=re.sub(r'^\s*\{?0?'+str(n)+r'\}?\s*(?:\n|$)','',raw)
        hits=list(re.finditer(r'(?m)^\s*\(?([A-Ea-e])\)\s*',raw))
        ordered=[]
        for letter in 'ABCDE':
            match=next((h for h in hits if h[1].upper()==letter and (not ordered or h.start()>ordered[-1].start())),None)
            if match:ordered.append(match)
        context='\n\n'.join(r['text'] for r in support_regs) or None
        body=raw[:ordered[0].start()].strip() if len(ordered)==5 else raw
        alts=[{'letter':c,'text':raw[h.end():ordered[i+1].start() if i<4 else len(raw)].strip(),'file':None} for i,(c,h) in enumerate(zip('ABCDE',ordered))] if len(ordered)==5 else [{'letter':c,'text':'','file':None} for c in 'ABCDE']
        sec=secondary.get((year,n))
        if sec:
            # Companion text only. Originals above preserve every graphic and formula.
            context=clean(sec.get('context') or '') or context
            body=clean(sec.get('alternatives_introduction') or '') or ''
            alts=[{'letter':v['letter'],'text':clean(v.get('text') or ''),'file':None} for v in sec['alternatives']]
            assert [v['letter'] for v in alts]==list('ABCDE')
        key=keys[str(year)][str(n)]
        output.append({'id':f'fuvest-{year}-{n}','year':year,'index':n,'application':'primeira-fase','applicationLabel':'1ª fase','area':'conhecimentos-gerais','language':None,'context':context,'stem':body,'alternatives':alts,'answer':key['answer'],'canceled':key['canceled'],'files':[], 'source':{'pdf':src['proof']['path'],'answerPdf':src['key']['path'],'booklet':src['booklet'],'page':q['p']+1,'images':[r['path'] for r in all_regs],'sharedWith':[s['targets'] for s in shared]},'quality':{'keyVerified':True,'blocked':False,'transcription':'companion','originalComplete':True,**({'note':f'Nesta página original, resolve o item {n:02d}. Ela também contém outros itens.'} if (year,n) in PAGE_FALLBACK else {})}})
    provenance={'year':year,'widePages':[i+1 for i in sorted(wide)],'supportGroups':[{k:v for k,v in s.items() if k!='kind'} for s in supports],'regions':region_manifest,'count':len(output)}
    (ROOT/f'fuvest/provenance/{year}.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n')
    print(year,len(output),'questions',len(supports),'shared stimuli',len(region_manifest),'original regions',flush=True)
    return output

(ROOT/'fuvest/provenance').mkdir(exist_ok=True)
all_q=[]
for src in sources:
    if a.year and src['year']!=a.year:continue
    all_q.extend(build_year(src))
if not a.year:
    data={'version':1,'updatedAt':'2026-10-20','scope':'Primeira fase objetiva de 2010 a 2026. Uma versão de 90 questões por ano, sem repetir cadernos com ordem diferente. O original preserva textos, fórmulas, figuras e alternativas; a transcrição selecionável acompanha a leitura.','questions':all_q,'coverage':[{'year':s['year'],'label':'1ª fase · '+s['booklet'],'count':90,'expected':90,'note':'Gabarito oficial, incluindo retificações e anuladas.'} for s in sources],'sources':[{'title':f"FUVEST {s['year']} · acervo oficial",'url':s['archiveUrl']} for s in sources]}
    serialized=json.dumps(data,ensure_ascii=False,separators=(',',':'))
    (ROOT/'fuvest-data.json').write_text(serialized+'\n')
    (ROOT/'fuvest-data.js').write_text('globalThis.FURG_FUVEST_DATA='+serialized+';\n')
    txt=['FUVEST — PRIMEIRA FASE OBJETIVA 2010–2026','Transcrição selecionável. Para gráficos, fórmulas e diagramação, consulte os originais incluídos no site.','']
    for q in all_q:
        txt.extend([f"FUVEST {q['year']} — Questão {q['index']}",q['context'] or '',q['stem'] or '',*[v['letter']+') '+v['text'] for v in q['alternatives']],'Gabarito: '+('Anulada' if q['canceled'] else q['answer']),f"Original: {q['source']['pdf']}#page={q['source']['page']}",''])
    (ROOT/'FUVEST-Todas-Questoes.txt').write_text('\n'.join(txt)+'\n')
    assert len(all_q)==1530
    active={path for q in all_q for path in q['source']['images']}
    for stale in images.glob('*.webp'):
        if stale.relative_to(ROOT).as_posix() not in active:stale.unlink()
    print('TOTAL',len(all_q),'questions',sum(p.stat().st_size for p in images.glob('*.webp')),'image bytes')

if not a.year:
    import subprocess,sys
    subprocess.run([sys.executable,str(ROOT/"scripts/prepare-fuvest-study.py")],check=True)
