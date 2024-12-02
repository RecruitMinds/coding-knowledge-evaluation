import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

interface SocketStore {
  socket: Socket
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

export const useSocketStore = create<SocketStore>(set => {
  const socket = io('http://localhost:3000/interview', {
    autoConnect: true
  })

  socket.on('connect', () => {
    set({ isConnected: true })
  })

  socket.on('disconnect', () => {
    set({ isConnected: false })
  })

  return {
    socket,
    isConnected: false,
    setIsConnected: connected => set({ isConnected: connected })
  }
})
