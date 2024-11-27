'use client'

import { Message } from '@/types'

interface TranscriptListProps {
  messages: Message[]
}

const TranscriptList = ({ messages }: TranscriptListProps) => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='space-y-4 p-4'>
        {messages.length === 0 ? (
          <p className='text-center text-sm text-zinc-500'>No transcription</p>
        ) : (
          messages.map((message, index) => (
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
    </div>
  )
}

export default TranscriptList
