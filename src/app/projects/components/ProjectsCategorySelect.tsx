import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

export type ProjectsCategorySelectOption = {
  label: string
  value: string
}

export type ProjectsCategorySelectProps = {
  options: ProjectsCategorySelectOption[]
}

const ProjectsCategorySelect: React.FC<ProjectsCategorySelectProps> = ({
  options,
}) => {
  return (
    <Select>
      <SelectTrigger className='w-[172px] rounded-r-4xl'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>

      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ProjectsCategorySelect
