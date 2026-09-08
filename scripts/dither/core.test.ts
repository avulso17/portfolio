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
