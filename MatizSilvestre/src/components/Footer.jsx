import { BRAND_INFO } from '../data/initialData';

export default function Footer({ onOpenPolicy }) {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 border-top border-gold">
      <div className="container">
        <div className="row g-4 justify-content-between mb-4">
          
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <i aria-hidden="true" className="bi bi-flower1 text-gold fs-4"></i>
              <h5 className="font-serif tracking-wider mb-0 text-white">
                MATIZ SILVESTRE
              </h5>
            </div>
            <p className="text-secondary small mb-3" style={{ maxWidth: '380px' }}>
              {BRAND_INFO.tagline} Perfumería artesanal, Home Sprays y difusores elaborados con dedicación.
            </p>
            <div className="d-flex gap-3">
              <a 
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-secondary hover-gold"
                aria-label="WhatsApp"
              >
                <i aria-hidden="true" className="bi bi-whatsapp fs-5"></i>
              </a>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase tracking-wider text-gold small mb-3">Navegación</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li><a href="#catalogo" className="text-secondary text-decoration-none hover-white">Catálogo de Productos</a></li>
              <li><a href="#filosofia" className="text-secondary text-decoration-none hover-white">Filosofía</a></li>
              <li><a href="#contacto" className="text-secondary text-decoration-none hover-white">Contacto Directo</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPolicy}
                  className="btn btn-link p-0 text-start text-secondary text-decoration-none hover-white border-0 align-baseline"
                  style={{ fontSize: 'inherit' }}
                  aria-haspopup="dialog"
                >
                  Condiciones de Compra y Envíos
                </button>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase tracking-wider text-gold small mb-3">Colección</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li className="text-secondary">Home Spray & Textil 200ml</li>
              <li className="text-secondary">Difusor Colgante 8ml</li>
              <li className="text-secondary">Gema Difusor 10ml</li>
            </ul>
          </div>

        </div>

        <div className="border-top border-secondary border-opacity-50 pt-3 d-flex flex-column flex-sm-row justify-content-between align-items-center text-secondary small" style={{ fontSize: '0.72rem' }}>
          <span>&copy; {new Date().getFullYear()} Matiz Silvestre. Todos los derechos reservados.</span>
          <span className="mt-2 mt-sm-0">Diseño & Artesanía en Perfumería</span>
        </div>
      </div>
    </footer>
  );
}
