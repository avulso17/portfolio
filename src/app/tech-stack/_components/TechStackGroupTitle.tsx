import { Eyebrow } from '@/components/ui/Eyebrow'

export type TechStackGroupTitleProps = {
  index: string
  children: React.ReactNode
}

const TechStackGroupTitle: React.FC<TechStackGroupTitleProps> = ({
  index,
  children,
}) => (
  <div className='mb-6 flex flex-col gap-3 border-t border-line pt-8'>
    <Eyebrow index={index}>{children}</Eyebrow>
  </div>
)

export default TechStackGroupTitle
