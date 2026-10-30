import { useState, useEffect } from 'react';
import { GEMA_STONES } from '../data/initialData';

function ProductImageCarousel({ images, defaultImage, alt, interval = 3000 }) {
  const imageList = Array.isArray(images) && images.length > 0 ? images : [defaultImage];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, interval);

    return () => clearInterval(timer);
  }, [imageList.length, interval, currentIndex]);

  if (imageList.length <= 1) {
    return (
      <img
        src={imageList[0]}
        alt={alt}
        loading="lazy"
      />
    );
  }

  return (
    <div className="position-relative w-100 h-100">
      {imageList.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`${alt} - ${idx + 1}`}
          loading={idx === 0 ? 'eager' : 'lazy'}
          className={`product-carousel-item ${idx === currentIndex ? 'active' : ''}`}
        />
      ))}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1"
        style={{ zIndex: 3 }}
      >
        {imageList.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Ir a la imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Catalog({ products, onAddToCart }) {
  // Store selected fragrance, stone and quantity per product ID
  const [selections, setSelections] = useState(() => {
    const initial = {};
    products.forEach((prod) => {
      initial[prod.id] = {
        fragranceId: prod.fragrances[0]?.id || '',
        stoneName: prod.hasStoneSelection ? GEMA_STONES[0]?.name || '' : '',
        colorName: prod.hasColorSelection ? prod.colorOptions?.[0] || '' : '',
        quantity: 1
      };
    });
    return initial;
  });

  const [toastMessage, setToastMessage] = useState(null);

  const handleFragranceChange = (productId, fragranceId) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        fragranceId
      }
    }));
  };

  const handleStoneChange = (productId, stoneName) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        stoneName
      }
    }));
  };

  const handleColorChange = (productId, colorName) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        colorName
      }
    }));
  };

  const handleQuantityChange = (productId, delta) => {
    setSelections((prev) => {
      const currentQty = prev[productId]?.quantity || 1;
      const newQty = Math.max(1, currentQty + delta);
      return {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: newQty
        }
      };
    });
  };

  const handleAdd = (product) => {
    const currentSel = selections[product.id] || {
      fragranceId: product.fragrances[0]?.id,
      stoneName: product.hasStoneSelection ? GEMA_STONES[0]?.name || '' : '',
      colorName: product.hasColorSelection ? product.colorOptions?.[0] || '' : '',
      quantity: 1
    };

    const selectedFragrance = product.fragrances.find(
      (f) => f.id === currentSel.fragranceId
    ) || product.fragrances[0];

    const selectedStone = product.hasStoneSelection
      ? currentSel.stoneName || GEMA_STONES[0]?.name || ''
      : '';

    const selectedColor = product.hasColorSelection
      ? currentSel.colorName || product.colorOptions?.[0] || ''
      : '';

    onAddToCart({
      productId: product.id,
      productName: product.name,
      stone: selectedStone,
      color: selectedColor,
      volume: product.volume,
      price: product.price,
      discountPercent: Number(product.discountPercent) || 0,
      wholesalePrice: product.wholesalePrice,
      wholesaleMinQty: product.wholesaleMinQty,
      image: product.image,
      fragrance: selectedFragrance,
      quantity: currentSel.quantity || 1
    });

    let displayName = product.name;
    if (selectedColor) displayName += ` (${selectedColor})`;
    if (selectedStone) displayName += ` ${selectedStone}`;
    setToastMessage(`Añadiste "${displayName} (${selectedFragrance.name})" a tu bolsa.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency: 'ARS',
        value: (Number(product.price) || 0) * (currentSel.quantity || 1),
        items: [
          {
            item_id: String(product.id),
            item_name: product.name,
            item_variant: [selectedFragrance?.name, selectedStone, selectedColor].filter(Boolean).join(' - '),
            price: product.price,
            quantity: currentSel.quantity || 1
          }
        ]
      });
    }
  };

  // Helper format currency
  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="catalogo" className="py-5 bg-canvas position-relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg border border-gold bg-white p-3 d-flex align-items-center gap-3"
          style={{ zIndex: 1060, maxWidth: '90%' }}
        >
          <i aria-hidden="true" className="bi bi-bag-check-fill text-gold fs-4"></i>
          <div>
            <strong className="d-block small text-dark">¡Producto Agregado!</strong>
            <span className="small text-muted">{toastMessage}</span>
          </div>
          <button 
            type="button" 
            className="btn-close ms-auto small" 
            onClick={() => setToastMessage(null)}
          ></button>
        </div>
      )}

      <div className="container py-4">
        
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
          <div>
            <span className="badge-outline-gold mb-2 d-inline-block">
              Creaciones Artesanales
            </span>
            <h2 className="display-6 font-serif text-dark mb-1">
              Catálogo de Fragancias & Difusores
            </h2>
            <div className="gold-divider-start"></div>
            <p className="text-muted small mb-0">
              Explora nuestros tres formatos y selecciona la fragancia que resuena con tu espacio.
            </p>
          </div>
        </div>

        {/* 3 Main Products Grid */}
        <div className="row g-4 justify-content-center">
          {products.map((product) => {
            const productSelection = selections[product.id] || {
              fragranceId: product.fragrances[0]?.id || '',
              quantity: 1
            };

            const selectedFragrance = product.fragrances.find(
              (f) => f.id === productSelection.fragranceId
            ) || product.fragrances[0];

            const selectedStoneName = productSelection.stoneName || GEMA_STONES[0]?.name || '';
            const selectedStone = product.hasStoneSelection
              ? GEMA_STONES.find((s) => s.name === selectedStoneName) || GEMA_STONES[0]
              : null;

            const selectedColorName = productSelection.colorName || product.colorOptions?.[0] || '';

            const discountPercent = Number(product.discountPercent) || 0;
            const hasDiscount = discountPercent > 0;
            const finalPrice = hasDiscount
              ? Math.round(product.price * (1 - discountPercent / 100))
              : product.price;

            return (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <div className="lux-card h-100 d-flex flex-column">
                  
                  {/* Image container with offer badge and volume indicator */}
                  <div className="product-img-wrapper">
                    <ProductImageCarousel
                      images={product.images}
                      defaultImage={product.image}
                      alt={product.imageAlt || product.name}
                      interval={3000}
                    />
                    {hasDiscount && (
                      <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 4 }}>
                        <span className="badge-offer">{discountPercent}% OFF</span>
                      </div>
                    )}
                    <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 4 }}>
                      <span className="badge bg-dark text-white rounded-0 px-2 py-1 small">
                        {product.volume}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    
                    <div className="d-flex justify-content-between align-items-baseline mb-1">
                      <small className="text-muted text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>
                        {product.category}
                      </small>
                      <div className="text-end">
                        {hasDiscount && (
                          <small
                            className="text-muted text-decoration-line-through d-block"
                            style={{ fontSize: '0.78rem', lineHeight: '1.2' }}
                          >
                            {formatPrice(product.price)}
                          </small>
                        )}
                        <h4 className="font-serif text-gold-dark mb-0 fw-bold">
                          {formatPrice(finalPrice)}
                        </h4>
                      </div>
                    </div>

                    <h3 className="font-serif fs-4 text-dark mb-1">
                      {product.name}
                    </h3>

                    {product.tagline && (
                      <p className="fst-italic text-gold-dark small mb-2">
                        {product.tagline}
                      </p>
                    )}

                    <p className="text-muted small mb-2" style={{ minHeight: '44px' }}>
                      {product.description}
                    </p>

                    {product.wholesalePrice && product.wholesaleMinQty && (
                      <div
                        className="d-flex align-items-center gap-2 text-muted mb-3"
                        style={{ fontSize: '0.72rem', letterSpacing: '0.01em' }}
                      >
                        <i aria-hidden="true" className="bi bi-tags text-gold-dark"></i>
                        <span>
                          Precio mayorista desde {product.wholesaleMinQty} u. del mismo producto:{' '}
                          <strong className="text-gold-dark fw-semibold">
                            {formatPrice(product.wholesalePrice)} c/u
                          </strong>
                        </span>
                      </div>
                    )}

                    <hr className="my-2 border-gold" />

                    {/* Fragrance Selector */}
                    <div className="my-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label small fw-bold mb-0 text-dark">
                          Fragancia disponible:
                        </label>
                        <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                          {product.fragrances.length} variantes
                        </small>
                      </div>

                      <select
                        className="form-select lux-input mb-3"
                        value={selectedFragrance ? selectedFragrance.id : ''}
                        onChange={(e) => handleFragranceChange(product.id, e.target.value)}
                      >
                        {product.fragrances.map((frag) => (
                          <option key={frag.id} value={frag.id}>
                            {frag.name} {frag.family ? `(${frag.family})` : ''}
                            {frag.stock === false ? ' — con encargo' : ''}
                          </option>
                        ))}
                      </select>

                      {/* Olfactory Notes Box for the selected fragrance */}
                      {selectedFragrance && (
                        <div className="p-3 bg-gold-soft border border-gold mb-3" style={{ borderRadius: '1px' }}>
                          <div className="d-flex justify-content-between align-items-center gap-2 mb-1">
                            <div className="d-flex align-items-center gap-1">
                              <i aria-hidden="true" className="bi bi-droplet-fill text-gold small"></i>
                              <span className="small fw-bold text-dark">
                                Familia: {selectedFragrance.family || 'Aromática'}
                              </span>
                            </div>
                            {selectedFragrance.stock === false ? (
                              <span className="stock-tag stock-tag-out">
                                <i aria-hidden="true" className="bi bi-clock-history"></i> Con encargo
                              </span>
                            ) : (
                              <span className="stock-tag stock-tag-in">
                                <i aria-hidden="true" className="bi bi-check2"></i> Disponible
                              </span>
                            )}
                          </div>
                          <p className="small text-muted mb-0 fst-italic" style={{ fontSize: '0.78rem' }}>
                            "{selectedFragrance.notes || 'Notas sutiles y envolventes.'}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Color Selector (Home Spray only) */}
                    {product.hasColorSelection && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label small fw-bold mb-0 text-dark">
                            Color del gatillo:
                          </label>
                          <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                            {product.colorOptions?.length || 0} opciones
                          </small>
                        </div>

                        <select
                          className="form-select lux-input"
                          value={selectedColorName}
                          onChange={(e) => handleColorChange(product.id, e.target.value)}
                        >
                          {(product.colorOptions || []).map((color) => (
                            <option key={color} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Stone Selector (Gema Difusor only) */}
                    {product.hasStoneSelection && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label small fw-bold mb-0 text-dark">
                            Piedra de la gema:
                          </label>
                          <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                            1 a elección
                          </small>
                        </div>

                        <select
                          className="form-select lux-input"
                          value={selectedStoneName}
                          onChange={(e) => handleStoneChange(product.id, e.target.value)}
                        >
                          {GEMA_STONES.map((stone) => (
                            <option key={stone.name} value={stone.name}>
                              {stone.name}
                            </option>
                          ))}
                        </select>

                        {selectedStone && (
                          <p
                            className="text-muted fst-italic mt-2 mb-0"
                            style={{ fontSize: '0.75rem', lineHeight: '1.4' }}
                          >
                            <i aria-hidden="true" className="bi bi-gem text-gold me-1"></i>
                            {selectedStone.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Quantity & Add to Cart button */}
                    <div className="mt-auto pt-2">
                      <div className="row g-2 align-items-center">
                        <div className="col-4">
                          <div className="input-group border border-gold">
                            <button
                              className="btn btn-sm btn-outline-secondary border-0 px-2"
                              type="button"
                              onClick={() => handleQuantityChange(product.id, -1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center border-0 bg-transparent fw-bold p-0"
                              value={productSelection.quantity}
                              readOnly
                            />
                            <button
                              className="btn btn-sm btn-outline-secondary border-0 px-2"
                              type="button"
                              onClick={() => handleQuantityChange(product.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-8">
                          <button
                            type="button"
                            onClick={() => handleAdd(product)}
                            className="btn btn-gold w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                          >
                            <i aria-hidden="true" className="bi bi-bag-plus"></i>
                            <span>Agregar</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
