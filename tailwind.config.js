const plugin = require('tailwindcss/plugin')

const { colors: systemColors } = require('./src/UI/styles/colors')
const { keyframes } = require('./src/UI/styles/keyframes')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...systemColors,
    },
    fontFamily: {
      display: ['"SF Pro"', 'sans-serif'],
      'display-medium': ['"SF Pro Medium"', 'sans-serif'],
      cadency: ['"Cadency"', 'sans-serif'],
      florista: ['"Florista"', 'sans-serif'],
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
        '4xl': '2.5rem',
        50: '50%',
      },
      keyframes: {
        ...keyframes,
      },
      animation: {
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        slideDownAndFade: 'slideDownAndFade 0.3s ease-out',
        slideLeftAndFade: 'slideLeftAndFade 0.3s ease-out',
        slideRightAndFade: 'slideRightAndFade 0.3s ease-out',
        slideUpAndFade: 'slideUpAndFade 0.3s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({
      addBase,
      addUtilities,
      theme,
      matchVariant,
      matchUtilities,
    }) {
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
          // tile backgrounds
          '.bg-tile-1': {
            background:
              'url(/tiles/purple/purple_background_1.png), lightgray 50% / cover no-repeat',
          },

          '.bg-tile-2': {
            background:
              'url(/tiles/purple/purple_background_2.png), lightgray 50% / cover no-repeat',
          },

          '.bg-tile-3': {
            background:
              'url(/tiles/purple/purple_background_3.png), lightgray 50% / cover no-repeat',
          },

          '.bg-tile-4': {
            background:
              'url(/tiles/purple/purple_background_4.png), lightgray 50% / cover no-repeat',
          },

          // materials
          '.bg-material-100': {
            backgroundImage:
              'linear-gradient(0deg, rgba(156, 156, 156, 0.1) 0%, rgba(156, 156, 156, 0.1) 100%)',
            backgroundColor: 'rgba(37, 37, 37, 0.55)',
            backgroundBlendMode: 'overlay, normal',
          },

          '.bg-material-200': {
            backgroundImage:
              'linear-gradient(0deg, rgba(156, 156, 156, 0.1) 0%, rgba(156, 156, 156, 0.1) 100%)',
            backgroundColor: 'rgba(37, 37, 37, 0.70)',
            backgroundBlendMode: 'overlay, normal',
          },

          '.bg-material-300': {
            backgroundImage:
              'linear-gradient(0deg, rgba(140, 140, 140, 0.1) 0%, rgba(140, 140, 140, 0.1) 100%)',
            backgroundColor: 'rgba(37, 37, 37, 0.82)',
            backgroundBlendMode: 'overlay, normal',
          },

          '.bg-material-400': {
            backgroundImage:
              'linear-gradient(0deg, rgba(124, 124, 124, 0.1) 0%, rgba(124, 124, 124, 0.1) 100%)',
            backgroundColor: 'rgba(37, 37, 37, 0.90)',
            backgroundBlendMode: 'overlay, normal',
          },

          // fills
          '.material-fill-100': {
            backgroundImage:
              'linear-gradient(0deg, rgba(194, 194, 194, 1) 0%, rgba(194, 194, 194, 1) 100%)',
            backgroundColor: 'rgba(127, 127, 127, 0.50)',
            backgroundBlendMode: 'overlay, luminosity',
          },

          '.material-fill-200': {
            backgroundImage:
              'linear-gradient(0deg, rgba(194, 194, 194, 0.50) 0%, rgba(194, 194, 194, 0.50) 100%)',
            backgroundColor: 'rgba(127, 127, 127, 0.40)',
            backgroundBlendMode: 'overlay, luminosity',
          },

          '.material-fill-300': {
            backgroundImage:
              'linear-gradient(0deg, rgba(194, 194, 194, 0.50) 0%, rgba(194, 194, 194, 0.50) 100%)',
            backgroundColor: 'rgba(127, 127, 127, 0.20)',
            backgroundBlendMode: 'overlay, luminosity',
            backdropFilter: 'blur(0px)',
          },

          // base dialog
          '.dialog': {
            borderRadius: '20px',
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backdropFilter: 'blur(25px)',
            maxHeight: '85vh',
            maxWidth: '500px',
            width: '90vw',
            zIndex: 1000,
          },

          // separator
          '.separator': {
            '&[data-orientation=horizontal]': { height: 1, width: '100%' },
            '&[data-orientation=vertical]': { height: '100%', width: 1 },
          },

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
        ),
        matchUtilities(
          {
            perspective: (value) => ({
              perspective: value,
            }),
            'svg-wrapper': (value) => ({
              color: value,
              fill: value,
            }),
          },
          { values: theme('colors') }
        )
    }),
  ],
}
