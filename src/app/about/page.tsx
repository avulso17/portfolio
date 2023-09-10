import { Header } from '@/UI/components/header'
import { UnderConstruction } from '@/UI/components/underConstruction'

export default function AboutPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header
        title='A little bit about me'
        subtitle='Who I am and what I do.'
      />

      <UnderConstruction />
    </main>
  )
}
