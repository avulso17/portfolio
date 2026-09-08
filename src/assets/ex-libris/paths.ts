export const VIEWBOX = '0 0 100 100'
export const STROKE = 7
export const GUARD_STROKE = 5
export const BLADE_STROKE = 4

/**
 * The rune reads as an M (the two stems and the diagonals meeting on the
 * blade) with a sword struck through it: crossguard, blade, and a
 * four-point star for the pommel. The left stem carries a short bar so it
 * also reads as an F.
 */
export const RUNE_STEM_PATHS = [
  'M22 78 V30',
  'M78 78 V30',
  'M22 30 L50 58',
  'M78 30 L50 58',
]

export const RUNE_F_BAR = 'M22 54 H40'
export const RUNE_GUARD = 'M40 36 H60'
export const RUNE_BLADE = 'M50 24 V82'
export const RUNE_BLADE_TIP = 'M46 80 L50 92 L54 80 Z'

export const STAR_PATH =
  'M50 6 L52.5 13.5 L60 16 L52.5 18.5 L50 26 L47.5 18.5 L40 16 L47.5 13.5 Z'

export const SEAL_TEXT = 'FELIPE MATEUS'
export const SEAL_TEXT_RADIUS = 38.5
export const SEAL_INNER_RING = 32
export const SEAL_STAR_POSITIONS = [
  [12, 50],
  [88, 50],
]

export const RING_OUTER = 48
export const RING_INNER = 44
