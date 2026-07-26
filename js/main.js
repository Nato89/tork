/* Carrusel de la sección Resultados de nuestro Reto Tork */
(function () {
  const track = document.getElementById('res_track');
  const prev = document.getElementById('res_prev');
  const next = document.getElementById('res_next');

  if (!track || !prev || !next) return;

  const slides = track.querySelectorAll('.res_slide');
  const total = slides.length;
  const ANCHO_SLIDE = 1200; // ancho de cada slide en px
  let actual = 0;

  function mostrar(indice) {
    // Se mueve en ciclo: del último vuelve al primero y viceversa
    actual = (indice + total) % total;
    track.style.transform = 'translateX(' + -actual * ANCHO_SLIDE + 'px)';
  }

  prev.addEventListener('click', function () {
    mostrar(actual - 1);
  });

  next.addEventListener('click', function () {
    mostrar(actual + 1);
  });
})();

/* Carrusel de la sección Conoce nuestras Innovaciones */
(function () {
  const carrusel = document.querySelector('.inv_carrusel');
  const track = document.getElementById('inv_track');
  const prev = document.getElementById('inv_prev');
  const next = document.getElementById('inv_next');

  if (!carrusel || !track || !prev || !next) return;

  const PASO = 408; // ancho de tarjeta (384px) + gap (24px)
  let desplazamiento = 0;

  // Lo máximo que se puede mover: lo que sobresale del riel fuera de la ventana
  function maximo() {
    return Math.max(0, track.scrollWidth - carrusel.clientWidth);
  }

  function mover(valor) {
    desplazamiento = Math.min(Math.max(valor, 0), maximo());
    track.style.transform = 'translateX(' + -desplazamiento + 'px)';
  }

  prev.addEventListener('click', function () {
    mover(desplazamiento - PASO);
  });

  next.addEventListener('click', function () {
    mover(desplazamiento + PASO);
  });
})();

