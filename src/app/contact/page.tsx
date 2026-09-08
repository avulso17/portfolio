import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHero } from '@/components/ui/PageHero'
import { Metadata } from 'next'
import ContactFormContainer from './_components/ContactFormContainer'
import ContactSeal from './_components/ContactSeal'
import ContactSocialButtonGroup from './_components/ContactSocialButtonGroup'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Tell me what's stuck — a bottleneck, a roadmap that doesn't add up, a front-end that isn't paying for itself.",
  openGraph: {
    title: 'Contact',
    description:
      "Tell me what's stuck — a bottleneck, a roadmap that doesn't add up, a front-end that isn't paying for itself.",
  },
  twitter: {
    title: 'Contact',
    description:
      "Tell me what's stuck — a bottleneck, a roadmap that doesn't add up, a front-end that isn't paying for itself.",
  },
}

const ContactPage: React.FC = () => {
  return (
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
  )
}

export default ContactPage
