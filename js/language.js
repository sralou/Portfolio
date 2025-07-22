// Language Toggle
const langBtn = document.getElementById('langBtn');
const langBtnEn = document.getElementById('langBtn-en');
const contentDE = document.getElementById('content-de');
const contentEN = document.getElementById('content-en');

// Check for saved language
const savedLang = localStorage.getItem('language') || 'de';
if (savedLang === 'en') {
  contentDE.classList.remove('active');
  contentEN.classList.add('active');
  document.documentElement.lang = 'en';
  updateAllText('en');
}

// Add event listeners to both language buttons
[langBtn, langBtnEn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      const currentLang = contentEN.classList.contains('active') ? 'en' : 'de';
      
      if (currentLang === 'en') {
        // Switch to German
        contentEN.classList.remove('active');
        contentDE.classList.add('active');
        document.documentElement.lang = 'de';
        localStorage.setItem('language', 'de');
        updateAllText('de');
      } else {
        // Switch to English
        contentDE.classList.remove('active');
        contentEN.classList.add('active');
        document.documentElement.lang = 'en';
        localStorage.setItem('language', 'en');
        updateAllText('en');
      }
    });
  }
});

// Update all text elements
function updateAllText(lang) {
  const elementsWithLangData = document.querySelectorAll('[data-de][data-en]');
  elementsWithLangData.forEach(element => {
    element.textContent = lang === 'de' ? element.getAttribute('data-de') : element.getAttribute('data-en');
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = localStorage.getItem('language') || 'de';
  updateAllText(currentLang);
});