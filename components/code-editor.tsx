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
    <div className='flex flex-col h-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900'>
      {/* Topbar */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-zinc-800'>
        <Select
          defaultValue='javascript'
          onValueChange={(value) => setLanguage(value)}
        >
          <SelectTrigger className='w-40 border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800/80'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent className='border-zinc-800 bg-zinc-900 text-zinc-200'>
            <SelectGroup>
              <SelectItem value='c++' className='hover:bg-zinc-800'>C++</SelectItem>
              <SelectItem value='c#' className='hover:bg-zinc-800'>C#</SelectItem>
              <SelectItem value='java' className='hover:bg-zinc-800'>Java</SelectItem>
              <SelectItem value='javascript' className='hover:bg-zinc-800'>JavaScript</SelectItem>
              <SelectItem value='python' className='hover:bg-zinc-800'>Python</SelectItem>
              <SelectItem value='typescript' className='hover:bg-zinc-800'>TypeScript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className='flex items-center gap-3'>
          <Button size='sm' variant='outline' className='border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50'  onClick={handleRunCode}>
            Run Code
          </Button>
          <Button size='sm' className='text-white  bg-indigo-600 hover:bg-indigo-700' onClick={handleSubmit}>
            Submit Solution
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className='flex-1 overflow-hidden border-y border-zinc-800'>
        <Editor
          defaultLanguage={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme='vs-dark'
          options={{
            fontSize: 14,
            lineHeight: 1.6,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            fontFamily: 'JetBrains Mono, monospace',
            fontLigatures: true,
            renderLineHighlight: 'all',
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </div>

      {/* Output */}
      <div className='flex flex-col gap-2 bg-zinc-900 h-2/5'>
        <div className='flex items-start px-4 py-2 border-b border-zinc-800'>
          <ToggleGroup type='single' size='sm' defaultValue='console'>
            <ToggleGroupItem value='console' className='gap-1.5 text-sm px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 data-[state=on]:bg-zinc-800 data-[state=on]:text-zinc-50'>
              <SquareTerminal className='h-4 w-4' />
              Console
            </ToggleGroupItem>
            <ToggleGroupItem value='input' className='gap-1.5 text-sm px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 data-[state=on]:bg-zinc-800 data-[state=on]:text-zinc-50'>
              <CodeXml className='h-4 w-4' />
              Test Cases
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className='flex-1 mx-4 mb-4 rounded-lg bg-zinc-800/50 font-mono text-sm p-4 overflow-auto'></div>
      </div>
    </div>
  )
}

export default CodeEditor
