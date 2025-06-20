type SVGProps = React.SVGProps<SVGSVGElement>

const UFOIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M16.56 7.44C15.779 5.411 14.03 4 12 4S8.222 5.412 7.44 7.44m9.12 0C19.79 8.102 22 9.447 22 11c0 2.21-4.477 4-10 4S2 13.21 2 11c0-1.552 2.21-2.897 5.44-3.56m9.12 0a6.72 6.72 0 0 1 .404 3.1C15.5 10.831 13.807 11 12 11c-1.806 0-3.501-.168-4.964-.46a6.72 6.72 0 0 1 .403-3.1M4 17l-1 2m9-1v3m8-4 1 2'
      />
    </svg>
  )
}

export default UFOIcon
