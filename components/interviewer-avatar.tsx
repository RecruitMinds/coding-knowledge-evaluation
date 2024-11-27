'use client'

import { useEffect } from 'react'
import { Volume2, Volume1 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface InterviewerAvatarProps {
  isAsking: boolean
  question: string
}

export function InterviewerAvatar({
  isAsking,
  question
}: InterviewerAvatarProps) {
  useEffect(() => {
    if (isAsking && question) {
      const utterance = new SpeechSynthesisUtterance(question)
      window.speechSynthesis.speak(utterance)
    }
  }, [isAsking, question])

  return (
    <AnimatePresence>
      {isAsking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='fixed bottom-6 right-6 flex items-center gap-3 rounded-full bg-zinc-800/90 p-4 shadow-lg backdrop-blur-sm'
        >
          <div className='relative'>
            <div className='h-10 w-10 rounded-full bg-indigo-600 p-2'>
              <Volume2 className='h-6 w-6 text-white' />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className='absolute -inset-1 rounded-full border border-indigo-500/50'
            />
          </div>
          <p className='mr-2 text-sm text-zinc-200'>{question}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
