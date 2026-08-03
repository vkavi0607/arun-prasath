import { initNav } from './nav.js';
import { initTabs } from './tabs.js';
import { initTicker } from './ticker.js';
import { initCounter } from './counter.js';
import { initCaseStudyModal } from './casestudy.js';
import { initForm } from './form.js';

if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-quart',
    offset: 60,
    delay: 0
  });
} else {
  // AOS failed to load (network/integrity). Guard so rest of JS can run.
  // This prevents a missing AOS from blocking preloader removal and other scripts.
  console.warn('AOS not available; skipping AOS.init');
}

/* ==========================================
 * 8. FAQ ACCORDION LOGIC
 * ========================================== */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    const answer = question.nextElementSibling;
    
    // Close all other open FAQs
    faqQuestions.forEach(q => {
      if (q !== question) {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.style.maxHeight = null;
      }
    });
    
    if (isExpanded) {
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
    } else {
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

initNav();
initTabs();
initTicker();
initCounter();
initCaseStudyModal();
initForm();

const preloader = document.getElementById('preloader');
if (preloader) {
  window.setTimeout(() => {
    preloader.classList.add('is-hidden');
    window.setTimeout(() => preloader.remove(), 600);
  }, 2000);
}