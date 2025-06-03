'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { ContactEmailTemplate } from '../components/ContactEmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

const SendEmailSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid Email',
    })
    .min(1, 'E-mail is required!'),
  name: z.string().min(1, 'Name is required!'),
  subject: z.string().min(1, 'Subject is required!'),
  text: z
    .string()
    .min(1, 'Message is required!')
    .max(1500, 'Message is too long!'),
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

  console.log(validatedFields)

  // Return early if the form data is invalid
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
