// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  themeToggle.checked = false;
} else {
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});