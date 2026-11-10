# Como ligar o Gemini na Busca do BriniouzStudy

A Busca começa pelo guia e pela Biblioteca. Com o Worker conectado, **Perguntar à IA/web** envia a pergunta direto ao serviço externo. O **Gemini 3.5 Flash-Lite** escreve até três frases em destaque. **Ver detalhes** abre o exemplo ou a explicação da mesma resposta.

## Configuração

1. Abre [Chaves de API no Google AI Studio](https://aistudio.google.com/api-keys). Usa uma chave de um projeto no plano gratuito, com o faturamento desativado.
2. No [painel da Cloudflare](https://dash.cloudflare.com/), entra em **Workers & Pages → Create application**. Cria um Worker com o modelo **Hello World**. Se já tens o Worker da Busca, abre ele.
3. Escolhe **Edit code**, substitui o conteúdo pelo arquivo [consulta-worker.mjs](consulta-worker.mjs) e clica em **Deploy**. No GitHub, o botão **Copy raw file** copia o código inteiro.
4. No Worker, abre **Settings → Variables and Secrets → Add**. Escolhe **Secret** e configura as duas entradas abaixo. Clica em **Deploy** depois de adicionar os segredos.

   | Nome | Valor |
   | --- | --- |
   | `GEMINI_API_KEY` | A chave criada no Google AI Studio |
   | `CONSULTA_ACCESS_CODE` | Um código aleatório que tu cria, de 16 a 150 caracteres sem espaços. Usa o gerador de senhas do navegador ou do teu gerenciador. |

5. Abre o [BriniouzStudy online](https://briniouz.github.io/FurgQuest-es/) e entra em **Busca → Configurar Gemini ou Tavily**. Cola a URL `https://nome.conta.workers.dev` do teu Worker e o valor de `CONSULTA_ACCESS_CODE`. Clica em **Conectar nesta aba**.
6. Digita “Por que a água quente sobe na panela?” e clica em **Perguntar à IA/web**. O resultado do Gemini começa com **GEMINI · RESPOSTA DE IA**. Testa **Ver detalhes** e os links das fontes.

A chave do Gemini fica só no segredo do Worker. O site recebe o código separado, salvo apenas na sessão da aba. Em uma consulta externa, o Worker envia o termo de pesquisa à Wikipédia e a pergunta ao Gemini. O [plano gratuito do Gemini](https://ai.google.dev/gemini-api/docs/pricing?hl=pt-br) tem cotas por projeto e pode usar o conteúdo para melhorar os produtos do Google.

## Fontes e compatibilidade

- Por padrão, o Worker consulta a Wikipédia em português e passa trechos ao Gemini. Os links da resposta vêm dessa busca. Quando ela não encontra trechos, a resposta aparece marcada como sem fontes.
- Se tu já usa Tavily, podes manter `TAVILY_API_KEY`. Com as duas chaves, o Worker tenta o Tavily primeiro e usa a Wikipédia como alternativa. Com apenas a chave do Tavily, a Busca mantém o resumo de busca anterior.
- **Consultar** dá prioridade ao acervo. Sem Worker, a Wikipédia continua disponível. Se a cota do serviço acabar, o site mostra links pra consultar diretamente.
- O Worker aceita `https://briniouz.github.io` por padrão. Se hospedares o site em outra origem HTTP(S), configura `SITE_ORIGIN` como o domínio e a porta exatos, sem o caminho da página. Para ativar o Gemini, abre o site por essa origem.
