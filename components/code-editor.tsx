'use client'

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { SquareTerminal, CodeXml } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Button } from './ui/button'
import { useInterview } from '@/hooks/use-interview'

const CodeEditor = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')

  const { submitSolution } = useInterview()

  const handleRunCode = () => {
    // Implement code running logic if needed
  }

  const handleSubmit = () => {
    submitSolution(code)
  }

  return (
    <div className='flex flex-col h-full text-white rounded-md overflow-hidden bg-zinc-600'>
      {/* Topbar */}
      <div className='flex items-center justify-between px-3 py-2 bg-zinc-700'>
        <Select
          defaultValue='javascript'
          onValueChange={(value) => setLanguage(value)}
        >
          <SelectTrigger className='max-w-32'>
            <SelectValue placeholder='Language' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='c++'>C++</SelectItem>
              <SelectItem value='c#'>C#</SelectItem>
              <SelectItem value='java'>Java</SelectItem>
              <SelectItem value='javascript'>JavaScript</SelectItem>
              <SelectItem value='python'>Python</SelectItem>
              <SelectItem value='typescript'>TypeScript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className='flex items-center gap-2'>
          <Button size='sm' className='bg-zinc-800' onClick={handleRunCode}>
            Run
          </Button>
          <Button size='sm' className='bg-green-800' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className='h-full overflow-hidden'>
        <Editor
          defaultLanguage={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme='vs-dark'
        />
      </div>

      {/* Output */}
      <div className='flex flex-col gap-2 bg-zinc-700 h-3/5 px-3 py-2'>
        <div className='flex items-start'>
          <ToggleGroup type='single' size='sm' defaultValue='console'>
            <ToggleGroupItem value='console' className='gap-1'>
              <SquareTerminal className='h-4 w-4' />
              Console
            </ToggleGroupItem>
            <ToggleGroupItem value='input' className='gap-1'>
              <CodeXml className='h-4 w-4' />
              input
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className='h-full bg-zinc-800/60 rounded-md'></div>
      </div>
    </div>
  )
}

export default CodeEditor
