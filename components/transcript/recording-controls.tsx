'use client'

import { useEffect, useState } from 'react'
import { Loader2, Mic, Send } from 'lucide-react'

import { useDeepgram } from '@/hooks/use-deepgram'
import { useInterview } from '@/hooks/use-interview'
import { useTranscriptStore } from '@/store/use-transcript-store'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const RecordingControls = () => {
  const { followUpQuestion } = useInterview()
  const { startRecording, stopRecording } = useDeepgram()
  const { isRecording, addMessage } = useTranscriptStore()
  const [textAnswer, setTextAnswer] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { submitFollowUpAnswer } = useInterview()

  useEffect(() => {
    if (followUpQuestion) {
      addMessage({
        type: 'question',
        text: followUpQuestion
      })

      setIsSpeaking(true)
      // Start speech synthesis
      const utterance = new SpeechSynthesisUtterance(followUpQuestion)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }, [followUpQuestion])

  const handleSubmitText = () => {
    if (textAnswer.trim()) {
      addMessage({
        type: 'answer',
        text: textAnswer.trim()
      })
      submitFollowUpAnswer(textAnswer.trim())
      setTextAnswer('')
    }
  }

  return (
    <div className='border-t border-zinc-800 bg-zinc-950/50 p-4 backdrop-blur-sm'>
      <div className='space-y-4'>
        <div className='relative'>
          <Textarea
            placeholder='Type your answer here...'
            className={cn(
              'min-h-[80px] resize-none rounded-lg border-zinc-800',
              'bg-zinc-900/90 text-zinc-200 placeholder:text-zinc-600',
              'focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50',
              'transition-colors duration-200'
            )}
            value={textAnswer}
            onChange={e => setTextAnswer(e.target.value)}
            disabled={isRecording}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmitText()
              }
            }}
          />
          <Button
            size='sm'
            className={cn(
              'absolute bottom-2 right-2 h-8 w-8 p-0',
              'bg-indigo-600 text-white hover:bg-indigo-700',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200'
            )}
            disabled={!textAnswer.trim() || isRecording}
            onClick={handleSubmitText}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center justify-between'>
          <span className='flex items-center gap-2 text-sm'>
            {isRecording ? (
              <>
                <Loader2 className='h-3 w-3 animate-spin text-indigo-500' />
                <span className='text-indigo-500'>Listening...</span>
              </>
            ) : isSpeaking ? (
              <>
                <Loader2 className='h-3 w-3 animate-spin text-zinc-400' />
                <span className='text-zinc-400'>Speaking...</span>
              </>
            ) : (
              <span className='text-zinc-400'>Ready to answer</span>
            )}
          </span>
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'gap-2 transition-colors duration-200',
              isRecording
                ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
            )}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isSpeaking}
          >
            <Mic className={cn('h-4 w-4', isRecording && 'animate-pulse')} />
            {isRecording ? 'Stop' : 'Start'} Recording
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RecordingControls
