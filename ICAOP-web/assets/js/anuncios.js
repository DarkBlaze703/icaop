/* =========================================================
   ICAOP — Carga dinámica de Anuncios desde Google Sheets
   Lee el CSV publicado (ver anuncios-config.js), lo interpreta
   con PapaParse y reemplaza el contenido de ejemplo de las
   listas marcadas con [data-anuncios].
   Si el enlace no está configurado, o falla la conexión, no
   se toca nada: se queda el contenido de ejemplo del HTML.
   ========================================================= */

document.addEventListener("DOMContentLoaded", cargarAnuncios);

async function cargarAnuncios() {
  const contenedores = document.querySelectorAll("[data-anuncios]");
  if (!contenedores.length) return;

  if (typeof ANUNCIOS_CSV_URL === "undefined" || !ANUNCIOS_CSV_URL || ANUNCIOS_CSV_URL.includes("PEGA_AQUI")) {
    return; // no configurado todavía: se deja el contenido de ejemplo del HTML
  }
  if (typeof Papa === "undefined") {
    console.warn("PapaParse no está cargado; no se pueden leer los anuncios.");
    return;
  }

  try {
    const separador = ANUNCIOS_CSV_URL.includes("?") ? "&" : "?";
    const resp = await fetch(`${ANUNCIOS_CSV_URL}${separador}cache=${Date.now()}`);
    if (!resp.ok) throw new Error("Respuesta no válida del servidor: " + resp.status);
    const textoCsv = await resp.text();

    const resultado = Papa.parse(textoCsv.trim(), { header: true, skipEmptyLines: true });
    const filas = resultado.data;

    const anuncios = filas
      .filter(f => esPublicable(f.Publicar))
      .map(f => ({
        fecha: (f.Fecha || "").trim(),
        titulo: (f.Titulo || "").trim(),
        descripcion: (f.Descripcion || "").trim(),
        fechaOrden: parsearFecha(f.Fecha)
      }))
      .sort((a, b) => b.fechaOrden - a.fechaOrden);

    if (!anuncios.length) return; // hoja conectada pero sin anuncios publicados: se deja el ejemplo

    contenedores.forEach(cont => {
      const limite = parseInt(cont.getAttribute("data-anuncios"), 10);
      const items = Number.isFinite(limite) && limite > 0 ? anuncios.slice(0, limite) : anuncios;
      cont.innerHTML = items.map(a => `
        <li>
          <span class="punto"><i class="fa-solid fa-circle" style="font-size:8px;" aria-hidden="true"></i></span>
          <span style="flex:1;">${escapeHtml(a.titulo)}${a.descripcion ? " — " + escapeHtml(a.descripcion) : ""}</span>
          <span class="fecha">${escapeHtml(a.fecha)}</span>
        </li>
      `).join("");
    });
  } catch (err) {
    console.warn("No se pudieron cargar los anuncios desde Google Sheets. Se muestra el contenido de respaldo.", err);
  }
}

function esPublicable(valor) {
  const v = (valor || "").trim().toLowerCase();
  return v === "si" || v === "sí";
}

function parsearFecha(valor) {
  if (!valor) return 0;
  const partes = valor.trim().split("/");
  if (partes.length === 3) {
    const [d, m, a] = partes.map(Number);
    return new Date(a, m - 1, d).getTime() || 0;
  }
  const t = Date.parse(valor);
  return Number.isNaN(t) ? 0 : t;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
