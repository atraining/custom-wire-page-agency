// Show page H1 text in header when user scrolls past the H1
(function () {
  var h1 = document.querySelector('main h1');
  var el = document.querySelector('.scroll-title');
  if (!h1 || !el) return;
  el.textContent = el.dataset.shortTitle || h1.innerText.replace(/\n/g, ' ');
  var brand = document.querySelector('.content-nav-brand');
  var observer = new IntersectionObserver(function (entries) {
    var scrolled = !entries[0].isIntersecting;
    // When H1 leaves viewport (not intersecting), show scroll title + brand
    el.classList.toggle('visible', scrolled);
    if (brand) brand.classList.toggle('visible', scrolled);
  }, { threshold: 0 });
  observer.observe(h1);
})();
