import type { Metadata } from 'next'
import { Inter, Nanum_Pen_Script } from 'next/font/google'

import '@/UI/styles/global.css'
import Gradient from '@/UI/components/gradient'
import { Navbar } from '@/UI/components/navbar'

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

const nanumPen = Nanum_Pen_Script({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang='en' className={`${inter.className} ${nanumPen.className}`}>
      <body className='relative z-0 px-4'>
        <Gradient />
        <div className='mx-auto max-w-screen-wide py-8'>
          <Navbar />
          {children}
        </div>
        {/* <Gradient position='bottom' /> */}
      </body>
    </html>
  )
}
