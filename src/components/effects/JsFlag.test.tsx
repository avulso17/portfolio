import { render } from '@testing-library/react'
import { JsFlag } from './JsFlag'

beforeEach(() => {
  delete document.documentElement.dataset.js
})

describe('JsFlag', () => {
  it('marks js on the document root', () => {
    render(<JsFlag />)
    expect(document.documentElement.dataset.js).toBe('')
  })
})
