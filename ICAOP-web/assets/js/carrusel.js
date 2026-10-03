/* =========================================================
   ICAOP — Fotos de la portada (Inicio)
   Las fotos cambian solas con un fundido suave cada 6 segundos.
   Las marcas de abajo permiten elegir una foto, y el botón
   de pausa detiene el cambio automático.
   Para cambiar las fotos: reemplaza los archivos de
   assets/img/carrusel/ manteniendo los nombres (01.jpg ... 05.jpg).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const cont = document.querySelector("[data-fotos]");
  if (!cont) return;

  const fotos = Array.from(cont.querySelectorAll("img"));
  const marcas = cont.querySelector("[data-marcas]");
  const pausaBtn = cont.querySelector("[data-pausa]");
  if (fotos.length < 2) { if (pausaBtn) pausaBtn.hidden = true; return; }

  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let actual = 0;
  let timer = null;
  let pausado = menosMovimiento;

  // Si una foto no existe, se quita del ciclo en silencio
  fotos.forEach(img => img.addEventListener("error", () => {
    const i = fotos.indexOf(img);
    if (i > -1) { fotos.splice(i, 1); img.remove(); crearMarcas(); }
  }));

  function crearMarcas() {
    marcas.innerHTML = "";
    fotos.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Ver foto ${i + 1} de ${fotos.length}`);
      b.innerHTML = "<span></span>";
      if (i === actual) b.setAttribute("aria-current", "true");
      b.addEventListener("click", () => { mostrar(i); reiniciar(); });
      marcas.appendChild(b);
    });
  }

  function mostrar(i) {
    actual = (i + fotos.length) % fotos.length;
    fotos.forEach((img, j) => img.classList.toggle("is-active", j === actual));
    Array.from(marcas.children).forEach((b, j) => {
      if (j === actual) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    });
  }

  function reiniciar() {
    clearInterval(timer);
    if (!pausado) timer = setInterval(() => mostrar(actual + 1), 6000);
  }

  function actualizarPausa() {
    pausaBtn.setAttribute("aria-label", pausado ? "Reanudar fotos" : "Pausar fotos");
    pausaBtn.innerHTML = `<i class="fa-solid ${pausado ? "fa-play" : "fa-pause"}" aria-hidden="true"></i>`;
  }

  pausaBtn.addEventListener("click", () => { pausado = !pausado; actualizarPausa(); reiniciar(); });

  // Deslizar con el dedo en celular
  let x0 = null;
  cont.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  cont.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { mostrar(dx > 0 ? actual - 1 : actual + 1); reiniciar(); }
    x0 = null;
  });

  crearMarcas();
  actualizarPausa();
  reiniciar();
});
