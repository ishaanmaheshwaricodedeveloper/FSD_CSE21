
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}



const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


const revealElements = document.querySelectorAll(
    ".section-label, " +
    ".about-heading, " +
    ".about-text, " +
    ".project-card, " +
    ".section-intro, " +
    ".skill-category, " +
    ".contact-content"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});



const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentId = entry.target.getAttribute("id");

            navigationLinks.forEach((link) => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }

            });

        });

    },
    {
        threshold: 0.25,
        rootMargin: "-20% 0px -60% 0px"
    }
);


sections.forEach((section) => {
    sectionObserver.observe(section);
});



const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {
        card.style.background = "rgba(255, 255, 255, 0.012)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "";
    });

});



document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});