import { Header } from '@/UI/components/header'
import { UnderConstruction } from '@/UI/components/underConstruction'

export default function WorkPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header title='Project' subtitle="Projects and ideas I've worked on" />

      <UnderConstruction />
    </main>
  )
}
