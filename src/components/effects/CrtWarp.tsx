'use client'

import { SceneName } from '@/configs/scenes.generated'
import { Scene } from '@/components/ui/Scene'
import { cn } from '@/lib/utils/cn'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

const CrtWarpCanvas = dynamic(
  () => import('./CrtWarpCanvas').then((m) => m.CrtWarpCanvas),
  { ssr: false }
)

type Props = { name: SceneName; className?: string }

/** Static dithered scene on the server and until the WebGL canvas draws its first frame. */
export const CrtWarp: React.FC<Props> = ({ name, className }) => {
  const [{ supported, animate }, setCapability] = useState({
    supported: false,
    animate: false,
  })
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const fail = useCallback(
    () => setCapability({ supported: false, animate: false }),
    []
  )

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (canvas.getContext('webgl2')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCapability({ supported: true, animate: !reduced })
    }
  }, [])

  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      {!ready ? <Scene name={name} drift={false} scrim='none' /> : null}
      {supported ? (
        <div className='absolute inset-0'>
          <CrtWarpCanvas
            name={name}
            onFail={fail}
            onReady={onReady}
            animate={animate}
          />
        </div>
      ) : null}
      <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent' />
      <div className='absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink to-transparent' />
    </div>
  )
}
