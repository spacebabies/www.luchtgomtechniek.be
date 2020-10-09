/**
 * Main JS file for GhostScroll behaviours
 */

var $post = $(".post");
var $first = $(".post.first");
var $last = $(".post.last");
var $fnav = $(".fixed-nav");
var $postholder = $(".post-holder");
var $postafter = $(".post-after");
var $sitehead = $("#site-head");

/* Globals jQuery, document */
(function ($) {
    "use strict";

    function srcTo(el) {
        $("html, body").animate({
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
    $(document).ready(function () {
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

        $("a.btn.site-menu").click(function (e) {
            srcToAnchorWithTitle($(e.target).data("title-anchor"));
        });
        $("#header-arrow").click(function () {
            srcTo($first);
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
    });
})(jQuery);
