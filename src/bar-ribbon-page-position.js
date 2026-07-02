function ensureBarRibbonPageStyle() {
  var style = document.getElementById('bar-ribbon-page-position-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'bar-ribbon-page-position-style';
    document.head.appendChild(style);
  }

  style.textContent = '.a4-page{position:relative!important}.a4-proxy-control{position:absolute!important;right:auto!important;inset-inline-start:auto!important;inset-inline-end:auto!important;z-index:1000!important;pointer-events:auto!important;margin:0!important;padding:0!important;border-radius:6px!important;line-height:1!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;white-space:nowrap!important;overflow:hidden!important;cursor:pointer!important;direction:ltr!important;unicode-bidi:isolate!important}.a4-top-control{top:calc(var(--exam-header-height, 104px) + 5px)!important;bottom:auto!important;transform:translateX(-50%)!important;width:34px!important;min-width:34px!important;height:34px!important;min-height:34px!important}.a4-text-control{font-size:13px!important;font-weight:900!important}.a4-icon-control{font-size:0!important}.a4-bar-proxy{left:calc(50% - 60px)!important}.a4-lines-proxy{left:calc(50% - 20px)!important}.a4-lang-proxy{left:calc(50% + 20px)!important}.a4-free-proxy{left:calc(50% + 60px)!important}body.arabic-mode .a4-bar-proxy{left:calc(50% - 60px)!important;right:auto!important}body.arabic-mode .a4-lines-proxy{left:calc(50% - 20px)!important;right:auto!important}body.arabic-mode .a4-lang-proxy{left:calc(50% + 20px)!important;right:auto!important}body.arabic-mode .a4-free-proxy{left:calc(50% + 60px)!important;right:auto!important}.a4-bar-proxy::after{content:""!important;width:15px!important;height:18px!important;display:block!important;border-left:5px solid currentColor!important;border-right:5px solid currentColor!important;border-top:3px solid currentColor!important;border-bottom:3px solid currentColor!important;box-sizing:border-box!important;opacity:.95!important}.a4-lines-proxy::after{content:""!important;width:18px!important;height:16px!important;display:block!important;background:repeating-linear-gradient(to bottom,currentColor 0,currentColor 2px,transparent 2px,transparent 5px)!important;border-top:2px solid currentColor!important;border-bottom:2px solid currentColor!important;box-sizing:border-box!important;opacity:.95!important}.a4-note-proxy-wrap{position:absolute!important;left:calc(50% + 126px)!important;right:auto!important;inset-inline-start:auto!important;inset-inline-end:auto!important;top:calc(var(--exam-header-height, 104px) + 5px)!important;bottom:auto!important;transform:translateX(-50%)!important;z-index:1000!important;pointer-events:auto!important;margin:0!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;box-sizing:border-box!important;direction:ltr!important;unicode-bidi:isolate!important}body.arabic-mode .a4-note-proxy-wrap{left:calc(50% + 126px)!important;right:auto!important}.a4-note-proxy-wrap .a4-note-proxy{position:static!important;width:42px!important;min-width:42px!important;height:34px!important;min-height:34px!important;border-radius:6px!important;font-size:12px!important;font-weight:900!important}.a4-footer-preview{left:calc(50% + 54px)!important;right:auto!important;bottom:5px!important;top:auto!important;width:58px!important;min-width:58px!important;height:22px!important;min-height:22px!important;font-size:10px!important;font-weight:900!important}.a4-footer-export{left:calc(50% - 70px)!important;right:auto!important;bottom:5px!important;top:auto!important;width:68px!important;min-width:68px!important;height:22px!important;min-height:22px!important;font-size:10px!important;font-weight:900!important}.a4-footer-two-page{left:calc(50% + 104px)!important;right:auto!important;bottom:5px!important;top:auto!important;width:28px!important;min-width:28px!important;height:22px!important;min-height:22px!important}body.arabic-mode .a4-footer-preview{left:calc(50% + 54px)!important;right:auto!important}body.arabic-mode .a4-footer-export{left:calc(50% - 70px)!important;right:auto!important}body.arabic-mode .a4-footer-two-page{left:calc(50% + 104px)!important;right:auto!important}.a4-proxy-control:disabled{opacity:.35!important;cursor:not-allowed!important}.exam-page.is-exporting .a4-proxy-control,.exam-page.is-exporting .a4-note-proxy-wrap{display:none!important}@media print{.a4-proxy-control,.a4-note-proxy-wrap{display:none!important}}';
}

function clickOriginal(selector, matcher) {
  var candidates = Array.from(document.querySelectorAll(selector));
  var button = matcher ? candidates.find(matcher) : candidates[0];
  if (button && !button.disabled) button.click();
}

function makeProxy(className, title, text, onClick) {
  var firstPage = document.querySelector('.a4-page');
  if (!firstPage) return null;

  var button = firstPage.querySelector('.' + className.split(' ').join('.'));
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'a4-proxy-control ' + className;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
      setTimeout(syncA4ProxyControls, 80);
      setTimeout(syncA4ProxyControls, 250);
    });
    firstPage.appendChild(button);
  }

  button.title = title;
  button.setAttribute('aria-label', title);
  if (typeof text === 'string') button.textContent = text;
  return button;
}

