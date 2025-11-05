/* Carga el componente HTML del carrusel y lo inicializa
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('carousel-root');
  if (!root) return;

  fetch('components/carousel.html')
    .then(resp => {
      if (!resp.ok) throw new Error('No se pudo cargar el componente del carrusel');
      return resp.text();
    })
    .then(html => {
      root.innerHTML = html;
      initCarousel(root);
    })
    .catch(err => {
      console.error(err);
      root.innerHTML = '<p>No se pudo cargar la galería. Intente abrir el proyecto desde un servidor local (Live Server) o revise la ruta del componente.</p>';
    });
});

function initCarousel(root) {
  const slides = root.querySelectorAll('.slide');
  const prevBtn = root.querySelector('.carousel-btn.prev');
  const nextBtn = root.querySelector('.carousel-btn.next');
  const counter = root.querySelector('#carousel-counter');
  const dotsContainer = root.querySelector('.dots');
  if (!slides.length) return;

  let index = 0;
  const total = slides.length;
  let interval = null;

  // crear dots
  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Ir a la imagen ${i+1}`);
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(b);
  }

  const dots = dotsContainer.querySelectorAll('button');

  function show(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    counter.textContent = `${i+1}/${total}`;
  }

  function prev() { goTo((index - 1 + total) % total); }
  function next() { goTo((index + 1) % total); }

  function goTo(i) {
    index = i;
    show(index);
    resetInterval();
  }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  function startInterval() {
    interval = setInterval(() => { next(); }, 4000);
  }
  function resetInterval() {
    if (interval) clearInterval(interval);
    startInterval();
  }

  // pausa al entrar con el mouse
  root.addEventListener('mouseenter', () => { if (interval) clearInterval(interval); });
  root.addEventListener('mouseleave', () => { resetInterval(); });

  // iniciar
  show(index);
  startInterval();
}
*/