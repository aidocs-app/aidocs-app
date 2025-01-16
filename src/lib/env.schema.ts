import { z } from 'zod'

export const envSchema = z.object({
  NEXT_PUBLIC_LANGGRAPH_API_URL: z.string().url('Invalid LANGGRAPH API URL'),
})

export type EnvSchema = z.infer<typeof envSchema>

export function validateEnvironment() {
  const envValues = {
    NEXT_PUBLIC_LANGGRAPH_API_URL: process.env.NEXT_PUBLIC_LANGGRAPH_API_URL,
  }

  const parsed = envSchema.safeParse(envValues)

  if (!parsed.success) {
    const errorDetails = parsed.error.issues.map((issue) => {
      const path = issue.path.join('.')
      const value = envValues[path as keyof typeof envValues]
      return `${path}: ${issue.message} (received: ${
        value === undefined ? 'undefined' : `"${value}"`
      })`
    })

    console.error(`Environment validation failed:\n${errorDetails.join('\n')}`)
  }

  return parsed.data
}
