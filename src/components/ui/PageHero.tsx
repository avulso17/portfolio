import { SceneName } from '@/configs/scenes.generated'
import { cn } from '@/lib/utils/cn'
import { Eyebrow } from './Eyebrow'
import { Scene } from './Scene'

export type PageHeroProps = {
  index: string
  label: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  scene?: SceneName
  sceneClassName?: string
  className?: string
  children?: React.ReactNode
}

export const PageHero: React.FC<PageHeroProps> = ({
  index,
  label,
  title,
  subtitle,
  scene,
  sceneClassName,
  className,
  children,
}) => {
  return (
    <section
      className={cn(
        'relative z-0 flex min-h-[24rem] flex-col justify-end gap-6 border-b border-line pb-12 pt-32 mobile:min-h-[32rem] mobile:pt-40',
        className
      )}
    >
      {scene ? (
        <Scene name={scene} className={sceneClassName} scrim='both' priority />
      ) : null}
      <Eyebrow index={index} active={false}>
        {label}
      </Eyebrow>
      <h1 className='max-w-[14ch]'>{title}</h1>
      {subtitle ? (
        <p className='max-w-[48ch] font-serif text-2xl italic text-parchment-dim'>
          {subtitle}
        </p>
      ) : null}
      {children ? (
        <div className='flex flex-col gap-4 pt-4 mobile:flex-row'>
          {children}
        </div>
      ) : null}
    </section>
  )
}
