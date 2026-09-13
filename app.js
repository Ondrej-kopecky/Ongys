const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  const setOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  };
  menuButton.addEventListener('click', () => setOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => {
    const t = e.target.closest('.sub-toggle');
    if (t && window.matchMedia('(max-width: 700px)').matches) {
      e.preventDefault(); const item = t.closest('.has-sub'); const open = !item.classList.contains('open');
      item.classList.toggle('open', open); t.setAttribute('aria-expanded', String(open)); return;
    }
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 701px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
}

const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.archive-card, .project-row')];

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach((project) => {
      project.hidden = selected !== 'all' && project.dataset.status !== selected;
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project-card, .about, .workshop-card, .now-list, .principle-grid, .notes-grid, .home-about').forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}
