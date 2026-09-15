/* =========================================================
   ICAOP — Componentes compartidos
   Header y footer se generan aquí una sola vez y se insertan
   en cada página. Así, si hay que cambiar el menú o el pie de
   página, se edita en un solo lugar.
   ========================================================= */

const ENLACES_NAV = [
  { href: "index.html", id: "inicio", texto: "Inicio" },
  { href: "nosotros.html", id: "nosotros", texto: "Nosotros" },
  { href: "clero.html", id: "clero", texto: "Clero" },
  { href: "obra-pastoral.html", id: "obra-pastoral", texto: "Obra Pastoral" },
  { href: "donaciones.html", id: "donaciones", texto: "Donaciones" },
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
        <img src="assets/img/logo/escudo-icaop.png" alt="Escudo ICAOP" />
        <span class="nav-brand-text">ICAOP<br>Perú</span>
      </a>
      <nav class="nav-links" id="nav-links" aria-label="Navegación principal">
        ${enlaces}
      </nav>
      <div class="nav-cta">
        <a href="donaciones.html" class="btn btn-dorado btn-sm">Donar</a>
        <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Abrir menú">☰</button>
      </div>
    </div>
  `;
}

function renderFooter() {
  const d = DATOS_ICAOP.contacto;
  const direcciones = d.direcciones.map(dir => `<li>${dir.texto}</li>`).join("");
  const telefonos = d.telefonos.map(t => `<li><a href="tel:${t.numero.replace(/\s/g,'')}">${t.numero}</a></li>`).join("");

  return `
    <div class="container footer-grid">
      <div>
        <div class="footer-brand">
          <img src="assets/img/logo/escudo-icaop.png" alt="Escudo ICAOP" />
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
          <li><a href="clero.html">Clero</a></li>
          <li><a href="obra-pastoral.html">Obra Pastoral</a></li>
          <li><a href="donaciones.html">Donaciones</a></li>
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
          <a href="${d.redesSociales.facebook}" aria-label="Facebook" target="_blank" rel="noopener">
            <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
          </a>
          <a href="${d.redesSociales.instagram}" aria-label="Instagram" target="_blank" rel="noopener">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="${d.redesSociales.tiktok}" aria-label="TikTok" target="_blank" rel="noopener">
            <i class="fa-brands fa-tiktok" aria-hidden="true"></i>
          </a>
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
}
