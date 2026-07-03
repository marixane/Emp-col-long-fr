function ensureLineGridModeStyle() {
  var style = document.getElementById('line-grid-mode-style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'line-grid-mode-style';
    document.head.appendChild(style);
  }

  style.textContent = '.a4-page.line-mode-grid .exercise-body,.exam-page.line-mode-grid .exercise-body,body.line-mode-grid .exercise-body,body.line-mode-grid .exam-page.has-bar-ribbon .exam-exercise .exercise-body{background-color:#fff!important;background-image:linear-gradient(#d7d7d7 1px,transparent 1px),linear-gradient(90deg,#d7d7d7 1px,transparent 1px)!important;background-size:28px 28px!important;background-position:0 0!important}.a4-page.line-mode-none .exercise-body,.exam-page.line-mode-none .exercise-body,body.line-mode-none .exercise-body,body.line-mode-none .exam-page.has-bar-ribbon .exam-exercise .exercise-body{background:#fff!important;background-image:none!important}.a4-page.line-mode-line .exercise-body,.exam-page.line-mode-line .exercise-body,body.line-mode-line .exercise-body,body.line-mode-line .exam-page.has-bar-ribbon .exam-exercise .exercise-body{background-color:#fff!important;background-image:repeating-linear-gradient(white 0px,white 28px,#ddd 29px)!important}.a4-page.line-mode-grid.no-pdf-lines .exercise-body,.exam-page.line-mode-grid.no-pdf-lines .exercise-body{background-color:#fff!important;background-image:linear-gradient(#d7d7d7 1px,transparent 1px),linear-gradient(90deg,#d7d7d7 1px,transparent 1px)!important;background-size:28px 28px!important;background-position:0 0!important}';
}

function getLineMode() {
  return window.__lineMode || 'line';
}

function setLineMode(mode) {
  window.__lineMode = mode;
  document.body.classList.toggle('line-mode-line', mode === 'line');
  document.body.classList.toggle('line-mode-grid', mode === 'grid');
  document.body.classList.toggle('line-mode-none', mode === 'none');
  document.querySelectorAll('.a4-page,.exam-page').forEach(function (page) {
    page.classList.toggle('line-mode-line', mode === 'line');
    page.classList.toggle('line-mode-grid', mode === 'grid');
    page.classList.toggle('line-mode-none', mode === 'none');
  });
  updateLineButtons();
}

function nextLineMode() {
  var mode = getLineMode();
  if (mode === 'line') return 'grid';
  if (mode === 'grid') return 'none';
  return 'line';
}

function modeTitle(mode) {
  if (mode === 'grid') return 'Lignes cahier à carreaux';
  if (mode === 'none') return 'Lignes masquées';
  return 'Lignes simples';
}

function updateLineButtons() {
  var mode = getLineMode();
  document.querySelectorAll('.a4-lines-proxy,.pdf-lines-toggle').forEach(function (button) {
    button.title = modeTitle(mode) + ' — cliquer pour changer';
    button.setAttribute('aria-label', button.title);
    button.classList.toggle('on', mode !== 'none');
    button.classList.toggle('off', mode === 'none');
    if (button.classList.contains('pdf-lines-toggle')) {
      button.textContent = modeTitle(mode);
    }
  });
}

function cycleExamLineMode() {
  setLineMode(nextLineMode());
}

function handleLineButtonClick(event) {
  var button = event.target && event.target.closest && event.target.closest('.a4-lines-proxy,.pdf-lines-toggle');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  if (event.stopImmediatePropagation) event.stopImmediatePropagation();
  cycleExamLineMode();
}

function syncLineGridMode() {
  ensureLineGridModeStyle();
  setLineMode(getLineMode());
}

ensureLineGridModeStyle();
document.addEventListener('click', handleLineButtonClick, true);
syncLineGridMode();
setTimeout(syncLineGridMode, 100);
setTimeout(syncLineGridMode, 300);
setTimeout(syncLineGridMode, 800);
setInterval(syncLineGridMode, 500);
window.cycleExamLineMode = cycleExamLineMode;
window.syncLineGridMode = syncLineGridMode;
