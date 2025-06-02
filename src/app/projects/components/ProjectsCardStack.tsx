import { type Projects } from '@/configs/works'
import Card from './ProjectsCard'
import CardPlaceholder from './ProjectsPlaceholderCard'

export type ProjectsCardStackProps = {
  items: Projects
}

const ProjectsCardStack: React.FC<ProjectsCardStackProps> = ({ items }) => {
  return (
    <div className='flex flex-col gap-4'>
      {items.length > 0 ? (
        items.map(
          ({ icon, image, title, description, url, screenshotView }) => (
            <Card
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

      <CardPlaceholder />
    </div>
  )
}

export default ProjectsCardStack
