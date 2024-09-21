"use strict";

const slides = document.querySelectorAll(".slide");
const navLinksDiv = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");
const btnSlideLeft = document.querySelector(".slider__btn--left");
const btnSlideRight = document.querySelector(".slider__btn--right");

let currentSlide = 0;

const activateLink = function (currentSlide) {
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
  });

  navLinks[currentSlide].classList.add("active");
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

navLinksDiv.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    console.log("Click add nav__link");
    currentSlide = e.target.dataset.slide;
    console.log(currentSlide);
    slideTo(currentSlide);
  }
});

btnSlideLeft.addEventListener("click", slideLeft);
btnSlideRight.addEventListener("click", slideRight);

// Listen to key events
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") slideLeft(e);
  if (e.key === "ArrowRight") slideRight(e);
});

slideTo(currentSlide);

////////////////////////////////////////////////////
// Music bar
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = [
  "Comptine d’un autre été",
  "Nuvole Bianche",
  "River Flows in You",
  "Sonata No16",
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
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

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
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", previousSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Set progress
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

//////////////////////////////////////////////////////////
// Weather

const LOCATION_CACHE_KEY = "lastKnownLocation";
const WEATHER_CACHE_KEY = "weatherData";
const WEATHER_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

let watchId;

const startLocationTracking = function () {
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem(
          LOCATION_CACHE_KEY,
          JSON.stringify({ latitude, longitude }),
        );
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 30 * 60 * 1000, // 30 minutes
        timeout: 27000,
      },
    );
  }
};

const getLocation = function () {
  return new Promise((resolve, reject) => {
    const cachedLocation = localStorage.getItem(LOCATION_CACHE_KEY);
    if (cachedLocation) {
      resolve(JSON.parse(cachedLocation));
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem(
            LOCATION_CACHE_KEY,
            JSON.stringify({ latitude, longitude }),
          );
          resolve({ latitude, longitude });
        },
        reject,
        {
          enableHighAccuracy: false,
          maximumAge: 30 * 60 * 1000, // 30 minutes
          timeout: 27000,
        },
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getWeather = async function () {
  const cachedData = localStorage.getItem(WEATHER_CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < WEATHER_CACHE_DURATION) {
      return data;
    }
  }

  const key = "4ad52f617b004a10a1e71829222407";
  const { latitude, longitude } = await getLocation();
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longitude}&aqi=yes`;
  const currentWeatherResponse = await fetch(url);
  const currentWeather = await currentWeatherResponse.json();

  const weatherData = {
    location: currentWeather.location.tz_id,
    lastUpdated: currentWeather.current.last_updated,
    condition: currentWeather.current.condition["text"],
    condition_icon: `https:${currentWeather.current.condition["icon"]}`,
    tempFeelsLikeC: currentWeather.current.feelslike_c,
    uv: currentWeather.current.uv,
    airQualityGB: currentWeather.current.air_quality["gb-defra-index"],
  };

  localStorage.setItem(
    WEATHER_CACHE_KEY,
    JSON.stringify({
      data: weatherData,
      timestamp: Date.now(),
    }),
  );

  return weatherData;
};

// Start location tracking when the page loads
window.addEventListener("load", startLocationTracking);

let weatherUpdateInterval;

const displayWeather = async function () {
  try {
    const weatherData = await getWeather();
    const footerLeft = document.querySelector(".footer__left");
    footerLeft.innerHTML = `
      <div class="weather-info">
        <img src="${weatherData.condition_icon}" alt="${weatherData.condition}" class="weather-icon">
        <div class="weather-details">
          <p>${weatherData.location}</p>
          <p>${weatherData.condition}, ${weatherData.tempFeelsLikeC}°C</p>
          <p>UV: ${weatherData.uv}, Air Quality: ${weatherData.airQualityGB}</p>
          <p>Last updated: ${new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    const footerLeft = document.querySelector(".footer__left");
    footerLeft.innerHTML = "<p>Weather data unavailable</p>";
  }
};
const startWeatherUpdates = function () {
  // Display weather immediately
  displayWeather();

  // Clear any existing interval
  if (weatherUpdateInterval) {
    clearInterval(weatherUpdateInterval);
  }

  // Set up new interval to check and update every 30 minutes
  weatherUpdateInterval = setInterval(async () => {
    await displayWeather();
  }, WEATHER_CACHE_DURATION);
};

// Start weather updates when the page loads
window.addEventListener("load", () => {
  startLocationTracking();
  startWeatherUpdates();
});

// Restart weather updates when the page becomes visible again
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    startWeatherUpdates();
  }
});
