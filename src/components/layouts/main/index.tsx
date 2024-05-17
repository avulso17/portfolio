import Link from 'next/link'

import LogoSvg from '@/assets/Logo'
import Gradient from '../../Gradient'
import Footer from './Footer'
import Navbar from './navbar/desktop'
import NavbarMobile from './navbar/mobile'

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
            <LogoSvg className='mx-auto h-8 w-12 text-white opacity-50 transition-opacity hover:opacity-80' />
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
