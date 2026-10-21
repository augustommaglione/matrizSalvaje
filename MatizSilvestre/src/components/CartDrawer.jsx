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

  // Bulk unit price applies to every line of the product once the product
  // total (all fragrances combined) exceeds the threshold.
  const getUnitPrice = (item) => {
    const meta = INITIAL_PRODUCTS.find((p) => p.id === item.productId);
    const wholesalePrice = item.wholesalePrice ?? meta?.wholesalePrice;
    const wholesaleMinQty = item.wholesaleMinQty ?? meta?.wholesaleMinQty;
    const productQty = productTotals[item.productId] || item.quantity;

    return wholesalePrice &&
      wholesaleMinQty &&
      productQty >= wholesaleMinQty
      ? wholesalePrice
      : item.price;
  };

  const total = items.reduce(
    (acc, item) => acc + getUnitPrice(item) * item.quantity,
    0
  );

  const getDisplayName = (item) =>
    item.stone ? `${item.productName} ${item.stone}` : item.productName;

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
      const bulkApplied = unitPrice !== item.price;
      message += `${index + 1}. *${item.quantity}x ${getDisplayName(item)}* (${item.volume})\n`;
      message += `   ↳ Fragancia: _${item.fragrance.name}_\n`;
      if (item.fragrance.stock === false) {
        message += `   ↳ ⚠ *Con encargo* (se prepara a pedido)\n`;
      }
      message += `   ↳ Precio unitario: ${formatPrice(unitPrice)}${bulkApplied ? ' (precio por cantidad)' : ''}\n`;
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
            <i className="bi bi-bag text-gold fs-4"></i>
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
              <i className="bi bi-bag-x text-gold display-4 d-block mb-3"></i>
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
                  key={`${item.productId}-${item.fragrance.id}-${idx}`}
                  className="p-3 bg-light border border-gold d-flex gap-3 position-relative"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
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
                        <i className="bi bi-clock-history"></i> Con encargo
                      </span>
                    )}
                    <span className="fw-bold text-gold-dark small d-block mt-1">
                      {formatPrice(getUnitPrice(item))} c/u
                      {getUnitPrice(item) !== item.price && (
                        <span className="text-muted fw-normal ms-1" style={{ fontSize: '0.68rem' }}>
                          (precio por cantidad)
                        </span>
                      )}
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
                    <i className="bi bi-x fs-5"></i>
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
              <i className="bi bi-whatsapp fs-5"></i>
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
