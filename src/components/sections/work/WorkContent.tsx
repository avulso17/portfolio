'use client'

import { useCallback, useEffect, useState } from 'react'

import Input from '@/components/ui/Input'
import { works } from '@/configs/works'
import CardStack from './WorkCardStack'
import CategorySelect from './WorkCategorySelect'

export default function WorkContent() {
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState(works)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  const filterProjects = useCallback(() => {
    const lowerSearch = search.trim().toLocaleLowerCase()

    if (lowerSearch !== '') {
      const filteredProjects = works.filter((item) =>
        item.title.toLocaleLowerCase().includes(lowerSearch)
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
        <Input
          className='grow rounded-r-lg'
          placeholder='Search projects...'
          variant='outlined'
          value={search}
          onChange={handleSearch}
        />

        <CategorySelect />
      </div>
      {/* <TextField className='bg-red' placeholder='Search projects...' /> */}

      <CardStack items={projects} />
    </div>
  )
}
