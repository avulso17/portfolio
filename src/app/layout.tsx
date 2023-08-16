import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/UI/styles/global.css'
import { Footer } from '@/UI/components/footer'
import Gradient from '@/UI/components/gradient'
import { Navbar } from '@/UI/components/navbar'
import '@fontsource/nanum-pen-script'

export const metadata: Metadata = {
  title: 'Portfolio - Felipe M.',
  description: 'Felipe M. Portfolio - Software Engineer',
  icons: {
    icon: '/favicon.ico',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en' className={inter.className}>
      <body className='relative z-0 px-4'>
        <Gradient />
        <div className='mx-auto max-w-screen-wide pt-8'>
          <Navbar className='mb-44' />
          {children}
          <Footer />
        </div>
        <Gradient position='bottom' />
      </body>
    </html>
  )
}
