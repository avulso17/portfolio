import {
  STAR_CENTER,
  STAR_SCALE,
  sealMarkTransform,
  starTransform,
} from './paths'

describe('starTransform', () => {
  it('places the star center at the given point', () => {
    const [x, y] = [12, 50]
    const t = starTransform([x, y])
    const [, tx, ty] = t.match(/translate\(([-\d.]+) ([-\d.]+)\)/)!
    expect(Number(tx) + STAR_CENTER.x * STAR_SCALE).toBe(x)
    expect(Number(ty) + STAR_CENTER.y * STAR_SCALE).toBe(y)
  })
})

describe('sealMarkTransform', () => {
  it('scales the mark to fit within the given viewBox width', () => {
    const t = sealMarkTransform('0 0 765 765')
    expect(t).toContain(`scale(${58 / 765})`)
  })
})
