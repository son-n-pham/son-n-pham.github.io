export const initSlider = () => {
  const slides = document.querySelectorAll('.slide');
  const navLinksDiv = document.querySelector('.nav__links');
  const navLinks = document.querySelectorAll(
    '.nav__link:not(.nav__link--cta)'
  );
  const btnSlideLeft = document.querySelector('.slider__btn--left');
  const btnSlideRight = document.querySelector('.slider__btn--right');
  const sliderContainer = document.querySelector('.slider-container');

  let currentSlide = 0;

  const activateLink = (currentSlide) => {
    navLinks.forEach((navLink) => navLink.classList.remove('active'));
    if (
      navLinks[currentSlide] &&
      !navLinks[currentSlide].classList.contains('nav__link--cta')
    ) {
      const activeLink = navLinks[currentSlide];
      activeLink.classList.add('active');
      
      // Scroll active tab into view on mobile
      if (window.innerWidth <= 768) {
        activeLink.scrollIntoView({ 
          behavior: 'smooth', 
          inline: 'center', 
          block: 'nearest' 
        });
      }
    }
  };

  const slideTo = (currentSlide) => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 150}%)`;
    });
    activateLink(currentSlide);
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % navLinks.length;
    slideTo(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + navLinks.length) % navLinks.length;
    slideTo(currentSlide);
  };

  const slideLeft = (e) => {
    if(e) e.preventDefault();
    prevSlide();
  };

  const slideRight = (e) => {
    if(e) e.preventDefault();
    nextSlide();
  };

  // Swipe Support
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const xDiff = touchStartX - touchEndX;
    const yDiff = touchStartY - touchEndY;
    // Threshold: 50px, Horizontal > Vertical
    if (Math.abs(xDiff) > 50 && Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // Swiped Left -> Next
        nextSlide();
      } else {
        // Swiped Right -> Prev
        prevSlide();
      }
    }
  };

  // Event Listeners
  navLinksDiv.addEventListener('click', (e) => {
    // Handle click on the link or its children (if any)
    const link = e.target.closest('.nav__link');
    if (link && !link.classList.contains('nav__link--cta')) {
      e.preventDefault();
      currentSlide = parseInt(link.dataset.slide);
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
