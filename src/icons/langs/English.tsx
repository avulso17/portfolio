type SVGProps = React.SVGProps<SVGSVGElement>

export default function EnglishIcon({ children, ...props }: SVGProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      height='1em'
      width='1em'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_1689_7078)'>
        <path d='M19 0H0V19H19V0Z' fill='#F0F0F0' />
        <path
          d='M11.2812 7.71875V0H7.71875V7.71875H0V11.2812H7.71875V19H11.2812V11.2812H19V7.71875H11.2812Z'
          fill='#D80027'
        />
        <path
          d='M19 16.3615V14.61L15.7529 12.8027H12.5986L19 16.3615Z'
          fill='#D80027'
        />
        <path
          d='M0 16.3615L6.40137 12.8027H3.24707L0 14.61V16.3615Z'
          fill='#D80027'
        />
        <path
          d='M12.5986 6.19727H15.7529L19 4.39004V2.63848L12.5986 6.19727Z'
          fill='#D80027'
        />
        <path
          d='M0 2.63848V4.39004L3.24707 6.19727H6.40137L0 2.63848Z'
          fill='#D80027'
        />
        <path d='M6.40137 0H0V0.987109L6.40137 4.5459V0Z' fill='#0052B4' />
        <path d='M0.27832 12.8027H0V12.9586L0.27832 12.8027Z' fill='#0052B4' />
        <path d='M0 5.17676V6.19727H1.82949L0 5.17676Z' fill='#0052B4' />
        <path
          d='M12.5986 5.40684L19 1.85176V0H12.5986V5.40684Z'
          fill='#0052B4'
        />
        <path d='M18.7217 6.19727H19V6.04141L18.7217 6.19727Z' fill='#0052B4' />
        <path d='M19 18.0092L12.5986 14.4541V19H19V18.0092Z' fill='#0052B4' />
        <path d='M0 17.1482V19H6.40137V13.5932L0 17.1482Z' fill='#0052B4' />
        <path d='M17.1705 12.8027L19 13.8195V12.8027H17.1705Z' fill='#0052B4' />
      </g>
      <defs>
        <clipPath id='clip0_1689_7078'>
          <rect width='19' height='19' rx='9.5' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
