export interface IAriaProps {
  'aria-hidden'?: boolean
  'aria-label'?: string
  role?: string
}

export const createBodyMarkup = (body: string): { __html: string } => ({
  __html: body,
})

export const getAria = ({ label }: { label?: string }): IAriaProps => {
  let aria: IAriaProps

  if (label !== undefined) {
    aria = {
      'aria-label': label,
    }
  } else {
    aria = {
      'aria-hidden': true,
      role: 'presentation',
    }
  }

  return aria
}
