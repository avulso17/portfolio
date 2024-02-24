import { Header } from '@/components/Header'
import { TechCard } from '@/components/TechCard'
import { apps, games, hardware, tools } from '@/utils/stacks'

export default function TechStacksPage(): React.ReactElement {
  return (
    <main className='w-full'>
      <Header
        title='Tech Stack'
        subtitle='The dev tools, apps, devices, and games I use and play.'
      />

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
