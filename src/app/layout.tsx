import '@/styles/global.css'
import '@fontsource/nanum-pen-script'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MainLayout from '@/components/layouts/MainLayout'

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
  params: {
    locale: string
  }
}) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
