# Rebrand Follow-ups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the two code defects left open by Plan 3's final review, and give Felipe an exact checklist for the content only he can supply — without touching any design decision (those go to the Plan 4 brainstorm).

**Architecture:** Two isolated fixes in files Plan 3 already owns: `CrtWarp` gates its static fallback on `!ready || !supported` so a WebGL context lost after the first frame restores the dithered scene, and the résumé modal's name becomes an `<h2>` so a page never carries two `<h1>`s. Each fix ships with the test that would have caught it. The content section is a checklist, not a task: it names the file, the field and the test that changes when the data lands.

**Tech Stack:** Next.js 16.1 App Router, React 19.2 (`reactStrictMode: true`), Tailwind 3.3 + tailwind-variants, Vitest 3 + Testing Library (globals on, jsdom, jest-dom), pnpm 10.

**Spec:** `docs/superpowers/specs/2026-09-07-brand-identity-design.md` (§4.1 color, §5.2 CRT, §5.4 motion). Source of the open items: `docs/superpowers/plans/2026-09-08-rebrand-3-pages.md` § Execution status (final review — fix wave, rulings R16/R17). Product truth: `PRODUCT.md`.

## Global Constraints

- Dark-only; tokens only: `ink`, `ink-2`, `line`, `parchment`, `parchment-dim`, `parchment-mute`, `amber`, `amber-dim`, `ok`, `err`. **Amber at most once per viewport** — Home = hero CTA, Contact = wax-seal ex-libris, every other page none (focus rings excepted). No token value changes in this plan (`src/styles/colors.ts` and `colors.test.ts` untouched — the `parchment-mute` decision is Plan 4's).
- CRT only on the home hero, lazy (`next/dynamic`, `ssr: false`), static `Scene` fallback, no scanlines; animation off under `prefers-reduced-motion`.
- Banned: `backdrop-blur`, gradients other than the ink→transparent scrim, shadows, radius > 2px, framer-motion, new dependencies. No comments narrating what code does. English only in UI copy; the résumé content itself is Portuguese by design (`src/components/Resume.tsx`) and stays as is.
- Gates before every commit: `pnpm test`, `pnpm lint` (0 errors), `pnpm exec tsc --noEmit`. Conventional Commits, one commit per task, never `--no-verify`. Never leave temp `.ts/.tsx` files anywhere in the tree (eslint scans git-ignored dirs). `art/**` is Git LFS — do not touch.
- Prettier runs on commit and may reorder Tailwind class tokens — class-token order is never load-bearing in this repo.

## Preconditions

1. `dev` contains PR #38 (`feature/rebrand`, HEAD `0cf54f2`). Start a new branch from `dev`: `git checkout dev && git pull && git checkout -b fix/rebrand-follow-ups`.
2. 109 tests green on `dev` (`pnpm test`).

---

## File map

| Path                                            | Action   | Responsibility                                          |
| ----------------------------------------------- | -------- | ------------------------------------------------------- |
| `src/components/effects/CrtWarp.tsx`            | modify   | Fallback gate `!ready \|\| !supported`                  |
| `src/components/effects/CrtWarp.test.tsx`       | create   | Post-first-frame context loss restores the static scene |
| `src/components/Resume.tsx:33`                  | modify   | `<h1>` → `<h2>` (same `name` slot)                      |
| `src/components/Resume.test.tsx`                | create   | Résumé renders no level-1 heading                       |
| `src/configs/works.ts`                          | (Felipe) | `call` / `result` / `url` when the data exists          |
| `src/configs/works.test.ts`                     | (Felipe) | Expectation updated with the data                       |
| `src/app/layout.tsx`, `src/constants/social.ts` | (Felipe) | Social handle                                           |

---

### Task 1: `CrtWarp` restores the static scene after a post-first-frame context loss

**Files:**

- Modify: `src/components/effects/CrtWarp.tsx:49-51` (the `{!ready ? <Scene …/> : null}` line)
- Create: `src/components/effects/CrtWarp.test.tsx`

**Interfaces:**

- Consumes: `CrtWarpCanvas` props `{ name: SceneName; onFail: () => void; onReady: () => void; animate: boolean }` (unchanged); `Scene` renders one `<img aria-hidden='true'>`.
- Produces: no API change. Behavior: the fallback `<Scene>` is mounted whenever `!ready || !supported`; `fail()` (called from `CrtWarpCanvas` on `webglcontextlost`, shader failure or image error) therefore re-mounts it even after `onReady` fired.

Why: today `fail()` only flips `supported` to `false`, and the fallback is gated on `!ready` alone — so a context lost _after_ the first frame unmounts the dead canvas and leaves only the ink scrims over nothing (Plan 3 handoff, ruling R17).

- [ ] **Step 1: Write the failing test**

`src/components/effects/CrtWarp.test.tsx`:

```tsx
import { act, render, screen } from '@testing-library/react'
import { CrtWarp } from './CrtWarp'

type CanvasProps = { onReady: () => void; onFail: () => void }
const handlers: CanvasProps[] = []

vi.mock('./CrtWarpCanvas', () => ({
  CrtWarpCanvas: (props: CanvasProps) => {
    handlers.push(props)
    return <canvas data-testid='crt-canvas' />
  },
}))

beforeEach(() => {
  handlers.length = 0
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    getExtension: () => ({ loseContext: () => {} }),
  }) as unknown as typeof HTMLCanvasElement.prototype.getContext
})

const fallbackImg = () => document.querySelector('img[aria-hidden="true"]')

describe('CrtWarp', () => {
  it('shows the static scene, swaps to the canvas on ready, and restores the scene when the context is lost', async () => {
    render(<CrtWarp name='home-paladin' />)
    expect(fallbackImg()).toBeInTheDocument()

    const canvas = await screen.findByTestId('crt-canvas')
    expect(canvas).toBeInTheDocument()

    act(() => handlers.at(-1)!.onReady())
    expect(fallbackImg()).toBeNull()

    act(() => handlers.at(-1)!.onFail())
    expect(screen.queryByTestId('crt-canvas')).toBeNull()
    expect(fallbackImg()).toBeInTheDocument()
  })
})
```

(`next/dynamic` resolves the mocked module asynchronously, hence `findByTestId`.)

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test src/components/effects/CrtWarp.test.tsx`
Expected: FAIL on the last assertion — `expect(fallbackImg()).toBeInTheDocument()` receives `null` after `onFail()` (the canvas is gone but the scene did not come back).

- [ ] **Step 3: Gate the fallback on `!ready || !supported`**

In `src/components/effects/CrtWarp.tsx` replace

```tsx
{
  !ready ? <Scene name={name} drift={false} scrim='none' priority /> : null
}
```

with

```tsx
{
  !ready || !supported ? (
    <Scene name={name} drift={false} scrim='none' priority />
  ) : null
}
```

Nothing else changes: `fail` already sets `supported: false`, which unmounts the canvas wrapper and, with this gate, re-mounts the scene.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm test src/components/effects`
Expected: PASS — the new test plus the existing `CrtWarpCanvas.test.tsx` (StrictMode remount, context-loss fallback).

- [ ] **Step 5: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add src/components/effects/CrtWarp.tsx src/components/effects/CrtWarp.test.tsx
git commit -m "fix(effects): restore the static scene when the CRT context is lost after the first frame"
```

---

### Task 2: The résumé modal never adds a second `<h1>`

> **Absorbed by Plan 4** (`docs/superpowers/specs/2026-09-10-rebrand-4-polish-design.md` §1.3): Plan 4 scopes the display-heading base rules out of `<dialog>` and makes the résumé name an `<h2>` in the same change. Execute this task only if Plan 4 has not landed first; otherwise skip it and keep the `Resume.test.tsx` expectations from §1.4 there.

**Files:**

- Modify: `src/components/Resume.tsx:33`
- Create: `src/components/Resume.test.tsx`

**Interfaces:**

- Consumes: nothing new. `Resume` is rendered inside `ModalContent` by `src/app/(home)/_components/HomeResumeModalButton.tsx:27` and `src/app/about/_components/AboutResumeModal.tsx:21`; the `<dialog>` is always in the DOM (closed), so its heading counts toward the page outline.
- Produces: the name is an `<h2>` with the same `name` style slot (`text-lg font-bold`) — visually identical, semantically one level below the page's `<h1>`.

- [ ] **Step 1: Write the failing test**

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

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test src/components/Resume.test.tsx`
Expected: FAIL — `getByRole('heading', { level: 2, name: /FELIPE MATEUS/ })` finds nothing (the name is an `<h1>`).

- [ ] **Step 3: Change the element**

In `src/components/Resume.tsx` line 33, replace

```tsx
<h1 className={name()}>FELIPE MATEUS GONÇALVES CRUZEIRO</h1>
```

with

```tsx
<h2 className={name()}>FELIPE MATEUS GONÇALVES CRUZEIRO</h2>
```

(`display-2` is scoped to `h2:not(.eyebrow-text)` in `src/styles/global.css`; the `name` slot's `text-lg font-bold` sets its own size, so verify in Step 4 that the résumé name did not jump to 4rem Anton — if it did, add `font-body normal-case` to the `name` slot: `name: ['font-body text-lg font-bold normal-case']`.)

- [ ] **Step 4: Run the tests to verify they pass, and eyeball the modal**

Run: `pnpm test src/components/Resume.test.tsx src/app/about src/app/\(home\)`
Expected: PASS (the About and Home tests mock the modal trigger, so they are unaffected).

Then `pnpm dev`, open `http://localhost:3000/about`, click the résumé link: the name must read at the same size as before (Inter 18px bold, not the display face). Kill the server with `pkill -f next-server`.

- [ ] **Step 5: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add src/components/Resume.tsx src/components/Resume.test.tsx
git commit -m "fix(a11y): résumé modal name is an h2, keeping one h1 per page"
```

---

### Task 3: Gates, push, PR

- [ ] **Step 1:** `pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build` (build must pass; no server left running).
- [ ] **Step 2:** `git push -u origin fix/rebrand-follow-ups`, then `gh pr create --base dev --title "fix(rebrand): CRT fallback after context loss, single h1 with the résumé modal"` with a body listing the two fixes and pointing at this plan.

---

## Content owed by Felipe (checklist, not a task)

Each line names the file, the field, and the test that changes with it. No number is ever invented — a row stays `undefined` until the source document exists.

- [ ] **Project metrics → `call` / `result`** — `src/configs/works.ts`: fill `call` (the decision taken) and `result` (what it moved, with the real figure) on each project that has a measured outcome. Then update `src/configs/works.test.ts` — its second test asserts `withResult.map((w) => w.slug)` equals `['zeus-agrotech']`; extend that array with every slug that gained a `result`, keeping `/50%/` for Zeus. The card renders the rows only when present (`src/app/projects/_components/ProjectsCard.tsx`).
- [ ] **Equals URLs** — `src/configs/works.ts`: add `url: 'https://…'` to `equals-venue`, `equals-sport`, `equals9` when the real addresses are known. `works.test.ts` only forbids the old placeholder host (`flow-ai-oficial`), so no test change is needed; the card shows "Visit site" automatically.
- [ ] **Social handle** — `src/constants/social.ts`: confirm `SOCIAL_LINKS.x` (and the others) point at real profiles; `src/app/layout.tsx` `twitter` block may then gain `creator: '@handle'` (the placeholder `@seuhandle` was removed in Plan 3; `src/app/metadata.test.ts` forbids `seuhandle`, so any real handle passes).
- [ ] **CRT warp, eyeballed** — open `/` in a foreground Chrome tab once (headless and background tabs never draw it): the Paladin should be gently barrel-warped with a vignette, no scanlines, and the outlined second title line readable.

## Decisions deferred to the Plan 4 brainstorm (do not implement here)

- `parchment-mute` `#4A4945` is 2.18:1 on `ink` — fails WCAG AA as text everywhere it labels (eyebrows, form labels, placeholders, footer meta). Options: raise the token; or reserve `parchment-mute` for non-text (squares, rules) and label with `parchment-dim`. Spec §4.1 and `colors.test.ts` pin the value, so this is a spec amendment.
- Equals period strings (`equals9` `2021` vs venue/sport `2021 — 2022`) — consistency vs. per-project truth.
- Notebook `$ ls` terminal device (`NotebookInProgress.tsx`) — keep as stylized honesty, or replace with plainer copy.
- `CrtWarp` reads `prefers-reduced-motion` once (no `change` listener); `Modal` uses a fixed 200 ms fade timer regardless of reduced motion.
- `ProjectsContent` search uses a 500 ms `setTimeout` + `setState` instead of `useDeferredValue`.

---

## Self-review

- **Coverage:** every open code defect from Plan 3's handoff has a task (R17 → Task 1; second `<h1>` → Task 2); every content item has a checklist line with its file, field and guarding test; every parked decision is listed for Plan 4 rather than silently dropped.
- **Placeholders:** none — the tests and edits are written out; the only intentional blanks are Felipe's data.
- **Type consistency:** `CrtWarpCanvas` props (`name`, `onFail`, `onReady`, `animate`) match `src/components/effects/CrtWarp.tsx` as committed in `5751911`; the `name` style slot in `Resume.tsx` is reused unchanged.
