import { Header } from '@/UI/components/header'
import { UnderConstruction } from '@/UI/components/underConstruction'

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
