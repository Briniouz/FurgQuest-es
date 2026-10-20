# FURG Questões

Site publicado: https://briniouz.github.io/FurgQuest-es/

O site inclui o **acervo completo do ENEM regular de 1998 a 2025**, com 3.833 itens, e simulados anuais de 2010 a 2025. O arquivo de prévia para download usa uma amostra; o banco publicado usa todas as questões.

Banco com 2.091 questões históricas de 2000–2010, provas e gabaritos em PDF, texto selecionável, simulados, favoritos, anotações e progresso no navegador. A área Leituras contém seis resumos ampliados, trechos originais comentados e 60 exercícios autorais. As trilhas incluem 595 flashcards básicos.

## Como atualizar sem enviar lotes de 100 arquivos

Use o [GitHub Desktop](https://desktop.github.com/). A instalação e a clonagem são feitas uma vez:

1. Entre no aplicativo com a conta Briniouz.
2. Abra **File → Clone repository → URL** e informe `https://github.com/Briniouz/FurgQuest-es`.
3. Escolha uma pasta no PC e clique em **Clone**.
4. Em **Repository → Show in Explorer**, abra a cópia local do site.

Nas próximas atualizações:

1. Clique em **Fetch origin** e, se aparecer, **Pull origin** antes de editar, para trazer mudanças feitas por aqui ou em outro computador.
2. Edite ou substitua os arquivos dentro da pasta clonada. Se receber um ZIP, extraia o conteúdo primeiro, preservando as subpastas. `index.html` deve continuar na raiz da cópia.
3. Volte ao Desktop, confira **Changes**, escreva uma descrição em **Summary** e clique em **Commit to main**.
4. Clique em **Push origin**. O aplicativo envia as alterações do conjunto, sem o limite de seleção de 100 arquivos da tela de upload.
5. Aguarde **Actions → pages build and deployment** terminar. Atualize a página do site; se ainda mostrar a versão anterior, use **Ctrl+F5**.

O Git registra as diferenças. Não é necessário reenviar o site inteiro a cada atualização. Mudanças também podem ser feitas pelo conector GitHub deste chat quando autorizadas; mantenha a cópia do PC atualizada com Pull antes de editá-la.

Documentação: [clonar repositórios](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop), [enviar alterações](https://docs.github.com/en/desktop/making-changes-in-a-branch/pushing-changes-to-github-from-github-desktop).

## Pastas que o site usa

- `pdfs/`: 166 provas, gabaritos e documentos do acervo. Os links do banco apontam para esta pasta.
- `figures/`: 261 gráficos, mapas, ilustrações e figuras necessárias às transcrições.
- `transcricoes/`: arquivos TXT por disciplina.
- Os arquivos HTML, CSS, JS e JSON ficam na raiz. Os ZIPs antigos enviados ao repositório não são extraídos pelo GitHub Pages; as pastas já restauradas são as utilizadas pelo site.

Os arquivos que já estavam na raiz foram preservados para não quebrar links externos. Não arraste os PDFs ou figuras para fora das pastas usadas pelo banco.

## Habilidades e trilhas de Matemática, Física e Química

As 570 questões destas disciplinas (180 de Matemática, 195 de Física e 195 de Química) têm a seção **O que preciso saber?**, com assunto, duas a quatro habilidades específicas e links para a sequência de estudo. O filtro **Assunto** aparece em **Mais filtros** e acompanha a disciplina escolhida. Na aba **Trilhas**, alterne entre as três disciplinas e os 119 assuntos (49 de Matemática, 39 de Física e 31 de Química), consulte as bases, marque uma revisão e use **Praticar este assunto**. As sequências também ligam as ciências às bases de Matemática, sem duplicar o progresso. A classificação considera os textos de apoio disponíveis; as transcrições parciais antigas permanecem sinalizadas.

O conteúdo editável é `skills-data.js`: `skills` contém objetivos, pré-requisitos e critérios de revisão; `questions` associa IDs existentes aos tópicos e habilidades. A lógica está em `skills.js` e a apresentação em `skills.css`. As marcações de revisão integram a exportação e importação do progresso. IDs antigos e a chave `furg-questoes-progress-v1` foram preservados.

Cada um dos 119 assuntos oferece o botão **5 flashcards**, com uma pergunta inicial por cartão, resposta oculta, seleção de cartão, anterior, próximo e recomeço. As setas do teclado navegam e Esc fecha, devolvendo o foco ao botão de origem. Consultar um flashcard não marca um assunto como revisado. `flashcards-data.js` associa os mesmos IDs a cinco pares `question`/`answer`; `flashcards.js` controla a interação e `study.css` define a apresentação nos dois temas.

Os pré-requisitos são uma organização didática independente, com consulta ao [programa oficial de 2027](https://coperse.furg.br/images/2026/Vestibular-2026/ProgramaProva.pdf), em 16/10/2026. Outras cônicas estão identificadas como conteúdo do acervo histórico, sem indicação explícita no programa atual. A frequência dos temas nas provas antigas não prevê a próxima prova.

## Resumos e textos literários

Em **Leituras → Resumo**, cada obra tem seis seções adicionais em **Leitura em camadas**, com estrutura, vozes, linguagem, situações concretas e orientações de interpretação. É possível expandir ou recolher todas. A aba **Texto original** apresenta um fragmento curto por obra com contexto, comentário próprio e fonte, além de opções de leitura com o tipo de acesso indicado.

`Papéis avulsos` tem links para o texto integral em domínio público e para a edição de 1882 da Biblioteca Brasiliana/USP. Nas outras obras, os links apontam para manuscritos, amostras de editoras, seleções ou estudos que citam os textos. Uma página gratuita não é apresentada como permissão para republicar uma obra protegida. Não foram incluídas cópias integrais sem autorização.

O conteúdo está em `readings-data.js`: os campos `summary`, `sections`, `excerpts`, `readingLinks` e `sources` alimentam as abas, sem alterar os IDs dos 60 exercícios existentes. A lógica permanece em `readings.js`; os avanços e respostas continuam no mesmo arquivo de exportação do progresso.

## Marca e autoria

A marca própria está em `brand-mark.svg`: um livro, uma seta e arcos circulares, usados também no favicon. O perfil no cabeçalho permite salvar um nome e uma foto opcional no navegador. A foto é recortada ao centro e reduzida para 256×256 antes de ser salva. O rodapé mantém o link do projeto para [@briniouz](https://www.instagram.com/briniouz/). Os PDFs do acervo continuam com sua atribuição original.

## Perfil e cópia do progresso

Abra o avatar → **Editar perfil** para alterar nome ou foto. São aceitos JPG, PNG e WebP de até 10 MB; a versão reduzida do avatar é incluída no JSON exportado junto ao progresso. **Cancelar** descarta as alterações do formulário.

O nome e a foto ficam no mesmo armazenamento local do progresso, sem cadastro nem envio da imagem a um servidor. Ao importar um arquivo com perfil, ele substitui o nome e a foto atuais e combina os registros de estudo. Arquivos antigos sem perfil preservam o perfil atual. Arquivos exportados antes desta versão continuam compatíveis. A lógica do perfil está em `profile.js`.

## Verificação

Sem dependências de frontend. Para conferir caminhos de arquivos, inicialização, filtros, navegação, importação, respostas, trilhas, os 595 cartões e as seis leituras:

```sh
node scripts/check-site.cjs
```

O teste usa um modelo de DOM para validar os fluxos JavaScript. Ele não substitui a conferência visual no navegador. A publicação e os links públicos de amostra também são conferidos no GitHub Pages. Os 2.170 recortes legados de páginas não foram enviados originalmente ao repositório; todas as 2.091 questões usam transcrições, com suas figuras e PDFs originais restaurados.

## Seção ENEM · prévia de 19/10/2026

Abra `index.html` e escolha **ENEM**. O pacote contém as provas regulares de 1998–2025, com enunciados e alternativas selecionáveis, figuras locais e os PDFs de prova e gabarito. Inglês e espanhol são duas escolhas de idioma do mesmo exame: de 2010 em diante há 185 itens por ano no banco, embora o participante responda a 180. Cadernos de cores diferentes não repetem questões no banco.

A cobertura exata fica em **Cobertura e fontes do acervo**, no fim da seção, e em `enem/coverage.json`. Reaplicações/PPL, versões digitais e aplicações específicas ainda não integram esta prévia. Questões anuladas permanecem disponíveis para estudo e não entram na taxa de acertos. A conferência dos gabaritos corrige divergências da transcrição base; consulte `enem/provenance/keys-answer-corrections.json`.

É possível buscar no texto, escolher ano e área, alternar o idioma, sortear questões, favoritar, anotar o raciocínio e refazer questões. A taxa de acertos usa a primeira tentativa e não representa a TRI. As respostas, os favoritos e as anotações do ENEM acompanham o JSON de progresso e são combinados na importação. Arquivos antigos continuam aceitos.

`enem-data.js` carrega o banco sem depender de um servidor; `enem-data.json` oferece o mesmo conteúdo estruturado. `enem.js` contém a interação e `enem.css` acompanha os temas claro e escuro. `ENEM-Todas-Questoes.txt` exporta o acervo para leitura. Fontes, espelhos e hashes dos PDFs ficam em `enem/sources.json`. Recortes originais podem ser abertos em cada questão para comparação.

`Previa-ENEM.html`, entregue junto do ZIP, é uma amostra interativa em um único arquivo. Ela inclui as próprias imagens e usa uma chave separada de progresso, para proteger o treino do banco completo. Seus links de PDF abrem os originais online.

A verificação pode ser aplicada também à amostra:

```sh
node scripts/check-site.cjs /caminho/Previa-ENEM.html
```

O teste executa os scripts do próprio HTML e verifica respostas, filtros, imagens embutidas e preservação dos fluxos existentes. Não houve conferência visual desta versão em um navegador automatizado.

## Simulados anuais do ENEM · 2010–2025

Em **Simulados**, escolha o ano, o primeiro dia, o segundo dia ou a objetiva completa. Cada dia tem 90 itens; a prova completa tem 180, usando apenas o idioma escolhido. Os itens seguem a ordem do caderno azul. A divisão das áreas acompanha a edição: até 2016, Humanas e Natureza no primeiro dia e Linguagens/Matemática no segundo; de 2017 em diante, Linguagens/Humanas no primeiro e Natureza/Matemática no segundo.

O tempo sugerido acompanha a capa dos cadernos originais: 270/330 minutos em 2010–2016, 330/270 em 2017 e 330/300 de 2018 em diante. É possível ajustar o tempo de treino. A objetiva completa soma as duas durações em uma sessão; o exame real ocorre em dias separados. O tempo do dia com redação inclui essa atividade. A proposta pode ser consultada no PDF, mas o site não corrige redações.

As respostas e marcações para revisão são salvas imediatamente. O cronômetro continua ao trocar de aba ou fechar o navegador, até ser pausado explicitamente. A prova pode ser retomada, inclusive por exportação/importação do progresso. Ao esgotar o tempo, ela é encerrada e corrigida. Finalizar manualmente exige confirmar, mostrando quantos itens estão em branco.

O resultado informa acertos, erros, itens em branco e anulados por área, sem estimar TRI. Os gabaritos são revelados somente no resultado, com revisão de todos os itens ou apenas erros e questões em branco. As respostas finalizadas também entram no progresso do ENEM, preservando a primeira tentativa já registrada. O histórico fica na seção de simulados e acompanha o backup.

`enem-sim.js` e `enem-sim.css` implementam o recurso. A amostra `Previa-ENEM.html` inclui 2025 inteiro para testar as duas línguas e os dois dias; o pacote completo oferece todos os 16 anos. O simulado personalizado da FURG continua disponível. As mudanças integram a versão publicada do site.

## Level Up · protótipo de matemática

A aba **Level Up** (`#evolucao`) tem 30 questões autorais em 10 níveis. Começa com uma soma extremamente simples e avança por operações, frações, proporção, porcentagem, equações, geometria, potências/logaritmos, funções e desafios de integração. A classificação é pedagógica, sem equivalência oficial com provas.

Cada questão oferece dica e explicação. Resolver as três questões da etapa libera a seguinte. O XP é calculado pelas conquistas únicas (10 por questão e 20 por etapa, até 500), sem duplicar em revisões. O progresso fica no navegador e acompanha o JSON de exportação/importação existente. Arquivos antigos continuam compatíveis.

Fuvest, EsPCEx, ITA e IME são etapas futuras; nenhuma questão dessas provas foi importada para o protótipo.

As 49 trilhas de Matemática incluem explicação breve e exemplo autoral resolvido em três passos, com resultado e tabelas para matrizes. O exemplo fica aberto inicialmente e pode ser recolhido.
