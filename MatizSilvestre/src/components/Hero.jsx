import fotoHs200ml from '../assets/images/Hs_200mlHeader.jpg';
export default function Hero() {
  return (
    <section className="hero-wrapper py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          
          {/* Left Column: Brand Story & CTA */}
          <div className="col-lg-7 text-center text-lg-start">
            <div className="hero-badge mb-3">
              <i aria-hidden="true" className="bi bi-stars"></i>
              <span>Artesanal</span>
            </div>

            <h1 className="display-4 fw-light mb-3 text-dark">
              Aromas que transforman <br />
              <span className="fst-italic text-gold-dark"> tus espacios</span>
            </h1>

            <p className="lead text-muted fs-6 mb-4 pe-lg-5" style={{ maxWidth: '580px' }}>
              En <strong>Matiz Silvestre</strong> elaboramos perfumería artesanal y textil en pequeños lotes.
            </p>

            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-5">
              <a href="#catalogo" className="btn btn-gold px-4 py-3">
                Explorar Catálogo
              </a>
              <a href="#filosofia" className="btn btn-outline-gold px-4 py-3">
                Nuestra Filosofía
              </a>
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
                    src={fotoHs200ml}
                    alt="Home Spray y Textil Matiz Silvestre de 200 ml con gatillo dorado sobre una mesa"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>

                <div className="pt-3 text-center">
                  <span className="badge-outline-gold d-inline-block mb-1">
                    Ofertas Inaguración 
                  </span>
                  <p className="font-serif fs-5 mb-0 text-dark">
                    Todas los productos con <strong>15% de descuento</strong>.
                  </p>
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Home Sprays 200ml &bull; Difusores 8ml &bull; Gema Difusores 10ml
                  </small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
