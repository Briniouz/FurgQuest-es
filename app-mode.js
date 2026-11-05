'use strict';
(() => {
 const host=String(location.hostname||'').replace(/^\[|\]$/g,''),protocol=location.protocol||'';
 const local=host==='127.0.0.1'||host==='localhost'||host==='::1'||protocol==='file:';
 const preview=host==='terminal.local'&&new URLSearchParams(location.search||'').has('app-preview');
 const isApp=local||preview;
 document.documentElement.dataset.appMode=isApp?'app':'web';
 // The complete collection is available on both the website and the local app.
 globalThis.FurgRuntime={isApp,view:name=>name};
})();
