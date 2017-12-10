const message = "Awesome";

console.log(`Gulp is   ${message}`);


let dropdown = document.querySelector("#dropdown");
let dropdownToggle = document.querySelector("#dropdownToggle");

dropdownToggle.addEventListener("click", () => {
    // let dropdown = e.srcElement.previousElementSibling;

    this.classList.toggle("change");
    dropdown.classList.toggle("open");
});




// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scrollPos) {
    let nav = document.querySelector("#main-nav");
    let main = document.querySelector("main");

    if (scrollPos > 678) {
        nav.classList.add("fixed");
        main.style.marginTop = "60px";
    } else {
        nav.classList.remove("fixed");
        main.style.marginTop = 0;
    }
}

window.addEventListener("scroll",  () => {

    last_known_scroll_position = window.scrollY;

    if (!ticking) {

        window.requestAnimationFrame( () => {
            doSomething(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;

    }

});