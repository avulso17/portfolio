const { withTV } = require('tailwind-variants/transformer')
const plugin = require('tailwindcss/plugin')

const { colors: systemColors } = require('./src/styles/colors')
const { keyframes } = require('./src/styles/keyframes')

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...systemColors,
    },
    fontFamily: {
      inter: ['var(--font-inter)'],
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
      backgroundImage: {
        'base-gradient': 'linear-gradient(180deg, #1A1A1A 0%, #131313 100%)',
        'radial-gradient':
          'radial-gradient(37.02% 75.07% at 54.91% 36.48%, rgba(13, 13, 13, 0.00) 0%, #0D0D0D 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        50: '50%',
      },
      boxShadow: {
        'text-area': '0px 19px 30px 0px rgba(0,0,0,0.2)',
        button:
          '0px 7px 4px 0px rgba(0, 0, 0, 0.15), 0px 2px 4px 0px rgba(255, 255, 255, 0.08) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.02) inset',
        dropdown:
          '0px 5px 7px 0px rgba(0, 0, 0, 0.11), 0px 8px 5px 0px rgba(0, 0, 0, 0.07) inset',
      },
      keyframes: {
        ...keyframes,
      },
      width: {
        'half-rem': 'calc(50% - 1rem)',
      },
      maxWidth: {
        'tech-card': 'calc(50% - 0.5rem)',
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
          fontSize: theme('fontSize.lg'),
          userSelect: 'none',
        },
        img: {
          userSelect: 'none',
          '-webkit-user-drag': 'none',
        },
        'h1, h2, h3, h4, h5, h6, p, b, a, small, span': {
          fontWeight: theme('fontWeight.normal'),
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
        '::-webkit-scrollbar': {
          backgroundColor: theme('colors.transparent'),
          height: theme('spacing.1'),
          width: theme('spacing.1'),
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
      }),
        addUtilities({
          '.mask-geist': {
            maskImage: 'url(/assets/geist.svg)',
            maskSize: 'cover',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          },

          '.blur-performance': {
            willChange: 'filter',
            WebkitBackfaceVisibility: 'hidden',
            WebkitPerspective: '1000',
            backfaceVisibility: 'hidden',
            perspective: '1000',
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

          // typography
          '.hero-title': {
            fontSize: '5rem',
            fontWeight: theme('fontWeight.bold'),
            lineHeight: 'normal',

            b: {
              color: theme('colors.gray.dark'),
              fontSize: 'inherit',
              fontWeight: 'inherit',
              lineHeight: 'inherit',
            },

            '@media (max-width: 620px)': {
              fontSize: theme('fontSize.5xl'),
            },
          },
          '.hero-text': {
            color: theme('colors.gray.DEFAULT'),
            fontSize: theme('fontSize.2xl'),
            lineHeight: 'normal',

            '@media (max-width: 620px)': {
              fontSize: theme('fontSize.base'),
            },
          },
          '.header': {
            fontSize: theme('fontSize.5xl'),
            fontWeight: theme('fontWeight.bold'),
            lineHeight: 'normal',

            '@media (max-width: 620px)': {
              fontSize: '2rem',
            },
          },
          '.header-text': {
            color: 'rgba(128, 128, 128, 0.5)',
            fontSize: theme('fontSize.xl'),
            lineHeight: 'normal',

            '@media (max-width: 620px)': {
              fontSize: '1rem',
            },
          },
          '.text-body': {
            fontSize: theme('fontSize.base'),
            lineHeight: 'normal',
          },
          '.font-inherit': {
            fontSize: 'inherit',
            lineHeight: 'inherit',
          },

          // utils
          '.absolute-center-x': {
            left: '50%',
            transform: 'translateX(-50%)',
          },

          '.absolute-center-y': {
            top: '50%',
            transform: 'translateY(-50%)',
          },

          '.absolute-center': {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          },

          '.rotate-inverted': {
            transform: 'rotate(180deg)',
          },

          '.rotate-inverted-y': {
            transform: 'rotateY(180deg)',
          },

          '.rotate-inverted-x': {
            transform: 'rotateX(180deg)',
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
})
