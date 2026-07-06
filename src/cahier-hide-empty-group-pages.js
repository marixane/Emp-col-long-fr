const ensureEmptyGroupPageStyle = () => {
  if (document.getElementById('cahier-empty-group-page-style')) return;
  const style = document.createElement('style');
  style.id = 'cahier-empty-group-page-style';
  style.textContent = 'body.cahier-tab-active .homework-page{display:block!important;}';
  document.head.appendChild(style);
};

const applyEmptyGroupPageVisibility = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  ensureEmptyGroupPageStyle();
  document.querySelectorAll('.homework-page').forEach((page) => page.classList.add('cahier-visible-group-page'));
};

let emptyGroupPagesRaf = 0;
const scheduleEmptyGroupPageVisibility = () => {
  if (emptyGroupPagesRaf) return;
  emptyGroupPagesRaf = window.requestAnimationFrame(() => {
    emptyGroupPagesRaf = 0;
    applyEmptyGroupPageVisibility();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleEmptyGroupPageVisibility, { once: true });
} else {
  scheduleEmptyGroupPageVisibility();
}

window.setTimeout(scheduleEmptyGroupPageVisibility, 150);
window.setTimeout(scheduleEmptyGroupPageVisibility, 500);
window.setTimeout(scheduleEmptyGroupPageVisibility, 1200);
window.setTimeout(scheduleEmptyGroupPageVisibility, 2200);

document.addEventListener('input', (event) => {
  if (event.target?.closest?.('.timetable-table')) window.setTimeout(scheduleEmptyGroupPageVisibility, 120);
}, { passive: true });
document.addEventListener('drop', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
document.addEventListener('mouseup', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
