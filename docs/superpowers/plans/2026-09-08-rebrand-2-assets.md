# Rebrand Plan 2/3 — Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce every visual asset the rebrand needs — the dither pipeline (`scripts/dither.ts`), the Scribe character and the seven page scenes generated on Higgsfield and rendered to 1-bit, the FM ex-libris mark as hand-drawn SVG, and the favicon/apple-icon/OG images — so Plan 3 (pages) only composes and never produces art.

**Architecture:** Source art lives in `art/` (committed, re-runnable inputs); the dither pipeline is split into pure, unit-tested functions (`scripts/dither/core.ts`), a sharp-backed pipeline (`scripts/dither/pipeline.ts`), a scene manifest (`scripts/dither/manifest.ts`) and a thin CLI (`scripts/dither.ts`) that writes `public/scenes/*.{png,webp}` plus a generated `src/configs/scenes.generated.ts` that Plan 3 imports. The ex-libris geometry is a single source of truth (`src/assets/ex-libris/paths.ts`) consumed by the React component (`src/assets/ExLibris.tsx`), by the icon rasterizer (`scripts/icons.ts`) and by the OG renderer (`src/lib/og.tsx`, Next `ImageResponse`, file-based `opengraph-image.tsx`/`twitter-image.tsx` per route). Higgsfield generation happens through the MCP tools (`mcp__claude_ai_higgsfield__*`) with `nano_banana_pro`; results are downloaded into `art/`.

**Tech Stack:** Node 24, pnpm 10, TypeScript 5, `tsx` (added), `sharp` 0.33 (already a dependency), Vitest 3 (`scripts/**/*.test.ts` already included), Next.js 16 `next/og` `ImageResponse`, Higgsfield MCP (`generate_image`, `generate_image_batch`, `jobs_wait`, `show_generation_by_ids`, `models_explore`).

**Spec:** `docs/superpowers/specs/2026-09-07-brand-identity-design.md` (§3 character/scenes, §4.3 ex-libris, §5.1 dither, §6 production pipeline). Product truth: `PRODUCT.md`. Plan 1 handoff: `docs/superpowers/plans/2026-09-07-rebrand-1-foundation.md` § "Execution status".

## Global Constraints

- Color tokens (exact, from `src/styles/colors.ts`): `ink #0A0A0A`, `ink-2 #141414`, `line #262626`, `parchment #F2EEE6`, `parchment-dim #8C8A84`, `parchment-mute #4A4945`, `amber #F5B700`, `amber-dim rgba(245,183,0,0.15)`. Dithered output uses exactly two colors: `ink` and `parchment`.
- Dither: **Bayer 8×8 ordered** by default; **Floyd–Steinberg** as an option per scene. Dither pixel = **2 device pixels** (`CELL = 2`). Threshold/curve/cell are **constants in the script, not CLI flags**. Every scene goes through the same script with the same constants.
- Scene sources: **width ≥ 2048px**, black background, no color. Scenes without the character (Projects, Bookshelf, Notebook, Tech Stack, Contact) are generated **without** him.
- Character sheet (every Scribe image): hood + simple cloak, **no armor**; quill in the **right** hand; a **candle** nearby (only amber light source); open book/parchment whose text reads as code (braces, indentation); face partly in shadow; thin halo **hero only**. Style: black-and-white engraving (Doré / woodcut), high contrast, black background.
- Ex-libris: "F" and "M" interlaced in a circular seal, drawn as engraving (hatching, **no gradients**), **hand-authored SVG, not AI-generated**. Three sizes: full seal, monogram without ring (navbar, 28px), lone "F" (favicon, 16px). Always monochrome (`parchment` on `ink`); amber only inside the Contact wax seal (Plan 3).
- OG/favicon/apple-icon are regenerated from the system: ex-libris + display type (Anton) on `ink`. `1200×630` OG.
- Amber appears at most once per viewport; nothing in this plan introduces amber into components.
- Banned: gradients, blur, drop shadows, radius > 2px.
- Copy is English. OG titles in this plan follow the spec's copy direction and are **Plan 3-editable** (single map in `src/configs/og.ts`).
- Commit style: Conventional Commits, one commit per task, no `--no-verify`. Pre-commit runs `pnpm lint` + `lint-staged` (prettier). Package manager: **pnpm 10** only.
- Gates before every commit: `pnpm test` green, `pnpm lint` 0 errors, `pnpm exec tsc --noEmit` 0 errors.

## Preconditions (check before starting)

1. **Higgsfield credits.** Verified 2026-09-08 on the reconnected account (workspace `faf1f0a0-e528-4c49-b131-1c2764e21f4e`, plan `plus`): **110 credits**, unlim not available. `nano_banana_pro` costs **2 credits at 1k/2k, 4 credits at 4k**. Budget: 4 archetypes × 2 + 8 finals × 4 = **40 credits**; the remaining 70 cover at most ~17 retries at 4k. Task 4 re-runs the `get_cost` preflight anyway. Never pass `use_unlim: true` unless Felipe asks.
2. **Tasks 4, 5, 6 and the two human gates (Task 4 archetype pick, Task 8 ex-libris pick) run in the main session, not in a subagent** — they need the MCP tools and Felipe's decision. Every other task is subagent-safe.
3. Branch `feature/rebrand`, base `dev`. Plan 1 complete (`pnpm test` 24/24, build clean).
4. Repo pack is ~110 MB; this plan adds ~40–80 MB of source PNGs under `art/`. Acceptable (spec §6.3 wants sources committed so the pipeline is re-runnable). If Felipe objects, `art/source/` can be moved to Git LFS later — nothing in the site depends on it.

---

## File map

| Path                                                                                                        | Action | Responsibility                                                          |
| ----------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------- |
| `package.json`                                                                                              | modify | `tsx` devDep; `dither`, `icons` scripts                                 |
| `scripts/dither/core.ts`                                                                                    | create | Pure dither math: curve, Bayer, Floyd–Steinberg, nearest upscale, RGB   |
| `scripts/dither/core.test.ts`                                                                               | create | Unit tests for the pure functions                                       |
| `scripts/dither/pipeline.ts`                                                                                | create | sharp in → 1-bit PNG + WebP buffers                                     |
| `scripts/dither/pipeline.test.ts`                                                                           | create | Integration test on a synthetic gradient                                |
| `scripts/dither/manifest.ts`                                                                                | create | The scene list (name, source path, algorithm)                           |
| `scripts/dither.ts`                                                                                         | create | CLI: manifest → `public/scenes/*`, `src/configs/scenes.generated.ts`    |
| `art/PROMPTS.md`                                                                                            | create | Base prompt, 4 archetypes, 3 poses, 7 scenes                            |
| `art/archetypes/*.png`                                                                                      | add    | 4 archetype explorations (+ dithered previews)                          |
| `art/source/*.png`                                                                                          | add    | Final scene sources (hero, about, avatar, 5 scenes)                     |
| `public/scenes/*.png`, `*.webp`                                                                             | add    | Dithered outputs                                                        |
| `src/configs/scenes.generated.ts`                                                                           | gen    | Scene paths + dimensions for Plan 3                                     |
| `src/assets/ex-libris/paths.ts`                                                                             | create | Ex-libris geometry constants                                            |
| `src/assets/ex-libris/svg.ts`                                                                               | create | SVG string builder (icons script)                                       |
| `src/assets/ExLibris.tsx`                                                                                   | create | React component, same contract as `Logo.tsx`                            |
| `src/assets/ExLibris.test.tsx`                                                                              | create | Component tests                                                         |
| `src/app/dev-assets/page.tsx`                                                                               | temp   | Preview page for scenes + marks; deleted in Task 11                     |
| `src/components/layout/navbar/desktop/index.tsx`                                                            | modify | `LogoSvg` → `ExLibris mark='monogram'`                                  |
| `src/components/layout/RootLayout.tsx`                                                                      | modify | same                                                                    |
| `src/components/layout/footer/index.tsx`                                                                    | modify | `LogoSvg` → `ExLibris mark='seal'`                                      |
| `scripts/icons.ts`                                                                                          | create | Writes `src/app/icon.svg`, `src/app/icon.png`, `src/app/apple-icon.png` |
| `src/app/favicon.ico`                                                                                       | delete | Replaced by `icon.svg`/`icon.png`                                       |
| `src/app/layout.tsx`                                                                                        | modify | Drop manual `<link rel=icon/apple-touch-icon>`; drop `openGraph.images` |
| `src/assets/fonts/Anton-Regular.ttf`, `Anton-LICENSE.txt`                                                   | add    | For `ImageResponse` (satori needs TTF/OTF/WOFF)                         |
| `src/assets/fonts/DepartureMono-Regular.otf`                                                                | add    | same (satori cannot read WOFF2)                                         |
| `src/configs/og.ts`, `src/configs/og.test.ts`                                                               | create | Per-route OG copy map                                                   |
| `src/lib/og.tsx`                                                                                            | create | `renderOg()` with `ImageResponse`                                       |
| `src/app/{,about,projects,bookshelf,notebook,tech-stack,contact}/opengraph-image.tsx` + `twitter-image.tsx` | create | File-based OG per route                                                 |
| `src/app/{about,projects,bookshelf,notebook,tech-stack,contact}/page.tsx`                                   | modify | Drop `openGraph.images` / `twitter.images` (file-based wins)            |
| `public/og/*.jpg`                                                                                           | delete | Old OG images                                                           |

---

### Task 1: Dither core — pure functions (TDD)

**Files:**

- Modify: `package.json` (devDependency `tsx`, script `dither`)
- Create: `scripts/dither/core.ts`
- Test: `scripts/dither/core.test.ts`

**Interfaces:**

- Produces (all exported from `scripts/dither/core.ts`):
  - constants `OUTPUT_WIDTH = 1440`, `CELL = 2`, `CONTRAST = 1.4`, `GAMMA = 1.15`, `BLACK_POINT = 0.06`, `INK = { r: 10, g: 10, b: 10 }`, `PARCHMENT = { r: 242, g: 238, b: 230 }`
  - `type Algorithm = 'bayer' | 'floyd-steinberg'`
  - `applyCurve(v: number): number` — 0..255 → 0..1
  - `toLuma(gray: Uint8Array): Float32Array`
  - `ditherBayer(luma: Float32Array, width: number, height: number): Uint8Array` — 0/1 per pixel
  - `ditherFloydSteinberg(luma: Float32Array, width: number, height: number): Uint8Array`
  - `dither(algorithm: Algorithm, luma: Float32Array, width: number, height: number): Uint8Array`
  - `scaleNearest(bits: Uint8Array, width: number, height: number, cell: number): Uint8Array`
  - `toRgb(bits: Uint8Array): Uint8Array` — 3 channels, INK for 0, PARCHMENT for 1

