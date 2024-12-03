'use client'

import { useState } from 'react'
import { Editor } from '@monaco-editor/react'

import { useInterview } from '@/hooks/use-interview'

import EditorActions from './editor-actions'
import LanguageSelector from './language-selector'
import ConsoleOutput from './console-output'
import { languages } from '@/constants'
import { executeCode } from '@/actions/code-execution'

const CodeEditor = () => {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [language, setLanguage] = useState('javascript')
  const [isLoading, setIsLoading] = useState(false)
  const { submitSolution } = useInterview()

  const handleRunCode = async () => {
    try {
      setIsLoading(true)
      const res = await executeCode(language, code)

      setIsLoading(false)
      setOutput(res.split('\n'))
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = () => {
    setOutput([])
    submitSolution(code)
  }

  return (
    <div className='flex h-full flex-col overflow-hidden border-x border-zinc-800 bg-zinc-900'>
      <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-3'>
        <LanguageSelector value={language} onValueChange={setLanguage} />
        <EditorActions
          onRun={handleRunCode}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      <div className='relative flex-1 overflow-hidden border-y border-zinc-800'>
        <Editor
          language={language}
          value={code}
          onChange={value => setCode(value || '')}
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
            automaticLayout: true
          }}
          className='absolute h-full w-full'
        />
      </div>

      <div className='flex h-2/5 bg-zinc-900'>
        <ConsoleOutput output={output} />
      </div>
    </div>
  )
}

export default CodeEditor
