async function loadComponent(elementId, path) {
  const response = await fetch(path);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-placeholder', '/components/navbar/navbar.html');
  loadComponent('about-section', '/components/main/sections/about.html');
  loadComponent(
    'education-section',
    '/components/main/sections/education.html'
  );
  loadComponent(
    'expertise-section',
    '/components/main/sections/expertise.html'
  );
  loadComponent('career-section', '/components/main/sections/career.html');
  loadComponent('footer-placeholder', '/components/footer/footer.html');
});
