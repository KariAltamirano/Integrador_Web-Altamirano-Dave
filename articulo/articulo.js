// Esperar a que la página cargue completamente
        document.addEventListener('DOMContentLoaded', function() {
            // Selecciona las tarjetas de destinos
            const tarjetas = document.querySelectorAll('.destino-card');
            
            // Recorrer cada tarjeta y agregar efectos
            tarjetas.forEach(function(tarjeta) {
                
                // Cuando el mouse entra en la tarjeta
                tarjeta.addEventListener('mouseenter', function() {
                    // Mover la tarjeta hacia arriba
                    tarjeta.style.transform = 'translateY(-8px)';
                    // Aumentar la sombra
                    tarjeta.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                });
                
                // Cuando el mouse sale de la tarjeta
                tarjeta.addEventListener('mouseleave', function() {
                    // Volver la tarjeta a su posición original
                    tarjeta.style.transform = 'translateY(0)';
                    // Reducir la sombra
                    tarjeta.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                });
                
            });
        });