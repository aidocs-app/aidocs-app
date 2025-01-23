export interface Message {
  role: ROLE
  content: string
  id: string
}

export enum ROLE {
  HUMAN = 'human',
  AI = 'ai',
}

export interface MessageStore {
  messages: Message[]
  threadId?: string
  isLoading: boolean
  upsertMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
  setThreadId: (threadId: string) => void
  setIsLoading: (isLoading: boolean) => void
}
