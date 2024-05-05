import { ProjectCard } from '@/components/ProjectCard'
import { works } from '@/configs/works'

const selectedWorks = works.home

export default function HomeSelectedWorkSection() {
  return (
    <>
      <h2 className='mb-8 header'>Selected Work</h2>
      <div className='mb-24 flex flex-col gap-8'>
        {selectedWorks.map(
          ({ icon, image, title, description, url }, index) => (
            <ProjectCard
              key={index}
              iconSrc={icon}
              imgSrc={image}
              title={title}
              href={url}
              description={description}
            />
          )
        )}
      </div>
    </>
  )
}
