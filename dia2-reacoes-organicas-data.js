'use strict';
// Aula de Química: reações orgânicas (substituição, adição, eliminação, oxidação,
// esterificação, saponificação, transesterificação e polimerização).
// Entra logo depois de "Carbono, polímeros e materiais".
(() => {
 const lessons = globalThis.FURG_DIA2_LESSONS?.quimica;
 if (!Array.isArray(lessons) || lessons.some(l => l.id === 'reacoes-organicas')) return;
 const lesson = {
  id: 'reacoes-organicas',
  title: 'Reações orgânicas: substituição, adição, eliminação e oxidação',
  card: 'organica',
  lead: 'As reações orgânicas transformam uma função em outra. Para prever o produto, olha para dois pontos da molécula: se a cadeia é saturada, insaturada ou aromática, e qual grupo funcional ela tem. Quase tudo cai em seis famílias: substituição, adição, eliminação, oxidação, esterificação e polimerização.',
  parts: [
   ['Substituição: troca um átomo por outro', 'Em cadeias saturadas (alcanos) e no anel aromático, um hidrogênio sai e outro átomo ou grupo entra no lugar. Halogenação do metano, com luz: CH₄ + Cl₂ → CH₃Cl + HCl. No benzeno, com catalisador: nitração (C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O, com H₂SO₄), halogenação (com FeBr₃ ou FeCl₃), sulfonação e alquilação de Friedel-Crafts. O benzeno prefere substituir a adicionar porque a ressonância deixa o anel muito estável: na substituição, o anel aromático se mantém.'],
   ['Adição: a ligação dupla “abre”', 'Em alcenos e alcinos, a ligação pi da dupla ou da tripla se rompe e cada carbono recebe um átomo novo. Hidrogenação: CH₂=CH₂ + H₂ → CH₃–CH₃, com Ni, Pt ou Pd. Halogenação: CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br; por isso a água de bromo, castanha, descora em contato com insaturações, um teste clássico. Hidratação, em meio ácido: CH₂=CH₂ + H₂O → CH₃–CH₂OH, uma forma industrial de produzir etanol.'],
   ['Regra de Markovnikov', 'Quando HX ou água se adicionam a um alceno assimétrico, o hidrogênio vai para o carbono da dupla que já tem mais hidrogênios. Exemplo: propeno + HBr → 2-bromopropano (CH₃–CHBr–CH₃) como produto principal. Lembrete: “quem tem mais, ganha mais”. Com peróxidos, o HBr segue o caminho contrário (anti-Markovnikov), mas isso aparece pouco no ENEM.'],
   ['Hidrogenação de óleos e a margarina', 'Óleos vegetais têm cadeias com várias duplas e são líquidos. A hidrogenação adiciona H₂ a parte dessas duplas: as cadeias ficam mais saturadas, mais retas e mais próximas, e o material fica sólido, como a margarina. Na hidrogenação parcial, algumas duplas mudam de cis para trans, formando as gorduras trans, associadas a problemas cardiovasculares.'],
   ['Eliminação: forma a dupla', 'É o caminho inverso da adição: a molécula perde uma molécula pequena e forma uma ligação dupla. Desidratação intramolecular do etanol, com H₂SO₄ a cerca de 170 °C: CH₃–CH₂OH → CH₂=CH₂ + H₂O. Em temperatura menor, cerca de 140 °C, duas moléculas de álcool perdem uma água entre si e formam um éter (desidratação intermolecular): 2 CH₃CH₂OH → CH₃CH₂–O–CH₂CH₃ + H₂O.'],
   ['Oxidação de álcoois', 'O carbono que carrega o –OH define o produto. Álcool primário → aldeído → ácido carboxílico (etanol → etanal → ácido acético; é assim que o vinho vira vinagre). Álcool secundário → cetona (propan-2-ol → propanona, a acetona). Álcool terciário não oxida em condições brandas, porque o carbono do –OH não tem hidrogênio para perder. No bafômetro antigo, o dicromato, laranja, oxida o etanol e se reduz a Cr³⁺, verde.'],
   ['Esterificação, hidrólise e saponificação', 'Ácido carboxílico + álcool ⇌ éster + água, com catalisador ácido. Ésteres dão aroma às frutas: o etanoato de isoamila lembra banana e o butanoato de etila, abacaxi. A reação inversa é a hidrólise. Quando a hidrólise de uma gordura (um triéster de glicerol) é feita com base forte, como NaOH, chama-se saponificação: forma glicerol e sais de ácidos graxos, que são o sabão. Cada mol de triglicerídeo consome 3 mol de NaOH.'],
   ['Transesterificação: o biodiesel', 'Um éster troca sua parte alcoólica por outro álcool. Óleo vegetal + metanol (ou etanol), com catalisador, forma ésteres metílicos (ou etílicos) de ácidos graxos, o biodiesel, e glicerol como subproduto. O biodiesel é renovável e tem menos enxofre que o diesel de petróleo.'],
   ['Polimerização', 'Na polimerização por adição, monômeros com dupla ligação se unem sem perder nada: eteno → polietileno, cloreto de vinila → PVC, estireno → poliestireno (isopor). Na polimerização por condensação, cada ligação entre monômeros libera uma molécula pequena, em geral água: assim se formam o PET (poliéster), o náilon (poliamida) e, na natureza, o amido e as proteínas.'],
  ],
  example: [
   'Uma indústria precisa transformar propeno (CH₂=CH–CH₃) em propanona (acetona). Quais reações ela pode usar, em ordem?',
   'Primeiro, adição de água em meio ácido (hidratação). Pela regra de Markovnikov, o H vai para o CH₂ e o –OH, para o carbono do meio: forma-se propan-2-ol (CH₃–CHOH–CH₃).',
   'O propan-2-ol é um álcool secundário: o carbono do –OH está ligado a dois outros carbonos.',
   'Depois, oxidação do álcool secundário, por exemplo com KMnO₄ ou K₂Cr₂O₇ em meio ácido: forma-se uma cetona, a propanona (CH₃–CO–CH₃).',
   'Se a adição tivesse posto o –OH na ponta (propan-1-ol, um álcool primário), a oxidação daria propanal e depois ácido propanoico, e não a acetona.',
  ],
  exam: 'Antes de pensar em nomes, olha a estrutura: dupla ou tripla ligação pede adição; anel aromático pede substituição; álcool com ácido forma éster; gordura com base forte vira sabão; álcool com oxidante vira aldeído, ácido ou cetona, conforme a posição do –OH. Se o enunciado fala de “perda de água” formando dupla, é eliminação; se fala de “unir muitas unidades”, é polimerização.',
  check: {
   prompt: 'Ao adicionar água de bromo, castanha, a um líquido desconhecido, a cor desaparece rapidamente, sem catalisador. O que isso indica sobre a substância?',
   correct: 2,
   choices: [
    ['Que ela é um alcano', 'Alcanos só reagem com bromo por substituição, com luz e de forma lenta. A cor não sumiria rapidamente.'],
    ['Que ela é aromática, como o benzeno', 'O benzeno resiste à adição por causa da ressonância e precisa de catalisador para reagir com bromo.'],
    ['Que ela tem ligação dupla ou tripla entre carbonos', 'O Br₂ se adiciona à insaturação e é consumido, por isso a cor castanha some. É o teste clássico de alcenos e alcinos.'],
   ],
  },
 };
 const at = lessons.findIndex(l => l.id === 'organica');
 lessons.splice(at < 0 ? lessons.length : at + 1, 0, lesson);
})();
