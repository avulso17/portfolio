import { act, render } from '@testing-library/react'
import { PrintFrame } from './PrintFrame'

const html = () => document.documentElement

beforeEach(() => {
  delete html().dataset.js
  delete html().dataset.print
  document.body.innerHTML =
    '<div class="rule-b"></div><div class="rule-t"></div>'
  window.sessionStorage.clear()
})

describe('PrintFrame', () => {
  it('marks js and prints the frame on the first page of a session', () => {
    render(<PrintFrame />)
    expect(html().dataset.js).toBe('')
    expect(html().dataset.print).toBe('')
    expect(window.sessionStorage.getItem('printed')).toBe('1')
    const rules = document.querySelectorAll<HTMLElement>('.rule-b, .rule-t')
    expect(rules[0].style.getPropertyValue('--rule-i')).toBe('0')
    expect(rules[1].style.getPropertyValue('--rule-i')).toBe('1')
  })

  it('does not print again later in the session', () => {
    window.sessionStorage.setItem('printed', '1')
    render(<PrintFrame />)
    expect(html().dataset.js).toBe('')
    expect(html().dataset.print).toBeUndefined()
  })

  it('treats blocked storage as already printed', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<PrintFrame />)
    expect(html().dataset.js).toBe('')
    expect(html().dataset.print).toBeUndefined()
    vi.restoreAllMocks()
  })

  it('clears the print attribute once the print finishes', () => {
    vi.useFakeTimers()
    render(<PrintFrame />)
    expect(html().dataset.print).toBe('')
    act(() => {
      vi.advanceTimersByTime(1100)
    })
    expect(html().dataset.print).toBeUndefined()
    vi.useRealTimers()
  })
})
