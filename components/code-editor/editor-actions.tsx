'use client'

import { Button } from '@/components/ui/button'

interface EditorActionsProps {
  onRun: () => void
  onSubmit: () => void
}

const EditorActions = ({ onRun, onSubmit }: EditorActionsProps) => {
  return (
    <div className='flex items-center gap-3'>
      <Button
        size='sm'
        variant='outline'
        className='border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50'
        onClick={onRun}
      >
        Run Code
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
