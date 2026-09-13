import { render, screen } from '@testing-library/react'
import Footer from './index'

describe('Footer', () => {
  it('renders every nav link, the sign-off, the easter egg and the halo mark', () => {
    render(<Footer />)
    for (const label of [
      'About',
      'Projects',
      'Tech Stack',
      'Bookshelf',
      'Notebook',
      'Contact',
    ]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(
      screen.getByText('Let’s build something that pays for itself.')
    ).toBeInTheDocument()
    expect(screen.getByText('// avulso, since 2015')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Felipe Mateus ex-libris' })
    ).toBeInTheDocument()
    expect(
      screen.getByText(`© ${new Date().getFullYear()} Felipe Mateus`)
    ).toBeInTheDocument()
  })
})
