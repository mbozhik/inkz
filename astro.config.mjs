import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  server: {
    port: 2000,
    open: true,
  },
})
