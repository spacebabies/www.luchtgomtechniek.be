window.addEventListener('DOMContentLoaded', function () {
    feather.replace({width: '1em', height: '1em'});

    // element argument can be a selector string
    //   for an individual element
    var flkty = new Flickity('.carousel', {
        imagesLoaded: true,
        percentPosition: false
    });

    // Create cookie to get the Browser Language.
    // This should always run for CDN optimisation.
    if (!document.cookie.split('; ').find(row => row.startsWith('nf_lang'))) {
        const userLang = navigator.language || navigator.userLanguage;
        document.cookie = `nf_lang = ${userLang}`;
    }

    const changeLanguage = document.querySelector('#changeLanguage');
    changeLanguage.addEventListener('change', function(event) {
        const pathName = window.location.pathname;
        const userLang = event.target.value;
        document.cookie = `nf_lang = ${userLang}`;
        window.location.assign(pathName.replace(/^\/\w{2}/, `/${userLang}`));
    })
});