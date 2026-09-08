import { render, screen } from '@testing-library/react'
import AboutContent from './AboutContent'

vi.mock('./AboutResumeModal', () => ({
  default: () => <button>résumé</button>,
}))

describe('AboutContent', () => {
  it('uses the three spec eyebrows and keeps the facts', () => {
    render(<AboutContent />)
    for (const label of [
      /How I decide/,
      /What I've shipped/,
      /Where I'm useful/,
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
    expect(screen.getByText(/Uberlândia/)).toBeInTheDocument()
    expect(screen.getByText(/five years in IT/)).toBeInTheDocument()
    expect(screen.queryByText(/passionate/i)).toBeNull()
    expect(screen.queryByText(/faithfully reproduce/i)).toBeNull()
  })
})
