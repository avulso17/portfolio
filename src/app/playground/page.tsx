import { Header } from '@/components/ui/Header'
import FallingSand from '@/playground/falling-sand'

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
