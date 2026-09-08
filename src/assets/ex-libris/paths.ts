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
