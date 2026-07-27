/* Menú hamburguesa del header (solo se ve en móvil) */
(function () {
  const boton = document.getElementById('header_menu_btn');
  const menu = document.getElementById('header_menu_movil');

  if (!boton || !menu) return;

  boton.addEventListener('click', function () {
    const abierto = menu.classList.toggle('esta_abierto');
    boton.setAttribute('aria-expanded', abierto);
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });
})();

/* Carrusel de la sección Resultados de nuestro Reto Tork */
(function () {
  const track = document.getElementById('res_track');
  const prev = document.getElementById('res_prev');
  const next = document.getElementById('res_next');

  if (!track || !prev || !next) return;

  const slides = track.querySelectorAll('.res_slide');
  const total = slides.length;
  let actual = 0;

  // Se mide en vivo, no se fija en 1200px, porque el slide cambia
  // de ancho en cada breakpoint del responsive
  function anchoSlide() {
    return slides[0].getBoundingClientRect().width;
  }

  function mostrar(indice) {
    // Se mueve en ciclo: del último vuelve al primero y viceversa
    actual = (indice + total) % total;
    track.style.transform = 'translateX(' + -actual * anchoSlide() + 'px)';
  }

  prev.addEventListener('click', function () {
    mostrar(actual - 1);
  });

  next.addEventListener('click', function () {
    mostrar(actual + 1);
  });

  // Al cambiar el tamaño de la ventana se recalcula el desplazamiento
  window.addEventListener('resize', function () {
    mostrar(actual);
  });
})();

/* Carrusel de la sección Conoce nuestras Innovaciones */
(function () {
  const carrusel = document.querySelector('.inv_carrusel');
  const track = document.getElementById('inv_track');
  const prev = document.getElementById('inv_prev');
  const next = document.getElementById('inv_next');

  if (!carrusel || !track || !prev || !next) return;

  let desplazamiento = 0;

  // Un paso = ancho de una tarjeta + el gap. Se mide en vivo porque
  // ambos cambian en cada breakpoint del responsive
  function paso() {
    const tarjeta = track.querySelector('.inv_tarjeta');
    if (!tarjeta) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return tarjeta.getBoundingClientRect().width + gap;
  }

  // Lo máximo que se puede mover: lo que sobresale del riel fuera de la ventana
  function maximo() {
    return Math.max(0, track.scrollWidth - carrusel.clientWidth);
  }

  function mover(valor) {
    desplazamiento = Math.min(Math.max(valor, 0), maximo());
    track.style.transform = 'translateX(' + -desplazamiento + 'px)';
  }

  prev.addEventListener('click', function () {
    mover(desplazamiento - paso());
  });

  next.addEventListener('click', function () {
    mover(desplazamiento + paso());
  });

  // Al cambiar el tamaño de la ventana se vuelve a acotar el desplazamiento
  window.addEventListener('resize', function () {
    mover(desplazamiento);
  });
})();


/* Modal de registro. Cualquier botón .js_abrir_registro lo abre */
(function () {
  const disparadores = document.querySelectorAll('.js_abrir_registro');
  const modal = document.getElementById('modal_registro');

  function abrir() {
    if (!modal) return;

    // Siempre arranca en blanco
    limpiar();

    modal.classList.add('esta_abierto');
    document.body.style.overflow = 'hidden';
  }

  function cerrar() {
    if (!modal) return;
    modal.classList.remove('esta_abierto');
    document.body.style.overflow = '';
  }

  function limpiar() {
    const formulario = modal.querySelector('#formulario_registro');
    if (formulario) formulario.reset();

    const estado = modal.querySelector('.modal_estado');
    if (estado) {
      estado.textContent = '';
      estado.classList.remove('es_error');
    }
  }

  disparadores.forEach(function (boton) {
    boton.addEventListener('click', abrir);
  });

  if (!modal) return;

  const botonCerrar = modal.querySelector('.js_cerrar_registro');
  if (botonCerrar) botonCerrar.addEventListener('click', cerrar);

  /* Cierre al clic por fuera. Se exige mousedown y mouseup sobre el fondo:
     si no, seleccionar texto y soltar afuera cerraba el modal. */
  let arranqueEnElFondo = false;

  modal.addEventListener('mousedown', function (evento) {
    arranqueEnElFondo = evento.target === modal;
  });

  modal.addEventListener('mouseup', function (evento) {
    if (arranqueEnElFondo && evento.target === modal) cerrar();
    arranqueEnElFondo = false;
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') cerrar();
  });

  // Al guardar, el modal deja paso al mensaje de gracias
  document.addEventListener('registro:exitoso', cerrar);
})();


/* Mensaje de gracias. Se va a los 3 segundos o al primer clic */
(function () {
  const gracias = document.getElementById('gracias_registro');

  if (!gracias) return;

  const DURACION = 3000;
  let temporizador = null;

  function ocultar() {
    gracias.classList.remove('esta_abierto');
    document.body.style.overflow = '';
    clearTimeout(temporizador);
    document.removeEventListener('click', ocultar);
  }

  function mostrar() {
    gracias.classList.add('esta_abierto');
    document.body.style.overflow = 'hidden';

    clearTimeout(temporizador);
    temporizador = setTimeout(ocultar, DURACION);

    // El clic que envió el formulario ya terminó: el guardado es asíncrono
    document.addEventListener('click', ocultar);
  }

  document.addEventListener('registro:exitoso', mostrar);
})();
