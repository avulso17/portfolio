import { ComponentProps } from 'react'

type BookProps = ComponentProps<'svg' | 'div'> & {
  image?: string
}

export const Book = ({ image, className }: BookProps): React.ReactElement => {
  return (
    <div className={className}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 215 325'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_927_4022)'>
          <rect width='215' height='330' rx='6' fill='white' />
          <rect y='-8' width='230' height='352' fill='url(#pattern0)' />
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
            id='pattern0'
            patternContentUnits='objectBoundingBox'
            width='1'
            height='1'
          >
            <use
              xlinkHref='#image0_927_4022'
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

          <clipPath id='clip0_927_4022'>
            <rect width='215' height='330' rx='6' fill='white' />
          </clipPath>

          <image id='image0_927_4022' width='600' height='920' href={image} />
        </defs>
      </svg>
    </div>
  )
}
