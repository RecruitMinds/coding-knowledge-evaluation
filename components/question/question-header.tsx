'use client'

import { Progress } from '@/components/ui/progress'

interface QuestionHeaderProps {
  questionIndex: number
  totalQuestions: number
}

const QuestionHeader = ({
  questionIndex,
  totalQuestions
}: QuestionHeaderProps) => {
  return (
    <div className='border-b border-zinc-800 px-6 py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold text-zinc-50'>Coding Exercise</h1>
        <div className='flex items-center gap-2 text-sm font-medium'>
          <span className='text-indigo-400'>{questionIndex + 1}</span>
          <span className='text-zinc-600'>/</span>
          <span className='text-zinc-400'>{totalQuestions}</span>
        </div>
      </div>
      <div className='mt-4'>
        <Progress
          value={((questionIndex + 1) / totalQuestions) * 100}
          className='h-1.5'
        />
      </div>
    </div>
  )
}

export default QuestionHeader
