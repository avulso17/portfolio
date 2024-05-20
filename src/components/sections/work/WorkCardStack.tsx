import { type Projects } from '@/configs/works'

import ProjectCard from './WorkProjectCard'
import ProjectPlaceholderCard from './WorkProjectPlaceholderCard'

export type WorkCardStackProps = {
  items: Projects
}

export default function WorkCardStack({ items }: WorkCardStackProps) {
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

      <ProjectPlaceholderCard />
    </div>
  )
}
