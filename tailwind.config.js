/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    screens: {
      xs: '480px',
      sm: '620px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    opacity: {
      0: '0',
      15: '0.15',
      25: '0.25',
      50: '0.5',
      80: '0.8',
      100: '1',
    },
    extend: {
      colors: {
        primary: '#1a202c',
        secondary: '#2d3748',

        // aliases
        text: '#f3f3f3',
        background: '#222222',
      },
      borderRadius: {
        round: '50%',
      },
    },
  },
  plugins: [],
}
