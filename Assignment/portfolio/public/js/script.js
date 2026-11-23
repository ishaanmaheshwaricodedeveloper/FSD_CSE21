/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector("nav");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("mobile-open");

        menuButton.textContent =
            navigation.classList.contains("mobile-open")
                ? "CLOSE"
                : "MENU";

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("mobile-open");

        if (menuButton) {
            menuButton.textContent = "MENU";
        }

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});