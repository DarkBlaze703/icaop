/* =========================================================
   ICAOP — Datos editables
   Edita AQUÍ los datos de contacto, redes sociales y cuentas
   de donación. No es necesario tocar ningún otro archivo:
   estos valores se insertan automáticamente en las páginas
   de Contacto y Donaciones.
   ========================================================= */

const DATOS_ICAOP = {
  institucion: {
    nombre: "Iglesia Católica Apostólica Ortodoxa del Perú - ICAOP",
    ruc: "20600700929"
  },

  contacto: {
    direcciones: [
      {
        etiqueta: "Sede principal",
        texto: "A.H. M. Grau, Mz. B, Lote 26 — San Juan de Lurigancho, Lima",
        referencia: "Entre Av. San Martín con Sta. Rosa, a 1 cuadra"
      },
      {
        etiqueta: "Oficina administrativa",
        texto: "Calle Los Topacios 390, Of. 101, Cerros de Camacho — Santiago de Surco, Lima",
        referencia: ""
      }
    ],
    telefonos: [
      { etiqueta: "Teléfono 1", numero: "+51 994 738 400" },
      { etiqueta: "Teléfono 2", numero: "+51 955 375 303" }
    ],
    correo: "icaop.peru@gmail.com",
    redesSociales: {
      facebook: "https://facebook.com/", // reemplazar por el enlace real de la página
      instagram: "https://instagram.com/", // reemplazar por el enlace real
      tiktok: "https://tiktok.com/@" // reemplazar por el enlace real
    }
  },

  donaciones: {
    correo: "icaop.peru@gmail.com",
    celular: "+51 994 738 400",
    banco: "BBVA Continental",
    cuentaSoles: {
      numero: "0011-0832-0100024970-34",
      cci: "011-832-000100024970-34"
    },
    cuentaDolares: {
      numero: "0011-0832-0100024989-34",
      cci: "011-832-000100024989-34"
    }
  },

  sunat: {
    resolucion: "N° 0490050041814",
    fecha: "14 de noviembre de 2024",
    vigenciaHasta: "14 de noviembre de 2027",
    archivoPdf: "assets/docs/resolucion-sunat-icaop.pdf"
  }
};
