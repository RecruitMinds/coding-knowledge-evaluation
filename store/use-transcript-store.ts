import { create } from 'zustand'
import { Message } from '@/types'

interface TranscriptState {
  messages: Message[]
  isRecording: boolean
  addMessage: (message: Message) => void
  updateLastMessage: (text: string) => void
  setIsRecording: (status: boolean) => void
}

export const useTranscriptStore = create<TranscriptState>(set => ({
  messages: [],
  isRecording: false,
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  updateLastMessage: text =>
    set(state => ({
      messages: state.messages.map((msg, idx) =>
        idx === state.messages.length - 1
          ? { ...msg, text: msg.text + ' ' + text }
          : msg
      )
    })),
  setIsRecording: status => set({ isRecording: status })
}))
