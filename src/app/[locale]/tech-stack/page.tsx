import { Header } from '@/components/Header'
import TechStackAppsList from '@/sections/tech-stack/TechStackAppsList'
import TechStackGamesList from '@/sections/tech-stack/TechStackGamesList'
import TechStackHardwareList from '@/sections/tech-stack/TechStackHardwareList'
import TechStackToolsList from '@/sections/tech-stack/TechStackToolsList'

export default function TechStacksPage() {
  return (
    <main className='w-full'>
      <Header
        title='Tech Stack'
        subtitle='The dev tools, apps, devices, and games I use and play.'
      />

      <div className='mb-28 mt-12'>
        <TechStackToolsList />

        <TechStackAppsList />

        <TechStackHardwareList />

        <TechStackGamesList />
      </div>
    </main>
  )
}
