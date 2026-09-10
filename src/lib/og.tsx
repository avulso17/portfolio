import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { colors } from '@/styles/colors'
import type { OgCopy } from '@/configs/og'
import { FM_HALO } from '@/assets/ex-libris/monogram.generated'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const fontsDir = path.join(process.cwd(), 'src', 'assets', 'fonts')

async function loadFonts() {
  const [anton, mono] = await Promise.all([
    readFile(path.join(fontsDir, 'Anton-Regular.ttf')),
    readFile(path.join(fontsDir, 'DepartureMono-Regular.ttf')),
  ])
  return [
    {
      name: 'Anton',
      data: anton,
      style: 'normal' as const,
      weight: 400 as const,
    },
    {
      name: 'Departure Mono',
      data: mono,
      style: 'normal' as const,
      weight: 400 as const,
    },
  ]
}

const HaloMark = ({ size }: { size: number }) => (
  <svg viewBox={FM_HALO.viewBox} width={size} height={size}>
    <path d={FM_HALO.d} fill={colors.parchment} />
  </svg>
)

export async function renderOg(copy: OgCopy): Promise<ImageResponse> {
  const fonts = await loadFonts()
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: colors.ink,
        padding: 48,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `1px solid ${colors.line}`,
          padding: 56,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 8,
              height: 8,
              background: colors['parchment-mute'],
            }}
          />
          <span
            style={{
              fontFamily: 'Departure Mono',
              fontSize: 22,
              letterSpacing: '0.08em',
              color: colors['parchment-dim'],
            }}
          >
            {copy.eyebrow}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 48,
          }}
        >
          <div
            style={{
              fontFamily: 'Anton',
              fontSize: 104,
              lineHeight: 0.92,
              color: colors.parchment,
              maxWidth: 820,
              textTransform: 'uppercase',
            }}
          >
            {copy.title}
          </div>
          <HaloMark size={180} />
        </div>

        <span
          style={{
            fontFamily: 'Departure Mono',
            fontSize: 20,
            letterSpacing: '0.08em',
            color: colors['parchment-dim'],
          }}
        >
          FELIPE-MATEUS.COM
        </span>
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  )
}
