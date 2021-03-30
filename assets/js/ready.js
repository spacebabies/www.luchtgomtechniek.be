function getFirstBrowserLanguage() {
  var defaultLanguage = "nl";

  var nav = window.navigator,
    browserLanguagePropertyKeys = [
      "language",
      "browserLanguage",
      "systemLanguage",
      "userLanguage",
    ],
    i,
    language;

  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }
  return defaultLanguage;
}

function changeLanguage(element) {
  if (!element) return;

  element.addEventListener("change", function (event) {
    var location = window.location.pathname + window.location.hash;
    var userLang = event.target.value;
    document.cookie = `nf_lang = ${userLang}`;
    window.location.assign(location.replace(/^\/\w{2}/, `/${userLang}`));
  });
}

function srcTo(el) {
  $("html, body").animate(
    {
      scrollTop: el.offset().top,
    },
    1000
  );
}

function srcToAnchorWithTitle(str) {
  var $el = $("#" + str);
  if ($el.length) {
    srcTo($el);
  }
}

function setHeader(header) {
  if (!header) return;
  var firstSlide = header.querySelector("link");

  if (firstSlide) {
    header.style.backgroundImage = "url(" + firstSlide.href + ")";
  }
}

/*
 * Create cookie to get the Browser Language.
 * This should always run for CDN optimisation.
 */
function persistLanguage(cookies) {
  if (!cookies.includes("nf_lang")) {
    var userLang = getFirstBrowserLanguage();
    document.cookie = "nf_lang=" + userLang;
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  feather.replace({ width: "1em", height: "1em" });

  persistLanguage(document.cookie);
  changeLanguage(document.querySelector("#changeLanguage"));
  setHeader(document.querySelector("#site-head"));

  document.body.classList.add("loaded");

  let carousels = document.querySelectorAll(".carousel");
  carousels.forEach(function (element) {
    new Flickity(element, {
      cellAlign: "left",
      percentPosition: false,
    });
  });
});

$(document)
  .on("click", "a.btn.site-menu", function (e) {
    srcToAnchorWithTitle($(e.target).data("title-anchor"));
  })
  .ready(function (event) {
    var $post = $(".post");
    var $first = $(".post.first");
    var $last = $(".post.last");
    var $postholder = $(".post-holder");
    var $postafter = $(".post-after");
    var $sitehead = $("#site-head");

    $postafter.each(function (e) {
      var bg = $(this).parent().css("background-color");
      $(this).css("border-top-color", bg);
    });

    $(".post-title").each(function () {
      var t = $(this).text();
      var index = $(this).parents(".post-holder").index();
    });

    $(".post.last").next(".post-after").hide();

    if ($sitehead.length) {
      $(window).scroll(function () {
        var w = $(window).scrollTop();
        var g = $sitehead.offset().top;
        var h = $sitehead.offset().top + $sitehead.height() - 100;

        $post.each(function () {
          var f = $(this).offset().top;
          var b = $(this).offset().top + $(this).height();
          var t = $(this).parent(".post-holder").index();
          var a = $(this)
            .parent(".post-holder")
            .prev(".post-holder")
            .find(".post-after");

          $(this).attr("item_index", t);

          if (w >= f && w <= b) {
            i.addClass("active");
            a.fadeOut("slow");
          } else {
            i.removeClass("active");
            a.fadeIn("slow");
          }
        });
      });
    }
  });
