import { rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { exLibrisSvg } from '../src/assets/ex-libris/svg'
import { colors } from '../src/styles/colors'

const APP = path.join(process.cwd(), 'src', 'app')

async function main() {
  const ink = colors.ink
  const parchment = colors.parchment

  const iconSvg = exLibrisSvg({ size: 100, background: ink, color: parchment })
  await writeFile(path.join(APP, 'icon.svg'), iconSvg)

  await sharp(
    Buffer.from(exLibrisSvg({ size: 32, background: ink, color: parchment })),
    { density: 384 }
  )
    .resize(32, 32)
    .png()
    .toFile(path.join(APP, 'icon.png'))

  await sharp(
    Buffer.from(
      exLibrisSvg({ size: 180, background: ink, color: parchment, pad: 14 })
    ),
    { density: 384 }
  )
    .resize(180, 180)
    .png()
    .toFile(path.join(APP, 'apple-icon.png'))

  await rm(path.join(APP, 'favicon.ico'), { force: true })
  console.log(
    'wrote src/app/icon.svg, icon.png (32), apple-icon.png (180); removed favicon.ico'
  )
}

main()
