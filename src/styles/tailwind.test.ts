import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import postcss from 'postcss'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindcss from 'tailwindcss'

// tailwind.config.js `require()`s TypeScript files (colors.ts, keyframes.ts).
// Tailwind itself loads the config through jiti; do the same here so the
// test sees exactly what the build sees. jiti ships as a tailwindcss dependency.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jiti = require('jiti')(__filename)
const tailwindConfig = jiti('../../tailwind.config.js')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = tailwindConfig.rawConfig as Record<string, any>

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

  it('keeps only the modal fade animations and no legacy radius/shadow/gradient', () => {
    const ext = config.theme.extend
    expect(Object.keys(ext.animation).sort()).toEqual(['fadeIn', 'fadeOut'])
    expect(Object.keys(ext.keyframes).sort()).toEqual(['fadeIn', 'fadeOut'])
    expect(ext.backgroundImage).toBeUndefined()
    expect(ext.borderRadius).toBeUndefined()
    expect(ext.boxShadow).toBeUndefined()
  })

  it('clips horizontal overflow on html only, so body never becomes a scroll container', async () => {
    const css = readFileSync(join(__dirname, 'global.css'), 'utf8')
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [{ raw: '', extension: 'html' }],
      }),
    ]).process(css, { from: undefined })
    const rules = Array.from(
      result.css.matchAll(/([^{}]+)\{([^}]*)\}/g),
      ([, selector, body]) => ({ selector: selector.trim(), body })
    )
    const targets = (
      rules: { selector: string; body: string }[],
      tag: string
    ) =>
      rules.filter((r) =>
        r.selector.split(',').some((s: string) => s.trim() === tag)
      )
    const forHtml = targets(rules, 'html')
    const forBody = targets(rules, 'body')
    expect(forHtml.some((r) => /overflow-x:\s*hidden/.test(r.body))).toBe(true)
    expect(forBody.some((r) => /overflow/.test(r.body))).toBe(false)
  })

  it('emits the typography utilities with spec values', async () => {
    const css = '@tailwind utilities;'
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [
          {
            raw: '<div class="display-1 display-2 eyebrow-text text-outline"></div>',
            extension: 'html',
          },
        ],
      }),
    ]).process(css, { from: undefined })
    expect(result.css).toMatch(/\.display-1\s*{[^}]*font-size:\s*7rem/)
    expect(result.css).toMatch(
      /\.display-1\s*{[^}]*text-transform:\s*uppercase/
    )
    expect(result.css).toMatch(/\.display-2\s*{[^}]*font-size:\s*4rem/)
    expect(result.css).toMatch(/\.eyebrow-text\s*{[^}]*font-size:\s*0\.75rem/)
    expect(result.css).toMatch(
      /\.eyebrow-text\s*{[^}]*letter-spacing:\s*0\.08em/
    )
    expect(result.css).toMatch(
      /\.text-outline\s*{[^}]*-webkit-text-stroke:\s*1\.5px/
    )
  })

  it('applies display headings outside dialogs only', async () => {
    const css = readFileSync(join(__dirname, 'global.css'), 'utf8')
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [{ raw: '', extension: 'html' }],
      }),
    ]).process(css, { from: undefined })
    expect(result.css).toMatch(/h1:not\(dialog \*\)\s*\{/)
    expect(result.css).toMatch(/h2:not\(\.eyebrow-text\):not\(dialog \*\)\s*\{/)
    expect(result.css).not.toMatch(/(^|\n)h1\s*\{/)
  })

  it('emits full-bleed rule utilities', async () => {
    const css = readFileSync(join(__dirname, 'global.css'), 'utf8')
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [
          { raw: '<div class="rule-t rule-b"></div>', extension: 'html' },
        ],
      }),
    ]).process(css, { from: undefined })
    expect(result.css).toMatch(/\.rule-t::before[^}]*width:\s*100vw/)
    expect(result.css).toMatch(/\.rule-b::after[^}]*width:\s*100vw/)
  })

  it('clips the print-in reveal on its children, not the observed element', async () => {
    const css = readFileSync(join(__dirname, 'global.css'), 'utf8')
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [{ raw: '<div class="print-in"></div>', extension: 'html' }],
      }),
    ]).process(css, { from: undefined })
    expect(result.css).toMatch(/\.print-in\s*>\s*\*[^}]*transition/)
    expect(result.css).toMatch(
      /html\[data-js\] \.print-in:not\(\[data-revealed\]\)\s*>\s*\*[^}]*clip-path:\s*inset\(100% 0 0 0\)/
    )
    expect(result.css).not.toMatch(
      /html\[data-js\] \.print-in:not\(\[data-revealed\]\)\s*\{/
    )
  })

  it('kills every motion class under prefers-reduced-motion', async () => {
    const css = readFileSync(join(__dirname, 'global.css'), 'utf8')
    const result = await postcss([
      tailwindcss({
        ...tailwindConfig,
        content: [
          {
            raw: '<div class="print-in scene-reveal scene-drift rule-t rule-b reg-mark typewriter"></div>',
            extension: 'html',
          },
        ],
      }),
    ]).process(css, { from: undefined })
    const reduced = result.css.match(
      /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/
    )
    expect(reduced).not.toBeNull()
    for (const cls of [
      '.print-in',
      '.scene-reveal',
      '.rule-t::before',
      '.reg-mark',
      '.typewriter',
    ]) {
      expect(reduced![1]).toContain(cls)
    }
    expect(reduced![1]).toMatch(/animation:\s*none\s*!important/)
    expect(reduced![1]).toMatch(/clip-path:\s*none\s*!important/)
    expect(reduced![1]).toMatch(/\.typewriter::after[^}]*content:\s*none/)
  })
})
