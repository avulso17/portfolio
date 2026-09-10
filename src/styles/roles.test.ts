import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(__dirname, '..')

export const tsxFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return tsxFiles(full)
    return full.endsWith('.tsx') && !full.endsWith('.test.tsx') ? [full] : []
  })

const MUTE_TEXT = /(?<![:\w-])text-parchment-mute\b/
const MUTE_COLOR_PROP = /color:\s*[`$\{]*colors\[['"]parchment-mute['"]\]/

describe('color roles', () => {
  it('never uses parchment-mute as a text color', () => {
    const offenders = tsxFiles(SRC).filter((file) => {
      const source = readFileSync(file, 'utf8')
      return source.split('\n').some((line) => {
        if (/placeholder:|disabled:/.test(line)) return false
        return MUTE_TEXT.test(line) || MUTE_COLOR_PROP.test(line)
      })
    })
    expect(offenders.map((f) => f.replace(SRC, 'src'))).toEqual([])
  })
})

const STRUCTURAL = [
  'components/layout/navbar/desktop/index.tsx',
  'components/ui/PageHero.tsx',
  'app/(home)/_components/HomeHero.tsx',
  'app/(home)/_components/HomeSelectedWorkSection.tsx',
  'app/(home)/_components/HomeGetToKnowSection.tsx',
  'app/(home)/_components/HomeGetInTouchSection.tsx',
  'app/about/_components/AboutContent.tsx',
  'app/tech-stack/_components/TechStackGroupTitle.tsx',
  'components/layout/footer/index.tsx',
]

describe('structural lines', () => {
  it('are full-bleed rules, not element borders', () => {
    const offenders = STRUCTURAL.filter((rel) =>
      /border-[tb] border-line/.test(readFileSync(join(SRC, rel), 'utf8'))
    )
    expect(offenders).toEqual([])
  })
})
