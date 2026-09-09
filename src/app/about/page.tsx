import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import AboutContent from './_components/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
  description:
    'Front-end engineer with a product owner’s eye — how I decide, what I’ve shipped, where I’m useful.',
  openGraph: {
    title: 'About',
    description:
      'Front-end engineer with a product owner’s eye — how I decide, what I’ve shipped, where I’m useful.',
  },
  twitter: {
    title: 'About',
    description:
      'Front-end engineer with a product owner’s eye — how I decide, what I’ve shipped, where I’m useful.',
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
