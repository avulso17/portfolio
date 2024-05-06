import Link from 'next/link'

import UFOIcon from '@/icons/UFO'

import Gradient from '../../Gradient'
import Footer from './Footer'
import Navbar from './navbar'
import NavbarMobile from './navbar/Mobile'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative z-0 px-4 pb-20 mobile:pb-0'>
      <Gradient position='top' />

      <div className='mx-auto max-w-screen-wide pt-8'>
        <div className='mx-auto mb-28 w-fit mobile:hidden'>
          <Link href='/'>
            <UFOIcon className='mx-auto text-6xl text-white/50 transition-colors hover:text-white' />
          </Link>
        </div>

        <Navbar />
        {children}
        <Footer />
      </div>

      <NavbarMobile />

      <Gradient position='bottom' />
    </div>
  )
}
