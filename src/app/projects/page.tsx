import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import Content from './_components/ProjectsContent'

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
    'repositories',
    'experiences',
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
  title: 'Projects',
  description:
    'Projects by Felipe Mateus — the decision taken on each one and what it moved.',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Projects',
    description:
      'Projects by Felipe Mateus — the decision taken on each one and what it moved.',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects',
    description:
      'Projects by Felipe Mateus — the decision taken on each one and what it moved.',
    creator: 'Felipe Mateus',
  },
}

const ProjectsPage: React.FC = () => {
  return (
    <main>
      <PageHero
        index='02'
        label='Projects'
        title='The call and the result.'
        subtitle='Every project lists what was decided and what it moved — not only what was built.'
        scene='projects-wall'
      />
      <Content />
    </main>
  )
}

export default ProjectsPage
