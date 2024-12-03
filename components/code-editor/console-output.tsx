import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { SquareTerminal } from 'lucide-react'

interface ConsoleOutputProps {
  output: string[]
}

const ConsoleOutput = ({ output }: ConsoleOutputProps) => {
  return (
    <div className='flex flex-1 flex-col border-r border-zinc-800'>
      <div className='border-b border-zinc-800 px-4 py-2'>
        <ToggleGroup
          type='single'
          size='sm'
          defaultValue='console'
          className='justify-start'
        >
          <ToggleGroupItem
            value='console'
            className='gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 hover:bg-zinc-800 data-[state=on]:bg-zinc-800 data-[state=on]:text-zinc-50'
          >
            <SquareTerminal className='h-4 w-4' />
            Console
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='flex-1 p-4'>
        <div
          className={`h-full rounded-lg bg-zinc-800/50 p-4 font-mono text-sm ${output ? 'text-zinc-200' : 'text-zinc-400'}`}
        >
          {output.map((item, i) => <p key={i}>{item}</p>) || 'No output yet'}
        </div>
      </div>
    </div>
  )
}

export default ConsoleOutput
