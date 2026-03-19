import { initLanguage } from "./modules/language.js";
import { initHeader } from "./modules/header.js";
import feather from 'feather-icons';
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
  initLanguage();
  initHeader(document.querySelector("#site-head"));
  feather.replace({ width: "1em", height: "1em" });
  initSwiper();
  initLeaflet();
});
