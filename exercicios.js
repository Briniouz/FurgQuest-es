'use strict';
/* Aba Exercícios: junta num só lugar todos os exercícios de múltipla escolha do site,
   no formato do banco do ENEM, e organiza cada matéria numa trilha do básico ao avançado.
   Fontes: questões inéditas (exercicios-*-data.js), verificações das aulas do Dia 2 e de
   Engenharias, Exercícios autorais e Apostas do Dia 2, questões exclusivas e treino do Dia 1.
   Modos: trilha (assunto × nível), todos (banco com filtros), outros (demais treinos) e nível. */
(() => {
 const $ = id => document.getElementById(id);
 const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
 const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
 const LETTERS = 'ABCDE';
 const SUBJECTS = {
  matematica: {label: 'Matemática', icon: '∑', space: 'dia-2'},
  fisica: {label: 'Física', icon: '⚡', space: 'dia-2'},
  quimica: {label: 'Química', icon: '⚗', space: 'dia-2'},
  biologia: {label: 'Biologia', icon: '❦', space: 'dia-2'},
  linguagens: {label: 'Linguagens', icon: 'Aa', space: 'dia-1'},
  humanas: {label: 'Ciências Humanas', icon: '◎', space: 'dia-1'},
  redacao: {label: 'Redação', icon: '✎', space: 'dia-1'},
  calculo: {label: 'Engenharias', icon: '∫', space: 'engenharias'},
 };
 const SCOPE = {'dia-1': ['linguagens', 'humanas', 'redacao'], 'dia-2': ['matematica', 'fisica', 'quimica', 'biologia'], engenharias: ['calculo']};
 const LEVELS = {1: 'Básico', 2: 'Intermediário', 3: 'Avançado'};
 const ORIGINS = {novas: 'Inéditas no estilo ENEM', aulas: 'Revisão das aulas', autorais: 'Exercícios autorais', apostas: 'Apostas do Dia 2',
  exclusivas: 'Questões exclusivas', dia1: 'Treino do Dia 1'};
 const ORIGIN_TAG = {novas: 'Inédita', aulas: 'Revisão de aula', autorais: 'Autoral', apostas: 'Aposta do Dia 2', exclusivas: 'Exclusiva', dia1: 'Treino do Dia 1'};
 // Ordem pedagógica de cada trilha: do mais básico ao mais avançado.
 const TRACK = {
  matematica: ['Grandezas e unidades', 'Razão e proporção', 'Porcentagem', 'Escalas', 'Múltiplos e divisores', 'Estatística', 'Matemática financeira',
   'Função afim', 'Função quadrática', 'Polinômios e fatoração', 'Função exponencial', 'Logaritmos', 'Progressões', 'Geometria plana',
   'Geometria espacial', 'Trigonometria', 'Análise combinatória', 'Probabilidade', 'Matrizes e sistemas', 'Geometria analítica'],
  fisica: ['Grandezas e unidades', 'Cinemática', 'MUV', 'Leis de Newton', 'Energia', 'Impulso e quantidade de movimento', 'Hidrostática',
   'Calorimetria', 'Dilatação térmica', 'Ondas', 'Óptica', 'Circuitos elétricos', 'Energia elétrica'],
  quimica: ['Separação de misturas', 'Ligações químicas', 'Polaridade e solubilidade', 'Reações químicas', 'Estequiometria', 'Concentração e diluição', 'Gases', 'pH',
   'Termoquímica', 'Cinética química', 'Equilíbrio químico', 'Eletroquímica', 'Radioatividade', 'Química orgânica', 'Bioquímica'],
  biologia: ['Citologia', 'Membrana e osmose', 'Enzimas', 'Fotossíntese e respiração', 'Fisiologia humana', 'Embriologia', 'Genética',
   'Genética molecular', 'Evolução', 'Ecologia', 'Ciclos biogeoquímicos', 'Biomas', 'Imunologia', 'Saúde'],
  linguagens: ['Leitura e interpretação', 'Língua e linguagem', 'Efeitos de sentido', 'Literatura', 'Língua estrangeira', 'Artes e práticas corporais'],
  humanas: ['História', 'Geografia', 'Filosofia', 'Sociologia', 'Cultura, educação e política', 'Argumentação e evidências'],
  redacao: ['Tese e posicionamento', 'Projeto de texto', 'Repertório e argumentação', 'Redação', 'Intervenção'],
  calculo: ['Trigonometria', 'Geometria analítica', 'Ponte para o Cálculo', 'Limites', 'Derivadas', 'Integrais'],
 };
 // Nomes de assunto unificados entre as fontes.
 const TOPIC_ALIAS = {
  Concentração: 'Concentração e diluição', Diluição: 'Concentração e diluição', Otimização: 'Derivadas', 'Taxas relacionadas': 'Derivadas',
  Figuras: 'Efeitos de sentido', 'Figuras de linguagem': 'Efeitos de sentido', 'Intertextualidade e paródia': 'Efeitos de sentido',
  'Literatura e voz narrativa': 'Literatura', 'Voz poética': 'Literatura', Inglês: 'Língua estrangeira', Espanhol: 'Língua estrangeira',
  Artes: 'Artes e práticas corporais', Esporte: 'Artes e práticas corporais',
  'Leitura e inferência': 'Leitura e interpretação', 'Leitura de linguagem verbal e visual': 'Leitura e interpretação',
  'Leitura crítica de publicidade': 'Leitura e interpretação', Pressuposição: 'Leitura e interpretação', Modalização: 'Leitura e interpretação',
  'Modalização e sentido': 'Leitura e interpretação', 'Argumentação e dados': 'Leitura e interpretação',
  Coesão: 'Língua e linguagem', Metalinguagem: 'Língua e linguagem', 'Funções da linguagem': 'Língua e linguagem', 'Gêneros textuais': 'Língua e linguagem',
  'Variação e adequação linguística': 'Língua e linguagem', 'Variação e registro': 'Língua e linguagem', 'Variação linguística': 'Língua e linguagem',
  Cultura: 'Cultura, educação e política', Educação: 'Cultura, educação e política', Política: 'Cultura, educação e política',
 };
 const CARD_TOPIC = {
  velocidade: 'Cinemática', mu: 'Cinemática', muv: 'MUV', torricelli: 'MUV', calorimetria: 'Calorimetria',
  resistores: 'Circuitos elétricos', radiacao: 'Ondas', 'rendimento-fis': 'Energia',
  proporcao: 'Razão e proporção', percentual: 'Porcentagem', 'media-ponderada': 'Estatística', escala: 'Escalas',
  condicional: 'Probabilidade', probabilidade: 'Probabilidade', combinacao: 'Análise combinatória', contagem: 'Análise combinatória',
  unidades: 'Grandezas e unidades', 'custo-fixo': 'Função afim', fatoracao: 'Polinômios e fatoração',
  circulo: 'Geometria plana', areas: 'Geometria plana', quadratica: 'Função quadrática',
  mol: 'Estequiometria', estequiometria: 'Estequiometria', 'rendimento-qui': 'Estequiometria', ph: 'pH', 'acido-base': 'pH',
  diluicao: 'Concentração e diluição', pilha: 'Eletroquímica', intermoleculares: 'Polaridade e solubilidade',
  membrana: 'Membrana e osmose', enzimas: 'Enzimas', mendel: 'Genética', eutrofizacao: 'Ecologia', biomagnificacao: 'Ecologia',
  cadeia: 'Ecologia', selecao: 'Evolução', ciclos: 'Ciclos biogeoquímicos', dna: 'Genética molecular', transmissao: 'Saúde',
 };
 // Aulas do Dia 2 → assunto da trilha (a verificação de cada aula vira um exercício básico).
 const LESSON_TOPIC = {
  fracoes: 'Grandezas e unidades', proporcao: 'Razão e proporção', porcentagens: 'Porcentagem', equacoes: 'Função afim', crescimento: 'Progressões',
  polinomios: 'Polinômios e fatoração', 'raizes-polinomios': 'Polinômios e fatoração', 'geometria-plana': 'Geometria plana', volumes: 'Geometria espacial',
  estatistica: 'Estatística', probabilidade: 'Probabilidade',
  movimento: 'Cinemática', energia: 'Energia', forcas: 'Leis de Newton', fluidos: 'Hidrostática', calor: 'Calorimetria', ondas: 'Ondas',
  circuitos: 'Circuitos elétricos', consumo: 'Energia elétrica', colisoes: 'Impulso e quantidade de movimento',
  materia: 'Separação de misturas', atomos: 'Ligações químicas', 'reacoes-quimicas': 'Reações químicas', mol: 'Estequiometria', reacoes: 'Estequiometria', solucoes: 'Concentração e diluição',
  ph: 'pH', termoquimica: 'Termoquímica', eletroquimica: 'Eletroquímica', organica: 'Química orgânica', bioquimica: 'Bioquímica', 'enzimas-atp': 'Bioquímica',
  celula: 'Citologia', metabolismo: 'Fotossíntese e respiração', heranca: 'Genética', heredogramas: 'Genética', evolucao: 'Evolução', cadeias: 'Ecologia',
  ecossistemas: 'Ecologia', biomas: 'Biomas', embriologia: 'Embriologia', fisiologia: 'Fisiologia humana', imunidade: 'Imunologia', biotecnologia: 'Genética molecular',
 };
 const CHAPTER_TOPIC = {trigonometria: 'Trigonometria', geometria: 'Geometria analítica', ponte: 'Ponte para o Cálculo', limites: 'Limites', derivadas: 'Derivadas', integrais: 'Integrais'};
 const ROUTE = {geral: 'exercicios', 'dia-1': 'dia-1/exercicios', 'dia-2': 'dia-2/exercicios', engenharias: 'engenharias/questoes'};
 // Outros tipos de treino do site, com uma frase sobre quando usar cada um.
 const OTHER = {
  'dia-2': [
   ['dia-2/enem', 'Questões reais do ENEM', 'Provas de 2009 a 2025 com filtros por matéria, ano e dificuldade. Bom para medir o nível depois da trilha.', '▤'],
   ['dia-2/simulados', 'Simulado do Dia 2', 'A prova inteira ou um bloco montado por ti, com tempo e estimativa TRI.', '◷'],
   ['dia-2/dia2', 'Treino guiado do Dia 2', 'Raciocínio por etapas, flashcards e caderno de erros por matéria.', '∑'],
   ['dia-2/aulas/matematica/polinomios', 'Listas progressivas', 'Polinômios e Bioquímica em 12 exercícios abertos cada, do básico à aplicação.', '☰'],
   ['dia-2/matematica-lab', 'Laboratório de Matemática', 'Desafios com tempo e revisão dos erros, para ganhar velocidade.', '×'],
   ['dia-2/calculo-mental', 'Cálculo mental', 'Rodadas rápidas de contas sorteadas por nível.', '⚡'],
   ['dia-2/evolucao', 'Level Up', 'Matemática em fases, da primeira soma aos desafios.', '→'],
  ],
  'dia-1': [
   ['dia-1/enem', 'Questões reais do ENEM', 'Linguagens e Ciências Humanas das provas anteriores, com filtros.', '▤'],
   ['dia-1/simulados', 'Simulado do Dia 1', 'A prova do primeiro dia por ano, com tempo e correção.', '◷'],
   ['dia-1/vespera', 'Modo Véspera', 'Treino guiado de leitura, flashcards e revisão de erros.', '✦'],
   ['dia-1/aquecimento', 'Aquecimento', 'Exercícios curtos de leitura e vocabulário para começar o estudo.', '→'],
   ['dia-1/leituras', 'Resumos literários', 'Obras do vestibular com resumo e exercícios por livro.', '▥'],
   ['dia-1/repertorios', 'Redação e repertórios', 'Modelos de desenvolvimento e referências para a redação.', '✎'],
  ],
  engenharias: [
   ['engenharias/exercicios', 'Exercícios abertos', 'Resolve no caderno e confere a solução, aula por aula.', '✎'],
   ['engenharias/desafios', 'Desafios de aplicação', 'Problemas que juntam várias ideias, para depois da trilha.', '◇'],
   ['engenharias/revisar', 'Revisar meus erros', 'Volta às ideias que exigiram outra tentativa.', '↺'],
   ['engenharias/passo-a-passo', 'Aulas passo a passo', 'Explicação, exemplo e prática antes de cada nível.', '↪'],
  ],
  geral: [
   ['enem', 'Questões do ENEM', 'Todas as provas, filtradas por área, matéria e ano.', '▤'],
   ['banco', 'Questões da FURG', 'Banco organizado por matéria e ano.', '▤'],
   ['fuvest', 'Questões da Fuvest', 'Primeira fase, desde 2010.', '◇'],
   ['simulados', 'Simulados', 'Escolhe a prova ou monta teu próprio bloco.', '◷'],
   ['dia-2/calculo-mental', 'Cálculo mental', 'Rodadas rápidas por nível.', '⚡'],
   ['engenharias/exercicios', 'Exercícios abertos de Engenharias', 'Resolve no caderno e confere a solução.', '✎'],
  ],
 };
 // Fecho de cada trilha: onde treinar com questões de prova.
 const FINAL = {
  matematica: ['real', 'Questões reais do ENEM de Matemática'], fisica: ['real', 'Questões reais do ENEM de Física'],
  quimica: ['real', 'Questões reais do ENEM de Química'], biologia: ['real', 'Questões reais do ENEM de Biologia'],
  linguagens: ['dia-1/enem', 'Questões reais do ENEM de Linguagens'], humanas: ['dia-1/enem', 'Questões reais do ENEM de Ciências Humanas'],
  redacao: ['dia-1/repertorios', 'Redação completa com repertórios'], calculo: ['engenharias/desafios', 'Desafios de aplicação de Engenharias'],
 };
 const DONE = .7;
 const fresh = () => ({answers: {}, favorites: {}, notes: {}});
 const emptyFilters = () => ({subject: '', topic: '', level: '', origin: '', status: '', search: ''});

 let qs = null, byId = new Map(), adapter = null, bound = false;
 let list = [], index = 0, choice = null, retry = false, hintOpen = false, searchTimer, noteTimer, pending = null;
 const filtersBy = {}, modeBy = {}, trackBy = {}, stageBy = {};

 /* ---------- dados ---------- */
 const level = v => typeof v === 'number' ? v : /dif|desafio|avan/.test(norm(v)) ? 3 : /med|aplic|inter/.test(norm(v)) ? 2 : 1;
 function build() {
  if (qs) return qs;
  const out = [];
  const guide = new Map((globalThis.FURG_DIA2_GUIDE?.entries || []).map(e => [e.id, e]));
  const subjectOf = card => guide.get(card)?.subject;
  const topicOf = card => CARD_TOPIC[card] || guide.get(card)?.title || 'Outros assuntos';
  const add = x => {
   if (!x.id || byId.has(x.id) || !SUBJECTS[x.s] || !Array.isArray(x.opts) || x.opts.length < 3 || x.opts.length > 5) return;
   if (!/^[A-E]$/.test(x.ans || '') || LETTERS.indexOf(x.ans) >= x.opts.length) return;
   x.t = TOPIC_ALIAS[x.t] || x.t || 'Outros assuntos';
   x.steps = (x.steps || []).filter(Boolean);
   x.hay = norm([x.title, x.t, x.ctx, x.stem, ...x.opts, ...(x.table || []).flat()].join(' '));
   byId.set(x.id, x); out.push(x);
  };
  const fromCard = (q, origin) => ({id: q.id, s: q.subject || subjectOf(q.card), t: topicOf(q.card), lv: level(q.difficulty || q.level),
   title: q.title, ctx: '', stem: q.stem, opts: q.options, ans: q.answer, hint: q.hint, steps: q.steps, trap: q.trap, origin});
  const fromCheck = (id, s, t, lesson, check, choices, correct, path) => {
   if (!check || !Array.isArray(choices) || !Number.isInteger(correct)) return;
   const why = {};
   choices.forEach((c, i) => { if (i !== correct && c?.[1]) why[LETTERS[i]] = c[1]; });
   add({id, s, t, lv: 1, title: lesson.title, ctx: '', stem: check.prompt, opts: choices.map(c => c[0]), ans: LETTERS[correct],
    hint: lesson.lead || '', steps: [choices[correct]?.[1]], why, origin: 'aulas', lessonRoute: path, lessonTitle: lesson.title});
  };
  for (const q of globalThis.FURG_EXERCICIOS?.items || []) add({...q, origin: 'novas'});
  for (const [subject, lessons] of Object.entries(globalThis.FURG_DIA2_LESSONS || {})) {
   for (const lesson of lessons || []) fromCheck('aula-' + subject + '-' + lesson.id, subject, LESSON_TOPIC[lesson.id] || lesson.title, lesson,
    lesson.check, lesson.check?.choices, lesson.check?.correct, 'dia-2/aulas/' + subject + '/' + lesson.id);
  }
  for (const lesson of globalThis.FURG_ENGINEERING?.lessons || []) fromCheck('aula-eng-' + lesson.id, 'calculo', CHAPTER_TOPIC[lesson.chapter] || 'Engenharias', lesson,
   lesson.check, lesson.check?.options, lesson.check?.correct, 'engenharias/aula/' + lesson.id);
  for (const q of globalThis.FURG_DIA2_EXERCISES?.items || []) add(fromCard(q, 'autorais'));
  for (const q of globalThis.FURG_DIA2_BETS?.items || []) add(fromCard(q, 'apostas'));
  const exclusive = globalThis.FURG_ENEM_EXCLUSIVAS || {};
  for (const q of exclusive.day2 || []) add(fromCard(q, 'exclusivas'));
  for (const q of exclusive.day1 || []) {
   const why = {};
   for (const [letter, item] of Object.entries(q.wrong || {})) if (item?.why) why[letter] = item.why;
   add({id: q.id, s: q.area === 'linguagens' ? 'linguagens' : 'humanas', t: q.area === 'linguagens' ? 'Leitura e interpretação' : 'Argumentação e evidências',
    lv: 2, title: q.title, ctx: q.context || '', stem: q.stem, opts: q.options, ans: q.answer, hint: q.hint,
    steps: Array.isArray(q.explanation) ? q.explanation : [q.explanation], cmd: q.command, evidence: q.evidence, why, origin: 'exclusivas'});
  }
  for (const q of globalThis.FURG_DAY1_DATA?.questions || []) {
   if (!Array.isArray(q.options) || !Number.isInteger(q.answer)) continue;
   const topic = String(q.topic || '').split(' — ')[0].trim() || 'Outros assuntos';
   add({id: q.id, s: q.subject, t: topic, lv: level(q.level), title: q.topic || topic, ctx: '', stem: q.prompt, opts: q.options,
    ans: LETTERS[q.answer], hint: q.tip, steps: [q.explanation], origin: 'dia1'});
  }
  const subjects = Object.keys(SUBJECTS);
  const pos = q => { const i = (TRACK[q.s] || []).indexOf(q.t); return i < 0 ? 999 : i; };
  const origin = Object.keys(ORIGINS);
  out.sort((a, b) => subjects.indexOf(a.s) - subjects.indexOf(b.s) || pos(a) - pos(b) || a.t.localeCompare(b.t, 'pt') || a.lv - b.lv
   || origin.indexOf(a.origin) - origin.indexOf(b.origin) || a.id.localeCompare(b.id));
  qs = out;
  return qs;
 }
 const currentSpace = () => globalThis.FurgStudyAreas?.current() || 'geral';
 const subjectsOf = space => SCOPE[space] || Object.keys(SUBJECTS);
 const pool = space => build().filter(q => subjectsOf(space).includes(q.s));
 const progress = () => adapter.getState().exercicios || (adapter.getState().exercicios = fresh());
 const filters = space => filtersBy[space] || (filtersBy[space] = emptyFilters());
 const mode = space => modeBy[space] || 'trilha';
 const trackSubject = space => { const all = subjectsOf(space).filter(s => build().some(q => q.s === s)); return all.includes(trackBy[space]) ? trackBy[space] : all[0]; };

 function validate(value) {
  build();
  const out = fresh(), ok = v => typeof v === 'string' && /^[A-E]$/.test(v);
  for (const [id, a] of Object.entries(value?.answers || {})) {
   if (!byId.has(id) || !a || typeof a !== 'object') continue;
   out.answers[id] = {choice: ok(a.choice) ? a.choice : undefined, firstChoice: ok(a.firstChoice) ? a.firstChoice : ok(a.choice) ? a.choice : undefined,
    attempts: Math.max(1, Math.min(100000, Number(a.attempts) || 1)), viewed: !!a.viewed, peeked: !!a.peeked, date: typeof a.date === 'string' ? a.date.slice(0, 40) : ''};
  }
  for (const [id, yes] of Object.entries(value?.favorites || {})) if (byId.has(id) && yes) out.favorites[id] = true;
  for (const [id, n] of Object.entries(value?.notes || {})) if (byId.has(id) && typeof n === 'string') out.notes[id] = n.slice(0, 20000);
  return out;
 }
 function metrics(space = 'geral') {
  const s = progress(), items = pool(space), answered = items.filter(q => s.answers[q.id]?.choice);
  const correct = answered.filter(q => s.answers[q.id].firstChoice === q.ans && !s.answers[q.id].peeked);
  return {total: items.length, answered: answered.length, correct: correct.length};
 }

 /* ---------- trilha: assunto × nível ---------- */
 const orderOf = (subject, topic) => { const i = (TRACK[subject] || []).indexOf(topic); return i < 0 ? 999 : i; };
 function topicsOf(subject) {
  const items = build().filter(q => q.s === subject);
  const names = [...new Set(items.map(q => q.t))].sort((a, b) => orderOf(subject, a) - orderOf(subject, b) || a.localeCompare(b, 'pt'));
  return names.map(t => {
   const inTopic = items.filter(q => q.t === t);
   const levels = [1, 2, 3].filter(lv => inTopic.some(q => q.lv === lv)).map(lv => stageInfo(subject, t, lv));
   return {topic: t, total: inTopic.length, levels};
  });
 }
 function stageItems(subject, topic, lv) { return build().filter(q => q.s === subject && q.t === topic && q.lv === lv); }
 function stageInfo(subject, topic, lv) {
  const items = stageItems(subject, topic, lv), s = progress();
  const answered = items.filter(q => s.answers[q.id]?.choice).length, right = items.filter(q => s.answers[q.id]?.choice === q.ans).length;
  const status = answered === items.length && right / items.length >= DONE ? 'done' : answered === items.length ? 'review' : answered ? 'progress' : 'new';
  return {subject, topic, lv, total: items.length, answered, right, status};
 }
 function stagesOf(subject) { return topicsOf(subject).flatMap(t => t.levels); }
 function nextStage(subject, after) {
  const all = stagesOf(subject);
  const start = after ? all.findIndex(x => x.topic === after.topic && x.lv === after.lv) + 1 : 0;
  return all.slice(start).find(x => x.status !== 'done') || (after ? all[start] : null) || null;
 }
 function trackSummary(space) {
  const stages = subjectsOf(space).flatMap(stagesOf);
  return {done: stages.filter(x => x.status === 'done').length, total: stages.length};
 }
 function continueTarget(space) {
  const subjects = subjectsOf(space).filter(s => build().some(q => q.s === s));
  const first = trackSubject(space);
  for (const s of [first, ...subjects.filter(x => x !== first)]) { const n = nextStage(s); if (n) return n; }
  return null;
 }

 /* ---------- filtros do modo "todos" ---------- */
 function matches(q, f) {
  const a = progress().answers[q.id];
  if (f.subject && q.s !== f.subject || f.topic && q.t !== f.topic || f.level && String(q.lv) !== f.level || f.origin && q.origin !== f.origin) return false;
  if (f.search && !norm(f.search).split(/\s+/).filter(Boolean).every(term => q.hay.includes(term))) return false;
  switch (f.status) {
   case 'unanswered': return !a?.choice;
   case 'answered': return !!a?.choice;
   case 'wrong': return !!a?.choice && a.choice !== q.ans;
   case 'correct': return !!a?.choice && a.choice === q.ans;
   case 'favorites': return !!progress().favorites[q.id];
   default: return true;
  }
 }
 function filter(reset = true) {
  const space = currentSpace(), f = filters(space);
  for (const [key, id] of Object.entries({topic: 'exTopic', level: 'exLevel', origin: 'exOrigin', status: 'exStatus', search: 'exSearch'})) if ($(id)) f[key] = $(id).value.trim();
  const old = list[index]?.id;
  list = pool(space).filter(q => matches(q, f));
  index = reset ? 0 : Math.max(0, list.findIndex(q => q.id === old));
  const target = pending?.id;
  if (target) { const at = list.findIndex(q => q.id === target); if (at >= 0) index = at; }
  choice = null; retry = false; hintOpen = false;
  const parts = [list.length.toLocaleString('pt-BR') + (list.length === 1 ? ' exercício' : ' exercícios')];
  if (f.subject) parts.push(SUBJECTS[f.subject].label);
  if (f.topic) parts.push(f.topic);
  if (f.level) parts.push(LEVELS[f.level]);
  if ($('exCount')) $('exCount').textContent = parts.join(' · ');
  $('exRoot').querySelectorAll('button[data-ex="subject"]').forEach(b => b.setAttribute('aria-pressed', String(f.subject === b.dataset.subject)));
  pending = null;
  question(!!target);
  if (target) focusTitle();
 }
 function topicOptions(space, f) {
  const subjects = f.subject ? [f.subject] : subjectsOf(space);
  const topics = subjects.flatMap(s => topicsOf(s).map(t => t.topic)).filter((t, i, all) => all.indexOf(t) === i);
  if (f.topic && !topics.includes(f.topic)) f.topic = '';
  return '<option value="">Todos os assuntos</option>' + topics.map(t => `<option value="${esc(t)}"${f.topic === t ? ' selected' : ''}>${esc(t)}</option>`).join('');
 }

 /* ---------- interface ---------- */
 const accuracy = m => m.answered ? Math.round(m.correct / m.answered * 100) + '% de acertos na 1ª tentativa' : 'Tua primeira resposta começa aqui.';
 const text = s => esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
 const route = path => `href="#${path}" data-study-route="${path}"`;
 function applyPending(space) {
  if (!pending) return;
  if (pending.stage) { modeBy[space] = 'stage'; stageBy[space] = pending.stage; trackBy[space] = pending.stage.subject; }
  else if (pending.track) { modeBy[space] = 'trilha'; trackBy[space] = pending.track; }
  else { modeBy[space] = 'todos'; Object.assign(filters(space), emptyFilters(), pending.filters || {}); }
  if (!pending.id) pending = null;
 }
 function render() {
  if (!adapter || !$('exRoot')) return;
  const space = currentSpace();
  applyPending(space);
  const items = pool(space), m = metrics(space), sum = trackSummary(space), next = continueTarget(space), current = mode(space);
  const area = globalThis.FurgStudyAreas?.get(space);
  const scope = space === 'engenharias' ? 'ENGENHARIAS' : area?.day ? 'ENEM · DIA ' + area.day : 'TODAS AS MATÉRIAS';
  const topics = subjectsOf(space).reduce((n, s) => n + topicsOf(s).length, 0);
  const tabs = [['trilha', 'Do básico ao avançado'], ['todos', 'Todos os exercícios'], ['outros', 'Outros tipos de treino']];
  $('exRoot').innerHTML = `<div class="enem-hero panel ex-hero"><div><p class="eyebrow">EXERCÍCIOS · ${scope}</p>
   <h2>Do básico ao avançado,<br>um nível de cada vez.</h2>
   <p>${space === 'engenharias' ? 'A trilha começa na Trigonometria e chega às Integrais.' : 'Escolhe a matéria e segue a trilha de assuntos.'} Cada assunto tem até três níveis: Básico, Intermediário e Avançado. Acerta ${Math.round(DONE * 100)}% de um nível para concluí-lo e seguir para o próximo. No fim da trilha, treina com questões de prova.</p>
   <div class="enem-tags"><span>${items.length.toLocaleString('pt-BR')} exercícios</span><span>${topics} assuntos</span><span>${sum.total} níveis</span><span>Resolução passo a passo</span></div></div>
   <div class="enem-score ex-score"><small>TEU PROGRESSO</small><strong id="exAnswered">${sum.done}<small> de ${sum.total} níveis</small></strong><p id="exAccuracy">${m.answered} respondidos · ${accuracy(m)}</p>
   ${next ? `<button class="primary ex-continue" data-ex="continue">${sum.done || m.answered ? 'Continuar' : 'Começar'}: ${esc(next.topic)} · ${LEVELS[next.lv]} →</button>` : '<p class="ex-all-done">Trilha completa. Que tal as questões de prova?</p>'}</div></div>
   <div class="ex-modes" role="tablist" aria-label="Como tu quer treinar">${tabs.map(([id, label]) => `<button role="tab" data-ex="mode" data-mode="${id}" aria-selected="${current === id || current === 'stage' && id === 'trilha'}">${label}</button>`).join('')}</div>
   <div id="exModeRoot"></div>`;
  ({trilha: renderTrack, todos: renderAll, outros: renderOther, stage: renderStage}[current] || renderTrack)(space);
 }
 function subjectChips(space, active, action) {
  const subjects = subjectsOf(space).filter(id => build().some(q => q.s === id));
  if (subjects.length < 2) return '';
  return `<div class="enem-areas ex-subjects" role="group" aria-label="Matéria">${subjects.map(id => {
   const st = action === 'track' ? stagesOf(id) : null, done = st ? st.filter(x => x.status === 'done').length : 0;
   return `<button data-ex="${action}" data-subject="${id}" aria-pressed="${active === id}"><span aria-hidden="true">${SUBJECTS[id].icon}</span><strong>${SUBJECTS[id].label}</strong><small>${st ? done + '/' + st.length + ' níveis' : build().filter(q => q.s === id).length}</small></button>`;
  }).join('')}</div>`;
 }
 function renderTrack(space) {
  const subject = trackSubject(space), topics = topicsOf(subject), stages = topics.flatMap(t => t.levels);
  const done = stages.filter(x => x.status === 'done').length, next = nextStage(subject), pct = stages.length ? Math.round(done / stages.length * 100) : 0;
  const final = FINAL[subject];
  $('exModeRoot').innerHTML = `${subjectChips(space, subject, 'track')}
   <section class="ex-track-wrap panel" aria-labelledby="exTrackTitle">
    <header class="ex-track-head"><div><p class="eyebrow">TRILHA DE ${SUBJECTS[subject].label.toUpperCase()}</p><h3 id="exTrackTitle" tabindex="-1">${topics.length} assuntos, do mais básico ao mais avançado</h3>
     <p class="muted">Os níveis são uma sugestão: dá para abrir qualquer um. O destaque mostra por onde continuar.</p></div>
     <div class="ex-track-progress" aria-label="${done} de ${stages.length} níveis concluídos"><strong>${pct}%</strong><small>${done} de ${stages.length} níveis</small><div class="ex-bar"><i style="width:${pct}%"></i></div></div></header>
    <ol class="ex-track">${topics.map((t, i) => {
     const isNext = next && next.topic === t.topic, allDone = t.levels.every(x => x.status === 'done');
     return `<li class="ex-stage${isNext ? ' is-next' : ''}${allDone ? ' is-done' : ''}"><span class="ex-step" aria-hidden="true">${allDone ? '✓' : String(i + 1).padStart(2, '0')}</span>
      <div class="ex-stage-body"><div class="ex-stage-title"><strong>${esc(t.topic)}</strong><small>${t.total} ${t.total === 1 ? 'exercício' : 'exercícios'}${isNext ? ' · <b>continua aqui</b>' : ''}</small></div>
      <div class="ex-levels">${t.levels.map(x => `<button class="ex-level-pill" data-ex="stage" data-subject="${subject}" data-topic="${esc(t.topic)}" data-level="${x.lv}" data-status="${x.status}" aria-label="${esc(t.topic)}, nível ${LEVELS[x.lv]}: ${x.answered} de ${x.total} respondidos, ${x.right} certos"><span>${LEVELS[x.lv]}</span><small>${x.status === 'done' ? '✓ ' : ''}${x.right}/${x.total}</small></button>`).join('')}</div></div></li>`;
    }).join('')}
    ${final ? `<li class="ex-stage ex-final"><span class="ex-step" aria-hidden="true">★</span><div class="ex-stage-body"><div class="ex-stage-title"><strong>Prova real</strong><small>Depois da trilha, mede o nível com questões de prova.</small></div>
     <div class="ex-levels">${final[0] === 'real' ? `<button class="ex-level-pill ex-real" data-ex="real" data-subject="${subject}"><span>${esc(final[1])}</span><small>→</small></button>` : `<a class="ex-level-pill ex-real" ${route(final[0])}><span>${esc(final[1])}</span><small>→</small></a>`}</div></div></li>` : ''}
    </ol></section>`;
 }
 function renderOther(space) {
  const cards = OTHER[space] || OTHER.geral;
  $('exModeRoot').innerHTML = `<section class="ex-other-wrap" aria-labelledby="exOtherTitle"><h3 id="exOtherTitle" class="ex-section-title" tabindex="-1">Outros tipos de treino ${space === 'geral' ? 'do site' : 'desta área'}</h3>
   <p class="muted ex-section-lead">Cada formato serve para um momento: a trilha ensina, as provas medem e os treinos rápidos mantêm o ritmo.</p>
   <div class="ex-other-grid">${cards.map(([path, title, detail, icon]) => `<a class="ex-other" ${route(path)}><span class="ex-other-icon" aria-hidden="true">${icon}</span><span><strong>${esc(title)}</strong><small>${esc(detail)}</small></span><i aria-hidden="true">→</i></a>`).join('')}</div></section>`;
 }
 function renderAll(space) {
  const f = filters(space), items = pool(space);
  $('exModeRoot').innerHTML = `${subjectChips(space, f.subject, 'subject')}
   <div class="enem-filters panel ex-filters"><div class="field enem-search"><label for="exSearch">O que tu quer treinar?</label><input id="exSearch" type="search" placeholder="Ex.: porcentagem, juros, osmose, derivada…" autocomplete="off"></div>
    <div class="field"><label for="exTopic">Assunto</label><select id="exTopic">${topicOptions(space, f)}</select></div>
    <div class="field"><label for="exLevel">Nível</label><select id="exLevel"><option value="">Todos os níveis</option>${Object.entries(LEVELS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>
    <div class="field"><label for="exOrigin">Origem</label><select id="exOrigin"><option value="">Todas as origens</option>${Object.entries(ORIGINS).filter(([id]) => items.some(q => q.origin === id)).map(([id, l]) => `<option value="${id}">${l}</option>`).join('')}</select></div>
    <div class="field"><label for="exStatus">Minha revisão</label><select id="exStatus"><option value="">Todas as questões</option><option value="unanswered">Ainda não respondi</option><option value="answered">Já respondi</option><option value="wrong">Revisar erros</option><option value="correct">Acertei</option><option value="favorites">Favoritas</option></select></div></div>
   <div class="enem-session"><strong id="exCount"></strong><div><button class="quiet" data-ex="clear">Limpar filtros</button><button class="text-link" data-ex="random">Sortear questão ↗</button></div></div>
   <div id="exQuestionRoot"></div>`;
  for (const [key, id] of Object.entries({level: 'exLevel', origin: 'exOrigin', status: 'exStatus', search: 'exSearch'})) $(id).value = f[key];
  $('exTopic').onchange = $('exLevel').onchange = $('exOrigin').onchange = $('exStatus').onchange = () => filter();
  $('exSearch').oninput = () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => filter(), 200); };
  $('exSearch').onkeydown = e => { if (e.key === 'Enter') { clearTimeout(searchTimer); filter(); } };
  filter(false);
 }
 function renderStage(space) {
  const stage = stageBy[space];
  if (!stage || !stageItems(stage.subject, stage.topic, stage.lv).length) { modeBy[space] = 'trilha'; renderTrack(space); return; }
  list = stageItems(stage.subject, stage.topic, stage.lv);
  const s = progress(), first = list.findIndex(q => !s.answers[q.id]?.choice);
  index = first < 0 ? 0 : first;
  choice = null; retry = false; hintOpen = false;
  $('exModeRoot').innerHTML = `<div class="ex-stage-bar panel" id="exStageBar"></div><div id="exQuestionRoot"></div>`;
  question(true); focusTitle();
 }
 function stageBar() {
  const space = currentSpace(), stage = stageBy[space], el = $('exStageBar');
  if (!stage || !el) return;
  const s = progress(), info = stageInfo(stage.subject, stage.topic, stage.lv);
  el.innerHTML = `<button class="quiet" data-ex="mode" data-mode="trilha">← Trilha</button>
   <div class="ex-stage-name"><small>${SUBJECTS[stage.subject].label} · ${esc(stage.topic)}</small><strong>Nível ${LEVELS[stage.lv]}</strong></div>
   <div class="ex-dots" aria-label="${info.answered} de ${info.total} respondidos">${list.map((q, i) => { const a = s.answers[q.id]?.choice; return `<button data-ex="jump" data-index="${i}" class="${a ? a === q.ans ? 'is-correct' : 'is-wrong' : ''}${i === index ? ' is-current' : ''}" aria-label="Exercício ${i + 1}${a ? a === q.ans ? ', certo' : ', errado' : ''}"></button>`; }).join('')}</div>
   <span class="ex-stage-count">${info.right}/${info.total} certos</span>`;
 }
 function table(rows) {
  if (!Array.isArray(rows) || rows.length < 2) return '';
  const [head, ...body] = rows;
  return `<div class="enem-table ex-table"><table><thead><tr>${head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 }
 function stageEnd() {
  const space = currentSpace(), stage = stageBy[space];
  if (mode(space) !== 'stage' || !stage) return '';
  const info = stageInfo(stage.subject, stage.topic, stage.lv);
  if (info.answered < info.total) return '';
  const next = nextStage(stage.subject, stage);
  if (info.status === 'done') return `<div class="ex-stage-done is-done" role="status"><strong>Nível ${LEVELS[stage.lv]} concluído: ${info.right} de ${info.total} certos.</strong><p>${next ? 'Próximo passo da trilha: ' + esc(next.topic) + ' · ' + LEVELS[next.lv] + '.' : 'Tu fechou a trilha desta matéria.'}</p>${next ? `<button class="primary" data-ex="next-stage">Ir para ${esc(next.topic)} · ${LEVELS[next.lv]} →</button>` : `<button class="primary" data-ex="mode" data-mode="trilha">Voltar à trilha</button>`}</div>`;
  return `<div class="ex-stage-done is-review" role="status"><strong>${info.right} de ${info.total} certos neste nível.</strong><p>Para concluir, acerta pelo menos ${Math.ceil(info.total * DONE)}. Refaz os que errou: a resolução de cada um fica logo abaixo da questão.</p><button class="primary" data-ex="redo-wrong">Refazer os que errei</button>${next ? ` <button class="quiet" data-ex="next-stage">Seguir mesmo assim →</button>` : ''}</div>`;
 }
 function question(focus = false) {
  const root = $('exQuestionRoot'), q = list[index];
  if (!root) return;
  if (!q) {
   root.innerHTML = '<div class="enem-empty panel"><h3>Nenhum exercício com esses filtros.</h3><p>Experimenta outra palavra ou amplia a busca.</p><button class="outline" data-ex="clear">Limpar filtros</button></div>';
   return;
  }
  const space = currentSpace(), inStage = mode(space) === 'stage';
  const s = progress(), a = retry ? null : s.answers[q.id], selected = choice ?? a?.choice, answered = !!a?.choice;
  const show = answered || !!a?.viewed, correct = selected === q.ans, start = Math.max(0, Math.min(index - 3, list.length - 7));
  const letters = LETTERS.slice(0, q.opts.length), last = index === list.length - 1;
  const feedback = !show ? '' : `<div class="enem-feedback ${answered ? correct ? 'correct' : 'wrong' : ''}" role="status"><strong>${answered ? correct ? 'Tu acertou!' : 'A resposta correta é ' + q.ans + '.' : 'Gabarito: alternativa ' + q.ans + '.'}</strong><p>${answered ? correct ? 'Confere a resolução para fixar o caminho.' : 'Compara teu raciocínio com a resolução abaixo.' : 'Tenta de novo antes de ler a resolução.'}</p><button class="text-link" data-ex="retry">Refazer questão</button></div>
   <section class="ex-solution" aria-label="Resolução"><h4>Resolução passo a passo</h4>${q.cmd ? `<p class="ex-command"><b>O que a questão pede:</b> ${text(q.cmd)}</p>` : ''}
    <ol>${q.steps.map(step => `<li>${text(step)}</li>`).join('')}</ol>
    ${q.evidence ? `<p class="ex-evidence"><b>Onde está a pista no texto:</b> ${text(q.evidence)}</p>` : ''}
    ${q.trap ? `<div class="ex-trap"><b>Armadilha comum</b><p>${text(q.trap)}</p></div>` : ''}
    ${q.why && Object.keys(q.why).length ? `<details class="ex-why"><summary>Por que as outras alternativas não servem</summary><ul>${Object.entries(q.why).map(([l, w]) => `<li><b>${l}</b> ${text(w)}</li>`).join('')}</ul></details>` : ''}
    ${q.lessonRoute ? `<p class="ex-lesson-back"><a class="text-link" ${route(q.lessonRoute)}>Rever a aula “${esc(q.lessonTitle)}” ↗</a></p>` : ''}
   </section>`;
  const nextButton = inStage && last ? (answered ? `<button class="outline" data-ex="next-stage">Próximo nível →</button>` : `<button class="outline" disabled>Próxima questão →</button>`)
   : `<button class="outline" data-ex="next" ${last ? 'disabled' : ''}>Próxima questão →</button>`;
  const map = inStage ? '' : `<div class="enem-map">${list.slice(start, start + 7).map((item, i) => `<button data-ex="jump" data-index="${start + i}" ${start + i === index ? 'aria-current="step"' : ''} aria-label="Exercício ${start + i + 1}" class="${s.answers[item.id]?.choice ? s.answers[item.id].choice === item.ans ? 'is-correct' : 'is-wrong' : ''}">${start + i + 1}</button>`).join('')}</div>`;
  root.innerHTML = `<article class="enem-question panel ex-question" data-question-id="${esc(q.id)}">
   <div class="enem-toolbar"><span>${inStage ? 'Exercício' : 'Questão'} ${index + 1} de ${list.length.toLocaleString('pt-BR')}</span><button class="quiet" data-ex="favorite" aria-pressed="${!!s.favorites[q.id]}">${s.favorites[q.id] ? '★ Favorita' : '☆ Favoritar'}</button></div>
   <div class="enem-meta"><span class="tag">${SUBJECTS[q.s].label}</span><span class="tag">${esc(q.t)}</span><span class="tag ex-level" data-level="${q.lv}">${LEVELS[q.lv]}</span><span>${ORIGIN_TAG[q.origin]}</span></div>
   <h3 id="exTitle" tabindex="-1">${esc(q.title)}</h3>
   <div class="enem-text ex-text">${q.ctx ? `<p>${text(q.ctx)}</p>` : ''}${table(q.table)}<p class="ex-stem">${text(q.stem)}</p></div>
   <p class="enem-answer-label">Qual alternativa tu escolhe?</p>
   <div class="enem-options">${q.opts.map((o, i) => { const l = letters[i]; return `<button class="enem-option ${selected === l ? 'selected' : ''} ${show && l === q.ans ? 'correct' : ''} ${show && answered && selected === l && !correct ? 'wrong' : ''}" data-ex="choose" data-letter="${l}" aria-pressed="${selected === l}" ${answered ? 'disabled' : ''}><b>${l}</b><span>${text(o)}</span></button>`; }).join('')}</div>
   <div class="enem-submit"><button class="primary" id="exConfirm" data-ex="confirm" ${answered || !choice ? 'disabled' : ''}>${answered ? 'Resposta registrada' : 'Confirmar resposta'}</button>${q.hint && !show ? `<button class="quiet" data-ex="hint" aria-expanded="${hintOpen}">${hintOpen ? 'Esconder pista' : 'Ver pista'}</button>` : ''}<button class="quiet" data-ex="show" ${show ? 'disabled' : ''}>Ver resolução</button><small>${letters[0]}–${letters.at(-1)} para marcar · Enter para responder</small></div>
   ${hintOpen && q.hint && !show ? `<p class="ex-hint" role="note"><b>Pista:</b> ${text(q.hint)}</p>` : ''}
   ${feedback}
   ${stageEnd()}
   <div class="enem-note"><label for="exNote">Meu raciocínio <small id="exNoteStatus">Salvo neste navegador</small></label><textarea id="exNote" rows="2" maxlength="20000" placeholder="Uma ideia, uma conta ou algo para revisar…"></textarea></div>
   <div class="enem-navigation"><button class="quiet" data-ex="previous" ${index === 0 ? 'disabled' : ''}>← Anterior</button>${map}${nextButton}</div>
  </article>`;
  const note = $('exNote');
  note.value = s.notes[q.id] || '';
  note.oninput = () => {
   clearTimeout(noteTimer);
   $('exNoteStatus').textContent = 'Salvando…';
   noteTimer = setTimeout(() => { const v = note.value; if (v) s.notes[q.id] = v; else delete s.notes[q.id]; adapter.save(); $('exNoteStatus').textContent = 'Salvo neste navegador'; }, 400);
  };
  if (inStage) stageBar();
  if (focus) $('exTitle')?.focus({preventScroll: true});
 }
 // Quem chega de outro lugar cai direto na questão, mesmo depois de a navegação focar o título da página.
 function focusTitle() {
  setTimeout(() => {
   const title = $('exTitle'), box = title?.closest('.ex-question');
   if (!title) return;
   title.focus({preventScroll: true});
   const top = (document.getElementById('exStageBar') || box).getBoundingClientRect().top + window.scrollY - 96;
   window.scrollTo({top: Math.max(0, top), behavior: 'auto'});
  }, 120);
 }
 function refreshScore() {
  const space = currentSpace(), m = metrics(space), sum = trackSummary(space);
  if ($('exAnswered')) $('exAnswered').innerHTML = sum.done + '<small> de ' + sum.total + ' níveis</small>';
  if ($('exAccuracy')) $('exAccuracy').textContent = m.answered + ' respondidos · ' + accuracy(m);
 }
 function choose(letter) {
  const q = list[index];
  if (!q || progress().answers[q.id]?.choice && !retry || LETTERS.indexOf(letter) < 0 || LETTERS.indexOf(letter) >= q.opts.length) return;
  choice = letter; question();
 }
 function confirm() {
  const q = list[index];
  if (!q || !choice) return;
  const s = progress(), a = s.answers[q.id];
  // Quem viu a resolução antes de responder não conta na taxa de acertos.
  s.answers[q.id] = {choice, firstChoice: a?.firstChoice || choice, attempts: (a?.attempts || 0) + 1, viewed: !!a?.viewed, peeked: !!a?.peeked || !!a?.viewed && !a?.choice, date: new Date().toISOString()};
  adapter.save(); choice = null; retry = false; hintOpen = false; question(); refreshScore();
  document.querySelector('.ex-question .enem-feedback')?.scrollIntoView({block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
 }
 function go(n) { if (!list.length) return; index = Math.max(0, Math.min(list.length - 1, n)); choice = null; retry = false; hintOpen = false; question(true); focusTitle(); }
 function startStage(space, stage) {
  if (!stage) return;
  modeBy[space] = 'stage'; stageBy[space] = {subject: stage.subject, topic: stage.topic, lv: stage.lv}; trackBy[space] = stage.subject;
  render();
 }
 function goNextStage() {
  const space = currentSpace(), stage = stageBy[space];
  const next = stage && nextStage(stage.subject, stage);
  if (next) startStage(space, next); else { modeBy[space] = 'trilha'; render(); }
 }
 function handleKey(key) {
  const q = list[index], current = mode(currentSpace());
  if (!q || current === 'trilha' || current === 'outros') return false;
  if (/^[a-e]$/i.test(key) && LETTERS.indexOf(key.toUpperCase()) < q.opts.length) { choose(key.toUpperCase()); return true; }
  if (key === 'Enter') {
   if (choice) confirm();
   else if (progress().answers[q.id]?.choice) { if (index < list.length - 1) go(index + 1); else if (current === 'stage') goNextStage(); }
   return true;
  }
  if (key === 'ArrowRight') { go(index + 1); return true; }
  if (key === 'ArrowLeft') { go(index - 1); return true; }
  return false;
 }
 function click(e) {
  const b = e.target.closest('button[data-ex]');
  if (!b || b.disabled) return;
  const action = b.dataset.ex, q = list[index], space = currentSpace(), f = filters(space);
  if (action === 'mode') { modeBy[space] = b.dataset.mode; render(); $('exRoot').querySelector(`[role="tab"][data-mode="${b.dataset.mode}"]`)?.focus(); return; }
  if (action === 'track') { trackBy[space] = b.dataset.subject; renderTrack(space); return; }
  if (action === 'stage') { startStage(space, {subject: b.dataset.subject, topic: b.dataset.topic, lv: Number(b.dataset.level)}); return; }
  if (action === 'continue') { startStage(space, continueTarget(space)); return; }
  if (action === 'next-stage') { goNextStage(); return; }
  if (action === 'real') { globalThis.FurgEnem?.openSubject(b.dataset.subject); return; }
  if (action === 'redo-wrong') { const s = progress(), at = list.findIndex(x => s.answers[x.id]?.choice && s.answers[x.id].choice !== x.ans); if (at >= 0) { index = at; choice = null; retry = true; hintOpen = false; question(true); focusTitle(); } return; }
  if (action === 'clear') { Object.assign(f, emptyFilters()); modeBy[space] = 'todos'; render(); return; }
  if (action === 'subject') { f.subject = f.subject === b.dataset.subject ? '' : b.dataset.subject; f.topic = ''; $('exTopic').innerHTML = topicOptions(space, f); filter(); return; }
  if (action === 'random') { go(Math.floor(Math.random() * list.length)); return; }
  if (action === 'choose') { choose(b.dataset.letter); return; }
  if (action === 'confirm') { confirm(); return; }
  if (action === 'previous') { go(index - 1); return; }
  if (action === 'next') { go(index + 1); return; }
  if (action === 'jump') { const n = Number(b.dataset.index); if (Number.isInteger(n)) go(n); return; }
  if (!q) return;
  const s = progress();
  if (action === 'hint') { hintOpen = !hintOpen; question(); return; }
  if (action === 'favorite') { if (s.favorites[q.id]) delete s.favorites[q.id]; else s.favorites[q.id] = true; adapter.save(); question(); return; }
  if (action === 'retry') { choice = null; retry = true; hintOpen = false; question(); return; }
  if (action === 'show') { s.answers[q.id] = {...s.answers[q.id], viewed: true}; if (!s.answers[q.id].choice) delete s.answers[q.id].choice; adapter.save(); question(); }
 }

 /* ---------- abrir de outros lugares ---------- */
 function navigate(space) {
  const link = document.createElement('a');
  link.href = '#' + ROUTE[space]; link.dataset.studyRoute = ROUTE[space]; link.hidden = true;
  document.body.append(link); link.click(); link.remove();
 }
 function spaceFor(subject) {
  const now = currentSpace();
  return SCOPE[now]?.includes(subject) || now === 'geral' ? now : SUBJECTS[subject]?.space || 'geral';
 }
 function open(id) {
  const q = build() && byId.get(id);
  if (!q) return false;
  pending = {id};
  navigate(spaceFor(q.s));
  return true;
 }
 function openFilter({subject = '', topic = '', search = ''} = {}) {
  build();
  pending = {filters: {subject, topic, search}};
  navigate(subject ? spaceFor(subject) : currentSpace());
 }
 function count({space = 'geral', subject = '', topic = ''} = {}) {
  return pool(space).filter(q => (!subject || q.s === subject) && (!topic || q.t === topic)).length;
 }
 // Faixa de destaque nos painéis de cada área.
 function hubBanner(space) {
  if (!adapter) return '';
  const items = pool(space);
  if (!items.length) return '';
  const path = ROUTE[space] || ROUTE.geral, subjects = subjectsOf(space).filter(id => items.some(q => q.s === id));
  const next = continueTarget(space), sum = trackSummary(space);
  return `<section class="ex-hub" aria-label="Exercícios do básico ao avançado"><a class="ex-hub-main" ${route(path)}><span class="ex-hub-icon" aria-hidden="true">✓</span><span class="ex-hub-copy"><small>EXERCÍCIOS · DO BÁSICO AO AVANÇADO</small><strong>${items.length.toLocaleString('pt-BR')} exercícios em ${sum.total} níveis</strong><em>${next ? (sum.done ? 'Continua em ' : 'Começa por ') + esc(next.topic) + ' · ' + LEVELS[next.lv] + '. ' : ''}Pista e resolução passo a passo em cada um.</em></span><b class="ex-hub-go">Abrir exercícios →</b></a>${subjects.length > 1 ? `<div class="ex-hub-subjects">${subjects.map(id => { const st = stagesOf(id); return `<a ${route(path)} data-ex-track="${id}"><span aria-hidden="true">${SUBJECTS[id].icon}</span>${SUBJECTS[id].label}<small>${st.filter(x => x.status === 'done').length}/${st.length}</small></a>`; }).join('')}</div>` : ''}</section>`;
 }
 // Itens para a busca universal.
 function searchRows() {
  return build().map(q => ({id: q.id, title: q.title, detail: String(q.stem).slice(0, 120) + (q.stem.length > 120 ? '…' : ''),
   crumb: 'Exercícios › ' + SUBJECTS[q.s].label + ' › ' + q.t + ' · ' + LEVELS[q.lv], path: ROUTE[SUBJECTS[q.s].space], extra: [q.t, q.ctx, q.stem].join(' ')}));
 }
 const topicForCard = card => CARD_TOPIC[card] || (globalThis.FURG_DIA2_GUIDE?.entries || []).find(e => e.id === card)?.title || '';
 // Atalho no fim das aulas: treina o mesmo assunto, começando pelo primeiro nível que falta.
 function lessonLink(subject, card, lessonId) {
  if (!SUBJECTS[subject] || !adapter) return '';
  const raw = LESSON_TOPIC[lessonId] || topicForCard(card), topic = TOPIC_ALIAS[raw] || raw;
  const total = topic ? count({space: 'dia-2', subject, topic}) : 0;
  if (!total) return '';
  return `<a class="ex-lesson-link" ${route(ROUTE['dia-2'])} data-ex-subject="${subject}" data-ex-topic="${esc(topic)}"><span><strong>Treinar ${esc(topic)} do básico ao avançado</strong><small>${total} ${total === 1 ? 'exercício' : 'exercícios'} com pista e resolução passo a passo</small></span><b>Treinar →</b></a>`;
 }

 function init(value) {
  adapter = value;
  adapter.getState().exercicios = validate(adapter.getState().exercicios);
  if (bound || !$('exRoot')) return;
  bound = true;
  $('exRoot').addEventListener('click', click);
  // Atalhos (painéis e aulas): guarda o destino antes de a navegação acontecer.
  document.addEventListener('click', e => {
   const link = e.target.closest('[data-ex-track],[data-ex-subject],[data-ex-topic]');
   if (!link) return;
   if (link.dataset.exTrack) { pending = {track: link.dataset.exTrack}; return; }
   const subject = link.dataset.exSubject || '', topic = link.dataset.exTopic || '';
   if (subject && topic) { const st = topicsOf(subject).find(t => t.topic === topic); const lv = st?.levels.find(x => x.status !== 'done') || st?.levels[0]; if (lv) { pending = {stage: lv}; return; } }
   pending = subject ? {track: subject} : null;
  }, true);
 }
 globalThis.FurgExercicios = {init, render, refresh: render, validate, metrics, handleKey, open, openFilter, count, hubBanner, searchRows, lessonLink, topicForCard,
  items: () => build(), subjects: SUBJECTS, stages: stagesOf, fresh};
})();
