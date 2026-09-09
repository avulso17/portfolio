import { SceneName, scenes } from '@/configs/scenes.generated'
import { cn } from '@/lib/utils/cn'

export type SceneProps = {
  name: SceneName
  className?: string
  position?: 'center' | 'top' | 'bottom'
  scrim?: 'bottom' | 'both' | 'none'
  drift?: boolean
}

const positions = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
} as const

export const Scene: React.FC<SceneProps> = ({
  name,
  className,
  position = 'center',
  scrim = 'bottom',
  drift = true,
}) => {
  const asset = scenes[name]

  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      <picture className={cn('block h-full w-full', drift && 'scene-drift')}>
        <source srcSet={asset.webp} type='image/webp' />
        <img
          src={asset.png}
          width={asset.cssWidth}
          height={asset.cssHeight}
          alt=''
          aria-hidden='true'
          decoding='async'
          loading='lazy'
          className={cn('h-full w-full object-cover', positions[position])}
          style={{ imageRendering: 'pixelated' }}
        />
      </picture>
      {scrim !== 'none' ? (
        <div
          data-scrim
          className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink from-15% via-ink/80 via-70% to-transparent'
        />
      ) : null}
      {scrim === 'both' ? (
        <div
          data-scrim
          className='absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink to-transparent'
        />
      ) : null}
    </div>
  )
}
