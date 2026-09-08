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
