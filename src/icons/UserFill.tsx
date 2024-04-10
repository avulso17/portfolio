type SVGProps = React.SVGProps<SVGSVGElement>

export default function UserFillIcon({ children, ...props }: SVGProps) {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' {...props}>
      <path
        d='M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 8H8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 4 4 0 0 0-4-4Z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        stroke='currentColor'
      />
    </svg>
  )
}
