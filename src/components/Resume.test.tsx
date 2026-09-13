import { render, screen } from '@testing-library/react'
import Resume from './Resume'

describe('Resume', () => {
  it('leads with a level-2 heading so the host page keeps a single h1', () => {
    render(<Resume />)
    expect(
      screen.getByRole('heading', { level: 2, name: /FELIPE MATEUS/ })
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
  })
})
