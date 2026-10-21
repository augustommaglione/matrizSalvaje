import { GEMA_STONES, BRAND_INFO } from '../data/initialData';

export default function Philosophy() {
  /*const pillars = [
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
    } ]*/


  const ordering = [
    {
      icon: 'bi-whatsapp',
      title: 'Encargos por WhatsApp',
      desc: 'Todos los pedidos se coordinan por WhatsApp. Armá tu selección en el catálogo y escribinos para confirmar disponibilidad, pago y entrega.'
    },
    {
      icon: 'bi-truck',
      title: 'Envíos en Córdoba Capital',
      desc: 'Por el momento entregamos únicamente dentro de Córdoba capital. El costo y la franja horaria se acuerdan por WhatsApp. No realizamos retiro en persona.'
    },
    {
      icon: 'bi-gem',
      title: 'Gemas a tu medida',
      desc: 'En las Gemas Difusor podés combinar el tipo de piedra que prefieras con cualquiera de las fragancias del catálogo.'
    },
    {
      icon: 'bi-hourglass-split',
      title: 'Encargos a pedido',
      desc: 'Las fragancias marcadas como “Con encargo” se pueden pedir igual. Su elaboración comienza al confirmar el pedido y el plazo se coordina por WhatsApp.'
    }
  ];

  const waUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
    '¡Hola Matiz Silvestre! Quisiera coordinar un encargo.'
  )}`;

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
        {/* Quote banner */}
        <div className="mt-5 p-4 bg-gold-soft border border-gold text-center">
          <p className="font-serif fs-4 fst-italic text-dark mb-1">
            "El perfume del hogar es el suspiro silencioso con el que damos la bienvenida."
          </p>
          <small className="tracking-wide text-gold-dark fw-bold">
            MATIZ SILVESTRE
          </small>
        </div>

        {/*<div className="row g-4">
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
        </div>*/}

        {/* Cómo encargar / información útil */}
        <div className="mt-5 pt-5 border-top border-gold">
          <div className="text-center max-w-700 mx-auto mb-4">
            <span className="badge-outline-gold mb-2 d-inline-block">
              Antes de Encargar
            </span>
            <h3 className="display-6 font-serif text-dark mb-2">
              Cómo Llega tu Aroma
            </h3>
            <p className="text-muted small mb-0">
              Todo lo que necesitás saber sobre encargos, envíos y combinaciones.
            </p>
          </div>

          <div className="row g-4">
            {ordering.map((item, idx) => (
              <div key={item.title} className="col-12 col-md-6">
                <div className="p-4 h-100 bg-white border border-gold d-flex gap-3 transition-all hover-shadow">
                  <div
                    className="flex-shrink-0 d-flex align-items-center justify-content-center bg-gold-soft border border-gold"
                    style={{ width: '46px', height: '46px', borderRadius: '50%' }}
                  >
                    <span className="font-serif fw-bold text-gold-dark">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-serif text-dark mb-1 d-flex align-items-center gap-2">
                      <i className={`bi ${item.icon} text-gold`}></i>
                      {item.title}
                    </h5>
                    <p className="text-muted small mb-0">{item.desc}</p>

                    {/* Stone list only for the Gema card */}
                    {item.title === 'Gemas a tu medida' && (
                      <div className="mt-3 pt-2 border-top border-gold">
                        <small className="tracking-wide text-gold-dark fw-bold d-block mb-2" style={{ fontSize: '0.62rem' }}>
                          Piedras disponibles
                        </small>
                        {GEMA_STONES.length > 0 ? (
                          <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                            {GEMA_STONES.map((stone) => (
                              <li key={stone.name} className="d-flex gap-2">
                                <i className="bi bi-gem text-gold mt-1" style={{ fontSize: '0.7rem' }}></i>
                                <span className="small" style={{ fontSize: '0.75rem', lineHeight: '1.45' }}>
                                  <strong className="text-dark">{stone.name}:</strong>{' '}
                                  <span className="text-muted">{stone.description}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <small className="text-gold-dark fst-italic">
                            Consultá las piedras disponibles por WhatsApp.
                          </small>
                        )}
                      </div>
                    )}

                    {/* Direct WhatsApp link on the first card */}
                    {idx === 0 && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-gold btn-sm mt-3 py-1 px-3"
                      >
                        <i className="bi bi-whatsapp me-1"></i> Coordinar por WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        

      </div>
    </section>
  );
}
