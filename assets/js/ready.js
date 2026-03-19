"use strict";

function run() {
  document.body.classList.add("data-js-loaded");
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}
