export function initForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form || !status) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.textContent = 'Sending message…';
    status.style.color = '';

    const formData = new FormData(form);
    const endpoint = form.action;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = 'Message sent successfully. I will respond shortly.';
        status.style.color = 'var(--color-gold)';
        form.reset();
      } else {
        const data = await response.json();
        status.textContent = data.error || 'There was an issue sending your message. Please try again later.';
        status.style.color = '#ef4444';
      }
    } catch (error) {
      status.textContent = 'Unable to send message at this time. Please try again later.';
      status.style.color = '#ef4444';
    }
  });
}
