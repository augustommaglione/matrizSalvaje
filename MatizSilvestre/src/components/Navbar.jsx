export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="sticky-top bg-white border-bottom border-gold shadow-sm" style={{ zIndex: 1020 }}>
      <div className="container py-3">

        {/* Top row: brand + cart */}
        <div className="d-flex align-items-center justify-content-between">
          <a href="#" className="text-decoration-none d-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center border border-gold"
              style={{ width: '38px', height: '38px', borderRadius: '50%' }}
            >
              <i aria-hidden="true" className="bi bi-flower1 text-gold fs-5"></i>
            </div>
            <div>
              <span className="font-serif fs-4 text-dark fw-bold tracking-wide d-block leading-1">
                MATIZ SILVESTRE
              </span>
              <small className="text-muted tracking-wider" style={{ fontSize: '0.62rem' }}>
                PERFUMERÍA ARTESANAL
              </small>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="d-none d-md-flex align-items-center gap-4">
            <a href="#catalogo" className="text-dark text-decoration-none tracking-wide fw-medium small hover-gold">
              Catálogo
            </a>
            <a href="#filosofia" className="text-dark text-decoration-none tracking-wide fw-medium small hover-gold">
              Filosofía
            </a>
            <a href="#contacto" className="text-dark text-decoration-none tracking-wide fw-medium small hover-gold">
              Contacto
            </a>
          </nav>

          <button
            onClick={onOpenCart}
            className="btn btn-outline-gold position-relative d-flex align-items-center gap-2 px-3 py-2"
            style={{ borderRadius: '0px' }}
            aria-label="Abrir Carrito de Compras"
          >
            <i aria-hidden="true" className="bi bi-bag"></i>
            <span className="d-none d-sm-inline" style={{ fontSize: '0.75rem' }}>Bolsa</span>
            {cartCount > 0 && (
              <span className="badge bg-gold text-white rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <div className="d-md-none border-top border-gold mt-2 pt-2">
          <nav className="d-flex align-items-center justify-content-around">
            <a href="#catalogo" className="text-dark text-decoration-none small tracking-wide">
              Catálogo
            </a>
            <a href="#filosofia" className="text-dark text-decoration-none small tracking-wide">
              Filosofía
            </a>
            <a href="#contacto" className="text-dark text-decoration-none small tracking-wide">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
