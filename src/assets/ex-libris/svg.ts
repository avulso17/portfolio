import { FM_PLAIN } from './monogram.generated'

type Options = {
  size: number
  /** CSS color or 'none' */
  background: string
  color: string
  pad?: number
}

const num = (n: number) => Number(n.toFixed(4)).toString()

/** Standalone SVG document (no React) for rasterizing icons with sharp. */
export function exLibrisSvg({
  size,
  background,
  color,
  pad = 8,
}: Options): string {
  const [, , width, height] = FM_PLAIN.viewBox.split(' ').map(Number)
  const scale = (100 - 2 * pad) / height
  const tx = (100 - width * scale) / 2
  const ty = pad

  const rect =
    background === 'none'
      ? ''
      : `<rect width="100" height="100" fill="${background}"/>`

  const mark = `<g transform="translate(${num(tx)} ${num(ty)}) scale(${num(scale)})"><path d="${FM_PLAIN.d}" fill="${color}"/></g>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">${rect}${mark}</svg>`
}
