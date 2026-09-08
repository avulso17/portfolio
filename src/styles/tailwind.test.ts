import resolveConfig from 'tailwindcss/resolveConfig'

// tailwind.config.js `require()`s TypeScript files (colors.ts, keyframes.ts).
// Tailwind itself loads the config through jiti; do the same here so the
// test sees exactly what the build sees. jiti ships as a tailwindcss dependency.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jiti = require('jiti')(__filename)
const tailwindConfig = jiti('../../tailwind.config.js')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const theme = resolveConfig(tailwindConfig).theme as Record<string, any>

describe('tailwind theme', () => {
  it('uses only brand colors', () => {
    expect(Object.keys(theme.colors).sort()).toEqual(
      [
        'amber',
        'amber-dim',
        'current',
        'err',
        'inherit',
        'ink',
        'ink-2',
        'line',
        'ok',
        'parchment',
        'parchment-dim',
        'parchment-mute',
        'transparent',
      ].sort()
    )
  })

  it('exposes the four font roles and nothing else', () => {
    expect(Object.keys(theme.fontFamily).sort()).toEqual([
      'body',
      'display',
      'mono',
      'serif',
    ])
    expect(theme.fontFamily.display[0]).toBe('var(--font-display)')
    expect(theme.fontFamily.mono[0]).toBe('var(--font-mono)')
  })

  it('has no legacy gradient or shadow tokens', () => {
    expect(theme.backgroundImage?.['base-gradient']).toBeUndefined()
    expect(theme.boxShadow?.button).toBeUndefined()
    expect(theme.boxShadow?.dropdown).toBeUndefined()
  })
})
