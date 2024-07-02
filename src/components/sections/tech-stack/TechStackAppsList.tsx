import Link from 'next/link'

import TechStackCard from './TechStackCard'
import TechStackGroup from './TechStackGroup'
import TechStackGroupTitle from './TechStackGroupTitle'

import { apps } from '@/configs/apps'

export default function TechStackAppsList() {
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
