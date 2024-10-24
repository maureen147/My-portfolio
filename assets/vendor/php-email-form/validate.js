document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = this;
  const loadingMessage = form.querySelector('.loading');
  const errorMessage = form.querySelector('.error-message');
  const successMessage = form.querySelector('.sent-message');

  // Show loading message
  loadingMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  // Collect form data
  const formData = new FormData(form);

  try {
    // Send form data to Formspree
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    // Hide loading message
    loadingMessage.style.display = 'none';

    if (response.ok) {
      // Show success message and reset form
      successMessage.style.display = 'block';
      form.reset();
    } else {
      // Show error message if submission fails
      const data = await response.json();
      errorMessage.textContent = data.error || 'Form submission failed!';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    // Show error message in case of network error
    loadingMessage.style.display = 'none';
    errorMessage.textContent = 'There was an error. Please try again.';
    errorMessage.style.display = 'block';
  }
});
