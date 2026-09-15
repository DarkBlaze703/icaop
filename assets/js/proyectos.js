/* =========================================================
   ICAOP — Proyectos: tarjetas + modal de detalle con galería
   Lee PROYECTOS_ICAOP (proyectos-datos.js) y arma las tarjetas
   dentro de [data-proyectos-grid]. Al hacer clic en "Ver más",
   abre un modal reutilizable con la descripción, el presupuesto
   (si existe) y una galería de imágenes.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-proyectos-grid]");
  if (!grid || typeof PROYECTOS_ICAOP === "undefined") return;

  pintarTarjetasProyectos(grid);
  initModalProyecto();
});

function pintarTarjetasProyectos(grid) {
  grid.innerHTML = PROYECTOS_ICAOP.map((p, index) => {
    const primeraImagen = p.numImagenes > 0 ? `${p.carpetaImagenes}01.jpg` : "";
    const chipTexto = p.estado === "ejecutado" ? "Ejecutado" : "Por ejecutar";
    return `
      <div class="card card-proyecto">
        <div class="card-foto">
          ${primeraImagen
            ? `<img src="${primeraImagen}" alt="${escapeHtml(p.titulo)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <span class="placeholder-txt" style="display:none;"><i class="fa-solid fa-diagram-project"></i><br>${escapeHtml(p.carpetaImagenes)}01.jpg</span>`
            : `<span class="placeholder-txt"><i class="fa-solid fa-diagram-project"></i><br>${escapeHtml(p.carpetaImagenes)}01.jpg</span>`
          }
        </div>
        <span class="estado-chip ${p.estado}">${chipTexto}</span>
        <h3>${escapeHtml(p.titulo)}</h3>
        <p style="color:var(--color-gris);">${escapeHtml(p.resumen)}</p>
        <button class="ver-mas" data-proyecto-index="${index}">Ver más información <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    `;
  }).join("");

  grid.querySelectorAll("[data-proyecto-index]").forEach(btn => {
    btn.addEventListener("click", () => abrirModalProyecto(parseInt(btn.getAttribute("data-proyecto-index"), 10)));
  });
}

let _proyectoImagenActual = 0;

function initModalProyecto() {
  const overlay = document.getElementById("modal-proyecto-overlay");
  if (!overlay) return;
  overlay.querySelectorAll("[data-modal-close]").forEach(btn => btn.addEventListener("click", cerrarModalProyecto));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) cerrarModalProyecto(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModalProyecto(); });
}

function cerrarModalProyecto() {
  const overlay = document.getElementById("modal-proyecto-overlay");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

function abrirModalProyecto(index) {
  const p = PROYECTOS_ICAOP[index];
  if (!p) return;
  const overlay = document.getElementById("modal-proyecto-overlay");

  overlay.querySelector("[data-proyecto-titulo]").textContent = p.titulo;
  overlay.querySelector("[data-proyecto-descripcion]").textContent = p.descripcion;
  overlay.querySelector("[data-proyecto-estado]").textContent = p.estado === "ejecutado" ? "Ejecutado" : "Por ejecutar";
  overlay.querySelector("[data-proyecto-estado]").className = "estado-chip " + p.estado;

  // Galería
  _proyectoImagenActual = 0;
  const galeria = overlay.querySelector("[data-proyecto-galeria]");
  const miniaturas = overlay.querySelector("[data-proyecto-miniaturas]");
  if (p.numImagenes > 0) {
    galeria.innerHTML = `<img src="${p.carpetaImagenes}01.jpg" alt="${escapeHtml(p.titulo)}">`;
    let htmlMini = "";
    for (let i = 1; i <= p.numImagenes; i++) {
      const num = String(i).padStart(2, "0");
      htmlMini += `<button data-img="${p.carpetaImagenes}${num}.jpg" class="${i === 1 ? "is-active" : ""}"><img src="${p.carpetaImagenes}${num}.jpg" alt="Foto ${i}" loading="lazy"></button>`;
    }
    miniaturas.innerHTML = htmlMini;
    miniaturas.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        galeria.querySelector("img").src = btn.getAttribute("data-img");
        miniaturas.querySelectorAll("button").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  } else {
    galeria.innerHTML = `<div class="placeholder-txt" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;"><i class="fa-solid fa-images"></i>&nbsp; Fotos pendientes</div>`;
    miniaturas.innerHTML = "";
  }

  // Presupuesto
  const contPresupuesto = overlay.querySelector("[data-proyecto-presupuesto]");
  if (p.presupuesto) {
    const filas = p.presupuesto.filas.map(([nombre, monto]) => `
      <tr><td>${escapeHtml(nombre)}</td><td>${p.presupuesto.moneda} ${monto}</td></tr>
    `).join("");
    contPresupuesto.innerHTML = `
      <h3>Presupuesto referencial</h3>
      <table class="tabla-presupuesto">
        <thead><tr><th>Partida</th><th>Monto</th></tr></thead>
        <tbody>
          ${filas}
          <tr class="total-final"><td>Total estimado</td><td>${p.presupuesto.moneda} ${p.presupuesto.totalSoles} (≈ US$ ${p.presupuesto.totalDolares})</td></tr>
        </tbody>
      </table>
      <p style="font-size:var(--texto-sm);color:var(--color-gris);margin-top:8px;">Presupuesto referencial sujeto a actualización según avance del expediente técnico.</p>
    `;
    contPresupuesto.style.display = "block";
  } else {
    contPresupuesto.style.display = "none";
    contPresupuesto.innerHTML = "";
  }

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
