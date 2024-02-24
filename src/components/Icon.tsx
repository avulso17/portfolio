/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

/**
 * @module Icon
 */
import { tv, VariantProps } from 'tailwind-variants'

const iconStyles = tv({
  base: 'h-auto w-4',
  variants: {
    size: {
      base: 'h-auto w-4',
      lg: 'h-auto w-5',
      xl: 'h-auto w-6',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type IconVariants = VariantProps<typeof iconStyles>

type IconProps = IconVariants & {
  className?: string
  iconComponent?: any
  label?: string
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
  size,
  src,
}: IconProps): React.ReactElement => {
  return (
    <>
      {iconComponent !== undefined ? (
        <div className={iconStyles({ size, className })}>{iconComponent}</div>
      ) : (
        <img
          src={src}
          alt={label}
          className={iconStyles({ size, className })}
        />
      )}
    </>
  )
}

export default Icon
