import { Header } from '@/components/Header'
import NotebookPageWrapper from '@/sections/notebook/NotebookPageWrapper'
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
    'notebook',
    'insights',
    'notes',
    'curiosities',
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
    'Read, study and see the main thoughts and insights made by me. Curiosities and more...',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Felipe Mateus - Software Engineer',
    description:
      'Read, study and see the main thoughts and insights made by me. Curiosities and more...',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    images: [
      {
        url: '/og/og-notebook.jpg',
        width: 800,
        height: 600,
      },
      {
        url: '/og/og-notebook.jpg',
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
      'Read, study and see the main thoughts and insights made by me. Curiosities and more...',
    creator: 'Felipe Mateus',
    images: ['/og/og-notebook.jpg'],
  },
}

export default function NotebookPage() {
  return (
    <main className='w-full'>
      <Header
        title='Notebook'
        subtitle='My thoughts, insights, and reflections.'
      />

      <NotebookPageWrapper />
    </main>
  )
}