- [ ] **Step 1: Add `tsx`**

```bash
pnpm add -D tsx
```

Then add to `package.json` `scripts`:

```json
"dither": "tsx scripts/dither.ts",
"icons": "tsx scripts/icons.ts"
```

(`scripts/dither.ts` and `scripts/icons.ts` are created in Tasks 2 and 9; the script entries can exist before the files.)

- [ ] **Step 2: Write the failing tests**

Create `scripts/dither/core.test.ts`:

```ts
import {
  BAYER_8x8,
  CELL,
  applyCurve,
  dither,
  ditherBayer,
  ditherFloydSteinberg,
  scaleNearest,
  toLuma,
  toRgb,
  INK,
  PARCHMENT,
} from './core'

describe('applyCurve', () => {
  it('maps black to 0 and white to 1', () => {
    expect(applyCurve(0)).toBe(0)
    expect(applyCurve(255)).toBe(1)
  })

  it('is monotonic', () => {
    let prev = -1
    for (let v = 0; v <= 255; v++) {
      const cur = applyCurve(v)
      expect(cur).toBeGreaterThanOrEqual(prev)
      prev = cur
    }
  })

  it('crushes near-black to pure black (BLACK_POINT)', () => {
    expect(applyCurve(8)).toBe(0)
  })
})

describe('toLuma', () => {
  it('returns one float per byte, curved', () => {
    const luma = toLuma(new Uint8Array([0, 255, 128]))
    expect(luma).toHaveLength(3)
    expect(luma[0]).toBe(0)
    expect(luma[1]).toBe(1)
    expect(luma[2]).toBeGreaterThan(0)
    expect(luma[2]).toBeLessThan(1)
  })
})

describe('BAYER_8x8', () => {
  it('is a permutation of 0..63', () => {
    const flat = BAYER_8x8.flat().sort((a, b) => a - b)
    expect(flat).toEqual(Array.from({ length: 64 }, (_, i) => i))
  })
})

describe('ditherBayer', () => {
  it('outputs only 0 or 1', () => {
    const w = 16
    const h = 16
    const luma = new Float32Array(w * h).fill(0.5)
    const bits = ditherBayer(luma, w, h)
    expect(bits).toHaveLength(w * h)
    expect(new Set(bits)).toEqual(new Set([0, 1]))
  })

  it('50% grey lights about half the pixels', () => {
    const w = 8
    const h = 8
    const bits = ditherBayer(new Float32Array(w * h).fill(0.5), w, h)
    const lit = bits.reduce((a, b) => a + b, 0)
    expect(lit).toBe(32)
  })

  it('pure black stays black, pure white stays white', () => {
    const w = 8
    const h = 8
    expect(
      ditherBayer(new Float32Array(w * h).fill(0), w, h).every((b) => b === 0)
    ).toBe(true)
    expect(
      ditherBayer(new Float32Array(w * h).fill(1), w, h).every((b) => b === 1)
    ).toBe(true)
  })

  it('is deterministic and tiles the 8x8 matrix', () => {
    const w = 16
    const h = 16
    const a = ditherBayer(new Float32Array(w * h).fill(0.3), w, h)
    const b = ditherBayer(new Float32Array(w * h).fill(0.3), w, h)
    expect(a).toEqual(b)
    expect(a[0]).toBe(a[8])
    expect(a[0]).toBe(a[8 * w])
  })
})

describe('ditherFloydSteinberg', () => {
  it('preserves average brightness within 2%', () => {
    const w = 64
    const h = 64
    const bits = ditherFloydSteinberg(new Float32Array(w * h).fill(0.25), w, h)
    const lit = bits.reduce((a, b) => a + b, 0) / (w * h)
    expect(Math.abs(lit - 0.25)).toBeLessThan(0.02)
  })

  it('does not mutate its input', () => {
    const luma = new Float32Array(16).fill(0.4)
    const copy = Float32Array.from(luma)
    ditherFloydSteinberg(luma, 4, 4)
    expect(luma).toEqual(copy)
  })
})

describe('dither', () => {
  it('dispatches by algorithm', () => {
    const luma = new Float32Array(64).fill(0.5)
    expect(dither('bayer', luma, 8, 8)).toEqual(ditherBayer(luma, 8, 8))
    expect(dither('floyd-steinberg', luma, 8, 8)).toEqual(
      ditherFloydSteinberg(luma, 8, 8)
    )
  })
})

describe('scaleNearest', () => {
  it('expands each bit into a cell×cell block', () => {
    const bits = new Uint8Array([1, 0, 0, 1])
    const out = scaleNearest(bits, 2, 2, CELL)
    expect(out).toHaveLength(16)
    // row 0: 1 1 0 0
    expect(Array.from(out.slice(0, 4))).toEqual([1, 1, 0, 0])
    // row 2: 0 0 1 1
    expect(Array.from(out.slice(8, 12))).toEqual([0, 0, 1, 1])
  })
})

describe('toRgb', () => {
  it('maps 0 → INK and 1 → PARCHMENT', () => {
    const rgb = toRgb(new Uint8Array([0, 1]))
    expect(Array.from(rgb)).toEqual([
      INK.r,
      INK.g,
      INK.b,
      PARCHMENT.r,
      PARCHMENT.g,
      PARCHMENT.b,
    ])
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test scripts/dither/core.test.ts`
Expected: FAIL — `Cannot find module './core'`.

- [ ] **Step 4: Implement `scripts/dither/core.ts`**

```ts
/**
 * Pure dither math. No I/O, no sharp. Every tunable is a constant here so
 * all scenes are processed identically (spec §5.1 / §6.3).
 */

export const OUTPUT_WIDTH = 1440
/** Dither pixel = CELL device pixels. 2 → reads as 1-bit on retina. */
export const CELL = 2
/** Slope of the S-curve around mid grey. >1 = more contrast. */
export const CONTRAST = 1.4
/** >1 darkens mids → sparser mesh on the black background. */
export const GAMMA = 1.15
/** Luma below this is crushed to pure black (kills background noise). */
export const BLACK_POINT = 0.06

export const INK = { r: 10, g: 10, b: 10 } as const // #0A0A0A
export const PARCHMENT = { r: 242, g: 238, b: 230 } as const // #F2EEE6

export type Algorithm = 'bayer' | 'floyd-steinberg'

export const BAYER_8x8: number[][] = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)

/** 0..255 grey → 0..1 luma after contrast, gamma and black point. */
export function applyCurve(v: number): number {
  let x = v / 255
  x = clamp01((x - 0.5) * CONTRAST + 0.5)
  x = Math.pow(x, GAMMA)
  if (x < BLACK_POINT) return 0
  return x
}

export function toLuma(gray: Uint8Array): Float32Array {
  const out = new Float32Array(gray.length)
  for (let i = 0; i < gray.length; i++) out[i] = applyCurve(gray[i])
  return out
}

export function ditherBayer(
  luma: Float32Array,
  width: number,
  height: number
): Uint8Array {
  const out = new Uint8Array(width * height)
  for (let y = 0; y < height; y++) {
    const row = BAYER_8x8[y & 7]
    for (let x = 0; x < width; x++) {
      const threshold = (row[x & 7] + 0.5) / 64
      out[y * width + x] = luma[y * width + x] > threshold ? 1 : 0
    }
  }
  return out
}

export function ditherFloydSteinberg(
  luma: Float32Array,
  width: number,
  height: number
): Uint8Array {
  const buf = Float32Array.from(luma)
  const out = new Uint8Array(width * height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x
      const old = buf[i]
      const bit = old >= 0.5 ? 1 : 0
      out[i] = bit
      const err = old - bit
      if (x + 1 < width) buf[i + 1] += (err * 7) / 16
      if (y + 1 < height) {
        if (x > 0) buf[i + width - 1] += (err * 3) / 16
        buf[i + width] += (err * 5) / 16
        if (x + 1 < width) buf[i + width + 1] += (err * 1) / 16
      }
    }
  }
  return out
}

export function dither(
  algorithm: Algorithm,
  luma: Float32Array,
  width: number,
  height: number
): Uint8Array {
  return algorithm === 'bayer'
    ? ditherBayer(luma, width, height)
    : ditherFloydSteinberg(luma, width, height)
}

/** Nearest-neighbour upscale so each dither pixel becomes a cell×cell block. */
export function scaleNearest(
  bits: Uint8Array,
  width: number,
  height: number,
  cell: number
): Uint8Array {
  const ow = width * cell
  const oh = height * cell
  const out = new Uint8Array(ow * oh)
  for (let y = 0; y < oh; y++) {
    const sy = Math.floor(y / cell)
    for (let x = 0; x < ow; x++) {
      out[y * ow + x] = bits[sy * width + Math.floor(x / cell)]
    }
  }
  return out
}

export function toRgb(bits: Uint8Array): Uint8Array {
  const out = new Uint8Array(bits.length * 3)
  for (let i = 0; i < bits.length; i++) {
    const c = bits[i] ? PARCHMENT : INK
    out[i * 3] = c.r
    out[i * 3 + 1] = c.g
    out[i * 3 + 2] = c.b
  }
  return out
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test scripts/dither/core.test.ts`
Expected: PASS (13 tests). If the `50% grey lights about half` test fails with 31/33, the Bayer threshold offset is wrong — it must be `(M + 0.5) / 64`.

- [ ] **Step 6: Gates and commit**

```bash
pnpm lint && pnpm exec tsc --noEmit
git add package.json pnpm-lock.yaml scripts/dither/core.ts scripts/dither/core.test.ts
git commit -m "feat(dither): pure Bayer/Floyd–Steinberg core with fixed constants"
```

---

### Task 2: Dither pipeline, manifest and CLI

**Files:**

- Create: `scripts/dither/pipeline.ts`
- Create: `scripts/dither/manifest.ts`
- Create: `scripts/dither.ts`
- Test: `scripts/dither/pipeline.test.ts`

**Interfaces:**

- Consumes: everything from Task 1 `core.ts`.
- Produces:
  - `renderScene(input: Buffer | string, algorithm: Algorithm): Promise<RenderedScene>` where `type RenderedScene = { png: Buffer; webp: Buffer; width: number; height: number }` (width/height are the **output** pixel dims, i.e. after `CELL` upscale).
  - `type SceneEntry = { name: string; source: string; algorithm: Algorithm }` and `scenes: SceneEntry[]` in `manifest.ts`.
  - CLI `pnpm dither` (manifest mode) writes `public/scenes/<name>.png`, `public/scenes/<name>.webp` and `src/configs/scenes.generated.ts`.
  - CLI `pnpm dither <input> <outputBase> [bayer|floyd-steinberg]` (ad-hoc mode) writes `<outputBase>.png` + `.webp` only.
  - `src/configs/scenes.generated.ts` shape (Plan 3 imports this):

