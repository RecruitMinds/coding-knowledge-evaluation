'use client'

import { useState } from 'react'
import { Editor } from '@monaco-editor/react'

import { useInterview } from '@/hooks/use-interview'

import EditorActions from './editor-actions'
import LanguageSelector from './language-selector'

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
    <>
      <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-3'>
        <LanguageSelector value={language} onValueChange={setLanguage} />
        <EditorActions onRun={handleRunCode} onSubmit={handleSubmit} />
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
    </>
  )
}

export default CodeEditor
