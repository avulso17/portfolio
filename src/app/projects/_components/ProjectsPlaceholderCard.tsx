import SendIcon from '@/components/icons/Send'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import Link from 'next/link'

const ProjectsPlaceholderCard: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Card
    className={
      className ? `border-dashed p-10 ${className}` : 'border-dashed p-10'
    }
  >
    <Eyebrow>Next</Eyebrow>
    <h3 className='mt-4 text-3xl font-semibold text-parchment'>
      Your project goes here.
    </h3>
    <p className='mb-8 mt-2 max-w-[48ch] text-parchment-dim'>
      Bring the bottleneck. I&rsquo;ll bring the call and the number it moved.
    </p>
    <Link href='/contact'>
      <Button leftIcon={<SendIcon className='text-xl' />}>
        Tell me what&rsquo;s stuck
      </Button>
    </Link>
  </Card>
)

export default ProjectsPlaceholderCard
