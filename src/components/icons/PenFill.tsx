type SVGProps = React.SVGProps<SVGSVGElement>

const PenFillIcon: React.FC<SVGProps> = ({ children, ...props }) => {
  return (
    <svg viewBox='0 0 24 24' height='1em' width='1em' fill='none' {...props}>
      <path
        d='M3.066 18.315c.01-.377.014-.565.06-.742.04-.157.104-.307.19-.445.096-.155.228-.288.494-.555l13.053-13.11a1.569 1.569 0 0 1 1.964-.212 6.308 6.308 0 0 1 1.851 1.84l.034.052.047.073a1.601 1.601 0 0 1-.258 2.006L7.528 20.252c-.275.277-.413.415-.574.514a1.585 1.585 0 0 1-.46.19c-.183.045-.378.044-.767.044L3 20.995l.066-2.68Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export default PenFillIcon
