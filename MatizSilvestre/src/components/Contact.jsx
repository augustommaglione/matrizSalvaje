import React from 'react';
import { BRAND_INFO } from '../data/initialData';

export default function Contact() {
  const directWaUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
    '¡Hola Matiz Silvestre! Quisiera realizar una consulta sobre sus perfumes y difusores artesanales.'
  )}`;

  return (
    <section id="contacto" className="py-5 bg-white border-top border-gold">
      <div className="container py-4">
        
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge-outline-gold mb-2 d-inline-block">
            Atención Personalizada
          </span>
          <h2 className="display-6 font-serif text-dark mb-2">
            Hablemos de Aromas
          </h2>
          <div className="gold-divider"></div>
          <p className="text-muted small" style={{ maxWidth: '600px', margin: '0 auto' }}>
            ¿Tienes dudas sobre una fragancia, deseas asesoramiento para tus ambientes o buscas pedidos personalizados? Estamos a un mensaje de distancia.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          
          {/* WhatsApp Card */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="lux-card p-4 h-100 text-center d-flex flex-column align-items-center">
              <div 
                className="d-flex align-items-center justify-content-center mb-3 bg-light border border-gold"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
              >
                <i className="bi bi-whatsapp text-success fs-3"></i>
              </div>
              <h5 className="font-serif text-dark mb-1">WhatsApp Directo</h5>
              <p className="text-muted small mb-3">
                Atención rápida para consultas, presupuestos y coordinación de envíos.
              </p>
              <span className="fw-bold small text-dark mb-4">
                {BRAND_INFO.whatsappDisplay}
              </span>
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold w-100 mt-auto py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-whatsapp"></i>
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="lux-card p-4 h-100 text-center d-flex flex-column align-items-center">
              <div 
                className="d-flex align-items-center justify-content-center mb-3 bg-light border border-gold"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
              >
                <i className="bi bi-instagram text-danger fs-3"></i>
              </div>
              <h5 className="font-serif text-dark mb-1">Instagram Oficial</h5>
              <p className="text-muted small mb-3">
                Conoce el proceso artesanal, lanzamientos y consejos para aromatizar tu hogar.
              </p>
              <span className="fw-bold small text-dark mb-4">
                @{BRAND_INFO.instagram}
              </span>
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark-lux w-100 mt-auto py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-instagram"></i>
                <span>Seguir en Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Informative strip */}
        <div className="mt-5 p-4 bg-light border border-gold d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-geo-alt text-gold fs-3"></i>
            <div>
              <h6 className="mb-0 text-dark fw-bold">Taller Artesanal &bull; {BRAND_INFO.location}</h6>
              <small className="text-muted">Envíos a todo el país y entregas coordinadas</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <span className="badge bg-white text-dark border border-secondary border-opacity-25 py-2 px-3">
              Lunes a Sábado: 9:00 - 19:00 hs
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
