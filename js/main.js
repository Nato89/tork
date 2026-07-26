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
