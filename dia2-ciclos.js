'use strict';
/* Aula de Biologia: ciclos biogeoquímicos, com um esquema logo abaixo de cada parte.
   Setas verdes: o elemento entra nos seres vivos. Laranja: volta ao ambiente.
   Vermelhas: ação humana. Tracejadas: processos geológicos, que levam milhões de anos. */
(() => {
 const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
 const r = n => Math.round(n * 10) / 10;

 // Caixa com título e subtítulo.
 const box = (x, y, w, h, title, sub, cls = '') => `<g class="cyc-node ${cls}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="11"/>
  <text x="${x + w / 2}" y="${y + (sub ? h / 2 - 8 : h / 2)}" class="cyc-title">${esc(title)}</text>${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 10}" class="cyc-sub">${esc(sub)}</text>` : ''}</g>`;

 // Seta reta ou curva (quadrática, com ponto de controle c) e ponta desenhada no fim.
 function arrow(p0, p2, c, cls = '', dashed = false) {
  const [x0, y0] = p0, [x2, y2] = p2, [cx, cy] = c || [(x0 + x2) / 2, (y0 + y2) / 2];
  const dx = x2 - cx || x2 - x0, dy = y2 - cy || y2 - y0, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
  const ex = x2 - ux * 7, ey = y2 - uy * 7;
  const head = [[x2, y2], [ex - uy * 4.6, ey + ux * 4.6], [ex + uy * 4.6, ey - ux * 4.6]].map(p => p.map(r).join(',')).join(' ');
  return `<path d="M${r(x0)},${r(y0)} Q${r(cx)},${r(cy)} ${r(ex)},${r(ey)}" class="cyc-ar ${cls}"${dashed ? ' stroke-dasharray="5 4"' : ''}/><polygon points="${head}" class="cyc-head ${cls}"/>`;
 }

 // Rótulo de processo, com contorno da cor do fundo para não brigar com as setas.
 const label = (x, y, text, cls = '', anchor = 'middle') => `<text x="${x}" y="${y}" class="cyc-lab ${cls}" text-anchor="${anchor}">${esc(text)}</text>`;
 const small = (x, y, text, anchor = 'middle') => `<text x="${x}" y="${y}" class="cyc-note" text-anchor="${anchor}">${esc(text)}</text>`;

 const figure = (w, h, accent, body, caption, aria) => `<svg class="rx-figure cyc-figure" viewBox="0 0 ${w} ${h}" style="--rx-w:${w}px;--cyc:${accent}" role="img" aria-label="${esc(aria)}">${body}</svg><figcaption>${esc(caption)}</figcaption>`;

 const F = {};

 F.agua = figure(660, 360, '#2f7bd8', [
  box(240, 18, 180, 56, 'Atmosfera', 'vapor e nuvens'),
  box(20, 230, 150, 54, 'Oceanos', '≈ 97% da água'),
  box(245, 146, 150, 54, 'Seres vivos', 'plantas e animais'),
  box(470, 206, 160, 54, 'Solo e rios', 'água superficial'),
  box(470, 296, 160, 50, 'Lençol freático', 'água subterrânea'),
  arrow([95, 230], [240, 52], [92, 86], 'o'), label(118, 128, 'evaporação', 'o'),
  arrow([320, 146], [320, 74], null, 'o'), label(328, 114, 'transpiração', 'o', 'start'),
  arrow([258, 74], [150, 230], [206, 140]), label(196, 166, 'precipitação', '', 'end'),
  arrow([420, 48], [548, 206], [548, 58]), label(548, 118, 'precipitação', '', 'start'),
  arrow([470, 222], [395, 186], null, 'g'), label(432, 194, 'absorção', 'g'),
  arrow([550, 260], [550, 296], null), label(558, 280, 'infiltração', '', 'start'),
  arrow([470, 240], [170, 258], [315, 262]), label(315, 248, 'escoamento superficial'),
  arrow([470, 322], [170, 272], [300, 352]), label(300, 320, 'fluxo subterrâneo'),
 ].join(''), 'A energia do Sol move o ciclo: evapora a água dos oceanos e do solo e mantém a transpiração das plantas. O vapor condensa, precipita e volta ao mar por rios ou pelo subsolo. Asfalto e concreto reduzem a infiltração e aumentam o escoamento.', 'Esquema do ciclo da água');

 F.carbono = figure(690, 350, '#2f9e5b', [
  box(240, 18, 180, 56, 'Atmosfera', 'CO₂'),
  box(30, 150, 150, 52, 'Produtores', 'plantas, algas'),
  box(255, 270, 150, 52, 'Consumidores', 'animais'),
  box(450, 150, 150, 52, 'Decompositores', 'fungos e bactérias'),
  box(470, 282, 170, 50, 'Combustíveis fósseis', 'carvão, petróleo, gás', 'is-fossil'),
  arrow([240, 52], [105, 150], [105, 58], 'g'), label(138, 82, 'fotossíntese', 'g'),
  arrow([180, 160], [262, 74], [215, 122], 'o'), label(226, 128, 'respiração', 'o', 'start'),
  arrow([150, 202], [255, 296], [178, 290]), label(192, 262, 'alimentação'),
  arrow([330, 270], [330, 74], null, 'o'), label(336, 200, 'respiração', 'o', 'start'),
  arrow([405, 296], [470, 202], [455, 290]), label(432, 254, 'restos e fezes', '', 'end'),
  arrow([525, 150], [420, 46], [525, 46], 'o'), label(500, 74, 'decomposição', 'o'),
  arrow([590, 202], [590, 282], null, 'k', true), small(582, 236, 'soterramento', 'end'), small(582, 250, '(milhões de anos)', 'end'),
  arrow([640, 292], [420, 30], [672, 30], 'r'), label(640, 100, 'combustão', 'r'),
 ].join(''), 'A fotossíntese retira CO₂ do ar e o transforma em matéria orgânica. Respiração (de produtores, consumidores e decompositores) e decomposição devolvem o carbono. A queima de combustíveis fósseis libera em pouco tempo um carbono que ficou guardado por milhões de anos.', 'Esquema do ciclo do carbono');

 F.nitrogenio = figure(690, 350, '#7c5cd6', [
  box(250, 18, 180, 56, 'Atmosfera', 'N₂ ≈ 78% do ar'),
  box(255, 150, 170, 54, 'Seres vivos', 'N em proteínas e DNA'),
  box(30, 280, 160, 52, 'Amônio', 'NH₃ / NH₄⁺'),
  box(265, 280, 150, 52, 'Nitrito', 'NO₂⁻'),
  box(470, 280, 150, 52, 'Nitrato', 'NO₃⁻'),
  arrow([250, 50], [95, 280], [92, 60], 'g'), label(124, 108, 'fixação', 'g'), small(124, 124, 'Rhizobium, cianobactérias,'), small(124, 137, 'raios e indústria'),
  arrow([255, 196], [170, 280], null, 'o'), label(206, 230, 'amonificação', 'o', 'end'),
  arrow([190, 306], [265, 306]), arrow([415, 306], [470, 306]), label(340, 266, 'nitrificação (Nitrosomonas → Nitrobacter)'),
  arrow([545, 280], [425, 177], [545, 177], 'g'), label(512, 206, 'assimilação', 'g'),
  arrow([620, 290], [430, 40], [680, 40], 'o'), label(604, 100, 'desnitrificação', 'o'), small(604, 116, 'solo encharcado, sem O₂'),
 ].join(''), 'Quase nenhum ser vivo usa o N₂ diretamente. A fixação o transforma em amônia; bactérias nitrificantes a oxidam a nitrito e nitrato, a forma mais absorvida pelas plantas. Decompositores devolvem amônio ao solo (amonificação), e a desnitrificação devolve N₂ ao ar.', 'Esquema do ciclo do nitrogênio');

 F.fosforo = figure(680, 320, '#d9730d', [
  box(20, 30, 150, 52, 'Rochas', 'fosfatos minerais'),
  box(265, 30, 150, 52, 'Solo e água', 'fosfato PO₄³⁻'),
  box(510, 30, 150, 52, 'Plantas', 'ATP, DNA, membranas'),
  box(510, 150, 150, 52, 'Animais', 'ossos, dentes, ATP'),
  box(265, 250, 150, 52, 'Sedimentos', 'fundo de lagos e mares'),
  arrow([170, 56], [265, 56]), label(217, 21, 'intemperismo'),
  label(217, 100, 'mineração → fertilizantes', 'r'),
  arrow([415, 56], [510, 56], null, 'g'), label(462, 21, 'assimilação', 'g'),
  arrow([585, 82], [585, 150], null, 'g'), label(593, 118, 'alimentação', 'g', 'start'),
  arrow([510, 168], [382, 82], [440, 156], 'o'), label(470, 136, 'decomposição', 'o'),
  arrow([340, 82], [340, 250]), label(348, 176, 'escoamento e', '', 'start'), label(348, 191, 'sedimentação', '', 'start'),
  arrow([265, 276], [95, 82], [95, 276], 'k', true), small(158, 222, 'soerguimento', 'start'), small(158, 236, '(milhões de anos)', 'start'),
 ].join(''), 'O fósforo não tem fase gasosa relevante: circula entre rochas, solo, água e seres vivos. Por isso o ciclo é lento e o fosfato costuma limitar o crescimento das algas. Fertilizantes levados pela chuva aceleram a chegada de fosfato a rios e lagos.', 'Esquema do ciclo do fósforo');

 // Três cadeias de causa e efeito lado a lado.
 function chain(x, title, steps, cls) {
  const w = 200, h = 46, gap = 18;
  let out = `<text x="${x + w / 2}" y="20" class="cyc-title ${cls}">${esc(title)}</text>`;
  steps.forEach((lines, i) => {
   const y = 40 + i * (h + gap);
   out += `<g class="cyc-node cyc-step ${i === steps.length - 1 ? 'is-end' : ''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`;
   lines.forEach((t, j) => { out += `<text x="${x + w / 2}" y="${y + h / 2 + (j - (lines.length - 1) / 2) * 15}" class="cyc-step-t">${esc(t)}</text>`; });
   out += '</g>';
   if (i < steps.length - 1) out += arrow([x + w / 2, y + h], [x + w / 2, y + h + gap], null, cls);
  });
  return out;
 }
 F.impactos = figure(680, 300, '#c2410c', [
  chain(15, 'Efeito estufa', [['Queima de fósseis', 'e desmatamento'], ['Mais CO₂ e CH₄', 'na atmosfera'], ['Mais calor retido', 'perto da superfície'], ['Aquecimento global']], 'r'),
  chain(240, 'Eutrofização', [['Fertilizantes e esgoto', 'chegam à água'], ['Excesso de nitrato', 'e fosfato'], ['Floração de algas;', 'decompositores gastam O₂'], ['Falta de oxigênio:', 'morte de peixes']], 'r'),
  chain(465, 'Chuva ácida', [['Combustão libera', 'SO₂ e NOₓ'], ['Reação com a água', 'da atmosfera'], ['Formação de', 'H₂SO₄ e HNO₃'], ['Chuva com pH', 'abaixo de 5,6']], 'r'),
 ].join(''), 'Cada impacto começa com um elemento que chega rápido demais a um reservatório: carbono no ar, nutrientes na água, enxofre e nitrogênio na chuva. Em prova, identifica o ciclo, a entrada humana e a consequência pedida.', 'Esquema das consequências da ação humana sobre os ciclos');

 const lesson = {
  id: 'ciclos', title: 'Ciclos biogeoquímicos', card: 'ciclos',
  lead: 'O carbono do teu corpo já passou pelo ar, por uma planta e talvez por um dinossauro. A matéria não acaba: ela circula entre seres vivos e ambiente.',
  parts: [
   ['Matéria circula, energia flui', 'Energia entra como luz e sai como calor, sem voltar. Já os elementos químicos são reaproveitados: passam de reservatórios como o ar, a água, o solo e as rochas para os seres vivos e voltam por respiração, excreção e decomposição. Por isso o nome junta bio (vida), geo (ambiente) e química (elementos). No ciclo da água, a energia do Sol evapora a água e a gravidade a traz de volta.', F.agua],
   ['Ciclo do carbono', 'A fotossíntese retira CO₂ da atmosfera e o incorpora à matéria orgânica. Nas cadeias alimentares, esse carbono passa de um ser vivo a outro. Respiração celular e decomposição devolvem CO₂ ao ar. Parte da matéria orgânica soterrada virou carvão e petróleo; a combustão libera esse carbono rapidamente e intensifica o efeito estufa. Oceanos também dissolvem CO₂, o que os torna mais ácidos.', F.carbono],
   ['Ciclo do nitrogênio', 'O N₂ forma cerca de 78% do ar, mas plantas e animais não conseguem usá-lo nessa forma. Na fixação, bactérias como Rhizobium (nas raízes de leguminosas) e cianobactérias convertem N₂ em amônia. Bactérias nitrificantes oxidam amônio a nitrito e nitrato, que as plantas assimilam para fazer proteínas e ácidos nucleicos. Decompositores devolvem amônio ao solo, e bactérias desnitrificantes, em solos sem oxigênio, devolvem N₂ ao ar.', F.nitrogenio],
   ['Ciclo do fósforo', 'O fósforo está no ATP, no DNA, nas membranas e nos ossos. Ele não tem fase gasosa relevante: o intemperismo libera fosfato das rochas, plantas o absorvem do solo e animais o obtêm pela alimentação. A decomposição devolve fosfato ao solo, e parte é levada pela chuva até lagos e mares, onde sedimenta. Voltar às rochas leva milhões de anos, por isso o fosfato costuma ser um nutriente limitante.', F.fosforo],
   ['Quando o ser humano acelera os ciclos', 'Queimar combustíveis fósseis e desmatar aumenta o CO₂ no ar. Fertilizantes e esgoto levam nitrato e fosfato aos rios e podem causar eutrofização. A queima de carvão e combustíveis libera SO₂ e óxidos de nitrogênio, que formam ácidos na atmosfera. Rotação de culturas com leguminosas, tratamento de esgoto e matas ciliares reduzem esses impactos.', F.impactos],
  ],
  example: ['Um agricultor alterna o plantio de milho com o de feijão e passa a usar menos adubo nitrogenado. Por que isso funciona?', 'O feijão é uma leguminosa: em suas raízes vivem bactérias do gênero Rhizobium, em nódulos.', 'Essas bactérias fixam o N₂ do ar e o convertem em compostos nitrogenados que a planta usa.', 'Quando os restos do feijão se decompõem, esse nitrogênio fica no solo e é aproveitado pelo milho na safra seguinte.'],
  exam: 'Em questão de ciclo, localiza o elemento antes e depois da seta. N₂ virando amônia é fixação; amônio virando nitrato é nitrificação; nitrato virando N₂ é desnitrificação. Se o ciclo não tem gás, é o do fósforo.',
  check: {prompt: 'Em um arrozal alagado, com pouco oxigênio no solo, parte do nitrato aplicado volta para a atmosfera como N₂. Qual processo explica essa perda?', correct: 2, choices: [
   ['Fixação', 'A fixação faz o caminho inverso: transforma o N₂ do ar em amônia.'],
   ['Nitrificação', 'A nitrificação oxida amônio a nitrito e nitrato, e depende de oxigênio.'],
   ['Desnitrificação', 'Em solos encharcados, bactérias desnitrificantes usam o nitrato no lugar do O₂ e liberam N₂ para a atmosfera.'],
  ]},
 };

 const list = globalThis.FURG_DIA2_LESSONS?.biologia;
 if (list && !list.some(l => l.id === 'ciclos')) {
  const i = list.findIndex(l => l.id === 'cadeias');
  list.splice(i < 0 ? list.length : i + 1, 0, lesson);
 }

 // Aprofundamento e desafios no mesmo formato das outras aulas de Biologia.
 const bio = globalThis.FurgDia2Biology;
 if (bio) {
  const base = bio.modules.cadeias || [];
  bio.modules.ciclos ||= [
   base[0],
   base[1],
   {title: 'Carbono no oceano e acidificação', paragraphs: [
    'Parte do CO₂ emitido se dissolve na água do mar e forma ácido carbônico. O pH da água diminui e fica mais difícil para corais, moluscos e alguns plânctons formarem estruturas de carbonato de cálcio.',
    'Florestas e oceanos funcionam como sumidouros: retiram carbono da atmosfera. Desmatamento e queimadas transformam a floresta em fonte, pois liberam o carbono que estava na biomassa.',
   ]},
  ].filter(Boolean);
  bio.sources.ciclos ||= bio.sources.cadeias || [];
  const check = (key, prompt, correct, choices) => ({key: 'bio-desafio-' + key, prompt, correct, choices, optional: true});
  bio.checks.ciclos ||= [
   check('ciclo-fosforo-gas', 'Qual destes ciclos não tem uma fase gasosa relevante, o que o torna mais lento?', 1, [
    ['Ciclo do carbono', 'O carbono circula como CO₂ na atmosfera.'],
    ['Ciclo do fósforo', 'O fósforo passa por rochas, solo, água e seres vivos, sem forma gasosa importante.'],
    ['Ciclo do nitrogênio', 'O maior reservatório de nitrogênio é o N₂ da atmosfera.']]),
   check('ciclo-carbono-fossil', 'Por que queimar petróleo aumenta o CO₂ do ar mais do que queimar a lenha de uma árvore plantada recentemente?', 0, [
    ['O carbono do petróleo estava fora do ciclo havia milhões de anos', 'A combustão devolve ao ar um carbono que estava armazenado em um reservatório de longa duração.'],
    ['O petróleo não libera CO₂ na combustão', 'Libera, sim: a combustão de compostos orgânicos produz CO₂ e água.'],
    ['A lenha não libera CO₂ quando queima', 'A lenha libera CO₂, mas esse carbono foi retirado do ar há pouco tempo, na fotossíntese.']]),
  ];
 }
 globalThis.FurgCycleFigures = F;
})();
