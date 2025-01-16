'server only'

import { validateEnvironment } from './env.schema'

const env = validateEnvironment()

export const configuration = {
  langgraphApiUrl: env?.NEXT_PUBLIC_LANGGRAPH_API_URL,
  langgraphId: 'agent',
  assistantName: 'assistant',
} as const

export type ConfigurationType = typeof configuration
