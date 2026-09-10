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

describe('color roles', () => {
  it('never uses parchment-mute as a text color', () => {
    const offenders = tsxFiles(SRC).filter((file) => {
      const source = readFileSync(file, 'utf8')
      return source
        .split('\n')
        .some(
          (line) => MUTE_TEXT.test(line) && !/placeholder:|disabled:/.test(line)
        )
    })
    expect(offenders.map((f) => f.replace(SRC, 'src'))).toEqual([])
  })
})
