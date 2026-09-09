'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { ContactEmailTemplate } from '../_components/ContactEmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

const SendEmailSchema = z.object({
  email: z
    .string({ invalid_type_error: 'Add your email so I can answer.' })
    .min(1, 'Add your email so I can answer.')
    .max(254, 'Keep the email under 254 characters.')
    .email('That email doesn’t look right.'),
  name: z
    .string()
    .min(1, 'Add your name.')
    .max(120, 'Keep the name under 120 characters.'),
  subject: z
    .string()
    .min(1, 'Add a subject.')
    .max(200, 'Keep the subject under 200 characters.'),
  text: z
    .string()
    .min(1, 'Write a message.')
    .max(1500, 'Keep the message under 1500 characters.'),
})

export type Email = z.infer<typeof SendEmailSchema>

export default async function sendEmail(formData: FormData) {
  const rawFormData = Object.fromEntries(formData)

  const validatedFields = SendEmailSchema.safeParse({
    email: rawFormData['email'],
    name: rawFormData['name'],
    subject: rawFormData['subject'],
    text: rawFormData['text'],
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, name, subject, text } = validatedFields.data

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: ['felipe_mateus08@hotmail.com', 'felipe_dev08@hotmail.com'],
    subject,
    react: ContactEmailTemplate({
      name,
      email,
      subject,
      text,
    }),
  })

  if (error) {
    return { message: 'Something went wrong!', status: 'error' }
  }

  return { message: 'Email successfully sent!', status: 'success' }
}
