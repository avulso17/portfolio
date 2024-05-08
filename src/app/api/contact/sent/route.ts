import { Email } from '@/app/contact/actions'
import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body: Email = await request.json()
    console.log('body', body)

    const { email, name, subject, text } = body

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${name} <contact@felipe-mateus.com>`,
        to: ['felipe_mateus08@hotmail.com', 'felipe_dev08@hotmail.com'],
        subject,
        html: '<strong>it works!</strong>',
      }),
    })

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
