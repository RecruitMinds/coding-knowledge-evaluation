'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useInterview } from '@/hooks/use-interview'
import { useSocketStore } from '@/store/use-socket-store'

import CodeEditor from '@/components/code-editor'
import QuestionHeader from '@/components/question/question-header'
import QuestionContent from '@/components/question/question-content'
import ConsoleOutput from '@/components/code-editor/console-output'
import TranscriptList from '@/components/transcript/transcript-list'
import RecordingControls from '@/components/transcript/recording-controls'

export default function Home() {
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get('token')
  const { isConnected } = useSocketStore()
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
    <main className='flex h-screen overflow-hidden bg-zinc-950'>
      <div className='w-full max-w-[400px] flex-none border-r border-zinc-800 bg-zinc-900 lg:max-w-[500px] 2xl:max-w-[600px]'>
        <QuestionHeader questionIndex={questionIndex} totalQuestions={3} />
        {currentQuestion && <QuestionContent question={currentQuestion} />}
      </div>

      <div className='flex-auto bg-zinc-950'>
        <CodeEditor />
      </div>

      <div className='flex w-full max-w-[350px] flex-col border-l border-zinc-800 bg-zinc-900'>
        <div className='border-b border-zinc-800 px-4 py-[18px]'>
          <h3 className='text-sm font-medium text-zinc-200'>Transcript</h3>
        </div>
        <div className='flex h-[calc(100%-58px)] flex-col'>
          <TranscriptList />
          <RecordingControls />
        </div>
      </div>
    </main>
  )
}
