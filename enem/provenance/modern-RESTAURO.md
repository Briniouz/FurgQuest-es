# Entrega da recuperação moderna

## Arquivos de integração

- `questions.json`: 3.127 registros ENEM, 2009–2025, sem Fuvest; estrutura normalizada e IDs únicos.
- `enem/figures/`: 1.981 figuras reais, 95.710.884 bytes; caminhos locais existentes. Marcador de imagem quebrada descartado.
- `context-patches.json`: 57 patches (47 contextos ausentes + 10 contextos de imagens com texto acrescentado). Mesclar `source` e `quality` com os objetos existentes, preservando os demais campos.
- `format-patches.json`: um ajuste de sintaxe de imagem em 2010/168.
- `gap-manifest.json`: inventário inicial com registros completos (13 questões ausentes; sete com quatro alternativas; oito com figura ausente; 47 contextos ausentes; 20 contextos exclusivamente visuais).
- `ORIGEM.md`: proveniência e limites da aquisição.

O total esperado após as 13 questões restauradas pelo processo de PDFs/gabaritos é 3.140. A tabela inicial ainda precisa receber os patches de gabaritos, alternativas e figuras do processo separado; não é uma tabela final conferida.

## Verificações concluídas

- Fonte clonada com commit fixado e conteúdo original intacto em `source/`.
- Seleção estrita `source == "enem"`; 810 questões Fuvest excluídas.
- Nove IDs de idioma corrigidos, sem colisões. Em particular, 2015/95 é inglês, 2012/94 é espanhol, 2016/93 é inglês e 2020/5 é espanhol.
- Todas as referências locais emitidas na aquisição apontam para arquivos existentes.
- 47/47 contextos ausentes restaurados com página de origem; 10/20 registros originalmente só de imagens receberam texto adicional. Os dez restantes mantêm conteúdo visual legítimo.
- Encontrado novo defeito fora do inventário inicial: 2023/132 tem alternativas A–D sem texto nem figura. Correção solicitada ao processo de PDFs.

## Exclusões da interface

Não copiar `source/.git/`, `context-extracts/`, `context-locations.json` ou relatórios intermediários para a interface. Os recortes de auditoria podem conter marcações de respostas presentes nos espelhos de prova. As imagens de uso são somente as figuras em `enem/figures/` e as figuras de restauração aprovadas pelo processo separado.
