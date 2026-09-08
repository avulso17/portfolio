import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import TechStackAppsList from './_components/TechStackAppsList'
import TechStackGamesList from './_components/TechStackGamesList'
import TechStackHardwareList from './_components/TechStackHardwareList'
import TechStackToolsList from './_components/TechStackToolsList'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'What I use to ship — the stack is a means, never the pitch.',
  openGraph: {
    title: 'Tech Stack',
    description: 'What I use to ship — the stack is a means, never the pitch.',
  },
  twitter: {
    title: 'Tech Stack',
    description: 'What I use to ship — the stack is a means, never the pitch.',
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
