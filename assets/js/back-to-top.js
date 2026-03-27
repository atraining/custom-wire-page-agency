// Show back-to-top button after scrolling 400px
(function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
})();
