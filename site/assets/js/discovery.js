/* Discovery Reading System — loaded globally via base.html */
(function() {
  var layer = document.querySelector('[data-discovery]');
  if (!layer) return;

  var dataEl = document.querySelector('[data-discovery-data]');
  if (!dataEl) return;

  var data;
  try {
    data = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  var stepIds = Object.keys(data.steps);
  if (!stepIds.length && !data.hook) return;

  /* Activate the discovery layer (CSS: .discovery-active .discovery-layer) */
  document.body.classList.add('discovery-active');

  var hook = layer.querySelector('[data-hook]');
  var progress = layer.querySelector('.discovery-progress');
  var dots = layer.querySelectorAll('.progress-dot');
  var allSteps = layer.querySelectorAll('[data-step]');

  /* --- "Guide me through this" --- */
  var startBtn = layer.querySelector('[data-start-discovery]');
  if (startBtn) {
    startBtn.addEventListener('click', function() {
      if (hook) hook.classList.add('hidden');
      if (progress) progress.classList.add('visible');
      showStep(stepIds[0]);
    });
  }

  /* --- "Read the full article" from hook --- */
  var skipBtn = layer.querySelector('[data-skip-discovery]');
  if (skipBtn) {
    skipBtn.addEventListener('click', function() {
      collapseLayer();
      var article = document.querySelector('article') ||
                    document.querySelector('.md-content') ||
                    document.querySelector('main');
      if (article) {
        article.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* --- Delegated click handler for choice + read-more buttons --- */
  layer.addEventListener('click', function(e) {
    var nextBtn = e.target.closest('[data-next]');
    if (nextBtn) {
      showStep(nextBtn.getAttribute('data-next'));
      return;
    }

    var readBtn = e.target.closest('[data-read-section]');
    if (readBtn) {
      var sectionId = readBtn.getAttribute('data-read-section');
      collapseLayer();
      scrollToSection(sectionId);
    }
  });

  /* --- Show a step by ID, or exit if step doesn't exist --- */
  function showStep(id) {
    var target = layer.querySelector('[data-step="' + id + '"]');
    if (!target) {
      collapseLayer();
      var article = document.querySelector('article') ||
                    document.querySelector('.md-content') ||
                    document.querySelector('main');
      if (article) article.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    for (var i = 0; i < allSteps.length; i++) {
      allSteps[i].classList.remove('active');
    }
    /* Small delay so the browser processes the removal first */
    requestAnimationFrame(function() {
      target.classList.add('active');
    });
    /* Update progress dots */
    var idx = stepIds.indexOf(id);
    for (var j = 0; j < dots.length; j++) {
      if (j <= idx) {
        dots[j].classList.add('active');
      } else {
        dots[j].classList.remove('active');
      }
    }
  }

  /* --- Collapse the discovery layer --- */
  function collapseLayer() {
    layer.classList.add('collapsed');
    document.body.classList.remove('discovery-active');
  }

  /* --- Scroll to a section and highlight it for 3 seconds --- */
  function scrollToSection(id) {
    var target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth' });
    target.classList.add('discovery-highlight');

    setTimeout(function() {
      target.classList.add('fade-out');
    }, 2500);

    setTimeout(function() {
      target.classList.remove('discovery-highlight', 'fade-out');
    }, 3000);
  }
})();
