import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

interface EmailTemplateProps {
  email: string
  name: string
  subject: string
  text: string
}

export function ContactEmailTemplate({
  name,
  subject,
  email,
  text,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New message - {text}</Preview>
      <Body style={main}>
        <Container
          style={{
            ...container,
            position: 'relative',
          }}
        >
          <Section
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '150px',
              width: '100%',
              zIndex: '-1',
            }}
          >
            <Img
              height={150}
              width='100%'
              src={`${baseUrl}/static/assets/gradient-email-template.png`}
            />
          </Section>

          <Section style={content}>
            <Text style={title}>New message</Text>

            <Text style={paragraph}>
              <strong style={{ color: '#808080' }}>name:</strong> {name}
            </Text>
            <Text style={paragraph}>
              <strong style={{ color: '#808080' }}>subject:</strong> {subject}
            </Text>
            <Text style={paragraph}>
              <strong style={{ color: '#808080' }}>sender:</strong> {email}
            </Text>

            <Text style={textArea}>{text}</Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              {name}
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Text style={{ textAlign: 'center', color: '#C5C5C5' }}>
              © 2024 Felipe Mateus, All Rights Reserved <br />
              Av. Lazara Alves Ferreira 300, AP 304 Torre 2, Uberlandia, MG,
              38408-092 - BRAZIL
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}

const fontFamily = 'Inter,Helvetica,Arial,sans-serif'

const main = {
  backgroundColor: '#0D0D0D',
  fontFamily,
}

const title = {
  color: '#ffffff',
  lineHeight: 1.5,
  fontSize: 48,
  fontWeight: 'bold',
  marginBottom: '32px',
}

const paragraph = {
  color: 'rgba(128, 128, 128, 0.5)',
  lineHeight: 1,
  fontWeight: 'semibold',
  fontSize: 14,
}

const textArea = {
  color: '#C5C5C5',
  lineHeight: 1.5,
  fontWeight: 'semibold',
  fontSize: 14,
}

const container = {
  maxWidth: '580px',
  margin: '30px auto',
  backgroundColor: '#0D0D0D',
  backgroundImage: 'url(/assets/gradient-email-template.png)',
}

const footer = {
  maxWidth: '580px',
  margin: '0 auto',
}

const content = {
  padding: '5px 20px 10px 20px',
}
