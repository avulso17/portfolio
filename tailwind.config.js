const { withTV } = require('tailwind-variants/transformer')
const plugin = require('tailwindcss/plugin')

const { colors: systemColors } = require('./src/styles/colors.ts')
const { keyframes } = require('./src/styles/keyframes.ts')

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
const config = {
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
        fadeIn: 'fadeIn 200ms ease forwards',
        fadeOut: 'fadeOut 200ms ease forwards',
      },
      lineHeight: {
        normal: 'normal',
      },
      keyframes: {
        ...keyframes,
      },
    },
  },
  plugins: [
    addVariablesForColors,
    plugin(function ({ addUtilities, theme, matchVariant, matchUtilities }) {
      ;(addUtilities({
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
          lineHeight: '1.5',
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
}

module.exports = withTV(config)
module.exports.rawConfig = config

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}
