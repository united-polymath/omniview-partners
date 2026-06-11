// OmniView Partners — shared site interactions
(function () {
  // Nav background on scroll
  const navBg = document.getElementById('nav-bg');
  if (navBg) {
    const onScroll = () => {
      if (window.scrollY > 40) navBg.classList.add('bg-ink/90', 'shadow-lg', 'shadow-ink/20');
      else navBg.classList.remove('bg-ink/90', 'shadow-lg', 'shadow-ink/20');
    };
    window.addEventListener('scroll', onScroll); onScroll();
  }

  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.add('hidden')));
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4 * 80) + 'ms'; io.observe(el); });

  // Animate any score bars when their group scrolls into view
  document.querySelectorAll('[data-bar]').forEach((row, i) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const v = row.getAttribute('data-bar');
          const b = row.querySelector('.bar');
          if (b) { b.style.transition = 'width 1.1s cubic-bezier(.16,1,.3,1)'; setTimeout(() => b.style.width = v + '%', (i % 5) * 120); }
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(row);
  });

  // Contact form fake submit
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault(); form.reset();
      const done = document.getElementById('form-done');
      if (done) done.classList.remove('hidden');
    });
  }
})();
