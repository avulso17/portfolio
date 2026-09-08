import { useId } from 'react'
import {
  F_PATHS,
  F_SOLO_PATHS,
  F_SOLO_STROKE,
  M_PATHS,
  RING_INNER,
  RING_OUTER,
  RingStyle,
  STROKE,
  VIEWBOX,
} from './ex-libris/paths'

type SVGProps = React.SVGProps<SVGSVGElement>

export type ExLibrisMark = 'seal' | 'monogram' | 'f'

type ExLibrisProps = SVGProps & {
  mark?: ExLibrisMark
  ring?: RingStyle
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const

const Ring: React.FC<{ style: RingStyle; patternId: string }> = ({
  style,
  patternId,
}) => {
  const mid = (RING_OUTER + RING_INNER) / 2
  const band = RING_OUTER - RING_INNER
  const circumference = 2 * Math.PI * mid

  if (style === 'hatched') {
    return (
      <>
        <defs>
          <pattern
            id={patternId}
            patternUnits='userSpaceOnUse'
            width='4'
            height='4'
            patternTransform='rotate(45)'
          >
            <line
              x1='0'
              y1='0'
              x2='0'
              y2='4'
              stroke='currentColor'
              strokeWidth='1.2'
            />
          </pattern>
        </defs>
        <circle
          cx='50'
          cy='50'
          r={mid}
          fill='none'
          stroke={`url(#${patternId})`}
          strokeWidth={band}
        />
        <circle
          cx='50'
          cy='50'
          r={RING_OUTER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <circle
          cx='50'
          cy='50'
          r={RING_INNER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
      </>
    )
  }

  if (style === 'ticks') {
    const ticks = 48
    const period = circumference / ticks
    return (
      <>
        <circle
          cx='50'
          cy='50'
          r={RING_OUTER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <circle
          cx='50'
          cy='50'
          r={mid}
          fill='none'
          stroke='currentColor'
          strokeWidth={band - 3}
          strokeDasharray={`1.2 ${period - 1.2}`}
        />
        <circle
          cx='50'
          cy='50'
          r={RING_INNER}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        />
      </>
    )
  }

  const dots = 36
  const period = circumference / dots
  return (
    <>
      <circle
        cx='50'
        cy='50'
        r={RING_OUTER}
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle
        cx='50'
        cy='50'
        r={mid}
        fill='none'
        stroke='currentColor'
        strokeWidth='3'
        strokeLinecap='round'
        strokeDasharray={`0 ${period}`}
      />
    </>
  )
}

const ExLibris: React.FC<ExLibrisProps> = ({
  mark = 'monogram',
  ring = 'hatched',
  ...props
}) => {
  const patternId = useId()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={VIEWBOX}
      height='1em'
      width='1em'
      {...props}
    >
      {mark === 'seal' ? <Ring style={ring} patternId={patternId} /> : null}
      {mark === 'f'
        ? F_SOLO_PATHS.map((d) => (
            <path key={d} d={d} strokeWidth={F_SOLO_STROKE} {...strokeProps} />
          ))
        : [...F_PATHS, ...M_PATHS].map((d) => (
            <path key={d} d={d} strokeWidth={STROKE} {...strokeProps} />
          ))}
    </svg>
  )
}

export default ExLibris
