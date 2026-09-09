import { existsSync } from 'node:fs'
import path from 'node:path'
import { scenes } from './scenes.generated'

const EXPECTED_NAMES = [
  'home-paladin',
  'about-paladin',
  'avatar',
  'projects-wall',
  'bookshelf-library',
  'notebook-desk',
  'tech-bench',
  'contact-letter',
]

const isPositiveInt = (n: number) => Number.isInteger(n) && n > 0

describe('scenes.generated', () => {
  it('has exactly the expected scene names', () => {
    expect(Object.keys(scenes).sort()).toEqual([...EXPECTED_NAMES].sort())
  })

  it.each(EXPECTED_NAMES)('%s has consistent, existing assets', (name) => {
    const scene = scenes[name as keyof typeof scenes]

    expect(isPositiveInt(scene.width)).toBe(true)
    expect(isPositiveInt(scene.height)).toBe(true)
    expect(isPositiveInt(scene.cssWidth)).toBe(true)
    expect(isPositiveInt(scene.cssHeight)).toBe(true)
    expect(scene.cssWidth).toBe(scene.width / 2)
    expect(scene.cssHeight).toBe(scene.height / 2)

    expect(existsSync(path.join(process.cwd(), 'public', scene.png))).toBe(true)
    expect(existsSync(path.join(process.cwd(), 'public', scene.webp))).toBe(
      true
    )
  })
})
