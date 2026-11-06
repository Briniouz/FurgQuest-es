# Modo Véspera — Primeiro Dia do ENEM

Entrada: `#vespera`, faixa na página e menu Prática. O modo acrescenta uma seção ao site; os bancos, atalhos, configurações, respostas, favoritos e simulados existentes são preservados.

## Leitura e memória

São 39 cartões autorais: 24 conceitos de leitura, oito gêneros e sete recursos. Cada verbete traz definição, exemplo didático, reconhecimento e distinção em relação a um conceito próximo. O botão lateral abre a consulta em qualquer ponto do modo; fora dele, o guia anterior permanece disponível. A consulta não marca respostas nem revela o gabarito da questão.

Os flashcards vêm desses verbetes e são explicitamente didáticos. Suas marcações não se misturam aos acertos de questões. Humanas e Redação reutilizam os cartões de resumo existentes, com acesso às seções completas.

## Treinos e procedência

25 questões oficiais do banco, com ano, número e idioma originais, são organizadas em blocos de até cinco. O treino misto equilibra três itens de Linguagens e dois de Humanas quando há disponibilidade. São priorizados itens não vistos e, entre equivalentes, textos mais curtos; isso não atribui dificuldade oficial.

Os 25 gabaritos foram comparados com tabelas dos cadernos azuis de 2012, 2014, 2018, 2019, 2021, 2022, 2024 e 2025, respeitando os idiomas das questões iniciais. `vespera-data.js` registra hashes SHA-256 desses PDFs, resposta esperada e impressão digital da transcrição. Correções individuais e seleção deixam de ser aplicadas se o texto ou o gabarito não corresponderem. As figuras usam a camada de apresentação e os arquivos do banco existente; falha ou pendência de carregamento impede conferir sem a imagem.

As questões 3 de inglês de 2024 e 15 de 2025 usam as imagens restauradas e conferidas nos cadernos originais. Os comentários são autorais e não integram o texto oficial. A classificação sugerida de cada alternativa errada explica a divergência em relação ao comando e pode ser alterada pelo estudante; não diagnostica automaticamente sua causa mental. A justificativa escrita não recebe nota automática.

Os números da apostila fornecidos pelo estudante são apenas referências dos seis grupos temáticos. Não existem enunciados identificados dessa apostila no pacote e nenhuma correspondência foi inferida. O treino informado é tratado como contexto para selecionar os temas, sem incorporar seus números às estatísticas nem expor o resultado pessoal no código público. Não há estimativa de TRI, atribuição de dificuldade aos itens novos ou promessa de ganho.

## Estado e revisão

O estado `vespera` integra a mesma cópia de progresso versão 1, com validação própria. Tentativas, confiança, reflexões, categoria de erro, rascunho do bloco e marcações de cartões são preservados. Importações deduplicam tentativas e preservam um bloco local em andamento; backups antigos sem o campo não o apagam. Falha de gravação restaura o estado anterior.

Novas e repetidas são separadas em cada tentativa e por área. Uma questão já respondida ou cujo gabarito foi visto no banco, nos simulados salvos ou neste modo é repetida. O treino não sobrescreve respostas do banco. A fila de erros usa a tentativa mais recente; um acerto posterior resolve a pendência. Erros antigos do banco entram se pertencem à seleção, sem inventar confiança. O filtro de confiança alta não atribui essa confiança aos registros antigos. O botão Próxima questão fica imediatamente após o feedback no novo modo.

## Verificação

- `node scripts/check-vespera.cjs`: conteúdo completo, 25 seleções e comentários, procedência, evidências, cinco itens, campos obrigatórios, prevenção de revelação prematura, imagens, exposições novas/repetidas, revisão por confiança, armazenamento e mesclagem.
- `node scripts/check-site.cjs`: fluxos anteriores e teste real de exportação/importação, backup antigo, deduplicação e reversão de falha de gravação do Modo Véspera.
- Conferência de interface em 390 pixels: busca no dicionário, campos, preferência de dicas, feedback e navegação; tema escuro e retomar após recarregar.
