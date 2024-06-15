const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SuisseIntl', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        book: '450',
      },
    },
    screens: {
      xl: {max: '1536px'},
      lg: {max: '1280px'},
      md: {max: '810px'},
      sm: {max: '428px'},
    },
  },
  plugins: [
    // adds a `s-*` utility to apply the same width and height
    plugin(function sizePlugin(api) {
      api.matchUtilities({s: (value) => ({width: value, height: value})}, {values: api.theme('width')})
    }),
  ],
}
