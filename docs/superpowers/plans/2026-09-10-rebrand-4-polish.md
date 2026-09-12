# Rebrand Plan 4 — Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the new identity production-ready — legible text over every scene, one grid language across the whole site, a motion system that belongs to ink and terminals, ink↔color images, and honest Bookshelf states — without touching the About layout (Plan 5).

**Architecture:** Six independent changes, each shipped with its tests: (1) color roles and dialog-scoped display headings in the base layer; (2) a `.rule-t/.rule-b` utility that draws full-bleed horizontal lines with pseudo-elements; (3) a motion system made of one client component (`PrintFrame`), one hook (`useReveal`), two components (`Typewriter`, the `reveal` flag on `Scene`) and CSS gated on `html[data-js]`/`html[data-print]`; (4) a second dither manifest producing `public/dither/*` plus an `InkImage` component with `hover`/`toggle` modes; (5) a new `bookshelf-empty` scene and a `BookshelfState` component; (6) documents. No new dependencies.

**Tech Stack:** Next.js 16.1 App Router (`reactStrictMode: true`), React 19.2, Tailwind 3.3 + tailwind-variants, Vitest 3 + Testing Library (globals on, jsdom, jest-dom), `sharp` 0.33 (already a dependency; reads PNG and SVG), pnpm 10, headless + real Chrome for the visual pass.

