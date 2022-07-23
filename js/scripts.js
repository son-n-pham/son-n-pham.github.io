'use strict';

const slides = document.querySelectorAll('.slide');
const navLinksDiv = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__link');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;

const activateLink = function (currentSlide) {
  navLinks.forEach(navLink => {
    navLink.classList.remove('active');
  });

  navLinks[currentSlide].classList.add('active');
};

const slideTo = function (currentSlide) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 150}%)`;
  });
  activateLink(currentSlide);
};

const slideLeft = function (e) {
  e.preventDefault();
  currentSlide--;
  if (currentSlide < 0) currentSlide = navLinks.length - 1;
  slideTo(currentSlide);
};

const slideRight = function (e) {
  e.preventDefault();
  currentSlide++;
  if (currentSlide > navLinks.length - 1) currentSlide = 0;
  slideTo(currentSlide);
};

navLinksDiv.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    console.log('Click add nav__link');
    currentSlide = e.target.dataset.slide;
    console.log(currentSlide);
    slideTo(currentSlide);
  }
});

btnSlideLeft.addEventListener('click', slideLeft);
btnSlideRight.addEventListener('click', slideRight);

// Listen to key events
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') slideLeft(e);
  if (e.key === 'ArrowRight') slideRight(e);
});

slideTo(currentSlide);

////////////////////////////////////////////////////
// Music bar
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = [
  'Comptine d’un autre été',
  'Nuvole Bianche',
  'River Flows in You',
  'Sonata No16',
];

// Keep track of song
let songIndex = 0;

// Initially load song detail into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

// Next song
function nextSong() {
  if (songIndex < songs.length - 1) songIndex++;
  else songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function previousSong() {
  if (songIndex > 0) songIndex--;
  else songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const clickX = e.offsetX;
  const width = this.clientWidth;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners

// Play song
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', previousSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Set progress
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
