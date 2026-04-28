// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  srcDir: './src/app',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
  },
});
