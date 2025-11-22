"use strict";

import { initNavbar } from "./modules/navbar.js";
import { initSlider } from "./modules/slider.js";
import { initMusicPlayer } from "./modules/musicPlayer.js";
import { initWeather } from "./modules/weather.js";
import { initPopovers } from "./modules/popover.js";
import { initFooter } from "./modules/footer.js";
import { initCareer3D } from "./modules/career3D.js";
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

  // Initialize 3D career timeline after DOM updates
  requestAnimationFrame(() => {
    const careerContainer = document.getElementById('career-3d-container');
    if (careerContainer) {
      initCareer3D(careerContainer);
      console.log('Career 3D initialized successfully');
    } else {
      console.error('Career 3D container not found');
    }
  });

  // Then initialize the footer
  initFooter();

  // Finally initialize components that depend on footer
  initMusicPlayer();
  initWeather();
  initPopovers();
});
