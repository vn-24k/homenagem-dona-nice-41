/**
 * TRAV — Controlador de Hero de Viajes
 * Gestiona video en pantalla completa, menú móvil accesible y accesibilidad.
 */

(function () {
  'use strict';

  function initTravHero() {
    const hero = document.querySelector('.trav-hero');
    if (!hero) return;

    const video = hero.querySelector('video');
    const menuToggle = hero.querySelector('.trav-menu-toggle');
    const nav = hero.querySelector('.trav-nav');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let isVisible = true;

    // Sincronización de video
    const syncPlayback = () => {
      if (!video) return;

      const shouldPause = reducedMotionQuery.matches || document.hidden || !isVisible;

      if (shouldPause) {
        if (!video.paused) {
          video.pause();
        }
        return;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Si el navegador bloquea autoplay se mantiene el póster estático
        });
      }
    };

    if (video) {
      video.addEventListener('canplay', () => {
        hero.classList.add('has-video');
        syncPlayback();
      });

      video.addEventListener('error', () => {
        hero.classList.remove('has-video');
      });
    }

    // IntersectionObserver: pausa video fuera del viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          syncPlayback();
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);

    // Eventos de visibilidad y preferencias
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotionQuery.addEventListener('change', syncPlayback);

    // Menú móvil accesible
    if (menuToggle && nav) {
      const toggleMenu = (open) => {
        const isOpen = open !== undefined ? open : !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      };

      menuToggle.addEventListener('click', () => {
        toggleMenu();
      });

      // Cerrar menú con tecla Escape
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
          toggleMenu(false);
          menuToggle.focus();
        }
      });

      // Cerrar al hacer clic fuera
      document.addEventListener('click', (event) => {
        if (
          nav.classList.contains('is-open') &&
          !nav.contains(event.target) &&
          !menuToggle.contains(event.target)
        ) {
          toggleMenu(false);
        }
      });
    }

    // Inicializar reproducción
    syncPlayback();

    // Limpieza
    window.addEventListener(
      'pagehide',
      () => {
        if (video) video.pause();
        observer.disconnect();
      },
      { once: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTravHero);
  } else {
    initTravHero();
  }
})();
