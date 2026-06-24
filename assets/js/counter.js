export function initCounter() {
  const statCards = document.querySelectorAll('.stat-card[data-count]');
  if (!statCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const valueEl = card.querySelector('.stat-value');
      if (!valueEl || valueEl.dataset.counted) return;
      valueEl.dataset.counted = 'true';

      const raw = card.dataset.count || '0';
      const target = parseInt(raw.replace(/[^\d]/g, ''), 10) || 0;
      const prefix = valueEl.textContent.match(/^\D+/)?.[0] || '';
      const suffix = valueEl.textContent.match(/\D+$/)?.[0] || '';
      const duration = 1600;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        valueEl.textContent = prefix + current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          valueEl.textContent = prefix + target + suffix;
          valueEl.classList.add('counted');
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(card);
    });
  }, { threshold: 0.3 });

  statCards.forEach(card => observer.observe(card));
}
