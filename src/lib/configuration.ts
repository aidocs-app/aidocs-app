'server only'
export const configuration = {
  langgraphApiUrl: process.env.NEXT_PUBLIC_LANGGRAPH_API_URL,
  langgraphId: 'agent',
  assistantName: 'assistant',
}
console.log(
  '🚀 ~ export  configuration.process.env.NEXT_PUBLIC_LANGGRAPH_API_URL:',
  process.env.NEXT_PUBLIC_LANGGRAPH_API_URL,
  'configuration',
  configuration.langgraphApiUrl
)

export type ConfigurationType = typeof configuration
