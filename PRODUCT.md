# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** founders and product decision-makers evaluating whether Felipe can solve a product/business problem for them — as a contractor, freelancer, or senior hire. They arrive from LinkedIn, X, YouTube, or a referral, usually on a phone or laptop between other tasks, and decide in under a minute whether to start a conversation.

**Secondary:** recruiters and hiring managers running a conventional process. They need the résumé and LinkedIn within one click and a fast read of seniority and stack.

Copy speaks to the primary audience; the secondary audience is never more than one click from the résumé.

## Product Purpose

Personal portfolio at `felipe-mateus.com`. It exists to turn a visit into a conversation with someone who has a product problem worth paying to solve. Success: the visitor understands within one viewport who Felipe is and how he thinks, and reaches out (`/contact`) or opens the résumé.

## Positioning

> Front-end engineer who thinks like a product owner.

Felipe solves problems, finds bottlenecks, and makes decisions looking at the product, the company, and where the company is right now — to ship quality that translates into revenue. Developer + entrepreneur, not "code expert". A neighboring front-end portfolio can copy the stack list; it cannot truthfully copy the pattern of _decisions taken and what they moved_, which is what this site foregrounds.

## Operating Context

- Felipe is based in Uberlândia, MG, Brazil; ~5 years in front-end (2021–present), preceded by ~5 years in IT. Career started at a technical high-school course in computing.
- Works with early-stage startups, frequently alongside founders, often owning the front-end foundation from zero (e.g. Pigmo, 2023–present).
- Site is a Next.js 16 / React 19 app deployed on Vercel. Contact form sends via Resend; Bookshelf reads a Supabase table.
- Routes: Home, About, Projects, Contact, Bookshelf, Tech Stack, Notebook. Information architecture is not changing in the rebrand.
- Language: English. Bilingual (`/pt`) is declared in metadata but not implemented — backlog, not part of current work.

## Capabilities and Constraints

- Dark-only. No light theme.
- Résumé content (`src/constants/resume.ts`) and About facts are truth; only tone/framing may change.
- Navigation labels stay literal (About, Projects, Bookshelf, Notebook, Tech Stack, Contact).
- Contact form fields: name, email, subject, message (≤ 1500 chars). Behavior stays.
- Terminology: "the call" = a decision Felipe took on a project; "the result" = its measurable consequence.
- **Undecided:** which handle the social accounts consolidate under (`felipemateus` vs `felipe-mateus`); the year for the "avulso" easter egg.

## Brand Commitments

- Brand name is **Felipe Mateus**. "Avulso" (nickname since technical school) and the old `[f]` monogram survive only as easter eggs, never as brand.
- Voice: outcomes and decisions over stack; judgment verbs (_decide, cut, prioritize, measure, unblock_); numbers wherever real; no startup clichés; first person, opinionated. Two registers: monospace "system voice" labels and display/serif "human voice".
- Personality gate: **critical, curious, direct.**
- Binding visual direction (approved spec, `docs/superpowers/specs/2026-09-07-brand-identity-design.md`): 1-bit dithered engraving universe with a fictional alter-ego (the Scribe), monochrome + single amber accent, FM ex-libris mark, CRT effect on the home hero only. References in `docs/references/`.
- Illustrations are AI-generated (Higgsfield) and processed through a code dither pipeline; commissioned art may replace them later.

## Evidence on Hand

- Résumé with four positions and achievement bullets, some already quantified (e.g. "reduced new-feature development time by up to 50%" at Zeus Agrotech): `src/constants/resume.ts`.
- **Felipe has real project numbers (metrics, revenue impact, time saved) not yet in the repo** — he will supply them; copy must use only these, never invented figures.
- Projects listed in `src/configs/works.ts`: Pigmo, Zeus Agrotech portal, Redux Store, Pepy The Platypus, EqualsVenue, EqualsSport, Equals9. Note: the three Equals entries currently point at a wrong URL (`flow-ai-oficial.vercel.app`) — fix during Phase B, do not ship.
- Screenshots of projects in `public/assets/*-screenshot.*`.
- Photos of Felipe in `public/assets/felipe_*.jpg`, `me*.jpg/png`; signature `white_signature.png`. Not used as brand imagery in the rebrand (the character is fictional), but available for About/résumé.
- Bookshelf: real reading list (10 books, covers in `public/books/`) served from Supabase.
- Tech Stack: 17 tools in `src/configs/tools.ts`, plus hardware/apps/games lists.
- **Notebook content is placeholder** (generic titles like "The Dawn of Innovation"). No real notes exist yet; do not present placeholder notes as real.
- No testimonials, client quotes, or press. Do not fabricate.
- Social: LinkedIn, X, GitHub, Instagram, Discord, YouTube (`src/constants/social.ts`).

## Product Principles

1. **Lead with the decision, not the deliverable.** Every project and every section shows what was decided and what it moved before it shows what was built.
2. **A number beats an adjective.** Where a real figure exists, it replaces the claim. Where none exists, the claim stays qualitative and honest.
3. **One click to the résumé, always.** The secondary audience is served without diluting the primary message.
4. **Facts are fixed; framing is free.** Résumé, project list, and contact behavior are truth; tone, hierarchy, and visual world can change around them.
5. **The character is atmosphere, not allegory.** The Scribe carries the visual identity; positioning lives in the copy.

## Accessibility & Inclusion

- Text over dithered scenes must meet WCAG AA contrast (scrim required).
- All dither/CRT motion disabled under `prefers-reduced-motion`; WebGL effects have static fallbacks.
- Decorative scenes are `aria-hidden`; no information is carried only by the amber accent.
