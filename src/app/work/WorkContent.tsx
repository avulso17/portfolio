'use client'

import { TextField } from '@/components/ui/TextField'
import { works } from '@/configs/works'
import { useCallback, useEffect, useState } from 'react'
import CardStack from './WorkCardStack'

export default function WorkContent() {
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState(works)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  const filterProjects = useCallback(() => {
    const lowerSearch = search.trim().toLowerCase()

    if (lowerSearch !== '') {
      const filteredProjects = works.filter((item) =>
        item.title.toLowerCase().includes(lowerSearch)
      )

      setProjects(filteredProjects)
    } else {
      setProjects(works)
    }
  }, [search])

  useEffect(() => {
    let interval = setTimeout(() => filterProjects(), 500)

    return () => {
      clearTimeout(interval)
    }
  }, [filterProjects, search])

  return (
    <div className='flex flex-col gap-8 pb-28 pt-16'>
      <div className='flex grow items-center gap-4'>
        <TextField
          className='grow'
          label='Search:'
          placeholder='Search projects...'
          variant='outlined'
          value={search}
          onChange={handleSearch}
        />
      </div>

      <CardStack items={projects} />
    </div>
  )
}
