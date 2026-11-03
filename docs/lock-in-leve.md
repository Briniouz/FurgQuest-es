# Lock in leve

Acesso direto: `#leve`. O botão **Uma carta** abre flashcards momentâneos a partir de qualquer área, com fechamento por botão, fundo ou Escape. As cartas só abrem por ação do usuário. A inspiração funcional é uma rotina curta de revisão; a identidade visual permanece a deste projeto.

## Conteúdo

61 cartas: 13 repertórios, 10 agentes de intervenção e 3 conceitos de redação, 12 curiosidades e 23 cartas de compreensão básica. As conexões são exemplos autorais. Os repertórios e as curiosidades incluem fontes primárias para consulta. Estudos têm recorte, ano e limites; ficção é usada como analogia. Adolescência e IA são eixos de treino, sem previsão ou confirmação do tema da redação.

Os tempos de 5, 10 e 15 minutos são referências de leitura, correspondentes a blocos de até 3, 6 e 9 cartas. O usuário pode virar, guardar, pular, pausar e retomar. A semana registra cartas únicas reveladas em cada dia, no fuso de São Paulo, sem nota ou ranking. As sugestões priorizam cartas guardadas e ainda não abertas, por regras locais.

## Progresso e aparência

O campo `lightReview` integra o progresso existente, com validação de IDs, filtros, sessão, atividade dos últimos 90 dias e preferências visuais. Exportação e importação incluem esse campo. Importações antigas preservam os registros locais. Falhas ao salvar mantêm o estado anterior.

O visual tranquilo aplica cores suaves aos temas claro e escuro, amplia o espaço de leitura e adiciona um fundo lateral com movimento lento. O movimento pode ser desligado e respeita `prefers-reduced-motion`. A escolha de tema claro/escuro continua independente.

A leitura em voz alta é opcional e depende da disponibilidade do navegador. Só inicia por clique; trocar a carta, sair da área ou fechar a janela interrompe a leitura. Os atalhos do banco de questões ficam suspensos enquanto o diálogo de flashcards estiver aberto.

## Verificação

```sh
node scripts/check-site.cjs
```

O verificador cobre abertura voluntária, isolamento de teclado, retorno de foco, pausa/retomada, sugestões, atividade sem duplicação, importação/exportação, backups antigos, falhas de armazenamento, validação, renderização segura e interrupção de áudio. Arquivos de implementação: `light-review-data.js`, `light-review.js` e `light-review.css`.
