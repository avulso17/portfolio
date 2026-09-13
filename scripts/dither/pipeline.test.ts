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
