// ── shared.js — GMMN e.V. ──

// Progress bar
(function () {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  function update() {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
})();

// Cursor glow
(function () {
  const el = document.getElementById('cursor-glow');
  if (!el || window.matchMedia('(pointer:coarse)').matches) { if (el) el.style.display = 'none'; return; }
  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
  });
})();

// Navbar scroll
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Hamburger
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.classList.remove('open');
  }));
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

// Back to top
(function () {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// Photo upload helper for member cards
function loadPhoto(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const wrapper = input.parentElement;
    wrapper.style.backgroundImage = `url(${e.target.result})`;
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.backgroundPosition = 'center';
    wrapper.querySelector('span').style.display = 'none';
    const overlay = wrapper.querySelector('.photo-overlay');
    if (overlay) overlay.style.display = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}
