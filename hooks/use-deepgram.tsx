import { useRef, useCallback } from 'react'
import {
  createClient,
  ListenLiveClient,
  LiveTranscriptionEvents
} from '@deepgram/sdk'
import { useTranscriptStore } from '@/store/use-transcript-store'

export const useDeepgram = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const connection = useRef<ListenLiveClient | null>(null)
  const isConnectionOpen = useRef(false)
  const transcriptTimer = useRef<NodeJS.Timeout | null>(null)

  const {
    setIsRecording,
    addMessage,
    updateLastMessage,
    setPartialTranscript,
    clearPartialTranscript
  } = useTranscriptStore()

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY!)

      connection.current = deepgram.listen.live({
        smart_format: true,
        model: 'nova-2',
        language: 'en-US'
      })

      connection.current.on(LiveTranscriptionEvents.Open, () => {
        isConnectionOpen.current = true
        mediaRecorder.current = new MediaRecorder(stream)
        mediaRecorder.current.ondataavailable = event => {
          if (event.data.size > 0 && isConnectionOpen.current) {
            connection.current?.send(event.data)
          }
        }
        mediaRecorder.current.start(250)
        setIsRecording(true)
        addMessage({ type: 'answer', text: '' })
      })

      connection.current.on(LiveTranscriptionEvents.Transcript, (data: any) => {
        const transcript = data.channel.alternatives[0].transcript
        if (transcript && transcript.trim() !== '') {
          if (data.is_final) {
            updateLastMessage(transcript)

            if (transcriptTimer.current) {
              clearTimeout(transcriptTimer.current)
            }

            transcriptTimer.current = setTimeout(() => {
              clearPartialTranscript()
            }, 3000)
          } else {
            setPartialTranscript(transcript)
          }
        }
      })

      connection.current.on(LiveTranscriptionEvents.Close, () => {
        isConnectionOpen.current = false
        if (transcriptTimer.current) {
          clearTimeout(transcriptTimer.current)
        }
      })
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [])

  const stopRecording = useCallback(() => {
    isConnectionOpen.current = false
    if (transcriptTimer.current) {
      clearTimeout(transcriptTimer.current)
    }

    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
    }

    if (connection.current) {
      connection.current.requestClose()
    }

    mediaRecorder.current = null
    connection.current = null
    setIsRecording(false)
    clearPartialTranscript()
  }, [])

  return {
    startRecording,
    stopRecording
  }
}
