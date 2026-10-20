import React from 'react';

export default function Hero() {
  return (
    <section className="hero-wrapper py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          
          {/* Left Column: Brand Story & CTA */}
          <div className="col-lg-7 text-center text-lg-start">
            <div className="hero-badge mb-3">
              <i className="bi bi-stars"></i>
              <span>Colección Botánica & Textil</span>
            </div>

            <h1 className="display-4 fw-light mb-3 text-dark">
              Aromas que transforman <br />
              <span className="fst-italic text-gold">la calma de tus espacios</span>
            </h1>

            <p className="lead text-muted fs-6 mb-4 pe-lg-5" style={{ maxWidth: '580px' }}>
              En <strong>Matiz Silvestre</strong> elaboramos perfumería artesanal y textil en pequeños lotes, 
              fusionando esencias botánicas puras con maderas nobles para crear atmósferas de serenidad y sofisticación.
            </p>

            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-5">
              <a href="#catalogo" className="btn btn-gold px-4 py-3">
                Explorar Catálogo
              </a>
              <a href="#filosofia" className="btn btn-outline-gold px-4 py-3">
                Nuestra Filosofía
              </a>
            </div>

            {/* Quick Badges */}
            <div className="row g-3 pt-3 border-top border-gold text-start">
              <div className="col-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-droplet-half text-gold fs-5"></i>
                  <div>
                    <h6 className="mb-0 small fw-bold">Maceración</h6>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>Artesanal</small>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-feather text-gold fs-5"></i>
                  <div>
                    <h6 className="mb-0 small fw-bold">Textiles</h6>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>No mancha</small>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-gem text-gold fs-5"></i>
                  <div>
                    <h6 className="mb-0 small fw-bold">Diseño Único</h6>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>Facetado & noble</small>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="col-lg-5">
            <div className="position-relative mx-auto" style={{ maxWidth: '420px' }}>
              <div 
                className="p-3 bg-white shadow-lg border border-gold"
                style={{ borderRadius: '2px' }}
              >
                <div className="product-img-wrapper" style={{ height: '420px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=900&auto=format&fit=crop"
                    alt="Frascos de perfume artesanal Matiz Silvestre"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <div className="pt-3 text-center">
                  <span className="badge-outline-gold d-inline-block mb-1">
                    Edición Limitada
                  </span>
                  <p className="font-serif fs-5 mb-0 text-dark">
                    Fragancias con Alma Silvestre
                  </p>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Home Sprays 200ml &bull; Difusores Colgantes 8ml &bull; Gemas 10ml
                  </small>
                </div>
              </div>

              {/* Decorative accent card */}
              <div 
                className="position-absolute d-none d-sm-block bg-white border border-gold p-3 shadow"
                style={{ bottom: '-20px', left: '-25px', maxWidth: '190px' }}
              >
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="bi bi-check2-circle text-gold fs-5"></i>
                  <span className="fw-bold small text-dark">100% Puro</span>
                </div>
                <small className="text-muted" style={{ fontSize: '0.68rem', lineHeight: '1.2' }}>
                  Esencias libres de parabenos y no testeado en animales.
                </small>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
