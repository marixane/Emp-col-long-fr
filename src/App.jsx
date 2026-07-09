import { useEffect } from 'react';
import Tab from './Tab.jsx';

const SIGNATURE_PAGE_CLASS = 'forced-signature-page';

function buildSignaturePage() {
  const preview = document.querySelector('.cahier-preview-zone');
  if (!preview) return;

  const existingForcedPage = preview.querySelector(`.${SIGNATURE_PAGE_CLASS}`);
  if (existingForcedPage) existingForcedPage.remove();

  const sourcePages = [...preview.querySelectorAll('.homework-page:not(.forced-signature-page)')];
  const sourcePage = sourcePages.at(-1);
  if (!sourcePage) return;

  const sourceEntry = sourcePage.querySelector(':scope > .homework-entry');
  if (!sourceEntry) return;

  const clonedPage = sourcePage.cloneNode(true);
  clonedPage.classList.add(SIGNATURE_PAGE_CLASS);

  clonedPage.querySelectorAll(':scope > .homework-entry').forEach((entry) => entry.remove());

  const signatureEntry = sourceEntry.cloneNode(true);
  signatureEntry.className = 'homework-entry cahier-extra-holiday-entry forced-signature-row';
  signatureEntry.style.setProperty('--homework-color', '#8b5cf6');

  const dateCell = signatureEntry.querySelector('.homework-date');
  const subjectCell = signatureEntry.querySelector('.homework-subject');
  const textCell = signatureEntry.querySelector('.homework-text');

  if (dateCell) {
    dateCell.textContent = 'SAMEDI 10/07/2027';
    dateCell.removeAttribute('contenteditable');
  }

  if (subjectCell) {
    subjectCell.innerHTML = '<div style="display:grid;grid-template-columns:110px 1fr;align-items:center;gap:6px;min-height:24px;padding:4px 7px;border:1px solid rgba(124,58,237,.25);border-radius:8px;background:rgba(139,92,246,.08);color:#5b21b6;font-family:Arial,sans-serif;line-height:1;overflow:hidden"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:100px;height:22px;border-radius:999px;background:#8b5cf6;color:white;font-size:12px;font-weight:900;white-space:nowrap">Administration</span><span></span></div>';
    subjectCell.removeAttribute('contenteditable');
  }

  if (textCell) {
    textCell.textContent = 'Signature procès-verbal';
    textCell.removeAttribute('contenteditable');
    textCell.style.color = '#5b21b6';
    textCell.style.fontSize = '21px';
    textCell.style.fontWeight = '900';
    textCell.style.lineHeight = '1.25';
    textCell.style.letterSpacing = '0.2px';
    textCell.style.textAlign = 'center';
    textCell.style.justifyContent = 'center';
    textCell.style.background = 'linear-gradient(90deg, rgba(221,214,254,.72), rgba(237,233,254,.95))';
    textCell.style.border = '1px solid rgba(124,58,237,.35)';
    textCell.style.borderRadius = '12px';
    textCell.style.margin = '8px 18px';
    textCell.style.padding = '10px 16px';
    textCell.style.overflow = 'hidden';
  }

  clonedPage.appendChild(signatureEntry);

  for (let index = 0; index < 4; index += 1) {
    const emptyEntry = sourceEntry.cloneNode(true);
    emptyEntry.className = 'homework-entry forced-empty-row';
    emptyEntry.removeAttribute('style');

    const emptyDate = emptyEntry.querySelector('.homework-date');
    const emptySubject = emptyEntry.querySelector('.homework-subject');
    const emptyText = emptyEntry.querySelector('.homework-text');

    if (emptyDate) {
      emptyDate.textContent = '';
      emptyDate.removeAttribute('contenteditable');
    }
    if (emptySubject) {
      emptySubject.textContent = '';
      emptySubject.removeAttribute('contenteditable');
      emptySubject.removeAttribute('style');
    }
    if (emptyText) {
      emptyText.textContent = '';
      emptyText.removeAttribute('contenteditable');
      emptyText.removeAttribute('style');
    }

    clonedPage.appendChild(emptyEntry);
  }

  preview.appendChild(clonedPage);
}

export default function App() {
  useEffect(() => {
    document.body.classList.add('cahier-tab-active');
    document.body.classList.remove('devoir-tab-active');

    let scheduled = false;
    const scheduleBuild = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        buildSignaturePage();
      });
    };

    scheduleBuild();
    const observer = new MutationObserver((mutations) => {
      const changedOutsideForcedPage = mutations.some((mutation) => {
        const target = mutation.target;
        return !(target instanceof Element && target.closest(`.${SIGNATURE_PAGE_CLASS}`));
      });
      if (changedOutsideForcedPage) scheduleBuild();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelector(`.${SIGNATURE_PAGE_CLASS}`)?.remove();
      document.body.classList.remove('cahier-tab-active');
    };
  }, []);

  return <Tab />;
}