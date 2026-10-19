# Origem do acervo ENEM regular 2009–2025

- Fonte primária das provas e dos gabaritos: Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira (Inep), [Provas e gabaritos do Enem](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos).
- Transcrição digital de partida: [isvani/simulador-enem](https://github.com/isvani/simulador-enem), commit `096a98fccd45712e81204fe66113b5e47eb430bf`, arquivo `dados/banco_questoes.json`, obtido em 19/10/2026. Foram selecionados exclusivamente os 3.127 registros com `source: "enem"`. Os 810 registros da Fuvest não integram este pacote.
- O repositório de origem informa que as imagens de edições anteriores foram adquiridas do [enem.dev](https://enem.dev/) e que a extração das edições 2024 e 2025 partiu dos PDFs oficiais do Inep.

Os enunciados e as alternativas foram conservados como na transcrição de partida. A normalização altera apenas a estrutura de dados, nove identificadores de língua estrangeira e os caminhos locais das figuras. As figuras pertencem às provas e conservam suas citações e créditos de origem quando presentes; este documento não atribui nova licença a textos ou imagens de terceiros.

`questions.json` contém a aquisição inicial; `gap-manifest.json` identifica lacunas e registros que precisam de conferência nos cadernos oficiais. Questões incompletas estão sinalizadas por `quality.blocked`; as respostas de partida ainda precisam ser confrontadas com os gabaritos oficiais. A aplicação não deve tratar essa aquisição inicial como revisão concluída.

Há 1.981 arquivos de figuras reais, com 95.710.884 bytes. O marcador `broken-image.svg` foi descartado. O resultado esperado após a restauração das 13 questões ausentes é 3.140 registros: 180 questões em 2009 e 185 em cada ano de 2010 a 2025, contando as duas opções de idioma como registros próprios.

## Restauração por cadernos oficiais

`context-patches.json` contém 57 alterações para mesclar sobre os registros normalizados:

- 47 contextos que estavam ausentes foram transcritos dos cadernos, preservando os comandos e as alternativas existentes. Os números e símbolos perdidos pela extração de fontes foram conferidos na renderização das questões relevantes.
- 10 registros que continham apenas imagens receberam texto selecionável: quatro introduções omitidas (2011/63; 2016/55, 66 e 77) e seis textos verbais contidos nas imagens (2009/96, 97, 126 e 127; 2012/95 inglês; 2021/85). As imagens originais foram preservadas.
- Os outros dez contextos exclusivamente visuais são cartuns, fotografias, gráficos ou diagramas. Permanecem como figuras, com seus comandos em texto. Não foi inventada uma descrição que substituísse a informação visual.

Cada patch informa a página e o caminho do caderno de consulta em `source.pdf` e `source.page`, referindo-se aos nomes `enem/pdfs/{ano}_PV_D{dia}_AZUL.pdf`. A aquisição dos PDFs e o confronto com gabaritos são mantidos separadamente em `enem-work/keys/`.

`format-patches.json` corrige um fechamento excedente de Markdown na figura de 2010/168. Também foi identificado um defeito adicional na fonte: 2023/132 tem as alternativas A–D vazias e precisa de restauração pelo PDF. Essa ocorrência foi encaminhada ao processo separado de correção de alternativas e gabaritos.

As pastas `context-extracts/` e o arquivo `context-locations.json` são exclusivamente de conferência interna. Algumas provas obtidas de espelhos institucionais têm alternativas circuladas; esses recortes de auditoria não devem integrar a interface nem substituir as 1.981 figuras locais de uso.
