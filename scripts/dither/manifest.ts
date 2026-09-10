import type { Algorithm } from './core'

export type SceneEntry = {
  name: string
  source: string
  algorithm: Algorithm
}

/**
 * One entry per scene (spec §3.3) plus the avatar bust.
 * `algorithm` is the only per-scene choice; every other parameter is a
 * constant in core.ts. Switch a portrait-like scene to 'floyd-steinberg'
 * only after the visual check in Task 7.
 */
export const scenes: ReadonlyArray<SceneEntry> = [
  {
    name: 'home-paladin',
    source: 'art/source/home-paladin.png',
    algorithm: 'bayer',
  },
  {
    name: 'about-paladin',
    source: 'art/source/about-paladin.png',
    algorithm: 'bayer',
  },
  { name: 'avatar', source: 'art/source/avatar.png', algorithm: 'bayer' },
  {
    name: 'projects-wall',
    source: 'art/source/projects-wall.png',
    algorithm: 'bayer',
  },
  {
    name: 'bookshelf-library',
    source: 'art/source/bookshelf-library.png',
    algorithm: 'bayer',
  },
  {
    name: 'notebook-desk',
    source: 'art/source/notebook-desk.png',
    algorithm: 'bayer',
  },
  {
    name: 'tech-bench',
    source: 'art/source/tech-bench.png',
    algorithm: 'bayer',
  },
  {
    name: 'contact-letter',
    source: 'art/source/contact-letter.png',
    algorithm: 'bayer',
  },
  {
    name: 'bookshelf-empty',
    source: 'art/source/bookshelf-empty.png',
    algorithm: 'bayer',
  },
]

export type DitherEntry = SceneEntry

/** Ink versions of the color images that InkImage layers over (spec §4). */
export const dithered: ReadonlyArray<DitherEntry> = [
  {
    name: 'pigmo',
    source: 'public/assets/pigmo-screenshot.png',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'zeus-agrotech',
    source: 'public/assets/zeus-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'redux-store',
    source: 'public/assets/redux-store-screenshot.png',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'pepy-the-platypus',
    source: 'public/assets/pepy-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'equals-venue',
    source: 'public/assets/equalsVenue-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'equals-sport',
    source: 'public/assets/equalsSport-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'equals9',
    source: 'public/assets/equals9-screenshot.svg',
    algorithm: 'floyd-steinberg',
  },
  {
    name: 'portrait',
    source: 'public/assets/me-green-shirt.png',
    algorithm: 'floyd-steinberg',
  },
]
