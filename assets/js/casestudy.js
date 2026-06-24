const cases = {
  case1: {
    title: 'South India Market Expansion for OMIS',
    challenge: 'OMIS had limited brand awareness and market presence in South India. No structured sales pipeline.',
    action: 'Conducted industrial sector-wise ground surveys. Built relationships with project consultants, PEB manufacturers, and EPC contractors. Positioned OMIS as a premium, Tier-1 trusted brand.',
    result: 'Significant market share growth. New client wins across Automotive, Aerospace, and Industrial segments. Established OMIS as a top-5 crane brand in South India.'
  },
  case2: {
    title: 'High-Value Project Win — IGCAR, DAE Kalpakkam',
    challenge: 'India\'s premier atomic research institution required specialized crane solutions meeting extremely high safety and quality standards.',
    action: 'Deep technical consultation to understand the unique lifting application. Collaborated with engineering team to propose a solution meeting nuclear-grade standards with full compliance documentation.',
    result: 'Successfully delivered a high-value, safety-critical project — establishing credibility with one of India\'s most demanding clients and opening doors to defence & space sector business.'
  },
  case3: {
    title: 'Capital Cranes — Strategic Partnership for South India',
    challenge: 'Capital Cranes needed a market strategy and execution partner to establish brand presence and grow volume business across South India through multiple channels.',
    action: 'Developed a comprehensive South India expansion plan covering Direct Sales, B2B/B2C, Referral & Digital Marketing. Built relationships with key industry stakeholders. Structured a 3-year market share growth roadmap.',
    result: 'Defined a clear go-to-market strategy positioning Capital Cranes as a top-5 manufacturer in South India with structured pipeline development across Tamil Nadu, Karnataka, AP, and Telangana.'
  }
};

export function initCaseStudyModal() {
  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('modal-content');
  const closeButton = document.getElementById('modal-close');
  const cards = document.querySelectorAll('.case-card');

  if (!modal || !modalContent || !closeButton) return;

  let lastFocused = null;

  function openCase(key) {
    const data = cases[key];
    if (!data) return;
    modalContent.innerHTML = `
      <h2 id="modal-title">${data.title}</h2>
      <div class="case-label case-label-challenge">Challenge</div>
      <p>${data.challenge}</p>
      <div class="case-label case-label-action">Action</div>
      <p>${data.action}</p>
      <div class="case-label case-label-result">Result</div>
      <p>${data.result}</p>
    `;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    // accessibility: focus management
    lastFocused = document.activeElement;
    closeButton.focus();
  }

  function closeCase() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openCase(card.dataset.case));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCase(card.dataset.case);
      }
    });
  });

  closeButton.addEventListener('click', closeCase);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeCase();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeCase();
    }
  });
}
