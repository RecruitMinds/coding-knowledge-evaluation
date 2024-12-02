export interface Example {
  input: string
  output: string
  explanation: string
}

export interface QuestionResponse {
  title: string
  description: string
  examples: Example[]
  constraints: string[]
}

export interface Message {
  type: 'question' | 'answer'
  text: string
}
