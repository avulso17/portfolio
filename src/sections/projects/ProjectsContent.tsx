'use client'
import Input from '@/components/Input'
import { works } from '@/configs/works'
import { useCallback, useEffect, useState } from 'react'
import ProjectsCardStack from './ProjectsCardStack'
import Select from './ProjectsFilterByCategory'

export default function ProjectsContent() {
  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState(works.projects)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  const filterProjects = useCallback(() => {
    const lowerSearch = search.trim().toLocaleLowerCase()

    if (lowerSearch !== '') {
      const filteredProjects = works.projects.filter((item) =>
        item.title.toLocaleLowerCase().includes(lowerSearch)
      )

      setProjects(filteredProjects)
    } else {
      setProjects(works.projects)
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

        <Select />
      </div>
      {/* <TextField className='bg-red' placeholder='Search projects...' /> */}

      <ProjectsCardStack items={projects} />
    </div>
  )
}
