export const initTheme = () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || 'dark';
  
  // Apply initial theme
  body.setAttribute('data-theme', currentTheme);
  updateIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
};
