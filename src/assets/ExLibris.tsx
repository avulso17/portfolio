import { useId } from 'react'
import { FM_HALO, FM_PLAIN } from './ex-libris/monogram.generated'
import {
  SEAL_RINGS,
  SEAL_STAR_POSITIONS,
  SEAL_TEXT,
  SEAL_TEXT_RADIUS,
  STAR_PATH,
  VIEWBOX,
  sealMarkTransform,
  starTransform,
} from './ex-libris/paths'

type SVGProps = React.SVGProps<SVGSVGElement>

export type ExLibrisMark = 'seal' | 'monogram'

type ExLibrisProps = SVGProps & {
  mark?: ExLibrisMark
}

const Seal: React.FC<{ arcId: string }> = ({ arcId }) => {
  const arcD = `M ${50 - SEAL_TEXT_RADIUS} 50 A ${SEAL_TEXT_RADIUS} ${SEAL_TEXT_RADIUS} 0 0 1 ${50 + SEAL_TEXT_RADIUS} 50`

  return (
    <>
      {SEAL_RINGS.map(({ r, strokeWidth }) => (
        <circle
          key={r}
          cx='50'
          cy='50'
          r={r}
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
        />
      ))}
      <defs>
        <path id={arcId} d={arcD} />
      </defs>
      <text
        fontFamily='var(--font-serif), Georgia, serif'
        fontSize={9}
        letterSpacing={1.5}
        fill='currentColor'
      >
        <textPath href={`#${arcId}`} startOffset='50%' textAnchor='middle'>
          {SEAL_TEXT}
        </textPath>
      </text>
      {SEAL_STAR_POSITIONS.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={starTransform([x, y])}>
          <path d={STAR_PATH} fill='currentColor' stroke='none' />
        </g>
      ))}
      <g transform={sealMarkTransform(FM_HALO.viewBox)}>
        <path d={FM_HALO.d} fill='currentColor' />
      </g>
    </>
  )
}

const ExLibris: React.FC<ExLibrisProps> = ({ mark = 'monogram', ...props }) => {
  const arcId = useId()
  const viewBox = mark === 'seal' ? VIEWBOX : FM_PLAIN.viewBox
  const hasLabel = Boolean(props['aria-label'] || props['aria-labelledby'])

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox}
      height='1em'
      width='auto'
      role={hasLabel ? 'img' : undefined}
      aria-hidden={hasLabel ? undefined : 'true'}
      {...props}
    >
      {mark === 'seal' ? (
        <Seal arcId={arcId} />
      ) : (
        <path d={FM_PLAIN.d} fill='currentColor' />
      )}
    </svg>
  )
}

export default ExLibris
