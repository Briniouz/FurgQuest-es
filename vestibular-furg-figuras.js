'use strict';
// Figuras autorais (SVG) do Simulado FURG · Versão B.
// Usam currentColor para o traço e --vf-acc para o destaque, então funcionam no modo claro, no escuro e no PDF.
(() => {
 const f = n => +n.toFixed(1);
 const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
 const svg = (id, w, h, body, label) => `<svg class="vf-svg" viewBox="0 0 ${w} ${h}" style="max-width:${Math.round(w * 1.08)}px" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="${id}-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="vf-mk"/></marker><marker id="${id}-ara" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="vf-mka"/></marker></defs>${body}</svg>`;
 const T = (x, y, s, cls = '', anchor = 'middle', extra = '') => `<text x="${f(x)}" y="${f(y)}" class="vf-t ${cls}" text-anchor="${anchor}"${extra}>${s}</text>`;
 const L = (x1, y1, x2, y2, cls = 'vf-ln', extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls}"${extra}/>`;
 const smooth = pts => {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
   const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
   d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
 };
 // Eixos cartesianos simples com grade.
 function axes({x0, y0, w, h, xs, ys, xl, yl, grid = true, xlab, ylab}) {
  let o = '';
  const X = v => x0 + (v - xs[0]) / (xs[xs.length - 1] - xs[0]) * w, Y = v => y0 - (v - ys[0]) / (ys[ys.length - 1] - ys[0]) * h;
  if (grid) { for (const v of ys) o += L(x0, Y(v), x0 + w, Y(v), 'vf-grid'); for (const v of xs) o += L(X(v), y0, X(v), y0 - h, 'vf-grid'); }
  o += L(x0, y0, x0 + w + 6, y0, 'vf-ln', ` marker-end="url(#AR)"`) + L(x0, y0, x0, y0 - h - 6, 'vf-ln', ` marker-end="url(#AR)"`);
  for (const v of xs) o += T(X(v), y0 + 13, (xl || String)(v), 'vf-ts');
  for (const v of ys) o += T(x0 - 5, Y(v) + 3.5, (yl || String)(v), 'vf-ts', 'end');
  if (xlab) o += T(x0 + w + 4, y0 + 26, xlab, 'vf-ts', 'end');
  if (ylab) o += T(x0 - 2, y0 - h - 10, ylab, 'vf-ts', 'start');
  return {o, X, Y};
 }
 const withAr = (id, s) => s.replaceAll('url(#AR)', `url(#${id}-ar)`);
 // Recorta a linha entre dois retângulos (para as setas da teia).
 function clip(a, b, ha, hb) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = r => Math.min(Math.abs(r[0] / (dx || 1e-9)), Math.abs(r[1] / (dy || 1e-9)));
  const ta = t(ha), tb = t(hb);
  return [a[0] + dx * ta, a[1] + dy * ta, b[0] - dx * (tb + .02), b[1] - dy * (tb + .02)];
 }
 const F = {};

 // ---------- Biologia ----------
 F['bio-teia'] = (() => {
  const id = 'vfteia', n = {fito: [170, 210, 'Fitoplâncton'], zoo: [170, 158, 'Zooplâncton'], cam: [72, 104, 'Camarão-rosa'], man: [268, 104, 'Manjuba'], cor: [92, 42, 'Corvina'], big: [268, 30, 'Biguá']};
  const box = k => { const [x, y, s] = n[k], w = s.length * 6.3 + 18; return {x, y, w, h: 24, s}; };
  let o = '';
  const edges = [['fito', 'zoo'], ['zoo', 'cam'], ['zoo', 'man'], ['cam', 'cor'], ['man', 'cor'], ['man', 'big'], ['cor', 'big']];
  for (const [a, b] of edges) { const A = box(a), B = box(b), [x1, y1, x2, y2] = clip([A.x, A.y], [B.x, B.y], [A.w / 2, A.h / 2], [B.w / 2, B.h / 2]); o += L(x1, y1, x2, y2, 'vf-ln', ` marker-end="url(#${id}-ar)"`); }
  for (const k in n) { const B = box(k); o += `<rect x="${f(B.x - B.w / 2)}" y="${f(B.y - B.h / 2)}" width="${f(B.w)}" height="${B.h}" rx="7" class="${k === 'fito' ? 'vf-box vf-boxacc' : 'vf-box'}"/>` + T(B.x, B.y + 4, B.s, 'vf-tb'); }
  return svg(id, 340, 228, o, 'Teia alimentar do estuário: fitoplâncton para zooplâncton; zooplâncton para camarão-rosa e manjuba; camarão-rosa e manjuba para corvina; manjuba e corvina para biguá.');
 })();

 F['bio-hemacias'] = (() => {
  const id = 'vfhem'; let o = '';
  const field = (cx, lab) => `<circle cx="${cx}" cy="64" r="50" class="vf-field"/>` + T(cx, 132, lab, 'vf-tb');
  const normal = (x, y) => `<circle cx="${x}" cy="${y}" r="11" class="vf-cell"/><circle cx="${x}" cy="${y}" r="4.5" class="vf-cellin"/>`;
  const swollen = (x, y, r = 15) => `<circle cx="${x}" cy="${y}" r="${r}" class="vf-cell"/>`;
  const crenated = (x, y) => { const p = []; for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, r = i % 2 ? 6.2 : 8.4; p.push(`${f(x + r * Math.cos(a))},${f(y + r * Math.sin(a))}`); } return `<polygon points="${p.join(' ')}" class="vf-cell"/>`; };
  o += field(60, 'I') + normal(42, 50) + normal(74, 46) + normal(58, 80) + normal(84, 76);
  o += field(170, 'II') + swollen(152, 52) + swollen(190, 62) + `<circle cx="160" cy="88" r="14" class="vf-cell vf-dash"/>` + L(150, 84, 146, 80, 'vf-ln') + L(172, 92, 177, 96, 'vf-ln');
  o += field(280, 'III') + crenated(262, 48) + crenated(296, 52) + crenated(270, 82) + crenated(300, 84);
  return svg(id, 340, 140, o, 'Três campos de microscópio: em I, hemácias de forma normal; em II, hemácias inchadas e uma rompida; em III, hemácias murchas, com contorno enrugado.');
 })();

 F['bio-heredograma'] = (() => {
  const id = 'vfher'; let o = '';
  const sq = (x, y, fill, num) => `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" class="${fill ? 'vf-aff' : 'vf-box'}"/>` + T(x, y + 24, num, 'vf-ts');
  const ci = (x, y, fill, num) => `<circle cx="${x}" cy="${y}" r="10.5" class="${fill ? 'vf-aff' : 'vf-box'}"/>` + T(x, y + 24, num, 'vf-ts');
  o += T(14, 39, 'I', 'vf-tb', 'start') + T(14, 109, 'II', 'vf-tb', 'start') + T(14, 179, 'III', 'vf-tb', 'start');
  o += L(140, 35, 180, 35) + sq(130, 35, 0, '1') + ci(190, 35, 0, '2');
  o += L(160, 35, 160, 75) + L(70, 75, 230, 75) + L(70, 75, 70, 95) + L(150, 75, 150, 95) + L(230, 75, 230, 95);
  o += sq(70, 105, 1, '1') + sq(150, 105, 0, '2') + ci(230, 105, 0, '3');
  o += L(241, 105, 290, 105) + sq(300, 105, 1, '4');
  o += L(265, 105, 265, 160) + `<polygon points="265,162 277,175 265,188 253,175" class="vf-box"/>` + T(265, 179.5, '?', 'vf-tb');
  o += `<rect x="40" y="196" width="10" height="10" class="vf-box"/>` + T(55, 205, 'normal', 'vf-ts', 'start') + `<rect x="110" y="196" width="10" height="10" class="vf-aff"/>` + T(125, 205, 'albino', 'vf-ts', 'start');
  return svg(id, 340, 212, o, 'Heredograma: casal normal I-1 e I-2 tem três filhos: II-1, homem albino; II-2, homem normal; II-3, mulher normal. II-3 casa-se com II-4, homem albino, e o primeiro filho do casal está indicado com ponto de interrogação.');
 })();

 F['bio-glicemia'] = (() => {
  const id = 'vfgli';
  const A = axes({x0: 42, y0: 170, w: 250, h: 140, xs: [0, 30, 60, 90, 120, 150, 180], ys: [60, 80, 100, 120, 140, 160], xlab: 'tempo (min)', ylab: 'glicose (mg/dL)'});
  const Yi = v => 170 - v / 80 * 140;
  let o = withAr(id, A.o);
  o += L(292, 170, 292, 24, 'vf-ln');
  for (const v of [0, 20, 40, 60, 80]) o += L(292, Yi(v), 296, Yi(v)) + T(299, Yi(v) + 3.5, v, 'vf-ts', 'start');
  o += T(338, 18, 'insulina (µU/mL)', 'vf-ts', 'end');
  const g = [[0, 85], [15, 105], [30, 128], [45, 140], [60, 132], [90, 110], [120, 95], [150, 88], [180, 86]].map(([t, v]) => [A.X(t), A.Y(v)]);
  const ins = [[0, 8], [15, 20], [30, 42], [45, 58], [60, 62], [90, 45], [120, 25], [150, 14], [180, 10]].map(([t, v]) => [A.X(t), Yi(v)]);
  o += `<path d="${smooth(g)}" class="vf-acc"/><path d="${smooth(ins)}" class="vf-ln vf-dash2"/>`;
  o += L(52, 200, 72, 200, 'vf-acc') + T(76, 203.5, 'glicose', 'vf-ts', 'start') + L(130, 200, 150, 200, 'vf-ln vf-dash2') + T(154, 203.5, 'insulina', 'vf-ts', 'start') + T(240, 203.5, '↑ refeição em t = 0', 'vf-ts', 'start');
  return svg(id, 340, 210, o, 'Gráfico: a glicose sobe de 85 para cerca de 140 mg/dL aos 45 minutos e volta a cerca de 86 aos 180 minutos; a insulina sobe de 8 para cerca de 62 µU/mL aos 60 minutos e cai depois.');
 })();

 // ---------- Física ----------
 F['fis-vt'] = (() => {
  const id = 'vfvt';
  const A = axes({x0: 40, y0: 172, w: 270, h: 140, xs: [0, 2, 4, 6, 8, 10, 12], ys: [0, 2, 4, 6, 8, 10, 12], xlab: 't (s)', ylab: 'v (m/s)'});
  let o = withAr(id, A.o);
  o += L(A.X(0), A.Y(10), A.X(4), A.Y(10), 'vf-guide') + L(A.X(4), A.Y(0), A.X(4), A.Y(10), 'vf-guide') + L(A.X(10), A.Y(0), A.X(10), A.Y(10), 'vf-guide');
  o += `<polyline points="${[[0, 0], [4, 10], [10, 10], [12, 0]].map(([t, v]) => f(A.X(t)) + ',' + f(A.Y(v))).join(' ')}" class="vf-acc"/>`;
  return svg(id, 340, 196, o, 'Gráfico velocidade por tempo: de 0 a 4 s a velocidade sobe de 0 a 10 m/s; de 4 a 10 s fica constante em 10 m/s; de 10 a 12 s cai até zero.');
 })();

 F['fis-blocos'] = (() => {
  const id = 'vfblo'; let o = '';
  o += L(20, 96, 320, 96);
  for (let x = 24; x < 320; x += 12) o += L(x, 96, x - 8, 106, 'vf-grid2');
  o += `<rect x="118" y="38" width="80" height="58" class="vf-box vf-boxacc"/>` + T(158, 64, 'A', 'vf-tb') + T(158, 80, '3,0 kg', 'vf-ts');
  o += `<rect x="198" y="52" width="62" height="44" class="vf-box"/>` + T(229, 72, 'B', 'vf-tb') + T(229, 87, '2,0 kg', 'vf-ts');
  o += L(40, 67, 114, 67, 'vf-acc', ` marker-end="url(#${id}-ara)"`) + T(76, 58, 'F = 20 N', 'vf-tb');
  return svg(id, 340, 112, o, 'Bloco A de 3,0 kg encostado no bloco B de 2,0 kg sobre o piso; uma força de 20 N empurra A para a direita.');
 })();

 F['fis-circuito'] = (() => {
  const id = 'vfcir'; let o = '';
  const zig = (x1, y1, x2, y2) => { const pts = [], n = 6, dx = (x2 - x1), dy = (y2 - y1), len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, px = -uy, py = ux; pts.push([x1, y1]); for (let i = 1; i <= n; i++) { const t = (i - .5) / n, s = i % 2 ? 7 : -7; pts.push([x1 + dx * t + px * s, y1 + dy * t + py * s]); } pts.push([x2, y2]); return `<polyline points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" class="vf-res"/>`; };
  // fios
  o += L(40, 30, 40, 72) + L(40, 92, 40, 150) + L(40, 30, 90, 30) + zig(90, 30, 150, 30) + L(150, 30, 290, 30) + L(40, 150, 290, 150);
  // bateria
  o += L(26, 74, 54, 74, 'vf-ln vf-thick') + L(32, 90, 48, 90, 'vf-ln vf-thick2') + T(66, 86, '12 V', 'vf-tb', 'start') + T(20, 77, '+', 'vf-ts');
  // paralelo
  o += L(210, 30, 210, 62) + zig(210, 62, 210, 118) + L(210, 118, 210, 150) + L(290, 30, 290, 62) + zig(290, 62, 290, 118) + L(290, 118, 290, 150);
  o += `<circle cx="210" cy="30" r="2.6" class="vf-dot"/><circle cx="210" cy="150" r="2.6" class="vf-dot"/>`;
  o += T(120, 20, '2,0 Ω', 'vf-tb') + T(226, 94, '6,0 Ω', 'vf-tb', 'start') + T(306, 94, '3,0 Ω', 'vf-tb', 'start');
  return svg(id, 340, 166, o, 'Circuito: bateria de 12 V em série com um resistor de 2,0 Ω, seguido de dois resistores em paralelo, de 6,0 Ω e de 3,0 Ω.');
 })();

 F['fis-refracao'] = (() => {
  const id = 'vfref'; let o = '';
  o += `<rect x="20" y="100" width="300" height="96" class="vf-soft"/>` + L(20, 100, 320, 100, 'vf-ln vf-thick');
  o += L(170, 14, 170, 192, 'vf-guide');
  const i = 37 * Math.PI / 180, r = Math.asin(.4);
  o += L(170 - Math.sin(i) * 112, 100 - Math.cos(i) * 112, 168, 98.5, 'vf-acc', ` marker-end="url(#${id}-ara)"`);
  o += L(170, 100, 170 + Math.sin(r) * 98, 100 + Math.cos(r) * 98, 'vf-acc', ` marker-end="url(#${id}-ara)"`);
  o += `<path d="M170 64 A36 36 0 0 0 ${f(170 - Math.sin(i) * 36)} ${f(100 - Math.cos(i) * 36)}" class="vf-ln"/>` + T(156, 56, '37°', 'vf-ts');
  o += `<path d="M170 140 A40 40 0 0 0 ${f(170 + Math.sin(r) * 40)} ${f(100 + Math.cos(r) * 40)}" class="vf-ln"/>` + T(184, 154, 'r', 'vf-tb');
  o += T(24, 24, 'ar (n = 1,0)', 'vf-ts', 'start') + T(24, 188, 'vidro (n = 1,5)', 'vf-ts', 'start') + T(176, 22, 'normal', 'vf-ts', 'start');
  return svg(id, 340, 200, o, 'Raio de luz passa do ar para o vidro, incidindo a 37 graus da normal; o raio refratado se aproxima da normal, com ângulo r.');
 })();

 // ---------- Química ----------
 F['qui-solubilidade'] = (() => {
  const id = 'vfsol';
  const A = axes({x0: 44, y0: 180, w: 260, h: 150, xs: [0, 10, 20, 30, 40, 50, 60, 70, 80], ys: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180], xlab: 'temperatura (°C)', ylab: 'g de X / 100 g de água'});
  let o = withAr(id, A.o);
  const pts = [[0, 13], [10, 21], [20, 32], [30, 46], [40, 64], [50, 86], [60, 110], [70, 138], [80, 169]].map(([t, s]) => [A.X(t), A.Y(s)]);
  o += `<path d="${smooth(pts)}" class="vf-acc"/>`;
  for (const [t, s] of [[20, 32], [60, 110]]) o += L(A.X(t), A.Y(0), A.X(t), A.Y(s), 'vf-guide') + L(A.X(0), A.Y(s), A.X(t), A.Y(s), 'vf-guide') + `<circle cx="${f(A.X(t))}" cy="${f(A.Y(s))}" r="3" class="vf-dotacc"/>` + T(A.X(t) - 6, A.Y(s) - 6, s, 'vf-tb', 'end');
  return svg(id, 340, 204, o, 'Curva de solubilidade do sal X: cerca de 32 g por 100 g de água a 20 °C e 110 g a 60 °C, aumentando com a temperatura.');
 })();

 F['qui-lactico'] = (() => {
  const id = 'vflac'; let o = '';
  o += T(64, 74, 'H₃C', 'vf-chem', 'end');
  o += L(68, 70, 112, 70) + T(122, 75, 'C', 'vf-chem') + L(132, 70, 182, 70) + T(192, 75, 'C', 'vf-chem');
  o += L(122, 58, 122, 34) + T(122, 28, 'H', 'vf-chem') + L(122, 82, 122, 104) + T(122, 120, 'OH', 'vf-chem');
  o += L(199, 62, 230, 36) + L(194, 59, 225, 33) + T(236, 30, 'O', 'vf-chem', 'start');
  o += L(200, 78, 230, 102) + T(232, 117, 'OH', 'vf-chem', 'start');
  return svg(id, 300, 130, o, 'Fórmula estrutural do ácido láctico: H3C ligado a um carbono que tem H e OH, ligado a um carbono com dupla ligação com oxigênio e um grupo OH.');
 })();

 // ---------- Matemática ----------
 F['mat-notas'] = (() => {
  const id = 'vfnot';
  const A = axes({x0: 40, y0: 172, w: 270, h: 140, xs: [3, 4, 5, 6, 7, 8, 9, 10], ys: [0, 1, 2, 3, 4, 5, 6, 7], xl: v => v === 3 || v === 10 ? '' : v, xlab: 'nota', ylab: 'nº de estudantes', grid: false});
  let o = withAr(id, A.o);
  for (const v of [1, 2, 3, 4, 5, 6, 7]) o += L(40, A.Y(v), 310, A.Y(v), 'vf-grid');
  for (const [n, c] of [[4, 2], [5, 3], [6, 5], [7, 6], [8, 3], [9, 1]]) o += `<rect x="${f(A.X(n) - 13)}" y="${f(A.Y(c))}" width="26" height="${f(A.Y(0) - A.Y(c))}" class="vf-bar"/>` + T(A.X(n), A.Y(c) - 4, c, 'vf-tb');
  return svg(id, 340, 196, o, 'Gráfico de barras das notas: nota 4, 2 estudantes; nota 5, 3; nota 6, 5; nota 7, 6; nota 8, 3; nota 9, 1.');
 })();

 F['mat-triangulo'] = (() => {
  const id = 'vftri'; let o = '';
  const A = [40, 160], B = [280, 160], C = [40 + 150 * Math.cos(Math.PI / 3), 160 - 150 * Math.sin(Math.PI / 3)];
  o += `<polygon points="${[A, B, C].map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" class="vf-box vf-boxsoft"/>`;
  o += `<path d="M${A[0] + 28} ${A[1]} A28 28 0 0 0 ${f(A[0] + 28 * Math.cos(Math.PI / 3))} ${f(A[1] - 28 * Math.sin(Math.PI / 3))}" class="vf-ln"/>` + T(A[0] + 38, A[1] - 9, '60°', 'vf-ts', 'start');
  o += T(160, 177, '80 m', 'vf-tb') + T((A[0] + C[0]) / 2 - 10, (A[1] + C[1]) / 2, '50 m', 'vf-tb', 'end') + T((B[0] + C[0]) / 2 + 10, (B[1] + C[1]) / 2 - 4, 'x', 'vf-tb vf-it', 'start');
  return svg(id, 340, 186, o, 'Terreno triangular com lados de 50 m e 80 m formando um ângulo de 60 graus; o terceiro lado é x.');
 })();

 F['mat-silo'] = (() => {
  const id = 'vfsil'; let o = '';
  const cx = 100, rx = 60, ry = 11, yb = 232, yt = 82, apex = 22;
  o += `<path d="M${cx - rx} ${yt} L${cx - rx} ${yb} A${rx} ${ry} 0 0 0 ${cx + rx} ${yb} L${cx + rx} ${yt}" class="vf-box vf-boxsoft"/>`;
  o += `<path d="M${cx - rx} ${yt} L${cx} ${apex} L${cx + rx} ${yt}" class="vf-box vf-boxsoft"/>`;
  o += `<ellipse cx="${cx}" cy="${yt}" rx="${rx}" ry="${ry}" class="vf-ln vf-dash"/>` + `<path d="M${cx - rx} ${yb} A${rx} ${ry} 0 0 1 ${cx + rx} ${yb}" class="vf-ln vf-dash"/>`;
  o += L(cx, yb, cx + rx, yb, 'vf-ln') + `<circle cx="${cx}" cy="${yb}" r="2.2" class="vf-dot"/>` + T(cx + rx / 2, yb + 24, '3 m', 'vf-tb');
  o += L(cx + rx + 18, yt, cx + rx + 18, yb, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + T(cx + rx + 24, (yt + yb) / 2 + 4, '10 m', 'vf-tb', 'start');
  o += L(cx + rx + 18, apex, cx + rx + 18, yt, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + L(cx, apex, cx + rx + 24, apex, 'vf-guide') + T(cx + rx + 24, (apex + yt) / 2 + 4, '4 m', 'vf-tb', 'start');
  return svg(id, 230, 262, o, 'Silo formado por um cilindro de raio 3 m e altura 10 m, coberto por um cone de mesmo raio e altura 4 m.');
 })();

 // ---------- Geografia ----------
 F['geo-escala'] = (() => {
  const id = 'vfesc'; let o = '';
  o += `<path d="M20 20 C70 30 110 12 150 34 S230 52 260 26 S310 30 320 22 L320 6 L20 6 Z" class="vf-soft"/>`;
  o += `<path d="M20 20 C70 30 110 12 150 34 S230 52 260 26 S310 30 320 22 L320 118 L20 118 Z" class="vf-land"/>`;
  o += `<path d="M20 20 C70 30 110 12 150 34 S230 52 260 26 S310 30 320 22" class="vf-ln"/>`;
  o += T(306, 17, 'oceano', 'vf-ts vf-it', 'end');
  const a = [60, 98], b = [230, 58];
  o += L(a[0], a[1], b[0], b[1], 'vf-acc vf-dash');
  o += `<circle cx="${a[0]}" cy="${a[1]}" r="4" class="vf-dotacc"/><circle cx="${b[0]}" cy="${b[1]}" r="4" class="vf-dotacc"/>` + T(a[0] - 6, a[1] + 15, 'A (farol)', 'vf-tb', 'start') + T(b[0] + 6, b[1] + 16, 'B (terminal)', 'vf-tb', 'start');
  const x0 = 70, seg = 50;
  for (let i = 0; i < 4; i++) o += `<rect x="${x0 + i * seg}" y="132" width="${seg}" height="8" class="${i % 2 ? 'vf-box' : 'vf-boxfill'}"/>`;
  for (let i = 0; i <= 4; i++) o += T(x0 + i * seg, 154, i * 2, 'vf-ts');
  o += T(x0 + 4 * seg + 12, 154, 'km', 'vf-ts', 'start');
  return svg(id, 340, 160, o, 'Mapa esquemático com os pontos A, farol, e B, terminal, ligados por uma linha; escala gráfica com quatro segmentos marcados 0, 2, 4, 6 e 8 km.');
 })();

 F['geo-climograma'] = (() => {
  const id = 'vfcli';
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], rain = [110, 115, 105, 100, 110, 120, 140, 135, 125, 105, 95, 100], temp = [23.9, 23.8, 22.6, 19.8, 16.6, 13.9, 13.4, 14.0, 15.5, 18.0, 20.6, 22.7];
  const x0 = 40, y0 = 176, w = 252, h = 140, bw = w / 12, Y = v => y0 - v / 200 * h, Yt = v => y0 - v / 30 * h;
  let o = '';
  for (const v of [50, 100, 150, 200]) o += L(x0, Y(v), x0 + w, Y(v), 'vf-grid');
  rain.forEach((r, i) => { o += `<rect x="${f(x0 + i * bw + 3)}" y="${f(Y(r))}" width="${f(bw - 6)}" height="${f(y0 - Y(r))}" class="vf-bar"/>`; });
  o += `<path d="${smooth(temp.map((t, i) => [x0 + i * bw + bw / 2, Yt(t)]))}" class="vf-ln vf-thick"/>`;
  temp.forEach((t, i) => { o += `<circle cx="${f(x0 + i * bw + bw / 2)}" cy="${f(Yt(t))}" r="2.4" class="vf-dot"/>`; });
  o += L(x0, y0, x0 + w, y0) + L(x0, y0, x0, y0 - h) + L(x0 + w, y0, x0 + w, y0 - h);
  for (const v of [0, 50, 100, 150, 200]) o += T(x0 - 5, Y(v) + 3.5, v, 'vf-ts', 'end');
  for (const v of [0, 10, 20, 30]) o += L(x0 + w, Yt(v), x0 + w + 4, Yt(v)) + T(x0 + w + 7, Yt(v) + 3.5, v, 'vf-ts', 'start');
  months.forEach((m, i) => { o += T(x0 + i * bw + bw / 2, y0 + 13, m, 'vf-ts'); });
  o += T(x0 - 4, 24, 'chuva (mm)', 'vf-ts', 'start') + T(338, 24, 'temperatura (°C)', 'vf-ts', 'end');
  o += `<rect x="60" y="196" width="12" height="9" class="vf-bar"/>` + T(76, 204, 'precipitação', 'vf-ts', 'start') + L(160, 200, 180, 200, 'vf-ln vf-thick') + T(184, 204, 'temperatura média', 'vf-ts', 'start');
  return svg(id, 340, 210, o, 'Climograma: chuvas mensais entre 95 e 140 mm em todos os meses; temperatura média de cerca de 24 °C em janeiro a cerca de 13 °C em julho.');
 })();

 F['geo-piramide'] = (() => {
  const id = 'vfpir';
  const groups = ['80+', '70–79', '60–69', '50–59', '40–49', '30–39', '20–29', '10–19', '0–9'], men = [0.9, 2.3, 4.3, 5.9, 7.1, 7.9, 7.6, 6.7, 5.9], women = [1.6, 3.0, 5.0, 6.4, 7.4, 8.0, 7.5, 6.4, 5.6];
  const cx = 170, gap = 22, k = 15, top = 26, bh = 16; let o = '';
  for (const v of [2, 4, 6, 8]) o += L(cx - gap - v * k, top - 4, cx - gap - v * k, top + 9 * bh + 2, 'vf-grid') + L(cx + gap + v * k, top - 4, cx + gap + v * k, top + 9 * bh + 2, 'vf-grid');
  groups.forEach((g, i) => {
   const y = top + i * bh;
   o += `<rect x="${f(cx - gap - men[i] * k)}" y="${y + 1.5}" width="${f(men[i] * k)}" height="${bh - 3}" class="vf-bar"/>`;
   o += `<rect x="${cx + gap}" y="${y + 1.5}" width="${f(women[i] * k)}" height="${bh - 3}" class="vf-bar2"/>`;
   o += T(cx, y + bh / 2 + 3.5, g, 'vf-ts');
  });
  const yb = top + 9 * bh + 14;
  for (const v of [0, 2, 4, 6, 8]) o += T(cx - gap - v * k, yb, v, 'vf-ts') + T(cx + gap + v * k, yb, v, 'vf-ts');
  o += T(cx, yb + 14, '% da população', 'vf-ts') + T(cx - gap - 60, 16, 'Homens', 'vf-tb') + T(cx + gap + 60, 16, 'Mulheres', 'vf-tb');
  return svg(id, 340, 214, o, 'Pirâmide etária de um país hipotético: base de 0 a 9 anos mais estreita que as faixas de 20 a 49 anos, que são as maiores, e topo relativamente largo nas faixas acima de 60 anos.');
 })();

 F['geo-matriz'] = (() => {
  const id = 'vfmat';
  const rows = [['Hidrelétrica', 55, 10], ['Eólica', 15, 6], ['Solar', 8, 4], ['Biomassa', 8, 0], ['Gás natural', 9, 25], ['Carvão mineral', 5, 40], ['Nuclear', 0, 15]];
  const x0 = 96, k = 3.6, top = 30, rh = 24; let o = '';
  for (const v of [0, 10, 20, 30, 40, 50, 60]) o += L(x0 + v * k, top - 4, x0 + v * k, top + rows.length * rh, 'vf-grid') + T(x0 + v * k, top + rows.length * rh + 12, v, 'vf-ts');
  rows.forEach(([name, a, b], i) => {
   const y = top + i * rh;
   o += T(x0 - 6, y + 14, name, 'vf-ts', 'end');
   o += `<rect x="${x0}" y="${y + 2}" width="${f(Math.max(a * k, .6))}" height="9" class="vf-bar"/>` + T(x0 + a * k + 4, y + 10, a, 'vf-tss', 'start');
   o += `<rect x="${x0}" y="${y + 12}" width="${f(Math.max(b * k, .6))}" height="9" class="vf-bar2"/>` + T(x0 + b * k + 4, y + 20, b, 'vf-tss', 'start');
  });
  o += T(x0 + 120, top + rows.length * rh + 26, '% da eletricidade gerada', 'vf-ts');
  o += `<rect x="110" y="8" width="12" height="9" class="vf-bar"/>` + T(126, 16, 'País A', 'vf-ts', 'start') + `<rect x="190" y="8" width="12" height="9" class="vf-bar2"/>` + T(206, 16, 'País B', 'vf-ts', 'start');
  return svg(id, 340, 230, o, 'Gráfico de barras. País A: hidrelétrica 55%, eólica 15%, solar 8%, biomassa 8%, gás natural 9%, carvão 5%, nuclear 0. País B: hidrelétrica 10%, eólica 6%, solar 4%, biomassa 0, gás natural 25%, carvão 40%, nuclear 15%.');
 })();

 // ---------- Artes ----------
 F['art-perspectiva'] = (() => {
  const id = 'vfper'; let o = '';
  const vp = [170, 92], o1 = [20, 10, 320, 190], b = [132, 66, 208, 120];
  o += `<rect x="${o1[0]}" y="${o1[1]}" width="${o1[2] - o1[0]}" height="${o1[3] - o1[1]}" class="vf-box"/>`;
  o += `<rect x="${b[0]}" y="${b[1]}" width="${b[2] - b[0]}" height="${b[3] - b[1]}" class="vf-box vf-boxsoft"/>`;
  o += L(o1[0], o1[1], b[0], b[1]) + L(o1[2], o1[1], b[2], b[1]) + L(o1[0], o1[3], b[0], b[3]) + L(o1[2], o1[3], b[2], b[3]);
  // ladrilhos do piso: linhas para o ponto de fuga
  for (const x of [70, 120, 170, 220, 270]) { const t = (b[3] - vp[1]) / (o1[3] - vp[1]); o += L(x, o1[3], vp[0] + (x - vp[0]) * t, b[3], 'vf-grid2'); }
  for (const y of [126, 135, 148, 167]) { const t = (y - vp[1]) / (o1[3] - vp[1]); o += L(vp[0] + (o1[0] - vp[0]) * t, y, vp[0] + (o1[2] - vp[0]) * t, y, 'vf-grid2'); }
  // portas nas paredes laterais
  const door = (xa, xb, side) => { const at = x => (x - vp[0]) / (side * (o1[side > 0 ? 2 : 0] - vp[0]) * side); const yt = x => vp[1] + (o1[1] + 52 - vp[1]) * ((x - vp[0]) / (o1[side > 0 ? 2 : 0] - vp[0])); const yb = x => vp[1] + (o1[3] - vp[1]) * ((x - vp[0]) / (o1[side > 0 ? 2 : 0] - vp[0])); return `<polygon points="${f(xa)},${f(yb(xa))} ${f(xa)},${f(yt(xa))} ${f(xb)},${f(yt(xb))} ${f(xb)},${f(yb(xb))}" class="vf-box vf-boxsoft"/>`; };
  o += door(52, 84, -1) + door(256, 288, 1);
  return svg(id, 340, 200, o, 'Desenho de um corredor: as linhas do piso, do teto, das paredes e das portas convergem para um único ponto no centro da parede do fundo.');
 })();

 globalThis.FurgVestFigKit = {f, esc, svg, T, L, smooth, axes, withAr, clip};
 globalThis.FURG_VEST_FIGS = Object.assign(globalThis.FURG_VEST_FIGS || {}, F);
})();
