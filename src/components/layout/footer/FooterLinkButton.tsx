import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const FooterLinkButton: React.FC<{
  children: React.ReactNode
  href: string
  label: string
  target?: React.HTMLAttributeAnchorTarget
}> = ({ label, children, href, target }) => {
  return (
    <Link
      className='h-10 w-fit min-w-16'
      href={href}
      aria-label={label}
      target={target}
    >
      <Button className='h-full w-full justify-start gap-1' variant='text'>
        {children}
      </Button>
    </Link>
  )
}

export default FooterLinkButton
