'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { languages } from '@/constants'

interface LanguageSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

const LanguageSelector = ({ value, onValueChange }: LanguageSelectorProps) => {
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className='w-44 border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800/80'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent className='max-h-64 border-zinc-800 bg-zinc-900 text-zinc-200'>
        <SelectGroup>
          {languages.map(({ name, version }) => (
            <SelectItem
              key={name}
              value={name}
              className='py-2 hover:bg-zinc-800'
            >
              {name} ({version})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelector
