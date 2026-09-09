# Rebrand Plan 3/3 — Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the identity on every page — hero with the Paladin and the CRT effect, one dithered scene per page, the new voice in every headline and body, project cards that lead with the decision and the result — and finish with the removal pass so nothing of the old "Vercel dark" site survives.

**Architecture:** Two new shared components carry the visual system into pages: `Scene` (a dithered PNG rendered with `<img>` + `image-rendering: pixelated`, `aria-hidden`, ink→transparent scrim, CSS-only drift honoring `prefers-reduced-motion`) and `PageHero` (eyebrow + display title + serif sub + a `Scene` behind, bottom line). The home hero adds a lazily-loaded WebGL `CrtWarp` over the hero scene with the static `Scene` as fallback. Navigation becomes one config (`src/configs/navigation.ts`) consumed by desktop navbar, mobile navbar and footer. Page components are rewritten in place (same routes, same data files) and every legacy component (3DCard, BentoGrid, TextGeneratorEffect, Sun/Moon, framer-motion usages) is deleted in a final removal task. Copy lives in the components and in `src/configs/works.ts` (`call`/`result`/`stack` per project); real numbers are added only where they already exist in the repo (Zeus: "up to 50%").

**Tech Stack:** Next.js 16.1 App Router, React 19.2, Tailwind 3.3 + tailwind-variants, Vitest 3 + Testing Library, raw WebGL (no new deps), `next/dynamic` for the CRT effect, headless Chrome for visual checks.

**Spec:** `docs/superpowers/specs/2026-09-07-brand-identity-design.md` (§2 voice/copy, §3.3 scenes, §4.4 layout, §5 effects/motion, §7 Phase B steps 4–7). Product truth: `PRODUCT.md`. Handoffs: Plan 1 (`docs/superpowers/plans/2026-09-07-rebrand-1-foundation.md` § Execution status) and Plan 2 (`docs/superpowers/plans/2026-09-08-rebrand-2-assets.md` § Execution status).

## Global Constraints

- Dark-only; tokens only: `ink`, `ink-2`, `line`, `parchment`, `parchment-dim`, `parchment-mute`, `amber`, `amber-dim`, `ok`, `err`. **Amber at most once per viewport** — on each page exactly one element may be amber: Home = hero CTA button (`variant='accent'`); Contact = the wax-seal ex-libris overlay (spec §4.3); every other page = none (focus rings excepted).
- Typography roles: `display-1`/`display-2` (Anton, uppercase, H1/H2 only), body Inter, `eyebrow-text` (Departure Mono, uppercase, 0.08em), `font-serif italic` for the human-voice asides only.
- Scenes: render with `<img>` — **never `next/image`** — `width={cssWidth}` `height={cssHeight}`, `style={{ imageRendering: 'pixelated' }}`, `aria-hidden='true'`, `decoding='async'`, only behind headlines/hero, always under an `ink → transparent` scrim so text keeps WCAG AA. Motion ≤ 4px drift, disabled under `prefers-reduced-motion`. CRT only on the home hero, low intensity, lazy, static fallback. No scanlines. Scene data comes from `src/configs/scenes.generated.ts` (`scenes[name].{png,webp,width,height,cssWidth,cssHeight}`).
- Layout: line grid (`Container` already draws it); sections separated by `border-t border-line`, not whitespace; every block opens with an `Eyebrow`; cards `rounded-sm` (2px) `bg-ink-2 border-line`, no shadow; buttons `primary|accent|secondary|text`; forms bottom-border + mono label + amber focus. Banned: `backdrop-blur`, gradients (except the ink→transparent scrim), shadows, radius > 2px (full-pill mono badge excepted), framer-motion.
- Voice (spec §2.4): outcomes and decisions over stack; judgment verbs (decide, cut, prioritize, measure, unblock); no clichés ("turn visions into reality", "passionate about", "helping startups"); first person, opinionated; navigation labels literal (About, Projects, Bookshelf, Notebook, Tech Stack, Contact); English only. **Never invent a number** — the only real figure in the repo is Zeus Agrotech's "reduced new-feature development time by up to 50%" (`src/constants/resume.ts`). `call`/`result` for the other projects stay `undefined` until Felipe supplies his metrics document; the card renders those rows only when present.
- Facts are fixed: résumé content, About facts (Uberlândia; ~5 years front-end since 2021; ~5 years IT before; career started at a technical high-school course, 2015–2017), project list, contact form fields/limits (name, email, subject, message ≤ 1500 chars via Resend), Bookshelf from Supabase.
- Easter eggs: footer line `// avulso, since 2015` in mono `parchment-mute`. The `[f]` logo is gone for good (`src/assets/Logo.tsx` deleted).
- Notebook has no real notes: present it honestly as "in progress" — never render the placeholder notes as content.
- The three Equals projects have no known live URL: their `url` is removed (card shows no "Visit site"); Felipe adds real URLs later.
- Gates before every commit: `pnpm test`, `pnpm lint` (0 errors), `pnpm exec tsc --noEmit`; `pnpm build` at Tasks 3, 10, 12, 14. Conventional Commits, one commit per task, never `--no-verify`. pnpm 10 only. No comments narrating what code does. Never leave temp `.ts/.tsx` files anywhere in the tree (eslint scans git-ignored dirs). Kill dev/prod servers with `pkill -f next-server` (not `next start`). `art/**` is Git LFS — do not touch it.

## Preconditions

