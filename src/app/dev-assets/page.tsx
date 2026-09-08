import { Eyebrow } from '@/components/ui/Eyebrow'
import { scenes } from '@/configs/scenes.generated'

export const metadata = { robots: { index: false, follow: false } }

const DevAssetsPage = () => {
  return (
    <main className='flex flex-col gap-12 py-12'>
      {Object.entries(scenes).map(([name, scene]) => (
        <section
          key={name}
          className='flex flex-col gap-3 border-t border-line pt-4'
        >
          <Eyebrow>{name}</Eyebrow>
          <p className='text-parchment-mute eyebrow-text'>
            {scene.width}×{scene.height} → {scene.cssWidth}×{scene.cssHeight}{' '}
            css
          </p>
          <div className='relative'>
            <img
              src={scene.png}
              width={scene.cssWidth}
              height={scene.cssHeight}
              alt=''
              className='max-w-full'
              style={{ imageRendering: 'pixelated' }}
            />
            <div
              aria-hidden
              className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent'
            />
            <h2 className='absolute bottom-6 left-6 text-parchment display-2'>
              {name.replace('-', ' ')}
            </h2>
          </div>
        </section>
      ))}
    </main>
  )
}

export default DevAssetsPage
