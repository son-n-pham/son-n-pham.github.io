'use strict';

const slides = document.querySelectorAll('.slide');
const navLinksDiv = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;

const activateLink = function(currentSlide) {
	navLinks.forEach(navLink => {
		navLink.classList.remove('active')
	});
	
	console.log(navLinks);
	navLinks[currentSlide].classList.add('active');
}

const slideTo = function(currentSlide) {
	slides.forEach((slide, index) => {
		slide.style.transform = `translateX(${(index-currentSlide)*150}%)`
	})
	activateLink(currentSlide);

}

const slideLeft = function(e) {
  e.preventDefault();
  currentSlide--;
  if (currentSlide < 0) currentSlide = (navLinks.length - 1);
  slideTo(currentSlide)
}
const slideRight = function(e) {
  e.preventDefault();
  currentSlide++;
  if (currentSlide > (navLinks.length - 1)) currentSlide = 0;
  slideTo(currentSlide);
}

slideTo(0);

navLinksDiv.addEventListener('click', function(e){
	e.preventDefault();

	if (e.target.classList.contains('nav__link')){
		console.log("Click add nav__link");
		currentSlide = e.target.dataset.slide;
		console.log(currentSlide);
		slideTo(currentSlide)
	}
})

btnSlideLeft.addEventListener('click', slideLeft);
btnSlideRight.addEventListener('click', slideRight);


// Listen to key events
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') slideLeft(e);
  if (e.key === 'ArrowRight') slideRight(e);
})