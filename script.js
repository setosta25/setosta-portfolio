/* ---------- Loading screen ---------- */
(function () {
    var loader = document.getElementById("loader");
    var fill = document.querySelector(".loader-fill");
    var percent = document.querySelector(".loader-percent");
    var progress = 0;
    var pageLoaded = false;
    var minTime = false;

    window.addEventListener("load", function () { pageLoaded = true; });
    setTimeout(function () { minTime = true; }, 1600);

    var timer = setInterval(function () {
        if (progress < 90) progress += Math.random() * 10;
        if (pageLoaded && minTime) progress = 100;
        progress = Math.min(progress, 100);
        fill.style.width = progress + "%";
        percent.textContent = Math.floor(progress) + "%";

        if (progress >= 100) {
            clearInterval(timer);
            setTimeout(function () {
                loader.classList.add("hide");
                document.body.classList.remove("loading");
            }, 250);
        }
    }, 110);
})();

/* ---------- Theme toggle (Dark / Light) ---------- */
(function () {
    var root = document.documentElement;
    var toggleBtn = document.getElementById("theme-toggle");
    var icon = toggleBtn.querySelector("i");
    var savedTheme = localStorage.getItem("portfolio-theme") || "dark";

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        localStorage.setItem("portfolio-theme", theme);
    }

    applyTheme(savedTheme);

    toggleBtn.addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });
})();

/* ---------- Mobile menu ---------- */
var menuBtn = document.querySelector(".menu-btn");
var menu = document.querySelector(".menu");
menuBtn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
        menu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", false);
    });
});

/* ---------- Typing effect ---------- */
var words = ["HTML and CSS", "JavaScript", "Node.js and React", "Python", "MySQL and PostgreSQL"];
var typedEl = document.getElementById("typed");
var w = 0, c = 0, deleting = false;

function type() {
    var word = words[w];
    typedEl.textContent = word.substring(0, c);
    if (!deleting && c < word.length) { c++; setTimeout(type, 90); }
    else if (!deleting) { deleting = true; setTimeout(type, 1300); }
    else if (c > 0) { c--; setTimeout(type, 45); }
    else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
if (typedEl) { type(); }

/* ---------- Credentials category filter ---------- */
var tabBtns = document.querySelectorAll(".tab-btn");
var shots = document.querySelectorAll(".gallery .shot");

tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var filter = btn.dataset.filter;

        tabBtns.forEach(function (b) {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        shots.forEach(function (shot) {
            if (filter === "all" || shot.dataset.category === filter) {
                shot.classList.remove("hidden");
            } else {
                shot.classList.add("hidden");
            }
        });
    });
});

/* ---------- Reveal sections on scroll ---------- */
var sections = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
        });
    }, { threshold: 0.12 });
    sections.forEach(function (s) { io.observe(s); });
} else {
    sections.forEach(function (s) { s.classList.add("show"); });
}

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Image lightbox ---------- */
var lb = document.getElementById("lightbox");
var lbImg = lb.querySelector("img");
var lbCap = lb.querySelector("p");
document.querySelectorAll(".zoom").forEach(function (b) {
    b.addEventListener("click", function () {
        lbImg.src = b.dataset.src;
        lbImg.alt = b.dataset.cap;
        lbCap.textContent = b.dataset.cap;
        lb.hidden = false;
    });
});
function closeLb() { lb.hidden = true; lbImg.src = ""; }
lb.addEventListener("click", function (e) { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });