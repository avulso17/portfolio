/**
 * @module Icon
 */
import { FC } from 'react'

/**
 * Helpers
 */
import { twMerge } from 'tailwind-merge'

import { IColors } from '@/types/colors'

import { createBodyMarkup, getAria, IAriaProps } from './helper'

type ColorsOptions = Omit<
  IColors,
  'transparent' | 'grey' | 'background' | 'label' | 'separator' | 'fill'
>

interface IIconProps {
  className?: string
  label?: string
  options?: {
    default?: {
      fill?: keyof ColorsOptions
      stroke?: keyof ColorsOptions
    }
    hover?: {
      fill?: keyof ColorsOptions
      stroke?: keyof ColorsOptions
    }
    inlineSvg?: boolean
  }
  src: string
}

/**
 * Renders the svg icon as an image.
 *
 * This component is taking care of minimal styling related to sizing.
 * Please extend this component with your own styles when used.
 *
 * SVG file format - files should be exported in correct format:
 * - they should contain only paths (no figures)
 * - for coloring only fill (no stroke or others)
 *
 * @alias module:Icon
 *
 * @param {string} className - Optional class name.
 * @param {string} src - Source path. Used with external files.
 * @param {string} label - Optional aria-label for the icon.
 * Only use if text (visually hidden or visible) can't be added outside the icon component.
 * @param {object} options
 */
const Icon: FC<IIconProps> = ({ className, src, label, options = {} }) => {
  const ariaProps: IAriaProps = getAria({ label })
  const { default: defaultOptions, hover, inlineSvg } = options

  return (
    <span className={twMerge('icon-wrapper ', className)} {...ariaProps}>
      {inlineSvg !== undefined ? (
        <div
          className={`inlineSvg svg-wrapper-${
            defaultOptions?.fill ?? '[none]'
          } svg-wrapper-use-${defaultOptions?.fill ?? '[none]'} svg-wrapper-g-${
            defaultOptions?.stroke ?? '[none]'
          }`}
          aria-hidden='true'
          dangerouslySetInnerHTML={createBodyMarkup(src)}
        />
      ) : (
        <img src={src} alt={label} />
      )}
    </span>
  )
}

export default Icon
