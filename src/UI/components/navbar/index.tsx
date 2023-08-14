'use client'
import Separator from '../separator'

export const Navbar = (): React.ReactElement => {
  return (
    <nav className='h-fit max-h-[3.75rem] w-full rounded-xl bg-onyx/30 p-4 backdrop-blur-[2px]'>
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
