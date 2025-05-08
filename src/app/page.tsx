import HomeHero from '@/components/sections/home/HomeHero'
import dynamic from 'next/dynamic'

const HomeSelectedWorkSection = dynamic(
  () => import('@/components/sections/home/HomeSelectedWorkSection')
)
const HomeGetToKnowSection = dynamic(
  () => import('@/components/sections/home/HomeGetToKnowSection')
)
const HomeGetInTouchSection = dynamic(
  () => import('@/components/sections/home/HomeGetInTouchSection')
)

const HomePage: React.FC = () => {
  return (
    <div>
      <HomeHero />
      <HomeSelectedWorkSection />
      <HomeGetToKnowSection />
      <HomeGetInTouchSection />
    </div>
  )
}

export default HomePage
