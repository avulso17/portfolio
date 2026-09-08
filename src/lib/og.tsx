import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { colors } from '@/styles/colors'
import type { OgCopy } from '@/configs/og'
import { FM_HALO } from '@/assets/ex-libris/monogram.generated'
import {
  RING_INNER,
  RING_OUTER,
  SEAL_INNER_RING,
  SEAL_STAR_POSITIONS,
  STAR_PATH,
  VIEWBOX,
} from '@/assets/ex-libris/paths'

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

const fmSize = Number(FM_HALO.viewBox.split(' ')[2])

const Seal = ({ size }: { size: number }) => (
  <svg viewBox={VIEWBOX} width={size} height={size}>
    <circle
      cx='50'
      cy='50'
      r={RING_OUTER}
      fill='none'
      stroke={colors.parchment}
      strokeWidth='1.5'
    />
    <circle
      cx='50'
      cy='50'
      r={RING_INNER}
      fill='none'
      stroke={colors.parchment}
      strokeWidth='1'
    />
    <circle
      cx='50'
      cy='50'
      r={SEAL_INNER_RING}
      fill='none'
      stroke={colors.parchment}
      strokeWidth='1'
    />
    {SEAL_STAR_POSITIONS.map(([x, y]) => (
      <path
        key={`${x}-${y}`}
        d={STAR_PATH}
        fill={colors.parchment}
        transform={`translate(${x - 50 * 0.45} ${y - 50 * 0.45}) scale(0.45)`}
      />
    ))}
    <g transform={`translate(21 21) scale(${58 / fmSize})`}>
      <path d={FM_HALO.d} fill={colors.parchment} />
    </g>
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
              color: colors['parchment-mute'],
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
          <Seal size={180} />
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
