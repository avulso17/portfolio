'use client'

import { Eyebrow } from '@/components/ui/Eyebrow'
import { TextField } from '@/components/ui/TextField'
import { works } from '@/configs/works'
import { useCallback, useEffect, useState } from 'react'
import CardStack from './ProjectsCardStack'

const ProjectsContent: React.FC = () => {
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
    const interval = setTimeout(() => filterProjects(), 500)

    return () => {
      clearTimeout(interval)
    }
  }, [filterProjects, search])

  return (
    <div className='flex flex-col gap-8 pb-28 pt-12'>
      <Eyebrow as='h2' index='02'>
        All projects
      </Eyebrow>
      <div className='flex grow items-center gap-4'>
        <TextField
          className='grow'
          label='Search'
          placeholder='Filter by name…'
          value={search}
          onChange={handleSearch}
        />
      </div>

      <CardStack items={projects} />
    </div>
  )
}

export default ProjectsContent
