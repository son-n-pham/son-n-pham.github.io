"use strict";

import { initSlider } from "./modules/slider.js";
import { initMusicPlayer } from "./modules/musicPlayer.js";
import { initTheme } from "./modules/theme.js";
import { initWeather } from "./modules/weather.js";
import { init as initExpertise } from "./modules/expertise.js";
import { initTimeline } from "./modules/timeline.js";
import { initTimezone } from "./modules/timezone.js";
import { initFooterTabs } from "./modules/footerTabs.js";

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSlider();
  initMusicPlayer();
  initWeather();
  initExpertise();
  initTimeline();
  initTimezone();
  initFooterTabs();
});
