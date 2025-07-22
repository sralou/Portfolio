// Kontaktformular mit PHP backend
document.addEventListener('DOMContentLoaded', function() {
  const formsDE = document.getElementById('contactForm');
  const formsEN = document.getElementById('contactFormEn');
  
  [formsDE, formsEN].forEach(form => {
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        const language = form.id === 'contactForm' ? 'de' : 'en';
        
        // Button in Ladezustand versetzen
        submitBtn.disabled = true;
        submitBtn.textContent = language === 'de' ? 'Senden...' : 'Sending...';
        
        // FormData erstellen
        const formData = new FormData(form);
        formData.append('language', language);
        
        // AJAX-Request an PHP-Script
        fetch('contact.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Erfolgsmeldung anzeigen
            showMessage(data.message, 'success');
            form.reset();
          } else {
            // Fehlermeldung anzeigen
            showMessage(data.message, 'error');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          const errorMsg = language === 'de' ? 
            'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' :
            'An unexpected error occurred. Please try again later.';
          showMessage(errorMsg, 'error');
        })
        .finally(() => {
          // Button zurücksetzen
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
      });
    }
  });
  
  // Nachricht anzeigen
  function showMessage(message, type) {
    // Bestehende Nachrichten entfernen
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Neue Nachricht erstellen
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.textContent = message;
    
    // Nachricht vor dem ersten Formular einfügen
    const firstForm = document.querySelector('.contact-form');
    if (firstForm) {
      firstForm.parentNode.insertBefore(messageDiv, firstForm);
      
      // Smooth scroll zur Nachricht
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Nachricht nach 5 Sekunden ausblenden
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.classList.add('form-message--fade-out');
          setTimeout(() => {
            if (messageDiv.parentNode) {
              messageDiv.remove();
            }
          }, 300);
        }
      }, 5000);
    }
  }
});