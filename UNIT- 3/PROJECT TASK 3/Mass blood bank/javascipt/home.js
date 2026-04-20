// home.js

document.addEventListener("DOMContentLoaded", function () {

    // ---------------------------
    // USER PROFILE DROPDOWN
    // ---------------------------
    const userMenu = document.querySelector(".user-menu");
    const dropdown = document.querySelector(".dropdown-content");

    userMenu.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", function () {
        dropdown.classList.remove("show");
    });


    // ---------------------------
    // HERO VIDEO AUTOPLAY FIX
    // ---------------------------
    const video = document.querySelector("video");

    if (video) {
        video.play().catch(function () {
            console.log("Autoplay prevented by browser.");
        });
    }


    // ---------------------------
    // NAVBAR ACTIVE LINK
    // ---------------------------
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {

            navLinks.forEach(l => l.classList.remove("active"));

            this.classList.add("active");

        });
    });


    // ---------------------------
    // SIMPLE SCROLL EFFECT
    // ---------------------------
    window.addEventListener("scroll", function () {

        const header = document.querySelector("header");

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    // ---------------------------
    // EVENT ALERT BUTTON (Optional)
    // ---------------------------
    const eventLink = document.querySelector(".events-link a");

    if (eventLink) {
        eventLink.addEventListener("click", function () {
            alert("Opening Events & Campaigns Page");
        });
    }

});

// popup-handler.js
document.addEventListener('DOMContentLoaded', function() {
    // Select the "Request Blood" link using its class
    const requestLink = document.querySelector('.request-link');

    // If the element exists, add a click event listener
    if (requestLink) {
        requestLink.addEventListener('click', function() {
            alert('Opening Blood Request Form');
        });
    }
});
