export const initSlider = () => {
  const slides = document.querySelectorAll('.slide');
  const navLinksDiv = document.querySelector('.nav__links');
  console.log(navLinksDiv);
  const navLinks = document.querySelectorAll(
    '.nav__link:not(.nav__link--resume)'
  );
  const btnSlideLeft = document.querySelector('.slider__btn--left');
  const btnSlideRight = document.querySelector('.slider__btn--right');

  let currentSlide = 0;

  const activateLink = (currentSlide) => {
    navLinks.forEach((navLink) => navLink.classList.remove('active'));
    if (
      navLinks[currentSlide] &&
      !navLinks[currentSlide].classList.contains('nav__link--resume')
    ) {
      navLinks[currentSlide].classList.add('active');
    }
  };

  const slideTo = (currentSlide) => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 150}%)`;
    });
    activateLink(currentSlide);
  };

  const slideLeft = (e) => {
    e.preventDefault();
    currentSlide = (currentSlide - 1 + navLinks.length) % navLinks.length;
    slideTo(currentSlide);
  };

  const slideRight = (e) => {
    e.preventDefault();
    currentSlide = (currentSlide + 1) % navLinks.length;
    slideTo(currentSlide);
  };

  // Event Listeners
  navLinksDiv.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('nav__link') &&
      !e.target.classList.contains('nav__link--resume')
    ) {
      e.preventDefault();
      currentSlide = parseInt(e.target.dataset.slide);
      slideTo(currentSlide);
    }
  });

  btnSlideLeft.addEventListener('click', slideLeft);
  btnSlideRight.addEventListener('click', slideRight);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') slideLeft(e);
    if (e.key === 'ArrowRight') slideRight(e);
  });

  slideTo(currentSlide);
};
