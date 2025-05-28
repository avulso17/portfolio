type SVGProps = React.SVGProps<SVGSVGElement>

const ArrowRightIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        d='M15.17 6a30.23 30.23 0 0 1 5.62 5.406c.14.174.21.384.21.594m-5.83 6a30.232 30.232 0 0 0 5.62-5.406A.949.949 0 0 0 21 12m0 0H3'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        stroke='currentColor'
      />
    </svg>
  )
}

export default ArrowRightIcon
