function initListFilter(opts) {
  var searchInput = opts.searchId ? document.getElementById(opts.searchId) : null;
  var statusSelect = opts.statusId ? document.getElementById(opts.statusId) : null;
  var rows = document.querySelectorAll(opts.rowSelector);
  var countEl = opts.countId ? document.getElementById(opts.countId) : null;
  var noResultsRow = opts.noResultsId ? document.getElementById(opts.noResultsId) : null;

  function apply() {
    var term = (searchInput && searchInput.value || "").toLowerCase().trim();
    var status = statusSelect ? statusSelect.value : "";
    var visible = 0;

    rows.forEach(function (row) {
      var haystack = opts.searchFields
        .map(function (f) { return (row.dataset[f] || "").toLowerCase(); })
        .join(" ");
      var matchesTerm = !term || haystack.indexOf(term) !== -1;
      var matchesStatus = !status || row.dataset.status === status;
      var show = matchesTerm && matchesStatus;
      row.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible;
    if (noResultsRow) noResultsRow.style.display = visible === 0 ? "" : "none";
  }

  if (searchInput) searchInput.addEventListener("input", apply);
  if (statusSelect) statusSelect.addEventListener("change", apply);
  apply();
}

function copyToClipboard(text, btn) {
  var restore = function () {
    btn.classList.remove("copied");
    btn.innerHTML = '<i class="bi bi-clipboard"></i>';
  };
  navigator.clipboard.writeText(text).then(function () {
    btn.classList.add("copied");
    btn.innerHTML = '<i class="bi bi-check2"></i>';
    setTimeout(restore, 1500);
  });
}

function initDeleteConfirm(inputId, buttonId, expected) {
  var input = document.getElementById(inputId);
  var button = document.getElementById(buttonId);
  if (!input || !button) return;
  button.disabled = true;
  input.addEventListener("input", function () {
    button.disabled = input.value.trim().toLowerCase() !== expected.trim().toLowerCase();
  });
}

function shakeElement(el) {
  el.classList.remove("shake");
  void el.offsetWidth; // restart animation
  el.classList.add("shake");
}

function initRequiredFieldGuard(formSelector) {
  var form = document.querySelector(formSelector);
  if (!form) return;
  form.addEventListener("submit", function (e) {
    var required = form.querySelectorAll("[required]");
    for (var i = 0; i < required.length; i++) {
      if (!required[i].value || !required[i].value.trim()) {
        e.preventDefault();
        shakeElement(required[i].closest(".mb-3") || required[i]);
        required[i].focus();
        return;
      }
    }
  });
}

function initUnsavedGuard(formSelector) {
  var form = document.querySelector(formSelector);
  if (!form) return;
  var dirty = false;
  var fields = form.querySelectorAll("input, select, textarea");
  fields.forEach(function (f) {
    f.addEventListener("input", function () { dirty = true; });
    f.addEventListener("change", function () { dirty = true; });
  });
  form.addEventListener("submit", function () { dirty = false; });
  window.addEventListener("beforeunload", function (e) {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = "";
  });
}

function initCharCount(textareaId, counterId, max) {
  var textarea = document.getElementById(textareaId);
  var counter = document.getElementById(counterId);
  if (!textarea || !counter) return;
  function update() {
    var len = textarea.value.length;
    counter.textContent = max ? (len + " / " + max + " characters") : (len + " characters");
  }
  textarea.addEventListener("input", update);
  update();
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-copy-value]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      copyToClipboard(btn.getAttribute("data-copy-value"), btn);
    });
  });
});
