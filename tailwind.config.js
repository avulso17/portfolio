/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',
        secondary: '#2d3748',

        // aliases
        text: '#f3f3f3',
        background: '#222222',
      },
    },
  },
  plugins: [],
}
