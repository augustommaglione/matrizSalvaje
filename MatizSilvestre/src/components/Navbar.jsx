import React from 'react';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin }) {
  return (
    <header className="sticky-top bg-white border-bottom border-gold shadow-sm" style={{ zIndex: 1020 }}>
      <div className="container py-3 d-flex align-items-center justify-content-between">
        
        {/* Brand / Logo */}
        <a href="#" className="text-decoration-none d-flex align-items-center gap-2">
          <div 
            className="d-flex align-items-center justify-content-center border border-gold"
            style={{ width: '38px', height: '38px', borderRadius: '50%' }}
          >
            <i className="bi bi-flower1 text-gold fs-5"></i>
          </div>
          <div>
            <span className="font-serif fs-4 text-dark fw-bold tracking-wide d-block leading-1">
              MATIZ SILVESTRE
            </span>
            <small className="text-muted tracking-wider" style={{ fontSize: '0.62rem' }}>
              PERFUMERÍA DE AUTOR
            </small>
          </div>
        </a>

        {/* Navigation links */}
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

        {/* Action Buttons: Admin & Cart */}
        <div className="d-flex align-items-center gap-2">
          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 border-0"
            title="Panel Administrador de Fragancias"
            style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}
          >
            <i className="bi bi-shield-lock text-gold"></i>
            <span className="d-none d-sm-inline text-muted">Admin</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="btn btn-outline-gold position-relative d-flex align-items-center gap-2 px-3 py-2"
            style={{ borderRadius: '0px' }}
            aria-label="Abrir Carrito de Compras"
          >
            <i className="bi bi-bag"></i>
            <span className="d-none d-sm-inline" style={{ fontSize: '0.75rem' }}>Bolsa</span>
            {cartCount > 0 && (
              <span className="badge bg-gold text-white rounded-pill px-2 py-1" style={{ fontSize: '0.7rem' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
