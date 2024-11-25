'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CodeEditor from '@/components/code-editor'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useInterview } from '@/hooks/use-interview'
import { useSocket } from '@/contexts/socket-context'

const question = {
  title: 'Array Chunker',
  description:
    'Write a function that takes an array of integers and an integer as input, and returns a new array of arrays, where each inner array has a maximum length of the input integer.',
  examples: [
    {
      input: [[1, 2, 3, 4, 5], 2],
      output: [[1, 2], [3, 4], [5]],
      explanation:
        'The function takes the array [1, 2, 3, 4, 5] and the integer 2, and returns a new array of arrays, where each inner array has a maximum length of 2.',
    },
    {
      input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3],
      output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
      explanation:
        'The function takes the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and the integer 3, and returns a new array of arrays, where each inner array has a maximum length of 3.',
    },
    {
      input: [[], 5],
      output: [],
      explanation:
        'The function takes an empty array and the integer 5, and returns an empty array because there is nothing to chunk.',
    },
  ],
  constraints: [
    'The input array can be any length, including empty.',
    'The input integer will always be a positive integer.',
  ],
}

export default function Home() {
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get('token')
  const { isConnected } = useSocket()
  const { startInterview, currentQuestion } = useInterview()

  useEffect(() => {
    if (invitationToken && isConnected) {
      // startInterview(invitationToken)
    }
  }, [invitationToken, isConnected])

  if (!invitationToken) {
    return <div>Invalid interview token</div>
  }

  return (
    <main className='flex h-screen bg-zinc-950'>
      {/* Coding Problem Section */}
      <div className='flex-none w-full max-w-[600px] border-r border-zinc-800 bg-zinc-900'>
        <div className='px-6 py-4 border-b border-zinc-800'>
          {/* <h1 className='text-xl font-semibold text-zinc-50'>
            Coding Exercise
          </h1>
          <div className='flex items-center gap-3 mt-4'>
            <Progress value={66} className='w-[85%] h-2' />
            <p className='text-sm text-zinc-400'>2/3</p>
          </div> */}
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold text-zinc-50'>
              Coding Exercise
            </h1>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <span className='text-indigo-400'>2</span>
              <span className='text-zinc-600'>/</span>
              <span className='text-zinc-400'>3</span>
            </div>
          </div>
          <div className='mt-4'>
            <Progress value={66} className='h-1.5' />
          </div>

        </div>

        <ScrollArea className='h-[calc(100vh-100px)] w-full'>
          <div className='flex flex-col gap-8 p-6'>
            {/* Description Section */}
            <p className='text-zinc-300 leading-relaxed'>
                {question?.description}
            </p>
            

            {/* Examples Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-zinc-50'>Examples:</h3>
              <div className='space-y-4'>
                {question.examples.map((example, index) => (
                  <div
                    key={index}
                    className='bg-zinc-800/50 rounded-lg p-4 space-y-3'
                  >
                    <div className='font-mono text-sm'>
                      <p className='text-zinc-300'>
                        <span className='font-medium text-zinc-100 mr-2'>
                          Input:
                        </span>
                        <code className='bg-zinc-800 px-1.5 py-0.5 rounded'>{JSON.stringify(example.input)}</code>
                      </p>
                      <p className='text-zinc-300 mt-1'>
                        <span className='font-medium text-zinc-100 mr-2'>
                          Output:
                        </span>
                        <code className='bg-zinc-800 px-1.5 py-0.5 rounded'>{JSON.stringify(example.output)}</code>
                      </p>
                    </div>
                    <p className='text-zinc-400 text-sm'>
                      <span className='font-medium text-zinc-200 mr-2'>
                        Explanation:
                      </span>
                      {example.explanation
                        .split('. ')
                        .map((sentence, i, arr) => (
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

            {/* Constraints Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-zinc-50'>
                Constraints:
              </h3>
              <ul className='list-disc list-inside space-y-2 text-zinc-400 text-sm'>
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Code Editor Section */}
      <div className='flex-auto p-4 bg-zinc-950'>
        <CodeEditor />
      </div>
    </main>
  )
}
