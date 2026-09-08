import { render, screen } from '@testing-library/react'
import { tools } from '@/configs/tools'
import TechStackCard from './TechStackCard'

describe('TechStackCard', () => {
  it('renders name, mono category and no radius above 2px', () => {
    const t = tools[0]
    const { container } = render(
      <TechStackCard name={t.name} category={t.type} src={t.image} />
    )
    expect(screen.getByText(t.name)).toBeInTheDocument()
    expect(screen.getByText(t.type)).toHaveClass('eyebrow-text')
    expect(container.innerHTML).not.toMatch(/rounded-(md|lg|xl|2xl|3xl|4xl)/)
  })
})
