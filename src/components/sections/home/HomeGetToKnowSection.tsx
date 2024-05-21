'use client'

import { motion } from 'framer-motion'

import Widget from './HomeWidget'

export default function HomeGetToKnowSection() {
  return (
    <>
      <h2 className='mb-8 header'>Get to know me</h2>
      <ul className='mb-[6.75rem] grid grid-cols-1 gap-4 tablet:grid-cols-2'>
        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Widget
            href='/about'
            title='About me'
            subtitle='Who I am and what I do'
            imgSrc='/assets/about-me.png'
            imgClassName='object-contain mobile:object-cover'
          />
        </motion.li>

        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Widget
            href='/notebook'
            title='Notebook'
            subtitle='My thoughts, insights, and reflections'
            imgSrc='/assets/notebook.png'
            imgClassName='object-contain mobile:object-cover'
          />
        </motion.li>

        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Widget
            href='/bookshelf'
            title='Bookshelf'
            subtitle="Books and pieces of wisdom I've enjoyed reading"
            imgSrc='/assets/bookshelf.png'
            imgClassName='object-cover'
          />
        </motion.li>

        <motion.li
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Widget
            href='/tech-stack'
            title='Tech Stack'
            subtitle='The dev tools, apps, devices, and games I use and play.'
            imgSrc='/assets/tech-stack.png'
            imgClassName='object-cover object-left'
          />
        </motion.li>
      </ul>
    </>
  )
}
