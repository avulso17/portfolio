type SVGProps = React.SVGProps<SVGSVGElement>

const InstagramIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        d='M17.046 7h.01m-14.01 5c0-2.514 0-3.77.354-4.78a6.3 6.3 0 0 1 3.866-3.866C8.276 3 9.533 3 12.046 3c2.514 0 3.77 0 4.781.354a6.3 6.3 0 0 1 3.866 3.865c.353 1.01.353 2.267.353 4.781s0 3.77-.353 4.78a6.3 6.3 0 0 1-3.866 3.866c-1.01.354-2.267.354-4.78.354-2.514 0-3.771 0-4.781-.354A6.3 6.3 0 0 1 3.4 16.782c-.354-1.01-.354-2.267-.354-4.781Zm12.778-.56a3.819 3.819 0 1 1-7.555 1.12 3.819 3.819 0 0 1 7.555-1.12Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export default InstagramIcon
