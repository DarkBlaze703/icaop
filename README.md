# Sitio web — ICAOP

Sitio estático en HTML, CSS y JavaScript puro (sin frameworks, sin instalación).

## Cómo verlo

Lo más simple es abrir `index.html` directamente en el navegador.

Para que el visor de la Resolución de SUNAT (ventana modal con el PDF) funcione siempre sin problemas de permisos del navegador, es mejor previsualizar con un servidor local muy simple. Con Python instalado, desde esta carpeta:

```
python3 -m http.server 8000
```

y luego abrir `http://localhost:8000` en el navegador.

## Estructura de archivos

```
index.html            → Inicio
nosotros.html         → Nosotros (5 pestañas)
clero.html            → Clero
obra-pastoral.html    → Obra Pastoral (3 pestañas)
donaciones.html       → Donaciones (4 pestañas)
anuncios.html         → Anuncios
contacto.html         → Contacto

assets/
  css/styles.css        → todos los estilos y colores del sitio
  js/datos-contacto.js  → EDITAR AQUÍ los datos de contacto, redes y cuentas
  js/components.js      → menú y pie de página (se repiten en todas las páginas)
  js/main.js            → menú móvil, pestañas, modal, copiar cuentas, formularios
  img/logo/             → escudo institucional
  img/clero/            → fotos del Arzobispo y del consejo de gobierno
  img/obras/            → fotos de Casa de Paz, colegios, corporación educativa, etc.
  img/misiones/         → fotos/mapas de misiones en Perú
  img/proyectos/        → fotos de proyectos ejecutados o por ejecutar
  img/general/          → imágenes de uso general (portada, Nosotros, etc.)
  docs/                 → Resolución de SUNAT en PDF
```

## Cómo actualizar contacto y donaciones

Abre `assets/js/datos-contacto.js` con cualquier editor de texto. Ahí están, en un solo lugar:
- Direcciones, teléfonos y correo
- Enlaces de Facebook, Instagram y TikTok (**hay que reemplazarlos por los reales**, hoy están vacíos)
- Cuentas bancarias para donaciones
- Datos de la Resolución de SUNAT

No hace falta tocar ningún archivo HTML para actualizar estos datos.

## Cómo agregar fotos reales

Cada carpeta de `assets/img/` tiene un archivo `LEEME.txt` que indica exactamente qué nombre de archivo espera cada página. Solo hay que colocar la foto con ese mismo nombre dentro de la carpeta correspondiente y reemplazará automáticamente al recuadro de "foto pendiente".

## Sobre los formularios

Este sitio es estático (no tiene un servidor propio), por lo que los formularios de "Contacto" y "Contacto para donantes" **hoy solo muestran un mensaje de confirmación en pantalla, pero no envían el mensaje a ningún correo todavía.** Para que los mensajes lleguen de verdad hace falta conectar el formulario a un servicio como Formspree, o a un backend propio — es un paso pendiente antes de publicar el sitio.

## Mapa de ubicación

En `contacto.html` hay un espacio reservado para el mapa. Cuando tengan la dirección definitiva a mostrar, se reemplaza por un `<iframe>` de Google Maps ahí mismo.
