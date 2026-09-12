import { JsFlag } from '@/components/effects/JsFlag'
import ExLibris from '@/assets/ExLibris'
import Link from 'next/link'
import Container from './Container'
import Footer from './footer'
import NavbarDesktop from './navbar/desktop'
import NavbarMobile from './navbar/mobile'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative z-0 px-4 pb-20 mobile:pb-0'>
      <JsFlag />
      <Container className='px-4 pt-8 mobile:px-8'>
        <div className='mx-auto mb-28 w-fit mobile:hidden'>
          <Link href='/' aria-label='Home'>
            <ExLibris
              mark='monogram'
              className='mx-auto h-9 w-auto text-parchment-dim transition-colors hover:text-parchment'
            />
          </Link>
        </div>

        <NavbarDesktop />
        {children}
        <Footer />
      </Container>
      <NavbarMobile />
    </div>
  )
}

export default RootLayout
