import { useId } from 'react'
import { FM_HALO, FM_PLAIN } from './ex-libris/monogram.generated'
import {
  RING_INNER,
  RING_OUTER,
  SEAL_INNER_RING,
  SEAL_STAR_POSITIONS,
  SEAL_TEXT,
  SEAL_TEXT_RADIUS,
  STAR_CENTER,
  STAR_PATH,
  VIEWBOX,
} from './ex-libris/paths'

type SVGProps = React.SVGProps<SVGSVGElement>

export type ExLibrisMark = 'seal' | 'monogram'

type ExLibrisProps = SVGProps & {
  mark?: ExLibrisMark
}

const viewBoxWidth = (viewBox: string) => Number(viewBox.split(' ')[2])

const haloWidth = viewBoxWidth(FM_HALO.viewBox)

const Seal: React.FC<{ arcId: string }> = ({ arcId }) => {
  const arcD = `M ${50 - SEAL_TEXT_RADIUS} 50 A ${SEAL_TEXT_RADIUS} ${SEAL_TEXT_RADIUS} 0 0 1 ${50 + SEAL_TEXT_RADIUS} 50`

  return (
    <>
      <circle
        cx='50'
        cy='50'
        r={RING_OUTER}
        fill='none'
        stroke='currentColor'
        strokeWidth={1.5}
      />
      <circle
        cx='50'
        cy='50'
        r={RING_INNER}
        fill='none'
        stroke='currentColor'
        strokeWidth={1}
      />
      <circle
        cx='50'
        cy='50'
        r={SEAL_INNER_RING}
        fill='none'
        stroke='currentColor'
        strokeWidth={1}
      />
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
        <g
          key={`${x}-${y}`}
          transform={`translate(${x} ${y}) scale(0.45) translate(${-STAR_CENTER.x} ${-STAR_CENTER.y})`}
        >
          <path d={STAR_PATH} fill='currentColor' stroke='none' />
        </g>
      ))}
      <g transform={`translate(21 21) scale(${58 / haloWidth})`}>
        <path d={FM_HALO.d} fill='currentColor' />
      </g>
    </>
  )
}

const ExLibris: React.FC<ExLibrisProps> = ({ mark = 'monogram', ...props }) => {
  const arcId = useId()
  const viewBox = mark === 'seal' ? VIEWBOX : FM_PLAIN.viewBox

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox}
      height='1em'
      width='auto'
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
