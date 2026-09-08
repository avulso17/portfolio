const { withTV } = require('tailwind-variants/transformer')
const plugin = require('tailwindcss/plugin')

const { colors: systemColors } = require('./src/styles/colors')
const { keyframes } = require('./src/styles/keyframes.ts')

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
      display: ['var(--font-display)', 'Impact', 'sans-serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      serif: ['var(--font-serif)', 'Georgia', 'serif'],
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
        fadeIn: 'fadeIn 200ms ease forwards',
        fadeOut: 'fadeOut 200ms ease forwards',
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
        'portrait-radient':
          'radial-gradient(48.31% 55.24% at 50.54% 40.52%, hsla(0, 0%, 98%, 0) 0, #0d0d0d 100%)',
        'radial-gradient':
          'radial-gradient(37.02% 75.07% at 54.91% 36.48%, rgba(13, 13, 13, 0.00) 0%, #0D0D0D 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
        50: '50%',
      },
      boxShadow: {
        'text-area': '0px 19px 30px 0px rgba(0,0,0,0.2)',
      },
      lineHeight: {
        normal: 'normal',
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
    plugin(function ({ addUtilities, theme, matchVariant, matchUtilities }) {
      ;(addUtilities({
        '.blur-performance': {
          willChange: 'filter',
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: '1000',
          backfaceVisibility: 'hidden',
          perspective: '1000',
        },

        // typography roles
        '.display-1': {
          fontFamily: theme('fontFamily.display'),
          fontSize: '7rem',
          lineHeight: '0.9',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          '@media (max-width: 620px)': {
            fontSize: '3.5rem',
          },
        },
        '.display-2': {
          fontFamily: theme('fontFamily.display'),
          fontSize: '4rem',
          lineHeight: '0.95',
          textTransform: 'uppercase',
          '@media (max-width: 620px)': {
            fontSize: '2.25rem',
          },
        },
        '.text-outline': {
          color: 'transparent',
          '-webkit-text-stroke': `1.5px ${theme('colors.parchment')}`,
        },
        '.eyebrow-text': {
          fontFamily: theme('fontFamily.mono'),
          fontSize: '0.75rem',
          lineHeight: '1',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
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
        }))
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
