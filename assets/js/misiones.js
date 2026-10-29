/* =========================================================
   ICAOP — Misiones: botones de región + ventana de detalle
   Lee MISIONES_ICAOP (misiones-datos.js), arma los botones dentro
   de [data-misiones-grid] y, al hacer clic, abre una ventana
   (igual que la de Proyectos) con el encargado, la reseña de
   actividades y la galería de fotos de la región.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-misiones-grid]");
  if (!grid || typeof MISIONES_ICAOP === "undefined") return;

  grid.innerHTML = MISIONES_ICAOP.map((m, i) => `
    <button type="button" class="card region-btn" data-mision-index="${i}">
      <span class="region-nombre"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escaparMision(m.region)}</span>
      ${(m.misiones || []).length ? `<span class="region-cuenta">${m.misiones.length} ${m.misiones.length === 1 ? "parroquia u obra" : "parroquias y obras"}</span>` : ""}
      <span class="region-ver">Ver misión <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  `).join("");

  grid.querySelectorAll("[data-mision-index]").forEach(btn => {
    btn.addEventListener("click", () => abrirModalMision(parseInt(btn.dataset.misionIndex, 10)));
  });

  const overlay = document.getElementById("modal-mision-overlay");
  if (!overlay) return;
  overlay.querySelectorAll("[data-modal-close]").forEach(b => b.addEventListener("click", cerrarModalMision));
  overlay.addEventListener("click", e => { if (e.target === overlay) cerrarModalMision(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarModalMision(); });
});

const TEXTO_PENDIENTE = "Información en preparación.";

function abrirModalMision(index) {
  const m = MISIONES_ICAOP[index];
  const overlay = document.getElementById("modal-mision-overlay");
  if (!m || !overlay) return;

  overlay.querySelector("[data-mision-titulo]").textContent = "Misión " + m.region;

  const encargado = overlay.querySelector("[data-mision-encargado]");
  encargado.textContent = m.encargado || TEXTO_PENDIENTE;
  encargado.classList.toggle("pendiente", !m.encargado);
  const cargo = overlay.querySelector("[data-mision-cargo]");
  cargo.textContent = m.cargo || "";
  cargo.hidden = !m.cargo;

  const resena = overlay.querySelector("[data-mision-resena]");
  resena.textContent = m.resena || TEXTO_PENDIENTE;
  resena.classList.toggle("pendiente", !m.resena);

  const lista = overlay.querySelector("[data-mision-lista]");
  const listaWrap = overlay.querySelector("[data-mision-lista-wrap]");
  const items = m.misiones || [];
  listaWrap.hidden = items.length === 0;
  lista.innerHTML = items.map(it => {
    const tels = (it.telefonos || []).map(t =>
      `<a href="tel:${telefonoMision(t)}">${escaparMision(t)}</a>`).join(" · ");
    return `<li>
      <strong>${escaparMision(it.nombre)}</strong>
      ${it.lugar ? `<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escaparMision(it.lugar)}</span>` : ""}
      ${it.personas ? `<span><i class="fa-solid fa-users" aria-hidden="true"></i> Atiende a ${escaparMision(it.personas)} personas</span>` : ""}
      ${tels ? `<span><i class="fa-solid fa-phone" aria-hidden="true"></i> ${tels}</span>` : ""}
      ${it.nota ? `<span class="nota">${escaparMision(it.nota)}</span>` : ""}
    </li>`;
  }).join("");

  const galeria = overlay.querySelector("[data-mision-galeria]");
  const miniaturas = overlay.querySelector("[data-mision-miniaturas]");
  galeria.classList.toggle("sin-fotos", !(m.numImagenes > 0));
  if (m.numImagenes > 0) {
    galeria.innerHTML = `<img src="${m.carpetaImagenes}01.jpg" alt="Trabajo de campo en ${escaparMision(m.region)}">`;
    let html = "";
    for (let i = 1; i <= m.numImagenes; i++) {
      const n = String(i).padStart(2, "0");
      html += `<button type="button" data-img="${m.carpetaImagenes}${n}.jpg" class="${i === 1 ? "is-active" : ""}"><img src="${m.carpetaImagenes}${n}.jpg" alt="Foto ${i}" loading="lazy"></button>`;
    }
    miniaturas.innerHTML = html;
    miniaturas.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        galeria.querySelector("img").src = btn.dataset.img;
        miniaturas.querySelectorAll("button").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  } else {
    galeria.innerHTML = `<div class="galeria-pendiente"><i class="fa-solid fa-images" aria-hidden="true"></i><span>Fotos de los trabajos de campo próximamente</span></div>`;
    miniaturas.innerHTML = "";
  }

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function cerrarModalMision() {
  const overlay = document.getElementById("modal-mision-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

function telefonoMision(t) {
  const d = String(t).replace(/\D/g, "");
  return d.startsWith("01") ? "+51" + d.slice(1) : "+51" + d;
}

function escaparMision(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
