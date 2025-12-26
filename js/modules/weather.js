const LOCATION_CACHE_KEY = 'lastKnownLocation';
const WEATHER_CACHE_KEY = 'weatherData';
const WEATHER_CACHE_DURATION = 30 * 60 * 1000;
const DEFAULT_LOCATION = { latitude: -31.9523, longitude: 115.8613 }; // Perth, WA

let watchId;

const startLocationTracking = function () {
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem(
          LOCATION_CACHE_KEY,
          JSON.stringify({ latitude, longitude })
        );
      },
      (error) => {
        console.warn('Location tracking error:', error);
        // Use cached location or default if available
        if (!localStorage.getItem(LOCATION_CACHE_KEY)) {
          localStorage.setItem(
            LOCATION_CACHE_KEY,
            JSON.stringify(DEFAULT_LOCATION)
          );
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30 * 60 * 1000,
        timeout: 60000, // Increased to 60 seconds
      }
    );
  }
};

const getLocation = function () {
  return new Promise((resolve, reject) => {
    const cachedLocation = localStorage.getItem(LOCATION_CACHE_KEY);
    if (cachedLocation) {
      resolve(JSON.parse(cachedLocation));
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(location));
          resolve(location);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Fall back to default location if geolocation fails
          localStorage.setItem(
            LOCATION_CACHE_KEY,
            JSON.stringify(DEFAULT_LOCATION)
          );
          resolve(DEFAULT_LOCATION);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30 * 60 * 1000,
          timeout: 60000, // Increased to 60 seconds
        }
      );
    } else {
      console.warn('Geolocation not supported');
      localStorage.setItem(
        LOCATION_CACHE_KEY,
        JSON.stringify(DEFAULT_LOCATION)
      );
      resolve(DEFAULT_LOCATION);
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

  const key = '4ad52f617b004a10a1e71829222407';
  const { latitude, longitude } = await getLocation();
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longitude}&aqi=yes`;
  const currentWeatherResponse = await fetch(url);
  const currentWeather = await currentWeatherResponse.json();

  const weatherData = {
    location: currentWeather.location.tz_id,
    lastUpdated: currentWeather.current.last_updated,
    condition: currentWeather.current.condition['text'],
    condition_icon: `https:${currentWeather.current.condition['icon']}`,
    tempFeelsLikeC: currentWeather.current.feelslike_c,
    uv: currentWeather.current.uv,
    airQualityGB: currentWeather.current.air_quality['gb-defra-index'],
  };

  localStorage.setItem(
    WEATHER_CACHE_KEY,
    JSON.stringify({
      data: weatherData,
      timestamp: Date.now(),
    })
  );

  return weatherData;
};

// Start location tracking when the page loads
window.addEventListener('load', startLocationTracking);

let weatherUpdateInterval;

const displayWeather = async function () {
  try {
    const weatherData = await getWeather();
    // Extract city name from timezone (e.g., "Australia/Perth" -> "Perth")
    const locationParts = weatherData.location.split('/');
    const cityName = locationParts[locationParts.length - 1].replace(/_/g, ' ');
    
    // Format last updated time
    const lastUpdatedDate = new Date(weatherData.lastUpdated);
    const formattedTime = lastUpdatedDate.toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    const footerLeft = document.querySelector('.footer__left');
    footerLeft.innerHTML = `
      <div class="weather-widget" id="weather-widget">
        <div class="weather-location">
          <i class="fas fa-map-marker-alt"></i>
          <span id="weather-location">${cityName}</span>
        </div>
        <div class="weather-details">
          <span id="weather-condition">${weatherData.condition}</span>, <span id="weather-temp">${weatherData.tempFeelsLikeC}°C</span>
        </div>
        <div class="weather-extra">
          <span>UV: <span id="weather-uv">${weatherData.uv}</span></span>
          <span>Air Quality: <span id="weather-aqi">${weatherData.airQualityGB}</span></span>
        </div>
        <div class="weather-updated">
          Last updated: <span id="weather-updated">${formattedTime}</span>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    const footerLeft = document.querySelector('.footer__left');
    footerLeft.innerHTML = '<p class="weather-error">Weather data unavailable</p>';
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
window.addEventListener('load', () => {
  startLocationTracking();
  startWeatherUpdates();
});

// Restart weather updates when the page becomes visible again
document.addEventListener('visibilitychange', function () {
  if (!document.hidden) {
    startWeatherUpdates();
  }
});

export const initWeather = () => {
  let weatherUpdateInterval;

  const startWeatherUpdates = () => {
    displayWeather();
    if (weatherUpdateInterval) clearInterval(weatherUpdateInterval);
    weatherUpdateInterval = setInterval(displayWeather, WEATHER_CACHE_DURATION);
  };

  // Initialize weather tracking
  startLocationTracking();
  startWeatherUpdates();

  // Visibility change handler
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      startWeatherUpdates();
    }
  });
};
