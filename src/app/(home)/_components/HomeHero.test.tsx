import { render, screen } from '@testing-library/react'
import HomeHero from './HomeHero'

vi.mock('@/components/effects/CrtWarp', () => ({
  CrtWarp: ({ name }: { name: string }) => (
    <div data-testid='crt' data-scene={name} />
  ),
}))
vi.mock('./HomeResumeModalButton', () => ({
  default: () => <button>See my résumé</button>,
}))

describe('HomeHero', () => {
  it('renders the spec headline, the sub, one accent CTA to /contact and the Paladin scene', () => {
    render(<HomeHero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(
      'I build the front-end and question the roadmap.'
    )
    expect(h1.querySelector('.text-outline')).toHaveTextContent(
      'and question the roadmap.'
    )
    expect(screen.getByText(/owner's eye/)).toBeInTheDocument()
    const cta = screen.getByRole('link', { name: "Tell me what's stuck" })
    expect(cta).toHaveAttribute('href', '/contact')
    expect(cta.querySelector('button')).toHaveClass('bg-amber')
    expect(screen.getByTestId('crt')).toHaveAttribute(
      'data-scene',
      'home-paladin'
    )
    expect(document.querySelectorAll('.bg-amber')).toHaveLength(1)
  })
})
