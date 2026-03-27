// Reading progress bar — shows how far through the page the user has scrolled
(function () {
  var bar = document.querySelector('.reading-progress');
  if (!bar) return;
  function update() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
