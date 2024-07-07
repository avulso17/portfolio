import Link from 'next/link'

import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

import { games } from '@/configs/games'

export default function TechStackGamesList() {
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
