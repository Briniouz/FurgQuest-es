# Formatação dos enunciados do ENEM

O ajuste **Configurações → Conforto → Enunciado compacto (ENEM)** é opcional e começa desligado. Reduz fonte, entrelinhas, espaçamento entre parágrafos e preenchimento dos blocos de texto de apoio e comando. A tipografia da fonte bibliográfica, as imagens, as alternativas e a resolução mantêm seus estilos. A preferência acompanha a exportação/importação do progresso; backups antigos recebem o padrão sem apagar os registros existentes.

## Preservação do acervo

`enem-data.json` e `enem-data.js` permanecem inalterados. As correções são uma camada de apresentação em `enem-layout.js` e `enem-presentation-data.js`. A separação bibliográfica exige sinais de uma publicação; um ano, um nome próprio ou um século isolado no texto de apoio não bastam. Datas dentro de títulos não encerram a referência antes da data de publicação.

Comandos que começam com nomes próprios, como o de Eliseu Visconti na questão 25 de 2024, ficam separados da referência após a data completa de acesso. Siglas e números romanos de séculos ou itens também não iniciam uma referência sem a assinatura bibliográfica correspondente.

A camada de imagens repõe 21 figuras em 20 questões de 2024/2025 a partir dos cadernos azuis do primeiro dia já presentes no repositório. Cada figura registra a página (contagem iniciando em 1), o retângulo em pontos do PDF, os hashes SHA-256 do PDF e da imagem, um texto alternativo e uma âncora de inserção. Os recortes foram conferidos visualmente nas páginas originais. São WebP sem perdas; só a imagem da questão exibida é solicitada, sem carregar todas as figuras junto do banco.

Nas questões `enem-2002-5` e `enem-2002-8`, o campo importado de contexto contém duas alternativas de outro item da mesma página. A apresentação oculta somente esses trechos exatos, conferidos nas páginas 4 e 5 do caderno amarelo de 2002. O enunciado próprio e as cinco alternativas próprias continuam disponíveis. A transcrição bruta é preservada integralmente.

Toda correção individual exige uma impressão digital da transcrição e das alternativas; se o acervo mudar, a correção deixa de ser aplicada até nova conferência. Não há alterações de gabarito nesta atualização.

## Verificação

`node scripts/check-enem-presentation.cjs` verifica a preservação integral das 3.833 questões, a existência e a procedência dos recortes, a aplicação condicionada das correções e exemplos reais de separação bibliográfica. Os testes de Configurações e do site cobrem persistência, exportação/importação, backups antigos e falha de armazenamento. A conferência visual compara o modo atual e o compacto na questão 9 de 2024, além de imagens restauradas, tema escuro e tela móvel.