1. Plan 2 complete on `feature/rebrand` (HEAD `4363018` or later): `public/scenes/*`, `scenes.generated.ts`, `ExLibris` (`mark='halo' | 'monogram'`), icons and OG in place; 68 tests green.
2. Task 14 (Impeccable passes + visual pass) runs in the **main session** — it needs the `impeccable` skill and headless Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new --screenshot=…`). Every other task is subagent-safe.
3. Inputs still owed by Felipe (do not block): project metrics (fills `call`/`result`), real Equals URLs, social handle. The plan ships without them.

---

## File map

| Path                                                                                                                                                                                   | Action  | Responsibility                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------- |
| `src/configs/navigation.ts` (+ test)                                                                                                                                                   | create  | Single source of nav links (primary + more)             |
| `src/components/layout/navbar/desktop/index.tsx`, `NavbarDesktopDropdownMenu.tsx`                                                                                                      | rewrite | Config-driven, no framer-motion                         |
| `src/components/layout/navbar/mobile/index.tsx`, `NavbarMobileMoreMenu.tsx`                                                                                                            | rewrite | Config-driven, no framer-motion                         |
| `src/components/layout/footer/index.tsx` (+ test)                                                                                                                                      | rewrite | Config-driven links, sign-off, easter egg               |
| `src/assets/Logo.tsx`                                                                                                                                                                  | delete  | `[f]` is gone                                           |
| `src/components/ui/Scene.tsx` (+ test)                                                                                                                                                 | create  | Dithered scene `<img>` + scrim + drift                  |
| `src/components/ui/PageHero.tsx` (+ test)                                                                                                                                              | create  | Eyebrow + display title + sub + scene                   |
| `src/styles/global.css`                                                                                                                                                                | modify  | `scene-drift` keyframes + reduced-motion rule           |
| `src/components/effects/CrtWarp.tsx` (+ `CrtWarpCanvas.tsx`)                                                                                                                           | create  | Lazy WebGL CRT over the hero scene                      |
| `src/app/(home)/_components/HomeHero.tsx` (+ test)                                                                                                                                     | rewrite | Alethe-style hero, Paladin, CRT, single amber CTA       |
| `src/configs/works.ts` (+ test)                                                                                                                                                        | rewrite | `Project` type with `call?`, `result?`, `stack`, `url?` |
| `src/app/projects/_components/ProjectsCard.tsx` (+ test)                                                                                                                               | rewrite | Decision-led card, no motion                            |
| `src/app/projects/_components/{ProjectsContent,ProjectsCardStack,ProjectsPlaceholderCard}.tsx`                                                                                         | modify  | New copy/tokens                                         |
| `src/app/(home)/_components/{HomeSelectedWorkSection,HomeGetToKnowSection,HomeGetInTouchSection}.tsx`                                                                                  | rewrite | Eyebrow sections, scene cards, sign-off                 |
| `src/app/(home)/_components/{HomeWidget,HomePortrait}.tsx`                                                                                                                             | delete  | Legacy                                                  |
| `src/app/about/_components/{AboutContent,AboutPortrait}.tsx`, `src/app/about/page.tsx`                                                                                                 | rewrite | New eyebrows/voice, PageHero                            |
| `src/app/notebook/**`                                                                                                                                                                  | rewrite | Honest in-progress state; placeholder notes deleted     |
| `src/app/tech-stack/_components/{TechStackCard,TechStackGroupTitle,TechStackGroup}.tsx`, `page.tsx`                                                                                    | modify  | Tokens, eyebrows, PageHero                              |
| `src/app/bookshelf/{template,error}.tsx`, `_components/{BookshelfBook,BookshelfLoading,BookshelfItems}.tsx`                                                                            | modify  | PageHero, radius, English error                         |
| `src/app/contact/**`                                                                                                                                                                   | rewrite | PageHero + amber seal, Terminal form, no bounce         |
| `src/app/layout.tsx`, six `page.tsx` metadata                                                                                                                                          | modify  | New titles/descriptions, placeholders removed           |
| `src/components/ui/{3DCard,BentoGrid,TextGeneratorEffect,UnderConstruction,Header}.tsx`, `src/components/icons/{Sun,Moon}.tsx`, `src/components/resume/index.tsx`, `src/types/note.ts` | delete  | Removal pass                                            |
| `src/styles/keyframes.ts`, `tailwind.config.js`, `src/styles/tailwind.test.ts`, `package.json`                                                                                         | modify  | Prune keyframes/utilities/deps                          |
| `public/icons/**`, unused `public/assets/*`, `public/logos/*`                                                                                                                          | delete  | Dead assets                                             |
| `docs/superpowers/specs/2026-09-07-brand-identity-design.md`, `PRODUCT.md`                                                                                                             | modify  | Record Paladin + AI-generated mark                      |

---

### Task 1: Navigation config, navbars and footer (no framer-motion, easter egg)

**Files:**

- Create: `src/configs/navigation.ts`, `src/configs/navigation.test.ts`
- Rewrite: `src/components/layout/navbar/desktop/index.tsx`, `src/components/layout/navbar/desktop/NavbarDesktopDropdownMenu.tsx`, `src/components/layout/navbar/mobile/index.tsx`, `src/components/layout/navbar/mobile/NavbarMobileMoreMenu.tsx`, `src/components/layout/footer/index.tsx`
- Create: `src/components/layout/footer/footer.test.tsx`
- Delete: `src/assets/Logo.tsx`

**Interfaces:**

- Produces: `NAV_PRIMARY: NavLink[]` (About, Projects, Contact), `NAV_MORE: NavLink[]` (Bookshelf, Notebook, Tech Stack), `NAV_ALL` (six, in footer order: About, Projects, Tech Stack, Bookshelf, Notebook, Contact), `type NavLink = { href: string; label: string }`, `AVULSO_SINCE = 2015`, `SIGN_OFF = "Let's build something that pays for itself."`. Consumers: navbars, footer, Task 5 (sign-off), Task 10.

- [ ] **Step 1: Failing tests**

`src/configs/navigation.test.ts`:

```ts
import {
  AVULSO_SINCE,
  NAV_ALL,
  NAV_MORE,
  NAV_PRIMARY,
  SIGN_OFF,
} from './navigation'

describe('navigation config', () => {
  it('keeps the literal labels in the spec order', () => {
    expect(NAV_PRIMARY.map((l) => l.label)).toEqual([
      'About',
      'Projects',
      'Contact',
    ])
    expect(NAV_MORE.map((l) => l.label)).toEqual([
      'Bookshelf',
      'Notebook',
      'Tech Stack',
    ])
    expect(NAV_ALL.map((l) => l.href)).toEqual([
      '/about',
      '/projects',
      '/tech-stack',
      '/bookshelf',
      '/notebook',
      '/contact',
    ])
  })

  it('carries the easter-egg year and the sign-off', () => {
    expect(AVULSO_SINCE).toBe(2015)
    expect(SIGN_OFF).toBe("Let's build something that pays for itself.")
  })
})
```

`src/components/layout/footer/footer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Footer from './index'

describe('Footer', () => {
  it('renders every nav link, the sign-off, the easter egg and the halo mark', () => {
    render(<Footer />)
    for (const label of [
      'About',
      'Projects',
      'Tech Stack',
      'Bookshelf',
      'Notebook',
      'Contact',
    ]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(
      screen.getByText("Let's build something that pays for itself.")
    ).toBeInTheDocument()
    expect(screen.getByText('// avulso, since 2015')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Felipe Mateus ex-libris' })
    ).toBeInTheDocument()
    expect(
      screen.getByText(`© ${new Date().getFullYear()} Felipe Mateus`)
    ).toBeInTheDocument()
  })
})
```

Run: `pnpm test src/configs/navigation.test.ts src/components/layout/footer` → FAIL (module missing / text missing).

- [ ] **Step 2: `src/configs/navigation.ts`**

```ts
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

export const SIGN_OFF = "Let's build something that pays for itself."
```

- [ ] **Step 3: Desktop navbar**

`src/components/layout/navbar/desktop/index.tsx`:

```tsx
import ExLibris from '@/assets/ExLibris'
import GitHubIcon from '@/components/icons/GitHub'
import LinkedInIcon from '@/components/icons/LinkedIn'
import YouTubeIcon from '@/components/icons/YouTube'
import { Button } from '@/components/ui/Button'
import { NAV_PRIMARY } from '@/configs/navigation'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import NavbarDesktopDropdownMenu from './NavbarDesktopDropdownMenu'

const iconButtonStyles = tv({
  base: [
    'flex h-10 w-10 items-center justify-center',
    'cursor-pointer rounded-sm text-xl text-parchment-dim',
    'transition-colors hover:bg-ink-2 hover:text-parchment',
  ],
})

export type NavbarProps = React.ComponentProps<'nav'>

const NavbarDesktop: React.FC<NavbarProps> = ({ className }) => {
  return (
    <nav
      aria-label='Primary'
      className={twMerge(
        'hidden h-fit w-full items-center justify-between border-b border-line py-4 mobile:flex',
        className
      )}
    >
      <div className='relative flex items-center gap-10'>
        <Link href='/' className='shrink-0' aria-label='Home'>
          <ExLibris
            mark='monogram'
            className='h-8 w-auto text-parchment transition-colors hover:text-parchment-dim'
          />
        </Link>

        {NAV_PRIMARY.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={label === 'Contact' ? 'hidden tablet:block' : undefined}
          >
            <Button variant='text'>{label}</Button>
          </Link>
        ))}

        <NavbarDesktopDropdownMenu />
      </div>

      <div className='flex items-center gap-2'>
        <Link
          href={SOCIAL_LINKS.linkedIn}
          className={iconButtonStyles()}
          target='_blank'
          aria-label='LinkedIn'
        >
          <LinkedInIcon />
        </Link>
        <Link
          href={SOCIAL_LINKS.youTube}
          className={iconButtonStyles()}
          target='_blank'
          aria-label='YouTube'
        >
          <YouTubeIcon />
        </Link>
        <Link
          href={SOCIAL_LINKS.github}
          className={iconButtonStyles()}
          target='_blank'
          aria-label='GitHub'
        >
          <GitHubIcon />
        </Link>
      </div>
    </nav>
  )
}

export default NavbarDesktop
```

(The `mb-44` bottom margin moves to the pages: `PageHero`/`HomeHero` own their top spacing from Task 2 on. Until then pages will sit closer to the navbar — acceptable within this plan.)

`NavbarDesktopDropdownMenu.tsx` — same behaviour, CSS instead of framer-motion:

```tsx
'use client'

import ChevronBottomIcon from '@/components/icons/ChevronBottom'
import { Button } from '@/components/ui/Button'
import { NAV_MORE, NAV_PRIMARY } from '@/configs/navigation'
import { useOnClickOutside } from '@/hooks/useOnClickOutsite'
import Link from 'next/link'
import { useRef, useState } from 'react'

const contact = NAV_PRIMARY.find((l) => l.href === '/contact')

const NavbarDesktopDropdownMenu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const onCloseMenu = () => setIsMenuOpen(false)

  useOnClickOutside(ref, () => {
    if (isMenuOpen) onCloseMenu()
  })

  return (
    <div ref={ref} className='relative'>
      <Button
        variant='text'
        rightIcon={<ChevronBottomIcon className='text-xl' />}
        aria-expanded={isMenuOpen}
        aria-controls='navbar-more'
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        More
      </Button>

      <div
        id='navbar-more'
        hidden={!isMenuOpen}
        className='absolute left-0 top-[calc(100%+0.5rem)] z-20 flex min-w-40 flex-col gap-3 rounded-sm border border-line bg-ink-2 p-4'
      >
        {contact ? (
          <Link href={contact.href} className='flex tablet:hidden'>
            <Button variant='text' onClick={onCloseMenu}>
              {contact.label}
            </Button>
          </Link>
        ) : null}
        {NAV_MORE.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Button variant='text' onClick={onCloseMenu}>
              {label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavbarDesktopDropdownMenu
```

- [ ] **Step 4: Mobile navbar**

`src/components/layout/navbar/mobile/index.tsx`: keep the file as is except the `routes` array — replace with:

```tsx
const routes = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: NAV_PRIMARY[0].label, path: NAV_PRIMARY[0].href, icon: UserFillIcon },
  { name: NAV_PRIMARY[1].label, path: NAV_PRIMARY[1].href, icon: BagFillIcon },
  {
    name: NAV_PRIMARY[2].label,
    path: NAV_PRIMARY[2].href,
    icon: MessageFillIcon,
  },
  { name: 'More', icon: MoreOutlineIcon },
]
```

with `import { NAV_PRIMARY } from '@/configs/navigation'`. Labels are used as `aria-label` — they become literal.

`NavbarMobileMoreMenu.tsx` — rewrite without framer-motion, listing `NAV_MORE` (all three; the old file only had two):

```tsx
'use client'

import { NAV_MORE } from '@/configs/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    list: [
      'flex w-full flex-col gap-2 px-4 py-4',
      'rounded-t-sm border border-line bg-ink-2',
      'absolute bottom-full left-0 z-10',
    ],
    listItem: [
      'flex h-12 w-full shrink-0 items-center px-4',
      'rounded-sm text-parchment-dim eyebrow-text',
      'transition-colors ease-in-out hover:text-parchment',
      'data-[active=true]:bg-ink data-[active=true]:text-parchment',
    ],
  },
})

export type NavbarMobileMoreMenuProps = { isOpen: boolean; onClose: () => void }

const NavbarMobileMoreMenu: React.FC<NavbarMobileMoreMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname()
  const { list, listItem } = styles()

  return (
    <div id='navbar-mobile-more' hidden={!isOpen} className={list()}>
      {NAV_MORE.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          data-active={pathname === href}
          className={listItem()}
          onClick={onClose}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export default NavbarMobileMoreMenu
```

- [ ] **Step 5: Footer**

```tsx
import ExLibris from '@/assets/ExLibris'
import Separator from '@/components/ui/Separator'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { AVULSO_SINCE, NAV_ALL, SIGN_OFF } from '@/configs/navigation'
import { SOCIAL_LINKS } from '@/constants/social'
import FooterLinkButton from './FooterLinkButton'

const elsewhere = [
  { href: SOCIAL_LINKS.email, label: 'Email' },
  { href: SOCIAL_LINKS.linkedIn, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.x, label: 'X' },
  { href: SOCIAL_LINKS.discord, label: 'Discord' },
  { href: SOCIAL_LINKS.youTube, label: 'YouTube' },
]

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer
      id='footer'
      className='relative flex w-full flex-col-reverse justify-between gap-12 py-8 tablet:flex-row tablet:gap-0 tablet:pb-10 tablet:pt-[4.625rem]'
    >
      <Separator screen />

      <div className='flex flex-col gap-4'>
        <ExLibris
          mark='halo'
          aria-label='Felipe Mateus ex-libris'
          className='h-16 w-16 text-parchment'
        />
        <p className='font-serif text-xl italic text-parchment-dim'>
          {SIGN_OFF}
        </p>

        <div className='mt-auto flex select-none flex-col gap-1 text-parchment-mute eyebrow-text'>
          <small className='font-inherit'>{`© ${year} Felipe Mateus`}</small>
          <small className='normal-case font-inherit'>{`// avulso, since ${AVULSO_SINCE}`}</small>
        </div>
      </div>

      <div className='flex flex-col gap-10 tablet:flex-row tablet:gap-28'>
        <nav aria-label='Footer' className='flex w-fit flex-col gap-1'>
          <Eyebrow className='mb-4'>Links</Eyebrow>
          {NAV_ALL.map(({ href, label }) => (
            <FooterLinkButton key={href} href={href} label={label}>
              {label}
            </FooterLinkButton>
          ))}
        </nav>

        <div className='flex flex-col gap-1'>
          <Eyebrow className='mb-4'>Elsewhere</Eyebrow>
          {elsewhere.map(({ href, label }) => (
            <FooterLinkButton
              key={label}
              href={href}
              label={label}
              target='_blank'
            >
              {label}
            </FooterLinkButton>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

(`eyebrow-text` sets uppercase; the easter-egg line adds `normal-case` so it reads `// avulso, since 2015` exactly — the test asserts that string.)

- [ ] **Step 6: Delete `src/assets/Logo.tsx`**, run `grep -rn "assets/Logo" src` → nothing.

- [ ] **Step 7: Tests pass, gates, commit**

Run: `pnpm test` (the two new files pass; existing Container/Button tests unaffected), `pnpm lint`, `pnpm exec tsc --noEmit`.

```bash
git add src/configs/navigation.ts src/configs/navigation.test.ts src/components/layout src/assets
git rm -q src/assets/Logo.tsx
git commit -m "feat(nav): single navigation config, CSS menus, footer sign-off and avulso easter egg"
```

---

### Task 2: `Scene` and `PageHero` components

**Files:**

- Create: `src/components/ui/Scene.tsx`, `src/components/ui/Scene.test.tsx`, `src/components/ui/PageHero.tsx`, `src/components/ui/PageHero.test.tsx`
- Modify: `src/styles/global.css` (drift keyframes)

**Interfaces:**

- Produces:
  - `Scene: React.FC<{ name: SceneName; className?: string; position?: 'center' | 'top' | 'bottom'; scrim?: 'bottom' | 'both' | 'none'; drift?: boolean }>` — absolutely positioned fill (`absolute inset-0 -z-10 overflow-hidden`), `<img>` with the constraints, scrim div(s), drift class.
  - `PageHero: React.FC<{ index: string; label: string; title: React.ReactNode; subtitle?: React.ReactNode; scene?: SceneName; sceneClassName?: string; children?: React.ReactNode }>` — `<section>` with eyebrow, `<h1>`, serif sub, optional children (CTAs), `border-b border-line`, `pt-24 pb-16 mobile:pt-32`.
  - CSS: `.scene-drift` animation (`scene-drift 14s ease-in-out infinite alternate`, 0 → -4px) inside `@media (prefers-reduced-motion: no-preference)`.

- [ ] **Step 1: Failing tests**

`src/components/ui/Scene.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { scenes } from '@/configs/scenes.generated'
import { Scene } from './Scene'

describe('Scene', () => {
  it('renders the dithered png with pixelated rendering and css dimensions, hidden from AT', () => {
    const { container } = render(<Scene name='contact-letter' />)
    const img = container.querySelector('img')!
    const asset = scenes['contact-letter']
    expect(img).toHaveAttribute('src', asset.png)
    expect(img).toHaveAttribute('width', String(asset.cssWidth))
    expect(img).toHaveAttribute('height', String(asset.cssHeight))
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(img).toHaveAttribute('alt', '')
    expect(img.style.imageRendering).toBe('pixelated')
    expect(container.querySelector('picture source')).toHaveAttribute(
      'srcset',
      asset.webp
    )
  })

  it('adds the scrim and the drift class by default and drops them on demand', () => {
    const { container, rerender } = render(<Scene name='contact-letter' />)
    expect(container.querySelector('[data-scrim]')).toBeInTheDocument()
    expect(container.querySelector('.scene-drift')).toBeInTheDocument()
    rerender(<Scene name='contact-letter' scrim='none' drift={false} />)
    expect(container.querySelector('[data-scrim]')).toBeNull()
    expect(container.querySelector('.scene-drift')).toBeNull()
  })
})
```

`src/components/ui/PageHero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { PageHero } from './PageHero'

describe('PageHero', () => {
  it('renders eyebrow with index, the h1, the serif subtitle and the scene', () => {
    const { container } = render(
      <PageHero
        index='06'
        label='Contact'
        title="Tell me what's stuck."
        subtitle='Write it down.'
        scene='contact-letter'
      >
        <button>cta</button>
      </PageHero>
    )
    expect(screen.getByText(/06 —/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "Tell me what's stuck."
    )
    expect(screen.getByText('Write it down.')).toHaveClass(
      'font-serif',
      'italic'
    )
    expect(
      container.querySelector('img[aria-hidden="true"]')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'cta' })).toBeInTheDocument()
  })

  it('works without a scene', () => {
    const { container } = render(
      <PageHero index='01' label='About' title='X' />
    )
    expect(container.querySelector('img')).toBeNull()
  })
})
```

Run → FAIL.

- [ ] **Step 2: `src/components/ui/Scene.tsx`**

```tsx
import { SceneName, scenes } from '@/configs/scenes.generated'
import { cn } from '@/lib/utils/cn'

export type SceneProps = {
  name: SceneName
  className?: string
  position?: 'center' | 'top' | 'bottom'
  scrim?: 'bottom' | 'both' | 'none'
  drift?: boolean
}

const positions = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
} as const

/**
 * Dithered scene behind a headline. `<img>` on purpose: next/image would
 * re-encode the 1-bit mesh and blur it (Plan 2 handoff).
 */
