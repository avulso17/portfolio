import ExLibris from '@/assets/ExLibris'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { scenes } from '@/configs/scenes.generated'

export const metadata = { robots: { index: false, follow: false } }

const DevAssetsPage = () => {
  return (
    <main className='flex flex-col gap-12 py-12'>
      <section className='flex flex-col gap-6 border-t border-line pt-4'>
        <Eyebrow>ex-libris</Eyebrow>
        <div className='flex flex-wrap items-end gap-12 text-parchment'>
          <div className='flex flex-col items-center gap-3'>
            <ExLibris mark='seal' className='h-[200px] w-[200px]' />
            <ExLibris mark='seal' className='h-16 w-16' />
            <ExLibris mark='seal' className='h-8 w-8' />
            <span className='text-parchment-mute eyebrow-text'>
              seal / 200 · 64 · 32
            </span>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <ExLibris mark='monogram' className='h-[200px] w-[200px]' />
            <ExLibris mark='monogram' className='h-7 w-7' />
            <ExLibris mark='monogram' className='h-4 w-4' />
            <span className='text-parchment-mute eyebrow-text'>
              rune / 200 · 28 · 16
            </span>
          </div>
        </div>
      </section>
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
