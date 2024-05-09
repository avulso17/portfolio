import { ContactEmailTemplate } from '@/sections/contact/ContactEmailTemplate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { email, name, subject, text } = body

    const data = await resend.emails.send({
      from: `${name} <contact@felipe-mateus.com>`,
      to: ['felipe_mateus08@hotmail.com', 'felipe_dev08@hotmail.com'],
      subject,
      react: ContactEmailTemplate({
        name,
        email,
        subject,
        text,
      }),
    })

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
