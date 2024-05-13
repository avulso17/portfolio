import { Header } from '@/components/Header'
import AboutContent from '@/sections/about/AboutContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Felipe Mateus - Software Engineer',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'Software Engineer',
    'Front-end',
    'Developer',
    'about',
    'resume',
    'curriculum',
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
  description:
    'Here you will find a summary about me where I highlight who I am, what I do and what I have done so far.',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Felipe Mateus - Software Engineer',
    description:
      'Here you will find a summary about me where I highlight who I am, what I do and what I have done so far.',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    images: [
      {
        url: '/og/og-about.jpg',
        width: 800,
        height: 600,
      },
      {
        url: '/og/og-about.jpg',
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
      'Here you will find a summary about me where I highlight who I am, what I do and what I have done so far.',
    creator: 'Felipe Mateus',
    images: ['/og/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <main className='w-full pb-20'>
      <Header
        title='A little bit about me'
        subtitle='Who I am and what I do.'
      />

      <AboutContent />
    </main>
  )
}
