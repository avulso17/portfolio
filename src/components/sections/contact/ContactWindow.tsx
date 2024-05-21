'use client'

import { motion } from 'framer-motion'
import MacOSControlBar from './ContactMacOSControlBar'
import Form from './ContactNewMessageForm'

export default function ContactWindow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: '-35deg' }}
      animate={{ opacity: 1, y: 0, rotateX: '0deg' }}
      transition={{ ease: 'easeIn' }}
      className='relative flex w-full flex-col overflow-hidden rounded-xl border border-card-border bg-onyx pb-5'
    >
      <MacOSControlBar />
      <Form />
    </motion.div>
  )
}
