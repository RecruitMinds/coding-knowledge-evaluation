import { useEffect, useState } from 'react'
import { useSocket } from '@/contexts/socket-context'

interface Question {
  question: string
}

export function useInterview() {
  const { socket, isConnected } = useSocket()
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [followUpQuestion, setFollowUpQuestion] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!socket) return

    socket.on('question', (data: Question) => {
      console.log('Question', data.question, 'background: #222; color: #bada55')
      setCurrentQuestion(data.question)
    })

    socket.on('followUpQuestion', (question: string) => {
      console.log(
        'Follow up question',
        question,
        'background: #222; color: #bada55'
      )
      setFollowUpQuestion(question)
    })

    socket.on('error', (data: { message: string }) => {
      console.log('Error', data.message, 'background: #222; color: #bada55')
      setError(data.message)
    })

    socket.on('interviewCompleted', () => {
      console.log('Interview completed')
    })

    // Cleanup listeners
    return () => {
      socket.off('question')
      socket.off('followUpQuestion')
      socket.off('error')
      socket.off('interviewCompleted')
    }
  }, [socket])

  const startInterview = (invitationToken: string) => {
    if (!socket || !isConnected) return
    socket.emit('startInterview', { invitationToken })
  }

  const submitSolution = (solution: string) => {
    if (!socket) return
    socket.emit('submitSolution', { solution })
  }

  const submitFollowUpAnswer = (answer: string) => {
    if (!socket) return
    socket.emit('answerFollowUp', { answer })
  }

  return {
    currentQuestion,
    followUpQuestion,
    error,
    startInterview,
    submitSolution,
    submitFollowUpAnswer,
  }
}
