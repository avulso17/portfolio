import { Header } from '@/components/ui/Header'
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
  title: 'Work | Felipe Mateus - Software Engineer',
  description:
    'Discover the main projects I’ve done and work in which I’ve participated...',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Work | Felipe Mateus - Software Engineer',
    description:
      'Discover the main projects I’ve done and work in which I’ve participated...',
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Felipe Mateus - Software Engineer',
    description:
      'Discover the main projects I’ve done and work in which I’ve participated...',
    creator: 'Felipe Mateus',
  },
}

const ProjectsPage: React.FC = () => {
  return (
    <main>
      <Header title='Projects' subtitle="Projects and ideas I've worked on" />
      <Content />
    </main>
  )
}

export default ProjectsPage
