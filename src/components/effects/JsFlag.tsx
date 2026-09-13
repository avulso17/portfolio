'use client'

import { useEffect } from 'react'

export const JsFlag: React.FC = () => {
  useEffect(() => {
    document.documentElement.dataset.js = ''
  }, [])

  return null
}
