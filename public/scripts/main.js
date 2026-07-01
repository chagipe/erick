(function () {
  "use strict";

  // ─── Page loader ───────────────────────────────────────────
  var loader = document.getElementById("page-loader");
  var bar = document.getElementById("loader-bar");
  var hero = document.getElementById("hero");

  function startPage() {
    if (!loader) {
      if (hero) hero.classList.add("hero-ready");
      return;
    }

    // Fill the bar
    if (bar) {
      bar.style.width = "100%";
    }

    // After bar fill + hold, hide loader and start hero
    var delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 400
      : 2200;

    setTimeout(function () {
      loader.classList.add("loaded");

      // After loader transition ends, trigger hero
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
          var offset = pct * 30;
          heroImgs.forEach(function (img) {
            img.style.transform = "translateY(" + offset + "px)";
          });
        }
      },
      { passive: true }
    );
  }

  // Kick off on first paint
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
      navbar.classList.add("bg-ink/90", "backdrop-blur-md", "shadow-lg", "shadow-ink/50");
    } else {
      navbar.classList.remove("bg-ink/90", "backdrop-blur-md", "shadow-lg", "shadow-ink/50");
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
  var toggle = document.getElementById("menu-toggle");
  var closeBtn = document.getElementById("menu-close");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
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
        "text-body-md text-center p-3 rounded bg-ember/10 text-ember block";
      status.textContent = "Enviando solicitud...";

      setTimeout(function () {
        status.className =
          "text-body-md text-center p-3 rounded bg-[#1a3a2a]/50 text-[#4cdf8b] block";
        status.textContent = "Recibido. Te escribimos en menos de 24 horas.";
        form.reset();

        setTimeout(function () {
          status.className = "hidden";
        }, 5000);
      }, 1200);
    });
  }
})();
