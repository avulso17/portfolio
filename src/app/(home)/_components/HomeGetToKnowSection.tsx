import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Scene } from '@/components/ui/Scene'
import { SceneName } from '@/configs/scenes.generated'
import Link from 'next/link'

const cards: {
  href: string
  index: string
  label: string
  title: string
  scene: SceneName
}[] = [
  {
    href: '/about',
    index: '01',
    label: 'About',
    title: 'How I decide.',
    scene: 'about-paladin',
  },
  {
    href: '/notebook',
    index: '04',
    label: 'Notebook',
    title: 'Notes in progress.',
    scene: 'notebook-desk',
  },
  {
    href: '/bookshelf',
    index: '03',
    label: 'Bookshelf',
    title: 'What I read.',
    scene: 'bookshelf-library',
  },
  {
    href: '/tech-stack',
    index: '05',
    label: 'Tech Stack',
    title: 'Tools, not headlines.',
    scene: 'tech-bench',
  },
]

const HomeGetToKnowSection: React.FC = () => (
  <section className='rule-b py-16'>
    <div className='mb-8 flex flex-col gap-3'>
      <Eyebrow index='02'>Get to know me</Eyebrow>
      <h2>Who is making the calls.</h2>
    </div>
    <ul className='grid grid-cols-1 gap-4 tablet:grid-cols-2'>
      {cards.map(({ href, index, label, title, scene }) => (
        <li key={href}>
          <Link
            href={href}
            className='group block'
            aria-label={`${label} — ${title}`}
          >
            <Card className='relative z-0 flex aspect-[4/3] flex-col justify-end overflow-hidden p-6 transition-colors group-hover:border-parchment-dim'>
              <Scene name={scene} position='top' drift={false} />
              <Eyebrow index={index}>{label}</Eyebrow>
              <h3 className='mt-2 text-3xl font-semibold text-parchment'>
                {title}
              </h3>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export default HomeGetToKnowSection
