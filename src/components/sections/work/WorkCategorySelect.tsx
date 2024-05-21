import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

export type WorkCategorySelectOption = {
  label: string
  value: string
}

export type WorkCategorySelectProps = {
  options: WorkCategorySelectOption[]
}

export default function WorkCategorySelect({
  options,
}: WorkCategorySelectProps) {
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
