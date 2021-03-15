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
        var location = window.location.pathname + window.location.hash;
        var userLang = event.target.value;
        document.cookie = `nf_lang = ${userLang}`;
        window.location.assign(location.replace(/^\/\w{2}/, `/${userLang}`));
    })
}

document.addEventListener('DOMContentLoaded', function (event) {
    feather.replace({width: '1em', height: '1em'});

    // Create cookie to get the Browser Language.
    // This should always run for CDN optimisation.
    if (!document.cookie.split('; ').find(row => row.startsWith('nf_lang'))) {
        const userLang = getFirstBrowserLanguage();
        document.cookie = `nf_lang = ${userLang}`;
    }

    changeLanguage(document.querySelector('#changeLanguage'));
});