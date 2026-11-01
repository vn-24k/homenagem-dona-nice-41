/**
 * HOMENAGEM ESPECIAL • DONA NICE (41 ANOS)
 * Versão Aprimorada: Coleção Curada 8K, Efeitos Mágicos, Cursor Personalizado e GSAP Fan
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DADOS DOS 7 CARDS DO LEQUE (TEXTOS HUMANOS E EMOTIVOS)
  // =========================================================================
  const MEMORIAS = [
    {
      imgUrl: 'assets/curated/mundo_inteiro.jpg',
      tag: 'Infância & Amor',
      title: 'Meu Mundo Inteiro',
      desc: 'Lembro de quando o mundo era pequeno e você era meu porto seguro. A certeza inabalável de que eu nunca estaria desamparado na Terra.'
    },
    {
      imgUrl: 'assets/curated/cafe_quentinho.jpg',
      tag: 'Cuidado Silencioso',
      title: 'Aquele Café Quentinho',
      desc: 'Dedicação pura. Você repara no que ninguém vê, prepara o ambiente com amor e acolhe em silêncio com o coração mais generoso.'
    },
    {
      imgUrl: 'assets/curated/fortaleza.jpg',
      tag: 'Garra & Coragem',
      title: 'Minha Fortaleza',
      desc: 'Nas noites difíceis e tempestades da vida, foi a sua força que manteve o barco de pé. Tudo o que tenho de honrado e bom veio de você.'
    },
    {
      imgUrl: 'assets/curated/vida_adulta.jpg',
      tag: 'Nostalgia & Verdade',
      title: 'A Vida Adulta e o Vazio',
      desc: 'A rotina e a correria dos dias acabaram nos afastando... Mas o meu amor nunca diminuiu um milímetro. A saudade é real.'
    },
    {
      imgUrl: 'assets/curated/sacrificios.jpg',
      tag: 'Gratidão Profunda',
      title: 'Sacrifícios Silenciosos',
      desc: 'Quanto mais eu amadureço, mais entendo cada esforço silencioso que você fez. Não existe presente em caixa que pague o que você é.'
    },
    {
      imgUrl: 'assets/curated/recomeco.jpg',
      tag: 'A Promessa do Filho',
      title: 'O Presente: Recomeço',
      desc: 'Estar de volta na sua rotina: sentar no sofá com você, tomar aquele café demorado, rir de bobeiras e ser seu amigo de verdade.'
    },
    {
      imgUrl: 'assets/curated/luz_41anos.jpg',
      tag: 'Celebração da Vida',
      title: '41 Anos de Pura Luz!',
      desc: 'Celebrando a mulher mais admirável, jovem e guerreira que conheço. Feliz aniversário, mãe! O nosso melhor capítulo começa agora.'
    }
  ];

  // =========================================================================
  // 2. HERO PORTAL: VÍDEO E MÍDIA 8K
  // =========================================================================
  function initHeroMedia() {
    const stage = document.querySelector('.center-stage');
    if (!stage) return;

    const video = stage.querySelector('video');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncPlayback = () => {
      if (!video) return;
      if (reducedMotion.matches || document.hidden) {
        if (!video.paused) video.pause();
        return;
      }
      video.play().catch(() => {});
    };

    if (video) {
      video.addEventListener('canplay', () => {
        stage.classList.add('has-film');
        syncPlayback();
      });
      // Toque inicial na tela para liberar reprodução caso haja bloqueio mobile
      document.body.addEventListener('touchstart', () => {
        if (video.paused && !reducedMotion.matches) video.play().catch(() => {});
      }, { once: true });
    }

    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    syncPlayback();
  }

  // =========================================================================
  // 3. CARROSSEL EM LEQUE GSAP (CARD FAN CAROUSEL)
  // =========================================================================
  const FAN_POSITIONS = [
    { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
    { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
    { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
    { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
    { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
    { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
    { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
  ];

  function getResponsiveMultiplier(w) {
    if (w < 480) return 0.28;
    if (w < 640) return 0.38;
    if (w < 768) return 0.50;
    if (w < 1024) return 0.75;
    return 1.0;
  }

  function getHeightMultiplier(w) {
    let idealPx = w < 480 ? 352 : w < 640 ? 416 : w < 768 ? 448 : w < 1024 ? 544 : 608;
    const available = window.innerHeight * 0.7;
    return available >= idealPx ? 1 : available / idealPx;
  }

  function initFanCarousel() {
    const layout = document.querySelector('.fan-layout');
    const dotsContainer = document.querySelector('.fan-dots');
    const prevBtn = document.querySelector('.fan-prev');
    const nextBtn = document.querySelector('.fan-next');
    if (!layout || typeof gsap === 'undefined') return;

    layout.innerHTML = '';
    dotsContainer.innerHTML = '';

    MEMORIAS.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'fan-card';
      card.dataset.index = idx;
      card.innerHTML = `
        <img src="${item.imgUrl}" alt="${item.title}" loading="lazy">
        <div class="fan-card-shade">
          <span class="fan-card-tag">${item.tag}</span>
          <h3 class="fan-card-title">${item.title}</h3>
          <p class="fan-card-desc">${item.desc}</p>
        </div>
      `;
      layout.appendChild(card);

      const dot = document.createElement('span');
      dot.className = `fan-dot ${idx === 3 ? 'active' : ''}`;
      dot.dataset.index = idx;
      dot.addEventListener('click', () => setCenter(idx));
      dotsContainer.appendChild(dot);
    });

    const cards = Array.from(layout.querySelectorAll('.fan-card'));
    const dots = Array.from(dotsContainer.querySelectorAll('.fan-dot'));
    const total = cards.length;
    let centerIndex = 3;
    let isAnimating = false;

    function renderFan(animate = true) {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hMult = getHeightMultiplier(window.innerWidth);

      cards.forEach((card, idx) => {
        const diff = (idx - centerIndex + total) % total;
        let slot = diff;
        if (slot > 3) slot = slot - total;

        const absSlot = Math.abs(slot);
        const inView = absSlot <= 3;

        if (inView) {
          const configIndex = slot + 3;
          const pos = FAN_POSITIONS[configIndex] || FAN_POSITIONS[3];
          const targetX = `${pos.x * mult}rem`;
          const targetY = `${pos.y * hMult}rem`;

          if (animate) {
            gsap.to(card, {
              x: targetX,
              y: targetY,
              rotation: pos.rot,
              scale: pos.scale,
              opacity: 1,
              zIndex: pos.zIndex,
              duration: 0.55,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          } else {
            gsap.set(card, {
              x: targetX,
              y: targetY,
              rotation: pos.rot,
              scale: pos.scale,
              opacity: 1,
              zIndex: pos.zIndex
            });
          }
        } else {
          const exitDir = slot > 0 ? 35 : -35;
          gsap.to(card, {
            x: `${exitDir * mult}rem`,
            opacity: 0,
            scale: 0.4,
            zIndex: 0,
            duration: 0.4,
            overwrite: 'auto'
          });
        }
      });

      dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === centerIndex);
      });
    }

    function setCenter(newCenter) {
      if (centerIndex === newCenter) return;
      centerIndex = (newCenter + total) % total;
      renderFan(true);
    }

    function cycle(direction) {
      if (isAnimating) return;
      isAnimating = true;
      if (direction === 'right') {
        centerIndex = (centerIndex + 1) % total;
      } else {
        centerIndex = (centerIndex - 1 + total) % total;
      }
      renderFan(true);
      setTimeout(() => { isAnimating = false; }, 320);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => cycle('left'));
    if (nextBtn) nextBtn.addEventListener('click', () => cycle('right'));

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => setCenter(idx));
    });

    // Touch Swipe no Celular
    let touchStartX = 0;
    layout.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    layout.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) cycle('right');
        else cycle('left');
      }
    }, { passive: true });

    window.addEventListener('resize', () => renderFan(false));

    // Entrada inicial
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      scale: 0.6,
      stagger: 0.05,
      duration: 1.0,
      ease: 'elastic.out(1.05, 0.78)',
      delay: 0.15,
      onComplete: () => renderFan(false)
    });
  }

  // =========================================================================
  // 4. PARTÍCULAS DOURADAS FLUTUANTES (EFEITO MÁGICO)
  // =========================================================================
  function initMagicParticles() {
    const canvas = document.getElementById('magic-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = width < 768 ? 30 : 60;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.6 + 0.2,
        alphaDelta: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        hueShift: Math.random() * 15 - 7
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.2;
        p.alpha += p.alphaDelta;

        if (p.alpha <= 0.15 || p.alpha >= 0.85) {
          p.alphaDelta = -p.alphaDelta;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${229 + p.hueShift}, ${185 + p.hueShift}, 95, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    animate();
  }

  // =========================================================================
  // 5. TRILHA SONORA (CANON IN D)
  // =========================================================================
  function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicText = document.getElementById('music-text');
    const ctaBtn = document.querySelector('.center-cta');
    if (!audio || !musicBtn) return;

    let isPlaying = false;
    audio.volume = 0.55;

    function playMusic() {
      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          isPlaying = true;
          musicBtn.classList.add('is-playing');
          if (musicText) musicText.textContent = 'Tocando: Canon in D';
        }).catch(() => {
          isPlaying = false;
        });
      }
    }

    function pauseMusic() {
      audio.pause();
      isPlaying = false;
      musicBtn.classList.remove('is-playing');
      if (musicText) musicText.textContent = 'Pausado • Tocar';
    }

    function toggleMusic() {
      if (isPlaying) pauseMusic();
      else playMusic();
    }

    musicBtn.addEventListener('click', toggleMusic);

    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        if (!isPlaying) playMusic();
      });
    }
  }

  // =========================================================================
  // 6. CURSOR PERSONALIZADO & EFEITOS DE TOQUE
  // =========================================================================
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Apenas no desktop (com mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
      cursor.style.display = 'block';
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let curX = mouseX;
      let curY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function renderCursor() {
        curX += (mouseX - curX) * 0.15;
        curY += (mouseY - curY) * 0.15;
        cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
        requestAnimationFrame(renderCursor);
      }
      renderCursor();

      // Expansão em links e botões
      document.querySelectorAll('a, button, .fan-card').forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
      });
    } else {
      cursor.style.display = 'none';
    }

    // Efeito de ondulação de luz ao tocar no celular
    window.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const ripple = document.createElement('div');
      ripple.className = 'touch-ripple';
      ripple.style.left = `${touch.clientX}px`;
      ripple.style.top = `${touch.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }, { passive: true });
  }

  // =========================================================================
  // 7. INICIALIZAÇÃO GERAL
  // =========================================================================
  function init() {
    initHeroMedia();
    initFanCarousel();
    initMagicParticles();
    initMusicPlayer();
    initCustomCursor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
