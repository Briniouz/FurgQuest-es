'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const defaults = () => ({guideLauncher:true,quickCards:true,backButton:true,crossOut:true,hints:true,shortcuts:true,reduceMotion:false,compactEnem:false});
  let adapter, bound=false;
  function validate(value) {
    const out=defaults();
    for(const key of Object.keys(out))if(typeof value?.[key]==='boolean')out[key]=value[key];
    return out;
  }
  const get=()=>validate(adapter?.getState().preferences);
  function apply() {
    const p=get();
    for(const [key,value] of Object.entries(p))document.documentElement.dataset[key]=String(value);
    if(!p.crossOut)globalThis.FurgElimination?.clearAll();
  }
  function set(key,value) {
    if(!Object.hasOwn(defaults(),key)||typeof value!=='boolean'||!adapter)return false;
    const previous=adapter.getState().preferences;
    adapter.getState().preferences={...get(),[key]:value};
    if(!adapter.save()){adapter.getState().preferences=previous;return false;}
    apply();return true;
  }
  const groups=[
    ['Teu espaço de estudo',[
      ['guideLauncher','Botão do guia de consulta','Um botão pequeno no canto para pesquisar conceitos e perfis sem sair da questão.'],
      ['quickCards','Botão “Uma carta”','Abre os flashcards rápidos em qualquer seção.'],
      ['backButton','Botão Voltar','Retorna à seção anterior e tenta recuperar a posição de leitura.']
    ]],
    ['Durante as questões',[
      ['crossOut','Riscar alternativas','Mostra o × para eliminar e restaurar opções. Ao desativar, os riscos temporários são limpos.'],
      ['hints','Pistas do Aquecimento','Disponibiliza a pista opcional antes de responder aos exercícios autorais.'],
      ['shortcuts','Atalhos para responder questões','Permite usar A–E, Enter e as setas nos bancos de questões e treinos compatíveis.']
    ]],
    ['Conforto',[
      ['compactEnem','Enunciado compacto (ENEM)','Diminui a fonte, as entrelinhas e os espaços do texto de apoio e do comando. Fontes bibliográficas, imagens e alternativas mantêm o formato atual.'],
      ['reduceMotion','Reduzir movimento','Desativa transições e animações. A preferência de acessibilidade do sistema também é respeitada.']
    ]]
  ];
  function render() {
    const root=$('settingsRoot');if(!root)return;const p=get();
    root.innerHTML='<header class="settings-intro"><p class="eyebrow">DO TEU JEITO</p><h2>Menos distração.<br>Mais espaço para estudar.</h2><p>Escolhe o que aparece enquanto tu estuda. As preferências ficam salvas neste navegador e acompanham a exportação do progresso.</p></header><div class="settings-grid">'+groups.map(([title,rows])=>'<section class="settings-section panel"><h3>'+title+'</h3>'+rows.map(([key,label,description])=>'<label class="settings-row" for="setting-'+key+'"><span><strong>'+label+'</strong><small>'+description+'</small></span><input id="setting-'+key+'" type="checkbox" role="switch" data-setting="'+key+'" '+(p[key]?'checked':'')+'></label>').join('')+'</section>').join('')+'<section class="settings-section panel"><h3>Aparência</h3><label class="settings-theme" for="settingsTheme">Tema<select id="settingsTheme"><option value="light">Claro</option><option value="dark">Escuro</option></select></label><p>O tema é o mesmo do botão no topo do site.</p></section></div><div class="settings-actions"><button type="button" class="outline" data-settings-guide>Abrir o guia de consulta ↗</button><button type="button" class="quiet" data-settings-reset>Restaurar preferências</button><p id="settingsStatus" role="status" aria-live="polite"></p></div><aside class="settings-note"><strong>Teu estudo continua guardado.</strong><p>Esses ajustes não apagam respostas, anotações, favoritos, perfil ou simulados. FURG, ENEM, Fuvest, leituras e trilhas continuam disponíveis no site e no aplicativo.</p></aside>';
    $('settingsTheme').value=document.documentElement.dataset.theme==='dark'?'dark':'light';
  }
  function refresh(){apply();if(document.querySelector('.view.active')?.id==='configuracoes')render();}
  function init(value) {
    adapter=value;adapter.getState().preferences=validate(adapter.getState().preferences);apply();
    if(bound)return;bound=true;
    $('settingsRoot')?.addEventListener('change',e=>{
      if(e.target.id==='settingsTheme'){globalThis.FurgUI?.setTheme(e.target.value);return;}
      const key=e.target.dataset.setting;if(!key)return;
      const ok=set(key,e.target.checked);if(!ok)e.target.checked=get()[key];
      $('settingsStatus').textContent=ok?'Preferência salva.':'Não foi possível salvar. O ajuste anterior foi mantido.';
    });
    $('settingsRoot')?.addEventListener('click',e=>{
      if(e.target.closest('[data-settings-guide]'))globalThis.FurgStudyGuide?.open();
      if(e.target.closest('[data-settings-reset]')){
        const previous=adapter.getState().preferences;adapter.getState().preferences=defaults();
        if(!adapter.save()){adapter.getState().preferences=previous;return;}
        apply();render();$('settingsStatus').textContent='Preferências restauradas. Teu progresso foi mantido.';
      }
    });
  }
  globalThis.FurgSettings={init,defaults,validate,get,set,render,refresh};
})();
