import '@/styles/global.css'

import type { Metadata } from 'next'

import RootLayout from '@/components/layout/RootLayout'
import { fontVariables } from '@/styles/fonts'

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Felipe Mateus',
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
    'developer',
    'software developer',
    'programmer',
    'portfolio',
    'web development',
    'Uberlândia',
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
    template: '%s — Felipe Mateus',
    default:
      'Felipe Mateus — Front-end engineer who thinks like a product owner',
  },
  description:
    'Front-end engineer with an owner’s eye. I find the bottleneck, make the call, and ship what moves the number. Based in Uberlândia, Brazil, working with early-stage teams anywhere.',
  alternates: { canonical: 'https://felipe-mateus.com' },
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
    title: 'Felipe Mateus — Front-end engineer who thinks like a product owner',
    description:
      'I find the bottleneck, make the call, and ship what moves the number.',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Mateus — Front-end engineer who thinks like a product owner',
    description:
      'I find the bottleneck, make the call, and ship what moves the number.',
  },
}

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <html lang='en' className={fontVariables}>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
export default Layout
