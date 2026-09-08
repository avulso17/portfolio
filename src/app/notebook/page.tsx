import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import NotebookInProgress from './_components/NotebookInProgress'

export const metadata: Metadata = {
  title: 'Notebook',
  description: 'Notes in progress — decisions, not tutorials.',
  openGraph: {
    title: 'Notebook',
    description: 'Notes in progress — decisions, not tutorials.',
  },
  twitter: {
    title: 'Notebook',
    description: 'Notes in progress — decisions, not tutorials.',
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
