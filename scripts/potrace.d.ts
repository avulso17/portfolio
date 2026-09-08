declare module 'potrace' {
  export interface PotraceOptions {
    threshold?: number
    blackOnWhite?: boolean
    turdSize?: number
    optTolerance?: number
    alphaMax?: number
    optCurve?: boolean
    turnPolicy?: string
    color?: string
    background?: string
  }

  export class Potrace {
    constructor(options?: PotraceOptions)
    setParameters(options: PotraceOptions): void
    loadImage(
      image: Buffer | string,
      callback: (this: Potrace, err: Error | null) => void
    ): void
    getPathTag(fillColor?: string): string
    getSVG(): string
  }
}
