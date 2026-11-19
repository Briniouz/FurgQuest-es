'use strict';
/* Esquemas das reações orgânicas: um desenho logo abaixo de cada parte da aula.
   As moléculas são desenhadas como fórmulas estruturais (grupos e ligações) em SVG.
   Cores: azul = o que entra na molécula, laranja = o que sai, verde = outro grupo que chega. */
(() => {
 const U = 36, CH = 8.6, LH = 20;
 const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
 const width = t => t ? [...t].length * CH : 0;

 // Molécula: átomos [x, y, rótulo, classe?] em unidades e ligações [i, j, ordem, classe?].
 function mol(atoms, bonds, note, ring) {
  const pts = atoms.map(([x, y, t, c]) => ({x: x * U, y: y * U, t, c, w: width(t)}));
  const xs = pts.flatMap(p => [p.x - Math.max(p.w / 2, 4), p.x + Math.max(p.w / 2, 4)]);
  const ys = pts.flatMap(p => [p.y - LH / 2, p.y + LH / 2]);
  if (ring) { xs.push((ring[0] - ring[2]) * U, (ring[0] + ring[2]) * U); ys.push((ring[1] - ring[2]) * U, (ring[1] + ring[2]) * U); }
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = Math.max(maxX - minX, width(note || '') * .82), h = maxY - minY;
  return {w, h, note, draw(ox, cy) {
   const dx = ox - minX + (w - (maxX - minX)) / 2, dy = cy - (minY + h / 2);
   const P = p => [p.x + dx, p.y + dy];
   let out = '';
   if (ring) out += `<circle cx="${ring[0] * U + dx}" cy="${ring[1] * U + dy}" r="${ring[2] * U * .55}" class="rx-bond" fill="none"/>`;
   for (const [i, j, order = 1, c] of bonds) {
    const a = pts[i], b = pts[j], [ax, ay] = P(a), [bx, by] = P(b);
    const len = Math.hypot(bx - ax, by - ay) || 1, ux = (bx - ax) / len, uy = (by - ay) / len;
    const cut = p => p.t ? Math.min(Math.abs(ux) > .01 ? (p.w / 2 + 4) / Math.abs(ux) : 1e9, Math.abs(uy) > .01 ? (LH / 2 + 2) / Math.abs(uy) : 1e9) : 0;
    const s = cut(a), e = cut(b), x1 = ax + ux * s, y1 = ay + uy * s, x2 = bx - ux * e, y2 = by - uy * e;
    const offs = order === 2 ? [-3.2, 3.2] : order === 3 ? [-4.5, 0, 4.5] : [0];
    for (const o of offs) out += `<line x1="${x1 - uy * o}" y1="${y1 + ux * o}" x2="${x2 - uy * o}" y2="${y2 + ux * o}" class="rx-bond ${c ? 'rx-' + c : ''}"/>`;
   }
   for (const p of pts) if (p.t) { const [x, y] = P(p); out += `<text x="${x}" y="${y}" class="rx-atom ${p.c ? 'rx-' + p.c : ''}">${esc(p.t)}</text>`; }
   if (note) out += `<text x="${ox + w / 2}" y="${cy + h / 2 + 18}" class="rx-note">${esc(note)}</text>`;
   return out;
  }};
 }
 const txt = (t, note, c) => { const w = Math.max(width(t), width(note || '') * .82) + 6; return {w, h: LH, note, draw: (ox, cy) => `<text x="${ox + w / 2}" y="${cy}" class="rx-atom ${c ? 'rx-' + c : ''}">${esc(t)}</text>${note ? `<text x="${ox + w / 2}" y="${cy + 28}" class="rx-note">${esc(note)}</text>` : ''}`}; };
 const plus = {w: 26, h: LH, draw: (ox, cy) => `<text x="${ox + 13}" y="${cy}" class="rx-atom">+</text>`};
 function arrow(top = '', bottom = '', eq = false) {
  const w = Math.max(76, width(top) * .8 + 26, width(bottom) * .8 + 26);
  return {w, h: LH, draw(ox, cy) {
   const x1 = ox + 6, x2 = ox + w - 6;
   const line = eq ? `<line x1="${x1}" y1="${cy - 3}" x2="${x2}" y2="${cy - 3}" class="rx-arrow"/><path d="M${x2 - 8} ${cy - 8} L${x2} ${cy - 3}" class="rx-arrow"/><line x1="${x1}" y1="${cy + 3}" x2="${x2}" y2="${cy + 3}" class="rx-arrow"/><path d="M${x1 + 8} ${cy + 8} L${x1} ${cy + 3}" class="rx-arrow"/>`
    : `<line x1="${x1}" y1="${cy}" x2="${x2}" y2="${cy}" class="rx-arrow"/><path d="M${x2 - 9} ${cy - 5} L${x2} ${cy} L${x2 - 9} ${cy + 5}" class="rx-arrow" fill="none"/>`;
   return line + (top ? `<text x="${ox + w / 2}" y="${cy - 12}" class="rx-cond">${esc(top)}</text>` : '') + (bottom ? `<text x="${ox + w / 2}" y="${cy + 20}" class="rx-cond">${esc(bottom)}</text>` : '');
  }};
 }
 // Uma figura = linhas; cada linha = sequência de itens (moléculas, +, setas, textos).
 function figure(rows, caption, label) {
  const gap = 10, pad = 14;
  let y = pad, body = '', maxW = 0;
  for (const row of rows) {
   const items = row.items || row;
   const h = Math.max(...items.map(i => i.h)) + (items.some(i => i.note) ? 30 : 8);
   const w = items.reduce((s, i) => s + i.w, 0) + gap * (items.length - 1);
   const cy = y + (h - (items.some(i => i.note) ? 22 : 0)) / 2;
   let x = pad;
   if (row.title) { body += `<text x="${pad}" y="${y + 2}" class="rx-row">${esc(row.title)}</text>`; }
   const top = row.title ? 18 : 0;
   for (const i of items) { body += i.draw(x, cy + top); x += i.w + gap; }
   maxW = Math.max(maxW, w);
   y += h + top + 12;
  }
  const W = maxW + pad * 2, H = y + 2;
  return `<svg class="rx-figure" viewBox="0 0 ${Math.ceil(W)} ${Math.ceil(H)}" style="--rx-w:${Math.ceil(W)}px" role="img" aria-label="${esc(label)}">${body}</svg><figcaption>${esc(caption)}</figcaption>`;
 }

 // ---------- moléculas usadas nos esquemas ----------
 const metano = mol([[1, 1, 'C'], [1, 0, 'H'], [0, 1, 'H'], [2, 1, 'H', 'out'], [1, 2, 'H']], [[0, 1], [0, 2], [0, 3], [0, 4]], 'metano');
 const cloro = mol([[0, 1, 'Cl', 'in'], [1.3, 1, 'Cl']], [[0, 1]], 'cloro');
 const clorometano = mol([[1, 1, 'C'], [1, 0, 'H'], [0, 1, 'H'], [2.2, 1, 'Cl', 'in'], [1, 2, 'H']], [[0, 1], [0, 2], [0, 3, 1, 'in'], [0, 4]], 'clorometano');
 const hcl = mol([[0, 1, 'H', 'out'], [1.2, 1, 'Cl']], [[0, 1]], 'HCl');
 const hex = (cx, cy, r) => [0, 1, 2, 3, 4, 5].map(k => { const a = (-90 + 60 * k) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a), '']; });
 const ringBonds = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]];
 const benzenoH = mol([...hex(1, 1.6, .9), [1, .1, 'H', 'out']], [...ringBonds, [0, 6]], 'benzeno', [1, 1.6, .9]);
 const nitrico = mol([[0, 1, 'HO', 'out'], [1.5, 1, 'NO₂', 'in']], [[0, 1, 1, 'out']], 'ácido nítrico');
 const nitrobenzeno = mol([...hex(1, 1.6, .9), [1, .05, 'NO₂', 'in']], [...ringBonds, [0, 6, 1, 'in']], 'nitrobenzeno', [1, 1.6, .9]);
 const agua = (note = 'água') => txt('H₂O', note, 'out');

 const eteno = mol([[0, 1, 'H₂C'], [1.6, 1, 'CH₂']], [[0, 1, 2]], 'eteno');
 const bromo = mol([[0, 1, 'Br', 'in'], [1.25, 1, 'Br', 'in']], [[0, 1]], 'bromo (castanho)');
 const dibromo = mol([[0, 1, 'H₂C'], [1.6, 1, 'CH₂'], [0, 2.1, 'Br', 'in'], [1.6, 2.1, 'Br', 'in']], [[0, 1], [0, 2, 1, 'in'], [1, 3, 1, 'in']], '1,2-dibromoetano (incolor)');

 const propeno = mol([[0, 1, 'H₂C'], [1.5, 1, 'CH'], [3, 1, 'CH₃']], [[0, 1, 2], [1, 2]], 'propeno');
 const hbr = mol([[0, 1, 'H', 'in'], [1.2, 1, 'Br', 'alt']], [[0, 1]], 'HBr');
 const bromopropano = mol([[0, 1, 'H₂C'], [1.5, 1, 'CH'], [3, 1, 'CH₃'], [0, 0, 'H', 'in'], [1.5, 2.1, 'Br', 'alt']], [[0, 1], [1, 2], [0, 3, 1, 'in'], [1, 4, 1, 'alt']], '2-bromopropano (principal)');

 const etanolE = mol([[0, 1, 'H₂C'], [1.6, 1, 'CH₂'], [0, 2.1, 'H', 'out'], [1.6, 2.1, 'OH', 'out']], [[0, 1], [0, 2, 1, 'out'], [1, 3, 1, 'out']], 'etanol');
 const etenoE = mol([[0, 1, 'H₂C'], [1.6, 1, 'CH₂']], [[0, 1, 2, 'in']], 'eteno');

 const R = (x, y, t = 'R') => [x, y, t];
 const alcPrim = mol([R(0, 1), [1.3, 1, 'CH₂'], [2.7, 1, 'OH']], [[0, 1], [1, 2]], 'álcool');
 const aldeido = mol([R(0, 1), [1.2, 1, 'C'], [1.2, 0, 'O', 'in'], [2.3, 1, 'H']], [[0, 1], [1, 2, 2, 'in'], [1, 3]], 'aldeído');
 const acido = mol([R(0, 1), [1.2, 1, 'C'], [1.2, 0, 'O'], [2.5, 1, 'OH', 'in']], [[0, 1], [1, 2, 2], [1, 3, 1, 'in']], 'ácido carboxílico');
 const alcSec = mol([R(0, 1), [1.3, 1, 'CH'], [2.6, 1, 'R′'], [1.3, 2.1, 'OH']], [[0, 1], [1, 2], [1, 3]], 'álcool');
 const cetona = mol([R(0, 1), [1.2, 1, 'C'], [2.4, 1, 'R′'], [1.2, 0, 'O', 'in']], [[0, 1], [1, 2], [1, 3, 2, 'in']], 'cetona');
 const alcTer = mol([R(0, 1), [1.2, 1, 'C'], [2.4, 1, 'R′'], [1.2, 0, 'R″'], [1.2, 2.1, 'OH']], [[0, 1], [1, 2], [1, 3], [1, 4]], 'álcool');

 const acidoAcetico = mol([[0, 1, 'H₃C'], [1.4, 1, 'C'], [1.4, 0, 'O'], [2.6, 1, 'OH', 'out']], [[0, 1], [1, 2, 2], [1, 3, 1, 'out']], 'ácido etanoico');
 const etanol = mol([[0, 1, 'H', 'out'], [1, 1, 'O', 'alt'], [2.2, 1, 'CH₂'], [3.6, 1, 'CH₃']], [[0, 1, 1, 'out'], [1, 2], [2, 3]], 'etanol');
 const ester = mol([[0, 1, 'H₃C'], [1.4, 1, 'C'], [1.4, 0, 'O'], [2.5, 1, 'O', 'alt'], [3.7, 1, 'CH₂'], [5.1, 1, 'CH₃']], [[0, 1], [1, 2, 2], [1, 3, 1, 'alt'], [3, 4], [4, 5]], 'etanoato de etila (éster)');

 const trig = (note = 'triglicerídeo (óleo ou gordura)') => mol([[0, 0, 'CH₂'], [0, 1.1, 'CH'], [0, 2.2, 'CH₂'], [2.1, 0, 'O–CO–R', 'out'], [2.1, 1.1, 'O–CO–R', 'out'], [2.1, 2.2, 'O–CO–R', 'out']], [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5]], note);
 const glicerol = mol([[0, 0, 'CH₂'], [0, 1.1, 'CH'], [0, 2.2, 'CH₂'], [1.4, 0, 'OH', 'in'], [1.4, 1.1, 'OH', 'in'], [1.4, 2.2, 'OH', 'in']], [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5]], 'glicerol');

 // Cadeias de ácido graxo: dobradas (com dupla cis) ou retas.
 function chains(kinked, note) {
  const w = 190, h = kinked ? 142 : 92;
  return {w, h, note, draw(ox, cy) {
   let out = '';
   for (let k = 0; k < 3; k++) {
    let x = ox + 8, y = cy - h / 2 + 12 + k * (kinked ? 38 : 24), dir = 0;
    const pts = [[x, y]];
    for (let s = 0; s < 9; s++) {
     if (kinked && s === 4) dir = .62;
     const a = dir + (s % 2 ? -.5 : .5); x += Math.cos(a) * 18; y += Math.sin(a) * 18; pts.push([x, y]);
    }
    out += `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" class="rx-chain"/>`;
    if (kinked) {
     const [a, b] = [pts[4], pts[5]], nx = -(b[1] - a[1]) / 18 * 4, ny = (b[0] - a[0]) / 18 * 4;
     out += `<line x1="${(a[0] + nx).toFixed(1)}" y1="${(a[1] + ny).toFixed(1)}" x2="${(b[0] + nx).toFixed(1)}" y2="${(b[1] + ny).toFixed(1)}" class="rx-chain rx-chain-oil"/><line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" class="rx-chain rx-chain-oil"/>`;
    }
   }
   return out + `<text x="${ox + w / 2}" y="${cy + h / 2 + 14}" class="rx-note">${esc(note)}</text>`;
  }};
 }
 const polimero = mol([[0, 1, '['], [1, 1, 'CH₂', 'in'], [2.5, 1, 'CH₂', 'in'], [3.4, 1, ']ₙ']], [[0, 1, 1, 'in'], [1, 2, 1, 'in'], [2, 3, 1, 'in']], 'polietileno');

 const F = {
  'Substituição: troca um átomo por outro': figure([
   {title: 'Alcano: halogenação', items: [metano, plus, cloro, arrow('luz (UV)'), clorometano, plus, hcl]},
   {title: 'Benzeno: nitração (o anel aromático se mantém)', items: [benzenoH, plus, nitrico, arrow('H₂SO₄'), nitrobenzeno, plus, agua()]},
  ], 'Na substituição, um H sai (laranja) e outro átomo ou grupo entra no lugar (azul). No benzeno, o anel continua aromático.', 'Esquema da halogenação do metano e da nitração do benzeno'),
  'Adição: a ligação dupla “abre”': figure([
   {items: [eteno, plus, bromo, arrow('sem catalisador'), dibromo]},
  ], 'A dupla vira simples e cada carbono recebe um bromo. Como o Br₂ castanho é consumido, a cor some: é o teste de insaturação.', 'Esquema da adição de bromo ao eteno'),
  'Regra de Markovnikov': figure([
   {items: [propeno, plus, hbr, arrow(), bromopropano]},
  ], 'O H (azul) vai para o carbono da dupla que já tinha mais hidrogênios (o CH₂). O Br (verde) fica no carbono do meio.', 'Esquema da adição de HBr ao propeno pela regra de Markovnikov'),
  'Hidrogenação de óleos e a margarina': figure([
   {items: [chains(true, 'óleo: duplas cis dobram as cadeias'), arrow('+ H₂', 'Ni, aquecimento'), chains(false, 'gordura: cadeias retas e juntas')]},
  ], 'As duplas cis (laranja) deixam as cadeias tortas e afastadas: o óleo é líquido. Saturadas, elas ficam retas, se empacotam melhor e o material fica sólido.', 'Esquema das cadeias de óleo e de gordura antes e depois da hidrogenação'),
  'Eliminação: forma a dupla': figure([
   {title: 'Desidratação intramolecular (170 °C)', items: [etanolE, arrow('H₂SO₄', '170 °C'), etenoE, plus, agua()]},
   {title: 'Desidratação intermolecular (140 °C)', items: [txt('2 CH₃CH₂–OH', 'etanol'), arrow('H₂SO₄', '140 °C'), txt('CH₃CH₂–O–CH₂CH₃', 'etoxietano (éter)'), plus, agua()]},
  ], 'Sai uma água: o H de um carbono e o OH do vizinho (laranja). Com uma molécula, forma-se a dupla; com duas, forma-se um éter.', 'Esquema da desidratação do etanol formando eteno ou éter'),
  'Oxidação de álcoois': figure([
   {title: 'Álcool primário', items: [alcPrim, arrow('[O]'), aldeido, arrow('[O]'), acido]},
   {title: 'Álcool secundário', items: [alcSec, arrow('[O]'), cetona]},
   {title: 'Álcool terciário', items: [alcTer, arrow('[O]'), txt('não oxida', 'o carbono do OH não tem H', 'out')]},
  ], '[O] representa o oxidante, como KMnO₄ ou K₂Cr₂O₇ em meio ácido. Em azul, o oxigênio que a molécula ganha.', 'Esquema da oxidação de álcoois primário, secundário e terciário'),
  'Esterificação, hidrólise e saponificação': figure([
   {title: 'Esterificação (ida) e hidrólise (volta)', items: [acidoAcetico, plus, etanol, arrow('H⁺', '', true), ester, plus, agua()]},
   {title: 'Saponificação', items: [trig(), plus, txt('3 NaOH', 'base forte'), arrow('aquecimento'), glicerol, plus, txt('3 R–COO⁻ Na⁺', 'sabão', 'in')]},
  ], 'Na esterificação, o OH do ácido e o H do álcool (laranja) saem como água, e o oxigênio do álcool (verde) liga as duas partes. Na saponificação, a base quebra as três ligações éster da gordura.', 'Esquema da esterificação e da saponificação'),
  'Transesterificação: o biodiesel': figure([
   {items: [trig('óleo vegetal'), plus, txt('3 CH₃OH', 'metanol'), arrow('catalisador'), glicerol, plus, txt('3 R–COO–CH₃', 'biodiesel', 'in')]},
  ], 'Cada cadeia R–CO– sai do glicerol (laranja) e se liga ao metanol (azul), formando o biodiesel. O glicerol é o subproduto.', 'Esquema da transesterificação do óleo vegetal em biodiesel'),
  'Polimerização': figure([
   {title: 'Por adição: nada sai', items: [txt('n'), eteno, arrow('pressão, catalisador'), polimero]},
   {title: 'Por condensação: sai uma molécula pequena a cada ligação', items: [txt('HOOC–■–COOH', 'diácido'), plus, txt('HO–●–OH', 'diálcool'), arrow(), txt('[–CO–■–CO–O–●–O–]ₙ', 'poliéster (PET)', 'in'), plus, agua('água')]},
  ], 'Na adição, as duplas se abrem e as unidades se ligam em cadeia. Na condensação, cada nova ligação libera uma água, como no PET e no náilon.', 'Esquema da polimerização por adição e por condensação'),
 };

 const lesson = globalThis.FURG_DIA2_LESSONS?.quimica?.find(l => l.id === 'reacoes-organicas');
 if (lesson) lesson.parts = lesson.parts.map(([title, body]) => F[title] ? [title, body, F[title]] : [title, body]);
 globalThis.FurgReactionFigures = F;
})();
