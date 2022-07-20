/////////////////////////////////////////
// Demonstration of AJAX
btn = document.querySelector('.btn-country');
exampleContainer = document.querySelector('.example');

// This is the helper function to render the webpage with
// data from restcountries API
const renderCountry = function (data, className = '') {
  // Create html variable to insert into target div later
  const html = `
	<article class="country ${className}">
		<img class="country__img" src="${data.flags.svg}" />
		<div class="country__data">
			<h3 class="country__name">${data.name.official}</h3>
			<h4 class="country__region">${data.region}</h4>
			<p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
        1
      )} Million People</p>
			<p class="country__row"><span>🗣️</span>${
        data.languages[Object.keys(data.languages)]
      }</p>
			<p class="country__row"><span>💰</span>${Object.keys(data.currencies)}</p>
		</div>
	</article>
	`;
  // Insert html into the exampleContainer
  exampleContainer.insertAdjacentHTML('beforeend', html);
};

// Helper function to fetch data and return the result in json format
const getJSON = function (url, errMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(`${errMessage} (${response.status})`);
    }
    return response.json();
  });
};

// getCountryData by using the above 2 helper functions
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 🤦‍♂️🤦‍♂️🤦‍♂️`);
      renderError(`Something went wrong 🤦‍♂️🤦‍♂️🤦‍♂️ ${err.message}`);
    })
    .finally(() => {
      exampleContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', e => getCountryData('australia'));

///////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

// Create sectionObserver by IntersectionObserver, revealSection is called
const sectionObserver = new IntersectionObserver(revealSection, {
  // viewport when root is null
  root: null,
  // using threshhold of 0.15 for the IntersectionObserver
  threshold: 0.15,
});

// Apply sectionObserver for each section
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
