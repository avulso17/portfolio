import Link from 'next/link'

import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

import { tools } from '@/configs/tools'

export default function TechStackToolsList() {
  return (
    <>
      <TechStackGroupTitle>Dev & Design</TechStackGroupTitle>
      <TechStackGroup>
        {tools.map((tool) => {
          const { image, name, type, link } = tool

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
