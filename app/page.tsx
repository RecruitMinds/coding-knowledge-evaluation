'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Message } from '@/types'
import { useInterview } from '@/hooks/use-interview'
import { useSocket } from '@/contexts/socket-context'

import CodeEditor from '@/components/code-editor'
import QuestionHeader from '@/components/question/question-header'
import QuestionContent from '@/components/question/question-content'
import ConsoleOutput from '@/components/code-editor/console-output'
import TranscriptList from '@/components/transcript/transcript-list'
import RecordingControls from '@/components/transcript/recording-controls'

// const questionIndex = 0
// const currentQuestion: any = {
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
  const [output, setOutput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

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
      <div className='w-full max-w-[400px] flex-none border-r border-zinc-800 bg-zinc-900 lg:max-w-[500px] 2xl:max-w-[600px]'>
        <QuestionHeader questionIndex={questionIndex} totalQuestions={3} />
        {currentQuestion && <QuestionContent question={currentQuestion} />}
      </div>

      <div className='flex-auto bg-zinc-950 p-4'>
        <div className='flex h-full flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900'>
          <CodeEditor />

          <div className='flex h-2/5 bg-zinc-900'>
            <ConsoleOutput output={output} />

            <div className='flex w-2/5 flex-col'>
              <div className='border-b border-zinc-800 px-4 py-3.5'>
                <h3 className='text-sm font-medium text-zinc-200'>
                  Transcript
                </h3>
              </div>
              <div className='flex h-[calc(100%-48px)] flex-col'>
                <TranscriptList messages={messages} />
                <RecordingControls setMessages={setMessages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
