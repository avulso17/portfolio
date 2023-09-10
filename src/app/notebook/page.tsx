import { Header, UnderConstruction } from '@/UI/components'

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
