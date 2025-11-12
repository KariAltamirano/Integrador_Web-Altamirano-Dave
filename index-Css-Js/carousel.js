// Array de imágenes con objetos {url, alt}
const slides = [
   {
        url: "index-Css-Js/img-carousel/img-1-ciudad-de-San-Luis.jpg",
        alt: "Ciudad de San Luis"
    },
    {
        url: "index-Css-Js/img-carousel/img-2-la-catedral.jpg",
        alt: "Catedral de San Luis"
    },
    {
        url: "index-Css-Js/img-carousel/img-3-vieja-estación-de-trenes.jpg",
        alt: "Vieja estación de trenes"
    },
    {
        url: "index-Css-Js/img-carousel/img-4-Sierra-de-las-quijadas-.jpeg",
        alt: "Sierra de las Quijadas"
    },  
    {
        url: "index-Css-Js/img-carousel/img-5-Merlo.jpg",
        alt: "Merlo" 
    },
    {
        url: "index-Css-Js/img-carousel/img-6-filo-serrano.jpg",
        alt: "Filo Serrano"
    },
    {
        url: "index-Css-Js/img-carousel/img-7-Pasos-malos.jpg",
        alt: "Pasos Malos"
    },  
    {
        url: "index-Css-Js/img-carousel/img-8-Potrero-de-los-Funes.jpg",
        alt: "Potrero de los Funes"
    },
    {
        url: "index-Css-Js/img-carousel/img-9-salto-de-la-moneda.jpg",
        alt: "Salto de la Moneda"   
    },
   {
        url: "index-Css-Js/img-carousel/img-10-La-Carolina.jpg",   
        alt: "La Carolina"
    },
    {
        url: "index-Css-Js/img-carousel/img-11-gruta-de-inti-huasi.jpg",
        alt: "Gruta de Inti Huasi"
    },
    {
        url: "index-Css-Js/img-carousel/img-12-calles-del-pueblo.jpg",
        alt: "Calles del Pueblo"
    }
];

// Función para inicializar el carrusel
function initCarousel(root, slides) {
    if (!root) return;
    
    const carousel = root.querySelector('.carousel');
    const prevBtn = root.querySelector('.carousel-btn.prev');
    const nextBtn = root.querySelector('.carousel-btn.next');
    const counter = root.querySelector('#carousel-counter');
    const dotsContainer = root.querySelector('.dots');
    
    if (!carousel) return;

    // Crear un único elemento <img> y actualizar su src/alt en cada cambio
    carousel.innerHTML = '';
    const img = document.createElement('img');
    img.id = 'carousel-image';
    img.className = 'slide active'; 
    img.loading = 'lazy';
    carousel.appendChild(img);

    const total = slides.length;
    if (total === 0) return;

    // Crear dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Ir a la imagen ${i+1}`);
        if (i === 0) b.classList.add('active');
        b.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(b);
    }
    const dots = dotsContainer.querySelectorAll('button');

    let index = 0;
    let interval = null;

    // Muestra la imagen i cambiando el src del <img>
    function show(i) {
        const s = slides[i];
        
        img.src = s.url;
        img.alt = s.alt || '';

        // Actualizar puntos y contador
        dots.forEach(d => d.classList.remove('active'));
        if (dots[i]) dots[i].classList.add('active');
        if (counter) counter.textContent = `${i+1}/${total}`;

        // Precarga la siguiente imagen para que la transición sea más fluida
        const nextIndex = (i + 1) % total;
        const pre = new Image();
        pre.src = slides[nextIndex].url;
    }

    function prev() { 
        goTo((index - 1 + total) % total); 
    }
    
    function next() { 
        goTo((index + 1) % total); 
    }

    function goTo(i) {
        index = i;
        show(index);
        resetInterval();
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    function startInterval() {
        interval = setInterval(() => { next(); }, 4000);
    }
    
    function resetInterval() {
        if (interval) clearInterval(interval);
        startInterval();
    }

    // Pausa al entrar con el mouse
    root.addEventListener('mouseenter', () => { 
        if (interval) clearInterval(interval); 
    });
    root.addEventListener('mouseleave', () => { 
        resetInterval(); 
    });

    // Soporte teclado (izq/der)
    root.addEventListener('keydown', (ev) => {
        if (ev.key === 'ArrowLeft') prev();
        if (ev.key === 'ArrowRight') next();
    });
    
    // Hacer foco para recibir teclas
    root.tabIndex = 0;

    // Iniciar mostrando la primera imagen
    show(index);
    startInterval();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('carousel-root');
    initCarousel(root, slides);
});

