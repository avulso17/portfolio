import { ComponentProps } from 'react'

import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    wrapper: 'fixed left-[50%] -z-10 h-[31.25rem] w-[90rem] -translate-x-[50%]',
    box1: 'absolute left-[13.75rem] z-0 flex h-[11.125rem] w-[35.625rem] shrink-0 rounded-[35.625rem] bg-blue blur-[7.375rem]',
    box2: 'absolute left-[50%] z-10 flex h-[16.5rem] w-[35.625rem] shrink-0 translate-x-[-50%] rounded-[35.625rem] bg-red blur-[7.375rem]',
    box3: 'absolute right-[16rem] z-20 flex h-[8.625rem] w-[35.625rem] shrink-0 rounded-[35.625rem] bg-yellow blur-[7.375rem]',
  },
  variants: {
    position: {
      top: {
        wrapper: 'top-0',
        box1: '-top-[3.875rem]',
        box2: '-top-[5.25rem]',
        box3: '-top-[3.875rem]',
      },
      bottom: {
        wrapper: 'bottom-0',
        box1: '-top-[5.375rem]',
        box2: '-top-[7rem]',
        box3: '-top-[5.375rem]',
      },
    },
  },
  defaultVariants: {
    position: 'top',
  },
})

type GradientProps = ComponentProps<'div'> & VariantProps<typeof styles>

const Gradient = ({ position }: GradientProps): React.ReactElement => {
  const { wrapper, box1, box2, box3 } = styles({ position })

  return (
    <div className={wrapper()}>
      <div className={box1()} />
      <div className={box2()} />
      <div className={box3()} />
    </div>
  )
}

export default Gradient
