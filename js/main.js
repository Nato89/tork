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


/* Modal de registro (formulario) — punto 2 y 3 de la prueba técnica.
   Cualquier botón con la clase .js_abrir_registro abre el modal #modal_registro.
   Hoy están enganchados el botón del hero y el de la sección impulsa.
   Cuando se cree el markup del modal en index.html, esto ya funciona sin tocar nada. */
(function () {
  const disparadores = document.querySelectorAll('.js_abrir_registro');
  const modal = document.getElementById('modal_registro');

  function abrir() {
    if (!modal) return; // el modal todavía no existe en el HTML
    modal.classList.add('esta_abierto');
    document.body.style.overflow = 'hidden'; // bloquea el scroll del fondo
  }

  function cerrar() {
    if (!modal) return;
    modal.classList.remove('esta_abierto');
    document.body.style.overflow = '';
  }

  disparadores.forEach(function (boton) {
    boton.addEventListener('click', abrir);
  });

  if (!modal) return;

  // Cierra con la X, haciendo clic en el fondo oscuro, o con la tecla Escape
  const botonCerrar = modal.querySelector('.js_cerrar_registro');
  if (botonCerrar) botonCerrar.addEventListener('click', cerrar);

  modal.addEventListener('click', function (evento) {
    if (evento.target === modal) cerrar();
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') cerrar();
  });
})();
