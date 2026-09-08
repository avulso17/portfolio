import { FM_HALO, FM_PLAIN } from './ex-libris/monogram.generated'

type SVGProps = React.SVGProps<SVGSVGElement>

export type ExLibrisMark = 'halo' | 'monogram'

type ExLibrisProps = SVGProps & {
  mark?: ExLibrisMark
}

const ExLibris: React.FC<ExLibrisProps> = ({ mark = 'monogram', ...props }) => {
  const { viewBox, d } = mark === 'halo' ? FM_HALO : FM_PLAIN
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
      <path d={d} fill='currentColor' />
    </svg>
  )
}

export default ExLibris
