export function initHeader(header) {
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
