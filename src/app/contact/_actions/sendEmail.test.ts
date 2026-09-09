const { send } = vi.hoisted(() => ({
  send: vi.fn(async () => ({ error: null })),
}))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
  },
}))

import sendEmail from './sendEmail'

const formData = (fields: Record<string, string>) => {
  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) data.append(key, value)
  return data
}

const valid = {
  name: 'Felipe',
  email: 'felipe@example.com',
  subject: 'A bottleneck',
  text: 'The checkout flow drops half the users.',
}

describe('sendEmail schema', () => {
  beforeEach(() => send.mockClear())

  it('accepts a message within every limit', async () => {
    const result = await sendEmail(formData(valid))
    expect(result).not.toHaveProperty('errors')
    expect(send).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['name', 121, 'Keep the name under 120 characters.'],
    ['subject', 201, 'Keep the subject under 200 characters.'],
    ['text', 1501, 'Keep the message under 1500 characters.'],
  ])('rejects an over-long %s', async (field, length, message) => {
    const result = await sendEmail(
      formData({ ...valid, [field]: 'a'.repeat(length) })
    )
    expect(result.errors?.[field as 'name' | 'subject' | 'text']).toContain(
      message
    )
    expect(send).not.toHaveBeenCalled()
  })

  it('rejects an over-long email', async () => {
    const email = `${'a'.repeat(250)}@example.com`
    const result = await sendEmail(formData({ ...valid, email }))
    expect(result.errors?.email).toContain(
      'Keep the email under 254 characters.'
    )
    expect(send).not.toHaveBeenCalled()
  })
})
