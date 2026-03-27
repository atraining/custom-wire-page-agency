/* Wire — form handling (Formspark + Botpoison + honeypot + page tracking)
   Zero config in markdown. Everything driven by wire.yml.
   Page visit tracking is handled by the inline script in base.html
   (runs on ALL pages). This file only handles form submission. */
(function () {
  "use strict";

  var form = document.querySelector("form");
  if (!form) return;

  var cfg = window.__wire_form;
  if (!cfg || !cfg.id) return;

  var btn = form.querySelector('button[type="submit"], input[type="submit"]');
  var btnText = btn ? btn.textContent : "";

  // Inject honeypot (hidden from humans, bots fill it)
  var honey = document.createElement("input");
  honey.type = "text";
  honey.name = "_gotcha";
  honey.style.display = "none";
  honey.tabIndex = -1;
  honey.autocomplete = "off";
  form.appendChild(honey);

  // Inject page source tracker
  var source = document.createElement("input");
  source.type = "hidden";
  source.name = "wire_source";
  source.value = window.location.href;
  form.appendChild(source);

  // Fill visited pages on first interaction (not on submit — too late if anything fails)
  function fillVisited() {
    var journey = JSON.parse(localStorage.getItem("_wire_visited") || "[]");
    if (journey.length) {
      var el = form.querySelector('[name="wire_visited"]');
      if (el) el.value = JSON.stringify(journey);
    }
  }
  form.addEventListener("focusin", fillVisited, { once: true });

  // Create success message element
  var success = document.createElement("div");
  success.className = "form-success";
  success.style.display = "none";
  success.innerHTML = "<p>" + (cfg.success || "Thank you! We'll be in touch.") + "</p>";
  form.parentNode.insertBefore(success, form.nextSibling);

  // Botpoison: lazy-load only if key is configured
  function getBotpoisonSolution() {
    if (!cfg.botpoison) return Promise.resolve(null);
    return new Promise(function (resolve) {
      if (window.Botpoison) {
        var bp = new window.Botpoison({ publicKey: cfg.botpoison });
        return bp.challenge().then(function (r) { resolve(r.solution); });
      }
      var s = document.createElement("script");
      s.src = "https://unpkg.com/@botpoison/browser";
      s.onload = function () {
        var bp = new window.Botpoison({ publicKey: cfg.botpoison });
        bp.challenge().then(function (r) { resolve(r.solution); });
      };
      s.onerror = function () { resolve(null); };
      document.head.appendChild(s);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending\u2026";
    }

    // Collect form data as JSON
    var data = {};
    var checkboxes = {};
    var els = form.querySelectorAll("input, select, textarea");
    els.forEach(function (el) {
      if (!el.name) return;
      if (el.type === "checkbox") {
        if (!checkboxes[el.name]) checkboxes[el.name] = [];
        if (el.checked) checkboxes[el.name].push(el.value || "on");
      } else if (el.type === "radio") {
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    });
    // Merge checkbox groups as comma-separated
    for (var key in checkboxes) {
      if (checkboxes[key].length) data[key] = checkboxes[key].join(", ");
    }

    // Attach visited pages journey (raw JSON — preserves full ISO timestamps across days)
    var journey = JSON.parse(localStorage.getItem("_wire_visited") || "[]");
    if (journey.length) {
      data.wire_visited = JSON.stringify(journey);
    }

    getBotpoisonSolution().then(function (solution) {
      if (solution) data._botpoison = solution;

      return fetch("https://submit-form.com/" + cfg.id, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data),
      });
    })
    .then(function () {
      form.style.display = "none";
      success.style.display = "block";
    })
    .catch(function () {
      if (btn) {
        btn.disabled = false;
        btn.textContent = btnText;
      }
      alert("Something went wrong. Please try again.");
    });
  });
})();
