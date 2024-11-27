'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CodeEditor from '@/components/code-editor'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useInterview } from '@/hooks/use-interview'
import { useSocket } from '@/contexts/socket-context'

// const questionIndex = 0
// const currentQuestion = {
//   title: 'Array Chunker',
//   description:
//     'Write a function that takes an array of integers and an integer as input, and returns a new array of arrays, where each inner array has a maximum length of the input integer.',
//   examples: [
//     {
//       input: [[1, 2, 3, 4, 5], 2],
//       output: [[1, 2], [3, 4], [5]],
//       explanation:
//         'The function takes the array [1, 2, 3, 4, 5] and the integer 2, and returns a new array of arrays, where each inner array has a maximum length of 2.'
//     },
//     {
//       input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3],
//       output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
//       explanation:
//         'The function takes the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and the integer 3, and returns a new array of arrays, where each inner array has a maximum length of 3.'
//     },
//     {
//       input: [[], 5],
//       output: [],
//       explanation:
//         'The function takes an empty array and the integer 5, and returns an empty array because there is nothing to chunk.'
//     }
//   ],
//   constraints: [
//     'The input array can be any length, including empty.',
//     'The input integer will always be a positive integer.'
//   ]
// }

export default function Home() {
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get('token')
  const { isConnected } = useSocket()
  const { startInterview, currentQuestion, questionIndex } = useInterview()

  useEffect(() => {
    if (invitationToken && isConnected) {
      startInterview(invitationToken)
    }
  }, [invitationToken, isConnected])

  if (!invitationToken) {
    return <div>Invalid interview token</div>
  }

  return (
    <main className='flex h-screen bg-zinc-950'>
      {/* Coding Problem Section */}
      <div className='w-full max-w-[400px] flex-none border-r border-zinc-800 bg-zinc-900 lg:max-w-[500px] 2xl:max-w-[600px]'>
        <div className='border-b border-zinc-800 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold text-zinc-50'>
              Coding Exercise
            </h1>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <span className='text-indigo-400'>{questionIndex + 1}</span>
              <span className='text-zinc-600'>/</span>
              <span className='text-zinc-400'>3</span>
            </div>
          </div>
          <div className='mt-4'>
            <Progress
              value={((questionIndex + 1) / 3) * 100}
              className='h-1.5'
            />
          </div>
        </div>

        <ScrollArea className='h-[calc(100vh-100px)] w-full'>
          {currentQuestion && (
            <div className='flex flex-col gap-8 p-6'>
              {/* Description Section */}
              <p className='leading-relaxed text-zinc-300'>
                {currentQuestion?.description}
              </p>

              {/* Examples Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-zinc-50'>Examples:</h3>
                <div className='space-y-4'>
                  {currentQuestion?.examples.map((example, index) => (
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
                <ul className='list-inside list-disc space-y-2 text-sm text-zinc-400'>
                  {currentQuestion?.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Code Editor Section */}
      <div className='flex-auto bg-zinc-950 p-4'>
        <CodeEditor />
      </div>
    </main>
  )
}
