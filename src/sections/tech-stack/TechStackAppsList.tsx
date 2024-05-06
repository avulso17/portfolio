import { apps } from '@/utils/stacks'
import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

export default function TechStackAppsList() {
  return (
    <>
      <TechStackGroupTitle>Apps</TechStackGroupTitle>
      <TechStackGroup>
        {apps.map((tool) => {
          const { image, name, type } = tool

          return (
            <TechStackCard key={name} name={name} category={type} src={image} />
          )
        })}
      </TechStackGroup>
    </>
  )
}
