/**
 * When visitor changes language, persist via cookie.
 * Netlify will read the `nf_lang` cookie and redirect on the edge.
 */
export function changeLanguage(element) {
  if (!element) return;
  var location, userLang;

  element.addEventListener("change", function (event) {
    if (event.target.value === 'nl') {
      userLang = "nl";
      location = "/nl/";
    } else if (event.target.value === 'fr') {
      userLang = "fr";
      location = "/fr/";
    }
    document.cookie = "nf_lang=" + userLang + "; path=/; Max-Age=31536000; Secure";
    window.location.assign(location);
  });
}
