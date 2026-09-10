import { Eyebrow } from '@/components/ui/Eyebrow'

export type TechStackGroupTitleProps = {
  index: string
  children: React.ReactNode
}

const TechStackGroupTitle: React.FC<TechStackGroupTitleProps> = ({
  index,
  children,
}) => (
  <div className='rule-t mb-6 flex flex-col gap-3 pt-8'>
    <Eyebrow as='h2' index={index}>
      {children}
    </Eyebrow>
  </div>
)

export default TechStackGroupTitle
