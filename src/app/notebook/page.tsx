import { Header } from '@/components/Header'
import NotebookPageWrapper from '@/sections/notebook/NotebookPageWrapper'

export default function NotebookPage(): React.ReactElement {
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
