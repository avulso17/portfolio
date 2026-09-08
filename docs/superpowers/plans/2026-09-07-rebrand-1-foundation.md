# Rebrand Plan 1/3 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's design tokens, fonts, global styles, layout shell, and base UI components with the new "Felipe Mateus" identity, while keeping every page building and legible so Plans 2 (assets) and 3 (pages) can land on top of it.

**Architecture:** Tokens live in `src/styles/colors.ts` and are consumed by Tailwind 3 via `tailwind.config.js` (which also exposes them as CSS variables through the existing `addVariablesForColors` plugin). Fonts are loaded once in `src/styles/fonts.ts` with `next/font` and exposed as CSS variables that Tailwind `fontFamily` reads. Components use `tailwind-variants` (`tv`) as the codebase already does. Page-level components are not redesigned here; their old token classes are mechanically mapped to the nearest new token so the site stays coherent until Plan 3.

**Tech Stack:** Next.js 16.1.1, React 19.2, Tailwind CSS 3.3, tailwind-variants 0.1, next/font, Vitest 3 + @testing-library/react (added in Task 1).

**Spec:** `docs/superpowers/specs/2026-09-07-brand-identity-design.md` (§4 Visual system, §5 Texture/effects, §7 Phase B). Product truth: `PRODUCT.md`.

## Global Constraints

- Dark-only. `color-scheme: dark`. No theme toggle.
- Color tokens (exact): `ink #0A0A0A`, `ink-2 #141414`, `line #262626`, `parchment #F2EEE6`, `parchment-dim #8C8A84`, `parchment-mute #4A4945`, `amber #F5B700`, `amber-dim rgba(245,183,0,0.15)`, `ok #4ADE80`, `err #F87171`. Nothing else, plus `transparent`, `current`, `inherit`.
- Amber appears **at most once per viewport**; components must not default to amber — only the explicit `accent` button variant and focus rings use it.
- Typography roles: `font-display` (heavy condensed grotesk, uppercase, H1/H2 only), `font-body` (Inter), `font-mono` (Departure Mono, uppercase, `tracking-[0.08em]`), `font-serif` (Instrument Serif italic, sparingly).
- Banned: glassmorphism/`backdrop-blur`, colored gradients, decorative blur, drop shadows, border radius > 2px (`rounded-sm` = 2px is the max; the one exception is a full-pill mono badge).
- Borders are 1px `line`. Sections separate with lines, not whitespace.
- Navigation labels stay literal: About, Projects, Bookshelf, Notebook, Tech Stack, Contact.
- Copy is English. Do not rewrite page copy in this plan (Plan 3 owns copy).
- Do not add the "avulso" easter egg yet (year unknown — pending input).
- Commit style: Conventional Commits, one commit per task, no `--no-verify`. The pre-commit hook runs `yarn lint` (must pass) and `lint-staged` (prettier).
- Package manager: **yarn 1** (`yarn add`, `yarn add -D`). Do not create `package-lock.json`.

---

## File map

| Path                                                                 | Action  | Responsibility                                                    |
| -------------------------------------------------------------------- | ------- | ----------------------------------------------------------------- |
| `vitest.config.mts`                                                  | create  | Vitest + jsdom + `@/` alias                                       |
| `src/test/setup.ts`                                                  | create  | jest-dom matchers                                                 |
| `src/styles/colors.ts`                                               | rewrite | The 10 brand color tokens                                         |
| `src/types/colors.ts`                                                | rewrite | Type for the token object                                         |
| `src/styles/fonts.ts`                                                | create  | `next/font` loaders + `fontVariables` class                       |
| `src/assets/fonts/DepartureMono-Regular.woff2`                       | add     | Vendored bitmap mono (OFL)                                        |
| `src/app/layout.tsx`                                                 | modify  | Use `fontVariables`; drop Nanum import                            |
| `tailwind.config.js`                                                 | modify  | colors, fontFamily, typography utilities, remove gradient/shadows |
| `src/styles/global.css`                                              | rewrite | base styles on new tokens                                         |
| `src/components/ui/Eyebrow.tsx`                                      | create  | `■ LABEL` mono eyebrow                                            |
| `src/components/ui/Button.tsx`                                       | rewrite | primary / accent / secondary / text variants                      |
| `src/components/ui/Card.tsx`                                         | create  | `ink-2` surface with `line` border                                |
| `src/components/ui/Terminal.tsx`                                     | create  | terminal-window content frame                                     |
| `src/components/ui/Input.tsx`                                        | rewrite | bottom-border input                                               |
| `src/components/ui/TextField.tsx`                                    | modify  | bottom-border + mono label                                        |
| `src/components/ui/Separator.tsx`                                    | modify  | `line` color                                                      |
| `src/components/layout/Container.tsx`                                | modify  | line-grid container with registration marks                       |
| `src/components/layout/RootLayout.tsx`                               | modify  | drop `Gradient`                                                   |
| `src/components/layout/navbar/desktop/index.tsx`                     | modify  | no blur, `ink-2` + `line`                                         |
| `src/components/layout/navbar/desktop/NavbarDesktopDropdownMenu.tsx` | modify  | no blur, `ink-2` + `line`                                         |
| `src/components/layout/navbar/mobile/index.tsx`                      | modify  | no blur, `ink-2` + `line`                                         |
| `src/components/layout/navbar/mobile/NavbarMobileMoreMenu.tsx`       | modify  | no blur                                                           |
| `src/components/layout/footer/index.tsx`                             | modify  | mono meta, `line` separator                                       |
| `src/components/ui/modal/Modal.tsx`                                  | modify  | no backdrop blur, `ink-2`                                         |
| `src/app/**/*.tsx` (page components)                                 | sed     | old token classes → new tokens                                    |
| `src/components/ui/Gradient.tsx`                                     | delete  | banned gradient                                                   |

---

### Task 1: Test infrastructure (Vitest + Testing Library)

**Files:**

- Create: `vitest.config.mts`
- Create: `src/test/setup.ts`
- Modify: `package.json` (scripts + devDependencies)
- Modify: `tsconfig.json` (add vitest globals types)
- Test: `src/test/smoke.test.tsx`

**Interfaces:**

- Produces: `yarn test` (runs `vitest run`), `yarn test:watch`. Every later task's tests run with `yarn test <path>`.

- [ ] **Step 1: Install dependencies**

Run:

```bash
yarn add -D vitest@^3 @vitejs/plugin-react@^4 jsdom@^25 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14
```

