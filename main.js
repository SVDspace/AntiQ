document.addEventListener("DOMContentLoaded", () => {

    /* =================== THEME TOGGLE ===================== */
    const body = document.body;
    const themeToggle = document.querySelector(".theme-toggle input");

    // Load saved theme
    const savedTheme = localStorage.getItem("antiq-theme");

    if (savedTheme === "light") {
        body.classList.remove("dark");
        themeToggle.checked = false;
    }
    else {
        body.classList.add("dark");
        themeToggle.checked = true;
    }

    // Toggle theme
    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.classList.add("dark");
            localStorage.setItem("antiq-theme", "dark");
        } else {
            body.classList.remove("dark");
            localStorage.setItem("antiq-theme", "light");
        }
    });

    /* ===============SCROLL ANIMATIONS=============== */

    const animatedElements = document.querySelectorAll(
        ".animate-up, .animate-fade"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); // animate once
                }

            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    animatedElements.forEach((el) => {
        observer.observe(el);
    });

    /* =========== SMOOTH SCROLL (NAV LINKS)================ */

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

    /* ====================MOBILE NAV AUTO CLOSE====================== */

    const navToggle = document.getElementById("nav-toggle-safe");
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navToggle.checked) {
                navToggle.checked = false;
            }
        });
    });

    /* =============== SCROLL TO TOP BTN================== */

    const scrollBtn = document.createElement("button");
    scrollBtn.innerText ="⬆"
    scrollBtn.style.fontSize="25px";
    scrollBtn.classList.add("scroll-top-btn");

    document.body.appendChild(scrollBtn);

    scrollBtn.style.position = "fixed";
    scrollBtn.style.bottom = "30px";
    scrollBtn.style.right = "30px";
    scrollBtn.style.padding = "10px 14px";
    scrollBtn.style.border = "none";
    scrollBtn.style.borderRadius = "8px";
    scrollBtn.style.cursor = "pointer";
    scrollBtn.style.display = "none";

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});