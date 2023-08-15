import { IColors } from '@/types/colors'

export const colors: IColors = {
  inherit: 'inherit',
  transparent: 'transparent',
  current: 'currentColor',

  // basic colors
  black: '#0D0D0D',
  white: '#FFFFFF',
  onyx: '#181818',
  gray: {
    light: '#C5C5C5',
    DEFAULT: 'rgba(128, 128, 128, 0.5)',
    dark: '#808080',
  },
  blue: 'rgba(63 , 100, 234, 0.43)',
  red: 'rgba(233, 63, 64, 0.43)',
  yellow: 'rgba(255, 184, 0, 0.43)',
  'card-border': '#383737',
  'card-bg': '#151515',

  // actions
  success: '#30D158',
  warning: '#FFD60A',
  error: '#FF453A',
  info: '#0A84FF',
}
