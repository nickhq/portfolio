"use strict";

var message = "Awesome";

console.log("Gulp is   " + message);

var dropdown = document.querySelector("#dropdown");
var dropdownToggle = document.querySelector("#dropdownToggle");

dropdownToggle.addEventListener("click", function () {
    // let dropdown = e.srcElement.previousElementSibling;

    undefined.classList.toggle("change");
    dropdown.classList.toggle("open");
});

// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scrollPos) {
    var nav = document.querySelector("#main-nav");
    var main = document.querySelector("main");

    if (scrollPos > 678) {
        nav.classList.add("fixed");
        main.style.marginTop = "60px";
    } else {
        nav.classList.remove("fixed");
        main.style.marginTop = 0;
    }
}

window.addEventListener("scroll", function () {

    last_known_scroll_position = window.scrollY;

    if (!ticking) {

        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;
    }
});