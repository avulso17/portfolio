type SVGProps = React.SVGProps<SVGSVGElement>

const StarsIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4.35 17.4v1.35m0 0v1.35m0-1.35H5.7m-1.35 0H3M12.9 3l.32 2.52a7.2 7.2 0 0 0 6.027 6.205L21 12l-1.753.275a7.2 7.2 0 0 0-6.027 6.205L12.9 21l-.32-2.52a7.2 7.2 0 0 0-6.027-6.205L4.8 12l1.753-.275A7.2 7.2 0 0 0 12.58 5.52L12.9 3ZM5.7 3l.067.408a2.7 2.7 0 0 0 2.225 2.225L8.4 5.7l-.408.067a2.7 2.7 0 0 0-2.225 2.225L5.7 8.4l-.067-.408a2.7 2.7 0 0 0-2.225-2.225L3 5.7l.408-.067a2.7 2.7 0 0 0 2.225-2.225L5.7 3Z'
      />
    </svg>
  )
}

export default StarsIcon
