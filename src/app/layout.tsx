import '@/styles/global.css'
import '@fontsource/nanum-pen-script'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MainLayout from '@/components/layouts/main'

export const metadata: Metadata = {
  title: 'Felipe Mateus - Software Engineer',
  description: 'Felipe Mateus - Software Engineer',
  icons: {
    icon: '/logos/wired-planet.svg',
  },
  appleWebApp: {
    statusBarStyle: 'black-translucent',
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
    <html lang='en' className={inter.variable}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