Expected: `yarn.lock` updated, no `package-lock.json` created.

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.mts`:

```ts
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: Create the setup file**

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Add scripts and types**

In `package.json` `"scripts"` add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

In `tsconfig.json` `"compilerOptions"` add (or extend) `"types": ["vitest/globals", "@testing-library/jest-dom"]`.

- [ ] **Step 5: Write a smoke test**

Create `src/test/smoke.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'

const Hello = () => <p>hello</p>

describe('test infrastructure', () => {
  it('renders a component in jsdom', () => {
    render(<Hello />)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run it**

Run: `yarn test src/test/smoke.test.tsx`
Expected: `1 passed`.

- [ ] **Step 7: Make sure lint still passes and eslint ignores nothing new**

Run: `yarn lint`
Expected: exit 0 (warnings allowed, no errors). If `vitest.config.mts` triggers `@typescript-eslint/no-require-imports` or import errors, add `'vitest.config.mts'` to the `files` list of the last config block in `eslint.config.mjs`.

- [ ] **Step 8: Commit**

```bash
git add vitest.config.mts src/test/setup.ts src/test/smoke.test.tsx package.json yarn.lock tsconfig.json eslint.config.mjs
git commit -m "test: add vitest and testing-library infrastructure"
```

---

### Task 2: Color tokens

**Files:**

- Rewrite: `src/styles/colors.ts`
- Rewrite: `src/types/colors.ts`
- Test: `src/styles/colors.test.ts`

**Interfaces:**

- Produces: `export const colors: BrandColors` with keys `inherit, transparent, current, ink, 'ink-2', line, parchment, 'parchment-dim', 'parchment-mute', amber, 'amber-dim', ok, err`. Tailwind classes generated: `bg-ink`, `bg-ink-2`, `border-line`, `text-parchment`, `text-parchment-dim`, `text-parchment-mute`, `bg-amber`, `text-amber`, `bg-amber-dim`, `text-ok`, `text-err`, etc. CSS variables: `--ink`, `--ink-2`, `--line`, `--parchment`, `--parchment-dim`, `--parchment-mute`, `--amber`, `--amber-dim`, `--ok`, `--err` (via the existing `addVariablesForColors` plugin).

- [ ] **Step 1: Write the failing test**

Create `src/styles/colors.test.ts`:

```ts
import { colors } from './colors'

