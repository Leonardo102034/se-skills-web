// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Configuración específica para GitHub Pages
// https://astro.build/config
export default defineConfig({
  site: 'https://TU_USUARIO.github.io',
  base: '/TU_REPOSITORIO',
  vite: {
    plugins: [tailwindcss()]
  },
  // Configuración adicional para GitHub Pages
  build: {
    assets: '_astro',
  },
  // Configuración de rutas para SPA
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
}); 