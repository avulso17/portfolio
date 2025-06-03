import HomeHero from '@/app/(home)/_components/HomeHero'
import dynamic from 'next/dynamic'

const HomeSelectedWorkSection = dynamic(
  () => import('@/app/(home)/_components/HomeSelectedWorkSection')
)
const HomeGetToKnowSection = dynamic(
  () => import('@/app/(home)/_components/HomeGetToKnowSection')
)
const HomeGetInTouchSection = dynamic(
  () => import('@/app/(home)/_components/HomeGetInTouchSection')
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
