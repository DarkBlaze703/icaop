/* =========================================================
   ICAOP — Idiomas (español / inglés)
   - El idioma elegido se guarda en el navegador y viaja en los
     enlaces como ?lang=en, así se mantiene al cambiar de página.
   - Los textos en inglés están en assets/js/i18n-en.js.
   - Este archivo va en el <head> de cada página, antes que
     los demás scripts.
   ========================================================= */

(function () {
  // Idiomas disponibles: código, nombre propio, código corto del botón y si se escribe de derecha a izquierda
  // Español primero; el resto en orden alfabético según su nombre propio
  const LISTA = [
    { cod: "es",  nombre: "Español",   corto: "ES" },
    { cod: "de",  nombre: "Deutsch",   corto: "DE" },
    { cod: "en",  nombre: "English",   corto: "EN" },
    { cod: "fil", nombre: "Filipino",  corto: "FIL" },
    { cod: "fr",  nombre: "Français",  corto: "FR" },
    { cod: "pt",  nombre: "Português", corto: "PT" },
    { cod: "el",  nombre: "Ελληνικά",  corto: "EL" },
    { cod: "ru",  nombre: "Русский",   corto: "RU" },
    { cod: "ar",  nombre: "العربية",   corto: "AR", rtl: true },
    { cod: "ur",  nombre: "اردو",      corto: "UR", rtl: true },
    { cod: "zh",  nombre: "繁體中文",   corto: "中文", html: "zh-Hant" }
  ];
  const IDIOMAS = LISTA.map(l => l.cod);
  window.ICAOP_IDIOMAS = LISTA;
  const CLAVE = "icaop-idioma";

  function leerIdioma() {
    let desdeUrl = null;
    try { desdeUrl = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (desdeUrl && IDIOMAS.includes(desdeUrl)) {
      try { localStorage.setItem(CLAVE, desdeUrl); } catch (e) {}
      return desdeUrl;
    }
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (IDIOMAS.includes(guardado)) return guardado;
    } catch (e) {}
    return "es";
  }

  const idioma = leerIdioma();
  window.ICAOP_IDIOMA = idioma;

  /* ---------- Banderas (SVG en línea, proporción 3:2) ---------- */
  let contador = 0;
  function franjasH(colores) {
    const h = 40 / colores.length;
    return colores.map((c, i) => `<rect y="${(i * h).toFixed(2)}" width="60" height="${(h + 0.1).toFixed(2)}" fill="${c}"/>`).join("");
  }
  function franjasV(colores) {
    const w = 60 / colores.length;
    return colores.map((c, i) => `<rect x="${(i * w).toFixed(2)}" width="${(w + 0.1).toFixed(2)}" height="40" fill="${c}"/>`).join("");
  }
  function eeuu() {
    let franjas = "";
    for (let i = 0; i < 13; i += 2) franjas += `<rect y="${(i * 40 / 13).toFixed(2)}" width="60" height="${(40 / 13).toFixed(2)}" fill="#B22234"/>`;
    let estrellas = "";
    for (let f = 0; f < 4; f++) for (let c = 0; c < 5; c++) estrellas += `<circle cx="${2.6 + c * 4.6 + (f % 2) * 2.3}" cy="${2.5 + f * 4.6}" r="0.95" fill="#fff"/>`;
    return `<rect width="60" height="40" fill="#fff"/>${franjas}<rect width="26" height="${(7 * 40 / 13).toFixed(2)}" fill="#3C3B6E"/>${estrellas}`;
  }
  function reinoUnido(id) {
    return `<svg x="0" y="0" width="60" height="40" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <clipPath id="${id}t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#${id}t)" stroke="#C8102E" stroke-width="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>`;
  }
  function portugal() {
    return `<rect width="60" height="40" fill="#FF0000"/><rect width="24" height="40" fill="#006600"/>
      <circle cx="24" cy="20" r="7.5" fill="#FFCC00"/><circle cx="24" cy="20" r="5.2" fill="#fff"/>
      <path d="M20.6,16.2 h6.8 v5.6 a3.4,3.4 0 0 1 -6.8,0 z" fill="#FF0000"/>
      <path d="M22.2,17.6 h3.6 v3.8 a1.8,1.8 0 0 1 -3.6,0 z" fill="#fff"/>`;
  }
  function brasil() {
    return `<rect width="60" height="40" fill="#009C3B"/><polygon points="30,4.5 55,20 30,35.5 5,20" fill="#FFDF00"/>
      <circle cx="30" cy="20" r="8.5" fill="#002776"/>
      <path d="M21.8,18.2 q8.2,-2.6 16.4,2.6" stroke="#fff" stroke-width="1.4" fill="none"/>`;
  }
  function diagonal(id, arriba, abajo) {
    return `<defs><clipPath id="${id}a"><polygon points="0,0 60,0 0,40"/></clipPath>
      <clipPath id="${id}b"><polygon points="60,0 60,40 0,40"/></clipPath></defs>
      <g clip-path="url(#${id}a)">${arriba}</g><g clip-path="url(#${id}b)">${abajo}</g>
      <line x1="60" y1="0" x2="0" y2="40" stroke="#fff" stroke-width="1.6"/>`;
  }
  const DIBUJOS = {
    es: () => franjasV(["#D91023", "#fff", "#D91023"]),
    en: id => diagonal(id, eeuu(), reinoUnido(id)),
    fr: () => franjasV(["#002395", "#fff", "#ED2939"]),
    pt: id => diagonal(id, portugal(), brasil()),
    de: () => franjasH(["#000", "#DD0000", "#FFCE00"]),
    ru: () => franjasH(["#fff", "#0039A6", "#D52B1E"]),
    ur: () => `<rect width="60" height="40" fill="#01411C"/><rect width="15" height="40" fill="#fff"/>
      <circle cx="37.5" cy="20" r="10" fill="#fff"/><circle cx="40.5" cy="17.6" r="8.6" fill="#01411C"/>
      <polygon points="43.6,12.2 44.6,15.3 47.8,15.3 45.2,17.2 46.2,20.3 43.6,18.4 41,20.3 42,17.2 39.4,15.3 42.6,15.3" fill="#fff"/>`,
    zh: () => `<rect width="60" height="40" fill="#7A1F2B"/>
      <text x="30" y="29" text-anchor="middle" font-size="26" font-weight="700" fill="#F6EFDC" font-family="sans-serif">文</text>`,
    el: () => { const h = 40 / 9; let r = '<rect width="60" height="40" fill="#0D5EAF"/>';
      for (let i = 1; i < 9; i += 2) r += `<rect y="${i * h}" width="60" height="${h}" fill="#fff"/>`;
      return r + `<rect width="${5 * h}" height="${5 * h}" fill="#0D5EAF"/><rect x="${2 * h}" width="${h}" height="${5 * h}" fill="#fff"/><rect y="${2 * h}" width="${5 * h}" height="${h}" fill="#fff"/>`; },
    ar: () => `<rect width="60" height="40" fill="#1F5C3A"/>
      <text x="30" y="27" text-anchor="middle" font-size="24" font-weight="700" fill="#F6EFDC" font-family="sans-serif">ع</text>`,
    fil: () => `<rect width="60" height="20" fill="#0038A8"/><rect y="20" width="60" height="20" fill="#CE1126"/>
      <polygon points="0,0 34.6,20 0,40" fill="#fff"/><circle cx="11.5" cy="20" r="4.2" fill="#FCD116"/>
      <g stroke="#FCD116" stroke-width="1.2">${[0,45,90,135,180,225,270,315].map(g => {
        const r = g * Math.PI / 180; return `<line x1="${11.5 + Math.cos(r) * 5.2}" y1="${20 + Math.sin(r) * 5.2}" x2="${11.5 + Math.cos(r) * 8}" y2="${20 + Math.sin(r) * 8}"/>`;
      }).join("")}</g>
      <circle cx="3" cy="4.5" r="1.4" fill="#FCD116"/><circle cx="3" cy="35.5" r="1.4" fill="#FCD116"/><circle cx="29" cy="20" r="1.4" fill="#FCD116"/>`
  };
  window.banderaIdioma = function (cod) {
    const id = "bf" + (++contador);
    const dibujo = (DIBUJOS[cod] || DIBUJOS.es)(id);
    return `<svg class="bandera" viewBox="0 0 60 40" aria-hidden="true" focusable="false">${dibujo}</svg>`;
  };

  /* ---------- Traducción ---------- */
  function traducir(texto) {
    if (idioma === "es" || !window.I18N_DIC) return null;
    const clave = texto.replace(/\s+/g, " ").trim();
    if (!clave) return null;
    let res = window.I18N_DIC[clave];
    if (res === undefined) {
      for (const [re, rep] of (window.I18N_PATRONES || [])) {
        if (re.test(clave)) { res = clave.replace(re, rep); break; }
      }
    }
    if (res === undefined || res === clave) return null;
    const ini = texto.match(/^\s*/)[0], fin = texto.match(/\s*$/)[0];
    return ini + res + fin;
  }
  // Para textos que se muestran desde los scripts (por ejemplo alertas)
  window.t = function (texto) { return traducir(texto) ?? texto; };

  if (idioma === "es") {
    document.addEventListener("DOMContentLoaded", initSelector);
    return;
  }

  const datosIdioma = LISTA.find(l => l.cod === idioma);
  document.documentElement.lang = datosIdioma.html || idioma;
  if (datosIdioma.rtl) document.documentElement.dir = "rtl";
  document.documentElement.classList.add("idioma-" + idioma);
  document.write('<style id="i18n-ocultar">body{visibility:hidden}</style>');
  document.write('<script src="assets/js/i18n-' + idioma + '.js?v=2026102903"><\/script>');

  const ATRIBUTOS = ["alt", "title", "placeholder", "aria-label"];
  const SALTAR = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);

  function traducirNodo(nodo) {
    if (nodo.nodeType === 3) {
      const p = nodo.parentElement;
      if (!p || SALTAR.has(p.tagName) || p.closest("[data-no-traducir]")) return;
      const nuevo = traducir(nodo.nodeValue);
      if (nuevo !== null) nodo.nodeValue = nuevo;
      return;
    }
    if (nodo.nodeType !== 1 || SALTAR.has(nodo.tagName) || nodo.closest("[data-no-traducir]")) return;
    traducirAtributos(nodo);
    nodo.querySelectorAll("[alt],[title],[placeholder],[aria-label]").forEach(traducirAtributos);
    const w = document.createTreeWalker(nodo, NodeFilter.SHOW_TEXT);
    const lista = [];
    while (w.nextNode()) lista.push(w.currentNode);
    lista.forEach(traducirNodo);
    marcarEnlaces(nodo);
  }

  function traducirAtributos(el) {
    if (el.closest("[data-no-traducir]")) return;
    ATRIBUTOS.forEach(a => {
      const v = el.getAttribute(a);
      if (!v) return;
      const nuevo = traducir(v);
      if (nuevo !== null) el.setAttribute(a, nuevo);
    });
  }

  // Los enlaces internos llevan ?lang=xx para mantener el idioma
  function marcarEnlaces(raiz) {
    const enlaces = raiz.tagName === "A" ? [raiz] : raiz.querySelectorAll("a[href]");
    enlaces.forEach(a => {
      const href = a.getAttribute("href");
      if (!href || /^(https?:|mailto:|tel:|#|javascript:)/i.test(href) || !/\.html(\?|#|$)/.test(href)) return;
      if (/[?&]lang=/.test(href)) return;
      const [base, hash] = href.split("#");
      a.setAttribute("href", base + (base.includes("?") ? "&" : "?") + "lang=" + idioma + (hash ? "#" + hash : ""));
    });
  }

  function mostrar() {
    const s = document.getElementById("i18n-ocultar");
    if (s) s.remove();
  }
  setTimeout(mostrar, 2500);

  document.addEventListener("DOMContentLoaded", () => {
    const tituloNuevo = traducir(document.title);
    if (tituloNuevo) document.title = tituloNuevo;
    traducirNodo(document.body);

    new MutationObserver(cambios => {
      cambios.forEach(c => {
        if (c.type === "characterData") traducirNodo(c.target);
        else if (c.type === "attributes") traducirAtributos(c.target);
        else c.addedNodes.forEach(traducirNodo);
      });
    }).observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATRIBUTOS
    });

    initSelector();
    mostrar();
  });

  /* ---------- Selector de idioma (cabecera) ---------- */
  function initSelector() {
    document.querySelectorAll("[data-idioma]").forEach(cont => {
      const btn = cont.querySelector(".idioma-btn");
      const menu = cont.querySelector(".idioma-menu");
      if (!btn || !menu) return;
      const cerrar = () => { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const abrir = menu.hidden;
        menu.hidden = !abrir;
        btn.setAttribute("aria-expanded", abrir ? "true" : "false");
      });
      document.addEventListener("click", e => { if (!cont.contains(e.target)) cerrar(); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });
      menu.querySelectorAll("[data-lang]").forEach(op => {
        op.addEventListener("click", () => {
          const nuevo = op.getAttribute("data-lang");
          try { localStorage.setItem(CLAVE, nuevo); } catch (e) {}
          const url = new URL(location.href);
          url.searchParams.set("lang", nuevo);
          location.href = url.toString();
        });
      });
    });
  }
})();
