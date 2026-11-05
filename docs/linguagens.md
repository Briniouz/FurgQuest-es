# BriniouzStudy · Linguagens

A revisão reúne 32 guias autorais em seis áreas: leitura e argumentação, língua em uso, literatura, artes e cultura, corpo e mídia e línguas estrangeiras. Inclui o essencial de cada assunto, estratégia de leitura, cuidado com alternativas, um exemplo criado para estudo e links para questões reais. O roteiro de 60 minutos é uma sugestão de organização, com escolha de inglês **ou** espanhol no último bloco; não é uma promessa de cobertura completa ou previsão da prova.

São 34 questões distintas selecionadas entre as 844 classificadas como Linguagens no acervo. Os vínculos por assunto e as leituras relacionadas são didáticos: não provam citação de uma personalidade e não medem frequência oficial. As menções nominais, obras e sugestões conceituais continuam separadas na biblioteca geral. Assinaturas bibliográficas com iniciais adicionais são tratadas conservadoramente para evitar atribuições a homônimos; o índice registra 545 vínculos nominais, 14 por obra e 17 sugestões, envolvendo 493 questões distintas.

Foram acrescentados 16 perfis, chegando a 224. Todos os campos de conteúdo dos 208 anteriores foram preservados; as sugestões automáticas de perfis relacionados podem incluir os novos. Os perfis novos trazem referências de instituições, pesquisadores, artistas ou editoras responsáveis pelas obras. Nenhum material do Ferretto foi acessado ou copiado.

Há 32 comentários novos de Linguagens, somando 66 resoluções autorais no projeto. São vinculados ao gabarito esperado e aparecem após resposta ou consulta ao gabarito, conforme o fluxo existente. Os guias não duplicam nem alteram textos, alternativas, imagens ou respostas oficiais. Os itens sem comentário continuam identificados como tal.

## Marca e versões web/aplicativo

O nome de apresentação é **BriniouzStudy**, com um B em grafite. O ícone foi criado para o projeto, em fundo transparente; `briniouz-mark.png` e `briniouz-icon.ico` são as versões de uso na interface e no Windows. O repositório e o endereço existente do GitHub Pages foram mantidos.

FURG/COPERSE, o acervo de provas FURG e as seis leituras originais ficam disponíveis no aplicativo local. No site, essas entradas são ocultadas e os respectivos endereços internos levam à revisão de Linguagens. ENEM, Fuvest, biblioteca, guias, Level Up, trilhas, flashcards e desempenho permanecem disponíveis. As bases e os registros de progresso não são removidos.

`app-mode.js` identifica o endereço local usado pelo executável ou a abertura direta dos arquivos. Para QA, `terminal.local` aceita `?app-preview=1`. Isso é uma diferença de apresentação, não um controle de acesso. As chaves de armazenamento e a origem local do aplicativo são mantidas para preservar o progresso.

## Voltar e riscar alternativas

O botão fixo no canto inferior esquerdo mantém um histórico de seções da sessão, ignora navegações repetidas para a mesma seção e restaura a posição de rolagem quando possível. Não grava um histórico de navegação no progresso.

O × ao lado de uma opção permite riscar e restaurar. É um rascunho temporário, separado de gabaritos, primeiras tentativas e resultados. Riscar uma opção selecionada desmarca a seleção; escolher uma opção riscada a restaura. Na correção, os riscos dão lugar à leitura das alternativas e do gabarito. O recurso atende os bancos FURG, ENEM e Fuvest, os simulados, Level Up e práticas das leituras. Em um simulado, desmarcar a opção selecionada também remove aquela resposta do cartão em andamento, como a ação existente de deixar em branco.

## Gerar e conferir

```bash
python3 scripts/build-knowledge-library.py
python3 scripts/build-linguagens.py
node scripts/check-knowledge-library.cjs
node scripts/check-linguagens.cjs
node scripts/check-study-controls.cjs
node scripts/check-site.cjs
```

Os testes verificam integridade dos perfis anteriores, IDs e metadados das questões, busca, filtros, comentários e gabaritos, isolamento de progresso, retorno entre seções e marcações reversíveis. A suíte geral também cobre simulados, migração e exportação/importação de progresso, FURG, ENEM, Fuvest, Level Up, leituras e demais funções existentes.

O pacote local preserva o servidor e a porta do executável anterior. `scripts/build-desktop-logo.py` substitui apenas os recursos de ícone de uma cópia do lançador; confirma que código e importações permanecem iguais. O atualizador guarda cópias dos arquivos anteriores e restaura o conteúdo se uma substituição falhar. A validação do atualizador inclui execução controlada do PE e simulação de falhas de arquivo; a interface nativa do Windows ainda requer conferência nesse sistema.