**Spec:** `docs/superpowers/specs/2026-09-10-rebrand-4-polish-design.md` (this plan's authority; section numbers below refer to it). It amends `docs/superpowers/specs/2026-09-07-brand-identity-design.md`. Product truth: `PRODUCT.md`. Prior handoff: `docs/superpowers/plans/2026-09-08-rebrand-3-pages.md` § Execution status.

## Global Constraints

- Dark-only; tokens only: `ink`, `ink-2`, `line`, `parchment`, `parchment-dim`, `parchment-mute`, `amber`, `amber-dim`, `ok`, `err`. **Token values never change** (`src/styles/colors.ts`, `colors.test.ts` untouched).
- **Amber at most once per viewport** — Home = hero CTA (`Button variant='accent'`), Contact = the wax-seal ex-libris, every other page none (focus rings excepted). No `<Eyebrow active>` on pages.
- **`parchment-mute` is never a text color** (spec §1.1). Tertiary text is `parchment-dim`. Allowed `parchment-mute`: `placeholder:`-prefixed classes, `disabled:`-prefixed classes, the `Eyebrow` square, decorative icons and dots.
- Typography: `display-1`/`display-2` apply to `h1`/`h2` **outside `<dialog>`** only (spec §1.3); `eyebrow-text` for labels; `font-serif italic` for human-voice asides.
- Scenes and dithered layers render with `<img>` — never `next/image` — `image-rendering: pixelated`, `aria-hidden`, under an ink→transparent scrim. `next/image` is fine for color photos/screenshots.
- Lines: horizontal structural lines are full-bleed via `.rule-t`/`.rule-b`; verticals are the `Container`; box borders stay in their boxes (spec §2).
- Motion (spec §3): CSS first; JS only observes and sets data attributes; nothing hidden before hydration (every "before" state gated on `html[data-js]`); `@media (prefers-reduced-motion: reduce)` disables everything; frame prints once per session, content reveals every page; no page transitions; no loops except the 4 px drift and the typing cursor.
- Banned: `backdrop-blur`, gradients other than ink→transparent scrims, shadows, radius > 2px (stack chips excepted), framer-motion, new dependencies, hover motion beyond spec §4.3.
- Voice: first person, direct, no clichés, English UI copy, never invent a number. Copy in this plan is fixed.
- Gates before every commit: `pnpm test`, `pnpm lint` (0 errors), `pnpm exec tsc --noEmit`; `pnpm build` at Tasks 6, 8, 10, 12. Conventional Commits, one commit per task, never `--no-verify`. No comments narrating what code does. Never leave temp `.ts/.tsx` files anywhere (eslint scans git-ignored dirs). Kill servers with `pkill -f next-server`. `art/**` is Git LFS (`git lfs pull` before Task 9). Prettier runs on commit and may reorder class tokens — order is never load-bearing.

## Preconditions

1. Branch: `git fetch origin && git checkout -b feature/rebrand-polish origin/docs/rebrand-plan-4-spec` (that branch = `dev` + the spec and this plan; merge it into `dev` via PR when the plan is done). 109 tests green.
2. Task 9 (scene generation) needs the Higgsfield MCP tools and runs in the **main session**; every other task is subagent-safe. Task 12 needs a real Chrome (`claude-in-chrome`) and headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
3. Felipe's new color portrait: if `art/source/portrait.png` does not exist when Task 7 runs, the task uses `public/assets/me-green-shirt.png` as the portrait source and Felipe swaps the file later (re-run `pnpm dither`).

---

## File map

| Path                                                                                                                                                                                                                                                                                                                                          | Action        | Responsibility                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------- |
| `src/styles/global.css`                                                                                                                                                                                                                                                                                                                       | modify        | Dialog-scoped display headings; `.rule-*`; motion CSS; reduced-motion block |
| `src/styles/roles.test.ts`                                                                                                                                                                                                                                                                                                                    | create        | Source-level guards: no mute text, no structural `border-*` lines           |
| `src/styles/tailwind.test.ts`                                                                                                                                                                                                                                                                                                                 | modify        | Compiled-CSS assertions for §1.3, §2.2, §3                                  |
| `src/components/ui/{Eyebrow,Scene,Terminal,TextField}.tsx`, `src/components/layout/footer/index.tsx`, `src/app/contact/_components/ContactForm.tsx`, `src/app/projects/_components/ProjectsCard.tsx`, `src/app/tech-stack/_components/TechStackCard.tsx`                                                                                      | modify        | Text roles (§1.1), scrim (§1.2)                                             |
| `src/components/Resume.tsx` (+ test)                                                                                                                                                                                                                                                                                                          | modify        | `<h2>` name                                                                 |
| `src/components/layout/navbar/desktop/index.tsx`, `src/components/ui/PageHero.tsx`, `src/app/(home)/_components/{HomeHero,HomeSelectedWorkSection,HomeGetToKnowSection,HomeGetInTouchSection}.tsx`, `src/app/about/_components/AboutContent.tsx`, `src/app/tech-stack/_components/TechStackGroupTitle.tsx`, `src/components/ui/Separator.tsx` | modify        | Full-bleed rules (§2.3)                                                     |
| `src/components/effects/PrintFrame.tsx` (+ test), `src/components/layout/RootLayout.tsx`, `src/components/layout/Container.tsx`                                                                                                                                                                                                               | create/modify | Frame prints once per session (§3.2)                                        |
| `src/hooks/useReveal.ts` (+ test), `src/components/ui/Reveal.tsx`                                                                                                                                                                                                                                                                             | create        | Content prints (§3.3)                                                       |
| `src/components/ui/Scene.tsx`                                                                                                                                                                                                                                                                                                                 | modify        | `reveal` (§3.4)                                                             |
| `src/components/ui/Typewriter.tsx` (+ test)                                                                                                                                                                                                                                                                                                   | create        | Terminal typing (§3.5)                                                      |
| `scripts/dither/manifest.ts`, `scripts/dither.ts`, `src/configs/dither.generated.ts` (+ test), `public/dither/*`                                                                                                                                                                                                                              | modify/create | Ink↔color assets (§4.1)                                                     |
| `src/components/ui/InkImage.tsx` (+ test), `src/app/about/_components/AboutPortrait.tsx`, `src/app/projects/_components/ProjectsCard.tsx`                                                                                                                                                                                                     | create/modify | Ink↔color (§4.2–4.3)                                                        |
| `art/source/bookshelf-empty.png` (LFS), `art/PROMPTS.md`, `public/scenes/bookshelf-empty.*`, `src/configs/scenes.generated.ts`                                                                                                                                                                                                                | create/modify | New scene (§5.1)                                                            |
| `src/app/bookshelf/_components/BookshelfState.tsx` (+ test), `BookshelfItems.tsx`, `src/app/bookshelf/error.tsx`                                                                                                                                                                                                                              | create/modify | Bookshelf states (§5.2)                                                     |
| Brand spec, `PRODUCT.md`, this plan                                                                                                                                                                                                                                                                                                           | modify        | Documents (§6.3)                                                            |

---

### Task 1: Text color roles, scrim, and dialog-scoped display headings (spec §1)

**Files:**

- Modify: `src/components/ui/Eyebrow.tsx:6`, `src/components/ui/TextField.tsx:15`, `src/components/ui/Terminal.tsx:29`, `src/components/ui/Scene.tsx:56-58`, `src/components/layout/footer/index.tsx:37`, `src/app/contact/_components/ContactForm.tsx:105,133`, `src/app/projects/_components/ProjectsCard.tsx:21`, `src/app/tech-stack/_components/TechStackCard.tsx:21`, `src/styles/global.css` (the `h1`/`h2` base rules), `src/components/Resume.tsx:33`
- Create: `src/styles/roles.test.ts`, `src/components/Resume.test.tsx`
- Modify: `src/styles/tailwind.test.ts`

**Interfaces:**

- Produces: no API change. `Eyebrow` root text is `parchment-dim`; the square stays `parchment-mute`. Base CSS: `h1:not(dialog *)`, `h2:not(.eyebrow-text):not(dialog *)`. `Scene` top scrim: `h-1/2 bg-gradient-to-b from-ink via-ink/80 via-50% to-transparent`.

- [ ] **Step 1: Failing tests**

`src/styles/roles.test.ts`:

```ts
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(__dirname, '..')

export const tsxFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return tsxFiles(full)
    return full.endsWith('.tsx') && !full.endsWith('.test.tsx') ? [full] : []
  })

const MUTE_TEXT = /(?<![:\w-])text-parchment-mute\b/

describe('color roles', () => {
  it('never uses parchment-mute as a text color', () => {
    const offenders = tsxFiles(SRC).filter((file) => {
      const source = readFileSync(file, 'utf8')
      return source
        .split('\n')
        .some(
          (line) => MUTE_TEXT.test(line) && !/placeholder:|disabled:/.test(line)
        )
    })
    expect(offenders.map((f) => f.replace(SRC, 'src'))).toEqual([])
  })
})
```

(The negative look-behind lets `placeholder:text-parchment-mute` and `disabled:text-parchment-mute` through; `bg-parchment-mute` on squares/dots never matches because of `text-`.)

`src/components/Resume.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Resume from './Resume'

describe('Resume', () => {
  it('leads with a level-2 heading so the host page keeps a single h1', () => {
    render(<Resume />)
    expect(
      screen.getByRole('heading', { level: 2, name: /FELIPE MATEUS/ })
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })
})
```

Append to `src/styles/tailwind.test.ts` (inside `describe('tailwind theme')`, reusing its `readFileSync`/`postcss` setup from the `global.css` test added in commit `e414d6d`):

```ts
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
```

Run: `pnpm test src/styles src/components/Resume.test.tsx` → FAIL: `roles` lists eight offenders; `Resume` finds no level-2 heading; the CSS test finds a bare `h1 {`.

- [ ] **Step 2: Text roles**

Apply exactly these replacements:

| File:line              | From                                                                         | To                                                                          |
| ---------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Eyebrow.tsx:6`        | `root: 'inline-flex items-center gap-2 text-parchment-mute eyebrow-text'`    | `root: 'inline-flex items-center gap-2 text-parchment-dim eyebrow-text'`    |
| `TextField.tsx:15`     | `label: 'text-parchment-mute eyebrow-text'`                                  | `label: 'text-parchment-dim eyebrow-text'`                                  |
| `Terminal.tsx:29`      | `'ml-auto font-mono text-xs text-parchment-mute'`                            | `'ml-auto font-mono text-xs text-parchment-dim'`                            |
| `footer/index.tsx:37`  | `'mt-auto flex select-none flex-col gap-1 text-parchment-mute eyebrow-text'` | `'mt-auto flex select-none flex-col gap-1 text-parchment-dim eyebrow-text'` |
| `ContactForm.tsx:105`  | `className='text-parchment-mute eyebrow-text'` (the `Message` label)         | `className='text-parchment-dim eyebrow-text'`                               |
| `ContactForm.tsx:133`  | `className='text-parchment-mute eyebrow-text'` (the ⌘/Ctrl hint)             | `className='text-parchment-dim eyebrow-text'`                               |
| `ProjectsCard.tsx:21`  | `<span className='text-parchment-mute eyebrow-text'>{label}</span>`          | `<span className='text-parchment-dim eyebrow-text'>{label}</span>`          |
| `TechStackCard.tsx:21` | `label: 'text-parchment-mute eyebrow-text'`                                  | `label: 'text-parchment-dim eyebrow-text'`                                  |

`TechStackCard.tsx:17` — the arrow icon slot `'absolute right-4 top-4 hidden text-xl text-parchment-mute mobile:block'` becomes `'absolute right-4 top-4 hidden text-xl text-parchment-dim mobile:block'`: the arrow is a hover affordance, and `dim` keeps the roles test's regex free of an icon exception.

- [ ] **Step 3: Scrim and headings**

`src/components/ui/Scene.tsx` — replace the top scrim `div`:

```tsx
{
  scrim === 'both' ? (
    <div
      data-scrim
      className='absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ink via-ink/80 via-50% to-transparent'
    />
  ) : null
}
```

`src/styles/global.css` — replace

```css
h1 {
  @apply display-1;
}

h2:not(.eyebrow-text) {
  @apply display-2;
}
```

with

```css
h1:not(dialog *) {
  @apply display-1;
}

h2:not(.eyebrow-text):not(dialog *) {
  @apply display-2;
}
```

`src/components/Resume.tsx:33`: `<h1 className={name()}>` → `<h2 className={name()}>` (closing tag too).

- [ ] **Step 4: Tests pass, gates, commit**

Run: `pnpm test` → all green (existing `Eyebrow.test.tsx` asserts `eyebrow-text` and the square's `bg-parchment-mute` — unchanged). `pnpm lint && pnpm exec tsc --noEmit`.

```bash
git add src/styles src/components/ui src/components/Resume.tsx src/components/Resume.test.tsx src/components/layout/footer src/app/contact src/app/projects src/app/tech-stack
git commit -m "fix(brand): parchment-mute is decorative only, display headings stay out of dialogs"
```

---

### Task 2: Full-bleed structural lines (spec §2)

**Files:**

- Modify: `src/styles/global.css` (`@layer utilities`), `src/components/layout/navbar/desktop/index.tsx`, `src/components/ui/PageHero.tsx`, `src/app/(home)/_components/HomeHero.tsx`, `HomeSelectedWorkSection.tsx`, `HomeGetToKnowSection.tsx`, `HomeGetInTouchSection.tsx`, `src/app/about/_components/AboutContent.tsx` (`Block`), `src/app/tech-stack/_components/TechStackGroupTitle.tsx`, `src/components/layout/footer/index.tsx`, `src/components/ui/Separator.tsx`
- Modify: `src/styles/tailwind.test.ts`, `src/styles/roles.test.ts`

**Interfaces:**

- Produces: CSS utilities `.rule-t` (line at top) and `.rule-b` (line at bottom); each sets `position: relative` on the element. Task 3 animates `.rule-t::before`/`.rule-b::after`.

- [ ] **Step 1: Failing tests**

Append to `tailwind.test.ts`:

```ts
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
```

Append to `roles.test.ts`:

```ts
const STRUCTURAL = [
  'components/layout/navbar/desktop/index.tsx',
  'components/ui/PageHero.tsx',
  'app/(home)/_components/HomeHero.tsx',
  'app/(home)/_components/HomeSelectedWorkSection.tsx',
  'app/(home)/_components/HomeGetToKnowSection.tsx',
  'app/(home)/_components/HomeGetInTouchSection.tsx',
  'app/about/_components/AboutContent.tsx',
  'app/tech-stack/_components/TechStackGroupTitle.tsx',
  'components/layout/footer/index.tsx',
]

describe('structural lines', () => {
  it('are full-bleed rules, not element borders', () => {
    const offenders = STRUCTURAL.filter((rel) =>
      /border-[tb] border-line/.test(readFileSync(join(SRC, rel), 'utf8'))
    )
    expect(offenders).toEqual([])
  })
})
```

Run: `pnpm test src/styles` → FAIL (no utilities; nine offenders).

- [ ] **Step 2: The utility**

In `src/styles/global.css`, inside the existing `@layer utilities` block (before the reduced-motion `@media`):

```css
.rule-t,
.rule-b {
  position: relative;
}
.rule-t::before,
.rule-b::after {
  content: '';
  position: absolute;
  left: 50%;
  width: 100vw;
  height: 1px;
  transform: translateX(-50%);
  background: theme('colors.line');
}
.rule-t::before {
  top: 0;
}
.rule-b::after {
  bottom: 0;
}
```

- [ ] **Step 3: Apply**

- `navbar/desktop/index.tsx`: in the `<nav>` class string replace `border-b border-line` with `rule-b`.
- `PageHero.tsx`: in the `<section>` class string replace `border-b border-line` with `rule-b`.
- `HomeHero.tsx`: same replacement on its `<section>`.
- `HomeSelectedWorkSection.tsx`, `HomeGetToKnowSection.tsx`: `border-b border-line` → `rule-b`. `HomeGetInTouchSection.tsx` has no border (it is the last section before the footer) — leave it.
- `AboutContent.tsx` `Block`: `border-t border-line` → `rule-t`.
- `TechStackGroupTitle.tsx`: `border-t border-line` → `rule-t`.
- `footer/index.tsx`: remove `<Separator screen />` and the `Separator` import; add `rule-t` to the `<footer>` class string (it already has `relative`).
- `Separator.tsx`: delete the `screen` prop, its type, the `data-[screen=true]:*` classes and `data-screen`. Then `grep -rn "Separator" src` — if only the definition remains, delete `src/components/ui/Separator.tsx`; if a caller remains, keep the simplified component.

Because `.rule-*` set `position: relative`, elements that were `relative z-0` stay correct (`z-0` remains in their class list).

- [ ] **Step 4: Tests, gates, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit`.

```bash
git add src/styles src/components src/app
git commit -m "feat(grid): full-bleed horizontal rules across navbar, heroes, sections and footer"
```

---

### Task 3: The frame prints once per session (spec §3.2)

**Files:**

- Create: `src/components/effects/PrintFrame.tsx`, `src/components/effects/PrintFrame.test.tsx`
- Modify: `src/components/layout/RootLayout.tsx`, `src/components/layout/Container.tsx`, `src/styles/global.css`

**Interfaces:**

- Produces: `PrintFrame: React.FC` (client, renders `null`), rendered once in `RootLayout`. Side effects on mount: `document.documentElement.dataset.js = ''`; if `sessionStorage.printed` is absent → set it, assign `--rule-i` to every `.rule-t, .rule-b` in DOM order, then `document.documentElement.dataset.print = ''`. Storage errors → behave as already printed. CSS keyframe `rule-draw`; Container marks get class `reg-mark`.

- [ ] **Step 1: Failing test**

`src/components/effects/PrintFrame.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { PrintFrame } from './PrintFrame'

const html = () => document.documentElement

beforeEach(() => {
  delete html().dataset.js
  delete html().dataset.print
  document.body.innerHTML =
    '<div class="rule-b"></div><div class="rule-t"></div>'
  window.sessionStorage.clear()
})

describe('PrintFrame', () => {
  it('marks js and prints the frame on the first page of a session', () => {
    render(<PrintFrame />)
    expect(html().dataset.js).toBe('')
    expect(html().dataset.print).toBe('')
    expect(window.sessionStorage.getItem('printed')).toBe('1')
    const rules = document.querySelectorAll<HTMLElement>('.rule-b, .rule-t')
    expect(rules[0].style.getPropertyValue('--rule-i')).toBe('0')
    expect(rules[1].style.getPropertyValue('--rule-i')).toBe('1')
  })

  it('does not print again later in the session', () => {
    window.sessionStorage.setItem('printed', '1')
    render(<PrintFrame />)
    expect(html().dataset.js).toBe('')
    expect(html().dataset.print).toBeUndefined()
  })

  it('treats blocked storage as already printed', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<PrintFrame />)
    expect(html().dataset.js).toBe('')
    expect(html().dataset.print).toBeUndefined()
    vi.restoreAllMocks()
  })
})
```

Run: `pnpm test src/components/effects/PrintFrame.test.tsx` → FAIL (module missing).

- [ ] **Step 2: `PrintFrame.tsx`**

```tsx
'use client'

import { useEffect } from 'react'

const KEY = 'printed'

const firstPageOfSession = () => {
  try {
    if (window.sessionStorage.getItem(KEY)) return false
    window.sessionStorage.setItem(KEY, '1')
    return true
  } catch {
    return false
  }
}

export const PrintFrame: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement
    root.dataset.js = ''
    if (!firstPageOfSession()) return
    document
      .querySelectorAll<HTMLElement>('.rule-t, .rule-b')
      .forEach((rule, i) => rule.style.setProperty('--rule-i', String(i)))
    root.dataset.print = ''
  }, [])

  return null
}
```

- [ ] **Step 3: Mount and style**

`src/components/layout/RootLayout.tsx`: import `{ PrintFrame } from '@/components/effects/PrintFrame'` and render `<PrintFrame />` as the first child of the outer `<div>`.

`src/components/layout/Container.tsx`: add `reg-mark` to `markBase`: `'reg-mark pointer-events-none absolute h-3 w-3 border-line'`.

`src/styles/global.css` — in `@layer utilities`, after the `.rule-*` rules:

```css
html[data-print] .rule-t::before,
html[data-print] .rule-b::after {
  transform-origin: left;
  animation: rule-draw 400ms ease-out both;
  animation-delay: calc(var(--rule-i, 0) * 60ms);
}
html[data-print] .reg-mark {
  animation: mark-in 200ms ease-out both;
  animation-delay: 900ms;
}
```

and at file end, next to `scene-drift`:

```css
@keyframes rule-draw {
  from {
    transform: translateX(-50%) scaleX(0);
  }
  to {
    transform: translateX(-50%) scaleX(1);
  }
}

@keyframes mark-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

(`transform` in the keyframes keeps the `translateX(-50%)` centering; `scaleX` never affects layout.)

- [ ] **Step 4: Tests, gates, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit`.

```bash
git add src/components/effects/PrintFrame.tsx src/components/effects/PrintFrame.test.tsx src/components/layout src/styles/global.css
git commit -m "feat(motion): the grid draws itself on the first page of a session"
```

---

### Task 4: Content prints on every page — `useReveal` and `.print-in` (spec §3.3)

**Files:**

- Create: `src/hooks/useReveal.ts`, `src/hooks/useReveal.test.tsx`, `src/components/ui/Reveal.tsx`
- Modify: `src/styles/global.css`, `src/app/(home)/_components/HomeGetToKnowSection.tsx`, `src/app/projects/_components/ProjectsCard.tsx`, `src/app/about/_components/AboutContent.tsx`, `src/app/tech-stack/_components/TechStackGroup.tsx`, `src/app/notebook/_components/NotebookInProgress.tsx`, `src/app/contact/_components/ContactFormContainer.tsx`

**Interfaces:**

- Produces: `useReveal<T extends HTMLElement>(): React.RefObject<T | null>` — sets `data-revealed=''` on the element once it intersects; `Reveal: React.FC<{ as?: 'div' | 'li' | 'article' | 'section'; index?: number; className?: string; children }>` (client) — renders the element with `print-in`, `ref` from `useReveal`, and `style={{ '--reveal-i': index }}`. Task 10 wraps `BookshelfState` in it.

- [ ] **Step 1: Failing test**

`src/hooks/useReveal.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { act } from 'react'
import { Reveal } from '@/components/ui/Reveal'

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void
let callback: Callback
const disconnect = vi.fn()

beforeEach(() => {
  disconnect.mockClear()
  window.IntersectionObserver = vi.fn((cb: Callback) => {
    callback = cb
    return { observe: vi.fn(), disconnect, unobserve: vi.fn() }
  }) as unknown as typeof IntersectionObserver
})

describe('Reveal', () => {
  it('marks the element revealed once it intersects, then disconnects', () => {
    const { container } = render(<Reveal index={2}>hello</Reveal>)
    const el = container.firstElementChild as HTMLElement
    expect(el).toHaveClass('print-in')
    expect(el.dataset.revealed).toBeUndefined()
    expect(el.style.getPropertyValue('--reveal-i')).toBe('2')
    act(() => callback([{ isIntersecting: true }]))
    expect(el.dataset.revealed).toBe('')
    expect(disconnect).toHaveBeenCalled()
  })
})
```

Run → FAIL (modules missing).

- [ ] **Step 2: Hook and component**

`src/hooks/useReveal.ts`:

```ts
import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        el.dataset.revealed = ''
        observer.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

`src/components/ui/Reveal.tsx`:

```tsx
'use client'

import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils/cn'
import { CSSProperties, createElement } from 'react'

type RevealProps = {
  as?: 'div' | 'li' | 'article' | 'section'
  index?: number
  className?: string
  children: React.ReactNode
}

export const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  index = 0,
  className,
  children,
}) => {
  const ref = useReveal<HTMLElement>()
  return createElement(
    as,
    {
      ref,
      className: cn('print-in', className),
      style: { '--reveal-i': index } as CSSProperties,
    },
    children
  )
}
```

`src/styles/global.css` — in `@layer utilities`:

```css
.print-in {
  transition: clip-path 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: calc(var(--reveal-i, 0) * 80ms);
}
html[data-js] .print-in:not([data-revealed]) {
  clip-path: inset(100% 0 0 0);
}
```

- [ ] **Step 3: Apply**

Wrap, keeping every existing class on the inner element:

- `HomeGetToKnowSection.tsx`: each `<li key={href}>` becomes `<Reveal as='li' key={href} index={i}>` (add `i` to the `map` callback).
- `ProjectsCard.tsx`: the root `<Card as='article' …>` is wrapped in `<Reveal>` (`Card` keeps `as='article'`).
- `AboutContent.tsx` `Block`: the `<section>` becomes `<Reveal as='section' className='…same classes…'>` — the `rule-t` from Task 2 stays on it.
- `TechStackGroup.tsx`: wrap the grid `div` in `<Reveal>`.
- `NotebookInProgress.tsx`: wrap the outer grid in `<Reveal>`.
- `ContactFormContainer.tsx`: wrap the `Terminal` in `<Reveal>`.

`Reveal` is a client component; the wrapped children stay server components (they are passed as `children`).

- [ ] **Step 4: Tests, gates, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit`.

