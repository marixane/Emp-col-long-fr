document.addEventListener('click', function (event) {
  var target = event.target;
  if (target && target.closest && target.closest('.bar-mark')) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);
