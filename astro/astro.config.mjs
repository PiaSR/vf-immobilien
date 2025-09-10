// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  image: {
      service: {
        entrypoint: 'astro/assets/services/sharp'
      }
    },

  integrations: [
    react(),
    sanity({
      // Your Sanity Project ID and Dataset
      projectId: '6uu4aiks', 
      dataset: 'production', 
      useCdn: true,
      apiVersion: '2025-09-10' // Use today's date for a consistent API version
    }),
  ]
});