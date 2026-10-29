/* =========================================================
   ICAOP — Interactividad principal
   Menú móvil, pestañas, modal de PDF, copiar cuentas y
   formularios de contacto/donantes.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initTabs();
  initModal();
  initCopyButtons();
  initForms();
  pintarDatosDinamicos();
});

/* ---------- Menú móvil ---------- */
function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const abierto = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    toggle.textContent = abierto ? "✕" : "☰";
  });
  // Cierra el menú al elegir una opción (útil en móvil)
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }
  });
}

/* ---------- Pestañas reutilizables ----------
   Estructura esperada:
   <div class="tabs" data-tabs>
     <button class="tab-btn" data-tab="a" aria-selected="true">A</button>
     <button class="tab-btn" data-tab="b">B</button>
   </div>
   <div class="tab-panel is-active" data-tab-panel="a">...</div>
   <div class="tab-panel" data-tab-panel="b">...</div>
------------------------------------------------- */
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach(grupo => {
    const botones = grupo.querySelectorAll(".tab-btn");
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        const destino = boton.getAttribute("data-tab");
        botones.forEach(b => b.setAttribute("aria-selected", b === boton ? "true" : "false"));
        const contenedorPanels = grupo.parentElement;
        contenedorPanels.querySelectorAll("[data-tab-panel]").forEach(panel => {
          panel.classList.toggle("is-active", panel.getAttribute("data-tab-panel") === destino);
        });
        // Si la URL trae un hash, lo actualizamos para permitir enlazar directo a una pestaña
        history.replaceState(null, "", `#${destino}`);
      });
    });

    // Si la URL ya trae un hash que coincide con una pestaña, la activamos al cargar
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const btnCoincide = grupo.querySelector(`[data-tab="${hash}"]`);
      if (btnCoincide) btnCoincide.click();
    }
  });
}

/* ---------- Modal genérico (usado para la Resolución de SUNAT) ---------- */
function initModal() {
  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;
  const abrirBtns = document.querySelectorAll("[data-modal-open]");
  const cerrarBtns = overlay.querySelectorAll("[data-modal-close]");

  abrirBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });
  cerrarBtns.forEach(btn => {
    btn.addEventListener("click", cerrarModal);
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });
  function cerrarModal() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }
}

/* ---------- Copiar número de cuenta al portapapeles ---------- */
function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const valor = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(valor);
        const textoOriginal = btn.textContent;
        btn.textContent = window.t ? t("¡Copiado!") : "¡Copiado!";
        btn.classList.add("copiado");
        setTimeout(() => {
          btn.textContent = textoOriginal;
          btn.classList.remove("copiado");
        }, 1800);
      } catch (err) {
        alert((window.t ? t("No se pudo copiar automáticamente. Número: ") : "No se pudo copiar automáticamente. Número: ") + valor);
      }
    });
  });
}

/* ---------- Formularios (contacto y donantes) ----------
   Nota para el equipo técnico: este sitio es estático (HTML/CSS/JS puro),
   por lo que el envío no llega a una casilla de correo por sí solo.
   Para recibir los mensajes de verdad hace falta conectar el formulario
   a un servicio de envío (por ejemplo Formspree, o un backend propio).
   Mientras tanto, se muestra una confirmación visual al enviar.
------------------------------------------------------------- */
function initForms() {
  document.querySelectorAll("form[data-form]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      if (msg) {
        msg.textContent = "¡Gracias! Tu mensaje quedó registrado. Te responderemos a la brevedad.";
        msg.className = "form-msg exito";
      }
      form.reset();
    });
  });
}

