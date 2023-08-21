'use client'

import { tv, VariantProps } from 'tailwind-variants'

import {
  Root,
  Trigger,
  Portal,
  Content,
  Title,
  Description,
  Close,
  DialogProps,
} from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import Separator from '../separator'

const dialog = tv({
  slots: {
    contentStyles:
      'bg-gray text-white dialog focus:outline-none data-[state=open]:animate-contentShow',
    titleStyles: 'px-5 pt-5 text-2xl font-bold',
  },
})

const { contentStyles, titleStyles } = dialog()

type DialogVariants = VariantProps<typeof dialog>

type IDialogProps = DialogVariants &
  DialogProps & {
    close?: boolean
    content?: React.ReactNode | string
    description?: string
    footer?: React.ReactNode
    title?: string
  }

const Dialog = ({
  children,
  close,
  content,
  defaultOpen,
  description,
  footer,
  modal,
  onOpenChange,
  open,
  title,
}: IDialogProps): React.ReactElement => {
  return (
    <Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Content className={contentStyles()}>
          {title !== undefined && (
            <Title className={titleStyles()}>{title}</Title>
          )}

          {description !== undefined && (
            <>
              <Description className='px-5'>{description}</Description>
              <Separator alpha className='mt-3' />
            </>
          )}

          {close !== undefined && (
            <Close asChild>
              <button
                className='absolute right-2 top-2 inline-flex h-fit w-fit appearance-none items-center justify-center rounded-50 p-1 text-red hover:bg-white/10 focus:shadow-[0_0_0_2px] focus:shadow-red focus:outline-none'
                aria-label='Close'
              >
                <Cross2Icon height={16} width={16} />
              </button>
            </Close>
          )}

          <div className='p-5'>{content}</div>

          {footer !== undefined && (
            <>
              <Separator alpha className='mb-5' />

              <div className='w-full'>{footer}</div>
            </>
          )}
        </Content>
      </Portal>
    </Root>
  )
}

export default Dialog
