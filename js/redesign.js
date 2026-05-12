// ========================================
// ONGY.CZ — redesign homepage
// Mobilní menu + scroll-reveal. Žádné závislosti.
// (Hex board má choreografovaný stagger v CSS přes transition-delay.)
// ========================================
(function () {
  // ── mobile menu ──
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.getElementById('nav-links');
  if (toggle && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Zavřít menu' : 'Otevřít menu');
      document.body.classList.toggle('menu-open', open);
    };
    toggle.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // ── scroll reveal ──
  var targets = document.querySelectorAll('[data-reveal], .hex');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }
})();
