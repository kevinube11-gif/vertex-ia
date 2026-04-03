/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vertex-dark': '#0A0704',
        'vertex-surface': '#140D05',
        'vertex-surface-2': '#1C1409',
        'vertex-text': '#FAF8F4',
        'vertex-text-secondary': '#BDB09A',
        'vertex-text-tertiary': '#7A6A4A',
        'vertex-gold': '#C9A34A',
        'vertex-gold-light': '#E8C96A',
        'vertex-cafe': '#2B1B12',
        'vertex-bone': '#E9DCC3',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
