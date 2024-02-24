import { Gradient } from '../Gradient'
import { Footer } from './main/Footer'
import { MenuMobile } from './main/MenuMobile'
import { Navbar } from './main/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative z-0 px-4 pb-20 mobile:pb-0'>
      <Gradient position='top' />

      <div className='mx-auto max-w-screen-wide pt-8'>
        <Navbar className='mobile:mb-44' />
        {children}
        <Footer />
      </div>

      <MenuMobile className='fixed bottom-4 left-4 right-4 z-30 mobile:hidden' />

      <Gradient position='bottom' />
    </div>
  )
}
