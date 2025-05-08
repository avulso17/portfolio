import WorkProjectCard from '@/app/work/WorkProjectCard'
import { works } from '@/configs/works'

const selectedWorks = works.slice(0, 3)

export default function HomeSelectedWorkSection() {
  return (
    <>
      <h2 className='mb-8 header'>Selected Work</h2>
      <ul className='mb-24 flex flex-col gap-8'>
        {selectedWorks.map(
          ({ icon, image, title, description, url, screenshotView }, index) => (
            <li key={index}>
              <WorkProjectCard
                iconSrc={icon}
                title={title}
                description={description}
                href={url}
                imgSrc={image}
                imgView={screenshotView}
              />
            </li>
          )
        )}
      </ul>
    </>
  )
}
