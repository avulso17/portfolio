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

import Separator from '../separator'

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
        {/* <Overlay className='fixed inset-0 bg-black bg-opacity-50 data-[state=open]:animate-overlayShow' /> */}

        <Content className='text-white bg-material-100 dialog focus:outline-none data-[state=open]:animate-contentShow'>
          {title !== undefined && (
            <Title className='px-5 pt-5 title-lg'>{title}</Title>
          )}

          {description !== undefined && (
            <>
              <Description className='px-5 subhead'>{description}</Description>
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
        </Content>
      </Portal>
    </Root>
  )
}

export default Dialog
