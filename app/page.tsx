import CodeEditor from '@/components/code_editor'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  return (
    <main className='flex h-screen font-serif'>
      {/* Coding Problem Section */}
      <div className='flex-none max-w-96 border-r py-6 pl-3'>
        <h1 className='w-full mb-3 text-2xl leading-none text-slate-900'>
          Coding Exercise
        </h1>
        <div className='flex items-center gap-3 mb-4'>
          <Progress value={66} className='w-[85%]' />
          <p>2/3</p>
        </div>

        <ScrollArea className='h-[87vh] w-full pr-3'>
          <div className='flex flex-col gap-3'>
            <p className='bg-zinc-200 rounded p-2'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
              dolore possimus natus rem, dolor fugiat est iure. Voluptatum
              molestias quibusdam fugiat ducimus. Facilis fugit itaque, quae
              saepe nemo quisquam. Quae, iure et maiores deserunt est, possimus
              quas suscipit quia necessitatibus sequi sint veniam ea. Corporis
              iste voluptatibus vero consectetur velit?
            </p>
            <p className='bg-zinc-200 rounded p-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              suscipit optio temporibus dicta est esse recusandae autem alias
              quo quisquam?
            </p>
            <p className='bg-zinc-200 rounded p-2'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
              dolore possimus natus rem, dolor fugiat est iure. Voluptatum
              molestias quibusdam fugiat ducimus. Facilis fugit itaque, quae
              saepe nemo quisquam. Quae, iure et maiores deserunt est, possimus
              quas suscipit quia necessitatibus sequi sint veniam ea. Corporis
              iste voluptatibus vero consectetur velit?
            </p>
            <p className='bg-zinc-200 rounded p-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              suscipit optio temporibus dicta est esse recusandae autem alias
              quo quisquam?
            </p>
            <p className='bg-zinc-200 rounded p-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              recusandae expedita ratione vitae! Obcaecati a nam amet vero?
              Molestias dolores laboriosam facilis perspiciatis quos vero sunt!
              Incidunt vel omnis veniam in maxime doloremque cupiditate totam
              ratione corporis placeat, eos fuga quisquam necessitatibus facere
              nulla nostrum, voluptates repudiandae enim nemo. Nam repudiandae
              pariatur accusantium dolorem ullam. Veritatis quidem numquam
              beatae dolor?
            </p>
          </div>
        </ScrollArea>
      </div>

      {/* Code Editor Section */}
      <div className='flex-auto p-2'>
        <CodeEditor language='typescript' />
      </div>
    </main>
  )
}
