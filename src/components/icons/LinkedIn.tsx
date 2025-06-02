type SVGProps = React.SVGProps<SVGSVGElement>

const LinkedInIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg fill='none' viewBox='0 0 24 24' height='1em' width='1em' {...props}>
      <path
        d='M8 11v5m3-6v2m0 4v-3.77a1.5 1.5 0 0 1 1.206-1.471l1.402-.28A2 2 0 0 1 16 12.438V16M8 8h.01M3 12c0-2.514 0-3.77.354-4.78a6.3 6.3 0 0 1 3.865-3.866C8.23 3 9.486 3 12 3s3.77 0 4.78.354a6.3 6.3 0 0 1 3.866 3.865C21 8.23 21 9.486 21 12s0 3.77-.354 4.78a6.3 6.3 0 0 1-3.865 3.866C15.77 21 14.514 21 12 21s-3.77 0-4.78-.354a6.3 6.3 0 0 1-3.866-3.865C3 15.77 3 14.514 3 12Z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        stroke='currentColor'
      />
    </svg>
  )
}

export default LinkedInIcon
