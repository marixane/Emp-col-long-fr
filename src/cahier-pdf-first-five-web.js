const originalFetchForFirstFive = window.fetch.bind(window);

const cloneWebPage = (page) => {
  const clone = page.cloneNode(true);

  clone.querySelectorAll('script, style, link, button, #cahier-pdf-button-stable').forEach((node) => node.remove());
  clone.querySelectorAll('textarea').forEach((textarea) => {
    textarea.textContent = textarea.value;
    textarea.setAttribute('value', textarea.value);
  });
  clone.querySelectorAll('input').forEach((input) => input.setAttribute('value', input.value));

  clone.style.setProperty('width', '210mm', 'important');
  clone.style.setProperty('height', '297mm', 'important');
  clone.style.setProperty('min-height', '297mm', 'important');
  clone.style.setProperty('max-height', '297mm', 'important');
  clone.style.setProperty('margin', '0', 'important');
  clone.style.setProperty('transform', 'none', 'important');
  clone.style.setProperty('zoom', '1', 'important');
  clone.style.setProperty('overflow', 'hidden', 'important');

  return clone;
};

window.fetch = async (input, init = {}) => {
  const url = typeof input === 'string' ? input : input?.url || '';
  if (!url.includes('/api/cahier-pdf') || !init?.body) {
    return originalFetchForFirstFive(input, init);
  }

  try {
    const payload = JSON.parse(init.body);
    if (!payload?.html) return originalFetchForFirstFive(input, init);

    const parser = new DOMParser();
    const documentPdf = parser.parseFromString(payload.html, 'text/html');
    const exportedPages = Array.from(documentPdf.querySelectorAll('.cahier-preview-zone > .a4-page, .cahier-preview-zone > .cahier-page'));
    const webPages = Array.from(document.querySelectorAll('.cahier-preview-zone > .a4-page, .cahier-preview-zone > .cahier-page')).slice(0, 5);

    webPages.forEach((webPage, index) => {
      const exportedPage = exportedPages[index];
      if (!exportedPage) return;
      exportedPage.replaceWith(documentPdf.importNode(cloneWebPage(webPage), true));
    });

    const finalStyle = documentPdf.createElement('style');
    finalStyle.textContent = `
      .cahier-preview-zone > .a4-page:nth-child(-n+5),
      .cahier-preview-zone > .cahier-page:nth-child(-n+5) {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 210mm !important;
        height: 297mm !important;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
      }

      .cahier-preview-zone > .a4-page:nth-child(-n+5) > *,
      .cahier-preview-zone > .cahier-page:nth-child(-n+5) > * {
        transform: none !important;
      }
    `;
    documentPdf.head.append(finalStyle);

    payload.html = documentPdf.documentElement.outerHTML;
    return originalFetchForFirstFive(input, { ...init, body: JSON.stringify(payload) });
  } catch {
    return originalFetchForFirstFive(input, init);
  }
};
