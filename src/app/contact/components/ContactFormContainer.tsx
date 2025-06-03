'use client'

import { motion } from 'framer-motion'
import ContactControlBar from './ContactControlBar'
import ContactForm from './ContactForm'

const ContactFormContainer: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: '-35deg' }}
      animate={{ opacity: 1, y: 0, rotateX: '0deg' }}
      transition={{ ease: 'easeIn' }}
      className='relative flex w-full flex-col overflow-hidden rounded-xl border border-card-border bg-onyx pb-5'
    >
      <ContactControlBar />
      <ContactForm />
    </motion.div>
  )
}

export default ContactFormContainer
