import { Project } from '@/configs/works'
import ProjectsCard from './ProjectsCard'
import ProjectsPlaceholderCard from './ProjectsPlaceholderCard'

const ProjectsCardStack: React.FC<{ items: Project[] }> = ({ items }) => (
  <div className='flex flex-col gap-4'>
    {items.length > 0 ? (
      items.map((project, index) => (
        <ProjectsCard key={project.slug} project={project} index={index} />
      ))
    ) : (
      <p className='py-10 text-center text-parchment-dim'>
        No project matches that.
      </p>
    )}
    <ProjectsPlaceholderCard />
  </div>
)

export default ProjectsCardStack
