import Link from 'next/link'

import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

import { hardware } from '@/configs/hardware'

export default function TechStackHardwareList() {
  return (
    <>
      <TechStackGroupTitle>Hardware</TechStackGroupTitle>
      <TechStackGroup>
        {hardware.map((item) => {
          const { image, name, link } = item

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
