'use server'

import { Resend } from 'resend'
import { ContactEmailTemplate } from '../components/ContactEmailTemplate'

import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const SendEmailSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid Email',
    })
    .min(1, 'E-mail is required!'),
  name: z.string().min(1, 'Name is required!'),
  subject: z.string().min(1, 'Subject is required!'),
  text: z.string().min(1, 'Message is required!'),
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

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, name, subject, text } = validatedFields.data

  // Mutate data
  try {
    await resend.emails.send({
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

    return { message: 'Email successfully sent!', status: 'success' }
  } catch (e: any) {
    return { message: 'Something went wrong!', status: 'error' }
  }
}
