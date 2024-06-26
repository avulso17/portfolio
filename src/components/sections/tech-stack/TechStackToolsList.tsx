import { tools } from '@/configs/tools'
import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

export default function TechStackToolsList() {
  return (
    <>
      <TechStackGroupTitle>Dev & Design</TechStackGroupTitle>
      <TechStackGroup>
        {tools.map((tool) => {
          const { image, name, type } = tool

          return (
            <TechStackCard key={name} name={name} category={type} src={image} />
          )
        })}
      </TechStackGroup>
    </>
  )
}
