import { games } from '@/configs/games'
import Link from 'next/link'
import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

const TechStackGamesList: React.FC = () => {
  return (
    <>
      <TechStackGroupTitle>Games</TechStackGroupTitle>
      <TechStackGroup>
        {games.map((game) => {
          const { image, name, link } = game

          return (
            <Link key={name} href={link}>
              <TechStackCard name={name} src={image} />
            </Link>
          )
        })}
      </TechStackGroup>
    </>
  )
}

export default TechStackGamesList
