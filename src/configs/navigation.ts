export type NavLink = { href: string; label: string }

export const NAV_PRIMARY: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
]

export const NAV_MORE: NavLink[] = [
  { href: '/bookshelf', label: 'Bookshelf' },
  { href: '/notebook', label: 'Notebook' },
  { href: '/tech-stack', label: 'Tech Stack' },
]

export const NAV_ALL: NavLink[] = [
  NAV_PRIMARY[0],
  NAV_PRIMARY[1],
  NAV_MORE[2],
  NAV_MORE[0],
  NAV_MORE[1],
  NAV_PRIMARY[2],
]

// Nickname from the technical course where the career started (spec §2.1).
export const AVULSO_SINCE = 2015

export const SIGN_OFF = 'Let’s build something that pays for itself.'
