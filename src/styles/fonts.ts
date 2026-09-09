import { Anton, Inter, Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'

// Display candidate for comps; swapping the family here is the only change
// needed if Plan 3's comps pick Bebas Neue / Big Shoulders / Archivo Black.
const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = localFont({
  src: '../assets/fonts/DepartureMono-Regular.woff2',
  variable: '--font-mono',
  display: 'swap',
})

export const fontVariables = [
  display.variable,
  body.variable,
  serif.variable,
  mono.variable,
].join(' ')
