'use client'

import { Question } from '@/types'
import { ScrollArea } from '../ui/scroll-area'

interface QuestionContentProps {
  question: Question
}

const QuestionContent = ({ question }: QuestionContentProps) => {
  return (
    <ScrollArea className='h-[calc(100vh-100px)] w-full'>
      <div className='flex flex-col gap-8 p-6'>
        <p className='leading-relaxed text-zinc-300'>{question.description}</p>

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-zinc-50'>Examples:</h3>
          <div className='space-y-4'>
            {question.examples.map((example, index) => (
              <div
                key={index}
                className='space-y-3 rounded-lg bg-zinc-800/50 p-4'
              >
                <div className='font-mono text-sm'>
                  <p className='text-zinc-300'>
                    <span className='mr-2 font-medium text-zinc-100'>
                      Input:
                    </span>
                    <code className='rounded bg-zinc-800 px-1.5 py-0.5'>
                      {JSON.stringify(example.input)}
                    </code>
                  </p>
                  <p className='mt-1 text-zinc-300'>
                    <span className='mr-2 font-medium text-zinc-100'>
                      Output:
                    </span>
                    <code className='rounded bg-zinc-800 px-1.5 py-0.5'>
                      {JSON.stringify(example.output)}
                    </code>
                  </p>
                </div>
                <p className='text-sm text-zinc-400'>
                  <span className='mr-2 font-medium text-zinc-200'>
                    Explanation:
                  </span>
                  {example.explanation.split('. ').map((sentence, i, arr) => (
                    <span key={i}>
                      {sentence}
                      {i < arr.length - 1 ? '.' : ''}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-zinc-50'>Constraints:</h3>
          <ul className='list-inside list-disc space-y-2 text-sm text-zinc-400'>
            {question.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollArea>
  )
}

export default QuestionContent
