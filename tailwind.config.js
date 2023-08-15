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
      inter: ['Inter', 'sans-serif'],
      nanum: ['"Nanum Pen Script"', 'sans-serif'],
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
          backgroundColor: theme('colors.black'),
          color: theme('colors.white'),
          fontFamily: theme('fontFamily.inter'),
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
          letterSpacing: '-1.2px',
        },
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            appearance: 'none',
            '-webkit-appearance': 'none',
          },
        '::selection': {
          backgroundColor: theme('colors.red'),
          '-webkit-text-fill-color': theme('colors.white'),
        },
      }),
        addUtilities({
          // base gradient
          '.base-gradient': {
            backgroundImage:
              'linear-gradient(180deg, #1A1A1A 0%, #131313 100%)',
          },

          // navbar content
          '.dropdown-shadow': {
            boxShadow:
              '0px 5px 7px 0px rgba(0, 0, 0, 0.11), 0px 8px 5px 0px rgba(0, 0, 0, 0.07) inset',
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
              backgroundColor: theme('colors.gray.dark'),
              borderRadius: theme('borderRadius.lg'),
            },
            '::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme('colors.gray.light'),
            },
          },

          // typography
          '.hero-title': {
            color: theme('colors.white'),
            fontFamily: theme('fontFamily.inter'),
            fontSize: '5rem',
            fontWeight: theme('fontWeight.bold'),
            lineHeight: 'normal',

            b: {
              color: theme('colors.gray.dark'),
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
            },
          },
          '.hero-text': {
            color: theme('colors.gray.dark'),
            fontFamily: theme('fontFamily.inter'),
            fontSize: theme('fontSize.2xl'),
            fontWeight: theme('fontWeight.medium'),
            lineHeight: '2rem',
          },
          '.text-body': {
            fontSize: '1.063rem',
            lineHeight: '1.375rem',
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
          },
          { values: theme('colors') }
        )
    }),
  ],
}
