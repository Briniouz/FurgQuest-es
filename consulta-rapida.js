'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const configKey = 'briniouz-quick-lookup-connection';
  const modal = $('quickLookup');
  if (!modal) return;

  const launcher = $('quickLookupLauncher');
  const input = $('quickLookupQuestion');
  const submit = $('quickLookupSubmit');
  const remote = $('quickLookupRemote');
  const status = $('quickLookupStatus');
  const output = $('quickLookupResult');
  const hint = $('quickLookupHint');
  const wikiOrigin = 'https://pt.wikipedia.org';
  const configuration = $('quickLookupSettings');
  const urlField = $('quickLookupURL');
  const codeField = $('quickLookupCode');
  const connectionStatus = $('quickLookupConnection');
  const segmenter = globalThis.Intl?.Segmenter ? new Intl.Segmenter('pt-BR', {granularity: 'sentence'}) : null;
  let connection = null;
  let requestId = 0;
  let pending = null;
  let wikipediaOnly = false;
  let returnFocus;

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
    connectionStatus.textContent = value ? 'Worker conectado nesta aba. Faz uma pergunta pra testar.' : 'A Wikipédia já funciona direto. Conecta teu Worker para usar o Gemini ou o Tavily.';
    remote.hidden = !value || wikipediaOnly;
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

  function displayBasic(entry) {
    output.append(node('p', 'GUIA BÁSICO · ' + entry.title, 'eyebrow'));
    output.append(node('p', entry.meaning, 'quick-lookup-answer'));
    output.append(node('p', entry.rule));
    const box = details();
    box.append(node('b', 'Símbolos e unidades'), node('p', entry.symbols),
      node('b', 'Exemplo'), ...entry.example.map(part => node('p', part)),
      node('b', 'Quando usar'), node('p', entry.when));
    output.append(box);
  }

  function wikiTerm(question) {
    const basics = globalThis.FurgStudyBasics;
    return basics?.lookup(question)?.terms[0] || basics?.term(question) || question;
  }

  function wikiSearch(question) {
    const url = new URL('/w/index.php', wikiOrigin);
    url.searchParams.set('search', wikiTerm(question));
    return link('Pesquisar direto na Wikipédia', url.href);
  }

  async function consultWikipedia(question, signal) {
    const url = new URL('/w/api.php', wikiOrigin);
    url.search = new URLSearchParams({
      action:'query', generator:'search', gsrsearch:wikiTerm(question),
      gsrnamespace:'0', gsrlimit:'3', prop:'extracts', exintro:'1',
      explaintext:'1', exchars:'420', exlimit:'3', format:'json', formatversion:'2', origin:'*',
    });
    const response = await fetch(url, {
      headers:{'Api-User-Agent':'BriniouzStudy/1.0 (https://github.com/Briniouz/FurgQuest-es)'},
      signal, credentials:'omit', referrerPolicy:'no-referrer',
    });
    if (response.status === 429) return {message:'A Wikipédia pediu uma pausa nas consultas.'};
    if (!response.ok) throw Error('Consulta à Wikipédia indisponível.');
    const data = await response.json();
    if (data.error) throw Error('Consulta à Wikipédia indisponível.');
    const pages = (Array.isArray(data.query?.pages) ? data.query.pages : [])
      .filter(page => Number.isSafeInteger(page?.pageid) && page.pageid > 0 && typeof page.title === 'string')
      .sort((a,b) => (a.index ?? 0) - (b.index ?? 0));
    return {pages};
  }

  function displayWikipedia(result, question) {
    output.append(node('p', 'WIKIPÉDIA · CONSULTA EXTERNA', 'eyebrow'));
    const pages = result.pages?.slice(0,3) || [];
    if (!pages.length) {
      output.append(node('p', result.message || 'Nenhum artigo encontrado pra esse termo.'), wikiSearch(question));
      return;
    }
    const first = pages[0];
    output.append(node('b', first.title.slice(0,150)));
    if (typeof first.extract === 'string' && first.extract.trim()) {
      output.append(node('p', first.extract.trim().slice(0,480), 'quick-lookup-answer'));
    }
    const links = node('div', '', 'quick-lookup-links');
    for (const page of pages) {
      links.append(link(page.title.slice(0,150), wikiOrigin + '/?curid=' + page.pageid));
    }
    links.append(link('Texto sob CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'));
    output.append(links);
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
    const gemini = data.provider === 'gemini';
    const leadLength = gemini ? 3 : parts[0]?.length < 65 ? 2 : 1;
    const detail = gemini && typeof data.detail === 'string' ? data.detail.slice(0, 1400).trim() : '';
    output.append(node('p', gemini ? 'GEMINI · RESPOSTA DE IA' : 'RESUMO DA BUSCA', 'eyebrow'));
    output.append(node('p', (gemini || sources.length) && answer ? parts.slice(0, leadLength).join(' ') :
      sources.length ? 'A busca encontrou estas fontes para tu conferir.' : 'A busca não trouxe fontes para essa pergunta.', 'quick-lookup-answer'));
    if (!sources.length) {
      if (gemini) output.append(node('p', 'Sem fontes encontradas pra esta resposta.'));
      output.append(searchLink(question));
      if (!gemini) return;
    } else {
      const links = node('div', '', 'quick-lookup-links');
      links.append(node('b', gemini ? 'Fontes consultadas' : 'Fontes da busca'), ...sources.map(s => s.link));
      if (sources.some(s => new URL(s.link.href).origin === wikiOrigin)) {
        links.append(link('Texto da Wikipédia sob CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'));
      }
      output.append(links);
    }
    const rest = parts.slice(leadLength).join(' ');
    if (rest || detail || sources.some(s => s.excerpt)) {
      const box = details();
      if (rest) box.append(node('p', rest));
      if (detail) box.append(node('p', detail));
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
    const links = node('div', '', 'quick-lookup-links');
    links.append(wikiSearch(question), searchLink(question));
    output.append(node('p', message), links);
  }

  function open(value, external = false) {
    if (modal.open) return;
    if (!external) globalThis.FurgStudyGuide?.close();
    returnFocus = document.activeElement;
    wikipediaOnly = external;
    remote.hidden = external || !connection;
    hint.textContent = external ? 'Consulta à Wikipédia. Só o termo pesquisado é enviado.' :
      'O acervo vem primeiro. A consulta externa envia o termo pesquisado.';
    if (typeof value === 'string') {
      input.value = value.slice(0,400);
      output.replaceChildren();
    }
    modal.showModal();
    launcher.setAttribute('aria-expanded', 'true');
    input.focus();
    if (external && input.value.trim()) consult();
  }

  launcher.addEventListener('click', () => open());
  $('quickLookupClose').addEventListener('click', () => modal.close());
  modal.addEventListener('keydown', event => event.stopPropagation());
  modal.addEventListener('close', () => {
    requestId++;
    pending?.abort();
    pending = null;
    status.textContent = '';
    submit.disabled = false;
    remote.disabled = false;
    launcher.setAttribute('aria-expanded', 'false');
    (returnFocus || launcher).focus({preventScroll: true});
    returnFocus = null;
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

  async function consult(forceRemote = false) {
    const question = input.value.trim();
    if (!question || question.length > 400 || submit.disabled) return;

    const id = ++requestId;
    output.replaceChildren();
    status.textContent = 'Consultando…';
    submit.disabled = true;
    remote.disabled = true;
    let timeout;
    const useWikipedia = wikipediaOnly || !connection;
    try {
      if (!wikipediaOnly && !forceRemote) {
        const basic = globalThis.FurgStudyBasics?.lookup(question);
        if (basic) {
          displayBasic(basic);
          return;
        }
        const entry = await globalThis.FurgLibraryGuide?.lookup(question).catch(() => null);
        if (id !== requestId) return;
        if (entry) {
          displayLocal(entry);
          return;
        }
      }

      const controller = new AbortController();
      pending = controller;
      timeout = setTimeout(() => controller.abort(), useWikipedia ? 8500 : 16500);
      if (useWikipedia) {
        const result = await consultWikipedia(question, controller.signal);
        if (id === requestId) displayWikipedia(result, question);
        return;
      }
      const response = await fetch(connection.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + connection.code},
        body: JSON.stringify({question, term: wikiTerm(question)}),
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
      } else if (response.status === 503) {
        unavailable(question, 'Falta configurar a chave da API ou o código de acesso no Worker.');
      } else if (!response.ok) {
        unavailable(question, 'A busca está indisponível agora. Confere a configuração do Worker.');
      } else {
        const data = await response.json();
        if (id === requestId) displayWeb(data, question);
      }
    } catch {
      if (id === requestId) {
        if (useWikipedia) displayWikipedia({message:'A Wikipédia demorou ou está indisponível.'}, question);
        else unavailable(question, 'A busca demorou ou falhou. Dá pra conferir pela pesquisa direta.');
      }
    } finally {
      clearTimeout(timeout);
      if (id === requestId) {
        pending = null;
        status.textContent = '';
        submit.disabled = false;
        remote.disabled = false;
      }
    }
  }

  $('quickLookupForm').addEventListener('submit', event => {
    event.preventDefault();
    consult(event.submitter === remote);
  });
  globalThis.FurgQuickLookup = {open};
})();
