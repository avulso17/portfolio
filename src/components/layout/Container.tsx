import { cn } from '@/lib/utils/cn'
import { ComponentProps } from 'react'

type ContainerProps = ComponentProps<'div'> & {
  grid?: boolean
}

const markBase = 'reg-mark pointer-events-none absolute h-3 w-3 border-line'

const marks = [
  'left-0 top-0 border-l border-t -translate-x-px -translate-y-px',
  'right-0 top-0 border-r border-t translate-x-px -translate-y-px',
  'bottom-0 left-0 border-b border-l -translate-x-px translate-y-px',
  'bottom-0 right-0 border-b border-r translate-x-px translate-y-px',
]

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  grid = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative mx-auto max-w-screen-wide',
        grid && 'border-x border-line',
        className
      )}
      {...props}
    >
      {grid
        ? marks.map((m) => (
            <span
              key={m}
              data-reg-mark
              aria-hidden='true'
              className={cn(markBase, m)}
            />
          ))
        : null}
      {children}
    </div>
  )
}

export default Container
