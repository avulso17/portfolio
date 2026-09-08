# Brand Identity — Felipe Mateus

**Date:** 2026-09-07
**Status:** Phase A spec (identity). Phase B (site implementation) is planned separately via `writing-plans`.
**References:** `docs/references/` (Alethe hero + components, React Bits dither/CRT backgrounds, Doré-style 1-bit illustration, `links.md`).

---

## 1. Why

The current site (Next.js 16, Tailwind 3) is a generic "Vercel dark" portfolio: Inter everywhere, glassmorphism, translucent accents, no character, no brand mark beyond a `[f]` monogram. The copy positions Felipe as a code expert who "faithfully reproduces designs".

Neither matches who Felipe is today. This spec defines a visual identity and voice that do, then serves as the source for `PRODUCT.md` / `DESIGN.md` (Impeccable) and for the Phase B implementation plan.

---

## 2. Brand core

### 2.1 Name

The brand is **Felipe Mateus**. The wordmark is the name. Handles are to be unified under `felipemateus` / `felipe-mateus` wherever available.

"Avulso" (high-school nickname from the technical course where his career started) and the old `[f]` monogram survive only as easter eggs — e.g. a footer line `// avulso, since <year of the technical course>` or a hidden `[f]`. Never as brand.

### 2.2 Positioning

> **Front-end engineer who thinks like a product owner.**
> Solves problems, finds bottlenecks, and makes decisions looking at the product, the company, and where the company is right now — to ship quality that translates into revenue. Developer + entrepreneur, not "code expert".

### 2.3 Personality

Three adjectives that gate every decision: **critical, curious, direct.**
If a visual or copy choice is loud, generic, or hedging, it is out.

### 2.4 Voice

- Talks about **outcomes and decisions**, not stack. Stack is a tool, never a headline.
- Judgment verbs: _decide, cut, prioritize, measure, unblock_ — over _build, create, develop_.
- Wherever possible, a number or a concrete consequence (time saved, conversion, cost avoided).
- No startup clichés ("turn visions into reality", "passionate about", "helping startups").
- Two registers:
  - **System voice** — monospace uppercase eyebrows (`§ SELECTED WORK`, `§ 04 — BOOKSHELF`). Short, labeled, numbered.
  - **Human voice** — display headlines and serif italic asides. First person, opinionated.
- Navigation labels stay literal (About, Projects, Bookshelf, Notebook, Tech Stack, Contact). Universe vocabulary appears only in eyebrows and microcopy.
- Language: English only. Bilingual (`/pt`) is backlog, not part of this rebrand.

### 2.5 Copy direction (to be refined in Phase B, but this is the tone)

| Surface        | Direction                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Home H1        | `I BUILD THE FRONT-END AND QUESTION THE ROADMAP.`                                                              |
| Home sub       | Front-end engineer with an owner's eye — I find the bottleneck, make the call, and ship what moves the number. |
| About eyebrows | `§ HOW I DECIDE` · `§ WHAT I'VE SHIPPED` · `§ WHERE I'M USEFUL` (replaces Who I am / What I do / What I did)   |
| Project card   | Adds two lines: **the call** (decision taken) and **the result** — not only the stack                          |
| Contact        | Direct ask. "Tell me what's stuck."                                                                            |
| Sign-off       | Serif italic: _Let's build something that pays for itself._                                                    |

The About body and résumé keep their factual content; only tone and framing change.

---

## 3. The character and the universe

### 3.1 The Scribe (alter-ego)

A medieval copyist in a scriptorium. **Not Felipe** — deliberately. The character is atmosphere and visual universe, not an allegory of the job; positioning lives in the copy (§2), not in the character.

**Character sheet** — fixed elements that identify him in every scene:

- Hood and simple cloak. No armor.
- Quill in the right hand, always.
- A **candle** nearby — the only source of amber light in the universe.
- An open book/parchment whose "text" subtly reads as code (braces, indentation).
- Face partly in shadow.
- Optional thin halo, **hero only**.

Style: black-and-white engraving (Doré / woodcut), high contrast, black background, rendered to 1-bit dither (see §5).

### 3.2 Exploration before commitment

At generation time, produce four archetype variants from the same base prompt for side-by-side comparison: **Scribe** (primary), **Cartographer**, **Knight**, **Astronomer**. The Scribe is the working direction; the final call is Felipe's after seeing all four.

### 3.3 Scenes (one per page)

| Page        | Scene                                                                            |
| ----------- | -------------------------------------------------------------------------------- |
| Home (hero) | The Scribe frontal at his desk, candle lit, figure overlapping the display title |
| About       | The Scribe in profile, writing                                                   |
| Projects    | Wall of framed manuscripts / shelf of finished works                             |
| Bookshelf   | Tall monastic library shelves                                                    |
| Notebook    | Desk from above: parchment, inkwell, quill                                       |
| Tech Stack  | Scriptorium tool bench: quills, rulers, inks, knives                             |
| Contact     | Sealed letter; the wax seal carries the FM ex-libris                             |

