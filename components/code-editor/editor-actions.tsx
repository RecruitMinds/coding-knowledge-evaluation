'use client'

import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'

interface EditorActionsProps {
  onRun: () => void
  onSubmit: () => void
  isLoading: boolean
}

const EditorActions = ({ onRun, onSubmit, isLoading }: EditorActionsProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Button
        disabled={isLoading}
        size='sm'
        variant='outline'
        className='border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50'
        onClick={onRun}
      >
        {isLoading ? (
          <div className='flex items-center justify-center px-2'>
            <Loader className='animate-spin' />
          </div>
        ) : (
          'Run Code'
        )}
      </Button>
      <Button
        size='sm'
        className='bg-indigo-600 text-white hover:bg-indigo-700'
        onClick={onSubmit}
      >
        Submit Solution
      </Button>
    </div>
  )
}

export default EditorActions
