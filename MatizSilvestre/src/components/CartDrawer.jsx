import { BRAND_INFO, INITIAL_PRODUCTS } from '../data/initialData';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  if (!isOpen) return null;

  // Total units per product, regardless of the chosen fragrance
  const productTotals = items.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    return acc;
  }, {});

  const getMeta = (item) =>
    INITIAL_PRODUCTS.find((p) => p.id === item.productId);

  const getDiscountPercent = (item) => {
    const meta = getMeta(item);
    return Number(item.discountPercent ?? meta?.discountPercent) || 0;
  };

  const getRegularPrice = (item) => {
    const meta = getMeta(item);
    return Number(item.price ?? meta?.price) || 0;
  };

  const getOfferPrice = (item) => {
    const discount = getDiscountPercent(item);
    return discount > 0
      ? Math.round(getRegularPrice(item) * (1 - discount / 100))
      : getRegularPrice(item);
  };

  // The wholesale rule always uses the product's base price/threshold and
  // wholesale price, never the promotional price.
  const isWholesaleApplied = (item) => {
    const meta = getMeta(item);
    const wholesalePrice = item.wholesalePrice ?? meta?.wholesalePrice;
    const wholesaleMinQty = item.wholesaleMinQty ?? meta?.wholesaleMinQty;
    const productQty = productTotals[item.productId] || item.quantity;
    return Boolean(wholesalePrice && wholesaleMinQty && productQty >= wholesaleMinQty);
  };

  const getUnitPrice = (item) => {
    if (isWholesaleApplied(item)) {
      const meta = getMeta(item);
      return Number(item.wholesalePrice ?? meta?.wholesalePrice) || 0;
    }
    return getOfferPrice(item);
  };

  const total = items.reduce(
    (acc, item) => acc + getUnitPrice(item) * item.quantity,
    0
  );

  const getDisplayName = (item) => {
    if (item.stone) return `${item.productName} ${item.stone}`;
    if (item.color) return `${item.productName} (${item.color})`;
    return item.productName;
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = `¡Hola *${BRAND_INFO.name}*! 🌿 Deseo realizar un pedido artesanal:\n\n`;

    items.forEach((item, index) => {
      const unitPrice = getUnitPrice(item);
      const itemSubtotal = formatPrice(unitPrice * item.quantity);
      const wholesaleApplied = isWholesaleApplied(item);
      const discountPercent = getDiscountPercent(item);
      const offerApplied = !wholesaleApplied && discountPercent > 0;

      message += `${index + 1}. *${item.quantity}x ${getDisplayName(item)}* (${item.volume})\n`;
      message += `   ↳ Fragancia: _${item.fragrance.name}_\n`;
      if (item.fragrance.stock === false) {
        message += `   ↳ ⚠ *Con encargo* (se prepara a pedido)\n`;
      }

      let priceLine = `   ↳ Precio unitario: ${formatPrice(unitPrice)}`;
      if (wholesaleApplied) {
        priceLine += ` (precio mayorista)`;
      } else if (offerApplied) {
        priceLine += ` (${discountPercent}% OFF, antes ${formatPrice(getRegularPrice(item))})`;
      }
      message += `${priceLine}\n`;
      message += `   ↳ Subtotal: ${itemSubtotal}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total Estimado: ${formatPrice(total)}*\n\n`;
    message += `¿Tienen disponibilidad y cómo coordinamos los detalles de pago y entrega? ¡Muchas gracias!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100" 
      style={{ backgroundColor: 'rgba(12, 12, 11, 0.65)', zIndex: 1050 }}
      onClick={onClose}
    >
      <div 
        className="position-absolute top-0 end-0 h-100 bg-white p-4 d-flex flex-column shadow-lg"
        style={{ width: '100%', maxWidth: '440px', borderLeft: '2px solid var(--color-gold)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-gold">
          <div className="d-flex align-items-center gap-2">
            <i aria-hidden="true" className="bi bi-bag text-gold fs-4"></i>
            <h5 className="font-serif mb-0 text-dark">Bolsa de Compras</h5>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Cerrar"
          ></button>
        </div>

        {/* Drawer Body */}
        <div className="flex-grow-1 overflow-auto my-3 pe-1">
          {items.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i aria-hidden="true" className="bi bi-bag-x text-gold display-4 d-block mb-3"></i>
              <p className="font-serif fs-5 mb-1 text-dark">Tu bolsa está vacía</p>
              <p className="small">Descubre nuestras fragancias exclusivas y añádelas aquí.</p>
              <button 
                type="button" 
                className="btn btn-outline-gold btn-sm mt-2"
                onClick={onClose}
              >
                Ir al Catálogo
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {items.map((item, idx) => (
                <div 
                  key={`${item.productId}-${item.stone || ''}-${item.color || ''}-${item.fragrance.id}-${idx}`}
                  className="p-3 bg-light border border-gold d-flex gap-3 position-relative"
                >
                  <img
                    src={item.image}
                    alt={`${getDisplayName(item)}, ${item.volume}, fragancia ${item.fragrance.name}`}
                    style={{ width: '65px', height: '65px', objectFit: 'cover' }}
                  />

                  <div className="flex-grow-1">
                    <h6 className="font-serif text-dark mb-0 fw-bold small">
                      {getDisplayName(item)}
                    </h6>
                    <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>
                      {item.volume} &bull; {item.fragrance.name}
                    </small>
                    {item.fragrance.stock === false && (
                      <span className="stock-tag stock-tag-out mt-1">
                        <i aria-hidden="true" className="bi bi-clock-history"></i> Con encargo
                      </span>
                    )}
                    <span className="fw-bold text-gold-dark small d-block mt-1">
                      {formatPrice(getUnitPrice(item))} c/u
                      {isWholesaleApplied(item) ? (
                        <span className="text-muted fw-normal ms-1" style={{ fontSize: '0.68rem' }}>
                          (precio mayorista)
                        </span>
                      ) : getDiscountPercent(item) > 0 ? (
                        <>
                          <span className="text-gold-dark fw-semibold ms-1" style={{ fontSize: '0.68rem' }}>
                            {getDiscountPercent(item)}% OFF
                          </span>
                          <span
                            className="text-muted text-decoration-line-through fw-normal ms-1"
                            style={{ fontSize: '0.68rem' }}
                          >
                            {formatPrice(getRegularPrice(item))}
                          </span>
                        </>
                      ) : null}
                    </span>

                    {/* Quantity controls */}
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div className="btn-group btn-group-sm border">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border-0 px-2"
                          onClick={() => onUpdateQuantity(idx, -1)}
                        >
                          -
                        </button>
                        <span className="btn btn-sm btn-light border-0 disabled px-2 fw-bold text-dark">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-light border-0 px-2"
                          onClick={() => onUpdateQuantity(idx, 1)}
                        >
                          +
                        </button>
                      </div>

                      <span className="small fw-bold text-dark">
                        {formatPrice(getUnitPrice(item) * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    className="btn btn-sm text-muted p-0 position-absolute top-0 end-0 m-2"
                    onClick={() => onRemoveItem(idx)}
                    title="Eliminar producto"
                  >
                    <i aria-hidden="true" className="bi bi-x fs-5"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="pt-3 border-top border-gold">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">Total estimado:</span>
              <h4 className="font-serif text-gold-dark mb-0 fw-bold">
                {formatPrice(total)}
              </h4>
            </div>

            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="btn btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-2"
            >
              <i aria-hidden="true" className="bi bi-whatsapp fs-5"></i>
              <span>Finalizar Pedido por WhatsApp</span>
            </button>

            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-link text-muted small p-0 text-decoration-none"
                onClick={onClearCart}
              >
                Vaciar bolsa
              </button>
              <span className="text-muted" style={{ fontSize: '0.68rem' }}>
                Respuesta directa de nuestro taller
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
