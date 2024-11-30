import { useState, useRef, useCallback } from 'react'
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk'

export const useDeepgram = (onTranscript: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const connection = useRef<any>(null)
  const isConnectionOpen = useRef(false)

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
        console.log('Connection opened')
        isConnectionOpen.current = true

        mediaRecorder.current = new MediaRecorder(stream)
        mediaRecorder.current.ondataavailable = event => {
          if (event.data.size > 0 && isConnectionOpen.current) {
            connection.current?.send(event.data)
          }
        }
        mediaRecorder.current.start(250)
        setIsRecording(true)
      })

      connection.current.on(LiveTranscriptionEvents.Transcript, (data: any) => {
        const transcript = data.channel.alternatives[0].transcript
        if (transcript) {
          onTranscript(transcript)
        }
      })

      connection.current.on(LiveTranscriptionEvents.Close, () => {
        console.log('Connection closed')
        isConnectionOpen.current = false
      })
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [onTranscript])

  const stopRecording = useCallback(() => {
    isConnectionOpen.current = false

    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop()
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
    }

    if (connection.current) {
      connection.current.finish()
    }

    mediaRecorder.current = null
    connection.current = null
    setIsRecording(false)
  }, [])

  return {
    isRecording,
    startRecording,
    stopRecording
  }
}
