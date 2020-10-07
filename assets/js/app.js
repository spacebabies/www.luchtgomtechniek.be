window.addEventListener('DOMContentLoaded', function () {
    var galleries = document.querySelectorAll('.gallery-viewerjs');

    if (galleries) {
        for (var i = 0; i < galleries.length; i++) {
            var gallery = new Viewer(galleries[i], {
                button: false,
                fullscreen: false,
                navbar: false,
                toolbar: false,
                url: "data-original",
                inline: false
            });
        }
    }

    // Create cookie to get the Browser Language
      if (!document.cookie.split('; ').find(row => row.startsWith('nf_lang'))) {
          const userLang = navigator.language || navigator.userLanguage;
          document.cookie = `nf_lang = ${userLang}`;
      }
});