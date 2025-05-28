type SVGProps = React.SVGProps<SVGSVGElement>

export default function MessageErrorIcon({ children, ...props }: SVGProps) {
  return (
    <svg viewBox='0 0 41 40' height='1em' width='1em' fill='none' {...props}>
      <path
        d='M37.1673 17.5V9.99996C37.1673 9.1159 36.8161 8.26806 36.191 7.64294C35.5659 7.01782 34.718 6.66663 33.834 6.66663H7.16732C6.28326 6.66663 5.43542 7.01782 4.81029 7.64294C4.18517 8.26806 3.83398 9.1159 3.83398 9.99996V30C3.83398 31.8333 5.33398 33.3333 7.16732 33.3333H28.0007'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.1673 11.6666L22.2173 21.1666C21.7028 21.489 21.1078 21.66 20.5007 21.66C19.8935 21.66 19.2985 21.489 18.784 21.1666L3.83398 11.6666'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M33.834 23.3333V29.9999'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M33.834 36.6666V36.6833'
        stroke='currentColor'
        strokeWidth='3.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