```bash
git add src/hooks src/components/ui/Reveal.tsx src/styles/global.css src/app
git commit -m "feat(motion): content blocks print in as they enter the viewport"
```

---

### Task 5: Scenes resolve, and the reduced-motion kill switch (spec §3.4, §3.1)

**Files:**

- Modify: `src/components/ui/Scene.tsx`, `src/components/ui/Scene.test.tsx`, `src/app/(home)/_components/HomeGetToKnowSection.tsx`, `src/styles/global.css`, `src/styles/tailwind.test.ts`

**Interfaces:**

- Produces: `Scene` prop `reveal?: boolean` (default `true`) adding class `scene-reveal` to the `<picture>`. One `@media (prefers-reduced-motion: reduce)` block neutralising `.rule-*`, `.reg-mark`, `.print-in`, `.scene-reveal`, `.typewriter` (Task 6) and `.scene-drift`.

- [ ] **Step 1: Failing tests**

Append to `Scene.test.tsx`:

```tsx
it('resolves on mount unless reveal is off', () => {
  const { container, rerender } = render(<Scene name='contact-letter' />)
  expect(container.querySelector('picture')).toHaveClass('scene-reveal')
  rerender(<Scene name='contact-letter' reveal={false} />)
  expect(container.querySelector('picture')).not.toHaveClass('scene-reveal')
})
```

