import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { useSocketStore } from '@/store/use-socket-store'
import { QuestionResponse } from '@/types'

interface Question {
  question: QuestionResponse
  questionIndex: number
}

export function useInterview() {
  const router = useRouter()
  const { socket, isConnected } = useSocketStore()
  const [currentQuestion, setCurrentQuestion] = useState<QuestionResponse>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [followUpQuestion, setFollowUpQuestion] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!socket) return

    socket.on('question', (data: Question) => {
      setCurrentQuestion(data.question)
      setQuestionIndex(data.questionIndex)
    })

    socket.on('followUpQuestion', (question: string) => {
      setFollowUpQuestion(question)
    })

    socket.on('error', (data: { message: string }) => {
      setError(data.message)
      toast.error(data.message)
    })

    socket.on('interviewCompleted', () => {
      console.log('Interview completed')
      router.push('/interview-complete')
    })

    // Cleanup listeners
    return () => {
      socket.off('question')
      socket.off('followUpQuestion')
      socket.off('error')
      socket.off('interviewCompleted')
    }
  }, [socket, router])

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
    questionIndex,
    followUpQuestion,
    error,
    startInterview,
    submitSolution,
    submitFollowUpAnswer
  }
}
