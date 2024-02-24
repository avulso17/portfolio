import { Header } from '@/components/Header'
import { UnderConstruction } from '@/components/UnderConstruction'

export default function WorkPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header title='Project' subtitle="Projects and ideas I've worked on" />

      <UnderConstruction />
    </main>
  )
}
