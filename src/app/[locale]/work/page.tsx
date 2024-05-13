import { Header } from '@/components/Header'
import ProjectsList from '@/sections/projects/ProjectsList'

export default function WorkPage() {
  return (
    <div className='w-full'>
      <Header title='Project' subtitle="Projects and ideas I've worked on" />

      <ProjectsList />
    </div>
  )
}
