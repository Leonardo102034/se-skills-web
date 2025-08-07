// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://IngZidany.github.io',
  // base: '/se-web-skills', // Comentado para desarrollo local
  vite: {
    plugins: [tailwindcss()]
  }
});