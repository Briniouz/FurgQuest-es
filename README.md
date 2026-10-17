# FURG Questões

Site de estudo: https://briniouz.github.io/FurgQuest-es/

Banco com 2.091 questões históricas de 2000–2010, provas e gabaritos em PDF, texto selecionável, simulados, favoritos, anotações e progresso no navegador. A área Leituras contém seis resumos e 60 exercícios autorais comentados.

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

Os pré-requisitos são uma organização didática independente, com consulta ao [programa oficial de 2027](https://coperse.furg.br/images/2026/Vestibular-2026/ProgramaProva.pdf), em 16/10/2026. Outras cônicas estão identificadas como conteúdo do acervo histórico, sem indicação explícita no programa atual. A frequência dos temas nas provas antigas não prevê a próxima prova.

## Marca e autoria

A marca própria está em `brand-mark.svg`: um livro, uma seta e arcos circulares, usados também no favicon. O botão de perfil **D**, no cabeçalho, abre a opção **Instagram**, com link para [@briniouz](https://www.instagram.com/briniouz/). O balão mostra o nome Daniel Brinio; o rodapé mantém apenas o link social. Os PDFs do acervo continuam com sua atribuição original.

## Verificação

Sem dependências de frontend. Para conferir caminhos de arquivos, inicialização, filtros, navegação, importação, respostas e trilhas:

```sh
node scripts/check-site.cjs
```

O teste usa um modelo de DOM para validar os fluxos JavaScript. Ele não substitui a conferência visual no navegador. A publicação e os links públicos de amostra também são conferidos no GitHub Pages. Os 2.170 recortes legados de páginas não foram enviados originalmente ao repositório; todas as 2.091 questões usam transcrições, com suas figuras e PDFs originais restaurados.
