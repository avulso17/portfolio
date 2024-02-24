import { Header } from '@/components/Header'
import { UnderConstruction } from '@/components/UnderConstruction'

export default function UIKitPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header title='UI Kit' subtitle="Projects and ideas I've worked on" />

      <UnderConstruction />
    </main>
  )
}
