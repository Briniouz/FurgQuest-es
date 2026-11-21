'use strict';
// Figuras autorais (SVG) do Simulado FURG · Versão C. Usa os mesmos auxiliares da Versão B.
(() => {
 const K = globalThis.FurgVestFigKit;
 if (!K) return;
 const {f, svg, T, L, smooth, axes, withAr} = K;
 const F = {};

 // ---------- Biologia ----------
 F['c-bio-enzima'] = (() => {
  const id = 'vfcenz';
  const A = axes({x0: 44, y0: 172, w: 260, h: 140, xs: [0, 10, 20, 30, 40, 50, 60, 70], ys: [0, 20, 40, 60, 80, 100], xlab: 'temperatura (°C)', ylab: 'atividade (%)'});
  const pts = [[0, 5], [10, 14], [20, 34], [30, 70], [37, 100], [43, 88], [50, 42], [55, 14], [59, 2], [60, 0]].map(([x, y]) => [A.X(x), A.Y(y)]);
  let o = withAr(id, A.o) + `<path d="${smooth(pts)}" class="vf-acc"/>` + L(A.X(60), A.Y(0), A.X(70), A.Y(0), 'vf-acc');
  return svg(id, 340, 196, o, 'Gráfico: a atividade da enzima cresce com a temperatura até o máximo perto de 37 °C e depois cai rapidamente, chegando a zero perto de 60 °C.');
 })();

 F['c-bio-luz'] = (() => {
  const id = 'vfcluz';
  const A = axes({x0: 44, y0: 172, w: 260, h: 140, xs: [0, 2, 4, 6, 8, 10], ys: [-2, 0, 2, 4, 6], xlab: 'intensidade luminosa', ylab: 'O₂ liberado (u.a.)'});
  const pts = [[0, -2], [1, -1], [2, 0], [3, 1.2], [4, 2.4], [5, 3.4], [6, 4.1], [7, 4.6], [8, 4.9], [9, 5], [10, 5]].map(([x, y]) => [A.X(x), A.Y(y)]);
  let o = withAr(id, A.o) + L(A.X(0), A.Y(0), A.X(10), A.Y(0), 'vf-ln') + `<path d="${smooth(pts)}" class="vf-acc"/>`;
  o += `<circle cx="${f(A.X(2))}" cy="${f(A.Y(0))}" r="3.4" class="vf-dotacc"/>` + T(A.X(2) + 2, A.Y(0) + 15, 'P', 'vf-tb');
  return svg(id, 340, 196, o, 'Gráfico: com pouca luz a liberação de oxigênio é negativa; a curva cruza o zero no ponto P e depois sobe até se estabilizar.');
 })();

 // ---------- Física ----------
 F['c-fis-lancamento'] = (() => {
  const id = 'vfclan'; let o = '';
  const top = 60, floor = 176, edge = 110;
  o += `<rect x="20" y="${top}" width="${edge - 20}" height="8" class="vf-box vf-boxsoft"/>` + L(30, top + 8, 30, floor) + L(edge - 10, top + 8, edge - 10, floor);
  o += L(10, floor, 330, floor) + `<circle cx="${edge - 6}" cy="${top - 7}" r="7" class="vf-boxacc vf-box"/>`;
  o += L(edge + 4, top - 7, edge + 52, top - 7, 'vf-acc', ` marker-end="url(#${id}-ara)"`) + T(edge + 28, top - 16, 'v = 4,0 m/s', 'vf-tb');
  const pts = []; for (let i = 0; i <= 20; i++) { const s = i / 20; pts.push([edge - 6 + s * 190, top - 7 + s * s * (floor - top)]); }
  o += `<polyline points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" class="vf-guide"/>`;
  o += L(edge + 196, top, edge + 196, floor, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + T(edge + 202, (top + floor) / 2 + 4, '1,25 m', 'vf-tb', 'start');
  o += L(edge - 6, floor + 14, edge + 184, floor + 14, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + T(edge + 89, floor + 28, 'x', 'vf-tb vf-it');
  return svg(id, 340, 210, o, 'Bolinha deixa a borda de uma mesa a 1,25 m do chão com velocidade horizontal de 4,0 m/s e descreve uma trajetória curva até tocar o chão a uma distância x.');
 })();

 F['c-fis-colisao'] = (() => {
  const id = 'vfccol'; let o = '';
  const cart = (x, y, w, lab, m, acc) => `<rect x="${x}" y="${y}" width="${w}" height="26" rx="3" class="vf-box${acc ? ' vf-boxacc' : ''}"/><circle cx="${x + 10}" cy="${y + 30}" r="4" class="vf-box"/><circle cx="${x + w - 10}" cy="${y + 30}" r="4" class="vf-box"/>` + T(x + w / 2, y + 12, lab, 'vf-tb') + T(x + w / 2, y + 23, m, 'vf-tss');
  o += T(14, 22, 'Antes', 'vf-tb', 'start') + L(14, 66, 326, 66) + cart(40, 32, 60, 'A', '2,0 kg', true) + L(104, 45, 150, 45, 'vf-acc', ` marker-end="url(#${id}-ara)"`) + T(127, 38, '3,0 m/s', 'vf-ts') + cart(220, 32, 46, 'B', '1,0 kg') + T(243, 82, 'em repouso', 'vf-ts');
  o += T(14, 112, 'Depois', 'vf-tb', 'start') + L(14, 156, 326, 156) + cart(130, 122, 60, 'A', '2,0 kg', true) + cart(190, 122, 46, 'B', '1,0 kg') + L(240, 135, 286, 135, 'vf-acc', ` marker-end="url(#${id}-ara)"`) + T(263, 128, 'v = ?', 'vf-ts');
  return svg(id, 340, 168, o, 'Antes: carrinho A de 2,0 kg a 3,0 m/s e carrinho B de 1,0 kg em repouso. Depois: os dois carrinhos unidos se movem com velocidade v.');
 })();

 F['c-fis-transformador'] = (() => {
  const id = 'vfctra'; let o = '';
  o += `<rect x="100" y="30" width="140" height="120" class="vf-box vf-boxsoft"/><rect x="122" y="52" width="96" height="76" class="vf-box"/>`;
  for (let i = 0; i < 7; i++) { const y = 46 + i * 13; o += `<ellipse cx="111" cy="${y + 6}" rx="16" ry="4.5" class="vf-res"/>`; }
  for (let i = 0; i < 3; i++) { const y = 70 + i * 13; o += `<ellipse cx="229" cy="${y + 6}" rx="16" ry="4.5" class="vf-res"/>`; }
  o += L(95, 52, 50, 52) + L(95, 136, 50, 136) + `<circle cx="40" cy="94" r="14" class="vf-box"/>` + T(40, 99, '~', 'vf-chem') + L(40, 52, 50, 52) + L(40, 52, 40, 80) + L(40, 108, 40, 136) + L(40, 136, 50, 136);
  o += L(245, 76, 290, 76) + L(245, 108, 290, 108) + `<circle cx="290" cy="76" r="2.6" class="vf-dot"/><circle cx="290" cy="108" r="2.6" class="vf-dot"/>` + T(298, 96, 'Vs = ?', 'vf-tb', 'start');
  o += T(40, 26, '220 V', 'vf-tb') + T(100, 172, 'primário: 1.000 espiras', 'vf-ts', 'start') + T(240, 22, 'secundário: 50 espiras', 'vf-ts', 'end') + T(170, 92, 'núcleo de ferro', 'vf-tss');
  return svg(id, 340, 182, o, 'Transformador: núcleo de ferro com enrolamento primário de 1.000 espiras ligado a 220 V alternados e secundário de 50 espiras, com tensão desconhecida.');
 })();

 F['c-fis-corda'] = (() => {
  const id = 'vfccor'; let o = '';
  const x0 = 34, x1 = 306, y = 70, amp = 30, n = 3;
  o += L(x0, 30, x0, 110, 'vf-ln vf-thick') + L(x1, 30, x1, 110, 'vf-ln vf-thick');
  const wave = s => { const p = []; for (let i = 0; i <= 120; i++) { const x = x0 + (x1 - x0) * i / 120; p.push([x, y + s * amp * Math.sin(n * Math.PI * i / 120)]); } return `<polyline points="${p.map(q => f(q[0]) + ',' + f(q[1])).join(' ')}" class="${s > 0 ? 'vf-acc' : 'vf-guide'}"/>`; };
  o += wave(1) + wave(-1) + L(x0, y, x1, y, 'vf-grid2');
  o += L(x0, 124, x1, 124, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + T((x0 + x1) / 2, 140, '1,2 m', 'vf-tb');
  return svg(id, 340, 148, o, 'Corda de 1,2 m presa nas duas pontas vibrando em onda estacionária com três ventres.');
 })();

 // ---------- Química ----------
 F['c-qui-pilha'] = (() => {
  const id = 'vfcpil'; let o = '';
  const beaker = (x, lab, ion) => `<path d="M${x} 70 L${x} 170 Q${x} 180 ${x + 10} 180 L${x + 90} 180 Q${x + 100} 180 ${x + 100} 170 L${x + 100} 70" class="vf-ln"/><rect x="${x + 2}" y="100" width="96" height="78" class="vf-soft"/>` + T(x + 50, 196, ion, 'vf-ts');
  o += beaker(20, 'Cu', 'solução de Cu²⁺') + beaker(220, 'Ag', 'solução de Ag⁺');
  o += `<rect x="52" y="54" width="14" height="104" class="vf-box vf-boxfill" style="fill-opacity:.25"/>` + T(48, 76, 'Cu', 'vf-tb', 'end');
  o += `<rect x="274" y="54" width="14" height="104" class="vf-box vf-boxfill" style="fill-opacity:.25"/>` + T(292, 76, 'Ag', 'vf-tb', 'start');
  o += `<path d="M96 160 L96 84 Q96 66 114 66 L226 66 Q244 66 244 84 L244 160" class="vf-ln vf-thick" style="stroke-opacity:.45"/>` + T(170, 60, 'ponte salina', 'vf-ts');
  o += L(59, 54, 59, 18) + L(59, 18, 150, 18) + L(190, 18, 281, 18) + L(281, 18, 281, 54) + `<circle cx="170" cy="18" r="13" class="vf-box"/>` + T(170, 22.5, 'V', 'vf-tb');
  return svg(id, 340, 204, o, 'Pilha: eletrodo de cobre em solução de íons cobre e eletrodo de prata em solução de íons prata, ligados por fio com voltímetro e por uma ponte salina.');
 })();

 // ---------- Matemática ----------
 F['c-mat-parabola'] = (() => {
  const id = 'vfcpar';
  const A = axes({x0: 40, y0: 170, w: 270, h: 140, xs: [0, 1, 2, 3, 4, 5], ys: [0, 5, 10, 15, 20, 25], xlab: 't (s)', ylab: 'h (m)'});
  const pts = []; for (let i = 0; i <= 40; i++) { const t = 4.07 * i / 40; pts.push([A.X(t), A.Y(-5 * t * t + 20 * t + 1.5)]); }
  return svg(id, 340, 194, withAr(id, A.o) + `<polyline points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" class="vf-acc"/>`, 'Gráfico da altura da bola em função do tempo: uma parábola com concavidade para baixo que começa em 1,5 m, sobe e volta ao chão pouco depois de 4 s.');
 })();

 F['c-mat-sombra'] = (() => {
  const id = 'vfcsom'; let o = '', k = 5, g = 176;
  const px = 40, bx = 170;
  o += L(10, g, 330, g);
  o += L(px, g, px, g - 6 * k, 'vf-ln vf-thick') + T(px - 6, g - 3 * k + 4, '6 m', 'vf-tb', 'end');
  o += L(px, g + 10, px + 4 * k, g + 10, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + T(px + 2 * k, g + 24, '4 m', 'vf-tb');
  o += L(px, g - 6 * k, px + 4 * k, g, 'vf-guide');
  o += `<rect x="${bx - 40}" y="${g - 27 * k}" width="40" height="${27 * k}" class="vf-box vf-boxsoft"/>` + T(bx - 46, g - 13.5 * k + 4, 'H', 'vf-tb vf-it', 'end');
  o += L(bx, g - 27 * k, bx + 18 * k, g, 'vf-guide');
  o += L(bx, g + 10, bx + 18 * k, g + 10, 'vf-ln', ` marker-start="url(#${id}-ar)" marker-end="url(#${id}-ar)"`) + T(bx + 9 * k, g + 24, '18 m', 'vf-tb');
  o += `<circle cx="318" cy="22" r="9" class="vf-dotacc"/>` + T(306, 26, 'Sol', 'vf-ts', 'end');
  return svg(id, 340, 206, o, 'Poste de 6 m com sombra de 4 m e prédio de altura H com sombra de 18 m; os raios de sol são paralelos.');
 })();

 F['c-mat-mare'] = (() => {
  const id = 'vfcmar';
  const A = axes({x0: 40, y0: 168, w: 276, h: 138, xs: [0, 3, 6, 9, 12, 15, 18, 21, 24], ys: [0, 0.5, 1, 1.5, 2, 2.5], yl: v => String(v).replace('.', ','), xlab: 't (h)', ylab: 'h (m)'});
  const pts = []; for (let i = 0; i <= 96; i++) { const t = 24 * i / 96; pts.push([A.X(t), A.Y(1.5 + 0.5 * Math.sin(Math.PI * t / 6))]); }
  return svg(id, 340, 192, withAr(id, A.o) + `<polyline points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" class="vf-acc"/>`, 'Gráfico da maré: começa em 1,5 m à meia-noite, sobe a 2,0 m às 3 h, desce a 1,0 m às 9 h e repete o ciclo a cada 12 horas.');
 })();

 F['c-mat-reta'] = (() => {
  const id = 'vfcret';
  const A = axes({x0: 70, y0: 200, w: 200, h: 180, xs: [-1, 0, 1, 2, 3, 4], ys: [-2, 0, 2, 4, 6, 8, 10], xlab: 'x', ylab: 'y'});
  let o = withAr(id, A.o) + L(A.X(0), A.Y(-2), A.X(0), A.Y(10), 'vf-ln') + L(A.X(-1), A.Y(0), A.X(4), A.Y(0), 'vf-ln');
  o += L(A.X(-1 / 3), A.Y(-2), A.X(11 / 3), A.Y(10), 'vf-acc');
  for (const [x, y, n] of [[1, 2, 'A'], [3, 8, 'B']]) o += `<circle cx="${f(A.X(x))}" cy="${f(A.Y(y))}" r="3.4" class="vf-dotacc"/>` + T(A.X(x) + 8, A.Y(y) + 4, n, 'vf-tb', 'start');
  return svg(id, 340, 224, o, 'Plano cartesiano com a reta r passando pelos pontos A(1, 2) e B(3, 8).');
 })();

 // ---------- Humanas ----------
 F['c-soc-horas'] = (() => {
  const id = 'vfchor'; let o = '';
  const x0 = 80, k = 10.5;
  for (const v of [0, 5, 10, 15, 20, 25]) o += L(x0 + v * k, 18, x0 + v * k, 104, 'vf-grid') + T(x0 + v * k, 118, v, 'vf-ts');
  o += `<rect x="${x0}" y="30" width="${f(21.3 * k)}" height="24" class="vf-bar"/>` + T(x0 - 8, 46, 'Mulheres', 'vf-tb', 'end') + T(x0 + 21.3 * k + 5, 46, '≈ 21,3 h', 'vf-tb', 'start');
  o += `<rect x="${x0}" y="68" width="${f(11.7 * k)}" height="24" class="vf-bar2"/>` + T(x0 - 8, 84, 'Homens', 'vf-tb', 'end') + T(x0 + 11.7 * k + 5, 84, '≈ 11,7 h', 'vf-tb', 'start');
  o += T(x0 + 12.5 * k, 134, 'horas por semana', 'vf-ts');
  return svg(id, 340, 140, o, 'Gráfico de barras: mulheres dedicam cerca de 21,3 horas semanais a afazeres domésticos e cuidados; homens, cerca de 11,7 horas.');
 })();

 F['c-geo-coordenadas'] = (() => {
  const id = 'vfccoo'; let o = '';
  const x0 = 36, y0 = 16, w = 280, h = 180, lon = [-90, 30], lat = [30, -60];
  const X = v => x0 + (v - lon[0]) / (lon[1] - lon[0]) * w, Y = v => y0 + (lat[0] - v) / (lat[0] - lat[1]) * h;
  o += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" class="vf-box vf-boxsoft"/>`;
  for (let v = -80; v <= 20; v += 10) o += L(X(v), y0, X(v), y0 + h, 'vf-grid');
  for (let v = 20; v >= -50; v -= 10) o += L(x0, Y(v), x0 + w, Y(v), 'vf-grid');
  for (const v of [-90, -60, -30, 0, 30]) o += T(X(v), y0 + h + 13, v === 0 ? '0°' : Math.abs(v) + (v < 0 ? '° O' : '° L'), 'vf-tss');
  for (const v of [30, 0, -30, -60]) o += T(x0 - 4, Y(v) + 3, v === 0 ? '0°' : Math.abs(v) + (v > 0 ? '° N' : '° S'), 'vf-tss', 'end');
  o += L(x0, Y(0), x0 + w, Y(0), 'vf-ln vf-thick') + T(x0 + w - 4, Y(0) - 4, 'Equador', 'vf-ts', 'end');
  o += L(X(0), y0, X(0), y0 + h, 'vf-ln vf-thick') + T(X(0) + 4, y0 + 12, 'Greenwich', 'vf-ts', 'start');
  o += L(x0, Y(-23.4), x0 + w, Y(-23.4), 'vf-ln vf-dash') + T(X(-4), Y(-23.4) - 4, 'Trópico de Capricórnio', 'vf-ts', 'end');
  o += `<circle cx="${f(X(-50))}" cy="${f(Y(-30))}" r="4" class="vf-dotacc"/>` + T(X(-50) - 7, Y(-30) + 4, 'P', 'vf-tb', 'end');
  return svg(id, 340, 214, o, 'Rede de coordenadas com a Linha do Equador, o Meridiano de Greenwich e o Trópico de Capricórnio; o ponto P está a 30 graus de latitude sul e 50 graus de longitude oeste.');
 })();

 F['c-geo-ilha'] = (() => {
  const id = 'vfcilh';
  const labels = ['rural', 'subúrbio', 'centro', 'bairro', 'parque', 'subúrbio', 'rural'], temps = [24, 26, 29, 27.5, 25, 26, 24];
  const x0 = 44, y0 = 170, w = 270, h = 140, X = i => x0 + 18 + i * (w - 36) / 6, Y = v => y0 - (v - 22) / 8 * h;
  let o = '';
  for (const v of [22, 24, 26, 28, 30]) o += L(x0, Y(v), x0 + w, Y(v), 'vf-grid') + T(x0 - 5, Y(v) + 3.5, v, 'vf-ts', 'end');
  o += L(x0, y0, x0 + w, y0) + L(x0, y0, x0, y0 - h - 6);
  o += `<path d="${smooth(temps.map((t, i) => [X(i), Y(t)]))}" class="vf-acc"/>`;
  temps.forEach((t, i) => { o += `<circle cx="${f(X(i))}" cy="${f(Y(t))}" r="2.6" class="vf-dotacc"/>` + T(X(i), y0 + 13, labels[i], 'vf-tss'); });
  o += T(x0 - 2, y0 - h - 10, 'temperatura (°C)', 'vf-ts', 'start');
  return svg(id, 340, 190, o, 'Perfil de temperatura: 24 °C na zona rural, 26 no subúrbio, 29 no centro, 27,5 em um bairro, 25 em um parque, 26 no subúrbio e 24 na zona rural do outro lado.');
 })();

 // ---------- Linguagens ----------
 F['c-art-circulo'] = (() => {
  const id = 'vfccir'; let o = '';
  const cx = 170, cy = 104, R = 78, r = 34;
  const cols = [['amarelo', '#f2c200'], ['laranja', '#f08a1c'], ['vermelho', '#d93025'], ['violeta', '#7b3fb0'], ['azul', '#2563c9'], ['verde', '#2e9e4f']];
  cols.forEach(([name, c], i) => {
   const a0 = (i * 60 - 120) * Math.PI / 180, a1 = ((i + 1) * 60 - 120) * Math.PI / 180, am = (a0 + a1) / 2;
   const p = (rad, a) => `${f(cx + rad * Math.cos(a))} ${f(cy + rad * Math.sin(a))}`;
   o += `<path d="M${p(r, a0)} L${p(R, a0)} A${R} ${R} 0 0 1 ${p(R, a1)} L${p(r, a1)} A${r} ${r} 0 0 0 ${p(r, a0)} Z" style="fill:${c}" class="vf-wedge"/>`;
   const tx = cx + (R + 16) * Math.cos(am), ty = cy + (R + 16) * Math.sin(am) + 4;
   o += T(tx, ty, name, 'vf-tb', Math.abs(Math.cos(am)) < .2 ? 'middle' : Math.cos(am) > 0 ? 'start' : 'end');
  });
  return svg(id, 340, 206, o, 'Círculo cromático com seis cores, em sentido horário a partir do topo: amarelo, laranja, vermelho, violeta, azul e verde.');
 })();

 F['c-ef-grafico'] = (() => {
  const id = 'vfcef';
  const groups = ['13–14 anos', '15–16 anos', '17–18 anos'], boys = [52, 46, 40], girls = [30, 22, 15];
  const x0 = 44, y0 = 168, w = 270, h = 136, Y = v => y0 - v / 60 * h;
  let o = '';
  for (const v of [0, 10, 20, 30, 40, 50, 60]) o += L(x0, Y(v), x0 + w, Y(v), 'vf-grid') + T(x0 - 5, Y(v) + 3.5, v, 'vf-ts', 'end');
  o += L(x0, y0, x0 + w, y0) + L(x0, y0, x0, y0 - h - 4);
  groups.forEach((g, i) => {
   const c = x0 + 45 + i * 90;
   o += `<rect x="${c - 30}" y="${f(Y(boys[i]))}" width="28" height="${f(y0 - Y(boys[i]))}" class="vf-bar"/>` + T(c - 16, Y(boys[i]) - 4, boys[i], 'vf-tss');
   o += `<rect x="${c + 2}" y="${f(Y(girls[i]))}" width="28" height="${f(y0 - Y(girls[i]))}" class="vf-bar2"/>` + T(c + 16, Y(girls[i]) - 4, girls[i], 'vf-tss');
   o += T(c, y0 + 13, g, 'vf-ts');
  });
  o += T(x0 - 2, 18, '% de estudantes ativos', 'vf-ts', 'start') + `<rect x="200" y="10" width="12" height="9" class="vf-bar"/>` + T(216, 18, 'meninos', 'vf-ts', 'start') + `<rect x="266" y="10" width="12" height="9" class="vf-bar2"/>` + T(282, 18, 'meninas', 'vf-ts', 'start');
  return svg(id, 340, 190, o, 'Gráfico de barras com dados hipotéticos: meninos ativos 52%, 46% e 40% nas faixas de 13–14, 15–16 e 17–18 anos; meninas 30%, 22% e 15%.');
 })();

 globalThis.FURG_VEST_FIGS = Object.assign(globalThis.FURG_VEST_FIGS || {}, F);
})();
