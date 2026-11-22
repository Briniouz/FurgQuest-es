'use strict';
/* Aulas extras do Dia 2, com um esquema e as fórmulas logo abaixo de cada parte:
   Física · MCU e lançamentos; Biologia · Enzimas. Usa os estilos .cyc-* e .rx-* das aulas. */
(() => {
 const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
 const r = n => Math.round(n * 10) / 10;

 function arrow(p0, p2, c, cls = '', dashed = false, w = 4.6) {
  const [x0, y0] = p0, [x2, y2] = p2, [cx, cy] = c || [(x0 + x2) / 2, (y0 + y2) / 2];
  const dx = x2 - cx || x2 - x0, dy = y2 - cy || y2 - y0, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
  const ex = x2 - ux * 8, ey = y2 - uy * 8;
  const head = [[x2, y2], [ex - uy * w, ey + ux * w], [ex + uy * w, ey - ux * w]].map(p => p.map(r).join(',')).join(' ');
  return `<path d="M${r(x0)},${r(y0)} Q${r(cx)},${r(cy)} ${r(ex)},${r(ey)}" class="cyc-ar ${cls}"${dashed ? ' stroke-dasharray="5 4"' : ''}/><polygon points="${head}" class="cyc-head ${cls}"/>`;
 }
 const label = (x, y, text, cls = '', anchor = 'middle') => `<text x="${x}" y="${y}" class="cyc-lab ${cls}" text-anchor="${anchor}">${esc(text)}</text>`;
 const big = (x, y, text, cls = '', anchor = 'middle') => `<text x="${x}" y="${y}" class="cyc-lab ex-big ${cls}" text-anchor="${anchor}">${esc(text)}</text>`;
 const note = (x, y, text, anchor = 'middle') => `<text x="${x}" y="${y}" class="cyc-note" text-anchor="${anchor}">${esc(text)}</text>`;
 const line = (x1, y1, x2, y2, cls = 'ex-ln', dashed = false) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"${dashed ? ' stroke-dasharray="4 4"' : ''}/>`;
 const dot = (x, y, rr = 6, cls = '') => `<circle cx="${x}" cy="${y}" r="${rr}" class="ex-dot ${cls}"/>`;
 // Eixos de gráfico com rótulos.
 const axes = (x0, y0, x1, y1, xl, yl) => arrow([x0, y0], [x1 + 8, y0], null, 'ex-axis', false, 3.6) + arrow([x0, y0], [x0, y1 - 8], null, 'ex-axis', false, 3.6)
  + note(x1, y0 + 16, xl, 'end') + note(x0 + 8, y1 - 2, yl, 'start');
 // Lista de fórmulas abaixo do esquema.
 const forms = rows => `<dl class="ex-forms">${rows.map(([f, d]) => `<div><dt>${esc(f)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>`;
 const figure = (w, h, accent, body, rows, caption, aria) => `<svg class="rx-figure cyc-figure" viewBox="0 0 ${w} ${h}" style="--rx-w:${w}px;--cyc:${accent}" role="img" aria-label="${esc(aria)}">${body}</svg>${rows ? forms(rows) : ''}<figcaption>${esc(caption)}</figcaption>`;

 /* ---------- Física · MCU e lançamentos ---------- */
 const P = {};
 P.mcu = figure(450, 300, '#2f7bd8', [
  `<circle cx="170" cy="150" r="110" class="ex-orbit"/>`, dot(170, 150, 3.5, 'is-muted'), note(170, 166, 'centro'),
  line(170, 150, 92, 228, 'ex-ln', true), label(118, 182, 'R'),
  dot(170, 40), arrow([170, 40], [265, 40], null, 'g'), big(270, 40, 'v', 'g', 'start'),
  arrow([170, 40], [170, 104], null, 'o'), big(180, 82, 'a꜀', 'o', 'start'),
  dot(280, 150), arrow([280, 150], [280, 245], null, 'g'), big(290, 222, 'v', 'g', 'start'),
  arrow([280, 150], [216, 150], null, 'o'), big(236, 136, 'a꜀', 'o'),
  arrow([60, 104], [104, 58], [64, 66], '', false, 4), note(36, 84, 'sentido', 'middle'),
  note(326, 120, 'O módulo de v', 'start'), note(326, 136, 'não muda; a', 'start'), note(326, 152, 'direção muda', 'start'), note(326, 168, 'o tempo todo.', 'start'),
 ].join(''), [
  ['f = 1/T', 'frequência (Hz) é o inverso do período (s). rpm ÷ 60 = Hz'],
  ['ω = 2π/T = 2πf', 'velocidade angular, em rad/s'],
  ['v = ωR = 2πR/T', 'velocidade linear: uma volta (2πR) por período'],
  ['a꜀ = v²/R = ω²R', 'aceleração centrípeta, sempre apontando para o centro'],
 ], 'A velocidade é sempre tangente à trajetória e a aceleração centrípeta aponta para o centro. A força resultante (F = m·v²/R) também aponta para o centro: ela só muda a direção da velocidade.', 'Esquema do movimento circular uniforme com velocidade tangente e aceleração centrípeta');

 P.polias = figure(600, 250, '#2f7bd8', [
  `<circle cx="140" cy="120" r="75" class="ex-orbit is-solid"/><circle cx="420" cy="120" r="36" class="ex-orbit is-solid"/>`,
  dot(140, 120, 3.5, 'is-muted'), dot(420, 120, 3.5, 'is-muted'),
  line(140, 45, 420, 84, 'ex-belt'), line(140, 195, 420, 156, 'ex-belt'),
  line(140, 120, 140, 195, 'ex-ln', true), label(150, 160, 'R₁', '', 'start'),
  line(420, 120, 456, 120, 'ex-ln', true), label(440, 108, 'R₂'),
  arrow([230, 57], [300, 67], null, 'g'), big(266, 44, 'v', 'g'),
  note(140, 222, 'polia grande: gira devagar'), note(420, 222, 'polia pequena: gira rápido'),
  note(520, 70, 'mesma v', 'start'), note(520, 86, 'na correia', 'start'),
 ].join(''), [
  ['correia ou engrenagens em contato: v₁ = v₂', 'f₁·R₁ = f₂·R₂ (a menor gira mais rápido)'],
  ['mesmo eixo: ω₁ = ω₂', 'a mesma frequência; o ponto mais longe do eixo tem v maior'],
 ], 'Na bicicleta, a coroa e a catraca estão ligadas pela corrente (mesma v). A catraca e a roda traseira estão no mesmo eixo (mesma frequência).', 'Esquema de duas polias ligadas por uma correia');

 P.vertical = figure(420, 300, '#2f7bd8', [
  line(30, 272, 390, 272, 'ex-ground'),
  dot(200, 258), arrow([180, 258], [180, 178], null, 'g'), label(172, 220, 'v₀', 'g', 'end'),
  dot(200, 170), arrow([180, 170], [180, 120], null, 'g'), label(172, 146, 'v menor', 'g', 'end'),
  dot(200, 108), arrow([180, 108], [180, 86], null, 'g'),
  dot(200, 52), label(214, 52, 'v = 0 no topo', '', 'start'),
  arrow([330, 120], [330, 190], null, 'o'), big(342, 156, 'g', 'o', 'start'), note(330, 208, '≈ 10 m/s²'),
  line(80, 52, 80, 272, 'ex-ln', true), line(72, 52, 88, 52, 'ex-ln'), line(72, 272, 88, 272, 'ex-ln'), label(70, 160, 'h máx', '', 'end'),
 ].join(''), [
  ['v = v₀ − g·t', 'velocidade com o tempo (subindo, g freia)'],
  ['h = v₀·t − g·t²/2', 'altura com o tempo'],
  ['v² = v₀² − 2·g·h', 'Torricelli: quando o tempo não aparece'],
  ['t(subida) = v₀/g e h máx = v₀²/(2g)', 'no topo v = 0; descer leva o mesmo tempo que subir'],
 ], 'Na queda livre, v₀ = 0: v = g·t e h = g·t²/2. A massa não muda o movimento quando a resistência do ar é desprezada.', 'Esquema do lançamento vertical, com a velocidade diminuindo até zero no topo');

 const hx = [120, 210, 300, 390, 480], hy = [60, 72, 108, 168, 252];
 P.horizontal = figure(580, 300, '#2f7bd8', [
  `<rect x="20" y="60" width="100" height="212" class="ex-table"/>`, line(20, 272, 560, 272, 'ex-ground'),
  `<path d="M120,60 Q300,60 480,252" class="ex-path"/>`,
  ...hx.map((x, i) => line(x, 34, x, hy[i], 'ex-ln is-faint', true)),
  ...hy.slice(1).map((y, i) => line(120, y, hx[i + 1], y, 'ex-ln is-faint', true)),
  ...hx.map((x, i) => dot(x, hy[i], 5.5)),
  arrow([120, 60], [182, 60], null, 'g'), big(150, 46, 'v₀', 'g'),
  label(300, 22, 'x = v₀·t: distâncias iguais em tempos iguais', 'g'),
  arrow([390, 168], [446, 168], null, 'g'), label(452, 164, 'vₓ = v₀', 'g', 'start'),
  arrow([390, 168], [390, 226], null, 'o'), label(380, 214, 'vy = g·t', 'o', 'end'),
  label(112, 160, 'y = g·t²/2', 'o', 'end'), note(112, 178, 'quedas 1 : 3 : 5 : 7', 'end'),
 ].join(''), [
  ['t = √(2h/g)', 'o tempo de queda depende só da altura'],
  ['x = v₀·t', 'alcance: horizontal sem aceleração (MU)'],
  ['y = g·t²/2 e vy = g·t', 'vertical igual a uma queda livre (MUV)'],
  ['v = √(vₓ² + vy²)', 'velocidade em qualquer instante (Pitágoras)'],
 ], 'Os dois movimentos são independentes: uma bola lançada da mesa e outra largada da mesma altura chegam ao chão juntas. Só a horizontal muda com v₀.', 'Esquema do lançamento horizontal com posições a cada intervalo de tempo');

 P.obliquo = figure(600, 310, '#2f7bd8', [
  line(20, 260, 580, 260, 'ex-ground'),
  `<path d="M60,260 Q290,-120 520,260" class="ex-path"/>`,
  arrow([60, 260], [125, 152], null, 'g'), big(104, 186, 'v₀', 'g', 'end'),
  arrow([60, 260], [125, 260], null, 'g', true), label(94, 250, 'v₀·cos θ', 'g'),
  arrow([60, 260], [60, 152], null, 'o', true), label(54, 196, 'v₀·sen θ', 'o', 'end'),
  `<path d="M90,260 A30,30 0 0 0 76,234" class="ex-ln"/>`, label(100, 242, 'θ', '', 'start'),
  dot(290, 70, 5.5), arrow([290, 70], [356, 70], null, 'g'), label(364, 70, 'no topo só vₓ (vy = 0)', 'g', 'start'),
  line(290, 76, 290, 260, 'ex-ln', true), label(300, 170, 'H', '', 'start'),
  line(60, 284, 520, 284, 'ex-ln'), line(60, 276, 60, 292, 'ex-ln'), line(520, 276, 520, 292, 'ex-ln'), label(290, 284, 'A (alcance)'),
 ].join(''), [
  ['vₓ = v₀·cos θ  e  v₀y = v₀·sen θ', 'decompõe primeiro; depois cada eixo é independente'],
  ['t(subida) = v₀y/g  e  t(total) = 2·v₀y/g', 'subida e descida levam o mesmo tempo'],
  ['H = v₀y²/(2g)', 'altura máxima: só a componente vertical importa'],
  ['A = vₓ·t(total) = v₀²·sen(2θ)/g', 'alcance máximo em 45°; 30° e 60° dão o mesmo alcance'],
 ], 'Valores que caem muito: sen 30° = cos 60° = 0,5; sen 60° = cos 30° ≈ 0,87; sen 45° = cos 45° ≈ 0,71.', 'Esquema do lançamento oblíquo com decomposição da velocidade inicial, altura máxima e alcance');

 const fisica = {
  id: 'mcu-lancamentos', title: 'Movimento circular e lançamentos', card: 'circular',
  lead: 'Uma roda-gigante e uma bola chutada têm algo em comum: o movimento fica fácil quando tu separas o que muda do que fica constante.',
  parts: [
   ['Movimento circular uniforme', 'No MCU, o objeto percorre arcos iguais em tempos iguais. O período T é o tempo de uma volta e a frequência f é o número de voltas por segundo, com f = 1/T. O módulo da velocidade é constante, mas a direção muda a cada instante. Por isso existe aceleração: a centrípeta, que aponta para o centro e vale v²/R.', P.mcu],
   ['Polias, engrenagens e bicicletas', 'Quando duas polias são ligadas por uma correia, ou duas engrenagens se tocam, os pontos da borda têm a mesma velocidade linear. Como v = 2πRf, a polia menor gira com frequência maior. Quando duas peças estão presas ao mesmo eixo, elas têm a mesma frequência e a mesma velocidade angular.', P.polias],
   ['Queda livre e lançamento vertical', 'Perto da superfície, todo corpo em queda livre acelera cerca de 10 m/s² para baixo, independentemente da massa, se a resistência do ar for desprezada. Num lançamento para cima, a gravidade reduz a velocidade em 10 m/s a cada segundo até ela zerar no topo. A descida até o mesmo nível leva o mesmo tempo da subida.', P.vertical],
   ['Lançamento horizontal', 'Uma bola que sai de uma mesa com velocidade horizontal faz dois movimentos ao mesmo tempo. Na horizontal, segue com velocidade constante (MU). Na vertical, cai como em queda livre (MUV). O tempo de voo depende só da altura; a velocidade de saída decide apenas o alcance.', P.horizontal],
   ['Lançamento oblíquo', 'Se a velocidade inicial faz um ângulo θ com o chão, decompõe primeiro: v₀·cos θ na horizontal e v₀·sen θ na vertical. A componente horizontal não muda. A vertical diminui até zero no ponto mais alto e depois cresce para baixo. O alcance é máximo em 45°, e ângulos complementares, como 30° e 60°, dão o mesmo alcance.', P.obliquo],
  ],
  example: ['Uma bola rola para fora de uma mesa de 1,25 m de altura com 3 m/s. A que distância do pé da mesa ela toca o chão? (g = 10 m/s²)', 'Tempo de queda: 1,25 = 10·t²/2, então t² = 0,25 e t = 0,5 s.', 'Na horizontal a velocidade não muda: x = 3 · 0,5.', 'A bola cai a 1,5 m do pé da mesa.'],
  exam: 'Em lançamento, faz duas colunas: horizontal (x = v·t) e vertical (fórmulas da queda). O tempo é a única grandeza que liga as duas. No MCU, procura primeiro o período ou a frequência.',
  check: {prompt: 'Uma bola é chutada obliquamente. Desprezando o ar, como é a velocidade dela no ponto mais alto da trajetória?', correct: 1, choices: [
   ['Zero', 'Só a componente vertical zera no topo. A horizontal continua igual à do lançamento.'],
   ['Horizontal e igual a v₀·cos θ', 'No topo vy = 0, e a componente horizontal não mudou durante todo o voo.'],
   ['Vertical e para baixo', 'A velocidade só passa a ter componente vertical para baixo depois do topo.'],
  ]},
 };

 /* ---------- Biologia · Enzimas ---------- */
 const E = {};
 E.energia = figure(560, 300, '#2f9e5b', [
  axes(40, 262, 520, 24, 'caminho da reação', 'energia'),
  `<path d="M60,190 L110,190 C160,190 180,52 230,52 C280,52 300,230 350,230 L470,230" class="ex-curve o"/>`,
  `<path d="M60,190 L110,190 C160,190 190,128 230,128 C270,128 300,230 350,230 L470,230" class="ex-curve g" stroke-dasharray="7 5"/>`,
  label(230, 38, 'sem enzima', 'o'), label(230, 114, 'com enzima', 'g'),
  line(90, 52, 230, 52, 'ex-ln is-faint', true), arrow([90, 190], [90, 56], null, 'o'), label(84, 120, 'Eₐ alta', 'o', 'end'),
  arrow([230, 190], [230, 132], null, 'g'), label(224, 162, 'Eₐ menor', 'g', 'end'),
  line(80, 190, 300, 190, 'ex-ln is-faint', true),
  label(130, 204, 'reagentes'), label(430, 216, 'produtos'),
  line(496, 190, 496, 230, 'ex-ln'), line(488, 190, 504, 190, 'ex-ln'), line(488, 230, 504, 230, 'ex-ln'), note(510, 206, 'ΔH', 'start'), note(510, 220, 'igual', 'start'),
 ].join(''), null, 'A enzima oferece um caminho com energia de ativação menor, e a reação fica muito mais rápida. Ela não muda a energia dos reagentes nem a dos produtos, então o ΔH e o equilíbrio continuam os mesmos.', 'Gráfico de energia de uma reação com e sem enzima');

 const enz = (x, y, notch = 'M', cls = '') => `<path d="M${x},${y} H${x + 34} ${notch === 'M' ? `L${x + 50},${y + 24} L${x + 66},${y}` : `Q${x + 50},${y + 30} ${x + 66},${y}`} H${x + 100} V${y + 56} H${x} Z" class="ex-enz ${cls}"/>`;
 const sub = (x, y, cls = '') => `<path d="M${x},${y} H${x + 32} L${x + 16},${y + 24} Z" class="ex-sub ${cls}"/>`;
 E.encaixe = figure(620, 210, '#2f9e5b', [
  enz(20, 90), note(70, 172, 'enzima'), big(150, 112, '+'),
  sub(170, 70), note(186, 112, 'substrato'),
  arrow([226, 112], [270, 112]),
  enz(290, 90), sub(324, 89, 'is-bound'), note(340, 172, 'complexo enzima-substrato'),
  arrow([406, 112], [450, 112]),
  enz(470, 90), `<path d="M470,62 H486 L478,76 Z" class="ex-sub"/><path d="M560,58 H576 L568,72 Z" class="ex-sub"/>`, note(520, 44, 'produtos'), note(520, 172, 'enzima livre de novo'),
  label(70, 60, 'sítio ativo', 'g'), arrow([70, 68], [86, 92], null, 'g', false, 3.6),
 ].join(''), null, 'O substrato se encaixa no sítio ativo, como uma chave na fechadura. No modelo do encaixe induzido, mais aceito hoje, o sítio ativo ajusta a forma ao receber o substrato. A enzima sai intacta e pode ser usada de novo.', 'Esquema de enzima, substrato, complexo enzima-substrato e produtos');

 const bell = (c, cls) => `<path d="M${c - 52},212 C${c - 26},212 ${c - 20},60 ${c},60 C${c + 20},60 ${c + 26},212 ${c + 52},212" class="ex-curve ${cls}"/>`;
 E.fatores = figure(640, 260, '#2f9e5b', [
  axes(40, 220, 280, 28, 'temperatura', 'atividade'),
  `<path d="M50,212 C110,206 160,140 196,66 C206,46 222,50 232,96 C240,140 248,190 258,214" class="ex-curve g"/>`,
  line(206, 220, 206, 56, 'ex-ln is-faint', true), label(206, 44, 'ótima ≈ 37 °C (humana)', 'g'),
  label(56, 150, 'aquece: acelera', '', 'start'), label(262, 150, 'desnatura', 'o', 'start'),
  axes(340, 220, 610, 28, 'pH', 'atividade'),
  bell(390, 'o'), bell(480, 'g'), bell(520, 'r'),
  label(390, 46, 'pepsina', 'o'), label(476, 46, 'amilase', 'g', 'end'), label(524, 46, 'tripsina', 'r', 'start'),
  ...[0, 2, 4, 6, 8, 10].map(p => note(350 + p * 20, 234, String(p))),
 ].join(''), [
  ['temperatura ótima', 'abaixo dela a enzima fica lenta, mas volta a funcionar; muito acima, desnatura'],
  ['pH ótimo', 'pepsina ≈ 2 (estômago), amilase salivar ≈ 7 (boca), tripsina ≈ 8 (intestino)'],
 ], 'Desnaturar é perder a forma tridimensional da proteína. Sem a forma, o sítio ativo deixa de encaixar o substrato, mesmo que a sequência de aminoácidos continue a mesma.', 'Gráficos da atividade enzimática em função da temperatura e do pH');

 E.saturacao = figure(440, 270, '#2f9e5b', [
  axes(50, 230, 400, 26, 'concentração de substrato', 'velocidade'),
  `<path d="M50,230 C100,120 170,96 390,90" class="ex-curve g"/>`,
  `<path d="M50,230 C100,80 170,50 390,44" class="ex-curve g" stroke-dasharray="7 5" opacity=".75"/>`,
  line(50, 86, 390, 86, 'ex-ln is-faint', true), label(392, 104, 'Vmáx', 'g', 'end'),
  label(392, 32, 'mais enzima: Vmáx maior', 'g', 'end'),
  note(108, 200, 'sítios livres:', 'start'), note(108, 214, 'sobe rápido', 'start'),
  note(250, 128, 'saturada: todos os sítios ocupados'),
 ].join(''), null, 'Com pouco substrato, adicionar mais acelera a reação. Quando todas as enzimas estão ocupadas, a velocidade para de subir: só aumentar a quantidade de enzima eleva a velocidade máxima.', 'Gráfico de saturação da enzima pela concentração de substrato');

 E.inibidores = figure(620, 230, '#2f9e5b', [
  `<text x="150" y="24" class="cyc-title">Competitivo</text>`, `<text x="470" y="24" class="cyc-title">Não competitivo</text>`,
  enz(60, 110), `<path d="M94,108 H126 L110,132 Z" class="ex-inh"/>`, note(110, 98, 'inibidor no sítio ativo'),
  sub(200, 70), line(196, 66, 236, 98, 'ex-x'), line(236, 66, 196, 98, 'ex-x'), note(216, 116, 'substrato'), note(216, 130, 'sem lugar'),
  note(150, 196, 'Mais substrato pode vencer a competição.'),
  enz(380, 110, 'U'), `<circle cx="480" cy="160" r="12" class="ex-inh"/>`, note(480, 188, 'inibidor em outro sítio'),
  sub(510, 70), line(506, 66, 546, 98, 'ex-x'), line(546, 66, 506, 98, 'ex-x'), note(530, 116, 'sítio deformado'),
  note(470, 212, 'Mais substrato não resolve.'),
 ].join(''), null, 'O inibidor competitivo tem forma parecida com a do substrato e disputa o sítio ativo. O não competitivo se liga em outro ponto e muda a forma da enzima. Alguns venenos e pesticidas são inibidores irreversíveis.', 'Esquema dos inibidores competitivo e não competitivo');

 const biologia = {
  id: 'enzimas', title: 'Enzimas: como funcionam e o que as afeta', card: 'enzimas',
  lead: 'Sem enzimas, digerir um almoço levaria anos. Elas aceleram reações que já aconteceriam, mas devagar demais para manter a vida.',
  parts: [
   ['Catalisadores biológicos', 'Enzimas são, em geral, proteínas que aceleram reações químicas. Elas diminuem a energia de ativação, a barreira que os reagentes precisam vencer. Não são consumidas, então uma mesma molécula atua muitas vezes. Também não mudam o ΔH nem o ponto de equilíbrio: só fazem a reação chegar lá mais rápido.', E.energia],
   ['Sítio ativo e especificidade', 'Cada enzima tem um sítio ativo com forma e cargas que encaixam um substrato específico. Forma-se o complexo enzima-substrato, a reação acontece e os produtos são liberados. Muitas enzimas precisam de ajudantes: cofatores, como íons de ferro, zinco ou magnésio, e coenzimas, muitas derivadas de vitaminas do complexo B.', E.encaixe],
   ['Temperatura e pH', 'Cada enzima tem uma temperatura e um pH em que trabalha melhor. Frio reduz a agitação das moléculas e deixa a enzima lenta, de forma reversível. Calor excessivo e pH fora da faixa podem desnaturá-la, desfazendo a forma do sítio ativo. Por isso a pepsina funciona no estômago ácido e para de agir no intestino, onde a tripsina assume.', E.fatores],
   ['Concentração de substrato', 'Com a quantidade de enzima fixa, aumentar o substrato acelera a reação até certo ponto. Quando todos os sítios ativos estão ocupados, a enzima está saturada e a velocidade para de subir. Nesse ponto, só colocar mais enzima aumenta a velocidade máxima.', E.saturacao],
   ['Inibidores e regulação', 'Inibidores reduzem a atividade enzimática. O competitivo disputa o sítio ativo com o substrato; o não competitivo se liga em outra região e deforma a enzima. Na célula, o próprio produto final de uma via pode inibir a primeira enzima dela, o que se chama retroalimentação negativa. Alguns venenos, como o cianeto, e pesticidas organofosforados bloqueiam enzimas essenciais.', E.inibidores],
  ],
  example: ['Em um experimento, pedaços de batata crua e de batata cozida são colocados em água oxigenada. Só a crua forma muitas bolhas. Por quê?', 'A batata tem catalase, enzima que decompõe o peróxido de hidrogênio (H₂O₂) em água e oxigênio.', 'As bolhas são o O₂ liberado pela reação acelerada pela enzima.', 'O cozimento desnaturou a catalase, então a batata cozida quase não forma bolhas.'],
  exam: 'Em gráfico de enzima, identifica a variável do eixo x. Temperatura e pH dão uma curva com pico (ótimo). Substrato dá uma curva que sobe e estabiliza (saturação). Se o enunciado fala em calor alto, pensa em desnaturação.',
  check: {prompt: 'Uma enzima perde a atividade a 70 °C e não recupera quando é resfriada a 37 °C. O que explica isso?', correct: 2, choices: [
   ['A enzima foi consumida na reação', 'Enzimas não são consumidas: atuam muitas vezes enquanto mantêm a forma.'],
   ['O frio inativou a enzima de forma permanente', 'O frio só deixa a enzima lenta, e isso é reversível. O dano aconteceu no aquecimento.'],
   ['O calor desnaturou a proteína e deformou o sítio ativo', 'A 70 °C a estrutura tridimensional se desfaz. Resfriar não devolve a forma, então o substrato não encaixa mais.'],
  ]},
 };

 const L = globalThis.FURG_DIA2_LESSONS;
 const insert = (list, item, after) => { if (!list || list.some(l => l.id === item.id)) return; const i = list.findIndex(l => l.id === after); list.splice(i < 0 ? list.length : i + 1, 0, item); };
 insert(L?.fisica, fisica, 'movimento');
 insert(L?.biologia, biologia, 'celula');
 globalThis.FurgExtraFigures = {fisica: P, biologia: E};
})();
