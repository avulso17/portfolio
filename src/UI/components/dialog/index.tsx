'use client'

import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

interface IDialogProps {
  children: React.ReactNode
  close?: boolean
  content?: React.ReactNode | string
  description?: string
  title?: string
}

const Dialog = ({
  children,
  close,
  content,
  description,
  title,
}: IDialogProps): JSX.Element => {
  return (
    <Root>
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Overlay className='fixed inset-0 bg-black bg-opacity-50 data-[state=open]:animate-overlayShow' />

        <Content className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          {title !== undefined && <Title className=''>{title}</Title>}
          {description !== undefined && (
            <Description className=''>{description}</Description>
          )}

          {close !== undefined && (
            <Close asChild>
              <button
                className='absolute right-2 top-2 inline-flex h-fit w-fit appearance-none items-center justify-center rounded-xl p-1 text-black hover:bg-primary/10 focus:shadow-[0_0_0_2px] focus:shadow-primary/10 focus:outline-none'
                aria-label='Close'
              >
                <Cross2Icon height={16} width={16} />
              </button>
            </Close>
          )}

          {content}
        </Content>
      </Portal>
    </Root>
  )
}

export default Dialog
