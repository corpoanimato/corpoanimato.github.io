//SELECCIONAR ELEMENTOS DEL DOM 
const enlacesNav = document.querySelectorAll('.menu-link');
const secciones = document.querySelectorAll('.seccion-oculta');
// para el fondo/disfraz
const ojoMaestro = document.getElementById('disfraz'); 
const escenaOjo = document.getElementById('ojo-completo'); //para mover/escalar y modificar
const nodoMenu = document.querySelector('.menu-navegacion');
const nodoPanel = document.getElementById('area-contenido');
const botonCerrar = document.getElementById('boton-cerrar');

//OBJETO PARA CONTROLAR CARGAS (evitar repetir descargas) 
const seccionesYaCargadas = {};

//FUNCIÓN PARA CARGAR ARCHIVOS HTML
function cargarSeccion(idSeccion, archivoHTML) {
  // Si ya se cargó, no lo descargues de nuevo
  if (seccionesYaCargadas[idSeccion]) return;

  const contenedor = document.getElementById(idSeccion);
  if (!contenedor) return;

  fetch(archivoHTML)
    .then(r => {
      if (!r.ok) throw new Error(`No se pudo cargar ${archivoHTML}`);
      return r.text();
    })
    .then(html => {
      contenedor.innerHTML = html;
      seccionesYaCargadas[idSeccion] = true;
    })
    .catch(error => console.error("Error al cargar:", error));
}

//FUNCIÓN PRINCIPAL: Abre una sección al clickear un enlace
function abrirSeccion(enlace) {
  // Reseta/oculta las secciones
  secciones.forEach(sec => {
    sec.classList.remove('activa');
    sec.style.display = 'none';
  });

  // Obtiene los datos del enlace
  const idSeccion = enlace.dataset.id;
  const archivoACargar = enlace.dataset.archivo;
  const claseTema = enlace.dataset.fondo;

  // Busca lo que corresponde con el texto del enlace
  const seccionAMostrar = document.getElementById(`contenido-${idSeccion}`);

  // Si hay archivo para cargar, "cárgalo"
  if (archivoACargar) {
    cargarSeccion('contenido-proyectos', archivoACargar);
  }

  // Muestra la seccion
  if (seccionAMostrar) {
    seccionAMostrar.classList.add('activa');
    seccionAMostrar.style.display = 'block';
  }

  // AGREGA CLASES PARA LAS ANIMACIONES
  escenaOjo.classList.add('esta-minimizado');
  nodoMenu.classList.add('esta-oculto');
  nodoPanel.classList.add('esta-abierto');

  // CAMBIA EL TEMA (color de fondo)
  const temas = ['bio-bg', 'archivo-bg', 'contacto-bg'];
  nodoPanel.classList.remove(...temas);
  ojoMaestro.classList.remove(...temas);
  nodoPanel.classList.add(claseTema);
  ojoMaestro.classList.add(claseTema);
}

//PARA CERRAR LA SECCIÓN
function cerrarSeccion() {
  // Oculta todas las secciones
  secciones.forEach(sec => {
    sec.classList.remove('activa');
    sec.style.display = 'none';
  });

  // Remueve las clases de animacion
  escenaOjo.classList.remove('esta-minimizado');
  nodoMenu.classList.remove('esta-oculto');
  nodoPanel.classList.remove('esta-abierto');

  // Remueve/quita todos los temas
  const temas = ['bio-bg', 'archivo-bg', 'contacto-bg'];
  // El elemento --> ... <-- (spread operator) expande el array y pasa cada elemento por separado

  nodoPanel.classList.remove(...temas);
  ojoMaestro.classList.remove(...temas);
}

// === EVENT LISTENERS ===
//clickear un enlace del menú
enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que recargue la página
    abrirSeccion(enlace);
  });
});

// clickear el botón cerrar
botonCerrar.addEventListener('click', cerrarSeccion);
