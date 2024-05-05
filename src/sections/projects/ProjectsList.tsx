import { ProjectCard } from '@/components/ProjectCard'
import { works } from '@/configs/works'
import ProjectsPlaceholderCard from './ProjectsPlaceholderCard'

const projects = works.projects

export default function ProjectsList() {
  return (
    <div className='flex flex-col gap-4 pb-28 pt-16'>
      {projects.map(({ icon, image, title, description, url }, index) => (
        <ProjectCard
          key={index}
          iconSrc={icon}
          imgSrc={image}
          title={title}
          href={url}
          description={description}
        />
      ))}

      <ProjectsPlaceholderCard />
    </div>
  )
}
