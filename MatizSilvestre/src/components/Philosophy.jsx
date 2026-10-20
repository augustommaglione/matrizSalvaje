import React from 'react';

export default function Philosophy() {
  const pillars = [
    {
      icon: 'bi-flower2',
      title: 'Esencias Botánicas',
      desc: 'Seleccionamos aceites aromáticos de alta pureza y flores silvestres para crear notas olfativas envolventes y duraderas.'
    },
    {
      icon: 'bi-hand-index-thumb',
      title: 'Maceración Lenta',
      desc: 'Cada lote reposa el tiempo exacto para que las notas de salida, corazón y fondo alcancen su máxima maduración y sutileza.'
    },
    {
      icon: 'bi-droplet',
      title: 'Cuidado Textil',
      desc: 'Nuestros Home Sprays contienen base alcohólica refinada de evaporación rápida que protege sábanas, sillones y cortinas sin manchar.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Sostenible & Artesanal',
      desc: 'Envases de vidrio reutilizables, tapas de maderas nobles y difusores facetados que honran el cuidado del entorno.'
    }
  ];

  return (
    <section id="filosofia" className="py-5 bg-white border-top border-bottom border-gold">
      <div className="container py-4">
        
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge-outline-gold mb-2 d-inline-block">
            El Alma de Nuestra Marca
          </span>
          <h2 className="display-6 font-serif text-dark mb-3">
            El Arte de Perfumar con Identidad
          </h2>
          <div className="gold-divider"></div>
          <p className="text-muted fs-6" style={{ maxWidth: '650px', margin: '0 auto' }}>
            En <strong>Matiz Silvestre</strong> concebimos cada aroma como una memoria olfativa. 
            No se trata de inundar un ambiente, sino de vestirlo con elegancia discreta.
          </p>
        </div>

        <div className="row g-4">
          {pillars.map((item, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3">
              <div className="p-4 h-100 bg-light border border-gold d-flex flex-column text-center transition-all hover-shadow">
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-white border border-gold"
                  style={{ width: '56px', height: '56px', borderRadius: '50%' }}
                >
                  <i className={`bi ${item.icon} text-gold fs-4`}></i>
                </div>
                <h5 className="font-serif text-dark mb-2">{item.title}</h5>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote banner */}
        <div className="mt-5 p-4 bg-gold-soft border border-gold text-center">
          <p className="font-serif fs-4 fst-italic text-dark mb-1">
            "El perfume del hogar es el suspiro silencioso con el que damos la bienvenida."
          </p>
          <small className="tracking-wide text-gold-dark fw-bold">
            — TALLER MATIZ SILVESTRE
          </small>
        </div>

      </div>
    </section>
  );
}
