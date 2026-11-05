#!/usr/bin/env python3
"""Replace a Windows launcher's icon while preserving its code, imports and local server.

Usage: python3 scripts/build-desktop-logo.py ORIGINAL.exe OUTPUT.exe
The launcher's identity and user-progress origin are deliberately unchanged.
"""
from pathlib import Path
import hashlib,struct,sys
ROOT=Path(__file__).resolve().parents[1]
def align(n,a):return (n+a-1)//a*a
def u16(b,p):return struct.unpack_from('<H',b,p)[0]
def u32(b,p):return struct.unpack_from('<I',b,p)[0]

def brand(launcher,icon,output):
 raw=bytearray(Path(launcher).read_bytes());pe=u32(raw,0x3c);assert raw[:2]==b'MZ' and raw[pe:pe+4]==b'PE\0\0'
 opt=pe+24;assert u16(raw,opt)==0x20b
 n=u16(raw,pe+6);sections=opt+u16(raw,pe+20)
 old=[struct.unpack_from('<8sIIIIIIHHI',raw,sections+i*40) for i in range(n)]
 def offset(rva):
  for s in old:
   if s[2]<=rva<s[2]+max(s[1],s[3]):return s[4]+rva-s[2]
  raise ValueError('RVA outside image')
 resource=offset(u32(raw,opt+112+2*8));leaves=[]
 def walk(at,path):
  count=u16(raw,at+12)+u16(raw,at+14)
  for i in range(count):
   tag,target=struct.unpack_from('<II',raw,at+16+i*8)
   assert not tag&0x80000000,'Named icon resources need explicit handling'
   if target&0x80000000:walk(resource+(target&0x7fffffff),path+[tag])
   else:leaves.append((path+[tag],resource+target))
 walk(resource,[])
 ico=Path(icon).read_bytes();assert ico[:4]==b'\0\0\1\0'
 variants=[]
 for i in range(u16(ico,4)):
  w,h,colors,reserved,planes,bits,size,at=struct.unpack_from('<BBBBHHII',ico,6+i*16)
  variants.append(dict(width=w or 256,height=h or 256,planes=planes,bits=bits,bytes=ico[at:at+size]))
 icon_leaves={path[1]:entry for path,entry in leaves if path[0]==3}
 groups=[entry for path,entry in leaves if path[0]==14]
 assert icon_leaves and groups
 selected={}
 for entry in groups:
  group=offset(u32(raw,entry));assert u16(raw,group)==0 and u16(raw,group+2)==1
  for i in range(u16(raw,group+4)):
   at=group+6+i*14;w,h,colors,reserved,planes,bits,size,id=struct.unpack_from('<BBBBHHIH',raw,at)
   variant=min(variants,key=lambda v:abs(v['width']-(w or 256)))
   selected[id]=variant
   struct.pack_into('<BBBBHHIH',raw,at,variant['width']%256,variant['height']%256,0,0,variant['planes'],variant['bits'],len(variant['bytes']),id)
 file_align=u32(raw,opt+36);section_align=u32(raw,opt+32)
 start=align(len(raw),file_align);rva=align(max(s[2]+max(s[1],s[3]) for s in old),section_align)
 payload=bytearray()
 for id,entry in icon_leaves.items():
  v=selected.get(id,max(variants,key=lambda v:v['width']))
  while len(payload)%4:payload.append(0)
  struct.pack_into('<II',raw,entry,rva+len(payload),len(v['bytes']))
  payload.extend(v['bytes'])
 assert sections+(n+1)*40<=u32(raw,opt+60),'No spare section-header room'
 section=struct.pack('<8sIIIIIIHHI',b'.bsicon\0',len(payload),rva,align(len(payload),file_align),start,0,0,0,0,0x40000040)
 raw[sections+n*40:sections+(n+1)*40]=section
 struct.pack_into('<H',raw,pe+6,n+1)
 struct.pack_into('<I',raw,opt+56,align(rva+len(payload),section_align))
 struct.pack_into('<I',raw,opt+8,u32(raw,opt+8)+align(len(payload),file_align))
 struct.pack_into('<I',raw,opt+64,0)
 raw.extend(b'\0'*(start-len(raw)));raw.extend(payload);raw.extend(b'\0'*(align(len(raw),file_align)-len(raw)))
 original=Path(launcher).read_bytes()
 for s in old:
  if s[0].rstrip(b'\0')!=b'.rsrc':assert raw[s[4]:s[4]+s[3]]==original[s[4]:s[4]+s[3]],'Launcher code or imports changed'
 Path(output).write_bytes(raw)
 return dict(file=str(Path(output).resolve()),bytes=len(raw),sourceSha256=hashlib.sha256(original).hexdigest(),sha256=hashlib.sha256(raw).hexdigest(),iconResources=len(icon_leaves),codeAndImportsPreserved=True)
if __name__=='__main__':
 import json
 print(json.dumps(brand(sys.argv[1],ROOT/'briniouz-icon.ico',sys.argv[2])))
