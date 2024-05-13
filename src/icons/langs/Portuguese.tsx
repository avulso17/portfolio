type SVGProps = React.SVGProps<SVGSVGElement>

export default function PortugueseIcon({ children, ...props }: SVGProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      height='1em'
      width='1em'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_1689_7069)'>
        <g clipPath='url(#clip1_1689_7069)'>
          <path d='M20 0H0V20H20V0Z' fill='#6DA544' />
          <path
            d='M10 5.25L16.4453 10L10 14.75L3.55469 10L10 5.25Z'
            fill='#FFDA44'
          />
          <path
            d='M10 12.7148C11.4994 12.7148 12.7148 11.4994 12.7148 10C12.7148 8.50063 11.4994 7.28516 10 7.28516C8.50063 7.28516 7.28516 8.50063 7.28516 10C7.28516 11.4994 8.50063 12.7148 10 12.7148Z'
            fill='#F0F0F0'
          />
          <path
            d='M8.64453 9.83203C8.17187 9.83203 7.71875 9.90234 7.28906 10.0352C7.30859 11.5156 8.51563 12.7148 10.0039 12.7148C10.9219 12.7148 11.7344 12.2578 12.2266 11.5586C11.3828 10.5039 10.0898 9.83203 8.64453 9.83203Z'
            fill='#0052B4'
          />
          <path
            d='M12.6641 10.5195C12.6953 10.3516 12.7148 10.1758 12.7148 10C12.7148 8.5 11.5 7.28516 10 7.28516C8.88281 7.28516 7.92188 7.96094 7.50781 8.92969C7.875 8.85547 8.25391 8.8125 8.64453 8.8125C10.2188 8.8125 11.6445 9.46875 12.6641 10.5195Z'
            fill='#0052B4'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_1689_7069'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
        <clipPath id='clip1_1689_7069'>
          <rect width='20' height='20' rx='10' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
