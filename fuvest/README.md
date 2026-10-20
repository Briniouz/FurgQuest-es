# Fuvest — primeira fase objetiva, 2010–2026

São 1.530 questões únicas: 90 por ano, caderno V (2010–2024) e V1 (2025–2026). Não há segunda fase nem duplicação de cadernos reordenados.

- `sources.json`: endereços oficiais, nomes dos arquivos, tamanhos e SHA-256 dos 34 PDFs.
- `pdfs/`: provas originais e gabaritos oficiais, incluindo as retificações disponíveis.
- `images/`: originais das questões com textos de apoio, fórmulas, figuras e alternativas. Textos compartilhados são associados a todos os itens indicados. A diagramação em largura total recebe recortes próprios; seis itens de layout ambíguo preservam a página inteira, com aviso do número a resolver.
- `provenance/official-keys.json`: 1.530 gabaritos oficiais, com três anuladas: 2016/43, 2022/54 e 2026/3.
- `provenance/key-audit.json`: extração e conferência dos gabaritos. Em 2024/48 prevalece **E**, conforme retificação oficial, sobre o D desatualizado do banco secundário.
- `provenance/companion-text.json`: transcrição complementar de 810 questões, do commit `096a98fccd45712e81204fe66113b5e47eb430bf` de [isvani/simulador-enem](https://github.com/isvani/simulador-enem). Usada apenas para texto, nunca como autoridade de gabarito.
- `provenance/ocr-2021/`: texto e coordenadas de OCR do PDF de 2021, cujo corpo usa fonte Type3 sem texto Unicode aproveitável. O original é a referência para notação e layout.
- `provenance/2010.json` a `2026.json`: recortes, páginas e grupos de textos de apoio.

O site mostra o original com figuras e oferece **Texto selecionável** como leitura complementar. Fórmulas e alternativas gráficas devem ser conferidas no original. Os PDFs e recortes acompanham o site; não dependem de hotlinks de terceiros.

Para reproduzir a importação (Python com PyMuPDF 1.26.6 e Pillow 12.3.0):

```sh
python scripts/fetch-fuvest-manifest.py
python scripts/build-fuvest.py
python scripts/restore-enem-contexts.py
node scripts/check-site.cjs
```

O manifesto é fixo: o download falha se o conteúdo oficial divergir do arquivo revisado. O banco ENEM conserva seus 3.833 IDs, alternativas e gabaritos; 124 itens receberam restauração de contexto/comando ou ajuste da ordem de leitura nesta atualização.


## Leitura em texto e matérias

A atualização de estudo acrescenta `provenance/subjects.json`, com classificação didática por matéria e associações de itens interdisciplinares. Português e Literatura ficam na mesma opção. As cores e versões do caderno continuam sem duplicação.

`prepare-fuvest-study.py` prepara a leitura em texto de forma conservadora: exige cinco alternativas preenchidas e caracteres legíveis, procura dependência de imagens e marcas tipográficas e compara o vocabulário com o PDF para evitar a exibição de passagens incompletas. Não trata essas verificações como revisão humana integral. Fórmulas e diagramas conservam o original. A decisão e o motivo ficam em `provenance/text-presentation.json`. Todo item conserva o original acessível. O filtro Leitura permite encontrar as questões em texto.

Depois de executar `build-fuvest.py`, a preparação de estudo é chamada automaticamente. Os IDs, as alternativas corretas e os gabaritos oficiais não são reclassificados por essa preparação.
