import '@fontsource-variable/inter'
import '@fontsource/nanum-pen-script'
import '@/UI/styles/global.css'

import type { Metadata } from 'next'

import { Footer } from '@/UI/components/footer'
import { Gradient } from '@/UI/components/gradient'
import { Navbar } from '@/UI/components/navbar'
import { Togglebar } from '@/UI/components/togglebar'

export const metadata: Metadata = {
  title: 'Portfolio - Felipe M.',
  description: 'Felipe M. Portfolio - Software Engineer',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en'>
      <body className='relative z-0 px-4 pb-20 mobile:pb-0'>
        <Gradient />
        <div className='mx-auto max-w-screen-wide pt-8'>
          <Navbar className='mobile:mb-44' />
          {children}
          <Footer />
        </div>
        <Togglebar className='fixed bottom-4 left-4 right-4 mobile:hidden' />
        <Gradient position='bottom' />
      </body>
    </html>
  )
}
