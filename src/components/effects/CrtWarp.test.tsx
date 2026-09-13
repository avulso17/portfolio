import { act, render, screen } from '@testing-library/react'
import { CrtWarp } from './CrtWarp'

type CanvasProps = { onReady: () => void; onFail: () => void }
const handlers: CanvasProps[] = []

vi.mock('./CrtWarpCanvas', () => ({
  CrtWarpCanvas: (props: CanvasProps) => {
    handlers.push(props)
    return <canvas data-testid='crt-canvas' />
  },
}))

beforeEach(() => {
  handlers.length = 0
  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    getExtension: () => ({ loseContext: () => {} }),
  }) as unknown as typeof HTMLCanvasElement.prototype.getContext
})

const fallbackImg = () => document.querySelector('img[aria-hidden="true"]')

describe('CrtWarp', () => {
  it('shows the static scene, swaps to the canvas on ready, and restores the scene when the context is lost', async () => {
    render(<CrtWarp name='home-paladin' />)
    expect(fallbackImg()).toBeInTheDocument()

    const canvas = await screen.findByTestId('crt-canvas')
    expect(canvas).toBeInTheDocument()

    act(() => handlers.at(-1)!.onReady())
    expect(fallbackImg()).toBeNull()

    act(() => handlers.at(-1)!.onFail())
    expect(screen.queryByTestId('crt-canvas')).toBeNull()
    expect(fallbackImg()).toBeInTheDocument()
  })
})
