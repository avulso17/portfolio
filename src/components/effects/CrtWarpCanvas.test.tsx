import { render } from '@testing-library/react'
import { StrictMode } from 'react'
import { CrtWarpCanvas } from './CrtWarpCanvas'

const makeContext = () => {
  let lost = false

  return {
    VERTEX_SHADER: 0,
    FRAGMENT_SHADER: 1,
    COMPILE_STATUS: 2,
    ARRAY_BUFFER: 3,
    STATIC_DRAW: 4,
    FLOAT: 5,
    TEXTURE_2D: 6,
    TEXTURE_MIN_FILTER: 7,
    TEXTURE_MAG_FILTER: 8,
    TEXTURE_WRAP_S: 9,
    TEXTURE_WRAP_T: 10,
    NEAREST: 11,
    CLAMP_TO_EDGE: 12,
    TRIANGLE_STRIP: 13,
    RGB: 14,
    UNSIGNED_BYTE: 15,
    createProgram: () => (lost ? null : {}),
    createShader: () => (lost ? null : {}),
    shaderSource: (shader: unknown) => {
      if (!shader) throw new TypeError('null shader')
    },
    compileShader: () => {},
    getShaderParameter: () => !lost,
    getShaderInfoLog: () => 'shader',
    attachShader: () => {},
    linkProgram: () => {},
    useProgram: () => {},
    createBuffer: () => ({}),
    bindBuffer: () => {},
    bufferData: () => {},
    getAttribLocation: () => 0,
    enableVertexAttribArray: () => {},
    vertexAttribPointer: () => {},
    getUniformLocation: () => ({}),
    createTexture: () => ({}),
    bindTexture: () => {},
    texParameteri: () => {},
    texImage2D: () => {},
    uniform1f: () => {},
    uniform2f: () => {},
    viewport: () => {},
    drawArrays: () => {},
    deleteTexture: vi.fn(),
    deleteBuffer: vi.fn(),
    deleteProgram: vi.fn(),
    getExtension: () => ({
      loseContext: () => {
        lost = true
      },
    }),
  }
}

const stubContext = (context: ReturnType<typeof makeContext>) =>
  vi
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockReturnValue(context as unknown as WebGL2RenderingContext)

describe('CrtWarpCanvas', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('survives the StrictMode mount/unmount/mount cycle without falling back', () => {
    const context = makeContext()
    stubContext(context)
    const onFail = vi.fn()

    render(
      <StrictMode>
        <CrtWarpCanvas
          name='home-paladin'
          onFail={onFail}
          onReady={() => {}}
          animate={false}
        />
      </StrictMode>
    )

    expect(onFail).not.toHaveBeenCalled()
    expect(context.deleteProgram).toHaveBeenCalled()
    expect(context.deleteBuffer).toHaveBeenCalled()
    expect(context.deleteTexture).toHaveBeenCalled()
  })

  it('falls back when the context is lost', () => {
    stubContext(makeContext())
    const onFail = vi.fn()

    const { container } = render(
      <CrtWarpCanvas
        name='home-paladin'
        onFail={onFail}
        onReady={() => {}}
        animate={false}
      />
    )

    expect(onFail).not.toHaveBeenCalled()

    const canvas = container.querySelector('canvas')!
    const event = new Event('webglcontextlost', { cancelable: true })
    canvas.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
    expect(onFail).toHaveBeenCalledTimes(1)
  })
})
