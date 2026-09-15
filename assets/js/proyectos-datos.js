/* =========================================================
   ICAOP — Datos de Proyectos (Obra Pastoral)
   Cada proyecto es una entrada de esta lista: para agregar uno
   nuevo, se copia un bloque { ... } y se completa — no hace
   falta crear ninguna página nueva. Las imágenes van en
   assets/img/proyectos/<carpeta-del-proyecto>/
   ========================================================= */

const PROYECTOS_ICAOP = [
  {
    id: "colegio-santa-maria",
    titulo: "Colegio Hogar Parroquial Santa María Madre de Dios",
    estado: "por-ejecutar", // "por-ejecutar" o "ejecutado"
    resumen: "Construcción de un colegio-hogar parroquial: aulas, capilla, instalaciones y sistema de energía solar.",
    descripcion: "Proyecto de construcción integral del Colegio Hogar Parroquial Santa María Madre de Dios, sobre una plataforma en ladera con muros de contención. Contempla módulos de aulas, un módulo administrativo, capilla, baños, instalaciones eléctricas y sanitarias completas, y un sistema de energía solar conectado a la red para el abastecimiento eléctrico del complejo.",
    carpetaImagenes: "assets/img/proyectos/colegio-santa-maria/",
    numImagenes: 14,
    presupuesto: {
      moneda: "S/",
      filas: [
        ["Movilización de equipo y maquinaria", "12,000.00"],
        ["Terraplenes y plataformas", "101,700.00"],
        ["Obras de concreto y muros de contención", "367,290.00"],
        ["Instalaciones eléctricas", "44,500.00"],
        ["Instalaciones sanitarias", "33,800.00"],
        ["Sistema de energía solar", "130,000.00"],
        ["Módulos (aulas, capilla, baños)", "453,500.00"]
      ],
      subtotalDirecto: "1,142,790.00",
      totalSoles: "1,523,796.19",
      totalDolares: "395,791.22"
    }
  },
  {
    id: "proyecto-2",
    titulo: "Proyecto por ejecutar",
    estado: "por-ejecutar",
    resumen: "Reemplazar con nombre, objetivo y estado del proyecto.",
    descripcion: "Reemplazar con la descripción completa del proyecto.",
    carpetaImagenes: "assets/img/proyectos/proyecto-2/",
    numImagenes: 0,
    presupuesto: null
  }
];
