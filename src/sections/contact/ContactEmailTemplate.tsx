import { Button, Html } from '@react-email/components'
import { renderAsync } from '@react-email/render'

interface EmailTemplateProps {
  firstName: string
}

export function ContactEmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <Html lang='en' dir='ltr'>
      <Button href='https://example.com' style={{ color: '#61dafb' }}>
        Click me, {firstName}
      </Button>
    </Html>
  )
}

export const html = renderAsync(<ContactEmailTemplate firstName='Felipe' />, {
  pretty: true,
})

console.log(html)
