'use client'
import { streamResponse } from '@/actions/stream-response'
import { useMessageStore } from '@/store/message'
import { ROLE } from '@/types/message'
import { generateId } from 'ai'
import { readStreamableValue } from 'ai/rsc'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { AutoResizeTextarea } from './autoresize-input-area'
import { Button } from './ui/button'

export const InputForm = () => {
  const [input, setInput] = useState('')
  const { upsertMessage, threadId, setThreadId, setIsLoading } =
    useMessageStore()
  const handleSubmit = async () => {
    if (!input.trim()) return

    const message = {
      role: ROLE.HUMAN,
      content: input,
      id: generateId(),
    }
    setInput('')
    upsertMessage(message)

    const assistantMessageId = generateId()
    upsertMessage({
      role: ROLE.AI,
      content: '',
      id: assistantMessageId,
    })

    setIsLoading(true)

    try {
      const { value, threadId: newThreadId } = await streamResponse(
        message,
        threadId
      )
      setThreadId(newThreadId)

      for await (const chunk of readStreamableValue(value)) {
        if (chunk?.length && chunk?.length > 0) {
          setIsLoading(false)
        }
        upsertMessage({
          role: ROLE.AI,
          content: chunk ?? '',
          id: assistantMessageId,
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      await handleSubmit()
    }
  }
  return (
    <div className="w-full flex justify-center fixed bottom-0 left-0 bg-background/80 backdrop-blur-sm border-t p-2 sm:static sm:border-0">
      <form
        className="flex space-x-2 items-center w-full max-w-2xl"
        action={handleSubmit}
      >
        <AutoResizeTextarea
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder="What is server actions in nextjs?"
          className="p-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-lg transition-shadow duration-200"
        />
        <Button type="submit" className="shrink-0 h-11 w-11">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
