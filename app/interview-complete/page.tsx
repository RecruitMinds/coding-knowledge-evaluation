import { CheckCircle } from 'lucide-react'

export default function InterviewComplete() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4'>
      <div className='flex max-w-md flex-col items-center text-center'>
        <div className='mb-6 rounded-full bg-zinc-900 p-3'>
          <CheckCircle className='h-12 w-12 text-indigo-500' />
        </div>

        <h1 className='mb-4 text-3xl font-bold text-zinc-50'>
          Interview Completed!
        </h1>

        <p className='mb-8 text-zinc-400'>
          Thank you for completing the interview. Your responses have been
          recorded and will be reviewed by our team.
        </p>
      </div>
    </main>
  )
}
