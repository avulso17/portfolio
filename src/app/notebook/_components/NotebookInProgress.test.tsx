import { render, screen } from '@testing-library/react'
import NotebookInProgress from './NotebookInProgress'

describe('NotebookInProgress', () => {
  it('states that nothing is published and lists the planned categories', () => {
    render(<NotebookInProgress />)
    expect(screen.getByText(/0 published/)).toBeInTheDocument()
    for (const c of ['dev', 'design', 'philosophy'])
      expect(screen.getByText(new RegExp(c))).toBeInTheDocument()
    expect(screen.queryByText(/Dawn of Innovation/)).toBeNull()
  })
})
