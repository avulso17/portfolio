import ExLibris from '@/assets/ExLibris'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { scenes } from '@/configs/scenes.generated'

export const metadata = { robots: { index: false, follow: false } }

const DevAssetsPage = () => {
  return (
    <main className='flex flex-col gap-12 py-12'>
      <section className='flex flex-col gap-6 border-t border-line pt-4'>
        <Eyebrow>ex-libris — pick a ring</Eyebrow>
        <div className='flex flex-wrap items-end gap-12 text-parchment'>
          {(['double', 'double-bold', 'double-inset'] as const).map((ring) => (
            <div key={ring} className='flex flex-col items-center gap-3'>
              <ExLibris mark='seal' ring={ring} className='h-40 w-40' />
              <ExLibris mark='seal' ring={ring} className='h-16 w-16' />
              <span className='text-parchment-mute eyebrow-text'>{ring}</span>
            </div>
          ))}
          <div className='flex flex-col items-center gap-3'>
            <ExLibris mark='monogram' className='h-40 w-40' />
            <ExLibris mark='monogram' className='h-7 w-7' />
            <span className='text-parchment-mute eyebrow-text'>
              monogram / 28px
            </span>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <ExLibris mark='f' className='h-40 w-40' />
            <ExLibris mark='f' className='h-4 w-4' />
            <span className='text-parchment-mute eyebrow-text'>f / 16px</span>
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
