import { useState } from 'react';

export default function AdminModal({
  isOpen,
  onClose,
  products,
  onAddFragrance,
  onDeleteFragrance,
  onResetDefaults
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Selected product to manage
  const [selectedProductId, setSelectedProductId] = useState(
    products[0]?.id || 'home-spray-200ml'
  );

  // Form states
  const [fragranceName, setFragranceName] = useState('');
  const [fragranceFamily, setFragranceFamily] = useState('');
  const [fragranceNotes, setFragranceNotes] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Default password for simplicity and ease of use
    if (passwordInput === 'matiz2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleCreateFragrance = (e) => {
    e.preventDefault();
    if (!fragranceName.trim()) return;

    const newFragrance = {
      id: `f-custom-${Date.now()}`,
      name: fragranceName.trim(),
      family: fragranceFamily.trim() || 'Aromática Silvestre',
      notes: fragranceNotes.trim() || 'Mezcla artesanal exclusiva con notas puras.'
    };

    onAddFragrance(selectedProductId, newFragrance);

    // Reset inputs
    setFragranceName('');
    setFragranceFamily('');
    setFragranceNotes('');
    setSuccessNotice(`¡Fragancia "${newFragrance.name}" incorporada con éxito!`);
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(12, 12, 11, 0.75)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content lux-card border border-gold rounded-0">
          
          {/* Header */}
          <div className="modal-header bg-dark text-white rounded-0 py-3 border-bottom border-gold">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-shield-lock text-gold fs-5"></i>
              <h5 className="modal-title font-serif tracking-wide mb-0 text-white">
                Panel de Administración &bull; Matiz Silvestre
              </h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4 bg-white">
            {!isAuthenticated ? (
              /* Authentication view */
              <div className="py-4 text-center max-w-400 mx-auto" style={{ maxWidth: '420px' }}>
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-gold-soft border border-gold"
                  style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                >
                  <i className="bi bi-key-fill text-gold fs-3"></i>
                </div>
                <h4 className="font-serif text-dark mb-2">Acceso Administrativo</h4>
                <p className="text-muted small mb-4">
                  Ingresa la contraseña para gestionar el catálogo y agregar nuevas fragancias a la colección.
                </p>

                <form onSubmit={handleLogin}>
                  <div className="mb-3 text-start">
                    <label className="form-label small fw-bold text-dark">Contraseña</label>
                    <input
                      type="password"
                      className="form-control lux-input"
                      placeholder="Escribe: matiz2026"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError(false);
                      }}
                      autoFocus
                    />
                    <small className="text-muted d-block mt-1" style={{ fontSize: '0.72rem' }}>
                      Clave predeterminada de prueba: <strong>matiz2026</strong> (o <strong>admin</strong>)
                    </small>
                  </div>

                  {authError && (
                    <div className="alert alert-danger py-2 small mb-3">
                      Contraseña incorrecta. Intenta nuevamente con <strong>matiz2026</strong>.
                    </div>
                  )}

                  <button type="submit" className="btn btn-gold w-100 py-2">
                    Ingresar al Panel
                  </button>
                </form>
              </div>
            ) : (
              /* Logged In Admin View */
              <div>
                {successNotice && (
                  <div className="alert alert-success py-2 small d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{successNotice}</span>
                  </div>
                )}

                {/* Step 1: Select which product to manage */}
                <div className="mb-4 p-3 bg-light border border-gold">
                  <label className="form-label small fw-bold text-dark text-uppercase tracking-wide mb-2">
                    1. Selecciona el Producto a Modificar:
                  </label>
                  <div className="row g-2">
                    {products.map((p) => (
                      <div key={p.id} className="col-12 col-md-4">
                        <button
                          type="button"
                          className={`btn w-100 text-start p-2 border ${
                            selectedProductId === p.id
                              ? 'btn-dark border-gold text-white'
                              : 'btn-outline-secondary bg-white text-dark'
                          }`}
                          onClick={() => setSelectedProductId(p.id)}
                        >
                          <span className="d-block fw-bold small">{p.name}</span>
                          <span className="small text-muted" style={{ fontSize: '0.7rem' }}>
                            {p.volume} &bull; {p.fragrances.length} fragancias
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Add new fragrance form */}
                <div className="row g-4">
                  <div className="col-12 col-lg-6">
                    <div className="p-3 border border-secondary border-opacity-25 h-100">
                      <h6 className="font-serif text-dark fw-bold mb-3 d-flex align-items-center gap-2">
                        <i className="bi bi-plus-square text-gold"></i>
                        <span>Agregar Nueva Fragancia a "{currentProduct?.name}"</span>
                      </h6>

                      <form onSubmit={handleCreateFragrance}>
                        <div className="mb-2">
                          <label className="form-label small fw-bold text-dark">
                            Nombre de la Fragancia *
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control form-control-sm lux-input"
                            placeholder="Ej. Peonías Silvestres & Vainilla"
                            value={fragranceName}
                            onChange={(e) => setFragranceName(e.target.value)}
                          />
                        </div>

                        <div className="mb-2">
                          <label className="form-label small fw-bold text-dark">
                            Familia Olfativa
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm lux-input"
                            placeholder="Ej. Floral Dulce / Amaderado Especiado"
                            value={fragranceFamily}
                            onChange={(e) => setFragranceFamily(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-bold text-dark">
                            Notas & Descripción Olfativa
                          </label>
                          <textarea
                            rows="2"
                            className="form-control form-control-sm lux-input"
                            placeholder="Ej. Salida de flores frescas, corazón de pimienta rosa y fondo de pachulí."
                            value={fragranceNotes}
                            onChange={(e) => setFragranceNotes(e.target.value)}
                          ></textarea>
                        </div>

                        <button type="submit" className="btn btn-gold btn-sm w-100">
                          <i className="bi bi-check2"></i> Publicar Fragancia en el Catálogo
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Step 3: Current fragrances list */}
                  <div className="col-12 col-lg-6">
                    <div className="p-3 border border-secondary border-opacity-25 h-100">
                      <h6 className="font-serif text-dark fw-bold mb-3 d-flex align-items-center justify-content-between">
                        <span>Fragancias Activas ({currentProduct?.fragrances.length})</span>
                        <span className="badge bg-gold-soft text-gold-dark small">
                          {currentProduct?.volume}
                        </span>
                      </h6>

                      <div style={{ maxHeight: '240px', overflowY: 'auto' }} className="pe-1">
                        {currentProduct?.fragrances.map((frag) => (
                          <div
                            key={frag.id}
                            className="p-2 mb-2 bg-light border d-flex justify-content-between align-items-center"
                          >
                            <div className="pe-2">
                              <span className="fw-bold small d-block text-dark">
                                {frag.name}
                              </span>
                              <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                                {frag.family}
                              </span>
                            </div>

                            {currentProduct.fragrances.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger py-0 px-2"
                                title="Eliminar fragancia"
                                onClick={() => onDeleteFragrance(currentProduct.id, frag.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-top border-gold d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      if (window.confirm('¿Restablecer el catálogo con las fragancias originales de fábrica?')) {
                        onResetDefaults();
                        setSuccessNotice('Catálogo restablecido correctamente.');
                        setTimeout(() => setSuccessNotice(''), 3000);
                      }
                    }}
                  >
                    <i className="bi bi-arrow-counterclockwise"></i> Restablecer de Fábrica
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setIsAuthenticated(false)}
                    >
                      Cerrar Sesión Admin
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-dark"
                      onClick={onClose}
                    >
                      Listo
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
