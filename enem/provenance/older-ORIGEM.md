# ENEM 1998–2008 — origem e cobertura

- **693 questões regulares**, 63 por ano, de 1998 a 2008.
- **3.465 alternativas e 693 gabaritos**; todos os itens possuem cinco alternativas, texto selecionável e imagem de alternativa quando ela é gráfica.
- **22 PDFs originais**: 11 provas amarelas e 11 gabaritos. A cor foi usada como versão canônica; as demais cores não duplicam o banco.
- Fontes do INEP preservadas no [acervo do IF-USP](https://fep.if.usp.br/~profis/arquivo/avaliacao/enem/provas_gabaritos/). As URLs individuais constam em `filenames.json` e em `source.url` dos itens.
- **528 referências de figuras de apoio/enunciado e 115 referências de figuras nas alternativas**, além dos recortes originais para conferência. `assets-manifest.json` lista somente os arquivos efetivamente utilizados.

## Extração e revisão

Texto extraído da camada nativa dos PDFs com PyMuPDF; não foi usada transcrição descritiva de um modelo generativo. Segmentação por posição central das linhas e marcadores de questão/alternativa, com tratamento de colunas e textos compartilhados.

Foram removidos enunciados de redação, instruções e rodapés que contaminavam o texto. Os textos de apoio foram vinculados às questões que os utilizam. Figuras rasterizadas e diagramas vetoriais foram recortados do PDF. A recuperação das alternativas gráficas de 2002/20, 2002/22 e 2006/10 foi conferida visualmente. Foram corrigidos expoentes de 1999/35 e alternativas numéricas com resíduos de rodapé de 1999/2, 2005/46, 2005/49 e 2007/34.

`validate.py` verifica 693 IDs únicos, 63 itens por ano, cinco opções A–E por questão, gabaritos A–E, existência de todos os arquivos e ausência de caracteres de controle/trechos de redação. Os recortes originais preservam a disposição das fórmulas, tabelas e figuras para conferência; validação automática e amostragem visual não equivalem a revisão manual linha por linha de todas as fórmulas.

## Limite desta entrega

Este conjunto contém somente as aplicações **regulares de 1998–2008**. PPL, reaplicações, segunda/terceira aplicações, ENEM Digital, Libras e aplicação de Belém não foram adquiridos por esta extração e não devem ser anunciados como incluídos. Nenhuma alteração foi publicada no GitHub.
