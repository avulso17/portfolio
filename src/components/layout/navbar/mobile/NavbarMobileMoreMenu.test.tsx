import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavbarMobile from './index'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

describe('NavbarMobileMoreMenu', () => {
  it('keeps the panel hidden until the trigger is clicked (jsdom has no Tailwind sheet, so this asserts the hidden attribute and the [&[hidden]]:hidden guard class)', async () => {
    render(<NavbarMobile />)

    const trigger = screen.getByRole('button', { name: 'More' })
    const panel = document.getElementById('navbar-mobile-more')

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-controls', 'navbar-mobile-more')
    expect(panel).toHaveAttribute('hidden')
    expect(panel).toHaveClass('[&[hidden]]:hidden')

    await userEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(panel).not.toHaveAttribute('hidden')
  })
})
