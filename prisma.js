'use strict';
(() => {
  const root = document.documentElement;
  const $ = id => document.getElementById(id);
  let activeTransition;

  function syncTheme(dark) {
    $('prismaSky')?.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
    const label = $('prismaSkyLabel');
    if (label) label.textContent = dark ? 'Luz da noite' : 'Luz do dia';
  }

  function reveal(source, apply) {
    if (activeTransition) {
      activeTransition.skipTransition();
      activeTransition = null;
      root.classList.remove('prisma-revealing');
    }
    if (!source || root.dataset.design !== 'prisma' || globalThis.FurgUI?.reducedMotion() ||
        !document.startViewTransition || document.visibilityState !== 'visible') return false;

    const anchor = source.querySelector('.prisma-knob') || source;
    const rect = anchor.getBoundingClientRect();
    const width = root.clientWidth;
    const height = root.clientHeight;
    const x = Math.round(Math.max(0, Math.min(width, rect.left + rect.width / 2)));
    const y = Math.round(Math.max(0, Math.min(height, rect.top + rect.height / 2)));
    const radius = Math.ceil(Math.hypot(Math.max(x, width - x), Math.max(y, height - y)));
    root.style.setProperty('--prisma-reveal-origin', x + 'px ' + y + 'px');
    root.style.setProperty('--prisma-reveal-radius', radius + 'px');
    root.classList.add('prisma-revealing');
    let transition;
    try {
      transition = document.startViewTransition(() => {
        if (activeTransition === transition) apply();
      });
    } catch {
      root.classList.remove('prisma-revealing');
      return false;
    }
    activeTransition = transition;
    const finish = () => {
      if (activeTransition !== transition) return;
      activeTransition = null;
      root.classList.remove('prisma-revealing');
    };
    transition.finished.then(finish, finish);
    return true;
  }

  function bindDrag(control, travelWidth) {
    if (!control) return;
    let drag, suppressClick = false;
    const endDrag = () => {
      control.style.removeProperty('--prisma-drag');
      delete control.dataset.prismaDragging;
      drag = null;
    };
    control.addEventListener('pointerdown', event => {
      if (root.dataset.design !== 'prisma' || !event.isPrimary || event.button !== 0) return;
      suppressClick = false;
      const start = root.dataset.theme === 'dark' ? 0 : 1;
      const width = travelWidth(control.getBoundingClientRect().width);
      drag = { id: event.pointerId, x: event.clientX, start, width, position: start, moved: false };
      control.setPointerCapture(event.pointerId);
    });
    control.addEventListener('pointermove', event => {
      if (drag?.id !== event.pointerId) return;
      const delta = event.clientX - drag.x;
      if (!drag.moved && Math.abs(delta) < 5) return;
      drag.moved = true;
      drag.position = Math.max(0, Math.min(1, drag.start + delta / drag.width));
      control.dataset.prismaDragging = '';
      control.style.setProperty('--prisma-drag', drag.position.toFixed(3));
    });
    control.addEventListener('pointerup', event => {
      if (drag?.id !== event.pointerId) return;
      const { moved, position } = drag;
      endDrag();
      if (!moved) return;
      suppressClick = true;
      const next = position < .5 ? 'dark' : 'light';
      if (next !== root.dataset.theme) globalThis.FurgUI.setTheme(next, control);
    });
    for (const type of ['pointercancel', 'lostpointercapture']) {
      control.addEventListener(type, event => { if (drag?.id === event.pointerId) endDrag(); });
    }
    control.addEventListener('click', event => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);
  }

  function init() {
    const sky = $('prismaSky');
    bindDrag($('themeToggle'), width => Math.max(1, width - 40));
    bindDrag(sky, width => Math.max(1, width * .76));
    if (!sky) return;
    sky.addEventListener('click', () => {
      globalThis.FurgUI.setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', sky);
    });
    sky.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || globalThis.FurgUI.reducedMotion()) return;
      const rect = sky.getBoundingClientRect();
      sky.style.setProperty('--prisma-light-x', (event.clientX - rect.left) + 'px');
      sky.style.setProperty('--prisma-light-y', (event.clientY - rect.top) + 'px');
    });
    sky.addEventListener('pointerleave', () => {
      sky.style.removeProperty('--prisma-light-x');
      sky.style.removeProperty('--prisma-light-y');
    });
  }

  globalThis.FurgPrisma = { init, reveal, syncTheme };
})();
