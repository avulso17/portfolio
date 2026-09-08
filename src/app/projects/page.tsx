import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import Content from './_components/ProjectsContent'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects by Felipe Mateus — the decision taken on each one and what it moved.',
  openGraph: {
    title: 'Projects',
    description:
      'Projects by Felipe Mateus — the decision taken on each one and what it moved.',
  },
  twitter: {
    title: 'Projects',
    description:
      'Projects by Felipe Mateus — the decision taken on each one and what it moved.',
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
