import jQuery from 'jquery';
import feather from 'feather-icons';
import { changeLanguage, getFirstBrowserLanguage } from 'language';
import { srcTo, srcToAnchorWithTitle } from 'scroll';

window.$ = window.jQuery = jQuery;

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

$(document)
    .on('click', 'a.btn.site-menu', function (e) {
        srcToAnchorWithTitle($(e.target).data("title-anchor"));
    })
    .on('click', '.scrolly a', function (e) {
        var $el = $(e.currentTarget.hash);
        srcTo($el);
    })
    .ready(function(event) {
        const $post = $(".post");
        const $first = $(".post.first");
        const $last = $(".post.last");
        const $fnav = $(".fixed-nav");
        const $postholder = $(".post-holder");
        const $postafter = $(".post-after");
        const $sitehead = $("#site-head");

        $postholder.each(function (e) {
            if (e % 2 != 0) $(this).addClass("odd");
        });

        $postafter.each(function (e) {
            var bg = $(this).parent().css("background-color");
            $(this).css("border-top-color", bg);

            if (e % 2 == 0) {
                $(this).addClass("even");
            }
        });

        $(".post-title").each(function () {
            var t = $(this).text();
            var index = $(this).parents(".post-holder").index();
        
            $fnav.append(
                "<a class='fn-item' item_index='" + index + "'>" + t + "</a>"
            );
            $(".fn-item").click(function () {
                var i = $(this).attr("item_index");
                var s = $(".post[item_index='" + i + "']");

                $("html, body").animate({
                    scrollTop: s.offset().top,
                },
                400
                );
            });
        });
        
        $(".post.last").next(".post-after").hide();

                    if ($sitehead.length) {
                $(window).scroll(function () {
                    var w = $(window).scrollTop();
                    var g = $sitehead.offset().top;
                    var h = $sitehead.offset().top + $sitehead.height() - 100;

                    if (w >= g && w <= h) {
                        $(".fixed-nav").fadeOut("fast");
                    } else if ($(window).width() > 500) {
                        $(".fixed-nav").fadeIn("fast");
                    }

                    $post.each(function () {
                        var f = $(this).offset().top;
                        var b = $(this).offset().top + $(this).height();
                        var t = $(this).parent(".post-holder").index();
                        var i = $(".fn-item[item_index='" + t + "']");
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

            $("blockquote p").prepend('<span data-feather="message-square" class="quo"></span>');
            // $("blockquote p").append('<span class="quo fa fa-quote-right"></span>');

            feather.replace({
                width: '1em',
                height: '1em'
            });

    })