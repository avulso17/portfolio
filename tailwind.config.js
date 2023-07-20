const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      grey: {
        100: '#8E8E93',
        200: '#636366',
        300: '#48484A',
        400: '#3A3A3C',
        500: '#2C2C2E',
        600: '#1C1C1E',
      },
      black: '#000000',
      white: '#ffffff',

      // theme colors
      highlight: '#AB05F2',
      primary: '#7C05F2',
      secondary: '#4703A6',
      tertiary: '#1B0140',
      darken: '#100126',

      // fills
      fill: {
        100: 'rgba(120, 120, 128, 0.36)',
        200: 'rgba(120, 120, 128, 0.32)',
        300: 'rgba(118, 118, 128, 0.24)',
        400: 'rgba(116, 116, 128, 0.18)',
      },

      // aliases
      background: {
        100: '#000000',
        200: '#1C1C1E',
        300: '#2C2C2E',
      },
      label: {
        100: '#FFFFFF',
        200: '#EBEBF5',
      },
      separator: {
        DEFAULT: '#38383A',
        alpha: 'rgba(84, 84, 88, 0.65) ',
      },

      // actions
      success: '#30D158 ',
      warning: '#FFD60A ',
      error: '#FF453A',
      info: '#0A84FF ',
    },
    fontFamily: {
      display: ['"SF Pro"', 'sans-serif'],
      'display-medium': ['"SF Pro Medium"', 'sans-serif'],
    },
    screens: {
      'm-xs': '480px',
      mobile: '620px',
      tablet: '768px',
      wide: '1024px',
      'wide-xl': '1440px',
    },
    extend: {
      borderRadius: {
        50: '50%',
      },
      keyframes: {
        'slide-up-and-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-right-and-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(-2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-down-and-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(-2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-left-and-fade': {
          from: {
            opacity: 0,
            transform: 'translateY(2px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        'slide-up-and-fade': 'slide-up-and-fade 0.3s ease-out',
        'slide-right-and-fade': 'slide-right-and-fade 0.3s ease-out',
        'slide-down-and-fade': 'slide-down-and-fade 0.3s ease-out',
        'slide-left-and-fade': 'slide-left-and-fade 0.3s ease-out',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities, theme, matchVariant }) {
      addBase({
        'html, body': {
          backgroundColor: theme('colors.background.200'),
          color: theme('colors.label.100'),
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.base'),
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
        },
        html: {
          height: '100%',
          fontSize: theme('fontSize.base'),
        },
        body: {
          minHeight: '100%',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          textRendering: 'optimizeLegibility',
        },
        '*, ::before, ::after': {
          padding: 0,
          margin: 0,
        },
        a: {
          userSelect: 'none',
        },
        button: {
          fontSize: theme('fontSize.base'),
          userSelect: 'none',
        },
        img: {
          userSelect: 'none',
          '-webkit-user-drag': 'none',
        },
        'h1, h2, h3, h4, h5, h6, p, b, a, small, span': {
          fontWeight: theme('fontWeight.normal'),
          letterSpacing: '-0.4px',
        },
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            appearance: 'none',
            '-webkit-appearance': 'none',
          },
        '::selection': {
          backgroundColor: theme('colors.primary'),
          '-webkit-text-fill-color': theme('colors.white'),
        },
      }),
        addUtilities({
          // modal
          '.modal': {},

          // scrollbar
          '.custom-scrollbar': {
            '::-webkit-scrollbar': {
              backgroundColor: theme('colors.transparent'),
              height: theme('spacing.1'),
              width: theme('spacing.2'),
              transform: 'translate3d(0, 0, 0)',
              '-webkit-transform': 'translate3d(0, 0, 0)',
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme('colors.primary'),
              borderRadius: theme('borderRadius.lg'),
            },
            '::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme('colors.secondary'),
            },
          },

          // typography
          '.title-lg': {
            fontSize: '2.125rem',
            lineHeight: '2.625rem',
          },
          '.title-1': {
            fontSize: '1.75rem',
            lineHeight: '2.125rem',
          },
          '.title-2': {
            fontSize: '1.375rem',
            lineHeight: '1.75rem',
          },
          '.title-3': {
            fontSize: '1.25rem',
            lineHeight: '1.5rem',
          },
          '.headline': {
            fontFamily: theme('fontFamily.display-medium'),
            fontSize: '1.063rem',
            lineHeight: '1.375rem',
          },
          '.text-body': {
            fontSize: '1.063rem',
            lineHeight: '1.375rem',
          },
          '.callout': {
            fontSize: '1rem',
            lineHeight: '1.375rem',
          },
          '.subhead': {
            fontSize: '0.938rem',
            lineHeight: '1.25rem',
          },
          '.footnote': {
            fontSize: '0.813rem',
            lineHeight: '1.125rem',
          },
          '.caption1': {
            fontSize: '0.75rem',
            lineHeight: '1rem',
          },
          '.caption2': {
            fontSize: '0.688rem',
            lineHeight: '0.813rem',
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
