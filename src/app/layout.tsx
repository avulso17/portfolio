import '@fontsource/nanum-pen-script'
import '@/UI/styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer, Gradient, Navbar, Togglebar } from '@/UI/components'

export const metadata: Metadata = {
  title: 'Portfolio - Felipe M.',
  description: 'Felipe M. Portfolio - Software Engineer',
  icons: {
    icon: '/logos/wired-planet.svg',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en' className={inter.className}>
      <body className='relative z-0 px-4 pb-20 mobile:pb-0'>
        <Gradient />
        <div className='mx-auto max-w-screen-wide pt-8'>
          <Navbar className='mobile:mb-44' />
          {children}
          <Footer />
        </div>
        <Togglebar className='fixed bottom-4 left-4 right-4 z-30 mobile:hidden' />
        <Gradient position='bottom' />
      </body>
    </html>
  )
}
