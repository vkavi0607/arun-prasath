export function initCounter() {
  const statCards = document.querySelectorAll('.stat-card, .hero-stat');
  if (!statCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const valueEl = card.querySelector('[data-count-up]');
      if (!valueEl || valueEl.dataset.counted) return;
      valueEl.dataset.counted = 'true';

      const rawTarget = card.dataset.target;
      const target = parseInt(rawTarget?.replace(/[^\d]/g, ''), 10) || 0;
      const prefix = card.dataset.prefix || valueEl.textContent.match(/^\D+/)?.[0] || '';
      const suffix = card.dataset.suffix || valueEl.textContent.match(/\D+$/)?.[0] || '';
      const duration = 2400;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(eased * target);
        valueEl.textContent = prefix + current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          valueEl.textContent = prefix + target + suffix;
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(card);
    });
  }, { threshold: 0.35 });

  statCards.forEach(card => observer.observe(card));
}
