'use client'

import { useEffect } from 'react'
import { Mic } from 'lucide-react'

import { useDeepgram } from '@/hooks/use-deepgram'
import { useInterview } from '@/hooks/use-interview'
import { useTranscriptStore } from '@/store/use-transcript-store'

import { Button } from '@/components/ui/button'

const RecordingControls = () => {
  const { followUpQuestion } = useInterview()
  const { startRecording, stopRecording } = useDeepgram()
  const { isRecording, addMessage } = useTranscriptStore()

  useEffect(() => {
    if (followUpQuestion) {
      addMessage({
        type: 'question',
        text: followUpQuestion
      })
      // Start speech synthesis
      const utterance = new SpeechSynthesisUtterance(followUpQuestion)
      window.speechSynthesis.speak(utterance)
    }
  }, [followUpQuestion])

  return (
    <div className='border-t border-zinc-800 p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <span className='text-sm text-zinc-400'>
          {isRecording ? 'Listening...' : 'Ready to answer'}
        </span>
        <Button
          variant='ghost'
          size='sm'
          className={`gap-2 ${
            isRecording
              ? 'text-red-400 hover:text-red-500'
              : 'text-zinc-400 hover:text-zinc-300'
          }`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <Mic className='h-4 w-4' />
          {isRecording ? 'Stop' : 'Start'} Recording
        </Button>
      </div>
    </div>
  )
}

export default RecordingControls
