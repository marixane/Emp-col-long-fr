const markEmptyAutresGroups = () => {
  if (!document.body.classList.contains('cahier-tab-active')) return;
  const timetablePage = Array.from(document.querySelectorAll('.cahier-page'))
    .find((page) => page.querySelector('.timetable-table'));
  if (!timetablePage) return;

  const groupsWrap = Array.from(timetablePage.children).find((child) => {
    const style = child.getAttribute('style') || '';
    return style.includes('grid-template-columns: repeat(5');
  });
  if (!groupsWrap) return;

  Array.from(groupsWrap.children).forEach((group) => {
    const title = String(group.children?.[0]?.textContent || '').trim().toUpperCase();
    const body = group.children?.[1];
    const hasRealClass = Boolean(body?.querySelector('span'));
    const wantedClass = title === 'AUTRES' ? (hasRealClass ? 'cahier-filled-other-group' : 'cahier-empty-other-group') : '';

    if (group.dataset.autresState === wantedClass) return;
    group.dataset.autresState = wantedClass;
    group.classList.remove('cahier-empty-other-group', 'cahier-filled-other-group');
    if (wantedClass) group.classList.add(wantedClass);
  });
};

let autresGroupsRaf = 0;
const scheduleMarkEmptyAutresGroups = () => {
  if (autresGroupsRaf) return;
  autresGroupsRaf = window.requestAnimationFrame(() => {
    autresGroupsRaf = 0;
    markEmptyAutresGroups();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', scheduleMarkEmptyAutresGroups, { once: true });
} else {
  scheduleMarkEmptyAutresGroups();
}

new MutationObserver(scheduleMarkEmptyAutresGroups).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});
