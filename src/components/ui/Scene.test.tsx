import { render } from '@testing-library/react'
import { scenes } from '@/configs/scenes.generated'
import { Scene } from './Scene'

describe('Scene', () => {
  it('renders the dithered png with pixelated rendering and css dimensions, hidden from AT', () => {
    const { container } = render(<Scene name='contact-letter' />)
    const img = container.querySelector('img')!
    const asset = scenes['contact-letter']
    expect(img).toHaveAttribute('src', asset.png)
    expect(img).toHaveAttribute('width', String(asset.cssWidth))
    expect(img).toHaveAttribute('height', String(asset.cssHeight))
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(img).toHaveAttribute('alt', '')
    expect(img.style.imageRendering).toBe('pixelated')
    expect(container.querySelector('picture source')).toHaveAttribute(
      'srcset',
      asset.webp
    )
  })

  it('loads lazily by default and eagerly when it carries the LCP', () => {
    const { container, rerender } = render(<Scene name='contact-letter' />)
    const img = () => container.querySelector('img')!
    expect(img()).toHaveAttribute('loading', 'lazy')
    expect(img()).not.toHaveAttribute('fetchpriority')
    rerender(<Scene name='contact-letter' priority />)
    expect(img()).toHaveAttribute('loading', 'eager')
    expect(img()).toHaveAttribute('fetchpriority', 'high')
  })

  it('adds the scrim and the drift class by default and drops them on demand', () => {
    const { container, rerender } = render(<Scene name='contact-letter' />)
    expect(container.querySelector('[data-scrim]')).toBeInTheDocument()
    expect(container.querySelector('.scene-drift')).toBeInTheDocument()
    rerender(<Scene name='contact-letter' scrim='none' drift={false} />)
    expect(container.querySelector('[data-scrim]')).toBeNull()
    expect(container.querySelector('.scene-drift')).toBeNull()
  })

  it('resolves on mount unless reveal is off', () => {
    const { container, rerender } = render(<Scene name='contact-letter' />)
    expect(container.querySelector('picture')).toHaveClass('scene-reveal')
    rerender(<Scene name='contact-letter' reveal={false} />)
    expect(container.querySelector('picture')).not.toHaveClass('scene-reveal')
  })
})
