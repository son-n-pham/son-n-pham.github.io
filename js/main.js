var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// // Script for navbar scrollspy to work
// var scrollSpy = new bootstrap.ScrollSpy(document.body, {
//   target: '#navbar-example',
// });

///////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// Create sectionObserver by IntersectionObserver, revealSection is called
const sectionObserver = new IntersectionObserver(revealSection, {
  // viewport when root is null
  root: null,
  // using threshhold of 0.15 for the IntersectionObserver
  threshold: 0.15,
});

// Apply sectionObserver for each section
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
