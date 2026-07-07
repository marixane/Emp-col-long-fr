import './cahier-page5-activities.css';
import './cahier-page5-activities.js';

const formatExamDate = (start, end) => {
  const first = String(start || '').trim();
  const second = String(end || '').trim();
  if (!second || first === second) return first;
  return `${first} - ${second}`;
};

const mergeExamDates = () => {
  document.querySelectorAll('.cahier-exams-list table').forEach((table) => {
    const headerRow = table.querySelector('thead tr');
    if (headerRow && !headerRow.dataset.singleDateReady) {
      const headers = headerRow.querySelectorAll('th');
      if (headers.length >= 4) {
        headers[0].textContent = 'DATE';
        headers[1].remove();
        headerRow.dataset.singleDateReady = 'true';
      }
    }

    table.querySelectorAll('tbody tr').forEach((row) => {
      if (row.dataset.singleDateReady) return;
      const cells = row.querySelectorAll('td');
      if (cells.length >= 4) {
        cells[0].textContent = formatExamDate(cells[0].textContent, cells[1].textContent);
        cells[1].remove();
        row.dataset.singleDateReady = 'true';
      }
    });
  });
};

const observer = new MutationObserver(() => mergeExamDates());

const startExamDateMerge = () => {
  mergeExamDates();
  observer.observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startExamDateMerge, { once: true });
} else {
  startExamDateMerge();
}
