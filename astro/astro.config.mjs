// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://vf-immobilien.vercel.app',
  
  integrations: [
    react(),
    sitemap(),
    sanity({
      // Your Sanity Project ID and Dataset
      projectId: '6uu4aiks', 
      dataset: 'production', 
      useCdn: true,
      apiVersion: '2025-09-10' // Use today's date for a consistent API version
    }),
  ],
  adapter: vercel({
    
    imageService: true, 
    
  }),
  
});