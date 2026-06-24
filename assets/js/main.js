import { initNav } from './nav.js';
import { initTabs } from './tabs.js';
import { initTicker } from './ticker.js';
import { initCounter } from './counter.js';
import { initCaseStudyModal } from './casestudy.js';
import { initForm } from './form.js';

AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-quart',
  offset: 60,
  delay: 0,
});

initNav();
initTabs();
initTicker();
initCounter();
initCaseStudyModal();
initForm();
