'use strict';
/* Dock de vidro: reúne os quatro botões flutuantes (Voltar, Busca, Uma carta, Guia)
   num único lugar, para não ficarem espalhados e cobrindo o conteúdo.
   Os botões são movidos, não recriados: ids, eventos e configurações continuam valendo. */
(() => {
  const ids = ['pageBack', 'quickLookupLauncher', 'lightLauncher', 'studyGuideLauncher'];

  function build() {
    if (document.getElementById('glassDock')) return;
    const buttons = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!buttons.length) return;
    const dock = document.createElement('div');
    dock.id = 'glassDock';
    dock.className = 'glass-dock';
    dock.setAttribute('role', 'toolbar');
    dock.setAttribute('aria-label', 'Atalhos rápidos');
    document.body.append(dock);
    buttons.forEach(button => dock.append(button));
    // Rótulos curtos e visíveis; o texto completo continua no aria-label/title.
    const guide = document.getElementById('studyGuideLauncher');
    if (guide && !guide.querySelector('.dock-label')) {
      const label = document.createElement('span');
      label.className = 'dock-label';
      label.textContent = 'Guia';
      guide.append(label);
    }
    const search = document.getElementById('quickLookupLauncher');
    if (search && !search.querySelector('.dock-label')) {
      const text = [...search.childNodes].find(node => node.nodeType === 3 && node.textContent.trim());
      if (text) {
        const label = document.createElement('span');
        label.className = 'dock-label';
        label.textContent = text.textContent.trim();
        text.replaceWith(label);
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
  globalThis.FurgDock = { build };
})();
