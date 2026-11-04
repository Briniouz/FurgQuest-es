# Menu agrupado e Level Up

O menu principal usa quatro grupos expansíveis — Provas, Simulados, Prática e Estudos — e um acesso direto a Meu desempenho. As rotas `#banco`, `#enem`, `#fuvest`, `#simulados`, `#evolucao` e as demais continuam funcionando. O submenu fecha com clique fora, Escape ou escolha de destino; as setas navegam pelas opções e Escape devolve o foco ao botão do grupo. Os painéis ficam fora do contêiner com rolagem para permanecerem acessíveis em telas pequenas.

Prática inclui Level Up, Lock in e acesso direto ao aquecimento do dia 1. Simulados leva ao ENEM por ano e ao construtor FURG existentes. Navegar conserva simulados, respostas e progresso; não cria outra tentativa.

## Banco do Level Up

`levelup-data.json` é o banco canônico de 240 questões autorais: 20 etapas com 12 itens cada. As 30 questões antigas mantêm enunciado, alternativas, chave e IDs. `tests/fixtures/levelup-v1.json` congela essa compatibilidade. Os novos conteúdos incluem sequências, estatística, probabilidade, contagem, sólidos, trigonometria, logaritmos, matrizes e integração de modelos.

Após editar o JSON, execute `python scripts/build-levelup-data.py` para validar e gerar `levelup-data.js`. `levelup-verification.json` registra as conferências matemáticas dos 210 itens novos. A dificuldade é didática, sem atribuição de origem ou classificação oficial de vestibulares.

## Rodadas e conquistas

Cada rodada tem 3 IDs. A primeira rodada conserva os 3 primeiros itens da etapa; as seguintes sorteiam questões ainda não usadas no ciclo. Um banco de 12 itens permite 4 rodadas sem repetição. Ao esgotar o ciclo, começa outro, evitando os 3 itens da rodada imediatamente anterior. O estado armazena a ordem sorteada, o ciclo e as respostas da rodada.

Três questões diferentes resolvidas abrem o próximo nível. Uma questão conquistada rende 10 XP uma única vez e cada nível conquistado, 20 XP. Resolver novamente um item não duplica os pontos; errar numa revisão não remove sua conquista. Dominar o banco inteiro soma 2.800 XP. Concluir os 20 níveis não exige resolver os 240 itens: a interface mostra separadamente níveis conquistados e cobertura do banco.

“Trocar rodada” cria um novo trio na etapa atual. “Repetir percurso” troca as rodadas dos níveis já abertos e volta ao primeiro nível. Ambos preservam respostas históricas, desbloqueios e XP. As respostas ainda não conferidas da rodada anterior são substituídas; as tentativas registradas permanecem no histórico de domínio.

`state.levelup.version = 2` mantém `answers` e `lastQuestion`, acrescentando `rounds`. `answers.choice` conserva uma escolha correta após a primeira conquista; as respostas de uma revisão ficam em `rounds[stageId].responses`. `firstChoice` guarda a primeira escolha histórica e cada resposta da rodada guarda sua própria primeira tentativa. Contadores e desbloqueios são derivados de respostas válidas, não de campos de XP recebidos.

Backups v1 são migrados sem relocar ou exigir os 9 itens novos de cada etapa antiga. Uma jornada antiga completa continua com 10 níveis e 500 XP e abre o nível 11. Exportação/importação preserva trios e respostas; importações antigas sem Level Up mantêm o progresso atual. Combinar o mesmo backup duas vezes não soma tentativas ou XP. Falhas ao salvar restauram o estado anterior.

Verificações integradas: `node scripts/check-site.cjs`, incluindo migração, desbloqueios, sorteios, repetição sem ganho duplicado, exportação/importação, teclado e navegação agrupada.
