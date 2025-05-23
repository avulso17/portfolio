import '@/styles/global.css'
import '@fontsource/nanum-pen-script'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import RootLayout from '@/components/layout/RootLayout'

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Felipe Mateus - Software Engineer',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'next.js',
    'next',
    'react.js',
    'react',
    'javascript',
    'js',
    'typescript',
    'ts',
    'software engineer',
    'web developer',
    'front end developer',
    'front-end developer',
    'front-end',
    'front end',
    'Felipe Mateus',
    'Felipe',
    'Mateus',
    'engenheiro',
    'desenvolvedor',
    'desenvolvedor de software',
    'developer',
    'software developer',
    'programador',
    'programmer',
    'portfolio',
    'desenvolvimento web',
    'web development',
    'Uberlândia',
    'Brasil',
    'Brazil',
  ],
  authors: [{ name: 'Felipe Mateus', url: 'https://felipe-mateus.com' }],
  creator: 'Felipe Mateus',
  publisher: 'Felipe Mateus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://felipe-mateus.com'),
  title: {
    template: '%s | Felipe Mateus - Software Engineer',
    default:
      'Felipe Mateus - Software Engineer | Desenvolvedor Front-end no Brasil',
  },
  description:
    'Desenvolvedor de software especializado em front-end com React, Next.js e TypeScript. Portfolio profissional de Felipe Mateus, engenheiro de software baseado em Uberlândia, Brasil.',
  alternates: {
    canonical: 'https://felipe-mateus.com',
    languages: {
      'pt-BR': 'https://felipe-mateus.com/pt',
      'en-US': 'https://felipe-mateus.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        alt: 'Felipe Mateus - Software Engineer Portfolio',
      },
      {
        url: '/og/og-home.jpg',
        width: 1800,
        height: 1600,
        alt: 'Felipe Mateus - Software Engineer Portfolio',
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
    creator: '@seuhandletwitter',
    creatorId: '1467726470533754880',
    images: [
      {
        url: '/og/og-home.jpg',
        alt: 'Felipe Mateus - Software Engineer Portfolio',
      },
    ],
  },
  verification: {
    google: 'seu-codigo-de-verificacao-do-google',
    yandex: 'seu-codigo-de-verificacao-do-yandex',
    yahoo: 'seu-codigo-de-verificacao-do-yahoo',
    other: {
      me: [
        'mailto:seu-email@exemplo.com',
        'https://linkedin.com/in/seu-perfil',
      ],
    },
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <html lang='en' className={inter.variable}>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link
          rel='apple-touch-icon'
          href='/apple-icon.png'
          type='image/png'
          sizes='180x180'
        />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
export default Layout
