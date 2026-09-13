import ProjectsCard from '@/app/projects/_components/ProjectsCard'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { works } from '@/configs/works'
import Link from 'next/link'

const selected = works.slice(0, 3)

const HomeSelectedWorkSection: React.FC = () => (
  <section className='rule-b py-16'>
    <div className='mb-8 flex items-end justify-between'>
      <div className='flex flex-col gap-3'>
        <Eyebrow index='01'>Selected work</Eyebrow>
        <h2>Decisions that shipped.</h2>
      </div>
      <Link href='/projects' className='hidden mobile:block'>
        <Button variant='text'>All projects</Button>
      </Link>
    </div>
    <ul className='flex flex-col gap-4'>
      {selected.map((project, index) => (
        <li key={project.slug}>
          <ProjectsCard project={project} index={index} />
        </li>
      ))}
    </ul>
  </section>
)

export default HomeSelectedWorkSection
