// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
 
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
  ],
  adapter: vercel(),
});