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
