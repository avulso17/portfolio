import { Header, UnderConstruction } from '@/UI/components'

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
