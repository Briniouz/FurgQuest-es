# Guia de consulta e preferências

FURG, COPERSE, as seis leituras, os simulados e as trilhas estão disponíveis tanto no site quanto no aplicativo. `app-mode.js` mantém apenas a identificação do ambiente; não oculta seções nem redireciona endereços da FURG.

## Consulta sem sair da questão

O botão **?** no canto abre uma janela de consulta com rolagem própria. Também pode ser aberto em **Estudos → Guia de consulta** ou nas Configurações. Não navega para outra seção, não seleciona nem registra respostas e não consulta o gabarito da questão atual. Fechar com o × ou Escape devolve o foco ao controle anterior.

A busca reúne 224 perfis da biblioteca, 32 guias existentes de Linguagens e 35 verbetes conceituais. Aceita nomes, ideias, obras e movimentos, ignora diferenças entre maiúsculas e minúsculas e acentos, e permite filtrar conceitos ou perfis. O conteúdo é carregado ao abrir a consulta; a paginação limita os cartões simultâneos. As relações entre conceitos e pessoas são leituras de apoio, sem alegação de ocorrência numa prova.

## Configurações

A aba `#configuracoes`, acessível pela engrenagem no topo ou pelo menu Estudos, reúne sete ajustes: botão do guia, “Uma carta”, botão Voltar, riscar alternativas, pistas do Aquecimento, atalhos de resposta e redução de movimento. O tema utiliza a preferência já existente. Desligar os riscos limpa apenas as marcas temporárias; nenhuma resposta é apagada.

As preferências entram em `preferences` no progresso de versão 1 existente, com validação explícita de booleanos. A exportação inclui os ajustes; a importação de um arquivo antigo sem esse campo conserva as preferências atuais. Uma falha de armazenamento reverte a alteração. Restaurar preferências não apaga perfil, respostas, anotações ou simulados.

## Aquecimento

O banco passou de 72 para 120 exercícios autorais: 44 de Linguagens, 56 de Humanas e 20 de Redação. Os formatos são 44 de alternativas, 38 de lacunas e 38 de associação. Todos os 72 itens anteriores e seus IDs são preservados. Os 48 novos itens estão em `scripts/day1-extra.json`; `node scripts/build-day1-extra.cjs` reconstrói JSON e JavaScript. Exercícios autorais não são apresentados como questões oficiais do ENEM.

## Verificação

```sh
node scripts/check-study-guide.cjs
node scripts/check-linguagens.cjs
node scripts/check-study-controls.cjs
node scripts/check-knowledge-library.cjs
node scripts/check-site.cjs
```

Os testes cobrem busca por nome, conceito e obra, acentos, carregamento sob demanda, conservação dos 72 itens, validação e rollback das preferências, importação/exportação, atalhos e integridade das bases oficiais. A consulta precisa dos arquivos locais do projeto no aplicativo; links externos de referência dependem de conexão.

## Leitura compacta e exemplos

O cabeçalho agora ocupa uma linha. Sugestões desaparecem durante a busca, o contador fica junto dos filtros e a janela usa a altura disponível da tela. Uma nova busca repõe a rolagem no primeiro resultado; carregar mais mantém a posição. Correspondências exatas abrem a explicação inicial.

Os 67 temas de consulta (35 verbetes e 32 guias de Linguagens) têm exemplo autoral explicado e focos de estudo em “O que pode ser cobrado”. Essas possibilidades são uma orientação didática, sem previsão ou nova alegação de ocorrência no exame. Estoicismo, epicurismo e ceticismo antigo receberam verbetes próprios. Os perfis relacionados aproveitam exemplos de seus conceitos, identificados pelo tema.

Retratos ou representações dos perfis são solicitados à Wikipédia ao ficarem visíveis, com cache compartilhado com a biblioteca, miniaturas leves e link para os créditos do arquivo. Ausência de imagem ou falha de conexão mantém as iniciais. A busca não precisa esperar as imagens.

Três representações de estoicos (Sêneca, Epicteto e Marco Aurélio) acompanham o projeto como miniaturas locais, com autoria e licença em `portraits/README.md`. Os outros perfis usam a consulta de imagens da Wikipédia. O carregamento aceita os dois domínios de miniaturas do Wikimedia, `upload` e `thumb`.
