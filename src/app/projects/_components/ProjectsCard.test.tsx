import { render, screen } from '@testing-library/react'
import { works } from '@/configs/works'
import ProjectsCard from './ProjectsCard'

const zeus = works.find((w) => w.slug === 'zeus-agrotech')!
const equals9 = works.find((w) => w.slug === 'equals9')!

describe('ProjectsCard', () => {
  it('renders eyebrow index, title, the call and the result, the stack and a visit link', () => {
    render(<ProjectsCard project={zeus} index={1} />)
    expect(screen.getByText(/02 —/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      zeus.title
    )
    expect(screen.getByText('The call')).toBeInTheDocument()
    expect(screen.getByText('The result')).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument()
    for (const s of zeus.stack) expect(screen.getByText(s)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Visit site/ })).toHaveAttribute(
      'href',
      zeus.url
    )
  })

  it('omits call/result rows and the link when data is missing', () => {
    render(<ProjectsCard project={equals9} index={6} />)
    expect(screen.queryByText('The call')).toBeNull()
    expect(screen.queryByText('The result')).toBeNull()
    expect(screen.queryByRole('link', { name: /Visit site/ })).toBeNull()
  })
})
