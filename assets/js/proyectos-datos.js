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
    id: "centro-salud-sojo",
    titulo: "Centro de Salud Parroquial ICAOP – Sojo, Sullana",
    estado: "por-ejecutar",
    resumen: "Proyecto de inversión social: un centro de salud parroquial para la población más necesitada de Sojo, en Sullana (Piura).",
    descripcion: "El Centro de Salud Parroquial ICAOP está pensado para la salud de los más necesitados del centro poblado de Sojo, distrito de Miguel Checa, provincia de Sullana (Piura). La zona tiene alrededor de 200,000 habitantes y cuenta solo con una posta médica, sin área de exámenes, que no llega a cubrir la demanda. El proyecto propone un centro de salud construido por módulos y equipado según las normas del Ministerio de Salud, con 25 médicos en distintas especialidades, para atender a más de 20,000 personas al mes.",
    secciones: [
      {
        titulo: "Consultorios externos",
        items: ["Medicina general", "Pediatría", "Ginecología", "Cardiología", "Neurología", "Odontología", "Neumología", "Otorrinolaringología", "Oftalmología"]
      },
      {
        titulo: "Exámenes y servicios",
        items: ["Ecografía", "Electrocardiograma", "Endoscopías", "Análisis clínicos", "Tomografía", "Rayos X", "Cirugía oftálmica", "Sala de trabajo de parto", "Morgue", "Capilla"]
      }
    ],
    carpetaImagenes: "assets/img/proyectos/centro-salud-sojo/",
    numImagenes: 12,
    video: "assets/media/proyecto-centro-salud-sojo.mp4",
    videoPortada: "assets/media/proyecto-centro-salud-sojo.jpg",
    presupuesto: {
      moneda: "US$",
      filas: [
        ["Infraestructura", "6,140,420.00"],
        ["Equipos médicos y otros", "3,028,500.00"],
        ["Expediente técnico", "350,480.00"],
        ["Administración y gerencia", "525,500.00"]
      ],
      total: "10,044,900.00"
    }
  }
];
