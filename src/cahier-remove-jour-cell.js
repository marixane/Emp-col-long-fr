const removeJourHeaderCell = () => {
  document.querySelectorAll('.timetable-table thead tr').forEach((row) => {
    const cell = row.children?.[0];
    if (!cell) return;

    cell.textContent = '';
    cell.style.setProperty('position', 'relative', 'important');
    cell.style.setProperty('background', 'transparent', 'important');
    cell.style.setProperty('border-color', 'transparent', 'important');
    cell.style.setProperty('box-shadow', 'none', 'important');
    cell.style.setProperty('color', 'transparent', 'important');
    cell.style.setProperty('overflow', 'visible', 'important');

    let cover = cell.querySelector('.jour-cell-cover');
    if (!cover) {
      cover = document.createElement('span');
      cover.className = 'jour-cell-cover';
      cell.appendChild(cover);
    }

    cover.style.position = 'absolute';
    cover.style.top = '-6px';
    cover.style.right = '-6px';
    cover.style.bottom = '-6px';
    cover.style.left = '-6px';
    cover.style.background = '#fff';
    cover.style.border = '0';
    cover.style.boxShadow = 'none';
    cover.style.pointerEvents = 'none';
    cover.style.zIndex = '20';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', removeJourHeaderCell, { once: true });
} else {
  removeJourHeaderCell();
}

new MutationObserver(removeJourHeaderCell).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
