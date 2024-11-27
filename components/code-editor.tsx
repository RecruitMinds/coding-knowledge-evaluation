'use client'

import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Mic, SquareTerminal } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Button } from './ui/button'
import { useInterview } from '@/hooks/use-interview'

interface Message {
  type: 'question' | 'answer'
  text: string
}

const CodeEditor = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const { submitSolution, followUpQuestion, submitFollowUpAnswer } =
    useInterview()

  const handleRunCode = () => {
    // Implement code running logic if needed
  }

  const handleSubmit = () => {
    submitSolution(code)
  }

  useEffect(() => {
    if (followUpQuestion) {
      setMessages(prev => [
        ...prev,
        {
          type: 'question',
          text: followUpQuestion
        }
      ])
      // Start speech synthesis
      const utterance = new SpeechSynthesisUtterance(followUpQuestion)
      window.speechSynthesis.speak(utterance)
      // Auto-start recording after question
      setTimeout(() => setIsRecording(true), 1000)
    }
  }, [followUpQuestion])

  const handleAnswerComplete = (answer: string) => {
    setMessages(prev => [
      ...prev,
      {
        type: 'answer',
        text: answer
      }
    ])
    submitFollowUpAnswer(answer)
    setTranscript('')
    setIsRecording(false)
  }

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900'>
      {/* Topbar */}
      <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-3'>
        <Select
          defaultValue='javascript'
          onValueChange={value => setLanguage(value)}
        >
          <SelectTrigger className='w-40 border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800/80'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent className='border-zinc-800 bg-zinc-900 text-zinc-200'>
            <SelectGroup>
              <SelectItem value='c++' className='hover:bg-zinc-800'>
                C++
              </SelectItem>
              <SelectItem value='c#' className='hover:bg-zinc-800'>
                C#
              </SelectItem>
              <SelectItem value='java' className='hover:bg-zinc-800'>
                Java
              </SelectItem>
              <SelectItem value='javascript' className='hover:bg-zinc-800'>
                JavaScript
              </SelectItem>
              <SelectItem value='python' className='hover:bg-zinc-800'>
                Python
              </SelectItem>
              <SelectItem value='typescript' className='hover:bg-zinc-800'>
                TypeScript
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className='flex items-center gap-3'>
          <Button
            size='sm'
            variant='outline'
            className='border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50'
            onClick={handleRunCode}
          >
            Run Code
          </Button>
          <Button
            size='sm'
            className='bg-indigo-600 text-white hover:bg-indigo-700'
            onClick={handleSubmit}
          >
            Submit Solution
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className='relative flex-1 overflow-hidden border-y border-zinc-800'>
        <Editor
          defaultLanguage={language}
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

      {/* Output and Follow-up Section */}
      <div className='grid h-2/5 grid-cols-5 bg-zinc-900'>
        {/* Console Column */}
        <div className='col-span-3 flex flex-col border-r border-zinc-800'>
          <div className='border-b border-zinc-800 px-4 py-2'>
            <ToggleGroup
              type='single'
              size='sm'
              defaultValue='console'
              className='justify-start'
            >
              <ToggleGroupItem
                value='console'
                className='gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 hover:bg-zinc-800 data-[state=on]:bg-zinc-800 data-[state=on]:text-zinc-50'
              >
                <SquareTerminal className='h-4 w-4' />
                Console
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className='mx-4 my-4 flex-1 rounded-lg bg-zinc-800/50 p-4 font-mono text-sm text-zinc-400'>
            {output || 'No output yet'}
          </div>
        </div>

        {/* Transcript Column */}
        <div className='col-span-2 flex flex-col'>
          <div className='border-b border-zinc-800 px-4 py-3.5'>
            <h3 className='text-sm font-medium text-zinc-200'>Transcript</h3>
          </div>
          <div className='flex flex-1 flex-col'>
            <div className='flex-1 overflow-y-auto'>
              <div className='space-y-4 p-4'>
                {messages.length === 0 ? (
                  <p className='text-center text-sm text-zinc-500'>
                    No transcription
                  </p>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        message.type === 'question'
                          ? 'items-start'
                          : 'items-end'
                      }`}
                    >
                      <div
                        className={`max-w-[90%] rounded-lg p-3 text-sm ${
                          message.type === 'question'
                            ? 'bg-zinc-800 text-zinc-200'
                            : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className='border-t border-zinc-800 p-4'>
              <div className='mb-3 flex items-center justify-between'>
                <span className='text-sm text-zinc-400'>
                  {followUpQuestion ? 'Answer the question' : 'Ready to answer'}
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`gap-2 ${
                    isRecording
                      ? 'text-red-400 hover:text-red-500'
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className='h-4 w-4' />
                  {isRecording ? 'Stop' : 'Start'} Recording
                </Button>
              </div>

              {isRecording && (
                <div className='rounded-lg bg-zinc-800/50 p-3'>
                  <p className='text-sm text-zinc-300'>
                    {transcript || 'Listening...'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