Append to `tailwind.test.ts`:

```ts
it('kills every motion class under prefers-reduced-motion', async () => {
  const css = readFileSync(join(__dirname, 'global.css'), 'utf8')
  const result = await postcss([
    tailwindcss({
      ...tailwindConfig,
      content: [
        {
          raw: '<div class="print-in scene-reveal rule-t"></div>',
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
  expect(reduced![1]).toMatch(/animation:\s*none/)
  expect(reduced![1]).toMatch(/clip-path:\s*none/)
})
```

Run → FAIL.

- [ ] **Step 2: `Scene`**

Add `reveal?: boolean` to `SceneProps`, default `reveal = true` in the destructuring, and change the `<picture>` class to `cn('block h-full w-full', drift && 'scene-drift', reveal && 'scene-reveal')`. In `HomeGetToKnowSection.tsx` pass `reveal={false}` to the card `Scene` (the card itself prints in).

- [ ] **Step 3: CSS**

In `@layer utilities`:

```css
html[data-js] .scene-reveal {
  animation: scene-resolve 450ms steps(3, end) both;
}
```

Replace the existing reduced-motion block (which only guards `.scene-drift`) with, still inside `@layer utilities`:

```css
@media (prefers-reduced-motion: no-preference) {
  .scene-drift {
    animation: scene-drift 14s ease-in-out infinite alternate;
  }
}
@media (prefers-reduced-motion: reduce) {
  .rule-t::before,
  .rule-b::after,
  .reg-mark,
  .print-in,
  .scene-reveal,
  .scene-drift,
  .typewriter,
  .typewriter::after {
    animation: none;
    transition: none;
    clip-path: none;
  }
  html[data-print] .rule-t::before,
  html[data-print] .rule-b::after {
    transform: translateX(-50%);
  }
}
```

Heroes carry both `scene-reveal` and `scene-drift` on the same `<picture>`, so the drift must be declared together with the resolve or one animation cancels the other. Add, right after the `.scene-drift` rule inside the `no-preference` media query:

```css
.scene-reveal.scene-drift {
  animation:
    scene-resolve 450ms steps(3, end) both,
    scene-drift 14s ease-in-out 450ms infinite alternate;
}
```

At file end:

```css
@keyframes scene-resolve {
  from {
    transform: scale(4);
  }
  to {
    transform: scale(1);
  }
}
```

- [ ] **Step 4: Tests, gates, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit`.

```bash
git add src/components/ui/Scene.tsx src/components/ui/Scene.test.tsx "src/app/(home)/_components/HomeGetToKnowSection.tsx" src/styles
git commit -m "feat(motion): scenes resolve in three steps; one reduced-motion switch for the whole system"
```

---

### Task 6: Terminal typing (spec §3.5)

**Files:**

- Create: `src/components/ui/Typewriter.tsx`, `src/components/ui/Typewriter.test.tsx`
- Modify: `src/components/ui/Eyebrow.tsx`, `src/components/ui/Terminal.tsx`, `src/styles/global.css`, `src/app/(home)/_components/HomeHero.tsx`, `src/components/ui/PageHero.tsx`

**Interfaces:**

- Produces: `Typewriter: React.FC<{ text: string; className?: string }>` (client) — renders `<span class="typewriter" style="--chars: N">{text}</span>`. `Eyebrow` gains `typing?: boolean` and wraps its `children` in `Typewriter` when they are a single string. `Terminal` wraps its `title` in `Typewriter` internally. Everywhere else (`NotebookInProgress` lines, Task 10) callers use `<Typewriter text='…' />` explicitly.

- [ ] **Step 1: Failing test**

`src/components/ui/Typewriter.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Typewriter } from './Typewriter'
import { Eyebrow } from './Eyebrow'

describe('Typewriter', () => {
  it('renders the full text immediately and exposes its length for the mask', () => {
    render(<Typewriter text='new message' />)
    const el = screen.getByText('new message')
    expect(el).toHaveClass('typewriter')
    expect(el.style.getPropertyValue('--chars')).toBe('11')
  })

  it('is applied by Eyebrow typing to string children only', () => {
    render(
      <Eyebrow index='00' typing>
        Felipe Mateus
      </Eyebrow>
    )
    expect(screen.getByText('Felipe Mateus')).toHaveClass('typewriter')
    expect(screen.getByText(/00 —/)).toBeInTheDocument()
  })
})
```

Run → FAIL.

- [ ] **Step 2: Component and sugar**

`src/components/ui/Typewriter.tsx`:

```tsx
'use client'

import { cn } from '@/lib/utils/cn'
import { CSSProperties } from 'react'

type TypewriterProps = { text: string; className?: string }

