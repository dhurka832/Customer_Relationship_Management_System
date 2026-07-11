/* dashboard.js — plain functions, no dependencies */

// Returns "Good morning" / "Good afternoon" / "Good evening" for the current hour
function getGreeting() {
  var hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Writes the greeting + first name into the dashboard header
function renderGreeting() {
  var el = document.getElementById("dash-greeting");
  if (!el) return;
  var name = el.getAttribute("data-username") || "";
  el.textContent = getGreeting() + (name ? ", " + name : "") + ".";
}

// Formats and writes the current time into the top bar, refreshing every second
function tickClock() {
  var el = document.getElementById("top-bar-clock");
  if (!el) return;
  var now = new Date();
  var opts = { weekday: "short", month: "short", day: "numeric" };
  var dateStr = now.toLocaleDateString(undefined, opts);
  var timeStr = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  el.textContent = dateStr + " \u2022 " + timeStr;
}

// Counts a number up from 0 to target with easing — used on the stat cards
function animateCount(el, target, opts) {
  opts = opts || {};
  var duration = opts.duration || 1000;
  var prefix = opts.prefix || "";
  var decimals = opts.decimals || 0;
  var startTime = null;

  function step(ts) {
    if (!startTime) startTime = ts;
    var progress = Math.min((ts - startTime) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = target * eased;
    el.textContent = prefix + value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
  requestAnimationFrame(step);
}

// Fills in the horizontal conversion-rate bar
function animateRateBar(el, percent) {
  requestAnimationFrame(function () {
    el.style.width = Math.max(0, Math.min(100, percent)) + "%";
  });
}

// Collapses/expands the sidebar on small screens
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  renderGreeting();
  tickClock();
  setInterval(tickClock, 30000);

  document.querySelectorAll("[data-count-target]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count-target")) || 0;
    var prefix = el.getAttribute("data-count-prefix") || "";
    var decimals = parseInt(el.getAttribute("data-count-decimals"), 10) || 0;
    animateCount(el, target, { prefix: prefix, decimals: decimals });
  });

  var rateBar = document.getElementById("conversion-rate-bar");
  if (rateBar) {
    var pct = parseFloat(rateBar.getAttribute("data-rate")) || 0;
    animateRateBar(rateBar, pct);
  }

  var menuToggle = document.getElementById("sidebar-toggle");
  if (menuToggle) menuToggle.addEventListener("click", toggleSidebar);
});
