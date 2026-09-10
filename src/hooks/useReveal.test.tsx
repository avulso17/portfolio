import { render } from '@testing-library/react'
import { act } from 'react'
import { Reveal } from '@/components/ui/Reveal'

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void
let callback: Callback
const disconnect = vi.fn()

beforeEach(() => {
  disconnect.mockClear()
  window.IntersectionObserver = vi.fn((cb: Callback) => {
    callback = cb
    return { observe: vi.fn(), disconnect, unobserve: vi.fn() }
  }) as unknown as typeof IntersectionObserver
})

describe('Reveal', () => {
  it('marks the element revealed once it intersects, then disconnects', () => {
    const { container } = render(<Reveal index={2}>hello</Reveal>)
    const el = container.firstElementChild as HTMLElement
    expect(el).toHaveClass('print-in')
    expect(el.dataset.revealed).toBeUndefined()
    expect(el.style.getPropertyValue('--reveal-i')).toBe('2')
    act(() => callback([{ isIntersecting: true }]))
    expect(el.dataset.revealed).toBe('')
    expect(disconnect).toHaveBeenCalled()
  })
})
