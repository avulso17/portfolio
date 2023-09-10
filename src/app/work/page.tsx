import { Header, UnderConstruction } from '@/UI/components'

export default function WorkPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header title='Project' subtitle="Projects and ideas I've worked on" />

      <UnderConstruction />
    </main>
  )
}
