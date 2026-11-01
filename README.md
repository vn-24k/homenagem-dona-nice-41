# Hero Cinematográfica «Portal»

Implementación de la sección Hero cinematográfica **Portal** con arco monumental de cerámica azul, cobre y nubes luminosas, diseñada siguiendo las proporciones y animaciones de referencia.

---

## Características Principales

- **Composición:** Arco monumental centrado con video en bucle y póster de respaldo.
- **Tipografía:** 
  - `Syne 700` para el título principal y marca de cabecera.
  - `DM Sans 400/500` para subtítulos y botones.
  - Título H1: `clamp(62px, 6.9vw, 118px)` con interlineado `.89` y tracking `-.065em`.
  - Subtítulo: `clamp(21px, 1.8vw, 26px)` en escritorio y `20px` en móvil.
- **Botón de Cristal («Cruzar el portal»):**
  - Acabado translúcido con desenfoque de `18px` (`backdrop-filter`).
  - Borde blanco fino y reflejo interior (`inset box-shadow`).
  - Altura entre 60 y 66 px con esquinas completamente redondeadas (`border-radius: 999px`).
  - Texto blanco centrado, sin flechas ni iconos adicionales.
- **Interacción y Movimiento:**
  - Video en loop con `autoplay`, `muted` y `playsinline`.
  - Al pulsar «Cruzar el portal» o «Ver escena» en la cabecera, se despejan los textos (modo inmersivo) para contemplar el video.
  - Al presionar «Volver al inicio» o pulsar la tecla `Escape`, se restaura el contenido con transiciones fluidas.
- **Rendimiento y Accesibilidad:**
  - Pausa automática cuando la sección sale del viewport mediante `IntersectionObserver`.
  - Pausa si la pestaña pasa a segundo plano (`visibilitychange`).
  - Compatibilidad total con `prefers-reduced-motion`: oculta el video y mantiene la vista estática nítida sin transiciones bruscas.
  - Foco visible accesible (`:focus-visible`) para navegación por teclado.

---

## Estructura de Archivos

```
PROJETOS/portal-hero/
├── index.html     # Estructura HTML de la hero cinematográfica
├── portal.css     # Estilos responsivos, fuentes y efecto de cristal
├── portal.js      # Controlador de video, eventos y modo inmersivo
└── README.md      # Documentación técnica
```

---

## Cómo Probar Localmente

Puedes iniciar un servidor web local rápido con Python:

```bash
# Dentro de la carpeta del proyecto
cd /root/apk-work/PROJETOS/portal-hero
python3 -m http.server 8080
```

O desde la raíz del workspace:

```bash
cd /root/apk-work
python3 -m http.server 8080
```

Abre en tu navegador: `http://localhost:8080`
