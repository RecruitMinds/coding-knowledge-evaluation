import { create } from 'zustand'
import { Message } from '@/types'

interface TranscriptState {
  messages: Message[]
  isRecording: boolean
  currentTranscript: string
  addMessage: (message: Message) => void
  updateLastMessage: (text: string) => void
  setIsRecording: (status: boolean) => void
  setCurrentTranscript: (text: string) => void
  clearTranscript: () => void
}

export const useTranscriptStore = create<TranscriptState>(set => ({
  messages: [],
  isRecording: false,
  currentTranscript: '',
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  updateLastMessage: text =>
    set(state => ({
      messages: state.messages.map((msg, idx) =>
        idx === state.messages.length - 1 ? { ...msg, text } : msg
      )
    })),
  setIsRecording: status => set({ isRecording: status }),
  setCurrentTranscript: text => set({ currentTranscript: text }),
  clearTranscript: () => set({ currentTranscript: '' })
}))