Scenes sit behind headlines/hero only — never behind body text (see §5.3).

---

## 4. Visual system

### 4.1 Color

Dark-only. `color-scheme: dark`. Sun/Moon icons and any theme toggle are removed.

| Token            | Value                  | Use                                               |
| ---------------- | ---------------------- | ------------------------------------------------- |
| `ink`            | `#0A0A0A`              | Base background                                   |
| `ink-2`          | `#141414`              | Surfaces: cards, navbar, terminal chrome          |
| `line`           | `#262626`              | 1px grid lines, borders, dividers                 |
| `parchment`      | `#F2EEE6`              | Primary text (warm white, never `#FFF`)           |
| `parchment-dim`  | `#8C8A84`              | Secondary text                                    |
| `parchment-mute` | `#4A4945`              | Eyebrows, meta, placeholders, inactive            |
| `amber`          | `#F5B700`              | Primary CTA, focus ring, active state, the candle |
| `amber-dim`      | `rgba(245,183,0,0.15)` | Candle glow, subtle hover                         |
| `ok`             | `#4ADE80`              | Semantic success only (form)                      |
| `err`            | `#F87171`              | Semantic error only (form)                        |

**Hard rule:** amber appears **at most once per viewport**. If two elements compete for amber, one becomes `parchment`.

Removed: all current translucent accents (`blue`, `red`, `yellow` at 43%), `onyx`, `card-border`, `card-bg`, `nav-border`, `info`, `warning`. `colors.ts` is replaced wholesale.

### 4.2 Typography

Three families, three roles (plus one accent face). Nanum Pen Script and Calibri are removed.

| Role              | Family                                                                                                                 | Rules                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Display**       | Heavy condensed grotesk — candidates to test in comps: _Anton_, _Bebas Neue_, _Big Shoulders Display_, _Archivo Black_ | Page H1/H2 only. Always uppercase. Two variants: solid and outline (`-webkit-text-stroke`). Scale: 7rem desktop / 3.5rem mobile. Tight leading (0.9). |
| **Body**          | _Inter_ (already loaded)                                                                                               | Body, navigation, buttons, forms. Never uppercase.                                                                                                    |
| **Mono**          | _Departure Mono_ (bitmap)                                                                                              | Eyebrows, labels, metadata, footer, numbers, terminal chrome. Uppercase, `letter-spacing: 0.08em`.                                                    |
| **Serif (voice)** | _Instrument Serif_, italic                                                                                             | Quotes, sign-off line, Notebook note titles. Sparingly.                                                                                               |

The display family is decided visually during Phase B comps; the spec fixes the role and rules, not the file.

### 4.3 Brand mark — the FM ex-libris

An ex-libris is the mark an owner stamps in their books; it fits the Scribe/bookshelf universe and is a monogram (professional) dressed as a symbol (creative).

- "F" and "M" interlaced inside a circular seal, drawn as engraving (hatching, no gradients).
- Vector SVG, drawn by hand — not AI-generated.
- Three sizes:
  1. **Full seal** — hero, contact scene (wax seal), OG image.
  2. **Monogram without ring** — navbar (28px).
  3. **Lone "F"** — favicon (16px).
- Always monochrome (`parchment` on `ink`). Amber version exists only inside the Contact scene's wax seal.
- Phase B produces 2–3 variants for choice.

### 4.4 Layout language

Derived from the Alethe components reference:

- **Line grid.** Central container with 1px `line` vertical borders. Sections separated by horizontal lines, not whitespace. Registration marks (`⌐ ¬`) at corners of major sections.
- **Eyebrow.** Every block opens with `■ LABEL` in Departure Mono: 6px square (`parchment-mute`; `amber` when active) + uppercase text. Replaces the current `.header-text`.
- **Cards.** Radius ≤ 2px. No shadow. Background `ink-2`. Separated by lines. Bento grid and 3D card are removed; straight grids only.
- **Buttons.** Primary: solid `parchment` with `ink` text (the solid-white button of the references). Amber only on the page's single main CTA. Secondary: `line` outline. Tertiary: text with mono underline.
- **Navbar.** Floating, `ink-2` with `line` border, **no blur**. Ex-libris monogram left, links center/right.
- **Terminal windows** as a content component (tech-stack, notebook, project stacks): mono chrome, three dots, mono title.
- **Forms.** Single bottom border, mono label, amber focus.
- **Banned:** glassmorphism, colored gradients, decorative blur, drop shadows, rounded pills > 2px (except the reference-style "NEW" badge, which may be a full pill in mono).

---

## 5. Texture, effects, motion

### 5.1 Dither

