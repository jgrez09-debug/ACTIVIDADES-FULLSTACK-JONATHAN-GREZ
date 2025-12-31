/* global bootstrap */
$(function () {
  $("#year").text(new Date().getFullYear());

  // ===== Tema Bootstrap (dark/light) =====
  function setTheme(next) {
    document.documentElement.setAttribute("data-bs-theme", next);

    const $btn = $("#btnTheme");
    if (next === "light") {
      $btn.removeClass("btn-outline-primary").addClass("btn-outline-dark");
      $btn.find("i").removeClass("bi-moon-stars").addClass("bi-sun");
      $btn.find("span").text("Claro");
    } else {
      $btn.removeClass("btn-outline-dark").addClass("btn-outline-primary");
      $btn.find("i").removeClass("bi-sun").addClass("bi-moon-stars");
      $btn.find("span").text("Oscuro");
    }
  }

  $("#btnTheme").on("click", function () {
    const current = document.documentElement.getAttribute("data-bs-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  // ===== Smooth scroll =====
  $('a.nav-link[href^="#"], a[href="#top"]').on("click", function (e) {
    const target = $(this.getAttribute("href"));
    if (!target.length) return;

    e.preventDefault();

    // Cierra menú en mobile
    const nav = $("#navCv");
    if (nav.hasClass("show")) {
      bootstrap.Collapse.getOrCreateInstance(nav[0]).hide();
    }

    $("html, body").animate({ scrollTop: target.offset().top - 70 }, 400);
  });

  // ===== Reveal on scroll =====
  function revealCheck() {
    const bottom = $(window).scrollTop() + $(window).height();
    $(".reveal").each(function () {
      if (bottom > $(this).offset().top + 80) $(this).addClass("show");
    });
  }
  $(window).on("scroll", revealCheck);
  revealCheck();

  // ===== Formulario: validación en tiempo real =====
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  function validName() {
    const v = $("#name").val().trim();
    const ok = v.length >= 2;
    $("#name").toggleClass("is-invalid", !ok).toggleClass("is-valid", ok);
    return ok;
  }
  function validEmail() {
    const v = $("#email").val().trim();
    const ok = emailRegex.test(v);
    $("#email").toggleClass("is-invalid", !ok).toggleClass("is-valid", ok);
    return ok;
  }
  function validMsg() {
    const v = $("#message").val().trim();
    const ok = v.length >= 10;
    $("#message").toggleClass("is-invalid", !ok).toggleClass("is-valid", ok);
    return ok;
  }

  $("#name").on("input blur", validName);
  $("#email").on("input blur", validEmail);
  $("#message").on("input blur", validMsg);

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    const ok = (validName() & validEmail() & validMsg()); // evalúa todas

    if (!ok) {
      $("#formStatus").text("Revisa los campos marcados.");
      return;
    }

    $("#formStatus").text("Mensaje listo (demo) ✅");
    setTimeout(() => {
      this.reset();
      $(".is-valid").removeClass("is-valid");
      $("#formStatus").text("");
    }, 900);
  });

  // Inicial: oscuro
  setTheme("dark");
});
