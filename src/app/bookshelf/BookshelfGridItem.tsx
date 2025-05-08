import { cn } from '@/lib/utils/cn'
import Image, { type StaticImageData } from 'next/image'

type BookshelfGridItemProps = React.ComponentProps<'svg' | 'div'> & {
  cover: string | StaticImageData
  name: string
}

const BookshelfGridItem: React.FC<BookshelfGridItemProps> = ({
  cover,
  name,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative z-0 w-full overflow-hidden rounded-md',
        className
      )}
    >
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 215 325'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath={`url(#clip-${name})`}>
          <rect
            y='-8'
            width='230'
            height='352'
            fill={`url(#pattern-${name})`}
          />
          <g filter='url(#filter0_ii_927_4022)'>
            <rect
              x='6'
              width='5'
              height='331'
              fill='#252525'
              fillOpacity='0.01'
            />
          </g>
        </g>

        <defs>
          <pattern
            id={`pattern-${name}`}
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use
              xlinkHref={`#image-${name}`}
              transform='matrix(0.00166667 0 0 0.00108902 0 -0.00094697)'
            />
          </pattern>
          <filter
            id='filter0_ii_927_4022'
            x='5'
            y='0'
            width='6'
            height='331'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-1' />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'
            />
            <feBlend
              mode='normal'
              in2='shape'
              result='effect1_innerShadow_927_4022'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-1' />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow_927_4022'
              result='effect2_innerShadow_927_4022'
            />
          </filter>

          <clipPath id={`clip-${name}`}>
            <rect width='215' height='330' rx='6' fill='white' />
          </clipPath>
        </defs>
      </svg>

      <Image
        className='-z-10 object-cover'
        src={cover}
        alt={name}
        fill
        loading='lazy'
        placeholder='blur'
        sizes='(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'
      />
    </div>
  )
}

export default BookshelfGridItem
