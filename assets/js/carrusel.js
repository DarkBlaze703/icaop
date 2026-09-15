/* =========================================================
   ICAOP — Carrusel de imágenes (Home)
   Autoplay + flechas + puntos + deslizar con el dedo en móvil.
   Para agregar/cambiar fotos: ver assets/img/carrusel/LEEME.txt
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.querySelector("[data-carrusel]");
  if (!carrusel) return;

  const track = carrusel.querySelector(".carrusel-track");
  const slides = Array.from(carrusel.querySelectorAll(".carrusel-slide"));
  const dotsCont = carrusel.querySelector(".carrusel-dots");
  if (!slides.length) return;

  let indice = 0;
  let autoplayId = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "carrusel-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
    dot.addEventListener("click", () => irA(i));
    dotsCont.appendChild(dot);
  });
  const dots = Array.from(dotsCont.children);

  function irA(i) {
    indice = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${indice * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle("is-active", di === indice));
  }

  carrusel.querySelector(".carrusel-flecha.next").addEventListener("click", () => { irA(indice + 1); reiniciarAutoplay(); });
  carrusel.querySelector(".carrusel-flecha.prev").addEventListener("click", () => { irA(indice - 1); reiniciarAutoplay(); });

  function autoplay() { irA(indice + 1); }
  function reiniciarAutoplay() {
    clearInterval(autoplayId);
    autoplayId = setInterval(autoplay, 5000);
  }
  reiniciarAutoplay();
  carrusel.addEventListener("mouseenter", () => clearInterval(autoplayId));
  carrusel.addEventListener("mouseleave", reiniciarAutoplay);

  // Deslizar con el dedo (móvil)
  let xInicial = null;
  carrusel.addEventListener("touchstart", (e) => { xInicial = e.touches[0].clientX; }, { passive: true });
  carrusel.addEventListener("touchend", (e) => {
    if (xInicial === null) return;
    const diff = e.changedTouches[0].clientX - xInicial;
    if (Math.abs(diff) > 40) irA(diff > 0 ? indice - 1 : indice + 1);
    xInicial = null;
    reiniciarAutoplay();
  });
});
