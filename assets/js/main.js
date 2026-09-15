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
        btn.textContent = "¡Copiado!";
        btn.classList.add("copiado");
        setTimeout(() => {
          btn.textContent = textoOriginal;
          btn.classList.remove("copiado");
        }, 1800);
      } catch (err) {
        alert("No se pudo copiar automáticamente. Número: " + valor);
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
    if (valor !== undefined) el.setAttribute("href", valor);
  });
}
