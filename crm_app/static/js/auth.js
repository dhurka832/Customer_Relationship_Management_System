
function togglePasswordField(inputId, btn) {
  var input = document.getElementById(inputId);
  if (!input) return;
  var showing = input.type === "text";
  input.type = showing ? "password" : "text";
  btn.innerHTML = showing
    ? '<i class="bi bi-eye"></i>'
    : '<i class="bi bi-eye-slash"></i>';
}

function checkPasswordRules(password) {
  return {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password)
  };
}

function updatePasswordStrength(password) {
  var rules = checkPasswordRules(password);
  var passed = Object.values(rules).filter(Boolean).length;

  ["rule-length", "rule-upper", "rule-number", "rule-special"].forEach(function (id, i) {
    var key = ["length", "upper", "number", "special"][i];
    var el = document.getElementById(id);
    if (el) el.classList.toggle("met", rules[key]);
  });

  var segments = document.querySelectorAll(".pw-meter i");
  var colors = ["#E9E7E0", "#DC2626", "#F59E0B", "#F0BE68", "#33B692"];
  var label = document.querySelector(".pw-meter-label");
  var labels = ["", "Weak", "Okay", "Good", "Strong"];

  segments.forEach(function (seg, i) {
    seg.style.background = i < passed ? colors[passed] : "#E9E7E0";
  });
  if (label) {
    label.textContent = password.length ? labels[passed] + " password" : "Use 6+ characters with a mix of letters, numbers & symbols";
    label.style.color = password.length ? colors[passed] : "#9CA3AF";
  }

  return passed === 4;
}

function checkPasswordsMatch(password, confirm) {
  var errorEl = document.getElementById("password-match-error");
  if (!errorEl) return true;
  var matches = confirm.length === 0 || password === confirm;
  errorEl.classList.toggle("show", !matches);
  return matches;
}

function setButtonLoading(btn) {
  btn.classList.add("is-loading");
  btn.disabled = true;
}

function animateTickerValue(el, target, prefix, suffix) {
  var start = 0;
  var duration = 1200;
  var startTime = null;

  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = Math.round(start + (target - start) * eased);
    el.textContent = (prefix || "") + value.toLocaleString() + (suffix || "");
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-toggle-password]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      togglePasswordField(btn.getAttribute("data-toggle-password"), btn);
    });
  });

  var pw = document.getElementById("password");
  var pw2 = document.getElementById("password2");
  if (pw && document.querySelector(".pw-meter")) {
    pw.addEventListener("input", function () {
      updatePasswordStrength(pw.value);
      if (pw2 && pw2.value) checkPasswordsMatch(pw.value, pw2.value);
    });
  }
  if (pw2) {
    pw2.addEventListener("input", function () {
      checkPasswordsMatch(pw.value, pw2.value);
    });
  }

  document.querySelectorAll("form.auth-form").forEach(function (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector(".btn-auth");
      if (btn) setButtonLoading(btn);
    });
  });

  document.querySelectorAll("[data-ticker-value]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-ticker-value"), 10) || 0;
    var prefix = el.getAttribute("data-ticker-prefix") || "";
    var suffix = el.getAttribute("data-ticker-suffix") || "";
    animateTickerValue(el, target, prefix, suffix);
  });
});
