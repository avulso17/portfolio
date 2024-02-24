import { Header } from '@/components/Header'
import { UnderConstruction } from '@/components/UnderConstruction'

export default function NotebookPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header
        title='Notebook'
        subtitle='My thoughts, insights, and reflections.'
      />

      <UnderConstruction />
    </main>
  )
}