/* ---------- Inserta los datos de datos-contacto.js en el HTML ---------- */
function pintarDatosDinamicos() {
  if (typeof DATOS_ICAOP === "undefined") return;

  document.querySelectorAll("[data-dato]").forEach(el => {
    const ruta = el.getAttribute("data-dato").split(".");
    let valor = DATOS_ICAOP;
    ruta.forEach(paso => { valor = valor ? valor[paso] : undefined; });
    if (valor !== undefined) el.textContent = valor;
  });

  document.querySelectorAll("[data-copy-dato]").forEach(el => {
    const ruta = el.getAttribute("data-copy-dato").split(".");
    let valor = DATOS_ICAOP;
    ruta.forEach(paso => { valor = valor ? valor[paso] : undefined; });
    if (valor !== undefined) el.setAttribute("data-copy", valor);
  });

  document.querySelectorAll("[data-href-dato]").forEach(el => {
    const ruta = el.getAttribute("data-href-dato").split(".");
    let valor = DATOS_ICAOP;
    ruta.forEach(paso => { valor = valor ? valor[paso] : undefined; });
    if (valor) el.setAttribute("href", valor);
    else if (valor === "") (el.closest("[data-red]") || el).hidden = true;
  });
}

/* ---------- Publicaciones de Facebook (Inicio) ----------
   Muestra las publicaciones escogidas en datos-contacto.js
   (contacto.facebookPublicaciones). Facebook ya no muestra el
   muro completo a visitantes sin sesión, pero sí publicaciones
   sueltas. Si la lista está vacía, se muestra la cabecera de la
   página como respaldo. */
document.addEventListener("DOMContentLoaded", () => {
  const caja = document.querySelector("[data-fb-embed]");
  if (!caja) return;
  const pagina = caja.dataset.fbEmbed;
  const publicaciones = (typeof DATOS_ICAOP !== "undefined" && DATOS_ICAOP.contacto.facebookPublicaciones) || [];
  const locale = { en: "en_US", fr: "fr_FR", pt: "pt_BR", de: "de_DE", ru: "ru_RU", ur: "ur_PK", zh: "zh_TW", fil: "tl_PH", el: "el_GR", ar: "ar_AR" }[window.ICAOP_IDIOMA] || "es_LA";
  const ancho = () => Math.max(180, Math.min(500, Math.floor(caja.clientWidth) - 2));

  if (!publicaciones.length) {
    caja.innerHTML = `<iframe title="Publicaciones de Facebook de la Parroquia San Bartolomé Apóstol" height="140" loading="lazy" allow="encrypted-media" src="https://www.facebook.com/plugins/page.php?${new URLSearchParams({ href: pagina, tabs: "", width: ancho(), height: 140, small_header: "false", hide_cover: "false", locale })}"></iframe>`;
    return;
  }

  caja.classList.add("fb-embed--posts");
  caja.innerHTML = publicaciones.map(url =>
    `<div class="fb-post" data-href="${url.split("?")[0]}" data-width="${ancho()}" data-show-text="true"></div>`
  ).join("");
  if (!document.getElementById("fb-root")) {
    const raiz = document.createElement("div"); raiz.id = "fb-root"; document.body.prepend(raiz);
  }
  const sdk = document.createElement("script");
  sdk.async = true; sdk.defer = true; sdk.crossOrigin = "anonymous";
  sdk.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v19.0`;
  document.body.appendChild(sdk);
});

/* ---------- Botones que llevan a otra pestaña (data-ir-tab) ---------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-ir-tab]");
  if (!btn) return;
  const destino = document.querySelector(`.tab-btn[data-tab="${btn.dataset.irTab}"]`);
  if (destino) {
    destino.click();
    destino.closest("[data-tabs]").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/* ---------- Afiches ampliados (Donaciones) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("modal-afiche-overlay");
  if (!overlay) return;
  const img = overlay.querySelector("[data-afiche-img]");
  const titulo = overlay.querySelector("[data-afiche-titulo-modal]");
  const tr = (txt) => (window.t ? window.t(txt) : txt);
  let origen = null;
  const cerrar = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    if (origen) origen.focus();
  };
  document.querySelectorAll("[data-afiche]").forEach(btn => {
    btn.addEventListener("click", () => {
      origen = btn;
      img.src = btn.dataset.afiche;
      img.alt = tr(btn.dataset.aficheTitulo);
      titulo.textContent = tr(btn.dataset.aficheTitulo);
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      overlay.querySelector("[data-afiche-cerrar]").focus();
    });
  });
  overlay.querySelector("[data-afiche-cerrar]").addEventListener("click", cerrar);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) cerrar(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && overlay.classList.contains("is-open")) cerrar(); });
});
