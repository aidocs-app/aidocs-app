import { Skeleton } from '@/components/ui/skeleton'

export const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 sm:w-[400px] w-[200px]">
      <Skeleton className="sm:h-4 h-2 w-full bg-gray-200" />
      <Skeleton className="sm:h-4 h-2 w-[80%] bg-gray-200" />
    </div>
  )
}
