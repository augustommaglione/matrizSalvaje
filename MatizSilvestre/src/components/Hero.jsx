import { useRef, useEffect, useCallback } from 'react';

const FRAGRANCES = [
  'Citrus',
  'Bambú',
  'Coniglio',
  'Maderas de Oriente',
  'Vainilla & Coco',
  'Frutos Rojos',
  'Mango & Maracuyá',
  'Hawai',
  'Jazmín',
  'Lavanda',
  'Chicle',
  'Naranja & Pimienta'
];

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const notesRef = useRef([]);
  const isLoopRunningRef = useRef(false);
  const animFrameIdRef = useRef(null);
  const lastIndexRef = useRef(-1);

  // Helper to pick random fragrance without immediate repeating
  const getRandomFragrance = useCallback(() => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * FRAGRANCES.length);
    } while (FRAGRANCES.length > 1 && nextIndex === lastIndexRef.current);
    lastIndexRef.current = nextIndex;
    return FRAGRANCES[nextIndex];
  }, []);

  // Particle & Note simulation loop
  const runAnimationLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      const notes = notesRef.current;
      const isMobile = rect.width < 768;

      // Update and draw mist particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.buoyancy;
        p.vx += p.turbulence;
        p.x += p.vx;
        p.y += p.vy;

        if (p.radius < p.maxRadius) {
          p.radius += 0.08;
        }
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
          grad.addColorStop(0, `rgba(245, 230, 185, ${p.alpha * 0.95})`);
          grad.addColorStop(0.4, `rgba(184, 145, 63, ${p.alpha * 0.5})`);
          grad.addColorStop(1, 'rgba(122, 90, 31, 0)');

          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      }

      // Update and draw floating fragrance names (Grandes, claras y destacadas)
      for (let i = notes.length - 1; i >= 0; i--) {
        const n = notes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.985;
        n.vy *= 0.985;
        n.alpha -= n.decay;

        if (n.alpha <= 0) {
          notes.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, n.alpha);

          const fontSize = isMobile ? 20 : 26;
          ctx.font = `italic 600 ${fontSize}px 'Cormorant Garamond', Georgia, serif`;
          const textWidth = ctx.measureText(n.text).width;
          const paddingX = isMobile ? 18 : 26;
          const paddingY = isMobile ? 8 : 12;
          const pillWidth = textWidth + paddingX * 2;
          const pillHeight = fontSize + paddingY * 2;

          // Shadow for depth
          ctx.shadowColor = 'rgba(122, 90, 31, 0.25)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 4;

          // Background capsule
          ctx.fillStyle = 'rgba(254, 252, 247, 0.96)';
          ctx.beginPath();
          ctx.roundRect(n.x - pillWidth / 2, n.y - pillHeight / 2, pillWidth, pillHeight, 4);
          ctx.fill();

          // Gold border
          ctx.shadowColor = 'transparent';
          ctx.strokeStyle = '#b8913f';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Scent text in deep gold hue
          ctx.fillStyle = '#7a5a1f';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.text, n.x, n.y);

          ctx.restore();
        }
      }

      if (particles.length > 0 || notes.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        isLoopRunningRef.current = false;
        ctx.clearRect(0, 0, rect.width, rect.height);
      }
    };

    isLoopRunningRef.current = true;
    animFrameIdRef.current = requestAnimationFrame(render);
  }, []);

  // Trigger spray burst at specific coordinates
  const triggerSpray = useCallback((x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const originX = typeof x === 'number' ? x : rect.width / 2;
    const originY = typeof y === 'number' ? y : rect.height * 0.45;

    // Spawn 65 micro mist droplets radiating from click
    const count = 65;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 8.5;

      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 3.2,
        maxRadius: 5.0 + Math.random() * 5.0,
        alpha: 0.9 + Math.random() * 0.1,
        decay: 0.012 + Math.random() * 0.015,
        drag: 0.93,
        buoyancy: -0.06 - Math.random() * 0.07,
        turbulence: (Math.random() - 0.5) * 0.25
      });
    }

    // Pick a random fragrance from the list
    const fragranceName = getRandomFragrance();

    // Keep note position comfortably inside screen bounds
    const noteX = Math.max(120, Math.min(rect.width - 120, originX));
    const noteY = Math.max(65, originY - 35);

    notesRef.current.push({
      x: noteX,
      y: noteY,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -1.1 - Math.random() * 0.8,
      alpha: 1,
      decay: 0.009, // Stays visible ~2.5 seconds
      text: fragranceName
    });

    if (!isLoopRunningRef.current) {
      runAnimationLoop();
    }
  }, [getRandomFragrance, runAnimationLoop]);

  // Handle Canvas Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial delightful welcome spray after load
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        triggerSpray(rect.width / 2, rect.height * 0.38);
      }
    }, 750);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [handleResize, triggerSpray]);

  // Click on Hero background
  const handleHeroClick = (e) => {
    // If clicking a link or button, don't interfere with navigation
    if (e.target.closest('a, button')) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerSpray(x, y);
  };

  return (
    <section 
      ref={heroRef}
      className="hero-wrapper py-5"
      onClick={handleHeroClick}
      title="Haz clic para rociar fragancia en el ambiente"
    >
      {/* Full-width interactive Canvas for mist & fragrance names */}
      <canvas ref={canvasRef} className="hero-full-canvas" />

      {/* Hero content layer occupying full space */}
      <div className="container hero-content-layer py-lg-5 text-center">
        <div className="max-w-900 mx-auto">
          
          <div className="hero-badge mb-4 hero-anim-badge">
            <i aria-hidden="true" className="bi bi-stars"></i>
            <span>Perfumería Artesanal en Pequeños Lotes</span>
          </div>

          <h1 className="display-3 font-serif fw-light mb-4 text-dark hero-anim-title leading-1">
            Aromas que transforman <br />
            <span className="fst-italic text-gold-dark">tus espacios</span> con serenidad botánica
          </h1>

          <div className="gold-divider"></div>

          <p className="lead text-muted fs-5 mb-5 mx-auto hero-anim-lead" style={{ maxWidth: '680px' }}>
            En <strong>Matiz Silvestre</strong> concebimos cada fragancia como una bruma sutil y envolvente, formulada artesanalmente para vestir el aire y tus textiles más preciados.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center mb-4 hero-anim-cta">
            <a href="#catalogo" className="btn btn-gold px-5 py-3">
              Explorar Catálogo
            </a>
            <a href="#filosofia" className="btn btn-outline-gold px-5 py-3">
              Nuestra Filosofía
            </a>
          </div>

          {/* Interactive spray hint pill (sin contador numérico) */}
          <div className="mt-3">
            <div 
              className="hero-spray-hint"
              onClick={(e) => {
                e.stopPropagation();
                const rect = heroRef.current?.getBoundingClientRect();
                triggerSpray(rect ? rect.width / 2 : 200, rect ? rect.height * 0.4 : 200);
              }}
              style={{ cursor: 'pointer' }}
            >
              <i aria-hidden="true" className="bi bi-droplet-fill text-gold"></i>
              <span>Presiona o haz clic en cualquier lugar para <strong>rociar el aroma</strong></span>
            </div>
          </div>

          {/* Offer strip */}
          <div className="mt-4 pt-3">
            <span className="badge-outline-gold me-2">
              Oferta Inaugural
            </span>
            <span className="small text-muted">
              Todos los productos con <strong>15% de descuento</strong> &bull; Home Sprays 200ml, Difusores 8ml y Gemas Difusor 10ml
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
