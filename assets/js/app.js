var getFirstBrowserLanguage = function () {
    const defaultLanguage = 'nl';

    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i,
        language;

    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i]
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]]
        if (language && language.length) {
            return language;
        }
    }
    return defaultLanguage;
}

var changeLanguage = function (element) {
    if (!element) return;

    element.addEventListener('change', function (event) {
        const pathName = window.location.pathname;
        const userLang = event.target.value;
        document.cookie = `nf_lang = ${userLang}`;
        window.location.assign(pathName.replace(/^\/\w{2}/, `/${userLang}`));
    })
}

window.addEventListener('DOMContentLoaded', function () {
    feather.replace({width: '1em', height: '1em'});

    // element argument can be a selector string
    //   for an individual element
    new Flickity('.carousel', {
        imagesLoaded: true,
        percentPosition: false
    });

    // Create cookie to get the Browser Language.
    // This should always run for CDN optimisation.
    if (!document.cookie.split('; ').find(row => row.startsWith('nf_lang'))) {
        const userLang = getFirstBrowserLanguage();
        document.cookie = `nf_lang = ${userLang}`;
    }

    changeLanguage(document.querySelector('#changeLanguage'));
});