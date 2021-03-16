export function srcTo(el) {
    $("html, body").animate({
            scrollTop: el.offset().top,
        },
        1000
    );
}

export function srcToAnchorWithTitle(str) {
    var $el = $("#" + str);
    if ($el.length) {
        srcTo($el);
    }
}