export const Typewriter: React.FC<TypewriterProps> = ({ text, className }) => (
  <span
    className={cn('typewriter', className)}
    style={{ '--chars': text.length } as CSSProperties}
  >
    {text}
  </span>
)
```

`Eyebrow.tsx`: add `typing?: boolean` to `EyebrowProps`; in the body, `const label = typing && typeof children === 'string' ? <Typewriter text={children} /> : children` and render `{label}` instead of `{children}` (import `Typewriter` from `./Typewriter`; `Eyebrow` stays a server-compatible component — `Typewriter` is the client leaf).

`HomeHero.tsx`: the hero `<Eyebrow index='00'>` gets `typing` (its child is a single string — keep it as one string literal). `PageHero.tsx`: `<Eyebrow index={index} active={false} typing>{label}</Eyebrow>`.

`Terminal.tsx`: no change. `NotebookInProgress.tsx` and `ContactFormContainer` (via `Terminal` children) wrap their `<p>` string contents: `<p><Typewriter text='$ ls' /></p>` etc. — in `NotebookInProgress.tsx` the four `<p>` lines; the contact `Terminal` has the form as children, so only its `title` types: `Terminal` renders `<p className='text-parchment eyebrow-text'><Typewriter text={title} /></p>` (change that one line in `Terminal.tsx`; `Terminal.test.tsx` queries by text and class `eyebrow-text` on the `<p>` — unchanged).

- [ ] **Step 3: CSS**

In `@layer utilities`:

```css
.typewriter {
  display: inline-block;
  white-space: pre;
}
html[data-js] .typewriter {
  animation: type calc(var(--chars, 1) * 25ms) steps(var(--chars, 1), end) both;
}
html[data-js] .typewriter::after {
  content: '▮';
  color: theme('colors.parchment-dim');
  animation:
    blink 1s steps(2, start) infinite,
    cursor-out 1ms linear calc(var(--chars, 1) * 25ms + 900ms) forwards;
}
```

At file end:

```css
@keyframes type {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

@keyframes cursor-out {
  to {
    content: '';
  }
}
```

(`clip-path` on the `inline-block` masks the text from the right; the cursor lives in `::after` inside the same box, so it is revealed with the text and removed ~0.9 s after the last character.)

- [ ] **Step 4: Tests, gates, build, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build` (no server left running).

```bash
git add src/components/ui src/styles/global.css "src/app/(home)/_components/HomeHero.tsx" src/app/notebook
git commit -m "feat(motion): eyebrows and terminal titles type themselves"
```

---

### Task 7: Dithered screenshots and portrait — the second manifest (spec §4.1)

**Files:**

- Modify: `scripts/dither/manifest.ts`, `scripts/dither.ts`
- Create: `src/configs/dither.generated.ts` (generated), `src/configs/dither.generated.test.ts`, `public/dither/*.{png,webp}`

**Interfaces:**

- Produces: `export const dithered: ReadonlyArray<DitherEntry>` in the manifest (`{ name: string; source: string; algorithm: Algorithm }`); `pnpm dither` also writes `public/dither/<name>.{png,webp}` and `src/configs/dither.generated.ts` exporting `type DitherName`, `type DitherAsset` (same shape as `SceneAsset`) and `dithered: Record<DitherName, DitherAsset>`. Names: the seven `works.ts` slugs plus `portrait`.

- [ ] **Step 1: Failing test**

`src/configs/dither.generated.test.ts`:

```ts
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { dithered } from './dither.generated'
import { works } from './works'

describe('dither manifest', () => {
  it('has an ink version of every project screenshot and the portrait', () => {
    const names = Object.keys(dithered).sort()
    expect(names).toEqual([...works.map((w) => w.slug), 'portrait'].sort())
    for (const asset of Object.values(dithered)) {
      expect(existsSync(join(process.cwd(), 'public', asset.png))).toBe(true)
      expect(existsSync(join(process.cwd(), 'public', asset.webp))).toBe(true)
      expect(asset.cssWidth).toBeGreaterThan(0)
    }
  })
})
```

Run → FAIL (module missing).

- [ ] **Step 2: Manifest**

Append to `scripts/dither/manifest.ts`:

```ts
export type DitherEntry = SceneEntry

/** Ink versions of the color images that InkImage layers over (spec §4). */
export const dithered: ReadonlyArray<DitherEntry> = [
  {
    name: 'pigmo',
    source: 'public/assets/pigmo-screenshot.png',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'zeus-agrotech',
    source: 'public/assets/zeus-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'redux-store',
    source: 'public/assets/redux-store-screenshot.png',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'pepy-the-platypus',
    source: 'public/assets/pepy-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'equals-venue',
    source: 'public/assets/equalsVenue-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'equals-sport',
    source: 'public/assets/equalsSport-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'equals9',
    source: 'public/assets/equals9-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'portrait',
    source: 'art/source/portrait.png',
    algorithm: 'floyd-steinberg',
  },
]
```

(Floyd–Steinberg keeps UI screenshots and skin readable; Bayer is for the engravings. `sharp` rasterizes SVG sources directly. If `art/source/portrait.png` is missing, change that one `source` to `public/assets/me-green-shirt.png` for now — precondition 3.)

- [ ] **Step 3: Script**

In `scripts/dither.ts`:

- import `dithered` next to `scenes`; add `const DITHER_DIR = path.join(ROOT, 'public', 'dither')` and `const DITHER_GENERATED = path.join(ROOT, 'src', 'configs', 'dither.generated.ts')`.
- Generalize `generatedSource(list)` to `generatedSource(list, { typeName, assetType, exportName, dir })` and call it twice: scenes with `{ typeName: 'SceneName', assetType: 'SceneAsset', exportName: 'scenes', dir: '/scenes' }`, dithered with `{ typeName: 'DitherName', assetType: 'DitherAsset', exportName: 'dithered', dir: '/dither' }`. The emitted file for dithered starts with the same `// Generated by \`pnpm dither\`. Do not edit by hand.` line.
- In `runManifest`, after the scenes loop, run the same loop over `dithered` writing to `DITHER_DIR` (`mkdir -p` first) and `DITHER_GENERATED`. A missing source is a warning + skip, as for scenes; zero dithered rendered is NOT fatal (scenes stay the fatal check).

Run `pnpm dither` → writes `public/dither/*` and `src/configs/dither.generated.ts`. Check the output sizes: each ≤ 150 KB; open two PNGs (Read tool) to confirm they look like 1-bit dithers of the screenshot, not noise. If a screenshot comes out too dark, switch that entry to `'bayer'` and re-run.

- [ ] **Step 4: Tests, gates, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit`.

```bash
git add scripts/dither/manifest.ts scripts/dither.ts src/configs/dither.generated.ts src/configs/dither.generated.test.ts public/dither
git commit -m "feat(assets): ink versions of the project screenshots and the portrait"
```

---

### Task 8: `InkImage` — hover on project cards, toggle on the portrait (spec §4.2–4.3)

**Files:**

- Create: `src/components/ui/InkImage.tsx`, `src/components/ui/InkImage.test.tsx`
- Modify: `src/app/projects/_components/ProjectsCard.tsx`, `src/app/about/_components/AboutPortrait.tsx`, `src/app/projects/_components/ProjectsCard.test.tsx`

**Interfaces:**

- Consumes: `dithered[name]` from `src/configs/dither.generated.ts` (Task 7).
- Produces: `InkImage: React.FC<{ name: DitherName; src: string; alt: string; mode: 'hover' | 'toggle'; sizes: string; className?: string; imageClassName?: string; priority?: boolean }>` — `relative overflow-hidden` frame; color `next/image fill` below; dithered `<img aria-hidden>` above.

- [ ] **Step 1: Failing test**

`src/components/ui/InkImage.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { InkImage } from './InkImage'

describe('InkImage', () => {
  it('layers the ink version over the color image and hides it from AT', () => {
    const { container } = render(
      <InkImage
        name='pigmo'
        src='/assets/pigmo-screenshot.png'
        alt='Pigmo'
        mode='hover'
        sizes='28rem'
      />
    )
    const ink = container.querySelector('img[aria-hidden="true"]')!
    expect(ink).toHaveAttribute('src', expect.stringContaining('/dither/pigmo'))
    expect(ink.style.imageRendering).toBe('pixelated')
    expect(screen.getByAltText('Pigmo')).toBeInTheDocument()
    expect(ink).toHaveClass('group-hover:opacity-0')
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('toggle mode reveals the color version with a pressed button', async () => {
    const { container } = render(
      <InkImage
        name='portrait'
        src='/assets/me-green-shirt.png'
        alt='Felipe Mateus'
        mode='toggle'
        sizes='22rem'
      />
    )
    const button = screen.getByRole('button', { name: 'See in color' })
    expect(button).toHaveAttribute('aria-pressed', 'false')
    button.click()
    await screen.findByRole('button', { name: 'Back to ink' })
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    expect(container.querySelector('img[aria-hidden="true"]')).toHaveClass(
      'opacity-0'
    )
  })
})
```

Run → FAIL.

- [ ] **Step 2: Component**

`src/components/ui/InkImage.tsx`:

```tsx
'use client'

import { Button } from '@/components/ui/Button'
import { DitherName, dithered } from '@/configs/dither.generated'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import { useState } from 'react'

type InkImageProps = {
  name: DitherName
  src: string
  alt: string
  mode: 'hover' | 'toggle'
  sizes: string
  className?: string
  imageClassName?: string
  priority?: boolean
}

export const InkImage: React.FC<InkImageProps> = ({
  name,
  src,
  alt,
  mode,
  sizes,
  className,
  imageClassName,
  priority,
}) => {
  const [color, setColor] = useState(false)
  const ink = dithered[name]

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imageClassName)}
      />
      <picture>
        <source srcSet={ink.webp} type='image/webp' />
        <img
          src={ink.png}
          width={ink.cssWidth}
          height={ink.cssHeight}
          alt=''
          aria-hidden='true'
          decoding='async'
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            imageClassName,
            mode === 'hover' &&
              'group-focus-within:opacity-0 group-hover:opacity-0',
            mode === 'toggle' && color && 'opacity-0'
          )}
          style={{ imageRendering: 'pixelated' }}
        />
      </picture>
      {mode === 'toggle' ? (
        <Button
          variant='text'
          aria-pressed={color}
          onClick={() => setColor((c) => !c)}
          className='absolute bottom-3 left-3 bg-ink px-2 py-1'
        >
          {color ? 'Back to ink' : 'See in color'}
        </Button>
      ) : null}
    </div>
  )
}
```

(`Button variant='text'` is mono uppercase — the toggle reads as a terminal command. The `bg-ink` chip behind it keeps the label legible over the image and adds no new color.)

- [ ] **Step 3: Uses**

`ProjectsCard.tsx` — replace the screenshot block (`<div className='relative hidden max-w-[28rem] shrink-0 grow border-l border-line tablet:flex'><Image … /></div>`) with:

```tsx
<InkImage
  name={slug as DitherName}
  src={image}
  alt={`${title} screenshot`}
  mode='hover'
  sizes='(min-width: 768px) 28rem, 0px'
  className='hidden max-w-[28rem] shrink-0 grow border-l border-line tablet:block'
  imageClassName={cn(
    'object-left transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]',
    { 'object-top': screenshotView === 'tablet' }
  )}
/>
```

and add `group transition-colors hover:border-parchment-dim` to the root `Card`'s class list; add `slug` to the destructured project fields; import `InkImage` and `DitherName`; drop the `next/image` import if unused. Update `ProjectsCard.test.tsx` if it queried the screenshot `alt` (it should still find `alt="Zeus Agrotech portal screenshot"`).

`AboutPortrait.tsx`:

```tsx
import { InkImage } from '@/components/ui/InkImage'

const AboutPortrait: React.FC = () => (
  <InkImage
    name='portrait'
    src='/assets/me-green-shirt.png'
    alt='Felipe Mateus'
    mode='toggle'
    sizes='(min-width: 1024px) 22rem, 100vw'
    priority
    className='aspect-[344/432] w-full rounded-sm border border-line bg-ink-2'
  />
)

export default AboutPortrait
```

(When Felipe's new portrait lands, `src` changes to its path in `public/assets/` — the dither entry already points at `art/source/portrait.png`.)

- [ ] **Step 4: Tests, gates, build, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build`.

```bash
git add src/components/ui/InkImage.tsx src/components/ui/InkImage.test.tsx src/app/projects src/app/about/_components/AboutPortrait.tsx
git commit -m "feat(ui): InkImage — ink at rest, color on hover for screenshots and on toggle for the portrait"
```

---

### Task 9: The `bookshelf-empty` scene (spec §5.1) — main session

**Files:**

- Create: `art/source/bookshelf-empty.png` (LFS), `public/scenes/bookshelf-empty.{png,webp}`
- Modify: `art/PROMPTS.md`, `scripts/dither/manifest.ts`, `src/configs/scenes.generated.ts` (generated)

- [ ] **Step 1: Prompt.** In `art/PROMPTS.md` add a section `## 6. Bookshelf empty state (Plan 4)` with the prompt, built from the file's STYLE prefix and NEGATIVE suffix:

