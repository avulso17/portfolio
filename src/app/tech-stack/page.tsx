import { Metadata } from 'next'

import TechStackAppsList from '@/components/sections/tech-stack/TechStackAppsList'
import TechStackGamesList from '@/components/sections/tech-stack/TechStackGamesList'
import TechStackHardwareList from '@/components/sections/tech-stack/TechStackHardwareList'
import TechStackToolsList from '@/components/sections/tech-stack/TechStackToolsList'
import { Header } from '@/components/ui/Header'

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
    'work',
    'projects',
    'apps',
    'games',
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
    'On this page you will find the main technologies I use, which I use to work, be productive, projects I have done and more...',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Felipe Mateus - Software Engineer',
    description:
      'On this page you will find the main technologies I use, which I use to work, be productive, projects I have done and more...',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    images: [
      {
        url: '/og/og-tech-stack.jpg',
        width: 800,
        height: 600,
      },
      {
        url: '/og/og-tech-stack.jpg',
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
      'On this page you will find the main technologies I use, which I use to work, be productive, projects I have done and more...',
    creator: 'Felipe Mateus',
    images: ['/og/og-tech-stack.jpg'],
  },
}

export default function TechStacksPage() {
  return (
    <main className='w-full'>
      <Header
        title='Tech Stack'
        subtitle='The dev tools, apps, devices, and games I use and play.'
      />

      <div className='mb-28 mt-12'>
        <TechStackToolsList />

        <TechStackAppsList />

        <TechStackHardwareList />

        <TechStackGamesList />
      </div>
    </main>
  )
}
