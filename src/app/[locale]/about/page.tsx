import { Header } from '@/components/Header'
import AboutContent from '@/sections/about/AboutContent'

export default function AboutPage() {
  return (
    <main className='w-full pb-20'>
      <Header
        title='A little bit about me'
        subtitle='Who I am and what I do.'
      />

      <AboutContent />
    </main>
  )
}
