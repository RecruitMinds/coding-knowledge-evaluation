'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface LanguageSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

const LanguageSelector = ({ value, onValueChange }: LanguageSelectorProps) => {
  const languages = [
    { value: 'c++', label: 'C++' },
    { value: 'c#', label: 'C#' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'typescript', label: 'TypeScript' }
  ]

  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className='w-40 border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800/80'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent className='border-zinc-800 bg-zinc-900 text-zinc-200'>
        <SelectGroup>
          {languages.map(({ value, label }) => (
            <SelectItem key={value} value={value} className='hover:bg-zinc-800'>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelector
