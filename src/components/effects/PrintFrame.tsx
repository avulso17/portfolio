'use client'

import { useEffect } from 'react'

const KEY = 'printed'

const firstPageOfSession = () => {
  try {
    if (window.sessionStorage.getItem(KEY)) return false
    window.sessionStorage.setItem(KEY, '1')
    return true
  } catch {
    return false
  }
}

export const PrintFrame: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement
    root.dataset.js = ''
    if (!firstPageOfSession()) return
    const rules = document.querySelectorAll<HTMLElement>('.rule-t, .rule-b')
    rules.forEach((rule, i) => rule.style.setProperty('--rule-i', String(i)))
    root.dataset.print = ''
    const timer = window.setTimeout(
      () => {
        delete root.dataset.print
      },
      Math.max(rules.length * 60 + 400, 1100)
    )
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