> STYLE + "an empty wooden bookshelf with bare shelves, a single lit candle standing on the middle shelf is the only light source, a few faint dust motes, medium shot, centered, the shelf fills the frame, 3:2 aspect," + NEGATIVE

Generate with Higgsfield `generate_image` (`nano_banana_pro`, `"4k"`, aspect 3:2), pick the take with the emptiest shelves and no frame border, record the job id in `PROMPTS.md`, download to `art/source/bookshelf-empty.png`. If the model draws a border, crop it by luminance bounds (brand spec §6.2) with `sharp` in an ad-hoc `node -e` (no repo file).

- [ ] **Step 2: Manifest.** Append to `scenes` in `scripts/dither/manifest.ts`: `{ name: 'bookshelf-empty', source: 'art/source/bookshelf-empty.png', algorithm: 'bayer' }`. Run `pnpm dither`; confirm `scenes.generated.ts` now lists `'bookshelf-empty'` and `public/scenes/bookshelf-empty.png` looks right (Read tool).

- [ ] **Step 3: Gates, commit** — `pnpm test && pnpm lint && pnpm exec tsc --noEmit` (the scene manifest test in `src/configs/` picks up the new entry).

```bash
git add art/PROMPTS.md art/source/bookshelf-empty.png scripts/dither/manifest.ts src/configs/scenes.generated.ts public/scenes/bookshelf-empty.png public/scenes/bookshelf-empty.webp
git commit -m "feat(assets): bookshelf-empty scene for the shelf's empty and error states"
```

---

### Task 10: `BookshelfState` and the wiring (spec §5.2)

**Files:**

- Create: `src/app/bookshelf/_components/BookshelfState.tsx`, `BookshelfState.test.tsx`
- Modify: `src/app/bookshelf/_components/BookshelfItems.tsx`, `src/app/bookshelf/error.tsx`, `src/app/bookshelf/_components/BookshelfItems.test.tsx` (create if absent)

**Interfaces:**

- Consumes: `Scene` (`name='bookshelf-empty'`), `Reveal` (Task 4), `Eyebrow`, `Card`, `Button`.
- Produces: `BookshelfState: React.FC<{ variant: 'empty' | 'error'; children?: React.ReactNode }>`.

- [ ] **Step 1: Failing tests**

`BookshelfState.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import BookshelfState from './BookshelfState'

describe('BookshelfState', () => {
  it('shows the empty shelf with its scene and no actions', () => {
    const { container } = render(<BookshelfState variant='empty' />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Nothing on the shelf yet.'
    )
    expect(screen.getByText(/land here as I finish them/)).toHaveClass(
      'font-serif',
      'italic'
    )
    expect(container.querySelector('img[aria-hidden="true"]')).toHaveAttribute(
      'src',
      expect.stringContaining('bookshelf-empty')
    )
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('shows the error copy and the actions it is given', () => {
    render(
      <BookshelfState variant='error'>
        <button>Try again</button>
      </BookshelfState>
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'The shelf didn’t load.'
    )
    expect(screen.getByText(/on my side, not yours/)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument()
  })
})
```

`BookshelfItems.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import BookshelfItems from './BookshelfItems'

describe('BookshelfItems', () => {
  it('renders the empty state for an empty list and the error state for null', () => {
    const { rerender } = render(<BookshelfItems books={[]} />)
    expect(screen.getByText('Nothing on the shelf yet.')).toBeInTheDocument()
    rerender(<BookshelfItems books={null} />)
    expect(screen.getByText('The shelf didn’t load.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
```

Run → FAIL.

- [ ] **Step 2: Component**

`src/app/bookshelf/_components/BookshelfState.tsx`:

```tsx
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Scene } from '@/components/ui/Scene'

const copy = {
  empty: {
    title: 'Nothing on the shelf yet.',
    aside: 'The books that changed how I decide land here as I finish them.',
  },
  error: {
    title: 'The shelf didn’t load.',
    aside: 'It’s on my side, not yours.',
  },
} as const

type BookshelfStateProps = {
  variant: keyof typeof copy
  children?: React.ReactNode
}

const BookshelfState: React.FC<BookshelfStateProps> = ({
  variant,
  children,
}) => (
  <Reveal className='py-12'>
    <Card className='relative z-0 flex min-h-[24rem] flex-col justify-end gap-4 overflow-hidden p-8'>
      <Scene name='bookshelf-empty' scrim='bottom' position='center' />
      <Eyebrow index='03'>Bookshelf</Eyebrow>
      <h2 className='max-w-[18ch]'>{copy[variant].title}</h2>
      <p className='max-w-[40ch] font-serif text-xl italic text-parchment-dim'>
        {copy[variant].aside}
      </p>
      {children ? <div className='flex gap-4 pt-2'>{children}</div> : null}
    </Card>
  </Reveal>
)

export default BookshelfState
```

(The `<h2>` gets `display-2` from the base layer — the state is a section title.)

- [ ] **Step 3: Wiring**

`BookshelfItems.tsx`:

```tsx
import { Button } from '@/components/ui/Button'
import { IBook } from '@/types/bookshelf'
import Link from 'next/link'
import Book from './BookshelfBook'
import BookshelfGrid from './BookshelfGrid'
import BookshelfState from './BookshelfState'

const BookshelfItems: React.FC<{ books: IBook[] | null }> = ({ books }) => {
  if (!books)
    return (
      <BookshelfState variant='error'>
        <Link href='/'>
          <Button variant='text'>Back home</Button>
        </Link>
      </BookshelfState>
    )

  if (books.length === 0) return <BookshelfState variant='empty' />

  return (
    <BookshelfGrid>
      {books.map((book, index) => (
        <Book key={index} name={book.name} cover={book.image} />
      ))}
    </BookshelfGrid>
  )
}

export default BookshelfItems
```

`src/app/bookshelf/error.tsx` — keep `'use client'`, the `error` logging effect and the props; replace the returned JSX with:

```tsx
<BookshelfState variant='error'>
  <Button variant='secondary' onClick={reset}>
    Try again
  </Button>
  <Link href='/'>
    <Button variant='text'>Back home</Button>
  </Link>
</BookshelfState>
```

(`BookshelfState` is a server-compatible component rendered from a client file — fine, it has no hooks of its own; `Reveal` inside it is a client component.)

- [ ] **Step 4: Tests, gates, build, commit**

Run: `pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build`.

```bash
git add src/app/bookshelf
git commit -m "feat(bookshelf): empty and error states on the empty-shelf scene"
```

---

### Task 11: Documents (spec §6.3)

**Files:**

- Modify: `docs/superpowers/specs/2026-09-07-brand-identity-design.md`, `PRODUCT.md`, this plan (append `## Execution status`)

- [ ] **Step 1: Brand spec.** §3.3: add `bookshelf-empty — an empty shelf with one candle; the Bookshelf's empty and error states`. §4.1 after the token table: "`parchment-mute` is never a text color; tertiary text (eyebrows, labels, meta) is `parchment-dim` (Plan 4)". §4.2: "Display headings apply to `h1`/`h2` outside `<dialog>` only." §4.4: "Horizontal structural lines are full-bleed (`.rule-t`/`.rule-b`); vertical lines are the `Container`; box borders stay in their boxes." §5.3: the top scrim is `h-1/2 from-ink via-ink/80 via-50%`. §5.4: replace the motion paragraph with the four primitives (frame prints once per session; content prints in on intersection; scenes resolve in three steps; eyebrows and terminal titles type), the reduced-motion rule, and "No page transitions — `<ViewTransition>` is not in stable React 19.2 (spike 2026-09-09)." §6: "`pnpm dither` also renders `public/dither/*` from the `dithered` manifest (screenshots, portrait; Floyd–Steinberg)." §9: add the seven rows from Plan 4 spec §0.
- [ ] **Step 2: `PRODUCT.md`.** Brand Commitments: add "The About page layout is redesigned in Plan 5; Plan 4 shipped the portrait toggle and the motion system."
- [ ] **Step 3: This plan.** Append `## Execution status (<date>) — handoff`: per task commits, deferred minors from the reviews, what still waits on Felipe (portrait file, metrics, Equals URLs, handle), and the note that Task 12 updates this section.
- [ ] **Step 4: Commit** — `docs(brand): record plan 4 in the spec and product truth`.

---

### Task 12: Visual and motion verification (spec §6.2)

**Files:** whatever the pass touches (pages/components/CSS only; no new deps).

