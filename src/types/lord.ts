export type LordIconTrigger =
  | 'hover'
  | 'click'
  | 'loop'
  | 'loop-on-hover'
  | 'morph'
  | 'morph-two-way'

export interface ILordIconProps {
  class?: string
  colors?: string
  delay?: number
  src: string
  stroke?: string
  target?: string
  trigger?: LordIconTrigger
}

export type LordIconElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  ILordIconProps

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface IntrinsicElements {
      'lord-icon': LordIconElement
    }
  }
}
