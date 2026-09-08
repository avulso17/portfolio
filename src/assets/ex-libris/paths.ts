export const VIEWBOX = '0 0 100 100'
export const STROKE = 7

/**
 * F and M interlace at exactly one point: F's mid bar passes OVER M's
 * left stem, which is drawn with a gap there — that gap is what reads
 * as the crossing.
 */
export const F_PATHS = ['M24 34 V72', 'M24 34 H50', 'M24 52 H60']

export const M_PATHS = ['M54 72 V57', 'M54 47 V26 L66 58 L78 26 V72']

/** Lone F for the favicon. Heavier stroke, fills the square. */
export const F_SOLO_STROKE = 12
export const F_SOLO_PATHS = ['M30 18 V82', 'M30 18 H74', 'M30 50 H64']

export const RING_OUTER = 48
export const RING_INNER = 43

export type RingStyle = 'double' | 'double-bold' | 'double-inset'
