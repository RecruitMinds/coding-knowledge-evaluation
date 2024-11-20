'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CodeEditor from '@/components/code-editor'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useInterview } from '@/hooks/use-interview'
import { useSocket } from '@/contexts/socket-context'

export default function Home() {
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get('token')
  const { isConnected } = useSocket()
  const { startInterview, currentQuestion } = useInterview()

  useEffect(() => {
    if (invitationToken && isConnected) {
      startInterview(invitationToken)
    }
  }, [invitationToken, isConnected])

  if (!invitationToken) {
    return <div>Invalid interview token</div>
  }

  return (
    <main className='flex h-screen font-serif'>
      {/* Coding Problem Section */}
      <div className='flex-none max-w-96 border-r py-6 pl-3'>
        <h1 className='w-full mb-3 text-2xl leading-none text-slate-900'>
          Coding Exercise
        </h1>
        <div className='flex items-center gap-3 mb-4'>
          <Progress value={66} className='w-[85%]' />
          <p>2/3</p>
        </div>

        <ScrollArea className='h-[87vh] w-full pr-3'>
          <div className='flex flex-col gap-3'>
            <p className='bg-zinc-200 rounded p-2'>{currentQuestion}</p>
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
