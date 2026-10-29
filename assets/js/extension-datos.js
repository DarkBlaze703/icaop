/* =========================================================
   ICAOP — Datos de Extensión apostólica
   Un bloque por país. Perú va primero; el resto, en orden
   alfabético. Para agregar información, escribe cada elemento
   entre comillas dentro de la lista que corresponda, por ejemplo:
     arquidiocesis: ["Arquidiócesis de Lima"],
     misiones: ["Misión San Juan — Puno", "Misión Santa Rosa — Cusco"],
   Si una lista queda vacía, la web muestra "Información próximamente."
   Las banderas están en assets/img/banderas/<codigo>.svg
   ========================================================= */

const CATEGORIAS_EXTENSION = [
  { clave: "arquidiocesis", titulo: "Arquidiócesis",          icono: "fa-church" },
  { clave: "diocesis",      titulo: "Diócesis",               icono: "fa-place-of-worship" },
  { clave: "vicariatos",    titulo: "Vicariatos apostólicos", icono: "fa-cross" },
  { clave: "vicarias",      titulo: "Vicarías",               icono: "fa-landmark" },
  { clave: "misiones",      titulo: "Misiones",               icono: "fa-hands-praying" },
  { clave: "obras",         titulo: "Obras pastorales",       icono: "fa-hand-holding-heart" }
];

const PAISES_ICAOP = [
  { codigo: "pe", nombre: "Perú",              arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "au", nombre: "Australia",         arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "bo", nombre: "Bolivia",           arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "br", nombre: "Brasil",            arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "cm", nombre: "Camerún",           arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "cl", nombre: "Chile",             arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "co", nombre: "Colombia",          arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "ci", nombre: "Costa de Marfil",   arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "ec", nombre: "Ecuador",           arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "sv", nombre: "El Salvador",       arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "es", nombre: "España",            arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "us", nombre: "Estados Unidos",    arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "ph", nombre: "Filipinas",         arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "fr", nombre: "Francia",           arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "gt", nombre: "Guatemala",         arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "gq", nombre: "Guinea Ecuatorial", arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "nz", nombre: "Nueva Zelanda",     arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "pk", nombre: "Pakistán",          arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] },
  { codigo: "ug", nombre: "Uganda",            arquidiocesis: [], diocesis: [], vicariatos: [], vicarias: [], misiones: [], obras: [] }
];
