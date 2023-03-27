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

  document.body.classList.add("data-js-loaded");
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}
