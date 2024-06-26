import { type Projects } from '@/configs/works'

import ProjectCard from './WorkProjectCard'
import ProjectPlaceholderCard from './WorkProjectPlaceholderCard'

export type WorkCardStackProps = {
  items: Projects
}

export default function WorkCardStack({ items }: WorkCardStackProps) {
  return (
    <div className='flex flex-col gap-4'>
      {items.length > 0 ? (
        items.map(
          ({ icon, image, title, description, url, screenshotView }) => (
            <ProjectCard
              key={title}
              iconSrc={icon}
              title={title}
              description={description}
              href={url}
              imgSrc={image}
              imgView={screenshotView}
            />
          )
        )
      ) : (
        <div className='flex items-center justify-center py-10'>
          No items found
        </div>
      )}

      <ProjectPlaceholderCard />
    </div>
  )
}
