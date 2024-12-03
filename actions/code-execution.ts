'use server'

import { languages } from '@/constants'

export const executeCode = async (language: string, code: string) => {
  const res = await fetch('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    body: JSON.stringify({
      language,
      version: languages.find(item => item.name === language)?.version,
      files: [{ content: code }]
    })
  })

  const data = await res.json()
  const { run } = data
  return run.output
}
