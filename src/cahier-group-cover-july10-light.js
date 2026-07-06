const EXIT_TEXT = 'Le procès-verbal de sortie';

const dateInfo = (text) => {
  const m = String(text || '').match(/(\d{2})\/(\d{2})/);
  return m ? { d: Number(m[1]), m: Number(m[2]) } : null;
};

const afterJuly10 = (text) => {
  const x = dateInfo(text);
  return x?.m === 7 && x.d > 10;
};

const pageTitle = (page) => String(page.querySelector('.homework-page > div:first-child > div:first-child')?.textContent || '').trim();

const groups = () => {
  const list = [];
  document.querySelectorAll('.homework-page').forEach((page) => {
    const title = pageTitle(page);
    if (!title) return;
    let g = list.find((item) => item.title === title);
    if (!g) {
      g = { title, pages: [], color: page.style.getPropertyValue('--group-color') || '#e0f2fe' };
      list.push(g);
    }
    g.pages.push(page);
  });
  return list;
};

const coverPage = (g) => {
  const page = document.createElement('div');
  page.className = 'a4-page cahier-page cahier-light-group-cover';
  page.style.cssText = `position:relative;display:flex;align-items:center;justify-content:center;padding:70px;--group-color:${g.color};`;
  page.innerHTML = `<div style="width:100%;min-height:620px;border-radius:32px;border:5px solid rgba(17,24,39,.18);background:linear-gradient(180deg, ${g.color}, white);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 18px 45px rgba(17,24,39,.14)"><div style="font-size:32px;font-weight:900;color:#111827;text-transform:uppercase;margin-bottom:24px">${g.title}</div><div style="width:70%;height:3px;background:rgba(17,24,39,.2);border-radius:999px;margin-bottom:26px"></div><div style="font-size:20px;font-weight:800;color:#374151">Cahier de texte annuel</div></div>`;
  return page;
};

const exitEntry = () => {
  const s = document.createElement('section');
  s.className = 'homework-entry cahier-extra-holiday-entry cahier-light-exit-entry';
  s.style.setProperty('--homework-color', '#f97316');
  s.innerHTML = `<div class="homework-date">VENDREDI 10/07</div><div class="homework-content"><div class="homework-subject"><div><span>Administration</span></div></div><div class="homework-text" style="color:#9a3412;font-size:21px;font-weight:900;text-align:center;background:linear-gradient(90deg,rgba(254,215,170,.38),rgba(254,243,199,.62));border-radius:12px;margin:8px 18px;padding:10px 16px">${EXIT_TEXT}</div></div>`;
  return s;
};

const exitPage = (g) => {
  const src = g.pages[g.pages.length - 1];
  const page = document.createElement('div');
  page.className = 'a4-page cahier-page homework-page cahier-light-exit-page';
  page.style.cssText = `position:relative;padding-top:60px;--group-color:${g.color};`;
  const header = src.firstElementChild?.cloneNode(true);
  if (header) page.append(header);
  page.append(exitEntry());
  return page;
};

const applyLightCovers = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  document.querySelectorAll('.cahier-light-group-cover,.cahier-light-exit-page,.cahier-light-exit-entry').forEach((n) => n.remove());
  document.querySelectorAll('.homework-entry').forEach((entry) => {
    if (afterJuly10(entry.querySelector('.homework-date')?.textContent)) entry.remove();
  });
  groups().forEach((g) => {
    g.pages[0].before(coverPage(g));
    if (g.pages.some((p) => String(p.textContent || '').includes(EXIT_TEXT))) return;
    const last = g.pages[g.pages.length - 1];
    if (last.querySelectorAll('.homework-entry').length >= 5) last.after(exitPage(g));
    else last.append(exitEntry());
  });
};

const scheduleLightCovers = () => window.setTimeout(applyLightCovers, 250);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleLightCovers, { once: true });
else scheduleLightCovers();
window.setTimeout(applyLightCovers, 1000);
window.setTimeout(applyLightCovers, 2500);
document.addEventListener('change', scheduleLightCovers, { passive: true });
document.addEventListener('drop', scheduleLightCovers, { passive: true });
