// Duración unificada para mensajes de éxito y cancelación
    const DURACION_MENSAJE_MS = 14000;

    // Contador de caracteres para el textarea
    const comentarios = document.getElementById('comentarios');
    const charCount = document.getElementById('char-count');
    
        comentarios.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });

        // Limpieza de error al empezar a editar los campos
        function setupLiveValidation() {
            const campos = ['nombre', 'apellido', 'telefono', 'email'];
            
            campos.forEach(function(id) {
                const campo = document.getElementById(id);
                if (!campo) return;
                
                campo.addEventListener('input', function() {
                    // Limpiar error al editar 
                    const error = document.getElementById(id + '-error');
                    if (error) error.textContent = '';
                    campo.classList.remove('input-error');
                    
                    verificarBotonCancelar();
                    verificarBotonEnviar();
                });
            });
            
            const destinos = document.getElementById('destinos');
            if (destinos) {
                destinos.addEventListener('change', function() {
                    const marcados = destinos.querySelectorAll('input[name="destinos"]:checked');
                    if (marcados.length > 0) {
                        const error = document.getElementById('destinos-error');
                        if (error) error.textContent = '';
                        destinos.classList.remove('group-error');
                    }
                    verificarBotonCancelar();
                    verificarBotonEnviar();
                });
            }
            
            const comentariosEl = document.getElementById('comentarios');
            if (comentariosEl) {
                comentariosEl.addEventListener('input', function() {
                    verificarBotonCancelar();
                });
            }
        }


        // Verifica si hay datos en el formulario para habilitar/deshabilitar el botón cancelar
        function verificarBotonCancelar() {
            const btnCancelar = document.getElementById('btn-cancelar');
            if (!btnCancelar) return;
            
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const comentarios = document.getElementById('comentarios').value.trim();
            const destinosMarcados = document.querySelectorAll('input[name="destinos"]:checked');
            
            const hayDatos = nombre !== '' || apellido !== '' || telefono !== '' || 
                             email !== '' || comentarios !== '' || destinosMarcados.length > 0;
            
            btnCancelar.disabled = !hayDatos;
        }

        // Verifica si todos los campos obligatorios tienen algún valor para habilitar el botón enviar
        function verificarBotonEnviar() {
            const btnEnviar = document.getElementById('btn-enviar');
            if (!btnEnviar) return;
            
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const destinosMarcados = document.querySelectorAll('input[name="destinos"]:checked');
            
            // Todos los campos obligatorios deben tener algún valor
            const camposObligatoriosCompletos = nombre !== '' && apellido !== '' && 
                                                telefono !== '' && email !== '' && 
                                                destinosMarcados.length > 0;
            
            btnEnviar.disabled = !camposObligatoriosCompletos;
        }

        // Validación del formulario
        function validarForm() {
            limpiarErrores();
            limpiarMensajes();
            
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            
            let flagEnvio = true;
            
            // Validación nombre (2-20 caracteres, solo letras y espacios). Uso el regexNombre para nombre y apellido
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (nombre === '') {
                mostrarError('nombre', 'El nombre es requerido.');
                flagEnvio = false;
            } else if (nombre.length < 2) {
                mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres.');
                flagEnvio = false;
            } else if (nombre.length > 20) {
                mostrarError('nombre', 'El nombre no puede tener más de 20 caracteres.');
                flagEnvio = false;
            } else if (!regexNombre.test(nombre)) {
                mostrarError('nombre', 'El nombre solo puede contener letras.');
                flagEnvio = false;
            }
            
            // Validación apellido (2-20 caracteres, solo letras y espacios)
            if (apellido === '') {
                mostrarError('apellido', 'El apellido es requerido.');
                flagEnvio = false;
            } else if (apellido.length < 2) {
                mostrarError('apellido', 'El apellido debe tener al menos 2 caracteres.');
                flagEnvio = false;
            } else if (apellido.length > 20) {
                mostrarError('apellido', 'El apellido no puede tener más de 20 caracteres.');
                flagEnvio = false;
            } else if (!regexNombre.test(apellido)) {
                mostrarError('apellido', 'El apellido solo puede contener letras.');
                flagEnvio = false;
            }
            
            // Validación teléfono (solo números, entre 8 y 15 dígitos)
            const regexTelefono = /^[0-9]+$/;
            const telefonoLimpio = telefono.replace(/[\s-]/g, '');
            if (telefono === '') {
                mostrarError('telefono', 'El teléfono es requerido.');
                flagEnvio = false;
            } else if (!regexTelefono.test(telefonoLimpio)) {
                mostrarError('telefono', 'El teléfono solo puede contener números.');
                flagEnvio = false;
            } else if (telefonoLimpio.length < 8) {
                mostrarError('telefono', 'El teléfono debe tener al menos 8 dígitos.');
                flagEnvio = false;
            } else if (telefonoLimpio.length > 15) {
                mostrarError('telefono', 'El teléfono no puede tener más de 15 dígitos.');
                flagEnvio = false;
            }
            
            // Validación email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                mostrarError('email', 'El correo electrónico es requerido.');
                flagEnvio = false;
            } else if (!regexEmail.test(email)) {
                mostrarError('email', 'El correo electrónico no tiene un formato válido.');
                flagEnvio = false;
            }
            
            // Seleccionar al menos un destino
            const seleccionados = document.querySelectorAll('input[name="destinos"]:checked');
            if (seleccionados.length === 0) {
                mostrarError('destinos', 'Seleccioná al menos un destino.');
                flagEnvio = false;
            }

            // Mensaje de éxito
            if (flagEnvio) {
                generarMensajeExito(nombre, apellido, email);
                limpiarFormulario();
            }
            
            return false;
        }
        
        // Genera el mensaje de éxito con los datos ingresados
        function generarMensajeExito(nombre, apellido, email) {
            const contenedorMensaje = document.getElementById('mensaje-exito');
            
            // Obtener destinos seleccionados
            const checkboxes = document.querySelectorAll('input[name="destinos"]:checked');
            let destinosTexto = '';
            
            if (checkboxes.length > 0) {
                const destinosArray = Array.from(checkboxes).map(cb => cb.value);
                if (destinosArray.length === 1) {
                    destinosTexto = ' para el destino <strong>' + destinosArray[0] + '</strong>';
                } else if (destinosArray.length === 2) {
                    destinosTexto = ' para los destinos <strong>' + destinosArray[0] + '</strong> y <strong>' + destinosArray[1] + '</strong>';
                } else {
                    const ultimo = destinosArray.pop();
                    destinosTexto = ' para los destinos <strong>' + destinosArray.join('</strong>, <strong>') + '</strong> y <strong>' + ultimo + '</strong>';
                }
            }
            
            contenedorMensaje.innerHTML = 'Consulta de <strong>' + nombre + ' ' + apellido + '</strong> con email <strong>' + email + '</strong>' + destinosTexto + ' enviada con éxito! En breve nos contactaremos con usted.';
            contenedorMensaje.classList.add('show');
            
            // Scroll hacia el mensaje
            contenedorMensaje.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Ocultar mensaje después del tiempo configurado
            setTimeout(() => {
                contenedorMensaje.classList.remove('show');
            }, DURACION_MENSAJE_MS);
        }
        
        // Muestra el mensaje de error dejabo del campo
        function mostrarError(campo, mensaje) {
            const errorSpan = document.getElementById(campo + '-error');
            if (errorSpan) errorSpan.textContent = mensaje;

            const campoEl = document.getElementById(campo);
            if (campoEl) {
                // Si es un input, resaltarlo; si es un contenedor (destinos), marcar grupo
                if (campoEl.tagName === 'INPUT' || campoEl.tagName === 'TEXTAREA') {
                    campoEl.classList.add('input-error');
                } else {
                    campoEl.classList.add('group-error');
                }
            }
        }
        
        // Limpia todos los mensajes de error del formulario
        function limpiarErrores() {
            // Limpiar solo spans de mensajes de error
            const errores = document.querySelectorAll('[id$="-error"].error');
            errores.forEach(error => error.textContent = '');

            // Quitar estilos de error de inputs
            const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
            inputs.forEach(input => input.classList.remove('input-error'));

            // Quitar posible error de destinos
            const grupoDestinos = document.getElementById('destinos');
            if (grupoDestinos) grupoDestinos.classList.remove('group-error');
        }
        
        // Limpia todos los campos del formulario y sincroniza botones
        function limpiarFormulario() {
            // Limpiar valores
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('email').value = '';
            document.getElementById('comentarios').value = '';
            charCount.textContent = '0';

            // Desmarcar checkboxes
            const checkboxes = document.querySelectorAll('input[name="destinos"]');
            checkboxes.forEach(cb => cb.checked = false);

            // Quitar estilos de error
            const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
            inputs.forEach(input => input.classList.remove('input-error'));
            const grupoDestinos = document.getElementById('destinos');
            if (grupoDestinos) grupoDestinos.classList.remove('group-error');

            // Sincronizar botones
            verificarBotonCancelar();
            verificarBotonEnviar();
        }
        
        function limpiarMensajes() {
            const mensajeExito = document.getElementById('mensaje-exito');
            const mensajeCancelar = document.getElementById('mensaje-cancelar');
            
            mensajeExito.classList.remove('show');
            mensajeCancelar.classList.remove('show');
        }

        function cancelarFormulario() {
            // confirmación custom, sin usar confirm() nativo
            const overlay = document.getElementById('confirmar-cancelar');
            overlay.removeAttribute('hidden');
            overlay.classList.add('show');

            const btnConfirm = overlay.querySelector('.btn-confirmar');
            if (btnConfirm) btnConfirm.focus();

            // Cerrar con ESC o clic en fondo
            function handleKey(e) {
                if (e.key === 'Escape') {
                    cerrarConfirmacion();
                }
            }
            function handleBackdrop(e) {
                if (e.target === overlay) {
                    cerrarConfirmacion();
                }
            }
            overlay.addEventListener('click', handleBackdrop, { once: true });
            document.addEventListener('keydown', handleKey, { once: true });
        }

        // Confirma la cancelación y limpia el formulario
        function confirmarCancelacion() {
            // Ocultar confirmación
            cerrarConfirmacion();

            // Limpiar estados previos y mensajes
            limpiarErrores();
            limpiarMensajes();

            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();

            // Limpiar formulario
            limpiarFormulario();

            // Mostrar mensaje de cancelación en pantalla 
            const mensajeCancelar = document.getElementById('mensaje-cancelar');
            mensajeCancelar.innerHTML = (nombre || apellido)
                ? 'Formulario de <strong>' + nombre + ' ' + apellido + '</strong> cancelado. Todos los datos han sido eliminados.'
                : 'Formulario cancelado. Todos los datos han sido eliminados.';
            mensajeCancelar.classList.add('show');

            // Asegurar que el mensaje de éxito no quede visible
            const mensajeExito = document.getElementById('mensaje-exito');
            mensajeExito.classList.remove('show');

            // Scroll al mensaje
            mensajeCancelar.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Ocultar automáticamente después del tiempo configurado
            setTimeout(() => {
                mensajeCancelar.classList.remove('show');
            }, DURACION_MENSAJE_MS);
        }

        // Cierra la confirmación de cancelación
        function cerrarConfirmacion() {
            const overlay = document.getElementById('confirmar-cancelar');
            overlay.classList.remove('show');
            overlay.setAttribute('hidden', '');
        }

        // Inicializar validación en vivo
        setupLiveValidation();
        // Sincronizar estado de botones al cargar (por si el navegador autocompleta)
        verificarBotonCancelar();
        verificarBotonEnviar();