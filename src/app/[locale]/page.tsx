import dynamic from 'next/dynamic'

import HomeHero from '@/sections/home/HomeHero'
import { setStaticParamsLocale } from 'next-international/server'

const HomeSelectedWorkSection = dynamic(
  () => import('@/sections/home/HomeSelectedWorkSection')
)

const HomeGetToKnowSection = dynamic(
  () => import('@/sections/home/HomeGetToKnowSection')
)

const HomeGetInTouchSection = dynamic(
  () => import('@/sections/home/HomeGetInTouchSection')
)

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setStaticParamsLocale(locale)

  return (
    <div className='w-full'>
      <HomeHero />
      <HomeSelectedWorkSection />
      <HomeGetToKnowSection />
      <HomeGetInTouchSection />
    </div>
  )
}
