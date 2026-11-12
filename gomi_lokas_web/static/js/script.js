// Gomi Lokas: menú móvil, animaciones de entrada y detalles interactivos.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        menuButton.textContent = "☰";
      });
    });
  }

  // Revela tarjetas y secciones cuando entran en la pantalla.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Efecto parallax suave: el fondo de la portada se desplaza más lento que el scroll.
  const hero = document.querySelector(".hero");
  let ticking = false;
  const updateParallax = () => {
    if (hero && window.innerWidth > 720 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const offset = Math.round(rect.top * -0.12);
        hero.style.backgroundPosition = `center, center ${offset}px`;
        const art = hero.querySelector(".hero-art");
        if (art) art.style.translate = `0 ${Math.round(offset * 0.22)}px`;
      }
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Si el visitante elige un producto, deja el nombre en el mensaje de WhatsApp.
  document.querySelectorAll("[data-product]").forEach(link => {
    link.addEventListener("click", () => {
      const product = link.getAttribute("data-product");
      const whatsapp = document.querySelector(".final-cta .btn");
      if (whatsapp && product) {
        whatsapp.href = "https://wa.me/573169437695?text=" +
          encodeURIComponent(`Hola Gomi Lokas, quiero información sobre ${product}.`);
      }
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});