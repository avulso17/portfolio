const { withTV } = require('tailwind-variants/transformer')
const plugin = require('tailwindcss/plugin')

const { colors: systemColors } = require('./src/styles/colors')
const { keyframes } = require('./src/styles/keyframes')

const svgToDataUri = require('mini-svg-data-uri')

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

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
        'bounce-in-top': 'bounce-in-top 0.9s both',
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
        'rotate-border': 'rotateDashedBorder 1s infinite linear',
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
    require('tailwindcss-animate'),
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
    plugin(function ({
      addBase,
      addUtilities,
      theme,
      matchVariant,
      matchUtilities,
    }) {
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

        '.custom-border-dashed': {
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%23383737FF' stroke-width='5' stroke-dasharray='20' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e")`,
        },

        '.custom-border-dashed-mobile': {
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%23383737FF' stroke-width='4' stroke-dasharray='14' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e")`,
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
          fontWeight: 'inherit',
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
        matchUtilities({
          perspective: (value) => ({
            perspective: value,
          }),
        })
    }),
  ],
})

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}
