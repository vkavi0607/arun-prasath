export function initForm() {
  const form = document.getElementById('contact-form');
  const panel = document.querySelector('.connect-panel');
  const progressBar = document.getElementById('form-progress-bar');
  const submitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');
  
  // Success Card elements
  const successCard = document.getElementById('success-card');
  const summaryName = document.getElementById('summary-name');
  const summaryEmail = document.getElementById('summary-email');
  const resetFormBtn = document.getElementById('reset-form-btn');
  
  if (!form || !panel || !progressBar || !submitBtn) return;

  // Form fields configuration
  const formFields = {
    name: {
      input: document.getElementById('name'),
      group: document.getElementById('name').closest('.form-group'),
      validationMsg: document.getElementById('name-validation'),
      isValid: false,
      isTouched: false,
      validate() {
        const value = this.input.value.trim();
        if (value.length === 0) {
          this.isValid = false;
          return 'Name is required.';
        }
        this.isValid = true;
        return '';
      }
    },
    company: {
      input: document.getElementById('company'),
      group: document.getElementById('company').closest('.form-group'),
      validationMsg: document.getElementById('company-validation'),
      isValid: true, // optional field is always valid
      isTouched: false,
      validate() {
        this.isValid = true;
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      group: document.getElementById('email').closest('.form-group'),
      validationMsg: document.getElementById('email-validation'),
      isValid: false,
      isTouched: false,
      validate() {
        const value = this.input.value.trim();
        if (value.length === 0) {
          this.isValid = false;
          return 'Email address is required.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          this.isValid = false;
          return 'Please enter a valid email address.';
        }
        this.isValid = true;
        return '';
      }
    },
    message: {
      input: document.getElementById('message'),
      group: document.getElementById('message').closest('.form-group'),
      validationMsg: document.getElementById('message-validation'),
      isValid: false,
      isTouched: false,
      validate() {
        const value = this.input.value.trim();
        if (value.length === 0) {
          this.isValid = false;
          return 'Please write a brief message.';
        }
        if (value.length < 10) {
          this.isValid = false;
          return `Message is too short. Please add at least ${10 - value.length} more characters.`;
        }
        this.isValid = true;
        return '';
      }
    }
  };

  // SVG Checkmark icon for valid state
  const checkmarkSVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;

  // Helper to toggle has-value class for floating labels
  function updateFloatingLabel(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    if (input.value.trim().length > 0) {
      group.classList.add('has-value');
    } else {
      group.classList.remove('has-value');
    }
  }

  // Initialize validation status icons and floating labels (handles autofill)
  Object.values(formFields).forEach(field => {
    const iconContainer = field.group.querySelector('.validation-status-icon');
    if (iconContainer) iconContainer.innerHTML = checkmarkSVG;
    updateFloatingLabel(field.input);
  });

  /* ==========================================
   * 1. AUTO-EXPAND TEXTAREA & CHARACTER COUNTER
   * ========================================== */
  const messageTextarea = formFields.message.input;
  const charCounter = document.getElementById('char-counter');
  const maxChars = 1000;

  function adjustTextareaHeight() {
    messageTextarea.style.height = 'auto';
    messageTextarea.style.height = `${messageTextarea.scrollHeight}px`;
  }

  function updateCharCounter() {
    if (!charCounter) return;
    const len = messageTextarea.value.length;
    charCounter.textContent = `${len} / ${maxChars}`;

    if (len >= maxChars) {
      charCounter.className = 'char-counter at-limit';
    } else if (len >= maxChars - 100) {
      charCounter.className = 'char-counter near-limit';
    } else {
      charCounter.className = 'char-counter';
    }
  }

  messageTextarea.addEventListener('input', () => {
    adjustTextareaHeight();
    updateCharCounter();
  });

  // Initial height adjust
  adjustTextareaHeight();

  /* ==========================================
   * 2. REAL-TIME VALIDATION & PROGRESS TRACKING
   * ========================================== */
  function updateFieldUI(field) {
    const errorMsg = field.validate();
    
    if (field.isValid) {
      field.group.classList.remove('is-invalid');
      if (field.isTouched || field.input.value.trim().length > 0) {
        field.group.classList.add('is-valid');
      } else {
        field.group.classList.remove('is-valid');
      }
      field.validationMsg.textContent = '';
    } else {
      field.group.classList.remove('is-valid');
      if (field.isTouched) {
        field.group.classList.add('is-invalid');
        field.validationMsg.textContent = errorMsg;
      } else {
        field.group.classList.remove('is-invalid');
        field.validationMsg.textContent = '';
      }
    }
  }

  function updateFormProgress() {
    const requiredFields = [formFields.name, formFields.email, formFields.message];
    const totalRequired = requiredFields.length;
    const validRequired = requiredFields.filter(f => f.isValid).length;
    
    const progressPercent = Math.round((validRequired / totalRequired) * 100);
    progressBar.style.width = `${progressPercent}%`;

    // Enable/disable submit button
    const isFormValid = validRequired === totalRequired;
    submitBtn.disabled = !isFormValid;
  }

  // Add event listeners to fields
  Object.values(formFields).forEach(field => {
    field.input.addEventListener('input', () => {
      updateFloatingLabel(field.input);
      field.validate();
      if (field.isValid) {
        updateFieldUI(field);
      } else if (field.isTouched) {
        updateFieldUI(field);
      } else {
        field.group.classList.remove('is-valid');
      }
      updateFormProgress();
    });

    field.input.addEventListener('blur', () => {
      updateFloatingLabel(field.input);
      field.isTouched = true;
      updateFieldUI(field);
      updateFormProgress();
    });

    field.input.addEventListener('change', () => {
      updateFloatingLabel(field.input);
    });
  });

  /* ==========================================
   * 3. SUBMISSION FLOW (WHATSAPP INQUIRY)
   * ========================================== */
  let formulatedMessageText = '';

  form.addEventListener('submit', event => {
    event.preventDefault();

    // Final client-side check
    const requiredFields = [formFields.name, formFields.email, formFields.message];
    const isAllValid = requiredFields.every(f => {
      f.isTouched = true;
      updateFieldUI(f);
      return f.isValid;
    });

    if (!isAllValid) {
      updateFormProgress();
      return;
    }

    // Set button to loading state
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    formStatus.textContent = 'Preparing WhatsApp message...';
    formStatus.style.color = 'var(--color-text-soft)';

    const name = formFields.name.input.value.trim();
    const company = formFields.company.input.value.trim();
    const email = formFields.email.input.value.trim();
    const message = formFields.message.input.value.trim();

    // Formulate message body
    const msgArray = [
      'Hello Arun Prasath,',
      '',
      'I would like to discuss a business requirement.',
      `Name: ${name}`,
      company ? `Company: ${company}` : '',
      `Email: ${email}`,
      '',
      `Message: ${message}`
    ].filter(Boolean);

    formulatedMessageText = msgArray.join('\n');

    // Simulate connection delay for premium micro-experience (800ms)
    setTimeout(() => {
      const phone = form.dataset.whatsappPhone || '919894400663';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(formulatedMessageText)}`;
      window.open(url, '_blank');

      // Transition to Success Card
      showSuccessCard(name, email);
    }, 800);
  });

  function showSuccessCard(name, email) {
    // Hide form with fade
    form.style.transition = 'opacity 300ms ease, transform 300ms ease';
    form.style.opacity = '0';
    form.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      form.style.display = 'none';
      panel.classList.add('show-success');
      
      // Update success card details
      summaryName.textContent = name;
      summaryEmail.textContent = email;

      // Show success card
      successCard.style.display = 'flex';
      successCard.setAttribute('aria-hidden', 'false');
      
      // Clear submit button loading state
      submitBtn.classList.remove('is-loading');
      formStatus.textContent = '';
    }, 300);
  }

  /* ==========================================
   * 4. SUCCESS CARD RESET
   * ========================================== */
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      // Hide success card
      successCard.style.display = 'none';
      successCard.setAttribute('aria-hidden', 'true');
      panel.classList.remove('show-success');

      // Reset form fields
      form.reset();
      Object.values(formFields).forEach(field => {
        field.isValid = field.input.id === 'company'; // company is optional, hence valid
        field.isTouched = false;
        field.group.classList.remove('is-valid', 'is-invalid');
        field.validationMsg.textContent = '';
      });

      // Reset textarea height and counters
      adjustTextareaHeight();
      updateCharCounter();

      // Show form
      form.style.display = 'grid';
      form.style.opacity = '1';
      form.style.transform = 'translateY(0)';

      // Reset progress bar
      updateFormProgress();
    });
  }

  /* ==========================================
   * 5. DIRECT CONTACT BADGES COPY ACTIONS
   * ========================================== */
  const contactBadges = document.querySelectorAll('.contact-badge');

  contactBadges.forEach(badge => {
    const copyValue = badge.getAttribute('data-copy-value');
    const copyBtn = badge.querySelector('.badge-copy-btn');
    const originalTooltip = badge.getAttribute('data-tooltip') || 'Click to Copy';

    if (!copyValue || !copyBtn) return;

    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation(); // prevent triggering anchor link

      try {
        await navigator.clipboard.writeText(copyValue);
        
        // Show tooltip success state
        badge.setAttribute('data-tooltip', 'Copied to Clipboard!');
        badge.classList.add('copied');
        
        // Temporarily highlight the badge icon
        copyBtn.style.color = '#10B981';

        setTimeout(() => {
          badge.setAttribute('data-tooltip', originalTooltip);
          badge.classList.remove('copied');
          copyBtn.style.color = '';
        }, 2500);
      } catch (err) {
        console.error('Failed to copy contact: ', err);
      }
    });
  });
}
