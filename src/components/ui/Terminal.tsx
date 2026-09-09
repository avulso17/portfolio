import { cn } from '@/lib/utils/cn'
import { ComponentProps } from 'react'

export type TerminalProps = ComponentProps<'section'> & {
  path?: string
  title: string
}

export const Terminal: React.FC<TerminalProps> = ({
  title,
  path,
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn('rounded-sm border border-line bg-ink-2', className)}
      {...props}
    >
      <header className='flex items-center gap-3 border-b border-line px-4 py-2.5'>
        <span className='flex items-center gap-1.5' aria-hidden='true'>
          <i className='block h-2 w-2 rounded-sm bg-parchment-mute' />
          <i className='block h-2 w-2 rounded-sm bg-parchment-mute' />
          <i className='block h-2 w-2 rounded-sm bg-parchment-mute' />
        </span>
        <p className='text-parchment eyebrow-text'>{title}</p>
        {path ? (
          <span className='ml-auto font-mono text-xs text-parchment-mute'>
            {path}
          </span>
        ) : null}
      </header>
      <div className='p-4 font-mono text-sm leading-relaxed text-parchment-dim'>
        {children}
      </div>
    </section>
  )
}
