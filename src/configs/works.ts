export type Project = {
  slug: string
  title: string
  role: string
  period: string
  summary: string
  call?: string
  result?: string
  stack: string[]
  url?: string
  icon: string
  image: string
  screenshotView?: 'mobile' | 'tablet'
}

// `call` / `result` are filled only from Felipe's metrics document. The Zeus
// figure is the one number already on the résumé (src/constants/resume.ts).
export const works: Project[] = [
  {
    slug: 'pigmo',
    title: 'Pigmo',
    role: 'Front-end foundation, from zero',
    period: '2023 — present',
    summary:
      'Web3 gaming product. I own the front-end: the app itself, the payment-gateway integration, the affiliate and rewards system, and the move from Chakra UI to Panda CSS + Park UI once the design system outgrew the first stack. Shipped in 16 languages.',
    stack: ['Next.js', 'TypeScript', 'Panda CSS', 'Park UI', 'next-intl'],
    url: 'https://app.pigmo.com',
    icon: '/logos/pigmo-logo.svg',
    image: '/assets/pigmo-screenshot.png',
  },
  {
    slug: 'zeus-agrotech',
    title: 'Zeus Agrotech portal',
    role: 'Architecture and rebuild of a legacy app',
    period: '2022 — 2023',
    summary:
      'Farm-microclimate analytics for the Brazilian agricultural sector. I led the front-end rebuild of the legacy portal: architecture, stack decisions, component refactoring and the split into microservices.',
    call: 'Cut the legacy component layer instead of patching it, and standardize on a shared component base before adding features.',
    result: 'New-feature development time down by up to 50%.',
    stack: ['React', 'Next.js', 'TypeScript', 'Microservices'],
    url: 'https://zeusagro.com',
    icon: '/logos/zeus-logo.svg',
    image: '/assets/zeus-screenshot.svg',
  },
  {
    slug: 'redux-store',
    title: 'Redux Store',
    role: 'Side project',
    period: '2022',
    summary:
      'A store built to pressure-test Flux architecture on a real flow: global state, cart, filters. Small on purpose — the point was the data layer, not the catalog.',
    stack: ['React', 'Redux', 'TypeScript'],
    url: 'https://redux-store-oficial.vercel.app',
    icon: '/assets/redux-store-icon.svg',
    image: '/assets/redux-store-screenshot.png',
    screenshotView: 'tablet',
  },
  {
    slug: 'pepy-the-platypus',
    title: 'Pepy The Platypus',
    role: 'Landing page',
    period: '2023',
    summary:
      'Custom landing page for a web3 project, built for load speed and first-visit clarity over decoration.',
    stack: ['Next.js', 'Tailwind CSS'],
    url: 'https://development-pepy.vercel.app',
    icon: '/logos/pepy-logo.svg',
    image: '/assets/pepy-screenshot.svg',
    screenshotView: 'tablet',
  },
  {
    slug: 'equals-venue',
    title: 'EqualsVenue',
    role: 'Front-end and product design',
    period: '2021 — 2022',
    summary:
      'Staking DApp for the EQ9 token. I prototyped the wireframes, designed the components and pages for the MVP, then reworked the design for the release.',
    stack: ['React', 'TypeScript', 'Web3'],
    icon: '/logos/EqualsVenue-logo.svg',
    image: '/assets/equalsVenue-screenshot.svg',
    screenshotView: 'tablet',
  },
  {
    slug: 'equals-sport',
    title: 'EqualsSport',
    role: 'Front-end and UI/UX',
    period: '2021 — 2022',
    summary:
      'Blockchain tournament platform that pays players in EQ9. I was on it from day one as developer and UI/UX designer, responsible for the screens and the responsive behaviour.',
    stack: ['React', 'TypeScript', 'Web3'],
    icon: '/logos/EqualsSport-logo.svg',
    image: '/assets/equalsSport-screenshot.svg',
  },
  {
    slug: 'equals9',
    title: 'Equals9',
    role: 'Institutional website — first job as a developer',
    period: '2021',
    summary:
      'Investment corporation bridging traditional businesses and blockchain. I built the institutional website; it was my first shipped work as a developer.',
    stack: ['React', 'JavaScript'],
    icon: '/logos/Equals9-logo.svg',
    image: '/assets/equals9-screenshot.svg',
    screenshotView: 'tablet',
  },
]

export type Projects = typeof works
