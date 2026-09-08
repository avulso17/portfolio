import { ComponentProps } from 'react'

import { VariantProps, tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    wrapper:
      'pointer-events-none absolute left-[50%] -z-10 h-[31.25rem] w-[90rem] -translate-x-[50%] select-none overflow-hidden',
    box1: [
      'flex h-[11.125rem] w-[35.625rem] shrink-0 rounded-[35.625rem]',
      'absolute left-[13.75rem] z-0',
      'blur-[7.375rem] blur-performance',
    ],
    box2: [
      'bg-red flex h-[16.5rem] w-[35.625rem]  shrink-0 rounded-[35.625rem]',
      'absolute left-[50%] z-10 translate-x-[-50%]',
      'blur-[7.375rem] blur-performance',
    ],
    box3: [
      'flex h-[8.625rem] w-[35.625rem] shrink-0 rounded-[35.625rem]',
      'absolute right-[16rem] z-20',
      'blur-[7.375rem] blur-performance',
    ],
  },
  variants: {
    position: {
      top: {
        wrapper: 'top-0',
        box1: 'bg-blue -top-[3.875rem]',
        box2: '-top-[5.25rem]',
        box3: 'bg-yellow -top-[3.875rem]',
      },
      bottom: {
        wrapper: 'bottom-0',
        box1: 'bg-yellow -bottom-[5.375rem]',
        box2: '-bottom-[7rem]',
        box3: 'bg-blue -bottom-[5.375rem]',
      },
    },
  },
  defaultVariants: {
    position: 'top',
  },
})

type GradientProps = ComponentProps<'div'> & VariantProps<typeof styles>

const Gradient: React.FC<GradientProps> = ({ position }) => {
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
