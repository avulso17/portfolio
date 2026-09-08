import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import NotebookInProgress from './_components/NotebookInProgress'

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
  title: 'Notebook',
  description: 'Notes in progress — decisions, not tutorials.',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Notebook',
    description: 'Notes in progress — decisions, not tutorials.',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notebook',
    description: 'Notes in progress — decisions, not tutorials.',
    creator: 'Felipe Mateus',
  },
}

const NotebookPage: React.FC = () => {
  return (
    <main>
      <PageHero
        index='04'
        label='Notebook'
        title='Notes in progress.'
        subtitle='Nothing published yet. The first notes land here.'
        scene='notebook-desk'
      />
      <NotebookInProgress />
    </main>
  )
}

export default NotebookPage
