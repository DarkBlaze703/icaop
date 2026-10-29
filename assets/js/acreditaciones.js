/* =========================================================
   ICAOP — Acreditaciones: tarjetas + visor de PDF
   Los documentos se editan en acreditaciones-datos.js.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.querySelector("[data-acreditaciones]");
  if (!lista || typeof ACREDITACIONES_ICAOP === "undefined") return;

  lista.innerHTML = ACREDITACIONES_ICAOP.map((d, i) => `
    <article class="doc-card">
      <div class="doc-icono"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i></div>
      <div class="doc-info">
        <span class="doc-emisor">${d.emisor}</span>
        <h3>${d.titulo}</h3>
        <p>${d.descripcion}</p>
        <ul class="doc-meta">
          ${d.fecha ? `<li><i class="fa-regular fa-calendar" aria-hidden="true"></i> <span>Fecha:</span> <strong>${d.fecha}</strong></li>` : ""}
          ${d.vigencia ? `<li><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i> <span>Vigencia:</span> <strong>${d.vigencia}</strong></li>` : ""}
        </ul>
      </div>
      <div class="doc-acciones">
        <button type="button" class="btn btn-primario btn-sm" data-doc-index="${i}"><i class="fa-solid fa-eye" aria-hidden="true"></i> Ver documento</button>
        <a class="btn btn-contorno btn-sm" href="${d.archivo}" download><i class="fa-solid fa-download" aria-hidden="true"></i> Descargar PDF</a>
      </div>
    </article>
  `).join("");

  const overlay = document.getElementById("modal-doc-overlay");
  const titulo = overlay.querySelector("[data-doc-titulo]");
  const iframe = overlay.querySelector("iframe");
  const abrir = overlay.querySelector("[data-doc-abrir]");
  const bajar = overlay.querySelector("[data-doc-descargar]");
  let origen = null;

  const cerrar = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    iframe.src = "about:blank";
    if (origen) origen.focus();
  };

  lista.querySelectorAll("[data-doc-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      const d = ACREDITACIONES_ICAOP[parseInt(btn.dataset.docIndex, 10)];
      origen = btn;
      titulo.textContent = d.titulo;
      iframe.src = d.archivo;
      iframe.title = d.titulo;
      abrir.href = d.archivo;
      bajar.href = d.archivo;
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      overlay.querySelector(".modal-close").focus();
    });
  });
  overlay.querySelector(".modal-close").addEventListener("click", cerrar);
  overlay.addEventListener("click", e => { if (e.target === overlay) cerrar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && overlay.classList.contains("is-open")) cerrar(); });
});