describe('brand color tokens', () => {
  it('exposes exactly the spec palette', () => {
    expect(colors).toEqual({
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      ink: '#0A0A0A',
      'ink-2': '#141414',
      line: '#262626',
      parchment: '#F2EEE6',
      'parchment-dim': '#8C8A84',
      'parchment-mute': '#4A4945',
      amber: '#F5B700',
      'amber-dim': 'rgba(245,183,0,0.15)',
      ok: '#4ADE80',
      err: '#F87171',
    })
  })

  it('has no legacy tokens', () => {
    const legacy = [
      'black',
      'white',
      'onyx',
      'gray',
      'blue',
      'red',
      'yellow',
      'card-border',
      'card-bg',
      'nav-border',
      'success',
      'warning',
      'error',
      'info',
    ]
    for (const key of legacy) {
      expect(colors).not.toHaveProperty(key)
    }
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/styles/colors.test.ts`
Expected: FAIL (old palette present).

- [ ] **Step 3: Rewrite the type**

Replace `src/types/colors.ts` with:

```ts
export type BrandColors = {
  inherit: 'inherit'
  transparent: 'transparent'
  current: 'currentColor'
  ink: string
  'ink-2': string
  line: string
  parchment: string
  'parchment-dim': string
  'parchment-mute': string
  amber: string
  'amber-dim': string
  ok: string
  err: string
}
```

- [ ] **Step 4: Rewrite the tokens**

Replace `src/styles/colors.ts` with:

```ts
import { BrandColors } from '@/types/colors'

export const colors: BrandColors = {
  inherit: 'inherit',
  transparent: 'transparent',
  current: 'currentColor',

  ink: '#0A0A0A',
  'ink-2': '#141414',
  line: '#262626',

  parchment: '#F2EEE6',
  'parchment-dim': '#8C8A84',
  'parchment-mute': '#4A4945',

  amber: '#F5B700',
  'amber-dim': 'rgba(245,183,0,0.15)',

  ok: '#4ADE80',
  err: '#F87171',
}
```

- [ ] **Step 5: Run the test**

Run: `yarn test src/styles/colors.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Check nothing imports `IColors`**

Run: `grep -rn "IColors" src`
Expected: no output. (If any file still imports it, change the import to `BrandColors`.)

- [ ] **Step 7: Commit**

```bash
git add src/styles/colors.ts src/types/colors.ts src/styles/colors.test.ts
git commit -m "feat(tokens): replace palette with ink/parchment/amber brand tokens"
```

Note: `tailwind.config.js` still references `theme('colors.gray.dark')` in `.hero-title` — that is fixed in Task 4. The build is temporarily inconsistent between Task 2 and Task 4; do not run `next build` until Task 4 is done.

---

### Task 3: Fonts

**Files:**

- Create: `src/styles/fonts.ts`
- Add: `src/assets/fonts/DepartureMono-Regular.woff2`
- Modify: `src/app/layout.tsx`
- Modify: `package.json` (remove `@fontsource/nanum-pen-script`)

**Interfaces:**

- Produces: `export const fontVariables: string` — a className that sets `--font-display`, `--font-body`, `--font-mono`, `--font-serif` on `<html>`. Tailwind reads these in Task 4 as `font-display`, `font-body`, `font-mono`, `font-serif`.

- [ ] **Step 1: Vendor Departure Mono**

Departure Mono is OFL-licensed and not on Google Fonts. Download the latest release zip from `https://github.com/rektdeckard/DepartureMono/releases/latest`, extract `DepartureMono-Regular.woff2`, and place it at `src/assets/fonts/DepartureMono-Regular.woff2`.

```bash
mkdir -p src/assets/fonts
# after manual download + unzip into /tmp/departure:
cp /tmp/departure/*/DepartureMono-Regular.woff2 src/assets/fonts/ 2>/dev/null || cp /tmp/departure/DepartureMono-Regular.woff2 src/assets/fonts/
ls -la src/assets/fonts/DepartureMono-Regular.woff2
```

Expected: file exists (~20–40 KB). Also copy the release's `LICENSE` (OFL) to `src/assets/fonts/DepartureMono-LICENSE.txt`.

If the download is impossible in the executor's environment, stop and report — do not substitute another font silently.

- [ ] **Step 2: Create the font module**

Create `src/styles/fonts.ts`:

```ts
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
```

- [ ] **Step 3: Wire it into the root layout**

In `src/app/layout.tsx`:

- Delete the line `import '@fontsource/nanum-pen-script'`.
- Delete `import { Inter } from 'next/font/google'` and the `const inter = Inter({...})` block.
- Add `import { fontVariables } from '@/styles/fonts'`.
- Change `<html lang='en' className={inter.variable}>` to `<html lang='en' className={fontVariables}>`.

- [ ] **Step 4: Remove the Nanum dependency**

Run: `yarn remove @fontsource/nanum-pen-script`

- [ ] **Step 5: Verify nothing else references Nanum or the old variable**

Run: `grep -rn "nanum\|font-inter\|--font-inter" src tailwind.config.js`
Expected: matches only in `tailwind.config.js` (fixed in Task 4) and possibly `src/components/Resume.tsx` / page files using `font-inter` (mapped in Task 4's sed). Note them; do not edit yet.

- [ ] **Step 6: Commit**

```bash
git add src/styles/fonts.ts src/assets/fonts src/app/layout.tsx package.json yarn.lock
git commit -m "feat(fonts): load Anton, Inter, Instrument Serif and Departure Mono via next/font"
```

---

### Task 4: Tailwind theme + global CSS

**Files:**

- Modify: `tailwind.config.js`
- Rewrite: `src/styles/global.css`
- Test: `src/styles/tailwind.test.ts`

**Interfaces:**

- Produces Tailwind utilities: `font-display`, `font-body`, `font-mono`, `font-serif`; typography components `.display-1` (7rem/3.5rem uppercase display), `.display-2` (4rem/2.25rem), `.eyebrow-text` (mono uppercase tracked); `.text-outline` (display outline variant); keeps `.absolute-center`, `.absolute-center-x`, `.absolute-center-y`, `.text-body`, `.font-inherit`, `.blur-performance`, `bg-grid`, `bg-dot` for the interim; removes `.hero-title`, `.header`, `.header-text`, `.hero-text`, `.dialog`, `.mask-geist`, `.custom-border-dashed*`, `bg-base-gradient`, `boxShadow.button/dropdown`, `fontFamily.inter/nanum/calibri`.

- [ ] **Step 1: Write a failing test that resolves the Tailwind theme**

Create `src/styles/tailwind.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/styles/tailwind.test.ts`
Expected: FAIL on colors and fontFamily.

- [ ] **Step 3: Update `tailwind.config.js` theme**

In the `theme` object:

Replace

```js
    fontFamily: {
      inter: ['var(--font-inter)'],
      nanum: ['"Nanum Pen Script"', 'sans-serif'],
      calibri: ['"Calibri"', '"Arial"', 'sans-serif'],
    },
```

with

```js
    fontFamily: {
      display: ['var(--font-display)', 'Impact', 'sans-serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      serif: ['var(--font-serif)', 'Georgia', 'serif'],
    },
```

Inside `extend`, delete the `backgroundImage` entry that defines `'base-gradient'` and delete the `boxShadow` entry (both `button` and `dropdown`). Keep `animation`, `keyframes`, `lineHeight`, `width`, `maxWidth`.

- [ ] **Step 4: Replace the typography/utility block in the `plugin(...)` call**

In the `addUtilities({...})` object inside `plugin(function ({ addUtilities, theme, matchVariant, matchUtilities }) {...})`:

Delete these keys entirely: `'.mask-geist'`, `'.custom-border-dashed'`, `'.custom-border-dashed-mobile'`, `'.dialog'`, `'.hero-title'`, `'.hero-text'`, `'.header'`, `'.header-text'`.

Keep: `'.blur-performance'`, `'.text-body'`, `'.font-inherit'`, `'.absolute-center-x'`, `'.absolute-center-y'`, `'.absolute-center'`.

Add these keys:

```js
        // typography roles
        '.display-1': {
          fontFamily: theme('fontFamily.display').join(', '),
          fontSize: '7rem',
          lineHeight: '0.9',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          '@media (max-width: 620px)': {
            fontSize: '3.5rem',
          },
        },
        '.display-2': {
          fontFamily: theme('fontFamily.display').join(', '),
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
          fontFamily: theme('fontFamily.mono').join(', '),
          fontSize: '0.75rem',
          lineHeight: '1',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        },
```

Also remove `addBase` from the plugin's destructured parameters if it is unused (it currently triggers a lint warning).

- [ ] **Step 5: Run the theme test**

Run: `yarn test src/styles/tailwind.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Rewrite `src/styles/global.css`**

Replace the file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *,
  ::before,
  ::after {
    @apply m-0 box-border p-0;
  }

  html {
    @apply h-full text-body;
    color-scheme: dark;
  }

  html,
  body {
    @apply bg-ink font-body text-parchment overflow-x-hidden scroll-smooth text-body;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    @apply min-h-screen;
  }

  img {
    -webkit-user-drag: none;
    @apply select-none;
  }

  p,
  b,
  a {
    @apply text-body;
  }

  a {
    @apply select-none outline-none;
  }

  button {
    @apply select-none outline-none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  small,
  span {
    @apply font-normal;
  }

  h1 {
    @apply display-1;
  }

  h2 {
    @apply display-2;
  }

  :focus-visible {
    @apply outline-amber outline outline-1 outline-offset-2;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    @apply appearance-none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition:
      background-color 600000s 0s,
      color 600000s 0s;
  }

  ::selection {
    @apply bg-parchment text-ink;
  }
}
```

- [ ] **Step 7: Map legacy classes in page components to the new tokens**

This is a mechanical pass so the pages stay legible until Plan 3 redesigns them. It uses `perl` (macOS `sed` has no `\b`). Every rule is anchored to a class-name boundary: preceded by a quote, space, backtick, `(` or `:` and followed by a quote, space, backtick, `/`, `)` or end of line — so a `<header>` tag or an `id='header'` is never touched, only the utility class `header` inside a class string. Run from the repo root:

```bash
find src -name '*.tsx' -not -path '*/test/*' -print0 | xargs -0 perl -pi -e '
  my %map = (
    "text-gray-light"     => "text-parchment",
    "text-gray-dark"      => "text-parchment-dim",
    "text-gray"           => "text-parchment-mute",
    "text-white"          => "text-parchment",
    "bg-white"            => "bg-parchment",
    "bg-black"            => "bg-ink",
    "bg-onyx"             => "bg-ink-2",
    "bg-card-bg"          => "bg-ink-2",
    "border-card-border"  => "border-line",
    "ring-nav-border"     => "ring-line",
    "border-red"          => "border-err",
    "text-red"            => "text-err",
    "bg-red"              => "bg-err",
    "text-success"        => "text-ok",
    "text-error"          => "text-err",
    "font-inter"          => "font-body",
    "font-nanum"          => "font-serif",
    "font-calibri"        => "font-body",
    "hero-text"           => "text-xl text-parchment-dim",
    "header-text"         => "text-lg text-parchment-mute",
    "hero-title"          => "display-1",
    "header"              => "display-2",
  );
  for my $from (sort { length($b) <=> length($a) } keys %map) {
    my $to = $map{$from};
    s/(?<=[\x27" `(:])\Q$from\E(?=[\x27" `\/)]|$)/$to/g;
  }
'
```

Rules are applied longest-first so `text-gray-light` is rewritten before `text-gray` can match its prefix, and the lookahead accepts `/` so `text-white/40` becomes `text-parchment/40`. Variant prefixes work because `:` is an allowed left boundary (`placeholder:text-gray` → `placeholder:text-parchment-mute`, `hover:bg-white/10` → `hover:bg-parchment/10`).

Then check the two remaining kinds of legacy references by hand:

```bash
grep -rn "text-gray\|bg-onyx\|card-border\|card-bg\|nav-border\|bg-blue\|bg-yellow\|text-blue\|text-yellow\|bg-base-gradient\|shadow-button\|shadow-dropdown\|mask-geist\|custom-border-dashed\|'dialog'\|font-inter\|font-nanum\|font-calibri\|hero-title\|hero-text\|header-text" src
```

Expected: no output. If something with an opacity suffix like `bg-onyx/80` slipped through (the `\b` guard stops at `/`), fix it by hand to `bg-ink-2/80`.

Confirm the `header` rule only hit class strings (no JSX tags or ids were rewritten):

```bash
git diff -U0 -- src | grep "^+" | grep "display-2" | grep -v "className\|class:\|tv(\|'\|\""
grep -rn "<display-2\|id='display-2'" src
```

Expected: no output from either command.

- [ ] **Step 8: Build to verify the site compiles**

Run: `yarn build 2>&1 | tail -20`
Expected: build succeeds. Tailwind does not error on unknown classes, so also open `.next` build output for CSS warnings: none expected.

- [ ] **Step 9: Lint**

Run: `yarn lint`
Expected: exit 0.

- [ ] **Step 10: Commit**

```bash
git add tailwind.config.js src/styles/global.css src/styles/tailwind.test.ts src
git commit -m "feat(theme): brand fonts, typography utilities and token migration across pages"
```

---

### Task 5: Eyebrow component

**Files:**

- Create: `src/components/ui/Eyebrow.tsx`
- Test: `src/components/ui/Eyebrow.test.tsx`

**Interfaces:**

- Produces: `Eyebrow: React.FC<EyebrowProps>` where `EyebrowProps = React.ComponentProps<'p'> & { active?: boolean; index?: string }`. Renders `<p class="eyebrow-text ..."><span aria-hidden data-square/>{index && `${index} — `}{children}</p>`. Square is `parchment-mute`, `amber` when `active`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/Eyebrow.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Eyebrow } from './Eyebrow'

describe('Eyebrow', () => {
  it('renders uppercase mono label with a square marker', () => {
    render(<Eyebrow>Selected work</Eyebrow>)
    const label = screen.getByText('Selected work')
    expect(label).toHaveClass('eyebrow-text')
    const square = label.querySelector('[data-square]')
    expect(square).not.toBeNull()
    expect(square).toHaveClass('bg-parchment-mute')
    expect(square).toHaveAttribute('aria-hidden', 'true')
  })

  it('prefixes an index when given', () => {
    render(<Eyebrow index='04'>Bookshelf</Eyebrow>)
    expect(screen.getByText(/04 — Bookshelf/)).toBeInTheDocument()
  })

  it('turns the square amber when active', () => {
    render(<Eyebrow active>Now</Eyebrow>)
    expect(screen.getByText('Now').querySelector('[data-square]')).toHaveClass(
      'bg-amber'
    )
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/ui/Eyebrow.test.tsx`
Expected: FAIL — cannot resolve `./Eyebrow`.

- [ ] **Step 3: Implement**

Create `src/components/ui/Eyebrow.tsx`:

```tsx
import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const eyebrowStyles = tv({
  slots: {
    root: 'eyebrow-text text-parchment-mute inline-flex items-center gap-2',
    square: 'bg-parchment-mute inline-block h-1.5 w-1.5 shrink-0',
  },
  variants: {
    active: {
      true: {
        root: 'text-parchment',
        square: 'bg-amber',
      },
    },
  },
})

export type EyebrowProps = ComponentProps<'p'> &
  VariantProps<typeof eyebrowStyles> & {
    index?: string
  }

export const Eyebrow: React.FC<EyebrowProps> = ({
  active,
  index,
  children,
  className,
  ...props
}) => {
  const { root, square } = eyebrowStyles({ active })

  return (
    <p className={root({ className })} {...props}>
      <span aria-hidden='true' data-square className={square()} />
      {index ? `${index} — ` : null}
      {children}
    </p>
  )
}
```

- [ ] **Step 4: Run the test**

Run: `yarn test src/components/ui/Eyebrow.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Eyebrow.tsx src/components/ui/Eyebrow.test.tsx
git commit -m "feat(ui): add Eyebrow mono label component"
```

---

### Task 6: Button rewrite

**Files:**

- Rewrite: `src/components/ui/Button.tsx`
- Test: `src/components/ui/Button.test.tsx`

**Interfaces:**

- Consumes: nothing new.
- Produces: `Button` (named export, `forwardRef<HTMLButtonElement, ButtonProps>`), `ButtonProps = ComponentProps<'button'> & { variant?: 'primary' | 'accent' | 'secondary' | 'text'; full?: boolean; leftIcon?: ReactNode; rightIcon?: ReactNode }`. Default variant `primary`. The `emphasis` and `radii` props are removed; any caller passing `radii='pill'` or `emphasis` is updated in this task (grep below).

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/Button.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('primary is solid parchment on ink', () => {
    render(<Button>Go</Button>)
    const btn = screen.getByRole('button', { name: 'Go' })
    expect(btn).toHaveClass('bg-parchment', 'text-ink')
    expect(btn.className).not.toMatch(/amber/)
  })

  it('accent is the only amber variant', () => {
    render(<Button variant='accent'>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-amber', 'text-ink')
  })

  it('secondary is an outline in line color', () => {
    render(<Button variant='secondary'>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-line',
      'bg-transparent'
    )
  })

  it('text variant is mono with underline offset', () => {
    render(<Button variant='text'>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass(
      'font-mono',
      'underline-offset-4'
    )
  })

  it('never uses radius above 2px', () => {
    for (const variant of ['primary', 'accent', 'secondary', 'text'] as const) {
      const { unmount } = render(<Button variant={variant}>x</Button>)
      expect(screen.getByRole('button').className).not.toMatch(
        /rounded-(md|lg|xl|2xl|3xl|full|\[)/
      )
      unmount()
    }
  })

  it('renders icons around children', () => {
    render(
      <Button
        leftIcon={<i data-testid='l' />}
        rightIcon={<i data-testid='r' />}
      >
        Go
      </Button>
    )
    expect(screen.getByTestId('l')).toBeInTheDocument()
    expect(screen.getByTestId('r')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('gap-2')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/ui/Button.test.tsx`
Expected: FAIL (old classes `bg-base-gradient`, `rounded-lg`).

- [ ] **Step 3: Rewrite the component**

Replace `src/components/ui/Button.tsx` with:

```tsx
import React, { ComponentProps, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: [
    'inline-flex h-fit shrink-0 items-center justify-center',
    'font-body whitespace-nowrap rounded-sm text-base font-medium leading-none',
    'transition-colors duration-150 ease-out',
    'disabled:cursor-default disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'bg-parchment text-ink hover:bg-parchment-dim px-5 py-3.5',
      accent: 'bg-amber text-ink px-5 py-3.5 hover:brightness-95',
      secondary: [
        'border-line text-parchment border bg-transparent px-5 py-3.5',
        'hover:border-parchment-dim',
      ],
      text: [
        'font-mono rounded-none bg-transparent p-0 text-xs uppercase tracking-[0.08em]',
        'text-parchment-dim hover:text-parchment underline-offset-4 hover:underline',
      ],
    },
    icon: {
      true: 'gap-2',
    },
    full: {
      true: 'w-full',
      false: 'w-fit',
    },
  },
  defaultVariants: {
    variant: 'primary',
    full: false,
  },
})

export type ButtonVariants = VariantProps<typeof buttonStyles>

export type ButtonProps = ComponentProps<'button'> &
  ButtonVariants & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, variant, full, leftIcon, rightIcon, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={buttonStyles({
        className,
        variant,
        icon: leftIcon !== undefined || rightIcon !== undefined,
        full,
      })}
      {...props}
    >
      {leftIcon !== undefined ? leftIcon : null}
      {children}
      {rightIcon !== undefined ? rightIcon : null}
    </button>
  )
})

export { Button }
```

- [ ] **Step 4: Run the test**

Run: `yarn test src/components/ui/Button.test.tsx`
Expected: PASS (6 tests).

- [ ] **Step 5: Fix callers that used removed props**

Run: `grep -rn "radii=\|emphasis=" src`
For each hit, delete the `radii` / `emphasis` prop from the JSX. Then:

Run: `yarn tsc --noEmit -p tsconfig.json 2>&1 | grep -i "button" | head`
Expected: no errors mentioning Button props.

- [ ] **Step 6: Lint + commit**

Run: `yarn lint` — expected exit 0.

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.test.tsx src
git commit -m "feat(ui): rebuild Button with primary/accent/secondary/text variants"
```

---

### Task 7: Card and Terminal components

**Files:**

- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Terminal.tsx`
- Test: `src/components/ui/Card.test.tsx`
- Test: `src/components/ui/Terminal.test.tsx`

**Interfaces:**

- Produces: `Card: React.FC<ComponentProps<'div'> & { as?: 'div' | 'article' | 'li' | 'section' }>` — `bg-ink-2 border border-line rounded-sm`.
- Produces: `Terminal: React.FC<ComponentProps<'section'> & { title: string; path?: string }>` — a frame with a header bar (three dots, mono title, optional mono path) and a mono body slot. Used by Plan 3 for tech-stack / notebook / project stacks.

- [ ] **Step 1: Write the failing tests**

Create `src/components/ui/Card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('is an ink-2 surface with a line border and 2px radius', () => {
    render(<Card data-testid='c'>body</Card>)
    const el = screen.getByTestId('c')
    expect(el).toHaveClass('bg-ink-2', 'border', 'border-line', 'rounded-sm')
    expect(el.className).not.toMatch(/shadow|blur|backdrop/)
  })

  it('can render as another element', () => {
    render(
      <Card as='article' data-testid='c'>
        body
      </Card>
    )
    expect(screen.getByTestId('c').tagName).toBe('ARTICLE')
  })
})
```

Create `src/components/ui/Terminal.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Terminal } from './Terminal'

describe('Terminal', () => {
  it('renders a mono header with title and path', () => {
    render(
      <Terminal title='tech-stack' path='~/felipe'>
        <p>body</p>
      </Terminal>
    )
    const header = screen.getByRole('heading', { name: /tech-stack/ })
    expect(header).toHaveClass('font-mono')
    expect(screen.getByText('~/felipe')).toHaveClass(
      'font-mono',
      'text-parchment-mute'
    )
    expect(screen.getByText('body')).toBeInTheDocument()
  })

  it('draws three window dots', () => {
    render(<Terminal title='t'>x</Terminal>)
    expect(screen.getAllByTestId('terminal-dot')).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run them to verify they fail**

Run: `yarn test src/components/ui/Card.test.tsx src/components/ui/Terminal.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement Card**

Create `src/components/ui/Card.tsx`:

```tsx
import { cn } from '@/lib/utils/cn'
import { ComponentProps, createElement } from 'react'

export type CardProps = ComponentProps<'div'> & {
  as?: 'div' | 'article' | 'li' | 'section'
}

export const Card: React.FC<CardProps> = ({
  as = 'div',
  className,
  children,
  ...props
}) => {
  return createElement(
    as,
    {
      className: cn('rounded-sm border border-line bg-ink-2', className),
      ...props,
    },
    children
  )
}
```

- [ ] **Step 4: Implement Terminal**

Create `src/components/ui/Terminal.tsx`:

```tsx
import { cn } from '@/lib/utils/cn'
import { ComponentProps } from 'react'

export type TerminalProps = ComponentProps<'section'> & {
  path?: string
  title: string
}

export const Terminal: React.FC<TerminalProps> = ({
  title,
  path,
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn('border-line bg-ink-2 rounded-sm border', className)}
      {...props}
    >
      <header className='border-line flex items-center gap-3 border-b px-4 py-2.5'>
        <span className='flex items-center gap-1.5' aria-hidden='true'>
          <i
            data-testid='terminal-dot'
            className='bg-parchment-mute block h-2 w-2 rounded-full'
          />
          <i
            data-testid='terminal-dot'
            className='bg-parchment-mute block h-2 w-2 rounded-full'
          />
          <i
            data-testid='terminal-dot'
            className='bg-parchment-mute block h-2 w-2 rounded-full'
          />
        </span>
        <h3 className='font-mono text-parchment text-xs uppercase tracking-[0.08em]'>
          {title}
        </h3>
        {path ? (
          <span className='font-mono text-parchment-mute ml-auto text-xs'>
            {path}
          </span>
        ) : null}
      </header>
      <div className='font-mono text-parchment-dim p-4 text-sm leading-relaxed'>
        {children}
      </div>
    </section>
  )
}
```

(The window dots are the one place `rounded-full` is allowed: they are 8px circles, not a container radius.)

- [ ] **Step 5: Run the tests**

Run: `yarn test src/components/ui/Card.test.tsx src/components/ui/Terminal.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Card.tsx src/components/ui/Card.test.tsx src/components/ui/Terminal.tsx src/components/ui/Terminal.test.tsx
git commit -m "feat(ui): add Card surface and Terminal frame components"
```

---

### Task 8: Input, TextField, Separator

**Files:**

- Rewrite: `src/components/ui/Input.tsx`
- Modify: `src/components/ui/TextField.tsx`
- Modify: `src/components/ui/Separator.tsx`
- Test: `src/components/ui/Input.test.tsx`

**Interfaces:**

- Produces: `Input` (default export, `forwardRef<HTMLInputElement, InputProps>`, `InputProps = ComponentProps<'input'> & { variant?: 'line' | 'unstyled'; error?: boolean }`). Default `line`: transparent bg, bottom border `line`, focus bottom border `amber`, error bottom border `err`.
- `TextField` keeps its public props (`label`, `variant: 'outlined' | 'standard'`, `error`, `icon`, `inputClassname`) so contact-form callers don't change; its `outlined` variant now renders the bottom-border style.
- `Separator` keeps its props; color becomes `line`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/Input.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  it('default line variant has only a bottom border and amber focus', () => {
    render(<Input aria-label='name' />)
    const el = screen.getByLabelText('name')
    expect(el).toHaveClass(
      'border-b',
      'border-line',
      'bg-transparent',
      'focus:border-amber'
    )
    expect(el.className).not.toMatch(/rounded-(md|lg|xl|4xl)/)
  })

  it('error state uses err color', () => {
    render(<Input aria-label='name' error />)
    expect(screen.getByLabelText('name')).toHaveClass('border-err')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/ui/Input.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Rewrite Input**

Replace `src/components/ui/Input.tsx` with:

```tsx
import { forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  base: [
    'font-body text-parchment relative min-w-0 appearance-none bg-transparent',
    'placeholder:text-parchment-mute focus-visible:outline-none',
    'transition-colors',
  ],
  variants: {
    variant: {
      line: 'border-line focus:border-amber border-b px-0 py-3',
      unstyled: 'border-none',
    },
    error: {
      true: 'border-err text-err placeholder:text-err/70',
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})

type InputVariantProps = VariantProps<typeof styles>

export type InputProps = React.ComponentProps<'input'> & InputVariantProps

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={styles({ variant, error, className })}
        aria-invalid={error || undefined}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
```

- [ ] **Step 4: Update TextField styles**

In `src/components/ui/TextField.tsx`, replace the `textFieldStyles` `tv({...})` definition with:

```tsx
const textFieldStyles = tv({
  slots: {
    wrapper: 'flex w-full flex-col gap-2',
    input: [
      'font-body text-parchment w-full min-w-0 appearance-none bg-transparent',
      'border-line border-b py-3 transition-colors',
      'placeholder:text-parchment-mute focus:border-amber focus:outline-none',
    ],
    label: 'eyebrow-text text-parchment-mute',
  },
  variants: {
    variant: {
      outlined: {},
      standard: {},
    },
    error: {
      true: {
        input: 'border-err text-err placeholder:text-err/70',
        label: 'text-err',
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
})
```

Leave the component body unchanged (it reads `wrapper`, `input`, `label` slots). If the body places the label inline beside the input, keep it — the wrapper is now a column so the label sits above.

- [ ] **Step 5: Update Separator color**

In `src/components/ui/Separator.tsx`, change `` `bg-white data-[alpha=true]:opacity-10` `` to `` `bg-line data-[alpha=true]:opacity-100` `` (the `alpha` prop is kept for API compatibility but the line color already carries the low contrast).

- [ ] **Step 6: Run tests, typecheck, lint**

Run: `yarn test src/components/ui/Input.test.tsx` — expected PASS (2 tests).
Run: `yarn tsc --noEmit -p tsconfig.json 2>&1 | tail -5` — expected no errors.
Run: `yarn lint` — expected exit 0.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/Input.tsx src/components/ui/Input.test.tsx src/components/ui/TextField.tsx src/components/ui/Separator.tsx
git commit -m "feat(ui): bottom-border inputs and line separators"
```

---

### Task 9: Layout shell — Container, RootLayout, Navbar, Footer, Modal

**Files:**

- Modify: `src/components/layout/Container.tsx`
- Modify: `src/components/layout/RootLayout.tsx`
- Modify: `src/components/layout/navbar/desktop/index.tsx`
- Modify: `src/components/layout/navbar/desktop/NavbarDesktopDropdownMenu.tsx`
- Modify: `src/components/layout/navbar/mobile/index.tsx`
- Modify: `src/components/layout/navbar/mobile/NavbarMobileMoreMenu.tsx`
- Modify: `src/components/layout/footer/index.tsx`
- Modify: `src/components/ui/modal/Modal.tsx`
- Delete: `src/components/ui/Gradient.tsx`
- Test: `src/components/layout/Container.test.tsx`

**Interfaces:**

- Consumes: `Button` (Task 6), `Eyebrow` (Task 5), `Separator` (Task 8).
- Produces: `Container` with new prop `grid?: boolean` (default `true`) that draws the 1px vertical `line` borders and four registration marks. `LogoSvg` stays as the navbar mark until Plan 2 delivers `src/assets/ExLibris.tsx` (same props: `React.SVGProps<SVGSVGElement>`).

- [ ] **Step 1: Write the failing Container test**

Create `src/components/layout/Container.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('draws the line grid with registration marks by default', () => {
    render(<Container data-testid='c'>x</Container>)
    const el = screen.getByTestId('c')
    expect(el).toHaveClass('border-x', 'border-line')
    expect(el.querySelectorAll('[data-reg-mark]')).toHaveLength(4)
  })

  it('can opt out of the grid', () => {
    render(
      <Container grid={false} data-testid='c'>
        x
      </Container>
    )
    const el = screen.getByTestId('c')
    expect(el).not.toHaveClass('border-x')
    expect(el.querySelectorAll('[data-reg-mark]')).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/layout/Container.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Rewrite Container**

Replace `src/components/layout/Container.tsx` with:

```tsx
import { cn } from '@/lib/utils/cn'
import { ComponentProps } from 'react'

type ContainerProps = ComponentProps<'div'> & {
  grid?: boolean
}

const markBase = 'pointer-events-none absolute h-3 w-3 border-line'

const marks = [
  'left-0 top-0 border-l border-t -translate-x-px -translate-y-px',
  'right-0 top-0 border-r border-t translate-x-px -translate-y-px',
  'bottom-0 left-0 border-b border-l -translate-x-px translate-y-px',
  'bottom-0 right-0 border-b border-r translate-x-px translate-y-px',
]

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  grid = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative mx-auto max-w-screen-wide',
        grid && 'border-line border-x',
        className
      )}
      {...props}
    >
      {grid
        ? marks.map((m) => (
            <span
              key={m}
              data-reg-mark
              aria-hidden='true'
              className={cn(markBase, m)}
            />
          ))
        : null}
      {children}
    </div>
  )
}

export default Container
```

- [ ] **Step 4: Run the Container test**

Run: `yarn test src/components/layout/Container.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Remove Gradient from RootLayout and delete it**

Replace `src/components/layout/RootLayout.tsx` with:

```tsx
import LogoSvg from '@/assets/Logo'
import Link from 'next/link'
import Container from './Container'
import Footer from './footer'
import NavbarDesktop from './navbar/desktop'
import NavbarMobile from './navbar/mobile'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative z-0 px-4 pb-20 mobile:pb-0'>
      <Container className='px-4 pt-8 mobile:px-8'>
        <div className='mx-auto mb-28 w-fit mobile:hidden'>
          <Link href='/' aria-label='Home'>
            <LogoSvg className='text-parchment-dim hover:text-parchment mx-auto h-8 w-12 transition-colors' />
          </Link>
        </div>

        <NavbarDesktop />
        {children}
        <Footer />
      </Container>
      <NavbarMobile />
    </div>
  )
}

export default RootLayout
```

Then:

```bash
git rm src/components/ui/Gradient.tsx
grep -rn "Gradient" src
```

Expected: grep returns nothing (if `HomeGetToKnowSection` or another file imports it, remove that import and usage — it is a decorative element only).

- [ ] **Step 6: Desktop navbar — no blur, line border**

In `src/components/layout/navbar/desktop/index.tsx`:

Replace the `iconButtonStyles` base with:

```tsx
const iconButtonStyles = tv({
  base: [
    'flex h-10 w-10 items-center justify-center',
    'text-parchment-dim cursor-pointer rounded-sm text-xl',
    'hover:bg-ink-2 hover:text-parchment transition-colors',
  ],
})
```

Replace the `<nav className={twMerge('mb-44 hidden h-fit max-h-[3.75rem] w-full justify-between rounded-xl bg-onyx/30 p-4 backdrop-blur-sm mobile:flex', className)}>` line with:

```tsx
    <nav
      className={twMerge(
        'mb-44 hidden h-fit w-full items-center justify-between border-b border-line py-4 mobile:flex',
        className
      )}
    >
```

Change the logo class `text-white ... hover:text-gray-light` to `text-parchment transition-colors hover:text-parchment-dim` (the Task 4 sed may have already produced `text-parchment`).

- [ ] **Step 7: Desktop dropdown — no blur**

In `NavbarDesktopDropdownMenu.tsx`, replace the `motion.div` className `'absolute right-0 top-[calc(100%+1rem)] flex flex-col gap-4 rounded-b-xl bg-onyx/50 p-4'` with:

```tsx
'absolute right-0 top-[calc(100%+0.5rem)] z-20 flex min-w-40 flex-col gap-3 rounded-sm border border-line bg-ink-2 p-4'
```

Add the `Notebook` link so navigation matches the site's routes:

```tsx
<Link href='/notebook'>
  <Button variant='text' onClick={onCloseMenu}>
    Notebook
  </Button>
</Link>
```

(place it after Bookshelf).

- [ ] **Step 8: Mobile navbar — no blur**

In `src/components/layout/navbar/mobile/index.tsx`, in `navbarMobileStyles.slots.nav`, replace

```tsx
      'bg-onyx/80 ring-1 ring-nav-border/60 backdrop-blur-sm blur-performance',
      'flex h-[3.75rem] items-center justify-between rounded-2xl px-2.5 py-2',
```

with

```tsx
      'border border-line bg-ink-2',
      'flex h-[3.75rem] items-center justify-between rounded-sm px-2.5 py-2',
```

and in `slots.item` replace `'rounded-lg text-gray-light outline-none'` (or `text-parchment` after sed) with `'rounded-sm text-parchment-dim outline-none'` and `'data-[active=true]:bg-white/10 data-[active=true]:text-white'` with `'data-[active=true]:bg-ink data-[active=true]:text-parchment'`. In the `active` variant, `nav: 'rounded-t-none border-t-0'` stays.

Open `src/components/layout/navbar/mobile/NavbarMobileMoreMenu.tsx` and remove any `backdrop-blur*`, `bg-onyx/*` → `bg-ink-2`, `rounded-(xl|2xl|t-2xl)` → `rounded-sm`/`rounded-t-sm`, `ring-nav-border*` → `border border-line`. Verify:

```bash
grep -n "backdrop-blur\|rounded-xl\|rounded-2xl\|onyx\|nav-border" src/components/layout/navbar -r
```

Expected: no output.

- [ ] **Step 9: Footer — mono meta and line separator**

In `src/components/layout/footer/index.tsx`:

- Change the paragraph `'text-xl font-medium leading-normal text-white/40'` (or `text-parchment/40`) to `'font-serif text-xl italic text-parchment-dim'`.
- Change the `<small className='mt-auto select-none text-sm leading-normal text-white/40'>` to `<small className='mt-auto select-none font-mono text-xs uppercase tracking-[0.08em] text-parchment-mute'>`.
- Change both `<b className='mb-4 font-bold'>Links</b>` / `Elsewhere` to `<Eyebrow className='mb-4'>Links</Eyebrow>` / `<Eyebrow className='mb-4'>Elsewhere</Eyebrow>` and add `import { Eyebrow } from '@/components/ui/Eyebrow'`.
- Add `Bookshelf` and `Notebook` links to the Links column (after Tech Stack) using `FooterLinkButton` with `href='/bookshelf'` / `'/notebook'`.
- Change `<LogoSvg className='h-[60px] w-[92px]' />` to `<LogoSvg className='h-[60px] w-[92px] text-parchment' />`.

- [ ] **Step 10: Modal — no backdrop blur**

In `src/components/ui/modal/Modal.tsx`, replace the `cn([...])` array in the `<dialog>` with:

```tsx
      className={cn([
        'overflow-y-auto bg-ink-2 absolute-center',
        'mx-auto max-h-full w-full max-w-screen-tablet',
        'pointer-events-none opacity-0 transition-opacity',
        'border border-line tablet:max-h-[90%] tablet:rounded-sm',
        'backdrop:bg-ink/80',
        'open:pointer-events-auto open:opacity-100',
      ])}
```

Change the close button `x` to use mono: `<button type='reset' onClick={closeModal} className='font-mono text-xs uppercase tracking-[0.08em] text-parchment-dim hover:text-parchment' aria-label='Close'>esc</button>`.

Check `src/components/ui/modal/ModalContent.tsx` for `backdrop-blur`/`bg-onyx`/`rounded-xl` and apply the same replacements.

- [ ] **Step 11: Verify no banned utilities remain in the shell and UI**

```bash
grep -rn "backdrop-blur\|bg-base-gradient\|shadow-button\|shadow-dropdown\|rounded-\(md\|lg\|xl\|2xl\|3xl\|4xl\|\[2\|\[2.5\)" src/components/layout src/components/ui
```

Expected: no output.

- [ ] **Step 12: Build, test, lint**

Run: `yarn build 2>&1 | tail -15` — expected success.
Run: `yarn test` — expected all green.
Run: `yarn lint` — expected exit 0.

- [ ] **Step 13: Commit**

```bash
git add src/components/layout src/components/ui/modal src/components/ui/Gradient.tsx src/components/layout/Container.test.tsx
git commit -m "feat(layout): line-grid container, blur-free navbar/footer/modal, drop Gradient"
```

---

### Task 10: Visual verification and mechanical design check

**Files:**

- None created; screenshots go to `.impeccable/screens/` (gitignored — add the folder to `.gitignore`).

**Interfaces:**

- Consumes: the whole foundation.
- Produces: a green `next build`, screenshots for the reviewer, and a detector report; nothing else.

- [ ] **Step 1: Add the screenshots folder to `.gitignore`**

Append to `.gitignore`:

```
.impeccable/screens/
.serena/
```

- [ ] **Step 2: Run the dev server and capture desktop + mobile**

Run in background: `yarn dev`
Then, using the Chrome MCP tools (`mcp__claude-in-chrome__*`) or the `run` skill, open `http://localhost:3000`, `/about`, `/projects`, `/contact` at 1440px and at 390px width and save screenshots to `.impeccable/screens/foundation-<route>-<width>.png`.

What to look for (fix in this task if it's a foundation bug, otherwise note it for Plan 3):

- Body text is `parchment` on `ink`; no pure white anywhere.
- H1/H2 render in Anton, uppercase; eyebrows in Departure Mono.
- Navbar has no blur, has a bottom `line`; mobile navbar is an `ink-2` box with `line` border.
- Container shows the vertical `line` borders and four corner marks.
- No amber except focus rings (tab through the page once).

- [ ] **Step 3: Run the Impeccable detector once**

```bash
node /Users/felipemateus/.claude/plugins/cache/impeccable/impeccable/4.0.4/skills/impeccable/scripts/detect.mjs --json src/components src/styles tailwind.config.js > .impeccable/screens/detector-foundation.json; cat .impeccable/screens/detector-foundation.json | head -60
```

Fix findings that are mechanical (banned blur/shadow/gradient/radius, missing focus style). Leave page-level findings for Plan 3 and list them in the commit body.

- [ ] **Step 4: Commit**

```bash
git add .gitignore src
git commit -m "chore(rebrand): foundation visual check and detector fixes"
```

---

## Self-review notes

- **Spec coverage (Plan 1 scope only):** §4.1 color → Tasks 2, 4. §4.2 typography → Tasks 3, 4. §4.4 layout language (line grid, eyebrow, cards, buttons, navbar without blur, terminal windows, forms) → Tasks 5–9. §5 effects and §3/§4.3/§6 (scenes, ex-libris, dither, CRT) → **Plan 2 / Plan 3**, not here. §7 removal pass → partially here (Gradient, Nanum, Calibri, gradient/shadow tokens); 3DCard/BentoGrid/TextGeneratorEffect/Sun/Moon/keyframes stay until Plan 3 because pages still import them.
- **Type consistency:** `Eyebrow` (named export), `Button` (named export), `Card`/`Terminal` (named), `Input` (default export, matches the current file), `Container` (default). `BrandColors` replaces `IColors`.
- **Known interim state:** after Task 4's sed, pages use the new palette but keep old layouts; `HomeHero` still uses `TextGenerateEffect`, and Projects/Home still use `3DCard`. That is by design — Plan 3 rebuilds them.

## What Plans 2 and 3 will cover (for orientation, not execution)

- **Plan 2 — Assets:** `scripts/dither.ts` (sharp, Bayer 8×8, F–S option, fixed params, tests on a synthetic gradient), Higgsfield base prompt + 4 archetype variants + user choice, character poses, 7 scenes, `src/assets/ExLibris.tsx` (SVG, 3 sizes), OG/favicon/apple-icon regeneration.
- **Plan 3 — Pages:** direction contract comment in root layout, display font comps, home hero with `crt-warp`, each page redesigned on the new components, new copy (needs Felipe's project numbers and the "avulso" year), metadata, removal of 3DCard/BentoGrid/TextGeneratorEffect/Sun/Moon/unused keyframes/old utilities, Impeccable finish review + documenter → `DESIGN.md`.
