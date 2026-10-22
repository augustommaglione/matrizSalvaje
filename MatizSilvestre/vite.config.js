import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// In production the site is served from the GitHub Pages project path:
// https://<user>.github.io/matrizSalvaje/
// In development it stays at the root for convenience.
export default defineConfig({
  base: '/matrizSalvaje/',
  plugins: [react()],
})
