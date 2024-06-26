import { games } from '@/utils/stacks'
import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

export default function TechStackGamesList() {
  return (
    <>
      <TechStackGroupTitle>Games</TechStackGroupTitle>
      <TechStackGroup>
        {games.map((tool) => {
          const { image, name } = tool

          return <TechStackCard key={name} name={name} src={image} />
        })}
      </TechStackGroup>
    </>
  )
}
