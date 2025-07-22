// Theme Toggle - Heller Modus als Standard
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme - Standard ist jetzt 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeToggle.checked = true;
} else {
  themeToggle.checked = false;
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
});