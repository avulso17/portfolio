'use server'

import { z } from 'zod'

const PUBLIC_URL = process.env.NEXT_PUBLIC_BASE_PATH

const SendEmailSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Invalid Email',
    })
    .min(1, 'E-mail is required!'),
  name: z.string(),
  subject: z.string(),
  text: z.string(),
})

export type Email = z.infer<typeof SendEmailSchema>

export default async function sendEmail(_: any, formData: FormData) {
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

  const data = validatedFields.data

  const dataWithHtml = {
    ...data,
    html: '<strong>Ai vai um teste</strong>',
  }

  // Mutate data
  try {
    await fetch(`${PUBLIC_URL}/api/contact/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataWithHtml),
    })

    return { message: 'Email successfully sent!', status: 'success' }
  } catch (e: any) {
    return { message: 'Something went wrong!', status: 'error' }
  }
}
