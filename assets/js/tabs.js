/* Wire — tab panel switching.
   CSS-only tabs can't reliably select the nth panel matching the nth radio,
   so this tiny script handles the show/hide on radio change. */
document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("tab-radio")) return;
  var tabs = e.target.closest(".tabs");
  if (!tabs) return;
  var radios = tabs.querySelectorAll(".tab-radio");
  var panels = tabs.querySelectorAll(".tab-panel");
  var idx = Array.prototype.indexOf.call(radios, e.target);
  panels.forEach(function (p, i) {
    p.style.display = i === idx ? "block" : "none";
  });
});
