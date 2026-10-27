export const trackAddToCart = (product) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', {
      currency: 'ARS',
      value: product.precio || product.price || 0,
      items: [
        {
          item_id: String(product.id),
          item_name: product.nombre || product.name,
          price: product.precio || product.price || 0,
          quantity: 1,
        },
      ],
    });
  }
};