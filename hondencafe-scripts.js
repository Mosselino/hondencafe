// --- SLICK CAROUSEL ---

// when document is fully loaded
$(document).ready(function () {

    $('.list').slick({
        variableWidth: true,
        centerMode: true,
        dots: false,
        speed: 500,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        touchThreshold: 300,
        responsive: [
            {
                // tablet
                breakpoint: 991,
                settings: {
                    //slidesToShow: 1
                }
            },
            {
                // mobile portrait
                breakpoint: 479,
                settings: {
                    //slidesToShow: 1
                }
            }
        ]
    });

    $('.slider-prev').click(function () {
        $(this).closest('.section').find(".list").slick('slickPrev');
    });

    $('.slider-next').click(function () {
        $(this).closest('.section').find(".list").slick('slickNext');
    });



});


// --- LENIS SCROLL ---

"use strict"; // fix lenis in safari

if (Webflow.env("editor") === undefined) {
    const lenis = new Lenis({
        lerp: 0.7,
        wheelMultiplier: 0.7,
        infinite: false,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    $("[data-lenis-start]").on("click", function () {
        lenis.start();
    });
    $("[data-lenis-stop]").on("click", function () {
        lenis.stop();
    });
    $("[data-lenis-toggle]").on("click", function () {
        $(this).toggleClass("stop-scroll");
        if ($(this).hasClass("stop-scroll")) {
            lenis.stop();
        } else {
            lenis.start();
        }
    });
}


// --- ILLUSTRATION SPAN IN TITLES ---

$(".span_wrapper").each(function (index) {
    let relatedEl = $(".span_element").eq(index);
    relatedEl.appendTo($(this));
});


// --- TEXT SPLITTER FOR GSAP ANIM ---

window.addEventListener("DOMContentLoaded", (event) => {
    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
        types: "words",
        tagName: "span"
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
        // Reset tl when scroll out of view past bottom of screen
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        // Play tl when scrolled into view (60% from top of screen)
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 60%",
            onEnter: () => timeline.play()
        });
    }

    $("[words-bounce-up]").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        tl.from($(this).find(".word"), { opacity: 0, yPercent: 50, duration: 1, ease: "elastic.out(1.5, 0.5)", stagger: { amount: 0.5 } });
        createScrollTrigger($(this), tl);
    });

    $("[words-slide-up]").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        tl.from($(this).find(".word"), { opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(2)", stagger: { amount: 0.5 } });
        createScrollTrigger($(this), tl);
    });

    // Avoid flash of unstyled content
    gsap.set("[text-split]", { opacity: 1 });

    // Refresh to see if that works to reset the text animations
    ScrollTrigger.refresh();
});


// --- OBFUSCATION EMAIL MAILTO LINK ---

var encEmail = "aW5mb0BoZXRob25kZW5jYWZlLm5s";
const form = document.getElementById("contact");
form.setAttribute("href", "mailto:".concat(atob(encEmail)));