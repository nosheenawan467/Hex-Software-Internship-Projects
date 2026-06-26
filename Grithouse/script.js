/*=========================================
STICKY NAVBAR
=========================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.style.background = "rgba(15,23,42,.96)";
        navbar.style.padding = "12px 0";
        navbar.style.boxShadow = "0 10px 35px rgba(0,0,0,.35)";

    } else {

        navbar.style.background = "rgba(15,23,42,.75)";
        navbar.style.padding = "18px 0";
        navbar.style.boxShadow = "none";

    }

});


/*=========================================
SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/*=========================================
ACTIVE NAVIGATION
=========================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/*=========================================
AUTO CLOSE MOBILE MENU
=========================================*/

const navItems = document.querySelectorAll(".nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        if (window.innerWidth < 992) {

            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) {

                bsCollapse.hide();

            }

        }

    });

});


/*=========================================
HERO PARALLAX EFFECT
=========================================*/

const heroContent = document.querySelector(".hero .container");

window.addEventListener("scroll", () => {

    let value = window.scrollY;

    heroContent.style.transform = `translateY(${value * 0.25}px)`;

    heroContent.style.opacity = 1 - value / 700;

});


/*=========================================
ANIMATED COUNTERS
=========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const increment = target / 120;

            function updateCounter() {

                count += increment;

                if (count < target) {

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "+";

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, {

    threshold: .5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*=========================================
SCROLL REVEAL ANIMATION
=========================================*/

const revealElements = document.querySelectorAll(

".about, .stats, .program-card, .facility-card, .why-card, .plan-card, .contact-info, .contact-form"

);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: .15

});

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform = "translateY(40px)";

    el.style.transition = ".8s ease";

    revealObserver.observe(el);

});


/*=========================================
BACK TO TOP BUTTON
=========================================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.style.display = "flex";

        backToTop.style.alignItems = "center";

        backToTop.style.justifyContent = "center";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*=========================================
BUTTON RIPPLE EFFECT
=========================================*/

const buttons = document.querySelectorAll(".btn-main,.join-btn,.plan-btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transition = ".3s";

    });

});


/*=========================================
CONTACT FORM
=========================================*/

const form = document.querySelector(".contact-form form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you! Your request has been received. We'll contact you soon.");

form.reset();

});

}


/*=========================================
PRELOADER FADE
=========================================*/

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});


/*=========================================
CURRENT YEAR IN FOOTER
=========================================*/

const year = document.getElementById("year");

if(year){

year.textContent = new Date().getFullYear();

}