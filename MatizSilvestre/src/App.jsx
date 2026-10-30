import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Catalog from './components/Catalog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PolicyModal from './components/PolicyModal';
import { INITIAL_PRODUCTS, BRAND_INFO } from './data/initialData';

function App() {
  // The catalog is edited directly in src/data/initialData.js
  const products = INITIAL_PRODUCTS;

  // Load cart from localStorage or fallback with schema validation
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('matiz_cart_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item) =>
              item &&
              typeof item.productId === 'string' &&
              item.fragrance &&
              typeof item.fragrance.id === 'string' &&
              typeof item.quantity === 'number' &&
              Number.isFinite(item.quantity) &&
              item.quantity > 0
          );
        }
      }
    } catch (e) {
      console.error('Error loading cart from storage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('matiz_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (newItem) => {
    setCart((prev) => {
      // Same product + stone + fragrance is merged into a single line
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.stone === newItem.stone &&
          i.color === newItem.color &&
          i.fragrance.id === newItem.fragrance.id
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + newItem.quantity
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-canvas">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow-1">
        <Hero />
        <Catalog
          products={products}
          onAddToCart={handleAddToCart}
        />
        <Philosophy />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenPolicy={() => setIsPolicyOpen(true)} />

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        {/* Floating Cart Button */}
        <button
          type="button"
          className="floating-btn btn-floating-cart"
          onClick={() => setIsCartOpen(true)}
          title="Ver bolsa de compras"
          aria-label="Ver bolsa de compras"
        >
          <i className="bi bi-bag"></i>
          {cartItemCount > 0 && (
            <span className="cart-counter">{cartItemCount}</span>
          )}
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
            '¡Hola Matiz Silvestre! Quisiera hacer una consulta.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn btn-floating-wa"
          title="Consultar por WhatsApp"
          aria-label="Consultar por WhatsApp"
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Purchase conditions modal */}
      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

    </div>
  );
}

export default App;
