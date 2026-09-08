import { render, screen } from '@testing-library/react'
import { PageHero } from './PageHero'

describe('PageHero', () => {
  it('renders eyebrow with index, the h1, the serif subtitle and the scene', () => {
    const { container } = render(
      <PageHero
        index='06'
        label='Contact'
        title="Tell me what's stuck."
        subtitle='Write it down.'
        scene='contact-letter'
      >
        <button>cta</button>
      </PageHero>
    )
    expect(screen.getByText(/06 —/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "Tell me what's stuck."
    )
    expect(screen.getByText('Write it down.')).toHaveClass(
      'font-serif',
      'italic'
    )
    expect(
      container.querySelector('img[aria-hidden="true"]')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'cta' })).toBeInTheDocument()
  })

  it('works without a scene', () => {
    const { container } = render(
      <PageHero index='01' label='About' title='X' />
    )
    expect(container.querySelector('img')).toBeNull()
  })
})
