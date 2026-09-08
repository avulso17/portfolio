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

const Ring: React.FC<{ style: RingStyle }> = ({ style }) => {
  if (style === 'double') {
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
          strokeWidth={1.5}
        />
      </>
    )
  }

  if (style === 'double-bold') {
    return (
      <>
        <circle
          cx='50'
          cy='50'
          r={RING_OUTER}
          fill='none'
          stroke='currentColor'
          strokeWidth={3}
        />
        <circle
          cx='50'
          cy='50'
          r={42}
          fill='none'
          stroke='currentColor'
          strokeWidth={1.2}
        />
      </>
    )
  }

  return (
    <>
      <circle
        cx='50'
        cy='50'
        r={RING_OUTER}
        fill='none'
        stroke='currentColor'
        strokeWidth={1.2}
      />
      <circle
        cx='50'
        cy='50'
        r={45.5}
        fill='none'
        stroke='currentColor'
        strokeWidth={1.2}
      />
      <circle
        cx='50'
        cy='50'
        r={39}
        fill='none'
        stroke='currentColor'
        strokeWidth={0.8}
      />
    </>
  )
}

const ExLibris: React.FC<ExLibrisProps> = ({
  mark = 'monogram',
  ring = 'double',
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={VIEWBOX}
      height='1em'
      width='1em'
      {...props}
    >
      {mark === 'seal' ? <Ring style={ring} /> : null}
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
