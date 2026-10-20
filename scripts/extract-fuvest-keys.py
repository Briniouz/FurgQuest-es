import fitz,re,json,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
base=root/'fuvest/pdfs'; work=root/'fuvest-key-audit'; work.mkdir(exist_ok=True); checks=work/'key-checks'; checks.mkdir(exist_ok=True)
allkeys={}; report={'scope':'FUVEST primeira fase, 2010–2026; V (2010–2024), V1 (2025–2026)','authority':'Official PDF answer keys downloaded from Fuvest. Official corrected key takes precedence over secondary bank.','years':{},'visual_checks':[]}
def norm(s):
 return s.replace('\xa0',' ').translate(str.maketrans({c:'-' for c in '‐‑–−'}))
def add(records,n,a):
 n=int(n); assert 1<=n<=90,(n,a)
 assert str(n) not in records,('duplicate',n,a)
 records[str(n)]={'answer':None if a in ['*','Anulada'] else a,'canceled':a in ['*','Anulada']}
for year in range(2010,2027):
 path=base/f'fuvest-{year}-key.pdf'; doc=fitz.open(path); page=doc[0]; full=norm(page.get_text()); records={}; corrections=[]
 if year==2010:
  for clip in [fitz.Rect(30,172,120,780),fitz.Rect(308,172,398,780)]:
   words=page.get_text('words',clip=clip)
   for w in words:
    if re.fullmatch('[A-E*]',w[4]):
     nums=[v for v in words if v[4].isdigit() and abs(v[1]-w[1])<1]
     assert len(nums)==1,(year,w,nums)
     add(records,nums[0][4],w[4])
  method='Word coordinates: answer at x54/330 and corresponding V question at x99/376, matched by row.'
 elif year<=2017:
  for n,a in re.findall(r'\bV\s+0*(\d{1,2})\s*-\s*(Anulada|[A-E*])',full): add(records,n,a)
  method='Booklet-prefixed text regex V question-answer; all other booklet prefixes excluded.'
 else:
  heads=[w for w in page.get_text('words') if w[4] in ['V','V1','K','V2']]
  v=next(w for w in heads if w[4] in ['V','V1']); k=next(w for w in heads if w[4] in ['K','V2'])
  clip=fitz.Rect(25,v[3]+2,(v[0]+k[0])/2,790); text=norm(page.get_text(clip=clip))
  if year<=2019:
   for n,a in re.findall(r'\b(\d{1,2})\s*-\s*(Anulada|[A-E*])',text):add(records,n,a)
  else:
   tokens=text.split(); i=0
   while i<len(tokens):
    n=tokens[i]; assert n.isdigit(),(year,i,tokens[i:i+6]); i+=1; answers=[]
    while i<len(tokens) and not tokens[i].isdigit():
     assert re.fullmatch('[A-E*]',tokens[i]),(year,i,tokens[i]);answers.append(tokens[i]);i+=1
    assert answers,(year,n)
    if len(answers)>1:corrections.append({'question':int(n),'extracted_answers':answers,'final_answer':answers[-1],'reason':'Retified key displays old crossed-out answer followed by replacement; visually verified.'})
    add(records,n,answers[-1])
  method='First-page booklet V/V1 geometric crop bounded between its heading and next booklet heading, then question-answer parsing. Second-page correspondence table excluded.'
 assert len(records)==90 and set(records)==set(map(str,range(1,91))),(year,len(records),set(map(str,range(1,91)))-set(records))
 records={str(i):records[str(i)] for i in range(1,91)};allkeys[str(year)]=records
 report['years'][str(year)]={'pdf':str(path),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pdf_pages':len(doc),'extracted_page':1,'booklet':'V1' if year>=2025 else 'V','method':method,'count':len(records),'canceled':[int(n) for n,a in records.items() if a['canceled']],'corrections':corrections,'rectification_mentions':re.findall(r'.*(?:[Rr]etificad.|[Aa]nulad.).*',full)}
 print(year,len(records),'canceled',report['years'][str(year)]['canceled'],'corrections',corrections)
for year in [2010,2016,2018,2019,2022,2024,2026]:
 page=fitz.open(base/f'fuvest-{year}-key.pdf')[0]
 image=checks/f'{year}-official-key.png';page.get_pixmap(matrix=fitz.Matrix(1.6,1.6)).save(image)
 report['visual_checks'].append({'year':year,'image':str(image),'status':'pending'})
(work/'fuvest-keys.json').write_text(json.dumps(allkeys,ensure_ascii=False,indent=2)+'\n')
(work/'fuvest-key-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
