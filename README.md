# Serrana Trips - Sitio Web

Proyecto integrador de desarrollo web que presenta un sitio completo para una agencia de turismo local en San Luis, Argentina.

**Autoras:**
- Karina Altamirano
- Natalia Dave

**Contexto Académico:** Proyecto desarrollado para la asignatura **WEB 1** del 2° cuatrimestre 2025 en Tecnicatura en Desarrollo de Software.

---

## Descripción

**Serrana Trips** es una agencia de turismo especializada en experiencias locales y regionales por la provincia de San Luis. El sitio web incluye información sobre destinos turísticos, formulario de contacto y detalles sobre los servicios de la agencia.

## Características

- **Diseño responsive** adaptado a dispositivos móviles, tablets y escritorio
- **Carrusel automático** de destinos en la página principal
- **Formulario de contacto** con validación completa en JavaScript
- **Modal de confirmación** personalizado para cancelación de formulario
- **Validación en vivo** que limpia errores al vaciar campos
- **Galería de destinos** con información detallada (ubicación, horarios, precios)
- **Paleta de colores** consistente definida con variables CSS

## Estructura del Proyecto

```
Integrador_Web-Altamirano-Dave/
│
├── index.html                  # Página principal
├── indexStyles.css             # Estilos de la página principal
├── README.md                   # Este archivo
│
├── articulo/
│   ├── articulo.html           # Página de destinos turísticos
│   ├── articulo.css            # Estilos de destinos
│   └── articuloImagenes/       # Imágenes de los destinos
│
├── formulario/
│   ├── formulario.html         # Página de contacto
│   └── formulario.css          # Estilos del formulario
│
└── img/                        # Recursos gráficos
    ├── Logo/
    ├── La Carolina/
    ├── Merlo/
    ├── Potrero de los Funes/
    ├── San Luis/
    ├── Sierra de las Quijadas/
    └── medios de pago/
```

## Paleta de Colores

El sitio utiliza una paleta consistente definida en `:root`:

- **Azul principal**: `#2C5282`
- **Azul claro**: `#4299E1`
- **Naranja**: `#F6AD55`
- **Gris**: `#2D3748`
- **Fondo**: `#F7FAFC`
- **Rojo**: `#E53E3E`
- **Verde**: `#48BB78`

## Páginas del Sitio

### 1. Inicio (`index.html`)
- Presentación de la agencia
- Carrusel automático de destinos destacados
- Información sobre el equipo
- Detalles de movilidad propia (transfers y colectivos)
- Descuentos y beneficios
- Medios de pago aceptados

### 2. Destinos (`articulo/articulo.html`)
Información de 6 destinos turísticos:
- **Sierra de las Quijadas**
- **Villa de Merlo**
- **Dique La Florida**
- **San Luis Capital**
- **Potrero de los Funes**
- **La Carolina**

Cada destino incluye:
- Imagen representativa
- Descripción
- Ubicación
- Horarios de salida
- Duración del tour
- Precio
- Botón con link al formualrio de contacto

### 3. Contacto (`formulario/formulario.html`)
Formulario con validaciones:
- Nombre (2-20 caracteres, solo letras - requerido)
- Apellido (2-20 caracteres, solo letras - requerido)
- Teléfono (8-15 dígitos numéricos - requerido)
- Email (formato válido para e-mails - requerido)
- Destinos de interés (checkboxes, al menos uno requerido)
- Comentarios (máximo 500 caracteres con contador - no requerido)

**Características del formulario:**
- Validación del lado del cliente con JavaScript
- Mensajes de error específicos para cada campo
- Limpieza automática de errores al vaciar campos
- Modal de confirmación personalizado para cancelar
- Mensaje de éxito detallado al enviar

## Tecnologías Utilizadas

- **HTML5** semántico
- **CSS3** con Flexbox y Grid
- **JavaScript** sin frameworks
- Variables CSS para tematización
- Media queries para diseño responsive

## Validaciones del Formulario

### Nombre y Apellido
- Requerido
- Mínimo 2 caracteres (teniendo enc cuenta nombres como "Li Wu")
- Máximo 20 caracteres
- Solo letras (incluye acentos y ñ)

### Teléfono
- Requerido
- Solo dígitos numéricos
- Entre 8 y 15 dígitos

### Email
- Requerido
- Formato válido (usuario@dominio.ext)

### Destinos
- Al menos un destino debe seleccionarse

### Comentarios
- Opcional
- Máximo 500 caracteres
- Contador en tiempo real

## Responsive Design

El sitio es completamente responsive con breakpoints en:
- **768px**: Tablets (navbar en columna, ajustes de tamaño)
- **480px**: Móviles (fuentes más pequeñas, layout vertical)

## Funcionalidades JavaScript

### Carrusel Automático (index.html)
- Rotación automática cada 5 segundos
- Controles manuales (anterior/siguiente)
- Pausado al interactuar
- Smooth scroll entre slides

### Validación de Formulario
- Validación completa al enviar
- Limpieza de errores al vaciar campos
- Validación de checkboxes en tiempo real
- Modal de confirmación para cancelar

### Efectos Interactivos
- Hover en cards de destinos
- Transiciones suaves
- Animaciones fadeIn para mensajes de éxito y cancelación
- Focus states accesibles para campos activos

## Componentes Comunes

### Header (Navegación)
Todas las páginas comparten un header consistente que incluye:
- **Logo de Serrana Trips** (imagen transparente)
- **Nombre de la agencia** como título principal
- **Slogan** (solo en página de inicio): "Viví la esencia de San Luis. Turismo local, naturaleza y experiencias únicas en cada rincón serrano"
- **Menú de navegación** con 3 enlaces:
  - Inicio
  - Destinos
  - Contacto
- Indicador visual de página activa
- Efectos hover en los enlaces

### Footer (Pie de página)
Todas las páginas incluyen un footer con:
- **Información de marca**: Nombre y descripción de Serrana Trips
- **Datos de contacto**:
  - Ubicación: San Luis, Argentina
  - Dirección física: San Martín 569, San Luis
  - Teléfono: +54 9 266 541 3654
  - Email: info@serranatrips.com
  - Horarios de atención: Lunes a Sábado | 9:00 - 18:00
- **Copyright y disclaimer legal**: © 2025 Serrana Trips | Agencia habilitada por el Ministerio de Turismo de San Luis
- **Enlaces**: Política de Privacidad · Términos y Condiciones

## Navegación del Sitio

- **Inicio** → Información general, carrusel, equipo
- **Destinos** → Catálogo de tours disponibles
- **Contacto** → Formulario de consulta y reserva


