# Restauração de enunciados ENEM 2009–2016

Arquivo de patches: `restored-2009-2016.json`. Nenhum arquivo do repositório foi modificado por esta tarefa.

Foram comparadas as 1.475 questões do período com os cadernos locais oficiais. Os 251 alertas iniciais contêm muitos falsos positivos: rótulos de gráficos, conteúdo já presente em imagens e fontes sem Unicode. A revisão foi ampliada a todas as questões para localizar também cortes curtos e condições removidas no meio do texto.

**108 questões com restauração efetiva.**

- 2009: 3
- 2010: 9
- 2011: 13
- 2012: 12
- 2013: 12
- 2014: 19
- 2015: 23
- 2016: 17

Os patches só alteram `context` e/ou `stem`; `source` registra o PDF e a página consultados. `restoration` documenta o motivo e método. Todas as imagens existentes foram mantidas, e suas posições relativas no enunciado permanecem iguais. Alternativas e gabaritos não entram nos patches.

Método: extração direta do texto do PDF; para Arial/Tahoma sem Unicode, associação de caracteres pelo glyph ID com o standardGlyphOrder do fontTools. Ligaturas e símbolos foram conferidos. Nos casos de fonte customizada de 2011, OCR de páginas rasterizadas e revisão manual, sem importar as sequências de glifos corrompidas.

Evidências de cortes materiais:

- 2013/175: introdução completa sobre transmissão de televisão e localização das antenas ausente antes do plano cartesiano.
- 2016/61: protocolo do experimento sobre predação ausente antes da tabela.
- 2015/137: características do suporte e opções de tampo ausentes; só restavam a aproximação para √3 e a pergunta.
- 2011/22: segundo texto-base, de Topik, ausente integralmente, embora o comando se referisse a dois textos.
- 2010/126: o comando saltava de “entrada dos jovens” para “compensatória”, removendo o centro da tese citada.
- 2011/156: hipótese de incremento constante nos primeiros seis meses ausente.
- 2016/177: critério de escolher o maior índice LIRAa ausente.

Conferências locais: IDs únicos, referências a figuras preservadas, nenhuma sequência de controle/glifo corrompido introduzida. Textos incorporados a tiras, cartazes e gráficos já legíveis nas figuras não foram duplicados. Meras referências bibliográficas ausentes não foram tratadas como corte de enunciado.

Verificação adicional: 59 páginas de 2011 passaram por OCR para evitar que a fonte customizada ocultasse cortes de prosa. Isso identificou também 2011/30: o comando estava substituído pelo começo do texto-base. Restaurado o comando correto sobre poder carismático.

Nenhum caso confirmado de corte de prosa desta revisão permaneceu pendente. Há omissões bibliográficas e transcrições preexistentes com pequenas diferenças que não fazem parte destes patches; gráficos/cartuns continuam como figuras, sem duplicação do texto que já exibem.
