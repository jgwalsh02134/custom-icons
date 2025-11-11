// Site-wide enhancements: mobile nav, active link highlighting, lazy loading fallback
(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navbar.classList.contains('open'));
    });
  }

  // Highlight active link by pathname if not already using aria-current
  const links = document.querySelectorAll('.navbar a[href]');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const target = a.getAttribute('href');
    if (target === current && !a.hasAttribute('aria-current')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // Lazy-load: if loading attribute not supported, fall back with IntersectionObserver
  const supportsLazy = 'loading' in HTMLImageElement.prototype;
  if (!supportsLazy) {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const img = e.target;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            io.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      imgs.forEach(img => {
        if (img.dataset.src) io.observe(img);
      });
    } else {
      // Fallback: just swap immediately
      imgs.forEach(img => { if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); } });
    }
  }
})();
