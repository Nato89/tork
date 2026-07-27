# Landing Page Tork + Firebase

Prueba técnica frontend para Obvio Latam: maquetación responsive de una landing page a partir de un diseño de Figma, con un formulario de captura conectado a Firebase Firestore.

## Tecnologías

- HTML5, CSS3 y JavaScript vanilla (ES6+)
- Firebase Firestore (base de datos)
- Firebase Hosting (despliegue)

Sin frameworks, sin bundler y sin dependencias: el SDK de Firebase se carga como módulo ES desde el CDN.

## Ejecución local

```bash
git clone https://github.com/Nato89/tork.git
cd tork
```

El proyecto no requiere instalación ni build: son archivos estáticos. Lo único necesario es servirlos por HTTP con cualquier servidor estático, porque **abrir el `index.html` con doble clic no funciona** — bajo el protocolo `file://` el navegador bloquea los módulos ES (`import`) que usa el formulario.

Sirve cualquiera de estas opciones, la que tengas a mano:

```bash
npx serve                 # Node
python -m http.server     # Python
```

O la extensión Live Server de VS Code. Luego abre la dirección que indique la terminal (por defecto http://localhost:3000 o http://localhost:8000).

## Estructura

```
index.html                    # toda la landing en una sola página

css/
  main.css                    # punto de entrada: importa todas las demás
  hero_styles.css             # header, navbar y sección hero
  imp_styles.css              # sección "Impulsando mejores negocios"
  diferencia_styles.css       # sección "Lo que hace diferente a Tork"
  soluciones_styles.css       # sección "Soluciones para cada negocio"
  resultados_styles.css       # sección "Resultados de nuestro Reto Tork"
  innovaciones_styles.css     # sección "Conoce nuestras innovaciones"
  impulsa_styles.css          # sección "Impulsa el crecimiento"
  footer_styles.css           # pie de página
  form_styles.css             # modal del formulario + mensaje de gracias
  responsive.css              # todos los media queries, se importa de último

js/
  main.js                     # interacciones de UI: menú, carruseles, modal
  firebase.js                 # solo la configuración de Firebase
  registro.service.js         # guardado del registro + enganche del formulario

assets/
  Images/                     # fotos de las secciones
  Iconos/                     # iconos de interfaz y botones
  Logotipos/                  # logos de Tork
  Red_iconos/                 # iconos de redes sociales
  Formas_pago_iconos/         # medios de pago del footer
  Sellos_iconos/              # sellos de certificación

firebase.json                 # configuración de Hosting y ruta de las reglas
firestore.rules               # reglas de seguridad de la base de datos
.firebaserc                   # proyecto de Firebase asociado
```

## Detalles de la solución

**CSS por secciones.** Cada sección tiene su hoja y `main.css` las importa. Todos los media queries están juntos en `responsive.css`, que se importa de último para poder sobrescribir a las anteriores. Breakpoints: 1439px, 1024px, 768px y 480px.

**Separación de responsabilidades en el JS.** `firebase.js` solo inicializa la conexión y exporta la instancia de Firestore. `registro.service.js` tiene la función de guardado (`guardarRegistro`, sin nada del DOM) y el enganche del formulario. `main.js` maneja la UI.

La comunicación entre ambos lados es por evento personalizado: al guardar, el servicio emite `registro:exitoso` y `main.js` reacciona cerrando el modal y mostrando el mensaje de gracias. Así el servicio no conoce el DOM del modal y `main.js` no conoce Firebase.

**Formulario.** Se validan los campos requeridos y el formato del correo con validación nativa de HTML5 (`required`, `type="email"`), verificada con `checkValidity()` antes de enviar. El botón se bloquea durante el envío para evitar registros duplicados. Los errores de guardado se muestran en un mensaje bajo el formulario; el caso exitoso muestra el panel de "¡Gracias por registrarte!", que se cierra a los 3 segundos o al hacer clic.

## Configuración de Firebase

Las credenciales del proyecto están en `js/firebase.js`. Son públicas por diseño (viajan al navegador de todas formas); lo que protege los datos son las reglas de Firestore.

Los registros caen en la colección `registros`. Reglas aplicadas — permiten crear pero no leer, ya que es un formulario público:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registros/{documento} {
      allow create: if request.resource.data.habeas == true;
      allow read, update, delete: if false;
    }
  }
}
```

## Despliegue

Publicado con Firebase Hosting en: https://tork-54bb5.web.app
