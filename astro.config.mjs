import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://roasbodhi.in',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ]
});
