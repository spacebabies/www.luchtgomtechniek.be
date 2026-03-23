/**
 * When visitor changes language, persist via cookie.
 * Netlify can read the `nf_lang` cookie.
 */
export function changeLanguage(element) {
  if (!element) return;

  element.addEventListener("change", function (event) {
    const lang = event.target.value;

    if (lang !== "nl" && lang !== "fr") return;

    document.cookie =
      `nf_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;

    window.location.assign(`/${lang}/`);
  });
}
