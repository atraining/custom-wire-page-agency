// Highlight active TOC entry based on scroll position
(function () {
  var toc = document.querySelector('.toc-sticky') || document.querySelector('.toc');
  if (!toc) return;

  // Collapse inline TOC on mobile to save space
  if (window.innerWidth < 768 && toc.tagName === 'DETAILS') toc.removeAttribute('open');

  var links = toc.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  var headings = [];
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) headings.push({ el: el, link: a });
  });

  // Also update mobile TOC if present
  var mobileToc = document.querySelector('.toc-mobile');
  var mobileLinks = mobileToc ? mobileToc.querySelectorAll('a[href^="#"]') : [];

  function update() {
    var scrollY = window.scrollY + 100;
    var active = null;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].el.offsetTop <= scrollY) active = headings[i];
    }
    links.forEach(function (a) { a.classList.remove('toc-active'); });
    mobileLinks.forEach(function (a) { a.classList.remove('toc-active'); });
    if (active) {
      active.link.classList.add('toc-active');
      // Sync mobile TOC
      var href = active.link.getAttribute('href');
      mobileLinks.forEach(function (a) {
        if (a.getAttribute('href') === href) a.classList.add('toc-active');
      });
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
