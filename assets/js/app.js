window.addEventListener('DOMContentLoaded', function () {
    var galleries = document.querySelectorAll('.gallery-viewerjs');

    if (galleries) {
        for (var i = 0; i < galleries.length; i++) {
            var list = galleries[i].querySelector('ul');

            if (list) {
                var gallery = new Viewer(list, {
                    button: false,
                    navbar: false,
                    toolbar: false,
                    url: "data-original"
                });
            }
        }
    }

    // Create cookie to get the Browser Language
      if (!document.cookie.split('; ').find(row => row.startsWith('nf_lang'))) {
          const userLang = navigator.language || navigator.userLanguage;
          document.cookie = `nf_lang = ${userLang}`;
      }
});