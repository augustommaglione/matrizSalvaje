# AGENTS.md

- **Project:** `matizsilvfront` — React 19 + Vite 8 SPA landing/catalog for the artisanal fragrance brand **Matiz Silvestre**.
- **Working directory:** all app code and npm scripts live in `MatizSilvestre/`. Run every command there.
- **No backend / no test suite.** Verification is `npm run lint && npm run build`.

## Commands (inside `MatizSilvestre/`)
- `npm install` — required before first `dev`/`build` (no root workspace, root `package-lock.json` is unrelated).
- `npm run dev` — Vite dev server.
- `npm run build` / `npm run preview`
- `npm run lint` — ESLint. The project uses the automatic JSX runtime: **do not add `import React from 'react'`** unless a hook is imported (`import { useState } from 'react'`); ESLint errors on unused `React`.

## Architecture
- `src/App.jsx` — single source of state: catalog (imported directly from `initialData.js`) and cart/drawer visibility. No router; navigation is anchor links (`#catalogo`, `#filosofia`, `#contacto`).
- `src/data/initialData.js` — single source of truth for the catalog (`INITIAL_PRODUCTS`), rocks (`GEMA_STONES`) and brand/contact info (`BRAND_INFO`). The three products are Home Spray 200ml, Difusor Colgante 8ml, Gema Difusor 10ml; each holds its own `fragrances[]`. Every fragrance has a `stock` boolean: `false` shows "Con encargo" (card, cart, WhatsApp) but still allows adding to the cart. Bulk pricing uses `wholesalePrice` + `wholesaleMinQty`, counted per product across fragrances. Products with `hasStoneSelection` (Gema Difusor) let the buyer pick one stone; the stone is part of the cart line key and is appended to the product name in the cart and WhatsApp message.
- `src/components/` — `Navbar`, `Hero`, `Catalog`, `Philosophy`, `Contact`, `Footer`, `CartDrawer` (checkout).
- There is **no admin panel**: all catalog edits are made directly in `src/data/initialData.js`. Only the cart persists, in `localStorage` under `matiz_cart_v1`.
- Checkout builds a WhatsApp `wa.me` message from the cart. Contact channels are WhatsApp only (no Instagram/email).
- `public/llms.txt` is a plain-text summary of the catalog for AI assistants; update it whenever prices, fragrances, stock semantics or contact details change in `initialData.js`.

## Deployment
- Published to GitHub Pages: `https://augustommaglione-sketch.github.io/matrizSalvaje/`.
- `.github/workflows/deploy.yml` builds `MatizSilvestre/` and deploys on every push to `main` (Pages source must be "GitHub Actions").
- `MatizSilvestre/vite.config.js` sets `base: '/matrizSalvaje/'` because it is a project page. If the repo is renamed, update `base` or assets break.
- Real product photos live in `MatizSilvestre/src/assets/images/` and are imported in `initialData.js` / `Hero.jsx`.

## Styling
- Bootstrap 5.3, Bootstrap Icons, and Google Fonts (Cormorant Garamond + Montserrat) are loaded via **CDN in `index.html`**, not imported in JS — don't import `bootstrap/dist/css` or you'll duplicate it.
- Design tokens and all custom classes live in `src/index.css` (`--color-gold`, `.btn-gold`, `.btn-outline-gold`, `.lux-card`, `.lux-input`, `.stock-tag`, `.hero-badge`, helpers like `.max-w-700`). Put new styles there; `src/App.css` is empty and unused.
- Palette: white/off-white `#fcfbf9`, neutral grays, near-black `#0c0c0b`, gold `#c5a059`. Aesthetic: minimalist, square corners, serif headings, wide letter-spacing.
