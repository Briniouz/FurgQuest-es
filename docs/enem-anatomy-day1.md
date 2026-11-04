# Anatomia do ENEM e aquecimento do dia 1

## Anatomia

`#anatomia` analisa o ENEM regular 2021–2025. São 925 registros com as duas línguas estrangeiras; a interface seleciona uma delas, resultando em 900 questões, 180 por edição e 45 por área/ano. As cores de caderno não geram duplicatas.

`enem-anatomy-data.json` é o índice didático canônico, com um assunto principal, um padrão principal, confiança e paráfrase de comando por ID estável do banco. As classificações são assistidas e podem admitir enquadramentos alternativos em questões interdisciplinares. Não são estatísticas oficiais nem previsões da próxima prova. Os rankings são calculados a partir dos registros, com denominador explícito e filtros por área, matéria, ano e idioma. Incluem anuladas na série histórica; o treino exclui itens sem condições de correção.

`FurgEnem.practice(ids,label,firstId)` abre um grupo temporário, limpa filtros anteriores e preserva respostas, favoritas e anotações. Voltar à Anatomia mantém a seleção. “Sair do grupo” retorna ao acervo geral. Classificações pessoais no banco não alteram o índice histórico.

Após editar o índice com base na leitura dos originais, execute `python scripts/build-enem-anatomy.py`. O gerador confere IDs, áreas, tópicos, idiomas, cobertura e SHA-256 do banco. Mudanças de corpus exigem revisão antes de atualizar o hash. A fonte conceitual é a [matriz do Inep](https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem/).

## Lock in — dia 1

O acesso fica dentro de Lock in, em “Praticar o dia 1”. São 72 questões autorais de aquecimento em Linguagens, Humanas e Redação: 24 alternativas, 24 lacunas e 24 associações. Níveis Fácil/Médio são didáticos, sem calibração TRI. As referências de imagens enviadas orientam apenas os formatos; o conteúdo foi redigido para este projeto.

`day1-practice-data.json` contém o conteúdo e `day1-practice-data.js` a versão de navegador. Mantenha os dois equivalentes. Cada associação tem 3 ou 4 pares; a coluna direita é embaralhada deterministicamente por ID e nunca apresentada na ordem idêntica do gabarito. É possível tocar, usar teclado, trocar relações e preencher novamente. “Não sei ainda” revela uma explicação sem registrar acerto.

Os blocos têm 5, 10 ou 15 itens, filtros por área e formato, pausa, continuação, guardadas e revisão de erros. Questões não vistas, erros e guardadas têm prioridade. São exercícios originais curtos, independentes da pontuação dos bancos ENEM/FURG/Fuvest.

O estado está em `state.lightReview.practice`: preferências, respostas, primeira/última tentativa, favoritas e sessão com rascunhos das relações/alternativas. É validado, exportado e importado junto do progresso. Importações antigas preservam esse estado. Falhas de armazenamento restauram o registro anterior. O acerto é recalculado a partir das respostas, inclusive ao importar; não se confia em um booleano de acerto recebido. A leitura opcional usa SpeechSynthesis e para ao navegar, pausar, abrir cartas ou sair da tela.

Verificação integrada: `node scripts/check-site.cjs`.
