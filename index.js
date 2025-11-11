 // Inicialización del carrusel
            document.addEventListener('DOMContentLoaded', function() {
                const root = document.getElementById('carousel-root');
                if (!root) return;
                initCarousel(root);
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

                // crear puntos
                for (let i = 0; i < total; i++) {
                    const b = document.createElement('button');
                    b.setAttribute('aria-label', `Ir a la imagen ${i+1}`);
                    if (i === 0) b.classList.add('active');
                    b.addEventListener('click', function() { goTo(i); });
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
                    interval = setInterval(function() { next(); }, 4000);
                }
                function resetInterval() {
                    if (interval) clearInterval(interval);
                    startInterval();
                }

                // pausa al entrar con el mouse
                root.addEventListener('mouseenter', function() { if (interval) clearInterval(interval); });
                root.addEventListener('mouseleave', function() { resetInterval(); });

                // iniciar
                show(index);
                startInterval();
            }