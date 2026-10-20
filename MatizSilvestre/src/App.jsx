import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Catalog from './components/Catalog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import CartDrawer from './components/CartDrawer';
import { INITIAL_PRODUCTS, BRAND_INFO } from './data/initialData';

function App() {
  // Load products from localStorage or fallback
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('matiz_products_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading products from storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load cart from localStorage or fallback
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('matiz_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from storage:', e);
    }
    return [];
  });

  // Modal and Drawer UI states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('matiz_products_v1', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }, [products]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('matiz_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  // Cart total items count
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Admin handlers
  const handleAddFragrance = (productId, newFragrance) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod,
            fragrances: [...prod.fragrances, newFragrance]
          };
        }
        return prod;
      })
    );
  };

  const handleDeleteFragrance = (productId, fragranceId) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod,
            fragrances: prod.fragrances.filter((f) => f.id !== fragranceId)
          };
        }
        return prod;
      })
    );
  };

  const handleResetDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  // Cart Handlers
  const handleAddToCart = (newItem) => {
    setCart((prev) => {
      // Check if product + fragrance already exists
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
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
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow-1">
        <Hero />
        <Catalog
          products={products}
          onAddToCart={handleAddToCart}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
        <Philosophy />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        {/* Floating Cart Button */}
        <button
          type="button"
          className="floating-btn btn-floating-cart"
          onClick={() => setIsCartOpen(true)}
          title="Ver bolsa de compras"
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
        >
          <i className="bi bi-whatsapp"></i>
        </a>
      </div>

      {/* Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddFragrance={handleAddFragrance}
        onDeleteFragrance={handleDeleteFragrance}
        onResetDefaults={handleResetDefaults}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

export default App;
