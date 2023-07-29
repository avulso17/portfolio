/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/**
 * @module Icon
 */

/**
 * Helpers
 */
import { twMerge } from 'tailwind-merge'

import { IColors } from '@/types/colors'

type ColorsOptions = Omit<
  IColors,
  'transparent' | 'grey' | 'background' | 'label' | 'separator' | 'fill'
>

interface IIconProps {
  className?: string
  iconComponent?: any
  label?: string
  options?: {
    colors?: keyof ColorsOptions
    size?: 'sm' | 'DEFAULT' | 'lg'
  }
  src?: string
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
 * @param {string} label - Optional aria-label for the icon. (src only)
 * Only use if text (visually hidden or visible) can't be added outside the icon component.
 * @param {object} options - Optional options object.
 */
const Icon = ({
  className,
  iconComponent,
  label,
  options = {},
  src,
}: IIconProps): JSX.Element => {
  const { colors, size } = options

  return (
    <>
      {iconComponent !== undefined ? (
        <div className={twMerge('h-auto w-4', className)}>{iconComponent}</div>
      ) : (
        <img
          src={src}
          alt={label}
          className={twMerge('h-auto w-4', className)}
        />
      )}
    </>
  )
}

export default Icon
