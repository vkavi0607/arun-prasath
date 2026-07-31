export function initForm() {
  const form = document.getElementById('contact-form');
  const panel = document.querySelector('.connect-panel');
  const submitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');
  
  // Success Card elements
  const successCard = document.getElementById('success-card');
  const resetFormBtn = document.getElementById('reset-form-btn');
  
  if (!form || !panel || !submitBtn) return;

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

  // Initialize form validation state (no floating labels or checkmarks)
  Object.values(formFields).forEach(field => {
    // Only bind initial states if needed
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
      field.validationMsg.textContent = '';
    } else {
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
    
    // Progress calculation can be used here if needed later
    // const isFormValid = validRequired === totalRequired;
  }

  // Add event listeners to fields
  Object.values(formFields).forEach(field => {
    field.input.addEventListener('input', () => {
      field.validate();
      if (field.isValid || field.isTouched) {
        updateFieldUI(field);
      }
      updateFormProgress();
    });

    field.input.addEventListener('blur', () => {
      field.isTouched = true;
      updateFieldUI(field);
      updateFormProgress();
    });
  });

  /* ==========================================
   * 3. SUBMISSION FLOW (WHATSAPP INQUIRY)
   * ========================================== */
  let formulatedMessageText = '';

  form.addEventListener('submit', event => {
    event.preventDefault();

    // Honeypot check — silently reject bot submissions
    const honeypot = document.getElementById('honeypot-field');
    if (honeypot && honeypot.value.length > 0) {
      // Bot detected — silently do nothing
      return;
    }

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

    const name = formFields.name.input.value.trim();
    const email = formFields.email.input.value.trim();

    submitBtn.classList.add('is-loading');
    formStatus.textContent = 'Sending your request...';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          showSuccessCard(name, email);
          return;
        }
        return response.json().then(data => {
          throw new Error(data.error || 'Unable to submit the form.');
        });
      })
      .catch(() => {
        submitBtn.classList.remove('is-loading');
        formStatus.textContent = 'Submission failed. Please try again in a moment.';
      });
  });


  function showSuccessCard(name, email) {
    // Hide form with fade
    form.style.transition = 'opacity 300ms ease, transform 300ms ease';
    form.style.opacity = '0';
    form.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      form.style.display = 'none';
      panel.classList.add('show-success');
      
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
        field.group.classList.remove('is-invalid');
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

}
