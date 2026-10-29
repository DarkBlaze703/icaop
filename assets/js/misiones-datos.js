/* =========================================================
   ICAOP — Datos de Misiones por región (Obra Pastoral)
   Cada región es un bloque { ... }. Al hacer clic en la región
   se abre una ventana con estos datos.

   - encargado: nombre del misionero o encargado de la región.
   - cargo: (opcional) su cargo, ej. "Misionero responsable".
   - resena: breve reseña de las actividades en la zona.
   - misiones: lista de parroquias, capillas y obras de la región,
     cada una con nombre, lugar, personas (que atiende),
     telefonos y nota (opcional). Si falta un dato, no se muestra.
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
    numImagenes: 0,
    misiones: [
      {
        "nombre": "Sede Arquidiocesana",
        "lugar": "San Juan de Lurigancho",
        "personas": "6,480",
        "telefonos": [
          "994 738 400"
        ]
      },
      {
        "nombre": "Parroquia San Bartolomé Apóstol",
        "lugar": "San Juan de Lurigancho",
        "personas": "8,640",
        "telefonos": [
          "955 375 303"
        ]
      },
      {
        "nombre": "Parroquia Señor de Qoyllority de Dios Protocatedral y Casa de Paz",
        "lugar": "San Antonio de Jicamarca",
        "personas": "2,880",
        "telefonos": [
          "993 983 626"
        ]
      },
      {
        "nombre": "Parroquia Santísima Cruz de 3 de Mayo",
        "lugar": "Rímac",
        "personas": "2,520",
        "telefonos": [
          "955 371 493",
          "924 495 300"
        ]
      },
      {
        "nombre": "Seminario San Andrés Apóstol, hoy Santo Tomás Apóstol",
        "lugar": "San Juan de Lurigancho",
        "personas": "1,510",
        "telefonos": [
          "924 896 327"
        ]
      },
      {
        "nombre": "Misión Parroquial Santísima Trinidad",
        "lugar": "Pamplona Alta",
        "personas": "1,520",
        "telefonos": [
          "929 526 600"
        ]
      },
      {
        "nombre": "Misión AA. HH. Manuel Scorza Campoy, Señor Cautivo de Ayabaca",
        "lugar": "Campoy, San Juan de Lurigancho",
        "telefonos": [
          "950 243 430"
        ]
      },
      {
        "nombre": "Colegio Académico Parroquial Ortodoxo Niño de Jesús School",
        "lugar": "San Juan de Lurigancho",
        "telefonos": [
          "945 603 322"
        ]
      },
      {
        "nombre": "Parroquia Ortodoxa Señor de los Milagros",
        "lugar": "Puente Piedra",
        "telefonos": [
          "967 915 463"
        ]
      },
      {
        "nombre": "Parroquia Ortodoxa Señor de Qoyllority – Bayóvar",
        "lugar": "Bayóvar",
        "telefonos": [
          "964 995 259"
        ]
      },
      {
        "nombre": "Misión Carabayllo Villa Nazareth, Parroquia San Ignacio de Antioquía",
        "lugar": "Carabayllo",
        "telefonos": [
          "943 108 684"
        ]
      },
      {
        "nombre": "Capilla Nuestra Señora del Rosario, comunidad quechuahablante",
        "lugar": "San Antonio de Jicamarca",
        "personas": "2,520",
        "telefonos": [
          "994 738 400"
        ]
      },
      {
        "nombre": "Capellanía Hermandad San Judas Tadeo",
        "lugar": "Rímac",
        "personas": "1,640",
        "telefonos": [
          "955 371 493",
          "924 495 300"
        ]
      },
      {
        "nombre": "Monasterio Santa María Madre de la Divina Providencia",
        "lugar": "San Juan de Lurigancho",
        "personas": "1,080",
        "telefonos": [
          "01 405 9278"
        ]
      },
      {
        "nombre": "ONG PRODEINJUTE",
        "lugar": "San Juan de Lurigancho",
        "personas": "360",
        "telefonos": [
          "955 371 493"
        ]
      },
      {
        "nombre": "Programa «Lo que no te sirve en tu casa, a nosotros sí»",
        "lugar": "San Juan de Lurigancho",
        "personas": "1,440",
        "telefonos": [
          "918 592 915"
        ]
      },
      {
        "nombre": "Asociación de Damas Ortodoxas",
        "lugar": "Rímac",
        "personas": "1,800"
      },
      {
        "nombre": "Instituto Preventivo Promocional para Familias en Alto Riesgo Social «Un Milagro Vida»",
        "lugar": "San Juan de Lurigancho",
        "personas": "3,960",
        "telefonos": [
          "955 371 493"
        ]
      },
      {
        "nombre": "Corporación Educativa Sagrado Corazón de Jesús y María",
        "lugar": "San Juan de Lurigancho",
        "personas": "1,260"
      },
      {
        "nombre": "Misión Santísima Cruz de Chalpón",
        "lugar": "Av. Huanacaure 982, Tahuantinsuyo",
        "telefonos": [
          "918 959 587"
        ]
      },
      {
        "nombre": "Misión El Paraíso",
        "lugar": "Asoc. El Paraíso, anexo 21 — San Antonio de Jicamarca",
        "telefonos": [
          "945 603 322"
        ]
      },
      {
        "nombre": "Colegio Académico Parroquial S.S. Juan Pablo II",
        "lugar": "San Antonio de Jicamarca",
        "telefonos": [
          "924 128 684"
        ]
      },
      {
        "nombre": "Misión Virgen de Fátima",
        "lugar": "San Juan de Lurigancho",
        "telefonos": [
          "964 262 443"
        ]
      },
      {
        "nombre": "Vicaría Apostólica Ortodoxa de Acción Social — Misión Apoyo a los Pueblos Olvidados",
        "lugar": "Cono Sur, Lima",
        "telefonos": [
          "921 860 547"
        ],
        "nota": "Incluye la Misión Internacional Ayuda al Migrante."
      }
    ]
  },
  {
    region: "Piura",
    encargado: "",
    cargo: "",
    resena: "",
    carpetaImagenes: "assets/img/misiones/piura/",
    numImagenes: 0,
    misiones: [
      {
        "nombre": "Vicaría Apostólica Ortodoxa San Andrés",
        "lugar": "Chulucanas, Piura"
      }
    ]
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
    numImagenes: 0,
    misiones: [
      {
        "nombre": "Qollanal Uma",
        "lugar": "Ayacucho",
        "personas": "4,320",
        "telefonos": [
          "900 882 055"
        ]
      }
    ]
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
    numImagenes: 0,
    misiones: [
      {
        "nombre": "Misión Parroquial Ortodoxa Niño San Salvador de Juliaca",
        "lugar": "Juliaca, Puno",
        "telefonos": [
          "927 671 600"
        ]
      },
      {
        "nombre": "Capilla San Juan",
        "lugar": "Urb. Néstor Cáceres Velásquez, salida Puno – Juliaca",
        "telefonos": [
          "980 087 722"
        ],
        "nota": "Responsable: Moisés Olger Pancca Supo. Misa a las 3:00 p. m."
      }
    ]
  }
];
