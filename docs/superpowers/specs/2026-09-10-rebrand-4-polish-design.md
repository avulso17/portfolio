# Rebrand Plan 4 — Polish: design spec

Date: 2026-09-10. Amends `docs/superpowers/specs/2026-09-07-brand-identity-design.md` (the brand spec); where the two disagree, this document wins for the sections it names. Product truth: `PRODUCT.md`.

## 0. Scope and decisions

Felipe reviewed the rebrand (Plans 1–3, PR #38 merged into `dev`) and asked for a polish pass before production. Brainstorm outcomes:

| Decision                  | Chosen                                                                                                                                           | Alternatives considered                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Scope split               | Plan 4 = polish (this spec); Plan 5 = About page redesign (own brainstorm); motion stays inside Plan 4, may spin out to a Plan 6 if unsatisfying | One plan for everything                                                                                                           |
| `parchment-mute` contrast | Token becomes decorative/inactive only; tertiary text uses `parchment-dim`; scrims guarantee the background over scenes                          | Raise the token value; contextual eyebrow color per page                                                                          |
| Structural lines          | Horizontal rules are full-bleed via a CSS utility; verticals stay the `Container`                                                                | Only navbar + footer full-bleed                                                                                                   |
| Motion                    | "The page prints" + ink↔color + terminal typing; no page transitions                                                                             | Page transitions via React `<ViewTransition>` (spike 2026-09-09: not in stable React 19.2.3, Next flag is a client no-op → no-go) |
| Motion frequency          | Frame prints once per session; content reveals on every page                                                                                     | Everything on every visit; everything once per session                                                                            |
| Bookshelf empty/error     | One new dithered scene, copy differentiates the states                                                                                           | Two scenes; reuse the hero scene                                                                                                  |
| Résumé modal type         | Display heading styles scoped out of `<dialog>`                                                                                                  | Per-component overrides                                                                                                           |

Out of scope: the About layout (Plan 5), page transitions, `CrtWarp` post-first-frame fallback and Felipe's content (follow-ups plan `docs/superpowers/plans/2026-09-09-rebrand-follow-ups.md`, whose Task 2 — the résumé `<h2>` — is absorbed by §1 here).

## 1. Text color roles and display headings

### 1.1 Roles (amends brand spec §4.1)

- `parchment` — primary text.
- `parchment-dim` (`#8C8A84`, 5.5:1 on `ink`) — secondary **and tertiary** text: eyebrows, form labels and hints, footer meta (`©` line and the `// avulso, since 2015` easter egg), stack chips, tech-card categories, the Contact "Elsewhere" label, timestamps.
- `parchment-mute` (`#4A4945`, 2.2:1) — **never a text color.** Only: the `Eyebrow` square, hairlines that are not `line`, placeholders, disabled controls (WCAG exempts disabled and decorative elements).
- Token values do not change. `src/styles/colors.ts` and `colors.test.ts` stay as they are.

### 1.2 Scrim over scenes (amends brand spec §5.3)

Text over a scene never changes color to survive the image; the scrim supplies the background. `Scene` with `scrim='both'` (all `PageHero`s) raises its top scrim from 40 % to 50 % of the height with an intermediate stop: `bg-gradient-to-b from-ink via-ink/80 via-50% to-transparent`. `CrtWarp` keeps its 25 % top scrim unless the Home eyebrow still competes with the Paladin in the screenshot pass, in which case it matches the `Scene` value. Bottom scrims are unchanged.

### 1.3 Display headings only outside dialogs (amends brand spec §4.2)

The base layer currently applies `display-1` to every `h1` and `display-2` to every `h2:not(.eyebrow-text)`, which is why the résumé modal renders 7 rem Anton. New base selectors:

```css
h1:not(dialog *) {
  @apply display-1;
}
h2:not(.eyebrow-text):not(dialog *) {
  @apply display-2;
}
```

Content inside a `<dialog>` is a document, not a page title. `src/components/Resume.tsx` keeps its own slots (`text-lg font-bold`) and its name becomes an `<h2>` (one `h1` per page).

### 1.4 Tests

- CSS test (extend `src/styles/tailwind.test.ts`): the compiled base rules for `h1`/`h2` contain `:not(dialog *)`.
- Source test (new `src/styles/roles.test.ts`): no `.tsx` under `src/` uses `text-parchment-mute` except an explicit allowlist (`placeholder:` prefixed classes, `disabled:` prefixed classes, `Eyebrow.tsx`'s square slot).
- `Resume.test.tsx`: renders a level-2 heading with the name and no level-1 heading.

## 2. Full-bleed structural lines

### 2.1 Rule (amends brand spec §4.4)

Vertical lines belong to `Container` (`border-x border-line` plus the four registration marks). Horizontal structural lines cross the viewport and therefore cross the verticals. Box borders (cards, `Terminal`, `ProjectsCard` rows, form fields) are not structural lines and stay inside their boxes.

### 2.2 Utility

In `src/styles/global.css`, `@layer utilities`:

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

`100vw` may exceed the viewport by the classic-scrollbar width; `html { overflow-x: hidden }` (and only `html`, see commit `e414d6d`) clips it without creating a second scroll container.

### 2.3 Where it applies

Navbar desktop bottom (`border-b` → `rule-b`); the bottom of every `PageHero` and of `HomeHero`; every section divider on Home (`HomeSelectedWorkSection`, `HomeGetToKnowSection`, `HomeGetInTouchSection`); the `Block`s of About (`border-t` → `rule-t`); `TechStackGroupTitle`; the footer top — `<Separator screen />` is removed and `Separator` loses the `screen` variant (if no caller remains, the component is deleted).

### 2.4 Tests

`tailwind.test.ts`: the utilities compile with `width: 100vw`. `roles.test.ts`: none of the files listed in §2.3 still uses `border-t border-line` / `border-b border-line` on its structural element (allowlist: `Card`, `ProjectsCard` rows, `Terminal`, `TextField`, textarea).

## 3. Motion system (amends brand spec §5.4)

### 3.1 Principles

- CSS first; JS only to _observe_ (IntersectionObserver, `sessionStorage`) and to add data attributes.
- Nothing is hidden before hydration: every "before" state is gated on `html[data-js]`, which the first client effect sets. Without JS, or before it, the page is complete.
- `@media (prefers-reduced-motion: reduce)` disables the whole system in one block: `.rule-t::before, .rule-b::after, .print-in, .scene-reveal, .typewriter { animation: none; transition: none; clip-path: none; transform: none; }` — plus the existing drift and CRT rules.
- No infinite loops except the 4 px scene drift and the typewriter cursor while typing. No 3D tilt, no generic fades, no hover motion beyond §4.

### 3.2 The frame prints — once per session

Removed on 2026-09-12 at Felipe's request. The structural rules and the `Container` registration marks are static; `JsFlag` (client component, rendered once in `RootLayout`) only sets `data-js` on `<html>` on mount, which the rest of the motion system still keys off.

### 3.3 Content prints — every page

Hook `useReveal<T extends HTMLElement>(): RefObject<T>` — IntersectionObserver, `threshold: 0.2`, `rootMargin: '0px 0px -10% 0px'`, fires once, sets `data-revealed` on the element, disconnects. Class `.print-in` wipes its children in with a keyframe rather than transitioning the discrete `clip-path: inset()` end state, so it never pops:

```css
html[data-js] .print-in:not([data-revealed]) > * {
  clip-path: inset(100% 0 0 0);
}
html[data-js] .print-in[data-revealed] > * {
  animation: print-in 500ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--reveal-i, 0) * 80ms);
}

@keyframes print-in {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

Applied to: the four Home "get to know" cards (staggered by `animation-delay: calc(var(--reveal-i, 0) * 80ms)`, with `--reveal-i` set inline from the map index), each `ProjectsCard`, the About `Block`s, the Tech Stack groups, `NotebookInProgress`, the Contact `Terminal`, `BookshelfState`.

### 3.4 Scenes resolve

`Scene` gains `reveal?: boolean` (default `true`; the Home cards pass `false`). With `reveal`, the `<picture>` gets `.scene-reveal`:

```css
@keyframes scene-resolve {
  from {
    transform: scale(4);
  }
  to {
    transform: scale(1);
  }
}
html[data-js] .scene-reveal {
  animation: scene-resolve 450ms steps(3, end) both;
}
```

Three discrete steps, `image-rendering: pixelated` throughout — the image resolves like a dither being computed. Runs once per mount. The 4 px drift is unchanged and starts after.

### 3.5 Terminal typing

`Typewriter` (client) wraps the hero eyebrow text (inside `Eyebrow`, after the `index —` prefix) and each line of `Terminal` content. The full text is in the server HTML; the animation masks it: the element is `inline-block`, mono, and a `clip-path: inset(0 100% 0 0)` transitions to `inset(0)` with `steps(<length>)` at 25 ms per character (`--chars` set from `text.length`), one run per mount. A `▮` cursor in `parchment-dim` blinks (`steps(2)`, 1 s) via `::after` while typing and is removed on `animationend`. Screen readers get the text unchanged (no per-character DOM).

### 3.6 Tests

Vitest with IntersectionObserver stubbed: `useReveal` sets `data-revealed` on intersection; `PrintFrame` sets `data-js`, sets `data-print` only when the key is absent, and does not throw when `sessionStorage` throws; `Typewriter` renders the full text on first render and sets `--chars`. Visual verification in the final pass (Chrome real, once with reduced motion emulated in DevTools: nothing moves).

## 4. Ink ↔ color

### 4.1 Assets (extends brand spec §6)

`scripts/dither.ts` gains a second manifest: project screenshots (`public/assets/*-screenshot.{png,svg}`, SVGs rasterized first at 2× the display size) and the About portrait. Output `public/dither/<slug>.{png,webp}` and `src/configs/dither.generated.ts` (`{ png, webp, width, height, cssWidth, cssHeight }` per slug, same shape as `scenes.generated.ts`). The new color portrait is supplied by Felipe before execution and enters `art/source/` (LFS); the current `me-green-shirt.png` is replaced.

### 4.2 `InkImage`

Two stacked layers: the color image below (`next/image`, it is not a scene), the dithered `<img>` above (`pixelated`, `aria-hidden`). Props: `slug`, `alt`, `mode: 'hover' | 'toggle'`, `sizes`, `className`.

- `hover`: the dithered layer fades to `opacity-0` (250 ms) on `group-hover` and `group-focus-within`.
- `toggle`: a `Button variant='text'` labelled "See in color" / "Back to ink" toggles `aria-pressed` and the layer's opacity; no hover behavior.

Without JS the ink layer stays on top: ink is the default, color is the extra. Reduced motion removes the fade duration only.

### 4.3 Uses

- `ProjectsCard`: the screenshot becomes `InkImage mode='hover'`; on hover the image also scales to `1.04` (400 ms `ease-out`, `overflow-hidden` on the frame) and the card border rises to `parchment-dim`. Nothing else (no shadow, no lift).
- `AboutPortrait`: `InkImage mode='toggle'` with the new portrait. The component ships here so Plan 5 inherits it.

### 4.4 Tests

`InkImage` renders both layers with the dithered one `aria-hidden`; `toggle` flips `aria-pressed` and the opacity class; `dither.generated.ts` has one entry per project slug in `works.ts` plus `portrait` (manifest test, as `scenes.generated` already has).

## 5. Bookshelf empty and error states

### 5.1 Scene (adds to brand spec §3.3)

`bookshelf-empty`: an empty wooden shelf, one candle, same Doré / woodcut engraving, black background, block framing at ~3:2 (not panoramic). Generated through the Plan 2 pipeline (Higgsfield prompt recorded in `art/PROMPTS.md`, source in `art/source/`, `pnpm dither` → `public/scenes/bookshelf-empty.{png,webp}`, entry in `scenes.generated.ts`). A model-drawn frame border is cropped by luminance (brand spec §6.2).

### 5.2 `BookshelfState`

`BookshelfState: React.FC<{ variant: 'empty' | 'error'; children?: React.ReactNode }>` — a `Card` (`relative z-0 overflow-hidden`) with `Scene name='bookshelf-empty' scrim='bottom' position='center'` behind, then `Eyebrow index='03'`(`Bookshelf`), an `<h2>` title and a serif-italic aside:

- `empty`: "Nothing on the shelf yet." / "The books that changed how I decide land here as I finish them." No actions.
- `error`: "The shelf didn't load." / "It's on my side, not yours." Actions passed as children: `Try again` (`secondary`, calls `reset`) and `Back home` (`text`).

`src/app/bookshelf/error.tsx` renders `BookshelfState variant='error'` with those two buttons; `BookshelfItems` renders `variant='empty'` when Supabase returns an empty list and `variant='error'` (without `reset`, with `Back home` only) when it returns `null`. Loading keeps the current skeleton.

### 5.3 Tests

`BookshelfState` renders the scene `aria-hidden`, the right title per variant, and children; `BookshelfItems` shows the empty state for `[]` and the error state for `null` (Supabase client mocked). `bookshelf/error.tsx`: `Try again` calls `reset`.

## 6. Constraints, verification, documents

### 6.1 Constraints (unchanged from Plan 3)

Ten tokens only; amber at most once per viewport (Home = hero CTA, Contact = wax seal); banned: `backdrop-blur`, gradients other than ink→transparent scrims, shadows, radius > 2px (stack chips excepted), framer-motion, new dependencies; scenes and dithered layers via `<img>` only; English UI copy; never invent a number; gates before every commit (`pnpm test`, `pnpm lint` 0 errors, `pnpm exec tsc --noEmit`), `pnpm build` at milestones; Conventional Commits; `art/**` in LFS; no temp `.ts/.tsx` files in the tree; prettier may reorder class tokens (order is never load-bearing).

### 6.2 Verification

Per-section unit tests above; screenshot pass at 390 (iframe harness from Plan 3 — headless Chrome clamps windows to 500 px), 768 and 1440 on all seven routes; real Chrome twice for motion — normal, and with `prefers-reduced-motion` emulated in DevTools (nothing moves); `sessionStorage` blocked (private window) does not break `PrintFrame`; Lighthouse on Home and Projects before/after — LCP and CLS must not regress (clip-path and scale do not shift layout; dithered screenshot layers are lazy outside the hero).

### 6.3 Document changes

- Brand spec: §3.3 adds `bookshelf-empty`; §4.1 adds "`parchment-mute` is never a text color; tertiary text is `parchment-dim`"; §4.2 adds "display headings apply outside `<dialog>` only"; §4.4 adds the full-bleed rule; §5.3 the new top-scrim value; §5.4 the four motion primitives, the once-per-session frame rule and "no page transitions"; §6 the dither manifest for screenshots and the portrait; §9 the rows of §0 above.
- `PRODUCT.md`: Brand Commitments notes that the About page is redesigned in Plan 5.
- Follow-ups plan: Task 2 marked as absorbed by Plan 4 §1.3.
