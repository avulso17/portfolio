import { ProjectCard } from '@/components/ProjectCard'
import ProjectsPlaceholderCard from './ProjectsPlaceholderCard'

export default function ProjectsList() {
  return (
    <div className='flex flex-col gap-4 pb-28 pt-16'>
      <ProjectCard
        iconSrc='/apps/redux-store-icon.svg'
        imgSrc='/assets/redux-store-screenshot.png'
        title='Redux Store'
        href='https://redux-store-oficial.vercel.app/'
        description='This project is a simple store that uses Redux to manage the state of the application. I had the idea to do it because I really appreciate Redux and it would be a good experience to integrate it into a project, where I can manage the state of my store in a more intuitive and user friendly.'
      />
      <ProjectCard
        iconSrc='/apps/pigmo-icon.svg'
        imgSrc='/assets/pigmo-screenshot.png'
        title='Pigmo - Casino Online'
        href='https://app.pigmo.com/'
        description='Pigmo is a casino online that offers a wide range of games, including slots, table games, and live casino. I was responsible for the development of the website, which was built with Next.js and ChakraUI. I also worked on the integration of the payment gateway and the implementation of the affiliate/rewards system. The website is fully responsive and optimized for SEO.'
      />

      <ProjectsPlaceholderCard />
    </div>
  )
}
