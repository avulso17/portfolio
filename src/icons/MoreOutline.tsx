type SVGProps = React.SVGProps<SVGSVGElement>

export default function MoreOutlineIcon({ children, ...props }: SVGProps) {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        d='M4 12.5H20.5M4 16.25H20.5M4 20H20.5M5.875 5H18.625C19.1223 5 19.5992 5.19754 19.9508 5.54917C20.3025 5.90081 20.5 6.37772 20.5 6.875C20.5 7.37228 20.3025 7.84919 19.9508 8.20083C19.5992 8.55246 19.1223 8.75 18.625 8.75H5.875C5.37772 8.75 4.90081 8.55246 4.54917 8.20083C4.19754 7.84919 4 7.37228 4 6.875C4 6.37772 4.19754 5.90081 4.54917 5.54917C4.90081 5.19754 5.37772 5 5.875 5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
