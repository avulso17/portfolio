import dynamic from 'next/dynamic'

import HomeHero from '@/components/sections/home/HomeHero'

const HomeSelectedWorkSection = dynamic(
  () => import('@/components/sections/home/HomeSelectedWorkSection')
)

const HomeGetToKnowSection = dynamic(
  () => import('@/components/sections/home/HomeGetToKnowSection')
)

const HomeGetInTouchSection = dynamic(
  () => import('@/components/sections/home/HomeGetInTouchSection')
)

export default function Home() {
  return (
    <div className='w-full'>
      <HomeHero />
      <HomeSelectedWorkSection />
      <HomeGetToKnowSection />
      <HomeGetInTouchSection />
    </div>
  )
}
