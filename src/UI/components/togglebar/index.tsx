import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

type TooglebarProps = ComponentProps<'nav'>

export const Tooglebar = ({
  className,
}: TooglebarProps): React.ReactElement => {
  return (
    <nav
      className={twMerge(
        'flex h-[3.75rem] rounded-xl border border-[rgba(39,38,44,0.38)] bg-onyx/60 p-4 backdrop-blur-[2px]',
        className
      )}
    >
      <button>nav</button>
    </nav>
  )
}
