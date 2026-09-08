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
]
