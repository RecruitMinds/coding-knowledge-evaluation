'use client'

import { ScrollArea } from '../ui/scroll-area'
import { useTranscriptStore } from '@/store/use-transcript-store'

const TranscriptList = () => {
  const { messages, partialTranscript } = useTranscriptStore()

  const allMessages = [...messages]
  if (partialTranscript.trim()) {
    allMessages.push({ type: 'answer', text: partialTranscript })
  }

  return (
    <ScrollArea className='h-full overflow-hidden'>
      <div className='space-y-4 p-4'>
        {allMessages.length === 0 ? (
          <p className='text-center text-sm text-zinc-500'>No transcription</p>
        ) : (
          allMessages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                message.type === 'question' ? 'items-start' : 'items-end'
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
    </ScrollArea>
  )
}

export default TranscriptList
