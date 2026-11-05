# Biblioteca ENEM

A biblioteca reúne 224 perfis em português, incluindo os 40 perfis originais, com ideias, obras, conceitos, correntes, contextos históricos e referências. A pesquisa alcança nomes, ideias, obras e movimentos. É possível combinar área, período, corrente, quantidade de citações nominais e tipo de vínculo. Os perfis levam a questões reais do banco e as questões oferecem um caminho de volta à biblioteca.

## Acervo e método

O levantamento usa as 3.833 questões regulares de 1998 a 2025 existentes no repositório. Não representa todas as aplicações, reaplicações ou cores do ENEM. As frequências descrevem somente os IDs presentes no acervo local, sem previsão de incidência futura.

O arquivo `scripts/personality-catalog.json` contém a redação dos perfis, variantes de nomes e critérios conceituais. `scripts/build-knowledge-library.py` gera `thinkers-data.js`, `thinkers-index.js` e `docs/enem-library-audit.json`. A geração usa Python e Node.js; a aplicação continua sendo HTML/CSS/JS estático, inclusive no pacote local aberto pelo executável.

Cada personalidade tem no máximo um vínculo por questão, nesta prioridade:

1. **Citação nominal identificada:** nome completo, variante reconhecida ou assinatura bibliográfica. O trecho e sua posição são expostos. Nomes em alternativas são identificados, pois podem ser distratores; nomes nas fontes não significam necessariamente cobrança da teoria do autor.
2. **Obra sem citação nominal:** título reconhecido sem nome identificado na mesma questão. Títulos muito genéricos são evitados.
3. **Conexão conceitual sugerida:** associação didática a partir de termos do apoio ou comando. A fonte bibliográfica e as alternativas são excluídas dessa inferência. Não comprova presença, autoria, intenção do examinador nem cobrança da personalidade. A lista é uma seleção de até 12 itens por perfil e não uma medida de frequência.

O levantamento identifica 545 vínculos nominais, 14 referências a obras sem nome e 17 sugestões conceituais, envolvendo 493 questões distintas e 170 perfis com citação nominal reconhecida. Os exemplos vêm acompanhados do ano, número, ID, trecho e justificativa do vínculo. Perfis sem evidência não recebem anos ou aparições inventados.

As regras são conservadoras, mas transcrições, iniciais e homônimos ainda exigem conferência no original. Não há OCR novo das imagens neste levantamento. Ausência de correspondência não prova ausência na prova. O gerador evita sobrenomes que também são palavras comuns e os testes incluem contraexemplos: “pessoa”, “saber”, “dádiva” em sentido cotidiano e “mais valia” em um poema não são automaticamente atribuídos a Pessoa, Ab'Sáber, Mauss ou Marx.

As sínteses são autorais e não substituem as obras. Bibliografias e links para aprofundamento ficam em cada perfil. Retratos são consultados sob demanda na Wikipédia/Wikimedia; quando indisponíveis, são exibidas iniciais. Não é feito acesso ao Ferretto nem cópia de seus materiais.

## Questões mais legíveis

`enem-layout.js` é uma camada de apresentação compartilhada pelo banco e pelos simulados. O texto de apoio, as fontes e o comando recebem áreas visuais distintas, com manutenção da ordem e do conteúdo. A identificação de fontes usa indícios bibliográficos conservadores. Em transcrições recentes com fonte e comando na mesma linha, o componente separa os trechos quando há um limite identificável. Casos ambíguos permanecem juntos; o texto nunca é resumido ou apagado para forçar uma separação.

As alternativas, imagens, IDs e gabaritos continuam nas bases originais. A correção exibe uma área própria para resolução. Há 66 comentários autorais vinculados ao gabarito esperado; uma divergência de gabarito impede o uso de um comentário desatualizado. Nos demais itens, a interface informa que ainda não há resolução comentada e oferece a conferência do gabarito. As resoluções não aparecem durante um simulado em andamento.

## Carregamento e progresso

Os dados da biblioteca são carregados apenas na primeira abertura, por scripts compatíveis com acesso local. Os resultados são exibidos em grupos de 12 e os retratos são buscados apenas quando se aproximam da área visível. O índice guarda referências e pequenos trechos, sem duplicar o banco de questões.

A biblioteca não escreve no progresso do usuário. A abertura de questões reutiliza o banco ENEM existente. IDs, chaves de armazenamento, primeiras tentativas, anotações, favoritos, perfis e formatos de exportação/importação foram preservados.

## Verificação

Execute:

```bash
python3 scripts/build-knowledge-library.py
node scripts/check-knowledge-library.cjs
node scripts/check-site.cjs
```

O teste da biblioteca confere os 224 perfis, a preservação de todos os campos dos 40 originais, cada questão vinculada, os trechos de evidência, os tipos e anos, as ligações de retorno, buscas, filtros combinados, contraexemplos, carregamento sob demanda e proteção contra HTML indevido. Verifica também a conservação integral de apoio e comando nas 3.833 questões e a consistência dos 66 comentários com os gabaritos.

A suíte geral cobre FURG, ENEM, Fuvest, simulados, Level Up, trilhas, flashcards, leituras, tema, navegação e exportação/importação de progresso. Na conferência local deste trabalho, caminhos de arquivos binários não baixados foram verificados contra a árvore exata do repositório; os arquivos e suas referências não foram alterados.
