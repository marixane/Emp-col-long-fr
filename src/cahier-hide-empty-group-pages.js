const getHomeworkPageTitle = (page) => String(
  page.querySelector('.homework-page > div:first-child > div:first-child')?.textContent ||
  page.firstElementChild?.firstElementChild?.textContent ||
  ''
).trim();

const getClassGroupStates = () => {
  const timetablePage = Array.from(document.querySelectorAll('.cahier-page'))
    .find((page) => page.querySelector('.timetable-table'));

  const groupsWrap = Array.from(timetablePage?.children || []).find((child) => {
    const style = String(child.getAttribute('style') || '');
    return style.includes('grid-template-columns: repeat(5');
  });

  return Array.from(groupsWrap?.children || []).map((group) => ({
    title: String(group.children?.[0]?.textContent || '').trim(),
    hasClass: Boolean(group.children?.[1]?.querySelector('span'))
  })).filter((group) => group.title);
};

const applyEmptyGroupPageVisibility = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;

  const groupStates = getClassGroupStates();
  const visibleTitles = new Set(groupStates.filter((group) => group.hasClass).map((group) => group.title));

  Array.from(document.querySelectorAll('.homework-page')).forEach((page) => {
    const title = getHomeworkPageTitle(page);
    page.style.display = visibleTitles.has(title) ? '' : 'none';
  });
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

window.setTimeout(scheduleEmptyGroupPageVisibility, 250);
window.setTimeout(scheduleEmptyGroupPageVisibility, 800);
window.setTimeout(scheduleEmptyGroupPageVisibility, 1600);

document.addEventListener('input', (event) => {
  if (event.target?.closest?.('.timetable-table')) window.setTimeout(scheduleEmptyGroupPageVisibility, 120);
}, { passive: true });
document.addEventListener('drop', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
document.addEventListener('mouseup', () => window.setTimeout(scheduleEmptyGroupPageVisibility, 150), { passive: true });
