'use client'
import { twMerge } from 'tailwind-merge'

import Separator from '../separator'

type NavbarProps = React.ComponentProps<'nav'>

export const Navbar = ({ className }: NavbarProps): React.ReactElement => {
  return (
    <nav
      className={twMerge(
        'h-fit max-h-[3.75rem] w-full rounded-xl bg-onyx/30 p-4 backdrop-blur-[2px]',
        className
      )}
    >
      <div className='flex items-baseline gap-10'>
        <button>About</button>
        <button>Work</button>
        <button>Notebook</button>
        <button>Contact</button>
        <button>More</button>
      </div>

      <div className='flex items-center gap-6'>
        <button></button>
        <button></button>
        <button></button>
        <Separator alpha orientation='vertical' />
      </div>
    </nav>
  )
}
