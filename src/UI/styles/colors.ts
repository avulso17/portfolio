import { IColors } from '@/types/colors'

export const colors: IColors = {
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
  blue: '#0A84FF',
  brown: '#AC8E68',
  cyan: '#40CBE0',
  green: '#30D158',
  indigo: '#5E5CE6',
  mint: '#63E6E2',
  orange: '#FF9F0A',
  pink: '#FF375F',
  purple: '#BF5AF2',
  red: '#FF453A',
  teal: '#40CBE0',
  white: '#ffffff',
  yellow: '#FFD60A',

  // theme colors
  highlight: '#AB05F2',
  primary: '#7C05F2',
  secondary: '#4703A6',
  tertiary: '#1B0140',
  darken: '#100126',

  // aliases
  background: {
    100: '#000000',
    200: '#1C1C1E',
    300: '#2C2C2E',
  },
  label: {
    100: '#FFFFFF',
    200: 'rgba(127, 127, 127, 0.50)',
    300: 'rgba(127, 127, 127, 0.40)',
    400: 'rgba(127, 127, 127, 0.20)',
  },
  separator: {
    DEFAULT: '#38383A',
    alpha: 'rgba(84, 84, 88, 0.65)',
  },
  fill: {
    100: 'rgba(120, 120, 128, 0.36)',
    200: 'rgba(120, 120, 128, 0.32)',
    300: 'rgba(118, 118, 128, 0.24)',
    400: 'rgba(116, 116, 128, 0.18)',
  },

  // actions
  success: '#30D158',
  warning: '#FFD60A',
  error: '#FF453A',
  info: '#0A84FF',
}