```ts
export type SceneAsset = {
  png: string
  webp: string
  width: number
  height: number
  cssWidth: number
  cssHeight: number
}
export const scenes: Record<SceneName, SceneAsset>
export type SceneName =
  | 'home-scribe'
  | 'about-scribe'
  | 'avatar'
  | 'projects-wall'
  | 'bookshelf-library'
  | 'notebook-desk'
  | 'tech-bench'
  | 'contact-letter'
```

- [ ] **Step 1: Write the failing pipeline test**

Create `scripts/dither/pipeline.test.ts`:

```ts
import sharp from 'sharp'
import { CELL, INK, PARCHMENT } from './core'
import { renderScene } from './pipeline'

async function gradient(width: number, height: number): Promise<Buffer> {
  const raw = new Uint8Array(width * height)
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      raw[y * width + x] = Math.round((x / (width - 1)) * 255)
  return sharp(Buffer.from(raw), { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer()
}

async function distinctColors(png: Buffer): Promise<Set<string>> {
  const { data, info } = await sharp(png)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const set = new Set<string>()
  for (let i = 0; i < data.length; i += info.channels)
    set.add(`${data[i]},${data[i + 1]},${data[i + 2]}`)
  return set
}

describe('renderScene', () => {
  it('outputs a two-colour PNG scaled by CELL (no enlargement of small sources)', async () => {
    const src = await gradient(64, 8)
    const out = await renderScene(src, 'bayer')
    expect(out.width).toBe(64 * CELL)
    expect(out.height).toBe(8 * CELL)

    const meta = await sharp(out.png).metadata()
    expect(meta.width).toBe(64 * CELL)
    expect(meta.height).toBe(8 * CELL)

    const colors = await distinctColors(out.png)
    expect(colors).toEqual(
      new Set([
        `${INK.r},${INK.g},${INK.b}`,
        `${PARCHMENT.r},${PARCHMENT.g},${PARCHMENT.b}`,
      ])
    )
  })

  it('is darker on the left than on the right', async () => {
    const src = await gradient(64, 8)
    const out = await renderScene(src, 'floyd-steinberg')
    const { data, info } = await sharp(out.png)
      .raw()
      .toBuffer({ resolveWithObject: true })
    const litInColumnRange = (from: number, to: number) => {
      let lit = 0
      for (let y = 0; y < info.height; y++)
        for (let x = from; x < to; x++)
          if (data[(y * info.width + x) * info.channels] > 128) lit++
      return lit
    }
    const w = info.width
    expect(litInColumnRange(0, w / 4)).toBeLessThan(
      litInColumnRange((3 * w) / 4, w)
    )
  })

  it('also returns a WebP with the same dimensions', async () => {
    const src = await gradient(32, 4)
    const out = await renderScene(src, 'bayer')
    const meta = await sharp(out.webp).metadata()
    expect(meta.format).toBe('webp')
    expect(meta.width).toBe(32 * CELL)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test scripts/dither/pipeline.test.ts`
Expected: FAIL — `Cannot find module './pipeline'`.

- [ ] **Step 3: Implement `scripts/dither/pipeline.ts`**

```ts
import sharp from 'sharp'
import {
  Algorithm,
  CELL,
  OUTPUT_WIDTH,
  dither,
  scaleNearest,
  toLuma,
  toRgb,
} from './core'

export type RenderedScene = {
  png: Buffer
  webp: Buffer
  width: number
  height: number
}

/**
 * input → grayscale (≤ OUTPUT_WIDTH) → curve → dither → CELL upscale →
 * 1-bit palette PNG + lossless WebP, both ink/parchment only.
 */
export async function renderScene(
  input: Buffer | string,
  algorithm: Algorithm
): Promise<RenderedScene> {
  const { data, info } = await sharp(input)
    .resize({ width: OUTPUT_WIDTH, withoutEnlargement: true })
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true })

  const luma = toLuma(new Uint8Array(data.buffer, data.byteOffset, data.length))
  const bits = dither(algorithm, luma, info.width, info.height)
  const scaled = scaleNearest(bits, info.width, info.height, CELL)
  const width = info.width * CELL
  const height = info.height * CELL
  const rgb = Buffer.from(toRgb(scaled))

  const base = () => sharp(rgb, { raw: { width, height, channels: 3 } })
  const [png, webp] = await Promise.all([
    base().png({ palette: true, colours: 2, compressionLevel: 9 }).toBuffer(),
    base().webp({ lossless: true }).toBuffer(),
  ])

  return { png, webp, width, height }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test scripts/dither/pipeline.test.ts`
Expected: PASS (3 tests). If `info.channels !== 1` errors appear, replace `.toColourspace('b-w')` with `.grayscale().toColourspace('b-w')`.

- [ ] **Step 5: Create the manifest**

Create `scripts/dither/manifest.ts`:

```ts
import type { Algorithm } from './core'

export type SceneEntry = {
  name: string
  source: string
  algorithm: Algorithm
}

/**
 * One entry per scene (spec §3.3) plus the avatar bust.
 * `algorithm` is the only per-scene choice; every other parameter is a
 * constant in core.ts. Switch a portrait-like scene to 'floyd-steinberg'
 * only after the visual check in Task 7.
 */
export const scenes: SceneEntry[] = [
  {
    name: 'home-scribe',
    source: 'art/source/home-scribe.png',
    algorithm: 'bayer',
  },
  {
    name: 'about-scribe',
    source: 'art/source/about-scribe.png',
    algorithm: 'bayer',
  },
  { name: 'avatar', source: 'art/source/avatar.png', algorithm: 'bayer' },
  {
    name: 'projects-wall',
    source: 'art/source/projects-wall.png',
    algorithm: 'bayer',
  },
  {
    name: 'bookshelf-library',
    source: 'art/source/bookshelf-library.png',
    algorithm: 'bayer',
  },
  {
    name: 'notebook-desk',
    source: 'art/source/notebook-desk.png',
    algorithm: 'bayer',
  },
  {
    name: 'tech-bench',
    source: 'art/source/tech-bench.png',
    algorithm: 'bayer',
  },
  {
    name: 'contact-letter',
    source: 'art/source/contact-letter.png',
    algorithm: 'bayer',
  },
]
```

- [ ] **Step 6: Create the CLI**

Create `scripts/dither.ts`:

```ts
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { Algorithm, CELL } from './dither/core'
import { scenes } from './dither/manifest'
import { renderScene } from './dither/pipeline'

const ROOT = process.cwd()
const OUT_DIR = path.join(ROOT, 'public', 'scenes')
const GENERATED = path.join(ROOT, 'src', 'configs', 'scenes.generated.ts')

type Rendered = { name: string; width: number; height: number }

async function writeOutputs(
  base: string,
  algorithm: Algorithm,
  source: string
): Promise<{ width: number; height: number }> {
  const out = await renderScene(source, algorithm)
  await mkdir(path.dirname(base), { recursive: true })
  await writeFile(`${base}.png`, out.png)
  await writeFile(`${base}.webp`, out.webp)
  console.log(
    `${path.relative(ROOT, base)}  ${out.width}×${out.height}  (${algorithm}, png ${Math.round(out.png.length / 1024)} KB, webp ${Math.round(out.webp.length / 1024)} KB)`
  )
  return { width: out.width, height: out.height }
}

function generatedSource(list: Rendered[]): string {
  const names = list.map((s) => `'${s.name}'`).join(' | ')
  const entries = list
    .map(
      (s) => `  '${s.name}': {
    png: '/scenes/${s.name}.png',
    webp: '/scenes/${s.name}.webp',
    width: ${s.width},
    height: ${s.height},
    cssWidth: ${s.width / CELL},
    cssHeight: ${s.height / CELL},
  },`
    )
    .join('\n')
  return `// Generated by \`pnpm dither\`. Do not edit by hand.
export type SceneName = ${names}

export type SceneAsset = {
  png: string
  webp: string
  width: number
  height: number
  cssWidth: number
  cssHeight: number
}

export const scenes: Record<SceneName, SceneAsset> = {
${entries}
}
`
}

async function runManifest() {
  const rendered: Rendered[] = []
  for (const scene of scenes) {
    const source = path.join(ROOT, scene.source)
    if (!existsSync(source)) {
      console.warn(`skip ${scene.name}: missing ${scene.source}`)
      continue
    }
    const dims = await writeOutputs(
      path.join(OUT_DIR, scene.name),
      scene.algorithm,
      source
    )
    rendered.push({ name: scene.name, ...dims })
  }
  if (rendered.length === 0) {
    console.error('no scenes rendered — add sources under art/source/')
    process.exit(1)
  }
  await writeFile(GENERATED, generatedSource(rendered))
  console.log(`wrote ${path.relative(ROOT, GENERATED)}`)
}

async function runAdHoc(input: string, outputBase: string, algorithm: string) {
  if (algorithm !== 'bayer' && algorithm !== 'floyd-steinberg') {
    console.error(`unknown algorithm "${algorithm}"`)
    process.exit(1)
  }
  await writeOutputs(path.resolve(outputBase), algorithm, path.resolve(input))
}

const [, , input, outputBase, algorithm = 'bayer'] = process.argv
if (input && outputBase) {
  runAdHoc(input, outputBase, algorithm)
} else {
  runManifest()
}
```

- [ ] **Step 7: Smoke-run the CLI in ad-hoc mode**

```bash
mkdir -p /tmp/dither-smoke
pnpm exec tsx -e "import sharp from 'sharp'; const w=512,h=256; const raw=new Uint8Array(w*h); for(let y=0;y<h;y++)for(let x=0;x<w;x++)raw[y*w+x]=Math.round(255*x/(w-1)); sharp(Buffer.from(raw),{raw:{width:w,height:h,channels:1}}).png().toFile('/tmp/dither-smoke/in.png').then(()=>console.log('ok'))"
pnpm dither /tmp/dither-smoke/in.png /tmp/dither-smoke/out
pnpm dither /tmp/dither-smoke/in.png /tmp/dither-smoke/out-fs floyd-steinberg
open /tmp/dither-smoke/out.png /tmp/dither-smoke/out-fs.png
```

Expected: two files printed at `1024×512`; the Bayer one shows a regular cross-hatch mesh, the F–S one a diffuse grain. Also run `pnpm dither` with no args: expected `skip …: missing …` for every entry then exit code 1 (no sources yet) — that proves manifest mode is wired.

