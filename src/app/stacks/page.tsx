import Separator from '@/UI/components/separator'
import { TechCard } from '@/UI/components/techCard'
import { apps, games, hardware, tools } from '@/utils/stacks'

export default function TechStacksPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <div className='relative flex flex-col gap-2 pb-16'>
        <h1>Tech Stack</h1>
        <p className='hero-text'>Let&rsquo;s build something awesome.</p>

        <Separator className='absolute bottom-0 !w-screen opacity-[0.06] absolute-center-x' />
      </div>

      <div className='mb-12 mt-16'>
        <h2 className='mb-8 text-gray-dark header'>Dev & Design</h2>
        <div className='mb-16 flex w-full flex-wrap content-center items-center gap-4'>
          {tools.map((tool) => {
            const { image, name, type } = tool

            return (
              <TechCard key={name} name={name} category={type} src={image} />
            )
          })}
        </div>

        <h2 className='mb-8 text-gray-dark header'>Apps</h2>
        <div className='mb-16 flex w-full flex-wrap content-center items-center gap-4'>
          {apps.map((apps) => {
            const { image, name, type } = apps

            return (
              <TechCard key={name} name={name} category={type} src={image} />
            )
          })}
        </div>

        <h2 className='mb-8 text-gray-dark header'>Hardware</h2>
        <div className='mb-16 flex w-full flex-wrap content-center items-center gap-4'>
          {hardware.map((hardware) => {
            const { image, name } = hardware

            return <TechCard key={name} name={name} src={image} />
          })}
        </div>

        <h2 className='mb-8 text-gray-dark header'>Games</h2>
        <div className='mb-16 flex w-full flex-wrap content-center items-center gap-4'>
          {games.map((games) => {
            const { image, name } = games

            return <TechCard key={name} name={name} src={image} />
          })}
        </div>
      </div>
    </main>
  )
}
