(function () {
  "use strict";

  // ─── Theme toggle ─────────────────────────────────────────
  var html = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var icon = toggle && toggle.querySelector(".theme-icon");
  var saved = localStorage.getItem("theme");

  function setTheme(dark) {
    if (dark) {
      html.classList.add("dark");
      if (icon) icon.textContent = "light_mode";
    } else {
      html.classList.remove("dark");
      if (icon) icon.textContent = "dark_mode";
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  // Respect saved preference or system preference
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    setTheme(true);
  } else {
    setTheme(false);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(!html.classList.contains("dark"));
    });
  }

  // ─── Page loader ───────────────────────────────────────────
  var loader = document.getElementById("page-loader");
  var bar = document.getElementById("loader-bar");
  var hero = document.getElementById("hero");

  function startPage() {
    if (!loader) {
      if (hero) hero.classList.add("hero-ready");
      return;
    }

    if (bar) {
      bar.style.width = "100%";
    }

    var delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 400
      : 2200;

    setTimeout(function () {
      loader.classList.add("loaded");

      setTimeout(function () {
        loader.style.display = "none";
        if (hero) hero.classList.add("hero-ready");
      }, 550);
    }, delay);
  }

  // ─── Hero parallax ─────────────────────────────────────────
  if (hero) {
    var heroImgs = hero.querySelectorAll(".anim-zoom-in, .anim-scale-in");
    window.addEventListener(
      "scroll",
      function () {
        var rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight * 1.5) {
          var pct = rect.top / window.innerHeight;
          heroImgs.forEach(function (img) {
            img.style.transform = "translateY(" + (pct * 30) + "px)";
          });
        }
      },
      { passive: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startPage);
  } else {
    startPage();
  }

  // ─── Navbar scroll effect ─────────────────────────────────
  var navbar = document.getElementById("navbar");
  var progress = document.getElementById("scroll-progress");

  function onScroll() {
    var y = window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;

    if (y > 60) {
      navbar.style.backdropFilter = "blur(16px)";
      navbar.style.webkitBackdropFilter = "blur(16px)";
      navbar.style.background = "var(--glass)";
      navbar.style.borderBottom = "1px solid var(--glass-border)";
    } else {
      navbar.style.backdropFilter = "none";
      navbar.style.webkitBackdropFilter = "none";
      navbar.style.background = "transparent";
      navbar.style.borderBottom = "none";
    }

    if (progress) {
      progress.style.width = (y / h) * 100 + "%";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ─── Smooth scroll ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ─── Mobile menu ──────────────────────────────────────────
  var toggleBtn = document.getElementById("menu-toggle");
  var closeBtn = document.getElementById("menu-close");
  var menu = document.getElementById("mobile-menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", function () {
      menu.classList.remove("opacity-0", "pointer-events-none");
      menu.classList.add("opacity-100", "pointer-events-auto");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn && menu) {
    function closeMenu() {
      menu.classList.add("opacity-0", "pointer-events-none");
      menu.classList.remove("opacity-100", "pointer-events-auto");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("opacity-100")) {
        closeMenu();
      }
    });
  }

  // ─── Reveal on scroll ─────────────────────────────────────
  var revealTypes = [
    { selector: ".reveal", cls: "visible" },
    { selector: ".reveal-left", cls: "visible" },
    { selector: ".reveal-right", cls: "visible" },
    { selector: ".reveal-scale", cls: "visible" },
  ];

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target.dataset.revealClass || "visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTypes.forEach(function (rt) {
    document.querySelectorAll(rt.selector).forEach(function (el) {
      el.dataset.revealClass = rt.cls;
      observer.observe(el);
    });
  });

  // ─── Counter animation ────────────────────────────────────
  var counters = document.querySelectorAll(".counter");
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.target, 10);
          var current = 0;
          var step = Math.max(1, Math.floor(target / 40));
          var timer = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + (target >= 1000 ? "K" : "");
          }, 30);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (el) {
    counterObserver.observe(el);
  });

  // ─── Form submission ──────────────────────────────────────
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      status.className =
        "text-body-md text-center p-3 rounded block";
      status.textContent = "Enviando solicitud...";
      status.style.background = "color-mix(in srgb, var(--ember) 10%, transparent)";
      status.style.color = "var(--ember)";

      setTimeout(function () {
        status.textContent = "Recibido. Te escribimos en menos de 24 horas.";
        status.style.background = "color-mix(in srgb, #4cdf8b 10%, transparent)";
        status.style.color = "#4cdf8b";
        form.reset();

        setTimeout(function () {
          status.className = "hidden";
        }, 5000);
      }, 1200);
    });
  }
})();