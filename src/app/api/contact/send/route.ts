import { Email } from '@/app/contact/actions'
import { EmailTemplate } from '@/sections/contact/ContactEmailTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body: Email = await request.json()
    console.log('body', body)

    const { email, name, subject, text } = body

    const data = await resend.emails.send({
      headers: {
        'Content-Type': 'application/json',
      },
      from: `${name} <contact@felipe-mateus.com>`,
      to: ['felipe_mateus08@hotmail.com', 'felipe_dev08@hotmail.com'],
      subject: 'Send route with resend instance',
      text: 'SENDDDD',
      react: EmailTemplate({ firstName: name }),
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
