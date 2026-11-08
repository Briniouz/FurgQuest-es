# Busca na web da Consulta rápida

A caixinha **Busca** já consulta conceitos e comandos da Biblioteca no próprio BriniouzStudy. Perguntas abertas podem usar o Worker abaixo para receber um resumo e fontes da web.

1. Cria uma chave no [Tavily](https://app.tavily.com/). O [plano gratuito](https://docs.tavily.com/documentation/api-credits) oferece 1.000 créditos por mês. A integração usa uma busca básica por pergunta aberta.
2. No painel da [Cloudflare](https://dash.cloudflare.com/), entra em **Workers & Pages**, cria um Worker e cola o conteúdo de [consulta-worker.mjs](consulta-worker.mjs) no editor. Publica o código.
3. No Worker, em **Settings → Variables and Secrets**, adiciona dois [segredos](https://developers.cloudflare.com/workers/configuration/secrets/). Usa `TAVILY_API_KEY` para a chave do Tavily e `CONSULTA_ACCESS_CODE` para um código aleatório separado, com pelo menos 16 caracteres sem espaços. Publica as mudanças.
4. No BriniouzStudy, abre **Busca → Conectar busca na web**. Cola a URL `https://nome.conta.workers.dev` e digita o código de acesso que tu criou no Worker. A conexão é salva para a sessão daquela aba.
5. Para testar a Biblioteca, pergunta “O que é iluminismo?”. Para testar a web, pergunta “Como os iluministas usavam a razão para criticar o absolutismo?”. O resumo fica em destaque. **Ver detalhes** abre o conteúdo que já veio com a mesma busca.

A chave do Tavily fica no Worker. Para a busca externa, a caixinha envia o texto digitado pelo estudante. O código de acesso restringe quem pode usar tua cota. O Worker aceita o domínio público do BriniouzStudy por padrão. Em um ambiente de teste, define `SITE_ORIGIN` como a origem exata do site.
