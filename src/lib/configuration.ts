'server only'
export const configuration = {
  langgraphApiUrl: process.env.LANGGRAPH_API_URL,
  langgraphId: 'agent',
  assistantName: 'assistant',
}
console.log(
  '🚀 ~ export  configuration.process.env.LANGGRAPH_API_URL:',
  process.env.LANGGRAPH_API_URL,
  'configuration',
  configuration.langgraphApiUrl
)

export type ConfigurationType = typeof configuration
