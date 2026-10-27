import { useEffect, useRef } from 'react';
import { BRAND_INFO } from '../data/initialData';

export default function PolicyModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    const container = modalRef.current;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const focusable = getFocusable();
    focusable[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.focus) previouslyFocused.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const waUrl = `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encodeURIComponent(
    '¡Hola Matiz Silvestre! Quisiera consultar por cambios o devoluciones.'
  )}`;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(11, 11, 10, 0.7)', zIndex: 1060 }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
        className="bg-white border border-gold shadow-lg w-100 d-flex flex-column"
        style={{ maxWidth: '720px', maxHeight: '90vh' }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start gap-3 p-4 border-bottom border-gold">
          <div>
            <span className="badge-outline-gold d-inline-block mb-2">
              Información legal
            </span>
            <h2 id="policy-modal-title" className="font-serif fs-3 text-dark mb-0">
              Condiciones de Compra y Envíos
            </h2>
          </div>
          <button
            type="button"
            className="btn-close flex-shrink-0"
            onClick={onClose}
            aria-label="Cerrar condiciones de compra y envíos"
          ></button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto">
          <p className="text-muted small mb-4">
            Matiz Silvestre es un microemprendimiento de perfumería artesanal. Estas
            condiciones aplican a las compras realizadas a través de nuestro catálogo
            y coordinadas por WhatsApp.
          </p>

          <section className="mb-4">
            <h3 className="font-serif fs-5 text-dark mb-2 d-flex align-items-center gap-2">
              <i aria-hidden="true" className="bi bi-truck text-gold"></i>
              1. Envíos
            </h3>
            <p className="text-muted small mb-0">
              Realizamos envíos con <strong>cadete propio únicamente dentro de la
              Ciudad de Córdoba</strong>. Los días y horarios de entrega se coordinan
              por WhatsApp al confirmar el pedido. No contamos con retiro en persona.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="font-serif fs-5 text-dark mb-2 d-flex align-items-center gap-2">
              <i aria-hidden="true" className="bi bi-box-seam text-gold"></i>
              2. Stock y encargos
            </h3>
            <p className="text-muted small mb-0">
              Las fragancias indicadas como <strong>“Con encargo”</strong> no están en
              stock inmediato: se elaboran artesanalmente a pedido. Se pueden solicitar
              igual; la producción comienza al confirmar el pedido y el plazo estimado se
              informa por WhatsApp. Las fragancias disponibles se entregan según la
              coordinación de envío acordada.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="font-serif fs-5 text-dark mb-2 d-flex align-items-center gap-2">
              <i aria-hidden="true" className="bi bi-arrow-repeat text-gold"></i>
              3. Cambios y devoluciones
            </h3>
            <p className="text-muted small mb-2">
              De acuerdo con el derecho de arrepentimiento previsto para compras por
              canales electrónicos, podés solicitar el cambio o la devolución dentro de
              los <strong>10 días corridos</strong> desde la recepción del producto.
            </p>
            <p className="text-muted small mb-2">
              El producto debe encontrarse <strong>sin uso</strong>, en perfecto estado y
              en su <strong>empaque original</strong>. Los productos elaborados a pedido
              (“Con encargo”) también pueden devolverse dentro de ese plazo, siempre que
              no hayan sido utilizados.
            </p>
            <p className="text-muted small mb-0">
              Para iniciar un cambio o devolución, escribinos por WhatsApp y coordinamos
              el retiro o la entrega dentro de la Ciudad de Córdoba. El reintegro se
              realiza por el mismo medio de pago acordado.
            </p>
          </section>

          <section>
            <h3 className="font-serif fs-5 text-dark mb-2 d-flex align-items-center gap-2">
              <i aria-hidden="true" className="bi bi-geo-alt text-gold"></i>
              4. Identificación
            </h3>
            <p className="text-muted small mb-0">
              Matiz Silvestre opera desde <strong>Córdoba Capital, Argentina</strong>.
              Canal de atención: WhatsApp {BRAND_INFO.whatsappDisplay}, de lunes a
              sábado de 9:00 a 19:00 hs.
            </p>
          </section>

          <div className="mt-4 pt-3 border-top border-gold d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
            <small className="text-muted">
              Al coordinar una compra aceptás estas condiciones.
            </small>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold btn-sm py-2 px-3"
            >
              <i aria-hidden="true" className="bi bi-whatsapp me-1"></i>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
