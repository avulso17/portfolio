import { fireEvent, render, screen } from '@testing-library/react'
import { InkImage } from './InkImage'

describe('InkImage', () => {
  it('layers the ink version over the color image and hides it from AT', () => {
    const { container } = render(
      <InkImage
        name='pigmo'
        src='/assets/pigmo-screenshot.png'
        alt='Pigmo'
        mode='hover'
        sizes='28rem'
      />
    )
    const ink = container.querySelector(
      'img[aria-hidden="true"]'
    ) as HTMLImageElement
    expect(ink).toHaveAttribute('src', expect.stringContaining('/dither/pigmo'))
    expect(ink.style.imageRendering).toBe('pixelated')
    expect(screen.getByAltText('Pigmo')).toBeInTheDocument()
    expect(ink).toHaveClass('group-hover:opacity-0')
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('toggle mode reveals the color version with a pressed button', async () => {
    const { container } = render(
      <InkImage
        name='portrait'
        src='/assets/me-green-shirt.png'
        alt='Felipe Mateus'
        mode='toggle'
        sizes='22rem'
      />
    )
    const button = screen.getByRole('button', { name: 'See in color' })
    expect(button).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(button)
    await screen.findByRole('button', { name: 'Back to ink' })
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    expect(container.querySelector('img[aria-hidden="true"]')).toHaveClass(
      'opacity-0'
    )
  })
})
