import { Header } from '@/components/Header'
import FallingSand from '@/components/falling-sand'

export default function PlaygroundPage() {
  return (
    <main className='flex min-h-screen w-full flex-col'>
      <Header title='Playground' subtitle='Testing new ideas and concepts' />

      <div className='flex grow items-center justify-center'>
        <FallingSand />
      </div>
    </main>
  )
}
