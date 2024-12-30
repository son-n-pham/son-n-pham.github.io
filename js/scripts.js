'use strict';

import { initNavbar } from './modules/navbar.js';
import { initSlider } from './modules/slider.js';
import { initMusicPlayer } from './modules/musicPlayer.js';
import { initWeather } from './modules/weather.js';
import { initPopovers } from './modules/popover.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // initNavbar();
  initSlider();
  initMusicPlayer();
  initWeather();
  initPopovers();
});
