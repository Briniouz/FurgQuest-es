// Cloudflare Worker para a Consulta rápida. Configure as duas variáveis como secrets.
const searchURL = 'https://api.tavily.com/search';
const maxQuestion = 400;

function webSource(result) {
  try {
    const url = new URL(result.url);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    return {
      title: String(result.title || url.hostname).slice(0, 150),
      url: url.href,
      excerpt: String(result.content || '').trim().split(/\s+/).slice(0, 20).join(' '),
    };
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env) {
    const origin = env.SITE_ORIGIN || 'https://briniouz.github.io';
    const headers = {'Vary': 'Origin', 'Cache-Control': 'no-store'};
    function reply(data, status = 200) {
      return Response.json(data, {status, headers});
    }

    if (request.headers.get('Origin') !== origin) return reply({error: 'origin'}, 403);
    Object.assign(headers, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'authorization, content-type',
    });

    if (new URL(request.url).pathname !== '/consulta') return reply({error: 'path'}, 404);
    if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers});
    if (request.method !== 'POST') return reply({error: 'method'}, 405);
    if (!env.TAVILY_API_KEY || !env.CONSULTA_ACCESS_CODE || env.CONSULTA_ACCESS_CODE.length < 16) {
      return reply({error: 'setup'}, 503);
    }
    if (request.headers.get('Authorization') !== 'Bearer ' + env.CONSULTA_ACCESS_CODE) {
      return reply({error: 'access'}, 401);
    }

    let question;
    try {
      const body = await request.text();
      if (body.length > 3000) return reply({error: 'size'}, 413);
      const value = JSON.parse(body)?.question;
      question = typeof value === 'string' ? value.trim() : '';
    } catch {
      return reply({error: 'input'}, 400);
    }
    if (!question || question.length > maxQuestion) return reply({error: 'input'}, 400);

    try {
      const response = await fetch(searchURL, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + env.TAVILY_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: question,
          topic: 'general',
          country: 'brazil',
          search_depth: 'basic',
          auto_parameters: false,
          max_results: 3,
          include_answer: 'basic',
          include_raw_content: false,
        }),
        redirect: 'error',
        signal: AbortSignal.timeout(12000),
      });
      if (response.status === 429 || response.status === 432) return reply({error: 'quota'}, 429);
      if (!response.ok) return reply({error: 'provider'}, 502);
      const data = await response.json();
      const sources = Array.isArray(data.results) ? data.results.slice(0, 3).map(webSource).filter(Boolean) : [];
      const answer = typeof data.answer === 'string' ? data.answer.trim().slice(0, 2500) : '';
      return reply({answer, sources});
    } catch {
      return reply({error: 'provider'}, 502);
    }
  },
};
