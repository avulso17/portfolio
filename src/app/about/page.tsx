import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import AboutContent from './_components/AboutContent'

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Felipe Mateus - Software Engineer',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'next.js',
    'react',
    'typescript',
    'software engineer',
    'front-end',
    'developer',
    'web developer',
    'about',
    'resume',
    'curriculum',
    'desenvolvimento web',
    'sistemas web',
    'sql server',
    'desenvolvimento e manutenção',
    'mysql',
    'net',
    'html5',
    'asp',
    'javascript',
    'jquery',
    'programdor web',
    'desenvolvimento de sistemas',
    'desenvolvimento de sites',
    'banco de dados',
    'html',
    'css',
    'php',
    'portfolio web developer',
    'web developer company',
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
  title: 'About',
  description:
    "Front-end engineer with a product owner's eye — how I decide, what I've shipped, where I'm useful.",
  appleWebApp: {
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'About',
    description:
      "Front-end engineer with a product owner's eye — how I decide, what I've shipped, where I'm useful.",
    url: 'https://felipe-mateus.com',
    siteName: 'Felipe Mateus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description:
      "Front-end engineer with a product owner's eye — how I decide, what I've shipped, where I'm useful.",
    creator: 'Felipe Mateus',
  },
}

const AboutPage: React.FC = () => {
  return (
    <main>
      <PageHero
        index='01'
        label='About'
        title='How I decide.'
        subtitle='A front-end engineer with an owner’s eye.'
        scene='about-paladin'
        sceneClassName='[&_img]:object-right'
      />
      <AboutContent />
    </main>
  )
}

export default AboutPage
