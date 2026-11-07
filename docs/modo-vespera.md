# Modo Véspera — Primeiro Dia do ENEM

Abre em `#vespera`, pela faixa da página ou pelo menu Prática.

## Treino e consulta

- O percurso tem 25 questões oficiais em cinco etapas, com 12 itens de Linguagens e 13 de Humanas. Abrange leitura do comando, gêneros, literatura, artes, inglês, esporte, História, Geografia, Filosofia e Sociologia.
- O bloco curto de cinco questões pode ser usado enquanto o percurso está em andamento. Cada treino guarda seu próprio rascunho e posição. O acervo comentado do modo reúne 36 questões distintas.
- Cada questão pede uma leitura do comando, uma evidência, confiança e alternativa. O campo discursivo é opcional. O feedback inclui resolução autoral, pista e explicação para a alternativa incorreta marcada. O botão **Próxima questão** aparece logo após o feedback.
- O caderno reúne respostas discursivas e comentários pessoais. Os comentários podem ser editados na questão ou no caderno. As tentativas e os textos acompanham a exportação do progresso.
- O dicionário lateral reúne 39 verbetes autorais. Os flashcards reaproveitam definições e exemplos. Os resumos existentes de Humanas e Redação continuam acessíveis.
- Os 12 cartões de Redação têm uma obra cultural, um dado contextualizado, uma dica de aplicação e um exemplo autoral. Cada cartão traz links para conferir a obra e a fonte do dado.

## Questões oficiais

As seleções preservam ano, número e idioma. Os gabaritos foram comparados com tabelas dos cadernos azuis de 2012, 2014, 2018, 2019, 2021, 2022, 2024 e 2025. `vespera-data.js` registra os hashes SHA-256 das folhas. `vespera-data.js` e `vespera-percurso-data.js` registram a resposta esperada e a impressão digital da transcrição por item. Uma transcrição divergente interrompe o uso do item até a conferência.

As figuras vêm do banco e da camada de apresentação. A conferência da resposta depende do carregamento da imagem. Os números da apostila organizam grupos temáticos. As questões do modo usam os números originais do ENEM.

## Progresso

O estado `vespera` faz parte do backup versão 1 e conserva o bloco curto original em `active`. O percurso fica em `percurso`. A importação deduplica tentativas e preserva cada treino local em andamento. Em caso de falha de gravação, o estado salvo é preservado.

As estatísticas separam itens novos e repetidos por área. Questões já respondidas ou com gabarito visto no banco, em simulado salvo ou neste modo contam como repetidas. A revisão de erros considera a tentativa mais recente e permite filtrar erros com confiança alta. Os dados dos bancos e simulados continuam nas suas seções.

## Verificação

- `node scripts/check-vespera.cjs` verifica o acervo, os gabaritos de referência, a integridade das questões, o feedback, a persistência e os dois tamanhos de treino.
- `node scripts/check-site.cjs` verifica os fluxos do site e a exportação e importação do progresso.
