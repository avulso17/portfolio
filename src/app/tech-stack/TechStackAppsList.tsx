import { apps } from '@/configs/apps'
import Link from 'next/link'
import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

const TechStackAppsList: React.FC = () => {
  return (
    <>
      <TechStackGroupTitle>Apps</TechStackGroupTitle>
      <TechStackGroup>
        {apps.map((app) => {
          const { image, name, type, link } = app

          return (
            <Link key={name} href={link}>
              <TechStackCard name={name} category={type} src={image} />
            </Link>
          )
        })}
      </TechStackGroup>
    </>
  )
}

export default TechStackAppsList
