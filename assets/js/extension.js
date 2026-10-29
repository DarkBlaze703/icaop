/* =========================================================
   ICAOP — Extensión apostólica
   Pinta la cuadrícula de países (con su bandera) y, al hacer
   clic, abre una ventana con sus arquidiócesis, diócesis,
   vicariatos apostólicos, vicarías, misiones y obras pastorales.
   Los datos están en extension-datos.js.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-paises-grid]");
  if (!grid || typeof PAISES_ICAOP === "undefined") return;

  grid.innerHTML = PAISES_ICAOP.map((p, i) => `
    <button type="button" class="pais-btn" data-pais-index="${i}">
      <img class="pais-bandera" src="assets/img/banderas/${p.codigo}.svg" alt="" width="64" height="48" loading="lazy">
      <span class="pais-nombre">${p.nombre}</span>
      <span class="pais-ver">Ver presencia <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  `).join("");

  grid.querySelectorAll("[data-pais-index]").forEach(btn => {
    btn.addEventListener("click", () => abrirPais(parseInt(btn.dataset.paisIndex, 10), btn));
  });

  const overlay = document.getElementById("modal-pais-overlay");
  overlay.querySelectorAll("[data-modal-close]").forEach(b => b.addEventListener("click", cerrarPais));
  overlay.addEventListener("click", e => { if (e.target === overlay) cerrarPais(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && overlay.classList.contains("is-open")) cerrarPais(); });
});

let _paisOrigen = null;

function abrirPais(index, origen) {
  const p = PAISES_ICAOP[index];
  if (!p) return;
  _paisOrigen = origen || null;
  const overlay = document.getElementById("modal-pais-overlay");

  overlay.querySelector("[data-pais-bandera]").src = `assets/img/banderas/${p.codigo}.svg`;
  overlay.querySelector("[data-pais-titulo]").textContent = p.nombre;

  overlay.querySelector("[data-pais-categorias]").innerHTML = CATEGORIAS_EXTENSION.map(c => {
    const items = Array.isArray(p[c.clave]) ? p[c.clave] : [];
    const contenido = items.length
      ? `<ul>${items.map(t => `<li>${escaparPais(t)}</li>`).join("")}</ul>`
      : `<p class="pendiente">Información próximamente.</p>`;
    return `
      <section class="pais-categoria">
        <h4><i class="fa-solid ${c.icono}" aria-hidden="true"></i> ${c.titulo}</h4>
        ${contenido}
      </section>`;
  }).join("");

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  overlay.querySelector(".modal-close").focus();
}

function cerrarPais() {
  const overlay = document.getElementById("modal-pais-overlay");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  if (_paisOrigen) _paisOrigen.focus();
}

function escaparPais(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