export const Scene: React.FC<SceneProps> = ({
  name,
  className,
  position = 'center',
  scrim = 'bottom',
  drift = true,
}) => {
  const asset = scenes[name]

  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      <picture className={cn('block h-full w-full', drift && 'scene-drift')}>
        <source srcSet={asset.webp} type='image/webp' />
        <img
          src={asset.png}
          width={asset.cssWidth}
          height={asset.cssHeight}
          alt=''
          aria-hidden='true'
          decoding='async'
          loading='lazy'
          className={cn('h-full w-full object-cover', positions[position])}
          style={{ imageRendering: 'pixelated' }}
        />
      </picture>
      {scrim !== 'none' ? (
        <div
          data-scrim
          className='absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink via-ink/70 to-transparent'
        />
      ) : null}
      {scrim === 'both' ? (
        <div
          data-scrim
          className='absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink to-transparent'
        />
      ) : null}
    </div>
  )
}
```

(`bg-gradient-to-*` with `from-ink` is the spec §5.3 scrim — monochrome, permitted. The `-z-10` requires the parent to be `relative z-0`; `PageHero` and the hero provide it.)

- [ ] **Step 3: `src/components/ui/PageHero.tsx`**

```tsx
import { SceneName } from '@/configs/scenes.generated'
import { cn } from '@/lib/utils/cn'
import { Eyebrow } from './Eyebrow'
import { Scene } from './Scene'

export type PageHeroProps = {
  index: string
  label: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  scene?: SceneName
  sceneClassName?: string
  className?: string
  children?: React.ReactNode
}

export const PageHero: React.FC<PageHeroProps> = ({
  index,
  label,
  title,
  subtitle,
  scene,
  sceneClassName,
  className,
  children,
}) => {
  return (
    <section
      className={cn(
        'relative z-0 flex min-h-[24rem] flex-col justify-end gap-6 border-b border-line pb-12 pt-32 mobile:min-h-[32rem] mobile:pt-40',
        className
      )}
    >
      {scene ? (
        <Scene name={scene} className={sceneClassName} scrim='both' />
      ) : null}
      <Eyebrow index={index} active={false}>
        {label}
      </Eyebrow>
      <h1 className='max-w-[14ch]'>{title}</h1>
      {subtitle ? (
        <p className='max-w-[48ch] font-serif text-2xl italic text-parchment-dim'>
          {subtitle}
        </p>
      ) : null}
      {children ? (
        <div className='flex flex-col gap-4 pt-4 mobile:flex-row'>
          {children}
        </div>
      ) : null}
    </section>
  )
}
```

(Check `Eyebrow`'s props with `find_symbol Eyebrow`: it takes `index`, `active`, `children`, `className` and renders `{index} — ` before the children — that is what the test's `/06 —/` matches.)

- [ ] **Step 4: Drift keyframes in `src/styles/global.css`** — append after the `@layer base` block:

```css
@layer utilities {
  @media (prefers-reduced-motion: no-preference) {
    .scene-drift {
      animation: scene-drift 14s ease-in-out infinite alternate;
    }
  }
}

@keyframes scene-drift {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-4px);
  }
}
```

- [ ] **Step 5: Tests, gates, commit**

```bash
pnpm test src/components/ui && pnpm lint && pnpm exec tsc --noEmit
git add src/components/ui/Scene.tsx src/components/ui/Scene.test.tsx src/components/ui/PageHero.tsx src/components/ui/PageHero.test.tsx src/styles/global.css
git commit -m "feat(ui): Scene (dithered backdrop with scrim and drift) and PageHero"
```

---

### Task 3: Home hero with the Paladin and the CRT warp

**Files:**

- Create: `src/components/effects/CrtWarpCanvas.tsx` (client, WebGL), `src/components/effects/CrtWarp.tsx` (lazy wrapper + fallback)
- Rewrite: `src/app/(home)/_components/HomeHero.tsx`
- Create: `src/app/(home)/_components/HomeHero.test.tsx`

**Interfaces:**

- Consumes: `Scene` (Task 2), `scenes['home-paladin']`, `Button`, `HomeResumeModalButton` (unchanged).
- Produces: `CrtWarp: React.FC<{ name: SceneName; className?: string }>` — renders `<Scene>` on the server and until the WebGL canvas is ready; replaces it with `<CrtWarpCanvas>` when `WebGL2` is available and `prefers-reduced-motion` is not set.

- [ ] **Step 1: Failing hero test**

`src/app/(home)/_components/HomeHero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import HomeHero from './HomeHero'

vi.mock('@/components/effects/CrtWarp', () => ({
  CrtWarp: ({ name }: { name: string }) => (
    <div data-testid='crt' data-scene={name} />
  ),
}))
vi.mock('./HomeResumeModalButton', () => ({
  default: () => <button>See my résumé</button>,
}))