- [ ] **Step 8: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add scripts/dither.ts scripts/dither/pipeline.ts scripts/dither/pipeline.test.ts scripts/dither/manifest.ts
git commit -m "feat(dither): sharp pipeline, scene manifest and CLI writing public/scenes"
```

---

### Task 3: Prompts — base prompt, archetypes, poses, scenes

**Files:**

- Create: `art/PROMPTS.md`

**Interfaces:**

- Produces: the exact prompt strings Tasks 4–6 paste into `generate_image_batch`. Tasks 4–6 must copy from this file verbatim (that is how the mesh/style stays consistent across scenes).

- [ ] **Step 1: Write `art/PROMPTS.md`**

```markdown
# Prompts — the Scribe universe

Model: `nano_banana_pro` (Higgsfield). Exploration at `resolution: "2k"`, finals at `"4k"`.
Every prompt = STYLE + subject + NEGATIVE. Copy verbatim. Change only the bracketed slot.

## STYLE (prefix for every prompt)

Black-and-white engraving illustration in the style of a 19th-century woodcut and Gustave Doré, fine parallel hatching and cross-hatching, extremely high contrast, pure black background, white ink lines only, no grey washes, no color, no gradients, monochrome line art, dramatic single light source, richly detailed, print-quality, centered composition,

## NEGATIVE (suffix for every prompt)

no text, no letters, no watermark, no signature, no logo, no frame border, no color, no sepia, no grey background, no photographic realism, no 3D render, no anime, no soft shading, no blur.

## CHARACTER SHEET (inserted into every Scribe prompt)

a hooded medieval scribe in a simple plain cloak with no armor, face partly hidden in the shadow of the hood, holding a quill pen in his right hand, a single lit candle on the desk beside him is the only light source, an open book of parchment in front of him whose handwriting is made of curly braces and indented lines like source code,

## 1. Archetype exploration (Task 4) — 4 prompts, 3:4, 2k

Same STYLE, same framing, only the subject changes. Framing sentence for all four:
"full figure seen from the front, seated at a heavy wooden desk, medium shot, symmetrical, the figure fills the frame from the knees up,"

1. **scribe** — STYLE + framing + CHARACTER SHEET + "a thin circular halo of fine engraved lines behind his head," + NEGATIVE
2. **cartographer** — STYLE + framing + "a hooded medieval cartographer in a plain cloak, no armor, holding a quill in his right hand, a lit candle beside him is the only light source, a large unrolled map on the desk covered in coastlines, compass roses and grid lines, a brass compass and dividers, a thin circular halo of fine engraved lines behind his head," + NEGATIVE
3. **knight** — STYLE + framing + "a hooded medieval knight in a plain cloak over simple chainmail, helmet off, holding a quill in his right hand instead of a sword, a lit candle beside him is the only light source, an open book of parchment whose handwriting is made of curly braces and indented lines like source code, a thin circular halo of fine engraved lines behind his head," + NEGATIVE
4. **astronomer** — STYLE + framing + "a hooded medieval astronomer in a plain cloak, no armor, holding a quill in his right hand, a lit candle beside him is the only light source, a brass astrolabe and an armillary sphere on the desk, a star chart of parchment with orbits and geometric diagrams, a thin circular halo of fine engraved lines behind his head," + NEGATIVE

## 2. Character poses (Task 5) — reference = chosen archetype job, 4k

- **home-scribe** (3:4) — STYLE + "full figure seen from the front, seated at a heavy wooden desk, medium shot, symmetrical, the figure fills the frame from the knees up," + CHARACTER SHEET + "a thin circular halo of fine engraved lines behind his head, the same character as the reference image," + NEGATIVE
- **about-scribe** (3:4) — STYLE + "full figure in strict side profile facing left, seated at a heavy wooden desk, leaning slightly forward, writing," + CHARACTER SHEET + "no halo, the same character as the reference image," + NEGATIVE
- **avatar** (1:1) — STYLE + "bust portrait, head and shoulders, seen from the front, hood up," + CHARACTER SHEET (drop the desk/book clause: keep hood, cloak, shadowed face, quill tip visible at the bottom edge, candle glow from below-left) + "no halo, the same character as the reference image," + NEGATIVE

## 3. Scenes without the character (Task 6) — reference = home-scribe job (style lock), 4k

- **projects-wall** (21:9) — STYLE + "a stone scriptorium wall covered edge to edge with framed illuminated manuscripts and finished pages pinned in neat rows, each frame a different size, a wooden shelf below holding stacked bound volumes, one candle on the shelf as the only light source, no people," + NEGATIVE
- **bookshelf-library** (16:9) — STYLE + "the interior of a tall monastic library, towering wooden shelves full of bound books rising into darkness, a narrow ladder leaning against the shelves, a vaulted stone ceiling, one candle on a reading stand as the only light source, no people," + NEGATIVE
- **notebook-desk** (21:9) — STYLE + "a scribe's desk seen directly from above, top-down view, a sheet of parchment with handwriting made of curly braces and indented lines like source code, an inkwell, a quill laid diagonally, a small knife, a burning candle in the corner as the only light source, wood grain visible, no people, no hands," + NEGATIVE
- **tech-bench** (21:9) — STYLE + "a scriptorium tool bench seen at a slight angle from above, quills of different sizes lined up, wooden rulers, small glass ink bottles, penknives, a burnishing tool, a pounce pot, sheets of blank parchment, one candle at the end of the bench as the only light source, no people, no hands," + NEGATIVE
- **contact-letter** (16:9) — STYLE + "a single folded parchment letter lying on a dark wooden table, closed with a large round blank wax seal with no marking on it, a quill resting beside it, a burning candle behind it as the only light source, no people, no hands," + NEGATIVE

Note: the FM ex-libris is **not** generated — the wax seal is left blank and Plan 3 overlays `ExLibris mark='seal'` in amber on the Contact page.
```

- [ ] **Step 2: Commit**

```bash
git add art/PROMPTS.md
git commit -m "docs(art): base prompt, archetype, pose and scene prompts for the Scribe universe"
```

---

### Task 4: Archetype exploration on Higgsfield (main session; HUMAN GATE)

**Files:**

- Add: `art/archetypes/scribe.png`, `cartographer.png`, `knight.png`, `astronomer.png`
- Add: `art/archetypes/dithered/<name>.png` (previews)
- Modify: `art/PROMPTS.md` (append the decision + job ids)

**Interfaces:**

- Consumes: `art/PROMPTS.md` §1; `pnpm dither <in> <out>` (Task 2).
- Produces: the chosen archetype's **Higgsfield `job_id`** recorded in `art/PROMPTS.md` — Task 5 passes it as `image_references`.

- [ ] **Step 1: Load the MCP tools**

Use ToolSearch once:
`select:mcp__claude_ai_higgsfield__balance,mcp__claude_ai_higgsfield__generate_image,mcp__claude_ai_higgsfield__generate_image_batch,mcp__claude_ai_higgsfield__jobs_wait,mcp__claude_ai_higgsfield__show_generation_by_ids`

- [ ] **Step 2: Preflight balance and cost**

Call `balance`. Then call `generate_image` with `{ model: 'nano_banana_pro', resolution: '2k', aspect_ratio: '3:4', prompt: '<scribe prompt>', get_cost: true }`. Report to Felipe: cost per 2k image × 4, and (call again with `resolution: '4k'`) cost per 4k image × 8 for Tasks 5–6. **Stop if credits < total.** Do not pass `use_unlim`.

- [ ] **Step 3: Submit the four archetypes**

`generate_image_batch` with four requests, `index` 1–4 in the order of `art/PROMPTS.md` §1, each `{ model: 'nano_banana_pro', resolution: '2k', aspect_ratio: '3:4', prompt: <STYLE + framing + subject + NEGATIVE verbatim> }`.

- [ ] **Step 4: Wait and download**

`jobs_wait` with the four `{ index, job_id }` (repeat until `all_terminal: true`). Then `show_generation_by_ids` with the same set. From the result URLs:

```bash
mkdir -p art/archetypes/dithered
curl -L -o art/archetypes/scribe.png       "<url-1>"
curl -L -o art/archetypes/cartographer.png "<url-2>"
curl -L -o art/archetypes/knight.png       "<url-3>"
curl -L -o art/archetypes/astronomer.png   "<url-4>"
for n in scribe cartographer knight astronomer; do pnpm dither art/archetypes/$n.png art/archetypes/dithered/$n; done
open art/archetypes art/archetypes/dithered
```

Expected: four PNGs ≥ 1500px wide, four dithered previews at 2880px wide.

- [ ] **Step 5: Human gate — Felipe picks**

Show the four side by side (the dithered previews are the ones that matter — that's how they will look on the site). Ask Felipe: which archetype, and whether the chosen image itself is good enough as the hero source or needs a regeneration (max one more batch of 2 variants of the same prompt with `count: 2` on `generate_image`). Record in `art/PROMPTS.md` under a new `## Decision` heading: chosen archetype, `job_id`, date.

- [ ] **Step 6: Commit**

```bash
git add art/archetypes art/PROMPTS.md
git commit -m "feat(art): archetype exploration and character decision"
```

---

### Task 5: Character poses — hero, about, avatar (main session)

**Files:**

- Add: `art/source/home-scribe.png`, `art/source/about-scribe.png`, `art/source/avatar.png`
- Modify: `art/PROMPTS.md` (job ids)

**Interfaces:**

- Consumes: chosen archetype `job_id` from Task 4; prompts from `art/PROMPTS.md` §2.
- Produces: `home-scribe` `job_id` (style reference for Task 6); three sources ≥ 2048px on the long edge for Task 7.

- [ ] **Step 1: Submit**

`generate_image_batch`, three requests, `resolution: '4k'`, each with `medias: [{ role: 'image_references', value: '<chosen archetype job_id>' }]`:

| index | name         | aspect_ratio | prompt (`art/PROMPTS.md` §2) |
| ----- | ------------ | ------------ | ---------------------------- |
| 1     | home-scribe  | `3:4`        | home-scribe                  |
| 2     | about-scribe | `3:4`        | about-scribe                 |
| 3     | avatar       | `1:1`        | avatar                       |

If the chosen archetype was **not** the Scribe, replace CHARACTER SHEET in the three prompts with the chosen archetype's subject clause from §1 (keeping hood, cloak, quill-right-hand, candle, shadowed face) and update §2 accordingly before submitting.

- [ ] **Step 2: Wait, download, verify size**

`jobs_wait` → `show_generation_by_ids` → download:

```bash
mkdir -p art/source
curl -L -o art/source/home-scribe.png  "<url-1>"
curl -L -o art/source/about-scribe.png "<url-2>"
curl -L -o art/source/avatar.png       "<url-3>"
pnpm exec tsx -e "import sharp from 'sharp'; for (const f of ['home-scribe','about-scribe','avatar']) sharp('art/source/'+f+'.png').metadata().then(m=>console.log(f, m.width, m.height))"
```

