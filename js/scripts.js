"use strict";

import { initNavbar } from "./modules/navbar.js";
import { initSlider } from "./modules/slider.js";
import { initMusicPlayer } from "./modules/musicPlayer.js";
import { initWeather } from "./modules/weather.js";
import { initPopovers } from "./modules/popover.js";
import { initFooter } from "./modules/footer.js"; // Import the initFooter function
import slides from "./slides/slides.js";

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	initNavbar();
	const slidersContainer = document.querySelector(".container__main.sliders");
	slides.forEach((slide) => {
		slidersContainer.innerHTML += slide;
	});
	initSlider();
	initMusicPlayer();
	initWeather();
	initPopovers();
	initFooter(); // Call the initFooter function
});
