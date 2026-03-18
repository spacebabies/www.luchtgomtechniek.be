import feather from 'feather-icons';
import Swiper, { Navigation } from 'swiper';

"use strict";

function changeLanguage(element) {
  if (!element) return;
  var location, userLang;

  element.addEventListener("change", function (event) {
    if (event.target.value === 'nl') {
      userLang = "nl";
      location = "/nl/";
    } else if (event.target.value === 'fr') {
      userLang = "fr";
      location = "/fr";
    }
    document.cookie = "nf_lang=" + userLang + "; Max-Age=2600000; Secure";
    window.location.assign(location);
  });
}

function setHeader(header) {
  if (!header) return;

  var slide;
  if (screen.orientation.type.startsWith("portrait")) {
    slide = header.querySelector("link.portrait");
  } else {
    slide = header.querySelector("link.landscape");
  }

  if (slide) {
    header.style.backgroundImage = "url(" + slide.href + ")";
    header.classList.add('header-loaded');
  }
}

/*
  * Create cookie to get the Browser Language.
  * This should always run for CDN optimisation.
  */
function persistLanguage(cookies) {
  if (!cookies.includes("nf_lang")) {
    var userLang = getFirstBrowserLanguage();
    document.cookie = "nf_lang=" + userLang + "; Max-Age=2600000; Secure";
  }
}

function getFirstBrowserLanguage() {
  var defaultLanguage = "nl";

  var nav = window.navigator,
    browserLanguagePropertyKeys = [
      "language",
      "browserLanguage",
      "systemLanguage",
      "userLanguage",
    ],
    i,
    language;

  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }
  return defaultLanguage;
}

function mapRealisaties() {
  const container = document.getElementById('pageportfolioindex');
  if (!container) return;

  const portfolioList = container.querySelector('.realisations');
  if (!portfolioList) return;

  const postArticle = container.querySelector('.post');

  // Create map element
  const mapElement = document.createElement('div');
  mapElement.id = 'portfolio-map';
  mapElement.style.height = '80vh';
  mapElement.style.width = '100%';

  // Insert directly into the container (escaping .post constraints)
  container.appendChild(mapElement);

  // Initialize the map and set view to a central location
  const map = L.map('portfolio-map', {
    scrollWheelZoom: false
  }).setView([50.8, 5.5], 9); // Centered roughly on BE/NL border

  // Add a privacy-conscious, clean tile layer (CartoDB Positron - Light)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 20
  }).addTo(map);

  const items = container.querySelectorAll('.portfolio-item');
  let hasCoordinates = false;

  items.forEach(item => {
      const lat = item.getAttribute('data-lat');
      const lng = item.getAttribute('data-lng');

      if (lat && lng && lat !== "null" && lng !== "null" && lat !== "" && lng !== "") {
          hasCoordinates = true;
          const marker = L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map);

          const title = item.querySelector('h3') ? item.querySelector('h3').innerText : '';
          const description = item.querySelector('p') ? item.querySelector('p').innerText : '';

          // Bind a popup with project details
          marker.bindPopup(`
              <div class="map-popup">
                  <h3>${title}</h3>
                  <p>${description}</p>
              </div>
          `);
      }
  });

  if (hasCoordinates) {
      if (postArticle) postArticle.style.display = 'none';
      container.style.padding = '0';
  } else {
      mapElement.remove();
  }
}

function run() {
  feather.replace({ width: "1em", height: "1em" });

  persistLanguage(document.cookie);
  changeLanguage(document.querySelector("#changeLanguage"));
  setHeader(document.querySelector("#site-head"));

  new Swiper('.swiper', {
    modules: [Navigation],
    slidesPerView: "auto",
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    rewind: true
  });

  mapRealisaties();
  document.body.classList.add("data-js-loaded");
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}
