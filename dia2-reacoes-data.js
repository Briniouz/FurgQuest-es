'use strict';
// Aula de Química: reações químicas (evidências, leis ponderais, tipos, oxirredução e balanceamento).
// Entra logo depois de "Átomos, tabela periódica e ligações", antes do mol e da estequiometria.
(() => {
 const lessons = globalThis.FURG_DIA2_LESSONS?.quimica;
 if (!Array.isArray(lessons) || lessons.some(l => l.id === 'reacoes-quimicas')) return;
 const lesson = {
  id: 'reacoes-quimicas',
  title: 'Reações químicas: tipos, evidências e balanceamento',
  card: 'balanceamento',
  lead: 'Numa reação química, as substâncias iniciais se transformam em outras. Os átomos se reorganizam, mas não somem nem aparecem: por isso a massa se conserva e a equação precisa estar balanceada. Reconhecer o tipo de reação ajuda a prever os produtos.',
  parts: [
   ['Como reconhecer uma reação', 'As pistas mais comuns são: mudança de cor, liberação de gás (bolhas ou efervescência), formação de um sólido que turva a mistura (precipitado), liberação ou absorção de calor e luz e mudança de cheiro. Cuidado: derreter, ferver, dissolver açúcar ou quebrar um objeto são transformações físicas. A substância continua a mesma.'],
   ['Reagentes, produtos e estados físicos', 'Na equação, os reagentes ficam à esquerda da seta e os produtos, à direita. Os índices (s), (l), (g) e (aq) indicam sólido, líquido, gás e dissolvido em água. Uma seta para cima (↑) marca gás liberado e uma para baixo (↓), precipitado. Δ sobre a seta indica aquecimento; λ ou “luz”, que a reação é provocada pela luz.'],
   ['Lavoisier e Proust', 'Lei de Lavoisier: num sistema fechado, a massa dos reagentes é igual à massa dos produtos. Se uma palha de aço queima ao ar e “fica mais pesada”, é porque incorporou oxigênio do ar. Lei de Proust: uma substância tem sempre a mesma proporção em massa entre seus elementos. Se 3 g de carbono reagem com 8 g de oxigênio, 6 g de carbono reagem com 16 g.'],
   ['Síntese e decomposição', 'Na síntese (ou adição), duas ou mais substâncias formam uma só: A + B → AB. Exemplos: 2 Mg + O₂ → 2 MgO e CaO + H₂O → Ca(OH)₂, a hidratação da cal na construção. Na decomposição (ou análise), uma substância se divide em outras: AB → A + B. Ela recebe nomes conforme a causa: pirólise pelo calor (CaCO₃ → CaO + CO₂), fotólise pela luz (2 AgBr → 2 Ag + Br₂, base da fotografia em filme) e eletrólise pela corrente elétrica (2 H₂O → 2 H₂ + O₂).'],
   ['Simples troca: quem é mais reativo desloca', 'Na simples troca, uma substância simples toma o lugar de um elemento de uma substância composta: A + BC → AC + B. Ela só acontece se A for mais reativo que B. Fila de reatividade dos metais: K > Na > Ca > Mg > Al > Zn > Fe > (H) > Cu > Hg > Ag > Au. Assim, Zn + CuSO₄ → ZnSO₄ + Cu acontece, e o cobre se deposita sobre o zinco. Metais antes do hidrogênio reagem com ácidos e liberam H₂ (Zn + 2 HCl → ZnCl₂ + H₂↑). Cobre, prata e ouro não reagem com HCl.'],
   ['Dupla troca: precisa de um “motivo”', 'Na dupla troca, duas substâncias compostas trocam seus íons: AB + CD → AD + CB. Ela só avança se formar algo que saia da solução: um precipitado (AgNO₃ + NaCl → AgCl↓ + NaNO₃), um gás (Na₂CO₃ + 2 HCl → 2 NaCl + H₂O + CO₂↑) ou água, como na neutralização entre ácido e base (HCl + NaOH → NaCl + H₂O). No tratamento de água, o sulfato de alumínio reage com a cal e forma Al(OH)₃, um precipitado gelatinoso que arrasta as impurezas.'],
   ['Combustão', 'Combustão é a reação de um combustível com o oxigênio, liberando energia. Para haver fogo, é preciso combustível, comburente (O₂) e calor: o triângulo do fogo. Na combustão completa de compostos com carbono, formam-se CO₂ e H₂O. Com pouco oxigênio, a combustão é incompleta e forma monóxido de carbono (CO), um gás tóxico e sem cheiro, ou fuligem (C). Por isso aquecedores a gás exigem ambiente ventilado.'],
   ['Oxirredução numa frase', 'Quando há transferência de elétrons entre as espécies, a reação é de oxirredução: quem perde elétrons se oxida e quem ganha se reduz, e o número de oxidação (NOX) muda. Simples troca, combustão e a maioria das sínteses e decomposições com substâncias simples são de oxirredução. Dupla troca e neutralização não são: os íons só trocam de par, sem mudar de carga. As pilhas e a eletrólise aprofundam essa ideia na aula de Oxirredução.'],
   ['Balanceamento por tentativa', 'Balancear é ajustar os coeficientes até que cada elemento tenha a mesma quantidade de átomos dos dois lados. Nunca se mexe nos índices: H₂O e H₂O₂ são substâncias diferentes. Uma ordem que funciona: começa pelo elemento que aparece uma vez de cada lado (em geral, metais), depois os ametais, e deixa hidrogênio e oxigênio por último. Se aparecer fração, multiplica tudo pelo denominador para ficar com os menores inteiros.'],
  ],
  example: [
   'Uma placa de ferro é mergulhada numa solução azul de sulfato de cobre (CuSO₄). Depois de algum tempo, a placa fica avermelhada e o azul da solução enfraquece. O que aconteceu?',
   'Na fila de reatividade, o ferro (Fe) vem antes do cobre (Cu). Então o ferro consegue deslocar o cobre: é uma simples troca.',
   'Equação: Fe + CuSO₄ → FeSO₄ + Cu. O cobre metálico, avermelhado, se deposita na placa, e os íons Cu²⁺, que davam a cor azul, vão saindo da solução.',
   'Conferindo o balanceamento: 1 Fe, 1 Cu, 1 S e 4 O de cada lado. Também é oxirredução: o ferro perde 2 elétrons (Fe → Fe²⁺) e o cobre os ganha (Cu²⁺ → Cu).',
   'Se a placa fosse de prata, nada aconteceria: a prata vem depois do cobre na fila e não consegue deslocá-lo.',
  ],
  exam: 'O ENEM costuma descrever a reação com palavras do dia a dia. Traduz cada pista antes de calcular: bolhas são gás, sólido que turva a mistura é precipitado, metal que “aparece” na placa indica simples troca, aquecimento indica reação exotérmica. Classifica a reação, escreve a equação balanceada e só então faz as contas.',
  check: {
   prompt: 'Ao misturar uma solução de nitrato de prata (AgNO₃) com uma de cloreto de sódio (NaCl), forma-se um sólido branco. Que tipo de reação aconteceu?',
   correct: 1,
   choices: [
    ['Simples troca', 'Na simples troca, uma substância simples, como um metal puro, entra na reação. Aqui as duas substâncias são compostas.'],
    ['Dupla troca, com formação de precipitado', 'Os íons trocam de par: AgNO₃ + NaCl → AgCl↓ + NaNO₃. O AgCl é pouco solúvel e aparece como o sólido branco.'],
    ['Decomposição', 'Na decomposição, uma única substância se divide. Aqui duas substâncias reagem entre si.'],
   ],
  },
 };
 const at = lessons.findIndex(l => l.id === 'atomos');
 lessons.splice(at < 0 ? lessons.length : at + 1, 0, lesson);
})();
