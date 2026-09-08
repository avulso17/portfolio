import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import TechStackAppsList from './_components/TechStackAppsList'
import TechStackGamesList from './_components/TechStackGamesList'
import TechStackHardwareList from './_components/TechStackHardwareList'
import TechStackToolsList from './_components/TechStackToolsList'

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
  title: 'Tech Stack',
  description: 'What I use to ship — the stack is a means, never the pitch.',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Tech Stack',
    description: 'What I use to ship — the stack is a means, never the pitch.',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Stack',
    description: 'What I use to ship — the stack is a means, never the pitch.',
    creator: 'Felipe Mateus',
  },
}

const TechStacksPage: React.FC = () => {
  return (
    <main className='w-full'>
      <PageHero
        index='05'
        label='Tech Stack'
        title='Tools, not headlines.'
        subtitle='What I use to ship. The stack is a means, never the pitch.'
        scene='tech-bench'
      />

      <div className='pb-16'>
        <TechStackToolsList />

        <TechStackAppsList />

        <TechStackHardwareList />

        <TechStackGamesList />
      </div>
    </main>
  )
}

export default TechStacksPage
