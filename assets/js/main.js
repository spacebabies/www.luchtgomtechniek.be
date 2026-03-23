import { changeLanguage } from "./modules/language.js";
import { initHeader } from "./modules/header.js";
import { initSwiper } from "./modules/swiper.js";
import { initLeaflet } from "./modules/leaflet.js";

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}

onReady(() => {
  changeLanguage(document.querySelector('#changeLanguage'));
  initHeader(document.querySelector("#site-head"));
  initSwiper('.swiper');
  initLeaflet(document.getElementById('portfolio'));

  document.body.classList.add("data-js-loaded");
});