Expected: each `max(width, height) ≥ 2048`. If any is smaller, re-submit that one at `4k` (do not accept 2k for finals).

- [ ] **Step 3: Quick dither check**

```bash
pnpm dither
open public/scenes
```

Expected: `home-scribe`, `about-scribe`, `avatar` rendered (others skipped). Check: halo only on `home-scribe`; quill in the right hand; face in shadow. If a pose is wrong, regenerate that one (same refs, same prompt) — at most two retries; then record what was accepted in `art/PROMPTS.md`.

- [ ] **Step 4: Commit**

```bash
git add art/source art/PROMPTS.md
git commit -m "feat(art): Scribe hero, profile and avatar sources"
```

(`public/scenes` and `scenes.generated.ts` are committed in Task 7 once every scene exists.)

---

### Task 6: The five scenes without the character (main session)

**Files:**

- Add: `art/source/projects-wall.png`, `bookshelf-library.png`, `notebook-desk.png`, `tech-bench.png`, `contact-letter.png`
- Modify: `art/PROMPTS.md` (job ids)

**Interfaces:**

- Consumes: `home-scribe` `job_id` from Task 5 as `image_references` (style lock); prompts `art/PROMPTS.md` §3.
- Produces: five sources ≥ 2048px wide for Task 7.

- [ ] **Step 1: Submit**

`generate_image_batch`, five requests, `resolution: '4k'`, each `medias: [{ role: 'image_references', value: '<home-scribe job_id>' }]`:

| index | name              | aspect_ratio |
| ----- | ----------------- | ------------ |
| 1     | projects-wall     | `21:9`       |
| 2     | bookshelf-library | `16:9`       |
| 3     | notebook-desk     | `21:9`       |
| 4     | tech-bench        | `21:9`       |
| 5     | contact-letter    | `16:9`       |

- [ ] **Step 2: Wait, download, verify**

```bash
for n in projects-wall bookshelf-library notebook-desk tech-bench contact-letter; do curl -L -o art/source/$n.png "<url-for-$n>"; done
pnpm exec tsx -e "import sharp from 'sharp'; for (const f of ['projects-wall','bookshelf-library','notebook-desk','tech-bench','contact-letter']) sharp('art/source/'+f+'.png').metadata().then(m=>console.log(f, m.width, m.height))"
```

Expected: width ≥ 2048 each; no people/hands; `contact-letter` seal is blank. Regenerate offenders (max two retries each).

- [ ] **Step 3: Commit**

```bash
git add art/source art/PROMPTS.md
git commit -m "feat(art): projects, bookshelf, notebook, tech-stack and contact scene sources"
```

---

### Task 7: Render all scenes and visual check

**Files:**

- Add: `public/scenes/*.png`, `public/scenes/*.webp`
- Gen: `src/configs/scenes.generated.ts`
- Create: `src/app/dev-assets/page.tsx` (temporary)
- Modify (maybe): `scripts/dither/manifest.ts` (algorithm per scene)

**Interfaces:**

- Consumes: `renderScene`/CLI (Task 2), sources (Tasks 5–6).
- Produces: `scenes` from `src/configs/scenes.generated.ts` (shape in Task 2) — Plan 3 renders each as `<img src={scenes[name].png} width={cssWidth} height={cssHeight} style={{ imageRendering: 'pixelated' }} />` (never through `next/image` optimization — it would re-encode and blur the 1-bit mesh).

- [ ] **Step 1: Render**

```bash
pnpm dither
```

Expected: eight lines `public/scenes/<name>  W×H (bayer, png … KB, webp … KB)` and `wrote src/configs/scenes.generated.ts`. Widths are `2880` (or less for narrower aspect after `withoutEnlargement`). PNGs should be < 600 KB each.

- [ ] **Step 2: Add the temporary preview page**

Create `src/app/dev-assets/page.tsx`:

```tsx
import Eyebrow from '@/components/ui/Eyebrow'
import { scenes } from '@/configs/scenes.generated'

export const metadata = { robots: { index: false, follow: false } }

const DevAssetsPage = () => {
  return (
    <main className='flex flex-col gap-12 py-12'>
      {Object.entries(scenes).map(([name, scene]) => (
        <section
          key={name}
          className='flex flex-col gap-3 border-t border-line pt-4'
        >
          <Eyebrow>{name}</Eyebrow>
          <p className='text-parchment-mute eyebrow-text'>
            {scene.width}×{scene.height} → {scene.cssWidth}×{scene.cssHeight}{' '}
            css
          </p>
          <div className='relative'>
            <img
              src={scene.png}
              width={scene.cssWidth}
              height={scene.cssHeight}
              alt=''
              className='max-w-full'
              style={{ imageRendering: 'pixelated' }}
            />
            <div
              aria-hidden
              className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent'
            />
            <h2 className='absolute bottom-6 left-6 text-parchment display-2'>
              {name.replace('-', ' ')}
            </h2>
          </div>
        </section>
      ))}
    </main>
  )
}

export default DevAssetsPage
```

(`Eyebrow` takes `children` (+ optional `index`, `active`) and renders a `<p>`; `Eyebrow` is a default export. The scrim here is a preview aid only; the `bg-gradient-to-t from-ink` is the one allowed gradient — ink → transparent scrim, spec §5.3.)

- [ ] **Step 3: Visual check**

```bash
pnpm dev
```

Open `http://localhost:3000/dev-assets` at 1440px and 390px (Chrome MCP if available; otherwise Felipe eyeballs). For each scene decide:

- Mesh reads as 1-bit, not noise, at 100% zoom on a retina display.
- Background is pure `ink` (no stray lit pixels in dark areas → if present, raise `BLACK_POINT` to `0.08` in `core.ts`, re-run, re-check all).
- Mids not blown out (if the mesh is too dense, raise `GAMMA` to `1.25`).
- For `home-scribe` / `about-scribe` / `avatar`: compare Bayer vs F–S by temporarily flipping `algorithm` in `manifest.ts` and re-running. Keep whichever reads better as a face; the five environment scenes stay Bayer.