- [ ] **Step 1: Screenshots.** `pnpm dev`; headless Chrome at 768 and 1440 on all seven routes (`--headless=new --disable-gpu --hide-scrollbars --window-size=$w,1400`), plus the 390 harness from Plan 3 (an iframe of width 390 inside a 500-wide page, since headless Chrome clamps windows to 500). Checklist: full-bleed rules cross the container verticals on every page; eyebrows legible over every hero (contrast ≥ 4.5:1 sampled at the eyebrow's background — if the Home eyebrow still fights the Paladin, raise `CrtWarp`'s top scrim to `h-1/2 … via-ink/80 via-50%` per spec §1.2); the résumé modal at 18 px Inter; one amber element on Home and Contact, none elsewhere; no horizontal overflow at 390; Bookshelf states: the unit tests cover the rendering; screenshot `/bookshelf` only if the Supabase env is present locally, otherwise skip it here.
- [ ] **Step 2: Real Chrome (claude-in-chrome).** On `/`: first visit of a session (clear `sessionStorage`) — rules draw, marks fade in, hero eyebrow types, Paladin resolves in steps, blocks print in as you scroll; second page (`/about`) — no rule animation, content still prints. Then emulate `prefers-reduced-motion: reduce` (DevTools → Rendering) and reload: nothing moves, nothing is clipped, all text visible. Private window: `sessionStorage` blocked → page renders, no console error. Hover a project card: dither → color and the 1.04 scale. About: the toggle flips the portrait and `aria-pressed`.
- [ ] **Step 3: Lighthouse** (Chrome DevTools, mobile preset) on `/` and `/projects` before (checkout `origin/dev` in a worktree) and after: LCP and CLS must not regress by more than noise (±0.1 s, CLS ≤ 0.02). If `InkImage` hurts `/projects` LCP, the first card's `InkImage` gets `priority`.
- [ ] **Step 4:** Fix what the checklist finds, one commit per concern (`fix(polish): …`); `pnpm build`; `pkill -f next-server`; update the Execution status section; commit `chore(polish): visual and motion verification`.

---

## Self-review

- **Spec coverage:** §1.1 → Task 1 (roles table); §1.2 → Task 1 Step 3 (+ Task 12 for `CrtWarp`); §1.3–1.4 → Task 1; §2.1–2.4 → Task 2; §3.1 → Task 5 (reduced-motion block covers rules, marks, print-in, scene-reveal, typewriter, drift); §3.2 → Task 3; §3.3 → Task 4; §3.4 → Task 5; §3.5 → Task 6; §4.1 → Task 7; §4.2–4.4 → Task 8; §5.1 → Task 9; §5.2–5.3 → Task 10; §6.2 → Task 12; §6.3 → Task 11 (the follow-ups plan note was committed with the spec).
- **Placeholders:** none; every code step is written out. Two explicit conditionals are data-dependent by design: the portrait source (precondition 3) and the Bookshelf screenshot (Supabase env).
- **Type consistency:** `Reveal` props (`as`, `index`, `className`, `children`) match between Task 4 (definition), Task 4 uses, and Task 10; `Scene.reveal` (Task 5) is passed as `reveal={false}` in Task 5's Home edit; `Typewriter` `{ text, className }` matches Task 6's `Eyebrow`/`Terminal` uses; `DitherName`/`dithered` (Task 7) match `InkImage` (Task 8); `.rule-t/.rule-b`, `.reg-mark`, `.print-in`, `.scene-reveal`, `.typewriter` class names are identical across Tasks 2–6 and the reduced-motion block; `BookshelfState` `{ variant, children }` matches Task 10's wiring.

---

## Execution status (2026-09-10) — handoff

### Per task

- **Task 1 — Text color roles, scrim, and dialog-scoped display headings.** `2487b13 fix(brand): parchment-mute is decorative only, display headings stay out of dialogs`. Shipped: `parchment-mute` reserved for decorative/inactive use, `parchment-dim` for tertiary text; base `h1`/`h2` display rules scoped `:not(dialog *)`; `Resume.tsx`'s name is an `<h2>`.
- **Task 2 — Full-bleed structural lines.** `52bd965 feat(grid): full-bleed horizontal rules across navbar, heroes, sections and footer`. Shipped: `.rule-t`/`.rule-b` utilities and their use across navbar, heroes, section dividers, About `Block`s, `TechStackGroupTitle`, footer. The `Separator` `screen` variant became orphaned by this change; its removal was deferred (Ruling R7) and later closed by `152c9ad chore(ui): remove the orphaned Separator`.
- **Task 3 — The frame prints once per session.** `6d2a97d feat(motion): the grid draws itself on the first page of a session`, `7798d45 fix(motion): the frame prints once, not on every navigation`. Shipped: `PrintFrame`, `data-js`/`data-print` on `<html>`, rule/mark draw-in gated to the first page of a session, with the `data-print` removal timeout (Ruling R9) so later navigations don't replay it.
- **Task 4 — Content prints on every page.** `f88effa feat(motion): content blocks print in as they enter the viewport`. Shipped: `useReveal` + `.print-in`, applied to Home "get to know" cards, `ProjectsCard`, About `Block`s, Tech Stack groups, `NotebookInProgress`, the Contact `Terminal`, `BookshelfState`.
- **Task 5 — Scenes resolve, and the reduced-motion kill switch.** `9d60015 feat(motion): scenes resolve in three steps; one reduced-motion switch for the whole system`, `6c6225b fix(motion): the reduced-motion switch outranks every motion rule`. Shipped: `Scene`'s `reveal` prop and `.scene-reveal` three-step resolve; the single `@media (prefers-reduced-motion: reduce)` block, hardened to `!important` per Ruling R10 so it outranks rules written after it.
- **Task 6 — Terminal typing.** `6f02cfd feat(motion): eyebrows and terminal titles type themselves`. Shipped: `Typewriter`, wrapping hero eyebrow text and `Terminal` lines, with the cursor removed via a `visibility` keyframe (Ruling R4).
- **Task 7 — Dithered screenshots and portrait.** `b2d070f feat(assets): ink versions of the project screenshots and the portrait`. Shipped: the second `scripts/dither.ts` manifest and `src/configs/dither.generated.ts`, covering project screenshots and the portrait — the portrait entry uses the fallback source `public/assets/me-green-shirt.png` (Ruling R11) since `art/source/portrait.png` does not exist yet.
- **Task 8 — `InkImage`.** `46d69e5 feat(ui): InkImage — ink at rest, color on hover for screenshots and on toggle for the portrait`, `0f4514d fix(ui): scope the card hover and honour reduced motion in InkImage`. Shipped: `InkImage` (`hover`/`toggle` modes), used by `ProjectsCard` and `AboutPortrait`; the nested-group leak fixed with a named `group/link` (Ruling R13); `motion-reduce:transition-none` added per Ruling R14.
- **Task 9 — The `bookshelf-empty` scene.** `6334bcd feat(assets): bookshelf-empty scene for the shelf's empty and error states`. Shipped: the scene asset and its `scenes.generated.ts` entry, with `'bookshelf-empty'` appended to `scenes.generated.test.ts`'s `EXPECTED_NAMES` (Ruling R12).
- **Task 10 — `BookshelfState` and the wiring.** `afcdada feat(bookshelf): empty and error states on the empty-shelf scene`. Shipped: `BookshelfState`, `src/app/bookshelf/error.tsx`, and `BookshelfItems`' empty/`null` branches.
- **Task 11 — Documents.** This commit: brand spec §3.3/§4.1/§4.2/§4.4/§5.3/§5.4/§6.3/§9, `PRODUCT.md` Brand Commitments, and this handoff section.
- **Task 12 — Visual and motion verification.** Not yet run; see below.

### Deferred minors

