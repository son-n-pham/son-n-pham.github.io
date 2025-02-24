"use strict";

import { initNavbar } from "./modules/navbar.js";
import { initSlider } from "./modules/slider.js";
import { initMusicPlayer } from "./modules/musicPlayer.js";
import { initWeather } from "./modules/weather.js";
import { initPopovers } from "./modules/popover.js";
import { initFooter } from "./modules/footer.js";
import slides from "./slides/slides.js";

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // First initialize the navbar and slides
  initNavbar();
  const slidersContainer = document.querySelector(".container__main.sliders");
  slides.forEach((slide) => {
    slidersContainer.innerHTML += slide;
  });
  initSlider();

  // Then initialize the footer
  initFooter();

  // Finally initialize components that depend on footer
  initMusicPlayer();
  initWeather();
  initPopovers();
});
