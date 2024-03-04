type SVGProps = React.SVGProps<SVGSVGElement>

function PigmoIcon({ children, ...props }: SVGProps) {
  return (
    <svg viewBox='0 0 512 512' height='1em' width='1em' {...props}>
      <rect width='512' height='512' fill='url(#paint0_linear_2011_2810)' />
      <g clipPath='url(#clip0_2011_2810)'>
        <path
          d='M278.993 128.408H180.346L176.93 149.767C174.56 164.585 186.002 178.012 200.991 178.012H258.79C280.857 178.012 297.676 197.752 294.178 219.553C290.713 241.19 272.063 257.087 250.159 257.087H241.561H228.893H180.51C168.545 257.087 158.345 265.788 156.449 277.612L139.907 380.663H188.34C200.272 380.663 210.455 371.995 212.335 360.204L220.933 306.527H268.025C314.905 306.527 354.838 272.461 362.259 226.16C370.481 174.888 330.891 128.408 278.993 128.408Z'
          fill='url(#paint1_linear_2011_2810)'
        />
      </g>

      <defs>
        <linearGradient
          id='paint0_linear_2011_2810'
          x1='256'
          y1='0'
          x2='256'
          y2='512'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#0E0810' />
          <stop offset='1' stopColor='#170D19' />
        </linearGradient>

        <linearGradient
          id='paint1_linear_2011_2810'
          x1='139.907'
          y1='254.528'
          x2='363.361'
          y2='254.528'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E90083' />
          <stop offset='1' stopColor='#FF6864' />
        </linearGradient>

        <clipPath id='clip0_2011_2810'>
          <rect
            width='229.209'
            height='261.953'
            fill='white'
            transform='translate(139.907 123.748)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default PigmoIcon
