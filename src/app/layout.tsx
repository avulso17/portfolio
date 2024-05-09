import '@/styles/global.css'
import '@fontsource/nanum-pen-script'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MainLayout from '@/components/layouts/main'

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Felipe Mateus - Software Engineer',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'Software Engineer',
    'Front-end',
  ],
  authors: [{ name: 'Felipe', url: 'https://felipe-mateus.com' }],
  creator: 'Felipe Mateus',
  publisher: 'Felipe Mateus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://felipe-mateus.com'),
  title: 'Felipe Mateus - Software Engineer',
  description: 'Felipe Mateus - Software Engineer',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Felipe Mateus - Software Engineer',
    description:
      "I'm Felipe Mateus a multi-disciplinary Software Engineer and Front-end Software Developer based in Uberlândia, Brazil 🇧🇷.",
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    images: [
      {
        url: '/og/og-home.jpg',
        width: 800,
        height: 600,
      },
      {
        url: '/og/og-home.jpg',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Mateus - Software Engineer',
    description:
      "I'm Felipe Mateus a multi-disciplinary Software Engineer and Front-end Software Developer based in Uberlândia, Brazil 🇧🇷.",
    siteId: '1467726470533754880',
    creator: 'Felipe Mateus',
    creatorId: '1467726470533754880',
    images: ['/og/og-home.jpg'],
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