- Default: **Bayer 8×8 ordered dither** — gives the regular mesh seen in the references.
- Floyd–Steinberg available as an option for portrait-like scenes.
- Dither pixel = **2 device pixels** on retina, so it reads as "1-bit", not noise.
- All scenes pass through the same script with the same parameters (§6.3) so the mesh is identical across pages.

### 5.2 CRT

- `reactbits/crt-warp` (or equivalent) **only on the home hero**, low intensity.
- No scanlines anywhere. No global overlay.

### 5.3 Placement and contrast

- Scenes live behind headlines/hero, never behind running text.
- A scrim `ink → transparent` guarantees WCAG AA contrast on any text over a scene.

### 5.4 Motion

- Scenes: slow parallax (≤ 4px) or slow dither drift. Nothing faster.
- `prefers-reduced-motion` disables all dither/warp animation.
- WebGL effects load lazily; fallback is the static dithered PNG/WebP.
- Existing keyframes that don't serve this system (bounce-in, text-generate effect) are removed.

---

## 6. Production pipeline

### 6.1 Character generation (Higgsfield)

1. Write one **base prompt** encoding the character sheet (§3.1) and the style (engraving, Doré, woodcut, black background, high contrast, no color).
2. Generate the four archetype variants (§3.2) from the base prompt; pick.
3. Generate the chosen character in the poses needed: hero (frontal), about (profile), avatar (bust for OG/social).

### 6.2 Scene generation

Base prompt + scene description (§3.3), width ≥ 2048px, black background. Scenes that don't include the character (Bookshelf, Notebook, Tech Stack, Projects, Contact) are generated without him.

### 6.3 Dither script

`scripts/dither.ts` (sharp):
`input → grayscale → contrast curve → Bayer 8×8 (or F–S) → 1-bit PNG + WebP`.
Parameters (threshold, curve, cell size) are constants in the script, not CLI flags, so every scene is processed identically. Committed to the repo; re-runnable when illustrations are swapped.

### 6.4 Mark and meta

- Ex-libris drawn as SVG (§4.3).
- OG images, favicon, apple-icon regenerated from the system (ex-libris + display type on `ink`).

### 6.5 Upgrade path

Commissioned illustrations can replace generated ones later by dropping new files through the same script. Nothing in the site depends on how the source art was made.

---

## 7. Deliverables

### Phase A (this spec)

- This document.
- `PRODUCT.md` (Impeccable `init`) carrying §2.
- `DESIGN.md` (Impeccable) carrying §4–§5 as the enforced design system.
- Base prompts for the Scribe and the 7 scenes (written at the start of Phase B, since they depend on the final character choice).

### Phase B (implementation — separate plan via `writing-plans`)

Order chosen to reduce risk:

1. Tokens + typography + `global.css` (new `colors.ts`, fonts, Tailwind theme).
2. Base components: Button, Eyebrow, Card, Navbar, Footer, Terminal window.
3. `scripts/dither.ts` + asset generation (character, scenes, ex-libris, OG/favicon).
4. Home hero with CRT effect.
5. Remaining pages, one at a time.
6. Metadata/OG/favicon/manifest.
7. Removal pass: Nanum Pen Script, Calibri, 3DCard, BentoGrid, Gradient, TextGeneratorEffect, Sun/Moon icons, blur utilities, old color tokens, unused keyframes.

Impeccable usage in Phase B: `new-work` in **redesign** mode (old look = anti-reference), surface mode **Experience**; then `typeset`, `animate`, `harden`, `audit` as finishing passes.

---

## 8. Out of scope

- Light mode.
- Bilingual site (`/pt`).
- Commissioned illustrations (possible later; see §6.5).
- Changing the site's information architecture or routes.
- Résumé/CV redesign (content stays; only the modal's chrome follows the new system).

---

## 9. Decisions log

| Decision    | Chosen                                                      | Alternatives considered                                                                        |
| ----------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Deliverable | Identity spec first, then site                              | Site-as-brand; both at once                                                                    |
| Brand name  | Felipe Mateus                                               | Avulso; hybrid                                                                                 |
| Character   | Fictional alter-ego (Scribe)                                | Self-portrait 1-bit; self-as-character; scenery only; Master Builder; Cartographer; Chronicler |
| Color       | Mono + single amber accent                                  | Absolute mono; per-section accents; phosphor green; ink red                                    |
| Typography  | Display grotesk + Inter + Departure Mono + Instrument Serif | Pure Alethe trio; full pixel type                                                              |
| Effects     | Dithered scene per section, CRT hero-only                   | Hero-only; global CRT overlay                                                                  |
| Mark        | FM ex-libris seal                                           | Wordmark only; evolved `[f]`; character head                                                   |
| Production  | Higgsfield + code dither pipeline                           | Commissioned; hybrid                                                                           |
| Theme       | Dark-only                                                   | Dark + "paper" light                                                                           |
| Copy        | English, voice rewritten to dev+owner positioning           | Keep current voice; bilingual                                                                  |
