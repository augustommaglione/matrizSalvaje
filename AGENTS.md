# AGENTS.md

- **Project Type:** React frontend application (`matizsilvfront`) built with Vite, Bootstrap, and React 19.
- **Working Directory:** All app source code and scripts reside in the `MatizSilvestre/` subdirectory.

## Development Commands
Run all commands inside the `MatizSilvestre/` folder (or via npm workspaces / direct path):
- **Install dependencies:** `npm install` (inside `MatizSilvestre`)
- **Start dev server:** `npm run dev` (runs Vite dev server)
- **Build for production:** `npm run build`
- **Lint code:** `npm run lint`

## Architecture & Conventions
- Entry point: `MatizSilvestre/src/main.jsx`
- Main component: `MatizSilvestre/src/App.jsx`
- Styling: Bootstrap (`bootstrap`) and custom CSS (`src/index.css`, `src/App.css`).
- Linter: ESLint configured with React hooks and refresh plugins.
