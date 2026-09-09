import { ogCopy } from '@/configs/og'
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@/lib/og'

export const alt = ogCopy.bookshelf.alt
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOg(ogCopy.bookshelf)
}
