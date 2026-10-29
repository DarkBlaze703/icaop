/* =========================================================
   ICAOP — Componentes compartidos
   Header y footer se generan aquí una sola vez y se insertan
   en cada página. Así, si hay que cambiar el menú o el pie de
   página, se edita en un solo lugar.
   ========================================================= */

const ENLACES_NAV = [
  { href: "index.html", id: "inicio", texto: "Inicio" },
  { href: "nosotros.html", id: "nosotros", texto: "Nosotros" },
  { href: "clero.html", id: "clero", texto: "Miembros del Santo Sínodo" },
  { href: "obra-pastoral.html", id: "obra-pastoral", texto: "Obra Pastoral" },
  { href: "extension-apostolica.html", id: "extension", texto: "Extensión apostólica" },
  { href: "anuncios.html", id: "anuncios", texto: "Anuncios" },
  { href: "contacto.html", id: "contacto", texto: "Contacto" }
];

function renderHeader(paginaActual) {
  const enlaces = ENLACES_NAV.map(en => {
    const actual = en.id === paginaActual ? ' aria-current="page"' : '';
    return `<a href="${en.href}"${actual}>${en.texto}</a>`;
  }).join("");

  return `
    <div class="container nav-bar">
      <a href="index.html" class="nav-brand">
        <img src="assets/img/logo/logo-icaop-crema.png" alt="Logo ICAOP" />
        <span class="nav-brand-text">ICAOP<br>Perú</span>
      </a>
      <nav class="nav-links" id="nav-links" aria-label="Navegación principal">
        ${enlaces}
      </nav>
      <div class="nav-cta">
        <a href="donaciones.html" class="btn btn-dorado btn-sm">Donar</a>
        ${renderSelectorIdioma()}
        <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Abrir menú">☰</button>
      </div>
    </div>
  `;
}

function renderSelectorIdioma() {
  const actual = window.ICAOP_IDIOMA || "es";
  const bandera = window.banderaIdioma || (() => "");
  const lista = window.ICAOP_IDIOMAS || [{ cod: "es", nombre: "Español", corto: "ES" }];
  const datos = lista.find(l => l.cod === actual) || lista[0];
  return `
    <div class="idioma" data-idioma data-no-traducir>
      <button type="button" class="idioma-btn" aria-haspopup="true" aria-expanded="false" aria-label="Idioma · Language">
        ${bandera(actual)}<span class="idioma-cod">${datos.corto}</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
      <ul class="idioma-menu" hidden>
        ${lista.map(o => `
          <li><button type="button" data-lang="${o.cod}" lang="${o.html || o.cod}" ${o.rtl ? 'dir="rtl"' : ""} ${o.cod === actual ? 'aria-current="true"' : ""}>
            ${bandera(o.cod)}<span>${o.nombre}</span>${o.cod === actual ? '<i class="fa-solid fa-check" aria-hidden="true"></i>' : ""}
          </button></li>`).join("")}
      </ul>
    </div>`;
}

function renderFooter() {
  const d = DATOS_ICAOP.contacto;
  const direcciones = d.direcciones.map(dir => `<li>${dir.texto}</li>`).join("");
  const telefonos = d.telefonos.map(t => `<li><a href="tel:${t.numero.replace(/\s/g,'')}">${t.numero}</a></li>`).join("");

  return `
    <div class="container footer-grid">
      <div>
        <div class="footer-brand">
          <img src="assets/img/logo/logo-icaop-crema.png" alt="Logo ICAOP" />
          <div>
            <strong>${DATOS_ICAOP.institucion.nombre}</strong>
            <div class="lema">"En la Fe y en la Sucesión Apostólica"</div>
          </div>
        </div>
        <p>RUC ${DATOS_ICAOP.institucion.ruc} · Rito Ortodoxo Occidental</p>
      </div>

      <div>
        <h4>Enlaces rápidos</h4>
        <ul>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="clero.html">Miembros del Santo Sínodo</a></li>
          <li><a href="obra-pastoral.html">Obra Pastoral</a></li>
          <li><a href="extension-apostolica.html">Extensión apostólica</a></li>
          <li><a href="donaciones.html">Donaciones</a></li>
          <li><a href="acreditaciones.html">Acreditaciones</a></li>
          <li><a href="administracion.html">Administración</a></li>
          <li><a href="anuncios.html">Anuncios</a></li>
        </ul>
      </div>

      <div>
        <h4>Contacto</h4>
        <ul>
          ${direcciones}
          ${telefonos}
          <li><a href="mailto:${d.correo}">${d.correo}</a></li>
        </ul>
      </div>

      <div>
        <h4>Síguenos</h4>
        <div class="footer-social">
          ${[["facebook","fa-facebook-f","Facebook"],["instagram","fa-instagram","Instagram"],["tiktok","fa-tiktok","TikTok"]]
            .filter(([k]) => d.redesSociales[k])
            .map(([k,ico,nom]) => `<a href="${d.redesSociales[k]}" aria-label="${nom}" target="_blank" rel="noopener"><i class="fa-brands ${ico}" aria-hidden="true"></i></a>`)
            .join("")}
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; ${new Date().getFullYear()} ${DATOS_ICAOP.institucion.nombre}. Todos los derechos reservados.
    </div>
  `;
}

function montarComponentes(paginaActual) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = renderHeader(paginaActual);
  if (footerEl) footerEl.innerHTML = renderFooter();
  montarBotonArriba();
  if (headerEl) ajustarMenuCompacto(headerEl);
}

/* Si los enlaces del menú no caben en una línea (p. ej. en idiomas
   con palabras largas), el menú pasa a modo hamburguesa. */
function ajustarMenuCompacto(headerEl) {
  const medir = () => {
    headerEl.classList.remove("nav-compacta");
    const barra = headerEl.querySelector(".nav-bar");
    if (!barra || window.innerWidth <= 900) return;
    headerEl.classList.toggle("nav-compacta", barra.scrollWidth > barra.clientWidth + 1);
  };
  medir();
  setTimeout(medir, 300);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  window.addEventListener("resize", medir);
}

/* Botón para volver al inicio de la página (aparece al bajar) */
function montarBotonArriba() {
  if (document.querySelector(".btn-arriba")) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-arriba";
  btn.setAttribute("aria-label", "Volver arriba");
  btn.setAttribute("title", "Volver arriba");
  btn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i><span class="btn-arriba-txt">Subir</span>';
  document.body.appendChild(btn);
  const actualizar = () => btn.classList.toggle("is-visible", window.scrollY > 400);
  window.addEventListener("scroll", actualizar, { passive: true });
  actualizar();
  btn.addEventListener("click", () => {
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: suave ? "smooth" : "auto" });
  });
}
