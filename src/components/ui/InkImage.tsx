'use client'

import { Button } from '@/components/ui/Button'
import { DitherName, dithered } from '@/configs/dither.generated'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import { useState } from 'react'

type InkImageProps = {
  name: DitherName
  src: string
  alt: string
  mode: 'hover' | 'toggle'
  sizes: string
  className?: string
  imageClassName?: string
  priority?: boolean
}

export const InkImage: React.FC<InkImageProps> = ({
  name,
  src,
  alt,
  mode,
  sizes,
  className,
  imageClassName,
  priority,
}) => {
  const [color, setColor] = useState(false)
  const ink = dithered[name]

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'object-cover',
          imageClassName,
          'transition-transform duration-[400ms] ease-out motion-reduce:transition-none'
        )}
      />
      <picture>
        <source srcSet={ink.webp} type='image/webp' />
        <img
          src={ink.png}
          width={ink.cssWidth}
          height={ink.cssHeight}
          alt=''
          aria-hidden='true'
          decoding='async'
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            imageClassName,
            'transition-[opacity,transform] ease-out [transition-duration:250ms,400ms] motion-reduce:transition-none',
            mode === 'hover' &&
              'group-focus-within:opacity-0 group-hover:opacity-0',
            mode === 'toggle' && color && 'opacity-0'
          )}
          style={{ imageRendering: 'pixelated' }}
        />
      </picture>
      {mode === 'toggle' ? (
        <Button
          variant='text'
          aria-pressed={color}
          onClick={() => setColor((c) => !c)}
          className='absolute bottom-3 left-3 bg-ink px-2 py-1'
        >
          {color ? 'Back to ink' : 'See in color'}
        </Button>
      ) : null}
    </div>
  )
}
