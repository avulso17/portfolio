import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const FooterLinkButton: React.FC<{
  href: string
  label: string
  target?: React.HTMLAttributeAnchorTarget
}> = ({ label, href, target }) => {
  return (
    <Link
      className='h-10 w-fit min-w-16'
      href={href}
      aria-label={label}
      target={target}
    >
      <Button className='h-full w-full justify-start' variant='text'>
        {label}
      </Button>
    </Link>
  )
}

export default FooterLinkButton
