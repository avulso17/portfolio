type SVGProps = React.SVGProps<SVGSVGElement>

const MessageFillIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        d='m20.41 7.209-3.013 2.343c-1.926 1.498-2.89 2.247-3.957 2.535a5.549 5.549 0 0 1-2.88 0c-1.068-.288-2.031-1.037-3.957-2.535L3.59 7.209m16.82 0a4.448 4.448 0 0 0-1.867-1.732C17.58 5 16.32 5 13.8 5h-3.6c-2.52 0-3.78 0-4.743.477A4.448 4.448 0 0 0 3.59 7.209m16.82 0c.034.06.068.119.1.18.49.936.49 2.16.49 4.611 0 2.45 0 3.675-.49 4.611a4.44 4.44 0 0 1-1.967 1.912C17.58 19 16.32 19 13.8 19h-3.6c-2.52 0-3.78 0-4.743-.477a4.44 4.44 0 0 1-1.967-1.912C3 15.675 3 14.451 3 12c0-2.45 0-3.675.49-4.611.032-.061.066-.12.1-.18'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export default MessageFillIcon
