'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Mic } from 'lucide-react'

import { Message } from '@/types'
import { useInterview } from '@/hooks/use-interview'

import { Button } from '@/components/ui/button'

interface RecordingControlsProps {
  setMessages: Dispatch<SetStateAction<Message[]>>
}

const RecordingControls = ({ setMessages }: RecordingControlsProps) => {
  const [isRecording, setIsRecording] = useState(true)
  const [transcript, setTranscript] = useState('')

  const { followUpQuestion, submitFollowUpAnswer } = useInterview()

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
  )
}

export default RecordingControls
