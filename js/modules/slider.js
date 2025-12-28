export const initSlider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnSlideLeft = document.querySelector('.slider__btn--left');
  const btnSlideRight = document.querySelector('.slider__btn--right');
  const sliderContainer = document.querySelector('.slider-container');

  // Select all navigation links (Desktop + Mobile) that control slides
  const allNavLinks = document.querySelectorAll('[data-slide]');

  let currentSlide = 0;

  const activateLink = (currentSlide) => {
    // Deactivate all first
    allNavLinks.forEach((link) => link.classList.remove('active'));

    // Activate links matching the current slide index
    const matchingLinks = document.querySelectorAll(`[data-slide="${currentSlide}"]`);
    
    matchingLinks.forEach(link => {
      link.classList.add('active');

      // Scroll active tab into view on mobile (only for bottom nav links)
      if (window.innerWidth <= 768 && link.classList.contains('bottom-nav__link')) {
        link.scrollIntoView({ 
          behavior: 'smooth', 
          inline: 'center', 
          block: 'nearest' 
        });
      }
    });
  };

  const slideTo = (currentSlide) => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 150}%)`;
    });
    activateLink(currentSlide);
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % 4; // Hardcoded 4 slides based on HTML
    slideTo(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + 4) % 4;
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

  // Event Listeners - Global Delegation for Nav Links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-slide]');
    if (link) {
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
