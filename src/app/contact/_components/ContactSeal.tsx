import ExLibris from '@/assets/ExLibris'

/** Amber ex-libris stamped on the blank wax seal of the contact-letter scene. */
const ContactSeal: React.FC = () => (
  <ExLibris
    mark='halo'
    aria-hidden='true'
    className='pointer-events-none absolute left-[49%] top-[56%] hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-amber mobile:block mobile:h-24 mobile:w-24'
  />
)

export default ContactSeal
