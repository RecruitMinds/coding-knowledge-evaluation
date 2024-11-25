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
    <main className='flex h-screen'>
      {/* Coding Problem Section */}
      <div className='flex-none w-full max-w-[554px] border-r py-6 pl-4'>
        <h1 className='mb-3 text-xl font-bold leading-8'>
          Coding Exercise
        </h1>
        <div className='flex items-center gap-3 mb-6'>
          <Progress value={66} className='w-[85%] h-4' />
          <p>2/3</p>
        </div>

        <ScrollArea className='h-[87vh] w-full pr-4'>
          <div className='flex flex-col gap-6 p-2'>
            {/* Description Section */}
            <p className='text-slate-700 leading-relaxed'>
                {question?.description}
            </p>
            

            {/* Examples Section */}
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-slate-900'>Examples:</h3>
              <div className='space-y-6'>
                {question.examples.map((example, index) => (
                  <div
                    key={index}
                    className='bg-slate-50 rounded-lg p-4 space-y-2'
                  >
                    <div className='font-mono'>
                      <p className='text-slate-600'>
                        <span className='font-medium text-slate-700 mr-1'>
                          Input:
                        </span>
                        <code>{JSON.stringify(example.input)}</code>
                      </p>
                      <p className='text-slate-600'>
                        <span className='font-medium text-slate-700 mr-1'>
                          Output:
                        </span>
                        <code>{JSON.stringify(example.output)}</code>
                      </p>
                    </div>
                    <p className='text-slate-600'>
                      <span className='font-medium text-slate-700 mr-1'>
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
              <h3 className='text-lg font-medium text-slate-900'>
                Constraints:
              </h3>
              <ul className='list-disc list-inside space-y-2 text-slate-700'>
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Code Editor Section */}
      <div className='flex-auto p-2'>
        <CodeEditor />
      </div>
    </main>
  )
}
