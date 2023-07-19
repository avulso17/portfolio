const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      body: ['"SF Pro"', 'sans-serif'],
    },
    screens: {
      xs: '480px',
      sm: '620px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        highlight: '#AB05F2',
        primary: '#7C05F2',
        secondary: '#4703A6',
        tertiary: '#1B0140',
        darken: '#100126',

        // aliases
        text: '#ffffff',
        background: '#000000',

        // actions
        success: '#00C853',
        warning: '#FFD600',
        error: '#D50000',
      },
      borderRadius: {
        50: '50%',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities, theme, matchVariant }) {
      addBase({
        html: {
          fontSize: theme('fontSize.base'),
        },
      }),
        addUtilities({
          '.scrollbar': {
            scrollbarWidth: 'thin',
          },
        }),
        matchVariant(
          'nth',
          (value) => {
            return `&:nth-child(${value})`
          },
          {
            values: {
              1: '1',
              2: '2',
              3: '3',
            },
          }
        )
    }),
  ],
}
