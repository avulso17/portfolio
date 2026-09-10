import { InkImage } from '@/components/ui/InkImage'

const AboutPortrait: React.FC = () => (
  <InkImage
    name='portrait'
    src='/assets/me-green-shirt.png'
    alt='Felipe Mateus'
    mode='toggle'
    sizes='(min-width: 1024px) 22rem, 100vw'
    priority
    className='aspect-[344/432] w-full rounded-sm border border-line bg-ink-2'
  />
)

export default AboutPortrait
