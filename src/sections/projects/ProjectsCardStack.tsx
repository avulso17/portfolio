import { ProjectCard } from '@/components/ProjectCard'
import { Projects } from '@/configs/works'
import ProjectsPlaceholderCard from './ProjectsPlaceholderCard'

export type ProjectsCardStackProps = {
  items: Projects
}

export default function ProjectsCardStack({ items }: ProjectsCardStackProps) {
  return (
    <div className='flex flex-col gap-4'>
      {items.map(({ icon, image, title, description, url }, index) => (
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
