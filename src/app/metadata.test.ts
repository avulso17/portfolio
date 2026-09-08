vi.mock('@/styles/fonts', () => ({ fontVariables: '' }))
vi.mock('@/components/layout/RootLayout', () => ({ default: () => null }))

import { metadata } from './layout'

describe('root metadata', () => {
  it('carries the positioning, no placeholders and no unimplemented locale', () => {
    const title = metadata.title as { default: string; template: string }
    expect(title.default).toBe(
      'Felipe Mateus — Front-end engineer who thinks like a product owner'
    )
    expect(title.template).toBe('%s — Felipe Mateus')
    expect(JSON.stringify(metadata)).not.toMatch(/seu-|exemplo|seuhandle|\/pt/)
    expect(metadata.verification).toBeUndefined()
  })
})
