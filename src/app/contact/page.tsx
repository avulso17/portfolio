import { Header } from '@/components/Header'
import ContactNewMessageForm from '@/sections/contact/ContactNewMessageForm'
import ContactSocialButtonGroup from '@/sections/contact/ContactSocialButtonGroup'
import ContactWindow from '@/sections/contact/ContactWindow'

export default function ContactPage() {
  return (
    <main className='w-full'>
      <Header
        title='Get in touch'
        subtitle='Let&rsquo;s build something awesome.'
      />

      <div className='mb-20 mt-8 w-full mobile:mt-16'>
        <ContactWindow>
          <ContactNewMessageForm />
        </ContactWindow>

        <ContactSocialButtonGroup />
      </div>
    </main>
  )
}