function findPreviewPdfButton() {
  return Array.from(document.querySelectorAll('.panel button')).find(function (button) {
    var text = String(button.textContent || '').trim();
    return text === 'Voir PDF' || text === 'Préparation...';
  }) || null;
}

function findExportPdfButton() {
  return Array.from(document.querySelectorAll('.panel button.secondary')).find(function (button) {
    var text = String(button.textContent || '').trim();
    return text === 'Exporter PDF A4' || text === 'Export en cours...';
  }) || null;
}

function syncA4ProxyControls() {
  ensureBarRibbonPageStyle();
  var firstPage = document.querySelector('.a4-page');
  if (!firstPage) return;

  var barOriginal = document.querySelector('.panel .bar-ribbon-toggle') || document.querySelector('.bar-ribbon-toggle:not(.a4-proxy-control)');
  var linesOriginal = document.querySelector('.panel .pdf-lines-toggle') || document.querySelector('.pdf-lines-toggle:not(.a4-proxy-control)');
  var langOriginal = document.querySelector('.panel .language-toggle') || document.querySelector('.language-toggle:not(.a4-proxy-control)');
  var freeOriginal = document.querySelector('.panel .individual-toggle') || document.querySelector('.individual-toggle:not(.a4-proxy-control)');
  var previewOriginal = findPreviewPdfButton();
  var exportOriginal = findExportPdfButton();
  var twoPageOriginal = document.querySelector('.panel .two-page-view-toggle') || document.querySelector('.two-page-view-toggle:not(.a4-proxy-control)');

  var bar = makeProxy('a4-top-control a4-icon-control a4-bar-proxy', 'Ruban de barème', '', function () { if (barOriginal) barOriginal.click(); });
  if (barOriginal && bar) {
    bar.classList.toggle('on', barOriginal.classList.contains('on'));
    bar.classList.toggle('off', barOriginal.classList.contains('off'));
  }

  var lines = makeProxy('a4-top-control a4-icon-control a4-lines-proxy', 'Lignes PDF', '', function () { if (linesOriginal) linesOriginal.click(); });
  if (linesOriginal && lines) {
    lines.classList.toggle('on', linesOriginal.classList.contains('on'));
    lines.classList.toggle('off', linesOriginal.classList.contains('off'));
  }

  makeProxy('a4-top-control a4-text-control a4-lang-proxy', window.__examLanguage === 'ar' ? 'Français' : 'Arabe', window.__examLanguage === 'ar' ? 'Fr' : 'Ar', function () { if (langOriginal) langOriginal.click(); });
  makeProxy('a4-top-control a4-text-control a4-free-proxy', document.body.classList.contains('no-title-points') ? 'Devoir individuel' : 'Devoir libre', document.body.classList.contains('no-title-points') ? 'D' : 'L', function () { if (freeOriginal) freeOriginal.click(); });

  var noteWrap = firstPage.querySelector('.a4-note-proxy-wrap');
  if (!noteWrap) {
    noteWrap = document.createElement('div');
    noteWrap.className = 'a4-note-proxy-wrap';
    firstPage.appendChild(noteWrap);
  }
  noteWrap.innerHTML = '';
  Array.from(document.querySelectorAll('.panel .note-scale-button')).forEach(function (original) {
    var proxy = document.createElement('button');
    proxy.type = 'button';
    proxy.className = 'a4-proxy-control a4-note-proxy';
    var txt = String(original.textContent || '').trim();
    proxy.textContent = txt.replace('Sur ', '/').replace('/ ', '/');
    proxy.disabled = original.disabled;
    proxy.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (!original.disabled) original.click();
      setTimeout(syncA4ProxyControls, 80);
    });
    noteWrap.appendChild(proxy);
  });

  var preview = makeProxy('a4-footer-preview', 'Voir PDF', previewOriginal && previewOriginal.textContent.trim() === 'Préparation...' ? '...' : 'Voir PDF', function () { if (previewOriginal) previewOriginal.click(); });
  if (previewOriginal && preview) preview.disabled = previewOriginal.disabled;

  var exp = makeProxy('a4-footer-export', 'Exporter PDF A4', exportOriginal && exportOriginal.textContent.trim() === 'Export en cours...' ? '...' : 'Exporter', function () { if (exportOriginal) exportOriginal.click(); });
  if (exportOriginal && exp) exp.disabled = exportOriginal.disabled;

  var two = makeProxy('a4-footer-two-page', 'Affichage côte à côte', '', function () { if (twoPageOriginal) twoPageOriginal.click(); });
  if (twoPageOriginal && two) {
    two.disabled = twoPageOriginal.disabled;
    two.innerHTML = twoPageOriginal.innerHTML;
    two.classList.toggle('on', twoPageOriginal.classList.contains('on'));
    two.classList.toggle('off', twoPageOriginal.classList.contains('off'));
  }
}

syncA4ProxyControls();
setTimeout(syncA4ProxyControls, 100);
setTimeout(syncA4ProxyControls, 300);
setTimeout(syncA4ProxyControls, 700);
setInterval(syncA4ProxyControls, 500);
window.addEventListener('resize', syncA4ProxyControls);
window.moveBarRibbonToggleToPage = syncA4ProxyControls;
window.syncA4ProxyControls = syncA4ProxyControls;
