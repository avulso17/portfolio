import { hardware } from '@/utils/stacks'
import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

export default function TechStackHardwareList() {
  return (
    <>
      <TechStackGroupTitle>Hardware</TechStackGroupTitle>
      <TechStackGroup>
        {hardware.map((tool) => {
          const { image, name } = tool

          return <TechStackCard key={name} name={name} src={image} />
        })}
      </TechStackGroup>
    </>
  )
}