Any constant change → `pnpm dither` again and `pnpm test` (the tests don't pin the exact constants, so they stay green).

- [ ] **Step 4: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add public/scenes src/configs/scenes.generated.ts scripts/dither/manifest.ts scripts/dither/core.ts src/app/dev-assets/page.tsx
git commit -m "feat(scenes): render the seven scenes and avatar to 1-bit"
```

---

### Task 8: FM ex-libris — geometry, component, variants (HUMAN GATE), swap the logo

**Files:**

- Create: `src/assets/ex-libris/paths.ts`
- Create: `src/assets/ExLibris.tsx`
- Test: `src/assets/ExLibris.test.tsx`
- Modify: `src/app/dev-assets/page.tsx` (add the marks section)
- Modify: `src/components/layout/navbar/desktop/index.tsx:32`, `src/components/layout/RootLayout.tsx:14`, `src/components/layout/footer/index.tsx:16`

**Interfaces:**

- Produces:
  - `paths.ts`: `VIEWBOX = '0 0 100 100'`, `STROKE = 7`, `F_PATHS: string[]`, `M_PATHS: string[]`, `F_SOLO_PATHS: string[]`, `F_SOLO_STROKE = 12`, `RING_OUTER = 48`, `RING_INNER = 40`, `type RingStyle = 'hatched' | 'ticks' | 'dotted'`.
  - `ExLibris: React.FC<React.SVGProps<SVGSVGElement> & { mark?: 'seal' | 'monogram' | 'f'; ring?: RingStyle }>` — default `mark='monogram'`, `ring='hatched'`; fills/strokes with `currentColor`; `height='1em' width='1em'` defaults like `Logo.tsx`.
  - Consumers size it with Tailwind classes exactly as they did `LogoSvg`.

- [ ] **Step 1: Write the failing component tests**

Create `src/assets/ExLibris.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import ExLibris from './ExLibris'
import { F_PATHS, M_PATHS, F_SOLO_PATHS } from './ex-libris/paths'

describe('ExLibris', () => {
  it('renders the monogram by default with F and M strokes and no ring', () => {
    const { container } = render(<ExLibris data-testid='mark' />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100')
    const d = Array.from(svg.querySelectorAll('path')).map((p) =>
      p.getAttribute('d')
    )
    for (const p of [...F_PATHS, ...M_PATHS]) expect(d).toContain(p)
    expect(svg.querySelector('circle')).toBeNull()
  })

  it('seal adds the ring', () => {
    const { container } = render(<ExLibris mark='seal' />)
    expect(container.querySelectorAll('circle').length).toBeGreaterThan(0)
  })

  it('lone F renders only the solo F strokes', () => {
    const { container } = render(<ExLibris mark='f' />)
    const d = Array.from(container.querySelectorAll('path')).map((p) =>
      p.getAttribute('d')
    )
    expect(d).toEqual(F_SOLO_PATHS)
  })

  it('uses currentColor only (no hard-coded fills)', () => {
    const { container } = render(<ExLibris mark='seal' ring='hatched' />)
    const html = container.innerHTML
    expect(html).not.toMatch(/#[0-9a-f]{3,6}/i)
    expect(html).toContain('currentColor')
  })

  it('forwards svg props and className', () => {
    const { container } = render(
      <ExLibris className='h-7 w-7' aria-label='Felipe Mateus' />
    )
    const svg = container.querySelector('svg')!
    expect(svg).toHaveClass('h-7', 'w-7')
    expect(svg).toHaveAttribute('aria-label', 'Felipe Mateus')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm test src/assets/ExLibris.test.tsx`
Expected: FAIL — cannot find `./ExLibris`.

- [ ] **Step 3: Geometry — `src/assets/ex-libris/paths.ts`**

The monogram is stroke-built (square caps) so it stays crisp at 28px. Interlace is read through **gaps**: where M passes over F, F's stroke is cut; where F passes over M, M's stroke is cut.

```ts
export const VIEWBOX = '0 0 100 100'
export const STROKE = 7

/**
 * F — stem at x=30, top bar y=34 (cut around x=46 where M's left stem
 * passes OVER it), mid bar y=52 (passes OVER M's left stem).
 */
export const F_PATHS = [
  'M30 34 V72', // stem
  'M30 34 H41', // top bar, left of the crossing
  'M51 34 H60', // top bar, right of the crossing
  'M30 52 H53', // mid bar (over M)
]

/**
 * M — left stem x=46 (cut y 47..57 where F's mid bar passes over),
 * apex at (58,50), right stem x=70. Spans y 28..72.
 */
export const M_PATHS = [
  'M46 72 V57', // left stem, lower part
  'M46 47 V28 L58 50 L70 28 V72', // left stem upper + diagonals + right stem
]

/** Lone F for the favicon. Heavier stroke, fills the square. */
export const F_SOLO_STROKE = 12
export const F_SOLO_PATHS = ['M30 18 V82', 'M30 18 H74', 'M30 50 H64']

export const RING_OUTER = 48
export const RING_INNER = 40

export type RingStyle = 'hatched' | 'ticks' | 'dotted'
```

- [ ] **Step 4: Component — `src/assets/ExLibris.tsx`**

```tsx
import { useId } from 'react'
import {
  F_PATHS,
  F_SOLO_PATHS,
  F_SOLO_STROKE,
  M_PATHS,
  RING_INNER,
  RING_OUTER,
  RingStyle,
  STROKE,
  VIEWBOX,
} from './ex-libris/paths'

type SVGProps = React.SVGProps<SVGSVGElement>

export type ExLibrisMark = 'seal' | 'monogram' | 'f'

type ExLibrisProps = SVGProps & {
  mark?: ExLibrisMark
  ring?: RingStyle
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const

const Ring: React.FC<{ style: RingStyle; patternId: string }> = ({
  style,
  patternId,
}) => {
  const mid = (RING_OUTER + RING_INNER) / 2
  const band = RING_OUTER - RING_INNER
  const circumference = 2 * Math.PI * mid

  if (style === 'hatched') {
    return (
      <>
        <defs>
          <pattern
            id={patternId}
            patternUnits='userSpaceOnUse'
            width='4'
            height='4'
            patternTransform='rotate(45)'
          >
            <line
              x1='0'
              y1='0'
              x2='0'
              y2='4'
              stroke='currentColor'
              strokeWidth='1.2'
            />
          </pattern>
        </defs>
        <circle
          cx='50'
          cy='50'
          r={mid}
          fill='none'
          stroke={`url(#${patternId})`}
          strokeWidth={band}
        />
        <circle
          cx='50'
          cy='50'
          r={RING_OUTER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <circle
          cx='50'
          cy='50'
          r={RING_INNER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
      </>
    )
  }

  if (style === 'ticks') {
    const ticks = 48
    const period = circumference / ticks
    return (
      <>
        <circle
          cx='50'
          cy='50'
          r={RING_OUTER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <circle
          cx='50'
          cy='50'
          r={mid}
          fill='none'
          stroke='currentColor'
          strokeWidth={band - 3}
          strokeDasharray={`1.2 ${period - 1.2}`}
        />
        <circle
          cx='50'
          cy='50'
          r={RING_INNER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
      </>
    )
  }

  const dots = 36
  const period = circumference / dots
  return (
    <>
      <circle
        cx='50'
        cy='50'
        r={RING_OUTER}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle
        cx='50'
        cy='50'
        r={mid}
        fill='none'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeDasharray={`0 ${period}`}
      />
    </>
  )
}

const ExLibris: React.FC<ExLibrisProps> = ({
  mark = 'monogram',
  ring = 'hatched',
  ...props
}) => {
  const patternId = useId()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={VIEWBOX}
      height='1em'
      width='1em'
      {...props}
    >
      {mark === 'seal' ? <Ring style={ring} patternId={patternId} /> : null}
      {mark === 'f'
        ? F_SOLO_PATHS.map((d) => (
            <path key={d} d={d} strokeWidth={F_SOLO_STROKE} {...strokeProps} />
          ))
        : [...F_PATHS, ...M_PATHS].map((d) => (
            <path key={d} d={d} strokeWidth={STROKE} {...strokeProps} />
          ))}
    </svg>
  )
}

export default ExLibris
```

- [ ] **Step 5: Run tests**

Run: `pnpm test src/assets/ExLibris.test.tsx`
Expected: PASS (5 tests). Note `useId` is allowed in Server Components; the file has no `'use client'`.

- [ ] **Step 6: Add the marks section to the preview page**

In `src/app/dev-assets/page.tsx`, import `ExLibris` and add before the scenes loop:

```tsx
<section className='flex flex-col gap-6 border-t border-line pt-4'>
  <Eyebrow>ex-libris — pick a ring</Eyebrow>
  <div className='flex flex-wrap items-end gap-12 text-parchment'>
    {(['hatched', 'ticks', 'dotted'] as const).map((ring) => (
      <div key={ring} className='flex flex-col items-center gap-3'>
        <ExLibris mark='seal' ring={ring} className='h-40 w-40' />
        <ExLibris mark='seal' ring={ring} className='h-16 w-16' />
        <span className='text-parchment-mute eyebrow-text'>{ring}</span>
      </div>
    ))}
    <div className='flex flex-col items-center gap-3'>
      <ExLibris mark='monogram' className='h-40 w-40' />
      <ExLibris mark='monogram' className='h-7 w-7' />
      <span className='text-parchment-mute eyebrow-text'>monogram / 28px</span>
    </div>
    <div className='flex flex-col items-center gap-3'>
      <ExLibris mark='f' className='h-40 w-40' />
      <ExLibris mark='f' className='h-4 w-4' />
      <span className='text-parchment-mute eyebrow-text'>f / 16px</span>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Human gate — Felipe picks the ring and approves the letterforms**

`pnpm dev` → `/dev-assets`. Checks: monogram legible at 28px (both letters readable, the interlace gaps visible); lone F legible at 16px; seal reads as a stamp at 64px. Allowed adjustments: any coordinate in `paths.ts` by ±4 units, `STROKE` 6–9, pattern spacing 3–5, tick/dot counts. Not allowed: gradients, fills other than `currentColor`, a third letter. Record the chosen ring by making it the component's default (`ring = '<chosen>'`).

- [ ] **Step 8: Swap the logo in the shell**

Using `find_symbol`/`replace_content` (Serena) on the three files:

- `src/components/layout/navbar/desktop/index.tsx`: `import LogoSvg from '@/assets/Logo'` → `import ExLibris from '@/assets/ExLibris'`; `<LogoSvg className='h-7 w-10 text-parchment transition-colors hover:text-parchment-dim' />` → `<ExLibris mark='monogram' aria-label='Felipe Mateus' className='h-7 w-7 text-parchment transition-colors hover:text-parchment-dim' />`
- `src/components/layout/RootLayout.tsx`: same import swap; `<LogoSvg className='mx-auto h-8 w-12 …' />` → `<ExLibris mark='monogram' className='mx-auto h-8 w-8 text-parchment-dim transition-colors hover:text-parchment' />`
- `src/components/layout/footer/index.tsx`: same import swap; `<LogoSvg className='h-[60px] w-[92px] text-parchment' />` → `<ExLibris mark='seal' aria-label='Felipe Mateus ex-libris' className='h-16 w-16 text-parchment' />`

Leave `src/assets/Logo.tsx` in place (the `[f]` survives as an easter-egg asset; Plan 3 decides where).

- [ ] **Step 9: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add src/assets/ex-libris/paths.ts src/assets/ExLibris.tsx src/assets/ExLibris.test.tsx src/app/dev-assets/page.tsx src/components/layout/navbar/desktop/index.tsx src/components/layout/RootLayout.tsx src/components/layout/footer/index.tsx
git commit -m "feat(brand): hand-drawn FM ex-libris and replace the [f] logo in the shell"
```

---

### Task 9: Favicon and apple-icon from the ex-libris

**Files:**

- Create: `src/assets/ex-libris/svg.ts`
- Test: `src/assets/ex-libris/svg.test.ts`
- Create: `scripts/icons.ts`
- Add (generated): `src/app/icon.svg`, `src/app/icon.png`, `src/app/apple-icon.png`
- Delete: `src/app/favicon.ico`
- Modify: `src/app/layout.tsx` (`<head>` links)

**Interfaces:**

- Consumes: `paths.ts` (Task 8).
- Produces: `exLibrisSvg({ mark, size, background, color }): string` — a standalone SVG document string; `pnpm icons` regenerates the three icon files. Next.js App Router picks up `src/app/icon.svg`, `icon.png` and `apple-icon.png` automatically (file-based metadata).

- [ ] **Step 1: Failing test for the SVG string builder**

Create `src/assets/ex-libris/svg.test.ts`:

```ts
import { F_PATHS, F_SOLO_PATHS, M_PATHS } from './paths'
import { exLibrisSvg } from './svg'

describe('exLibrisSvg', () => {
  it('builds a standalone svg with background rect and the lone F', () => {
    const svg = exLibrisSvg({
      mark: 'f',
      size: 32,
      background: '#0A0A0A',
      color: '#F2EEE6',
    })
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg).toContain('width="32"')
    expect(svg).toContain('<rect width="100" height="100" fill="#0A0A0A"')
    for (const d of F_SOLO_PATHS) expect(svg).toContain(`d="${d}"`)
    expect(svg).toContain('stroke="#F2EEE6"')
  })

  it('monogram uses the F and M paths', () => {
    const svg = exLibrisSvg({
      mark: 'monogram',
      size: 100,
      background: 'none',
      color: '#F2EEE6',
    })
    for (const d of [...F_PATHS, ...M_PATHS]) expect(svg).toContain(`d="${d}"`)
    expect(svg).not.toContain('<rect')
  })
})
```

Run: `pnpm test src/assets/ex-libris/svg.test.ts` → FAIL (module missing).

- [ ] **Step 2: Implement `src/assets/ex-libris/svg.ts`**

```ts
import {
  F_PATHS,
  F_SOLO_PATHS,
  F_SOLO_STROKE,
  M_PATHS,
  STROKE,
  VIEWBOX,
} from './paths'

type Options = {
  mark: 'monogram' | 'f'
  size: number
  /** CSS color or 'none' */
  background: string
  color: string
}

/** Standalone SVG document (no React) for rasterizing icons with sharp. */
export function exLibrisSvg({
  mark,
  size,
  background,
  color,
}: Options): string {
  const paths = mark === 'f' ? F_SOLO_PATHS : [...F_PATHS, ...M_PATHS]
  const strokeWidth = mark === 'f' ? F_SOLO_STROKE : STROKE
  const rect =
    background === 'none'
      ? ''
      : `<rect width="100" height="100" fill="${background}"/>`
  const body = paths
    .map(
      (d) =>
        `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="square" stroke-linejoin="miter"/>`
    )
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" width="${size}" height="${size}">${rect}${body}</svg>`
}
```

Run the test → PASS.

- [ ] **Step 3: Icons script — `scripts/icons.ts`**

```ts
import { writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { colors } from '../src/styles/colors'
import { exLibrisSvg } from '../src/assets/ex-libris/svg'

const APP = path.join(process.cwd(), 'src', 'app')

async function main() {
  const ink = colors.ink
  const parchment = colors.parchment

  const faviconSvg = exLibrisSvg({
    mark: 'f',
    size: 100,
    background: ink,
    color: parchment,
  })
  await writeFile(path.join(APP, 'icon.svg'), faviconSvg)

  await sharp(
    Buffer.from(
      exLibrisSvg({ mark: 'f', size: 32, background: ink, color: parchment })
    ),
    { density: 384 }
  )
    .resize(32, 32)
    .png()
    .toFile(path.join(APP, 'icon.png'))

  await sharp(
    Buffer.from(
      exLibrisSvg({
        mark: 'monogram',
        size: 180,
        background: ink,
        color: parchment,
      })
    ),
    { density: 384 }
  )
    .resize(180, 180)
    .png()
    .toFile(path.join(APP, 'apple-icon.png'))

  await rm(path.join(APP, 'favicon.ico'), { force: true })
  console.log(
    'wrote src/app/icon.svg, icon.png (32), apple-icon.png (180); removed favicon.ico'
  )
}

main()
```

`colors.ts` imports `@/types/colors` — `tsx` does not resolve `@/`. Change that import in `scripts/icons.ts` if it fails: import the two hex strings directly instead (`const ink = '#0A0A0A'; const parchment = '#F2EEE6'`) with a comment `// mirrors src/styles/colors.ts (tsx has no @/ alias)`. Prefer the direct import; fall back only if `pnpm icons` fails on the alias.

- [ ] **Step 4: Run and inspect**

```bash
pnpm icons
ls -la src/app/icon.svg src/app/icon.png src/app/apple-icon.png
test ! -e src/app/favicon.ico && echo "favicon.ico removed"
open src/app/icon.png src/app/apple-icon.png
```

Expected: 32px F legible; 180px monogram centered with margins. If the F touches the edge at 32px, shrink `F_SOLO_PATHS` toward the center (x from 30→34, 74→70; y 18→22, 82→78) and re-run.

- [ ] **Step 5: Remove the manual links from `src/app/layout.tsx`**

Delete the whole `<head>…</head>` block (lines with `<link rel='icon' …>` and `<link rel='apple-touch-icon' …>`) — Next's file conventions now emit them. Keep everything else. Also remove `public/apple-icon.png` references anywhere (`grep -rn "apple-icon" src` must only show the generated file).

- [ ] **Step 6: Verify via the dev server**

```bash
pnpm dev &
sleep 5
curl -s localhost:3000/ | grep -o '<link rel="icon"[^>]*>\|<link rel="apple-touch-icon"[^>]*>'
curl -sI localhost:3000/icon.svg | head -1
kill %1
```

Expected: `<link rel="icon" href="/icon.svg" …>` (and `/icon.png`), `<link rel="apple-touch-icon" href="/apple-icon.png" …>`, `HTTP/1.1 200`.

- [ ] **Step 7: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add scripts/icons.ts src/assets/ex-libris/svg.ts src/assets/ex-libris/svg.test.ts src/app/icon.svg src/app/icon.png src/app/apple-icon.png src/app/layout.tsx
git rm src/app/favicon.ico
git commit -m "feat(meta): favicon and apple-icon generated from the ex-libris"
```

---

### Task 10: OG images from the system (ex-libris + display type)

**Files:**

- Add: `src/assets/fonts/Anton-Regular.ttf`, `src/assets/fonts/Anton-LICENSE.txt`, `src/assets/fonts/DepartureMono-Regular.otf`
- Create: `src/configs/og.ts`, `src/configs/og.test.ts`
- Create: `src/lib/og.tsx`
- Create: `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx` and the same pair in `src/app/about/`, `projects/`, `bookshelf/`, `notebook/`, `tech-stack/`, `contact/`
- Modify: `src/app/layout.tsx` and the six `page.tsx` files (drop `images` arrays)
- Delete: `public/og/`

**Interfaces:**

- Produces: `ogCopy: Record<OgRoute, { eyebrow: string; title: string; alt: string }>` with `OgRoute = 'home' | 'about' | 'projects' | 'bookshelf' | 'notebook' | 'tech-stack' | 'contact'` (Plan 3 edits the strings here only); `renderOg(copy: OgCopy): Promise<ImageResponse>`, `OG_SIZE = { width: 1200, height: 630 }`, `OG_CONTENT_TYPE = 'image/png'`.

- [ ] **Step 1: Vendor the fonts satori can read**

```bash
curl -L -o src/assets/fonts/Anton-Regular.ttf https://github.com/google/fonts/raw/main/ofl/anton/Anton-Regular.ttf
curl -L -o src/assets/fonts/Anton-LICENSE.txt https://github.com/google/fonts/raw/main/ofl/anton/OFL.txt
ls -la src/assets/fonts/Anton-Regular.ttf   # expected ~ 30–60 KB, not an HTML page
file src/assets/fonts/Anton-Regular.ttf     # "TrueType Font data"
```

Departure Mono: download the latest release zip from `https://github.com/rektdeckard/DepartureMono/releases/latest` (same as Plan 1 did), unzip to `/tmp/departure`, then:

```bash
cp "$(find /tmp/departure -name 'DepartureMono-Regular.otf' | head -1)" src/assets/fonts/DepartureMono-Regular.otf
file src/assets/fonts/DepartureMono-Regular.otf   # "OpenType font data"
```

If the release has no `.otf`, copy `DepartureMono-Regular.woff` instead (satori reads TTF/OTF/WOFF, **not** WOFF2) and use that filename below.

- [ ] **Step 2: Failing test for the copy map**

Create `src/configs/og.test.ts`:

```ts
import { existsSync } from 'node:fs'
import path from 'node:path'
import { OG_ROUTES, ogCopy } from './og'

describe('ogCopy', () => {
  it('has an entry per route with uppercase eyebrow and non-empty title/alt', () => {
    for (const route of OG_ROUTES) {
      const c = ogCopy[route]
      expect(c.eyebrow).toBe(c.eyebrow.toUpperCase())
      expect(c.title.length).toBeGreaterThan(0)
      expect(c.alt.length).toBeGreaterThan(0)
    }
  })

  it('every route has file-based opengraph-image and twitter-image', () => {
    const app = path.join(process.cwd(), 'src', 'app')
    for (const route of OG_ROUTES) {
      const dir = route === 'home' ? app : path.join(app, route)
      expect(existsSync(path.join(dir, 'opengraph-image.tsx'))).toBe(true)
      expect(existsSync(path.join(dir, 'twitter-image.tsx'))).toBe(true)
    }
  })
})
```

Run: `pnpm test src/configs/og.test.ts` → FAIL.

- [ ] **Step 3: `src/configs/og.ts`**

```ts
export const OG_ROUTES = [
  'home',
  'about',
  'projects',
  'bookshelf',
  'notebook',
  'tech-stack',
  'contact',
] as const

export type OgRoute = (typeof OG_ROUTES)[number]

export type OgCopy = {
  eyebrow: string
  title: string
  alt: string
}

// Plan 3 owns the final copy; keep titles short (≤ 40 chars per line, 2 lines).
export const ogCopy: Record<OgRoute, OgCopy> = {
  home: {
    eyebrow: '§ FELIPE MATEUS',
    title: 'I BUILD THE FRONT-END AND QUESTION THE ROADMAP.',
    alt: 'Felipe Mateus — front-end engineer who thinks like a product owner',
  },
  about: {
    eyebrow: '§ 01 — ABOUT',
    title: 'HOW I DECIDE.',
    alt: 'About Felipe Mateus',
  },
  projects: {
    eyebrow: '§ 02 — PROJECTS',
    title: 'THE CALL AND THE RESULT.',
    alt: 'Projects by Felipe Mateus',
  },
  bookshelf: {
    eyebrow: '§ 03 — BOOKSHELF',
    title: 'WHAT I READ.',
    alt: 'Felipe Mateus bookshelf',
  },
  notebook: {
    eyebrow: '§ 04 — NOTEBOOK',
    title: 'NOTES IN PROGRESS.',
    alt: 'Felipe Mateus notebook',
  },
  'tech-stack': {
    eyebrow: '§ 05 — TECH STACK',
    title: 'TOOLS, NOT HEADLINES.',
    alt: 'Felipe Mateus tech stack',
  },
  contact: {
    eyebrow: '§ 06 — CONTACT',
    title: "TELL ME WHAT'S STUCK.",
    alt: 'Contact Felipe Mateus',
  },
}
```

- [ ] **Step 4: `src/lib/og.tsx`**

```tsx
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { colors } from '@/styles/colors'
import type { OgCopy } from '@/configs/og'
import {
  F_PATHS,
  M_PATHS,
  RING_INNER,
  RING_OUTER,
  STROKE,
  VIEWBOX,
} from '@/assets/ex-libris/paths'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const fontsDir = path.join(process.cwd(), 'src', 'assets', 'fonts')

async function loadFonts() {
  const [anton, mono] = await Promise.all([
    readFile(path.join(fontsDir, 'Anton-Regular.ttf')),
    readFile(path.join(fontsDir, 'DepartureMono-Regular.otf')),
  ])
  return [
    {
      name: 'Anton',
      data: anton,
      style: 'normal' as const,
      weight: 400 as const,
    },
    {
      name: 'Departure Mono',
      data: mono,
      style: 'normal' as const,
      weight: 400 as const,
    },
  ]
}

/** Seal drawn inline — satori supports circle/path, not <pattern>, so the ring uses ticks. */
const Seal = ({ size }: { size: number }) => {
  const mid = (RING_OUTER + RING_INNER) / 2
  const period = (2 * Math.PI * mid) / 48
  return (
    <svg viewBox={VIEWBOX} width={size} height={size}>
      <circle
        cx='50'
        cy='50'
        r={RING_OUTER}
        fill='none'
        stroke={colors.parchment}
        strokeWidth='1.5'
      />
      <circle
        cx='50'
        cy='50'
        r={mid}
        fill='none'
        stroke={colors.parchment}
        strokeWidth={RING_OUTER - RING_INNER - 3}
        strokeDasharray={`1.2 ${period - 1.2}`}
      />
      <circle
        cx='50'
        cy='50'
        r={RING_INNER}
        fill='none'
        stroke={colors.parchment}
        strokeWidth='1.5'
      />
      {[...F_PATHS, ...M_PATHS].map((d) => (
        <path
          key={d}
          d={d}
          fill='none'
          stroke={colors.parchment}
          strokeWidth={STROKE}
          strokeLinecap='square'
        />
      ))}
    </svg>
  )
}

export async function renderOg(copy: OgCopy): Promise<ImageResponse> {
  const fonts = await loadFonts()
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: colors.ink,
        padding: 48,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `1px solid ${colors.line}`,
          padding: 56,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              background: colors['parchment-mute'],
            }}
          />
          <span
            style={{
              fontFamily: 'Departure Mono',
              fontSize: 22,
              letterSpacing: '0.08em',
              color: colors['parchment-mute'],
            }}
          >
            {copy.eyebrow}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 48,
          }}
        >
          <div
            style={{
              fontFamily: 'Anton',
              fontSize: 104,
              lineHeight: 0.92,
              color: colors.parchment,
              maxWidth: 820,
              textTransform: 'uppercase',
            }}
          >
            {copy.title}
          </div>
          <Seal size={180} />
        </div>

        <span
          style={{
            fontFamily: 'Departure Mono',
            fontSize: 20,
            letterSpacing: '0.08em',
            color: colors['parchment-dim'],
          }}
        >
          FELIPE-MATEUS.COM
        </span>
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  )
}
```

- [ ] **Step 5: The route files (14, all identical modulo the route key)**

`src/app/opengraph-image.tsx`:

```tsx
import { ogCopy } from '@/configs/og'
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og'

export const alt = ogCopy.home.alt
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOg(ogCopy.home)
}
```

`src/app/twitter-image.tsx`:

```tsx
export { default, alt, size, contentType } from './opengraph-image'
```

Repeat for `about`, `projects`, `bookshelf`, `notebook`, `tech-stack`, `contact` under their route folders, replacing `ogCopy.home` with `ogCopy.about`, `ogCopy.projects`, `ogCopy.bookshelf`, `ogCopy.notebook`, `ogCopy['tech-stack']`, `ogCopy.contact`. The home files live at `src/app/` (not inside `(home)`), so they also serve as the fallback for any route without its own.

- [ ] **Step 6: Drop the old config-based images and files**

File-based metadata overrides config-based, so the old arrays are dead. In `src/app/layout.tsx` remove the `images: [...]` property inside `openGraph` and inside `twitter`. In each of `src/app/{about,projects,bookshelf,notebook,tech-stack,contact}/page.tsx` remove the `images` property from `openGraph` and `twitter` (use Serena `replace_content` per file; leave `title`/`description` untouched — Plan 3 owns them). Then:

```bash
git rm -r public/og
grep -rn "og-.*\.jpg\|/og/" src && echo "STILL REFERENCED" || echo "clean"
```

Expected: `clean`.

- [ ] **Step 7: Verify rendering**

```bash
pnpm test src/configs/og.test.ts
pnpm build
pnpm start &
sleep 5
for r in "" about projects bookshelf notebook tech-stack contact; do printf "%-12s " "/$r"; curl -s -o "/tmp/og-$r.png" -w "%{http_code} %{content_type}\n" "localhost:3000/$r/opengraph-image"; done
curl -s localhost:3000/about | grep -o '<meta property="og:image"[^>]*>'
kill %1
open /tmp/og-.png /tmp/og-about.png
```

Expected: `200 image/png` ×7; `og:image` points at `/about/opengraph-image?…`; the PNG shows ink background, line border, mono eyebrow, Anton title (2 lines max, not clipped), seal at right. If the title overflows, reduce `fontSize` to 92 in `og.tsx`. If fonts fail to load on Vercel later, the `readFile(process.cwd()…)` pattern is the one Next documents for `opengraph-image` — check the file is not excluded by `outputFileTracingExcludes` (there is none in `next.config.js`).

- [ ] **Step 8: Gates and commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add src/assets/fonts src/configs/og.ts src/configs/og.test.ts src/lib/og.tsx src/app/opengraph-image.tsx src/app/twitter-image.tsx src/app/*/opengraph-image.tsx src/app/*/twitter-image.tsx src/app/layout.tsx src/app/*/page.tsx
git commit -m "feat(meta): file-based OG/Twitter images rendered from the ex-libris and display type"
```

---

### Task 11: Cleanup, full gates, handoff notes

**Files:**

- Delete: `src/app/dev-assets/page.tsx`
- Modify: this plan (append `## Execution status`)

- [ ] **Step 1: Remove the preview page**

```bash
git rm src/app/dev-assets/page.tsx
```

- [ ] **Step 2: Full gates**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build
git status --short   # expected: only the deletion staged, nothing untracked
du -sh art public/scenes
```

Expected: all green; sizes reported.

- [ ] **Step 3: Append the execution status to this plan**

Add at the end of `docs/superpowers/plans/2026-09-08-rebrand-2-assets.md`:

```markdown
## Execution status (<date>) — handoff for Plan 3

- Character: <archetype> (job <id>). Ring: <hatched|ticks|dotted>. Algorithms: <per-scene list from manifest>.
- Constants at the end: OUTPUT_WIDTH/CELL/CONTRAST/GAMMA/BLACK_POINT = <values>.
- Sizes: art/ <MB>, public/scenes <MB>.
- Plan 3 must: render scenes with `<img>` (not `next/image`), `width={cssWidth}` `height={cssHeight}`, `style={{ imageRendering: 'pixelated' }}`, `aria-hidden`, behind headlines only, with the `ink → transparent` scrim; overlay `ExLibris mark='seal'` in amber on the Contact scene's blank wax seal; edit OG copy only in `src/configs/og.ts`; the `[f]` `Logo.tsx` is unreferenced and waits for the easter-egg decision.
- Deferred/open: <anything regenerated, rejected, or still owed>.
```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/plans/2026-09-08-rebrand-2-assets.md
git commit -m "chore(assets): drop preview page and record plan 2 execution status"
```

---

## Self-review (done while writing)

- **Spec coverage:** §3.1 character sheet → Task 3 prompts + Task 5 checks; §3.2 four archetypes → Task 4; §3.3 seven scenes → Tasks 5–6 (+ avatar per §6.1); §4.3 ex-libris three sizes, monochrome, hand SVG, 2–3 variants → Task 8; §5.1 Bayer default / F–S option / 2-device-pixel cell / same constants → Tasks 1–2, 7; §6.2 width ≥ 2048 → Tasks 5–6 checks; §6.3 script with constants, committed, re-runnable → Tasks 1–2; §6.4 mark + OG/favicon/apple-icon → Tasks 9–10; §6.5 upgrade path → sources in `art/`, `pnpm dither` re-runnable. CRT/parallax/scrim in pages → Plan 3 (out of scope here, only the preview scrim).
- **Placeholders:** none; every code step has full content. The only "decide visually" steps are the two human gates, which the spec requires.
- **Type consistency:** `Algorithm`, `renderScene`, `SceneEntry`, `scenes` (manifest) vs `scenes` (generated — different module, both named as Plan 3 expects), `F_PATHS/M_PATHS/F_SOLO_PATHS/STROKE/F_SOLO_STROKE/RING_OUTER/RING_INNER/VIEWBOX/RingStyle`, `exLibrisSvg`, `ogCopy/OG_ROUTES/OgRoute/OgCopy`, `renderOg/OG_SIZE/OG_CONTENT_TYPE` are used with the same names and signatures across Tasks 1, 2, 7, 8, 9, 10.

## Execution status (2026-09-08) — handoff for Plan 3

- Character: **Paladin** (user-supplied concept, `art/archetypes/paladin.png`, anchor top-left panel). The Scribe/Cartographer/Knight/Astronomer exploration files were removed after the decision (job ids stay in `art/PROMPTS.md`; regenerate from Higgsfield if ever needed). Character sheet v2 and every job id are in `art/PROMPTS.md`.
- Ex-libris: **AI-generated blackletter "FM + sword" silhouette** (reference `docs/references/exemple-logo.png` panel 1) vectorized with `potrace` via `pnpm vectorize` → `src/assets/ex-libris/monogram.generated.ts` (`FM_PLAIN` viewBox `0 0 490 820` for navbar/favicon, `FM_HALO` `0 0 765 765` for the footer mark and OG image). This overrides spec §4.3 "hand-drawn, not AI-generated" by Felipe's decision. The earlier seal design (rings, "FELIPE MATEUS" arc text via `<textPath>`, two stars) was rejected and removed — `FM_HALO` now renders bare, as a single path. Component API: `ExLibris` `mark?: 'halo' | 'monogram'`. Seal tagline intentionally dropped (concept's CODE·CREATE·BUILD conflicts with spec §2.4 voice).
- Scenes: 8 rendered, all **Bayer**; names `home-paladin`, `about-paladin`, `avatar`, `projects-wall`, `bookshelf-library`, `notebook-desk`, `tech-bench`, `contact-letter`. Constants unchanged: `OUTPUT_WIDTH 1440`, `CELL 2`, `CONTRAST 1.4`, `GAMMA 1.15`, `BLACK_POINT 0.06`. Three sources had a model-drawn frame border cropped by luminance bounds instead of regenerating (about-paladin, tech-bench, bookshelf-library); two scenes were regenerated once (bookshelf composition, notebook literal text). Higgsfield credits spent: 66 of 110 (balance 44).
- Icons: `src/app/icon.svg`, `icon.png` (32), `apple-icon.png` (180) from `FM_PLAIN` via `pnpm icons`; `favicon.ico` removed; layout `<head>` links removed.
- OG: file-based `opengraph-image.tsx` + `twitter-image.tsx` per route, `src/lib/og.tsx` (`ImageResponse`, Anton + Departure Mono TTF from `src/assets/fonts/`, seal without textPath), copy only in `src/configs/og.ts`; `public/og` deleted. Departure Mono TTF was derived from the vendored woff2 with wawoff2 (same OFL).
- Sizes: `art` 159M, `public/scenes` 1.1M.
- Plan 3 must: render scenes with `<img>` (never `next/image`), `width={cssWidth}` `height={cssHeight}`, `style={{ imageRendering: 'pixelated' }}`, `aria-hidden`, behind headlines only, with the `ink → transparent` scrim; overlay `ExLibris mark='seal'` in amber on the Contact scene's blank wax seal; edit OG copy only in `src/configs/og.ts`; the `[f]` `Logo.tsx` is unreferenced and awaits the easter-egg decision; amend spec §3.1/§4.3 to record the Paladin and the AI-generated mark; optional Plan 3 exploration: none pending (blackletter chosen).
- Deferred/open (from reviews): `runManifest` has no per-scene try/catch; two JSDoc comments in `svg.ts` and the Plan-3 handoff comment in `og.ts` are borderline vs the no-narrating-comments rule; monogram legibility softens at 16 px (inherent to the blackletter art); browser pass at 390 px still owed (Chrome MCP screenshots failed; headless Chrome verified 1440 px only).
- Process note worth recording: `pkill -f "next start"` does not kill the real `next-server` process — use `pkill -f next-server`; a zombie server on :3000 invalidated one visual verification.