describe('HomeHero', () => {
  it('renders the spec headline, the sub, one accent CTA to /contact and the Paladin scene', () => {
    render(<HomeHero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(
      'I build the front-end and question the roadmap.'
    )
    expect(h1.querySelector('.text-outline')).toHaveTextContent(
      'and question the roadmap.'
    )
    expect(screen.getByText(/owner's eye/)).toBeInTheDocument()
    const cta = screen.getByRole('link', { name: "Tell me what's stuck" })
    expect(cta).toHaveAttribute('href', '/contact')
    expect(cta.querySelector('button')).toHaveClass('bg-amber')
    expect(screen.getByTestId('crt')).toHaveAttribute(
      'data-scene',
      'home-paladin'
    )
    expect(document.querySelectorAll('.bg-amber')).toHaveLength(1)
  })
})
```

Run → FAIL.

- [ ] **Step 2: `src/components/effects/CrtWarpCanvas.tsx`**

```tsx
'use client'

import { scenes, SceneName } from '@/configs/scenes.generated'
import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 aPos; out vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`

// Low-intensity barrel warp + vignette + faint flicker. No scanlines (spec §5.2).
const FRAG = `#version 300 es
precision mediump float;
in vec2 vUv; out vec4 outColor;
uniform sampler2D uTex; uniform float uTime; uniform vec2 uTexAspect;
const float WARP = 0.045; const vec3 INK = vec3(10.0, 10.0, 10.0) / 255.0;
vec2 warp(vec2 uv){ vec2 c = uv * 2.0 - 1.0; c *= 1.0 + WARP * dot(c, c); return c * 0.5 + 0.5; }
void main(){
  vec2 uv = warp(vUv);
  vec2 cover = (uv - 0.5) * uTexAspect + 0.5;
  bool inside = all(greaterThanEqual(cover, vec2(0.0))) && all(lessThanEqual(cover, vec2(1.0)));
  vec3 color = inside ? texture(uTex, vec2(cover.x, 1.0 - cover.y)).rgb : INK;
  float vignette = smoothstep(1.35, 0.55, length(vUv * 2.0 - 1.0));
  float flicker = 1.0 - 0.015 * sin(uTime * 9.0);
  outColor = vec4(mix(INK, color, 0.92 + 0.08 * vignette) * flicker, 1.0);
}`

type Props = { name: SceneName; onFail: () => void; animate: boolean }

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader')
  return shader
}

export const CrtWarpCanvas: React.FC<Props> = ({ name, onFail, animate }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl2', { antialias: false, alpha: false })
    if (!canvas || !gl) return onFail()

    let raf = 0
    let disposed = false
    const asset = scenes[name]

    try {
      const program = gl.createProgram()!
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(program)
      gl.useProgram(program)

      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      )
      const aPos = gl.getAttribLocation(program, 'aPos')
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      const uTime = gl.getUniformLocation(program, 'uTime')
      const uAspect = gl.getUniformLocation(program, 'uTexAspect')
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.round(canvas.clientWidth * dpr)
        const h = Math.round(canvas.clientHeight * dpr)
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
        }
        const canvasAspect = w / h
        const texAspect = asset.width / asset.height
        // object-fit: cover
        gl.uniform2f(
          uAspect,
          canvasAspect > texAspect ? 1 : canvasAspect / texAspect,
          canvasAspect > texAspect ? texAspect / canvasAspect : 1
        )
      }

      const draw = (t: number) => {
        if (disposed) return
        resize()
        gl.uniform1f(uTime, t / 1000)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        if (animate) raf = requestAnimationFrame(draw)
      }

      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (disposed) return
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
        raf = requestAnimationFrame(draw)
      }
      img.onerror = onFail
      img.src = asset.png

      const ro = new ResizeObserver(() => !animate && draw(0))
      ro.observe(canvas)

      return () => {
        disposed = true
        cancelAnimationFrame(raf)
        ro.disconnect()
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
    } catch {
      onFail()
    }
  }, [name, onFail, animate])

  return <canvas ref={ref} aria-hidden='true' className='h-full w-full' />
}
```

- [ ] **Step 3: `src/components/effects/CrtWarp.tsx`**

```tsx
'use client'

import { SceneName } from '@/configs/scenes.generated'
import { Scene } from '@/components/ui/Scene'
import { cn } from '@/lib/utils/cn'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

const CrtWarpCanvas = dynamic(
  () => import('./CrtWarpCanvas').then((m) => m.CrtWarpCanvas),
  { ssr: false }
)

type Props = { name: SceneName; className?: string }

/** Static dithered scene on the server and on failure; WebGL warp when it can run. */
export const CrtWarp: React.FC<Props> = ({ name, className }) => {
  const [mode, setMode] = useState<'static' | 'webgl'>('static')
  const [animate, setAnimate] = useState(false)
  const fail = useCallback(() => setMode('static'), [])

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (canvas.getContext('webgl2')) {
      setAnimate(!reduced)
      setMode('webgl')
    }
  }, [])

  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      {mode === 'webgl' ? (
        <CrtWarpCanvas name={name} onFail={fail} animate={animate} />
      ) : (
        <Scene
          name={name}
          className='relative inset-auto z-auto'
          drift={false}
          scrim='none'
        />
      )}
      <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/60 to-transparent' />
      <div className='absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ink to-transparent' />
    </div>
  )
}
```

- [ ] **Step 4: `src/app/(home)/_components/HomeHero.tsx`**

```tsx
import { CrtWarp } from '@/components/effects/CrtWarp'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import Link from 'next/link'
import ResumeModalButton from './HomeResumeModalButton'

const HomeHero: React.FC = () => {
  return (
    <section className='relative z-0 flex min-h-[38rem] flex-col justify-end gap-8 border-b border-line pb-16 pt-40 mobile:min-h-[46rem] mobile:pt-56'>
      <CrtWarp name='home-paladin' className='[&_canvas]:object-cover' />

      <Eyebrow index='00' active>
        Felipe Mateus — front-end engineer with a product owner&rsquo;s eye
      </Eyebrow>

      <h1 className='flex flex-col'>
        <span>I build the front-end</span>
        <span className='text-outline'>and question the roadmap.</span>
      </h1>

      <p className='max-w-[44ch] font-serif text-2xl italic text-parchment-dim'>
        Front-end engineer with an owner&rsquo;s eye — I find the bottleneck,
        make the call, and ship what moves the number.
      </p>

      <div className='flex flex-col gap-4 mobile:flex-row mobile:items-center'>
        <Link href='/contact' className='w-full mobile:w-fit'>
          <Button variant='accent' full>
            Tell me what&rsquo;s stuck
          </Button>
        </Link>
        <ResumeModalButton />
      </div>
    </section>
  )
}

export default HomeHero
```

Also edit `HomeResumeModalButton.tsx`: change the trigger to `<Button variant='secondary' className='w-full mobile:w-fit' onClick={handleClick}>See my résumé</Button>` (drop the sliding 📄 span/div — decorative motion that doesn't serve the system).

Note on the display scale: `display-1` is 7rem/3.5rem with `max-w-[14ch]` unset here on purpose — the hero title spans two lines at 1440px ("I BUILD THE FRONT-END" / "AND QUESTION THE ROADMAP."); at 390px it wraps to four. If it exceeds four lines at 390px, add `text-[3rem]` on the `h1` under `max-[420px]:` — verify in Task 14.

- [ ] **Step 5: Tests, gates, build, commit**

```bash
pnpm test "src/app/(home)" src/components && pnpm lint && pnpm exec tsc --noEmit && pnpm build
git add src/components/effects "src/app/(home)/_components/HomeHero.tsx" "src/app/(home)/_components/HomeHero.test.tsx" "src/app/(home)/_components/HomeResumeModalButton.tsx"
git commit -m "feat(home): hero with the Paladin scene, lazy CRT warp and the spec headline"
```

Manual check (headless Chrome, `pnpm dev` on :3000, kill with `pkill -f next-server`):
`--window-size=1440,900 --screenshot=/tmp/p3-home.png http://localhost:3000/` — the Paladin sits behind the two-line title, slightly barrel-warped, no scanlines; title solid + outline; one amber button.

---

### Task 4: Projects — data model and the decision-led card

**Files:**

- Rewrite: `src/configs/works.ts`; Create: `src/configs/works.test.ts`
- Rewrite: `src/app/projects/_components/ProjectsCard.tsx`; Create: `ProjectsCard.test.tsx`
- Modify: `src/app/projects/_components/ProjectsCardStack.tsx`, `ProjectsContent.tsx`, `ProjectsPlaceholderCard.tsx`, `src/app/projects/page.tsx`, `src/app/(home)/_components/HomeSelectedWorkSection.tsx`

**Interfaces:**

- Produces: `type Project = { slug: string; title: string; role: string; period: string; summary: string; call?: string; result?: string; stack: string[]; url?: string; icon: string; image: string; screenshotView?: 'mobile' | 'tablet' }`, `works: Project[]`, `ProjectsCard: React.FC<{ project: Project; index: number; className?: string }>`.

- [ ] **Step 1: Failing tests**

`src/configs/works.test.ts`:

```ts
import { works } from './works'

describe('works', () => {
  it('has unique slugs, a stack for every project, and no placeholder URLs', () => {
    const slugs = works.map((w) => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const w of works) {
      expect(w.stack.length).toBeGreaterThan(0)
      expect(w.url ?? '').not.toContain('flow-ai-oficial')
    }
  })

  it('only quotes numbers that exist in the résumé', () => {
    const withResult = works.filter((w) => w.result)
    expect(withResult.map((w) => w.slug)).toEqual(['zeus-agrotech'])
    expect(withResult[0].result).toMatch(/50%/)
  })
})
```

`src/app/projects/_components/ProjectsCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { works } from '@/configs/works'
import ProjectsCard from './ProjectsCard'

const zeus = works.find((w) => w.slug === 'zeus-agrotech')!
const equals9 = works.find((w) => w.slug === 'equals9')!

describe('ProjectsCard', () => {
  it('renders eyebrow index, title, the call and the result, the stack and a visit link', () => {
    render(<ProjectsCard project={zeus} index={1} />)
    expect(screen.getByText(/02 —/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      zeus.title
    )
    expect(screen.getByText('The call')).toBeInTheDocument()
    expect(screen.getByText('The result')).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument()
    for (const s of zeus.stack) expect(screen.getByText(s)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Visit site/ })).toHaveAttribute(
      'href',
      zeus.url
    )
  })

  it('omits call/result rows and the link when data is missing', () => {
    render(<ProjectsCard project={equals9} index={6} />)
    expect(screen.queryByText('The call')).toBeNull()
    expect(screen.queryByText('The result')).toBeNull()
    expect(screen.queryByRole('link', { name: /Visit site/ })).toBeNull()
  })
})
```

Run → FAIL.

- [ ] **Step 2: `src/configs/works.ts`**

```ts
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
```

(Periods come from `src/constants/resume.ts` — confirm each with `find_symbol` on that file and correct the strings if the résumé says otherwise; the résumé is the truth.)

- [ ] **Step 3: `src/app/projects/_components/ProjectsCard.tsx`**

```tsx
import ArrowRightIcon from '@/components/icons/ArrowRight'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Project } from '@/configs/works'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import Link from 'next/link'

export type ProjectsCardProps = {
  project: Project
  index: number
  className?: string
}

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className='grid gap-1 border-t border-line py-4 mobile:grid-cols-[8rem_1fr] mobile:gap-6'>
    <span className='text-parchment-mute eyebrow-text'>{label}</span>
    <p className='text-base text-parchment'>{children}</p>
  </div>
)

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  project,
  index,
  className,
}) => {
  const {
    title,
    role,
    period,
    summary,
    call,
    result,
    stack,
    url,
    icon,
    image,
    screenshotView,
  } = project
  const number = String(index + 1).padStart(2, '0')

  return (
    <Card
      as='article'
      className={cn(
        'flex w-full flex-col overflow-hidden tablet:flex-row',
        className
      )}
    >
      <div className='flex grow flex-col px-6 py-8 mobile:p-10 tablet:max-w-[36rem]'>
        <div className='mb-6 flex items-center justify-between'>
          <Eyebrow index={number}>{period}</Eyebrow>
          <Image
            src={icon}
            alt=''
            width={40}
            height={40}
            className='rounded-sm object-contain'
          />
        </div>

        <h3 className='mb-1 text-3xl font-semibold leading-tight text-parchment'>
          {title}
        </h3>
        <p className='mb-6 text-parchment-dim'>{role}</p>
        <p className='mb-6 text-parchment-dim'>{summary}</p>

        {call ? <Row label='The call'>{call}</Row> : null}
        {result ? <Row label='The result'>{result}</Row> : null}

        <ul
          className='mt-auto flex flex-wrap gap-2 border-t border-line pt-4'
          aria-label='Stack'
        >
          {stack.map((item) => (
            <li
              key={item}
              className='rounded-full border border-line px-2.5 py-1 text-parchment-dim eyebrow-text'
            >
              {item}
            </li>
          ))}
        </ul>

        {url ? (
          <Link
            href={url}
            target='_blank'
            rel='noreferrer noopener'
            className='mt-6 w-fit'
          >
            <Button
              variant='text'
              className='group'
              rightIcon={
                <ArrowRightIcon className='text-base transition-transform ease-in-out group-hover:translate-x-1' />
              }
            >
              Visit site
            </Button>
          </Link>
        ) : null}
      </div>

      <div className='relative hidden max-w-[28rem] shrink-0 grow border-l border-line tablet:flex'>
        <Image
          className={cn('object-cover object-left', {
            'object-top': screenshotView === 'tablet',
          })}
          src={image}
          alt={`${title} screenshot`}
          fill
          sizes='(min-width: 768px) 28rem, 0px'
        />
      </div>
    </Card>
  )
}

export default ProjectsCard
```

(The stack chips are the one allowed full-pill mono badge, spec §4.4. `next/image` is fine for screenshots — they are not dithered scenes.)

- [ ] **Step 4: Consumers**

`ProjectsCardStack.tsx`:

```tsx
import { Project } from '@/configs/works'
import ProjectsCard from './ProjectsCard'
import ProjectsPlaceholderCard from './ProjectsPlaceholderCard'

const ProjectsCardStack: React.FC<{ items: Project[] }> = ({ items }) => (
  <div className='flex flex-col gap-4'>
    {items.length > 0 ? (
      items.map((project, index) => (
        <ProjectsCard key={project.slug} project={project} index={index} />
      ))
    ) : (
      <p className='py-10 text-center text-parchment-dim'>
        No project matches that.
      </p>
    )}
    <ProjectsPlaceholderCard />
  </div>
)

export default ProjectsCardStack
```

`ProjectsContent.tsx`: keep the search logic; change the `TextField` to `label='Search'`, `placeholder='Filter by name…'`, remove `variant='outlined'`; wrapper `className='flex flex-col gap-8 pb-28 pt-12'`; open with `<Eyebrow index='02' active>All projects</Eyebrow>` above the field.

`ProjectsPlaceholderCard.tsx` — straight card, new copy:

```tsx
import SendIcon from '@/components/icons/Send'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import Link from 'next/link'

const ProjectsPlaceholderCard: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Card
    className={
      className ? `border-dashed p-10 ${className}` : 'border-dashed p-10'
    }
  >
    <Eyebrow>Next</Eyebrow>
    <h3 className='mt-4 text-3xl font-semibold text-parchment'>
      Your project goes here.
    </h3>
    <p className='mb-8 mt-2 max-w-[48ch] text-parchment-dim'>
      Bring the bottleneck. I&rsquo;ll bring the call and the number it moved.
    </p>
    <Link href='/contact'>
      <Button leftIcon={<SendIcon className='text-xl' />}>
        Tell me what&rsquo;s stuck
      </Button>
    </Link>
  </Card>
)

export default ProjectsPlaceholderCard
```

`src/app/projects/page.tsx` — replace `Header` with `PageHero` (Task 2):

```tsx
<main>
  <PageHero
    index='02'
    label='Projects'
    title='The call and the result.'
    subtitle='Every project lists what was decided and what it moved — not only what was built.'
    scene='projects-wall'
  />
  <Content />
</main>
```

and set metadata `title: 'Projects'`, `description: 'Projects by Felipe Mateus — the decision taken on each one and what it moved.'` (both `openGraph`/`twitter` titles/descriptions the same; keep the rest of the metadata object).

`HomeSelectedWorkSection.tsx`:

```tsx
import ProjectsCard from '@/app/projects/_components/ProjectsCard'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { works } from '@/configs/works'
import Link from 'next/link'

const selected = works.slice(0, 3)

const HomeSelectedWorkSection: React.FC = () => (
  <section className='border-b border-line py-16'>
    <div className='mb-8 flex items-end justify-between'>
      <div className='flex flex-col gap-3'>
        <Eyebrow index='01' active>
          Selected work
        </Eyebrow>
        <h2>Decisions that shipped.</h2>
      </div>
      <Link href='/projects' className='hidden mobile:block'>
        <Button variant='text'>All projects</Button>
      </Link>
    </div>
    <ul className='flex flex-col gap-4'>
      {selected.map((project, index) => (
        <li key={project.slug}>
          <ProjectsCard project={project} index={index} />
        </li>
      ))}
    </ul>
  </section>
)

export default HomeSelectedWorkSection
```

- [ ] **Step 5: Tests, gates, commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add src/configs/works.ts src/configs/works.test.ts src/app/projects "src/app/(home)/_components/HomeSelectedWorkSection.tsx"
git commit -m "feat(projects): decision-led project model and card, PageHero on /projects"
```

---

### Task 5: Home — "get to know" scene cards and the sign-off

**Files:**

- Rewrite: `src/app/(home)/_components/HomeGetToKnowSection.tsx`, `HomeGetInTouchSection.tsx`
- Delete: `src/app/(home)/_components/HomeWidget.tsx`, `HomePortrait.tsx`, `src/components/ui/3DCard.tsx`, `src/components/ui/UnderConstruction.tsx`
- Create: `src/app/(home)/_components/HomeGetToKnowSection.test.tsx`

**Interfaces:** consumes `Scene`, `Card`, `Eyebrow`, `SIGN_OFF`, `Button`.

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import HomeGetToKnowSection from './HomeGetToKnowSection'

describe('HomeGetToKnowSection', () => {
  it('links four cards with a dithered scene each', () => {
    const { container } = render(<HomeGetToKnowSection />)
    for (const [name, href] of [
      ['About', '/about'],
      ['Notebook', '/notebook'],
      ['Bookshelf', '/bookshelf'],
      ['Tech Stack', '/tech-stack'],
    ]) {
      expect(
        screen.getByRole('link', { name: new RegExp(name) })
      ).toHaveAttribute('href', href)
    }
    expect(container.querySelectorAll('img[aria-hidden="true"]')).toHaveLength(
      4
    )
    expect(container.querySelector('.bg-amber')).toBeNull()
  })
})
```

- [ ] **Step 2: `HomeGetToKnowSection.tsx`**

```tsx
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Scene } from '@/components/ui/Scene'
import { SceneName } from '@/configs/scenes.generated'
import Link from 'next/link'

const cards: {
  href: string
  index: string
  label: string
  title: string
  scene: SceneName
}[] = [
  {
    href: '/about',
    index: '01',
    label: 'About',
    title: 'How I decide.',
    scene: 'about-paladin',
  },
  {
    href: '/notebook',
    index: '04',
    label: 'Notebook',
    title: 'Notes in progress.',
    scene: 'notebook-desk',
  },
  {
    href: '/bookshelf',
    index: '03',
    label: 'Bookshelf',
    title: 'What I read.',
    scene: 'bookshelf-library',
  },
  {
    href: '/tech-stack',
    index: '05',
    label: 'Tech Stack',
    title: 'Tools, not headlines.',
    scene: 'tech-bench',
  },
]

const HomeGetToKnowSection: React.FC = () => (
  <section className='border-b border-line py-16'>
    <div className='mb-8 flex flex-col gap-3'>
      <Eyebrow index='02' active>
        Get to know me
      </Eyebrow>
      <h2>Who is making the calls.</h2>
    </div>
    <ul className='grid grid-cols-1 gap-4 tablet:grid-cols-2'>
      {cards.map(({ href, index, label, title, scene }) => (
        <li key={href}>
          <Link
            href={href}
            className='group block'
            aria-label={`${label} — ${title}`}
          >
            <Card className='relative z-0 flex aspect-[4/3] flex-col justify-end overflow-hidden p-6 transition-colors group-hover:border-parchment-dim'>
              <Scene name={scene} position='top' drift={false} />
              <Eyebrow index={index}>{label}</Eyebrow>
              <h3 className='mt-2 text-3xl font-semibold text-parchment'>
                {title}
              </h3>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  </section>
)

export default HomeGetToKnowSection
```

- [ ] **Step 3: `HomeGetInTouchSection.tsx`**

```tsx
import SendIcon from '@/components/icons/Send'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SIGN_OFF } from '@/configs/navigation'
import Link from 'next/link'

const HomeGetInTouchSection: React.FC = () => (
  <section className='flex flex-col items-start justify-between gap-8 py-16 tablet:flex-row tablet:items-end'>
    <div className='flex flex-col gap-3'>
      <Eyebrow index='06' active>
        Contact
      </Eyebrow>
      <h2>Tell me what&rsquo;s stuck.</h2>
      <p className='max-w-[40ch] font-serif text-2xl italic text-parchment-dim'>
        {SIGN_OFF}
      </p>
    </div>
    <Link href='/contact' className='w-full mobile:w-fit'>
      <Button leftIcon={<SendIcon />} full>
        Get in touch
      </Button>
    </Link>
  </section>
)

export default HomeGetInTouchSection
```

- [ ] **Step 4: Delete** `HomeWidget.tsx`, `HomePortrait.tsx`, `src/components/ui/3DCard.tsx`, `src/components/ui/UnderConstruction.tsx`; `grep -rn "3DCard\|HomeWidget\|HomePortrait\|UnderConstruction" src` → nothing. `src/app/(home)/page.tsx` stays (dynamic imports still resolve).

- [ ] **Step 5: Tests, gates, commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit
git add "src/app/(home)" src/components/ui
git commit -m "feat(home): scene cards for the sections and the serif sign-off; drop 3DCard widgets"
```

---

### Task 6: About page

**Files:**

- Rewrite: `src/app/about/page.tsx`, `src/app/about/_components/AboutContent.tsx`, `AboutPortrait.tsx`
- Create: `src/app/about/_components/AboutContent.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import AboutContent from './AboutContent'

vi.mock('./AboutResumeModal', () => ({
  default: () => <button>résumé</button>,
}))

describe('AboutContent', () => {
  it('uses the three spec eyebrows and keeps the facts', () => {
    render(<AboutContent />)
    for (const label of [
      'How I decide',
      "What I've shipped",
      "Where I'm useful",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
    expect(screen.getByText(/Uberlândia/)).toBeInTheDocument()
    expect(screen.getByText(/five years in IT/)).toBeInTheDocument()
    expect(screen.queryByText(/passionate/i)).toBeNull()
    expect(screen.queryByText(/faithfully reproduce/i)).toBeNull()
  })
})
```

- [ ] **Step 2: `AboutContent.tsx`**

```tsx
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SOCIAL_LINKS } from '@/constants/social'
import Link from 'next/link'
import AboutPortrait from './AboutPortrait'
import AboutResumeModal from './AboutResumeModal'

const Block: React.FC<{
  index: string
  label: string
  children: React.ReactNode
}> = ({ index, label, children }) => (
  <section className='grid gap-6 border-t border-line py-10 wide:grid-cols-[16rem_1fr]'>
    <Eyebrow index={index}>{label}</Eyebrow>
    <div className='flex max-w-[60ch] flex-col gap-4 text-lg leading-relaxed text-parchment-dim'>
      {children}
    </div>
  </section>
)

const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <b className='font-medium text-parchment'>{children}</b>
)

const AboutContent: React.FC = () => (
  <div className='flex flex-col gap-0 pb-20 wide:flex-row wide:gap-16'>
    <div className='order-2 grow wide:order-1'>
      <Block index='01' label='How I decide'>
        <p>
          I look at the product, the company and where the company is right now
          before I look at the code. Curious by default, critical on purpose,
          direct when it saves everyone time.
        </p>
        <p>
          Ten years in technology — <Strong>five years in IT</Strong>, then five
          on the front-end — taught me that the cheapest bug is the feature you
          cut early, and that the front-end is where the business finds out
          whether the roadmap was right.
        </p>
      </Block>

      <Block index='02' label="What I've shipped">
        <p>
          Front-end foundations for early-stage startups, usually from zero and
          usually next to the founder: <Strong>Pigmo</Strong> from the first
          commit (2023 — present), the <Strong>Zeus Agrotech</Strong> portal
          rebuilt out of a legacy app, and the <Strong>Equals9</Strong> apps
          where I started as a developer.
        </p>
        <p>
          React, Next.js, TypeScript and Tailwind are the tools. The deliverable
          is a product that moves a number — the full list, with the call and
          the result on each, is on the{' '}
          <Link
            href='/projects'
            className='text-parchment underline underline-offset-4'
          >
            projects page
          </Link>
          .
        </p>
      </Block>

      <Block index='03' label="Where I'm useful">
        <p>
          Early-stage teams that need the front-end done right the first time,
          roadmaps that need someone to push back, and interfaces that have to
          convert rather than just render.
        </p>
        <p>
          Based in <Strong>Uberlândia, Brazil</Strong>, working with teams
          anywhere. My résumé is one click away: <AboutResumeModal />. Or reach
          me on{' '}
          <Link
            href={SOCIAL_LINKS.linkedIn}
            target='_blank'
            className='text-parchment underline underline-offset-4'
          >
            LinkedIn
          </Link>
          .
        </p>
      </Block>
    </div>

    <div className='order-1 flex flex-col gap-8 pt-10 wide:order-2 wide:w-[22rem] wide:shrink-0'>
      <AboutPortrait />
      <Link href='/contact' className='w-full'>
        <Button full>Tell me what&rsquo;s stuck</Button>
      </Link>
    </div>
  </div>
)

export default AboutContent
```

(`AboutResumeModal` stays; change its trigger button class to `'text-parchment underline underline-offset-4'`.)

- [ ] **Step 3: `AboutPortrait.tsx`** — same component, radius 2px and a line frame:

```tsx
import Image from 'next/image'

const AboutPortrait: React.FC = () => (
  <div className='relative aspect-[344/432] w-full overflow-hidden rounded-sm border border-line bg-ink-2'>
    <Image
      src='/assets/me-green-shirt.png'
      alt='Felipe Mateus'
      fill
      sizes='(min-width: 1024px) 22rem, 100vw'
      className='object-cover'
      priority
    />
  </div>
)

export default AboutPortrait
```

- [ ] **Step 4: `src/app/about/page.tsx`** — metadata `title: 'About'`, description `"Front-end engineer with a product owner's eye — how I decide, what I've shipped, where I'm useful."` (og/twitter the same); render:

```tsx
<main>
  <PageHero
    index='01'
    label='About'
    title='How I decide.'
    subtitle='A front-end engineer with an owner’s eye.'
    scene='about-paladin'
    sceneClassName='[&_img]:object-right'
  />
  <AboutContent />
</main>
```

- [ ] **Step 5: Tests, gates, commit** — `git commit -m "feat(about): spec eyebrows and voice, PageHero with the profile scene"`.

---

### Task 7: Notebook — honest "in progress" page

**Files:**

- Rewrite: `src/app/notebook/page.tsx`
- Create: `src/app/notebook/_components/NotebookInProgress.tsx` (+ test)
- Delete: `NotebookPageWrapper.tsx`, `NotebookCategoryStack.tsx`, `NotebookDevNotes.tsx`, `NotebookDesignNotes.tsx`, `NotebookPhilosophyNotes.tsx`, `src/components/ui/BentoGrid.tsx`, `src/types/note.ts`

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import NotebookInProgress from './NotebookInProgress'

describe('NotebookInProgress', () => {
  it('states that nothing is published and lists the planned categories', () => {
    render(<NotebookInProgress />)
    expect(screen.getByText(/0 published/)).toBeInTheDocument()
    for (const c of ['dev', 'design', 'philosophy'])
      expect(screen.getByText(new RegExp(c))).toBeInTheDocument()
    expect(screen.queryByText(/Dawn of Innovation/)).toBeNull()
  })
})
```

- [ ] **Step 2: `NotebookInProgress.tsx`**

```tsx
import { Button } from '@/components/ui/Button'
import { Terminal } from '@/components/ui/Terminal'
import Link from 'next/link'

const categories = ['dev', 'design', 'philosophy']

const NotebookInProgress: React.FC = () => (
  <div className='grid gap-8 py-16 pb-28 wide:grid-cols-2'>
    <Terminal title='notebook' path='~/notes'>
      <p>$ ls</p>
      <p>{categories.map((c) => `${c}/`).join('  ')}</p>
      <p className='mt-4'>$ wc -l */*.md</p>
      <p>0 published · drafts in progress</p>
    </Terminal>

    <div className='flex flex-col gap-4'>
      <p className='font-serif text-2xl italic text-parchment-dim'>
        The first notes are about decisions, not tutorials: what I cut, what I
        measured, what I would decide again.
      </p>
      <p className='text-parchment-dim'>
        Until they land, the same thinking is visible on the projects page —
        each one shows the call and the result.
      </p>
      <Link href='/projects' className='w-fit'>
        <Button variant='secondary'>See the projects</Button>
      </Link>
    </div>
  </div>
)

export default NotebookInProgress
```

- [ ] **Step 3: `page.tsx`** — metadata `title: 'Notebook'`, description `'Notes in progress — decisions, not tutorials.'`; render `<PageHero index='04' label='Notebook' title='Notes in progress.' subtitle='Nothing published yet. The first notes land here.' scene='notebook-desk' />` + `<NotebookInProgress />`.

- [ ] **Step 4: Delete** the five notebook component files, `BentoGrid.tsx`, `types/note.ts`; `grep -rn "BentoGrid\|types/note" src` → nothing.

- [ ] **Step 5: Tests, gates, commit** — `feat(notebook): honest in-progress state, BentoGrid and placeholder notes removed`.

---

### Task 8: Tech Stack page

**Files:**

- Modify: `src/app/tech-stack/page.tsx`, `_components/TechStackCard.tsx`, `TechStackGroupTitle.tsx`, `TechStackGroup.tsx`, and the four `*List.tsx` (only the title call changes)
- Create: `src/app/tech-stack/_components/TechStackCard.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { tools } from '@/configs/tools'
import TechStackCard from './TechStackCard'

describe('TechStackCard', () => {
  it('renders name, mono category and no radius above 2px', () => {
    const t = tools[0]
    const { container } = render(
      <TechStackCard name={t.name} category={t.type} src={t.image} />
    )
    expect(screen.getByText(t.name)).toBeInTheDocument()
    expect(screen.getByText(t.type)).toHaveClass('eyebrow-text')
    expect(container.innerHTML).not.toMatch(/rounded-(md|lg|xl|2xl|3xl|4xl)/)
  })
})
```

- [ ] **Step 2: `TechStackCard.tsx`** — same props; styles become:

```tsx
const cardStyles = tv({
  slots: {
    container: [
      'group flex items-center gap-4 p-4',
      'rounded-sm border border-line bg-ink-2',
      'relative w-full transition-colors hover:border-parchment-dim',
      'mobile:aspect-square mobile:flex-col mobile:items-start mobile:justify-between mobile:p-6',
    ],
    icon: [
      'absolute right-4 top-4 hidden text-xl text-parchment-mute mobile:block',
    ],
    image: ['aspect-square w-14 shrink-0 object-contain mobile:w-20'],
    title: 'text-base font-medium text-parchment',
    label: 'text-parchment-mute eyebrow-text',
  },
})
```

and the JSX: `<div className={classes.container({ className })}><ArrowRightIcon className={classes.icon()} /><Image … className={classes.image()} /><div className='flex w-full flex-col gap-1'><p className={classes.title()}>{name}</p>{category ? <span className={classes.label()}>{category}</span> : null}</div></div>`.

- [ ] **Step 3: Group title with eyebrow** — `TechStackGroupTitle` gains `index: string`:

```tsx
export type TechStackGroupTitleProps = {
  index: string
  children: React.ReactNode
}
const TechStackGroupTitle: React.FC<TechStackGroupTitleProps> = ({
  index,
  children,
}) => (
  <div className='mb-6 flex flex-col gap-3 border-t border-line pt-8'>
    <Eyebrow index={index}>{children}</Eyebrow>
  </div>
)
```

Lists pass `index='01'` (Dev & Design), `'02'` (Apps), `'03'` (Hardware), `'04'` (Games). `TechStackGroup` grid: `'mb-12 grid w-full gap-4 mobile:grid-cols-2 tablet:grid-cols-3 wide:grid-cols-4'`.

- [ ] **Step 4: `page.tsx`** — metadata `title: 'Tech Stack'`, description `'What I use to ship — the stack is a means, never the pitch.'`; `<PageHero index='05' label='Tech Stack' title='Tools, not headlines.' subtitle='What I use to ship. The stack is a means, never the pitch.' scene='tech-bench' />` then the four lists inside `<div className='pb-16'>`.

- [ ] **Step 5: Tests, gates, commit** — `feat(tech-stack): line-grid groups, mono labels, PageHero with the bench scene`.

---

### Task 9: Bookshelf page

**Files:**

- Modify: `src/app/bookshelf/template.tsx`, `error.tsx`, `_components/BookshelfBook.tsx`, `BookshelfLoading.tsx`, `BookshelfItems.tsx`, `BookshelfGrid.tsx`; add `metadata` export to `src/app/bookshelf/page.tsx`

- [ ] **Step 1:** `template.tsx` → `<main><PageHero index='03' label='Bookshelf' title='What I read.' subtitle='Books that changed how I decide.' scene='bookshelf-library' />{children}</main>`.
- [ ] **Step 2:** `page.tsx` — add `export const metadata: Metadata = { title: 'Bookshelf', description: 'Books that changed how I decide.' }`.
- [ ] **Step 3:** `BookshelfBook.tsx` — outer `rounded-md` → `rounded-sm border border-line`; `BookshelfLoading.tsx` — `rounded-md` → `rounded-sm` (keep `animate-pulse`, Tailwind core, skeleton only); `BookshelfItems.tsx` — error span → `<p className='py-16 text-parchment-dim'>Couldn’t load the shelf. Try again in a minute.</p>`; `BookshelfGrid` padding `pb-16 pt-12`.
- [ ] **Step 4:** `error.tsx`:

```tsx
'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const BookshelfErrorPage: React.FC<{ reset: () => void }> = ({ reset }) => (
  <div className='flex flex-col items-start gap-6 py-16'>
    <p className='text-parchment-dim'>
      The shelf didn&rsquo;t load. It&rsquo;s on my side, not yours.
    </p>
    <div className='flex gap-4'>
      <Button variant='secondary' onClick={reset}>
        Try again
      </Button>
      <Link href='/'>
        <Button variant='text'>Back home</Button>
      </Link>
    </div>
  </div>
)

export default BookshelfErrorPage
```

- [ ] **Step 5:** `pnpm test && pnpm lint && pnpm exec tsc --noEmit`; commit `feat(bookshelf): PageHero with the library scene, 2px radius, English error state`.

---

### Task 10: Contact page — wax seal, Terminal form, no bounce

**Files:**

- Rewrite: `src/app/contact/page.tsx` (render part + metadata), `_components/ContactFormContainer.tsx`, `ContactControlBar.tsx` (delete), `ContactFormMessage.tsx`, `ContactForm.tsx` (textarea + copy), `ContactSocialButtonGroup.tsx` (spacing only)
- Create: `src/app/contact/_components/ContactSeal.tsx`, `ContactFormMessage.test.tsx`

**Interfaces:** consumes `PageHero`, `Terminal`, `ExLibris`, `TextField`.

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from '@testing-library/react'
import ContactFormMessage from './ContactFormMessage'

describe('ContactFormMessage', () => {
  it('has no bounce animation and uses the new copy', () => {
    const { container } = render(<ContactFormMessage status='success' />)
    expect(container.innerHTML).not.toMatch(/animate-bounce/)
    expect(screen.getByText('Message sent.')).toBeInTheDocument()
    expect(screen.getByText(/I read everything/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: `ContactSeal.tsx`** — the only amber on the page (spec §4.3), positioned over the letter's blank wax seal:

```tsx
import ExLibris from '@/assets/ExLibris'

/** Amber ex-libris stamped on the blank wax seal of the contact-letter scene. */
const ContactSeal: React.FC = () => (
  <ExLibris
    mark='halo'
    aria-hidden='true'
    className='pointer-events-none absolute left-[49%] top-[53%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-amber mobile:h-24 mobile:w-24'
  />
)

export default ContactSeal
```

(`left/top` percentages target the seal in `public/scenes/contact-letter.png` — the wax seal sits at ≈ 49% × 53% of the image; tune by ±3% in Task 14 against a 1440px screenshot.)

- [ ] **Step 3: `page.tsx`**

Metadata `title: 'Contact'`, description `"Tell me what's stuck — a bottleneck, a roadmap that doesn't add up, a front-end that isn't paying for itself."`. Render:

```tsx
<main>
  <div className='relative'>
    <PageHero
      index='06'
      label='Contact'
      title="Tell me what's stuck."
      subtitle='A bottleneck, a roadmap that doesn’t add up, a front-end that isn’t paying for itself — write it down.'
      scene='contact-letter'
      sceneClassName='[&_img]:object-center'
    />
    <ContactSeal />
  </div>

  <div className='grid gap-12 py-16 wide:grid-cols-[1fr_20rem]'>
    <ContactFormContainer />
    <aside className='flex flex-col gap-6'>
      <Eyebrow index='06'>Elsewhere</Eyebrow>
      <ContactSocialButtonGroup />
      <p className='font-serif text-xl italic text-parchment-dim'>
        I read everything. I answer what I can help with.
      </p>
    </aside>
  </div>
</main>
```

`ContactSeal` is an absolutely positioned sibling of `PageHero` inside a `relative` wrapper that contains only the hero, so its `left/top` percentages are relative to the hero box (and therefore to the scene, which fills it).

- [ ] **Step 4: Form container and message**

`ContactFormContainer.tsx` (no motion, Terminal chrome; delete `ContactControlBar.tsx`):

```tsx
import { Terminal } from '@/components/ui/Terminal'
import ContactForm from './ContactForm'

const ContactFormContainer: React.FC = () => (
  <Terminal
    title='new message'
    path='~/inbox'
    className='relative overflow-hidden'
  >
    <ContactForm />
  </Terminal>
)

export default ContactFormContainer
```

`ContactForm.tsx` changes: labels `Email` / `Name` / `Subject` (no colons); placeholders `you@company.com`, `Your name`, `What is this about?`; remove the three `<Separator alpha …/>` between fields (the bottom borders already separate); textarea:

```tsx
<div className='flex flex-col gap-2'>
  <label htmlFor='text' className='text-parchment-mute eyebrow-text'>
    Message
  </label>
  <textarea
    id='text'
    name='text'
    maxLength={1500}
    placeholder="What's stuck? Context, what you tried, what it costs you."
    className={cn(
      'min-h-56 w-full resize-y border-b border-line bg-transparent py-3 font-body text-parchment',
      'placeholder:text-parchment-mute focus:border-amber focus:outline-none',
      { 'border-err text-err placeholder:text-err/70': Boolean(errors?.text) }
    )}
    disabled={isPending}
    onChange={(e) => clearError(e.target.name as ErrorsKeys)}
    onKeyDown={handleKeyDown}
  />
  <span className='text-parchment-mute eyebrow-text'>
    ⌘/Ctrl + Enter to send · max 1500
  </span>
</div>
```

and the form wrapper `className='flex w-full flex-col gap-6'`. The submit button stays `primary` (parchment) — amber is spent on the seal.

`ContactFormMessage.tsx`:

```tsx
import MessageErrorIcon from '@/components/icons/MessageError'
import MessageSentIcon from '@/components/icons/MessageSent'

type Props = { status: 'error' | 'success' }

const ContactFormMessage: React.FC<Props> = ({ status }) => {
  const ok = status === 'success'
  return (
    <div
      role='status'
      className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink-2 p-6 text-center'
    >
      {ok ? (
        <MessageSentIcon className='text-4xl text-parchment' />
      ) : (
        <MessageErrorIcon className='text-4xl text-err' />
      )}
      <p className='text-3xl font-semibold text-parchment'>
        {ok ? 'Message sent.' : 'Not sent.'}
      </p>
      <p className='max-w-[40ch] text-parchment-dim'>
        {ok
          ? 'I read everything and answer what I can help with — usually within a couple of days.'
          : 'Something failed on my side. Email me directly or try again in a minute.'}
      </p>
    </div>
  )
}

export default ContactFormMessage
```

Delete `src/assets/HandArrowDown.tsx` if nothing else imports it (`grep -rn HandArrowDown src`).

`ContactSocialButtonGroup.tsx`: wrapper `className='flex flex-wrap gap-6'`, icons `text-2xl`, add `aria-label` per link (YouTube, LinkedIn, Instagram, X, GitHub, Discord).

- [ ] **Step 5: Tests, gates, build, commit**

```bash
pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build
git add src/app/contact src/assets
git commit -m "feat(contact): amber wax-seal ex-libris, terminal form, direct copy, no bounce"
```

---

### Task 11: Site metadata

**Files:**

- Modify: `src/app/layout.tsx` (metadata), `src/app/{about,projects,notebook,tech-stack,contact}/page.tsx` (only if a stale title/description remains), `src/configs/og.ts` (no change expected — verify titles match)
- Create: `src/app/metadata.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { metadata } from './layout'

describe('root metadata', () => {
  it('carries the positioning, no placeholders and no unimplemented locale', () => {
    const title = metadata.title as { default: string; template: string }
    expect(title.default).toBe(
      'Felipe Mateus — Front-end engineer who thinks like a product owner'
    )
    expect(title.template).toBe('%s — Felipe Mateus')
    expect(JSON.stringify(metadata)).not.toMatch(/seu-|exemplo|seuhandle|\/pt/)
    expect(metadata.verification).toBeUndefined()
  })
})
```

- [ ] **Step 2: `layout.tsx` metadata**

Replace `title`, `description`, `alternates`, `openGraph`, `twitter`, `verification` with:

```ts
title: {
  template: '%s — Felipe Mateus',
  default: 'Felipe Mateus — Front-end engineer who thinks like a product owner',
},
description:
  'Front-end engineer with an owner’s eye. I find the bottleneck, make the call, and ship what moves the number. Based in Uberlândia, Brazil, working with early-stage teams anywhere.',
alternates: { canonical: 'https://felipe-mateus.com' },
openGraph: {
  title: 'Felipe Mateus — Front-end engineer who thinks like a product owner',
  description: 'I find the bottleneck, make the call, and ship what moves the number.',
  url: 'https://felipe-mateus.com',
  siteName: 'Felipe Mateus',
  locale: 'en_US',
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: 'Felipe Mateus — Front-end engineer who thinks like a product owner',
  description: 'I find the bottleneck, make the call, and ship what moves the number.',
},
```

Delete the `verification` block entirely; keep `keywords` but drop the Portuguese SEO stuffing (`engenheiro`, `desenvolvedor…`, `programador`, `desenvolvimento web`) — English only. Per-page `page.tsx` metadata: keep only `title`, `description`, `openGraph: { title, description }`, `twitter: { title, description }` — the root supplies the rest (remove the duplicated `generator/applicationName/keywords/authors/…` blocks from the six page files).

- [ ] **Step 3:** `pnpm test && pnpm lint && pnpm exec tsc --noEmit`; commit `feat(meta): positioning in the site metadata, placeholders and pt-BR alternate removed`.

---

### Task 12: Removal pass — styles, config, deps, dead assets

**Files:**

- Modify: `src/styles/keyframes.ts`, `tailwind.config.js`, `src/styles/tailwind.test.ts`, `package.json` (+ lockfile), `src/components/ui/Terminal.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/modal/Modal.tsx`, `src/components/ui/Separator.tsx`, `src/components/ui/TextField.tsx`
- Delete: `src/components/ui/Header.tsx`, `src/components/ui/TextGeneratorEffect.tsx`, `src/components/icons/Sun.tsx`, `src/components/icons/Moon.tsx`, `src/components/resume/index.tsx`, `public/icons/**`, unused `public/assets/*` and `public/logos/*`

- [ ] **Step 1: Failing config test** — extend `src/styles/tailwind.test.ts` with:

```ts
it('keeps only the modal fade animations and no legacy radius/shadow/gradient', () => {
  const ext = config.theme.extend
  expect(Object.keys(ext.animation).sort()).toEqual(['fadeIn', 'fadeOut'])
  expect(Object.keys(ext.keyframes).sort()).toEqual(['fadeIn', 'fadeOut'])
  expect(ext.backgroundImage).toBeUndefined()
  expect(ext.borderRadius).toBeUndefined()
  expect(ext.boxShadow).toBeUndefined()
})
```

(Read the existing test file first to reuse its `config` import.)

- [ ] **Step 2: Prune**
  - `src/styles/keyframes.ts`: keep only `fadeIn` and `fadeOut` entries.
  - `tailwind.config.js`: `animation` → `{ fadeIn: 'fadeIn 200ms ease forwards', fadeOut: 'fadeOut 200ms ease forwards' }`; delete `backgroundImage`, `borderRadius`, `boxShadow`, `width['half-rem']`, `maxWidth['tech-card']`; delete the `bg-grid/bg-grid-small/bg-dot` `matchUtilities` plugin and the `svgToDataUri` require; delete the `.blur-performance` utility; remove `require('tailwindcss-animate')` from `plugins`.
  - `package.json`: `pnpm remove framer-motion uuid @react-email/render mini-svg-data-uri tailwindcss-animate @types/uuid` — first `grep -rn "framer-motion\|from 'uuid'\|@react-email/render\|mini-svg-data-uri" src tailwind.config.js` must return nothing (Tasks 1–10 removed every usage; if something remains, fix that file rather than keeping the dep).
  - Delete `Header.tsx` (`grep -rn "ui/Header" src` → nothing after Tasks 4–10), `TextGeneratorEffect.tsx`, `icons/Sun.tsx`, `icons/Moon.tsx`, `components/resume/index.tsx` (unused; `src/constants/resume.ts` stays — it is the résumé truth).
  - `public/icons/` (114 files, zero references) → `git rm -r public/icons`; `public/assets`: delete `desknotes.svg geist.svg me-green-shirt-cropped.png placeholder.svg felipe_1.jpg felipe_2.jpg felipe_3.jpg felipe_4.jpg felipe_5.jpg memoji_1.webp memoji_2.webp me.jpg me-cropped.png about-me.png notebook.png bookshelf.png tech-stack.png gradient-email-template.png` after `grep -rn "<name>" src` is empty for each (the email template PNG is referenced by `ContactEmailTemplate.tsx` — check; keep if referenced); `public/logos`: delete `black_logo_lg.svg black_logo_sm.svg white_logo_lg.svg white_logo_sm.svg logo.png logo.svg wired-planet.svg` after the same grep.
  - Deferred Plan 1 items: `Terminal.tsx` — replace `<h3 className='font-mono …'>` with `<p className='text-parchment eyebrow-text'>` and drop the `data-testid='terminal-dot'` attributes (update `Terminal.test.tsx` to query `header i` instead); `Button.tsx` text variant → `'rounded-none bg-transparent p-0 eyebrow-text text-parchment-dim underline-offset-4 hover:text-parchment hover:underline'`; `Modal.tsx` close button → `'text-parchment-dim eyebrow-text hover:text-parchment'`; `Separator.tsx` — remove the no-op `alpha` prop (and its `data-alpha`), update callers (`ContactForm` no longer uses it; footer uses `screen` only); `TextField.tsx` — remove the empty `variant` variants and prop.

- [ ] **Step 3:** `pnpm install` (lockfile), `pnpm test && pnpm lint && pnpm exec tsc --noEmit && pnpm build`; commit `chore(rebrand): removal pass — legacy components, keyframes, utilities, deps and dead assets`.

---

### Task 13: Docs — spec and product amendments, handoff

**Files:**

- Modify: `docs/superpowers/specs/2026-09-07-brand-identity-design.md` (§3.1, §3.2, §4.3, §9), `PRODUCT.md` (Brand Commitments), this plan (append Execution status)

- [ ] **Step 1:** In the spec:
  - §3.1 heading `### 3.1 The Scribe (alter-ego)` → `### 3.1 The Paladin (alter-ego)`; first paragraph → "A hooded paladin — plain cloak over engraved plate armor, a longsword held point-down, an open book of code, a single candle as the only light, a thin halo with a four-pointed star (hero only). **Not Felipe** — the character is atmosphere, not allegory." Replace the character-sheet bullets with: hood and cloak over plate armor with rounded pauldrons; face in the shadow of the hood; sword point-down, hands on the pommel; open book whose text reads as code; candle nearby; halo with star, hero only. Keep the style sentence.
  - §3.2: append "Outcome (2026-09-08): the four archetypes were generated; Felipe chose a fifth direction he supplied — the Paladin. Job ids in `art/PROMPTS.md`."
  - §4.3: replace "Vector SVG, drawn by hand — not AI-generated." with "The FM letterforms are an AI-generated blackletter silhouette (Higgsfield, reference in `docs/references/exemple-logo.png`) vectorized with potrace (`pnpm vectorize`); two variants: with halo (footer, OG) and without (navbar, favicon). No ring, no text around the mark." and the three sizes with: full mark with halo; monogram without halo (navbar 32px); the same monogram for the favicon.
  - §9 decisions log: add rows `Character | Paladin (user-supplied concept) | Scribe (generated), Cartographer, Knight, Astronomer` and `Mark | AI-generated blackletter FM + sword, vectorized | hand-drawn FM interlace, double-fillet seal, rune`.
  - §6.2 note: "Sources with a model-drawn frame border may be cropped by luminance bounds instead of regenerated."
- [ ] **Step 2:** `PRODUCT.md` Brand Commitments bullet: "…with a fictional alter-ego (the Scribe)" → "(the Paladin)"; add "The FM mark is AI-generated and vectorized; the seal rings/arc text were rejected."; Operating Context: add "Assets: `art/**` is Git LFS (`brew install git-lfs`, `git lfs pull`)."
- [ ] **Step 3:** Append to this plan an `## Execution status (<date>) — handoff` section listing: what shipped per task, deferred items (with the reviewers' minors), what still waits on Felipe (metrics → `call`/`result`; Equals URLs; social handle), and the LFS/push notes (`.husky/pre-push` runs `git lfs pre-push`; `git gc --prune=now` after the first push).
- [ ] **Step 4:** commit `docs(brand): record the Paladin and the vectorized FM mark in spec and product`.

---

### Task 14: Finishing passes and visual verification (main session)

**Files:** whatever the passes touch (pages/components only; no new deps).

- [ ] **Step 1: Screenshots.** With `pnpm dev` on :3000 (`pkill -f next-server` afterwards):

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for r in "" about projects bookshelf notebook tech-stack contact; do for w in 390 768 1440; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=$w,1200 --screenshot=/tmp/p3-${r:-home}-$w.png "http://localhost:3000/$r" 2>/dev/null
done; done
```

View each with the Read tool. Checklist per page: scene behind the headline only, scrim keeps text readable; exactly one amber element on Home (hero CTA) and Contact (seal) and none elsewhere; no overflow at 390; hero title ≤ 4 lines at 390; contact seal centered on the wax (adjust `ContactSeal` percentages); footer easter egg visible; nothing rounded above 2px except the stack chips.

- [ ] **Step 2: Impeccable passes.** Run the `impeccable` skill in these modes, in order, accepting only changes that respect the Global Constraints: `typeset` (rhythm/measure of the new copy), `animate` (confirm the only motion is drift/CRT/hover/fade and that reduced-motion kills drift + CRT), `harden` (empty/error/loading states — bookshelf, contact form, notebook), `audit` (a11y + contrast over scenes). Commit each pass separately (`style(rebrand): impeccable <mode> pass`). If a pass proposes amber, gradients, shadows, radius > 2px or copy outside the voice, reject that item.
- [ ] **Step 3: Gates + build**, then `pnpm start` and check `/opengraph-image` still renders (Task 11 changed nothing there, but confirm), `pkill -f next-server`.
- [ ] **Step 4:** Update the Execution status section (Task 13) with the screenshot findings and commit `chore(rebrand): visual pass and finishing notes`.

---

## Self-review

- **Spec coverage:** §2.5 copy table → Tasks 3 (H1/sub), 6 (About eyebrows), 4 (project card call/result), 10 (contact ask), 1/5 (sign-off); §3.3 scenes per page → Tasks 3, 6, 4, 9, 7, 8, 10; §4.4 eyebrows/cards/buttons/forms/terminal → Tasks 2–10; §4.3 contact amber seal → Task 10; §5.1 placement + §5.3 scrim → `Scene`; §5.2 CRT hero-only → Task 3; §5.4 motion/reduced-motion/lazy/fallback → Tasks 2–3; §7 step 6 metadata → Task 11; §7 step 7 removal list (Nanum/Calibri done in Plan 1; 3DCard, BentoGrid, TextGeneratorEffect, Sun/Moon, keyframes, old utilities) → Tasks 5, 7, 12; §2.1 easter egg → Task 1; PRODUCT "notebook placeholder never real" → Task 7; "Equals wrong URL" → Task 4; Impeccable passes → Task 14; spec amendments → Task 13.
- **Placeholders:** none in the plan text; the only intentional blanks are data (`call`/`result` undefined) that the product rules require.
- **Type consistency:** `Scene` props (`name, className, position, scrim, drift`) used identically in Tasks 2, 3, 5; `PageHero` props (`index, label, title, subtitle, scene, sceneClassName, children`) in Tasks 4, 6–10; `Project`/`works` shape in Tasks 4–5; `NAV_*`/`SIGN_OFF`/`AVULSO_SINCE` in Tasks 1, 5; `CrtWarp({ name, className })` in Task 3; `Eyebrow` `index`/`active`/`children` everywhere.

---

## Execution status (2026-09-08) — handoff

Tasks 1–12 shipped on `feature/rebrand`, each reviewed clean:

- Task 1 (`1165642`): navigation config, config-driven navbars/menus, footer sign-off and avulso easter egg.
- Task 2 (`aefa1ea`, `e2a230c`): `Scene` and `PageHero` shared components.
- Task 3 (`ccc7bf8`, `88e7a27`): home hero with the Paladin scene and the lazy CRT warp.
- Task 4 (`7508d28`): projects data model and the decision-led card.
- Task 5 (`76b70ea`): home sections (scene cards, serif sign-off; 3DCard widgets dropped).
- Task 6 (`40754c2`, `2449cb7`): About page, spec eyebrows and voice.
- Task 7 (`5ca331b`): Notebook, honest in-progress state.
- Task 8 (`0bb4b8f`): Tech Stack, line-grid groups.
- Task 9 (`f93b9ed`): Bookshelf, PageHero with the library scene.
- Task 10 (`96d3659`): Contact, amber wax-seal ex-libris and terminal form.
- Task 11 (`ec5752b`): metadata, positioning in titles/descriptions.
- Task 12 (`32e33da`): removal pass — legacy components, keyframes, utilities, deps and dead assets.

### Task 14 — visual pass

Ran in the main session on `feature/rebrand` from `d7fa804`. Six commits: `71e2d91`, `7b0b9c5`, `cfc992b`, `57344a6`, `c079c66`, `41678c3`.

**Screenshot-harness correction (read this first).** Headless Chrome on macOS clamps its window to a **500px minimum width**, so `--window-size=390` renders the page at `innerWidth: 500` and crops the capture to 390. Every "390" screenshot taken before this note — including Step 1's — is a 500px render, and the horizontal clipping it appeared to show is the crop, not a layout bug. Real 390 captures go through `scratchpad/frame.html`, a 390-wide `<iframe>` on a 520px page. Use it for any future mobile check.

**Blocking findings**

- _Both more-menus rendered permanently open._ `hidden={!isOpen}` sat on the same element as a static `flex` utility; the utility wins the cascade over preflight's `[hidden]{display:none}` at equal specificity. Added the `[&[hidden]]:hidden` guard to `NavbarDesktopDropdownMenu.tsx` and the `list` slot of `NavbarMobileMoreMenu.tsx`, keeping the attribute (and its a11y semantics) as the single source of state, plus `NavbarDesktopDropdownMenu.test.tsx` asserting closed-by-default. (`71e2d91`)
- _Outlined H1 line unreadable over the Paladin._ Raised the `CrtWarp` bottom scrim from `h-1/2 via-ink/60` to `h-[85%] from-ink from-20% via-ink/85 via-75%`, still ink→transparent. The stroke width and the hero's layout were left alone. Confirmed at 390/768/1440. (`71e2d91`)

**Polish findings**

- Terminal traffic-light dots: `rounded-full` → `rounded-sm` (`Terminal.tsx`). (`71e2d91`)
- Contact seal: `top-[53%]` → `top-[56%]`; a pixel-scan of the 1440 capture puts the mark on the wax. (`71e2d91`)
- Bookshelf "Couldn't load the shelf": the sandbox has no Supabase egress, so the null branch renders. The branch itself is correct; the `harden` pass added the missing empty-shelf branch beside it. **Still unverified against a live shelf.**
- Home hero eyebrow over the hood: improved by the wider scrim but still the weakest text on the page — see the contrast note below.

**Impeccable passes**

- `typeset` (`7b0b9c5`) — `.eyebrow-text` had `line-height: 1`, so eyebrows that wrap at 390 collided; now `1.5`. Serif lede measure unified at `48ch` (home hero, get-in-touch, `PageHero`); notebook body given the `60ch` measure About already used.
- `animate` (`cfc992b`) — motion is now only scene drift, the CRT warp, hover transitions and the modal fade. Removed the bookshelf skeleton's `animate-pulse` (an indefinite loop that ignored `prefers-reduced-motion`) and the mobile nav's `transition-all` on a border change nothing else animates; hover transitions settled on `ease-out`. Verified reduced-motion: `.scene-drift` is inside `@media (prefers-reduced-motion: no-preference)`, and `CrtWarpCanvas` only re-arms `requestAnimationFrame` when `animate` is true, so it draws one frame and stops.
- `harden` (`57344a6`) — validation errors reached the form as booleans only, so a rejected field turned red without saying why. `TextField` now renders the message with `role='alert'` and `aria-describedby`; the textarea got the same; the zod copy moved into the site's voice and gained a real email-format check. A failed send was a dead end (the overlay never cleared) — it now offers "Back to the message", returning to the still-filled form. Added the bookshelf empty-shelf state. Tests: `TextField.test.tsx`, plus a retry case in `ContactFormMessage.test.tsx`.
- `audit` (`c079c66`) — Home was the only route without a `<main>` landmark and the mobile `<nav>` the only nav without a name; focus ring `outline-1` → `outline-2` (amber, the permitted exception); `TechStackCard` icon `alt='stack_icon'` → `alt=''`.

**Follow-up from the final pass** (`41678c3`) — at a real 390 viewport the contact letter sat straight behind the display line and the amber ex-libris landed on the headline. `Scene`'s bottom scrim deepened to `h-2/3 from-15% via-ink/80 via-70%` (matching the hero's treatment, still ink→transparent) and `ContactSeal` is now `hidden mobile:block`, so mobile contact carries zero amber, which "at most once per viewport" allows.

**Rejected / left alone**

- `parchment-mute` (`#4A4945`) as text is **2.18:1 on `ink` and 1.95:1 on `ink-2` — it fails WCAG AA everywhere it carries text**: eyebrows, form placeholders and labels, the terminal path, the footer meta and the avulso egg. Spec §4.1 pins both the hex and those exact roles, and `colors.test.ts` asserts the hex, so fixing it is a spec amendment, not a finishing pass. **This is the top open item for Felipe** — either darken the roles' background, move the text roles to `parchment-dim` (5.74:1) and keep `parchment-mute` for the square/dots/rules, or raise the token toward `#7E7C77` (≈4.7:1) and accept that it closes the gap to `parchment-dim`.
- Craft-floor bans on eyebrows and `01/02/03` section numbers: rejected — spec §4.4 mandates both, and the skill's own rule is that the committed world wins.
- Detector's `bounce-easing` hit on `ContactFormMessage.test.tsx:7`: false positive; the line is the assertion that `animate-bounce` is _absent_.
- `BookshelfBook.tsx` still carries Figma-export SVG `feGaussianBlur` inner shadows and an `rx='6'` clip. Both are invisible under the component's own `rounded-sm` + `overflow-hidden`, so nothing renders out of spec, but the markup is legacy and worth deleting in a later cleanup.

**WebGL observation.** Unchanged from Step 1 and confirmed after the fix: headless Chrome launched with `--disable-gpu` never gets a `webgl2` context, so `CrtWarp` stays on the static dithered `Scene` fallback and no capture in this task shows the warped canvas. The warp path is untested visually — check it in a real browser.

**Gates.** `pnpm test` 91 passed (31 files), `pnpm lint` 0 errors / 43 pre-existing warnings, `pnpm exec tsc --noEmit` clean, `pnpm build` clean (26 static routes). Against `pnpm start`: `/opengraph-image`, `/about/opengraph-image`, `/contact/opengraph-image` and `/twitter-image` all 200, as did all seven routes. Server stopped with `pkill -f next-server`.

**Still open for Felipe**

- The `parchment-mute` contrast decision above.
- Whether the contact seal should reappear at 390 in some other position, or stay desktop-only.
- The bookshelf loading/error/empty states have never been seen against a live Supabase shelf.

### Rulings

- R1: dropped `active` from every page-level `<Eyebrow>` (HomeHero '00', HomeSelectedWork '01', HomeGetToKnow '02', HomeGetInTouch '06', ProjectsContent '02') — the Global Constraint of exactly one amber element per viewport is binding and the plan's own tests assert it.
- R2: Task 6's test matches the three About eyebrow labels with regexes, not exact strings, because `Eyebrow` prefixes `01 — ` into the same text node.
- R3: Task 3's `CrtWarp` fallback renders `<Scene name drift={false} scrim='none' />` with no className override, so it fills the wrapper.
- R4: Task 3 keeps the static `Scene` mounted beneath the canvas until `CrtWarpCanvas` reports the first draw, matching the plan's Interfaces text rather than the code block's earlier immediate swap.
- R5: Task 11's metadata test may mock `@/styles/fonts` and `@/components/layout/RootLayout`, since the test asserts metadata only.
- R6: `PageHero` section classes follow the Task 2 Step 3 code block (the verbatim implementation), not the Interfaces summary, which had drifted.
- R7: where a brief's test asserts copy with a straight apostrophe, the rendered copy keeps the straight apostrophe (the test is the acceptance criterion); untested copy keeps `&rsquo;`.
- R8: the Equals9 project period stays `2021` as the brief wrote it — the résumé gives the job span, not per-project dates.
- R9: About block 03's last paragraph (embedding `<AboutResumeModal />`) renders as a `<div>` instead of a `<p>` so the `<dialog>` is valid flow content; copy unchanged.
- R10: `TechStackCard` drops `placeholder='blur'` and `quality={100}` from its `next/image`, since under Vitest the PNG import is a string and blur without a `blurDataURL` throws.
- R11: Task 14 is dispatched to subagents first (one for the screenshot checklist, one per Impeccable mode); it runs in the main session only if a subagent reports the `impeccable` skill unavailable to it.

### Deferred

- Task 1: `NAV_ALL` built by index into `NAV_PRIMARY`/`NAV_MORE` (plan-mandated) — an href lookup would be more robust.
- Task 1: `NavbarDesktopDropdownMenu`'s `contact` find + null guard for a structurally-present value (plan-mandated).
- Task 3: `CrtWarp` has no component-level test (mocked in `HomeHero.test`) — the R4 handoff is unguarded by tests.
- Task 3: `CrtWarp`'s `ready` state never resets when `name` changes (unreachable today — `HomeHero` passes a static name).
- Task 4: reviewer noted `TextField`'s `focus:border-amber` on `/projects` — by design (forms use amber focus); no action.
- Task 5: `HomeGetToKnowSection` test covers the happy path only (brief-mandated) — no token-class assertions.
- Task 6: `Block`/`Strong` local helpers could be shared across pages (plan-mandated structure).
- Task 8: `TechStackCard`'s `Image` `alt='stack_icon'` (pre-existing) — a decorative icon beside a visible name should be `alt=''`.
- Task 8: `TechStackCard` test doesn't cover the category-absent branch.
- Task 10: `ContactFormMessage` overlay covers the whole Terminal card including its header (pre-existing behaviour).
- Task 12: `tailwind.config.js` exposes `module.exports.rawConfig` for the test — cleaner would split the raw config into its own module.
- Task 12: prettier-plugin-tailwindcss reorders class tokens on commit — exact-string class requirements are order-insensitive in this repo.

### Still waiting on Felipe

- Project metrics, to fill `call`/`result` in `src/configs/works.ts` — only Zeus Agrotech has them today ("New-feature development time down by up to 50%").
- Real Equals URLs — `url` was removed from the three Equals projects (EqualsVenue, EqualsSport, Equals9); their cards show no "Visit site" link until real URLs land.
- Social handle for metadata/OG — `felipemateus` vs `felipe-mateus` is still undecided.

### LFS / push notes

- `.husky/pre-push` runs `git lfs pre-push "$@"`.
- `art/**` is Git LFS-tracked.
- Run `git gc --prune=now` after the first push.
