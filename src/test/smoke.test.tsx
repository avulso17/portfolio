import { render, screen } from '@testing-library/react'

const Hello = () => <p>hello</p>

describe('test infrastructure', () => {
  it('renders a component in jsdom', () => {
    render(<Hello />)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
