import LogoSvg from '@/assets/Logo'
import Link from 'next/link'
import Gradient from '../ui/Gradient'
import Container from './Container'
import Footer from './footer'
import NavbarDesktop from './navbar/desktop'
import NavbarMobile from './navbar/mobile'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative z-0 px-4 pb-20 mobile:pb-0'>
      <Gradient position='top' />
      <Container className='pt-8'>
        <div className='mx-auto mb-28 w-fit mobile:hidden'>
          <Link href='/' aria-label='Home'>
            <LogoSvg className='mx-auto h-8 w-12 text-white opacity-50 transition-opacity hover:opacity-80' />
          </Link>
        </div>

        <NavbarDesktop />
        {children}
        <Footer />
      </Container>
      <Gradient position='bottom' />
      <NavbarMobile />
    </div>
  )
}

export default RootLayout
