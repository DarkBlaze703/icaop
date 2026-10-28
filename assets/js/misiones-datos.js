/* =========================================================
   ICAOP — Datos de Misiones por región (Obra Pastoral)
   Cada región es un bloque { ... }. Al hacer clic en la región
   se abre una ventana con estos datos.

   - encargado: nombre del misionero o encargado de la región.
   - cargo: (opcional) su cargo, ej. "Misionero responsable".
   - resena: breve reseña de las actividades en la zona.
   - Fotos: se guardan en la carpeta indicada como 01.jpg, 02.jpg,
     03.jpg… y en numImagenes se pone cuántas hay.

   Si un dato está vacío (""), la ventana muestra
   "Información en preparación".
   ========================================================= */

const MISIONES_ICAOP = [
  {
    region: "Lima",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/lima/",
    numImagenes: 0
  },
  {
    region: "Piura",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/piura/",
    numImagenes: 0
  },
  {
    region: "Pasco · Oxapampa",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/pasco-oxapampa/",
    numImagenes: 0
  },
  {
    region: "Satipo · Huancayo · Junín",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/junin/",
    numImagenes: 0
  },
  {
    region: "Pucallpa",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/pucallpa/",
    numImagenes: 0
  },
  {
    region: "Ayacucho",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/ayacucho/",
    numImagenes: 0
  },
  {
    region: "Arequipa",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/arequipa/",
    numImagenes: 0
  },
  {
    region: "Juliaca · Puno",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/puno/",
    numImagenes: 0
  }
];
