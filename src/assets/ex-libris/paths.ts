export const VIEWBOX = '0 0 100 100'

export const STAR_PATH =
  'M50 6 L52.5 13.5 L60 16 L52.5 18.5 L50 26 L47.5 18.5 L40 16 L47.5 13.5 Z'

// The star is drawn at the top of the viewBox, not centered on it.
export const STAR_CENTER = { x: 50, y: 16 }

export const SEAL_TEXT = 'FELIPE MATEUS'
export const SEAL_TEXT_RADIUS = 38.5
export const SEAL_INNER_RING = 32
export const SEAL_STAR_POSITIONS = [
  [12, 50],
  [88, 50],
]

export const RING_OUTER = 48
export const RING_INNER = 44

export const SEAL_RINGS = [
  { r: RING_OUTER, strokeWidth: 1.5 },
  { r: RING_INNER, strokeWidth: 1 },
  { r: SEAL_INNER_RING, strokeWidth: 1 },
] as const

export const STAR_SCALE = 0.45

export const SEAL_MARK_FIT = { offset: 21, size: 58 } as const

export const sealMarkTransform = (viewBox: string) => {
  const w = Number(viewBox.split(' ')[2])
  return `translate(${SEAL_MARK_FIT.offset} ${SEAL_MARK_FIT.offset}) scale(${SEAL_MARK_FIT.size / w})`
}

export const starTransform = ([x, y]: readonly [number, number] | number[]) =>
  `translate(${x - STAR_CENTER.x * STAR_SCALE} ${y - STAR_CENTER.y * STAR_SCALE}) scale(${STAR_SCALE})`
