type SVGProps = React.SVGProps<SVGSVGElement>

export default function MessageSentIcon({ children, ...props }: SVGProps) {
  return (
    <svg viewBox='0 0 41 41' height='1em' width='1em' fill='none' {...props}>
      <path
        d='M37.1654 22.1667V10.5C37.1654 9.61593 36.8142 8.76809 36.1891 8.14297C35.5639 7.51785 34.7161 7.16666 33.832 7.16666H7.16536C6.28131 7.16666 5.43346 7.51785 4.80834 8.14297C4.18322 8.76809 3.83203 9.61593 3.83203 10.5V30.5C3.83203 32.3333 5.33203 33.8333 7.16536 33.8333H20.4987'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.1654 12.1667L22.2154 21.6667C21.7008 21.989 21.1059 22.16 20.4987 22.16C19.8915 22.16 19.2966 21.989 18.782 21.6667L3.83203 12.1667'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M27.166 32.1667L30.4993 35.5L37.166 28.8333'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
