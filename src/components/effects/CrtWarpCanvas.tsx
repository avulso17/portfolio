'use client'

import { scenes, SceneName } from '@/configs/scenes.generated'
import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 aPos; out vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`

// Low-intensity barrel warp + vignette + faint flicker. No scanlines (spec §5.2).
const FRAG = `#version 300 es
precision mediump float;
in vec2 vUv; out vec4 outColor;
uniform sampler2D uTex; uniform float uTime; uniform vec2 uTexAspect;
const float WARP = 0.045; const vec3 INK = vec3(10.0, 10.0, 10.0) / 255.0;
vec2 warp(vec2 uv){ vec2 c = uv * 2.0 - 1.0; c *= 1.0 + WARP * dot(c, c); return c * 0.5 + 0.5; }
void main(){
  vec2 uv = warp(vUv);
  vec2 cover = (uv - 0.5) * uTexAspect + 0.5;
  bool inside = all(greaterThanEqual(cover, vec2(0.0))) && all(lessThanEqual(cover, vec2(1.0)));
  vec3 color = inside ? texture(uTex, vec2(cover.x, 1.0 - cover.y)).rgb : INK;
  float vignette = smoothstep(1.35, 0.55, length(vUv * 2.0 - 1.0));
  float flicker = 1.0 - 0.015 * sin(uTime * 9.0);
  outColor = vec4(mix(INK, color, 0.92 + 0.08 * vignette) * flicker, 1.0);
}`

type Props = {
  name: SceneName
  onFail: () => void
  onReady: () => void
  animate: boolean
}

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader')
  return shader
}

export const CrtWarpCanvas: React.FC<Props> = ({
  name,
  onFail,
  onReady,
  animate,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl2', { antialias: false, alpha: false })
    if (!canvas || !gl) return onFail()

    let raf = 0
    let disposed = false
    let ready = false
    let textureLoaded = false
    const asset = scenes[name]

    try {
      const program = gl.createProgram()!
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(program)
      gl.useProgram(program)

      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      )
      const aPos = gl.getAttribLocation(program, 'aPos')
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      const uTime = gl.getUniformLocation(program, 'uTime')
      const uAspect = gl.getUniformLocation(program, 'uTexAspect')
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.round(canvas.clientWidth * dpr)
        const h = Math.round(canvas.clientHeight * dpr)
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
        }
        const canvasAspect = w / h
        const texAspect = asset.width / asset.height
        // object-fit: cover
        gl.uniform2f(
          uAspect,
          canvasAspect > texAspect ? 1 : canvasAspect / texAspect,
          canvasAspect > texAspect ? texAspect / canvasAspect : 1
        )
      }

      const draw = (t: number) => {
        if (disposed || !textureLoaded) return
        resize()
        gl.uniform1f(uTime, t / 1000)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        if (!ready) {
          ready = true
          onReady()
        }
        if (animate) raf = requestAnimationFrame(draw)
      }

      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (disposed) return
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
        textureLoaded = true
        raf = requestAnimationFrame(draw)
      }
      img.onerror = () => {
        if (disposed) return
        onFail()
      }
      img.src = asset.png

      const ro = new ResizeObserver(() => !animate && draw(0))
      ro.observe(canvas)

      return () => {
        disposed = true
        cancelAnimationFrame(raf)
        ro.disconnect()
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
    } catch {
      onFail()
    }
  }, [name, onFail, onReady, animate])

  return <canvas ref={ref} aria-hidden='true' className='h-full w-full' />
}
