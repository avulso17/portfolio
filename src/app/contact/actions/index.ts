'use server'

import { z } from 'zod'

const PUBLIC_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL

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
  console.log(PUBLIC_URL)

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

  const data = validatedFields.data

  // Mutate data
  try {
    await fetch(`http://localhost:3000/api/contact/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return { message: 'Email successfully sent!', status: 'success' }
  } catch (e: any) {
    return { message: 'Something went wrong!', status: 'error' }
  }
}
