'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const configKey = 'briniouz-quick-lookup-connection';
  const modal = $('quickLookup');
  if (!modal) return;

  const launcher = $('quickLookupLauncher');
  const input = $('quickLookupQuestion');
  const submit = $('quickLookupSubmit');
  const status = $('quickLookupStatus');
  const output = $('quickLookupResult');
  const configuration = $('quickLookupSettings');
  const urlField = $('quickLookupURL');
  const codeField = $('quickLookupCode');
  const connectionStatus = $('quickLookupConnection');
  const segmenter = globalThis.Intl?.Segmenter ? new Intl.Segmenter('pt-BR', {granularity: 'sentence'}) : null;
  let connection = null;
  let requestId = 0;
  let pending = null;

  function endpoint(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || !url.hostname.endsWith('.workers.dev') ||
          url.username || url.password || url.port || url.search || url.hash ||
          !['/', '/consulta'].includes(url.pathname)) return '';
      return new URL('/consulta', url).href;
    } catch {
      return '';
    }
  }

  function configure(value) {
    connection = value;
    try {
      if (value) sessionStorage.setItem(configKey, JSON.stringify(value));
      else sessionStorage.removeItem(configKey);
    } catch {
      // The connection still works for this page when session storage is unavailable.
    }
    urlField.value = value?.url || '';
    codeField.value = value?.code || '';
    connectionStatus.textContent = value ? 'Busca na web configurada nesta aba.' : 'A Biblioteca funciona direto. Conecta teu Worker para buscar na web.';
    $('quickLookupDisconnect').hidden = !value;
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem(configKey));
    const url = endpoint(saved?.url);
    if (url && typeof saved?.code === 'string' && saved.code.length >= 16 && saved.code.length <= 150) {
      configure({url, code: saved.code});
    }
  } catch {
    // A fresh session can still consult the Biblioteca.
  }

  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function link(title, href) {
    try {
      const url = new URL(href);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
      const a = node('a', title + ' ↗');
      a.href = url.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      return a;
    } catch {
      return null;
    }
  }

  function searchLink(question) {
    const url = new URL('https://www.google.com/search');
    url.searchParams.set('q', question);
    return link('Pesquisar no Google', url.href);
  }

  function details() {
    const box = node('details', '', 'quick-lookup-details');
    box.append(node('summary', 'Ver detalhes'));
    return box;
  }

  function displayLocal(entry) {
    output.append(node('p', 'BIBLIOTECA ENEM · ' + entry.title, 'eyebrow'));
    output.append(node('p', entry.simple || entry.summary, 'quick-lookup-answer'));
    const box = details();
    if (entry.literal) {
      box.append(node('b', 'Sentido literal'), node('p', entry.literal));
    }
    box.append(node('b', 'Na prova'), node('p', entry.tip));
    if (entry.structure) {
      output.append(node('p', 'Estrutura sugerida · ' + entry.structure.title));
      box.append(node('b', 'Como organizar'), node('p', entry.structure.guide));
    }
    box.append(node('b', entry.exampleLabel || 'Exemplo'), node('p', entry.example));
    const list = node('div', '', 'quick-lookup-links');
    const local = node('a', 'Biblioteca ENEM ↗');
    local.href = '#biblioteca';
    local.setAttribute('data-knowledge-open', '');
    local.addEventListener('click', () => modal.close());
    const sources = (entry.sources || []).slice(0, 2).map(s => link(s.label, s.url)).filter(Boolean);
    list.append(local, ...sources);
    output.append(list, box);
  }

  function displayWeb(data, question) {
    const seen = new Set();
    const sources = (Array.isArray(data.sources) ? data.sources : []).slice(0, 3).flatMap(source => {
      if (!source || typeof source.title !== 'string' || seen.has(source.url)) return [];
      const a = link(source.title.slice(0, 150), source.url);
      if (!a) return [];
      seen.add(source.url);
      return [{link: a, title: source.title.slice(0, 150), excerpt: typeof source.excerpt === 'string' ? source.excerpt.slice(0, 230) : ''}];
    });
    const answer = typeof data.answer === 'string' ? data.answer.trim().slice(0, 2500) : '';
    const parts = segmenter ? Array.from(segmenter.segment(answer), p => p.segment.trim()) : (answer.match(/[^.!?]+[.!?]*\s*/g) || []).map(p => p.trim());
    const leadLength = parts[0]?.length < 65 ? 2 : 1;
    output.append(node('p', 'RESUMO DA BUSCA', 'eyebrow'));
    output.append(node('p', sources.length && answer ? parts.slice(0, leadLength).join(' ') :
      sources.length ? 'A busca encontrou estas fontes para tu conferir.' : 'A busca não trouxe fontes para essa pergunta.', 'quick-lookup-answer'));
    if (!sources.length) {
      output.append(searchLink(question));
      return;
    }
    const links = node('div', '', 'quick-lookup-links');
    links.append(node('b', 'Fontes da busca'), ...sources.map(s => s.link));
    output.append(links);
    const rest = parts.slice(leadLength).join(' ');
    if (rest || sources.some(s => s.excerpt)) {
      const box = details();
      if (rest) box.append(node('p', rest));
      for (const source of sources) {
        if (source.excerpt) {
          const excerpt = node('p', '', 'quick-lookup-excerpt');
          excerpt.append(node('b', source.title), document.createTextNode(' · ' + source.excerpt));
          box.append(excerpt);
        }
      }
      output.append(box);
    }
  }

  function unavailable(question, message) {
    output.append(node('p', message), searchLink(question));
  }

  launcher.addEventListener('click', () => {
    globalThis.FurgStudyGuide?.close();
    modal.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    input.focus();
  });
  $('quickLookupClose').addEventListener('click', () => modal.close());
  modal.addEventListener('keydown', event => event.stopPropagation());
  modal.addEventListener('close', () => {
    requestId++;
    pending?.abort();
    pending = null;
    status.textContent = '';
    submit.disabled = false;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus({preventScroll: true});
  });

  $('quickLookupConnect').addEventListener('submit', event => {
    event.preventDefault();
    const url = endpoint(urlField.value.trim());
    const code = codeField.value.trim();
    if (!url || code.length < 16 || code.length > 150 || /[^\x21-\x7e]/.test(code)) {
      connectionStatus.textContent = 'Usa a URL HTTPS do Worker e o código de acesso de 16 a 150 caracteres, sem espaços.';
      return;
    }
    configure({url, code});
    configuration.open = false;
    input.focus();
  });
  $('quickLookupDisconnect').addEventListener('click', () => configure(null));

  $('quickLookupForm').addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question || question.length > 400 || submit.disabled) return;

    const id = ++requestId;
    output.replaceChildren();
    status.textContent = 'Consultando…';
    submit.disabled = true;
    let timeout;
    try {
      const entry = await globalThis.FurgLibraryGuide?.lookup(question).catch(() => null);
      if (id !== requestId) return;
      if (entry) {
        displayLocal(entry);
        return;
      }
      if (!connection) {
        unavailable(question, 'Para uma busca com resumo aqui na caixinha, conecta teu Worker abaixo.');
        return;
      }

      const controller = new AbortController();
      pending = controller;
      timeout = setTimeout(() => controller.abort(), 14500);
      const response = await fetch(connection.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + connection.code},
        body: JSON.stringify({question}),
        signal: controller.signal,
        credentials: 'omit',
        redirect: 'error',
        referrerPolicy: 'no-referrer',
      });
      if (id !== requestId) return;
      if (response.status === 429) {
        unavailable(question, 'A busca atingiu o limite da API. Tenta em outro momento.');
      } else if (response.status === 401) {
        unavailable(question, 'O código de acesso não foi aceito. Confere a configuração da busca.');
      } else if (!response.ok) {
        unavailable(question, 'A busca está indisponível agora. Confere a configuração do Worker.');
      } else {
        const data = await response.json();
        if (id === requestId) displayWeb(data, question);
      }
    } catch {
      if (id === requestId) unavailable(question, 'A busca demorou ou falhou. Dá pra conferir pela pesquisa direta.');
    } finally {
      clearTimeout(timeout);
      if (id === requestId) {
        pending = null;
        status.textContent = '';
        submit.disabled = false;
      }
    }
  });
})();
