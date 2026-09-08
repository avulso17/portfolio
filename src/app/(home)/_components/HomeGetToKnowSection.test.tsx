import { render, screen } from '@testing-library/react'
import HomeGetToKnowSection from './HomeGetToKnowSection'

describe('HomeGetToKnowSection', () => {
  it('links four cards with a dithered scene each', () => {
    const { container } = render(<HomeGetToKnowSection />)
    for (const [name, href] of [
      ['About', '/about'],
      ['Notebook', '/notebook'],
      ['Bookshelf', '/bookshelf'],
      ['Tech Stack', '/tech-stack'],
    ]) {
      expect(
        screen.getByRole('link', { name: new RegExp(name) })
      ).toHaveAttribute('href', href)
    }
    expect(container.querySelectorAll('img[aria-hidden="true"]')).toHaveLength(
      4
    )
    expect(container.querySelector('.bg-amber')).toBeNull()
  })
})
