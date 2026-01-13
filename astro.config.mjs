// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://flaggr.pages.dev',

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'zh', 'fr', 'es', 'pt', 'ar', 'th', 'vi', 'id', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