- `src/components/app/TechStackGroup.tsx` (Task 4) is typed `React.ComponentProps<'div'>` and spreads `{...props}` onto `Reveal`, which only accepts `as`/`index`/`className`/`children` — arbitrary props are silently dropped; narrow the prop type or forward rest props.
- `src/test/setup.ts` (Task 4) gained a global `IntersectionObserver` mock, not in the Task 4 brief's file list — needed for jsdom.
- `Scene.test.tsx` (Task 5): the new `it` sits outside the `describe('Scene')` block.
- `scripts/dither.ts` (Task 7): the scenes/dithered render loops are structurally duplicated — extract `renderManifest(list, outDir)` if a third manifest appears.
- `scripts/dither.ts` (Task 7): redundant `mkdir(DITHER_DIR)` — `writeOutputs` already `mkdir`s per file.
- `InkImage` (Task 8): fade is `duration-300` per the brief vs. spec §4.2's 250 ms — brief/spec inconsistency, flagged for final review to triage.
- `InkImage`/`ProjectsCard` (Task 8): `slug as DitherName` cast bypasses type safety; a new `works.ts` slug without a dither entry fails only at runtime.
- `Typewriter` (Task 6): `steps(var(--chars, 1), end)` becomes `steps(0)` for an empty text (no current caller passes one).
- `Typewriter` (Task 6): the `::after` cursor glyph may be announced by some screen readers (pseudo-element, inherent to the spec's CSS).
- `PrintFrame` (Task 3): under React Strict Mode (dev only) the double-invoked effect sets `data-print`, clears its own removal timer, then early-returns — `data-print` persists in dev and the print replays per navigation in dev; production unaffected. Final review to triage.
- `PrintFrame` (Task 3): navigation inside the ~1.1 s print window still replays rule-draw on the new page (inherent to the Ruling R9 timeout approach).

### Rulings worth knowing

- **R1** — Task 5's combined rule is `html[data-js] .scene-reveal.scene-drift { animation: scene-resolve …, scene-drift … }` inside the `no-preference` media query; otherwise `html[data-js] .scene-reveal` out-specifies it and heroes lose the drift.
- **R2** — Task 5's reduced-motion test passes a `raw:` content string carrying the classes under test, so Tailwind doesn't purge them.
- **R3** — Task 6's `Terminal.test.tsx`: the title text lives in the `Typewriter` span; the test asserts `eyebrow-text` on `screen.getByText(/tech-stack/).closest('p')`.
- **R4** — Task 6's cursor removal animates `visibility` (`cursor-out { to { visibility: hidden } }`), not `content`; the `::after` animation list is `blink …, cursor-out 1ms linear <delay> forwards` (last wins after its delay).
- **R5** — Task 8's `InkImage` toggle test uses `fireEvent.click(button)`, not `button.click()`.
- **R6** — the plan branch is cut from the local `docs/rebrand-plan-4-spec` (`dd5a6d5`), identical to the unpushed `origin/` name the plan cites.
- **R7** — Task 2's `Separator` `screen`-variant removal was blocked by the auto-mode classifier (it refuses a subagent prompt that instructs a file deletion); deferred to Task 11/final review. **Resolved**: removed by the controller in `152c9ad` (tsc + 130 tests green after removal).
- **R8** — the Task 3 review finding "rule-draw/mark-in not gated by `prefers-reduced-motion`" isn't a Task 3 gap: spec §3 mandates one reduced-motion block disabling everything, delivered in Task 5. The extended ruling closes the same finding for Task 4's `.print-in`.
- **R9** — the Task 3 review finding "print replays on every client navigation" is real; fix is `PrintFrame` removing `data-print` from `<html>` on a timeout (`rules.length * 60 + 400` ms, floor 1100 ms) after mount, cleared on unmount. Cost if wrong: an animation cut short if the estimate undershoots.
- **R10** — the Task 5 review finding "reduced-motion block loses on specificity" is real; the three neutralising declarations became `animation: none !important; transition: none !important; clip-path: none !important;` so a kill switch beats rules not yet written.
- **R11** — `art/source/portrait.png` doesn't exist, so Task 7's `portrait` manifest entry uses the brief's fallback `source: 'public/assets/me-green-shirt.png'`; one manifest line and a `pnpm dither` re-run when the real portrait lands.
- **R12** — Task 9's `scenes.generated.test.ts` holds a fixed `EXPECTED_NAMES` list rather than auto-discovering entries; `'bookshelf-empty'` was appended to that list.
- **R13** — Task 8's nested-`group` leak (Tailwind's unnamed `group-hover:` is a descendant selector) is fixed by naming the inner "Visit site" `Button` group `group/link` in `ProjectsCard.tsx`, with `group-hover/link:translate-x-1` on its arrow; the `Card` keeps the plan's bare `group`.
- **R14** — spec §4.2 binds `InkImage`: reduced motion removes the fade duration only, so `motion-reduce:transition-none` was added to the ink `<img>` transition classes in `InkImage.tsx` and to `imageClassName` in `ProjectsCard.tsx`.

### Waits on Felipe

- **Portrait file** — `art/source/portrait.png` is still absent; Task 7's dither manifest uses `me-green-shirt.png` as a fallback (Ruling R11) until the real portrait lands, then one manifest line changes and `pnpm dither` re-runs.
- **Project metrics** — `src/configs/works.ts`: `call`/`result` on each project with a measured outcome, plus the corresponding `works.test.ts` update (currently only `zeus-agrotech` has a `result`).
- **Equals URLs** — `src/configs/works.ts`: real `url`s for `equals-venue`, `equals-sport`, `equals9`.
- **Social handle** — `src/constants/social.ts`: confirm `SOCIAL_LINKS.x` (and the others) point at real profiles, so `src/app/layout.tsx`'s `twitter` block can gain a real `creator` handle.

Task 12 (visual and motion verification) updates this section.

### Task 12 — Visual and motion verification (2026-09-10)

Harness: real Chrome's automated tab was permanently backgrounded (`document.hidden === true`), which suspends IntersectionObserver and screenshots, so the motion pass ran in headless Chrome 151 driven over CDP (a 60-line dependency-free script in the session scratchpad: `Page.navigate`, `Emulation.setEmulatedMedia`, `Input.dispatchMouseEvent`, `Runtime.evaluate`, `Page.captureScreenshot`). Screenshots at 1440, 768 and 390 (iframe harness) on all seven routes.

Verified:

- Full-bleed rules cross the container verticals on every page; one amber element on `/` (hero CTA) and one on `/contact` (the seal), none elsewhere (computed colours on every element of every route).
- First page of a session: `data-js` set, `sessionStorage.printed = 1`, `data-print` present during the print and removed after it; second page (`/about`): no `data-print`, `.rule-t::before` at full width, no rule animation.
- `prefers-reduced-motion: reduce`: every animation `none`, every clip `none`, all text visible. `sessionStorage` blocked: page renders, no `data-print`, no console errors.
- Typewriter: `--chars` set, `type` animation on, cursor hidden at `chars × 25 ms + 900 ms`. Scenes: `scene-resolve` on, `scale(1)` at rest.
- `/projects` hover: ink layer → opacity 0, card border → `parchment-dim`, image scale 1.04×, the "Visit site" arrow does not move. `/about`: the toggle flips `aria-pressed` and hides the ink layer. Résumé dialog: heading 18 px Inter, body 16 px, no amber.
- No horizontal overflow at 390 on any route (`scrollWidth === innerWidth`).
- LCP/CLS at 390×844 (PerformanceObserver, warm dev servers, two runs): before (`origin/dev`) `/` 228/140 ms, `/projects` 112/116 ms; after `/` 148/112 ms, `/projects` 180/140 ms; CLS 0 throughout. No regression beyond noise.

Fixed (one commit per concern):

- `684c12f` — typed eyebrows wrap on narrow screens (`.typewriter` `white-space: pre-wrap`; the 61-character Home eyebrow was cut at 390).
- `5060c92` — **Critical**: `.print-in` content never revealed in Chrome because `clip-path: inset(100% 0 0 0)` on the observed element zeroes its IntersectionObserver ratio; the clip and its transition moved to the element's children.
- `21e3ea0` — Home eyebrow contrast over the Paladin: `CrtWarp`'s top scrim now matches the `Scene` value (spec §1.2). Background-only contrast at the eyebrow line went from 1.04:1 (p99) to 4.1:1, median 5.8:1.

Waits on Felipe (a foreground tab):

- Watch the motion once live: rules draw, marks fade in, eyebrow types, Paladin resolves, blocks print in on scroll — the pass verified computed styles, not the animation as seen.
- The brightest ~1–10 % of the Home eyebrow's background still measures ≈4.1–4.2:1; going further would leave the §1.2 scrim value.
- At 390 the eyebrow prefix stacks `00` / `—` on two lines before the typed span.

### Final whole-branch review and fix wave (2026-09-10)

The final review approved the architecture (CSS-first motion, nothing hidden before hydration, one kill switch, tests that assert compiled CSS and on-disk assets) and found four Important defects a computed-style pass cannot see. Fixed in one wave, each verified over CDP afterwards:

- `34a9472` — `InkImage` owns its transitions and composes `imageClassName` first: `twMerge` was dropping the ink layer's `transition-opacity` in favour of the card's `transition-transform`, so the ink→colour fade snapped. Fade 250 ms (spec §4.2), scale 400 ms (§4.3).
- `99cb0b2` + `6a4e13e` — under `prefers-reduced-motion: reduce` the typing cursor `▮` stayed on screen (its removal was an animation); the reduce block now sets `content: none !important` on `.typewriter::after`.
- `f2a7946` — `.print-in` reveals with a `print-in` keyframe instead of a transition: `inset()` → `none` is a discrete transition (a pop at 50 %), and the `.print-in > *` transition rule outranked children's own `transition-*` utilities (the project card's border hover). Spec §3.3 amended to the keyframe form.
- `efe60f5` — the OG card eyebrow used `parchment-mute` as text (`src/lib/og.tsx`); now `parchment-dim`, and `roles.test.ts` also scans inline `color: colors['parchment-mute']`.
- `8a60746` — the eyebrow prefix `00 —` stays on one line at 390; `Scene.test` tidy; `TechStackGroup` props narrowed.

Probe after the wave (headless Chrome 151): on `/projects` the revealed child runs the `print-in` animation to `inset(0%)`, the ink layer transitions `opacity 0.25s, transform 0.4s`, the colour layer `transform 0.4s`, the card keeps `transition-colors`; under reduced motion no animations, `clip-path: none`, ink transition `none`, cursor `content: none` on `/` and on the Terminal title.

Still deferred (final review's triage): the ~1.1 s navigation window replay, Strict-Mode `data-print` in dev, `steps(0)` for an empty Typewriter, the `::after` cursor for screen readers, the duplicated render loops in `scripts/dither.ts`, the `slug as DitherName` cast (guarded by `dither.generated.test.ts`), the brightest 1–10 % of the Home eyebrow background at ≈4.1:1, `roles.test.ts`'s variant-prefix lookbehind, `InkImage` being a client component in hover mode. Felipe still owes one live pass in a foreground tab — normal and reduced motion.

### Frame-print animation removed (2026-09-12)

The frame-print animation (Task 3: `.rule-t`/`.rule-b` drawing in and the `Container` registration marks fading in, once per session) was removed at Felipe's request. The rules and marks are now static; `PrintFrame` was renamed to `JsFlag`, which only sets `data-js` on `<html>`. Everything else in the motion system (content print-in, scene resolve, typewriter, the reduced-motion switch) is unchanged. Commit: `refactor(motion): drop the frame-print animation, keep the js flag`.
